import { useLang } from '../i18n/context';
import { stations, type Station } from '../data/stations';
import { pick } from '../data/cv';
import { MapPinIcon } from './icons';

/**
 * Pure DOM station card (no three/drei dependency) so both the 2D SVG fallback
 * and the 3D drei <Html> overlay can share exactly the same content + markup.
 */
export function StationCardContent({ station }: { station: Station }) {
  const { t, lang } = useLang();
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    <article className="card p-5 sm:p-6" aria-live="polite" aria-atomic="true">
      <div className="flex items-center justify-between gap-3">
        <span className="label mono-isolate">{pick(station.date, lang)}</span>
        <span className="chip mono-isolate border-[var(--accent-soft)] text-[var(--accent)]">
          {pad(station.index)} / {pad(stations.length)}
        </span>
      </div>

      <h3 className="mt-3 text-xl leading-snug" style={{ fontFamily: 'var(--font-display)' }}>
        {pick(station.role, lang)}
      </h3>

      <p className="mt-1 text-sm text-[var(--text-muted)]">{pick(station.organization, lang)}</p>

      <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-[var(--text-faint)]">
        <MapPinIcon width={14} height={14} />
        <span>{pick(station.city, lang)}</span>
      </p>

      <p className="mt-3 text-sm text-[var(--text-muted)]">{pick(station.description, lang)}</p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {station.tags.map((tag) => (
          <li key={tag} className="chip mono-isolate">
            {tag}
          </li>
        ))}
      </ul>

      <p className="sr-only">{t.journey.nodeLabel}</p>
    </article>
  );
}

export default StationCardContent;
