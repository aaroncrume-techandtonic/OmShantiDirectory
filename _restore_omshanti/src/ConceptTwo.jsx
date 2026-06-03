import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module1Progress from './components/Module1Progress';

export default function ConceptTwo({ onContinue }) {
  const { setCurrentTrack } = useAudio();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setCurrentTrack('/audio/Still_Point_DEFAULT_MusicGPT.mp3');
  }, [setCurrentTrack]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 18000);

    return () => clearTimeout(timer);
  }, []);

  const scriptParagraphs = [
    'You have acknowledged the baseline noise. Now, watch it change.',
    'The shift is not a forced silencing of your thoughts; it is a change in your relationship to them.',
    'Imagine standing on a train platform. The chaotic thoughts racing through your mind are just passing trains. Up until this moment, you have been jumping onto every single one of them, letting them carry you away.',
    'The shift happens the moment you choose to step back and simply stand on the platform.',
    'Let the thoughts pass. Do not chase them. Do not fight them. By choosing to observe the noise rather than participate in it, you instantly claim your position at the center of the wheel.',
    'The world continues to spin, but you are standing in the still point.',
    'Notice how the music changes around you right now. The steady rhythm entering the track is a reflection of your own internal baseline stabilizing. You are no longer drifting. You are observing.',
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 2,
        staggerChildren: 3.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.6, ease: 'easeOut' },
    },
  };

  return (
    <main className="min-h-screen bg-black text-neutral-300 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <Module1Progress step={2} label="The Shift" />
      <motion.div
        className="max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.p
          variants={itemVariants}
          className="text-xs uppercase tracking-[0.25em] text-neutral-500"
        >
          Concept 2 // The Shift
        </motion.p>
        {scriptParagraphs.map((text, index) => (
          <motion.p key={index} variants={itemVariants}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div
        className="mt-16 h-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: showButton ? 1 : 0 }}
        transition={{ duration: 1.2 }}
      >
        <button
          onClick={onContinue}
          disabled={!showButton}
          className="px-8 py-3 tracking-widest text-sm uppercase border border-neutral-700 hover:bg-neutral-800 hover:text-white transition-colors duration-300 disabled:opacity-0 disabled:cursor-default"
        >
          Face The Friction
        </button>
      </motion.div>
    </main>
  );
}
