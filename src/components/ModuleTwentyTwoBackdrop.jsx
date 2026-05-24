import { useMemo, useState } from 'react';

export default function ModuleTwentyTwoBackdrop() {
  const [videoReady, setVideoReady] = useState(true);

  const motes = useMemo(
    () =>
      Array.from({ length: 30 }, (_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${Math.random() * 2.4 + 1}px`,
        delay: `${Math.random() * 7}s`,
        duration: `${Math.random() * 10 + 9}s`,
      })),
    []
  );

  return (
    <>
      {videoReady && (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-28"
          autoPlay
          muted
          loop
          playsInline
          onError={() => setVideoReady(false)}
        >
          <source src="/videos/the-sacred-silver.mp4" type="video/mp4" />
        </video>
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
