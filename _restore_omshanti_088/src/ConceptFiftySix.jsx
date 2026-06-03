import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module14Progress from './components/Module14Progress';
import ModuleFourteenBackdrop from './components/ModuleFourteenBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module14LyricLines, module14LyricTimings } from './module14LyricTimings';

export default function ConceptFiftySix({ onContinue }) {
  const { setCurrentTrack } = useAudio();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setCurrentTrack('/audio/The_Starry_Step.mp3');
  }, [setCurrentTrack]);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 17000);
    return () => clearTimeout(timer);
  }, []);

  const scriptParagraphs = [
    'Abundance mindset is disciplined trust in possibility plus practical stewardship of what you have.',
    'It rejects both magical passivity and scarcity panic.',
    'You track resources, opportunities, and relationships from a posture of contribution, not fear.',
    'Abundance grows when gratitude and action stay in the same sentence.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-neutral-200 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleFourteenBackdrop />
      <Module14Progress step={4} label="Abundance Mindset" />
      <LyricalAnchor line={module14LyricLines.concept56} targetTime={module14LyricTimings.concept56} />

      <motion.div className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <p className="text-xs uppercase tracking-[0.24em] text-cyan-100/80">Concept 56 // Abundance Mindset</p>
        {scriptParagraphs.map((text, index) => (
          <motion.p key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + index * 1.1, duration: 1.4, ease: 'easeOut' }}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div className="relative mt-16 h-12" initial={{ opacity: 0 }} animate={{ opacity: showButton ? 1 : 0 }}>
        <button onClick={onContinue} disabled={!showButton} className="px-8 py-3 tracking-widest text-xs uppercase border border-cyan-500/75 text-cyan-100 hover:bg-cyan-100 hover:text-black transition-colors duration-300 disabled:opacity-0 disabled:cursor-default">
          Draft Starry Step Protocol
        </button>
      </motion.div>
    </main>
  );
}
