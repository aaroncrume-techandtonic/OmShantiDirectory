import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module4Progress from './components/Module4Progress';
import ModuleFourBackdrop from './components/ModuleFourBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module4LyricLines, module4LyricTimings } from './module4LyricTimings';

export default function ConceptFourteen({ onContinue }) {
  const { setCurrentTrack } = useAudio();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setCurrentTrack('/audio/Silent_Clearing.mp3');
  }, [setCurrentTrack]);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 17000);
    return () => clearTimeout(timer);
  }, []);

  const scriptParagraphs = [
    'We are taught that forgiveness is a gift we give to those who have wronged us. This is a misunderstanding.',
    'True forgiveness is an act of profound self-preservation. When you hold onto anger, fear, or doubt, you are keeping an energetic cord plugged directly into the person or situation that caused it. They are draining your battery from miles away, years later.',
    'Quantum forgiveness is the sharp swing of the blade.',
    'It is not about absolving them of their actions; it is about reclaiming your power. You forgive to cut the cord. You forgive so that your energy belongs entirely to you again.',
    'Identify the cord pulling at your attention right now. Take a breath, and sever it.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-neutral-200 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleFourBackdrop />
      <Module4Progress step={2} label="Quantum Forgiveness" />
      <LyricalAnchor line={module4LyricLines.concept14} targetTime={module4LyricTimings.concept14} />

      <motion.div className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <p className="text-xs uppercase tracking-[0.24em] text-violet-100/75">Concept 14 // Quantum Forgiveness</p>
        {scriptParagraphs.map((text, index) => (
          <motion.p key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + index * 1.1, duration: 1.4, ease: 'easeOut' }}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div className="relative mt-16 h-12" initial={{ opacity: 0 }} animate={{ opacity: showButton ? 1 : 0 }}>
        <button onClick={onContinue} disabled={!showButton} className="px-8 py-3 tracking-widest text-xs uppercase border border-violet-700/70 text-violet-100 hover:bg-violet-100 hover:text-black transition-colors duration-300 disabled:opacity-0 disabled:cursor-default">
          Enter Sacred Silence
        </button>
      </motion.div>
    </main>
  );
}
