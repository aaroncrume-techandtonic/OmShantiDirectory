import { useState } from 'react';

export default function ModuleFourBackdrop() {
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
          <source src="/videos/the-silent-clearing.mp4" type="video/mp4" />
        </video>
      )}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 22% 24%, rgba(139,92,246,0.18), transparent 42%), radial-gradient(circle at 78% 76%, rgba(91,33,182,0.2), transparent 48%), linear-gradient(to bottom, rgba(0,0,0,0.44), rgba(0,0,0,0.86))',
        }}
      />
    </>
  );
}
