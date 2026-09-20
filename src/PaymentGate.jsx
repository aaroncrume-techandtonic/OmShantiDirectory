import { useCallback, useEffect, useState } from 'react';
import { Heart, Lock, Check } from 'lucide-react';

export default function PaymentGate({ onPurchaseComplete }) {
  const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [couponPercent, setCouponPercent] = useState(0);
  const [couponEmail, setCouponEmail] = useState('');
  const [couponError, setCouponError] = useState('');
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [redeemedInfo, setRedeemedInfo] = useState(null);
  const [mode, setMode] = useState('purchase');
  const [loginOrderId, setLoginOrderId] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showDeclineOffer, setShowDeclineOffer] = useState(false);
  const [isOfferProcessing, setIsOfferProcessing] = useState(false);
  const [offerError, setOfferError] = useState('');
  const configError = !paypalClientId
    ? 'PayPal is not configured. Add VITE_PAYPAL_CLIENT_ID to your environment.'
    : '';
  const basePrice = 19.99;
  const adjustedPrice = Math.max(0, basePrice * (1 - couponPercent / 100));

  const initializePayPalButtons = useCallback(() => {
    const container = document.getElementById('paypal-button-container');
    if (!container || container.dataset.paypalRendered === 'true' || !window.paypal) {
      return;
    }

    if (couponPercent >= 100) {
      return;
    }

    container.dataset.paypalRendered = 'true';

    window.paypal
      .Buttons({
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'pill',
          label: 'paypal',
        },
        createOrder: async () => {
          setError('');

          const response = await fetch('/api/paypal/create-order', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ couponCode: couponCode.trim() }),
          });

          const data = await response.json();

          if (!response.ok || !data.id) {
            throw new Error(data.error || 'Failed to create PayPal order.');
          }

          return data.id;
        },
        onApprove: async (data) => {
          setIsProcessing(true);
          setError('');

          try {
            const response = await fetch('/api/paypal/capture-order', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ orderId: data.orderID }),
            });

            const payload = await response.json();

            if (!response.ok || !payload.order) {
              throw new Error(payload.error || 'Failed to verify PayPal payment.');
            }

            const order = payload.order;
            console.log('Order captured:', order);

            const purchaseData = {
              purchaseDate: new Date().toISOString(),
              orderId: order.id,
              status: 'completed',
              amount: adjustedPrice,
            };
            localStorage.setItem('omShantiMembership', JSON.stringify(purchaseData));
            onPurchaseComplete(purchaseData);
          } catch (err) {
            console.error('Error capturing order:', err);
            setError(err.message || 'Payment processing failed. Please try again.');
            setIsProcessing(false);
          }
        },
        onError: (err) => {
          console.error('PayPal error:', err);
          setError('An error occurred with PayPal. Please try again.');
          setIsProcessing(false);
        },
        onCancel: () => {
          console.log('Payment cancelled');
          setError('You cancelled the payment. Try again whenever you\'re ready.');
        },
      })
      .render('#paypal-button-container')
      .catch((err) => {
        container.dataset.paypalRendered = 'false';
        console.error('Error rendering PayPal buttons:', err);
        setError('Failed to load PayPal. Please refresh the page.');
      });
  }, [basePrice, couponPercent, onPurchaseComplete]);

  const initializePayPalOfferButtons = useCallback(() => {
    const container = document.getElementById('paypal-offer-button-container');
    if (!container || container.dataset.paypalRendered === 'true' || !window.paypal) {
      return;
    }

    container.dataset.paypalRendered = 'true';

    window.paypal
      .Buttons({
        style: {
          layout: 'vertical',
          color: 'blue',
          shape: 'pill',
          label: 'paypal',
        },
        createOrder: async () => {
          setOfferError('');

          const response = await fetch('/api/paypal/create-order', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ offerId: 'new-aura' }),
          });

          const data = await response.json();

          if (!response.ok || !data.id) {
            throw new Error(data.error || 'Failed to create PayPal order.');
          }

          return data.id;
        },
        onApprove: async (data) => {
          setIsOfferProcessing(true);
          setOfferError('');

          try {
            const response = await fetch('/api/paypal/capture-order', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ orderId: data.orderID }),
            });

            const payload = await response.json();

            if (!response.ok || !payload.order) {
              throw new Error(payload.error || 'Failed to verify PayPal payment.');
            }

            const order = payload.order;

            const purchaseData = {
              purchaseDate: new Date().toISOString(),
              orderId: order.id,
              status: 'completed',
              amount: 4.99,
              offer: 'new-aura',
            };
            localStorage.setItem('omShantiMembership', JSON.stringify(purchaseData));
            onPurchaseComplete(purchaseData);
          } catch (err) {
            console.error('Error capturing offer order:', err);
            setOfferError(err.message || 'Payment processing failed. Please try again.');
            setIsOfferProcessing(false);
          }
        },
        onError: (err) => {
          console.error('PayPal offer error:', err);
          setOfferError('An error occurred with PayPal. Please try again.');
          setIsOfferProcessing(false);
        },
        onCancel: () => {
          setOfferError('You cancelled the payment. Try again whenever you\'re ready.');
        },
      })
      .render('#paypal-offer-button-container')
      .catch((err) => {
        container.dataset.paypalRendered = 'false';
        console.error('Error rendering PayPal offer buttons:', err);
        setOfferError('Failed to load PayPal. Please refresh the page.');
      });
  }, [onPurchaseComplete]);

  const handleApplyCoupon = async () => {
    setCouponError('');
    setError('');

    const trimmed = couponCode.trim();
    if (!trimmed) {
      setCouponError('Enter a coupon code first.');
      return;
    }

    try {
      const response = await fetch(`/api/membership/coupon?code=${encodeURIComponent(trimmed)}`);
      const payload = await response.json();

      if (!response.ok || !payload.valid) {
        throw new Error(payload.error || 'Invalid coupon code.');
      }

      setCouponPercent(Number(payload.percent) || 0);
    } catch (err) {
      setCouponPercent(0);
      setCouponError(err.message || 'Invalid coupon code.');
    }
  };

  const handleRedeemCoupon = async () => {
    setCouponError('');
    setError('');

    const trimmedEmail = couponEmail.trim();
    if (!trimmedEmail) {
      setCouponError('Enter your email so you can restore access on another device later.');
      return;
    }

    setIsRedeeming(true);

    try {
      const response = await fetch('/api/membership/coupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode.trim(), email: trimmedEmail }),
      });
      const payload = await response.json();

      if (!response.ok || !payload.active) {
        throw new Error(payload.error || 'Failed to redeem coupon.');
      }

      const purchaseData = {
        purchaseDate: new Date().toISOString(),
        orderId: payload.orderId,
        status: 'completed',
        amount: 0,
        coupon: couponCode.trim().toUpperCase(),
      };
      localStorage.setItem('omShantiMembership', JSON.stringify(purchaseData));
      setRedeemedInfo({ orderId: payload.orderId, email: trimmedEmail, purchaseData });
    } catch (err) {
      setCouponError(err.message || 'Failed to redeem coupon.');
    } finally {
      setIsRedeeming(false);
    }
  };

  const handleLogin = async () => {
    setLoginError('');
    setError('');

    const trimmedOrderId = loginOrderId.trim();
    const trimmedEmail = loginEmail.trim();

    if (!trimmedOrderId || !trimmedEmail) {
      setLoginError('Enter both your order ID and the email used at checkout.');
      return;
    }

    setIsLoggingIn(true);

    try {
      const response = await fetch('/api/membership/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: trimmedOrderId, email: trimmedEmail }),
      });
      const payload = await response.json();

      if (!response.ok || !payload.active) {
        throw new Error(payload.error || 'No matching membership found.');
      }

      const purchaseData = {
        purchaseDate: new Date().toISOString(),
        orderId: trimmedOrderId,
        status: 'completed',
      };
      localStorage.setItem('omShantiMembership', JSON.stringify(purchaseData));
      onPurchaseComplete(purchaseData);
    } catch (err) {
      setLoginError(err.message || 'No matching membership found.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  useEffect(() => {
    if (!paypalClientId) {
      return;
    }

    if (couponPercent >= 100) {
      return;
    }

    const container = document.getElementById('paypal-button-container');
    if (!container) {
      return;
    }

    container.dataset.paypalRendered = 'false';

    const handleLoad = () => {
      initializePayPalButtons();
    };

    const handleError = () => {
      setError('Failed to load PayPal. Check VITE_PAYPAL_CLIENT_ID and refresh the page.');
    };

    if (window.paypal) {
      handleLoad();
      return;
    }

    let script = document.querySelector('script[data-paypal-sdk="true"]');

    if (!script) {
      script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${paypalClientId}&components=buttons&currency=USD&intent=capture`;
      script.async = true;
      script.dataset.paypalSdk = 'true';
      document.body.appendChild(script);
    }

    script.addEventListener('load', handleLoad);
    script.addEventListener('error', handleError);

    return () => {
      script.removeEventListener('load', handleLoad);
      script.removeEventListener('error', handleError);
    };
  }, [paypalClientId, initializePayPalButtons, couponPercent]);

  useEffect(() => {
    if (!paypalClientId || !showDeclineOffer) {
      return;
    }

    const container = document.getElementById('paypal-offer-button-container');
    if (!container) {
      return;
    }

    container.dataset.paypalRendered = 'false';

    if (window.paypal) {
      initializePayPalOfferButtons();
      return;
    }

    const script = document.querySelector('script[data-paypal-sdk="true"]');
    if (!script) {
      return;
    }

    const handleLoad = () => initializePayPalOfferButtons();
    script.addEventListener('load', handleLoad);

    return () => {
      script.removeEventListener('load', handleLoad);
    };
  }, [paypalClientId, showDeclineOffer, initializePayPalOfferButtons]);

  if (redeemedInfo) {
    return (
      <div id="join" className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950/30 to-slate-950 flex items-center justify-center p-4">
        <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950"></div>

        <div className="relative z-10 max-w-md w-full bg-slate-900/60 backdrop-blur-xl border border-emerald-500/30 rounded-2xl overflow-hidden shadow-2xl p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-emerald-500/10 rounded-full">
              <Check size={40} className="text-emerald-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-100 mb-3">Membership Unlocked!</h2>
          <p className="text-slate-400 text-sm mb-6 leading-relaxed">
            Save this information &mdash; you&apos;ll need it to restore access if you switch devices or clear your browser.
          </p>
          <div className="bg-slate-800/70 border border-slate-700 rounded-lg p-4 mb-6 text-left space-y-3">
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500">Order ID</p>
              <p className="font-mono text-sm text-slate-100 break-all">{redeemedInfo.orderId}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500">Email</p>
              <p className="font-mono text-sm text-slate-100 break-all">{redeemedInfo.email}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onPurchaseComplete(redeemedInfo.purchaseData)}
            className="w-full rounded-md border border-emerald-400/40 bg-emerald-500/20 px-4 py-3 text-xs uppercase tracking-widest text-emerald-100 hover:bg-emerald-500/30"
          >
            Continue to Om Shanti
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="join" className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950/30 to-slate-950 flex items-center justify-center p-4">
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950"></div>

      <div className="relative z-10 max-w-md w-full bg-slate-900/60 backdrop-blur-xl border border-indigo-500/30 rounded-2xl overflow-hidden shadow-2xl">
        <div className="relative bg-gradient-to-r from-indigo-600/40 to-purple-600/40 border-b border-indigo-500/20 px-8 py-12 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.2),_transparent_70%)]"></div>
          <div className="relative">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-indigo-500/20 rounded-full">
                <Heart size={32} className="text-indigo-400" fill="currentColor" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-slate-100 mb-2">Om Shanti</h1>
            <p className="text-indigo-300 text-sm">Mystical & Psychological Knowledge</p>
          </div>
        </div>

        <div className="px-8 py-10">
          <div className="grid grid-cols-2 gap-2 mb-8 rounded-lg bg-slate-800/50 border border-slate-700/50 p-1">
            <button
              type="button"
              onClick={() => setMode('purchase')}
              className={`rounded-md px-4 py-3 text-xs uppercase tracking-widest transition-colors ${
                mode === 'purchase' ? 'bg-indigo-500/30 text-indigo-100' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              New Member
            </button>
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`rounded-md px-4 py-3 text-xs uppercase tracking-widest transition-colors ${
                mode === 'login' ? 'bg-indigo-500/30 text-indigo-100' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Returning Member
            </button>
          </div>

          <div className="flex justify-center mb-8">
            <div className="p-4 bg-indigo-500/10 rounded-full">
              <Lock size={40} className="text-indigo-400" />
            </div>
          </div>

          {mode === 'login' ? (
            <>
              <h2 className="text-2xl font-bold text-slate-100 text-center mb-3">
                Welcome Back
              </h2>
              <p className="text-slate-400 text-center mb-8 text-sm leading-relaxed">
                Restore access to your existing membership using your order ID and the email used at checkout.
              </p>

              <div className="space-y-4 mb-6 text-left">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2">
                    Order ID
                  </label>
                  <input
                    type="text"
                    value={loginOrderId}
                    onChange={(event) => setLoginOrderId(event.target.value)}
                    placeholder="From your PayPal receipt or coupon confirmation"
                    className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 focus:border-indigo-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2">
                    Email Used At Checkout
                  </label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(event) => setLoginEmail(event.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 focus:border-indigo-400 focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleLogin}
                  disabled={isLoggingIn}
                  className="w-full rounded-md border border-indigo-500/40 bg-indigo-500/20 px-4 py-3 text-xs uppercase tracking-widest text-indigo-100 hover:bg-indigo-500/30 disabled:opacity-60"
                >
                  {isLoggingIn ? 'Checking...' : 'Restore Access'}
                </button>
              </div>

              {(loginError || error) && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-6">
                  <p className="text-red-300 text-sm text-center">{loginError || error}</p>
                </div>
              )}
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-slate-100 text-center mb-3">
                Unlock Full Access
              </h2>
              <p className="text-slate-400 text-center mb-8 text-sm leading-relaxed">
                You've completed your free preview. Continue with lifetime access to all 100 knowledge infusions bridging ancient mystical paradigms with modern neuroscience.
              </p>

              <div className="space-y-4 mb-8 bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
                <div className="flex items-start gap-3">
                  <Check size={20} className="text-indigo-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300 text-sm">
                    <strong>100 Knowledge Infusions</strong> - complete directory
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Check size={20} className="text-indigo-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300 text-sm">
                    <strong>Lifetime Access</strong> - one-time payment
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Check size={20} className="text-indigo-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300 text-sm">
                    <strong>Full Search & Filtering</strong> - explore by category
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Check size={20} className="text-indigo-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300 text-sm">
                    <strong>Deep Learning Modals</strong> - scripts, practices, origins
                  </span>
                </div>
              </div>

              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-slate-100 mb-2">
                  ${adjustedPrice.toFixed(2)}
                </div>
                {couponPercent > 0 && (
                  <p className="text-emerald-300 text-xs uppercase tracking-[0.2em]">
                    Coupon applied: {couponPercent}% off
                  </p>
                )}
                <p className="text-slate-400 text-sm">One-time lifetime membership</p>
              </div>

              <div className="mb-6">
                <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2">
                  Access Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(event) => setCouponCode(event.target.value)}
                    placeholder="Enter free or discount code"
                    className="flex-1 rounded-md border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 focus:border-indigo-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="rounded-md border border-indigo-500/40 bg-indigo-500/20 px-4 text-xs uppercase tracking-widest text-indigo-100 hover:bg-indigo-500/30"
                  >
                    Apply
                  </button>
                </div>
                {couponPercent >= 100 && (
                  <div className="mt-3 space-y-3">
                    <input
                      type="email"
                      value={couponEmail}
                      onChange={(event) => setCouponEmail(event.target.value)}
                      placeholder="Email (needed to restore access later)"
                      className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 focus:border-indigo-400 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleRedeemCoupon}
                      disabled={isRedeeming}
                      className="w-full rounded-md border border-emerald-400/40 bg-emerald-500/20 px-4 py-2 text-xs uppercase tracking-widest text-emerald-100 hover:bg-emerald-500/30 disabled:opacity-60"
                    >
                      {isRedeeming ? 'Unlocking...' : 'Unlock with coupon'}
                    </button>
                  </div>
                )}
              </div>

              {couponPercent < 100 && (
                <div className="mb-6">
                  <div id="paypal-button-container" className="[&>div]:first-child:rounded-lg"></div>
                </div>
              )}

              {(error || configError || couponError) && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-6">
                  <p className="text-red-300 text-sm text-center">{error || configError || couponError}</p>
                </div>
              )}

              {couponPercent < 100 && !showDeclineOffer && (
                <button
                  type="button"
                  onClick={() => setShowDeclineOffer(true)}
                  className="w-full text-center text-xs uppercase tracking-widest text-slate-500 hover:text-slate-300 mb-6"
                >
                  Not ready? See a smaller offer
                </button>
              )}

              {couponPercent < 100 && showDeclineOffer && (
                <div className="mb-6 rounded-lg border border-purple-400/30 bg-purple-500/10 p-5 text-center">
                  <p className="text-xs uppercase tracking-[0.2em] text-purple-300">Cosmic Offer</p>
                  <h3 className="text-xl font-bold text-slate-100 mt-1 mb-1">New Aura</h3>
                  <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                    A lighter first step across the threshold &mdash; the same lifetime access, for a one-time $4.99.
                  </p>
                  <div className="text-3xl font-bold text-slate-100 mb-4">$4.99</div>
                  <div id="paypal-offer-button-container" className="mb-3"></div>
                  {offerError && <p className="text-red-300 text-xs mb-2">{offerError}</p>}
                  {isOfferProcessing && (
                    <p className="text-purple-200 text-xs mb-2">Processing your payment...</p>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowDeclineOffer(false)}
                    className="text-xs uppercase tracking-widest text-slate-500 hover:text-slate-300"
                  >
                    No thanks, back to full offer
                  </button>
                </div>
              )}

              {isProcessing && (
                <div className="text-center text-indigo-300 text-sm">
                  <div className="inline-flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                    Processing your payment...
                  </div>
                </div>
              )}

              <p className="text-slate-500 text-xs text-center mt-8">
                Secure payment powered by PayPal. Your information is encrypted and protected.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
