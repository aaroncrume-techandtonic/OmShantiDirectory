import { useEffect, useState } from 'react';
import OmShantiExperience from './OmShantiExperience.jsx';
import PaymentGate from './PaymentGate.jsx';
import LandingPage from './LandingPage.jsx';
import ShareBar from './components/ShareBar.jsx';

const FREE_PREVIEW_MODULE_LIMIT = 2;

export default function App() {
  const [membershipState, setMembershipState] = useState({
    status: 'checking',
    active: false,
    error: '',
  });
  const [previewStarted, setPreviewStarted] = useState(false);
  const [previewLimitReached, setPreviewLimitReached] = useState(false);

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
    setPreviewLimitReached(false);
  };

  if (membershipState.status === 'checking') {
    return (
      <>
        <ShareBar />
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
          Checking membership...
        </div>
      </>
    );
  }

  if (membershipState.active) {
    return (
      <>
        <ShareBar />
        <OmShantiExperience />
      </>
    );
  }

  if (!previewStarted) {
    return (
      <>
        <ShareBar />
        <LandingPage onBegin={() => setPreviewStarted(true)} />
      </>
    );
  }

  if (previewLimitReached) {
    return (
      <>
        <ShareBar />
        <PaymentGate onPurchaseComplete={handlePurchaseComplete} />
      </>
    );
  }

  return (
    <>
      <ShareBar />
      <OmShantiExperience
        isMember={false}
        previewLimit={FREE_PREVIEW_MODULE_LIMIT}
        onPreviewLimitReached={() => setPreviewLimitReached(true)}
      />
    </>
  );
}
