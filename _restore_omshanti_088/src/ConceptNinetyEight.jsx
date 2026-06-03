import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module25Progress from './components/Module25Progress';
import ModuleTwentyFiveBackdrop from './components/ModuleTwentyFiveBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module25LyricLines, module25LyricTimings } from './module25LyricTimings';

export default function ConceptNinetyEight({ onContinue }) {
  const { setCurrentTrack } = useAudio();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setCurrentTrack('/audio/The_Cosmic_Humility.mp3');
  }, [setCurrentTrack]);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 17000);
    return () => clearTimeout(timer);
  }, []);

  const scriptParagraphs = [
    'Vibrational anointing pairs intentional touch with breath and language to mark transition.',
    'The ritual can symbolize protection, commitment, or release depending on context.',
    'Anointing works as embodied memory: the body remembers what the mind intends.',
    'Repeated with sincerity, small rituals can stabilize identity shifts.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleTwentyFiveBackdrop />
      <Module25Progress step={2} label="Vibrational Anointing" />
      <LyricalAnchor line={module25LyricLines.concept98} targetTime={module25LyricTimings.concept98} />

      <motion.div className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <p className="text-xs uppercase tracking-[0.24em] text-fuchsia-100/80">Concept 98 // Vibrational Anointing</p>
        {scriptParagraphs.map((text, index) => (
          <motion.p key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + index * 1.1, duration: 1.4, ease: 'easeOut' }}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div className="relative mt-16 h-12" initial={{ opacity: 0 }} animate={{ opacity: showButton ? 1 : 0 }}>
        <button onClick={onContinue} disabled={!showButton} className="px-8 py-3 tracking-widest text-xs uppercase border border-fuchsia-500/75 text-fuchsia-100 hover:bg-fuchsia-100 hover:text-black transition-colors duration-300 disabled:opacity-0 disabled:cursor-default">
          Practice Mirror Mantras
        </button>
      </motion.div>
    </main>
  );
}
