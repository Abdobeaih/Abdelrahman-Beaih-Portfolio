import { useCallback, useRef, type MouseEvent } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * Magnetic hover: nudges an element up to `strength` px toward the cursor,
 * then releases on leave. Transform-only, disabled under reduced motion.
 * Returns a ref to attach to a wrapping element.
 */
export function useMagnetic<T extends HTMLElement = HTMLElement>(strength = 6) {
  const ref = useRef<T | null>(null);
  const reduced = useReducedMotion();

  const onMouseMove = useCallback(
    (event: MouseEvent<T>) => {
      const el = ref.current;
      if (!el || reduced) return;
      const rect = el.getBoundingClientRect();
      const relX = (event.clientX - rect.left) / rect.width - 0.5;
      const relY = (event.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `translate3d(${relX * strength * 2}px, ${relY * strength * 2}px, 0)`;
    },
    [reduced, strength],
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate3d(0, 0, 0)';
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
