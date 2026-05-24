import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module19Progress from './components/Module19Progress';
import ModuleNineteenBackdrop from './components/ModuleNineteenBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module19LyricLines, module19LyricTimings } from './module19LyricTimings';

export default function ConceptSeventyThree({ onContinue }) {
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
    'Sound bathing uses sustained harmonic tones to settle overactive stress loops in the body.',
    'When tone is received through breath and tissue, mental noise decreases and attention stabilizes.',
    'The point is not performance. It is receptive listening that lets the nervous system retune.',
    'Coherent sound fields can quickly restore calm, clarity, and emotional range.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleNineteenBackdrop />
      <Module19Progress step={1} label="Sound Bathing" />
      <LyricalAnchor line={module19LyricLines.concept73} targetTime={module19LyricTimings.concept73} />

      <motion.div className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <p className="text-xs uppercase tracking-[0.24em] text-cyan-100/80">Concept 73 // Sound Bathing</p>
        {scriptParagraphs.map((text, index) => (
          <motion.p key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + index * 1.1, duration: 1.4, ease: 'easeOut' }}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div className="relative mt-16 h-12" initial={{ opacity: 0 }} animate={{ opacity: showButton ? 1 : 0 }}>
        <button onClick={onContinue} disabled={!showButton} className="px-8 py-3 tracking-widest text-xs uppercase border border-cyan-500/75 text-cyan-100 hover:bg-cyan-100 hover:text-black transition-colors duration-300 disabled:opacity-0 disabled:cursor-default">
          Expand The Aura
        </button>
      </motion.div>
    </main>
  );
}
