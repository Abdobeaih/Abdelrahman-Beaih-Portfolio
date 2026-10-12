import { memo } from 'react';
import { TechChip } from './TechChip';

interface MarqueeProps {
  items: string[];
  /** Visible copy of the label for screen readers. */
  ariaLabel: string;
}

/**
 * Infinite horizontal keyword loop. The track is duplicated once and translated
 * -50% via CSS keyframes; hover pauses it. Purely decorative for AT.
 */
export const Marquee = memo(function Marquee({ items, ariaLabel }: MarqueeProps) {
  const track = [...items, ...items];
  return (
    <div className="marquee relative overflow-hidden py-2" role="group" aria-label={ariaLabel}>
      <div className="marquee-track gap-3">
        {track.map((item, index) => (
          <TechChip
            key={`${item}-${index}`}
            as="span"
            label={item}
            ariaHidden={index >= items.length}
          />
        ))}
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 start-0 w-16"
        style={{ background: 'linear-gradient(to right, var(--bg), transparent)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 end-0 w-16"
        style={{ background: 'linear-gradient(to left, var(--bg), transparent)' }}
      />
    </div>
  );
});
