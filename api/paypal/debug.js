import {
  getRecentPayments,
  getRecentWebhookEvents,
  isPaypalDebugAuthorized,
  sendJson,
} from './_paypal.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return sendJson(res, 405, { error: 'Method not allowed.' });
  }

  if (!isPaypalDebugAuthorized(req)) {
    return sendJson(res, 403, { error: 'Debug access denied.' });
  }

  const url = new URL(req.url || 'http://localhost');
  const limitParam = url.searchParams.get('limit');
  const limit = Number.parseInt(limitParam || '20', 10);

  return sendJson(res, 200, {
    ok: true,
    payments: getRecentPayments(limit),
    webhookEvents: getRecentWebhookEvents(limit),
  });
}
