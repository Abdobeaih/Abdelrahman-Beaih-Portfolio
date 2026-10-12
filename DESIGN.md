# DESIGN.md

Single source of truth for look, feel and motion.
**Calibration note:** the palette and fonts below were estimated visually from a screenshot of the reference journey map (night scene, mint-green glowing path, teal year labels, geometric sans + monospace). They were NOT read from the reference site's CSS, so treat the hex values as close approximations. To refine them, edit only the variables in section 1 and the font names in section 2. Nothing else in the codebase should need to change.

## 1. Color tokens (`src/styles/tokens.css`)

```css
:root {
  /* UI */
  --bg:            #0F1317;   /* page background */
  --bg-elevated:   #151A1F;   /* cards, navbar glass base */
  --bg-soft:       #1B2228;   /* hover surfaces, chips */
  --border:        rgba(255,255,255,0.08);
  --border-strong: rgba(255,255,255,0.16);
  --text:          #F2F5F4;   /* primary text */
  --text-muted:    #9AA6A8;   /* secondary text */
  --text-faint:    #6A7578;   /* captions, labels */
  --accent:        #8EE6A0;   /* mint: path, active station, key numbers, mono labels */
  --accent-strong: #5CCB7A;
  --accent-soft:   rgba(142,230,160,0.14);
  --accent-glow:   rgba(142,230,160,0.45);
  --label:         #1F8A7F;   /* teal year-label pills */
  --label-text:    #E8FFF4;
  --focus:         #B5F2C2;

  /* Journey-map scene */
  --sky-top:       #08141A;
  --sky-bottom:    #12303A;
  --hill-1:        #1B4636;
  --hill-2:        #17402F;
  --hill-3:        #123428;
  --river:         #1F6A86;
  --pyramid-1:     #B98F58;
  --pyramid-2:     #8F6C40;
  --city:          #1E405A;
  --city-dark:     #17344A;
  --window:        #F2C14E;   /* lit windows only */
  --moon:          #CFC7A3;
  --sign:          #D8D2C0;
  --palm:          #1C5A43;
  --trunk:         #0E2A21;
}
```

Usage rules: accent is used sparingly (active map node, counters, one highlighted word per heading, primary-button hover). Body text never uses accent. Minimum contrast: text on bg >= 7:1, muted on bg >= 4.5:1.

## 2. Typography

| Role | Font | Fallback | Notes |
|---|---|---|---|
| Display (hero name, section titles, quote) | `Outfit` | `system-ui, sans-serif` | geometric sans, weight 600-700, tight tracking (-0.02em) |
| Body / UI | `Outfit` | `system-ui, sans-serif` | 400/500/600 |
| Labels / tags / counters | `JetBrains Mono` | `ui-monospace, monospace` | 11-12px, uppercase, 0.08em tracking |
| Arabic (RTL) | `IBM Plex Sans Arabic` | `Tahoma, sans-serif` | used for body and display when `dir="rtl"` |

Scale (clamp): hero name `clamp(3.5rem, 9vw, 8rem)`; H2 `clamp(2rem, 4.5vw, 3.75rem)`; H3 `1.5rem`; body `1rem/1.7`; label `0.75rem`.
Load fonts via a single `<link>` with `display=swap` and preconnect.

## 3. Layout and shape

- 12-column grid, max width 1200px, side gutter 24px (16px on mobile).
- Section padding: `clamp(5rem, 10vw, 9rem)` vertical.
- Radius: cards 20px, buttons and chips 999px, modal 28px.
- Borders 1px `--border`; card hover raises border to `--border-strong` and adds `0 0 0 1px var(--accent-soft)`.
- Backgrounds: flat `--bg` with a very subtle grain overlay (SVG noise, opacity 0.04) and one blurred gold orb in the hero (opacity 0.12).

## 4. Components

- **Navbar:** sticky, glass (`backdrop-filter: blur(14px)`, `--bg-elevated` at 70%), links Home / Works / Skills / Timeline / Education / Contact, active link has a 2px accent underline that slides between items, language toggle EN/AR, "Resume" pill on the end.
- **Buttons:** primary = text-on-bg inverted (light fill, dark text); outline = 1px border-strong. Magnetic hover (translate up to 6px toward cursor), 180ms ease-out.
- **Tags/chips:** mono label, `--bg-soft` fill, 1px border, 999px radius.
- **Cards:** `--bg-elevated`, 20px radius, 24-32px padding.
- **Counter:** big serif number in accent, mono caption below.

## 5. The Journey Map (signature component)

- Horizontal winding SVG path across the full container width (S-curve), 8 numbered stations spaced evenly. Mobile: same path rotated to a vertical winding line.
- Path is drawn with `stroke-dasharray` / `stroke-dashoffset`; the completed portion is `--accent`, the remaining portion is `--border-strong`.
- Station node: 14px circle; inactive = `--bg` fill + border-strong ring; visited = accent fill; **active** = accent fill + pulsing glow ring (`--accent-glow`, 1.8s loop).
- Floating info card anchored to the active node: date (mono), city, role, organization, 1-2 line description, tags. Card cross-fades and slides 12px on change (300ms).
- Controls: `NEXT` / `PREV` buttons and a counter "03/08 stations - 2020 -> now". Keyboard: Left/Right arrows, Home/End. Clicking any node jumps to it.
- Auto-advance is OFF by default. When the section first enters the viewport, the path draws from station 1 to the active one over 1.2s.
- `prefers-reduced-motion`: no drawing or pulse; instant state change.

## 5C. Illustrated Journey Map (PRIMARY, matches the reference screenshot)

The reference is a flat, illustrated, night-time landscape card, not a 3D scene. This is the main Journey Map. `map-preview.html` in the project root is the working visual and behavior reference; `PROMPT-MAP.md` tells the agent how to port it to React.

- Card: ~760x470 (aspect 760/470), 24px radius, sky gradient (`--sky-top` -> `--sky-bottom`), stars, crescent moon, two pyramids, three layered green hills, a winding blue river, tall blue city blocks with lit windows, palm trees, a sailboat, a "NEXT" signpost at top right.
- Route: one winding path in mint `--accent` with a soft glow (blurred duplicate underneath). Station nodes are white dots with a dark ring; a teal pill label with a short stem sits above each (year, or "JAN 26" style when years repeat). The last station label is mint with dark text and reads "NOW". A dotted continuation leads from NOW toward the pyramids and the signpost.
- HUD (top-left): dark glass panel with a circular progress ring showing "n/8", bold "stations", and mono "2020 -> now".
- Info card (left, vertical middle): dark card with a 3px mint left border; mono mint uppercase date line ("JUL 2026 - CAIRO"), bold white title, muted organization line. Cross-fades when the active station changes.
- Behavior: on first view the route draws from station 1 to the last station (the info card and ring follow along); clicking a node, the NEXT signpost, the arrow buttons or the Left/Right/Home/End keys moves the glow to that station; active node has a pulsing ring. Reduced motion: no drawing, instant state.
- Landmarks are decorative and original SVG; do not copy the reference site's artwork. Suggested personal mapping: dome building = Suez University, house + silo = Smart Home graduation project, classical building with cap = NTI, office with `</>` = Digilians, office with `{ }` = freelance.

## 5B. Journey Map in 3D (OPTIONAL, secondary; only build if the illustrated map is done and approved)

The 3D map is the primary experience. The 2D SVG map from section 5 stays in the codebase and renders when: WebGL is unavailable, `prefers-reduced-motion` is set, the device is low-end (`navigator.hardwareConcurrency <= 4` and mobile), or the 3D chunk fails to load.

**Scene**
- Canvas: `@react-three/fiber`, `dpr={[1, 1.75]}`, `frameloop="demand"` (render only while the camera tween, pulse or particles are active), transparent background so `--bg` shows through, `fog` colored `--bg`.
- Path: one `CatmullRomCurve3` winding through 3D space (gentle S-curve with +/- 1.2 units of height variation and depth). Rendered as a thin `TubeGeometry` (radius 0.025). The completed part uses `--accent` emissive material, the remaining part uses `--border-strong`.
- Stations: 8 nodes placed at equal arc-length points on the curve. Each is a small sphere (r 0.12) with a thin torus ring. Inactive = dark body + faint ring; visited = accent; active = accent + emissive pulse + expanding ring (1.8s loop, scale 1 -> 1.8, opacity 0.6 -> 0).
- Station number: drei `Text` or `Html` label "01".."08" (mono font) floating above each node, always facing the camera.
- Ambience: 150-250 tiny dust particles (`Points`, size 0.012, opacity 0.35) drifting slowly; a soft accent point light near the active node; no heavy post-processing on mobile (optional subtle bloom on desktop only).

**Camera and motion**
- Camera rides the curve: position = curve point at progress `t` offset by (0.9, 0.5, 2.6) in the local frame; look-at = point at `t + 0.02`. Moving between stations tweens `t` with GSAP over 1.4s, ease `power3.inOut`, plus a slight roll (+/- 2 deg) in the direction of travel.
- Idle: very slow orbit sway (+/- 0.15 rad, 12s period) and parallax toward the pointer (max 0.2 units, desktop only).
- On first view the path draws itself from station 1 to the active one (tube `drawRange` animation over 1.4s).
- Camera, nodes and particles only animate `position`, `rotation`, `scale`, `opacity`. Dispose geometries and materials on unmount.

**UI over the canvas (DOM, not WebGL, for accessibility)**
- Floating info card (date, city, role, organization, description, tags) is a normal DOM element positioned with drei `Html` `transform` off, anchored to the active node's projected position, cross-fading 300ms. `aria-live="polite"`.
- Controls: NEXT / PREV buttons, counter "03/08 stations - 2020 -> now", progress dots. Keyboard: Left/Right, Home/End, Enter. Clicking or tapping a node jumps to it.
- Pointer drag nudges the camera sway only; it never traps page scroll (`touch-action: pan-y`).

**Color source**
- All materials read colors from CSS variables at runtime through `useThemeColors()` (`getComputedStyle(document.documentElement).getPropertyValue('--accent')`), so editing `tokens.css` recolors the 3D scene with no code change. Never hardcode hex in scene files.

**RTL**
- When `dir="rtl"`, mirror the curve on the X axis (station 1 on the right) and flip the camera offset.

**Performance budget**
- 3D chunk lazy-loaded when the section is within 1 viewport of the screen (`IntersectionObserver`), under 250 KB gzipped for the map code (three is tree-shaken via named imports). Target 60 fps desktop, 30+ fps mid-range mobile. Pause rendering when the section is off screen.

## 6. Motion language

- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` for entrances, `ease-out` 180ms for hovers.
- Section reveal: fade-up 24px, 600ms, children staggered 80ms (GSAP ScrollTrigger, `once: true`).
- Counters: count up when in view, 1.4s.
- Marquee: infinite horizontal loop of keywords, 30s linear, pauses on hover.
- Project cards: image scales 1.04 on hover; modal opens with scale 0.96 -> 1 and backdrop fade.
- Nothing animates `width/height/top/left`; only `transform` and `opacity`.

## 7. Sections (order and content intent)

1. **Hero:** eyebrow "Junior Front-End / MERN Developer", giant name, one-sentence value line, short paragraph with 2-3 gold-highlighted phrases, social row (LinkedIn, GitHub, Email, WhatsApp-style phone link), buttons "Resume" and "Let's talk".
2. **Journey Map** + **Stats strip:** counters (10,000+ monthly users served, 30% latency reduction, 5 live projects, 4 roles) and a chip row of core stack.
3. **Works:** 5 project cards, detail modal with Prev / Next / Close, live + code buttons.
4. **Skills:** 6 grouped cards (Languages, Frontend, Backend, Databases, Tools, Practices) + Certification card.
5. **Timeline:** vertical experience cards with expandable "More", then Education sub-timeline.
6. **Education & Community area:** B.Tech card, graduation project highlight (Smart Home Technologies, Excellent), NTI certificate, marquee of keywords.
7. **Philosophy:** one large serif quote + 5 numbered steps (01-05).
8. **Contact:** big CTA heading, email with Copy button, contact cards (LinkedIn, GitHub, Phone, Resume).
9. **Footer:** name, one-liner, Explore / Connect columns, copyright, Go to top.

## 8. RTL rules

- `<html dir="rtl" lang="ar">` when Arabic is selected. Use logical properties only.
- Mirror the journey map horizontally (station 1 on the right) and flip arrow icons for NEXT / PREV.
- Do not mirror logos, numerals, or code/URLs. Keep mono labels LTR via `unicode-bidi: isolate`.
- Arabic headings use `IBM Plex Sans Arabic` at weight 600 instead of the serif display.