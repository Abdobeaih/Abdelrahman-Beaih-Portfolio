import { useCallback, useEffect, useRef, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { useLang } from '../i18n/context';
import { projects, type Project } from '../data/cv';
import { ProjectCover } from './ProjectCover';
import { TechChip } from './TechChip';
import { CloseIcon, ArrowLeftIcon, ArrowRightIcon, ExternalLinkIcon, GitHubIcon } from './icons';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function ProjectModal({ project, onClose, onNavigate }: ProjectModalProps) {
  const { t, dir } = useLang();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const index = projects.findIndex((p) => p.id === project.id);
  const content = t.projectContent[project.id];

  const goPrev = useCallback(() => {
    if (index > 0) onNavigate(index - 1);
  }, [index, onNavigate]);

  const goNext = useCallback(() => {
    if (index < projects.length - 1) onNavigate(index + 1);
  }, [index, onNavigate]);

  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const node = dialogRef.current;
    const first = node?.querySelector<HTMLElement>(FOCUSABLE);
    (first ?? node)?.focus();

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = overflow;
      previouslyFocused.current?.focus();
    };
  }, []);

  useEffect(() => {
    dialogRef.current?.scrollTo({ top: 0 });
  }, [project.id]);

  const onKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        const forward = dir === 'rtl' ? event.key === 'ArrowLeft' : event.key === 'ArrowRight';
        event.preventDefault();
        if (forward) goNext();
        else goPrev();
        return;
      }
      if (event.key !== 'Tab') return;

      const node = dialogRef.current;
      if (!node) return;
      const focusable = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null,
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [dir, goNext, goPrev, onClose],
  );

  const prevIcon = dir === 'rtl' ? <ArrowRightIcon width={16} height={16} /> : <ArrowLeftIcon width={16} height={16} />;
  const nextIcon = dir === 'rtl' ? <ArrowLeftIcon width={16} height={16} /> : <ArrowRightIcon width={16} height={16} />;

  return createPortal(
    <div
      className="backdrop-in fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
      style={{ background: 'color-mix(in srgb, var(--bg) 78%, transparent)', backdropFilter: 'blur(6px)' }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        tabIndex={-1}
        onKeyDown={onKeyDown}
        className="modal-in card max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-b-none border-x-0 border-b-0 sm:rounded-[var(--radius-modal)] sm:border"
      >
        <div className="relative">
          <ProjectCover project={project} />
          <button
            type="button"
            onClick={onClose}
            aria-label={t.works.modalClose}
            className="glass absolute end-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text)] hover:text-[var(--accent)]"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex flex-col gap-6 p-6 sm:p-8">
          <div className="flex flex-col gap-2">
            <span className="label mono-isolate">
              {t.works.project} {String(index + 1).padStart(2, '0')} {t.works.of}{' '}
              {String(projects.length).padStart(2, '0')}
            </span>
            <h2 id="project-modal-title" className="display-title" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}>
              {project.name}
            </h2>
            <p className="text-[var(--text-muted)]">{content.tagline}</p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="label">{t.works.overview}</h3>
            <p className="text-[var(--text-muted)]">{content.overview}</p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="label">{t.works.role}</h3>
            <p className="text-sm text-[var(--text)]">{content.role}</p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="label">{t.works.highlights}</h3>
            <ul className="flex flex-col gap-2">
              {content.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 text-sm text-[var(--text-muted)]">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[var(--accent)]" aria-hidden="true" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="label">{t.works.stack}</h3>
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <TechChip key={tech} label={tech} />
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                aria-label={`${project.name} — ${t.works.viewLive}`}
              >
                {t.works.viewLive}
                <ExternalLinkIcon width={16} height={16} />
              </a>
            ) : (
              <span className="chip">{t.works.liveUnavailable}</span>
            )}
            <a
              href={project.code}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              aria-label={`${project.name} — ${t.works.viewCode}`}
            >
              <GitHubIcon width={16} height={16} />
              {t.works.viewCode}
            </a>
          </div>

          <div className="mt-2 flex items-center justify-between gap-3 border-t border-[var(--border)] pt-5">
            <button
              type="button"
              onClick={goPrev}
              disabled={index === 0}
              className="btn btn-outline disabled:cursor-not-allowed disabled:opacity-40"
            >
              {prevIcon}
              {t.works.modalPrev}
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={index === projects.length - 1}
              className="btn btn-outline disabled:cursor-not-allowed disabled:opacity-40"
            >
              {t.works.modalNext}
              {nextIcon}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
