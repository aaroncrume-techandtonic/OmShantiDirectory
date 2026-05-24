import { useState } from 'react';

export default function ModuleThreeBackdrop() {
  const [videoReady, setVideoReady] = useState(true);

  return (
    <>
      {videoReady && (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-30"
          autoPlay
          muted
          loop
          playsInline
          onError={() => setVideoReady(false)}
        >
          <source src="/videos/the-earthing-mirror.mp4" type="video/mp4" />
        </video>
      )}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 25% 20%, rgba(217,119,6,0.16), transparent 42%), radial-gradient(circle at 75% 75%, rgba(120,53,15,0.2), transparent 48%), linear-gradient(to bottom, rgba(0,0,0,0.42), rgba(0,0,0,0.84))',
        }}
      />
    </>
  );
}
