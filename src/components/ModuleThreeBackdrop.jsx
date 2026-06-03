import { useState } from 'react';

export default function ModuleThreeBackdrop() {
  const [videoReady, setVideoReady] = useState(true);

  return (
    <>
      {videoReady && (
        <iframe
          className="absolute inset-0 h-full w-full object-cover opacity-30"
          src="https://www.youtube.com/embed/DzO6Xhucy3o?autoplay=1&mute=1&loop=1&playlist=DzO6Xhucy3o"
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
            'radial-gradient(circle at 25% 20%, rgba(217,119,6,0.16), transparent 42%), radial-gradient(circle at 75% 75%, rgba(120,53,15,0.2), transparent 48%), linear-gradient(to bottom, rgba(0,0,0,0.42), rgba(0,0,0,0.84))',
        }}
      />
    </>
  );
}
