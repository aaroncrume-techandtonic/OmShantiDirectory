import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAudio } from '../context/AudioContext';
import Module15Progress from './Module15Progress';
import ModuleFifteenBackdrop from './ModuleFifteenBackdrop';

const INITIAL_FORM = {
  energyCombingRoutine: '',
  teaRitualWindow: '',
  acceptanceSentence: '',
  playfulPractice: '',
};

export default function JoyfulChildProtocolForm({ onUnlocked }) {
  const { setCurrentTrack } = useAudio();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);

  useEffect(() => {
    setCurrentTrack('/audio/The_Joyful_Child.mp3');
  }, [setCurrentTrack]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    formData.energyCombingRoutine.trim().length > 10 &&
    formData.teaRitualWindow.trim().length > 10 &&
    formData.acceptanceSentence.trim().length > 10 &&
    formData.playfulPractice.trim().length > 10;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid) {
      return;
    }

    localStorage.setItem('om_shanti_module_15_complete', 'true');
    localStorage.setItem('om_shanti_joyful_child_protocol', JSON.stringify(formData));

    setIsSubmitted(true);
    setTimeout(() => {
      onUnlocked();
    }, 4000);
  };

  const inputBaseClass =
    'w-full bg-transparent border-b border-emerald-900/70 focus:border-emerald-300 focus:outline-none transition-all duration-300 resize-none py-2 text-sm text-emerald-50 placeholder-emerald-100/45 focus:shadow-[0_12px_30px_-20px_rgba(52,211,153,0.55)]';

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-emerald-50 flex items-center justify-center p-6 sm:p-12 font-sans selection:bg-emerald-900/30">
      <ModuleFifteenBackdrop />
      <Module15Progress step={5} label="Joyful Child Protocol" />

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div key="joyful-child-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 1 }} className="relative w-full max-w-3xl space-y-12">
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs uppercase tracking-[0.3em] text-emerald-200/75">Track 15 // Threshold</span>
              <h1 className="text-3xl font-light tracking-wide text-emerald-50">The Joyful Child Protocol</h1>
              <p className="text-sm text-emerald-100/80 max-w-xl">
                Commit your calming, ritual, acceptance, and playful restoration practices into one daily flow.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-emerald-200/85 font-medium">
                  1. Energy combing routine
                </label>
                <textarea
                  name="energyCombingRoutine"
                  value={formData.energyCombingRoutine}
                  onChange={handleChange}
                  placeholder="How will you perform energy combing when stress rises?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-emerald-200/85 font-medium">
                  2. Sacred tea ritual window
                </label>
                <textarea
                  name="teaRitualWindow"
                  value={formData.teaRitualWindow}
                  onChange={handleChange}
                  placeholder="When will you complete your tea ritual, and what intention will you hold?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-emerald-200/85 font-medium">
                  3. Radical acceptance sentence
                </label>
                <textarea
                  name="acceptanceSentence"
                  value={formData.acceptanceSentence}
                  onChange={handleChange}
                  placeholder="Write the exact sentence you will use to stop resisting reality in hard moments."
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-emerald-200/85 font-medium">
                  4. Inner child play practice
                </label>
                <textarea
                  name="playfulPractice"
                  value={formData.playfulPractice}
                  onChange={handleChange}
                  placeholder="What playful activity will you do weekly to restore joy and flexibility?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="pt-4 flex justify-center sm:justify-start">
                <button type="submit" disabled={!isFormValid} className="px-8 py-4 tracking-widest text-xs uppercase border border-emerald-600 hover:bg-emerald-100 hover:text-slate-950 disabled:hover:bg-transparent disabled:hover:text-emerald-200/50 transition-all duration-500 disabled:opacity-30 disabled:border-emerald-900 text-emerald-100 font-medium">
                  Seal Joyful Child Protocol
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div key="joyful-child-success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease: 'easeOut' }} className="relative text-center space-y-4">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }} className="w-16 h-16 border border-emerald-300/60 rounded-full mx-auto flex items-center justify-center opacity-75 mb-6">
              <div className="w-2 h-2 bg-emerald-200 rounded-full" />
            </motion.div>
            <h2 className="text-2xl font-light tracking-widest text-emerald-50 uppercase">Joyful Child Protocol Sealed</h2>
            <p className="text-sm text-emerald-100/80 max-w-sm mx-auto tracking-wide font-light">
              Track 15 is complete and integrated. Ready for Track 16.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
