import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAudio } from '../context/AudioContext';
import Module24Progress from './Module24Progress';
import ModuleTwentyFourBackdrop from './ModuleTwentyFourBackdrop';

const INITIAL_FORM = {
  tonalTappingSequence: '',
  pranaPacingPlan: '',
  crystalWaterRitual: '',
  solarChargingWindow: '',
};

export default function CrystalStreamProtocolForm({ onUnlocked }) {
  const { setCurrentTrack } = useAudio();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);

  useEffect(() => {
    setCurrentTrack('/audio/The_Crystal_Stream.mp3');
  }, [setCurrentTrack]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    formData.tonalTappingSequence.trim().length > 10 &&
    formData.pranaPacingPlan.trim().length > 10 &&
    formData.crystalWaterRitual.trim().length > 10 &&
    formData.solarChargingWindow.trim().length > 10;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid) {
      return;
    }

    localStorage.setItem('om_shanti_module_24_complete', 'true');
    localStorage.setItem('om_shanti_crystal_stream_protocol', JSON.stringify(formData));

    setIsSubmitted(true);
    setTimeout(() => {
      onUnlocked();
    }, 4000);
  };

  const inputBaseClass =
    'w-full bg-transparent border-b border-sky-900/70 focus:border-sky-300 focus:outline-none transition-all duration-300 resize-none py-2 text-sm text-sky-50 placeholder-sky-100/45 focus:shadow-[0_12px_30px_-20px_rgba(56,189,248,0.55)]';

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-sky-50 flex items-center justify-center p-6 sm:p-12 font-sans selection:bg-sky-900/30">
      <ModuleTwentyFourBackdrop />
      <Module24Progress step={5} label="Crystal Stream Protocol" />

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="crystal-stream-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
            className="relative w-full max-w-3xl space-y-12"
          >
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs uppercase tracking-[0.3em] text-sky-200/75">Track 24 // Threshold</span>
              <h1 className="text-3xl font-light tracking-wide text-sky-50">The Crystal Stream Protocol</h1>
              <p className="text-sm text-sky-100/80 max-w-xl">
                Integrate rhythmic regulation, energy pacing, intentional hydration, and solar rhythm into one daily flow.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-sky-200/85 font-medium">
                  1. Tonal tapping sequence
                </label>
                <textarea
                  name="tonalTappingSequence"
                  value={formData.tonalTappingSequence}
                  onChange={handleChange}
                  placeholder="What short tapping pattern will you use when stress begins to rise?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-sky-200/85 font-medium">
                  2. Prana pacing plan
                </label>
                <textarea
                  name="pranaPacingPlan"
                  value={formData.pranaPacingPlan}
                  onChange={handleChange}
                  placeholder="How will you pace effort and recovery windows across your day?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-sky-200/85 font-medium">
                  3. Crystal water ritual
                </label>
                <textarea
                  name="crystalWaterRitual"
                  value={formData.crystalWaterRitual}
                  onChange={handleChange}
                  placeholder="What wording and timing will you use to intentionally bless and drink water?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-sky-200/85 font-medium">
                  4. Solar charging window
                </label>
                <textarea
                  name="solarChargingWindow"
                  value={formData.solarChargingWindow}
                  onChange={handleChange}
                  placeholder="When will you receive morning light and how long will you commit each day?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="pt-4 flex justify-center sm:justify-start">
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className="px-8 py-4 tracking-widest text-xs uppercase border border-sky-600 hover:bg-sky-100 hover:text-slate-950 disabled:hover:bg-transparent disabled:hover:text-sky-200/50 transition-all duration-500 disabled:opacity-30 disabled:border-sky-900 text-sky-100 font-medium"
                >
                  Seal Crystal Stream Protocol
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="crystal-stream-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="relative text-center space-y-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 border border-sky-300/60 rounded-full mx-auto flex items-center justify-center opacity-75 mb-6"
            >
              <div className="w-2 h-2 bg-sky-200 rounded-full" />
            </motion.div>
            <h2 className="text-2xl font-light tracking-widest text-sky-50 uppercase">Crystal Stream Protocol Sealed</h2>
            <p className="text-sm text-sky-100/80 max-w-sm mx-auto tracking-wide font-light">
              Track 24 is complete and integrated. Ready for Track 25.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
