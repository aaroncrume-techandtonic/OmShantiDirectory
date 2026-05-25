import {
  capturePaypalOrder,
  createMembershipSession,
  savePaymentRecord,
  readJsonBody,
  setMembershipCookie,
  sendJson,
} from './_paypal.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method not allowed.' });
  }

  try {
    const body = await readJsonBody(req);
    const order = await capturePaypalOrder(body.orderId);
    const record = await savePaymentRecord(order, 'capture');
    const sessionToken = createMembershipSession({
      orderId: record.orderId,
      payerId: record.payerId,
      payerEmail: record.payerEmail,
      status: record.status,
    });
    setMembershipCookie(res, sessionToken);
    return sendJson(res, 200, { order });
  } catch (error) {
    console.error('PayPal capture order error:', error);
    return sendJson(res, 500, { error: error.message || 'Failed to capture PayPal order.' });
  }
}