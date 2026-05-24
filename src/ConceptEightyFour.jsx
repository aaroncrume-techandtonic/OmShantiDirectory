import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module21Progress from './components/Module21Progress';
import ModuleTwentyOneBackdrop from './components/ModuleTwentyOneBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module21LyricLines, module21LyricTimings } from './module21LyricTimings';

export default function ConceptEightyFour({ onContinue }) {
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
    'Heart-breath sync uses paced breathing to bring cardiovascular and emotional rhythms into coherence.',
    'When breath cadence is steady, attention settles and the body receives a clear safety signal.',
    'Coherence is trainable and becomes a portable reset during conflict or overload.',
    'Sustained heart-breath practice improves regulation, clarity, and relational presence.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleTwentyOneBackdrop />
      <Module21Progress step={4} label="Heart-Breath Sync" />
      <LyricalAnchor line={module21LyricLines.concept84} targetTime={module21LyricTimings.concept84} />

      <motion.div className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <p className="text-xs uppercase tracking-[0.24em] text-amber-100/80">Concept 84 // Heart-Breath Sync</p>
        {scriptParagraphs.map((text, index) => (
          <motion.p key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + index * 1.1, duration: 1.4, ease: 'easeOut' }}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div className="relative mt-16 h-12" initial={{ opacity: 0 }} animate={{ opacity: showButton ? 1 : 0 }}>
        <button onClick={onContinue} disabled={!showButton} className="px-8 py-3 tracking-widest text-xs uppercase border border-amber-500/75 text-amber-100 hover:bg-amber-100 hover:text-black transition-colors duration-300 disabled:opacity-0 disabled:cursor-default">
          Draft Silver Cord Protocol
        </button>
      </motion.div>
    </main>
  );
}
