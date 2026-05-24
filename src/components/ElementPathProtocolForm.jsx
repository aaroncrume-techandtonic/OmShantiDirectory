import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAudio } from '../context/AudioContext';
import Module16Progress from './Module16Progress';
import ModuleSixteenBackdrop from './ModuleSixteenBackdrop';

const INITIAL_FORM = {
  groundingSequence: '',
  soulCallAction: '',
  fastingBoundary: '',
  coherenceCadence: '',
};

export default function ElementPathProtocolForm({ onUnlocked }) {
  const { setCurrentTrack } = useAudio();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);

  useEffect(() => {
    setCurrentTrack('/audio/The_Element_s_Path.mp3');
  }, [setCurrentTrack]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    formData.groundingSequence.trim().length > 10 &&
    formData.soulCallAction.trim().length > 10 &&
    formData.fastingBoundary.trim().length > 10 &&
    formData.coherenceCadence.trim().length > 10;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid) {
      return;
    }

    localStorage.setItem('om_shanti_module_16_complete', 'true');
    localStorage.setItem('om_shanti_element_path_protocol', JSON.stringify(formData));

    setIsSubmitted(true);
    setTimeout(() => {
      onUnlocked();
    }, 4000);
  };

  const inputBaseClass =
    'w-full bg-transparent border-b border-orange-900/70 focus:border-orange-300 focus:outline-none transition-all duration-300 resize-none py-2 text-sm text-orange-50 placeholder-orange-100/45 focus:shadow-[0_12px_30px_-20px_rgba(249,115,22,0.55)]';

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-orange-50 flex items-center justify-center p-6 sm:p-12 font-sans selection:bg-orange-900/30">
      <ModuleSixteenBackdrop />
      <Module16Progress step={5} label="Element Path Protocol" />

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div key="element-path-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 1 }} className="relative w-full max-w-3xl space-y-12">
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs uppercase tracking-[0.3em] text-orange-200/75">Track 16 // Threshold</span>
              <h1 className="text-3xl font-light tracking-wide text-orange-50">The Element Path Protocol</h1>
              <p className="text-sm text-orange-100/80 max-w-xl">
                Commit your grounding, calling, fasting, and coherence practices into one daily arc.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-orange-200/85 font-medium">
                  1. Elemental grounding sequence
                </label>
                <textarea
                  name="groundingSequence"
                  value={formData.groundingSequence}
                  onChange={handleChange}
                  placeholder="What exact sequence will reconnect you with earth, air, fire, and water this week?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-orange-200/85 font-medium">
                  2. Soul-calling action
                </label>
                <textarea
                  name="soulCallAction"
                  value={formData.soulCallAction}
                  onChange={handleChange}
                  placeholder="What one concrete action will you take to answer your current soul-call?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-orange-200/85 font-medium">
                  3. Vibrational fasting boundary
                </label>
                <textarea
                  name="fastingBoundary"
                  value={formData.fastingBoundary}
                  onChange={handleChange}
                  placeholder="What input will you reduce or remove to protect your energy and focus?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-orange-200/85 font-medium">
                  4. Heart-coherence cadence
                </label>
                <textarea
                  name="coherenceCadence"
                  value={formData.coherenceCadence}
                  onChange={handleChange}
                  placeholder="How long and how often will you practice breath-heart coherence?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="pt-4 flex justify-center sm:justify-start">
                <button type="submit" disabled={!isFormValid} className="px-8 py-4 tracking-widest text-xs uppercase border border-orange-600 hover:bg-orange-100 hover:text-slate-950 disabled:hover:bg-transparent disabled:hover:text-orange-200/50 transition-all duration-500 disabled:opacity-30 disabled:border-orange-900 text-orange-100 font-medium">
                  Seal Element Path Protocol
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div key="element-path-success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease: 'easeOut' }} className="relative text-center space-y-4">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }} className="w-16 h-16 border border-orange-300/60 rounded-full mx-auto flex items-center justify-center opacity-75 mb-6">
              <div className="w-2 h-2 bg-orange-200 rounded-full" />
            </motion.div>
            <h2 className="text-2xl font-light tracking-widest text-orange-50 uppercase">Element Path Protocol Sealed</h2>
            <p className="text-sm text-orange-100/80 max-w-sm mx-auto tracking-wide font-light">
              Track 16 is complete and integrated. Ready for Track 17.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
