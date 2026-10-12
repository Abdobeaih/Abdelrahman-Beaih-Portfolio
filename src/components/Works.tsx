import { memo, useCallback, useState } from 'react';
import { useLang } from '../i18n/context';
import { projects } from '../data/cv';
import { SectionHeading } from './SectionHeading';
import { ProjectCover } from './ProjectCover';
import { ProjectModal } from './ProjectModal';
import { TechChip } from './TechChip';
import { useReveal } from '../hooks/useReveal';
import { ArrowUpRightIcon, GitHubIcon } from './icons';

function WorksBase() {
  const { t } = useLang();
  const revealRef = useReveal<HTMLDivElement>();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const open = useCallback((index: number) => setOpenIndex(index), []);
  const close = useCallback(() => setOpenIndex(null), []);

  return (
    <section className="section-flow section-y border-t border-[var(--border)]">
      <div className="shell">
        <SectionHeading
          eyebrow={t.works.eyebrow}
          title={t.works.title}
          accent={t.works.title.split(' ').slice(-1)[0]}
          subtitle={t.works.subtitle}
        />

        <div
          ref={revealRef}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, index) => {
            const content = t.projectContent[project.id];
            return (
              <article key={project.id} className="card card-hover group flex flex-col overflow-hidden" data-reveal>
                <button
                  type="button"
                  onClick={() => open(index)}
                  className="block w-full text-start"
                  aria-label={`${t.works.details} — ${project.name}`}
                >
                  <ProjectCover
                    project={project}
                    alt=""
                    className="transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                </button>

                <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg leading-snug">{project.name}</h3>
                    <span className="label mono-isolate pt-1">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <p className="text-sm text-[var(--text-muted)]">{content.tagline}</p>

                  <ul className="flex flex-wrap gap-2">
                    {project.stack.slice(0, 4).map((tech) => (
                      <TechChip key={tech} label={tech} />
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => open(index)}
                      className="btn btn-outline text-sm"
                    >
                      {t.works.details}
                    </button>
                    {project.live ? (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline text-sm"
                      >
                        {t.works.viewLive}
                        <ArrowUpRightIcon width={15} height={15} />
                      </a>
                    ) : null}
                    <a
                      href={project.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline text-sm"
                      aria-label={`${project.name} — ${t.works.viewCode}`}
                    >
                      <GitHubIcon width={15} height={15} />
                      {t.works.viewCode}
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {openIndex !== null && (
        <ProjectModal
          project={projects[openIndex]}
          onClose={close}
          onNavigate={setOpenIndex}
        />
      )}
    </section>
  );
}

export const Works = memo(WorksBase);
