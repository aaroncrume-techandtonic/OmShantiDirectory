import { useMemo, useState } from 'react';

export default function ModuleTwentyOneBackdrop() {
  const [videoReady, setVideoReady] = useState(true);

  const sparks = useMemo(
    () =>
      Array.from({ length: 34 }, (_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${Math.random() * 2.2 + 1}px`,
        delay: `${Math.random() * 6}s`,
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
          <source src="/videos/the-silver-cord.mp4" type="video/mp4" />
        </video>
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
