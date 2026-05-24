import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module4Progress from './components/Module4Progress';
import ModuleFourBackdrop from './components/ModuleFourBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module4LyricLines, module4LyricTimings } from './module4LyricTimings';

export default function ConceptFifteen({ onContinue }) {
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
    'There is a difference between an empty room and a sacred space. The same is true for the mind.',
    'You have turned off the digital noise. You have breathed out the physical tension. You have cut the cords of the past. Now, you must sit in what remains. This is Sacred Silence.',
    'Silence is not empty; it is full of answers. But you cannot hear the guide if you are constantly speaking, planning, or worrying. The intuition you are searching for operates on a very low, quiet frequency.',
    'Stop trying to figure it out. Stop demanding a resolution.',
    'Sit in the silence. The answers will arise on their own schedule, not yours.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-neutral-200 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleFourBackdrop />
      <Module4Progress step={3} label="Sacred Silence" />
      <LyricalAnchor line={module4LyricLines.concept15} targetTime={module4LyricTimings.concept15} />

      <motion.div className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <p className="text-xs uppercase tracking-[0.24em] text-violet-100/75">Concept 15 // Sacred Silence</p>
        {scriptParagraphs.map((text, index) => (
          <motion.p key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + index * 1.1, duration: 1.4, ease: 'easeOut' }}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div className="relative mt-16 h-12" initial={{ opacity: 0 }} animate={{ opacity: showButton ? 1 : 0 }}>
        <button onClick={onContinue} disabled={!showButton} className="px-8 py-3 tracking-widest text-xs uppercase border border-violet-700/70 text-violet-100 hover:bg-violet-100 hover:text-black transition-colors duration-300 disabled:opacity-0 disabled:cursor-default">
          Clean The Field
        </button>
      </motion.div>
    </main>
  );
}
