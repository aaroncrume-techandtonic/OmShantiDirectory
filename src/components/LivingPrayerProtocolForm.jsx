import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAudio } from '../context/AudioContext';
import Module18Progress from './Module18Progress';
import ModuleEighteenBackdrop from './ModuleEighteenBackdrop';

const INITIAL_FORM = {
  detachmentBoundary: '',
  livingPrayerBehavior: '',
  celestialRhythmPlan: '',
  mudraRoutine: '',
};

export default function LivingPrayerProtocolForm({ onUnlocked }) {
  const { setCurrentTrack } = useAudio();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);

  useEffect(() => {
    setCurrentTrack('/audio/The_Living_Prayer.mp3');
  }, [setCurrentTrack]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    formData.detachmentBoundary.trim().length > 10 &&
    formData.livingPrayerBehavior.trim().length > 10 &&
    formData.celestialRhythmPlan.trim().length > 10 &&
    formData.mudraRoutine.trim().length > 10;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid) {
      return;
    }

    localStorage.setItem('om_shanti_module_18_complete', 'true');
    localStorage.setItem('om_shanti_living_prayer_protocol', JSON.stringify(formData));

    setIsSubmitted(true);
    setTimeout(() => {
      onUnlocked();
    }, 4000);
  };

  const inputBaseClass =
    'w-full bg-transparent border-b border-teal-900/70 focus:border-teal-300 focus:outline-none transition-all duration-300 resize-none py-2 text-sm text-teal-50 placeholder-teal-100/45 focus:shadow-[0_12px_30px_-20px_rgba(45,212,191,0.55)]';

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-teal-50 flex items-center justify-center p-6 sm:p-12 font-sans selection:bg-teal-900/30">
      <ModuleEighteenBackdrop />
      <Module18Progress step={5} label="Living Prayer Protocol" />

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div key="living-prayer-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 1 }} className="relative w-full max-w-3xl space-y-12">
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs uppercase tracking-[0.3em] text-teal-200/75">Track 18 // Threshold</span>
              <h1 className="text-3xl font-light tracking-wide text-teal-50">The Living Prayer Protocol</h1>
              <p className="text-sm text-teal-100/80 max-w-xl">
                Commit detachment, devotion, celestial timing, and mudra discipline into one integrated practice.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-teal-200/85 font-medium">
                  1. Compassionate detachment boundary
                </label>
                <textarea
                  name="detachmentBoundary"
                  value={formData.detachmentBoundary}
                  onChange={handleChange}
                  placeholder="What boundary keeps your compassion open without absorbing what is not yours?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-teal-200/85 font-medium">
                  2. Living prayer behavior commitment
                </label>
                <textarea
                  name="livingPrayerBehavior"
                  value={formData.livingPrayerBehavior}
                  onChange={handleChange}
                  placeholder="Which daily behavior will become your visible form of living prayer?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-teal-200/85 font-medium">
                  3. Celestial alignment rhythm plan
                </label>
                <textarea
                  name="celestialRhythmPlan"
                  value={formData.celestialRhythmPlan}
                  onChange={handleChange}
                  placeholder="How will you align your effort and recovery with moon or seasonal cycles this month?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-teal-200/85 font-medium">
                  4. Mudra meditation routine
                </label>
                <textarea
                  name="mudraRoutine"
                  value={formData.mudraRoutine}
                  onChange={handleChange}
                  placeholder="What mudra, duration, and timing will structure your meditation practice?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="pt-4 flex justify-center sm:justify-start">
                <button type="submit" disabled={!isFormValid} className="px-8 py-4 tracking-widest text-xs uppercase border border-teal-600 hover:bg-teal-100 hover:text-slate-950 disabled:hover:bg-transparent disabled:hover:text-teal-200/50 transition-all duration-500 disabled:opacity-30 disabled:border-teal-900 text-teal-100 font-medium">
                  Seal Living Prayer Protocol
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div key="living-prayer-success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease: 'easeOut' }} className="relative text-center space-y-4">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }} className="w-16 h-16 border border-teal-300/60 rounded-full mx-auto flex items-center justify-center opacity-75 mb-6">
              <div className="w-2 h-2 bg-teal-200 rounded-full" />
            </motion.div>
            <h2 className="text-2xl font-light tracking-widest text-teal-50 uppercase">Living Prayer Protocol Sealed</h2>
            <p className="text-sm text-teal-100/80 max-w-sm mx-auto tracking-wide font-light">
              Track 18 is complete and integrated. Ready for Track 19.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
