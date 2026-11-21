import { memo, type CSSProperties } from 'react';
import { useLang } from '../i18n/context';

const STACK = ['React', 'Next.js', 'Node.js', 'NestJS', 'TypeScript', 'MongoDB'];

/**
 * Rotating tech-stack words under the hero name.
 * Pure CSS flip animation (see index.css .stack-flip); honors
 * prefers-reduced-motion by falling back to a static inline list.
 */
function StackRotatorBase() {
  const { t } = useLang();

  return (
    <div
      className="hero-in flex items-baseline gap-2 text-lg sm:text-xl"
      style={{ '--d': '140ms' } as CSSProperties}
      aria-label={`${t.hero.stackLabel} ${STACK.join(', ')}`}
    >
      <span className="text-[var(--text-muted)]">{t.hero.stackLabel}</span>
      {/* Animated flip (hidden when reduced motion is preferred) */}
      <span
        aria-hidden="true"
        className="stack-flip font-display gold"
        dir="ltr"
        lang="en"
      >
        {/* invisible sizer keeps the container as wide as the longest word */}
        <span className="stack-flip-sizer" aria-hidden="true">
          TypeScript
        </span>
        {STACK.map((tech, i) => (
          <span key={tech} className="stack-flip-word" style={{ '--i': i } as CSSProperties}>
            {tech}
          </span>
        ))}
      </span>
      {/* Static fallback, shown only under prefers-reduced-motion */}
      <span className="stack-static font-display gold" dir="ltr" lang="en">
        {STACK.join(' · ')}
      </span>
    </div>
  );
}

export const StackRotator = memo(StackRotatorBase);
