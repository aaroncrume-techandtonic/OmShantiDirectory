import {
  createMembershipSession,
  readJsonBody,
  sendJson,
  setMembershipCookie,
} from '../paypal/_paypal.js';

const COUPONS = {
  OMSHANTI100: { percent: 100 },
};

const normalizeCode = (code) => (code || '').trim().toUpperCase();

const getCoupon = (code) => {
  const normalized = normalizeCode(code);
  if (!normalized) {
    return null;
  }

  return COUPONS[normalized] ? { code: normalized, ...COUPONS[normalized] } : null;
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const url = req.url ? new URL(req.url, 'http://localhost') : null;
    const queryCode = req.query?.code || url?.searchParams.get('code');
    const coupon = getCoupon(queryCode);
    return sendJson(res, 200, { valid: Boolean(coupon), percent: coupon?.percent || 0 });
  }

  if (req.method === 'POST') {
    try {
      const body = await readJsonBody(req);
      const coupon = getCoupon(body.code);

      if (!coupon || coupon.percent !== 100) {
        return sendJson(res, 400, { error: 'Invalid coupon.' });
      }

      const sessionToken = createMembershipSession({
        orderId: `coupon-${coupon.code}-${Date.now()}`,
        payerId: null,
        payerEmail: null,
        status: 'COUPON',
      });

      setMembershipCookie(res, sessionToken);
      return sendJson(res, 200, { active: true, percent: coupon.percent });
    } catch (error) {
      console.error('Coupon redemption error:', error);
      return sendJson(res, 500, { error: error.message || 'Failed to redeem coupon.' });
    }
  }

  return sendJson(res, 405, { error: 'Method not allowed.' });
}
