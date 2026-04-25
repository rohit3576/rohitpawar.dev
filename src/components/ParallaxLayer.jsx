import { motion } from "framer-motion";

function ParallaxLayer({ y }) {
  return (
    <motion.div style={{ y }} className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-20 top-24 h-64 w-64 rounded-full bg-blue-200/40 blur-3xl dark:bg-blue-500/20" />
      <div className="absolute right-8 top-1/3 h-56 w-56 rounded-full bg-violet-200/40 blur-3xl dark:bg-violet-500/20" />
      <div className="absolute bottom-16 left-1/3 h-52 w-52 rounded-full bg-cyan-200/35 blur-3xl dark:bg-cyan-400/20" />
    </motion.div>
  );
}

export default ParallaxLayer;
