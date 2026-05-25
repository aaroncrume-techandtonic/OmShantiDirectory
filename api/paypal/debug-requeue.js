import {
  getWebhookEventById,
  isPaypalDebugAuthorized,
  readJsonBody,
  requeueFailedWebhookEvent,
  sendJson,
} from './_paypal.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method not allowed.' });
  }

  if (!isPaypalDebugAuthorized(req)) {
    return sendJson(res, 403, { error: 'Debug access denied.' });
  }

  const body = await readJsonBody(req);
  const eventId = body?.eventId || null;

  if (!eventId) {
    return sendJson(res, 400, { error: 'Missing eventId.' });
  }

  const event = await getWebhookEventById(eventId);
  if (!event) {
    return sendJson(res, 404, { error: 'Webhook event not found.' });
  }

  if (event.processingStatus !== 'failed') {
    return sendJson(res, 409, {
      error: 'Only failed webhook events can be requeued.',
      event,
    });
  }

  const requeuedEvent = await requeueFailedWebhookEvent(eventId, 'Manual requeue requested');

  return sendJson(res, 200, {
    ok: true,
    event: requeuedEvent || event,
  });
}
