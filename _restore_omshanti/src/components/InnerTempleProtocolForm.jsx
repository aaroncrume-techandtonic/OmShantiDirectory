import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAudio } from '../context/AudioContext';
import Module23Progress from './Module23Progress';
import ModuleTwentyThreeBackdrop from './ModuleTwentyThreeBackdrop';

const INITIAL_FORM = {
  compassionMantra: '',
  innerTempleVisit: '',
  auraSealingMethod: '',
  heartSpaceListeningCommitment: '',
};

export default function InnerTempleProtocolForm({ onUnlocked }) {
  const { setCurrentTrack } = useAudio();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);

  useEffect(() => {
    setCurrentTrack('/audio/The_Inner_Temple.mp3');
  }, [setCurrentTrack]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    formData.compassionMantra.trim().length > 10 &&
    formData.innerTempleVisit.trim().length > 10 &&
    formData.auraSealingMethod.trim().length > 10 &&
    formData.heartSpaceListeningCommitment.trim().length > 10;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid) {
      return;
    }

    localStorage.setItem('om_shanti_module_23_complete', 'true');
    localStorage.setItem('om_shanti_inner_temple_protocol', JSON.stringify(formData));

    setIsSubmitted(true);
    setTimeout(() => {
      onUnlocked();
    }, 4000);
  };

  const inputBaseClass =
    'w-full bg-transparent border-b border-emerald-900/70 focus:border-emerald-300 focus:outline-none transition-all duration-300 resize-none py-2 text-sm text-emerald-50 placeholder-emerald-100/45 focus:shadow-[0_12px_30px_-20px_rgba(16,185,129,0.55)]';

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-emerald-50 flex items-center justify-center p-6 sm:p-12 font-sans selection:bg-emerald-900/30">
      <ModuleTwentyThreeBackdrop />
      <Module23Progress step={5} label="Inner Temple Protocol" />

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="inner-temple-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
            className="relative w-full max-w-3xl space-y-12"
          >
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs uppercase tracking-[0.3em] text-emerald-200/75">Track 23 // Threshold</span>
              <h1 className="text-3xl font-light tracking-wide text-emerald-50">The Inner Temple Protocol</h1>
              <p className="text-sm text-emerald-100/80 max-w-xl">
                Integrate compassionate language, interior sanctuary, boundary closure, and deep listening into one rhythm.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-emerald-200/85 font-medium">
                  1. Compassion mantra
                </label>
                <textarea
                  name="compassionMantra"
                  value={formData.compassionMantra}
                  onChange={handleChange}
                  placeholder="Which short phrase will guide your inner speech when stress rises?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-emerald-200/85 font-medium">
                  2. Inner temple visit
                </label>
                <textarea
                  name="innerTempleVisit"
                  value={formData.innerTempleVisit}
                  onChange={handleChange}
                  placeholder="When will you visit your inner temple each day, and for how long?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-emerald-200/85 font-medium">
                  3. Aura sealing method
                </label>
                <textarea
                  name="auraSealingMethod"
                  value={formData.auraSealingMethod}
                  onChange={handleChange}
                  placeholder="What simple closure ritual will you use after demanding interactions?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-emerald-200/85 font-medium">
                  4. Heart-space listening commitment
                </label>
                <textarea
                  name="heartSpaceListeningCommitment"
                  value={formData.heartSpaceListeningCommitment}
                  onChange={handleChange}
                  placeholder="How will you practice regulated, compassionate listening in one key relationship this week?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="pt-4 flex justify-center sm:justify-start">
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className="px-8 py-4 tracking-widest text-xs uppercase border border-emerald-600 hover:bg-emerald-100 hover:text-slate-950 disabled:hover:bg-transparent disabled:hover:text-emerald-200/50 transition-all duration-500 disabled:opacity-30 disabled:border-emerald-900 text-emerald-100 font-medium"
                >
                  Seal Inner Temple Protocol
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="inner-temple-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="relative text-center space-y-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 border border-emerald-300/60 rounded-full mx-auto flex items-center justify-center opacity-75 mb-6"
            >
              <div className="w-2 h-2 bg-emerald-200 rounded-full" />
            </motion.div>
            <h2 className="text-2xl font-light tracking-widest text-emerald-50 uppercase">Inner Temple Protocol Sealed</h2>
            <p className="text-sm text-emerald-100/80 max-w-sm mx-auto tracking-wide font-light">
              Track 23 is complete and integrated. Ready for Track 24.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
