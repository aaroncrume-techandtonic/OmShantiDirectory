import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module20Progress from './components/Module20Progress';
import ModuleTwentyBackdrop from './components/ModuleTwentyBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module20LyricLines, module20LyricTimings } from './module20LyricTimings';

export default function ConceptSeventySeven({ onContinue }) {
  const { setCurrentTrack } = useAudio();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setCurrentTrack('/audio/The_Mirrored_Soul.mp3');
  }, [setCurrentTrack]);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 17000);
    return () => clearTimeout(timer);
  }, []);

  const scriptParagraphs = [
    'Karmic tithing means returning value to the field that sustained your growth.',
    'You give from alignment, not guilt, as a way to restore circulation in your life.',
    'The practice can be financial, practical, or relational, but it must be intentional.',
    'Giving with clarity reduces scarcity loops and strengthens trust in reciprocity.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleTwentyBackdrop />
      <Module20Progress step={1} label="Karmic Tithing" />
      <LyricalAnchor line={module20LyricLines.concept77} targetTime={module20LyricTimings.concept77} />

      <motion.div className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <p className="text-xs uppercase tracking-[0.24em] text-rose-100/80">Concept 77 // Karmic Tithing</p>
        {scriptParagraphs.map((text, index) => (
          <motion.p key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + index * 1.1, duration: 1.4, ease: 'easeOut' }}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div className="relative mt-16 h-12" initial={{ opacity: 0 }} animate={{ opacity: showButton ? 1 : 0 }}>
        <button onClick={onContinue} disabled={!showButton} className="px-8 py-3 tracking-widest text-xs uppercase border border-rose-500/75 text-rose-100 hover:bg-rose-100 hover:text-black transition-colors duration-300 disabled:opacity-0 disabled:cursor-default">
          Soften The Third Eye
        </button>
      </motion.div>
    </main>
  );
}
