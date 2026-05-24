import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module23Progress from './components/Module23Progress';
import ModuleTwentyThreeBackdrop from './components/ModuleTwentyThreeBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module23LyricLines, module23LyricTimings } from './module23LyricTimings';

export default function ConceptNinetyOne({ onContinue }) {
  const { setCurrentTrack } = useAudio();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setCurrentTrack('/audio/The_Inner_Temple.mp3');
  }, [setCurrentTrack]);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 17000);
    return () => clearTimeout(timer);
  }, []);

  const scriptParagraphs = [
    'Aura sealing means intentionally closing energetic loops after interaction or effort.',
    'You confirm your boundaries, release residue, and return attention to your center.',
    'Sealing prevents emotional spillover from accumulating across the day.',
    'A brief closure ritual can preserve vitality without disengaging from others.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleTwentyThreeBackdrop />
      <Module23Progress step={3} label="Aura Sealing" />
      <LyricalAnchor line={module23LyricLines.concept91} targetTime={module23LyricTimings.concept91} />

      <motion.div className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <p className="text-xs uppercase tracking-[0.24em] text-emerald-100/80">Concept 91 // Aura Sealing</p>
        {scriptParagraphs.map((text, index) => (
          <motion.p key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + index * 1.1, duration: 1.4, ease: 'easeOut' }}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div className="relative mt-16 h-12" initial={{ opacity: 0 }} animate={{ opacity: showButton ? 1 : 0 }}>
        <button onClick={onContinue} disabled={!showButton} className="px-8 py-3 tracking-widest text-xs uppercase border border-emerald-500/75 text-emerald-100 hover:bg-emerald-100 hover:text-black transition-colors duration-300 disabled:opacity-0 disabled:cursor-default">
          Open Heart-Space Listening
        </button>
      </motion.div>
    </main>
  );
}
