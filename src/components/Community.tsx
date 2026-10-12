import { memo } from 'react';
import { useLang } from '../i18n/context';
import { education, marqueeKeywords, pick, profile } from '../data/cv';
import { SectionHeading } from './SectionHeading';
import { Marquee } from './Marquee';
import { useReveal } from '../hooks/useReveal';
import { SparkIcon, MapPinIcon } from './icons';

function CommunityBase() {
  const { t, lang } = useLang();
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <section className="section-flow section-y border-t border-[var(--border)]">
      <div className="shell">
        <SectionHeading
          eyebrow={t.community.eyebrow}
          title={t.community.title}
          accent={t.community.title.split(' ').slice(-1)[0]}
          subtitle={t.community.subtitle}
        />

        <div ref={revealRef} className="mt-12 grid gap-6 lg:grid-cols-3">
          <article
            className="card card-hover flex flex-col gap-4 p-6 sm:p-7 lg:col-span-2"
            data-reveal
          >
            <span className="label">{t.timeline.graduationProjectLabel}</span>
            <h3 className="display-title" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}>
              {pick(education.graduationProject, lang)}
            </h3>
            <p className="text-[var(--text-muted)]">
              {pick(education.institution, lang)} · {pick(education.degree, lang)}
            </p>
            <div className="mt-auto flex flex-wrap items-center gap-3">
              <span className="chip border-[var(--accent-soft)] text-[var(--accent)]">
                <SparkIcon width={14} height={14} />
                {t.timeline.graduationGradeLabel}: {pick(education.graduationGrade, lang)}
              </span>
              <span className="chip mono-isolate">
                {pick(education.start, lang)} — {pick(education.end, lang)}
              </span>
            </div>
          </article>

          <article
            className="card card-hover flex flex-col justify-between gap-4 p-6 sm:p-7"
            data-reveal
            style={{
              background:
                'linear-gradient(160deg, color-mix(in srgb, var(--accent) 9%, var(--bg-elevated)), var(--bg-elevated) 65%)',
            }}
          >
            <div className="flex flex-col gap-2">
              <span className="label">{t.skills.certificationTitle}</span>
              <h3 className="text-lg leading-snug">{t.skills.certificationLabel}</h3>
              <p className="text-sm text-[var(--text-muted)]">{t.skills.certificationIssuer}</p>
            </div>
            <span className="label mono-isolate">
              {t.skills.issued} {t.skills.certificationYear}
            </span>
          </article>

          <article className="card flex flex-col gap-3 p-6 sm:p-7 lg:col-span-3" data-reveal>
            <span className="label">{t.contact.location}</span>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="inline-flex items-center gap-2 text-[var(--text)]">
                <MapPinIcon width={16} height={16} />
                {profile.location[lang]}
              </span>
              <span className="text-sm text-[var(--text-muted)]">{t.hero.availability}</span>
            </div>
          </article>
        </div>

        <div className="mt-10" data-reveal>
          <Marquee items={marqueeKeywords} ariaLabel={t.community.marqueeLabel} />
        </div>
      </div>
    </section>
  );
}

export const Community = memo(CommunityBase);
