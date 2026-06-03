import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module18Progress from './components/Module18Progress';
import ModuleEighteenBackdrop from './components/ModuleEighteenBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module18LyricLines, module18LyricTimings } from './module18LyricTimings';

export default function ConceptSeventy({ onContinue }) {
  const { setCurrentTrack } = useAudio();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setCurrentTrack('/audio/The_Living_Prayer.mp3');
  }, [setCurrentTrack]);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 17000);
    return () => clearTimeout(timer);
  }, []);

  const scriptParagraphs = [
    'Living prayer is devotion translated into behavior across ordinary moments.',
    'Instead of isolated rituals only, your speech, work, and choices become the prayer itself.',
    'You practice alignment repeatedly, especially when no one is watching.',
    'Prayer becomes embodied when intention and action stop contradicting each other.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-neutral-200 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleEighteenBackdrop />
      <Module18Progress step={2} label="Living Prayer" />
      <LyricalAnchor line={module18LyricLines.concept70} targetTime={module18LyricTimings.concept70} />

      <motion.div className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <p className="text-xs uppercase tracking-[0.24em] text-teal-100/80">Concept 70 // Living Prayer</p>
        {scriptParagraphs.map((text, index) => (
          <motion.p key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + index * 1.1, duration: 1.4, ease: 'easeOut' }}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div className="relative mt-16 h-12" initial={{ opacity: 0 }} animate={{ opacity: showButton ? 1 : 0 }}>
        <button onClick={onContinue} disabled={!showButton} className="px-8 py-3 tracking-widest text-xs uppercase border border-teal-500/75 text-teal-100 hover:bg-teal-100 hover:text-black transition-colors duration-300 disabled:opacity-0 disabled:cursor-default">
          Align Celestial Rhythm
        </button>
      </motion.div>
    </main>
  );
}
