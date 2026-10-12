import { memo, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLang } from '../i18n/context';
import { experience, education, pick } from '../data/cv';
import { SectionHeading } from './SectionHeading';
import { useReveal } from '../hooks/useReveal';
import { ChevronDownIcon, MapPinIcon } from './icons';

function TimelineBase() {
  const { t, lang } = useLang();
  const revealRef = useReveal<HTMLDivElement>();
  const [expanded, setExpanded] = useState<string | null>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const nodesRef = useRef<number[]>([]);
  const scrollerRef = useRef<HTMLElement | Window | null>(null);
  const rafRef = useRef(0);
  const activeRef = useRef(-1);
  const [doneUpTo, setDoneUpTo] = useState(-1);

  const trigger = useCallback(() => {
    const scroller = scrollerRef.current;
    if (scroller && scroller !== window) {
      const el = scroller as HTMLElement;
      return el.getBoundingClientRect().top + el.clientHeight / 2;
    }
    return window.innerHeight / 2;
  }, []);

  const apply = useCallback((line: number) => {
    const ol = listRef.current;
    if (!ol) return;
    const rect = ol.getBoundingClientRect();
    const fillStart = 8;
    const fillBottom = rect.height - 8;
    const fillEnd = Math.max(fillStart, Math.min(line - rect.top, fillBottom));
    const span = Math.max(fillBottom - fillStart, 1);
    ol.style.setProperty('--tl-progress', ((fillEnd - fillStart) / span).toFixed(4));
    ol.style.setProperty('--tl-fill', `${fillEnd.toFixed(1)}px`);

    let index = -1;
    nodesRef.current.forEach((center, i) => {
      if (center <= fillEnd) index = i;
    });
    if (index !== activeRef.current) {
      activeRef.current = index;
      setDoneUpTo(index);
    }
  }, []);

  const onScroll = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      apply(trigger());
    });
  }, [apply, trigger]);

  useLayoutEffect(() => {
    const ol = listRef.current;
    if (!ol) return;

    let scroller: HTMLElement | Window = window;
    let el: HTMLElement | null = ol.parentElement;
    while (el) {
      const style = getComputedStyle(el);
      if (
        /(auto|scroll|overlay)/.test(style.overflowY) &&
        el.scrollHeight > el.clientHeight &&
        el !== document.documentElement
      ) {
        scroller = el;
        break;
      }
      el = el.parentElement;
    }
    scrollerRef.current = scroller;

    const measure = () => {
      const olNow = listRef.current;
      if (!olNow) return;
      nodesRef.current = Array.from(
        olNow.querySelectorAll<HTMLLIElement>('li[data-state]'),
      ).map((li) => li.offsetTop + 15);
      apply(trigger());
    };

    measure();
    if (scroller === window) window.addEventListener('scroll', onScroll, { passive: true });
    else scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    const ro = new ResizeObserver(onScroll);
    ro.observe(ol);
    if (document.fonts) document.fonts.ready.then(onScroll).catch(() => undefined);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (scroller === window) window.removeEventListener('scroll', onScroll);
      else scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      ro.disconnect();
    };
  }, [apply, trigger, onScroll]);

  useEffect(() => {
    if (!listRef.current) return;
    requestAnimationFrame(onScroll);
  }, [expanded, onScroll]);

  const toggle = useCallback(
    (id: string) => setExpanded((current) => (current === id ? null : id)),
    [],
  );

  return (
    <section className="section-flow section-y border-t border-[var(--border)]">
      <div className="shell">
        <SectionHeading
          eyebrow={t.timeline.eyebrow}
          title={t.timeline.title}
          accent={t.timeline.title.split(' ').slice(-1)[0]}
          subtitle={t.timeline.subtitle}
        />

        <div ref={revealRef} className="mt-12 flex flex-col gap-5">
          <ol ref={listRef} className="timeline-ol relative flex flex-col gap-5">
            <span aria-hidden="true" className="timeline-track" />
            <span aria-hidden="true" className="timeline-fill" />
            <span aria-hidden="true" className="timeline-head" />
            {experience.map((job, index) => {
              const content = t.experienceContent[job.id];
              const isOpen = expanded === job.id;
              const panelId = `exp-${job.id}`;
              return (
                <li
                  key={job.id}
                  className="relative ps-8 sm:ps-12"
                  data-reveal
                  data-state={index < doneUpTo ? 'done' : index === doneUpTo ? 'active' : 'todo'}
                >
                  <span aria-hidden="true" className="timeline-node" />

                  <article className="card card-hover p-5 sm:p-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="text-lg">{content.role}</h3>
                      <span className="label mono-isolate">
                        {pick(job.start, lang)} — {job.current ? t.timeline.present : pick(job.end, lang)}
                      </span>
                    </div>

                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--text-muted)]">
                      <span>{content.company}</span>
                      <span className="inline-flex items-center gap-1 text-[var(--text-faint)]">
                        <MapPinIcon width={13} height={13} />
                        {pick(job.city, lang)}
                      </span>
                      {job.current ? (
                        <span className="chip border-[var(--accent-soft)] text-[var(--accent)] mono-isolate">
                          {t.timeline.present}
                        </span>
                      ) : null}
                    </div>

                    <p className="mt-3 text-sm text-[var(--text-muted)]">{content.summary}</p>

                    <button
                      type="button"
                      onClick={() => toggle(job.id)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="mt-4 inline-flex items-center gap-1 text-sm text-[var(--accent)]"
                    >
                      {isOpen ? t.timeline.less : t.timeline.more}
                      <ChevronDownIcon
                        width={15}
                        height={15}
                        style={{
                          transform: isOpen ? 'rotate(180deg)' : 'none',
                          transition: 'transform 180ms var(--ease-hover)',
                        }}
                      />
                    </button>

                    <div id={panelId} hidden={!isOpen} className="mt-3">
                      <ul className="flex flex-col gap-2">
                        {content.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-3 text-sm text-[var(--text-muted)]">
                            <span
                              className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[var(--accent)]"
                              aria-hidden="true"
                            />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>

          <div className="mt-8 flex flex-col gap-4" data-reveal>
            <div className="flex flex-col gap-1">
              <span className="label">{t.timeline.educationTitle}</span>
              <p className="text-sm text-[var(--text-faint)]">{t.timeline.educationSubtitle}</p>
            </div>

            <article className="card card-hover flex flex-col gap-4 p-5 sm:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg">{pick(education.institution, lang)}</h3>
                <span className="label mono-isolate">
                  {pick(education.start, lang)} — {pick(education.end, lang)}
                </span>
              </div>
              <p className="text-sm text-[var(--text-muted)]">{pick(education.degree, lang)}</p>

              <dl className="grid gap-4 sm:grid-cols-3">
                <div>
                  <dt className="label">{t.timeline.gradeLabel}</dt>
                  <dd className="mt-1 text-sm text-[var(--text)]">{pick(education.grade, lang)}</dd>
                </div>
                <div>
                  <dt className="label">{t.timeline.graduationProjectLabel}</dt>
                  <dd className="mt-1 text-sm text-[var(--text)]">
                    {pick(education.graduationProject, lang)}
                  </dd>
                </div>
                <div>
                  <dt className="label">{t.timeline.graduationGradeLabel}</dt>
                  <dd className="mt-1 text-sm text-[var(--accent)]">
                    {pick(education.graduationGrade, lang)}
                  </dd>
                </div>
              </dl>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

export const Timeline = memo(TimelineBase);
