import { useMemo, useState } from 'react';

export default function ModuleTwentyFourBackdrop() {
  const [videoReady, setVideoReady] = useState(true);

  const droplets = useMemo(
    () =>
      Array.from({ length: 32 }, (_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${Math.random() * 2.5 + 1}px`,
        delay: `${Math.random() * 7}s`,
        duration: `${Math.random() * 10 + 8}s`,
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
          <source src="/videos/the-crystal-stream.mp4" type="video/mp4" />
        </video>
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
