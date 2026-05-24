import { createPaypalOrder, savePaymentRecord, sendJson } from './_paypal.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method not allowed.' });
  }

  try {
    const order = await createPaypalOrder();
    savePaymentRecord(order, 'create');
    return sendJson(res, 200, { id: order.id, status: order.status });
  } catch (error) {
    console.error('PayPal create order error:', error);
    return sendJson(res, 500, { error: error.message || 'Failed to create PayPal order.' });
  }
}