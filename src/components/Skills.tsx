import { memo, useMemo } from 'react';
import { useLang } from '../i18n/context';
import { certifications, pick, skillGroups } from '../data/cv';
import { SectionHeading } from './SectionHeading';
import { TechChip } from './TechChip';
import { useReveal } from '../hooks/useReveal';
import { CodeIcon } from './icons/tech';
import { skillGroupIcons } from '../lib/techIcons';

function SkillsBase() {
  const { t, lang } = useLang();
  const revealRef = useReveal<HTMLDivElement>();

  const groups = useMemo(
    () =>
      skillGroups.map((group) => ({
        ...group,
        title: t.skills.groups[group.id as keyof typeof t.skills.groups],
      })),
    [t],
  );

  return (
    <section className="section-flow section-y border-t border-[var(--border)]">
      <div className="shell">
        <SectionHeading
          eyebrow={t.skills.eyebrow}
          title={t.skills.title}
          accent={t.skills.title.split(' ').slice(-1)[0]}
          subtitle={t.skills.subtitle}
        />

        <div ref={revealRef} className="mt-12 grid gap-6 lg:grid-cols-3">
          {groups.map((group) => {
            const GroupIcon = skillGroupIcons[group.id] ?? CodeIcon;
            return (
              <article key={group.id} className="card card-hover flex flex-col gap-5 p-6 sm:p-7" data-reveal>
                <h3 className="flex items-center gap-2.5 text-lg">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-[var(--accent)]">
                    <GroupIcon width={16} height={16} />
                  </span>
                  {group.title}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <TechChip key={item} label={item} />
                  ))}
                </ul>
              </article>
            );
          })}

          <article
            className="card relative flex flex-col justify-between gap-6 overflow-hidden p-6 sm:p-7 lg:col-span-2"
            data-reveal
            style={{
              background:
                'linear-gradient(135deg, color-mix(in srgb, var(--accent) 10%, var(--bg-elevated)), var(--bg-elevated) 60%)',
            }}
          >
            <span
              className="pointer-events-none absolute -end-10 -top-10 h-40 w-40 rounded-full"
              style={{ background: 'radial-gradient(circle, var(--accent-glow), transparent 65%)', opacity: 0.4 }}
              aria-hidden="true"
            />
            <div className="relative flex flex-col gap-2">
              <span className="label">{t.skills.certificationTitle}</span>
            </div>
            <div className="relative grid gap-6 sm:grid-cols-2">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex flex-col gap-2">
                  <h3 className="display-title" style={{ fontSize: 'clamp(1.35rem, 2.5vw, 1.9rem)' }}>
                    {pick(cert.label, lang)}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-[var(--text-muted)]">
                    <span>{pick(cert.issuer, lang)}</span>
                    {cert.year ? (
                      <span className="label mono-isolate">
                        {t.skills.issued} {pick(cert.year, lang)}
                      </span>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export const Skills = memo(SkillsBase);
