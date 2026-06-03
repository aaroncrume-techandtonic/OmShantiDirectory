const LEDGER_STORAGE_KEY = 'om_shanti_akashic_ledger';

export const MODULE_CATALOG = [
  { module: 1, title: 'The Still Point', audio: '/audio/Still_Point_DEFAULT_MusicGPT.mp3', video: null },
  { module: 2, title: 'Resonant Sanctuary', audio: '/audio/Resonant_Sanctuary.mp3', video: '/videos/the-resonant-sanctuary.mp4' },
  { module: 3, title: 'Earthing Mirror', audio: '/audio/Earthing_Mirror.mp3', video: '/videos/the-earthing-mirror.mp4' },
  { module: 4, title: 'Silent Clearing', audio: '/audio/Silent_Clearing.mp3', video: '/videos/the-silent-clearing.mp4' },
  { module: 5, title: 'Shadows of the Lineage', audio: '/audio/Shadows_of_the_Lineage.mp3', video: '/videos/shadows-of-the-lineage.mp4' },
  { module: 6, title: 'The Unplugged Voice', audio: '/audio/The_Unplugged_Voice.mp3', video: '/videos/the-unplugged-voice.mp4' },
  { module: 7, title: 'The Water Altar', audio: '/audio/The_Water_Altar.mp3', video: '/videos/the-water-altar.mp4' },
  { module: 8, title: 'Shield of the Sun', audio: '/audio/Shield_of_the_Sun.mp3', video: '/videos/shield-of-the-sun.mp4' },
  { module: 9, title: 'The Cosmic Game', audio: '/audio/The_Cosmic_Game.mp3', video: '/videos/the-cosmic-game.mp4' },
  { module: 10, title: 'Voices of Gaia', audio: '/audio/Voices_of_Gaia.mp3', video: '/videos/voices-of-gaia.mp4' },
  { module: 11, title: 'The Crystal Mind', audio: '/audio/The_Crystal_Mind.mp3', video: '/videos/the-crystal-mind.mp4' },
  { module: 12, title: 'The Scent of Numbers', audio: '/audio/The_Scent_of_Numbers.mp3', video: '/videos/the-scent-of-numbers.mp4' },
  { module: 13, title: 'The Ego\'s End', audio: '/audio/The_Ego_s_End.mp3', video: '/videos/the-ego_s-end.mp4' },
  { module: 14, title: 'The Starry Step', audio: '/audio/The_Starry_Step.mp3', video: '/videos/the-starry-step.mp4' },
  { module: 15, title: 'The Joyful Child', audio: '/audio/The_Joyful_Child.mp3', video: '/videos/the-joyful-child.mp4' },
  { module: 16, title: 'The Element\'s Path', audio: '/audio/The_Element_s_Path.mp3', video: '/videos/the-element_s-path.mp4' },
  { module: 17, title: 'The Labyrinth of Light', audio: '/audio/The_Labyrinth_of_Light.mp3', video: '/videos/the-labyrinth-of-light.mp4' },
  { module: 18, title: 'The Living Prayer', audio: '/audio/The_Living_Prayer.mp3', video: '/videos/the-living-prayer.mp4' },
  { module: 19, title: 'The Resonant Aura', audio: '/audio/The_Resonant_Aura.mp3', video: '/videos/the-resonant-aura.mp4' },
  { module: 20, title: 'The Mirrored Soul', audio: '/audio/The_Mirrored_Soul.mp3', video: '/videos/the-mirrored-soul.mp4' },
  { module: 21, title: 'The Silver Cord', audio: '/audio/The_Silver_Cord.mp3', video: '/videos/the-silver-cord.mp4' },
  { module: 22, title: 'The Sacred Silver', audio: '/audio/The_Sacred_Silver.mp3', video: '/videos/the-sacred-silver.mp4' },
  { module: 23, title: 'The Inner Temple', audio: '/audio/The_Inner_Temple.mp3', video: '/videos/the-inner-temple.mp4' },
  { module: 24, title: 'The Crystal Stream', audio: '/audio/The_Crystal_Stream.mp3', video: '/videos/the-crystal-stream.mp4' },
  { module: 25, title: 'The Cosmic Humility', audio: '/audio/The_Cosmic_Humility.mp3', video: '/videos/the-cosmic-humility.mp4' },
];

const getStorage = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage;
};

const getModuleDescriptor = (moduleNumber) => {
  return MODULE_CATALOG.find((item) => item.module === moduleNumber) || null;
};

const readLedger = () => {
  const storage = getStorage();
  if (!storage) {
    return [];
  }

  const raw = storage.getItem(LEDGER_STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeLedger = (entries) => {
  const storage = getStorage();
  if (!storage) {
    return;
  }

  storage.setItem(LEDGER_STORAGE_KEY, JSON.stringify(entries));
};

export const getModuleStepOrder = (moduleNumber) => {
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

export const formatStepLabel = (step) => {
  if (step.startsWith('concept-')) {
    return step.replace('concept-', 'Concept ');
  }

  if (step === 'declaration') {
    return 'Declaration';
  }

  if (step === 'blueprint') {
    return 'Blueprint';
  }

  return 'Protocol';
};

export const syncAkashicLedgerFromCompletions = () => {
  const storage = getStorage();
  if (!storage) {
    return [];
  }

  const ledger = readLedger();
  const completedModuleIds = new Set(
    ledger.filter((entry) => entry.entryType === 'COMPLETED').map((entry) => entry.moduleId)
  );
  let updated = false;

  MODULE_CATALOG.forEach((module) => {
    const completionKey = `om_shanti_module_${module.module}_complete`;
    const isCompleted = storage.getItem(completionKey) === 'true';
    const moduleId = `track-${String(module.module).padStart(2, '0')}`;

    if (isCompleted && !completedModuleIds.has(moduleId)) {
      ledger.push({
        id: `completion-${moduleId}-${Date.now()}`,
        userId: 'local-user',
        moduleId,
        moduleNumber: module.module,
        moduleTitle: module.title,
        entryType: 'COMPLETED',
        content: null,
        resonance: null,
        createdAt: new Date().toISOString(),
      });
      completedModuleIds.add(moduleId);
      updated = true;
    }
  });

  if (updated) {
    writeLedger(ledger);
  }

  return ledger;
};

export const addLedgerReflection = ({ moduleNumber, content, resonance }) => {
  const module = getModuleDescriptor(moduleNumber);
  if (!module) {
    return [];
  }

  const ledger = readLedger();
  ledger.push({
    id: `reflection-${module.module}-${Date.now()}`,
    userId: 'local-user',
    moduleId: `track-${String(module.module).padStart(2, '0')}`,
    moduleNumber: module.module,
    moduleTitle: module.title,
    entryType: 'REFLECTION',
    content,
    resonance,
    createdAt: new Date().toISOString(),
  });

  writeLedger(ledger);
  return ledger;
};

export const getLedgerEntries = () => readLedger();

export const getCompletedModules = (entries = readLedger()) => {
  const completed = new Set(
    entries.filter((entry) => entry.entryType === 'COMPLETED').map((entry) => entry.moduleNumber)
  );

  return MODULE_CATALOG.filter((module) => completed.has(module.module));
};

export const getPendingReflectionModule = (entries = readLedger()) => {
  const reflectionMap = new Set(
    entries
      .filter((entry) => entry.entryType === 'REFLECTION')
      .map((entry) => `${entry.moduleNumber}-${entry.moduleId}`)
  );

  const completedEntries = entries
    .filter((entry) => entry.entryType === 'COMPLETED')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  for (const entry of completedEntries) {
    if (!reflectionMap.has(`${entry.moduleNumber}-${entry.moduleId}`)) {
      return {
        moduleNumber: entry.moduleNumber,
        moduleTitle: entry.moduleTitle,
        moduleId: entry.moduleId,
      };
    }
  }

  return null;
};

export const getLedgerSummary = (entries = readLedger()) => {
  const completedModules = new Map();
  const resonanceScores = new Map();

  entries.forEach((entry) => {
    if (entry.entryType === 'COMPLETED') {
      completedModules.set(entry.moduleNumber, entry);
    }

    if (entry.entryType === 'REFLECTION' && Number.isFinite(entry.resonance)) {
      const bucket = resonanceScores.get(entry.moduleNumber) || [];
      bucket.push(entry.resonance);
      resonanceScores.set(entry.moduleNumber, bucket);
    }
  });

  const corePillars = Array.from(resonanceScores.entries())
    .map(([moduleNumber, scores]) => {
      const total = scores.reduce((sum, value) => sum + value, 0);
      return {
        moduleNumber,
        average: total / scores.length,
      };
    })
    .sort((a, b) => b.average - a.average)
    .slice(0, 3)
    .map(({ moduleNumber, average }) => {
      const module = getModuleDescriptor(moduleNumber);
      return {
        moduleNumber,
        moduleTitle: module?.title || `Module ${moduleNumber}`,
        average,
      };
    });

  return {
    completedCount: completedModules.size,
    reflectionCount: entries.filter((entry) => entry.entryType === 'REFLECTION').length,
    totalCount: MODULE_CATALOG.length,
    corePillars,
  };
};

export const getReflectionEntriesForModule = (entries, moduleNumber) => {
  return entries
    .filter((entry) => entry.entryType === 'REFLECTION' && entry.moduleNumber === moduleNumber)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};
