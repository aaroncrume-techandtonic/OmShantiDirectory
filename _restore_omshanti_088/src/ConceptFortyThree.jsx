import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module11Progress from './components/Module11Progress';
import ModuleElevenBackdrop from './components/ModuleElevenBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module11LyricLines, module11LyricTimings } from './module11LyricTimings';

export default function ConceptFortyThree({ onContinue }) {
  const { setCurrentTrack } = useAudio();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setCurrentTrack('/audio/The_Crystal_Mind.mp3');
  }, [setCurrentTrack]);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 17000);
    return () => clearTimeout(timer);
  }, []);

  const scriptParagraphs = [
    'Crystal gridding is intention architecture through spatial arrangement.',
    'By placing symbols with deliberate geometry, you create a visual map your attention returns to repeatedly.',
    'The practice is less about objects doing magic and more about rehearsing coherent focus.',
    'Structure your space so your mind remembers what it serves.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-neutral-200 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleElevenBackdrop />
      <Module11Progress step={3} label="Crystal Gridding" />
      <LyricalAnchor line={module11LyricLines.concept43} targetTime={module11LyricTimings.concept43} />

      <motion.div className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <p className="text-xs uppercase tracking-[0.24em] text-sky-100/80">Concept 43 // Crystal Gridding</p>
        {scriptParagraphs.map((text, index) => (
          <motion.p key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + index * 1.1, duration: 1.4, ease: 'easeOut' }}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div className="relative mt-16 h-12" initial={{ opacity: 0 }} animate={{ opacity: showButton ? 1 : 0 }}>
        <button onClick={onContinue} disabled={!showButton} className="px-8 py-3 tracking-widest text-xs uppercase border border-sky-500/75 text-sky-100 hover:bg-sky-100 hover:text-black transition-colors duration-300 disabled:opacity-0 disabled:cursor-default">
          Enter Dream Incubation
        </button>
      </motion.div>
    </main>
  );
}
