import {
  isPaypalDebugAuthorized,
  readJsonBody,
  requeueFailedWebhookEvents,
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
  const limit = Number.parseInt(String(body?.limit ?? 20), 10);
  const offset = Number.parseInt(String(body?.offset ?? 0), 10);
  const reason = body?.reason || 'Manual batch requeue requested';

  const result = await requeueFailedWebhookEvents(limit, offset, reason);

  return sendJson(res, 200, {
    ok: true,
    ...result,
  });
}
