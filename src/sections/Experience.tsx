import { SectionHeader } from '../components/SectionHeader';
import { experiences } from '../data/portfolio';

export const Experience = () => (
  <section id="experience" className="content-section experience-section">
    <SectionHeader
      eyebrow="Career"
      title="Experience shaped by shipping, testing, and integration."
      copy="A concise timeline of hands-on full stack development, AI integration, and deployment work."
    />
    <div className="timeline">
      {experiences.map((experience) => (
        <article className="timeline-item" key={`${experience.role}-${experience.period}`} data-reveal>
          <div className="timeline-marker" />
          <div>
            <div className="timeline-heading">
              <div>
                <h3>{experience.role}</h3>
                <p>{experience.company}</p>
              </div>
              <span>{experience.period}</span>
            </div>
            <ul>
              {experience.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  </section>
);
