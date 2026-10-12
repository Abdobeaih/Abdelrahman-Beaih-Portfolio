import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { useLang } from '../i18n/context';
import { stations } from '../data/stations';
import { pick } from '../data/cv';
import { useInView } from '../hooks/useInView';
import { useReducedMotion } from '../hooks/useReducedMotion';

const VB_W = 760;
const VB_H = 470;
const RING_C = 2 * Math.PI * 17;
/** Dwell at an intermediate station before gliding to the next (ms). */
const PAUSE_MS = 2400;
/** Longer hold on the final station before the route glides back to the start. */
const FINAL_PAUSE_MS = 4600;
/** Grace period after hover/focus leaves before the journey resumes (ms). */
const RESUME_DELAY_MS = 700;

/*
 * Route path, station anchors and every decorative coordinate below are lifted
 * verbatim from the approved reference `map-preview.html`, so the in-app map
 * is pixel-for-pixel the same illustration.
 */
const ROUTE_D =
  'M71,414 C115,418 160,428 209,424 C290,418 340,352 402,353 C455,354 490,384 536,380 C610,374 700,352 690,290 C682,246 640,242 600,244 C560,246 525,244 490,240 C420,232 340,215 292,185 C270,170 285,150 320,142 C370,130 430,121 473,119';

const NODE_AT: ReadonlyArray<readonly [number, number]> = [
  [71, 414],
  [209, 424],
  [402, 353],
  [536, 380],
  [666, 254],
  [490, 240],
  [276, 169],
  [473, 119],
];

interface CityBuilding {
  x: number;
  y: number;
  w: number;
  h: number;
  windows: { x: number; y: number }[];
}
interface Palm {
  x: number;
  y: number;
  scale: number;
}
interface Star {
  cx: number;
  cy: number;
  r: number;
  o: number;
}

interface Metrics {
  total: number;
  nodes: number[];
  pts: { x: number; y: number }[];
}

/** Small deterministic PRNG so the scene art is stable between renders. */
function makeRng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

/** Ease used both for the reference site and to keep motion gentle here. */
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** Route length of the point closest to a target anchor (viewBox units). */
function nearestLength(path: SVGPathElement, target: readonly [number, number]): number {
  const total = path.getTotalLength();
  let best = 0;
  let bestDist = Infinity;
  for (let l = 0; l <= total; l += 1.5) {
    const p = path.getPointAtLength(l);
    const dist = (p.x - target[0]) ** 2 + (p.y - target[1]) ** 2;
    if (dist < bestDist) {
      bestDist = dist;
      best = l;
    }
  }
  return best;
}

/** Decorative night-sky + Nile scene, rendered once (aria-hidden). */
const MapScene = memo(function MapScene() {
  const stars = useMemo<Star[]>(() => {
    const rnd = makeRng(7);
    return Array.from({ length: 46 }, () => ({
      cx: rnd() * VB_W,
      cy: rnd() * 120,
      r: rnd() * 1.1 + 0.3,
      o: Number((0.3 + rnd() * 0.6).toFixed(2)),
    }));
  }, []);

  const city = useMemo<CityBuilding[]>(() => {
    const rnd = makeRng(13);
    const blocks: [number, number, number, number][] = [
      [438, 356, 16, 46],
      [456, 344, 18, 58],
      [528, 372, 18, 40],
      [548, 362, 22, 52],
      [574, 370, 18, 44],
      [598, 376, 16, 36],
    ];
    return blocks.map(([x, y, w, h]) => {
      const windows: { x: number; y: number }[] = [];
      for (let yy = y + 6; yy < y + h - 4; yy += 8) {
        for (let xx = x + 3; xx < x + w - 3; xx += 6) {
          if (rnd() > 0.45) windows.push({ x: xx, y: yy });
        }
      }
      return { x, y, w, h, windows };
    });
  }, []);

  const palms = useMemo<Palm[]>(() => {
    const defs: [number, number, number][] = [
      [298, 142, 1],
      [428, 200, 1],
      [120, 432, 1],
      [296, 402, 1.15],
      [386, 458, 1],
      [641, 432, 0.9],
      [312, 282, 0.9],
      [410, 310, 0.9],
    ];
    return defs.map(([x, y, scale]) => ({ x, y, scale }));
  }, []);

  return (
    <g aria-hidden="true">
      <defs>
        <linearGradient id="journey-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--map-sky-top)" />
          <stop offset="1" stopColor="var(--map-sky-bottom)" />
        </linearGradient>
        <filter id="journey-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      <rect width={VB_W} height={VB_H} fill="url(#journey-sky)" />

      <g>
        {stars.map((s, i) => (
          <circle
            key={i}
            className={i < 6 ? 'map-twinkle' : undefined}
            style={i < 6 ? { animationDelay: `${(i * 0.7).toFixed(1)}s` } : undefined}
            cx={s.cx}
            cy={s.cy}
            r={s.r}
            fill="var(--map-white)"
            opacity={s.o}
          />
        ))}
      </g>

      {/* crescent moon */}
      <circle cx="705" cy="45" r="13" fill="var(--map-moon)" />
      <circle cx="711" cy="41" r="12" fill="var(--map-sky-top)" />

      {/* pyramids */}
      <polygon points="520,118 572,48 626,118" fill="var(--map-pyramid-1)" />
      <polygon points="572,48 626,118 584,118" fill="var(--map-pyramid-2)" />
      <polygon points="598,118 636,78 676,118" fill="var(--map-pyramid-1)" />
      <polygon points="636,78 676,118 648,118" fill="var(--map-pyramid-2)" />

      <path d="M0,112 C120,96 260,126 400,113 C520,101 650,120 760,108 V470 H0Z" fill="var(--map-hill-1)" />

      {/* tall blue blocks (right) */}
      <rect x="668" y="170" width="26" height="130" fill="var(--map-city)" />
      <rect x="696" y="164" width="24" height="136" fill="var(--map-city-mid)" />
      <rect x="722" y="196" width="26" height="104" fill="var(--map-city)" />

      {/* offices (top) */}
      <g>
        <rect x="186" y="120" width="56" height="44" rx="2" fill="var(--map-city-dark)" />
        <text className="mono-tag" x="214" y="112" textAnchor="middle" fontSize="15" fill="var(--map-accent)" opacity="0.85">
          {'{ }'}
        </text>
        <g fill="var(--map-window)" opacity="0.7">
          <rect x="194" y="130" width="8" height="5" />
          <rect x="208" y="130" width="8" height="5" />
          <rect x="222" y="130" width="8" height="5" />
        </g>
      </g>
      <g>
        <rect x="392" y="80" width="60" height="36" rx="2" fill="var(--map-city-dark)" />
        <text className="mono-tag" x="422" y="72" textAnchor="middle" fontSize="15" fill="var(--map-accent)" opacity="0.85">
          {'</>'}
        </text>
        <g fill="var(--map-window)" opacity="0.85">
          <rect x="400" y="90" width="9" height="5" />
          <rect x="415" y="90" width="9" height="5" />
          <rect x="430" y="90" width="9" height="5" />
        </g>
      </g>

      {/* river */}
      <path
        d="M372,78 C395,100 392,130 372,160 C350,195 360,230 372,270 C385,310 350,360 340,410 C335,440 330,455 322,470 L348,470 C354,450 364,430 374,410 C402,350 422,310 402,270 C387,235 397,200 412,160 C430,120 412,95 392,78Z"
        fill="var(--map-river)"
      />
      <path d="M388,90 C402,120 392,150 380,175" stroke="var(--map-river-hi)" strokeWidth="2" fill="none" opacity="0.5" />

      <path d="M0,332 C100,302 220,332 330,352 C450,374 560,332 760,302 V470 H0Z" fill="var(--map-hill-2)" />
      <path d="M0,402 C120,382 250,412 380,422 C520,432 650,402 760,382 V470 H0Z" fill="var(--map-hill-3)" />

      <g stroke="var(--map-field)" strokeWidth="1" opacity="0.6">
        <line x1="127" y1="440" x2="277" y2="440" />
        <line x1="127" y1="446" x2="277" y2="446" />
        <line x1="127" y1="452" x2="277" y2="452" />
      </g>

      {/* lower city */}
      <g>
        {city.map((b, i) => (
          <g key={i}>
            <rect x={b.x} y={b.y} width={b.w} height={b.h} fill="var(--map-city-dark)" />
            {b.windows.map((win, j) => (
              <rect key={j} x={win.x} y={win.y} width="3" height="3.5" fill="var(--map-window)" opacity="0.8" />
            ))}
          </g>
        ))}
      </g>

      {/* university dome */}
      <g transform="translate(12,343)">
        <rect x="0" y="22" width="56" height="24" fill="var(--map-city-dark)" />
        <path d="M10,22 C10,2 46,2 46,22Z" fill="var(--map-dome)" />
        <rect x="26" y="-6" width="4" height="10" fill="var(--map-dome)" />
        <g fill="var(--map-dome-dark)">
          <rect x="6" y="28" width="5" height="18" />
          <rect x="18" y="28" width="5" height="18" />
          <rect x="33" y="28" width="5" height="18" />
          <rect x="45" y="28" width="5" height="18" />
        </g>
      </g>

      {/* smart home + silo */}
      <g transform="translate(162,363)">
        <rect x="4" y="16" width="36" height="24" fill="var(--map-house)" />
        <polygon points="0,18 22,2 44,18" fill="var(--map-house-roof)" />
        <rect x="18" y="26" width="8" height="14" fill="var(--map-house-door)" />
        <rect x="46" y="8" width="12" height="32" rx="3" fill="var(--map-silo)" />
        <path d="M46,8 C46,2 58,2 58,8Z" fill="var(--map-silo-top)" />
        <path d="M13,12 q9,-8 18,0" stroke="var(--map-accent)" strokeWidth="1.4" fill="none" opacity="0.9" />
      </g>

      {/* NTI classical building + graduation cap */}
      <g transform="translate(506,233)">
        <polygon points="0,10 32,-4 64,10" fill="var(--map-classical)" />
        <rect x="2" y="10" width="60" height="4" fill="var(--map-classical-2)" />
        <g fill="var(--map-classical-3)">
          <rect x="6" y="14" width="5" height="24" />
          <rect x="16" y="14" width="5" height="24" />
          <rect x="26" y="14" width="5" height="24" />
          <rect x="36" y="14" width="5" height="24" />
          <rect x="46" y="14" width="5" height="24" />
          <rect x="55" y="14" width="5" height="24" />
        </g>
        <rect x="0" y="38" width="64" height="4" fill="var(--map-classical-2)" />
        <g transform="translate(32,-16)">
          <polygon points="-10,0 0,-5 10,0 0,5" fill="var(--map-sail)" />
          <path d="M-6,3 v5 q6,4 12,0 v-5" fill="var(--map-sail-2)" />
        </g>
      </g>

      {/* palms */}
      <g>
        {palms.map((p, i) => (
          <g key={i} transform={`translate(${p.x},${p.y}) scale(${p.scale})`}>
            <path d="M0,0 C3,-12 -1,-24 4,-34" stroke="var(--map-trunk)" strokeWidth="3.2" fill="none" strokeLinecap="round" />
            {[
              'M4,-34 q-16,-5 -24,7',
              'M4,-34 q-8,-14 -20,-12',
              'M4,-34 q8,-16 22,-10',
              'M4,-34 q16,-4 24,8',
              'M4,-34 q0,-12 -2,-18',
            ].map((d, j) => (
              <path key={j} d={d} stroke="var(--map-palm)" strokeWidth="3" fill="none" strokeLinecap="round" />
            ))}
          </g>
        ))}
      </g>

      {/* sailboat — drifts gently on the river */}
      <g className="map-boat">
        <g transform="translate(352,262)">
          <polygon points="0,0 0,-26 14,-2" fill="var(--map-sail)" />
          <polygon points="-2,0 -2,-18 -14,-2" fill="var(--map-sail-2)" />
          <path d="M-14,2 H18 L12,9 H-8Z" fill="var(--map-hull)" />
        </g>
      </g>

      {/* dotted continuation to the signpost */}
      <path
        d="M473,119 C520,121 560,116 640,98"
        stroke="var(--map-accent)"
        strokeWidth="2"
        strokeDasharray="2 6"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      />
    </g>
  );
});

function JourneyMapBase() {
  const { t, lang, dir } = useLang();
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);

  const routeRef = useRef<SVGPathElement | null>(null);
  const glowRef = useRef<SVGPathElement | null>(null);
  const fillRef = useRef<SVGPathElement | null>(null);
  const headRef = useRef<SVGCircleElement | null>(null);
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  const { ref: viewRef, inView: onScreen } = useInView<HTMLDivElement>({
    once: false,
    rootMargin: '200px 0px',
    threshold: 0,
  });

  const total = stations.length;

  /* --- animation engine refs (kept out of state to avoid per-frame renders) --- */
  const metricsRef = useRef<Metrics | null>(null);
  const cur = useRef(0); // current travelled length along the route
  const activeRef = useRef(0);
  const raf = useRef(0);
  const lastTs = useRef(0);
  const phase = useRef<'wait' | 'travel'>('wait');
  const goal = useRef(1);
  const seg = useRef({ from: 0, to: 0, ms: 0, start: 0 });
  const waitUntil = useRef(0);
  const pausedRef = useRef(false);
  const resumeAfter = useRef(0);
  const startLoopRef = useRef<() => void>(() => {});
  const stopLoopRef = useRef<() => void>(() => {});
  const goToRef = useRef<(index: number) => void>(() => {});

  // Snap each anchor to its nearest point on the route once the path is mounted.
  useLayoutEffect(() => {
    const path = routeRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    if (!length) return;
    const nodes = NODE_AT.map((at) => nearestLength(path, at));
    const pts = nodes.map((len) => {
      const p = path.getPointAtLength(len);
      return { x: p.x, y: p.y };
    });
    setMetrics({ total: length, nodes, pts });
  }, []);

  // Engine: a single rAF drives one continuous position along the route.
  useEffect(() => {
    const m = metrics;
    if (!m) return;
    metricsRef.current = m;
    const { nodes, total: len } = m;

    const apply = () => {
      const route = routeRef.current;
      if (!route) return;
      const c = Math.max(0, Math.min(len, cur.current));
      const off = len - c;
      if (glowRef.current) glowRef.current.setAttribute('stroke-dashoffset', String(off));
      if (fillRef.current) fillRef.current.setAttribute('stroke-dashoffset', String(off));
      const p = route.getPointAtLength(c);
      if (headRef.current) {
        headRef.current.setAttribute('cx', String(p.x));
        headRef.current.setAttribute('cy', String(p.y));
      }
      let a = 0;
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i] <= c + 0.8) a = i;
      }
      if (a !== activeRef.current) {
        activeRef.current = a;
        setActive(a);
      }
    };

    function beginTravel(i: number) {
      const from = cur.current;
      const to = nodes[i];
      const ms = Math.min(3400, Math.max(600, (Math.abs(to - from) / len) * 3600));
      seg.current = { from, to, ms, start: performance.now() };
      goal.current = i;
      phase.current = 'travel';
    }

    function arrive(i: number) {
      cur.current = nodes[i];
      activeRef.current = i;
      setActive(i);
      apply();
      phase.current = 'wait';
      const isLast = i === nodes.length - 1;
      waitUntil.current = performance.now() + (isLast ? FINAL_PAUSE_MS : PAUSE_MS);
      goal.current = isLast ? 0 : i + 1;
    }

    function step(now: number) {
      raf.current = requestAnimationFrame(step);
      const dt = now - (lastTs.current || now);
      lastTs.current = now;
      if (pausedRef.current || now < resumeAfter.current) {
        // Shift the anchors so nothing jumps when the journey resumes.
        seg.current.start += dt;
        waitUntil.current += dt;
        return;
      }
      if (phase.current === 'wait') {
        if (now >= waitUntil.current) beginTravel(goal.current);
        return;
      }
      const s = seg.current;
      const k = s.ms > 0 ? Math.min(1, (now - s.start) / s.ms) : 1;
      cur.current = s.from + (s.to - s.from) * easeInOutCubic(k);
      apply();
      if (k >= 1) arrive(goal.current);
    }

    if (reduced) {
      // Static: show the completed route on the final station. Selecting a
      // station still reveals its card, but the line never animates.
      cur.current = len;
      activeRef.current = nodes.length - 1;
      setActive(nodes.length - 1);
      apply();
      startLoopRef.current = () => {};
      stopLoopRef.current = () => {};
      goToRef.current = (index) => {
        const idx = Math.max(0, Math.min(nodes.length - 1, index));
        activeRef.current = idx;
        setActive(idx);
      };
      return;
    }

    const startLoop = () => {
      if (raf.current) return;
      lastTs.current = performance.now();
      raf.current = requestAnimationFrame(step);
    };
    const stopLoop = () => {
      if (raf.current) {
        cancelAnimationFrame(raf.current);
        raf.current = 0;
      }
    };

    startLoopRef.current = startLoop;
    stopLoopRef.current = stopLoop;
    goToRef.current = (index) => {
      const idx = Math.max(0, Math.min(nodes.length - 1, index));
      cur.current = nodes[idx];
      apply();
      phase.current = 'wait';
      waitUntil.current = performance.now() + PAUSE_MS;
      goal.current = idx === nodes.length - 1 ? 0 : idx + 1;
    };

    cur.current = nodes[0];
    activeRef.current = 0;
    setActive(0);
    apply();
    phase.current = 'wait';
    goal.current = 1;
    waitUntil.current = performance.now() + PAUSE_MS;
    startLoop();

    return () => stopLoop();
  }, [metrics, reduced]);

  // Pause when the map scrolls away or the tab is hidden.
  useEffect(() => {
    if (reduced || !metrics) return;
    if (onScreen && !document.hidden) startLoopRef.current();
    else stopLoopRef.current();

    const onVisibility = () => {
      if (document.hidden) stopLoopRef.current();
      else if (onScreen) startLoopRef.current();
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      stopLoopRef.current();
    };
  }, [onScreen, reduced, metrics]);

  // Pause while the pointer or keyboard focus rests on the map.
  useEffect(() => {
    const paused = hovering || focused;
    pausedRef.current = paused;
    if (!paused) resumeAfter.current = performance.now() + RESUME_DELAY_MS;
  }, [hovering, focused]);

  const goTo = useCallback((index: number) => goToRef.current(index), []);

  const onKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLDivElement>) => {
      const nextKey = dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
      const prevKey = dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
      if (event.key === nextKey) {
        event.preventDefault();
        goToRef.current(Math.min(total - 1, activeRef.current + 1));
      } else if (event.key === prevKey) {
        event.preventDefault();
        goToRef.current(Math.max(0, activeRef.current - 1));
      } else if (event.key === 'Home') {
        event.preventDefault();
        goToRef.current(0);
      } else if (event.key === 'End') {
        event.preventDefault();
        goToRef.current(total - 1);
      }
    },
    [dir, total],
  );

  const current = stations[active];
  const ringOffset = RING_C * (1 - (active + 1) / total);
  const ringStyle = reduced ? undefined : { transition: 'stroke-dashoffset 700ms var(--ease-entrance)' };

  return (
    <figure className="m-0 w-full">
      <div
        ref={viewRef}
        className="journey-map"
        role="group"
        aria-label={t.journey.journeyRegion}
        aria-describedby="journey-keyboard-hint"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerEnter={() => setHovering(true)}
        onPointerLeave={() => setHovering(false)}
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={() => setFocused(false)}
      >
        <div className="journey-map__frame">
          <svg
            className="journey-map__art"
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            preserveAspectRatio="xMidYMid meet"
            focusable="false"
          >
            <MapScene />

            {/* route (decorative); progress conveys state via the HUD text too */}
            <path ref={routeRef} d={ROUTE_D} fill="none" stroke="var(--map-route)" strokeWidth="5" strokeLinecap="round" opacity="0.55" />
            <path
              ref={glowRef}
              d={ROUTE_D}
              fill="none"
              stroke="var(--map-accent)"
              strokeWidth="12"
              strokeLinecap="round"
              filter="url(#journey-glow)"
              opacity="0.55"
              strokeDasharray={metrics?.total ?? 0}
              strokeDashoffset={metrics?.total ?? 0}
            />
            <path
              ref={fillRef}
              d={ROUTE_D}
              fill="none"
              stroke="var(--map-prog-hi)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={metrics?.total ?? 0}
              strokeDashoffset={metrics?.total ?? 0}
            />

            {/* glowing head that travels the route */}
            <circle
              ref={headRef}
              cx={metrics?.pts[0]?.x}
              cy={metrics?.pts[0]?.y}
              r="5.5"
              fill="var(--map-prog-hi)"
              filter="url(#journey-glow)"
              opacity="0.95"
            />

            {/* the eight stations */}
            <g>
              {metrics?.pts.map((p, i) => {
                const station = stations[i];
                const label = pick(station.pill, lang);
                const isLast = i === total - 1;
                const isActive = i === active;
                const visited = i <= active;
                const width = Math.max(30, label.length * 7 + 20);
                return (
                  <g
                    key={station.id}
                    className="node"
                    role="button"
                    tabIndex={0}
                    aria-label={`${t.journey.goTo} ${i + 1}: ${pick(station.role, lang)}`}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={() => goTo(i)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        goTo(i);
                      }
                    }}
                  >
                    {isActive && (
                      <circle className="pulse" cx={p.x} cy={p.y} r={7} fill="var(--map-accent)" opacity={0.7} />
                    )}
                    <g className="node-label">
                      <line
                        x1={p.x}
                        y1={p.y - 8}
                        x2={p.x}
                        y2={p.y - 17}
                        stroke={isLast ? 'var(--map-accent)' : 'var(--map-label-connector)'}
                        strokeWidth="1.5"
                      />
                      <rect
                        x={p.x - width / 2}
                        y={p.y - 37}
                        width={width}
                        height="20"
                        rx="6"
                        fill={isLast ? 'var(--map-accent)' : 'var(--map-label)'}
                      />
                      <text
                        x={p.x}
                        y={p.y - 23.5}
                        textAnchor="middle"
                        fontWeight="600"
                        fontSize="11"
                        fill={isLast ? 'var(--map-node-text)' : 'var(--map-label-text)'}
                      >
                        {label}
                      </text>
                    </g>
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={7}
                      fill={visited ? 'var(--map-white)' : 'var(--map-node-dot)'}
                      stroke="var(--map-node-ring)"
                      strokeWidth="2.5"
                    />
                    <circle cx={p.x} cy={p.y} r={26} fill="transparent" />
                  </g>
                );
              })}
            </g>

            {/* signpost — decorative signpost marking the current chapter */}
            <g className="sign" aria-hidden="true">
              <rect x="672" y="98" width="4" height="46" fill="var(--map-sign-post)" />
              <polygon points="640,74 696,74 708,82 696,90 640,90" fill="var(--map-sign)" />
              <text
                className="sign-label"
                x="668"
                y="85.5"
                textAnchor="middle"
                fontSize="8"
                fill="var(--map-sign-text)"
              >
                {t.journey.next}
              </text>
            </g>
          </svg>

          {/* HUD: progress ring + label */}
          <div className="hud">
            <div className="ring">
              <svg viewBox="0 0 40 40" aria-hidden="true">
                <circle cx="20" cy="20" r="17" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="3.5" />
                <circle
                  cx="20"
                  cy="20"
                  r="17"
                  fill="none"
                  stroke="var(--map-accent)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray={RING_C}
                  strokeDashoffset={ringOffset}
                  style={ringStyle}
                />
              </svg>
              <span aria-hidden="true">{`${active + 1}/${total}`}</span>
            </div>
            <div>
              <b>{t.journey.stationWord}</b>
              <small>{t.journey.range}</small>
            </div>
          </div>

        </div>

        {/* info card — overlaid on wide screens, in normal flow under the map on mobile */}
        <div className="journey-map__info" aria-live="polite" aria-atomic="true">
          <div key={active} className="card-in">
            <p className="d">
              {pick(current.date, lang)} · {pick(current.city, lang)}
            </p>
            <h3>{pick(current.role, lang)}</h3>
            <p>{pick(current.organization, lang)}</p>
            <p className="desc">{pick(current.description, lang)}</p>
          </div>
        </div>
      </div>

      <p id="journey-keyboard-hint" className="mt-3 text-center text-xs text-[var(--text-faint)]">
        {t.journey.keyboardHint}
      </p>
    </figure>
  );
}

export const JourneyMap = memo(JourneyMapBase);
export default JourneyMap;
