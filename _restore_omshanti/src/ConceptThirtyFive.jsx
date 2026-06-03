import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module9Progress from './components/Module9Progress';
import ModuleNineBackdrop from './components/ModuleNineBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module9LyricLines, module9LyricTimings } from './module9LyricTimings';

export default function ConceptThirtyFive({ onContinue }) {
  const { setCurrentTrack } = useAudio();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setCurrentTrack('/audio/The_Cosmic_Game.mp3');
  }, [setCurrentTrack]);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 17000);
    return () => clearTimeout(timer);
  }, []);

  const scriptParagraphs = [
    'Telepathic kindness starts as disciplined thought hygiene.',
    'Before words leave your mouth, your mind broadcasts orientation: threat, indifference, or care.',
    'Training kind internal language changes your tone, posture, pacing, and ultimately relational outcomes.',
    'Send one clear silent blessing before each difficult interaction.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-neutral-200 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleNineBackdrop />
      <Module9Progress step={3} label="Telepathic Kindness" />
      <LyricalAnchor line={module9LyricLines.concept35} targetTime={module9LyricTimings.concept35} />

      <motion.div className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <p className="text-xs uppercase tracking-[0.24em] text-fuchsia-100/80">Concept 35 // Telepathic Kindness</p>
        {scriptParagraphs.map((text, index) => (
          <motion.p key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + index * 1.1, duration: 1.4, ease: 'easeOut' }}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div className="relative mt-16 h-12" initial={{ opacity: 0 }} animate={{ opacity: showButton ? 1 : 0 }}>
        <button onClick={onContinue} disabled={!showButton} className="px-8 py-3 tracking-widest text-xs uppercase border border-fuchsia-500/75 text-fuchsia-100 hover:bg-fuchsia-100 hover:text-black transition-colors duration-300 disabled:opacity-0 disabled:cursor-default">
          Begin Cacao Ritual
        </button>
      </motion.div>
    </main>
  );
}
