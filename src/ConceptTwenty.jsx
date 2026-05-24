import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module5Progress from './components/Module5Progress';
import ModuleFiveBackdrop from './components/ModuleFiveBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module5LyricLines, module5LyricTimings } from './module5LyricTimings';

export default function ConceptTwenty({ onContinue }) {
  const { setCurrentTrack } = useAudio();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setCurrentTrack('/audio/Shadows_of_the_Lineage.mp3');
  }, [setCurrentTrack]);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 17000);
    return () => clearTimeout(timer);
  }, []);

  const scriptParagraphs = [
    'Every time you were told that a part of you was too much, too loud, too angry, or unacceptable, you did not destroy that part. You simply locked it in the basement of your subconscious. This is the Shadow.',
    'The Shadow holds immense, raw power, but because it is starved of light, it acts out in self-sabotage, projection, and explosive reactions.',
    'You cannot defeat the Shadow. You can only integrate it.',
    'The deepest healing happens when you stop fighting the rejected parts of yourself and finally sit down to listen to them.',
    'The darkest shadows now are heard. Let them speak.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-neutral-200 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleFiveBackdrop />
      <Module5Progress step={4} label="Shadow Integration" />
      <LyricalAnchor line={module5LyricLines.concept20} targetTime={module5LyricTimings.concept20} />

      <motion.div className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <p className="text-xs uppercase tracking-[0.24em] text-rose-100/75">Concept 20 // Shadow Integration</p>
        {scriptParagraphs.map((text, index) => (
          <motion.p key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + index * 1.1, duration: 1.4, ease: 'easeOut' }}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div className="relative mt-16 h-12" initial={{ opacity: 0 }} animate={{ opacity: showButton ? 1 : 0 }}>
        <button onClick={onContinue} disabled={!showButton} className="px-8 py-3 tracking-widest text-xs uppercase border border-rose-700/70 text-rose-100 hover:bg-rose-100 hover:text-black transition-colors duration-300 disabled:opacity-0 disabled:cursor-default">
          Draft Lineage Protocol
        </button>
      </motion.div>
    </main>
  );
}
