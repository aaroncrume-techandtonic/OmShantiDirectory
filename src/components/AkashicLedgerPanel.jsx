import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import {
  addLedgerReflection,
  formatStepLabel,
  getCompletedModules,
  getLedgerEntries,
  getLedgerSummary,
  getModuleStepOrder,
  getPendingReflectionModule,
  getReflectionEntriesForModule,
  MODULE_CATALOG,
  syncAkashicLedgerFromCompletions,
} from '../lib/akashicLedger';

export default function AkashicLedgerPanel() {
  const [ledgerVersion, setLedgerVersion] = useState(0);
  const [moduleNumber, setModuleNumber] = useState(null);
  const [reflection, setReflection] = useState('');
  const [resonance, setResonance] = useState(3);
  const [message, setMessage] = useState('');

  const entries = useMemo(() => {
    syncAkashicLedgerFromCompletions();
    return getLedgerEntries();
  }, [ledgerVersion]);

  const summary = useMemo(() => getLedgerSummary(entries), [entries]);
  const completedModules = useMemo(() => getCompletedModules(entries), [entries]);
  const pendingReflection = useMemo(() => getPendingReflectionModule(entries), [entries]);
  const timeline = useMemo(
    () => [...entries].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()),
    [entries]
  );

  const reflectionCandidates = useMemo(() => {
    const reflectedModuleIds = new Set(
      entries.filter((entry) => entry.entryType === 'REFLECTION').map((entry) => entry.moduleNumber)
    );

    return completedModules.filter((module) => !reflectedModuleIds.has(module.module));
  }, [entries, completedModules]);

  const selectedModule =
    MODULE_CATALOG.find((item) => item.module === Number(moduleNumber)) ||
    (pendingReflection
      ? MODULE_CATALOG.find((item) => item.module === pendingReflection.moduleNumber)
      : null);

  const saveReflection = () => {
    if (!selectedModule || reflection.trim().length < 10) {
      setMessage('Add a short reflection of at least 10 characters.');
      return;
    }

    addLedgerReflection({
      moduleNumber: selectedModule.module,
      content: reflection.slice(0, 280),
      resonance,
    });

    setReflection('');
    setResonance(3);
    setMessage('Reflection archived in the ledger.');
    setLedgerVersion((version) => version + 1);
  };

  const moduleTimelineEntries = (moduleNumberToShow) => {
    const moduleEntry = entries.find(
      (entry) => entry.entryType === 'COMPLETED' && entry.moduleNumber === moduleNumberToShow
    );
    const reflections = getReflectionEntriesForModule(entries, moduleNumberToShow);
    return [moduleEntry, ...reflections].filter(Boolean);
  };

  return (
    <div className="space-y-3">
      <section className="rounded-lg border border-fuchsia-500/30 bg-fuchsia-500/10 p-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-fuchsia-300">Akashic Ledger</p>
            <p className="text-sm text-fuchsia-50">A living record of the 100 concept journey.</p>
          </div>
          <button
            onClick={() => setLedgerVersion((version) => version + 1)}
            className="rounded border border-fuchsia-400/40 bg-fuchsia-500/20 px-2 py-1 text-[11px] text-fuchsia-100 hover:bg-fuchsia-500/30"
          >
            Refresh
          </button>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          <div className="rounded border border-slate-700 bg-slate-900/60 p-2">
            <div className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Completed</div>
            <div className="text-lg font-semibold text-white">{summary.completedCount}/{summary.totalCount}</div>
          </div>
          <div className="rounded border border-slate-700 bg-slate-900/60 p-2">
            <div className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Reflections</div>
            <div className="text-lg font-semibold text-white">{summary.reflectionCount}</div>
          </div>
          <div className="rounded border border-slate-700 bg-slate-900/60 p-2">
            <div className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Current</div>
            <div className="text-lg font-semibold text-white">{pendingReflection ? pendingReflection.moduleNumber : 'None'}</div>
          </div>
        </div>

        {summary.corePillars.length > 0 ? (
          <div className="mt-3 rounded border border-amber-500/30 bg-amber-500/10 p-2">
            <p className="text-[10px] uppercase tracking-[0.2em] text-amber-200">Core Pillars</p>
            <div className="mt-2 space-y-1">
              {summary.corePillars.map((pillar) => (
                <div key={pillar.moduleNumber} className="flex items-center justify-between text-xs text-amber-50">
                  <span>{pillar.moduleNumber}. {pillar.moduleTitle}</span>
                  <span>{pillar.average.toFixed(1)}/5</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      <section className="rounded-lg border border-slate-800 bg-slate-900/70 p-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Reflection Logger</p>
            <p className="text-xs text-slate-300">Write a 280-character takeaway and resonance score.</p>
          </div>
        </div>

        <div className="mt-3 space-y-2">
          <label className="block text-[11px] uppercase tracking-wide text-slate-400">Module</label>
          <select
            value={moduleNumber || ''}
            onChange={(event) => setModuleNumber(Number(event.target.value))}
            className="w-full rounded border border-slate-700 bg-slate-950 px-2 py-1 text-sm text-slate-100"
          >
            <option value="" disabled>
              Select completed module
            </option>
            {reflectionCandidates.map((module) => (
              <option key={module.module} value={module.module}>
                Module {module.module} - {module.title}
              </option>
            ))}
          </select>

          <label className="block text-[11px] uppercase tracking-wide text-slate-400">Reflection</label>
          <textarea
            value={reflection}
            onChange={(event) => setReflection(event.target.value.slice(0, 280))}
            rows={4}
            maxLength={280}
            placeholder="What did this concept change, reveal, or clarify?"
            className="w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-600"
          />
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>{reflection.length}/280</span>
            <span>Choose a resonance from 1 to 5</span>
          </div>

          <input
            type="range"
            min="1"
            max="5"
            step="1"
            value={resonance}
            onChange={(event) => setResonance(Number(event.target.value))}
            className="h-1 w-full cursor-pointer appearance-none rounded-full bg-slate-700"
          />

          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                onClick={() => setResonance(value)}
                className={`rounded border px-2 py-1 text-xs ${
                  resonance === value
                    ? 'border-fuchsia-400 bg-fuchsia-500/20 text-fuchsia-100'
                    : 'border-slate-700 bg-slate-800 text-slate-300'
                }`}
              >
                {value}
              </button>
            ))}
          </div>

          <button
            onClick={saveReflection}
            className="w-full rounded border border-fuchsia-500/40 bg-fuchsia-500/15 px-3 py-2 text-sm text-fuchsia-100 hover:bg-fuchsia-500/25"
          >
            Archive Reflection
          </button>
          {message ? <p className="text-xs text-slate-400">{message}</p> : null}
        </div>
      </section>

      <section className="rounded-lg border border-slate-800 bg-slate-900/70 p-3">
        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Timeline Feed</p>
        <div className="mt-3 space-y-3">
          <AnimatePresence initial={false}>
            {timeline.map((entry) => {
              const module = MODULE_CATALOG.find((item) => item.module === entry.moduleNumber);
              const reflectionEntries = getReflectionEntriesForModule(entries, entry.moduleNumber);
              const timelineItems = entry.entryType === 'COMPLETED' ? [entry, ...reflectionEntries] : [entry];

              if (entry.entryType !== 'COMPLETED') {
                return null;
              }

              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="rounded border border-slate-800 bg-slate-950/80 p-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-400">Module {entry.moduleNumber}</p>
                      <p className="text-sm text-white">{module?.title || entry.moduleTitle}</p>
                    </div>
                    <span className="rounded border border-slate-700 px-2 py-1 text-[10px] uppercase tracking-wide text-slate-300">
                      Completed
                    </span>
                  </div>
                  <p className="mt-2 text-[11px] text-slate-500">{new Date(entry.createdAt).toLocaleString()}</p>

                  {timelineItems
                    .filter((item) => item.entryType === 'REFLECTION')
                    .map((reflectionEntry) => (
                      <div key={reflectionEntry.id} className="mt-3 rounded border border-fuchsia-500/20 bg-fuchsia-500/10 p-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase tracking-wide text-fuchsia-200">Reflection</span>
                          <span className="text-[10px] text-fuchsia-100">Resonance {reflectionEntry.resonance}/5</span>
                        </div>
                        <p className="mt-1 text-sm text-fuchsia-50">{reflectionEntry.content}</p>
                      </div>
                    ))}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>

      <section className="rounded-lg border border-slate-800 bg-slate-900/70 p-3">
        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Module Steps</p>
        <div className="mt-3 space-y-2 max-h-48 overflow-y-auto pr-1">
          {completedModules.map((module) => {
            const steps = getModuleStepOrder(module.module);
            return (
              <details key={module.module} className="rounded border border-slate-800 bg-slate-950/70 p-2">
                <summary className="cursor-pointer text-sm text-slate-100">Module {module.module} - {module.title}</summary>
                <div className="mt-2 flex flex-wrap gap-1">
                  {steps.map((step) => (
                    <span key={`${module.module}-${step}`} className="rounded border border-slate-700 bg-slate-800 px-2 py-1 text-[10px] text-slate-200">
                      {formatStepLabel(step)}
                    </span>
                  ))}
                </div>
              </details>
            );
          })}
        </div>
      </section>
    </div>
  );
}
