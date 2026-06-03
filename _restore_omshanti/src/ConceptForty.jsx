import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module10Progress from './components/Module10Progress';
import ModuleTenBackdrop from './components/ModuleTenBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module10LyricLines, module10LyricTimings } from './module10LyricTimings';

export default function ConceptForty({ onContinue }) {
  const { setCurrentTrack } = useAudio();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setCurrentTrack('/audio/Voices_of_Gaia.mp3');
  }, [setCurrentTrack]);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 17000);
    return () => clearTimeout(timer);
  }, []);

  const scriptParagraphs = [
    'Spirit guide dialogue is a structured listening practice for intuition and conscience.',
    'Whether interpreted psychologically or spiritually, the process is the same: ask clean questions and write the first clear response without over-editing.',
    'Guidance grows stronger when paired with action and review, not passive wishing.',
    'Dialogue becomes trustworthy when it consistently points you toward courage, humility, and service.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-neutral-200 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleTenBackdrop />
      <Module10Progress step={4} label="Spirit Guide Dialogue" />
      <LyricalAnchor line={module10LyricLines.concept40} targetTime={module10LyricTimings.concept40} />

      <motion.div className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <p className="text-xs uppercase tracking-[0.24em] text-emerald-100/80">Concept 40 // Spirit Guide Dialogue</p>
        {scriptParagraphs.map((text, index) => (
          <motion.p key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + index * 1.1, duration: 1.4, ease: 'easeOut' }}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div className="relative mt-16 h-12" initial={{ opacity: 0 }} animate={{ opacity: showButton ? 1 : 0 }}>
        <button onClick={onContinue} disabled={!showButton} className="px-8 py-3 tracking-widest text-xs uppercase border border-emerald-500/75 text-emerald-100 hover:bg-emerald-100 hover:text-black transition-colors duration-300 disabled:opacity-0 disabled:cursor-default">
          Draft Gaia Protocol
        </button>
      </motion.div>
    </main>
  );
}
