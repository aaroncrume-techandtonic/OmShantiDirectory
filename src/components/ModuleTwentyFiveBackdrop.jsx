import { useMemo, useState } from 'react';
import { deterministicUnit } from './backdropDeterministic';

export default function ModuleTwentyFiveBackdrop() {
  const [videoReady, setVideoReady] = useState(true);

  const stars = useMemo(
    () =>
      Array.from({ length: 40 }, (_, index) => ({
        id: index,
        left: `${deterministicUnit(index, 1) * 100}%`,
        top: `${deterministicUnit(index, 2) * 100}%`,
        size: `${deterministicUnit(index, 3) * 2.6 + 1}px`,
        delay: `${deterministicUnit(index, 4) * 8}s`,
        duration: `${deterministicUnit(index, 5) * 12 + 8}s`,
      })),
    []
  );

  return (
    <>
      {videoReady && (
        <iframe
          className="absolute inset-0 h-full w-full object-cover opacity-28"
          src="https://www.youtube.com/embed/11QwKQbWl1iL?autoplay=1&mute=1&loop=1&playlist=11QwKQbWl1iL"
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
            'radial-gradient(circle at 18% 18%, rgba(217,70,239,0.2), transparent 45%), radial-gradient(circle at 82% 72%, rgba(168,85,247,0.15), transparent 54%), linear-gradient(to bottom, rgba(34,9,55,0.74), rgba(2,6,23,0.95))',
        }}
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((star) => (
          <span
            key={star.id}
            className="absolute rounded-full bg-fuchsia-200/85 animate-pulse"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
              animationDuration: star.duration,
              filter: 'drop-shadow(0 0 10px rgba(217, 70, 239, 0.45))',
            }}
          />
        ))}
      </div>
    </>
  );
}

