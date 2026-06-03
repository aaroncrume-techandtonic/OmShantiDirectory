import { useMemo, useState } from 'react';
import { deterministicUnit } from './backdropDeterministic';

export default function ModuleTwentyThreeBackdrop() {
  const [videoReady, setVideoReady] = useState(true);

  const leaves = useMemo(
    () =>
      Array.from({ length: 28 }, (_, index) => ({
        id: index,
        left: `${deterministicUnit(index, 1) * 100}%`,
        top: `${deterministicUnit(index, 2) * 100}%`,
        size: `${deterministicUnit(index, 3) * 2.6 + 1.2}px`,
        delay: `${deterministicUnit(index, 4) * 8}s`,
        duration: `${deterministicUnit(index, 5) * 10 + 9}s`,
      })),
    []
  );

  return (
    <>
      {videoReady && (
        <iframe
          className="absolute inset-0 h-full w-full object-cover opacity-28"
          src="https://www.youtube.com/embed/14QwKQbWl1iO?autoplay=1&mute=1&loop=1&playlist=14QwKQbWl1iO"
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
            'radial-gradient(circle at 22% 20%, rgba(16,185,129,0.2), transparent 45%), radial-gradient(circle at 78% 74%, rgba(52,211,153,0.14), transparent 54%), linear-gradient(to bottom, rgba(4,28,21,0.72), rgba(2,6,23,0.94))',
        }}
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {leaves.map((leaf) => (
          <span
            key={leaf.id}
            className="absolute rounded-full bg-emerald-200/80 animate-pulse"
            style={{
              left: leaf.left,
              top: leaf.top,
              width: leaf.size,
              height: leaf.size,
              animationDelay: leaf.delay,
              animationDuration: leaf.duration,
              filter: 'drop-shadow(0 0 8px rgba(52, 211, 153, 0.45))',
            }}
          />
        ))}
      </div>
    </>
  );
}

