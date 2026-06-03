import { useMemo, useState } from 'react';
import { deterministicUnit } from './backdropDeterministic';

export default function ModuleThirteenBackdrop() {
  const [videoReady, setVideoReady] = useState(true);

  const particles = useMemo(
    () =>
      Array.from({ length: 34 }, (_, index) => ({
        id: index,
        left: `${deterministicUnit(index, 1) * 100}%`,
        top: `${deterministicUnit(index, 2) * 100}%`,
        size: `${deterministicUnit(index, 3) * 2.4 + 1}px`,
        delay: `${deterministicUnit(index, 4) * 6}s`,
        duration: `${deterministicUnit(index, 5) * 10 + 8}s`,
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
          <source src="/videos/the-ego_s-end.mp4" type="video/mp4" />
        </video>
      )}

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 18% 20%, rgba(244,114,182,0.18), transparent 45%), radial-gradient(circle at 78% 72%, rgba(251,113,133,0.14), transparent 52%), linear-gradient(to bottom, rgba(48,11,22,0.72), rgba(2,6,23,0.92))',
        }}
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="absolute rounded-full bg-rose-200/85 animate-pulse"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
              filter: 'drop-shadow(0 0 8px rgba(251, 113, 133, 0.45))',
            }}
          />
        ))}
      </div>
    </>
  );
}

