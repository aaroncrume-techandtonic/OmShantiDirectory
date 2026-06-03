import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAudio } from '../context/AudioContext';
import Module3Progress from './Module3Progress';
import ModuleThreeBackdrop from './ModuleThreeBackdrop';

const INITIAL_FORM = {
  boundaries: '',
  earthing: '',
  lightwork: '',
  mirror: '',
};

export default function GroundingProtocolForm({ onUnlocked }) {
  const { setCurrentTrack } = useAudio();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);

  useEffect(() => {
    setCurrentTrack('/audio/Earthing_Mirror.mp3');
  }, [setCurrentTrack]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    formData.boundaries.trim().length > 10 &&
    formData.earthing.trim().length > 10 &&
    formData.lightwork.trim().length > 10 &&
    formData.mirror.trim().length > 10;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid) {
      return;
    }

    localStorage.setItem('om_shanti_module_3_complete', 'true');
    localStorage.setItem('om_shanti_grounding_protocol', JSON.stringify(formData));

    setIsSubmitted(true);
    setTimeout(() => {
      onUnlocked();
    }, 4000);
  };

  const inputBaseClass =
    'w-full bg-transparent border-b border-amber-900/70 focus:border-amber-300 focus:outline-none transition-all duration-300 resize-none py-2 text-sm text-white placeholder-neutral-500 focus:shadow-[0_12px_30px_-20px_rgba(251,191,36,0.58)]';

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-neutral-200 flex items-center justify-center p-6 sm:p-12 font-sans selection:bg-amber-900/50">
      <ModuleThreeBackdrop />
      <Module3Progress step={5} label="Grounding Protocol" />

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div key="grounding-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 1 }} className="relative w-full max-w-3xl space-y-12">
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs uppercase tracking-[0.3em] text-amber-300/70">Module 3 // Threshold</span>
              <h1 className="text-3xl font-light tracking-wide text-white">The Grounding Protocol</h1>
              <p className="text-sm text-neutral-300 max-w-xl">
                Convert insight into physical action so your energy remains stable under pressure.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-amber-200/80 font-medium">
                  1. Reinforce one boundary leak
                </label>
                <textarea
                  name="boundaries"
                  value={formData.boundaries}
                  onChange={handleChange}
                  placeholder="Where is your energy leaking right now, and what boundary will you reinforce today?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-amber-200/80 font-medium">
                  2. Commit to an earthing action
                </label>
                <textarea
                  name="earthing"
                  value={formData.earthing}
                  onChange={handleChange}
                  placeholder="What specific earthing practice will you do today, and when exactly will you do it?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-amber-200/80 font-medium">
                  3. Name one small deed of lightwork
                </label>
                <textarea
                  name="lightwork"
                  value={formData.lightwork}
                  onChange={handleChange}
                  placeholder="What one intentional small deed will you perform in the next 24 hours?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-amber-200/80 font-medium">
                  4. Decode a recent mirror trigger
                </label>
                <textarea
                  name="mirror"
                  value={formData.mirror}
                  onChange={handleChange}
                  placeholder="Who or what triggered you recently, and what does that reflection reveal about your internal state?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="pt-4 flex justify-center sm:justify-start">
                <button type="submit" disabled={!isFormValid} className="px-8 py-4 tracking-widest text-xs uppercase border border-amber-700 hover:bg-amber-100 hover:text-black disabled:hover:bg-transparent disabled:hover:text-neutral-500 transition-all duration-500 disabled:opacity-30 disabled:border-amber-900/50 text-amber-100 font-medium">
                  Seal Grounding Protocol
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div key="grounding-success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease: 'easeOut' }} className="relative text-center space-y-4">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} className="w-16 h-16 border border-amber-400/55 rounded-full mx-auto flex items-center justify-center opacity-60 mb-6">
              <div className="w-2 h-2 bg-amber-200 rounded-full" />
            </motion.div>
            <h2 className="text-2xl font-light tracking-widest text-white uppercase">Protocol Sealed</h2>
            <p className="text-sm text-neutral-300 max-w-sm mx-auto tracking-wide font-light">
              Grounding is integrated. Preparing your transition into Track 4...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
