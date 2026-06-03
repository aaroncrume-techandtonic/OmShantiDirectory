import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAudio } from '../context/AudioContext';
import Module22Progress from './Module22Progress';
import ModuleTwentyTwoBackdrop from './ModuleTwentyTwoBackdrop';

const INITIAL_FORM = {
  sacredGazePractice: '',
  frequencyJewelryAnchor: '',
  vibrationalTidyingAction: '',
  stellarGroundingRitual: '',
};

export default function SacredSilverProtocolForm({ onUnlocked }) {
  const { setCurrentTrack } = useAudio();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);

  useEffect(() => {
    setCurrentTrack('/audio/The_Sacred_Silver.mp3');
  }, [setCurrentTrack]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    formData.sacredGazePractice.trim().length > 10 &&
    formData.frequencyJewelryAnchor.trim().length > 10 &&
    formData.vibrationalTidyingAction.trim().length > 10 &&
    formData.stellarGroundingRitual.trim().length > 10;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid) {
      return;
    }

    localStorage.setItem('om_shanti_module_22_complete', 'true');
    localStorage.setItem('om_shanti_sacred_silver_protocol', JSON.stringify(formData));

    setIsSubmitted(true);
    setTimeout(() => {
      onUnlocked();
    }, 4000);
  };

  const inputBaseClass =
    'w-full bg-transparent border-b border-zinc-700/80 focus:border-zinc-300 focus:outline-none transition-all duration-300 resize-none py-2 text-sm text-zinc-50 placeholder-zinc-300/45 focus:shadow-[0_12px_30px_-20px_rgba(212,212,216,0.55)]';

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-zinc-50 flex items-center justify-center p-6 sm:p-12 font-sans selection:bg-zinc-700/30">
      <ModuleTwentyTwoBackdrop />
      <Module22Progress step={5} label="Sacred Silver Protocol" />

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="sacred-silver-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
            className="relative w-full max-w-3xl space-y-12"
          >
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs uppercase tracking-[0.3em] text-zinc-300/75">Track 22 // Threshold</span>
              <h1 className="text-3xl font-light tracking-wide text-zinc-50">The Sacred Silver Protocol</h1>
              <p className="text-sm text-zinc-200/80 max-w-xl">
                Align your gaze, anchors, environment, and grounded cosmic perspective into one stable rhythm.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-zinc-300/85 font-medium">
                  1. Sacred gaze practice
                </label>
                <textarea
                  name="sacredGazePractice"
                  value={formData.sacredGazePractice}
                  onChange={handleChange}
                  placeholder="How will you practice steady, non-grasping attention each day this week?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-zinc-300/85 font-medium">
                  2. Frequency jewelry anchor
                </label>
                <textarea
                  name="frequencyJewelryAnchor"
                  value={formData.frequencyJewelryAnchor}
                  onChange={handleChange}
                  placeholder="What object will serve as your state anchor, and what cue will it trigger?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-zinc-300/85 font-medium">
                  3. Vibrational tidying action
                </label>
                <textarea
                  name="vibrationalTidyingAction"
                  value={formData.vibrationalTidyingAction}
                  onChange={handleChange}
                  placeholder="Which one area will you clear first to reduce sensory drag?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-zinc-300/85 font-medium">
                  4. Stellar grounding ritual
                </label>
                <textarea
                  name="stellarGroundingRitual"
                  value={formData.stellarGroundingRitual}
                  onChange={handleChange}
                  placeholder="What short ritual keeps your cosmic vision anchored to practical service?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="pt-4 flex justify-center sm:justify-start">
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className="px-8 py-4 tracking-widest text-xs uppercase border border-zinc-500 hover:bg-zinc-100 hover:text-slate-950 disabled:hover:bg-transparent disabled:hover:text-zinc-300/50 transition-all duration-500 disabled:opacity-30 disabled:border-zinc-700 text-zinc-100 font-medium"
                >
                  Seal Sacred Silver Protocol
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="sacred-silver-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="relative text-center space-y-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 border border-zinc-300/60 rounded-full mx-auto flex items-center justify-center opacity-75 mb-6"
            >
              <div className="w-2 h-2 bg-zinc-200 rounded-full" />
            </motion.div>
            <h2 className="text-2xl font-light tracking-widest text-zinc-50 uppercase">Sacred Silver Protocol Sealed</h2>
            <p className="text-sm text-zinc-200/80 max-w-sm mx-auto tracking-wide font-light">
              Track 22 is complete and integrated. Ready for Track 23.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
