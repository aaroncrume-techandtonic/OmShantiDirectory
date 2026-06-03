import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module3Progress from './components/Module3Progress';
import ModuleThreeBackdrop from './components/ModuleThreeBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module3LyricLines, module3LyricTimings } from './module3LyricTimings';

export default function ConceptEleven({ onContinue }) {
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
    'There is a misconception that the work must be dramatic. We look for profound awakenings, massive life changes, or grand gestures of service.',
    'But true lightwork is rarely loud. It is found in the quiet, mundane moments where you choose intention over reaction.',
    'It is the breath you take before responding to an abrasive email. It is the conscious decision to leave your phone in another room. It is watering a plant with full attention.',
    'Sacred work is built on small deeds. It is the accumulation of microscopic shifts in perspective.',
    'Do not look for the grand stage. Do the small work, right where you are.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-neutral-200 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleThreeBackdrop />
      <Module3Progress step={3} label="Lightwork" />
      <LyricalAnchor line={module3LyricLines.concept11} targetTime={module3LyricTimings.concept11} />

      <motion.div className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <p className="text-xs uppercase tracking-[0.24em] text-amber-100/75">Concept 11 // Lightwork</p>
        {scriptParagraphs.map((text, index) => (
          <motion.p key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + index * 1.1, duration: 1.4, ease: 'easeOut' }}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div className="relative mt-16 h-12" initial={{ opacity: 0 }} animate={{ opacity: showButton ? 1 : 0 }}>
        <button onClick={onContinue} disabled={!showButton} className="px-8 py-3 tracking-widest text-xs uppercase border border-amber-700/70 text-amber-100 hover:bg-amber-100 hover:text-black transition-colors duration-300 disabled:opacity-0 disabled:cursor-default">
          Study The Mirror
        </button>
      </motion.div>
    </main>
  );
}
