import { createPaypalOrder, readJsonBody, savePaymentRecord, sendJson } from './_paypal.js';
import { getCoupon, getDiscountedPrice, getSpecialOffer } from '../membership/_coupons.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method not allowed.' });
  }

  try {
    const body = await readJsonBody(req).catch(() => ({}));
    const specialOffer = getSpecialOffer(body?.offerId);
    const coupon = specialOffer ? null : getCoupon(body?.couponCode);
    const amount = specialOffer ? specialOffer.price : coupon ? getDiscountedPrice(coupon.percent) : undefined;
    const order = await createPaypalOrder(amount);
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