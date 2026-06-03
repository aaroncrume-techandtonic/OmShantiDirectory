import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module19Progress from './components/Module19Progress';
import ModuleNineteenBackdrop from './components/ModuleNineteenBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module19LyricLines, module19LyricTimings } from './module19LyricTimings';

export default function ConceptSeventyFour({ onContinue }) {
  const { setCurrentTrack } = useAudio();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setCurrentTrack('/audio/The_Resonant_Aura.mp3');
  }, [setCurrentTrack]);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 17000);
    return () => clearTimeout(timer);
  }, []);

  const scriptParagraphs = [
    'Aura expansion is practiced as attention expansion, emotional openness, and grounded boundaries.',
    'You deliberately widen your field of awareness beyond internal chatter and reactive loops.',
    'As your field steadies, you notice more without becoming overwhelmed by it.',
    'Expansion works when openness and protection are developed together.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleNineteenBackdrop />
      <Module19Progress step={2} label="Aura Expansion" />
      <LyricalAnchor line={module19LyricLines.concept74} targetTime={module19LyricTimings.concept74} />

      <motion.div className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <p className="text-xs uppercase tracking-[0.24em] text-cyan-100/80">Concept 74 // Aura Expansion</p>
        {scriptParagraphs.map((text, index) => (
          <motion.p key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + index * 1.1, duration: 1.4, ease: 'easeOut' }}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div className="relative mt-16 h-12" initial={{ opacity: 0 }} animate={{ opacity: showButton ? 1 : 0 }}>
        <button onClick={onContinue} disabled={!showButton} className="px-8 py-3 tracking-widest text-xs uppercase border border-cyan-500/75 text-cyan-100 hover:bg-cyan-100 hover:text-black transition-colors duration-300 disabled:opacity-0 disabled:cursor-default">
          Begin Primal Humming
        </button>
      </motion.div>
    </main>
  );
}
