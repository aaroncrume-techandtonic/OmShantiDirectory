import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module18Progress from './components/Module18Progress';
import ModuleEighteenBackdrop from './components/ModuleEighteenBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module18LyricLines, module18LyricTimings } from './module18LyricTimings';

export default function ConceptSeventyOne({ onContinue }) {
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
    'Celestial alignment uses moon, sun, and seasonal cycles as timing intelligence for practice.',
    'You adapt effort and recovery based on rhythm rather than forcing one pace year-round.',
    'Alignment is practical: better timing reduces friction and improves follow-through.',
    'When your schedule respects cycles, coherence and trust increase together.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-neutral-200 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleEighteenBackdrop />
      <Module18Progress step={3} label="Celestial Alignment" />
      <LyricalAnchor line={module18LyricLines.concept71} targetTime={module18LyricTimings.concept71} />

      <motion.div className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <p className="text-xs uppercase tracking-[0.24em] text-teal-100/80">Concept 71 // Celestial Alignment</p>
        {scriptParagraphs.map((text, index) => (
          <motion.p key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + index * 1.1, duration: 1.4, ease: 'easeOut' }}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div className="relative mt-16 h-12" initial={{ opacity: 0 }} animate={{ opacity: showButton ? 1 : 0 }}>
        <button onClick={onContinue} disabled={!showButton} className="px-8 py-3 tracking-widest text-xs uppercase border border-teal-500/75 text-teal-100 hover:bg-teal-100 hover:text-black transition-colors duration-300 disabled:opacity-0 disabled:cursor-default">
          Enter Mudra Meditation
        </button>
      </motion.div>
    </main>
  );
}
