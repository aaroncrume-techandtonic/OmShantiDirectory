import {
  clearMembershipCookie,
  parseCookies,
  sendJson,
  verifyMembershipSession,
} from '../paypal/_paypal.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const cookies = parseCookies(req);
      const token = cookies.om_shanti_membership;
      const session = verifyMembershipSession(token);

      if (!session) {
        return sendJson(res, 200, { active: false });
      }

      return sendJson(res, 200, {
        active: true,
        membership: {
          orderId: session.orderId || null,
          payerEmail: session.payerEmail || null,
          status: session.status || 'COMPLETED',
        },
      });
    } catch (error) {
      console.error('Membership session read error:', error);
      return sendJson(res, 500, { error: 'Failed to read membership session.' });
    }
  }

  if (req.method === 'DELETE') {
    clearMembershipCookie(res);
    return sendJson(res, 200, { active: false });
  }

  return sendJson(res, 405, { error: 'Method not allowed.' });
}