import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAudio } from '../context/AudioContext';
import Module5Progress from './Module5Progress';
import ModuleFiveBackdrop from './ModuleFiveBackdrop';

const INITIAL_FORM = {
  gratitude: '',
  lineageLoop: '',
  affirmation: '',
  shadow: '',
};

export default function LineageProtocolForm({ onUnlocked }) {
  const { setCurrentTrack } = useAudio();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);

  useEffect(() => {
    setCurrentTrack('/audio/Shadows_of_the_Lineage.mp3');
  }, [setCurrentTrack]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    formData.gratitude.trim().length > 10 &&
    formData.lineageLoop.trim().length > 10 &&
    formData.affirmation.trim().length > 10 &&
    formData.shadow.trim().length > 10;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid) {
      return;
    }

    localStorage.setItem('om_shanti_module_5_complete', 'true');
    localStorage.setItem('om_shanti_lineage_protocol', JSON.stringify(formData));

    setIsSubmitted(true);
    setTimeout(() => {
      onUnlocked();
    }, 4000);
  };

  const inputBaseClass =
    'w-full bg-transparent border-b border-zinc-800 focus:border-rose-300 focus:outline-none transition-all duration-300 resize-none py-2 text-sm text-white placeholder-neutral-500 focus:shadow-[0_12px_30px_-20px_rgba(251,113,133,0.58)]';

  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 text-neutral-200 flex items-center justify-center p-6 sm:p-12 font-sans selection:bg-zinc-800">
      <ModuleFiveBackdrop />
      <Module5Progress step={5} label="Lineage Protocol" />

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div key="lineage-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 1 }} className="relative w-full max-w-3xl space-y-12">
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs uppercase tracking-[0.3em] text-rose-300/70">Module 5 // Threshold</span>
              <h1 className="text-3xl font-light tracking-wide text-white">The Lineage Protocol</h1>
              <p className="text-sm text-neutral-300 max-w-xl">
                Record the light, name the inherited loop, transmute it, and let the shadow speak.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-rose-200/80 font-medium">
                  1. Document one undeniable soul-win
                </label>
                <textarea
                  name="gratitude"
                  value={formData.gratitude}
                  onChange={handleChange}
                  placeholder="What is one concrete recent win your soul has achieved, and what is the evidence?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-rose-200/80 font-medium">
                  2. Name the lineage loop that stops with you
                </label>
                <textarea
                  name="lineageLoop"
                  value={formData.lineageLoop}
                  onChange={handleChange}
                  placeholder="What fear, scarcity loop, or behavioral pattern was passed down-and what exact loop stops with you?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-rose-200/80 font-medium">
                  3. Write your alchemical affirmation
                </label>
                <textarea
                  name="affirmation"
                  value={formData.affirmation}
                  onChange={handleChange}
                  placeholder="Take that fear and write its exact opposite as a present-tense truth."
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-rose-200/80 font-medium">
                  4. Give the shadow the microphone
                </label>
                <textarea
                  name="shadow"
                  value={formData.shadow}
                  onChange={handleChange}
                  placeholder="If your most frustrated shadow-part had one sentence to scream, what would it say?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="pt-4 flex justify-center sm:justify-start">
                <button type="submit" disabled={!isFormValid} className="px-8 py-4 tracking-widest text-xs uppercase border border-rose-700 hover:bg-rose-100 hover:text-black disabled:hover:bg-transparent disabled:hover:text-neutral-500 transition-all duration-500 disabled:opacity-30 disabled:border-zinc-800 text-rose-100 font-medium">
                  Seal Lineage Protocol
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div key="lineage-success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease: 'easeOut' }} className="relative text-center space-y-4">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} className="w-16 h-16 border border-rose-400/55 rounded-full mx-auto flex items-center justify-center opacity-60 mb-6">
              <div className="w-2 h-2 bg-rose-200 rounded-full" />
            </motion.div>
            <h2 className="text-2xl font-light tracking-widest text-white uppercase">Lineage Sealed</h2>
            <p className="text-sm text-neutral-300 max-w-sm mx-auto tracking-wide font-light">
              The inherited pattern is named and transmuted. Preparing your transition into Track 6...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
