import { useMemo, useState } from 'react';
import { deterministicUnit } from './backdropDeterministic';

export default function ModuleFourteenBackdrop() {
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
        <iframe
          className="absolute inset-0 h-full w-full object-cover opacity-24"
          src="https://www.youtube.com/embed/CPxIauJVFkU?autoplay=1&mute=1&loop=1&playlist=CPxIauJVFkU"
          title="YouTube video player"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          onError={() => setVideoReady(false)}
        />
      )}

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 18% 20%, rgba(56,189,248,0.18), transparent 45%), radial-gradient(circle at 78% 72%, rgba(34,211,238,0.14), transparent 52%), linear-gradient(to bottom, rgba(8,35,59,0.72), rgba(2,6,23,0.92))',
        }}
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="absolute rounded-full bg-cyan-200/85 animate-pulse"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
              filter: 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.45))',
            }}
          />
        ))}
      </div>
    </>
  );
}

