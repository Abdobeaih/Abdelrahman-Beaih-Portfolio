import { memo, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useLang } from '../i18n/context';
import {
  stations,
  STATION_POINTS,
  STATION_POINTS_VERTICAL,
  buildSmoothPath,
} from '../data/stations';
import { pick } from '../data/cv';
import { gsap } from '../lib/gsap';
import { useInView } from '../hooks/useInView';
import { StationCardContent } from './StationCardContent';

const VB_HORIZONTAL = { w: 1000, h: 520 };
const VB_VERTICAL = { w: 380, h: 1000 };

/** For each target point, the path length where it is closest (viewBox units). */
function findNodeLengths(
  path: SVGPathElement,
  targets: { x: number; y: number }[],
  total: number,
): number[] {
  const samples = 260;
  const step = total / samples;
  const lengths = targets.map(() => 0);
  const best = targets.map(() => Infinity);

  for (let i = 0; i <= samples; i++) {
    const len = i * step;
    const pt = path.getPointAtLength(len);
    for (let j = 0; j < targets.length; j++) {
      const dx = pt.x - targets[j].x;
      const dy = pt.y - targets[j].y;
      const dist = dx * dx + dy * dy;
      if (dist < best[j]) {
        best[j] = dist;
        lengths[j] = len;
      }
    }
  }
  return lengths;
}

export interface JourneyMap2DProps {
  active: number;
  onSelect: (index: number) => void;
  reduced: boolean;
  isNarrow: boolean;
  isWide: boolean;
}

/**
 * The original, always-available SVG journey map. Doubles as the permanent
 * fallback for no-WebGL / reduced-motion / low-end devices and as the Suspense
 * fallback while the 3D chunk loads (DESIGN.md section 5B).
 */
function JourneyMap2DBase({ active, onSelect, reduced, isNarrow, isWide }: JourneyMap2DProps) {
  const { t, lang, dir } = useLang();
  const basePathRef = useRef<SVGPathElement | null>(null);
  const [metrics, setMetrics] = useState<{ total: number; node: number[] } | null>(null);
  const [baseDash, setBaseDash] = useState(0);
  const { ref: viewRef, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });

  const vb = isNarrow ? VB_VERTICAL : VB_HORIZONTAL;
  const sourcePoints = isNarrow ? STATION_POINTS_VERTICAL : STATION_POINTS;

  const points = useMemo(
    () => sourcePoints.map((p) => ({ x: dir === 'rtl' ? 1 - p.x : p.x, y: p.y })),
    [sourcePoints, dir],
  );

  const d = useMemo(() => buildSmoothPath(points, vb.w, vb.h), [points, vb.w, vb.h]);

  useLayoutEffect(() => {
    const path = basePathRef.current;
    if (!path) return;
    const total = path.getTotalLength();
    if (!total) return;
    const targets = points.map((p) => ({ x: p.x * vb.w, y: p.y * vb.h }));
    setMetrics({ total, node: findNodeLengths(path, targets, total) });
  }, [d, points, vb.w, vb.h]);

  useEffect(() => {
    if (metrics) setBaseDash(reduced ? 0 : metrics.total);
  }, [metrics, reduced]);

  useEffect(() => {
    const path = basePathRef.current;
    if (!path || !metrics || reduced || !inView) return;
    const tween = gsap.fromTo(
      path,
      { strokeDashoffset: metrics.total },
      { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut' },
    );
    return () => {
      tween.kill();
    };
  }, [inView, metrics, reduced]);

  const progressDashoffset = metrics ? metrics.total - metrics.node[active] : 0;
  const current = stations[active];
  const activePoint = points[active] ?? { x: 0.5, y: 0.5 };

  return (
    <div ref={viewRef} className="absolute inset-0">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${vb.w} ${vb.h}`}
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          ref={basePathRef}
          d={d}
          fill="none"
          stroke="var(--border-strong)"
          strokeWidth={3}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          strokeDasharray={metrics?.total ?? 0}
          strokeDashoffset={baseDash}
        />
        <path
          d={d}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={3}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          strokeDasharray={metrics?.total ?? 0}
          style={{
            strokeDashoffset: progressDashoffset,
            transition: reduced ? 'none' : 'stroke-dashoffset 600ms var(--ease-entrance)',
          }}
        />
      </svg>

      {/* Node layer (buttons stay above the card so every station is clickable). */}
      <div className="absolute inset-0 z-20">
        {points.map((p, index) => {
          const isActive = index === active;
          const isVisited = index < active;
          const station = stations[index];
          return (
            <button
              key={station.id}
              type="button"
              onClick={() => onSelect(index)}
              aria-label={`${t.journey.goTo} ${station.index}: ${pick(station.role, lang)}`}
              aria-current={isActive ? 'true' : undefined}
              className="absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
              style={{ left: `${p.x * 100}%`, top: `${p.y * 100}%` }}
            >
              <span className="relative flex items-center justify-center">
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="pulse-ring absolute h-3.5 w-3.5 rounded-full bg-[var(--accent)]"
                  />
                )}
                <span
                  aria-hidden="true"
                  className="relative flex h-3.5 w-3.5 items-center justify-center rounded-full border"
                  style={{
                    borderColor: isVisited || isActive ? 'var(--accent)' : 'var(--border-strong)',
                    background: isVisited || isActive ? 'var(--accent)' : 'var(--bg)',
                  }}
                >
                  <span
                    className="mono-isolate"
                    style={{
                      fontSize: '8px',
                      lineHeight: 1,
                      color: isVisited || isActive ? 'var(--bg)' : 'var(--text-faint)',
                    }}
                  >
                    {station.index}
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Floating info card (wide screens only; otherwise rendered in flow). */}
      {isWide && (
        <div className="pointer-events-none absolute inset-0 z-10">
          <div
            className="pointer-events-auto absolute w-[320px]"
            style={{
              left: `clamp(8px, calc(${activePoint.x * 100}% - 160px), calc(100% - 328px))`,
              top: `${activePoint.y * 100}%`,
              transform:
                activePoint.y < 0.5 ? 'translateY(30px)' : 'translateY(calc(-100% - 30px))',
            }}
          >
            <div key={active} className="card-in">
              <StationCardContent station={current} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export const JourneyMap2D = memo(JourneyMap2DBase);
export default JourneyMap2D;
