import assert from 'node:assert/strict';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

const testDbPath = path.join(os.tmpdir(), `omshanti-paypal-test-${Date.now()}-${process.pid}.db`);

process.env.PAYMENTS_STORE_FILE = testDbPath;
process.env.PAYPAL_DEBUG_TOKEN = 'test-debug-token';
process.env.PAYPAL_SKIP_WEBHOOK_SIGNATURE_VERIFY = 'true';
delete process.env.DATABASE_URL;
delete process.env.OMSHANTI_POSTGRES_URL;
delete process.env.OMSHANTI_DATABASE_URL;
delete process.env.OMSHANTI_PRISMA_DATABASE_URL;

const { default: webhookHandler } = await import('../api/paypal/webhook.js');
const { default: debugHandler } = await import('../api/paypal/debug.js');
const { default: failedHandler } = await import('../api/paypal/debug-failed.js');
const { default: failedSummaryHandler } = await import('../api/paypal/debug-failed-summary.js');
const { default: failedPurgeHandler } = await import('../api/paypal/debug-failed-purge.js');
const { default: requeueHandler } = await import('../api/paypal/debug-requeue.js');
const { default: requeueBatchHandler } = await import('../api/paypal/debug-requeue-batch.js');

function createReq({ method = 'GET', body = undefined, headers = {}, url = 'http://localhost' } = {}) {
  return {
    method,
    body,
    headers,
    url,
  };
}

function createRes() {
  return {
    statusCode: 200,
    headers: {},
    payload: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      this.payload = data;
      return this;
    },
    setHeader(name, value) {
      this.headers[name] = value;
    },
    end(raw) {
      this.payload = raw ? JSON.parse(raw) : null;
    },
  };
}

function trackedWebhookBody({ eventId, eventType = 'PAYMENT.CAPTURE.COMPLETED', orderId, captureId, status = 'COMPLETED' }) {
  return {
    id: eventId,
    event_type: eventType,
    resource: {
      id: captureId,
      status,
      amount: {
        currency_code: 'USD',
        value: '19.99',
      },
      supplementary_data: {
        related_ids: {
          order_id: orderId,
        },
      },
    },
  };
}

test('debug endpoints deny unauthorized access', async () => {
  const res = createRes();
  await debugHandler(createReq({ method: 'GET' }), res);
  assert.equal(res.statusCode, 403);
  assert.equal(res.payload?.error, 'Debug access denied.');
});

test('webhook processes tracked event, persists payment, and detects duplicate delivery', async () => {
  const eventId = `evt-success-${Date.now()}`;
  const orderId = `ORDER-${Date.now()}`;
  const captureId = `CAP-${Date.now()}`;

  const firstRes = createRes();
  await webhookHandler(
    createReq({
      method: 'POST',
      body: trackedWebhookBody({ eventId, orderId, captureId }),
      headers: {},
    }),
    firstRes,
  );

  assert.equal(firstRes.statusCode, 200);
  assert.equal(firstRes.payload?.received, true);
  assert.equal(firstRes.payload?.eventId, eventId);
  assert.equal(firstRes.payload?.orderId, orderId);
  assert.equal(firstRes.payload?.signatureVerificationSkipped, true);

  const secondRes = createRes();
  await webhookHandler(
    createReq({
      method: 'POST',
      body: trackedWebhookBody({ eventId, orderId, captureId }),
      headers: {},
    }),
    secondRes,
  );

  assert.equal(secondRes.statusCode, 200);
  assert.equal(secondRes.payload?.duplicate, true);
  assert.equal(secondRes.payload?.eventId, eventId);

  const debugRes = createRes();
  await debugHandler(
    createReq({
      method: 'GET',
      url: 'http://localhost/api/paypal/debug?limit=10',
      headers: { 'x-paypal-debug-token': 'test-debug-token' },
    }),
    debugRes,
  );

  assert.equal(debugRes.statusCode, 200);
  assert.equal(debugRes.payload?.ok, true);
  assert.ok(Array.isArray(debugRes.payload?.payments));
  assert.ok(debugRes.payload.payments.some((payment) => payment.orderId === orderId));
  assert.ok(Array.isArray(debugRes.payload?.webhookEvents));
  assert.ok(debugRes.payload.webhookEvents.some((event) => event.eventId === eventId));
});

test('webhook processes checkout order completed events from app-level webhook subscriptions', async () => {
  const eventId = `evt-checkout-${Date.now()}`;
  const orderId = `ORDER-CHECKOUT-${Date.now()}`;

  const res = createRes();
  await webhookHandler(
    createReq({
      method: 'POST',
      body: {
        id: eventId,
        event_type: 'CHECKOUT.ORDER.COMPLETED',
        resource: {
          id: orderId,
          status: 'COMPLETED',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: '19.99',
              },
            },
          ],
        },
      },
    }),
    res,
  );

  assert.equal(res.statusCode, 200);
  assert.equal(res.payload?.received, true);
  assert.equal(res.payload?.eventType, 'CHECKOUT.ORDER.COMPLETED');
  assert.equal(res.payload?.orderId, orderId);

  const debugRes = createRes();
  await debugHandler(
    createReq({
      method: 'GET',
      url: 'http://localhost/api/paypal/debug?limit=50',
      headers: { 'x-paypal-debug-token': 'test-debug-token' },
    }),
    debugRes,
  );

  assert.equal(debugRes.statusCode, 200);
  assert.ok(debugRes.payload?.payments.some((payment) => payment.orderId === orderId));
});

test('webhook marks tracked event failed when order id cannot be determined', async () => {
  const eventId = `evt-failed-${Date.now()}`;
  const res = createRes();

  await webhookHandler(
    createReq({
      method: 'POST',
      body: {
        id: eventId,
        event_type: 'PAYMENT.CAPTURE.COMPLETED',
        resource: {
          status: 'COMPLETED',
          amount: {
            currency_code: 'USD',
            value: '19.99',
          },
        },
      },
    }),
    res,
  );

  assert.equal(res.statusCode, 400);
  assert.match(String(res.payload?.error), /order ID/i);

  const failedRes = createRes();
  await failedHandler(
    createReq({
      method: 'GET',
      url: 'http://localhost/api/paypal/debug/failed?limit=20&offset=0',
      headers: { 'x-paypal-debug-token': 'test-debug-token' },
    }),
    failedRes,
  );

  assert.equal(failedRes.statusCode, 200);
  assert.equal(failedRes.payload?.ok, true);
  assert.ok(Array.isArray(failedRes.payload?.items));
  const failedEvent = failedRes.payload.items.find((item) => item.eventId === eventId);
  assert.ok(failedEvent);
  assert.equal(failedEvent.processingStatus, 'failed');
});

test('manual requeue endpoint updates failed event metadata and summary remains available', async () => {
  const eventId = `evt-requeue-${Date.now()}`;

  const failRes = createRes();
  await webhookHandler(
    createReq({
      method: 'POST',
      body: {
        id: eventId,
        event_type: 'PAYMENT.CAPTURE.COMPLETED',
        resource: {
          status: 'COMPLETED',
          amount: {
            currency_code: 'USD',
            value: '19.99',
          },
        },
      },
    }),
    failRes,
  );
  assert.equal(failRes.statusCode, 400);

  const requeueRes = createRes();
  await requeueHandler(
    createReq({
      method: 'POST',
      headers: { 'x-paypal-debug-token': 'test-debug-token' },
      body: { eventId },
    }),
    requeueRes,
  );

  assert.equal(requeueRes.statusCode, 200);
  assert.equal(requeueRes.payload?.ok, true);
  assert.equal(requeueRes.payload?.event?.eventId, eventId);
  assert.equal(requeueRes.payload?.event?.processingStatus, 'failed');
  assert.equal(requeueRes.payload?.event?.lastError, 'Manual requeue requested');

  const summaryRes = createRes();
  await failedSummaryHandler(
    createReq({
      method: 'GET',
      url: 'http://localhost/api/paypal/debug/failed-summary?limit=5',
      headers: { 'x-paypal-debug-token': 'test-debug-token' },
    }),
    summaryRes,
  );

  assert.equal(summaryRes.statusCode, 200);
  assert.equal(summaryRes.payload?.ok, true);
  assert.ok(Number.isInteger(summaryRes.payload?.totalFailed));
  assert.ok(Array.isArray(summaryRes.payload?.byEventType));
  assert.ok(Array.isArray(summaryRes.payload?.byError));
});

test('batch requeue updates multiple failed webhook events', async () => {
  const eventIdA = `evt-batch-a-${Date.now()}`;
  const eventIdB = `evt-batch-b-${Date.now()}`;

  for (const eventId of [eventIdA, eventIdB]) {
    const failRes = createRes();
    await webhookHandler(
      createReq({
        method: 'POST',
        body: {
          id: eventId,
          event_type: 'PAYMENT.CAPTURE.COMPLETED',
          resource: {
            status: 'COMPLETED',
            amount: {
              currency_code: 'USD',
              value: '19.99',
            },
          },
        },
      }),
      failRes,
    );
    assert.equal(failRes.statusCode, 400);
  }

  const reason = 'Batch requeue test reason';
  const batchRes = createRes();
  await requeueBatchHandler(
    createReq({
      method: 'POST',
      headers: { 'x-paypal-debug-token': 'test-debug-token' },
      body: { limit: 100, offset: 0, reason },
    }),
    batchRes,
  );

  assert.equal(batchRes.statusCode, 200);
  assert.equal(batchRes.payload?.ok, true);
  assert.ok(Array.isArray(batchRes.payload?.events));

  const requeuedA = batchRes.payload.events.find((event) => event.eventId === eventIdA);
  const requeuedB = batchRes.payload.events.find((event) => event.eventId === eventIdB);
  assert.ok(requeuedA);
  assert.ok(requeuedB);
  assert.equal(requeuedA.lastError, reason);
  assert.equal(requeuedB.lastError, reason);
});

test('failed purge supports dry run and delete modes', async () => {
  const purgeEventId = `evt-purge-${Date.now()}`;

  const failRes = createRes();
  await webhookHandler(
    createReq({
      method: 'POST',
      body: {
        id: purgeEventId,
        event_type: 'PAYMENT.CAPTURE.COMPLETED',
        resource: {
          status: 'COMPLETED',
          amount: {
            currency_code: 'USD',
            value: '19.99',
          },
        },
      },
    }),
    failRes,
  );
  assert.equal(failRes.statusCode, 400);

  const dryRunRes = createRes();
  await failedPurgeHandler(
    createReq({
      method: 'POST',
      headers: { 'x-paypal-debug-token': 'test-debug-token' },
      body: { olderThanDays: 0, dryRun: true, limit: 200 },
    }),
    dryRunRes,
  );

  assert.equal(dryRunRes.statusCode, 200);
  assert.equal(dryRunRes.payload?.ok, true);
  assert.equal(dryRunRes.payload?.dryRun, true);
  assert.ok(Number.isInteger(dryRunRes.payload?.candidateCount));

  const deleteRes = createRes();
  await failedPurgeHandler(
    createReq({
      method: 'POST',
      headers: { 'x-paypal-debug-token': 'test-debug-token' },
      body: { olderThanDays: 0, dryRun: false, limit: 200 },
    }),
    deleteRes,
  );

  assert.equal(deleteRes.statusCode, 200);
  assert.equal(deleteRes.payload?.ok, true);
  assert.equal(deleteRes.payload?.dryRun, false);
  assert.ok(Number.isInteger(deleteRes.payload?.deletedCount));

  const failedAfterRes = createRes();
  await failedHandler(
    createReq({
      method: 'GET',
      url: 'http://localhost/api/paypal/debug/failed?limit=200&offset=0',
      headers: { 'x-paypal-debug-token': 'test-debug-token' },
    }),
    failedAfterRes,
  );

  assert.equal(failedAfterRes.statusCode, 200);
  assert.equal(failedAfterRes.payload?.ok, true);
  assert.ok(Array.isArray(failedAfterRes.payload?.items));
  assert.equal(
    failedAfterRes.payload.items.some((item) => item.eventId === purgeEventId),
    false,
  );
});