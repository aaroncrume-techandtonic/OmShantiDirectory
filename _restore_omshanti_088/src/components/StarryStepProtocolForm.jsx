import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAudio } from '../context/AudioContext';
import Module14Progress from './Module14Progress';
import ModuleFourteenBackdrop from './ModuleFourteenBackdrop';

const INITIAL_FORM = {
  listeningCommitment: '',
  starlightWindow: '',
  mindfulWalkingCadence: '',
  abundancePractice: '',
};

export default function StarryStepProtocolForm({ onUnlocked }) {
  const { setCurrentTrack } = useAudio();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);

  useEffect(() => {
    setCurrentTrack('/audio/The_Starry_Step.mp3');
  }, [setCurrentTrack]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    formData.listeningCommitment.trim().length > 10 &&
    formData.starlightWindow.trim().length > 10 &&
    formData.mindfulWalkingCadence.trim().length > 10 &&
    formData.abundancePractice.trim().length > 10;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid) {
      return;
    }

    localStorage.setItem('om_shanti_module_14_complete', 'true');
    localStorage.setItem('om_shanti_starry_step_protocol', JSON.stringify(formData));

    setIsSubmitted(true);
    setTimeout(() => {
      onUnlocked();
    }, 4000);
  };

  const inputBaseClass =
    'w-full bg-transparent border-b border-cyan-900/70 focus:border-cyan-300 focus:outline-none transition-all duration-300 resize-none py-2 text-sm text-cyan-50 placeholder-cyan-100/45 focus:shadow-[0_12px_30px_-20px_rgba(34,211,238,0.55)]';

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-cyan-50 flex items-center justify-center p-6 sm:p-12 font-sans selection:bg-cyan-900/30">
      <ModuleFourteenBackdrop />
      <Module14Progress step={5} label="Starry Step Protocol" />

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div key="starry-step-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 1 }} className="relative w-full max-w-3xl space-y-12">
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs uppercase tracking-[0.3em] text-cyan-200/75">Track 14 // Threshold</span>
              <h1 className="text-3xl font-light tracking-wide text-cyan-50">The Starry Step Protocol</h1>
              <p className="text-sm text-cyan-100/80 max-w-xl">
                Commit your listening, starlight, mindful walking, and abundance practices into one sequence.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-cyan-200/85 font-medium">
                  1. Compassionate listening commitment
                </label>
                <textarea
                  name="listeningCommitment"
                  value={formData.listeningCommitment}
                  onChange={handleChange}
                  placeholder="How will you practice full-presence listening in your next two key conversations?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-cyan-200/85 font-medium">
                  2. Starlight meditation window
                </label>
                <textarea
                  name="starlightWindow"
                  value={formData.starlightWindow}
                  onChange={handleChange}
                  placeholder="When and where will you do starlight meditation this week?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-cyan-200/85 font-medium">
                  3. Mindful walking cadence
                </label>
                <textarea
                  name="mindfulWalkingCadence"
                  value={formData.mindfulWalkingCadence}
                  onChange={handleChange}
                  placeholder="What pace, breath ratio, and duration will define your walking practice?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-cyan-200/85 font-medium">
                  4. Abundance mindset action
                </label>
                <textarea
                  name="abundancePractice"
                  value={formData.abundancePractice}
                  onChange={handleChange}
                  placeholder="What concrete action proves abundance through stewardship and contribution this week?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="pt-4 flex justify-center sm:justify-start">
                <button type="submit" disabled={!isFormValid} className="px-8 py-4 tracking-widest text-xs uppercase border border-cyan-600 hover:bg-cyan-100 hover:text-slate-950 disabled:hover:bg-transparent disabled:hover:text-cyan-200/50 transition-all duration-500 disabled:opacity-30 disabled:border-cyan-900 text-cyan-100 font-medium">
                  Seal Starry Step Protocol
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div key="starry-step-success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease: 'easeOut' }} className="relative text-center space-y-4">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }} className="w-16 h-16 border border-cyan-300/60 rounded-full mx-auto flex items-center justify-center opacity-75 mb-6">
              <div className="w-2 h-2 bg-cyan-200 rounded-full" />
            </motion.div>
            <h2 className="text-2xl font-light tracking-widest text-cyan-50 uppercase">Starry Step Protocol Sealed</h2>
            <p className="text-sm text-cyan-100/80 max-w-sm mx-auto tracking-wide font-light">
              Track 14 is complete and integrated. Ready for Track 15.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
