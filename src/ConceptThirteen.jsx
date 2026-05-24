import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module4Progress from './components/Module4Progress';
import ModuleFourBackdrop from './components/ModuleFourBackdrop';
import LyricalAnchor from './components/LyricalAnchor';
import { module4LyricLines, module4LyricTimings } from './module4LyricTimings';

export default function ConceptThirteen({ onContinue }) {
  const { setCurrentTrack } = useAudio();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setCurrentTrack('/audio/Silent_Clearing.mp3');
  }, [setCurrentTrack]);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 17000);
    return () => clearTimeout(timer);
  }, []);

  const scriptParagraphs = [
    'Your body is an archive. It keeps a physical record of every stressor, anxiety, and heartbreak you have ever experienced.',
    'We often try to think our way out of emotional pain, but stagnant sorrow does not live in the rational mind; it is trapped in the tissues, the fascia, and the shallow rhythms of your chest. Somatic breath is the key to unlocking the archive.',
    'This is not passive breathing. It is active extraction. As the music deepens, pull the air down into the pit of your stomach.',
    'Locate the physical density in your body-the tight jaw, the heavy chest, the clenched stomach. Breathe directly into that density, and forcefully exhale the weight.',
    'You cannot carry the past into the sanctuary. Breathe it out.',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-neutral-200 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <ModuleFourBackdrop />
      <Module4Progress step={1} label="Somatic Breath" />
      <LyricalAnchor line={module4LyricLines.concept13} targetTime={module4LyricTimings.concept13} />

      <motion.div className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <p className="text-xs uppercase tracking-[0.24em] text-violet-100/75">Concept 13 // Somatic Breath</p>
        {scriptParagraphs.map((text, index) => (
          <motion.p key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + index * 1.1, duration: 1.4, ease: 'easeOut' }}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div className="relative mt-16 h-12" initial={{ opacity: 0 }} animate={{ opacity: showButton ? 1 : 0 }}>
        <button onClick={onContinue} disabled={!showButton} className="px-8 py-3 tracking-widest text-xs uppercase border border-violet-700/70 text-violet-100 hover:bg-violet-100 hover:text-black transition-colors duration-300 disabled:opacity-0 disabled:cursor-default">
          Cut The Cords
        </button>
      </motion.div>
    </main>
  );
}
