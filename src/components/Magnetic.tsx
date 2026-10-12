import type { ReactNode } from 'react';
import { useMagnetic } from '../hooks/useMagnetic';

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

/** Wraps a control and gives it a subtle cursor-following pull. */
export function Magnetic({ children, className, strength = 6 }: MagneticProps) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic<HTMLSpanElement>(strength);
  return (
    <span
      ref={ref}
      className={className}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ display: 'inline-flex', willChange: 'transform', transition: 'transform 180ms ease-out' }}
    >
      {children}
    </span>
  );
}
