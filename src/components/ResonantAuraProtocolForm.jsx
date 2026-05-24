import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAudio } from '../context/AudioContext';
import Module19Progress from './Module19Progress';
import ModuleNineteenBackdrop from './ModuleNineteenBackdrop';

const INITIAL_FORM = {
  soundBathingWindow: '',
  auraExpansionPractice: '',
  primalHummingCadence: '',
  sacredScentAnchor: '',
};

export default function ResonantAuraProtocolForm({ onUnlocked }) {
  const { setCurrentTrack } = useAudio();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);

  useEffect(() => {
    setCurrentTrack('/audio/The_Resonant_Aura.mp3');
  }, [setCurrentTrack]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    formData.soundBathingWindow.trim().length > 10 &&
    formData.auraExpansionPractice.trim().length > 10 &&
    formData.primalHummingCadence.trim().length > 10 &&
    formData.sacredScentAnchor.trim().length > 10;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid) {
      return;
    }

    localStorage.setItem('om_shanti_module_19_complete', 'true');
    localStorage.setItem('om_shanti_resonant_aura_protocol', JSON.stringify(formData));

    setIsSubmitted(true);
    setTimeout(() => {
      onUnlocked();
    }, 4000);
  };

  const inputBaseClass =
    'w-full bg-transparent border-b border-cyan-900/70 focus:border-cyan-300 focus:outline-none transition-all duration-300 resize-none py-2 text-sm text-cyan-50 placeholder-cyan-100/45 focus:shadow-[0_12px_30px_-20px_rgba(56,189,248,0.55)]';

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-cyan-50 flex items-center justify-center p-6 sm:p-12 font-sans selection:bg-cyan-900/30">
      <ModuleNineteenBackdrop />
      <Module19Progress step={5} label="Resonant Aura Protocol" />

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="resonant-aura-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
            className="relative w-full max-w-3xl space-y-12"
          >
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs uppercase tracking-[0.3em] text-cyan-200/75">Track 19 // Threshold</span>
              <h1 className="text-3xl font-light tracking-wide text-cyan-50">The Resonant Aura Protocol</h1>
              <p className="text-sm text-cyan-100/80 max-w-xl">
                Integrate sound, field awareness, primal tone, and scent into one coherent aura practice.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-cyan-200/85 font-medium">
                  1. Sound bathing window
                </label>
                <textarea
                  name="soundBathingWindow"
                  value={formData.soundBathingWindow}
                  onChange={handleChange}
                  placeholder="When and how long will you receive sound bathing each day this week?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-cyan-200/85 font-medium">
                  2. Aura expansion practice
                </label>
                <textarea
                  name="auraExpansionPractice"
                  value={formData.auraExpansionPractice}
                  onChange={handleChange}
                  placeholder="What exact cue helps you expand awareness without losing your boundaries?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-cyan-200/85 font-medium">
                  3. Primal humming cadence
                </label>
                <textarea
                  name="primalHummingCadence"
                  value={formData.primalHummingCadence}
                  onChange={handleChange}
                  placeholder="Which breath count and hum duration will you repeat to regulate your state?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-cyan-200/85 font-medium">
                  4. Sacred scent anchor
                </label>
                <textarea
                  name="sacredScentAnchor"
                  value={formData.sacredScentAnchor}
                  onChange={handleChange}
                  placeholder="What scent will anchor this practice, and where will you keep it for easy access?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="pt-4 flex justify-center sm:justify-start">
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className="px-8 py-4 tracking-widest text-xs uppercase border border-cyan-600 hover:bg-cyan-100 hover:text-slate-950 disabled:hover:bg-transparent disabled:hover:text-cyan-200/50 transition-all duration-500 disabled:opacity-30 disabled:border-cyan-900 text-cyan-100 font-medium"
                >
                  Seal Resonant Aura Protocol
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="resonant-aura-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="relative text-center space-y-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 border border-cyan-300/60 rounded-full mx-auto flex items-center justify-center opacity-75 mb-6"
            >
              <div className="w-2 h-2 bg-cyan-200 rounded-full" />
            </motion.div>
            <h2 className="text-2xl font-light tracking-widest text-cyan-50 uppercase">Resonant Aura Protocol Sealed</h2>
            <p className="text-sm text-cyan-100/80 max-w-sm mx-auto tracking-wide font-light">
              Track 19 is complete and integrated. Ready for Track 20.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
