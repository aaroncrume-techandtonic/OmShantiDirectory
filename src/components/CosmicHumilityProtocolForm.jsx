import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAudio } from '../context/AudioContext';
import Module25Progress from './Module25Progress';
import ModuleTwentyFiveBackdrop from './ModuleTwentyFiveBackdrop';

const INITIAL_FORM = {
  ancestralLightIntegration: '',
  vibrationalAnointingPractice: '',
  mirrorMantraCommitment: '',
  cosmicHumilityVow: '',
};

export default function CosmicHumilityProtocolForm({ onUnlocked }) {
  const { setCurrentTrack } = useAudio();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);

  useEffect(() => {
    setCurrentTrack('/audio/The_Cosmic_Humility.mp3');
  }, [setCurrentTrack]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    formData.ancestralLightIntegration.trim().length > 10 &&
    formData.vibrationalAnointingPractice.trim().length > 10 &&
    formData.mirrorMantraCommitment.trim().length > 10 &&
    formData.cosmicHumilityVow.trim().length > 10;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid) {
      return;
    }

    localStorage.setItem('om_shanti_module_25_complete', 'true');
    localStorage.setItem('om_shanti_cosmic_humility_protocol', JSON.stringify(formData));

    setIsSubmitted(true);
    setTimeout(() => {
      onUnlocked();
    }, 4000);
  };

  const inputBaseClass =
    'w-full bg-transparent border-b border-fuchsia-900/70 focus:border-fuchsia-300 focus:outline-none transition-all duration-300 resize-none py-2 text-sm text-fuchsia-50 placeholder-fuchsia-100/45 focus:shadow-[0_12px_30px_-20px_rgba(217,70,239,0.55)]';

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-fuchsia-50 flex items-center justify-center p-6 sm:p-12 font-sans selection:bg-fuchsia-900/30">
      <ModuleTwentyFiveBackdrop />
      <Module25Progress step={5} label="Cosmic Humility Protocol" />

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="cosmic-humility-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
            className="relative w-full max-w-3xl space-y-12"
          >
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs uppercase tracking-[0.3em] text-fuchsia-200/75">Track 25 // Final Threshold</span>
              <h1 className="text-3xl font-light tracking-wide text-fuchsia-50">The Cosmic Humility Protocol</h1>
              <p className="text-sm text-fuchsia-100/80 max-w-xl">
                Integrate lineage, ritual embodiment, reflective speech, and humble cosmic service into your final commitment.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-fuchsia-200/85 font-medium">
                  1. Ancestral light integration
                </label>
                <textarea
                  name="ancestralLightIntegration"
                  value={formData.ancestralLightIntegration}
                  onChange={handleChange}
                  placeholder="What ancestral gift will you consciously carry forward, and what inherited burden will you release?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-fuchsia-200/85 font-medium">
                  2. Vibrational anointing practice
                </label>
                <textarea
                  name="vibrationalAnointingPractice"
                  value={formData.vibrationalAnointingPractice}
                  onChange={handleChange}
                  placeholder="What brief anointing ritual will mark your daily transition into purposeful service?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-fuchsia-200/85 font-medium">
                  3. Mirror mantra commitment
                </label>
                <textarea
                  name="mirrorMantraCommitment"
                  value={formData.mirrorMantraCommitment}
                  onChange={handleChange}
                  placeholder="Which mirror phrase will keep you truthful, compassionate, and accountable?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-fuchsia-200/85 font-medium">
                  4. Cosmic humility vow
                </label>
                <textarea
                  name="cosmicHumilityVow"
                  value={formData.cosmicHumilityVow}
                  onChange={handleChange}
                  placeholder="State your vow for how you will act with courage and humility in service of life."
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="pt-4 flex justify-center sm:justify-start">
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className="px-8 py-4 tracking-widest text-xs uppercase border border-fuchsia-600 hover:bg-fuchsia-100 hover:text-slate-950 disabled:hover:bg-transparent disabled:hover:text-fuchsia-200/50 transition-all duration-500 disabled:opacity-30 disabled:border-fuchsia-900 text-fuchsia-100 font-medium"
                >
                  Seal Cosmic Humility Protocol
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="cosmic-humility-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="relative text-center space-y-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 border border-fuchsia-300/60 rounded-full mx-auto flex items-center justify-center opacity-75 mb-6"
            >
              <div className="w-2 h-2 bg-fuchsia-200 rounded-full" />
            </motion.div>
            <h2 className="text-2xl font-light tracking-widest text-fuchsia-50 uppercase">Cosmic Humility Protocol Sealed</h2>
            <p className="text-sm text-fuchsia-100/80 max-w-sm mx-auto tracking-wide font-light">
              Track 25 is complete. The 100-concept journey is now fully integrated.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
