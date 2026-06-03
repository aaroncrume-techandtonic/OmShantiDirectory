import { useState } from 'react';

export default function ModuleFiveBackdrop() {
  const [videoReady, setVideoReady] = useState(true);

  return (
    <>
      {videoReady && (
        <iframe
          className="absolute inset-0 h-full w-full object-cover opacity-28"
          src="https://www.youtube.com/embed/wTOvUHLyXIk?autoplay=1&mute=1&loop=1&playlist=wTOvUHLyXIk"
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
            'radial-gradient(circle at 20% 22%, rgba(113,113,122,0.18), transparent 44%), radial-gradient(circle at 78% 78%, rgba(127,29,29,0.22), transparent 50%), linear-gradient(to bottom, rgba(9,9,11,0.52), rgba(0,0,0,0.9))',
        }}
      />
    </>
  );
}
