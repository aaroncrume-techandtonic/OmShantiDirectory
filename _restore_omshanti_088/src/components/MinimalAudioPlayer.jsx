import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { useAudio } from '../context/AudioContext';
import AkashicLedgerPanel from './AkashicLedgerPanel';

const moduleMediaLibrary = [
  { module: 1, label: 'Module 1 - The Baseline', audio: '/audio/Still_Point_DEFAULT_MusicGPT.mp3', video: null },
  { module: 2, label: 'Module 2 - Resonant Sanctuary', audio: '/audio/Resonant_Sanctuary.mp3', video: '/videos/the-resonant-sanctuary.mp4' },
  { module: 3, label: 'Module 3 - Earthing Mirror', audio: '/audio/Earthing_Mirror.mp3', video: '/videos/the-earthing-mirror.mp4' },
  { module: 4, label: 'Module 4 - Silent Clearing', audio: '/audio/Silent_Clearing.mp3', video: '/videos/the-silent-clearing.mp4' },
  { module: 5, label: 'Module 5 - Shadows of the Lineage', audio: '/audio/Shadows_of_the_Lineage.mp3', video: '/videos/shadows-of-the-lineage.mp4' },
  { module: 6, label: 'Module 6 - The Unplugged Voice', audio: '/audio/The_Unplugged_Voice.mp3', video: '/videos/the-unplugged-voice.mp4' },
  { module: 7, label: 'Module 7 - The Water Altar', audio: '/audio/The_Water_Altar.mp3', video: '/videos/the-water-altar.mp4' },
  { module: 8, label: 'Module 8 - Shield of the Sun', audio: '/audio/Shield_of_the_Sun.mp3', video: '/videos/shield-of-the-sun.mp4' },
  { module: 9, label: 'Module 9 - The Cosmic Game', audio: '/audio/The_Cosmic_Game.mp3', video: '/videos/the-cosmic-game.mp4' },
  { module: 10, label: 'Module 10 - Voices of Gaia', audio: '/audio/Voices_of_Gaia.mp3', video: '/videos/voices-of-gaia.mp4' },
  { module: 11, label: 'Module 11 - The Crystal Mind', audio: '/audio/The_Crystal_Mind.mp3', video: '/videos/the-crystal-mind.mp4' },
  { module: 12, label: 'Module 12 - The Scent of Numbers', audio: '/audio/The_Scent_of_Numbers.mp3', video: '/videos/the-scent-of-numbers.mp4' },
  { module: 13, label: "Module 13 - The Ego's End", audio: '/audio/The_Ego_s_End.mp3', video: '/videos/the-ego_s-end.mp4' },
  { module: 14, label: 'Module 14 - The Starry Step', audio: '/audio/The_Starry_Step.mp3', video: '/videos/the-starry-step.mp4' },
  { module: 15, label: 'Module 15 - The Joyful Child', audio: '/audio/The_Joyful_Child.mp3', video: '/videos/the-joyful-child.mp4' },
  { module: 16, label: "Module 16 - The Element's Path", audio: '/audio/The_Element_s_Path.mp3', video: '/videos/the-element_s-path.mp4' },
  { module: 17, label: 'Module 17 - The Labyrinth of Light', audio: '/audio/The_Labyrinth_of_Light.mp3', video: '/videos/the-labyrinth-of-light.mp4' },
  { module: 18, label: 'Module 18 - The Living Prayer', audio: '/audio/The_Living_Prayer.mp3', video: '/videos/the-living-prayer.mp4' },
  { module: 19, label: 'Module 19 - The Resonant Aura', audio: '/audio/The_Resonant_Aura.mp3', video: '/videos/the-resonant-aura.mp4' },
  { module: 20, label: 'Module 20 - The Mirrored Soul', audio: '/audio/The_Mirrored_Soul.mp3', video: '/videos/the-mirrored-soul.mp4' },
  { module: 21, label: 'Module 21 - The Silver Cord', audio: '/audio/The_Silver_Cord.mp3', video: '/videos/the-silver-cord.mp4' },
  { module: 22, label: 'Module 22 - The Sacred Silver', audio: '/audio/The_Sacred_Silver.mp3', video: '/videos/the-sacred-silver.mp4' },
  { module: 23, label: 'Module 23 - The Inner Temple', audio: '/audio/The_Inner_Temple.mp3', video: '/videos/the-inner-temple.mp4' },
  { module: 24, label: 'Module 24 - The Crystal Stream', audio: '/audio/The_Crystal_Stream.mp3', video: '/videos/the-crystal-stream.mp4' },
  { module: 25, label: 'Module 25 - The Cosmic Humility', audio: '/audio/The_Cosmic_Humility.mp3', video: '/videos/the-cosmic-humility.mp4' },
];

const getModuleStepOrder = (moduleNumber) => {
  const startConcept = (moduleNumber - 1) * 4 + 1;
  const finalStep =
    moduleNumber === 1 ? 'declaration' : moduleNumber === 2 ? 'blueprint' : 'protocol';

  return [
    `concept-${startConcept}`,
    `concept-${startConcept + 1}`,
    `concept-${startConcept + 2}`,
    `concept-${startConcept + 3}`,
    finalStep,
  ];
};

const formatStepLabel = (step) => {
  if (step.startsWith('concept-')) {
    return `C${step.replace('concept-', '')}`;
  }
  if (step === 'declaration') return 'Declaration';
  if (step === 'blueprint') return 'Blueprint';
  return 'Protocol';
};

export default function MinimalAudioPlayer() {
  const {
    isPlaying,
    togglePlay,
    volume,
    setVolumeLevel,
    isMuted,
    toggleMute,
    currentTrack,
  } = useAudio();

  const [expanded, setExpanded] = useState(() => {
    if (typeof window === 'undefined') {
      return true;
    }

    return window.innerWidth >= 1024;
  });
  const [showLibrary, setShowLibrary] = useState(false);
  const [showLedger, setShowLedger] = useState(true);

  const displayedVolume = isMuted ? 0 : Math.round(volume * 100);

  const trackFileName = currentTrack.split('/').pop() || '';
  const trackLabel =
    trackFileName === 'Still_Point_DEFAULT_MusicGPT.mp3'
      ? 'The Still Point'
      : trackFileName.replaceAll('_', ' ').replace('.mp3', '') || 'Now Playing';

  const moduleStates = useMemo(() => {
    if (typeof window === 'undefined') {
      return [];
    }

    return Array.from({ length: 25 }, (_, index) => {
      const moduleNumber = index + 1;
      const stepOrder = getModuleStepOrder(moduleNumber);
      const defaultStep = stepOrder[0];
      const storedStep = window.sessionStorage.getItem(`omShantiModule${moduleNumber}Step`) || defaultStep;
      const completeKey = `om_shanti_module_${moduleNumber}_complete`;
      const completed = window.localStorage.getItem(completeKey) === 'true' || storedStep === 'complete';
      const currentIndex = stepOrder.indexOf(storedStep);
      const unlockedSteps = completed
        ? stepOrder
        : stepOrder.slice(0, Math.max(1, currentIndex + 1));

      return {
        moduleNumber,
        currentStep: storedStep,
        completed,
        stepOrder,
        unlockedSteps,
      };
    });
  }, []);

  const activeModuleState = moduleStates.find((state) => !state.completed) || moduleStates[moduleStates.length - 1] || null;

  const completedModuleStates = moduleStates.filter((state) => state.completed);

  const activeIndex = activeModuleState
    ? activeModuleState.unlockedSteps.indexOf(activeModuleState.currentStep)
    : -1;

  const prevStep =
    activeModuleState && activeIndex > 0
      ? activeModuleState.unlockedSteps[activeIndex - 1]
      : null;

  const nextStep =
    activeModuleState && activeIndex >= 0 && activeIndex < activeModuleState.unlockedSteps.length - 1
      ? activeModuleState.unlockedSteps[activeIndex + 1]
      : null;

  const completedMedia = completedModuleStates
    .map((state) => moduleMediaLibrary.find((item) => item.module === state.moduleNumber))
    .filter(Boolean);

  const navigateToStep = (moduleNumber, step) => {
    window.dispatchEvent(
      new CustomEvent('omshanti:navigate-step', {
        detail: { module: moduleNumber, step },
      })
    );
  };

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`fixed left-2 top-1/2 z-50 -translate-y-1/2 overflow-hidden rounded-xl border border-slate-800 bg-black/70 backdrop-blur-md transition-all duration-300 ${
        expanded ? 'h-[88vh] w-[min(90vw,340px)]' : 'h-auto w-14'
      }`}
    >
      {!expanded ? (
        <div className="flex flex-col items-center gap-2 p-2">
          <button
            onClick={() => setExpanded(true)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800"
            aria-label="Expand media sidebar"
          >
            ≡
          </button>
          <button
            onClick={togglePlay}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800"
            aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
          >
            {isPlaying ? 'II' : '>'}
          </button>
        </div>
      ) : (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-slate-800 px-3 py-2">
            <p className="truncate text-xs uppercase tracking-[0.16em] text-slate-400">Media Sidebar</p>
            <button
              onClick={() => setExpanded(false)}
              className="rounded-md border border-slate-700 px-2 py-1 text-xs text-slate-300 hover:bg-slate-800"
              aria-label="Collapse media sidebar"
            >
              Close
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-3">
            <section className="rounded-lg border border-slate-800 bg-slate-900/70 p-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Now Playing</p>
              <p className="truncate text-sm font-medium text-slate-100">{trackLabel}</p>

              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  className="rounded border border-slate-700 bg-slate-800 px-2 py-1 text-xs text-slate-200 hover:bg-slate-700"
                >
                  {isPlaying ? 'Pause' : 'Play'}
                </button>
                <button
                  onClick={toggleMute}
                  className="rounded border border-slate-700 bg-slate-800 px-2 py-1 text-xs text-slate-200 hover:bg-slate-700"
                >
                  {isMuted ? 'Unmute' : 'Mute'}
                </button>
                <span className="ml-auto text-xs text-slate-400">{displayedVolume}%</span>
              </div>

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={(event) => setVolumeLevel(Number(event.target.value))}
                className="mt-2 h-1 w-full cursor-pointer appearance-none rounded-full bg-slate-700"
                aria-label="Volume"
              />
            </section>

            {activeModuleState ? (
              <section className="rounded-lg border border-indigo-500/30 bg-indigo-500/10 p-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-indigo-300">Current Module</p>
                <p className="text-sm text-indigo-100">Module {activeModuleState.moduleNumber}</p>

                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => prevStep && navigateToStep(activeModuleState.moduleNumber, prevStep)}
                    disabled={!prevStep}
                    className="flex-1 rounded border border-indigo-400/40 bg-indigo-500/20 px-2 py-1 text-xs text-indigo-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Prev
                  </button>
                  <button
                    onClick={() => nextStep && navigateToStep(activeModuleState.moduleNumber, nextStep)}
                    disabled={!nextStep}
                    className="flex-1 rounded border border-indigo-400/40 bg-indigo-500/20 px-2 py-1 text-xs text-indigo-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>

                <div className="mt-2 flex flex-wrap gap-1">
                  {activeModuleState.unlockedSteps.map((step) => {
                    const active = step === activeModuleState.currentStep;
                    return (
                      <button
                        key={`active-${activeModuleState.moduleNumber}-${step}`}
                        onClick={() => navigateToStep(activeModuleState.moduleNumber, step)}
                        className={`rounded border px-2 py-1 text-[11px] ${
                          active
                            ? 'border-indigo-300 bg-indigo-500/30 text-white'
                            : 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700'
                        }`}
                      >
                        {formatStepLabel(step)}
                      </button>
                    );
                  })}
                </div>
              </section>
            ) : null}

            <section className="rounded-lg border border-slate-800 bg-slate-900/70 p-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Completed Modules Navigation</p>

              {completedModuleStates.length === 0 ? (
                <p className="mt-2 text-xs text-slate-500">Completed modules will appear here.</p>
              ) : (
                <div className="mt-2 space-y-2">
                  {completedModuleStates.map((moduleState) => (
                    <details key={`completed-${moduleState.moduleNumber}`} className="rounded border border-slate-700 bg-slate-800/60 p-2">
                      <summary className="cursor-pointer text-xs text-slate-200">Module {moduleState.moduleNumber}</summary>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {moduleState.stepOrder.map((step) => (
                          <button
                            key={`completed-step-${moduleState.moduleNumber}-${step}`}
                            onClick={() => navigateToStep(moduleState.moduleNumber, step)}
                            className="rounded border border-slate-700 bg-slate-900 px-2 py-1 text-[11px] text-slate-200 hover:bg-slate-700"
                          >
                            {formatStepLabel(step)}
                          </button>
                        ))}
                      </div>
                    </details>
                  ))}
                </div>
              )}
            </section>

            <section className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3">
              <button
                onClick={() => setShowLibrary((prev) => !prev)}
                className="w-full rounded border border-emerald-500/40 bg-emerald-500/20 px-2 py-1 text-xs uppercase tracking-wide text-emerald-100"
              >
                {showLibrary ? 'Hide Completed Media' : 'Show Completed Media'}
              </button>

              {showLibrary ? (
                completedMedia.length === 0 ? (
                  <p className="mt-2 text-xs text-emerald-100/70">Complete modules to unlock media links.</p>
                ) : (
                  <div className="mt-2 space-y-2">
                    {completedMedia.map((item) => (
                      <div key={`media-${item.module}`} className="rounded border border-emerald-500/30 bg-emerald-900/20 p-2">
                        <p className="text-xs text-emerald-100">{item.label}</p>
                        <div className="mt-1 flex gap-2">
                          <a
                            href={item.audio}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded border border-indigo-400/50 bg-indigo-500/20 px-2 py-1 text-[11px] text-indigo-100"
                          >
                            MP3
                          </a>
                          {item.video ? (
                            <a
                              href={item.video}
                              target="_blank"
                              rel="noreferrer"
                              className="rounded border border-emerald-400/50 bg-emerald-500/20 px-2 py-1 text-[11px] text-emerald-100"
                            >
                              Video
                            </a>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : null}
            </section>

            <section className="rounded-lg border border-fuchsia-500/30 bg-fuchsia-500/10 p-3">
              <button
                onClick={() => setShowLedger((prev) => !prev)}
                className="w-full rounded border border-fuchsia-500/40 bg-fuchsia-500/20 px-2 py-1 text-xs uppercase tracking-wide text-fuchsia-100"
              >
                {showLedger ? 'Hide Akashic Ledger' : 'Open Akashic Ledger'}
              </button>

              {showLedger ? (
                <div className="mt-2 max-h-[38vh] overflow-y-auto pr-1">
                  <AkashicLedgerPanel />
                </div>
              ) : null}
            </section>
          </div>
        </div>
      )}
    </motion.aside>
  );
}
