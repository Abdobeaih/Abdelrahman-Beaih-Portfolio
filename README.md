# Abdelrahman Beaih — Portfolio

A single-page, journey-driven portfolio for **Abdelrahman Beaih**, Junior Front-End / MERN Stack Developer (Cairo, Egypt).
The signature feature is an **interactive 8-station journey map** that tells the career story from 2020 to now.

[![GitHub](https://img.shields.io/badge/GitHub-Abdobeaih-181717?logo=github)](https://github.com/Abdobeaih)
[![Repo](https://img.shields.io/badge/Repository-source-5CCB7A?logo=github&logoColor=white)](https://github.com/Abdobeaih/YOUR-REPO-NAME)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-abdelrhmanbeaih-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/abdelrhmanbeaih)

- **GitHub:** [github.com/Abdobeaih](https://github.com/Abdobeaih)
- **Source code:** `https://github.com/Abdobeaih/YOUR-REPO-NAME` <!-- TODO: replace YOUR-REPO-NAME with the real repository name (search and replace all occurrences in this file) -->

## Stack

- **Vite** + **React 18** + **TypeScript** (strict)
- **Tailwind CSS** with design tokens wired through CSS variables (`src/styles/tokens.css`)
- **GSAP** + **ScrollTrigger** for scroll reveals and the map draw animation
- **three** + **@react-three/fiber** + **@react-three/drei** for the 3D Journey Map only — lazily imported, with the 2D SVG map as the permanent fallback
- **Fonts self-hosted** via `@fontsource` (no external request); imported in `src/main.tsx`
- No UI kits, no icon libraries — all icons are inline SVG (`src/components/icons`)
- No backend — every fact lives in `src/data/*`

## Getting started

```bash
git clone https://github.com/Abdobeaih/YOUR-REPO-NAME.git
cd YOUR-REPO-NAME
npm install
npm run dev       # start the dev server (http://localhost:5173)
npm run build     # type-check + production build to dist/
npm run lint      # ESLint (flat config, zero warnings allowed)
npm run preview   # preview the production build locally
```

> Requires Node 18+. This project was built and verified with Node 24.

## Project structure

```
src/
  data/cv.ts            # every fact from the CV (single source of truth)
  data/stations.ts      # the 8 journey-map stations + path geometry helpers
  i18n/en.ts ar.ts      # UI dictionaries (English default, Arabic RTL)
  i18n/context.ts       # LanguageProvider context + useLang hook
  styles/tokens.css     # colors, fonts, radii, motion (the only place to retheme)
  components/           # Navbar, Hero, JourneyMap (+ JourneyMap2D), Works, Skills, ...
  components/journey3d/ # JourneyScene, PathTube, Station, CameraRig, Dust (lazy 3D map)
  hooks/                # useReducedMotion, useInView, useReveal, useScrollSpy, ...
  App.tsx main.tsx
```

## Deploy to Vercel

1. Push the repository to GitHub (`https://github.com/Abdobeaih/YOUR-REPO-NAME`):
   ```bash
   git remote add origin https://github.com/Abdobeaih/YOUR-REPO-NAME.git
   git branch -M main
   git push -u origin main
   ```
2. In Vercel, **New Project → Import** the repo from your GitHub account (`Abdobeaih`).
3. Framework preset: **Vite**. Build command `npm run build`, output `dist`. (Vercel detects these automatically.)
4. Deploy. Any push to the default branch redeploys.

The `SPA` fallback is not required because this is a single route, but Vercel handles it out of the box.

## How to retheme

Open `src/styles/tokens.css` and edit only the variables there:

- **Colors** — `--bg`, `--text`, `--accent`, etc. The accent is used sparingly (active map node, counters, one word per heading, hover links).
- **Typography** — the `--font-*` families and the clamp-based size scale. Fonts are self-hosted through `@fontsource` (imported in `src/main.tsx`); swap the imports there to change families.
- **Shape & motion** — `--radius-*`, `--ease-*`, section padding.

`tailwind.config.js` maps these variables to utility classes, so nothing else in the codebase needs to change.

## Accessibility

- Semantic landmarks, a skip link, and visible focus rings.
- The journey map is fully keyboard operable: **← / →** navigate (direction-aware for RTL), **Home / End** jump to the ends; each station is a labelled button (SVG nodes in 2D, a progress-dot rail in 3D) and the station card is announced with `aria-live="polite"`.
- The 3D map is purely decorative around these controls: it falls back to the accessible 2D SVG map when WebGL is unavailable, when `prefers-reduced-motion` is set, on low-end devices, or if the 3D scene throws.
- The journey map **auto-plays**: it advances through the stations on its own, pausing while you hover, focus or navigate inside it, and whenever the section is off-screen. A play/pause control (with `aria-pressed`) hands control back to the visitor on any manual navigation; auto-play is disabled entirely under `prefers-reduced-motion`.
- The project modal traps focus, closes on **Esc** and restores focus on close.
- `prefers-reduced-motion` disables drawing, pulses, reveals and marquee motion.

## Bilingual (English / Arabic RTL)

The EN/AR toggle in the navbar sets `<html lang dir>` and persists the choice in `localStorage`. The layout uses logical CSS properties throughout, and the journey map mirrors horizontally in RTL. Arabic uses **IBM Plex Sans Arabic**.

## Performance

Verified with Lighthouse (mobile, simulated throttling): **Performance 93, Accessibility 100, Best Practices 100, SEO 100**.

- Every scroll-animated section is `React.lazy` + wrapped in `DeferSection`, so it downloads and renders only once it nears the viewport — the initial paint is just the navbar + hero.
- This also keeps **GSAP/ScrollTrigger out of the initial JS graph**; it loads with the first deferred section.
- The hero entrance is a pure-CSS animation (`rise-in`), so no JS blocks first render.
- The **3D Journey Map** (three + fibre + drei) lives entirely in its own dynamically-imported chunk (~242 kB gzip), fetched one viewport before the section is seen; it is never part of the initial JS graph. The canvas runs `frameloop="demand"` and stops rendering when scrolled away.
- Web fonts are self-hosted and cached with hashed filenames.

## TODOs / notes

- **Resume file:** `profile.resumeUrl` in `src/data/cv.ts` is intentionally empty. While empty, every "Resume" button falls back to a pre-filled email request so no link is invented. Add the hosted PDF URL when available.

## Deviations from DESIGN.md

- Journey-map station nodes are 14px circles with an 8px numeral inside so the stations are visibly numbered; the active/visited/intermediate color rules follow the spec.
- The floating info card is anchored to the active node on desktop; on mobile it is rendered in normal flow beneath the map for readability.
- The Journey Map is 3D on capable devices per DESIGN.md §5B; the original 2D SVG map is kept and used as the fallback (no-WebGL / reduced-motion / low-end / error). The 3D scene reads colours only from `src/hooks/useThemeColors.ts` (CSS tokens), never hardcoded hex.
- Tailwind remains on the 3.4 line because DESIGN.md/PROMPT.md specify mapping tokens into `tailwind.config`, which is the v3 workflow.
- `--text-faint` is lifted to `#84848c` (from `#6b6b72`) so 12px captions/labels meet WCAG AA (>= 4.5:1) on every dark surface; this is the only token value changed for accessibility.
- `vite.config.ts` adds a tiny `preview-charset` plugin that appends `charset=utf-8` to `text/html` responses from `vite preview` (production hosts already send it) so the Lighthouse `charset` audit matches production.

## Author

**Abdelrahman Beaih** — Junior Front-End / MERN Stack Developer, Cairo, Egypt

- GitHub: [github.com/Abdobeaih](https://github.com/Abdobeaih)
- LinkedIn: [linkedin.com/in/abdelrhmanbeaih](https://www.linkedin.com/in/abdelrhmanbeaih)
- Email: [abdobeaih43@gmail.com](mailto:abdobeaih43@gmail.com)

Issues and suggestions are welcome through [GitHub Issues](https://github.com/Abdobeaih/YOUR-REPO-NAME/issues).