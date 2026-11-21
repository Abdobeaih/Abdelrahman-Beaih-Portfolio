import { memo } from 'react';
import { useLang } from '../i18n/context';
import { profile } from '../data/cv';
import { useReveal } from '../hooks/useReveal';
import { QuoteIcon } from './icons';

function PhilosophyBase() {
  const { t, lang } = useLang();
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <section className="section-flow section-y border-t border-[var(--border)]" aria-labelledby="philosophy-heading">
      <div ref={revealRef} className="shell">
        <span className="label" data-reveal>
          {t.philosophy.eyebrow}
        </span>

        <div className="mt-6 grid items-center gap-12 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
          <figure className="flex flex-col gap-6" data-reveal>
            <QuoteIcon width={40} height={40} className="text-[var(--accent)] opacity-70" />
            <blockquote
              id="philosophy-heading"
              className="max-w-4xl"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 4vw, 3.25rem)',
                lineHeight: 1.15,
                letterSpacing: '-0.01em',
              }}
            >
              {t.philosophy.quote}
            </blockquote>
          </figure>

          <div className="portrait-frame" data-reveal>
            <img
              src="/portrait.jpg"
              alt={profile.display[lang]}
              className="portrait-img"
              loading="lazy"
            />
            <span className="portrait-caption mono-isolate">
              <span className="flow-dot h-1.5 w-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
              {profile.display[lang]} · {t.hero.eyebrow}
            </span>
          </div>
        </div>

        <ol className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {t.philosophy.steps.map((step, index) => (
            <li key={step.title} className="flex flex-col gap-3" data-reveal>
              <span
                className="font-display text-3xl text-[var(--accent)]"
                aria-hidden="true"
              >
                <span className="mono-isolate">{String(index + 1).padStart(2, '0')}</span>
              </span>
              <h3 className="text-base text-[var(--text)]">{step.title}</h3>
              <p className="text-sm text-[var(--text-muted)]">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export const Philosophy = memo(PhilosophyBase);
