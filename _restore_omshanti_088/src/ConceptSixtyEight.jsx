import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module17Progress from './components/Module17Progress';
import ModuleSeventeenBackdrop from './components/ModuleSeventeenBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module17LyricLines, module17LyricTimings } from './module17LyricTimings';

export default function ConceptSixtyEight({ onContinue }) {
  const { setCurrentTrack } = useAudio();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setCurrentTrack('/audio/The_Labyrinth_of_Light.mp3');
  }, [setCurrentTrack]);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 17000);
    return () => clearTimeout(timer);
  }, []);

  const scriptParagraphs = [
    'White light shielding is visualization for emotional boundary stability and intentional presence.',
    'You imagine a clear field that allows connection but filters chaos and projection.',
    'This is not avoidance; it is selective permeability with conscious choice.',
    'When your field is coherent, you can stay compassionate without absorption.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-neutral-200 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleSeventeenBackdrop />
      <Module17Progress step={4} label="White Light Shielding" />
      <LyricalAnchor line={module17LyricLines.concept68} targetTime={module17LyricTimings.concept68} />

      <motion.div className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <p className="text-xs uppercase tracking-[0.24em] text-violet-100/80">Concept 68 // White Light Shielding</p>
        {scriptParagraphs.map((text, index) => (
          <motion.p key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + index * 1.1, duration: 1.4, ease: 'easeOut' }}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div className="relative mt-16 h-12" initial={{ opacity: 0 }} animate={{ opacity: showButton ? 1 : 0 }}>
        <button onClick={onContinue} disabled={!showButton} className="px-8 py-3 tracking-widest text-xs uppercase border border-violet-500/75 text-violet-100 hover:bg-violet-100 hover:text-black transition-colors duration-300 disabled:opacity-0 disabled:cursor-default">
          Draft Labyrinth Light Protocol
        </button>
      </motion.div>
    </main>
  );
}
