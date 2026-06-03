import { useMemo, useState } from 'react';
import { deterministicUnit } from './backdropDeterministic';

export default function ModuleTwentyTwoBackdrop() {
  const [videoReady, setVideoReady] = useState(true);

  const motes = useMemo(
    () =>
      Array.from({ length: 30 }, (_, index) => ({
        id: index,
        left: `${deterministicUnit(index, 1) * 100}%`,
        top: `${deterministicUnit(index, 2) * 100}%`,
        size: `${deterministicUnit(index, 3) * 2.4 + 1}px`,
        delay: `${deterministicUnit(index, 4) * 7}s`,
        duration: `${deterministicUnit(index, 5) * 10 + 9}s`,
      })),
    []
  );

  return (
    <>
      {videoReady && (
        <iframe
          className="absolute inset-0 h-full w-full object-cover opacity-28"
          src="https://www.youtube.com/embed/12QwKQbWl1iM?autoplay=1&mute=1&loop=1&playlist=12QwKQbWl1iM"
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
            'radial-gradient(circle at 20% 22%, rgba(161,161,170,0.2), transparent 48%), radial-gradient(circle at 82% 74%, rgba(212,212,216,0.12), transparent 54%), linear-gradient(to bottom, rgba(20,20,23,0.72), rgba(2,6,23,0.94))',
        }}
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {motes.map((mote) => (
          <span
            key={mote.id}
            className="absolute rounded-full bg-zinc-200/80 animate-pulse"
            style={{
              left: mote.left,
              top: mote.top,
              width: mote.size,
              height: mote.size,
              animationDelay: mote.delay,
              animationDuration: mote.duration,
              filter: 'drop-shadow(0 0 8px rgba(212, 212, 216, 0.45))',
            }}
          />
        ))}
      </div>
    </>
  );
}

