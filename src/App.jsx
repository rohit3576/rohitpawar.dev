import { Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";
import Lenis from "lenis";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import AboutSection from "./sections/AboutSection";
import ContactSection from "./sections/ContactSection";
import ExperienceSection from "./sections/ExperienceSection";
import HeroSection from "./sections/HeroSection";
import ProcessSection from "./sections/ProcessSection";
import ProjectsSection from "./sections/ProjectsSection";
import SkillsSection from "./sections/SkillsSection";
import { portfolioData } from "./data/portfolioData";
import { useResponsive } from "./hooks/useResponsive";

const ThreeScene = lazy(() => import("./components/ThreeScene"));

function App() {
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.localStorage.getItem("portfolio-theme") === "dark";
  });
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgressValue, setScrollProgressValue] = useState(0);
  const lenisRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { isMobile, isDesktop } = useResponsive();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 22, mass: 0.55 });
  const yBack = useTransform(smoothProgress, [0, 1], ["0%", isMobile ? "-8%" : "-16%"]);
  const yMid = useTransform(smoothProgress, [0, 1], ["0%", isMobile ? "-4%" : "-10%"]);
  const yFront = useTransform(smoothProgress, [0, 1], ["0%", isMobile ? "-2%" : "-5%"]);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) {
      return undefined;
    }

    const lenis = new Lenis({
      duration: isMobile ? 0.75 : 1.1,
      smoothWheel: true,
      wheelMultiplier: isMobile ? 0.78 : 0.9,
      touchMultiplier: 1,
      anchors: false,
    });
    lenisRef.current = lenis;

    let frameId = 0;
    const raf = (time) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(raf);
    };
    frameId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frameId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isMobile, shouldReduceMotion]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    window.localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (value) => {
      setScrollProgressValue(value);
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  useEffect(() => {
    const targets = ["home", "about", "work", "skills", "process", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target?.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.2, 0.4, 0.6] },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const navLinks = useMemo(
    () => [
      { id: "home", label: "Home" },
      { id: "about", label: "About" },
      { id: "work", label: "Work" },
      { id: "contact", label: "Contact" },
    ],
    [],
  );

  const handleNavigate = (id) => {
    const target = document.getElementById(id);
    if (!target) {
      return;
    }
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        offset: -88,
        duration: isMobile ? 1 : 1.25,
        easing: (t) => 1 - Math.pow(1 - t, 3),
      });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-50 text-slate-900 transition-colors duration-500 dark:bg-slate-950 dark:text-slate-100">
      <motion.div style={{ y: yBack }} className="pointer-events-none fixed inset-0 -z-30 opacity-90 dark:opacity-70">
        <Suspense fallback={null}>
          <ThreeScene scrollProgress={scrollProgressValue} isMobile={isMobile} isDesktop={isDesktop} />
        </Suspense>
      </motion.div>

      <motion.div style={{ y: yMid }} className="pointer-events-none fixed inset-0 -z-20">
        <motion.div
          animate={{
            x: [0, 14, -8, 0],
            y: [0, -12, 8, 0],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-blue-500/20 blur-[120px] dark:bg-blue-500/25"
        />
        <motion.div
          animate={{
            x: [0, -10, 12, 0],
            y: [0, 8, -10, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-0 top-32 h-[30rem] w-[30rem] rounded-full bg-violet-400/15 blur-[130px] dark:bg-violet-500/20"
        />
      </motion.div>

      <motion.div
        style={{ y: yFront }}
        className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:20%_100%] opacity-20 dark:opacity-30"
      />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-white/75 via-white/45 to-slate-50/90 dark:from-slate-950/55 dark:via-slate-950/55 dark:to-slate-950/85" />

      <Navbar
        sections={navLinks}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
      />

      <main className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-24 pt-24 sm:px-8 lg:px-12">
        <HeroSection data={portfolioData} onNavigate={handleNavigate} />
        <AboutSection data={portfolioData} />
        <ProjectsSection data={portfolioData} />
        <SkillsSection data={portfolioData} />
        <ExperienceSection data={portfolioData} />
        <ProcessSection data={portfolioData} />
        <ContactSection data={portfolioData} />
      </main>
    </div>
  );
}

export default App;
