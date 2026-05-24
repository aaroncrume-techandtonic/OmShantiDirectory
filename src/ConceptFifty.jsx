import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module13Progress from './components/Module13Progress';
import ModuleThirteenBackdrop from './components/ModuleThirteenBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module13LyricLines, module13LyricTimings } from './module13LyricTimings';

export default function ConceptFifty({ onContinue }) {
  const { setCurrentTrack } = useAudio();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setCurrentTrack('/audio/The_Ego_s_End.mp3');
  }, [setCurrentTrack]);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 17000);
    return () => clearTimeout(timer);
  }, []);

  const scriptParagraphs = [
    'Vibrational gardening treats your growing space as a feedback system for your inner climate.',
    'The rhythms of watering, pruning, and observing become a moving meditation in patience.',
    'As the garden stabilizes, your attention stabilizes with it.',
    'Tend living things long enough, and your nervous system remembers steadiness.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-neutral-200 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleThirteenBackdrop />
      <Module13Progress step={2} label="Vibrational Gardening" />
      <LyricalAnchor line={module13LyricLines.concept50} targetTime={module13LyricTimings.concept50} />

      <motion.div className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <p className="text-xs uppercase tracking-[0.24em] text-rose-100/80">Concept 50 // Vibrational Gardening</p>
        {scriptParagraphs.map((text, index) => (
          <motion.p key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + index * 1.1, duration: 1.4, ease: 'easeOut' }}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div className="relative mt-16 h-12" initial={{ opacity: 0 }} animate={{ opacity: showButton ? 1 : 0 }}>
        <button onClick={onContinue} disabled={!showButton} className="px-8 py-3 tracking-widest text-xs uppercase border border-rose-500/75 text-rose-100 hover:bg-rose-100 hover:text-black transition-colors duration-300 disabled:opacity-0 disabled:cursor-default">
          Practice Ego Dissolution
        </button>
      </motion.div>
    </main>
  );
}
