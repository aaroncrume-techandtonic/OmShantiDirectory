import { useMemo, useState } from 'react';

export default function ModuleTwentyThreeBackdrop() {
  const [videoReady, setVideoReady] = useState(true);

  const leaves = useMemo(
    () =>
      Array.from({ length: 28 }, (_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${Math.random() * 2.6 + 1.2}px`,
        delay: `${Math.random() * 8}s`,
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
          <source src="/videos/the-inner-temple.mp4" type="video/mp4" />
        </video>
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
