import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module16Progress from './components/Module16Progress';
import ModuleSixteenBackdrop from './components/ModuleSixteenBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module16LyricLines, module16LyricTimings } from './module16LyricTimings';

export default function ConceptSixtyTwo({ onContinue }) {
  const { setCurrentTrack } = useAudio();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setCurrentTrack('/audio/The_Element_s_Path.mp3');
  }, [setCurrentTrack]);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 17000);
    return () => clearTimeout(timer);
  }, []);

  const scriptParagraphs = [
    'Soul-calling is a deliberate invitation to your highest values and clearest direction.',
    'You ask for guidance, then listen with enough stillness to notice what returns consistently.',
    'Calling is completed through action, not only feeling.',
    'When you answer the call in small steps, purpose becomes embodied instead of abstract.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-neutral-200 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleSixteenBackdrop />
      <Module16Progress step={2} label="Soul-Calling" />
      <LyricalAnchor line={module16LyricLines.concept62} targetTime={module16LyricTimings.concept62} />

      <motion.div className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <p className="text-xs uppercase tracking-[0.24em] text-orange-100/80">Concept 62 // Soul-Calling</p>
        {scriptParagraphs.map((text, index) => (
          <motion.p key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + index * 1.1, duration: 1.4, ease: 'easeOut' }}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div className="relative mt-16 h-12" initial={{ opacity: 0 }} animate={{ opacity: showButton ? 1 : 0 }}>
        <button onClick={onContinue} disabled={!showButton} className="px-8 py-3 tracking-widest text-xs uppercase border border-orange-500/75 text-orange-100 hover:bg-orange-100 hover:text-black transition-colors duration-300 disabled:opacity-0 disabled:cursor-default">
          Start Vibrational Fasting
        </button>
      </motion.div>
    </main>
  );
}
