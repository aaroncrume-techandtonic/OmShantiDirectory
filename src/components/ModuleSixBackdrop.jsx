import { useMemo, useState } from 'react';

export default function ModuleSixBackdrop() {
  const [videoReady, setVideoReady] = useState(true);

  const stars = useMemo(
    () =>
      Array.from({ length: 36 }, (_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${Math.random() * 2 + 1}px`,
        delay: `${Math.random() * 6}s`,
        duration: `${Math.random() * 8 + 8}s`,
      })),
    []
  );

  return (
    <>
      {videoReady && (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-26"
          autoPlay
          muted
          loop
          playsInline
          onError={() => setVideoReady(false)}
        >
          <source src="/videos/the-unplugged-voice.mp4" type="video/mp4" />
        </video>
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
