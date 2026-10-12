import { memo, useMemo } from 'react';
import { useLang } from '../i18n/context';
import { stats } from '../data/cv';
import { Counter } from './Counter';
import { TechChip } from './TechChip';
import { useReveal } from '../hooks/useReveal';

const STACK_CHIPS = [
  'React',
  'TypeScript',
  'Next.js',
  'Node.js',
  'Express.js',
  'MongoDB',
  'Tailwind CSS',
  'GSAP',
];

function StatsStripBase() {
  const { t } = useLang();
  const revealRef = useReveal<HTMLDivElement>();

  const items = useMemo(
    () =>
      stats.map((stat) => {
        const label = t.stats.labels[stat.id as keyof typeof t.stats.labels];
        return { ...stat, label };
      }),
    [t],
  );

  return (
    <div ref={revealRef} className="shell pb-16 sm:pb-20">
      <div
        className="card grid grid-cols-2 gap-px overflow-hidden bg-[var(--border)] lg:grid-cols-4"
        role="list"
        aria-label={t.stats.title}
      >
        {items.map((item) => (
          <div key={item.id} className="card-hover bg-[var(--bg-elevated)] p-6 sm:p-8" role="listitem" data-reveal>
            <Counter
              value={item.value}
              suffix={item.suffix}
              prefix={item.prefix}
              className="block font-display text-4xl text-[var(--accent)] sm:text-5xl"
            />
            <p className="mt-2 text-sm text-[var(--text)]">{item.label.big}</p>
            <p className="mt-1 text-xs text-[var(--text-faint)]">{item.label.small}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3" data-reveal>
        <span className="label">{t.stats.stackLabel}</span>
        <ul className="flex flex-wrap gap-2">
          {STACK_CHIPS.map((chip) => (
            <TechChip key={chip} label={chip} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export const StatsStrip = memo(StatsStripBase);
