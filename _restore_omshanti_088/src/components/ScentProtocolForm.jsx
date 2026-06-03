import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAudio } from '../context/AudioContext';
import Module12Progress from './Module12Progress';
import ModuleTwelveBackdrop from './ModuleTwelveBackdrop';

const INITIAL_FORM = {
  breathCadence: '',
  detachmentCue: '',
  cleansingAction: '',
  synchronicityJournalRule: '',
};

export default function ScentProtocolForm({ onUnlocked }) {
  const { setCurrentTrack } = useAudio();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);

  useEffect(() => {
    setCurrentTrack('/audio/The_Scent_of_Numbers.mp3');
  }, [setCurrentTrack]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    formData.breathCadence.trim().length > 10 &&
    formData.detachmentCue.trim().length > 10 &&
    formData.cleansingAction.trim().length > 10 &&
    formData.synchronicityJournalRule.trim().length > 10;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid) {
      return;
    }

    localStorage.setItem('om_shanti_module_12_complete', 'true');
    localStorage.setItem('om_shanti_scent_protocol', JSON.stringify(formData));

    setIsSubmitted(true);
    setTimeout(() => {
      onUnlocked();
    }, 4000);
  };

  const inputBaseClass =
    'w-full bg-transparent border-b border-amber-900/70 focus:border-amber-300 focus:outline-none transition-all duration-300 resize-none py-2 text-sm text-amber-50 placeholder-amber-100/45 focus:shadow-[0_12px_30px_-20px_rgba(251,191,36,0.55)]';

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-amber-50 flex items-center justify-center p-6 sm:p-12 font-sans selection:bg-amber-900/30">
      <ModuleTwelveBackdrop />
      <Module12Progress step={5} label="Scent Protocol" />

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div key="scent-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 1 }} className="relative w-full max-w-3xl space-y-12">
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs uppercase tracking-[0.3em] text-amber-200/75">Track 12 // Threshold</span>
              <h1 className="text-3xl font-light tracking-wide text-amber-50">The Scent Protocol</h1>
              <p className="text-sm text-amber-100/80 max-w-xl">
                Anchor breath, detachment, cleansing behavior, and a synchronicity journaling rule.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-amber-200/85 font-medium">
                  1. Pranic breathing cadence
                </label>
                <textarea
                  name="breathCadence"
                  value={formData.breathCadence}
                  onChange={handleChange}
                  placeholder="What exact inhale, hold, and exhale rhythm will you practice daily?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-amber-200/85 font-medium">
                  2. Non-attachment cue statement
                </label>
                <textarea
                  name="detachmentCue"
                  value={formData.detachmentCue}
                  onChange={handleChange}
                  placeholder="Write the sentence you will use to release outcome-clinging in real time."
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-amber-200/85 font-medium">
                  3. Karmic cleansing action
                </label>
                <textarea
                  name="cleansingAction"
                  value={formData.cleansingAction}
                  onChange={handleChange}
                  placeholder="Name one concrete repair or simplification action you will complete this week."
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-amber-200/85 font-medium">
                  4. Synchronicity journal rule
                </label>
                <textarea
                  name="synchronicityJournalRule"
                  value={formData.synchronicityJournalRule}
                  onChange={handleChange}
                  placeholder="What standard will decide whether a coincidence gets logged and acted on?"
                  className={inputBaseClass}
                  rows={3}
                />
              </div>

              <div className="pt-4 flex justify-center sm:justify-start">
                <button type="submit" disabled={!isFormValid} className="px-8 py-4 tracking-widest text-xs uppercase border border-amber-600 hover:bg-amber-100 hover:text-slate-950 disabled:hover:bg-transparent disabled:hover:text-amber-200/50 transition-all duration-500 disabled:opacity-30 disabled:border-amber-900 text-amber-100 font-medium">
                  Seal Scent Protocol
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div key="scent-success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease: 'easeOut' }} className="relative text-center space-y-4">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }} className="w-16 h-16 border border-amber-300/60 rounded-full mx-auto flex items-center justify-center opacity-75 mb-6">
              <div className="w-2 h-2 bg-amber-200 rounded-full" />
            </motion.div>
            <h2 className="text-2xl font-light tracking-widest text-amber-50 uppercase">Scent Protocol Sealed</h2>
            <p className="text-sm text-amber-100/80 max-w-sm mx-auto tracking-wide font-light">
              Track 12 is complete and integrated. Ready for Track 13.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
