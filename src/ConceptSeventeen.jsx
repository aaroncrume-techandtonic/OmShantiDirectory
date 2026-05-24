import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module5Progress from './components/Module5Progress';
import ModuleFiveBackdrop from './components/ModuleFiveBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module5LyricLines, module5LyricTimings } from './module5LyricTimings';

export default function ConceptSeventeen({ onContinue }) {
  const { setCurrentTrack } = useAudio();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setCurrentTrack('/audio/Shadows_of_the_Lineage.mp3');
  }, [setCurrentTrack]);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 17000);
    return () => clearTimeout(timer);
  }, []);

  const scriptParagraphs = [
    'The human brain is wired for survival, which means it is naturally obsessed with what is missing, what is broken, and what is dangerous. If left unchecked, your baseline frequency will always default to lack.',
    'Gratitude is the conscious override of this system. But it is not a passive feeling; it is a discipline.',
    'To write the wins the soul has seen is to gather hard evidence that you are supported, growing, and capable.',
    'Do not just think about what you are thankful for. Ink it into existence.',
    'When you document the light, you build the psychological armor required to venture into the dark.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-neutral-200 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleFiveBackdrop />
      <Module5Progress step={1} label="Gratitude Journaling" />
      <LyricalAnchor line={module5LyricLines.concept17} targetTime={module5LyricTimings.concept17} />

      <motion.div className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <p className="text-xs uppercase tracking-[0.24em] text-rose-100/75">Concept 17 // Gratitude Journaling</p>
        {scriptParagraphs.map((text, index) => (
          <motion.p key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + index * 1.1, duration: 1.4, ease: 'easeOut' }}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div className="relative mt-16 h-12" initial={{ opacity: 0 }} animate={{ opacity: showButton ? 1 : 0 }}>
        <button onClick={onContinue} disabled={!showButton} className="px-8 py-3 tracking-widest text-xs uppercase border border-rose-700/70 text-rose-100 hover:bg-rose-100 hover:text-black transition-colors duration-300 disabled:opacity-0 disabled:cursor-default">
          Clean The Bloodline
        </button>
      </motion.div>
    </main>
  );
}
