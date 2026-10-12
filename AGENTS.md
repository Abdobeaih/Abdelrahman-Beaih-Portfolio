# AGENTS.md

Instructions for the coding agent (opencode) building **Abdelrahman Beaih's portfolio**.
Read this file, then `DESIGN.md`, then execute `PROMPT.md`.
For the Journey Map, the primary reference is `map-preview.html` (working visual + behavior) and `PROMPT-MAP.md` (porting instructions); the 3D version in `PROMPT-3D.md` is optional and secondary.

## Project

A single-page, journey-driven personal portfolio for a Junior Front-End / MERN Stack Developer based in Cairo, Egypt.
Signature feature: an **interactive 8-station journey map** ("8/8 stations, 2020 -> now") that tells the career story.
Reference structure: a dark, editorial portfolio with sections Home, Works, Skills, Timeline, Community/Education, Contact.

## Stack (do not deviate)

- Vite + React 18 + TypeScript (strict)
- Tailwind CSS (design tokens come from `DESIGN.md`, wired through CSS variables)
- GSAP + ScrollTrigger for scroll and map animation
- three + @react-three/fiber + @react-three/drei for the 3D Journey Map only (lazy-loaded, see DESIGN.md section 5B)
- No UI kits and no icon libraries: use **inline SVG** components
- No backend. All content lives in `src/data/*.ts`

## Rules

1. **Content source of truth is `src/data/cv.ts`**, built from the CV below. Never invent employers, metrics, dates or links.
2. **Design source of truth is `DESIGN.md`.** All colors, fonts and spacing come from CSS variables in `src/styles/tokens.css`. Never hardcode a hex value in a component.
3. Performance: `React.memo`, `useMemo`, `useCallback` where lists or handlers are passed down; one CSS injection point; lazy-load below-the-fold sections and images; respect `prefers-reduced-motion`.
4. Accessibility: semantic landmarks, visible focus rings, keyboard control for the map (Left/Right arrows, Enter), `aria-live` on the station card, WCAG AA contrast.
5. Bilingual: English default, Arabic (RTL) via a language toggle. Use logical CSS properties (`margin-inline-start`, `ps-*`, `pe-*`) so RTL works without forks. All strings go through `src/i18n/{en,ar}.ts`.
6. Mobile-first. Test at 390px, 768px, 1440px.
7. Small targeted edits when changing existing files; do not rewrite files wholesale for additive changes.
8. After each phase run `npm run build` and `npm run lint`. Fix before moving on.

## File layout

```
src/
  data/cv.ts          # all facts from the CV
  data/stations.ts    # the 8 journey-map stations
  i18n/en.ts ar.ts
  styles/tokens.css   # colors, fonts, radii, motion
  components/
    Navbar.tsx Hero.tsx JourneyMap.tsx StatsStrip.tsx
    Works.tsx ProjectModal.tsx Skills.tsx Timeline.tsx
    Community.tsx Philosophy.tsx Contact.tsx Footer.tsx
    Marquee.tsx Counter.tsx icons/*.tsx
  hooks/useReducedMotion.ts useInView.ts
  App.tsx main.tsx
```

## Facts from the CV (use verbatim)

- Name: Abdelrahman A. M. Beaih (display: Abdelrahman Beaih)
- Title: Junior Front-End / MERN Stack Developer
- Contact: abdobeaih43@gmail.com | +20 114 262 8174 | linkedin.com/in/abdelrhman-beaih | github.com/Abdobeaih | Cairo, Egypt
- Summary: Front-End and MERN developer building responsive, component-based apps with React, TypeScript, Node.js, MongoDB. Contributed to a live product with 10,000+ monthly users and helped cut API data-fetch latency by 30%. Currently freelancing, building bilingual Arabic/English RTL platforms. Seeking Junior Front-End / React / MERN roles in Egypt, the Gulf (UAE/KSA) or remote.
- Skills:
  - Languages: JavaScript (ES6+), TypeScript, HTML5, CSS3
  - Frontend: React.js, Next.js, Redux Toolkit, Context API, Zustand, Tailwind CSS, Bootstrap 5, GSAP
  - Backend: Node.js, Express.js, NestJS, REST APIs, JWT Authentication, RBAC
  - Databases: MongoDB, PostgreSQL, Supabase, Prisma ORM
  - Tools: Git, GitHub, npm, Vite, Docker, Vercel, Netlify, VS Code
  - Practices: Responsive/Mobile-First, WCAG, Monorepo (npm workspaces), Bilingual Arabic/English RTL UI
- Experience:
  - Freelance MERN Stack Developer, Self-Employed, Cairo, May 2026 - Present
  - MERN Stack Developer Trainee, Digilians, Cairo, Jan 2026 - Jul 2026
  - Front-End Developer Intern (UI/UX), NTI, Tanta, Aug 2025 - Oct 2025
  - Electrical Engineer Intern (HSE & Site Operations), Cairo, Aug 2023 - Sep 2023
- Projects:
  - Mobile Car Care (React, Next.js, TypeScript, NestJS, MongoDB) live: https://car-wash-fronend.vercel.app code: https://github.com/Abdobeaih/Car-Wash
  - Mustakileen (MERN) live: https://frontend-project-ed-xrvo.vercel.app code: https://github.com/Abdobeaih/Githup-Project
  - Karam El Sham (React, TypeScript) live: https://karam-el-sham-restaurant-sigma.vercel.app code: https://github.com/Abdobeaih/karam-el-sham
  - Amazon Clone (React, TypeScript) code: https://github.com/Abdobeaih/Githup-Project
  - Todo List (React, JavaScript) live: https://todo-list-react-2jmz.vercel.app code: https://github.com/Abdobeaih/TodoListReact
- Certification: UI/UX & Front-End Web Development, NTI, 2025
- Education: B.Tech Industrial Technology Education - Electronic Communication, Suez University, Sep 2020 - May 2024, Good. Graduation project: Smart Home Technologies (Excellent).