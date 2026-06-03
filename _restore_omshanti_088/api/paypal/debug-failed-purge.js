import {
  isPaypalDebugAuthorized,
  purgeFailedWebhookEvents,
  readJsonBody,
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
  const olderThanDays = Number.parseInt(String(body?.olderThanDays ?? 30), 10);
  const limit = Number.parseInt(String(body?.limit ?? 500), 10);
  const dryRun = body?.dryRun !== false;
  const result = await purgeFailedWebhookEvents(olderThanDays, dryRun, limit);

  return sendJson(res, 200, {
    ok: true,
    ...result,
  });
}
