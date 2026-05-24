import {
  capturePaypalOrder,
  readJsonBody,
  sendJson,
} from './_paypal.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method not allowed.' });
  }

  try {
    const body = await readJsonBody(req);
    const order = await capturePaypalOrder(body.orderId);
    return sendJson(res, 200, { order });
  } catch (error) {
    console.error('PayPal capture order error:', error);
    return sendJson(res, 500, { error: error.message || 'Failed to capture PayPal order.' });
  }
}