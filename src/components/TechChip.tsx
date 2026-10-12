import { memo } from 'react';
import { getTechIcon } from '../lib/techIcons';

interface TechChipProps {
  /** Technology label as written in `cv.ts`. */
  label: string;
  /** Element to render — list items inside `<ul>`, spans elsewhere. */
  as?: 'li' | 'span';
  className?: string;
  /** Hide from assistive tech (used for the duplicated marquee half). */
  ariaHidden?: boolean;
}

/**
 * A `.chip` for a technology. When the label maps to a known icon the mark is
 * shown before the text in the accent colour; unknown labels render text only.
 */
export const TechChip = memo(function TechChip({
  label,
  as = 'li',
  className,
  ariaHidden,
}: TechChipProps) {
  const Icon = getTechIcon(label);
  const classes = `chip mono-isolate ${className ?? ''}`.trim();
  const content = (
    <>
      {Icon ? (
        <Icon width={14} height={14} className="shrink-0 text-[var(--accent)]" aria-hidden="true" />
      ) : null}
      {label}
    </>
  );

  if (as === 'span') {
    return (
      <span className={classes} aria-hidden={ariaHidden || undefined}>
        {content}
      </span>
    );
  }
  return <li className={classes}>{content}</li>;
});
