export const BASE_PRICE = 19.99;

export const COUPONS = {
  OMSHANTI100: { percent: 100 },
  OMSHANTI75: { percent: 75 },
  OMSHANTI50: { percent: 50 },
  OMSHANTI25: { percent: 25 },
  KOLETAN: { percent: 100 },
};

export function normalizeCouponCode(code) {
  return (code || '').trim().toUpperCase();
}

export function getCoupon(code) {
  const normalized = normalizeCouponCode(code);
  if (!normalized) {
    return null;
  }

  return COUPONS[normalized] ? { code: normalized, ...COUPONS[normalized] } : null;
}

export function getDiscountedPrice(percent) {
  return Math.max(0, Number((BASE_PRICE * (1 - percent / 100)).toFixed(2)));
}

export const SPECIAL_OFFERS = {
  'new-aura': { price: 4.99, label: 'Cosmic Offer of New Aura' },
};

export function getSpecialOffer(offerId) {
  const normalized = (offerId || '').trim().toLowerCase();
  if (!normalized || !SPECIAL_OFFERS[normalized]) {
    return null;
  }

  return { id: normalized, ...SPECIAL_OFFERS[normalized] };
}
