import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module2Progress from './components/Module2Progress';
import ModuleTwoBackdrop from './components/ModuleTwoBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module2LyricLines, module2LyricTimings } from './module2LyricTimings';

export default function ConceptEight({ onContinue }) {
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
    'The sanctuary is not defined by its walls, but by its gates. What do you allow inside?',
    'Conscious intake is the realization that everything you consume is food for the sanctuary. The music you listen to, the conversations you engage in, the media you scroll through-all of it carries a specific frequency.',
    'To maintain a high-vibe space, you must become the gatekeeper of your attention.',
    'You cannot fill your mind with low-frequency noise and expect to cultivate high-frequency wisdom.',
    'The sanctuary grows through the heart, and the heart is nourished by what you choose to let in.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-neutral-200 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleTwoBackdrop />
      <Module2Progress step={4} label="Conscious Intake" />
      <LyricalAnchor
        line={module2LyricLines.concept8}
        targetTime={module2LyricTimings.concept8}
      />

      <motion.div
        className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <p className="text-xs uppercase tracking-[0.24em] text-teal-200/70">Concept 8 // Conscious Intake</p>
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
          Draft Sanctuary Blueprint
        </button>
      </motion.div>
    </main>
  );
}
