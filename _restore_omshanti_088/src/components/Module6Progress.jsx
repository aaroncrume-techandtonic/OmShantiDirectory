import { motion } from 'framer-motion';

export default function Module6Progress({ step, total = 5, label }) {
  const normalizedStep = Math.min(Math.max(step, 1), total);
  const percentage = (normalizedStep / total) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed top-5 left-5 z-40 w-[min(260px,74vw)]"
    >
      <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-100/70 mb-2">
        Module 6 // {label}
      </p>
      <div className="h-[2px] w-full bg-cyan-950/70 overflow-hidden rounded-full">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="h-full bg-cyan-300/85"
        />
      </div>
      <p className="mt-2 text-[10px] text-cyan-100/75 tracking-[0.18em] uppercase">
        {normalizedStep} of {total}
      </p>
    </motion.div>
  );
}
