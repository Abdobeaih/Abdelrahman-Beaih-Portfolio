# PROMPT-MAP.md

Run this in opencode to build the illustrated Journey Map (the one in the reference screenshot) into the React project.
Project root must contain `AGENTS.md`, `DESIGN.md` (sections 1, 2, 5C), `map-preview.html`, and ideally the base build from `PROMPT.md`.

````text
Read AGENTS.md and DESIGN.md (sections 1, 2 and 5C) first. Then open map-preview.html: it is a working single-file prototype of the Journey Map I want. Port it to the React + TypeScript project as a real component. Match its look and behavior exactly. Do not paste the HTML wholesale; restructure it into components and read all colors from CSS variables.

GOAL
An illustrated, night-time landscape card (aspect 760/470, 24px radius) showing a glowing mint route through 8 stations, a HUD ring "n/8 stations 2020 -> now", an info card that follows the active station, and a NEXT signpost. It replaces the existing JourneyMap component and sits in the hero/journey section.

STEP 1 - Tokens
- In src/styles/tokens.css make sure ALL variables from DESIGN.md section 1 exist (UI palette and the Journey-map scene palette). Load Outfit and JetBrains Mono (one <link>, display=swap) and map them in tailwind.config.
- No hex values in components. SVG fills/strokes use `var(--token)`.

STEP 2 - Data
- src/data/stations.ts: array of 8 objects { label, date, title, org, at: [x,y] } using exactly the content in map-preview.html (`S` array). `label` is the pill text ("2020", "JAN 26", "NOW"). `at` is the target point in the 760x470 viewBox; the real node position is computed by snapping to the nearest point on the route.
- Strings go through src/i18n/en.ts and ar.ts. Arabic mirrors the whole card (route and scene flip horizontally via scaleX(-1) on the SVG group only; text overlays use logical properties).

STEP 3 - Components in src/components/journey/
- JourneyMap.tsx: owns state (active index, `cur` route length), the go/next/prev logic, the intro animation, keyboard handling (Left/Right/Home/End), reduced-motion handling. React.memo the children.
- Scene.tsx: static decorative SVG (sky gradient, stars generated from a seeded RNG, moon, pyramids, hills, river, buildings with lit windows, palms, sailboat, dotted continuation, signpost). Wrap in React.memo; it must not re-render when the active station changes.
- Route.tsx: the route path (dim base, blurred glow copy, bright progress path using stroke-dasharray = `${cur} ${L+10}`), station nodes (white dot with dark ring, teal pill label with stem; last station mint "NOW"), pulsing ring on the active node.
- Hud.tsx: glass panel with circular progress ring (stroke-dashoffset from active index), "n/8", bold "stations", mono "2020 -> now".
- InfoCard.tsx: left-aligned dark card with 3px mint left border; mono mint uppercase date, bold title, muted org; cross-fade (opacity + 8px translate, ~250ms) when the active station changes; aria-live="polite".
- Controls.tsx: round prev/next buttons bottom-right (44px+ tap targets).
- Use container query units (cqw) for all overlay sizes so the card scales as one piece. Minimum readable size on a 390px screen: clamp font sizes so the info title never goes below 14px.

STEP 4 - Behavior (must match map-preview.html)
- Intro on first view: after 500ms, tween `cur` from 0 to the last station's length over ~4.2s (easeInOutCubic) via requestAnimationFrame or GSAP; the active station, ring, count and info card update as the route passes each node. Start only when the section is at least 40% in view (IntersectionObserver), once.
- Click a node / the NEXT signpost / arrow buttons / arrow keys moves the route to that station (duration proportional to distance, 600-3400ms). NEXT on the last station loops to the first.
- Nodes before or at `cur` are white, later ones grey. Active node has a pulsing ring (CSS keyframes, transform/opacity only).
- prefers-reduced-motion: no tween, no pulse animation, instant state changes.
- Pause all rAF work when the section is off screen.

STEP 5 - Verify
- npm run build and npm run lint pass.
- Visual check against map-preview.html at 390 / 768 / 1440: same composition, same colors, labels never overlap the info card or each other.
- Keyboard-only navigation works; focus rings visible; screen reader announces the new station.
- Report any deviation from DESIGN.md 5C.

CONSTRAINTS
- Landmarks are original SVG art; do not fetch or copy any assets from other sites.
- Never invent facts; station content comes only from src/data/stations.ts.
- Small targeted edits to existing files; keep the older 2D/3D map components only if they are still imported somewhere, otherwise remove them.
````