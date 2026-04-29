import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navItems, profile } from '../data/portfolio';
import { useActiveSection } from '../hooks/useActiveSection';
import { slug } from '../utils/slug';

const SCROLL_RESET_MS = 520;

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [currentActiveId, setCurrentActiveId] = useState('');
  const navLinks = useMemo(() => navItems.map((item) => ({ label: item, id: slug(item) })), []);
  const sectionIds = useMemo(() => ['hero', ...navLinks.map((item) => item.id)], [navLinks]);
  const observedActiveId = useActiveSection(sectionIds);
  const navigationTimer = useRef<number | null>(null);
  const hasScrolledRef = useRef(false);
  const isNavigatingRef = useRef(false);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  const scrollToSection = useCallback(
    (id: string) => {
      const target = document.getElementById(id);
      if (!target) return;

      setIsNavigating(true);
      isNavigatingRef.current = true;
      setCurrentActiveId(id);
      closeMenu();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', id === 'hero' ? window.location.pathname : `#${id}`);

      if (navigationTimer.current) window.clearTimeout(navigationTimer.current);
      navigationTimer.current = window.setTimeout(() => {
        isNavigatingRef.current = false;
        setIsNavigating(false);
      }, SCROLL_RESET_MS);
    },
    [closeMenu],
  );

  useEffect(() => {
    const controller = new AbortController();
    const updateScrolled = () => {
      const nextHasScrolled = window.scrollY > 12;
      if (hasScrolledRef.current === nextHasScrolled) return;
      hasScrolledRef.current = nextHasScrolled;
      setHasScrolled(nextHasScrolled);
    };

    updateScrolled();
    window.addEventListener('scroll', updateScrolled, { passive: true, signal: controller.signal });
    window.addEventListener(
      'keydown',
      (event) => {
        if (event.key === 'Escape') closeMenu();
      },
      { signal: controller.signal },
    );

    return () => {
      controller.abort();
      if (navigationTimer.current) window.clearTimeout(navigationTimer.current);
    };
  }, [closeMenu]);

  useEffect(() => {
    if (isNavigatingRef.current) return;
    setCurrentActiveId(observedActiveId);
  }, [observedActiveId]);

  return (
    <header
      className={`site-header${hasScrolled ? ' is-scrolled' : ''}${isMenuOpen ? ' is-menu-open' : ''}${
        isNavigating ? ' is-navigating' : ''
      }`}
    >
      <a
        className="brand"
        href="#hero"
        aria-label="Rohit Pawar home"
        onClick={(event) => {
          event.preventDefault();
          scrollToSection('hero');
        }}
      >
        RP
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isMenuOpen}
        aria-controls="primary-navigation"
        onClick={() => setIsMenuOpen((current) => !current)}
      >
        {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      <nav id="primary-navigation" className={isMenuOpen ? 'is-open' : ''} aria-label="Primary navigation">
        {navLinks.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={currentActiveId === item.id ? 'is-active' : ''}
            aria-current={currentActiveId === item.id ? 'page' : undefined}
            onClick={(event) => {
              event.preventDefault();
              scrollToSection(item.id);
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <a className="header-contact" href={`mailto:${profile.email}`} onClick={closeMenu}>
        Email
      </a>
    </header>
  );
};
