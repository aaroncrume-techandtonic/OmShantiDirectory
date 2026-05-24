import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAudio } from '../context/AudioContext';

export default function LyricalAnchor({
  line,
  targetTime,
  delay = 6,
  holdFor = 7,
}) {
  const { audioRef, currentTrack } = useAudio();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let fallbackTimer;
    let visibilityTimer;

    const showAnchor = () => {
      setIsVisible(true);
      visibilityTimer = setTimeout(() => {
        setIsVisible(false);
      }, holdFor * 1000);
    };

    const audio = audioRef.current;
    if (!audio || typeof targetTime !== 'number') {
      fallbackTimer = setTimeout(showAnchor, delay * 1000);
      return () => {
        clearTimeout(fallbackTimer);
        clearTimeout(visibilityTimer);
      };
    }

    const checkSyncPoint = () => {
      if (audio.currentTime >= targetTime) {
        audio.removeEventListener('timeupdate', checkSyncPoint);
        showAnchor();
      }
    };

    checkSyncPoint();
    if (!isVisible) {
      audio.addEventListener('timeupdate', checkSyncPoint);
    }

    return () => {
      audio.removeEventListener('timeupdate', checkSyncPoint);
      clearTimeout(fallbackTimer);
      clearTimeout(visibilityTimer);
    };
  }, [audioRef, currentTrack, delay, holdFor, isVisible, targetTime]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.88, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="fixed bottom-28 left-1/2 z-40 -translate-x-1/2 pointer-events-none"
        >
          <div className="rounded-full border border-teal-500/30 bg-black/45 px-4 py-2 backdrop-blur-sm">
            <p className="text-[11px] tracking-[0.18em] uppercase text-teal-100/80 text-center whitespace-nowrap">
              {line}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
