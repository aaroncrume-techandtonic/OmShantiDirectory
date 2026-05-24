import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module8Progress from './components/Module8Progress';
import ModuleEightBackdrop from './components/ModuleEightBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module8LyricLines, module8LyricTimings } from './module8LyricTimings';

export default function ConceptTwentyNine({ onContinue }) {
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
    'Soul contracts are the agreements your higher self makes around growth, relationship, and service.',
    'Seeing challenge through this lens does not glorify pain. It restores agency by locating meaning inside friction.',
    'Ask what this moment is training, not only what it is taking.',
    'When meaning returns, fear loosens and movement becomes possible.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-neutral-200 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleEightBackdrop />
      <Module8Progress step={1} label="Soul Contracts" />
      <LyricalAnchor line={module8LyricLines.concept29} targetTime={module8LyricTimings.concept29} />

      <motion.div className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <p className="text-xs uppercase tracking-[0.24em] text-yellow-100/80">Concept 29 // Soul Contracts</p>
        {scriptParagraphs.map((text, index) => (
          <motion.p key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + index * 1.1, duration: 1.4, ease: 'easeOut' }}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div className="relative mt-16 h-12" initial={{ opacity: 0 }} animate={{ opacity: showButton ? 1 : 0 }}>
        <button onClick={onContinue} disabled={!showButton} className="px-8 py-3 tracking-widest text-xs uppercase border border-yellow-500/75 text-yellow-100 hover:bg-yellow-100 hover:text-black transition-colors duration-300 disabled:opacity-0 disabled:cursor-default">
          Enter Laughter Medicine
        </button>
      </motion.div>
    </main>
  );
}
