import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module2Progress from './components/Module2Progress';
import ModuleTwoBackdrop from './components/ModuleTwoBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module2LyricLines, module2LyricTimings } from './module2LyricTimings';

export default function ConceptFive({ onContinue }) {
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
    'You have established your intention. Now, where will you cultivate it?',
    'A sanctuary is not just a quiet room; it is a space vibrating with deliberate energy. Your environment is a reflection of your mind, and your mind is influenced by your environment. This is a feedback loop.',
    'To learn these concepts deeply, you cannot sit in the middle of clutter, chaos, or stagnant energy. The prana-the life force-must be able to flow freely.',
    'Take a moment to look at your physical surroundings. Is this a space that supports your growth? If not, it is time to cleanse it.',
    'A high-vibe space is a non-negotiable requirement for the work ahead.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-neutral-200 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleTwoBackdrop />
      <Module2Progress step={1} label="High-Vibe Space" />
      <LyricalAnchor
        line={module2LyricLines.concept5}
        targetTime={module2LyricTimings.concept5}
      />

      <motion.div
        className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <p className="text-xs uppercase tracking-[0.24em] text-teal-200/70">Concept 5 // High-Vibe Space</p>
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
          Anchor The Intention
        </button>
      </motion.div>
    </main>
  );
}
