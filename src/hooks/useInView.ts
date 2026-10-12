import { useEffect, useRef, useState } from 'react';

interface InViewOptions {
  /** Fire once and stop observing (default true). */
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
}

/**
 * Lightweight IntersectionObserver hook. Returns a ref to attach and whether
 * the element has entered the viewport. Falls back to "visible" when the API
 * is unavailable (SSR / very old browsers).
 */
export function useInView<T extends HTMLElement = HTMLDivElement>({
  once = true,
  rootMargin = '0px 0px -12% 0px',
  threshold = 0.15,
}: InViewOptions = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return { ref, inView };
}
