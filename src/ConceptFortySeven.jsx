import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module12Progress from './components/Module12Progress';
import ModuleTwelveBackdrop from './components/ModuleTwelveBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module12LyricLines, module12LyricTimings } from './module12LyricTimings';

export default function ConceptFortySeven({ onContinue }) {
  const { setCurrentTrack } = useAudio();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setCurrentTrack('/audio/The_Scent_of_Numbers.mp3');
  }, [setCurrentTrack]);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 17000);
    return () => clearTimeout(timer);
  }, []);

  const scriptParagraphs = [
    'Karmic cleansing in practice means reducing harm loops and restoring ethical alignment.',
    'It is behavioral, not decorative: repair where possible, simplify where noisy, and act where avoidance has lingered.',
    'Every clean action updates your nervous system with evidence of integrity.',
    'Clearer conduct creates cleaner perception.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-neutral-200 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleTwelveBackdrop />
      <Module12Progress step={3} label="Karmic Cleansing" />
      <LyricalAnchor line={module12LyricLines.concept47} targetTime={module12LyricTimings.concept47} />

      <motion.div className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <p className="text-xs uppercase tracking-[0.24em] text-amber-100/80">Concept 47 // Karmic Cleansing</p>
        {scriptParagraphs.map((text, index) => (
          <motion.p key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + index * 1.1, duration: 1.4, ease: 'easeOut' }}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div className="relative mt-16 h-12" initial={{ opacity: 0 }} animate={{ opacity: showButton ? 1 : 0 }}>
        <button onClick={onContinue} disabled={!showButton} className="px-8 py-3 tracking-widest text-xs uppercase border border-amber-500/75 text-amber-100 hover:bg-amber-100 hover:text-black transition-colors duration-300 disabled:opacity-0 disabled:cursor-default">
          Track Synchronicity
        </button>
      </motion.div>
    </main>
  );
}
