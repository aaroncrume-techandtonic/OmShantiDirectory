import { useCallback, useEffect, useState } from 'react';
import { Heart, Lock, Check } from 'lucide-react';

export default function PaymentGate({ onPurchaseComplete }) {
  const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [couponPercent, setCouponPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [isRedeeming, setIsRedeeming] = useState(false);
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
              amount: basePrice,
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
    setIsRedeeming(true);

    try {
      const response = await fetch('/api/membership/coupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode.trim() }),
      });
      const payload = await response.json();

      if (!response.ok || !payload.active) {
        throw new Error(payload.error || 'Failed to redeem coupon.');
      }

      const purchaseData = {
        purchaseDate: new Date().toISOString(),
        orderId: `coupon-${couponCode.trim().toUpperCase()}`,
        status: 'completed',
        amount: 0,
        coupon: couponCode.trim().toUpperCase(),
      };
      localStorage.setItem('omShantiMembership', JSON.stringify(purchaseData));
      onPurchaseComplete(purchaseData);
    } catch (err) {
      setCouponError(err.message || 'Failed to redeem coupon.');
      setIsRedeeming(false);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950/30 to-slate-950 flex items-center justify-center p-4">
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
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-indigo-500/10 rounded-full">
              <Lock size={40} className="text-indigo-400" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-100 text-center mb-3">
            Unlock Full Access
          </h2>
          <p className="text-slate-400 text-center mb-8 text-sm leading-relaxed">
            Gain lifetime access to all 28 knowledge infusions bridging ancient mystical paradigms with modern neuroscience.
          </p>

          <div className="space-y-4 mb-8 bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
            <div className="flex items-start gap-3">
              <Check size={20} className="text-indigo-400 mt-0.5 flex-shrink-0" />
              <span className="text-slate-300 text-sm">
                <strong>28 Knowledge Infusions</strong> - complete directory
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
              <button
                type="button"
                onClick={handleRedeemCoupon}
                disabled={isRedeeming}
                className="mt-3 w-full rounded-md border border-emerald-400/40 bg-emerald-500/20 px-4 py-2 text-xs uppercase tracking-widest text-emerald-100 hover:bg-emerald-500/30 disabled:opacity-60"
              >
                {isRedeeming ? 'Unlocking...' : 'Unlock with coupon'}
              </button>
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
        </div>
      </div>
    </div>
  );
}
