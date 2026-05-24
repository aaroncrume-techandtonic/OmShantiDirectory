import { useMemo, useState } from 'react';

export default function ModuleTwentyFiveBackdrop() {
  const [videoReady, setVideoReady] = useState(true);

  const stars = useMemo(
    () =>
      Array.from({ length: 40 }, (_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${Math.random() * 2.6 + 1}px`,
        delay: `${Math.random() * 8}s`,
        duration: `${Math.random() * 12 + 8}s`,
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
          <source src="/videos/the-cosmic-humility.mp4" type="video/mp4" />
        </video>
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
