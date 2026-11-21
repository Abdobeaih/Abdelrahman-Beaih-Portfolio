/**
 * cv.ts — the single source of truth for every FACT on this site.
 * Nothing here may be invented. All values are taken verbatim from the CV.
 * Prose that needs translation lives in `src/i18n/{en,ar}.ts`, keyed by the ids
 * defined here. UI chrome also lives in i18n.
 */

/** A value that exists in both site languages. */
export interface LocalizedText {
  en: string;
  ar: string;
}

/** Pick the string for the active language. */
export function pick(text: LocalizedText, lang: 'en' | 'ar'): string {
  return text[lang];
}

export const profile = {
  name: 'Abdelrahman A. M. Beaih',
  display: { en: 'Abdelrahman Beaih', ar: 'عبدالرحمن بيه' } as LocalizedText,
  email: 'abdobeaih43@gmail.com',
  phone: '+20 114 262 8174',
  phoneE164: '+201142628174',
  location: { en: 'Cairo, Egypt', ar: 'القاهرة، مصر' } as LocalizedText,
  links: {
    linkedin: 'https://www.linkedin.com/in/abdelrahman-beaih/',
    github: 'https://github.com/Abdobeaih',
    portfolio: 'https://abdelrahman-beaih-portfolio.vercel.app',
  },
  /**
   * TODO: paste the hosted resume PDF URL here (e.g. '/Abdelrahman-Beaih-CV.pdf')
   * when available. While empty, the Resume buttons fall back to an email
   * request so nothing is ever invented.
   */
  resumeUrl: 'https://drive.google.com/file/d/1n6gDhp66Fl44USdPUT-e0rYoME53GjSd/view?usp=drive_link',
} as const;

export const whatsappLink = `https://wa.me/${profile.phoneE164.replace('+', '')}`;

/** Headline counters — numbers only; labels come from i18n. */
export interface Stat {
  id: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

export const stats: Stat[] = [
  { id: 'users', value: 10000, suffix: '+' },
  { id: 'latency', value: 30, suffix: '%' },
  { id: 'projects', value: 8 },
  { id: 'roles', value: 5 },
];

export interface Project {
  id: string;
  /** Display name is invariant (product name). */
  name: string;
  stack: string[];
  live?: string;
  /** Public source repository. Omitted for proprietary products. */
  code?: string;
  /** Cover screenshot served from `public/`. Falls back to the generated art. */
  image: string;
  /** Two glyphs used for the generated cover art fallback. */
  monogram: string;
  accentIndex: number;
}

export const projects: Project[] = [
  {
    id: 'nawy-orders',
    name: 'Nawy Orders',
    stack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'SaaS'],
    live: 'https://www.nawyorders.com/en',
    image: '/nawy-orders.jpg',
    monogram: 'NO',
    accentIndex: 5,
  },
  {
    id: 'car-care',
    name: 'Mobile Car Care',
    stack: ['Next.js', 'React', 'TypeScript', 'NestJS', 'MongoDB'],
    live: 'https://car-wash-fronend.vercel.app',
    code: 'https://github.com/Abdobeaih/Car-Wash',
    image: '/mobile-carcare.jpg',
    monogram: 'MC',
    accentIndex: 0,
  },
  {
    id: 'mustakileen',
    name: 'Mustakileen',
    stack: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Zustand'],
    live: 'https://frontend-project-ed-xrvo.vercel.app',
    code: 'https://github.com/Abdobeaih/mustakileen',
    image: '/mustakileen-freelancer360.jpg',
    monogram: 'MK',
    accentIndex: 1,
  },
  {
    id: 'karam-el-sham',
    name: 'Karam El Sham',
    stack: ['React 19', 'Redux Toolkit', 'React Router', 'Tailwind CSS'],
    live: 'https://karam-el-sham-restaurant-sigma.vercel.app',
    code: 'https://github.com/Abdobeaih/karam-el-sham',
    image: '/karam-el-sham.jpg',
    monogram: 'KS',
    accentIndex: 2,
  },
  {
    id: 'amazon-clone',
    name: 'Amazon Clone',
    stack: ['Next.js 15', 'React 19', 'TypeScript', 'Redux Toolkit', 'Tailwind CSS'],
    live: 'https://amazon-clone-blush-three-24.vercel.app',
    code: 'https://github.com/Abdobeaih/Amazon-Clon',
    image: '/amazon-clone.png',
    monogram: 'AZ',
    accentIndex: 3,
  },
  {
    id: 'movies',
    name: 'Movies App',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS'],
    live: 'https://abdobeaih.github.io/Movies/',
    code: 'https://github.com/Abdobeaih/Movies',
    image: '/movies.jpg',
    monogram: 'MV',
    accentIndex: 5,
  },
  {
    id: 'viva-decor',
    name: 'Viva Decor',
    stack: ['HTML5', 'CSS3', 'JavaScript'],
    live: 'https://abdobeaih.github.io/Vive-Decor/',
    code: 'https://github.com/Abdobeaih/Vive-Decor',
    image: '/viva-decor.jpg',
    monogram: 'VD',
    accentIndex: 6,
  },
  {
    id: 'todo-list',
    name: 'Todo List',
    stack: ['React', 'JavaScript'],
    live: 'https://todo-list-react-2jmz.vercel.app',
    code: 'https://github.com/Abdobeaih/TodoListReact',
    image: '/todo-list.jpg',
    monogram: 'TD',
    accentIndex: 4,
  },
];

/** Skill groups — ids drive i18n titles; items are technical nouns (invariant). */
export interface SkillGroup {
  id: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    items: ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3'],
  },
  {
    id: 'frontend',
    items: [
      'React.js',
      'Next.js',
      'Redux Toolkit',
      'Context API',
      'Zustand',
      'Tailwind CSS',
      'Bootstrap',
      'GSAP',
    ],
  },
  {
    id: 'backend',
    items: ['Node.js', 'Express.js', 'NestJS', 'RESTful APIs', 'JWT Authentication', 'RBAC'],
  },
  {
    id: 'databases',
    items: ['MongoDB', 'Mongoose', 'PostgreSQL', 'Supabase', 'Prisma ORM'],
  },
  {
    id: 'tools',
    items: ['Git', 'GitHub', 'Jira', 'Jest', 'npm', 'Vite', 'Docker', 'Vercel', 'Netlify', 'VS Code'],
  },
  {
    id: 'competencies',
    items: [
      'Full-Stack Web Development',
      'REST API Design',
      'Authentication & Authorization',
      'Single-Page Applications (SPA)',
      'State Management',
      'Component-Based Architecture',
      'Performance Optimization',
      'Responsive Design',
      'i18n & RTL UI',
      'WCAG',
      'Agile/Scrum',
      'Code Review',
    ],
  },
  {
    id: 'ai',
    items: ['Claude AI', 'AI Agents', 'AI-Assisted Development'],
  },
];

export interface Certification {
  id: string;
  label: LocalizedText;
  issuer: LocalizedText;
  year?: LocalizedText;
}

export const certifications: Certification[] = [
  {
    id: 'meta-frontend',
    label: {
      en: 'Meta Front-End Developer Professional Certificate',
      ar: 'شهادة Meta الاحترافية لمطوّري الواجهات الأمامية',
    },
    issuer: { en: 'Meta (Coursera)', ar: 'Meta (Coursera)' },
  },
  {
    id: 'nti-uiux',
    label: {
      en: 'UI/UX & Front-End Web Development',
      ar: 'تصميم تجربة المستخدم وتطوير الواجهات الأمامية',
    },
    issuer: { en: 'National Telecommunication Institute (NTI)', ar: 'المعهد القومي للاتصالات (NTI)' },
    year: { en: '2025', ar: '٢٠٢٥' },
  },
];

export interface Experience {
  id: string;
  company: string;
  city: LocalizedText;
  start: LocalizedText;
  end: LocalizedText;
  current?: boolean;
}

export const experience: Experience[] = [
  {
    id: 'spectech',
    company: 'SpecTech',
    city: { en: 'Alexandria', ar: 'الإسكندرية' },
    start: { en: 'Jul 2026', ar: 'يوليو ٢٠٢٦' },
    end: { en: 'Present', ar: 'حتى الآن' },
    current: true,
  },
  {
    id: 'freelance',
    company: 'Self-Employed',
    city: { en: 'Cairo', ar: 'القاهرة' },
    start: { en: 'May 2026', ar: 'مايو ٢٠٢٦' },
    end: { en: 'Present', ar: 'حتى الآن' },
    current: true,
  },
  {
    id: 'digilians',
    company: 'Digilians',
    city: { en: 'Cairo', ar: 'القاهرة' },
    start: { en: 'Jan 2026', ar: 'يناير ٢٠٢٦' },
    end: { en: 'Jul 2026', ar: 'يوليو ٢٠٢٦' },
  },
  {
    id: 'nti',
    company: 'NTI',
    city: { en: 'Tanta', ar: 'طنطا' },
    start: { en: 'Aug 2025', ar: 'أغسطس ٢٠٢٥' },
    end: { en: 'Oct 2025', ar: 'أكتوبر ٢٠٢٥' },
  },
  {
    id: 'hse',
    company: 'Cairo',
    city: { en: 'Cairo', ar: 'القاهرة' },
    start: { en: 'Aug 2023', ar: 'أغسطس ٢٠٢٣' },
    end: { en: 'Sep 2023', ar: 'سبتمبر ٢٠٢٣' },
  },
];

export const education = {
  id: 'suez-btech',
  institution: { en: 'Suez University', ar: 'جامعة السويس' } as LocalizedText,
  degree: {
    en: 'B.Tech, Industrial Technology Education — Electronic Communication',
    ar: 'بكالوريوس تكنولوجيا التعليم الصناعي — اتصالات إلكترونية',
  } as LocalizedText,
  start: { en: 'Sep 2020', ar: 'سبتمبر ٢٠٢٠' } as LocalizedText,
  end: { en: 'May 2024', ar: 'مايو ٢٠٢٤' } as LocalizedText,
  grade: { en: 'Good', ar: 'جيد' } as LocalizedText,
  graduationProject: {
    en: 'Smart Home Technologies',
    ar: 'تقنيات المنزل الذكي',
  } as LocalizedText,
  graduationGrade: { en: 'Excellent', ar: 'امتياز' } as LocalizedText,
} as const;

/** Keywords for the community marquee (invariant technical nouns). */
export const marqueeKeywords = [
  'React',
  'TypeScript',
  'Next.js',
  'Node.js',
  'Express',
  'NestJS',
  'MongoDB',
  'Mongoose',
  'PostgreSQL',
  'Supabase',
  'Prisma',
  'Tailwind CSS',
  'Redux Toolkit',
  'Zustand',
  'TanStack Query',
  'GSAP',
  'REST APIs',
  'JWT',
  'RBAC',
  'Jest',
  'Jira',
  'Docker',
  'Vite',
  'WCAG',
  'RTL',
  'SaaS',
  'PWA',
  'UI/UX',
  'Mobile-First',
  'Claude AI',
];
