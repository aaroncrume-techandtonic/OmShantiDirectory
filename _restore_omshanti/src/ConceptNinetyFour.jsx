import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module24Progress from './components/Module24Progress';
import ModuleTwentyFourBackdrop from './components/ModuleTwentyFourBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module24LyricLines, module24LyricTimings } from './module24LyricTimings';

export default function ConceptNinetyFour({ onContinue }) {
  const { setCurrentTrack } = useAudio();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setCurrentTrack('/audio/The_Crystal_Stream.mp3');
  }, [setCurrentTrack]);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 17000);
    return () => clearTimeout(timer);
  }, []);

  const scriptParagraphs = [
    'Prana pacing matches breath, effort, and recovery to your real energetic capacity.',
    'You avoid both overexertion and stagnation by adjusting cadence through the day.',
    'Pacing is strategic compassion for the nervous system, not reduced ambition.',
    'When rhythm fits capacity, consistency and output both improve.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleTwentyFourBackdrop />
      <Module24Progress step={2} label="Prana Pacing" />
      <LyricalAnchor line={module24LyricLines.concept94} targetTime={module24LyricTimings.concept94} />

      <motion.div className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <p className="text-xs uppercase tracking-[0.24em] text-sky-100/80">Concept 94 // Prana Pacing</p>
        {scriptParagraphs.map((text, index) => (
          <motion.p key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + index * 1.1, duration: 1.4, ease: 'easeOut' }}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div className="relative mt-16 h-12" initial={{ opacity: 0 }} animate={{ opacity: showButton ? 1 : 0 }}>
        <button onClick={onContinue} disabled={!showButton} className="px-8 py-3 tracking-widest text-xs uppercase border border-sky-500/75 text-sky-100 hover:bg-sky-100 hover:text-black transition-colors duration-300 disabled:opacity-0 disabled:cursor-default">
          Charge Crystal Water
        </button>
      </motion.div>
    </main>
  );
}
