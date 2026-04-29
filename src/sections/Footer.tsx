import { profile } from '../data/portfolio';

export const Footer = () => (
  <footer className="site-footer">
    <span>© 2026 {profile.name}</span>
    <a href="#hero">Back to top</a>
  </footer>
);
