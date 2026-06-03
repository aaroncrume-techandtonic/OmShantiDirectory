import { useMemo, useState } from 'react';
import { deterministicUnit } from './backdropDeterministic';

export default function ModuleSixBackdrop() {
  const [videoReady, setVideoReady] = useState(true);

  const stars = useMemo(
    () =>
      Array.from({ length: 36 }, (_, index) => ({
        id: index,
        left: `${deterministicUnit(index, 1) * 100}%`,
        top: `${deterministicUnit(index, 2) * 100}%`,
        size: `${deterministicUnit(index, 3) * 2 + 1}px`,
        delay: `${deterministicUnit(index, 4) * 6}s`,
        duration: `${deterministicUnit(index, 5) * 8 + 8}s`,
      })),
    []
  );

  return (
    <>
      {videoReady && (
        <iframe
          className="absolute inset-0 h-full w-full object-cover opacity-26"
          src="https://www.youtube.com/embed/Wrxpe1R7z8I?autoplay=1&mute=1&loop=1&playlist=Wrxpe1R7z8I"
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
            'radial-gradient(circle at 22% 20%, rgba(103,232,249,0.15), transparent 46%), radial-gradient(circle at 78% 72%, rgba(129,140,248,0.16), transparent 52%), linear-gradient(to bottom, rgba(1,8,19,0.7), rgba(2,6,23,0.92))',
        }}
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((star) => (
          <span
            key={star.id}
            className="absolute rounded-full bg-cyan-100/85 animate-pulse"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
              animationDuration: star.duration,
              filter: 'drop-shadow(0 0 8px rgba(125, 211, 252, 0.52))',
            }}
          />
        ))}
      </div>
    </>
  );
}

