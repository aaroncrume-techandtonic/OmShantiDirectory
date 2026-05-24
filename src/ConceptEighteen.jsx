import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module5Progress from './components/Module5Progress';
import ModuleFiveBackdrop from './components/ModuleFiveBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module5LyricLines, module5LyricTimings } from './module5LyricTimings';

export default function ConceptEighteen({ onContinue }) {
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
    'You are the leading edge of a bloodline that stretches back to the beginning of human history. You have inherited your ancestors\' resilience, but you have also inherited their unprocessed trauma, their survival mechanisms, and their fears.',
    'Many of the invisible walls you hit in your daily life were built by people who came before you. Ancestral healing is the realization that the loop stops here.',
    'You are the current iteration of the lineage. By doing this work, you are reaching backward through time, washing the ancient bloodlines clean.',
    'When you heal the pattern in yourself, you liberate the ghosts of the past and the generations of the future.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-neutral-200 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleFiveBackdrop />
      <Module5Progress step={2} label="Ancestral Healing" />
      <LyricalAnchor line={module5LyricLines.concept18} targetTime={module5LyricTimings.concept18} />

      <motion.div className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <p className="text-xs uppercase tracking-[0.24em] text-rose-100/75">Concept 18 // Ancestral Healing</p>
        {scriptParagraphs.map((text, index) => (
          <motion.p key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + index * 1.1, duration: 1.4, ease: 'easeOut' }}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div className="relative mt-16 h-12" initial={{ opacity: 0 }} animate={{ opacity: showButton ? 1 : 0 }}>
        <button onClick={onContinue} disabled={!showButton} className="px-8 py-3 tracking-widest text-xs uppercase border border-rose-700/70 text-rose-100 hover:bg-rose-100 hover:text-black transition-colors duration-300 disabled:opacity-0 disabled:cursor-default">
          Alchemize The Word
        </button>
      </motion.div>
    </main>
  );
}
