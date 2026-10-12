import type { Dict } from './types';

/** English UI dictionary (default language). */
export const en: Dict = {
  meta: {
    title: 'Abdelrahman Beaih — Front-End & MERN Stack Developer',
    description:
      'Junior Front-End / MERN Stack Developer in Cairo, Egypt. Building responsive, component-based web apps with React, TypeScript, Node.js and MongoDB.',
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
    eyebrow: 'Junior Front-End / MERN Developer',
    greeting: "Hi, I'm",
    valueLine: 'I turn ideas into fast, accessible interfaces.',
    paragraphLead: 'Front-End and MERN developer building responsive, component-based apps with',
    paragraphMid: 'React, TypeScript, Node.js and MongoDB',
    paragraphTail:
      'I contributed to a live product with 10,000+ monthly users and helped cut API data-fetch latency by 30%. Currently freelancing, building bilingual Arabic/English RTL platforms.',
    availability: 'Open to Junior Front-End / React / MERN roles — Egypt, the Gulf or remote',
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
      'Five projects spanning React, TypeScript and the full MERN stack. Open a card for the details.',
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
      practices: 'Practices',
    },
    certificationTitle: 'Certification',
    certificationLabel: 'UI/UX & Front-End Web Development',
    certificationIssuer: 'Issued by NTI',
    certificationYear: '2025',
    issued: 'Issued',
  },
  timeline: {
    eyebrow: 'Experience',
    title: 'Where I have worked',
    subtitle: 'Four roles that grew from electrical engineering into front-end and the MERN stack.',
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
      'A certification, a degree and a toolkit that keeps expanding — here is what sits behind the work.',
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
      'Open to Junior Front-End / React / MERN roles in Egypt, the Gulf (UAE/KSA) or remote. The fastest way to reach me is email.',
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
    tagline: 'Front-End / MERN Stack Developer building fast, accessible, bilingual interfaces.',
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
    'car-care': {
      tagline: 'A full-stack booking platform for mobile car-wash services.',
      overview:
        'Mobile Car Care connects customers with on-demand car-wash services. I built the front-end experience and API layer across a Next.js client and a NestJS backend backed by MongoDB.',
      role: 'Front-end & API development',
      highlights: [
        'Responsive, component-based booking flow in React and Next.js',
        'Typed end-to-end with TypeScript for safer refactors',
        'NestJS REST API with MongoDB persistence',
        'Deployed to Vercel with a clean, mobile-first layout',
      ],
    },
    mustakileen: {
      tagline: 'A MERN application built around a real user workflow.',
      overview:
        'Mustakileen is a MERN stack project covering the full loop — React on the front, Express and Node on the back, MongoDB for storage. It demonstrates authenticated, data-driven features end to end.',
      role: 'Full-stack MERN development',
      highlights: [
        'React front-end with reusable components',
        'Express/Node REST API and MongoDB models',
        'Authentication and protected routes',
        'Live deployment with separate front-end and API',
      ],
    },
    'karam-el-sham': {
      tagline: 'A responsive restaurant site with a warm, editorial feel.',
      overview:
        'Karam El Sham is a restaurant showcase built with React and TypeScript. The focus is on a polished, responsive presentation of the menu and brand across every screen size.',
      role: 'Front-end development',
      highlights: [
        'React and TypeScript component architecture',
        'Responsive layout tuned for mobile-first',
        'Clean typography and menu presentation',
        'Deployed and publicly available',
      ],
    },
    'amazon-clone': {
      tagline: 'A commerce UI reconstruction to sharpen state and layout skills.',
      overview:
        'A recreation of the Amazon shopping interface built with React and TypeScript. It exercises product grids, cart-style state and responsive layout — a deliberate practice project.',
      role: 'Front-end practice project',
      highlights: [
        'React and TypeScript from the ground up',
        'Component-driven product and cart UI',
        'Responsive grid and layout work',
        'Source publicly documented on GitHub',
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
    freelance: {
      role: 'Freelance MERN Stack Developer',
      company: 'Self-Employed',
      summary:
        'Building production web apps for clients with a focus on bilingual Arabic/English platforms.',
      bullets: [
        'Design and build bilingual Arabic/English RTL interfaces',
        'Deliver full-stack features with React, TypeScript and MERN',
        'Own projects end to end, from UI to deployment',
      ],
    },
    digilians: {
      role: 'MERN Stack Developer Trainee',
      company: 'Digilians',
      summary:
        'Worked on a live product serving more than 10,000 monthly users.',
      bullets: [
        'Contributed to a live product with 10,000+ monthly users',
        'Helped cut API data-fetch latency by 30%',
        'Built MERN features with React, Node.js and MongoDB',
        'Collaborated on REST APIs and data modelling',
      ],
    },
    nti: {
      role: 'Front-End Developer Intern (UI/UX)',
      company: 'NTI',
      summary:
        'Focused internship on UI/UX and front-end development, ending with a recognised certificate.',
      bullets: [
        'Studied UI/UX principles and front-end development',
        'Earned the UI/UX & Front-End Web Development certificate',
        'Practised HTML5, CSS3 and responsive layout',
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
