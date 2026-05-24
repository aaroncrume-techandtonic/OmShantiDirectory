import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module16Progress from './components/Module16Progress';
import ModuleSixteenBackdrop from './components/ModuleSixteenBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module16LyricLines, module16LyricTimings } from './module16LyricTimings';

export default function ConceptSixtyThree({ onContinue }) {
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
    'Vibrational fasting is selective abstinence from inputs that dysregulate your energy.',
    'You reduce noise, stimulation, and habits that keep your mind in constant fragmentation.',
    'Fasting creates space for cleaner signals, better recovery, and more coherent decision-making.',
    'What you stop consuming is as formative as what you practice.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-neutral-200 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleSixteenBackdrop />
      <Module16Progress step={3} label="Vibrational Fasting" />
      <LyricalAnchor line={module16LyricLines.concept63} targetTime={module16LyricTimings.concept63} />

      <motion.div className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <p className="text-xs uppercase tracking-[0.24em] text-orange-100/80">Concept 63 // Vibrational Fasting</p>
        {scriptParagraphs.map((text, index) => (
          <motion.p key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + index * 1.1, duration: 1.4, ease: 'easeOut' }}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div className="relative mt-16 h-12" initial={{ opacity: 0 }} animate={{ opacity: showButton ? 1 : 0 }}>
        <button onClick={onContinue} disabled={!showButton} className="px-8 py-3 tracking-widest text-xs uppercase border border-orange-500/75 text-orange-100 hover:bg-orange-100 hover:text-black transition-colors duration-300 disabled:opacity-0 disabled:cursor-default">
          Align Heart-Coherence
        </button>
      </motion.div>
    </main>
  );
}
