import { memo, type ReactNode } from 'react';
import { useInView } from '../hooks/useInView';

interface DeferSectionProps {
  children: ReactNode;
  /** Anchor id, kept on the wrapper so nav links/scroll-spy work before mount. */
  id?: string;
  /** Placeholder height so the page keeps its scroll length before mount. */
  minHeight?: number;
  /** Preload distance before the section enters the viewport. */
  rootMargin?: string;
}

/**
 * Defers mounting (and therefore code-splitting downloads + render work) of a
 * below-the-fold section until it scrolls near the viewport. Keeps the initial
 * main-thread cost to only what is actually visible.
 */
function DeferSectionBase({
  children,
  id,
  minHeight = 360,
  rootMargin = '200px 0px',
}: DeferSectionProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ rootMargin, threshold: 0 });

  return (
    <div ref={ref} id={id} className="scroll-mt-20" style={inView ? undefined : { minHeight }}>
      {inView ? children : null}
    </div>
  );
}

export const DeferSection = memo(DeferSectionBase);
