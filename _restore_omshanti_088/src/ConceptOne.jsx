import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Module1Progress from './components/Module1Progress';

export default function ConceptOne({ onContinue }) {
  const [showButton, setShowButton] = useState(false);

  // Enforce the 20-second zero-point before allowing progression.
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 20000);

    return () => clearTimeout(timer);
  }, []);

  const scriptParagraphs = [
    'Look at your screen.',
    'Notice the tabs you have open. Notice the notifications waiting in the margins. Acknowledge the mental checklist running quietly in the background of your mind.',
    'Right now, you exist in a state of constant, high-frequency input. This is your default baseline: an endless stream of digital noise, tasks, and fractured attention.',
    'Before you can build new architecture in your mind, you have to survey the ground you are standing on. You cannot pour fresh water into a glass that is already overflowing.',
    'This directory is not about adding more noise to your system. It is about finding the remedy-the tonic for the overload. It is about stripping away the static so you can process knowledge with deliberate, focused intention.',
    "Don't try to clear your mind entirely. Just acknowledge the noise. Let it sit there.",
    'Take a breath. Listen to the drone of the bass.',
    'You have arrived at the zero-point.',
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 3,
        staggerChildren: 4,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 2, ease: 'easeOut' },
    },
  };

  return (
    <main className="min-h-screen bg-black text-neutral-300 flex flex-col items-center justify-center p-6 sm:p-12 font-sans">
      <Module1Progress step={1} label="The Baseline" />
      <motion.div
        className="max-w-2xl space-y-8 text-lg sm:text-xl leading-relaxed text-center"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
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
        transition={{ duration: 1.5 }}
      >
        <button
          onClick={onContinue}
          disabled={!showButton}
          className="px-8 py-3 tracking-widest text-sm uppercase border border-neutral-700 hover:bg-neutral-800 hover:text-white transition-colors duration-300 disabled:opacity-0 disabled:cursor-default"
        >
          Enter The Shift
        </button>
      </motion.div>
    </main>
  );
}
