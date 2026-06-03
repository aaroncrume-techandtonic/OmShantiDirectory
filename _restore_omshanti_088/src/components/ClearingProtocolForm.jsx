import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAudio } from '../context/AudioContext';
import Module4Progress from './Module4Progress';
import ModuleFourBackdrop from './ModuleFourBackdrop';

const INITIAL_FORM = {
  breath: '',
  forgiveness: '',
  silence: '',
  aura: '',
};

export default function ClearingProtocolForm({ onUnlocked }) {
  const { setCurrentTrack } = useAudio();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);

  useEffect(() => {
    setCurrentTrack('/audio/Silent_Clearing.mp3');
  }, [setCurrentTrack]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    formData.breath.trim().length > 10 &&
    formData.forgiveness.trim().length > 10 &&
    formData.silence.trim().length > 10 &&
    formData.aura.trim().length > 10;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid) {
      return;
    }

    localStorage.setItem('om_shanti_module_4_complete', 'true');
    localStorage.setItem('om_shanti_clearing_protocol', JSON.stringify(formData));

    setIsSubmitted(true);
    setTimeout(() => {
      onUnlocked();
    }, 4000);
  };

  const inputBaseClass =
    'w-full bg-transparent border-b border-violet-900/70 focus:border-violet-300 focus:outline-none transition-all duration-300 resize-none py-2 text-sm text-white placeholder-neutral-500 focus:shadow-[0_12px_30px_-20px_rgba(196,181,253,0.58)]';

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-neutral-200 flex items-center justify-center p-6 sm:p-12 font-sans selection:bg-violet-900/50">
      <ModuleFourBackdrop />
      <Module4Progress step={5} label="Clearing Protocol" />

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div key="clearing-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 1 }} className="relative w-full max-w-3xl space-y-12">
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs uppercase tracking-[0.3em] text-violet-300/70">Module 4 // Threshold</span>
              <h1 className="text-3xl font-light tracking-wide text-white">The Clearing Protocol</h1>
              <p className="text-sm text-neutral-300 max-w-xl">
                Release what no longer serves you and codify your daily energetic clearing sequence.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-violet-200/80 font-medium">
                  1. Locate stagnant sorrow in the body
                </label>
                <textarea
                  name="breath"
                  value={formData.breath}
                  onChange={handleChange}
                  placeholder="Where is tension or sorrow living in your body right now?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-violet-200/80 font-medium">
                  2. Name the cord you are cutting
                </label>
                <textarea
                  name="forgiveness"
                  value={formData.forgiveness}
                  onChange={handleChange}
                  placeholder="Who, what, or which past self are you severing energetic attachment to today?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-violet-200/80 font-medium">
                  3. Schedule sacred silence
                </label>
                <textarea
                  name="silence"
                  value={formData.silence}
                  onChange={handleChange}
                  placeholder="When exactly will you sit for 5 uninterrupted minutes of sacred silence today?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-violet-200/80 font-medium">
                  4. Define your aura cleansing method
                </label>
                <textarea
                  name="aura"
                  value={formData.aura}
                  onChange={handleChange}
                  placeholder="What specific method will you use to wash your energetic field today?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="pt-4 flex justify-center sm:justify-start">
                <button type="submit" disabled={!isFormValid} className="px-8 py-4 tracking-widest text-xs uppercase border border-violet-700 hover:bg-violet-100 hover:text-black disabled:hover:bg-transparent disabled:hover:text-neutral-500 transition-all duration-500 disabled:opacity-30 disabled:border-violet-900/50 text-violet-100 font-medium">
                  Seal Clearing Protocol
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div key="clearing-success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease: 'easeOut' }} className="relative text-center space-y-4">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} className="w-16 h-16 border border-violet-400/55 rounded-full mx-auto flex items-center justify-center opacity-60 mb-6">
              <div className="w-2 h-2 bg-violet-200 rounded-full" />
            </motion.div>
            <h2 className="text-2xl font-light tracking-widest text-white uppercase">Clearing Sealed</h2>
            <p className="text-sm text-neutral-300 max-w-sm mx-auto tracking-wide font-light">
              The internal field is clear. Preparing your transition into Track 5...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
