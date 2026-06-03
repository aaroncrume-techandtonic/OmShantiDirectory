import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module22Progress from './components/Module22Progress';
import ModuleTwentyTwoBackdrop from './components/ModuleTwentyTwoBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module22LyricLines, module22LyricTimings } from './module22LyricTimings';

export default function ConceptEightySix({ onContinue }) {
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
    'Frequency jewelry treats worn objects as reminders of chosen states and values.',
    'A ring, bracelet, or pendant becomes a cue for breath, posture, and intention.',
    'The object is not magic by itself; repetition makes it neurologically useful.',
    'Over time, touch and sight of the item can rapidly restore alignment.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleTwentyTwoBackdrop />
      <Module22Progress step={2} label="Frequency Jewelry" />
      <LyricalAnchor line={module22LyricLines.concept86} targetTime={module22LyricTimings.concept86} />

      <motion.div className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <p className="text-xs uppercase tracking-[0.24em] text-zinc-100/80">Concept 86 // Frequency Jewelry</p>
        {scriptParagraphs.map((text, index) => (
          <motion.p key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + index * 1.1, duration: 1.4, ease: 'easeOut' }}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div className="relative mt-16 h-12" initial={{ opacity: 0 }} animate={{ opacity: showButton ? 1 : 0 }}>
        <button onClick={onContinue} disabled={!showButton} className="px-8 py-3 tracking-widest text-xs uppercase border border-zinc-400/75 text-zinc-100 hover:bg-zinc-100 hover:text-black transition-colors duration-300 disabled:opacity-0 disabled:cursor-default">
          Practice Vibrational Tidying
        </button>
      </motion.div>
    </main>
  );
}
