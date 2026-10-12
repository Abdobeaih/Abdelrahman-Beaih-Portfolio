import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { useReducedMotion } from './useReducedMotion';

interface RevealOptions {
  /** Selector for children to stagger (default: `[data-reveal]`). */
  selector?: string;
  y?: number;
  duration?: number;
  stagger?: number;
  start?: string;
}

/**
 * Single reusable GSAP ScrollTrigger reveal. Animates `transform` only, fires
 * once, and is completely skipped when reduced motion is on. Opacity is never
 * touched so content is always fully visible (no reveal can leave it hidden).
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>({
  selector = '[data-reveal]',
  y = 24,
  duration = 0.6,
  stagger = 0.08,
  start = 'top 82%',
}: RevealOptions = {}) {
  const ref = useRef<T | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const targets = el.querySelectorAll(selector);
    if (targets.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        y,
        duration,
        stagger,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start, once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [reduced, selector, y, duration, stagger, start]);

  return ref;
}
