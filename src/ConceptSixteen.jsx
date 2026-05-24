import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module4Progress from './components/Module4Progress';
import ModuleFourBackdrop from './components/ModuleFourBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module4LyricLines, module4LyricTimings } from './module4LyricTimings';

export default function ConceptSixteen({ onContinue }) {
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
    'You interact with the world not just through your words and actions, but through your energetic field. Your aura acts like a sponge, absorbing the ambient stress, projected emotions, and chaotic frequencies of everything you encounter.',
    'Just as you wash your physical body to remove the dirt of the day, you must wash your energetic body. If you do not, the residue builds up, clouding your intuition and making you heavy.',
    'There is nowhere to hide from the friction of the world, but you do not have to carry it with you.',
    'Whether through water, smoke, sound, or pure visualization, washing the aura is the final step of the clearing.',
    'Stand clean in the center of your sanctuary.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-neutral-200 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleFourBackdrop />
      <Module4Progress step={4} label="Aura Cleansing" />
      <LyricalAnchor line={module4LyricLines.concept16} targetTime={module4LyricTimings.concept16} />

      <motion.div className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <p className="text-xs uppercase tracking-[0.24em] text-violet-100/75">Concept 16 // Aura Cleansing</p>
        {scriptParagraphs.map((text, index) => (
          <motion.p key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + index * 1.1, duration: 1.4, ease: 'easeOut' }}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div className="relative mt-16 h-12" initial={{ opacity: 0 }} animate={{ opacity: showButton ? 1 : 0 }}>
        <button onClick={onContinue} disabled={!showButton} className="px-8 py-3 tracking-widest text-xs uppercase border border-violet-700/70 text-violet-100 hover:bg-violet-100 hover:text-black transition-colors duration-300 disabled:opacity-0 disabled:cursor-default">
          Draft Clearing Protocol
        </button>
      </motion.div>
    </main>
  );
}
