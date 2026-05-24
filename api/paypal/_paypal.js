const PAYPAL_API_BASE = {
  sandbox: 'https://api-m.sandbox.paypal.com',
  live: 'https://api-m.paypal.com',
};

function getRequiredEnv(name, fallback) {
  const value = process.env[name] || fallback;

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function getPaypalConfig() {
  const clientId = getRequiredEnv('PAYPAL_CLIENT_ID', process.env.VITE_PAYPAL_CLIENT_ID);
  const clientSecret = getRequiredEnv('PAYPAL_CLIENT_SECRET');
  const env = process.env.PAYPAL_ENV === 'live' ? 'live' : 'sandbox';

  return {
    clientId,
    clientSecret,
    apiBase: PAYPAL_API_BASE[env],
    env,
  };
}

export async function getPaypalAccessToken() {
  const { clientId, clientSecret, apiBase } = getPaypalConfig();
  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch(`${apiBase}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const payload = await response.json();

  if (!response.ok || !payload.access_token) {
    throw new Error(payload.error_description || 'Unable to authenticate with PayPal.');
  }

  return {
    accessToken: payload.access_token,
    apiBase,
  };
}

export async function readJsonBody(req) {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }

  if (!req.body) {
    return {};
  }

  try {
    return JSON.parse(req.body);
  } catch {
    return {};
  }
}

export function sendJson(res, statusCode, payload) {
  res.status(statusCode).json(payload);
}

export async function createPaypalOrder() {
  const { accessToken, apiBase } = await getPaypalAccessToken();
  const response = await fetch(`${apiBase}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: '19.99',
          },
          description: 'Om Shanti Directory - Lifetime Membership',
        },
      ],
    }),
  });

  const payload = await response.json();

  if (!response.ok || !payload.id) {
    throw new Error(payload.message || 'Unable to create PayPal order.');
  }

  return payload;
}

export async function capturePaypalOrder(orderId) {
  if (!orderId) {
    throw new Error('Missing PayPal order ID.');
  }

  const { accessToken, apiBase } = await getPaypalAccessToken();
  const response = await fetch(`${apiBase}/v2/checkout/orders/${orderId}/capture`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
  });

  const payload = await response.json();

  if (!response.ok || payload.status !== 'COMPLETED') {
    throw new Error(payload.message || 'Unable to capture PayPal order.');
  }

  return payload;
}