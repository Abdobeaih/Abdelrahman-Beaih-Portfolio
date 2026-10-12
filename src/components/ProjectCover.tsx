import { memo, useState } from 'react';
import type { Project } from '../data/cv';

interface ProjectCoverProps {
  project: Project;
  className?: string;
  /**
   * Accessible description for the screenshot. Defaults to the project name.
   * Pass '' where a nearby label already names the project.
   */
  alt?: string;
}

/**
 * Project cover: the real screenshot from `public/` over a token-based gradient
 * with a faint grid and the project monogram. The generated art doubles as the
 * placeholder shown while the image loads and as the fallback if it fails.
 */
export const ProjectCover = memo(function ProjectCover({
  project,
  className = '',
  alt,
}: ProjectCoverProps) {
  const [failed, setFailed] = useState(false);
  const tint = 8 + project.accentIndex * 3;
  const showImage = Boolean(project.image) && !failed;

  return (
    <div
      className={`relative overflow-hidden border-b border-[var(--border)] ${className}`}
      style={{
        aspectRatio: '16 / 10',
        background: `linear-gradient(135deg, color-mix(in srgb, var(--accent) ${tint}%, var(--bg-soft)), var(--bg-elevated) 70%)`,
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />
      <span
        className="absolute bottom-3 end-4 font-display leading-none text-[var(--text)]"
        style={{ fontSize: 'clamp(4rem, 12vw, 7rem)', opacity: 0.14 }}
        aria-hidden="true"
      >
        <span className="mono-isolate">{project.monogram}</span>
      </span>

      {showImage ? (
        <img
          src={project.image}
          alt={alt ?? project.name}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}

      <span
        className="flow-dot absolute start-4 top-4 h-2.5 w-2.5 rounded-full bg-[var(--accent)]"
        aria-hidden="true"
      />
    </div>
  );
});
