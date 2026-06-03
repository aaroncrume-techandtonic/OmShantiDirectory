import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module15Progress from './components/Module15Progress';
import ModuleFifteenBackdrop from './components/ModuleFifteenBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module15LyricLines, module15LyricTimings } from './module15LyricTimings';

export default function ConceptSixty({ onContinue }) {
  const { setCurrentTrack } = useAudio();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setCurrentTrack('/audio/The_Joyful_Child.mp3');
  }, [setCurrentTrack]);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 17000);
    return () => clearTimeout(timer);
  }, []);

  const scriptParagraphs = [
    'Inner child play is restoration through curiosity, movement, and low-stakes creativity.',
    'Play interrupts chronic vigilance and reminds the psyche that joy is safe.',
    'You are not regressing. You are reclaiming capacities that stress suppressed.',
    'When the playful self returns, resilience becomes natural again.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-neutral-200 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleFifteenBackdrop />
      <Module15Progress step={4} label="Inner Child Play" />
      <LyricalAnchor line={module15LyricLines.concept60} targetTime={module15LyricTimings.concept60} />

      <motion.div className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <p className="text-xs uppercase tracking-[0.24em] text-emerald-100/80">Concept 60 // Inner Child Play</p>
        {scriptParagraphs.map((text, index) => (
          <motion.p key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + index * 1.1, duration: 1.4, ease: 'easeOut' }}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div className="relative mt-16 h-12" initial={{ opacity: 0 }} animate={{ opacity: showButton ? 1 : 0 }}>
        <button onClick={onContinue} disabled={!showButton} className="px-8 py-3 tracking-widest text-xs uppercase border border-emerald-500/75 text-emerald-100 hover:bg-emerald-100 hover:text-black transition-colors duration-300 disabled:opacity-0 disabled:cursor-default">
          Draft Joyful Child Protocol
        </button>
      </motion.div>
    </main>
  );
}
