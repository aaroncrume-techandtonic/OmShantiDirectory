import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module2Progress from './components/Module2Progress';
import ModuleTwoBackdrop from './components/ModuleTwoBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module2LyricLines, module2LyricTimings } from './module2LyricTimings';

export default function ConceptSeven({ onContinue }) {
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
    'The sanctuary cannot hold both peace and resentment.',
    'As you build this space, you will encounter old wounds and current frustrations. The practice of Metta-loving-kindness-is the solvent that dissolves these blockages.',
    'It begins with you, radiating outward. Send the love not just to those who support you, but to the friend and the foe.',
    'When you extend compassion to the source of your friction, you disarm it. You neutralize the negative charge.',
    'This is not about passive acceptance; it is an active, powerful projection of energy that protects the vibration of your sanctuary.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-neutral-200 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleTwoBackdrop />
      <Module2Progress step={3} label="Metta Meditation" />
      <LyricalAnchor
        line={module2LyricLines.concept7}
        targetTime={module2LyricTimings.concept7}
      />

      <motion.div
        className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <p className="text-xs uppercase tracking-[0.24em] text-teal-200/70">Concept 7 // Metta Meditation</p>
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
          Guard The Gates
        </button>
      </motion.div>
    </main>
  );
}
