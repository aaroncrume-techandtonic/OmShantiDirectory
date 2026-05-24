import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module15Progress from './components/Module15Progress';
import ModuleFifteenBackdrop from './components/ModuleFifteenBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module15LyricLines, module15LyricTimings } from './module15LyricTimings';

export default function ConceptFiftySeven({ onContinue }) {
  const { setCurrentTrack } = useAudio();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setCurrentTrack('/audio/The_Joyful_Child.mp3');
  }, [setCurrentTrack]);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 17000);
    return () => clearTimeout(timer);
  }, []);

  const scriptParagraphs = [
    'Energy combing is intentional self-soothing through touch, breath, and directional attention.',
    'You comb the field from crown to chest to settle agitation and return to centeredness.',
    'The technique is simple by design: repetition trains safety faster than complexity.',
    'Calm is a skill your body can relearn, one deliberate pass at a time.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-neutral-200 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleFifteenBackdrop />
      <Module15Progress step={1} label="Energy Combing" />
      <LyricalAnchor line={module15LyricLines.concept57} targetTime={module15LyricTimings.concept57} />

      <motion.div className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <p className="text-xs uppercase tracking-[0.24em] text-emerald-100/80">Concept 57 // Energy Combing</p>
        {scriptParagraphs.map((text, index) => (
          <motion.p key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + index * 1.1, duration: 1.4, ease: 'easeOut' }}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div className="relative mt-16 h-12" initial={{ opacity: 0 }} animate={{ opacity: showButton ? 1 : 0 }}>
        <button onClick={onContinue} disabled={!showButton} className="px-8 py-3 tracking-widest text-xs uppercase border border-emerald-500/75 text-emerald-100 hover:bg-emerald-100 hover:text-black transition-colors duration-300 disabled:opacity-0 disabled:cursor-default">
          Brew Sacred Tea Ritual
        </button>
      </motion.div>
    </main>
  );
}
