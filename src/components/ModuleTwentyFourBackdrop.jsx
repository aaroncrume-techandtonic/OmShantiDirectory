import { useMemo, useState } from 'react';
import { deterministicUnit } from './backdropDeterministic';

export default function ModuleTwentyFourBackdrop() {
  const [videoReady, setVideoReady] = useState(true);

  const droplets = useMemo(
    () =>
      Array.from({ length: 32 }, (_, index) => ({
        id: index,
        left: `${deterministicUnit(index, 1) * 100}%`,
        top: `${deterministicUnit(index, 2) * 100}%`,
        size: `${deterministicUnit(index, 3) * 2.5 + 1}px`,
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
          src="https://www.youtube.com/embed/9QwKQbWl1iJ?autoplay=1&mute=1&loop=1&playlist=9QwKQbWl1iJ"
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
            'radial-gradient(circle at 20% 22%, rgba(125,211,252,0.2), transparent 46%), radial-gradient(circle at 80% 74%, rgba(56,189,248,0.14), transparent 52%), linear-gradient(to bottom, rgba(4,28,52,0.72), rgba(2,6,23,0.94))',
        }}
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {droplets.map((droplet) => (
          <span
            key={droplet.id}
            className="absolute rounded-full bg-sky-200/80 animate-pulse"
            style={{
              left: droplet.left,
              top: droplet.top,
              width: droplet.size,
              height: droplet.size,
              animationDelay: droplet.delay,
              animationDuration: droplet.duration,
              filter: 'drop-shadow(0 0 8px rgba(125, 211, 252, 0.45))',
            }}
          />
        ))}
      </div>
    </>
  );
}

