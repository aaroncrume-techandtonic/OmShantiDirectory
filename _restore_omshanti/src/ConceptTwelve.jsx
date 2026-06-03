import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module3Progress from './components/Module3Progress';
import ModuleThreeBackdrop from './components/ModuleThreeBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module3LyricLines, module3LyricTimings } from './module3LyricTimings';

export default function ConceptTwelve({ onContinue }) {
  const { setCurrentTrack } = useAudio();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setCurrentTrack('/audio/Earthing_Mirror.mp3');
  }, [setCurrentTrack]);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 17000);
    return () => clearTimeout(timer);
  }, []);

  const scriptParagraphs = [
    'The final truth of this phase is the hardest to accept: The world is not happening to you; it is reflecting you.',
    'When you encounter intense frustration with a person or a situation, you are standing in front of a mirror. The traits that trigger you the most in others are often the unacknowledged shadows within yourself.',
    'The chaos in your physical space is a mirror of the clutter in your mind.',
    'When you stop trying to break the mirror and instead study the reflection, everything changes. The external world becomes a diagnostic tool.',
    'What is this frustration trying to show you about your own boundaries, your own lightwork, your own grounding? Your soul reflects in all around. Look closely.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-neutral-200 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleThreeBackdrop />
      <Module3Progress step={4} label="The Mirror Principle" />
      <LyricalAnchor line={module3LyricLines.concept12} targetTime={module3LyricTimings.concept12} />

      <motion.div className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <p className="text-xs uppercase tracking-[0.24em] text-amber-100/75">Concept 12 // The Mirror Principle</p>
        {scriptParagraphs.map((text, index) => (
          <motion.p key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + index * 1.1, duration: 1.4, ease: 'easeOut' }}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div className="relative mt-16 h-12" initial={{ opacity: 0 }} animate={{ opacity: showButton ? 1 : 0 }}>
        <button onClick={onContinue} disabled={!showButton} className="px-8 py-3 tracking-widest text-xs uppercase border border-amber-700/70 text-amber-100 hover:bg-amber-100 hover:text-black transition-colors duration-300 disabled:opacity-0 disabled:cursor-default">
          Draft Grounding Protocol
        </button>
      </motion.div>
    </main>
  );
}
