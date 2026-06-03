import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module6Progress from './components/Module6Progress';
import ModuleSixBackdrop from './components/ModuleSixBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module6LyricLines, module6LyricTimings } from './module6LyricTimings';

export default function ConceptTwentyFour({ onContinue }) {
  const { setCurrentTrack } = useAudio();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setCurrentTrack('/audio/The_Unplugged_Voice.mp3');
  }, [setCurrentTrack]);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 17000);
    return () => clearTimeout(timer);
  }, []);

  const scriptParagraphs = [
    'Digital detox is not rejection of technology; it is sovereignty over your attention.',
    'When every ping can hijack your nervous system, inner stillness becomes impossible to sustain.',
    'Create intentional windows where your device is silent and your senses return to your body, breath, and environment.',
    'Unplug the noise long enough to remember your original frequency.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-neutral-200 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleSixBackdrop />
      <Module6Progress step={4} label="Digital Detox" />
      <LyricalAnchor line={module6LyricLines.concept24} targetTime={module6LyricTimings.concept24} />

      <motion.div className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <p className="text-xs uppercase tracking-[0.24em] text-cyan-100/80">Concept 24 // Digital Detox</p>
        {scriptParagraphs.map((text, index) => (
          <motion.p key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + index * 1.1, duration: 1.4, ease: 'easeOut' }}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div className="relative mt-16 h-12" initial={{ opacity: 0 }} animate={{ opacity: showButton ? 1 : 0 }}>
        <button onClick={onContinue} disabled={!showButton} className="px-8 py-3 tracking-widest text-xs uppercase border border-cyan-600/70 text-cyan-100 hover:bg-cyan-100 hover:text-black transition-colors duration-300 disabled:opacity-0 disabled:cursor-default">
          Draft Unplugged Protocol
        </button>
      </motion.div>
    </main>
  );
}
