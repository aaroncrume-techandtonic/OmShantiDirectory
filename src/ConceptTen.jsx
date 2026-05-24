import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module3Progress from './components/Module3Progress';
import ModuleThreeBackdrop from './components/ModuleThreeBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module3LyricLines, module3LyricTimings } from './module3LyricTimings';

export default function ConceptTen({ onContinue }) {
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
    'Even with strong boundaries, the friction of learning and the static of daily life will build up a charge in your system. You are a closed circuit, and right now, you might be carrying too much voltage.',
    'Earthing is the mechanism for discharging that voltage. It is the literal, physical connection to the land.',
    'When your bare feet touch the earth, you complete the circuit. The ground absorbs the excess static, pulling it out of your overactive mind and down through your body.',
    'This is not a metaphor. It is a biological reset. When the mind spins out of control, the fastest way back to the still point is through the soles of your feet.',
    'Let the land heal the frantic pace.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-neutral-200 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleThreeBackdrop />
      <Module3Progress step={2} label="Earthing" />
      <LyricalAnchor line={module3LyricLines.concept10} targetTime={module3LyricTimings.concept10} />

      <motion.div className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <p className="text-xs uppercase tracking-[0.24em] text-amber-100/75">Concept 10 // Earthing</p>
        {scriptParagraphs.map((text, index) => (
          <motion.p key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + index * 1.1, duration: 1.4, ease: 'easeOut' }}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div className="relative mt-16 h-12" initial={{ opacity: 0 }} animate={{ opacity: showButton ? 1 : 0 }}>
        <button onClick={onContinue} disabled={!showButton} className="px-8 py-3 tracking-widest text-xs uppercase border border-amber-700/70 text-amber-100 hover:bg-amber-100 hover:text-black transition-colors duration-300 disabled:opacity-0 disabled:cursor-default">
          Practice Lightwork
        </button>
      </motion.div>
    </main>
  );
}
