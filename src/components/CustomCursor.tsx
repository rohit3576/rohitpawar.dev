import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useMediaQuery } from '../hooks/useMediaQuery';

export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isTouch = useMediaQuery('(hover: none), (pointer: coarse)');

  useEffect(() => {
    if (isTouch || !dotRef.current || !ringRef.current) return;

    const dotX = gsap.quickTo(dotRef.current, 'x', { duration: 0.12, ease: 'power3.out' });
    const dotY = gsap.quickTo(dotRef.current, 'y', { duration: 0.12, ease: 'power3.out' });
    const ringX = gsap.quickTo(ringRef.current, 'x', { duration: 0.45, ease: 'power3.out' });
    const ringY = gsap.quickTo(ringRef.current, 'y', { duration: 0.45, ease: 'power3.out' });

    const onMove = (event: PointerEvent) => {
      dotX(event.clientX);
      dotY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);
    };

    const onEnter = (event: Event) => {
      const target = event.currentTarget as HTMLElement;
      const label = target.dataset.cursorLabel;
      document.body.dataset.cursor = label || 'hover';
    };

    const onLeave = () => {
      document.body.dataset.cursor = '';
    };

    const interactive = document.querySelectorAll<HTMLElement>('a, button, [data-cursor-label]');
    interactive.forEach((item) => {
      item.addEventListener('mouseenter', onEnter);
      item.addEventListener('mouseleave', onLeave);
    });
    window.addEventListener('pointermove', onMove);

    return () => {
      window.removeEventListener('pointermove', onMove);
      interactive.forEach((item) => {
        item.removeEventListener('mouseenter', onEnter);
        item.removeEventListener('mouseleave', onLeave);
      });
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      <div ref={ringRef} className="cursor cursor-ring" />
      <div ref={dotRef} className="cursor cursor-dot" />
    </>
  );
};
