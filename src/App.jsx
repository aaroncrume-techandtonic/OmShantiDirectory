import { useEffect, useState } from 'react';
import OmShantiExperience from './OmShantiExperience.jsx';
import PaymentGate from './PaymentGate.jsx';

export default function App() {
  const [membershipState, setMembershipState] = useState({
    status: 'checking',
    active: false,
    error: '',
  });

  useEffect(() => {
    let isMounted = true;

    const checkMembership = async () => {
      try {
        const response = await fetch('/api/membership/session');
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload.error || 'Failed to read membership session.');
        }

        if (isMounted) {
          setMembershipState({
            status: 'ready',
            active: Boolean(payload.active),
            error: '',
          });
        }
      } catch (error) {
        if (isMounted) {
          setMembershipState({
            status: 'ready',
            active: false,
            error: error?.message || 'Failed to read membership session.',
          });
        }
      }
    };

    checkMembership();

    return () => {
      isMounted = false;
    };
  }, []);

  const handlePurchaseComplete = () => {
    setMembershipState({ status: 'ready', active: true, error: '' });
  };

  if (membershipState.status === 'checking') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        Checking membership...
      </div>
    );
  }

  if (!membershipState.active) {
    return <PaymentGate onPurchaseComplete={handlePurchaseComplete} />;
  }

  return <OmShantiExperience />;
}
