import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { capturePaypalOrder, createPaypalOrder } from './api/paypal/_paypal.js'

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
          return sendJson(res, 200, { order })
        } catch (error) {
          console.error('PayPal capture order error:', error)
          return sendJson(res, 500, { error: error.message || 'Failed to capture PayPal order.' })
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  return {
    plugins: [react(), paypalDevApiPlugin()],
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
