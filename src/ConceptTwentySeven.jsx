import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module7Progress from './components/Module7Progress';
import ModuleSevenBackdrop from './components/ModuleSevenBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module7LyricLines, module7LyricTimings } from './module7LyricTimings';

export default function ConceptTwentySeven({ onContinue }) {
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
    'Water charging is attention made tangible.',
    'When you bless water with coherent intention, you create a ritual pause that aligns language, physiology, and behavior.',
    'The mechanism is practical: you prime your nervous system before intake, then reinforce identity through repetition.',
    'Bless the water, and you change the stream you are about to become.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-neutral-200 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleSevenBackdrop />
      <Module7Progress step={3} label="Water Charging" />
      <LyricalAnchor line={module7LyricLines.concept27} targetTime={module7LyricTimings.concept27} />

      <motion.div className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <p className="text-xs uppercase tracking-[0.24em] text-amber-100/80">Concept 27 // Water Charging</p>
        {scriptParagraphs.map((text, index) => (
          <motion.p key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + index * 1.1, duration: 1.4, ease: 'easeOut' }}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div className="relative mt-16 h-12" initial={{ opacity: 0 }} animate={{ opacity: showButton ? 1 : 0 }}>
        <button onClick={onContinue} disabled={!showButton} className="px-8 py-3 tracking-widest text-xs uppercase border border-amber-500/75 text-amber-100 hover:bg-amber-100 hover:text-black transition-colors duration-300 disabled:opacity-0 disabled:cursor-default">
          Open Third Eye Clarity
        </button>
      </motion.div>
    </main>
  );
}
