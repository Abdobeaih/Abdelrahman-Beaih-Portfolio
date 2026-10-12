import { memo, useEffect, useRef, useState } from 'react';
import { useInView } from '../hooks/useInView';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  /** Total count-up duration in seconds. */
  duration?: number;
  className?: string;
}

function format(n: number) {
  return n.toLocaleString('en-US');
}

/**
 * Serif accent number that counts up the first time it scrolls into view.
 * Falls back to the final value instantly under reduced motion.
 */
export const Counter = memo(function Counter({
  value,
  suffix = '',
  prefix = '',
  duration = 1.4,
  className = '',
}: CounterProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.4 });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(0);
  const frame = useRef<number>();

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }

    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);

    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [inView, reduced, value, duration]);

  return (
    <span ref={ref} className={className}>
      <span className="mono-isolate">
        {prefix}
        {format(display)}
        {suffix}
      </span>
    </span>
  );
});
