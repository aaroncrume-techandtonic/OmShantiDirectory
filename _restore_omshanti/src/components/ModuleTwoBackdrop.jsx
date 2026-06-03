import { useState } from 'react';

export default function ModuleTwoBackdrop() {
  const [videoReady, setVideoReady] = useState(true);

  return (
    <>
      {videoReady && (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-35"
          autoPlay
          muted
          loop
          playsInline
          onError={() => setVideoReady(false)}
        >
          <source src="/videos/the-resonant-sanctuary.mp4" type="video/mp4" />
        </video>
      )}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 20% 20%, rgba(56,189,149,0.18), transparent 40%), radial-gradient(circle at 80% 70%, rgba(14,116,144,0.18), transparent 50%), linear-gradient(to bottom, rgba(0,0,0,0.38), rgba(0,0,0,0.82))',
        }}
      />
    </>
  );
}
