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
  'CHECKOUT.ORDER.APPROVED',
  'CHECKOUT.ORDER.COMPLETED',
  'CHECKOUT.ORDER.DECLINED',
  'CHECKOUT.ORDER.SAVED',
  'CHECKOUT.ORDER.VOIDED',
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

function createHttpError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
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

    const claimed = await claimWebhookEventProcessing(eventId, eventType);
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
        throw createHttpError(400, 'Unable to determine order ID from webhook payload.');
      }

      const existingRecord = await getPaymentRecord(orderId);
      const normalizedOrder = mapWebhookToOrderShape(body, existingRecord);
      const record = await savePaymentRecord(normalizedOrder, `webhook:${eventType}`);
      await markWebhookEventProcessed(eventId, orderId);

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
        await markWebhookEventFailed(eventId, error);
      } catch (markError) {
        console.warn('Failed to mark webhook event as failed:', markError);
      }
      throw error;
    }
  } catch (error) {
    console.error('PayPal webhook error:', error);
    const statusCode = Number.isInteger(error?.statusCode) ? error.statusCode : 500;
    return sendJson(res, statusCode, { error: error.message || 'Failed to process webhook.' });
  }
}