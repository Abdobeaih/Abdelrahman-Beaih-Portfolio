import type { Dict } from './types';

/** English UI dictionary (default language). */
export const en: Dict = {
  meta: {
    title: 'Abdelrahman Beaih — Full-Stack MERN Developer',
    description:
      'Full-Stack MERN Developer in Cairo, Egypt, building production-ready web apps and RESTful APIs with React, TypeScript, Node.js and MongoDB. Currently onsite at SpaceTech on Nawy Orders.',
  },
  nav: {
    home: 'Home',
    works: 'Works',
    skills: 'Skills',
    timeline: 'Timeline',
    education: 'Education',
    contact: 'Contact',
    resume: 'Resume',
    menu: 'Menu',
    close: 'Close menu',
  },
  lang: {
    label: 'AR',
    switchTo: 'Switch language to Arabic',
  },
  hero: {
    eyebrow: 'Full-Stack MERN Developer',
    greeting: "Hi, I'm",
    stackLabel: 'Building with',
    valueLine: 'I build production-ready interfaces and APIs, end to end.',
    paragraphLead: 'Full-Stack MERN developer building responsive, component-based apps with',
    paragraphMid: 'React, TypeScript, Node.js and MongoDB',
    paragraphTail:
      'Currently onsite at SpaceTech on Nawy Orders, a restaurant-ordering SaaS platform. I contributed to a live product with 10,000+ monthly users and helped cut API data-fetch latency by 30%, and I specialise in bilingual Arabic/English RTL interfaces.',
    availability: 'Open to Full-Stack / Front-End / React / MERN roles — Egypt, the Gulf or remote',
    ctaResume: 'Resume',
    ctaTalk: "Let's talk",
  },
  journey: {
    next: 'Next',
    stationWord: 'stations',
    range: '2020 → now',
    keyboardHint: 'Use ← → arrow keys, Home and End to navigate the map',
    journeyRegion: 'Career journey map',
    nodeLabel: 'Station',
    goTo: 'Go to station',
  },
  stats: {
    title: 'By the numbers',
    stackLabel: 'Core stack',
    labels: {
      users: { big: 'Monthly users served', small: 'live product' },
      latency: { big: 'API latency reduction', small: 'optimised data-fetch' },
      projects: { big: 'Projects shipped', small: 'live & documented' },
      roles: { big: 'Roles across disciplines', small: 'engineering to front-end' },
    },
  },
  works: {
    eyebrow: 'Selected work',
    title: 'Projects I have built',
    subtitle:
      'Eight projects spanning React, TypeScript and the full MERN stack. Open a card for the details.',
    viewLive: 'Live',
    viewCode: 'Code',
    details: 'Details',
    liveUnavailable: 'No public demo',
    modalPrev: 'Previous project',
    modalNext: 'Next project',
    modalClose: 'Close project details',
    overview: 'Overview',
    stack: 'Stack',
    role: 'Role',
    highlights: 'Highlights',
    project: 'Project',
    of: 'of',
  },
  skills: {
    eyebrow: 'Toolkit',
    title: 'Skills & technologies',
    subtitle: 'The tools I reach for across the stack, grouped by discipline.',
    groups: {
      languages: 'Languages',
      frontend: 'Frontend',
      backend: 'Backend',
      databases: 'Databases',
      tools: 'Tools',
      competencies: 'Core Competencies',
      ai: 'AI Tools',
    },
    certificationTitle: 'Certifications',
    issued: 'Issued',
    verifyCertificate: 'Verify at Coursera',
    tickerLabel: 'Technology ticker',
    terminalTitle: 'abdelrahman@portfolio: ~/stack',
    terminalLive: 'live',
    terminalLabel: 'Animated terminal describing my stack',
  },
  timeline: {
    eyebrow: 'Experience',
    title: 'Where I have worked',
    subtitle:
      'Five roles that grew from electrical engineering into full-stack MERN development.',
    more: 'More',
    less: 'Less',
    present: 'Present',
    educationTitle: 'Education',
    educationSubtitle: 'Where the journey started.',
    gradeLabel: 'Grade',
    graduationProjectLabel: 'Graduation project',
    graduationGradeLabel: 'Project grade',
  },
  community: {
    eyebrow: 'Community & education',
    title: 'Learning, teaching, building in public',
    subtitle:
      'Two certifications, a degree and a toolkit that keeps expanding — here is what sits behind the work.',
    marqueeLabel: 'Technologies and practices I work with',
  },
  philosophy: {
    eyebrow: 'How I work',
    quote: 'Build it accessible, keep it fast, and make the interface disappear — so the product speaks.',
    steps: [
      {
        title: 'Accessible by default',
        body: 'Semantic markup, visible focus, keyboard support and WCAG-AA contrast, not bolted on at the end.',
      },
      {
        title: 'Performance is a feature',
        body: 'Memoised components, lazy sections and transform-only animation keep the experience smooth.',
      },
      {
        title: 'Design with intent',
        body: 'A tight type scale and a single warm accent — restraint that makes every section feel deliberate.',
      },
      {
        title: 'Bilingual first',
        body: 'Logical CSS properties mean Arabic RTL and English LTR are one codebase, never a fork.',
      },
      {
        title: 'Ship and iterate',
        body: 'Small, focused commits and real feedback loops move the product forward faster than big rewrites.',
      },
    ],
  },
  contact: {
    eyebrow: 'Contact',
    title: "Let's build something together",
    subtitle:
      'Open to Full-Stack / Front-End / React / MERN roles in Egypt, the Gulf (UAE/KSA) or remote. The fastest way to reach me is email.',
    copy: 'Copy email',
    copied: 'Copied!',
    email: 'Email',
    phone: 'Phone',
    whatsapp: 'WhatsApp',
    location: 'Location',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    resume: 'Resume',
    resumeHint: 'Request the latest PDF',
    openCard: 'Open',
  },
  footer: {
    tagline: 'Full-Stack MERN Developer building fast, accessible, bilingual interfaces.',
    explore: 'Explore',
    connect: 'Connect',
    rights: 'All rights reserved.',
    builtWith: 'Built with React, TypeScript, Tailwind CSS and GSAP.',
    toTop: 'Go to top',
    backToTopLabel: 'Back to top',
  },
  common: {
    skipToContent: 'Skip to content',
    loading: 'Loading',
    errorBoundary: 'Something went wrong while rendering this section.',
    externalLink: 'External link',
    opensNewTab: 'opens in a new tab',
  },
  projectContent: {
    'nawy-orders': {
      tagline: 'A restaurant-ordering SaaS platform where venues take orders commission-free.',
      overview:
        'Nawy Orders by SpaceTech gives restaurants and cafés their own branded ordering website, progressive web app and Android/iOS apps, so they receive orders directly and manage everything from one dashboard. I build full-stack features across the order flow, menu and item management, and admin reporting.',
      role: 'Full-Stack MERN Developer at SpaceTech',
      highlights: [
        'Full-stack features with React, Node.js/Express and MongoDB',
        'Order flow, menu and item management, and the admin dashboard',
        'Admin reporting for orders, sales and daily reports',
        'Bilingual Arabic/English interfaces delivered in Agile sprints',
      ],
    },
    'car-care': {
      tagline: 'A full-stack booking platform where car care comes to the customer.',
      overview:
        'Mobile Car Care is a monorepo booking platform: a Next.js App Router front end in TypeScript and a NestJS + MongoDB REST API. Customers book a service, vehicle, add-ons, location, date and time, while the server calculates availability from working hours and service duration.',
      role: 'Full-stack development — front end and API',
      highlights: [
        'Multi-step booking flow with server-side pricing and availability',
        'Overlap checks reject double bookings with HTTP 409',
        'JWT authentication with Passport and bcrypt, plus role-based guards for customers and admins',
        'Customer and admin dashboards, Jest unit tests and serverless deployment on Vercel',
      ],
    },
    mustakileen: {
      tagline: 'A full-stack Arabic/English freelancer-benefits platform.',
      overview:
        'Mustakileen pairs a React front end with an Express/MongoDB REST API across 17 route modules covering users, companies, admins, discounts, subscription plans, payments, installments, reviews and notifications.',
      role: 'Full-stack MERN development',
      highlights: [
        'JWT authentication, bcrypt hashing and RBAC for user, company and admin accounts',
        'Helmet, CORS, rate limiting and OTP email verification',
        'Discount approval workflow with tier-based access across free, premium and elite plans',
        'React Query caching, Zustand state, React Hook Form + Zod and 46 lazy-loaded routes',
        'Database indexes, aggregation pipelines, lean queries, compression and cache headers',
      ],
    },
    'karam-el-sham': {
      tagline: 'An Arabic RTL restaurant ordering front end.',
      overview:
        'Karam El Sham is a React 19 restaurant ordering experience with live search, category filtering and dish cards that show whether an item is already in the cart.',
      role: 'Front-end development',
      highlights: [
        'React 19 with Redux Toolkit and React Router',
        'Live search and category filtering with API-loaded food images and a fallback',
        'Shopping cart with add, remove, quantity and totals, persisted to localStorage',
        'Arabic toast notifications, Tailwind CSS and client-side routing on Vercel',
      ],
    },
    'amazon-clone': {
      tagline: 'A full Amazon-style storefront rebuilt with Next.js and Redux Toolkit.',
      overview:
        'A recreation of the Amazon shopping experience as a production-style Next.js app: a 194-product catalog bundled with the app, live search, filters, product pages, a persistent cart and a checkout flow. Rebuilt and redeployed after the original third-party product API went offline.',
      role: 'Full-stack front-end practice project',
      highlights: [
        'Next.js 15 App Router with React 19 and TypeScript',
        'Redux Toolkit cart with localStorage persistence',
        'Search, category and price filtering across 194 products',
        'Product sliders, loading and error states, deployed on Vercel',
      ],
    },
    'movies': {
      tagline: 'A cinematic movies landing page with a bold, dark visual design.',
      overview:
        'A fully responsive movies landing page built with vanilla HTML, CSS and JavaScript with Tailwind: hero showcase, movies grid, coming-soon section and newsletter, with scroll-triggered header effects, a mobile menu and smooth anchor navigation. No framework, no build step - pure front-end fundamentals.',
      role: 'Front-end practice project',
      highlights: [
        'Responsive layout with Tailwind CSS utility classes',
        'Scroll-aware sticky header and mobile navigation',
        'Sectioned landing page: hero, movies, coming soon, newsletter',
        'Self-contained static site, deployed on GitHub Pages',
      ],
    },
    'viva-decor': {
      tagline: 'An elegant interior-design landing page with scroll animations.',
      overview:
        'A landing page for an interior design studio, built with vanilla HTML, CSS and JavaScript: hero, services, contact and support sections with IntersectionObserver scroll animations and a mobile menu. Clean typography-driven layout with large imagery, deployed on GitHub Pages.',
      role: 'Front-end practice project',
      highlights: [
        'Scroll animations with the IntersectionObserver API',
        'Typography-led layout with full-width imagery',
        'Responsive sections: services, features, contact, support',
        'Self-contained static site, deployed on GitHub Pages',
      ],
    },
    'todo-list': {
      tagline: 'A focused task app — the fundamentals done cleanly.',
      overview:
        'A Todo List built with React and JavaScript. Small on purpose: it keeps the core ideas of state, lists and interaction crisp and readable.',
      role: 'Front-end practice project',
      highlights: [
        'React state and list rendering',
        'Add, complete and remove tasks',
        'Simple, distraction-free interface',
        'Deployed live for quick testing',
      ],
    },
  },
  experienceContent: {
    spectech: {
      role: 'Full-Stack MERN Developer',
      company: 'SpaceTech',
      summary:
        'Building Nawy Orders, a restaurant-ordering SaaS platform, onsite with the engineering team in Alexandria.',
      bullets: [
        'Build and support full-stack features with React, Node.js/Express and MongoDB',
        'Ship responsive front ends and RESTful APIs for the order flow and menu management',
        'Work on the admin dashboard for orders, sales and daily reports, with Arabic/English interfaces',
        'Collaborate in Agile sprints using Jira, Git/GitHub workflows and code reviews',
      ],
    },
    freelance: {
      role: 'Freelance MERN Stack Developer',
      company: 'Self-Employed',
      summary:
        'Building full-stack MERN applications for Egyptian and Arab-market clients, with a focus on bilingual Arabic/English platforms.',
      bullets: [
        'Built an Arabic RTL freelancer-benefits platform with tiered memberships, referrals and points',
        'Converted a browser-only freelancer platform into a full MERN stack with Supabase auth, row-level security and real-time subscriptions',
        'Migrated an Arabic RTL freelancer services platform to Vite + React + React Router, reusing a component library and admin dashboard',
      ],
    },
    digilians: {
      role: 'MERN Stack Developer Trainee',
      company: 'Digilians',
      summary:
        'Developed responsive features and REST APIs for a live product used by 10,000+ monthly users.',
      bullets: [
        'Built responsive features with React, JavaScript, HTML5 and CSS3',
        'Built Node.js and MongoDB REST APIs that reduced data-fetch latency by 30%',
        'Improved performance with code splitting, lazy loading and caching',
        'Collaborated with design and product teams',
      ],
    },
    nti: {
      role: 'Front-End Developer Intern (UI/UX)',
      company: 'NTI',
      summary:
        'Focused internship on UI/UX and front-end development, ending with a recognised certificate.',
      bullets: [
        'Designed responsive pages with HTML5, CSS3 and JavaScript (ES6+), following mobile-first and WCAG principles',
        'Improved UX flows with a cross-functional team and kept cross-browser compatibility across Chrome, Firefox and Edge',
        'Participated in Agile sprint planning, daily stand-ups and code reviews',
      ],
    },
    hse: {
      role: 'Electrical Engineer Intern (HSE & Site Operations)',
      company: 'Cairo',
      summary:
        'Early engineering internship covering health, safety & environment and site operations.',
      bullets: [
        'Supported HSE practices on site',
        'Exposure to real-world site operations and documentation',
      ],
    },
  },
};
