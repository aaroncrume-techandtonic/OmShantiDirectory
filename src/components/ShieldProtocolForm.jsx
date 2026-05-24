import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAudio } from '../context/AudioContext';
import Module8Progress from './Module8Progress';
import ModuleEightBackdrop from './ModuleEightBackdrop';

const INITIAL_FORM = {
  contractLesson: '',
  laughterReset: '',
  shieldVisualization: '',
  sunlightWindow: '',
};

export default function ShieldProtocolForm({ onUnlocked }) {
  const { setCurrentTrack } = useAudio();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);

  useEffect(() => {
    setCurrentTrack('/audio/Shield_of_the_Sun.mp3');
  }, [setCurrentTrack]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    formData.contractLesson.trim().length > 10 &&
    formData.laughterReset.trim().length > 10 &&
    formData.shieldVisualization.trim().length > 10 &&
    formData.sunlightWindow.trim().length > 10;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid) {
      return;
    }

    localStorage.setItem('om_shanti_module_8_complete', 'true');
    localStorage.setItem('om_shanti_shield_protocol', JSON.stringify(formData));

    setIsSubmitted(true);
    setTimeout(() => {
      onUnlocked();
    }, 4000);
  };

  const inputBaseClass =
    'w-full bg-transparent border-b border-yellow-900/70 focus:border-yellow-300 focus:outline-none transition-all duration-300 resize-none py-2 text-sm text-yellow-50 placeholder-yellow-100/45 focus:shadow-[0_12px_30px_-20px_rgba(253,224,71,0.55)]';

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-yellow-50 flex items-center justify-center p-6 sm:p-12 font-sans selection:bg-yellow-900/30">
      <ModuleEightBackdrop />
      <Module8Progress step={5} label="Shield Protocol" />

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div key="shield-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 1 }} className="relative w-full max-w-3xl space-y-12">
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs uppercase tracking-[0.3em] text-yellow-200/75">Track 8 // Threshold</span>
              <h1 className="text-3xl font-light tracking-wide text-yellow-50">The Shield Protocol</h1>
              <p className="text-sm text-yellow-100/80 max-w-xl">
                Integrate soul meaning, joy regulation, energetic boundaries, and light ritual.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-yellow-200/85 font-medium">
                  1. Soul contract meaning
                </label>
                <textarea
                  name="contractLesson"
                  value={formData.contractLesson}
                  onChange={handleChange}
                  placeholder="What challenge are you reinterpreting as a growth contract, and what is its lesson?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-yellow-200/85 font-medium">
                  2. Laughter medicine plan
                </label>
                <textarea
                  name="laughterReset"
                  value={formData.laughterReset}
                  onChange={handleChange}
                  placeholder="How will you induce a 2-minute laughter reset when stress spikes?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-yellow-200/85 font-medium">
                  3. Etheric shield script
                </label>
                <textarea
                  name="shieldVisualization"
                  value={formData.shieldVisualization}
                  onChange={handleChange}
                  placeholder="Write your one-sentence shield visualization for entering high-pressure spaces."
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-yellow-200/85 font-medium">
                  4. Safe sunlight window
                </label>
                <textarea
                  name="sunlightWindow"
                  value={formData.sunlightWindow}
                  onChange={handleChange}
                  placeholder="What specific morning or evening window will you use for safe, brief sun-light alignment?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="pt-4 flex justify-center sm:justify-start">
                <button type="submit" disabled={!isFormValid} className="px-8 py-4 tracking-widest text-xs uppercase border border-yellow-600 hover:bg-yellow-100 hover:text-slate-950 disabled:hover:bg-transparent disabled:hover:text-yellow-200/50 transition-all duration-500 disabled:opacity-30 disabled:border-yellow-900 text-yellow-100 font-medium">
                  Seal Shield Protocol
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div key="shield-success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease: 'easeOut' }} className="relative text-center space-y-4">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }} className="w-16 h-16 border border-yellow-300/60 rounded-full mx-auto flex items-center justify-center opacity-75 mb-6">
              <div className="w-2 h-2 bg-yellow-200 rounded-full" />
            </motion.div>
            <h2 className="text-2xl font-light tracking-widest text-yellow-50 uppercase">Shield Sealed</h2>
            <p className="text-sm text-yellow-100/80 max-w-sm mx-auto tracking-wide font-light">
              Track 8 is anchored. Preparing your transition to Track 9...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
