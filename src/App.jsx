import React, { useState, useMemo, useEffect } from 'react';
import PaymentGate from './PaymentGate';
import MinimalAudioPlayer from './components/MinimalAudioPlayer';
import { syncAkashicLedgerFromCompletions } from './lib/akashicLedger';
import {
  Search,
  BookOpen,
  Wind,
  Activity,
  Globe,
  Brain,
  Heart,
  Sparkles,
  X,
  ChevronRight,
  Play,
} from 'lucide-react';

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex items-center justify-center tracking-[0.2em] text-xs uppercase">
      Loading...
    </div>
  );
}

function lazyLoad(loader) {
  return function LazyComponent(props) {
    const [Component, setComponent] = useState(null);

    useEffect(() => {
      let isMounted = true;

      loader().then((module) => {
        if (isMounted) {
          setComponent(() => module.default);
        }
      });

      return () => {
        isMounted = false;
      };
    }, []);

    if (!Component) {
      return <LoadingScreen />;
    }

    return <Component {...props} />;
  };
}

const ConceptOne = lazyLoad(() => import('./ConceptOne'));
const ConceptTwo = lazyLoad(() => import('./ConceptTwo'));
const ConceptThree = lazyLoad(() => import('./ConceptThree'));
const ConceptFour = lazyLoad(() => import('./ConceptFour'));
const ConceptFive = lazyLoad(() => import('./ConceptFive'));
const ConceptSix = lazyLoad(() => import('./ConceptSix'));
const ConceptSeven = lazyLoad(() => import('./ConceptSeven'));
const ConceptEight = lazyLoad(() => import('./ConceptEight'));
const ConceptNine = lazyLoad(() => import('./ConceptNine'));
const ConceptTen = lazyLoad(() => import('./ConceptTen'));
const ConceptEleven = lazyLoad(() => import('./ConceptEleven'));
const ConceptTwelve = lazyLoad(() => import('./ConceptTwelve'));
const ConceptThirteen = lazyLoad(() => import('./ConceptThirteen'));
const ConceptFourteen = lazyLoad(() => import('./ConceptFourteen'));
const ConceptFifteen = lazyLoad(() => import('./ConceptFifteen'));
const ConceptSixteen = lazyLoad(() => import('./ConceptSixteen'));
const ConceptSeventeen = lazyLoad(() => import('./ConceptSeventeen'));
const ConceptEighteen = lazyLoad(() => import('./ConceptEighteen'));
const ConceptNineteen = lazyLoad(() => import('./ConceptNineteen'));
const ConceptTwenty = lazyLoad(() => import('./ConceptTwenty'));
const ConceptTwentyOne = lazyLoad(() => import('./ConceptTwentyOne'));
const ConceptTwentyTwo = lazyLoad(() => import('./ConceptTwentyTwo'));
const ConceptTwentyThree = lazyLoad(() => import('./ConceptTwentyThree'));
const ConceptTwentyFour = lazyLoad(() => import('./ConceptTwentyFour'));
const ConceptTwentyFive = lazyLoad(() => import('./ConceptTwentyFive'));
const ConceptTwentySix = lazyLoad(() => import('./ConceptTwentySix'));
const ConceptTwentySeven = lazyLoad(() => import('./ConceptTwentySeven'));
const ConceptTwentyEight = lazyLoad(() => import('./ConceptTwentyEight'));
const ConceptTwentyNine = lazyLoad(() => import('./ConceptTwentyNine'));
const ConceptThirty = lazyLoad(() => import('./ConceptThirty'));
const ConceptThirtyOne = lazyLoad(() => import('./ConceptThirtyOne'));
const ConceptThirtyTwo = lazyLoad(() => import('./ConceptThirtyTwo'));
const ConceptThirtyThree = lazyLoad(() => import('./ConceptThirtyThree'));
const ConceptThirtyFour = lazyLoad(() => import('./ConceptThirtyFour'));
const ConceptThirtyFive = lazyLoad(() => import('./ConceptThirtyFive'));
const ConceptThirtySix = lazyLoad(() => import('./ConceptThirtySix'));
const ConceptThirtySeven = lazyLoad(() => import('./ConceptThirtySeven'));
const ConceptThirtyEight = lazyLoad(() => import('./ConceptThirtyEight'));
const ConceptThirtyNine = lazyLoad(() => import('./ConceptThirtyNine'));
const ConceptForty = lazyLoad(() => import('./ConceptForty'));
const ConceptFortyOne = lazyLoad(() => import('./ConceptFortyOne'));
const ConceptFortyTwo = lazyLoad(() => import('./ConceptFortyTwo'));
const ConceptFortyThree = lazyLoad(() => import('./ConceptFortyThree'));
const ConceptFortyFour = lazyLoad(() => import('./ConceptFortyFour'));
const ConceptFortyFive = lazyLoad(() => import('./ConceptFortyFive'));
const ConceptFortySix = lazyLoad(() => import('./ConceptFortySix'));
const ConceptFortySeven = lazyLoad(() => import('./ConceptFortySeven'));
const ConceptFortyEight = lazyLoad(() => import('./ConceptFortyEight'));
const ConceptFortyNine = lazyLoad(() => import('./ConceptFortyNine'));
const ConceptFifty = lazyLoad(() => import('./ConceptFifty'));
const ConceptFiftyOne = lazyLoad(() => import('./ConceptFiftyOne'));
const ConceptFiftyTwo = lazyLoad(() => import('./ConceptFiftyTwo'));
const ConceptFiftyThree = lazyLoad(() => import('./ConceptFiftyThree'));
const ConceptFiftyFour = lazyLoad(() => import('./ConceptFiftyFour'));
const ConceptFiftyFive = lazyLoad(() => import('./ConceptFiftyFive'));
const ConceptFiftySix = lazyLoad(() => import('./ConceptFiftySix'));
const ConceptFiftySeven = lazyLoad(() => import('./ConceptFiftySeven'));
const ConceptFiftyEight = lazyLoad(() => import('./ConceptFiftyEight'));
const ConceptFiftyNine = lazyLoad(() => import('./ConceptFiftyNine'));
const ConceptSixty = lazyLoad(() => import('./ConceptSixty'));
const ConceptSixtyOne = lazyLoad(() => import('./ConceptSixtyOne'));
const ConceptSixtyTwo = lazyLoad(() => import('./ConceptSixtyTwo'));
const ConceptSixtyThree = lazyLoad(() => import('./ConceptSixtyThree'));
const ConceptSixtyFour = lazyLoad(() => import('./ConceptSixtyFour'));
const ConceptSixtyFive = lazyLoad(() => import('./ConceptSixtyFive'));
const ConceptSixtySix = lazyLoad(() => import('./ConceptSixtySix'));
const ConceptSixtySeven = lazyLoad(() => import('./ConceptSixtySeven'));
const ConceptSixtyEight = lazyLoad(() => import('./ConceptSixtyEight'));
const ConceptSixtyNine = lazyLoad(() => import('./ConceptSixtyNine'));
const ConceptSeventy = lazyLoad(() => import('./ConceptSeventy'));
const ConceptSeventyOne = lazyLoad(() => import('./ConceptSeventyOne'));
const ConceptSeventyTwo = lazyLoad(() => import('./ConceptSeventyTwo'));
const ConceptSeventyThree = lazyLoad(() => import('./ConceptSeventyThree'));
const ConceptSeventyFour = lazyLoad(() => import('./ConceptSeventyFour'));
const ConceptSeventyFive = lazyLoad(() => import('./ConceptSeventyFive'));
const ConceptSeventySix = lazyLoad(() => import('./ConceptSeventySix'));
const ConceptSeventySeven = lazyLoad(() => import('./ConceptSeventySeven'));
const ConceptSeventyEight = lazyLoad(() => import('./ConceptSeventyEight'));
const ConceptSeventyNine = lazyLoad(() => import('./ConceptSeventyNine'));
const ConceptEighty = lazyLoad(() => import('./ConceptEighty'));
const ConceptEightyOne = lazyLoad(() => import('./ConceptEightyOne'));
const ConceptEightyTwo = lazyLoad(() => import('./ConceptEightyTwo'));
const ConceptEightyThree = lazyLoad(() => import('./ConceptEightyThree'));
const ConceptEightyFour = lazyLoad(() => import('./ConceptEightyFour'));
const ConceptEightyFive = lazyLoad(() => import('./ConceptEightyFive'));
const ConceptEightySix = lazyLoad(() => import('./ConceptEightySix'));
const ConceptEightySeven = lazyLoad(() => import('./ConceptEightySeven'));
const ConceptEightyEight = lazyLoad(() => import('./ConceptEightyEight'));
const ConceptEightyNine = lazyLoad(() => import('./ConceptEightyNine'));
const ConceptNinety = lazyLoad(() => import('./ConceptNinety'));
const ConceptNinetyOne = lazyLoad(() => import('./ConceptNinetyOne'));
const ConceptNinetyTwo = lazyLoad(() => import('./ConceptNinetyTwo'));
const ConceptNinetyThree = lazyLoad(() => import('./ConceptNinetyThree'));
const ConceptNinetyFour = lazyLoad(() => import('./ConceptNinetyFour'));
const ConceptNinetyFive = lazyLoad(() => import('./ConceptNinetyFive'));
const ConceptNinetySix = lazyLoad(() => import('./ConceptNinetySix'));
const ConceptNinetySeven = lazyLoad(() => import('./ConceptNinetySeven'));
const ConceptNinetyEight = lazyLoad(() => import('./ConceptNinetyEight'));
const ConceptNinetyNine = lazyLoad(() => import('./ConceptNinetyNine'));
const ConceptOneHundred = lazyLoad(() => import('./ConceptOneHundred'));
const DeclarationForm = lazyLoad(() => import('./components/DeclarationForm'));
const SanctuaryBlueprintForm = lazyLoad(() => import('./components/SanctuaryBlueprintForm'));
const GroundingProtocolForm = lazyLoad(() => import('./components/GroundingProtocolForm'));
const ClearingProtocolForm = lazyLoad(() => import('./components/ClearingProtocolForm'));
const LineageProtocolForm = lazyLoad(() => import('./components/LineageProtocolForm'));
const CosmicProtocolForm = lazyLoad(() => import('./components/CosmicProtocolForm'));
const IntegrationProtocolForm = lazyLoad(() => import('./components/IntegrationProtocolForm'));
const ShieldProtocolForm = lazyLoad(() => import('./components/ShieldProtocolForm'));
const CosmicGameProtocolForm = lazyLoad(() => import('./components/CosmicGameProtocolForm'));
const GaiaProtocolForm = lazyLoad(() => import('./components/GaiaProtocolForm'));
const CrystalMindProtocolForm = lazyLoad(() => import('./components/CrystalMindProtocolForm'));
const ScentProtocolForm = lazyLoad(() => import('./components/ScentProtocolForm'));
const EgoEndProtocolForm = lazyLoad(() => import('./components/EgoEndProtocolForm'));
const StarryStepProtocolForm = lazyLoad(() => import('./components/StarryStepProtocolForm'));
const JoyfulChildProtocolForm = lazyLoad(() => import('./components/JoyfulChildProtocolForm'));
const ElementPathProtocolForm = lazyLoad(() => import('./components/ElementPathProtocolForm'));
const LabyrinthLightProtocolForm = lazyLoad(() => import('./components/LabyrinthLightProtocolForm'));
const LivingPrayerProtocolForm = lazyLoad(() => import('./components/LivingPrayerProtocolForm'));
const ResonantAuraProtocolForm = lazyLoad(() => import('./components/ResonantAuraProtocolForm'));
const MirroredSoulProtocolForm = lazyLoad(() => import('./components/MirroredSoulProtocolForm'));
const SilverCordProtocolForm = lazyLoad(() => import('./components/SilverCordProtocolForm'));
const SacredSilverProtocolForm = lazyLoad(() => import('./components/SacredSilverProtocolForm'));
const InnerTempleProtocolForm = lazyLoad(() => import('./components/InnerTempleProtocolForm'));
const CrystalStreamProtocolForm = lazyLoad(() => import('./components/CrystalStreamProtocolForm'));
const CosmicHumilityProtocolForm = lazyLoad(() => import('./components/CosmicHumilityProtocolForm'));

const categories = [
  { id: 'All', name: 'All Infusions', icon: Sparkles },
  {
    id: 'Cat1',
    name: 'Acoustic Resonance & Vibrational Modulation',
    icon: Wind,
  },
  {
    id: 'Cat2',
    name: 'Somatic Architecture & Bioenergetics',
    icon: Activity,
  },
  {
    id: 'Cat3',
    name: 'Environmental & Planetary Resonance',
    icon: Globe,
  },
  {
    id: 'Cat4',
    name: 'Transpersonal Psychology & Archetypal Identity',
    icon: Brain,
  },
  { id: 'Cat5', name: 'Cognitive Restructuring & Emotional Alchemy', icon: Heart },
  {
    id: 'Cat6',
    name: 'Neurological Anchoring & Intentionality',
    icon: Search,
  },
  {
    id: 'Cat7',
    name: 'Ancestral Continuity & Metaphysical Play',
    icon: BookOpen,
  },
];

const directoryData = [
  // CATEGORY I: ACOUSTIC RESONANCE
  { id: 1, category: 'Cat1', title: 'The Om Shanti Paradigm', origin: 'Vedic Tradition (The Upanishads) and the Brahma Kumaris movement.', parallel: 'Autonomic nervous system regulation and cognitive dissonance reduction.', script: 'I am the Om Shanti knowledge infusion point of Universal Peace. I represent the intersection of ancient acoustic vibration and modern autonomic nervous system down-regulation.', learning: 'The phrase "Om Shanti" originates from the Shanti Mantras of the Upanishads, traditionally recited to calm the mind and environment. "Om" represents eternal conscious energy of the soul, while "Shanti" translates to unshakable deep peace. The mantra is chanted three times to remove obstacles across three realms: the physical world, divine realm, and internal body-mind. Psychologically, repetition functions as targeted intervention for the parasympathetic nervous system, disrupting rumination cycles and replacing stress responses with rhythmic cognitive anchors that lower cortisol and stabilize heart rate.', practice: 'Sit in comfortable position with erect spine. Inhale deeply, and upon slow exhalation, vocalize or mentally repeat "Om Shanti" three times. With first repetition, visualize relaxation of physical body. With second, visualize harmonization of environment. With third, visualize silencing of cognitive anxieties and absolute mental stillness.' },
  { id: 2, category: 'Cat1', title: 'Bhramari Pranayama (Vagus Nerve Chanting)', origin: 'Traditional Yogic Pranayama.', parallel: 'Vagus Nerve Stimulation (VNS) and Heart Rate Variability (HRV) modulation.', script: 'I am the Om Shanti knowledge infusion point of Bhramari Pranayama. I represent the intersection of ancient vocal rituals and parasympathetic nervous system activation.', learning: 'Bhramari Pranayama, the "humming bee breath," is ancient yogic practice involving prolonged exhalation while creating continuous low-frequency humming. The vocal cords and pharynx are deeply innervated by the vagus nerve, primary regulatory component of parasympathetic system. Mechanical vibration from sustained humming directly stimulates auricular and pharyngeal branches, signaling shift from sympathetic "fight-or-flight" to restorative "rest-and-digest" state. Clinical research shows reduced cortisol, lower blood pressure, and significantly increased Heart Rate Variability.', practice: 'Sit comfortably with upright posture. Close eyes and gently place index fingers over ear cartilage to block external noise. Inhale deeply through nose, expanding diaphragm. As you exhale, produce steady low-pitched "mmm" sound, maintaining until breath fully expelled. Focus on physical vibration resonating within skull and chest. Repeat for five minutes.' },
  { id: 3, category: 'Cat1', title: 'Water Charging and Intentionality', origin: 'Masaru Emoto\'s Water Consciousness Theory.', parallel: 'Mindfulness, Intentionality, and Psychosomatic Priming.', script: 'I am the Om Shanti knowledge infusion point of Water Charging. I represent the intersection of fluid resonance and the psychological anchoring of intentionality.', learning: 'Researcher Dr. Masaru Emoto hypothesized that human consciousness, words, and emotional intentions could physically alter water\'s molecular structure. Through high-speed photography and analysis, Emoto demonstrated water exposed to positive words formed beautiful symmetrical crystals, while negative stimuli formed disjointed structures. Beyond quantum implications, "charging" water serves as psychological and somatic tool. Given the human body is largely water, the ritual of speaking gratitude over a glass acts as psychosomatic primer, forcing practitioner to pause, generate positive emotional state, and internalize intention.', practice: 'Pour glass of clean filtered water. Hold with both hands to establish physical connection and direct specific positive emotion into it, such as gratitude for cellular healing. Visualize water absorbing this exact frequency. Drink slowly and deliberately, imagining positive intention permeating biology and hydrating cells with structured resonant energy.' },
  { id: 4, category: 'Cat1', title: 'Plant Communication and Vibrational Ecology', origin: 'Indigenous Animism and Traditional Ecological Knowledge.', parallel: 'Acoustic Biology, Biophilic Interaction, and Nurturing Psychology.', script: 'I am the Om Shanti knowledge infusion point of Plant Communication. I represent the intersection of ancient animism and the bio-acoustics of flora.', learning: 'The belief that plants possess consciousness and respond to human interaction has permeated ancient folklore and modern gardening communities. While plants lack central nervous system, acoustic biology reveals they are exquisitely sensitive to environment, constantly releasing and responding to chemical and vibrational information. Empirical data indicates plants respond favorably to low-level acoustic vibrations, specifically 115-250 Hertz range, stimulating chemical reactions, enhancing photosynthesis, improving communication, and bolstering infection resistance. Speaking kindly or playing melodic music subjects plants to beneficial micro-vibrations while offering immense psychological benefits to caretaker.', practice: 'Select houseplant or garden plot to tend. Dedicate three consecutive minutes daily to inspect leaves, adjust soil, and speak using low, gentle, encouraging vocal tone. Acknowledge that acoustic vibration of your voice physically interacts with plant\'s cellular structure, while simultaneously allowing act of caretaking to soothe and regulate your own nervous system.' },

  // CATEGORY II: SOMATIC ARCHITECTURE
  { id: 5, category: 'Cat2', title: 'The Chakra System and Nerve Plexuses', origin: 'Hindu and Buddhist Tantric Yoga, Theosophical Society.', parallel: 'Neuroanatomy, Endocrine Hubs, and Gap Junction Connections.', script: 'I am the Om Shanti knowledge infusion point of the Chakra System. I represent the intersection of subtle energy anatomy and primary neurological and endocrine hubs.', learning: 'The chakra system originated in India as core component of Tantric yoga traditions, utilizing "wheels of light" as focal points for higher consciousness states. Anatomically and scientifically, seven major chakras correlate directly to body\'s primary nerve plexuses and endocrine glands, functioning as critical hubs in central and autonomic nervous systems. Research indicates intercellular gap junction connections may underlay subjective experience of subtle energy systems, serving as physical conduits for radiant qualities historically described by yogis.', practice: 'Lie in supine position and visualize glowing wheel of energy at base of spine, corresponding to Muladhara root chakra and inferior hypogastric plexus. Breathe deeply into lower abdomen, intentionally relaxing pelvic floor. Hold awareness on anatomical hub, visualizing normalization of nerve impulses radiating outward, stabilizing foundational sense of physical and emotional security.' },
  { id: 6, category: 'Cat2', title: 'Orgone Energy and Somatic Armor', origin: 'Wilhelm Reich\'s Psychoanalytic Theory (1930s).', parallel: 'Biofield Science, Somatic Experiencing, and Psychoneuroimmunology.', script: 'I am the Om Shanti knowledge infusion point of Orgone Energy. I represent the intersection of primordial life-force theories and the physiological release of somaticized trauma.', learning: 'Wilhelm Reich, Austrian psychoanalyst who apprenticed under Sigmund Freud, proposed "orgone"—universal biological life energy permeating all living organisms. Through clinical work, Reich theorized psychological neuroses and trauma physically manifest as "somatic armor"—chronic involuntary muscular rigidity blocking healthy orgone flow, leading to physical pathologies. While his devices were criticized, Reich\'s foundational premise—that unresolved psychological trauma is stored as chronic physiological tension—is now cornerstone of modern somatic therapy, biofield science, and trauma-informed care.', practice: 'Lie flat on back in quiet space. Perform detailed progressive body scan, systematically identifying areas of chronic muscular tension, most commonly jaw, shoulders, diaphragm. Visualize dense tension as hardened physical "armor." Breathe deeply into specific areas, consciously instructing muscle fibers to soften, allowing trapped emotional energy to safely dissipate and biological current to flow unimpeded.' },
  { id: 7, category: 'Cat2', title: 'The Etheric Web and Auric Shielding', origin: 'Theosophical Esotericism (Arthur E. Powell, C.W. Leadbeater).', parallel: 'Psychological Boundaries, Plasma Sheaths, and Emotional Contagion Prevention.', script: 'I am the Om Shanti knowledge infusion point of the Etheric Web. I represent the intersection of esoteric auric anatomy and the psychological enforcement of emotional boundaries.', learning: 'In Theosophical Society esotericism, human aura is egg-shaped energy field comprising multiple interpenetrating layers, densest being etheric body. Outermost surface contains specialized "etheric web"—dense matrix of fine light-emanating cords. Much like Earth\'s magnetosphere deflects harmful solar flares, etheric web shields individual from psychic intrusions, negative thought forms, and emotional projections. From modern psychological perspective, concept mirrors necessity of maintaining robust psychological boundaries, likened to physical properties of plasma sheath described by physicist Irving Langmuir.', practice: 'Before entering highly stressful or emotionally volatile environment, stand completely still with closed eyes. Visualize brilliant densely woven web of luminescent energy surrounding physical body at distance of approximately two feet. Consciously intend for energetic sheath to be entirely semi-permeable—allowing love and necessary communication to pass through while firmly deflecting all hostility, panic, and unwanted emotional projections.' },
  { id: 8, category: 'Cat2', title: 'The Mudra System', origin: 'Indian Spiritual Traditions, Ayurvedic Medicine, and Christian Iconography.', parallel: 'Somatic Mapping, Hemispheric Synchronization, and Proprioception.', script: 'I am the Om Shanti knowledge infusion point of Mudras. I represent the intersection of somatic energy seals and bilateral neurological integration.', learning: 'Mudras are highly precise gestures of hands, face, or body utilized globally for over two millennia to evoke specific psychological, emotional, and spiritual attitudes. Sanskrit word translates to "gesture," "seal," or "attitude." Most universally recognized is Anjali Mudra—pressing palms together in front of heart center, denoting deep reverence and devotion. Scientifically, hands possess disproportionately large representation in brain\'s somatosensory and motor cortices. Pressing palms together requires symmetrical body engagement, directly facilitating robust neural communication across corpus callosum, balancing right and left hemispheres.', practice: 'Stand or sit with perfectly straight spine. Bring palms together firmly but gently at exact center of chest, allowing thumbs to rest lightly against sternum. Close eyes and take three slow extremely deep breaths, visualizing analytical left side and intuitive right side of brain synchronizing into state of flawless cooperative equilibrium.' },

  // CATEGORY III: ENVIRONMENTAL & PLANETARY
  { id: 9, category: 'Cat3', title: 'Earthing and Grounding Biophysics', origin: 'Primordial Human Lifestyle and Alternative Medicine.', parallel: 'Bioelectrical Homeostasis, Cortisol Normalization, and Immunomodulation.', script: 'I am the Om Shanti knowledge infusion point of Earthing. I represent the intersection of planetary electrodynamics and physiological inflammation reduction.', learning: 'For millions of years, humans lived in direct continuous physical contact with Earth, severed by modern lifestyle of insulated shoes and elevated synthetic spaces. Earth\'s surface maintains constant slight negative electrical charge, abundant in free electrons from solar and cosmic radiation. Earthing refers to therapeutic practice of actively reconnecting human body to natural electric field. Scientific research indicates this connection allows free electrons to flow into body, neutralizing free radicals. Peer-reviewed trials demonstrate grounding significantly reduces blood viscosity, speeds wound healing, reduces muscle soreness, normalizes cortisol rhythm, and shifts autonomic nervous system from sympathetic hyper-arousal to parasympathetic dominance.', practice: 'Remove shoes and socks. Walk barefoot on naturally conductive terrestrial surfaces—living grass, damp soil, sand, unpainted concrete—for minimum 15 continuous minutes. Combine physical practice with mindful rhythmic breathing, visualizing dense stabilizing negative charge of earth drawing out stress, anxiety, and deep-seated physical inflammation.' },
  { id: 10, category: 'Cat3', title: 'Lunar Chronobiology and Cyclical Alignment', origin: 'Ancient Timekeeping and Ritual Alignment.', parallel: 'Chronobiology, Suprachiasmatic Nuclei Regulation, and Neurotransmitter Cycles.', script: 'I am the Om Shanti knowledge infusion point of Lunar Chronobiology. I represent the intersection of celestial gravitation and cyclical human neurochemistry.', learning: 'Throughout antiquity, human activities—agriculture, harvesting, spiritual rituals, conflict—were strictly aligned with observable moon phases. Modern absolute reliance on artificial lighting and rigid digital timekeeping violently disrupted this alignment. Chronobiology studies how biological rhythms governed by suprachiasmatic nuclei within hypothalamus respond to light-dark cycles and gravitational shifts. Emerging research suggests human neurotransmitter dominance fluctuates in tandem with 29-day circalunar cycle, fundamentally shifting cognitive and emotional baselines week by week. Aligning habits with cyclical neurochemical ebbs and flows optimizes productivity, emotional resilience, and deepens spiritual connection.', practice: 'Track current moon phase using calendar. During New Moon, write down highly complex intentions requiring significant cognitive energy (Acetylcholine surge). During Full Moon, prioritize social connection, celebration, gratitude practices (Dopamine peak). During Waning Moon, purposefully engage in decluttering, shadow work, deep analytical tasks (Norepinephrine).' },
  { id: 11, category: 'Cat3', title: 'Labyrinth Walking', origin: 'Prehistoric Traditions and Medieval Cathedral Architecture.', parallel: 'Walking Meditation, Prefrontal Cortex Engagement, and Stress Reduction.', script: 'I am the Om Shanti knowledge infusion point of the Labyrinth. I represent the intersection of sacred architecture and moving somatic meditation.', learning: 'Unlike conventional maze designed as puzzle with multiple choices and dead ends, labyrinth features unicursal continuous path winding steadily to center and back. Historically utilized heavily in medieval cathedrals as guided contemplation tool, labyrinth walking has seen resurgence in modern healthcare and corporate environments. Psychologically, following predefined visually winding path acts as highly effective form of walking meditation, completely relieving prefrontal cortex from heavy cognitive burden of decision-making and spatial navigation, allowing mind to naturally enter deep mindfulness. Research shows labyrinth walking induces measurable physiological relaxation response, decreasing blood pressure, reducing negative psychological states, fostering profound sense of transcendence and joy.', practice: 'Locate local physical labyrinth or print paper finger labyrinth. Set clear intention or hold specific unresolved question before crossing threshold. Walk or trace path at remarkably slow deliberate pace, matching breath rhythm to movements. Pause completely at center to receive internal insights, then walk path outward with dedicated sense of integration and gratitude.' },
  { id: 12, category: 'Cat3', title: 'Biophilia and Animal Kinship', origin: 'Evolutionary Biology (Edward O. Wilson, Stephen Kellert).', parallel: 'Emotional Resilience, Attention Restoration Theory, and Neurodevelopment.', script: 'I am the Om Shanti knowledge infusion point of Biophilia. I represent the intersection of evolutionary survival and the innate human psychological need to affiliate with the natural world.', learning: 'Biophilia hypothesis, introduced by Harvard biologist E.O. Wilson in 1984, posits humans possess genetically ingrained fundamental biological need to connect with nature and other living organisms. Because human brain evolved entirely in company of wild flora and fauna, psychological, emotional, and spiritual well-being remains intimately tied to environmental interaction. Severe deprivation in modern technology-driven urban settings directly contributes to heightened stress, psychological dissociation, and loss of environmental stewardship. Conversely, direct nature exposure, deep animal kinship, and biophilic design have been clinically proven to reduce anxiety, enhance memory, lower blood pressure, and mitigate PTSD symptoms.', practice: 'Spend twenty uninterrupted minutes in natural setting—local park, dense forest, community garden—strictly without technological distractions. Consciously observe micro-movements of animals or insects, intricate texture of leaves, ambient sounds of environment. Acknowledge yourself not as separate dominant observer, but as deeply integrated dependent component of living ecological matrix.' },

  // CATEGORY IV: TRANSPERSONAL PSYCHOLOGY
  { id: 13, category: 'Cat4', title: 'Transpersonal Peak Experiences', origin: 'Humanistic and Transpersonal Psychology (Abraham Maslow, Stanislav Grof).', parallel: 'Self-Actualization, Unitive Consciousness, and Hypofrontality.', script: 'I am the Om Shanti knowledge infusion point of Transpersonal Peak Experiences. I represent the intersection of self-actualization and the neurobiology of absolute awe.', learning: 'Abraham Maslow defined peak experiences as rare deeply moving moments of profound joy, oceanic interconnectedness, and ultimate self-actualization. These elevated states characterized by sense of unity of self, timelessness, purposeless creativity, complete lack of inhibition, total merging of individual ego with surrounding environment. Historically categorized under religious mysticism—satori, samadhi, cosmic consciousness. Transpersonal psychology, pioneered by Maslow and furthered by Stanislav Grof and Ken Wilber, recognizes these moments as absolute highest potential of human cognitive and emotional development. During peak experience, brain undergoes transient hypofrontality—temporary dampening of prefrontal cortex—dissolving strict ego boundaries and facilitating profound life-altering connection to greater universe.', practice: 'Identify specific environment or creative activity naturally inducing sense of awe or "flow" for you. Engage with sole unmotivated intention of simply being present. When rigid feeling of separation dissolves, consciously anchor emotion by observing physical sensations of expansion in chest and profound stillness in mind.' },
  { id: 14, category: 'Cat4', title: 'Starseed Mythology and Narrative Identity', origin: 'New Age Movement, Theosophy (Emmanuel Swedenborg), and Ufology (Brad Steiger).', parallel: 'Narrative Identity Construction, Source Monitoring Error, and Psychological Milestones.', script: 'I am the Om Shanti knowledge infusion point of the Starseed Archetype. I represent the intersection of cosmic origin mythology and the psychological search for profound belonging and purpose.', learning: '"Starseeds" or "Star People" represent prominent belief system in New Age milieu that certain individuals possess souls originating from extraterrestrial star systems and have intentionally incarnated on Earth to assist human spiritual evolution. Term popularized by Brad Steiger in 1976 book "Gods of Aquarius," with deep conceptual roots tracing to 18th-century mystics and Theosophical doctrines. Psychologically, identifying as Starseed serves as incredibly powerful narrative identity framework for individuals with high emotional sensitivity, chronic alienation from mainstream society, or heavy transgenerational trauma. While clinical perspectives sometimes attribute extreme literal interpretations to "source monitoring errors," archetype offers highly functional empowering developmental lens, allowing individuals to reframe painful feelings of isolation into empowering proactive mission.', practice: 'If feeling alienated or overly sensitive to world\'s harshness, utilize Starseed concept as deeply empowering metaphor rather than strict literal origin. Ask yourself daily: "If I were placed here specifically to bring unique healing light to this exact environment, what would my immediate localized mission be today?" Focus sense of "otherness" entirely into act of compassionate service.' },
  { id: 15, category: 'Cat4', title: 'Lightworkers and Shadow Integration', origin: 'New Age Movement and Modern Witchcraft (Christopher Penczak).', parallel: 'Jungian Projection, Altruism, and Cognitive Reintegration.', script: 'I am the Om Shanti knowledge infusion point of the Lightworker. I represent the intersection of spiritual service and the profound psychological reintegration of the shadow self.', learning: '"Lightworker" is modern spiritual term designating individual who feels deep soul-level calling to bring healing, peace, understanding to world, deliberately choosing Source over fear and ego. Defining characteristics include deep empathy, desire to raise global vibration, commitment to processing trauma. Crucially, true Lightwork inextricably linked to Carl Jung\'s concept of Shadow Work. Jung characterized shadow as blind spot of psyche—unconscious personality aspects ego rejects and projects. While superficial Lightwork avoids dark, true psychological healing requires acknowledging disowned and rejected aspects of ourselves. Bringing light into shadow to heal psyche is literal definition of Lightworking; eliminates cognitive distortions causing us to vilify others, fostering absolute authenticity and universal compassion.', practice: 'Identify person or societal group triggering disproportionately strong emotional reaction of anger or judgment. Write down exact traits you despise in them. Reflect deeply on how these exact traits exist within you, perhaps in suppressed subtle or heavily disguised form. Acknowledge this shared human frailty without self-condemnation, shining light of awareness onto your own shadow.' },
  { id: 16, category: 'Cat4', title: 'The Akashic Records', origin: 'Theosophy (Alfred Percy Sinnett, Helena Blavatsky) and Eastern Esotericism.', parallel: 'Narrative Therapy, Transpersonal Memory, and Quantum Field Theory.', script: 'I am the Om Shanti knowledge infusion point of the Akashic Records. I represent the intersection of esoteric cosmic memory and clinical narrative identity restructuring.', learning: 'Akashic Records conceptualized as vast universal energetic database containing experiential history, thoughts, and actions of every soul across time—past, present, future. Popularized in West by Theosophists Alfred Percy Sinnett in 1883, concept posits past lives and deeply embedded karmic patterns recorded in subtle etheric field, accessible through altered states of consciousness. From modern psychological perspective, accessing Akashic Records closely parallels highly effective mechanisms of Narrative Therapy and Jungian deep active imagination. When individuals undergo sessions to "read" records, they engage with unconscious mind through vivid symbolic imagery, allowing externalization, understanding, and reframing of deeply embedded psychological trauma, bypassing clinical defenses of ego and permitting rapid resolution of recurring life patterns.', practice: 'Enter deep meditative state and vividly visualize vast luminous infinitely expanding library. Formulate highly specific question regarding recurring frustrating challenge in your life. Imagine locating book with your name, opening it, and allowing very first image, word, or emotion arising to enter consciousness without logical filtering. Journal insights as metaphorical narrative to guide waking decisions.' },
  { id: 17, category: 'Cat4', title: 'Synchronicity and Acausal Connection', origin: 'Analytical Psychology (Carl Jung) and Eastern Philosophy (I Ching).', parallel: 'Meaning-Making, Therapeutic Narrative, and Pattern Recognition.', script: 'I am the Om Shanti knowledge infusion point of Synchronicity. I represent the intersection of seemingly random cosmic coincidence and profound psychological meaning-making.', learning: 'Synchronicity is concept introduced by Swiss psychiatrist Carl Jung to describe events coinciding in time and appearing incredibly meaningfully related, yet completely lacking discoverable linear causal connection. Jung developed theory as hypothetical noncausal principle, heavily influenced by Eastern philosophies like I Ching viewing coincidences as reliable world basis, contrasting sharply with Western strict causality prejudice. While skeptics argue finding meaning in coincidences perfectly explainable by brain\'s hyper-active pattern-seeking and availability heuristic, transpersonal psychologists utilize synchronicity as vital therapeutic tool. In clinical setting, recognizing and interpreting synchronistic event brings deeply unconscious material to conscious mind attention, weaving random life events into subjective empowering narrative significantly strengthening therapeutic relationship and accelerating individuation.', practice: 'Over next week, maintain small journal dedicated strictly to "coincidences." Whenever two seemingly unrelated events occur carrying strong emotional resonance, record them immediately. Rather than dismissing or proving magical, ask yourself: "What specific psychological insight or hidden desire is this coincidence forcing me to look at right now?"' },

  // CATEGORY V: COGNITIVE RESTRUCTURING
  { id: 18, category: 'Cat5', title: 'Radical Acceptance', origin: 'Buddhist Philosophy (Dukkha) and Dialectical Behavior Therapy (Dr. Marsha Linehan, Dr. Tara Brach).', parallel: 'Distress Tolerance, Cognitive Reframing, and Mindfulness.', script: 'I am the Om Shanti knowledge infusion point of Radical Acceptance. I represent the intersection of Buddhist liberation from suffering and clinical distress tolerance.', learning: 'Radical Acceptance has deep historical roots in Buddhist concept of understanding suffering (Dukkha) reality without futile resistance. Brilliantly operationalized in West by psychologist Dr. Marsha Linehan as core DBT component, initially designed for treating severe borderline personality disorder and suicidal ideation. Later, Dr. Tara Brach expanded concept into broader spiritual sphere, emphasizing loving-kindness and self-compassion. Fundamental premise: immense suffering occurs not merely from painful life events, but from relentless cognitive resistance—the "shoulds," "ought-tos," "musts" denying stark reality. Paradoxically, completely accepting terrible reality is only mechanism reducing secondary anxiety and facilitating true emotional freedom and problem-solving.', practice: 'When faced with unchangeable deeply frustrating situation, notice exact physical tension of resistance in your body. Consciously relax hands, un-clench jaw, drop shoulders. Repeat phrase out loud: "I completely and radically accept that this is the absolute reality of the present moment." Notice how cessation of mental resistance immediately lowers emotional distress intensity.' },
  { id: 19, category: 'Cat5', title: 'Radical and Quantum Forgiveness', origin: 'A Course in Miracles (Helen Schucman, Bill Thetford) and Colin Tipping\'s Methodology.', parallel: 'Cognitive Restructuring, Projection Reversal, and Pure Non-Duality.', script: 'I am the Om Shanti knowledge infusion point of Radical Forgiveness. I represent the intersection of non-dualistic metaphysics and the complete instantaneous dissolution of victimhood.', learning: 'Traditional forgiveness often operates from toxic paradigm "forgiveness-to-destroy"—egoic stance where individual firmly believes genuine irreversible harm committed, but decides to pardon offender, implicitly placing themselves above and maintaining moral superiority. Radical and Quantum Forgiveness—derived from A Course in Miracles scribed by Columbia University psychologists Helen Schucman and Bill Thetford—operate on metaphysical pure non-duality premise. Framework posits physical world largely projection of mind; therefore perceived harm never actually altered eternal divine innocence of soul. True forgiveness merely recognizes illusion of offense. By trusting inner teacher of kindness, individual completely withdraws projections, realizing inherent oneness means no "other" to forgive, only self.', practice: 'When holding deep grievance, instead of graciously pardoning, radically reframe narrative. State internally: "I am entirely willing to see this situation differently. I recognize my pain comes from my own thoughts and projections about the event, not the event itself." Release need to be victim and consciously acknowledge shared innocence beneath human error.' },
  { id: 20, category: 'Cat5', title: 'Laughter Therapy and Joy Regulation', origin: 'Traditional Healing and Modern Lifestyle Medicine.', parallel: 'Neuropeptide Release, Cortisol Reduction, and Pain Modulation.', script: 'I am the Om Shanti knowledge infusion point of Laughter Therapy. I represent the intersection of spontaneous joy and the rapid neurochemical regulation of acute stress.', learning: 'While joy often viewed as spontaneous circumstance byproduct, laughter therapy treats humor as active deliberate intervention yielding profound physiological and psychological benefits. Neurobiologically, single spontaneous or simulated laughter session induces dramatic cortisol reduction (up to 36.7%), drastically lessening pro-stress bloodstream factors. Rollicking laugh forces oxygen-rich air intake, stimulating heart and lungs, triggering brain to release flood of endorphins and positive neuropeptides. Process fires up then rapidly cools down stress response, resulting in lowered blood pressure, muscle relaxation, production of body\'s natural painkillers. Furthermore, laughter significantly enhances social bonding, emotional regulation, and resilience, making it incredibly powerful coping mechanism.', practice: 'Set timer for two minutes in private space. Begin by forcing gentle smile, then chuckle, deliberately escalate into full deep belly laughter. Even if entirely artificial at first, brain cannot distinguish simulated vs. spontaneous laughter in neuropeptide release terms. Observe immediate physical lightness and tension relief in chest and shoulders afterward.' },
  { id: 21, category: 'Cat5', title: 'Ceremonial Cacao and Heart Coherence', origin: 'Ancient Mesoamerican Civilizations (Maya, Aztec).', parallel: 'Psychopharmacology (Theobromine), Empathy Enhancement, and Community Cohesion.', script: 'I am the Om Shanti knowledge infusion point of Ceremonial Cacao. I represent the intersection of indigenous plant medicine and biochemical heart-opening empathy.', learning: 'Cultivated over five thousand years with Montegrande Ecuador origins, cacao was revered by Maya and Aztecs as "food of the gods." Utilized as valuable currency, medicine, sacred bridge to divine during community rituals involving music, chanting, prayer. Today, ceremonial-grade cacao utilized heavily as therapeutic deep emotional healing tool. Biologically, raw unadulterated cacao is pharmacological powerhouse—most notably theobromine. Unlike caffeine spiking nervous system, theobromine is powerful cardiovascular stimulant gently dilating blood vessels and significantly increasing blood flow specifically to heart. This literal physiological cardiovascular opening directly correlates to psychological sense of warmth, heightened empathy, emotional vulnerability, making it exceptional catalyst for releasing interpersonal trauma and fostering deep connection.', practice: 'Source high-quality ethically harvested ceremonial cacao. Prepare mindfully with warm water and spices, avoiding refined sugars. Before consuming, hold warm cup firmly against chest. Set clear intention related to opening your heart or releasing specific emotional blockages. Drink slowly, focusing entirely on sensation of physical warmth spreading through cardiovascular system and softening of emotional defenses.' },

  // CATEGORY VI: NEUROLOGICAL ANCHORING
  { id: 22, category: 'Cat6', title: 'The Reticular Activating System (RAS) and Manifestation', origin: 'Hermetic Philosophy and New Age "Law of Attraction".', parallel: 'Pedunculopontine Neurons, Selective Attention, and Cognitive Filtering.', script: 'I am the Om Shanti knowledge infusion point of the Reticular Activating System. I represent the intersection of mystical manifestation and the neuroscience of selective cognitive filtering.', learning: 'Concept of "manifestation" or "Law of Attraction"—thoughts and spoken words shape physical reality—has massive resurgence in spiritual communities. While often described as magic or cosmic influence, phenomenon entirely grounded in brain\'s neuroanatomy, specifically RAS. RAS is complex neuron network in brainstem acting as information gatekeeper. At any moment, brain bombarded with millions sensory data bits. RAS filters irrelevant noise, allowing only information matching deeply held beliefs, biological needs, or current focus to reach conscious awareness. Therefore, if individual rigidly believes they will fail, RAS filters out opportunities and highlights failure evidence. Conversely, setting clear positive intention programs RAS to suddenly notice resources, connections, paths always present but previously ignored.', practice: 'Identify highly specific goal to achieve. Write in present tense as if already happened. Every morning for one week, read aloud, feeling emotion of completion. You\'re not magically altering universe; strictly programming RAS. Throughout day, actively scan environment noticing how many new relevant details brain suddenly allowing into conscious awareness.' },
  { id: 23, category: 'Cat6', title: 'Crystal Lore and Sacred Geometry', origin: 'Ancient Egyptian Amulets, Middle Age Medical Lore, and Classical Platonism.', parallel: 'The Placebo Effect, Classical Conditioning, and Visual Pattern Recognition.', script: 'I am the Om Shanti knowledge infusion point of Crystalline and Geometric resonance. I represent the intersection of ancient talismanic lore and the neuroscience of symbolic anchoring.', learning: 'Crystal healing utilizes semiprecious stones—rose quartz historically tied to Isis and Aphrodite for love, pink tourmaline for emotional recovery—to purportedly influence human aura and clear energy blockages. Sacred Geometry employs complex symmetrical patterns (Seed of Life, Metatron\'s Cube, Vesica Piscis) representing fundamental harmonious universe structures. While rigorous clinical trials don\'t support claim that crystals possess inherent thermodynamic therapeutic value or emit measurable healing energy, science fiercely validates mechanism behind widespread success: placebo effect and profound psychological conditioning. Placebo effect not trick; reliable measurable demonstration of mind-body connection where belief, expectation, ritual create literal neurochemical changes. When using crystal or gazing at geometric mandala, establishing tangible physical anchor—brain\'s visual and pattern-recognition centers highly stimulated, balancing analytical left brain with creative right brain.', practice: 'Select specific geometric pattern or stone representing current goal. Hold object or gaze intently at pattern for five minutes daily while visualizing your goal. Recognize intellectually that object is powerful psychological tool—hard drive storing your intention—teaching brain to consistently seek out related positive outcomes in environment.' },
  { id: 24, category: 'Cat6', title: 'Aromatherapy and Olfactory Anchoring', origin: 'Ancient Egyptian, Ayurvedic, and Traditional Eastern Rituals.', parallel: 'Limbic System Activation and Olfactory Bulb Routing.', script: 'I am the Om Shanti knowledge infusion point of Aromatherapy. I represent the intersection of botanical essences and the instantaneous regulation of the limbic system.', learning: 'For centuries, aromatic resins and essential oils—frankincense, sandalwood, bergamot, lavender—used globally for spiritual purification, emotional healing, mind-body balance restoration. Human sense of smell structurally unique among senses; entirely bypasses thalamus (brain\'s central relay station) and travels directly via olfactory bulb to amygdala and hippocampus—brain regions strictly responsible for emotion, behavior, memory processing. Because of this direct neurological "superhighway," inhaling specific volatile organic compounds triggers nearly instantaneous physiological response. Clinical neuroimaging shows scents like lavender and bergamot actively dampen body\'s fight-or-flight reaction, activate parasympathetic rest-and-digest pathways, serve as profound trauma-informed gateways for accessing unconscious memory safely in cognitive behavioral therapy settings.', practice: 'Identify pure essential oil naturally evoking feeling of profound safety or calm for you. Inhale scent deeply while taking slow diaphragmatic breaths during complete relaxation state. Pair this scent consistently with your daily meditation practice to establish rapid olfactory trigger your brain immediately associates with peace, then deployable during high-stress situations.' },
  { id: 25, category: 'Cat6', title: 'Repetitive Prayer and Chanting', origin: 'Global Religious Traditions (e.g., The Jesus Prayer, Buddhist Chanting, Rosaries).', parallel: 'Late-Stage Emotion Regulation, Stress Reduction, and Late Positive Potential.', script: 'I am the Om Shanti knowledge infusion point of Repetitive Prayer. I represent the intersection of religious devotion and the neurocognitive regulation of fear.', learning: 'Use of repetitive rhythmic prayer—Jesus Prayer in Christianity, Amitābha chanting in Buddhism, rosaries—is universally pervasive ritual across human cultures. While adherents engage to signal commitment to God or seek solace, psychological and neural bases operate incredibly effectively at individual stress regulation level. Research indicates repetitive religious chanting doesn\'t necessarily stop brain from perceiving negative or fear-provoking stimuli initially, but massively modulates late-stage emotional and cognitive processing (measured as Late Positive Potential). Repetitive action and focused devotion significantly buffer brain\'s reactivity to stress, fostering deep calm, lowering anxiety, establishing cross-cultural universality in emotional regulation.', practice: 'Choose short meaningful phrase or prayer resonating with personal belief system. In quiet space, synchronize repetition with deep slow breathing. If mind wanders to stressor, gently guide focus back to rhythm of words, allowing repetitive cognitive loop to completely override physiological stress response.' },
  { id: 26, category: 'Cat6', title: 'Altruism and Karmic Cleansing', origin: 'Eastern Concepts of Karma and Merit.', parallel: 'Evolutionary Reciprocal Altruism and Neurochemical Reward Systems.', script: 'I am the Om Shanti knowledge infusion point of Altruism. I represent the intersection of karmic merit and the neurobiology of the "warm glow".', learning: 'Spiritual traditions long emphasize selfless service and charity as vital means clearing karmic debt and elevating consciousness. Initially, Charles Darwin struggled explaining altruism, as self-sacrifice seemed contradictory to basic evolutionary survival and gene propagation. However, modern evolutionary biology understands "reciprocal altruism" as highly adaptive trait ensuring group survival and regulating social trust, sympathy, guilt. Psychologically and neurologically, helping others freely, without reciprocity expectation, triggers release of profound neurochemical cocktail in giver\'s brain: oxytocin, dopamine, serotonin. This "warm glow effect" or "helper\'s high" lowers stress, builds immense emotional resilience, increases life satisfaction, promotes physical longevity. Therefore, spiritual "karmic cleansing" physically enacted in body; altruistic acts biologically repair nervous system and fortify evolutionary social matrix.', practice: 'Perform one anonymous act of kindness today that cannot possibly be traced back to you and offers absolutely no possibility of external reward or recognition. Observe internal neurochemical shift—sudden influx of warmth, satisfaction, peace—and recognize it as your biology deeply rewarding you for strengthening collective human fabric.' },

  // CATEGORY VII: ANCESTRAL CONTINUITY
  { id: 27, category: 'Cat7', title: 'Epigenetics and Ancestral Healing', origin: 'Indigenous and Shamanic Ancestral Lineage Concepts.', parallel: 'Transgenerational Trauma, DNA Methylation, and Neuroplasticity.', script: 'I am the Om Shanti knowledge infusion point of Ancestral Healing. I represent the intersection of lineage reverence and the epigenetic reversal of inherited trauma.', learning: 'Many ancient traditions hold that ancestor sins, traumas, or curses carried forward, requiring spiritual intervention healing family line. Modern epigenetic science remarkably validates concept: trauma doesn\'t end when event over; fundamentally alters how genes expressed without changing underlying DNA sequence. Through mechanisms like DNA methylation and histone modifications, intense stress from war, famine, or abuse alters stress-related genes (glucocorticoid receptor NR3C1), inherited by subsequent generations. Womb acts as literal biological and energetic bridge, where three generations simultaneously connected, sharing cellular imprints. This results in offspring showing increased vulnerability to anxiety, depression, impaired cognition. However, epigenetic marks not permanent. "Ancestral healing" actualized through somatic work, mindfulness, enriched environments, nutritional support, down-regulating inflammatory genes and restoring balanced gene expression across lineage.', practice: 'Sit quietly and reflect on specific negative emotional pattern (scarcity mindset, hyper-vigilance) sharing with parents or grandparents. Place hand over womb or lower abdomen. State aloud: "I acknowledge the survival adaptations of my ancestors, but this environment is now safe." Engage in regulating activity like deep breathing or yoga, actively visualizing rewriting of your cellular response to stress.' },
  { id: 28, category: 'Cat7', title: 'Lila (Divine Play)', origin: 'Hindu Philosophy (Non-dualism and Vaishnavism).', parallel: 'Play Therapy, Cognitive Flexibility, and De-identification.', script: 'I am the Om Shanti knowledge infusion point of Lila. I represent the intersection of cosmic divine play and the psychological necessity of cognitive flexibility.', learning: 'In Hindu philosophy, Lila (Sanskrit root "lal") translates to "divine play" or "sport". Concept that universe creation born not from necessity or lack, but spontaneous joyful purposeful expression of divine absolute (Brahman). Within framework, world of maya (illusion) continuously changing because divine Lila rhythmic dynamic performance where supreme reality "plays as" manifold diversity of life for sheer enjoyment. When individuals forget this and take material world too seriously, they fall under maya spell and suffer. Psychologically, integrating Lila concept akin to mechanisms utilized in play therapy and cognitive de-identification. Recognizing life as "play" allows individuals to detach from rigid ego-identities and view challenges not as dire threats, but invitations to learn, adapt, creatively engage with reality. Fosters immense cognitive flexibility, reducing anxiety by reframing existence from grueling obligation into ongoing joyful exploration.', practice: 'Identify current situation taking extremely seriously, causing significant stress. For ten minutes, completely reframe perspective: imagine you\'re eternal consciousness merely playing "character" in vast incredibly detailed simulation or theatrical play. Ask yourself: "How would this character creatively and playfully solve this plot twist?" Notice how this slight cognitive detachment drastically reduces problem\'s heaviness.' },
];

export default function App() {
  const MODULE_1_STEP_KEY = 'omShantiModule1Step';
  const MODULE_2_STEP_KEY = 'omShantiModule2Step';
  const MODULE_3_STEP_KEY = 'omShantiModule3Step';
  const MODULE_4_STEP_KEY = 'omShantiModule4Step';
  const MODULE_5_STEP_KEY = 'omShantiModule5Step';
  const MODULE_6_STEP_KEY = 'omShantiModule6Step';
  const MODULE_7_STEP_KEY = 'omShantiModule7Step';
  const MODULE_8_STEP_KEY = 'omShantiModule8Step';
  const MODULE_9_STEP_KEY = 'omShantiModule9Step';
  const MODULE_10_STEP_KEY = 'omShantiModule10Step';
  const MODULE_11_STEP_KEY = 'omShantiModule11Step';
  const MODULE_12_STEP_KEY = 'omShantiModule12Step';
  const MODULE_13_STEP_KEY = 'omShantiModule13Step';
  const MODULE_14_STEP_KEY = 'omShantiModule14Step';
  const MODULE_15_STEP_KEY = 'omShantiModule15Step';
  const MODULE_16_STEP_KEY = 'omShantiModule16Step';
  const MODULE_17_STEP_KEY = 'omShantiModule17Step';
  const MODULE_18_STEP_KEY = 'omShantiModule18Step';
  const MODULE_19_STEP_KEY = 'omShantiModule19Step';
  const MODULE_20_STEP_KEY = 'omShantiModule20Step';
  const MODULE_21_STEP_KEY = 'omShantiModule21Step';
  const MODULE_22_STEP_KEY = 'omShantiModule22Step';
  const MODULE_23_STEP_KEY = 'omShantiModule23Step';
  const MODULE_24_STEP_KEY = 'omShantiModule24Step';
  const MODULE_25_STEP_KEY = 'omShantiModule25Step';
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeInfusion, setActiveInfusion] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [hasMembership, setHasMembership] = useState(false);
  const [module1Step, setModule1Step] = useState(() => {
    if (localStorage.getItem('om_shanti_module_1_complete') === 'true') {
      return 'complete';
    }

    return sessionStorage.getItem(MODULE_1_STEP_KEY) || 'concept-1';
  });
  const [module2Step, setModule2Step] = useState(() => {
    if (localStorage.getItem('om_shanti_module_2_complete') === 'true') {
      return 'complete';
    }

    return sessionStorage.getItem(MODULE_2_STEP_KEY) || 'concept-5';
  });
  const [module3Step, setModule3Step] = useState(() => {
    if (localStorage.getItem('om_shanti_module_3_complete') === 'true') {
      return 'complete';
    }

    return sessionStorage.getItem(MODULE_3_STEP_KEY) || 'concept-9';
  });
  const [module4Step, setModule4Step] = useState(() => {
    if (localStorage.getItem('om_shanti_module_4_complete') === 'true') {
      return 'complete';
    }

    return sessionStorage.getItem(MODULE_4_STEP_KEY) || 'concept-13';
  });
  const [module5Step, setModule5Step] = useState(() => {
    if (localStorage.getItem('om_shanti_module_5_complete') === 'true') {
      return 'complete';
    }

    return sessionStorage.getItem(MODULE_5_STEP_KEY) || 'concept-17';
  });
  const [module6Step, setModule6Step] = useState(() => {
    if (localStorage.getItem('om_shanti_module_6_complete') === 'true') {
      return 'complete';
    }

    return sessionStorage.getItem(MODULE_6_STEP_KEY) || 'concept-21';
  });
  const [module7Step, setModule7Step] = useState(() => {
    if (localStorage.getItem('om_shanti_module_7_complete') === 'true') {
      return 'complete';
    }

    return sessionStorage.getItem(MODULE_7_STEP_KEY) || 'concept-25';
  });
  const [module8Step, setModule8Step] = useState(() => {
    if (localStorage.getItem('om_shanti_module_8_complete') === 'true') {
      return 'complete';
    }

    return sessionStorage.getItem(MODULE_8_STEP_KEY) || 'concept-29';
  });
  const [module9Step, setModule9Step] = useState(() => {
    if (localStorage.getItem('om_shanti_module_9_complete') === 'true') {
      return 'complete';
    }

    return sessionStorage.getItem(MODULE_9_STEP_KEY) || 'concept-33';
  });
  const [module10Step, setModule10Step] = useState(() => {
    if (localStorage.getItem('om_shanti_module_10_complete') === 'true') {
      return 'complete';
    }

    return sessionStorage.getItem(MODULE_10_STEP_KEY) || 'concept-37';
  });
  const [module11Step, setModule11Step] = useState(() => {
    if (localStorage.getItem('om_shanti_module_11_complete') === 'true') {
      return 'complete';
    }

    return sessionStorage.getItem(MODULE_11_STEP_KEY) || 'concept-41';
  });
  const [module12Step, setModule12Step] = useState(() => {
    if (localStorage.getItem('om_shanti_module_12_complete') === 'true') {
      return 'complete';
    }

    return sessionStorage.getItem(MODULE_12_STEP_KEY) || 'concept-45';
  });
  const [module13Step, setModule13Step] = useState(() => {
    if (localStorage.getItem('om_shanti_module_13_complete') === 'true') {
      return 'complete';
    }

    return sessionStorage.getItem(MODULE_13_STEP_KEY) || 'concept-49';
  });
  const [module14Step, setModule14Step] = useState(() => {
    if (localStorage.getItem('om_shanti_module_14_complete') === 'true') {
      return 'complete';
    }

    return sessionStorage.getItem(MODULE_14_STEP_KEY) || 'concept-53';
  });
  const [module15Step, setModule15Step] = useState(() => {
    if (localStorage.getItem('om_shanti_module_15_complete') === 'true') {
      return 'complete';
    }

    return sessionStorage.getItem(MODULE_15_STEP_KEY) || 'concept-57';
  });
  const [module16Step, setModule16Step] = useState(() => {
    if (localStorage.getItem('om_shanti_module_16_complete') === 'true') {
      return 'complete';
    }

    return sessionStorage.getItem(MODULE_16_STEP_KEY) || 'concept-61';
  });
  const [module17Step, setModule17Step] = useState(() => {
    if (localStorage.getItem('om_shanti_module_17_complete') === 'true') {
      return 'complete';
    }

    return sessionStorage.getItem(MODULE_17_STEP_KEY) || 'concept-65';
  });
  const [module18Step, setModule18Step] = useState(() => {
    if (localStorage.getItem('om_shanti_module_18_complete') === 'true') {
      return 'complete';
    }

    return sessionStorage.getItem(MODULE_18_STEP_KEY) || 'concept-69';
  });
  const [module19Step, setModule19Step] = useState(() => {
    if (localStorage.getItem('om_shanti_module_19_complete') === 'true') {
      return 'complete';
    }

    return sessionStorage.getItem(MODULE_19_STEP_KEY) || 'concept-73';
  });
  const [module20Step, setModule20Step] = useState(() => {
    if (localStorage.getItem('om_shanti_module_20_complete') === 'true') {
      return 'complete';
    }

    return sessionStorage.getItem(MODULE_20_STEP_KEY) || 'concept-77';
  });
  const [module21Step, setModule21Step] = useState(() => {
    if (localStorage.getItem('om_shanti_module_21_complete') === 'true') {
      return 'complete';
    }

    return sessionStorage.getItem(MODULE_21_STEP_KEY) || 'concept-81';
  });
  const [module22Step, setModule22Step] = useState(() => {
    if (localStorage.getItem('om_shanti_module_22_complete') === 'true') {
      return 'complete';
    }

    return sessionStorage.getItem(MODULE_22_STEP_KEY) || 'concept-85';
  });
  const [module23Step, setModule23Step] = useState(() => {
    if (localStorage.getItem('om_shanti_module_23_complete') === 'true') {
      return 'complete';
    }

    return sessionStorage.getItem(MODULE_23_STEP_KEY) || 'concept-89';
  });
  const [module24Step, setModule24Step] = useState(() => {
    if (localStorage.getItem('om_shanti_module_24_complete') === 'true') {
      return 'complete';
    }

    return sessionStorage.getItem(MODULE_24_STEP_KEY) || 'concept-93';
  });
  const [module25Step, setModule25Step] = useState(() => {
    if (localStorage.getItem('om_shanti_module_25_complete') === 'true') {
      return 'complete';
    }

    return sessionStorage.getItem(MODULE_25_STEP_KEY) || 'concept-97';
  });

  useEffect(() => {
    const membership = localStorage.getItem('omShantiMembership');
    if (membership) {
      try {
        const data = JSON.parse(membership);
        if (data.status === 'completed') {
          setHasMembership(true);
        }
      } catch (e) {
        console.error('Error parsing membership data:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (module1Step === 'complete') {
      sessionStorage.removeItem(MODULE_1_STEP_KEY);
      return;
    }

    sessionStorage.setItem(MODULE_1_STEP_KEY, module1Step);
  }, [module1Step]);

  useEffect(() => {
    if (module2Step === 'complete') {
      sessionStorage.removeItem(MODULE_2_STEP_KEY);
      return;
    }

    sessionStorage.setItem(MODULE_2_STEP_KEY, module2Step);
  }, [module2Step]);

  useEffect(() => {
    if (module3Step === 'complete') {
      sessionStorage.removeItem(MODULE_3_STEP_KEY);
      return;
    }

    sessionStorage.setItem(MODULE_3_STEP_KEY, module3Step);
  }, [module3Step]);

  useEffect(() => {
    if (module4Step === 'complete') {
      sessionStorage.removeItem(MODULE_4_STEP_KEY);
      return;
    }

    sessionStorage.setItem(MODULE_4_STEP_KEY, module4Step);
  }, [module4Step]);

  useEffect(() => {
    if (module5Step === 'complete') {
      sessionStorage.removeItem(MODULE_5_STEP_KEY);
      return;
    }

    sessionStorage.setItem(MODULE_5_STEP_KEY, module5Step);
  }, [module5Step]);

  useEffect(() => {
    if (module6Step === 'complete') {
      sessionStorage.removeItem(MODULE_6_STEP_KEY);
      return;
    }

    sessionStorage.setItem(MODULE_6_STEP_KEY, module6Step);
  }, [module6Step]);

  useEffect(() => {
    if (module7Step === 'complete') {
      sessionStorage.removeItem(MODULE_7_STEP_KEY);
      return;
    }

    sessionStorage.setItem(MODULE_7_STEP_KEY, module7Step);
  }, [module7Step]);

  useEffect(() => {
    if (module8Step === 'complete') {
      sessionStorage.removeItem(MODULE_8_STEP_KEY);
      return;
    }

    sessionStorage.setItem(MODULE_8_STEP_KEY, module8Step);
  }, [module8Step]);

  useEffect(() => {
    if (module9Step === 'complete') {
      sessionStorage.removeItem(MODULE_9_STEP_KEY);
      return;
    }

    sessionStorage.setItem(MODULE_9_STEP_KEY, module9Step);
  }, [module9Step]);

  useEffect(() => {
    if (module10Step === 'complete') {
      sessionStorage.removeItem(MODULE_10_STEP_KEY);
      return;
    }

    sessionStorage.setItem(MODULE_10_STEP_KEY, module10Step);
  }, [module10Step]);

  useEffect(() => {
    if (module11Step === 'complete') {
      sessionStorage.removeItem(MODULE_11_STEP_KEY);
      return;
    }

    sessionStorage.setItem(MODULE_11_STEP_KEY, module11Step);
  }, [module11Step]);

  useEffect(() => {
    if (module12Step === 'complete') {
      sessionStorage.removeItem(MODULE_12_STEP_KEY);
      return;
    }

    sessionStorage.setItem(MODULE_12_STEP_KEY, module12Step);
  }, [module12Step]);

  useEffect(() => {
    if (module13Step === 'complete') {
      sessionStorage.removeItem(MODULE_13_STEP_KEY);
      return;
    }

    sessionStorage.setItem(MODULE_13_STEP_KEY, module13Step);
  }, [module13Step]);

  useEffect(() => {
    if (module14Step === 'complete') {
      sessionStorage.removeItem(MODULE_14_STEP_KEY);
      return;
    }

    sessionStorage.setItem(MODULE_14_STEP_KEY, module14Step);
  }, [module14Step]);

  useEffect(() => {
    if (module15Step === 'complete') {
      sessionStorage.removeItem(MODULE_15_STEP_KEY);
      return;
    }

    sessionStorage.setItem(MODULE_15_STEP_KEY, module15Step);
  }, [module15Step]);

  useEffect(() => {
    if (module16Step === 'complete') {
      sessionStorage.removeItem(MODULE_16_STEP_KEY);
      return;
    }

    sessionStorage.setItem(MODULE_16_STEP_KEY, module16Step);
  }, [module16Step]);

  useEffect(() => {
    if (module17Step === 'complete') {
      sessionStorage.removeItem(MODULE_17_STEP_KEY);
      return;
    }

    sessionStorage.setItem(MODULE_17_STEP_KEY, module17Step);
  }, [module17Step]);

  useEffect(() => {
    if (module18Step === 'complete') {
      sessionStorage.removeItem(MODULE_18_STEP_KEY);
      return;
    }

    sessionStorage.setItem(MODULE_18_STEP_KEY, module18Step);
  }, [module18Step]);

  useEffect(() => {
    if (module19Step === 'complete') {
      sessionStorage.removeItem(MODULE_19_STEP_KEY);
      return;
    }

    sessionStorage.setItem(MODULE_19_STEP_KEY, module19Step);
  }, [module19Step]);

  useEffect(() => {
    if (module20Step === 'complete') {
      sessionStorage.removeItem(MODULE_20_STEP_KEY);
      return;
    }

    sessionStorage.setItem(MODULE_20_STEP_KEY, module20Step);
  }, [module20Step]);

  useEffect(() => {
    if (module21Step === 'complete') {
      sessionStorage.removeItem(MODULE_21_STEP_KEY);
      return;
    }

    sessionStorage.setItem(MODULE_21_STEP_KEY, module21Step);
  }, [module21Step]);

  useEffect(() => {
    if (module22Step === 'complete') {
      sessionStorage.removeItem(MODULE_22_STEP_KEY);
      return;
    }

    sessionStorage.setItem(MODULE_22_STEP_KEY, module22Step);
  }, [module22Step]);

  useEffect(() => {
    if (module23Step === 'complete') {
      sessionStorage.removeItem(MODULE_23_STEP_KEY);
      return;
    }

    sessionStorage.setItem(MODULE_23_STEP_KEY, module23Step);
  }, [module23Step]);

  useEffect(() => {
    if (module24Step === 'complete') {
      sessionStorage.removeItem(MODULE_24_STEP_KEY);
      return;
    }

    sessionStorage.setItem(MODULE_24_STEP_KEY, module24Step);
  }, [module24Step]);

  useEffect(() => {
    if (module25Step === 'complete') {
      sessionStorage.removeItem(MODULE_25_STEP_KEY);
      return;
    }

    sessionStorage.setItem(MODULE_25_STEP_KEY, module25Step);
  }, [module25Step]);

  useEffect(() => {
    const handleDebugReset = (event) => {
      const isResetCombo = event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'r';
      if (!isResetCombo) {
        return;
      }

      event.preventDefault();
      const shouldReset = window.confirm(
        'Reset Module 1 progress and declaration for testing?'
      );
      if (!shouldReset) {
        return;
      }

      localStorage.removeItem('om_shanti_module_1_complete');
      localStorage.removeItem('om_shanti_declaration');
      localStorage.removeItem('om_shanti_module_2_complete');
      localStorage.removeItem('om_shanti_sanctuary_blueprint');
      localStorage.removeItem('om_shanti_module_3_complete');
      localStorage.removeItem('om_shanti_grounding_protocol');
      localStorage.removeItem('om_shanti_module_4_complete');
      localStorage.removeItem('om_shanti_clearing_protocol');
      localStorage.removeItem('om_shanti_module_5_complete');
      localStorage.removeItem('om_shanti_lineage_protocol');
      localStorage.removeItem('om_shanti_module_6_complete');
      localStorage.removeItem('om_shanti_cosmic_protocol');
      localStorage.removeItem('om_shanti_unplugged_protocol');
      localStorage.removeItem('om_shanti_module_7_complete');
      localStorage.removeItem('om_shanti_integration_protocol');
      localStorage.removeItem('om_shanti_water_altar_protocol');
      localStorage.removeItem('om_shanti_module_8_complete');
      localStorage.removeItem('om_shanti_shield_protocol');
      localStorage.removeItem('om_shanti_module_9_complete');
      localStorage.removeItem('om_shanti_cosmic_game_protocol');
      localStorage.removeItem('om_shanti_module_10_complete');
      localStorage.removeItem('om_shanti_gaia_protocol');
      localStorage.removeItem('om_shanti_module_11_complete');
      localStorage.removeItem('om_shanti_crystal_mind_protocol');
      localStorage.removeItem('om_shanti_module_12_complete');
      localStorage.removeItem('om_shanti_scent_protocol');
      localStorage.removeItem('om_shanti_module_13_complete');
      localStorage.removeItem('om_shanti_ego_end_protocol');
      localStorage.removeItem('om_shanti_module_14_complete');
      localStorage.removeItem('om_shanti_starry_step_protocol');
      localStorage.removeItem('om_shanti_module_15_complete');
      localStorage.removeItem('om_shanti_joyful_child_protocol');
      localStorage.removeItem('om_shanti_module_16_complete');
      localStorage.removeItem('om_shanti_element_path_protocol');
      localStorage.removeItem('om_shanti_module_17_complete');
      localStorage.removeItem('om_shanti_labyrinth_light_protocol');
      localStorage.removeItem('om_shanti_module_18_complete');
      localStorage.removeItem('om_shanti_living_prayer_protocol');
      localStorage.removeItem('om_shanti_module_19_complete');
      localStorage.removeItem('om_shanti_resonant_aura_protocol');
      localStorage.removeItem('om_shanti_module_20_complete');
      localStorage.removeItem('om_shanti_mirrored_soul_protocol');
      localStorage.removeItem('om_shanti_module_21_complete');
      localStorage.removeItem('om_shanti_silver_cord_protocol');
      localStorage.removeItem('om_shanti_module_22_complete');
      localStorage.removeItem('om_shanti_sacred_silver_protocol');
      localStorage.removeItem('om_shanti_module_23_complete');
      localStorage.removeItem('om_shanti_inner_temple_protocol');
      localStorage.removeItem('om_shanti_module_24_complete');
      localStorage.removeItem('om_shanti_crystal_stream_protocol');
      localStorage.removeItem('om_shanti_module_25_complete');
      localStorage.removeItem('om_shanti_cosmic_humility_protocol');
      sessionStorage.removeItem(MODULE_1_STEP_KEY);
      sessionStorage.removeItem(MODULE_2_STEP_KEY);
      sessionStorage.removeItem(MODULE_3_STEP_KEY);
      sessionStorage.removeItem(MODULE_4_STEP_KEY);
      sessionStorage.removeItem(MODULE_5_STEP_KEY);
      sessionStorage.removeItem(MODULE_6_STEP_KEY);
      sessionStorage.removeItem(MODULE_7_STEP_KEY);
      sessionStorage.removeItem(MODULE_8_STEP_KEY);
      sessionStorage.removeItem(MODULE_9_STEP_KEY);
      sessionStorage.removeItem(MODULE_10_STEP_KEY);
      sessionStorage.removeItem(MODULE_11_STEP_KEY);
      sessionStorage.removeItem(MODULE_12_STEP_KEY);
      sessionStorage.removeItem(MODULE_13_STEP_KEY);
      sessionStorage.removeItem(MODULE_14_STEP_KEY);
      sessionStorage.removeItem(MODULE_15_STEP_KEY);
      sessionStorage.removeItem(MODULE_16_STEP_KEY);
      sessionStorage.removeItem(MODULE_17_STEP_KEY);
      sessionStorage.removeItem(MODULE_18_STEP_KEY);
      sessionStorage.removeItem(MODULE_19_STEP_KEY);
      sessionStorage.removeItem(MODULE_20_STEP_KEY);
      sessionStorage.removeItem(MODULE_21_STEP_KEY);
      sessionStorage.removeItem(MODULE_22_STEP_KEY);
      sessionStorage.removeItem(MODULE_23_STEP_KEY);
      sessionStorage.removeItem(MODULE_24_STEP_KEY);
      sessionStorage.removeItem(MODULE_25_STEP_KEY);

      setModule1Step('concept-1');
      setModule2Step('concept-5');
      setModule3Step('concept-9');
      setModule4Step('concept-13');
      setModule5Step('concept-17');
      setModule6Step('concept-21');
      setModule7Step('concept-25');
      setModule8Step('concept-29');
      setModule9Step('concept-33');
      setModule10Step('concept-37');
      setModule11Step('concept-41');
      setModule12Step('concept-45');
      setModule13Step('concept-49');
      setModule14Step('concept-53');
      setModule15Step('concept-57');
      setModule16Step('concept-61');
      setModule17Step('concept-65');
      setModule18Step('concept-69');
      setModule19Step('concept-73');
      setModule20Step('concept-77');
      setModule21Step('concept-81');
      setModule22Step('concept-85');
      setModule23Step('concept-89');
      setModule24Step('concept-93');
      setModule25Step('concept-97');
      setActiveInfusion(null);
      setSelectedCategory('All');
    };

    window.addEventListener('keydown', handleDebugReset);
    return () => {
      window.removeEventListener('keydown', handleDebugReset);
    };
  }, []);

  const moveToModule1Step = (nextStep) => {
    setModule1Step(nextStep);
  };

  const handleDeclarationUnlocked = () => {
    setModule1Step('complete');
    setModule2Step('concept-5');
    setActiveInfusion(null);
  };

  const handleModule2Unlocked = () => {
    setModule2Step('complete');
    setModule3Step('concept-9');
    setActiveInfusion(null);
  };

  const handleModule3Unlocked = () => {
    setModule3Step('complete');
    setModule4Step('concept-13');
    setActiveInfusion(null);
  };

  const handleModule4Unlocked = () => {
    setModule4Step('complete');
    setModule5Step('concept-17');
    setActiveInfusion(null);
  };

  const handleModule5Unlocked = () => {
    setModule5Step('complete');
    setModule6Step('concept-21');
    setActiveInfusion(null);
  };

  const handleModule6Unlocked = () => {
    setModule6Step('complete');
    setModule7Step('concept-25');
    setActiveInfusion(null);
  };

  const handleModule7Unlocked = () => {
    setModule7Step('complete');
    setModule8Step('concept-29');
    setActiveInfusion(null);
  };

  const handleModule8Unlocked = () => {
    setModule8Step('complete');
    setModule9Step('concept-33');
    setActiveInfusion(null);
  };

  const handleModule9Unlocked = () => {
    setModule9Step('complete');
    setModule10Step('concept-37');
    setActiveInfusion(null);
  };

  const handleModule10Unlocked = () => {
    setModule10Step('complete');
    setModule11Step('concept-41');
    setActiveInfusion(null);
  };

  const handleModule11Unlocked = () => {
    setModule11Step('complete');
    setModule12Step('concept-45');
    setActiveInfusion(null);
  };

  const handleModule12Unlocked = () => {
    setModule12Step('complete');
    setModule13Step('concept-49');
    setActiveInfusion(null);
  };

  const handleModule13Unlocked = () => {
    setModule13Step('complete');
    setModule14Step('concept-53');
    setActiveInfusion(null);
  };

  const handleModule14Unlocked = () => {
    setModule14Step('complete');
    setModule15Step('concept-57');
    setActiveInfusion(null);
  };

  const handleModule15Unlocked = () => {
    setModule15Step('complete');
    setModule16Step('concept-61');
    setActiveInfusion(null);
  };

  const handleModule16Unlocked = () => {
    setModule16Step('complete');
    setModule17Step('concept-65');
    setActiveInfusion(null);
  };

  const handleModule17Unlocked = () => {
    setModule17Step('complete');
    setModule18Step('concept-69');
    setActiveInfusion(null);
  };

  const handleModule18Unlocked = () => {
    setModule18Step('complete');
    setModule19Step('concept-73');
    setActiveInfusion(null);
  };

  const handleModule19Unlocked = () => {
    setModule19Step('complete');
    setModule20Step('concept-77');
    setActiveInfusion(null);
  };

  const handleModule20Unlocked = () => {
    setModule20Step('complete');
    setModule21Step('concept-81');
    setActiveInfusion(null);
  };

  const handleModule21Unlocked = () => {
    setModule21Step('complete');
    setModule22Step('concept-85');
    setActiveInfusion(null);
  };

  const handleModule22Unlocked = () => {
    setModule22Step('complete');
    setModule23Step('concept-89');
    setActiveInfusion(null);
  };

  const handleModule23Unlocked = () => {
    setModule23Step('complete');
    setModule24Step('concept-93');
    setActiveInfusion(null);
  };

  const handleModule24Unlocked = () => {
    setModule24Step('complete');
    setModule25Step('concept-97');
    setActiveInfusion(null);
  };

  const handleModule25Unlocked = () => {
    setModule25Step('complete');
    setSelectedCategory('All');
    setActiveInfusion(null);
  };

  useEffect(() => {
    const getStepOrder = (moduleNumber) => {
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

    const moduleSteps = {
      1: module1Step,
      2: module2Step,
      3: module3Step,
      4: module4Step,
      5: module5Step,
      6: module6Step,
      7: module7Step,
      8: module8Step,
      9: module9Step,
      10: module10Step,
      11: module11Step,
      12: module12Step,
      13: module13Step,
      14: module14Step,
      15: module15Step,
      16: module16Step,
      17: module17Step,
      18: module18Step,
      19: module19Step,
      20: module20Step,
      21: module21Step,
      22: module22Step,
      23: module23Step,
      24: module24Step,
      25: module25Step,
    };

    const moduleSetters = {
      1: setModule1Step,
      2: setModule2Step,
      3: setModule3Step,
      4: setModule4Step,
      5: setModule5Step,
      6: setModule6Step,
      7: setModule7Step,
      8: setModule8Step,
      9: setModule9Step,
      10: setModule10Step,
      11: setModule11Step,
      12: setModule12Step,
      13: setModule13Step,
      14: setModule14Step,
      15: setModule15Step,
      16: setModule16Step,
      17: setModule17Step,
      18: setModule18Step,
      19: setModule19Step,
      20: setModule20Step,
      21: setModule21Step,
      22: setModule22Step,
      23: setModule23Step,
      24: setModule24Step,
      25: setModule25Step,
    };

    const handleModuleNavigate = (event) => {
      const detail = event.detail || {};
      const moduleNumber = Number(detail.module);
      const targetStep = detail.step;

      if (!Number.isInteger(moduleNumber) || moduleNumber < 1 || moduleNumber > 25) {
        return;
      }

      const stepOrder = getStepOrder(moduleNumber);
      const targetIndex = stepOrder.indexOf(targetStep);
      if (targetIndex === -1) {
        return;
      }

      const currentStep = moduleSteps[moduleNumber];
      const currentIndex = stepOrder.indexOf(currentStep);
      const isCurrentModuleCompleted = currentStep === 'complete';

      // During active progression, allow revisiting only already-unlocked steps.
      if (!isCurrentModuleCompleted && currentIndex >= 0 && targetIndex > currentIndex) {
        return;
      }

      const setStep = moduleSetters[moduleNumber];
      if (setStep) {
        setStep(targetStep);
        setActiveInfusion(null);
      }
    };

    window.addEventListener('omshanti:navigate-step', handleModuleNavigate);
    return () => {
      window.removeEventListener('omshanti:navigate-step', handleModuleNavigate);
    };
  }, [
    module1Step,
    module2Step,
    module3Step,
    module4Step,
    module5Step,
    module6Step,
    module7Step,
    module8Step,
    module9Step,
    module10Step,
    module11Step,
    module12Step,
    module13Step,
    module14Step,
    module15Step,
    module16Step,
    module17Step,
    module18Step,
    module19Step,
    module20Step,
    module21Step,
    module22Step,
    module23Step,
    module24Step,
    module25Step,
  ]);

  const filteredData = useMemo(() => {
    return directoryData.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.parallel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.origin.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    if (activeInfusion) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [activeInfusion]);

  useEffect(() => {
    syncAkashicLedgerFromCompletions();
  }, [
    module1Step,
    module2Step,
    module3Step,
    module4Step,
    module5Step,
    module6Step,
    module7Step,
    module8Step,
    module9Step,
    module10Step,
    module11Step,
    module12Step,
    module13Step,
    module14Step,
    module15Step,
    module16Step,
    module17Step,
    module18Step,
    module19Step,
    module20Step,
    module21Step,
    module22Step,
    module23Step,
    module24Step,
    module25Step,
  ]);

  if (!hasMembership) {
    return <PaymentGate onPurchaseComplete={() => setHasMembership(true)} />;
  }

  if (module1Step === 'concept-1') {
    return (
      <>
        <ConceptOne onContinue={() => moveToModule1Step('concept-2')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module1Step === 'concept-2') {
    return (
      <>
        <ConceptTwo onContinue={() => moveToModule1Step('concept-3')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module1Step === 'concept-3') {
    return (
      <>
        <ConceptThree onContinue={() => moveToModule1Step('concept-4')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module1Step === 'concept-4') {
    return (
      <>
        <ConceptFour onContinue={() => moveToModule1Step('declaration')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module1Step === 'declaration') {
    return (
      <>
        <DeclarationForm onUnlocked={handleDeclarationUnlocked} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module2Step === 'concept-5') {
    return (
      <>
        <ConceptFive onContinue={() => setModule2Step('concept-6')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module2Step === 'concept-6') {
    return (
      <>
        <ConceptSix onContinue={() => setModule2Step('concept-7')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module2Step === 'concept-7') {
    return (
      <>
        <ConceptSeven onContinue={() => setModule2Step('concept-8')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module2Step === 'concept-8') {
    return (
      <>
        <ConceptEight onContinue={() => setModule2Step('blueprint')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module2Step === 'blueprint') {
    return (
      <>
        <SanctuaryBlueprintForm onUnlocked={handleModule2Unlocked} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module3Step === 'concept-9') {
    return (
      <>
        <ConceptNine onContinue={() => setModule3Step('concept-10')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module3Step === 'concept-10') {
    return (
      <>
        <ConceptTen onContinue={() => setModule3Step('concept-11')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module3Step === 'concept-11') {
    return (
      <>
        <ConceptEleven onContinue={() => setModule3Step('concept-12')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module3Step === 'concept-12') {
    return (
      <>
        <ConceptTwelve onContinue={() => setModule3Step('protocol')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module3Step === 'protocol') {
    return (
      <>
        <GroundingProtocolForm onUnlocked={handleModule3Unlocked} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module4Step === 'concept-13') {
    return (
      <>
        <ConceptThirteen onContinue={() => setModule4Step('concept-14')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module4Step === 'concept-14') {
    return (
      <>
        <ConceptFourteen onContinue={() => setModule4Step('concept-15')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module4Step === 'concept-15') {
    return (
      <>
        <ConceptFifteen onContinue={() => setModule4Step('concept-16')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module4Step === 'concept-16') {
    return (
      <>
        <ConceptSixteen onContinue={() => setModule4Step('protocol')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module4Step === 'protocol') {
    return (
      <>
        <ClearingProtocolForm onUnlocked={handleModule4Unlocked} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module5Step === 'concept-17') {
    return (
      <>
        <ConceptSeventeen onContinue={() => setModule5Step('concept-18')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module5Step === 'concept-18') {
    return (
      <>
        <ConceptEighteen onContinue={() => setModule5Step('concept-19')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module5Step === 'concept-19') {
    return (
      <>
        <ConceptNineteen onContinue={() => setModule5Step('concept-20')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module5Step === 'concept-20') {
    return (
      <>
        <ConceptTwenty onContinue={() => setModule5Step('protocol')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module5Step === 'protocol') {
    return (
      <>
        <LineageProtocolForm onUnlocked={handleModule5Unlocked} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module6Step === 'concept-21') {
    return (
      <>
        <ConceptTwentyOne onContinue={() => setModule6Step('concept-22')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module6Step === 'concept-22') {
    return (
      <>
        <ConceptTwentyTwo onContinue={() => setModule6Step('concept-23')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module6Step === 'concept-23') {
    return (
      <>
        <ConceptTwentyThree onContinue={() => setModule6Step('concept-24')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module6Step === 'concept-24') {
    return (
      <>
        <ConceptTwentyFour onContinue={() => setModule6Step('protocol')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module6Step === 'protocol') {
    return (
      <>
        <CosmicProtocolForm onUnlocked={handleModule6Unlocked} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module7Step === 'concept-25') {
    return (
      <>
        <ConceptTwentyFive onContinue={() => setModule7Step('concept-26')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module7Step === 'concept-26') {
    return (
      <>
        <ConceptTwentySix onContinue={() => setModule7Step('concept-27')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module7Step === 'concept-27') {
    return (
      <>
        <ConceptTwentySeven onContinue={() => setModule7Step('concept-28')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module7Step === 'concept-28') {
    return (
      <>
        <ConceptTwentyEight onContinue={() => setModule7Step('protocol')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module7Step === 'protocol') {
    return (
      <>
        <IntegrationProtocolForm onUnlocked={handleModule7Unlocked} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module8Step === 'concept-29') {
    return (
      <>
        <ConceptTwentyNine onContinue={() => setModule8Step('concept-30')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module8Step === 'concept-30') {
    return (
      <>
        <ConceptThirty onContinue={() => setModule8Step('concept-31')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module8Step === 'concept-31') {
    return (
      <>
        <ConceptThirtyOne onContinue={() => setModule8Step('concept-32')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module8Step === 'concept-32') {
    return (
      <>
        <ConceptThirtyTwo onContinue={() => setModule8Step('protocol')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module8Step === 'protocol') {
    return (
      <>
        <ShieldProtocolForm onUnlocked={handleModule8Unlocked} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module9Step === 'concept-33') {
    return (
      <>
        <ConceptThirtyThree onContinue={() => setModule9Step('concept-34')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module9Step === 'concept-34') {
    return (
      <>
        <ConceptThirtyFour onContinue={() => setModule9Step('concept-35')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module9Step === 'concept-35') {
    return (
      <>
        <ConceptThirtyFive onContinue={() => setModule9Step('concept-36')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module9Step === 'concept-36') {
    return (
      <>
        <ConceptThirtySix onContinue={() => setModule9Step('protocol')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module9Step === 'protocol') {
    return (
      <>
        <CosmicGameProtocolForm onUnlocked={handleModule9Unlocked} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module10Step === 'concept-37') {
    return (
      <>
        <ConceptThirtySeven onContinue={() => setModule10Step('concept-38')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module10Step === 'concept-38') {
    return (
      <>
        <ConceptThirtyEight onContinue={() => setModule10Step('concept-39')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module10Step === 'concept-39') {
    return (
      <>
        <ConceptThirtyNine onContinue={() => setModule10Step('concept-40')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module10Step === 'concept-40') {
    return (
      <>
        <ConceptForty onContinue={() => setModule10Step('protocol')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module10Step === 'protocol') {
    return (
      <>
        <GaiaProtocolForm onUnlocked={handleModule10Unlocked} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module11Step === 'concept-41') {
    return (
      <>
        <ConceptFortyOne onContinue={() => setModule11Step('concept-42')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module11Step === 'concept-42') {
    return (
      <>
        <ConceptFortyTwo onContinue={() => setModule11Step('concept-43')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module11Step === 'concept-43') {
    return (
      <>
        <ConceptFortyThree onContinue={() => setModule11Step('concept-44')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module11Step === 'concept-44') {
    return (
      <>
        <ConceptFortyFour onContinue={() => setModule11Step('protocol')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module11Step === 'protocol') {
    return (
      <>
        <CrystalMindProtocolForm onUnlocked={handleModule11Unlocked} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module12Step === 'concept-45') {
    return (
      <>
        <ConceptFortyFive onContinue={() => setModule12Step('concept-46')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module12Step === 'concept-46') {
    return (
      <>
        <ConceptFortySix onContinue={() => setModule12Step('concept-47')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module12Step === 'concept-47') {
    return (
      <>
        <ConceptFortySeven onContinue={() => setModule12Step('concept-48')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module12Step === 'concept-48') {
    return (
      <>
        <ConceptFortyEight onContinue={() => setModule12Step('protocol')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module12Step === 'protocol') {
    return (
      <>
        <ScentProtocolForm onUnlocked={handleModule12Unlocked} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module13Step === 'concept-49') {
    return (
      <>
        <ConceptFortyNine onContinue={() => setModule13Step('concept-50')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module13Step === 'concept-50') {
    return (
      <>
        <ConceptFifty onContinue={() => setModule13Step('concept-51')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module13Step === 'concept-51') {
    return (
      <>
        <ConceptFiftyOne onContinue={() => setModule13Step('concept-52')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module13Step === 'concept-52') {
    return (
      <>
        <ConceptFiftyTwo onContinue={() => setModule13Step('protocol')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module13Step === 'protocol') {
    return (
      <>
        <EgoEndProtocolForm onUnlocked={handleModule13Unlocked} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module14Step === 'concept-53') {
    return (
      <>
        <ConceptFiftyThree onContinue={() => setModule14Step('concept-54')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module14Step === 'concept-54') {
    return (
      <>
        <ConceptFiftyFour onContinue={() => setModule14Step('concept-55')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module14Step === 'concept-55') {
    return (
      <>
        <ConceptFiftyFive onContinue={() => setModule14Step('concept-56')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module14Step === 'concept-56') {
    return (
      <>
        <ConceptFiftySix onContinue={() => setModule14Step('protocol')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module14Step === 'protocol') {
    return (
      <>
        <StarryStepProtocolForm onUnlocked={handleModule14Unlocked} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module15Step === 'concept-57') {
    return (
      <>
        <ConceptFiftySeven onContinue={() => setModule15Step('concept-58')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module15Step === 'concept-58') {
    return (
      <>
        <ConceptFiftyEight onContinue={() => setModule15Step('concept-59')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module15Step === 'concept-59') {
    return (
      <>
        <ConceptFiftyNine onContinue={() => setModule15Step('concept-60')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module15Step === 'concept-60') {
    return (
      <>
        <ConceptSixty onContinue={() => setModule15Step('protocol')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module15Step === 'protocol') {
    return (
      <>
        <JoyfulChildProtocolForm onUnlocked={handleModule15Unlocked} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module16Step === 'concept-61') {
    return (
      <>
        <ConceptSixtyOne onContinue={() => setModule16Step('concept-62')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module16Step === 'concept-62') {
    return (
      <>
        <ConceptSixtyTwo onContinue={() => setModule16Step('concept-63')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module16Step === 'concept-63') {
    return (
      <>
        <ConceptSixtyThree onContinue={() => setModule16Step('concept-64')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module16Step === 'concept-64') {
    return (
      <>
        <ConceptSixtyFour onContinue={() => setModule16Step('protocol')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module16Step === 'protocol') {
    return (
      <>
        <ElementPathProtocolForm onUnlocked={handleModule16Unlocked} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module17Step === 'concept-65') {
    return (
      <>
        <ConceptSixtyFive onContinue={() => setModule17Step('concept-66')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module17Step === 'concept-66') {
    return (
      <>
        <ConceptSixtySix onContinue={() => setModule17Step('concept-67')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module17Step === 'concept-67') {
    return (
      <>
        <ConceptSixtySeven onContinue={() => setModule17Step('concept-68')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module17Step === 'concept-68') {
    return (
      <>
        <ConceptSixtyEight onContinue={() => setModule17Step('protocol')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module17Step === 'protocol') {
    return (
      <>
        <LabyrinthLightProtocolForm onUnlocked={handleModule17Unlocked} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module18Step === 'concept-69') {
    return (
      <>
        <ConceptSixtyNine onContinue={() => setModule18Step('concept-70')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module18Step === 'concept-70') {
    return (
      <>
        <ConceptSeventy onContinue={() => setModule18Step('concept-71')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module18Step === 'concept-71') {
    return (
      <>
        <ConceptSeventyOne onContinue={() => setModule18Step('concept-72')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module18Step === 'concept-72') {
    return (
      <>
        <ConceptSeventyTwo onContinue={() => setModule18Step('protocol')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module18Step === 'protocol') {
    return (
      <>
        <LivingPrayerProtocolForm onUnlocked={handleModule18Unlocked} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module19Step === 'concept-73') {
    return (
      <>
        <ConceptSeventyThree onContinue={() => setModule19Step('concept-74')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module19Step === 'concept-74') {
    return (
      <>
        <ConceptSeventyFour onContinue={() => setModule19Step('concept-75')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module19Step === 'concept-75') {
    return (
      <>
        <ConceptSeventyFive onContinue={() => setModule19Step('concept-76')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module19Step === 'concept-76') {
    return (
      <>
        <ConceptSeventySix onContinue={() => setModule19Step('protocol')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module19Step === 'protocol') {
    return (
      <>
        <ResonantAuraProtocolForm onUnlocked={handleModule19Unlocked} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module20Step === 'concept-77') {
    return (
      <>
        <ConceptSeventySeven onContinue={() => setModule20Step('concept-78')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module20Step === 'concept-78') {
    return (
      <>
        <ConceptSeventyEight onContinue={() => setModule20Step('concept-79')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module20Step === 'concept-79') {
    return (
      <>
        <ConceptSeventyNine onContinue={() => setModule20Step('concept-80')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module20Step === 'concept-80') {
    return (
      <>
        <ConceptEighty onContinue={() => setModule20Step('protocol')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module20Step === 'protocol') {
    return (
      <>
        <MirroredSoulProtocolForm onUnlocked={handleModule20Unlocked} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module21Step === 'concept-81') {
    return (
      <>
        <ConceptEightyOne onContinue={() => setModule21Step('concept-82')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module21Step === 'concept-82') {
    return (
      <>
        <ConceptEightyTwo onContinue={() => setModule21Step('concept-83')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module21Step === 'concept-83') {
    return (
      <>
        <ConceptEightyThree onContinue={() => setModule21Step('concept-84')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module21Step === 'concept-84') {
    return (
      <>
        <ConceptEightyFour onContinue={() => setModule21Step('protocol')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module21Step === 'protocol') {
    return (
      <>
        <SilverCordProtocolForm onUnlocked={handleModule21Unlocked} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module22Step === 'concept-85') {
    return (
      <>
        <ConceptEightyFive onContinue={() => setModule22Step('concept-86')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module22Step === 'concept-86') {
    return (
      <>
        <ConceptEightySix onContinue={() => setModule22Step('concept-87')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module22Step === 'concept-87') {
    return (
      <>
        <ConceptEightySeven onContinue={() => setModule22Step('concept-88')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module22Step === 'concept-88') {
    return (
      <>
        <ConceptEightyEight onContinue={() => setModule22Step('protocol')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module22Step === 'protocol') {
    return (
      <>
        <SacredSilverProtocolForm onUnlocked={handleModule22Unlocked} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module23Step === 'concept-89') {
    return (
      <>
        <ConceptEightyNine onContinue={() => setModule23Step('concept-90')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module23Step === 'concept-90') {
    return (
      <>
        <ConceptNinety onContinue={() => setModule23Step('concept-91')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module23Step === 'concept-91') {
    return (
      <>
        <ConceptNinetyOne onContinue={() => setModule23Step('concept-92')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module23Step === 'concept-92') {
    return (
      <>
        <ConceptNinetyTwo onContinue={() => setModule23Step('protocol')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module23Step === 'protocol') {
    return (
      <>
        <InnerTempleProtocolForm onUnlocked={handleModule23Unlocked} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module24Step === 'concept-93') {
    return (
      <>
        <ConceptNinetyThree onContinue={() => setModule24Step('concept-94')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module24Step === 'concept-94') {
    return (
      <>
        <ConceptNinetyFour onContinue={() => setModule24Step('concept-95')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module24Step === 'concept-95') {
    return (
      <>
        <ConceptNinetyFive onContinue={() => setModule24Step('concept-96')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module24Step === 'concept-96') {
    return (
      <>
        <ConceptNinetySix onContinue={() => setModule24Step('protocol')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module24Step === 'protocol') {
    return (
      <>
        <CrystalStreamProtocolForm onUnlocked={handleModule24Unlocked} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module25Step === 'concept-97') {
    return (
      <>
        <ConceptNinetySeven onContinue={() => setModule25Step('concept-98')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module25Step === 'concept-98') {
    return (
      <>
        <ConceptNinetyEight onContinue={() => setModule25Step('concept-99')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module25Step === 'concept-99') {
    return (
      <>
        <ConceptNinetyNine onContinue={() => setModule25Step('concept-100')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module25Step === 'concept-100') {
    return (
      <>
        <ConceptOneHundred onContinue={() => setModule25Step('protocol')} />
        <MinimalAudioPlayer />
      </>
    );
  }

  if (module25Step === 'protocol') {
    return (
      <>
        <CosmicHumilityProtocolForm onUnlocked={handleModule25Unlocked} />
        <MinimalAudioPlayer />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30">
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950"></div>

      <header className="relative z-10 border-b border-slate-800/60 bg-slate-950/50 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
              <Sparkles size={24} />
            </div>
            <h1 className="text-xl font-medium tracking-tight text-slate-100">
              The <span className="text-indigo-400 font-semibold">Om Shanti</span>{' '}
              Directory
            </h1>
          </div>

          <div className="hidden md:flex relative max-w-md w-full ml-8">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Search concepts, parallels, origins..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-800 text-sm rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all placeholder:text-slate-600 text-slate-300"
            />
          </div>

          <button
            className="md:hidden p-2 text-slate-400 hover:text-slate-200"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            <BookOpen size={24} />
          </button>
        </div>
      </header>

      <div className="md:hidden p-4 relative z-10 border-b border-slate-800/60 bg-slate-900/30">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Search concepts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 text-sm rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-300"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 flex flex-col md:flex-row gap-8">
        <aside
          className={`${
            isSidebarOpen ? 'block' : 'hidden'
          } md:block w-full md:w-64 flex-shrink-0 space-y-1`}
        >
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-3">
            Exploration Categories
          </h2>
          <nav className="space-y-1">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left transition-all duration-200 ${
                    isActive
                      ? 'bg-indigo-500/15 text-indigo-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border border-indigo-500/20'
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                  }`}
                >
                  <Icon
                    size={18}
                    className={isActive ? 'text-indigo-400' : 'text-slate-500'}
                  />
                  <span className="leading-tight">{cat.name}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 min-w-0">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-2">
              {categories.find((c) => c.id === selectedCategory)?.name ||
                'Knowledge Infusions'}
            </h2>
            <p className="text-slate-400 text-sm">
              Bridging ancient mystical paradigms with modern neurobiological science.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveInfusion(item)}
                  className="group relative bg-slate-900/40 border border-slate-800 hover:border-indigo-500/30 rounded-xl p-5 cursor-pointer transition-all duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.05)] hover:-translate-y-0.5 overflow-hidden flex flex-col"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500/0 via-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/50 group-hover:to-purple-500/50 transition-all duration-500"></div>

                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-medium text-slate-100 pr-6 leading-tight">
                      {item.title}
                    </h3>
                    <ChevronRight
                      size={18}
                      className="text-slate-600 group-hover:text-indigo-400 transition-colors shrink-0"
                    />
                  </div>

                  <div className="space-y-3 flex-1">
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                        Mystical Origin
                      </p>
                      <p className="text-sm text-slate-300 line-clamp-1">
                        {item.origin}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-indigo-400/70 uppercase tracking-wide mb-1">
                        Scientific Parallel
                      </p>
                      <p className="text-sm text-indigo-200/80 line-clamp-2">
                        {item.parallel}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center border border-dashed border-slate-800 rounded-xl bg-slate-900/20">
                <Search className="mx-auto h-8 w-8 text-slate-600 mb-3" />
                <p className="text-slate-400">
                  No knowledge infusions found matching your criteria.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="mt-4 text-sm text-indigo-400 hover:text-indigo-300"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {activeInfusion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
            onClick={() => setActiveInfusion(null)}
          ></div>

          <div className="relative bg-slate-900 border border-slate-700 shadow-2xl rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-10">
              <h2 className="text-xl font-semibold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-sm">
                  {activeInfusion.id}
                </span>
                {activeInfusion.title}
              </h2>
              <button
                onClick={() => setActiveInfusion(null)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-8 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/10 border border-indigo-500/20 rounded-xl p-5 relative overflow-hidden">
                <div className="absolute -right-4 -top-4 opacity-10">
                  <Sparkles size={100} />
                </div>
                <h4 className="text-xs font-semibold text-indigo-300 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Play size={12} /> The Infusion Script
                </h4>
                <p className="text-lg sm:text-xl text-indigo-100 italic leading-relaxed relative z-10">
                  "{activeInfusion.script}"
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-slate-400 uppercase tracking-wide flex items-center gap-2">
                    <BookOpen size={16} /> Ancient Origin
                  </h4>
                  <p className="text-slate-200 bg-slate-800/30 p-4 rounded-lg border border-slate-800/50 h-full">
                    {activeInfusion.origin}
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-slate-400 uppercase tracking-wide flex items-center gap-2">
                    <Brain size={16} /> Empirical Parallel
                  </h4>
                  <p className="text-slate-200 bg-slate-800/30 p-4 rounded-lg border border-slate-800/50 h-full">
                    {activeInfusion.parallel}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-medium text-white border-b border-slate-800 pb-2">
                  Synthesis & Learning
                </h3>
                <div className="text-slate-300 leading-relaxed space-y-4">
                  {activeInfusion.learning.split('\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
                  <Activity size={20} className="text-teal-400" />
                  Actionable Practice
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {activeInfusion.practice}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
      <MinimalAudioPlayer />
    </>
  );
}
