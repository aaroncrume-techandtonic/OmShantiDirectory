import { useCallback, useEffect, useMemo, useState } from 'react';
import DeclarationForm from './components/DeclarationForm.jsx';
import SanctuaryBlueprintForm from './components/SanctuaryBlueprintForm.jsx';
import GroundingProtocolForm from './components/GroundingProtocolForm.jsx';
import ClearingProtocolForm from './components/ClearingProtocolForm.jsx';
import LineageProtocolForm from './components/LineageProtocolForm.jsx';
import CosmicProtocolForm from './components/CosmicProtocolForm.jsx';
import IntegrationProtocolForm from './components/IntegrationProtocolForm.jsx';
import ShieldProtocolForm from './components/ShieldProtocolForm.jsx';
import CosmicGameProtocolForm from './components/CosmicGameProtocolForm.jsx';
import GaiaProtocolForm from './components/GaiaProtocolForm.jsx';
import CrystalMindProtocolForm from './components/CrystalMindProtocolForm.jsx';
import ScentProtocolForm from './components/ScentProtocolForm.jsx';
import EgoEndProtocolForm from './components/EgoEndProtocolForm.jsx';
import StarryStepProtocolForm from './components/StarryStepProtocolForm.jsx';
import JoyfulChildProtocolForm from './components/JoyfulChildProtocolForm.jsx';
import ElementPathProtocolForm from './components/ElementPathProtocolForm.jsx';
import LabyrinthLightProtocolForm from './components/LabyrinthLightProtocolForm.jsx';
import LivingPrayerProtocolForm from './components/LivingPrayerProtocolForm.jsx';
import ResonantAuraProtocolForm from './components/ResonantAuraProtocolForm.jsx';
import MirroredSoulProtocolForm from './components/MirroredSoulProtocolForm.jsx';
import SilverCordProtocolForm from './components/SilverCordProtocolForm.jsx';
import SacredSilverProtocolForm from './components/SacredSilverProtocolForm.jsx';
import InnerTempleProtocolForm from './components/InnerTempleProtocolForm.jsx';
import CrystalStreamProtocolForm from './components/CrystalStreamProtocolForm.jsx';
import CosmicHumilityProtocolForm from './components/CosmicHumilityProtocolForm.jsx';
import MinimalAudioPlayer from './components/MinimalAudioPlayer.jsx';
import GlobalAudioPlayer from './components/GlobalAudioPlayer.jsx';
import { getModuleStepOrder } from './lib/akashicLedger.js';

const CONCEPT_MODULES = import.meta.glob('./Concept*.jsx', { eager: true });
const WORD_VALUES = {
  Zero: 0,
  One: 1,
  Two: 2,
  Three: 3,
  Four: 4,
  Five: 5,
  Six: 6,
  Seven: 7,
  Eight: 8,
  Nine: 9,
  Ten: 10,
  Eleven: 11,
  Twelve: 12,
  Thirteen: 13,
  Fourteen: 14,
  Fifteen: 15,
  Sixteen: 16,
  Seventeen: 17,
  Eighteen: 18,
  Nineteen: 19,
  Twenty: 20,
  Thirty: 30,
  Forty: 40,
  Fifty: 50,
  Sixty: 60,
  Seventy: 70,
  Eighty: 80,
  Ninety: 90,
  Hundred: 100,
};

const PROTOCOL_MAP = {
  3: GroundingProtocolForm,
  4: ClearingProtocolForm,
  5: LineageProtocolForm,
  6: CosmicProtocolForm,
  7: IntegrationProtocolForm,
  8: ShieldProtocolForm,
  9: CosmicGameProtocolForm,
  10: GaiaProtocolForm,
  11: CrystalMindProtocolForm,
  12: ScentProtocolForm,
  13: EgoEndProtocolForm,
  14: StarryStepProtocolForm,
  15: JoyfulChildProtocolForm,
  16: ElementPathProtocolForm,
  17: LabyrinthLightProtocolForm,
  18: LivingPrayerProtocolForm,
  19: ResonantAuraProtocolForm,
  20: MirroredSoulProtocolForm,
  21: SilverCordProtocolForm,
  22: SacredSilverProtocolForm,
  23: InnerTempleProtocolForm,
  24: CrystalStreamProtocolForm,
  25: CosmicHumilityProtocolForm,
};

const parseConceptNumber = (rawName) => {
  if (rawName === 'OneHundred') {
    return 100;
  }

  const tokens = rawName.replace(/^[A-Z]/, (char) => char).match(/[A-Z][a-z]+/g) || [];
  let total = 0;

  tokens.forEach((token) => {
    total += WORD_VALUES[token] || 0;
  });

  return total || null;
};

const buildConceptMap = () => {
  const map = new Map();

  Object.entries(CONCEPT_MODULES).forEach(([path, module]) => {
    const fileName = path.split('/').pop() || '';
    const baseName = fileName.replace('.jsx', '').replace('Concept', '');
    const number = parseConceptNumber(baseName);

    if (!number || !module?.default) {
      return;
    }

    map.set(number, module.default);
  });

  return map;
};

const conceptMap = buildConceptMap();

const getInitialState = () => {
  if (typeof window === 'undefined') {
    return { module: 1, step: 'concept-1' };
  }

  for (let moduleNumber = 1; moduleNumber <= 25; moduleNumber += 1) {
    const stepOrder = getModuleStepOrder(moduleNumber);
    const storedStep = window.sessionStorage.getItem(`omShantiModule${moduleNumber}Step`) || stepOrder[0];
    const completeKey = `om_shanti_module_${moduleNumber}_complete`;
    const completed = window.localStorage.getItem(completeKey) === 'true' || storedStep === 'complete';

    if (!completed) {
      return { module: moduleNumber, step: storedStep };
    }
  }

  const fallbackModule = 25;
  const fallbackStep = window.sessionStorage.getItem(`omShantiModule${fallbackModule}Step`) || getModuleStepOrder(fallbackModule)[0];
  return { module: fallbackModule, step: fallbackStep };
};

export default function OmShantiExperience() {
  const [navState, setNavState] = useState(getInitialState);

  const persistStep = (moduleNumber, step) => {
    if (typeof window === 'undefined') {
      return;
    }

    window.sessionStorage.setItem(`omShantiModule${moduleNumber}Step`, step);
  };

  const advanceStep = useCallback(() => {
    setNavState((prev) => {
      const stepOrder = getModuleStepOrder(prev.module);
      const currentIndex = stepOrder.indexOf(prev.step);

      if (currentIndex === -1) {
        return prev;
      }

      if (currentIndex < stepOrder.length - 1) {
        const nextStep = stepOrder[currentIndex + 1];
        persistStep(prev.module, nextStep);
        return { ...prev, step: nextStep };
      }

      persistStep(prev.module, 'complete');

      const nextModule = Math.min(prev.module + 1, 25);
      const nextStep = getModuleStepOrder(nextModule)[0];
      persistStep(nextModule, nextStep);

      return { module: nextModule, step: nextStep };
    });
  }, []);

  useEffect(() => {
    const handleNavigate = (event) => {
      const { module, step } = event.detail || {};
      if (!module || !step) {
        return;
      }

      persistStep(module, step);
      setNavState({ module, step });
    };

    window.addEventListener('omshanti:navigate-step', handleNavigate);
    return () => {
      window.removeEventListener('omshanti:navigate-step', handleNavigate);
    };
  }, []);

  const StepComponent = useMemo(() => {
    if (navState.step.startsWith('concept-')) {
      const conceptNumber = Number(navState.step.replace('concept-', ''));
      return conceptMap.get(conceptNumber) || null;
    }

    if (navState.step === 'declaration') {
      return DeclarationForm;
    }

    if (navState.step === 'blueprint') {
      return SanctuaryBlueprintForm;
    }

    if (navState.step === 'protocol') {
      return PROTOCOL_MAP[navState.module] || null;
    }

    return null;
  }, [navState]);

  if (!StepComponent) {
    return (
      <div className="min-h-screen bg-black text-neutral-200 flex items-center justify-center">
        Missing experience step.
      </div>
    );
  }

  const stepProps = navState.step.startsWith('concept-')
    ? { onContinue: advanceStep }
    : { onUnlocked: advanceStep };

  return (
    <div className="relative">
      <StepComponent {...stepProps} />
      <MinimalAudioPlayer />
      <GlobalAudioPlayer />
    </div>
  );
}
