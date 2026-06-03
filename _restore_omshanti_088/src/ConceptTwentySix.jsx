import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module7Progress from './components/Module7Progress';
import ModuleSevenBackdrop from './components/ModuleSevenBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module7LyricLines, module7LyricTimings } from './module7LyricTimings';

export default function ConceptTwentySix({ onContinue }) {
  const { setCurrentTrack } = useAudio();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setCurrentTrack('/audio/The_Water_Altar.mp3');
  }, [setCurrentTrack]);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 17000);
    return () => clearTimeout(timer);
  }, []);

  const scriptParagraphs = [
    'A manifestation altar is a physical dashboard for intention.',
    'It externalizes your inner commitments into symbols your brain sees every day, reducing drift and indecision.',
    'Choose only objects that carry emotional truth: a stone, a card, a note, a candle, a photograph.',
    'The altar is not superstition. It is environmental design for consciousness.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-neutral-200 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleSevenBackdrop />
      <Module7Progress step={2} label="Manifestation Altars" />
      <LyricalAnchor line={module7LyricLines.concept26} targetTime={module7LyricTimings.concept26} />

      <motion.div className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <p className="text-xs uppercase tracking-[0.24em] text-amber-100/80">Concept 26 // Manifestation Altars</p>
        {scriptParagraphs.map((text, index) => (
          <motion.p key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + index * 1.1, duration: 1.4, ease: 'easeOut' }}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div className="relative mt-16 h-12" initial={{ opacity: 0 }} animate={{ opacity: showButton ? 1 : 0 }}>
        <button onClick={onContinue} disabled={!showButton} className="px-8 py-3 tracking-widest text-xs uppercase border border-amber-500/75 text-amber-100 hover:bg-amber-100 hover:text-black transition-colors duration-300 disabled:opacity-0 disabled:cursor-default">
          Bless The Water
        </button>
      </motion.div>
    </main>
  );
}
