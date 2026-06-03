import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAudio } from '../context/AudioContext';
import Module13Progress from './Module13Progress';
import ModuleThirteenBackdrop from './ModuleThirteenBackdrop';

const INITIAL_FORM = {
  scentAnchorPlan: '',
  gardeningRhythm: '',
  egoReleaseCue: '',
  hummingCadence: '',
};

export default function EgoEndProtocolForm({ onUnlocked }) {
  const { setCurrentTrack } = useAudio();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);

  useEffect(() => {
    setCurrentTrack('/audio/The_Ego_s_End.mp3');
  }, [setCurrentTrack]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    formData.scentAnchorPlan.trim().length > 10 &&
    formData.gardeningRhythm.trim().length > 10 &&
    formData.egoReleaseCue.trim().length > 10 &&
    formData.hummingCadence.trim().length > 10;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid) {
      return;
    }

    localStorage.setItem('om_shanti_module_13_complete', 'true');
    localStorage.setItem('om_shanti_ego_end_protocol', JSON.stringify(formData));

    setIsSubmitted(true);
    setTimeout(() => {
      onUnlocked();
    }, 4000);
  };

  const inputBaseClass =
    'w-full bg-transparent border-b border-rose-900/70 focus:border-rose-300 focus:outline-none transition-all duration-300 resize-none py-2 text-sm text-rose-50 placeholder-rose-100/45 focus:shadow-[0_12px_30px_-20px_rgba(251,113,133,0.55)]';

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-rose-50 flex items-center justify-center p-6 sm:p-12 font-sans selection:bg-rose-900/30">
      <ModuleThirteenBackdrop />
      <Module13Progress step={5} label="Ego End Protocol" />

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div key="ego-end-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 1 }} className="relative w-full max-w-3xl space-y-12">
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs uppercase tracking-[0.3em] text-rose-200/75">Track 13 // Threshold</span>
              <h1 className="text-3xl font-light tracking-wide text-rose-50">The Ego End Protocol</h1>
              <p className="text-sm text-rose-100/80 max-w-xl">
                Commit your scent anchor, garden rhythm, ego-release cue, and humming cadence into daily practice.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-rose-200/85 font-medium">
                  1. Aromatherapy anchor plan
                </label>
                <textarea
                  name="scentAnchorPlan"
                  value={formData.scentAnchorPlan}
                  onChange={handleChange}
                  placeholder="What scent will you use, and exactly when will you pair it with regulation?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-rose-200/85 font-medium">
                  2. Vibrational gardening rhythm
                </label>
                <textarea
                  name="gardeningRhythm"
                  value={formData.gardeningRhythm}
                  onChange={handleChange}
                  placeholder="How often will you tend your space, and what calming sequence will you follow?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-rose-200/85 font-medium">
                  3. Ego dissolution release cue
                </label>
                <textarea
                  name="egoReleaseCue"
                  value={formData.egoReleaseCue}
                  onChange={handleChange}
                  placeholder="Write the phrase that helps you drop image-defense and return to observation."
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-rose-200/85 font-medium">
                  4. Tonal humming cadence
                </label>
                <textarea
                  name="hummingCadence"
                  value={formData.hummingCadence}
                  onChange={handleChange}
                  placeholder="How long and how often will you hum to regulate your nervous system?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="pt-4 flex justify-center sm:justify-start">
                <button type="submit" disabled={!isFormValid} className="px-8 py-4 tracking-widest text-xs uppercase border border-rose-600 hover:bg-rose-100 hover:text-slate-950 disabled:hover:bg-transparent disabled:hover:text-rose-200/50 transition-all duration-500 disabled:opacity-30 disabled:border-rose-900 text-rose-100 font-medium">
                  Seal Ego End Protocol
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div key="ego-end-success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease: 'easeOut' }} className="relative text-center space-y-4">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }} className="w-16 h-16 border border-rose-300/60 rounded-full mx-auto flex items-center justify-center opacity-75 mb-6">
              <div className="w-2 h-2 bg-rose-200 rounded-full" />
            </motion.div>
            <h2 className="text-2xl font-light tracking-widest text-rose-50 uppercase">Ego End Protocol Sealed</h2>
            <p className="text-sm text-rose-100/80 max-w-sm mx-auto tracking-wide font-light">
              Track 13 is complete and integrated. Ready for Track 14.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
