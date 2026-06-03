import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './context/AudioContext';
import Module1Progress from './components/Module1Progress';

export default function ConceptThree({ onContinue }) {
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
    'The moment you slow down, an alarm goes off in your nervous system.',
    'Your brain, deeply conditioned by years of high-frequency digital loops, is addicted to dopamine. When you deny it that quick hit, it rebels. This rebellion is what we call The Friction.',
    'It manifests as a sudden urge to check your phone, an intrusive thought about an unfinished email, a wave of restless boredom, or an internal voice telling you that you do not have time for this.',
    'Expect this resistance. It is not a sign that you are failing; it is proof that the medicine is working. The friction is simply the old wiring scraping against the new boundaries you are attempting to build.',
    'When the itch to pull away arrives, name it. Tell yourself: This is just friction.',
    'Listen to the tension in the music right now-the low, pulling pull of the strings. Sit directly inside that tension. Let it burn off without acting on it.',
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 2,
        staggerChildren: 3.8,
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
    <main className="relative min-h-screen bg-black text-neutral-300 flex flex-col items-center justify-center p-6 sm:p-12 font-sans overflow-hidden">
      <Module1Progress step={3} label="The Friction" />
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ filter: 'blur(18px)', opacity: 0.75 }}
        animate={{ filter: showButton ? 'blur(4px)' : 'blur(10px)', opacity: showButton ? 0.25 : 0.55 }}
        transition={{ duration: 18, ease: 'easeOut' }}
        style={{
          background:
            'radial-gradient(circle at 20% 30%, rgba(120,120,120,0.25), transparent 40%), radial-gradient(circle at 80% 70%, rgba(180,180,180,0.15), transparent 45%)',
        }}
      />

      <motion.div
        className="relative max-w-3xl space-y-7 text-base sm:text-lg leading-relaxed text-center"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.p
          variants={itemVariants}
          className="text-xs uppercase tracking-[0.25em] text-neutral-500"
        >
          Concept 3 // The Friction
        </motion.p>
        {scriptParagraphs.map((text, index) => (
          <motion.p key={index} variants={itemVariants}>
            {text}
          </motion.p>
        ))}
      </motion.div>

      <motion.div
        className="relative mt-16 h-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: showButton ? 1 : 0 }}
        transition={{ duration: 1.2 }}
      >
        <button
          onClick={onContinue}
          disabled={!showButton}
          className="px-8 py-3 tracking-widest text-sm uppercase border border-neutral-700 hover:bg-neutral-800 hover:text-white transition-colors duration-300 disabled:opacity-0 disabled:cursor-default"
        >
          Set The Intention
        </button>
      </motion.div>
    </main>
  );
}
