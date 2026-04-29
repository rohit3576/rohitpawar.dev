import { ArrowUpRight, Download } from 'lucide-react';
import { MagneticButton } from '../components/MagneticButton';
import { SectionHeader } from '../components/SectionHeader';
import { contactItems, profile } from '../data/portfolio';

export const Contact = () => (
  <section id="contact" className="content-section contact-section">
    <SectionHeader
      eyebrow="Contact"
      title="Let’s build something useful and polished."
      copy="Available for full stack, frontend, AI-integrated products, and internship or freelance opportunities."
    />
    <div className="contact-panel" data-reveal>
      <div>
        <h3>{profile.name}</h3>
        <p>{profile.title}</p>
      </div>
      <div className="contact-links">
        {contactItems.map((item) => {
          const Icon = item.icon;
          return (
            <a key={item.label} href={item.href}>
              <Icon size={18} />
              <span>{item.label}</span>
              <ArrowUpRight size={15} />
            </a>
          );
        })}
      </div>
      <div className="contact-actions">
        <MagneticButton href={`mailto:${profile.email}`}>Start a conversation</MagneticButton>
        <MagneticButton href={profile.resume} variant="ghost" download>
          Download resume <Download size={16} />
        </MagneticButton>
      </div>
    </div>
  </section>
);
