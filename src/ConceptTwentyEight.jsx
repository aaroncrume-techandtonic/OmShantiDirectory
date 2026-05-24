import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module7Progress from './components/Module7Progress';
import ModuleSevenBackdrop from './components/ModuleSevenBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module7LyricLines, module7LyricTimings } from './module7LyricTimings';

export default function ConceptTwentyEight({ onContinue }) {
  const { setCurrentTrack } = useAudio();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setCurrentTrack('/audio/The_Water_Altar.mp3');
  }, [setCurrentTrack]);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 17000);
    return () => clearTimeout(timer);
  }, []);

  const scriptParagraphs = [
    'Third eye clarity is focused perception without paranoia or fantasy inflation.',
    'It asks you to observe patterns calmly, test intuition with reality, and respond from centered discernment.',
    'Clarity is not seeing everything. It is seeing what matters and acting with clean intention.',
    'When vision is steady, your choices become elegant and precise.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-neutral-200 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleSevenBackdrop />
      <Module7Progress step={4} label="Third Eye Clarity" />
      <LyricalAnchor line={module7LyricLines.concept28} targetTime={module7LyricTimings.concept28} />

      <motion.div className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <p className="text-xs uppercase tracking-[0.24em] text-amber-100/80">Concept 28 // Third Eye Clarity</p>
        {scriptParagraphs.map((text, index) => (
          <motion.p key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + index * 1.1, duration: 1.4, ease: 'easeOut' }}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div className="relative mt-16 h-12" initial={{ opacity: 0 }} animate={{ opacity: showButton ? 1 : 0 }}>
        <button onClick={onContinue} disabled={!showButton} className="px-8 py-3 tracking-widest text-xs uppercase border border-amber-500/75 text-amber-100 hover:bg-amber-100 hover:text-black transition-colors duration-300 disabled:opacity-0 disabled:cursor-default">
          Draft Water Altar Protocol
        </button>
      </motion.div>
    </main>
  );
}
