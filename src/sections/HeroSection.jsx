import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { useResponsive } from "../hooks/useResponsive";

const HeroAvatarScene = lazy(() => import("../components/HeroAvatarScene"));

function HeroSection({ data, onNavigate }) {
  const { isMobile } = useResponsive();

  return (
    <section id="home" className="relative mb-20 min-h-[78vh] scroll-mt-28 pt-14 sm:mb-24 sm:min-h-[84vh] sm:pt-20">
      <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-slate-400">
            {data.location}
          </p>
          <p className="mb-2 text-base text-slate-700 dark:text-slate-200 sm:text-lg">{data.name}</p>
          <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl">
            Full Stack & AI Developer
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base md:text-lg">
            I design and build premium digital products with clean architecture, polished interfaces, and AI-driven workflows that solve practical business problems.
          </p>
          <div className="mt-8 flex flex-wrap gap-2 sm:gap-3">
            {["Frontend", "Backend", "AI/ML", "APIs", "UX Focused"].map((label) => (
              <motion.span
                key={label}
                whileHover={{ y: -2, scale: 1.02 }}
                className="rounded-full border border-slate-200/80 bg-white/75 px-3 py-1 text-xs text-slate-700 backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/60 dark:text-slate-200"
              >
                {label}
              </motion.span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onNavigate("work")}
              className="rounded-full bg-blue-500 px-5 py-3 text-sm font-medium text-slate-950 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-400/35"
            >
              View Work
            </button>
            <a
              href={data.resumeUrl}
              download
              className="rounded-full border border-slate-200/80 bg-white/75 px-5 py-3 text-sm font-medium text-slate-700 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-600/80 dark:bg-slate-900/60 dark:text-slate-100"
            >
              Download Resume
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          whileHover={{ scale: 1.015 }}
          className="group relative h-72 overflow-hidden rounded-3xl border border-slate-200/80 bg-white/70 shadow-2xl shadow-slate-900/10 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/55 dark:shadow-black/30 sm:h-96"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 via-transparent to-violet-500/15" />
          <div className="pointer-events-none absolute inset-x-8 top-8 h-28 rounded-full bg-blue-400/20 blur-3xl" />
          <Suspense fallback={null}>
            <HeroAvatarScene isMobile={isMobile} />
          </Suspense>
          <div className="absolute bottom-6 right-6 h-20 w-20 rounded-full border border-slate-300/80 bg-white/65 backdrop-blur transition-transform duration-300 group-hover:scale-105 dark:border-slate-600/80 dark:bg-slate-800/70">
            <span className="flex h-full items-center justify-center text-xs uppercase tracking-[0.18em] text-slate-700 dark:text-slate-300">AI</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
