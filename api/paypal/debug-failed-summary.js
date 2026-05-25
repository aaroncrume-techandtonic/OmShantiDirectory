import {
  getFailedWebhookSummary,
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
  const limit = Number.parseInt(url.searchParams.get('limit') || '10', 10);
  const summary = getFailedWebhookSummary(limit);

  return sendJson(res, 200, {
    ok: true,
    ...summary,
  });
}
