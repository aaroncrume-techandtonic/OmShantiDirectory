import { createPaypalOrder, savePaymentRecord, sendJson } from './_paypal.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method not allowed.' });
  }

  try {
    const order = await createPaypalOrder();
    await savePaymentRecord(order, 'create');
    const approveLink = order.links?.find((link) => link.rel === 'approve')?.href || null;
    const defaultApproveHost = process.env.PAYPAL_ENV === 'production'
      ? 'https://www.paypal.com/checkoutnow'
      : 'https://www.sandbox.paypal.com/checkoutnow';
    const approveUrl = approveLink || (order.id ? `${defaultApproveHost}?token=${order.id}` : null);
    return sendJson(res, 200, { id: order.id, status: order.status, approveUrl });
  } catch (error) {
    console.error('PayPal create order error:', error);
    return sendJson(res, 500, { error: error.message || 'Failed to create PayPal order.' });
  }
}