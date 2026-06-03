import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAudio } from '../context/AudioContext';
import Module1Progress from './Module1Progress';

const INITIAL_FORM = {
  baseline: '',
  shift: '',
  friction: '',
  intention: '',
};

export default function DeclarationForm({ onUnlocked }) {
  const { setCurrentTrack } = useAudio();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);

  useEffect(() => {
    // Keep the Module 1 ambient track active while the declaration is written.
    setCurrentTrack('/audio/Still_Point_DEFAULT_MusicGPT.mp3');
  }, [setCurrentTrack]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    formData.baseline.trim().length > 10 &&
    formData.shift.trim().length > 10 &&
    formData.friction.trim().length > 10 &&
    formData.intention.trim().length > 10;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid) {
      return;
    }

    localStorage.setItem('om_shanti_module_1_complete', 'true');
    localStorage.setItem('om_shanti_declaration', JSON.stringify(formData));

    setIsSubmitted(true);

    setTimeout(() => {
      onUnlocked();
    }, 4000);
  };

  const inputBaseClass =
    'w-full bg-transparent border-b border-neutral-800 focus:border-neutral-400 focus:outline-none transition-all duration-300 resize-none py-2 text-sm text-white placeholder-neutral-600 focus:shadow-[0_12px_30px_-20px_rgba(245,245,245,0.55)]';

  return (
    <main className="min-h-screen bg-black text-neutral-300 flex items-center justify-center p-6 sm:p-12 font-sans selection:bg-neutral-800">
      <Module1Progress step={5} label="Declaration" />
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
            className="w-full max-w-2xl space-y-12"
          >
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                Module 1 // Threshold
              </span>
              <h1 className="text-3xl font-light tracking-wide text-white">
                Declaration of Intent
              </h1>
              <p className="text-sm text-neutral-400 max-w-md">
                Synthesize your transition from noise to intention. These words anchor your progression and unlock the next track.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-neutral-400 font-medium">
                  1. Identify your current noise (The Baseline)
                </label>
                <textarea
                  name="baseline"
                  value={formData.baseline}
                  onChange={handleChange}
                  placeholder="What patterns of distraction or cognitive overload are you leaving behind right now?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-neutral-400 font-medium">
                  2. Define the internal pivot (The Shift)
                </label>
                <textarea
                  name="shift"
                  value={formData.shift}
                  onChange={handleChange}
                  placeholder="What does it feel like to consciously step into the still point?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-neutral-400 font-medium">
                  3. Anticipate the resistance (The Friction)
                </label>
                <textarea
                  name="friction"
                  value={formData.friction}
                  onChange={handleChange}
                  placeholder="How will your mind try to pull you back into old habits, and how will you answer it?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-neutral-400 font-medium">
                  4. Commit to the path (The Intention)
                </label>
                <textarea
                  name="intention"
                  value={formData.intention}
                  onChange={handleChange}
                  placeholder="What is your ultimate objective for finishing this 100-concept directory?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="pt-4 flex justify-center sm:justify-start">
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className="px-8 py-4 tracking-widest text-xs uppercase border border-neutral-700 hover:bg-neutral-100 hover:text-black disabled:hover:bg-transparent disabled:hover:text-neutral-500 transition-all duration-500 disabled:opacity-30 disabled:border-neutral-800 text-neutral-300 font-medium"
                >
                  Cast Declaration in Stone
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="text-center space-y-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 border border-neutral-700 rounded-full mx-auto flex items-center justify-center opacity-40 mb-6"
            >
              <div className="w-2 h-2 bg-white rounded-full" />
            </motion.div>
            <h2 className="text-2xl font-light tracking-widest text-white uppercase">
              Declaration Sealed
            </h2>
            <p className="text-sm text-neutral-500 max-w-sm mx-auto tracking-wide font-light">
              The foundation is set. Preparing your mind for Module 2. Unlocking Track 2...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
