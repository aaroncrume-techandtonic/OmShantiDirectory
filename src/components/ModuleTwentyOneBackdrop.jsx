import { useMemo, useState } from 'react';
import { deterministicUnit } from './backdropDeterministic';

export default function ModuleTwentyOneBackdrop() {
  const [videoReady, setVideoReady] = useState(true);

  const sparks = useMemo(
    () =>
      Array.from({ length: 34 }, (_, index) => ({
        id: index,
        left: `${deterministicUnit(index, 1) * 100}%`,
        top: `${deterministicUnit(index, 2) * 100}%`,
        size: `${deterministicUnit(index, 3) * 2.2 + 1}px`,
        delay: `${deterministicUnit(index, 4) * 6}s`,
        duration: `${deterministicUnit(index, 5) * 10 + 9}s`,
      })),
    []
  );

  return (
    <>
      {videoReady && (
        <iframe
          className="absolute inset-0 h-full w-full object-cover opacity-28"
          src="https://www.youtube.com/embed/13QwKQbWl1iN?autoplay=1&mute=1&loop=1&playlist=13QwKQbWl1iN"
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
            'radial-gradient(circle at 20% 20%, rgba(251,191,36,0.18), transparent 48%), radial-gradient(circle at 80% 74%, rgba(245,158,11,0.14), transparent 52%), linear-gradient(to bottom, rgba(32,18,4,0.72), rgba(2,6,23,0.94))',
        }}
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {sparks.map((spark) => (
          <span
            key={spark.id}
            className="absolute rounded-full bg-amber-200/85 animate-pulse"
            style={{
              left: spark.left,
              top: spark.top,
              width: spark.size,
              height: spark.size,
              animationDelay: spark.delay,
              animationDuration: spark.duration,
              filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.45))',
            }}
          />
        ))}
      </div>
    </>
  );
}

