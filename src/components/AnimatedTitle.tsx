import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const labels = ['Developer', 'Designer'];

export const AnimatedTitle = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % labels.length), 2200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <span className="animated-title">
      <AnimatePresence mode="wait">
        <motion.span
          key={labels[index]}
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -18, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {labels[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};
