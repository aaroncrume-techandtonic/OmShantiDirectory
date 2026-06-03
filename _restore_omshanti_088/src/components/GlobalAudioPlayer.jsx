import { Pause, Play } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export default function GlobalAudioPlayer() {
  const { isPlaying, togglePlay, currentTrack } = useAudio();

  const trackName = currentTrack.split('/').pop()?.replace('.mp3', '').replaceAll('_', ' ') || 'The Still Point';

  return (
    <div className="fixed bottom-5 right-5 z-[70]">
      <div className="flex items-center gap-3 rounded-full border border-neutral-700/80 bg-black/85 px-4 py-2.5 shadow-[0_6px_24px_rgba(0,0,0,0.45)] backdrop-blur-md">
        <button
          onClick={togglePlay}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-600 bg-neutral-900 text-neutral-200 transition hover:bg-neutral-800"
          aria-label={isPlaying ? 'Pause global audio' : 'Play global audio'}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
        </button>
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.22em] text-neutral-500">Now Playing</p>
          <p className="max-w-[180px] truncate text-xs text-neutral-200">{trackName}</p>
        </div>
      </div>
    </div>
  );
}
