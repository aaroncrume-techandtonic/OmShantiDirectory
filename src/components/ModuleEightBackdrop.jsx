import { useMemo, useState } from 'react';

export default function ModuleEightBackdrop() {
  const [videoReady, setVideoReady] = useState(true);

  const particles = useMemo(
    () =>
      Array.from({ length: 34 }, (_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${Math.random() * 2.5 + 1}px`,
        delay: `${Math.random() * 6}s`,
        duration: `${Math.random() * 10 + 8}s`,
      })),
    []
  );

  return (
    <>
      {videoReady && (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-24"
          autoPlay
          muted
          loop
          playsInline
          onError={() => setVideoReady(false)}
        >
          <source src="/videos/shield-of-the-sun.mp4" type="video/mp4" />
        </video>
      )}

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 20% 22%, rgba(253,224,71,0.2), transparent 46%), radial-gradient(circle at 82% 74%, rgba(251,146,60,0.15), transparent 52%), linear-gradient(to bottom, rgba(24,18,7,0.7), rgba(2,6,23,0.93))',
        }}
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="absolute rounded-full bg-yellow-200/85 animate-pulse"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
              filter: 'drop-shadow(0 0 8px rgba(253, 224, 71, 0.5))',
            }}
          />
        ))}
      </div>
    </>
  );
}
