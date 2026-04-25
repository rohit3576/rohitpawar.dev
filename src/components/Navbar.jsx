import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

function Navbar({ sections, activeSection, onNavigate, isDark, onToggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (id) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed left-1/2 top-4 z-50 w-[95%] max-w-5xl -translate-x-1/2 rounded-2xl border border-slate-200/70 bg-white/75 px-4 py-3 shadow-lg shadow-slate-900/10 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/70 dark:shadow-black/20"
    >
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => handleNavigate("home")}
          className="text-sm font-semibold tracking-wide text-slate-800 dark:text-slate-100"
        >
          Rohit Pawar
        </button>
        <nav className="hidden items-center gap-5 md:flex">
          {sections.map((section) => (
            <button
              type="button"
              key={section.id}
              onClick={() => handleNavigate(section.id)}
              className={`text-sm transition-colors duration-300 ${
                activeSection === section.id
                  ? "text-blue-600 dark:text-blue-300"
                  : "text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-300"
              }`}
            >
              {section.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300/80 text-slate-700 dark:border-slate-600/80 dark:text-slate-200 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <span className="text-sm font-semibold">{isOpen ? "Close" : "Menu"}</span>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mt-3 space-y-2 rounded-xl border border-slate-200/70 bg-white/90 p-3 dark:border-slate-700/70 dark:bg-slate-900/90 md:hidden"
          >
            {sections.map((section) => (
              <button
                type="button"
                key={section.id}
                onClick={() => handleNavigate(section.id)}
                className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  activeSection === section.id
                    ? "bg-blue-50 text-blue-600 dark:bg-slate-800 dark:text-blue-300"
                    : "text-slate-600 hover:bg-slate-100 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-300"
                }`}
              >
                {section.label}
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;
