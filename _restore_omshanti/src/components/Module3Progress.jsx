import { motion } from 'framer-motion';

export default function Module3Progress({ step, total = 5, label }) {
  const normalizedStep = Math.min(Math.max(step, 1), total);
  const percentage = (normalizedStep / total) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed top-5 left-5 z-40 w-[min(260px,74vw)]"
    >
      <p className="text-[10px] uppercase tracking-[0.22em] text-neutral-500 mb-2">
        Module 3 // {label}
      </p>
      <div className="h-[2px] w-full bg-neutral-800 overflow-hidden rounded-full">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="h-full bg-amber-300/80"
        />
      </div>
      <p className="mt-2 text-[10px] text-neutral-600 tracking-[0.18em] uppercase">
        {normalizedStep} of {total}
      </p>
    </motion.div>
  );
}
