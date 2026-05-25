import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import {
  capturePaypalOrder,
  claimWebhookEventProcessing,
  clearMembershipCookie,
  createMembershipSession,
  createPaypalOrder,
  extractOrderIdFromWebhook,
  getPaymentRecord,
  getRecentPayments,
  getRecentWebhookEvents,
  isPaypalDebugAuthorized,
  markWebhookEventFailed,
  markWebhookEventProcessed,
  parseCookies,
  savePaymentRecord,
  verifyWebhookSignature,
  verifyMembershipSession,
} from './api/paypal/_paypal.js'

const TRACKED_WEBHOOK_EVENTS = new Set([
  'PAYMENT.CAPTURE.COMPLETED',
  'PAYMENT.CAPTURE.DENIED',
  'PAYMENT.CAPTURE.PENDING',
  'PAYMENT.CAPTURE.REFUNDED',
  'PAYMENT.CAPTURE.REVERSED',
])

function mapWebhookToOrderShape(body, existingRecord) {
  const resource = body.resource || {}

  return {
    id: extractOrderIdFromWebhook(body),
    status: resource.status || existingRecord?.status || body.event_type || 'UNKNOWN',
    payer: {
      email_address: existingRecord?.payerEmail || null,
      payer_id: existingRecord?.payerId || null,
    },
    purchase_units: [
      {
        amount: {
          currency_code: resource.amount?.currency_code || existingRecord?.currency || null,
          value: resource.amount?.value || existingRecord?.amount || null,
        },
        payments: {
          captures: [
            {
              id: resource.id || existingRecord?.captureId || null,
              amount: {
                currency_code: resource.amount?.currency_code || existingRecord?.currency || null,
                value: resource.amount?.value || existingRecord?.amount || null,
              },
            },
          ],
        },
      },
    ],
  }
}

function getWebhookEventId(body) {
  return body?.id || null
}

function createHttpError(statusCode, message) {
  const error = new Error(message)
  error.statusCode = statusCode
  return error
}

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(payload))
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []

    req.on('data', (chunk) => {
      chunks.push(chunk)
    })

    req.on('end', () => {
      if (chunks.length === 0) {
        resolve({})
        return
      }

      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')))
      } catch (error) {
        reject(error)
      }
    })

    req.on('error', reject)
  })
}

function paypalDevApiPlugin() {
  return {
    name: 'paypal-dev-api',
    configureServer(server) {
      server.middlewares.use('/api/paypal/create-order', async (req, res, next) => {
        if (req.method !== 'POST') {
          return next()
        }

        try {
          const order = await createPaypalOrder()
          savePaymentRecord(order, 'create')
          return sendJson(res, 200, { id: order.id, status: order.status })
        } catch (error) {
          console.error('PayPal create order error:', error)
          return sendJson(res, 500, { error: error.message || 'Failed to create PayPal order.' })
        }
      })

      server.middlewares.use('/api/paypal/capture-order', async (req, res, next) => {
        if (req.method !== 'POST') {
          return next()
        }

        try {
          const body = await readRequestBody(req)
          const order = await capturePaypalOrder(body.orderId)
          const record = savePaymentRecord(order, 'capture')
          const sessionToken = createMembershipSession({
            orderId: record.orderId,
            payerId: record.payerId,
            payerEmail: record.payerEmail,
            status: record.status,
          })
          res.setHeader('Set-Cookie', `om_shanti_membership=${encodeURIComponent(sessionToken)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=31536000`)
          return sendJson(res, 200, { order })
        } catch (error) {
          console.error('PayPal capture order error:', error)
          return sendJson(res, 500, { error: error.message || 'Failed to capture PayPal order.' })
        }
      })

      server.middlewares.use('/api/membership/session', async (req, res, next) => {
        if (req.method === 'GET') {
          try {
            const cookies = parseCookies(req)
            const session = verifyMembershipSession(cookies.om_shanti_membership)

            if (!session) {
              return sendJson(res, 200, { active: false })
            }

            return sendJson(res, 200, {
              active: true,
              membership: {
                orderId: session.orderId || null,
                payerEmail: session.payerEmail || null,
                status: session.status || 'COMPLETED',
              },
            })
          } catch (error) {
            console.error('Membership session read error:', error)
            return sendJson(res, 500, { error: 'Failed to read membership session.' })
          }
        }

        if (req.method === 'DELETE') {
          clearMembershipCookie(res)
          return sendJson(res, 200, { active: false })
        }

        return next()
      })

      server.middlewares.use('/api/paypal/webhook', async (req, res, next) => {
        if (req.method !== 'POST') {
          return next()
        }

        try {
          const body = await readRequestBody(req)
          const signature = await verifyWebhookSignature(req, body)

          if (!signature.skipped && !signature.verified) {
            return sendJson(res, 401, { error: 'Webhook signature verification failed.' })
          }

          const eventType = body.event_type
          if (!TRACKED_WEBHOOK_EVENTS.has(eventType)) {
            return sendJson(res, 200, {
              received: true,
              ignored: true,
              eventType,
            })
          }

          const eventId = getWebhookEventId(body)
          if (!eventId) {
            return sendJson(res, 400, { error: 'Missing webhook event ID.' })
          }

          const claimed = claimWebhookEventProcessing(eventId, eventType)
          if (!claimed) {
            return sendJson(res, 200, {
              received: true,
              duplicate: true,
              eventType,
              eventId,
            })
          }

          try {
            const orderId = extractOrderIdFromWebhook(body)
            if (!orderId) {
              throw createHttpError(400, 'Unable to determine order ID from webhook payload.')
            }

            const existingRecord = getPaymentRecord(orderId)
            const normalizedOrder = mapWebhookToOrderShape(body, existingRecord)
            const record = savePaymentRecord(normalizedOrder, `webhook:${eventType}`)
            markWebhookEventProcessed(eventId, orderId)

            return sendJson(res, 200, {
              received: true,
              eventType,
              eventId,
              orderId,
              updatedStatus: record.status,
              signatureVerified: signature.verified,
              signatureVerificationSkipped: signature.skipped,
            })
          } catch (error) {
            try {
              markWebhookEventFailed(eventId, error)
            } catch (markError) {
              console.warn('Failed to mark webhook event as failed:', markError)
            }
            throw error
          }
        } catch (error) {
          console.error('PayPal webhook error:', error)
          const statusCode = Number.isInteger(error?.statusCode) ? error.statusCode : 500
          return sendJson(res, statusCode, { error: error.message || 'Failed to process webhook.' })
        }
      })

      server.middlewares.use('/api/paypal/debug', async (req, res, next) => {
        if (req.method !== 'GET') {
          return next()
        }

        if (!isPaypalDebugAuthorized(req)) {
          return sendJson(res, 403, { error: 'Debug access denied.' })
        }

        const url = new URL(req.url || '/', 'http://localhost')
        const limit = Number.parseInt(url.searchParams.get('limit') || '20', 10)

        return sendJson(res, 200, {
          ok: true,
          payments: getRecentPayments(limit),
          webhookEvents: getRecentWebhookEvents(limit),
        })
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  return {
    plugins: [react(), paypalDevApiPlugin()],
    server: {
      allowedHosts: ['.loca.lt', '.localtunnel.me'],
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
          const normalizedId = id.replace(/\\/g, '/')

          const parseConceptNumber = (conceptPath) => {
            const match = conceptPath.match(/\/src\/(Concept[A-Za-z]+)\.jsx$/)
            if (!match) return null

            const conceptName = match[1].replace('Concept', '')
            const tokens = conceptName.match(/[A-Z][a-z]*/g) || []

            const units = {
              One: 1,
              Two: 2,
              Three: 3,
              Four: 4,
              Five: 5,
              Six: 6,
              Seven: 7,
              Eight: 8,
              Nine: 9,
            }

            const teens = {
              Ten: 10,
              Eleven: 11,
              Twelve: 12,
              Thirteen: 13,
              Fourteen: 14,
              Fifteen: 15,
              Sixteen: 16,
              Seventeen: 17,
              Eighteen: 18,
              Nineteen: 19,
            }

            const tens = {
              Twenty: 20,
              Thirty: 30,
              Forty: 40,
              Fifty: 50,
              Sixty: 60,
              Seventy: 70,
              Eighty: 80,
              Ninety: 90,
            }

            if (tokens.length === 1) {
              return units[tokens[0]] ?? teens[tokens[0]] ?? tens[tokens[0]] ?? null
            }

            if (tokens.length === 2) {
              if (tokens[0] === 'One' && tokens[1] === 'Hundred') return 100
              if (tens[tokens[0]] && units[tokens[1]]) return tens[tokens[0]] + units[tokens[1]]
            }

            return null
          }

          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('scheduler')) return 'vendor-react'
            if (id.includes('framer-motion') || id.includes('lucide-react')) return 'vendor-ui'
            return 'vendor-misc'
          }

          if (normalizedId.includes('/src/components/') && normalizedId.includes('ProtocolForm')) {
            return 'app-protocols'
          }

          if (normalizedId.includes('/src/context/AudioContext')) {
            return 'app-audio-core'
          }

          if (normalizedId.includes('/src/components/LyricalAnchor')) {
            return 'app-lyrical-anchor'
          }

          if (/\/src\/module\d+LyricTimings\.js$/.test(normalizedId)) {
            return 'app-lyric-timings'
          }

          if (/\/src\/components\/Module.*(Backdrop|Progress)\.jsx$/.test(normalizedId)) {
            return 'app-module-shells'
          }

          if (normalizedId.includes('/src/Concept')) {
            const conceptNumber = parseConceptNumber(normalizedId)

            if (conceptNumber) {
              const moduleNumber = Math.ceil(conceptNumber / 4)

              // Split early modules more aggressively because they carry heavier content.
              let groupStart
              let groupEnd

              if (moduleNumber === 1) {
                groupStart = 1
                groupEnd = 1
              } else if (moduleNumber === 2) {
                groupStart = 2
                groupEnd = 2
              } else if (moduleNumber <= 4) {
                groupStart = 3
                groupEnd = 4
              } else if (moduleNumber === 5) {
                groupStart = 5
                groupEnd = 5
              } else {
                groupStart = Math.floor((moduleNumber - 6) / 5) * 5 + 6
                groupEnd = groupStart + 4
              }

              const pad = (n) => String(n).padStart(2, '0')
              return `app-concepts-m${pad(groupStart)}-m${pad(groupEnd)}`
            }

            return 'app-concepts'
          }
          },
        },
      },
    },
  }
})
