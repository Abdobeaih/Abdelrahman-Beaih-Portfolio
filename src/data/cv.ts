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
  phoneE164: '+20114262817',
  location: { en: 'Cairo, Egypt', ar: 'القاهرة، مصر' } as LocalizedText,
  links: {
    linkedin: 'https://www.linkedin.com/in/abdelrahman-beaih/',
    github: 'https://github.com/Abdobeaih',
  },
  /**
   * TODO: paste the hosted resume PDF URL here (e.g. '/Abdelrahman-Beaih-CV.pdf')
   * when available. While empty, the Resume buttons fall back to an email
   * request so nothing is ever invented.
   */
  resumeUrl: 'https://drive.google.com/file/d/1t5YELhC61-0BdbMfjWghDVuYUeDUFM3H/view?usp=sharing',
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
  { id: 'projects', value: 5 },
  { id: 'roles', value: 4 },
];

export interface Project {
  id: string;
  /** Display name is invariant (product name). */
  name: string;
  stack: string[];
  live?: string;
  code: string;
  /** Cover screenshot served from `public/`. Falls back to the generated art. */
  image: string;
  /** Two glyphs used for the generated cover art fallback. */
  monogram: string;
  accentIndex: number;
}

export const projects: Project[] = [
  {
    id: 'car-care',
    name: 'Mobile Car Care',
    stack: ['React', 'Next.js', 'TypeScript', 'NestJS', 'MongoDB'],
    live: 'https://car-wash-fronend.vercel.app',
    code: 'https://github.com/Abdobeaih/Car-Wash',
    image: '/mobile-carcare.jpg',
    monogram: 'MC',
    accentIndex: 0,
  },
  {
    id: 'mustakileen',
    name: 'Mustakileen',
    stack: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    live: 'https://frontend-project-ed-xrvo.vercel.app',
    code: 'https://github.com/Abdobeaih/Githup-Project',
    image: '/mustakileen-freelancer360.jpg',
    monogram: 'MK',
    accentIndex: 1,
  },
  {
    id: 'karam-el-sham',
    name: 'Karam El Sham',
    stack: ['React', 'TypeScript'],
    live: 'https://karam-el-sham-restaurant-sigma.vercel.app',
    code: 'https://github.com/Abdobeaih/karam-el-sham',
    image: '/karam-el-sham.jpg',
    monogram: 'KS',
    accentIndex: 2,
  },
  {
    id: 'amazon-clone',
    name: 'Amazon Clone',
    stack: ['React', 'TypeScript'],
    code: 'https://github.com/Abdobeaih/Githup-Project',
    image: '/Amazon.jfif',
    monogram: 'AZ',
    accentIndex: 3,
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
      'Bootstrap 5',
      'GSAP',
    ],
  },
  {
    id: 'backend',
    items: ['Node.js', 'Express.js', 'NestJS', 'REST APIs', 'JWT Authentication', 'RBAC'],
  },
  {
    id: 'databases',
    items: ['MongoDB', 'PostgreSQL', 'Supabase', 'Prisma ORM'],
  },
  {
    id: 'tools',
    items: ['Git', 'GitHub', 'npm', 'Vite', 'Docker', 'Vercel', 'Netlify', 'VS Code'],
  },
  {
    id: 'practices',
    items: [
      'Responsive / Mobile-First',
      'WCAG',
      'Monorepo (npm workspaces)',
      'Bilingual Arabic/English RTL UI',
    ],
  },
];

export const certification = {
  id: 'nti-uiux',
  org: 'NTI',
  year: 2025,
} as const;

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
  'PostgreSQL',
  'Prisma',
  'Tailwind CSS',
  'Redux Toolkit',
  'Zustand',
  'GSAP',
  'REST APIs',
  'JWT',
  'RBAC',
  'Docker',
  'Vite',
  'WCAG',
  'RTL',
  'UI/UX',
  'Mobile-First',
];
