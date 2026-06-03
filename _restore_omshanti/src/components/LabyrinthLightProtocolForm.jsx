import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAudio } from '../context/AudioContext';
import Module17Progress from './Module17Progress';
import ModuleSeventeenBackdrop from './ModuleSeventeenBackdrop';

const INITIAL_FORM = {
  ancestralReleaseCommitment: '',
  labyrinthPracticePlan: '',
  foodBlessingPhrase: '',
  shieldingVisualization: '',
};

export default function LabyrinthLightProtocolForm({ onUnlocked }) {
  const { setCurrentTrack } = useAudio();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);

  useEffect(() => {
    setCurrentTrack('/audio/The_Labyrinth_of_Light.mp3');
  }, [setCurrentTrack]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    formData.ancestralReleaseCommitment.trim().length > 10 &&
    formData.labyrinthPracticePlan.trim().length > 10 &&
    formData.foodBlessingPhrase.trim().length > 10 &&
    formData.shieldingVisualization.trim().length > 10;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid) {
      return;
    }

    localStorage.setItem('om_shanti_module_17_complete', 'true');
    localStorage.setItem('om_shanti_labyrinth_light_protocol', JSON.stringify(formData));

    setIsSubmitted(true);
    setTimeout(() => {
      onUnlocked();
    }, 4000);
  };

  const inputBaseClass =
    'w-full bg-transparent border-b border-violet-900/70 focus:border-violet-300 focus:outline-none transition-all duration-300 resize-none py-2 text-sm text-violet-50 placeholder-violet-100/45 focus:shadow-[0_12px_30px_-20px_rgba(168,85,247,0.55)]';

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-violet-50 flex items-center justify-center p-6 sm:p-12 font-sans selection:bg-violet-900/30">
      <ModuleSeventeenBackdrop />
      <Module17Progress step={5} label="Labyrinth Light Protocol" />

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div key="labyrinth-light-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 1 }} className="relative w-full max-w-3xl space-y-12">
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs uppercase tracking-[0.3em] text-violet-200/75">Track 17 // Threshold</span>
              <h1 className="text-3xl font-light tracking-wide text-violet-50">The Labyrinth Light Protocol</h1>
              <p className="text-sm text-violet-100/80 max-w-xl">
                Commit ancestral release, labyrinth movement, food blessing, and shielding into one integration path.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-violet-200/85 font-medium">
                  1. Ancestral forgiveness commitment
                </label>
                <textarea
                  name="ancestralReleaseCommitment"
                  value={formData.ancestralReleaseCommitment}
                  onChange={handleChange}
                  placeholder="What inherited pattern are you releasing, and what replacement behavior starts now?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-violet-200/85 font-medium">
                  2. Labyrinth walking practice plan
                </label>
                <textarea
                  name="labyrinthPracticePlan"
                  value={formData.labyrinthPracticePlan}
                  onChange={handleChange}
                  placeholder="When will you do labyrinth practice, and what question or intention will you carry?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-violet-200/85 font-medium">
                  3. Food blessing phrase
                </label>
                <textarea
                  name="foodBlessingPhrase"
                  value={formData.foodBlessingPhrase}
                  onChange={handleChange}
                  placeholder="Write the blessing you will speak before meals to align nourishment and gratitude."
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-violet-200/85 font-medium">
                  4. White light shielding visualization
                </label>
                <textarea
                  name="shieldingVisualization"
                  value={formData.shieldingVisualization}
                  onChange={handleChange}
                  placeholder="Describe your exact shielding visualization for high-intensity environments."
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="pt-4 flex justify-center sm:justify-start">
                <button type="submit" disabled={!isFormValid} className="px-8 py-4 tracking-widest text-xs uppercase border border-violet-600 hover:bg-violet-100 hover:text-slate-950 disabled:hover:bg-transparent disabled:hover:text-violet-200/50 transition-all duration-500 disabled:opacity-30 disabled:border-violet-900 text-violet-100 font-medium">
                  Seal Labyrinth Light Protocol
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div key="labyrinth-light-success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease: 'easeOut' }} className="relative text-center space-y-4">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }} className="w-16 h-16 border border-violet-300/60 rounded-full mx-auto flex items-center justify-center opacity-75 mb-6">
              <div className="w-2 h-2 bg-violet-200 rounded-full" />
            </motion.div>
            <h2 className="text-2xl font-light tracking-widest text-violet-50 uppercase">Labyrinth Light Protocol Sealed</h2>
            <p className="text-sm text-violet-100/80 max-w-sm mx-auto tracking-wide font-light">
              Track 17 is complete and integrated. Ready for Track 18.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
