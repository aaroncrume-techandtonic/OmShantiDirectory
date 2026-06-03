import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module13Progress from './components/Module13Progress';
import ModuleThirteenBackdrop from './components/ModuleThirteenBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module13LyricLines, module13LyricTimings } from './module13LyricTimings';

export default function ConceptFiftyTwo({ onContinue }) {
  const { setCurrentTrack } = useAudio();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setCurrentTrack('/audio/The_Ego_s_End.mp3');
  }, [setCurrentTrack]);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 17000);
    return () => clearTimeout(timer);
  }, []);

  const scriptParagraphs = [
    'Tonal humming regulates your body through vibration, breath pacing, and focused attention.',
    'A steady hum lengthens the exhale and helps quiet hypervigilant thought loops.',
    'You are teaching your system to return to coherence from the inside out.',
    'When the hum is steady, the observer stays awake and the ego loses urgency.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-neutral-200 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleThirteenBackdrop />
      <Module13Progress step={4} label="Tonal Humming" />
      <LyricalAnchor line={module13LyricLines.concept52} targetTime={module13LyricTimings.concept52} />

      <motion.div className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <p className="text-xs uppercase tracking-[0.24em] text-rose-100/80">Concept 52 // Tonal Humming</p>
        {scriptParagraphs.map((text, index) => (
          <motion.p key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + index * 1.1, duration: 1.4, ease: 'easeOut' }}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div className="relative mt-16 h-12" initial={{ opacity: 0 }} animate={{ opacity: showButton ? 1 : 0 }}>
        <button onClick={onContinue} disabled={!showButton} className="px-8 py-3 tracking-widest text-xs uppercase border border-rose-500/75 text-rose-100 hover:bg-rose-100 hover:text-black transition-colors duration-300 disabled:opacity-0 disabled:cursor-default">
          Draft Ego End Protocol
        </button>
      </motion.div>
    </main>
  );
}
