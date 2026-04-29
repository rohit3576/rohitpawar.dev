import { lazy, Suspense } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { Loader } from '../components/Loader';
import { stackHighlights, techStack } from '../data/portfolio';

const TechOrbitScene = lazy(() =>
  import('../components/three/TechOrbitScene').then((module) => ({ default: module.TechOrbitScene })),
);

export const TechStack = () => (
  <section id="stack" className="content-section stack-section">
    <SectionHeader
      eyebrow="Tech Stack"
      title="Interactive orbit of the tools I use."
      copy="A lightweight React Three Fiber scene keeps the stack tactile without dragging down performance."
    />
    <div className="stack-layout">
      <div className="stack-visual" data-reveal>
        <Suspense fallback={<Loader />}>
          <TechOrbitScene />
        </Suspense>
      </div>
      <div className="stack-content">
        {stackHighlights.map((item) => {
          const Icon = item.icon;
          return (
            <div className="stack-highlight" key={item.label} data-reveal>
              <Icon size={18} />
              <span>{item.label}</span>
            </div>
          );
        })}
        <div className="stack-cloud" data-reveal>
          {techStack.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      </div>
    </div>
  </section>
);
