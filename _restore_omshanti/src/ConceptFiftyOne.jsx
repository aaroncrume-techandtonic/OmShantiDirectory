import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module13Progress from './components/Module13Progress';
import ModuleThirteenBackdrop from './components/ModuleThirteenBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module13LyricLines, module13LyricTimings } from './module13LyricTimings';

export default function ConceptFiftyOne({ onContinue }) {
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
    'Ego dissolution is not self-erasure. It is loosening the compulsive need to defend an image.',
    'When identity softens, perception widens and reactive scripts lose command.',
    'You stop performing certainty and start listening for what is actually true in the moment.',
    'The observer grows stronger as the mask grows lighter.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-neutral-200 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleThirteenBackdrop />
      <Module13Progress step={3} label="Ego Dissolution" />
      <LyricalAnchor line={module13LyricLines.concept51} targetTime={module13LyricTimings.concept51} />

      <motion.div className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <p className="text-xs uppercase tracking-[0.24em] text-rose-100/80">Concept 51 // Ego Dissolution</p>
        {scriptParagraphs.map((text, index) => (
          <motion.p key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + index * 1.1, duration: 1.4, ease: 'easeOut' }}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div className="relative mt-16 h-12" initial={{ opacity: 0 }} animate={{ opacity: showButton ? 1 : 0 }}>
        <button onClick={onContinue} disabled={!showButton} className="px-8 py-3 tracking-widest text-xs uppercase border border-rose-500/75 text-rose-100 hover:bg-rose-100 hover:text-black transition-colors duration-300 disabled:opacity-0 disabled:cursor-default">
          Begin Tonal Humming
        </button>
      </motion.div>
    </main>
  );
}
