import {
  getFailedWebhookEvents,
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
  const limit = Number.parseInt(url.searchParams.get('limit') || '20', 10);
  const offset = Number.parseInt(url.searchParams.get('offset') || '0', 10);
  const result = getFailedWebhookEvents(limit, offset);

  return sendJson(res, 200, {
    ok: true,
    ...result,
  });
}
