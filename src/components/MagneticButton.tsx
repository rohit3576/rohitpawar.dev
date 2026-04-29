import { type MouseEvent, type ReactNode, useRef } from 'react';
import gsap from 'gsap';

type MagneticButtonProps = {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'ghost';
  download?: boolean;
};

export const MagneticButton = ({ href, children, variant = 'primary', download }: MagneticButtonProps) => {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMouseMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    gsap.to(element, { x: x * 0.18, y: y * 0.28, duration: 0.35, ease: 'power3.out' });
  };

  const onMouseLeave = () => {
    if (ref.current) gsap.to(ref.current, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1, 0.45)' });
  };

  return (
    <a
      ref={ref}
      className={`magnetic-button ${variant}`}
      href={href}
      download={download}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </a>
  );
};
