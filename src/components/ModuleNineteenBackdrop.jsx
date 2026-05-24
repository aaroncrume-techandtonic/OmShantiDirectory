import { useMemo, useState } from 'react';

export default function ModuleNineteenBackdrop() {
  const [videoReady, setVideoReady] = useState(true);

  const rings = useMemo(
    () =>
      Array.from({ length: 26 }, (_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${Math.random() * 90 + 28}px`,
        delay: `${Math.random() * 7}s`,
        duration: `${Math.random() * 9 + 9}s`,
      })),
    []
  );

  return (
    <>
      {videoReady && (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-28"
          autoPlay
          muted
          loop
          playsInline
          onError={() => setVideoReady(false)}
        >
          <source src="/videos/the-resonant-aura.mp4" type="video/mp4" />
        </video>
      )}

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 20% 26%, rgba(125,211,252,0.22), transparent 48%), radial-gradient(circle at 80% 76%, rgba(56,189,248,0.15), transparent 54%), linear-gradient(to bottom, rgba(7,19,35,0.72), rgba(2,6,23,0.94))',
        }}
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {rings.map((ring) => (
          <span
            key={ring.id}
            className="absolute rounded-full border border-cyan-200/20 animate-ping"
            style={{
              left: ring.left,
              top: ring.top,
              width: ring.size,
              height: ring.size,
              animationDelay: ring.delay,
              animationDuration: ring.duration,
            }}
          />
        ))}
      </div>
    </>
  );
}
