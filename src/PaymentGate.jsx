import React, { useEffect, useState } from 'react';
import { Heart, Lock, Check } from 'lucide-react';

export default function PaymentGate({ onPurchaseComplete }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Initialize PayPal buttons when component mounts
    if (window.paypal) {
      initializePayPalButtons();
    }
  }, []);

  const initializePayPalButtons = () => {
    window.paypal
      .Buttons({
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'pill',
          label: 'subscribe',
        },
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: 'USD',
                  value: '19.99',
                },
                description: 'Om Shanti Directory - Lifetime Membership',
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          setIsProcessing(true);
          try {
            const order = await actions.order.capture();
            console.log('Order captured:', order);

            // Store purchase info in localStorage
            const purchaseData = {
              purchaseDate: new Date().toISOString(),
              orderId: order.id,
              status: 'completed',
              amount: 19.99,
            };
            localStorage.setItem('omShantiMembership', JSON.stringify(purchaseData));

            // Notify parent that purchase is complete
            onPurchaseComplete();
          } catch (err) {
            console.error('Error capturing order:', err);
            setError('Payment processing failed. Please try again.');
            setIsProcessing(false);
          }
        },
        onError: (err) => {
          console.error('PayPal error:', err);
          setError('An error occurred with PayPal. Please try again.');
          setIsProcessing(false);
        },
        onCancel: (data) => {
          console.log('Payment cancelled');
          setError('You cancelled the payment. Try again whenever you\'re ready.');
        },
      })
      .render('#paypal-button-container')
      .catch((err) => {
        console.error('Error rendering PayPal buttons:', err);
        setError('Failed to load PayPal. Please refresh the page.');
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950/30 to-slate-950 flex items-center justify-center p-4">
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950"></div>

      <div className="relative z-10 max-w-md w-full bg-slate-900/60 backdrop-blur-xl border border-indigo-500/30 rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
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

        {/* Content */}
        <div className="px-8 py-10">
          {/* Lock Icon */}
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-indigo-500/10 rounded-full">
              <Lock size={40} className="text-indigo-400" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-slate-100 text-center mb-3">
            Unlock Full Access
          </h2>
          <p className="text-slate-400 text-center mb-8 text-sm leading-relaxed">
            Gain lifetime access to all 28 knowledge infusions bridging ancient mystical paradigms with modern neuroscience.
          </p>

          {/* Features */}
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

          {/* Price */}
          <div className="text-center mb-8">
            <div className="text-4xl font-bold text-slate-100 mb-2">
              $19.99
            </div>
            <p className="text-slate-400 text-sm">One-time lifetime membership</p>
          </div>

          {/* PayPal Button Container */}
          <div className="mb-6">
            <div id="paypal-button-container" className="[&>div]:first-child:rounded-lg"></div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-6">
              <p className="text-red-300 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Processing State */}
          {isProcessing && (
            <div className="text-center text-indigo-300 text-sm">
              <div className="inline-flex items-center gap-2">
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                Processing your payment...
              </div>
            </div>
          )}

          {/* Footer */}
          <p className="text-slate-500 text-xs text-center mt-8">
            Secure payment powered by PayPal. Your information is encrypted and protected.
          </p>
        </div>
      </div>
    </div>
  );
}
