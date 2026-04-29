import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/SectionHeader';
import { projects } from '../data/portfolio';

export const Projects = () => (
  <section id="projects" className="content-section projects-section">
    <SectionHeader
      eyebrow="Projects"
      title="Selected work with deployable, real-world intent."
      copy="Each project is framed around practical product behavior, clean interfaces, and AI or web systems that can ship."
    />
    <div className="project-track" aria-label="Selected projects">
      {projects.map((project, index) => (
        <motion.article
          className="project-card"
          key={project.title}
          data-reveal
          whileHover={{ y: -10 }}
          transition={{ type: 'spring', stiffness: 240, damping: 22 }}
        >
          <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="tag-list">
            {project.tech.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
          <a href={project.href} className="project-link" data-cursor-label="Open">
            {project.linkLabel} <ArrowUpRight size={16} />
          </a>
        </motion.article>
      ))}
    </div>
  </section>
);
