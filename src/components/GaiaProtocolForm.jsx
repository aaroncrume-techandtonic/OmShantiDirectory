import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAudio } from '../context/AudioContext';
import Module10Progress from './Module10Progress';
import ModuleTenBackdrop from './ModuleTenBackdrop';

const INITIAL_FORM = {
  soundBathPlan: '',
  stewardshipAct: '',
  forgivenessRewrite: '',
  guideQuestion: '',
};

export default function GaiaProtocolForm({ onUnlocked }) {
  const { setCurrentTrack } = useAudio();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);

  useEffect(() => {
    setCurrentTrack('/audio/Voices_of_Gaia.mp3');
  }, [setCurrentTrack]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    formData.soundBathPlan.trim().length > 10 &&
    formData.stewardshipAct.trim().length > 10 &&
    formData.forgivenessRewrite.trim().length > 10 &&
    formData.guideQuestion.trim().length > 10;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid) {
      return;
    }

    localStorage.setItem('om_shanti_module_10_complete', 'true');
    localStorage.setItem('om_shanti_gaia_protocol', JSON.stringify(formData));

    setIsSubmitted(true);
    setTimeout(() => {
      onUnlocked();
    }, 4000);
  };

  const inputBaseClass =
    'w-full bg-transparent border-b border-emerald-900/70 focus:border-emerald-300 focus:outline-none transition-all duration-300 resize-none py-2 text-sm text-emerald-50 placeholder-emerald-100/45 focus:shadow-[0_12px_30px_-20px_rgba(110,231,183,0.55)]';

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-emerald-50 flex items-center justify-center p-6 sm:p-12 font-sans selection:bg-emerald-900/30">
      <ModuleTenBackdrop />
      <Module10Progress step={5} label="Gaia Protocol" />

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div key="gaia-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 1 }} className="relative w-full max-w-3xl space-y-12">
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs uppercase tracking-[0.3em] text-emerald-200/75">Track 10 // Threshold</span>
              <h1 className="text-3xl font-light tracking-wide text-emerald-50">The Gaia Protocol</h1>
              <p className="text-sm text-emerald-100/80 max-w-xl">
                Anchor Track 10 by committing sound, stewardship, forgiveness rewrite, and dialogue practice.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-emerald-200/85 font-medium">
                  1. Frequency bathing schedule
                </label>
                <textarea
                  name="soundBathPlan"
                  value={formData.soundBathPlan}
                  onChange={handleChange}
                  placeholder="When and how will you run your next intentional sound bath session?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-emerald-200/85 font-medium">
                  2. Gaia stewardship action
                </label>
                <textarea
                  name="stewardshipAct"
                  value={formData.stewardshipAct}
                  onChange={handleChange}
                  placeholder="What concrete ecological action will you complete this week?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-emerald-200/85 font-medium">
                  3. Akashic forgiveness rewrite
                </label>
                <textarea
                  name="forgivenessRewrite"
                  value={formData.forgivenessRewrite}
                  onChange={handleChange}
                  placeholder="Rewrite one painful story so the lesson remains but the identity prison dissolves."
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-emerald-200/85 font-medium">
                  4. Spirit guide dialogue prompt
                </label>
                <textarea
                  name="guideQuestion"
                  value={formData.guideQuestion}
                  onChange={handleChange}
                  placeholder="What is one clear question you will ask in your next guidance journaling session?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="pt-4 flex justify-center sm:justify-start">
                <button type="submit" disabled={!isFormValid} className="px-8 py-4 tracking-widest text-xs uppercase border border-emerald-600 hover:bg-emerald-100 hover:text-slate-950 disabled:hover:bg-transparent disabled:hover:text-emerald-200/50 transition-all duration-500 disabled:opacity-30 disabled:border-emerald-900 text-emerald-100 font-medium">
                  Seal Gaia Protocol
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div key="gaia-success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease: 'easeOut' }} className="relative text-center space-y-4">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }} className="w-16 h-16 border border-emerald-300/60 rounded-full mx-auto flex items-center justify-center opacity-75 mb-6">
              <div className="w-2 h-2 bg-emerald-200 rounded-full" />
            </motion.div>
            <h2 className="text-2xl font-light tracking-widest text-emerald-50 uppercase">Gaia Voice Sealed</h2>
            <p className="text-sm text-emerald-100/80 max-w-sm mx-auto tracking-wide font-light">
              Track 10 is complete and integrated. Ready for Track 11 when you are.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
