import {
  claimWebhookEventProcessing,
  extractOrderIdFromWebhook,
  getPaymentRecord,
  markWebhookEventFailed,
  markWebhookEventProcessed,
  readJsonBody,
  savePaymentRecord,
  sendJson,
  verifyWebhookSignature,
} from './_paypal.js';

const TRACKED_EVENTS = new Set([
  'PAYMENT.CAPTURE.COMPLETED',
  'PAYMENT.CAPTURE.DENIED',
  'PAYMENT.CAPTURE.PENDING',
  'PAYMENT.CAPTURE.REFUNDED',
  'PAYMENT.CAPTURE.REVERSED',
]);

function mapWebhookToOrderShape(body, existingRecord) {
  const resource = body.resource || {};

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
  };
}

function getWebhookEventId(body) {
  return body?.id || null;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method not allowed.' });
  }

  try {
    const body = await readJsonBody(req);
    const signature = await verifyWebhookSignature(req, body);

    if (!signature.skipped && !signature.verified) {
      return sendJson(res, 401, { error: 'Webhook signature verification failed.' });
    }

    const eventType = body.event_type;
    if (!TRACKED_EVENTS.has(eventType)) {
      return sendJson(res, 200, {
        received: true,
        ignored: true,
        eventType,
      });
    }

    const eventId = getWebhookEventId(body);
    if (!eventId) {
      return sendJson(res, 400, { error: 'Missing webhook event ID.' });
    }

    const claimed = claimWebhookEventProcessing(eventId, eventType);
    if (!claimed) {
      return sendJson(res, 200, {
        received: true,
        duplicate: true,
        eventType,
        eventId,
      });
    }

    try {
      const orderId = extractOrderIdFromWebhook(body);
      if (!orderId) {
        return sendJson(res, 400, { error: 'Unable to determine order ID from webhook payload.' });
      }

      const existingRecord = getPaymentRecord(orderId);
      const normalizedOrder = mapWebhookToOrderShape(body, existingRecord);
      const record = savePaymentRecord(normalizedOrder, `webhook:${eventType}`);
      markWebhookEventProcessed(eventId, orderId);

      return sendJson(res, 200, {
        received: true,
        eventType,
        eventId,
        orderId,
        updatedStatus: record.status,
        signatureVerified: signature.verified,
        signatureVerificationSkipped: signature.skipped,
      });
    } catch (error) {
      try {
        markWebhookEventFailed(eventId, error);
      } catch (markError) {
        console.warn('Failed to mark webhook event as failed:', markError);
      }
      throw error;
    }
  } catch (error) {
    console.error('PayPal webhook error:', error);
    return sendJson(res, 500, { error: error.message || 'Failed to process webhook.' });
  }
}