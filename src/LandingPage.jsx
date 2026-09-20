import { motion } from 'framer-motion';


import {
  Wind,
  Mountain,
  Moon,
  Sparkles,
  Music4,
  HeartHandshake,
  Activity,
  Waves,
  BookOpen,
  Brain,
  Compass,
  ArrowDown,
} from 'lucide-react';

const INFUSIONS = [
  { icon: Wind, name: 'Somatic Breath', tag: 'Nervous System' },
  { icon: Mountain, name: 'Earthing', tag: 'Grounding' },
  { icon: Moon, name: 'Shadow Integration', tag: 'Depth Psychology' },
  { icon: Sparkles, name: 'Sacred Geometry', tag: 'Ancient Mysticism' },
  { icon: Music4, name: 'Tonal Humming', tag: 'Vagal Toning' },
  { icon: HeartHandshake, name: 'Quantum Forgiveness', tag: 'Inner Alignment' },
  { icon: Activity, name: 'Vagus Nerve Stimulation', tag: 'Neuroscience' },
  { icon: Waves, name: 'Sound Healing', tag: 'Sensory Practice' },
];

const PILLARS = [
  {
    icon: BookOpen,
    title: 'Learn',
    copy: 'Every entry traces its origin — from cloistered monasteries to ancient temples — so you understand where the practice comes from.',
  },
  {
    icon: Brain,
    title: 'Practice',
    copy: 'A clear psychological and somatic "why," paired with a guided script and a one-minute daily practice you can begin today.',
  },
  {
    icon: Compass,
    title: 'Preserve',
    copy: 'Self-led and always available — a living directory you return to whenever the noise gets loud again.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

export default function LandingPage({ onBegin }) {
  return (
    <div className="relative overflow-hidden bg-[#050408] text-slate-100">
      {/* Ambient candlelight / drum-pulse glow */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-[-10%] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[120px]" />
        <div className="absolute right-[-10%] top-1/3 h-[30rem] w-[30rem] rounded-full bg-indigo-500/10 blur-[110px]" />
        <div className="absolute left-[-10%] bottom-0 h-[26rem] w-[26rem] rounded-full bg-emerald-500/5 blur-[100px]" />
      </div>

      {/* Nav */}
      <header className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-10">
        <span className="font-serif text-sm uppercase tracking-[0.35em] text-amber-200/80">
          Om Shanti Directory
        </span>
        <button
          type="button"
          onClick={onBegin}
          className="rounded-full border border-amber-400/30 px-4 py-2 text-xs uppercase tracking-widest text-amber-100/90 transition-colors hover:bg-amber-400/10"
        >
          Enter
        </button>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pb-24 pt-10 text-center sm:pb-32 sm:pt-16">
        <motion.p
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="text-xs uppercase tracking-[0.4em] text-amber-300/70"
        >
          A Digital Sanctuary
        </motion.p>
        <motion.h1
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ delay: 0.1 }}
          className="mt-6 font-serif text-5xl font-semibold leading-tight text-slate-50 sm:text-7xl"
        >
          Return to the Center
        </motion.h1>
        <motion.p
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ delay: 0.2 }}
          className="mt-6 max-w-xl text-balance text-lg text-slate-300 sm:text-xl"
        >
          In a world designed to scatter your attention, there is a sanctuary
          waiting for you — a place to breathe, ground, and begin your
          self-led journey of peace.
        </motion.p>
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <button
            type="button"
            onClick={onBegin}
            className="rounded-full bg-amber-400/90 px-8 py-4 text-sm font-semibold uppercase tracking-widest text-slate-950 shadow-[0_0_40px_-10px_rgba(251,191,36,0.7)] transition-transform hover:scale-[1.03]"
          >
            Begin Your Self-Led Journey
          </button>
          <a
            href="#infusions"
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-slate-400 hover:text-slate-200"
          >
            Explore 100 knowledge infusions
            <ArrowDown size={14} />
          </a>
        </motion.div>
      </section>

      {/* Noise -> Stillness */}
      <section className="relative z-10 border-t border-white/5 bg-black/20 px-6 py-20 sm:py-28">
        <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Too much noise?</p>
            <p className="mt-4 font-serif text-2xl leading-snug text-slate-300 sm:text-3xl">
              Notifications. Traffic. Static threaded through every waking
              hour — a world designed to scatter your attention.
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
            transition={{ delay: 0.15 }}
            className="border-t border-amber-400/20 pt-8 sm:border-l sm:border-t-0 sm:pl-10 sm:pt-0"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300/70">Return to center</p>
            <p className="mt-4 font-serif text-2xl leading-snug text-slate-100 sm:text-3xl">
              A sanctuary of ancient mysticism and modern psychology, held in
              100 self-led knowledge infusions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 100 Knowledge Infusions */}
      <section id="infusions" className="relative z-10 px-6 py-20 sm:py-28">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-amber-300/70">100 Knowledge Infusions</p>
          <h2 className="mt-4 font-serif text-4xl text-slate-50 sm:text-5xl">
            Ancient Mysticism &times; Modern Psychology
          </h2>
          <p className="mt-4 text-slate-400">
            Each entry gives you the origin, the psychological &ldquo;why,&rdquo;
            and a guided script — bridging vagus nerve stimulation and
            quantum forgiveness alike.
          </p>
        </motion.div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INFUSIONS.map(({ icon: Icon, name, tag }, index) => (
            <motion.div
              key={name}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
            >
              <Icon size={22} className="text-amber-300/80" />
              <p className="mt-4 font-serif text-lg text-slate-100">{name}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-slate-500">{tag}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Learn. Practice. Preserve. */}
      <section className="relative z-10 border-t border-white/5 bg-black/20 px-6 py-20 sm:py-28">
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="mx-auto max-w-2xl text-center font-serif text-4xl text-slate-50 sm:text-5xl"
        >
          Learn. Practice. Preserve.
        </motion.h2>

        <div className="mx-auto mt-14 grid max-w-5xl gap-8 sm:grid-cols-3">
          {PILLARS.map(({ icon: Icon, title, copy }, index) => (
            <motion.div
              key={title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp}
              transition={{ delay: index * 0.1 }}
              className="text-center sm:text-left"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-400/10 sm:mx-0">
                <Icon size={22} className="text-amber-300/90" />
              </div>
              <p className="mt-5 font-serif text-xl text-slate-100">{title}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{copy}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Social caption / pull quote */}
      <section className="relative z-10 px-6 py-20 sm:py-28">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="mx-auto max-w-2xl rounded-3xl border border-amber-400/20 bg-white/[0.03] p-10 text-center"
        >
          <p className="font-serif text-2xl leading-relaxed text-slate-100 sm:text-3xl">
            &ldquo;Return to your center. Modern life scatters our focus, but
            true peace is a practice.&rdquo;
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs uppercase tracking-widest text-amber-300/70">
            {['OmShanti', 'Mindfulness', 'SomaticHealing', 'SelfDiscovery', 'SpiritualGrowth'].map((tag) => (
              <span key={tag} className="rounded-full border border-amber-400/20 px-3 py-1">
                #{tag}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 px-6 pb-24 pt-4 text-center sm:pb-32">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
        >
          <h2 className="font-serif text-3xl text-slate-50 sm:text-4xl">
            Step across the threshold.
          </h2>
          <p className="mt-4 text-slate-400">Free to begin — the first two modules are on us.</p>
          <button
            type="button"
            onClick={onBegin}
            className="mt-8 rounded-full bg-amber-400/90 px-10 py-4 text-sm font-semibold uppercase tracking-widest text-slate-950 shadow-[0_0_40px_-10px_rgba(251,191,36,0.7)] transition-transform hover:scale-[1.03]"
          >
            Begin Your Self-Led Journey
          </button>
        </motion.div>
      </section>
    </div>
  );
}
