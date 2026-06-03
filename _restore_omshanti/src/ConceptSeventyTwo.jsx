import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module18Progress from './components/Module18Progress';
import ModuleEighteenBackdrop from './components/ModuleEighteenBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module18LyricLines, module18LyricTimings } from './module18LyricTimings';

export default function ConceptSeventyTwo({ onContinue }) {
  const { setCurrentTrack } = useAudio();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setCurrentTrack('/audio/The_Living_Prayer.mp3');
  }, [setCurrentTrack]);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 17000);
    return () => clearTimeout(timer);
  }, []);

  const scriptParagraphs = [
    'Mudra meditation uses intentional hand positions to focus attention and regulate state.',
    'Posture, breath, and gesture together create a reliable entry into embodied presence.',
    'The hands become anchors that stabilize scattered cognition into one channel.',
    'When gesture and intention align, the mind quiets and the spirit steadies.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-neutral-200 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleEighteenBackdrop />
      <Module18Progress step={4} label="Mudra Meditation" />
      <LyricalAnchor line={module18LyricLines.concept72} targetTime={module18LyricTimings.concept72} />

      <motion.div className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <p className="text-xs uppercase tracking-[0.24em] text-teal-100/80">Concept 72 // Mudra Meditation</p>
        {scriptParagraphs.map((text, index) => (
          <motion.p key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + index * 1.1, duration: 1.4, ease: 'easeOut' }}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div className="relative mt-16 h-12" initial={{ opacity: 0 }} animate={{ opacity: showButton ? 1 : 0 }}>
        <button onClick={onContinue} disabled={!showButton} className="px-8 py-3 tracking-widest text-xs uppercase border border-teal-500/75 text-teal-100 hover:bg-teal-100 hover:text-black transition-colors duration-300 disabled:opacity-0 disabled:cursor-default">
          Draft Living Prayer Protocol
        </button>
      </motion.div>
    </main>
  );
}
