import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module3Progress from './components/Module3Progress';
import ModuleThreeBackdrop from './components/ModuleThreeBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module3LyricLines, module3LyricTimings } from './module3LyricTimings';

export default function ConceptNine({ onContinue }) {
  const { setCurrentTrack } = useAudio();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setCurrentTrack('/audio/Earthing_Mirror.mp3');
  }, [setCurrentTrack]);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 17000);
    return () => clearTimeout(timer);
  }, []);

  const scriptParagraphs = [
    'You have cleansed your physical space. Now, you must secure your energetic core.',
    'Think of your energy centers-your chakras-as open windows. When left unmanaged, the prevailing winds of other people\'s stress, societal anxiety, and digital noise blow right through you, scattering your focus and draining your reserves.',
    'Guarding the core means learning when to close the windows. It is the conscious decision to define where your energy ends and the world\'s demands begin.',
    'Boundaries are not walls of isolation; they are semi-permeable membranes. They let in what nourishes you and block what depletes you.',
    'Let the boundaries stand. Your energy is currency. Spend it where it matters.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-neutral-200 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleThreeBackdrop />
      <Module3Progress step={1} label="Chakra Boundaries" />
      <LyricalAnchor line={module3LyricLines.concept9} targetTime={module3LyricTimings.concept9} />

      <motion.div className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <p className="text-xs uppercase tracking-[0.24em] text-amber-100/75">Concept 9 // Chakra Boundaries</p>
        {scriptParagraphs.map((text, index) => (
          <motion.p key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + index * 1.1, duration: 1.4, ease: 'easeOut' }}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div className="relative mt-16 h-12" initial={{ opacity: 0 }} animate={{ opacity: showButton ? 1 : 0 }}>
        <button onClick={onContinue} disabled={!showButton} className="px-8 py-3 tracking-widest text-xs uppercase border border-amber-700/70 text-amber-100 hover:bg-amber-100 hover:text-black transition-colors duration-300 disabled:opacity-0 disabled:cursor-default">
          Ground The Charge
        </button>
      </motion.div>
    </main>
  );
}
