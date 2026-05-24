import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module20Progress from './components/Module20Progress';
import ModuleTwentyBackdrop from './components/ModuleTwentyBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module20LyricLines, module20LyricTimings } from './module20LyricTimings';

export default function ConceptSeventyNine({ onContinue }) {
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
    "Nature's geometry trains perception through recurring patterns of proportion and flow.",
    'Spirals, branching, and symmetry become mirrors for timing, adaptation, and growth.',
    'Pattern literacy helps you recognize where your life is forcing instead of flowing.',
    'Reading geometry in nature builds coherence between attention, body, and environment.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleTwentyBackdrop />
      <Module20Progress step={3} label="Nature's Geometry" />
      <LyricalAnchor line={module20LyricLines.concept79} targetTime={module20LyricTimings.concept79} />

      <motion.div className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <p className="text-xs uppercase tracking-[0.24em] text-rose-100/80">Concept 79 // Nature's Geometry</p>
        {scriptParagraphs.map((text, index) => (
          <motion.p key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + index * 1.1, duration: 1.4, ease: 'easeOut' }}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div className="relative mt-16 h-12" initial={{ opacity: 0 }} animate={{ opacity: showButton ? 1 : 0 }}>
        <button onClick={onContinue} disabled={!showButton} className="px-8 py-3 tracking-widest text-xs uppercase border border-rose-500/75 text-rose-100 hover:bg-rose-100 hover:text-black transition-colors duration-300 disabled:opacity-0 disabled:cursor-default">
          Enter Soul Mirroring
        </button>
      </motion.div>
    </main>
  );
}
