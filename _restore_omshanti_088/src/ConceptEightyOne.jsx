import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module21Progress from './components/Module21Progress';
import ModuleTwentyOneBackdrop from './components/ModuleTwentyOneBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module21LyricLines, module21LyricTimings } from './module21LyricTimings';

export default function ConceptEightyOne({ onContinue }) {
  const { setCurrentTrack } = useAudio();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setCurrentTrack('/audio/The_Silver_Cord.mp3');
  }, [setCurrentTrack]);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 17000);
    return () => clearTimeout(timer);
  }, []);

  const scriptParagraphs = [
    'Energy tying links intention to action through small repeatable commitments.',
    'You secure one clear thread each day so your focus does not scatter across impulses.',
    'The cord is symbolic and practical: what you choose to reinforce grows stronger.',
    'Consistent ties create momentum that outlasts mood and distraction.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleTwentyOneBackdrop />
      <Module21Progress step={1} label="Energy Tying" />
      <LyricalAnchor line={module21LyricLines.concept81} targetTime={module21LyricTimings.concept81} />

      <motion.div className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <p className="text-xs uppercase tracking-[0.24em] text-amber-100/80">Concept 81 // Energy Tying</p>
        {scriptParagraphs.map((text, index) => (
          <motion.p key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + index * 1.1, duration: 1.4, ease: 'easeOut' }}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div className="relative mt-16 h-12" initial={{ opacity: 0 }} animate={{ opacity: showButton ? 1 : 0 }}>
        <button onClick={onContinue} disabled={!showButton} className="px-8 py-3 tracking-widest text-xs uppercase border border-amber-500/75 text-amber-100 hover:bg-amber-100 hover:text-black transition-colors duration-300 disabled:opacity-0 disabled:cursor-default">
          Begin Pranic Showering
        </button>
      </motion.div>
    </main>
  );
}
