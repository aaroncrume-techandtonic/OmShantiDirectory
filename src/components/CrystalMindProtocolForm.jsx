import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAudio } from '../context/AudioContext';
import Module11Progress from './Module11Progress';
import ModuleElevenBackdrop from './ModuleElevenBackdrop';

const INITIAL_FORM = {
  speechCommitment: '',
  orgoneReset: '',
  gridAnchor: '',
  dreamPrompt: '',
};

export default function CrystalMindProtocolForm({ onUnlocked }) {
  const { setCurrentTrack } = useAudio();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);

  useEffect(() => {
    setCurrentTrack('/audio/The_Crystal_Mind.mp3');
  }, [setCurrentTrack]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    formData.speechCommitment.trim().length > 10 &&
    formData.orgoneReset.trim().length > 10 &&
    formData.gridAnchor.trim().length > 10 &&
    formData.dreamPrompt.trim().length > 10;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid) {
      return;
    }

    localStorage.setItem('om_shanti_module_11_complete', 'true');
    localStorage.setItem('om_shanti_crystal_mind_protocol', JSON.stringify(formData));

    setIsSubmitted(true);
    setTimeout(() => {
      onUnlocked();
    }, 4000);
  };

  const inputBaseClass =
    'w-full bg-transparent border-b border-sky-900/70 focus:border-sky-300 focus:outline-none transition-all duration-300 resize-none py-2 text-sm text-sky-50 placeholder-sky-100/45 focus:shadow-[0_12px_30px_-20px_rgba(125,211,252,0.55)]';

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-sky-50 flex items-center justify-center p-6 sm:p-12 font-sans selection:bg-sky-900/30">
      <ModuleElevenBackdrop />
      <Module11Progress step={5} label="Crystal Mind Protocol" />

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div key="crystal-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 1 }} className="relative w-full max-w-3xl space-y-12">
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs uppercase tracking-[0.3em] text-sky-200/75">Track 11 // Threshold</span>
              <h1 className="text-3xl font-light tracking-wide text-sky-50">The Crystal Mind Protocol</h1>
              <p className="text-sm text-sky-100/80 max-w-xl">
                Anchor Track 11 through speech integrity, somatic flow, spatial intention, and sleep inquiry.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-sky-200/85 font-medium">
                  1. Heart-centered speech commitment
                </label>
                <textarea
                  name="speechCommitment"
                  value={formData.speechCommitment}
                  onChange={handleChange}
                  placeholder="What communication standard will you uphold when tension rises?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-sky-200/85 font-medium">
                  2. Orgone reset practice
                </label>
                <textarea
                  name="orgoneReset"
                  value={formData.orgoneReset}
                  onChange={handleChange}
                  placeholder="Describe your 3-minute body-based reset for releasing armor and restoring flow."
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-sky-200/85 font-medium">
                  3. Crystal grid anchor
                </label>
                <textarea
                  name="gridAnchor"
                  value={formData.gridAnchor}
                  onChange={handleChange}
                  placeholder="What symbols or objects will define your grid, and what one intention does it reinforce?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-sky-200/85 font-medium">
                  4. Dream incubation prompt
                </label>
                <textarea
                  name="dreamPrompt"
                  value={formData.dreamPrompt}
                  onChange={handleChange}
                  placeholder="Write the exact pre-sleep question you will ask your subconscious tonight."
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="pt-4 flex justify-center sm:justify-start">
                <button type="submit" disabled={!isFormValid} className="px-8 py-4 tracking-widest text-xs uppercase border border-sky-600 hover:bg-sky-100 hover:text-slate-950 disabled:hover:bg-transparent disabled:hover:text-sky-200/50 transition-all duration-500 disabled:opacity-30 disabled:border-sky-900 text-sky-100 font-medium">
                  Seal Crystal Mind Protocol
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div key="crystal-success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease: 'easeOut' }} className="relative text-center space-y-4">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }} className="w-16 h-16 border border-sky-300/60 rounded-full mx-auto flex items-center justify-center opacity-75 mb-6">
              <div className="w-2 h-2 bg-sky-200 rounded-full" />
            </motion.div>
            <h2 className="text-2xl font-light tracking-widest text-sky-50 uppercase">Crystal Mind Sealed</h2>
            <p className="text-sm text-sky-100/80 max-w-sm mx-auto tracking-wide font-light">
              Track 11 is complete and integrated. Ready to continue into Track 12.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
