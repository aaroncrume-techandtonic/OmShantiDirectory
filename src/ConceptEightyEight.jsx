import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module22Progress from './components/Module22Progress';
import ModuleTwentyTwoBackdrop from './components/ModuleTwentyTwoBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module22LyricLines, module22LyricTimings } from './module22LyricTimings';

export default function ConceptEightyEight({ onContinue }) {
  const { setCurrentTrack } = useAudio();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setCurrentTrack('/audio/The_Sacred_Silver.mp3');
  }, [setCurrentTrack]);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 17000);
    return () => clearTimeout(timer);
  }, []);

  const scriptParagraphs = [
    'Stellar grounding holds cosmic perspective while staying anchored in embodied reality.',
    'You remember scale and mystery without abandoning practical responsibility.',
    'Grounding converts inspiration into task, care, and service.',
    'When stars and earth are linked, spiritual insight becomes durable action.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleTwentyTwoBackdrop />
      <Module22Progress step={4} label="Stellar Grounding" />
      <LyricalAnchor line={module22LyricLines.concept88} targetTime={module22LyricTimings.concept88} />

      <motion.div className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <p className="text-xs uppercase tracking-[0.24em] text-zinc-100/80">Concept 88 // Stellar Grounding</p>
        {scriptParagraphs.map((text, index) => (
          <motion.p key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + index * 1.1, duration: 1.4, ease: 'easeOut' }}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div className="relative mt-16 h-12" initial={{ opacity: 0 }} animate={{ opacity: showButton ? 1 : 0 }}>
        <button onClick={onContinue} disabled={!showButton} className="px-8 py-3 tracking-widest text-xs uppercase border border-zinc-400/75 text-zinc-100 hover:bg-zinc-100 hover:text-black transition-colors duration-300 disabled:opacity-0 disabled:cursor-default">
          Draft Sacred Silver Protocol
        </button>
      </motion.div>
    </main>
  );
}
