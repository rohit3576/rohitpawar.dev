import { lazy, Suspense } from 'react';
import { ArrowDown, Download, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { profile, utilityStats } from '../data/portfolio';
import { AnimatedTitle } from '../components/AnimatedTitle';
import { Loader } from '../components/Loader';
import { MagneticButton } from '../components/MagneticButton';

const HeroScene = lazy(() => import('../components/three/HeroScene').then((module) => ({ default: module.HeroScene })));

export const Hero = () => (
  <section id="hero" className="hero-section">
    <div className="hero-copy">
      <motion.span
        className="eyebrow"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        Portfolio / 2026
      </motion.span>
      <motion.h1
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {profile.name}
      </motion.h1>
      <motion.p
        className="hero-role"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.22 }}
      >
        Full Stack & AI <AnimatedTitle />
      </motion.p>
      <motion.p
        className="hero-intro"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.34 }}
      >
        {profile.intro}
      </motion.p>
      <motion.div
        className="hero-actions"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.48 }}
      >
        <MagneticButton href="#projects">
          View Work <ArrowDown size={16} />
        </MagneticButton>
        <MagneticButton href={`mailto:${profile.email}`} variant="ghost">
          Contact <Mail size={16} />
        </MagneticButton>
        <MagneticButton href={profile.resume} variant="ghost" download>
          Resume <Download size={16} />
        </MagneticButton>
      </motion.div>
      <div className="hero-stats" aria-label="Highlights">
        {utilityStats.map((stat) => (
          <div key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
    <div className="hero-visual" data-parallax>
      <Suspense fallback={<Loader />}>
        <HeroScene />
      </Suspense>
    </div>
  </section>
);
