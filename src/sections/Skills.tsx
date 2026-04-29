import { motion } from 'framer-motion';
import { SectionHeader } from '../components/SectionHeader';
import { skillCategories } from '../data/portfolio';

export const Skills = () => (
  <section id="skills" className="content-section skills-section">
    <SectionHeader
      eyebrow="What I Do"
      title="A practical stack for modern full stack products."
      copy="Frontend craft, backend delivery, and AI workflows come together in real projects."
    />
    <div className="skill-grid">
      {skillCategories.map((category, index) => {
        const Icon = category.icon;
        return (
          <motion.article
            className="skill-card"
            key={category.title}
            data-reveal
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          >
            <div className="card-topline">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <Icon size={22} />
            </div>
            <h3>{category.title}</h3>
            <p>{category.summary}</p>
            <div className="tag-list">
              {category.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </motion.article>
        );
      })}
    </div>
  </section>
);
