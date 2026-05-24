import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module2Progress from './components/Module2Progress';
import ModuleTwoBackdrop from './components/ModuleTwoBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module2LyricLines, module2LyricTimings } from './module2LyricTimings';

export default function ConceptSix({ onContinue }) {
  const { setCurrentTrack } = useAudio();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setCurrentTrack('/audio/Resonant_Sanctuary.mp3');
  }, [setCurrentTrack]);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 16000);
    return () => clearTimeout(timer);
  }, []);

  const scriptParagraphs = [
    'Intention is powerful, but it is invisible. It can be easily forgotten when the friction of daily life returns.',
    'To protect the sanctuary, we use physical anchors. A stone, a crystal, or any object of meaning serves as a battery for your intention. When you hold it, you charge it with the purpose you established in Module 1.',
    'The rose quartz does not do the work for you; it reminds you of the work you promised to do.',
    'It grounds the abstract wisdom of the spirit into the tangible reality of the physical world.',
    'Choose your anchor. Let it sit in your sanctuary as a constant, silent witness to your journey.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-neutral-200 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleTwoBackdrop />
      <Module2Progress step={2} label="Crystalline Anchors" />
      <LyricalAnchor
        line={module2LyricLines.concept6}
        targetTime={module2LyricTimings.concept6}
      />

      <motion.div
        className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <p className="text-xs uppercase tracking-[0.24em] text-teal-200/70">Concept 6 // Crystalline Anchors</p>
        {scriptParagraphs.map((text, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + index * 1.1, duration: 1.4, ease: 'easeOut' }}
          >
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div className="relative mt-16 h-12" initial={{ opacity: 0 }} animate={{ opacity: showButton ? 1 : 0 }}>
        <button
          onClick={onContinue}
          disabled={!showButton}
          className="px-8 py-3 tracking-widest text-xs uppercase border border-teal-700/70 text-teal-100 hover:bg-teal-100 hover:text-black transition-colors duration-300 disabled:opacity-0 disabled:cursor-default"
        >
          Expand Compassion
        </button>
      </motion.div>
    </main>
  );
}
