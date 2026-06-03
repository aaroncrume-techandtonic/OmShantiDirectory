import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAudio } from '../context/AudioContext';
import Module6Progress from './Module6Progress';
import ModuleSixBackdrop from './ModuleSixBackdrop';

const INITIAL_FORM = {
  akashicSignal: '',
  colorAnchor: '',
  mantraCommitment: false,
  detoxBoundary: '',
};

export default function CosmicProtocolForm({ onUnlocked }) {
  const { setCurrentTrack } = useAudio();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);

  useEffect(() => {
    setCurrentTrack('/audio/The_Unplugged_Voice.mp3');
  }, [setCurrentTrack]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const isFormValid =
    formData.akashicSignal.trim().length > 10 &&
    formData.colorAnchor.trim().length > 10 &&
    formData.mantraCommitment &&
    formData.detoxBoundary.trim().length > 10;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid) {
      return;
    }

    localStorage.setItem('om_shanti_module_6_complete', 'true');
    localStorage.setItem('om_shanti_unplugged_protocol', JSON.stringify(formData));

    setIsSubmitted(true);
    setTimeout(() => {
      onUnlocked();
    }, 4000);
  };

  const inputBaseClass =
    'w-full bg-transparent border-b border-cyan-900/80 focus:border-cyan-300 focus:outline-none transition-all duration-300 resize-none py-2 text-sm text-cyan-50 placeholder-cyan-100/45 focus:shadow-[0_12px_30px_-20px_rgba(103,232,249,0.58)]';

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-cyan-50 flex items-center justify-center p-6 sm:p-12 font-sans selection:bg-cyan-900/40">
      <ModuleSixBackdrop />
      <Module6Progress step={5} label="Unplugged Protocol" />

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="cosmic-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
            className="relative w-full max-w-3xl space-y-12"
          >
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs uppercase tracking-[0.3em] text-cyan-200/75">
                Module 6 // Threshold
              </span>
              <h1 className="text-3xl font-light tracking-wide text-cyan-50">
                The Unplugged Protocol
              </h1>
              <p className="text-sm text-cyan-100/80 max-w-xl">
                Lock in signal hygiene and complete Track 6 with deliberate attention rituals.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-cyan-200/85 font-medium">
                  1. Akashic awareness checkpoint
                </label>
                <textarea
                  name="akashicSignal"
                  value={formData.akashicSignal}
                  onChange={handleChange}
                  placeholder="What recurring symbol, phrase, or inner nudge keeps appearing when you get quiet?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-cyan-200/85 font-medium">
                  2. Color therapy anchor
                </label>
                <textarea
                  name="colorAnchor"
                  value={formData.colorAnchor}
                  onChange={handleChange}
                  placeholder="Which intentional color will you use this week to regulate your state, and where will you place it?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-3 border border-cyan-900/70 rounded-lg px-4 py-4 bg-cyan-950/20">
                <p className="text-xs uppercase tracking-widest text-cyan-200/85 font-medium">
                  3. Mantra commitment
                </p>
                <label className="flex items-center gap-3 text-sm text-cyan-100/85 cursor-pointer">
                  <input
                    type="checkbox"
                    name="mantraCommitment"
                    checked={formData.mantraCommitment}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-cyan-600/70 bg-transparent accent-cyan-300"
                  />
                  I will chant my chosen mantra for 3 focused minutes daily.
                </label>
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-cyan-200/85 font-medium">
                  4. Digital detox boundary
                </label>
                <textarea
                  name="detoxBoundary"
                  value={formData.detoxBoundary}
                  onChange={handleChange}
                  placeholder="What daily boundary will you enforce to unplug from noise and protect your attention?"
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
                  Seal Unplugged Protocol
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="cosmic-success"
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
            <h2 className="text-2xl font-light tracking-widest text-cyan-50 uppercase">Unplugged Voice Locked In</h2>
            <p className="text-sm text-cyan-100/80 max-w-sm mx-auto tracking-wide font-light">
              Your attention rituals are anchored. Preparing your transition into Track 7...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
