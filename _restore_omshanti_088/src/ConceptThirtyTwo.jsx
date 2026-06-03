import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module8Progress from './components/Module8Progress';
import ModuleEightBackdrop from './components/ModuleEightBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module8LyricLines, module8LyricTimings } from './module8LyricTimings';

export default function ConceptThirtyTwo({ onContinue }) {
  const { setCurrentTrack } = useAudio();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setCurrentTrack('/audio/Shield_of_the_Sun.mp3');
  }, [setCurrentTrack]);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 17000);
    return () => clearTimeout(timer);
  }, []);

  const scriptParagraphs = [
    'Sun gazing, when practiced safely at low-angle sunlight windows, can become a grounding ritual of light exposure and intention.',
    'The point is not strain. The point is reverence, circadian alignment, and receiving warmth consciously.',
    'Stand in early morning or late evening light, soften your gaze, and synchronize breath with gratitude.',
    'A golden bubble holds the light because you choose to meet it deliberately.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-neutral-200 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleEightBackdrop />
      <Module8Progress step={4} label="Sun Gazing" />
      <LyricalAnchor line={module8LyricLines.concept32} targetTime={module8LyricTimings.concept32} />

      <motion.div className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <p className="text-xs uppercase tracking-[0.24em] text-yellow-100/80">Concept 32 // Sun Gazing</p>
        {scriptParagraphs.map((text, index) => (
          <motion.p key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + index * 1.1, duration: 1.4, ease: 'easeOut' }}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div className="relative mt-16 h-12" initial={{ opacity: 0 }} animate={{ opacity: showButton ? 1 : 0 }}>
        <button onClick={onContinue} disabled={!showButton} className="px-8 py-3 tracking-widest text-xs uppercase border border-yellow-500/75 text-yellow-100 hover:bg-yellow-100 hover:text-black transition-colors duration-300 disabled:opacity-0 disabled:cursor-default">
          Draft Shield Protocol
        </button>
      </motion.div>
    </main>
  );
}
