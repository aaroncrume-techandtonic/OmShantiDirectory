import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAudio } from '../context/AudioContext';
import Module2Progress from './Module2Progress';
import ModuleTwoBackdrop from './ModuleTwoBackdrop';

const INITIAL_FORM = {
  space: '',
  anchor: '',
  metta: '',
  intake: '',
};

export default function SanctuaryBlueprintForm({ onUnlocked }) {
  const { setCurrentTrack } = useAudio();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);

  useEffect(() => {
    setCurrentTrack('/audio/Resonant_Sanctuary.mp3');
  }, [setCurrentTrack]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    formData.space.trim().length > 10 &&
    formData.anchor.trim().length > 10 &&
    formData.metta.trim().length > 10 &&
    formData.intake.trim().length > 10;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid) {
      return;
    }

    localStorage.setItem('om_shanti_module_2_complete', 'true');
    localStorage.setItem('om_shanti_sanctuary_blueprint', JSON.stringify(formData));

    setIsSubmitted(true);
    setTimeout(() => {
      onUnlocked();
    }, 4000);
  };

  const inputBaseClass =
    'w-full bg-transparent border-b border-teal-900/70 focus:border-teal-400 focus:outline-none transition-all duration-300 resize-none py-2 text-sm text-white placeholder-neutral-500 focus:shadow-[0_12px_30px_-20px_rgba(45,212,191,0.65)]';

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-neutral-200 flex items-center justify-center p-6 sm:p-12 font-sans selection:bg-teal-900/50">
      <ModuleTwoBackdrop />
      <Module2Progress step={5} label="Sanctuary Blueprint" />

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="blueprint-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
            className="relative w-full max-w-3xl space-y-12"
          >
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs uppercase tracking-[0.3em] text-teal-300/70">Module 2 // Threshold</span>
              <h1 className="text-3xl font-light tracking-wide text-white">The Sanctuary Blueprint</h1>
              <p className="text-sm text-neutral-300 max-w-xl">
                Design the physical and energetic structure that will hold your next phase of learning.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-teal-200/80 font-medium">
                  1. Define your sanctuary space
                </label>
                <textarea
                  name="space"
                  value={formData.space}
                  onChange={handleChange}
                  placeholder="Where is your sanctuary, and how will you physically cleanse or alter it today?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-teal-200/80 font-medium">
                  2. Choose your physical anchor
                </label>
                <textarea
                  name="anchor"
                  value={formData.anchor}
                  onChange={handleChange}
                  placeholder="What object will anchor your intention, and what exact intention does it hold?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-teal-200/80 font-medium">
                  3. Direct Metta toward friction
                </label>
                <textarea
                  name="metta"
                  value={formData.metta}
                  onChange={handleChange}
                  placeholder="Name one source of friction you will send loving-kindness to today."
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-teal-200/80 font-medium">
                  4. Define your intake boundary
                </label>
                <textarea
                  name="intake"
                  value={formData.intake}
                  onChange={handleChange}
                  placeholder="What low-frequency input will you consciously block from your sanctuary this week?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="pt-4 flex justify-center sm:justify-start">
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className="px-8 py-4 tracking-widest text-xs uppercase border border-teal-700 hover:bg-teal-100 hover:text-black disabled:hover:bg-transparent disabled:hover:text-neutral-500 transition-all duration-500 disabled:opacity-30 disabled:border-teal-900/50 text-teal-100 font-medium"
                >
                  Seal The Sanctuary Blueprint
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="blueprint-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="relative text-center space-y-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 border border-teal-400/50 rounded-full mx-auto flex items-center justify-center opacity-60 mb-6"
            >
              <div className="w-2 h-2 bg-teal-200 rounded-full" />
            </motion.div>
            <h2 className="text-2xl font-light tracking-widest text-white uppercase">Sanctuary Sealed</h2>
            <p className="text-sm text-neutral-300 max-w-sm mx-auto tracking-wide font-light">
              Track 2 is integrated. Preparing your transition into Track 3...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
