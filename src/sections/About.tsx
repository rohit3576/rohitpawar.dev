import { SectionHeader } from '../components/SectionHeader';
import { profile } from '../data/portfolio';

export const About = () => (
  <section id="about" className="content-section about-section">
    <SectionHeader
      eyebrow="About"
      title="Building deployable products across web and AI."
      copy="I like systems that are clear enough to maintain and polished enough to feel effortless."
    />
    <div className="about-grid">
      <p data-reveal>{profile.intro}</p>
      <div className="about-card" data-reveal>
        <span>Education</span>
        <strong>{profile.education.degree}</strong>
        <p>{profile.education.school}</p>
        <small>{profile.education.year}</small>
      </div>
      <div className="about-card accent" data-reveal>
        <span>Recognition</span>
        <strong>{profile.achievement}</strong>
      </div>
    </div>
  </section>
);
