import { motion } from "framer-motion";

function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Toggle dark mode"
      className="relative h-10 w-20 rounded-full border border-slate-300/70 bg-white/70 p-1 shadow-lg backdrop-blur dark:border-slate-600/70 dark:bg-slate-900/70"
    >
      <motion.span
        className="absolute left-1 top-1 h-8 w-8 rounded-full bg-gradient-to-br from-slate-100 to-slate-300 shadow-md dark:from-blue-300 dark:to-blue-500"
        animate={{ x: isDark ? 40 : 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
      />
      <span className="relative z-10 flex h-full items-center justify-between px-2 text-xs text-slate-600 dark:text-slate-200">
        <span>Sun</span>
        <span>Moon</span>
      </span>
    </button>
  );
}

export default ThemeToggle;
