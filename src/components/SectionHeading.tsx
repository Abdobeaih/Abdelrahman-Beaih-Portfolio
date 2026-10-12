import { Fragment } from 'react';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  /** A word inside `title` to render in the accent color. */
  accent?: string;
  subtitle?: string;
  align?: 'start' | 'center';
  className?: string;
}

/** Splits a heading around the first accent word, painting it gold. */
function renderTitle(title: string, accent?: string) {
  if (!accent) return title;
  const at = title.indexOf(accent);
  if (at === -1) return title;
  return (
    <Fragment>
      {title.slice(0, at)}
      <span className="gold">{accent}</span>
      {title.slice(at + accent.length)}
    </Fragment>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  subtitle,
  align = 'start',
  className = '',
}: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <header
      className={`flex flex-col gap-4 ${centered ? 'items-center text-center' : 'items-start'} ${className}`}
    >
      <span className="label" data-reveal>
        {eyebrow}
      </span>
      <h2 className="display-title max-w-3xl" data-reveal>
        {renderTitle(title, accent)}
      </h2>
      {subtitle ? (
        <p
          className={`max-w-2xl text-[var(--text-muted)] ${centered ? 'mx-auto' : ''}`}
          data-reveal
        >
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}
