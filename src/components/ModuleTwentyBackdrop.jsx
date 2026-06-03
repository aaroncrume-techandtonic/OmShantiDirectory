import { useMemo, useState } from 'react';
import { deterministicUnit } from './backdropDeterministic';

export default function ModuleTwentyBackdrop() {
  const [videoReady, setVideoReady] = useState(true);

  const glints = useMemo(
    () =>
      Array.from({ length: 30 }, (_, index) => ({
        id: index,
        left: `${deterministicUnit(index, 1) * 100}%`,
        top: `${deterministicUnit(index, 2) * 100}%`,
        size: `${deterministicUnit(index, 3) * 2.4 + 1}px`,
        delay: `${deterministicUnit(index, 4) * 7}s`,
        duration: `${deterministicUnit(index, 5) * 10 + 8}s`,
      })),
    []
  );

  return (
    <>
      {videoReady && (
        <iframe
          className="absolute inset-0 h-full w-full object-cover opacity-28"
          src="https://www.youtube.com/embed/8QwKQbWl1iI?autoplay=1&mute=1&loop=1&playlist=8QwKQbWl1iI"
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
            'radial-gradient(circle at 22% 20%, rgba(251,113,133,0.18), transparent 46%), radial-gradient(circle at 78% 74%, rgba(244,63,94,0.14), transparent 52%), linear-gradient(to bottom, rgba(38,6,15,0.7), rgba(2,6,23,0.94))',
        }}
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {glints.map((glint) => (
          <span
            key={glint.id}
            className="absolute rounded-full bg-rose-200/85 animate-pulse"
            style={{
              left: glint.left,
              top: glint.top,
              width: glint.size,
              height: glint.size,
              animationDelay: glint.delay,
              animationDuration: glint.duration,
              filter: 'drop-shadow(0 0 10px rgba(251, 113, 133, 0.45))',
            }}
          />
        ))}
      </div>
    </>
  );
}

