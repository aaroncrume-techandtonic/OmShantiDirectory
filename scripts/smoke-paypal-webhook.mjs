import process from 'node:process';

function resolveBaseUrl() {
  const fromEnv = (process.env.TUNNEL_BASE_URL || process.env.PAYPAL_SMOKE_BASE_URL || '').trim();
  const fromArg = process.argv[2] ? String(process.argv[2]).trim() : '';
  const value = fromArg || fromEnv;

  if (!value) {
    throw new Error('Missing base URL. Set TUNNEL_BASE_URL or pass it as the first argument.');
  }

  if (!/^https?:\/\//i.test(value)) {
    throw new Error(`Base URL must start with http:// or https://. Received: ${value}`);
  }

  return value.replace(/\/+$/, '');
}

async function postJson(url, body, headers = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'bypass-tunnel-reminder': '1',
      ...headers,
    },
    body: JSON.stringify(body),
  });

  const text = await response.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    // keep raw text for errors
  }

  return { response, text, json };
}

async function getJson(url, headers = {}) {
  const response = await fetch(url, {
    headers: {
      'bypass-tunnel-reminder': '1',
      ...headers,
    },
  });
  const text = await response.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    // keep raw text for errors
  }

  return { response, text, json };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const baseUrl = resolveBaseUrl();
  const debugToken = process.env.PAYPAL_DEBUG_TOKEN || 'smoke-test-token';

  const now = new Date();
  const stamp = now.toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
  const suffix = Math.random().toString(36).slice(2, 10);
  const eventId = `WH-SMOKE-${stamp}-${suffix}`;
  const orderId = `ORDER-SMOKE-${stamp}`;

  const payload = {
    id: eventId,
    event_type: 'CHECKOUT.ORDER.COMPLETED',
    create_time: now.toISOString(),
    resource: {
      id: orderId,
      status: 'COMPLETED',
      amount: {
        currency_code: 'USD',
        value: '49.00',
      },
    },
  };

  console.log(`[smoke] Base URL: ${baseUrl}`);
  console.log(`[smoke] Event ID: ${eventId}`);

  const webhookResult = await postJson(`${baseUrl}/api/paypal/webhook`, payload);
  if (!webhookResult.response.ok || !webhookResult.json?.received) {
    throw new Error(
      `[smoke] Webhook failed: status=${webhookResult.response.status} contentType=${webhookResult.response.headers.get('content-type') || 'unknown'} body=${webhookResult.text}`,
    );
  }

  console.log(`[smoke] Webhook response: ${JSON.stringify(webhookResult.json)}`);

  await sleep(700);

  const debugResult = await getJson(`${baseUrl}/api/paypal/debug?limit=50`, {
    'x-paypal-debug-token': debugToken,
  });

  if (!debugResult.response.ok || !debugResult.json?.ok) {
    throw new Error(
      `[smoke] Debug lookup failed: status=${debugResult.response.status} contentType=${debugResult.response.headers.get('content-type') || 'unknown'} body=${debugResult.text}`,
    );
  }

  const matches = (debugResult.json.webhookEvents || []).filter((item) => item.eventId === eventId);
  if (matches.length === 0) {
    throw new Error('[smoke] Event not found in debug webhookEvents list.');
  }

  const first = matches[0];
  if (first.processingStatus !== 'processed') {
    throw new Error(
      `[smoke] Event found but not processed: processingStatus=${first.processingStatus}`,
    );
  }

  console.log(
    `[smoke] Verified processed event. eventId=${eventId} orderId=${first.orderId || orderId}`,
  );
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
