import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module1Progress from './components/Module1Progress';

export default function ConceptFour({ onContinue }) {
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
    'You have stood on the platform. You have faced the friction. Now, you choose your direction.',
    'Without a clear, protective intention, the remaining 96 concepts in this directory will just become more information cluttering your mind.',
    'Intention is the filter that transforms raw data into living practice.',
    'Setting an intention means deciding beforehand exactly what this space is for.',
    'It is a boundary line drawn in the sand that reads: My attention belongs to me.',
    'As the music opens up into clarity, feel the space you have cleared over these four concepts. You have stripped away the default baseline. You have claimed the still point. You are now the architect of this directory.',
    'Carry this clarity forward into the threshold. It is time to put your commitment into words.',
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 2,
        staggerChildren: 3.6,
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
      <Module1Progress step={4} label="The Intention" />
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
          Concept 4 // The Intention
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
          Enter Declaration Threshold
        </button>
      </motion.div>
    </main>
  );
}
