/**
 * stations.ts — the 8 journey-map stations that tell the career story.
 * Facts match AGENTS.md / PROMPT.md exactly. Prose is bilingual so no RTL fork
 * is ever needed. Geometry helpers for the winding SVG path live here too.
 */
import type { LocalizedText } from './cv';

export interface Station {
  id: string;
  /** Station number rendered on the node, 1..8. */
  index: number;
  /** Short label drawn on the map pill above the node (e.g. "2020", "JAN 26"). */
  pill: LocalizedText;
  date: LocalizedText;
  city: LocalizedText;
  role: LocalizedText;
  organization: LocalizedText;
  description: LocalizedText;
  tags: string[];
}

export const stations: Station[] = [
  {
    id: 'st-01',
    index: 1,
    pill: { en: '2020', ar: '٢٠٢٠' },
    date: { en: 'Sep 2020', ar: 'سبتمبر ٢٠٢٠' },
    city: { en: 'Suez', ar: 'السويس' },
    role: {
      en: 'Starts B.Tech, Industrial Technology Education',
      ar: 'بداية بكالوريوس تكنولوجيا التعليم الصناعي',
    },
    organization: { en: 'Suez University', ar: 'جامعة السويس' },
    description: {
      en: 'Begins a B.Tech in Industrial Technology Education — Electronic Communication, laying the engineering foundation behind everything that follows.',
      ar: 'بدأت بكالوريوس تكنولوجيا التعليم الصناعي — اتصالات إلكترونية، لأبني الأساس الهندسي الذي بُني عليه كل ما جاء بعده.',
    },
    tags: ['Education', 'Electronic Communication'],
  },
  {
    id: 'st-02',
    index: 2,
    pill: { en: '2023', ar: '٢٠٢٣' },
    date: { en: 'Aug 2023', ar: 'أغسطس ٢٠٢٣' },
    city: { en: 'Cairo', ar: 'القاهرة' },
    role: {
      en: 'Electrical Engineer Intern, HSE & Site Operations',
      ar: 'متدرّب مهندس كهرباء، السلامة والصحة المهنية وتشغيل الموقع',
    },
    organization: { en: 'Cairo', ar: 'القاهرة' },
    description: {
      en: 'Internship focused on Health, Safety & Environment and on-site operations — first exposure to real engineering discipline and documentation.',
      ar: 'تدريب في مجال السلامة والصحة المهنية وعمليات الموقع، وأول تعرّض حقيقي لانضباط العمل الهندسي والتوثيق.',
    },
    tags: ['Electrical Engineering', 'HSE', 'Site Operations'],
  },
  {
    id: 'st-03',
    index: 3,
    pill: { en: '2024', ar: '٢٠٢٤' },
    date: { en: 'May 2024', ar: 'مايو ٢٠٢٤' },
    city: { en: 'Suez', ar: 'السويس' },
    role: {
      en: 'Graduates — Smart Home Technologies (Excellent)',
      ar: 'التخرّج — مشروع تقنيات المنزل الذكي (امتياز)',
    },
    organization: { en: 'Suez University', ar: 'جامعة السويس' },
    description: {
      en: 'Graduation project on Smart Home Technologies, awarded a grade of Excellent. Interest shifts decisively toward software.',
      ar: 'مشروع تخرّج في تقنيات المنزل الذكي بتقدير امتياز. ومن هنا تحوّل اهتمامي بقوة نحو تطوير البرمجيات.',
    },
    tags: ['Graduation Project', 'Smart Home', 'IoT'],
  },
  {
    id: 'st-04',
    index: 4,
    pill: { en: '2025', ar: '٢٠٢٥' },
    date: { en: 'Aug 2025', ar: 'أغسطس ٢٠٢٥' },
    city: { en: 'Tanta', ar: 'طنطا' },
    role: {
      en: 'Front-End Developer Intern (UI/UX) at NTI',
      ar: 'متدرّب مطوّر واجهات أمامية (UI/UX) في NTI',
    },
    organization: { en: 'NTI', ar: 'معهد NTI' },
    description: {
      en: 'Focuses on UI/UX and front-end development; earns the UI/UX & Front-End Web Development certificate.',
      ar: 'ركّزت على تجربة المستخدم وتطوير الواجهات الأمامية، وحصلت على شهادة UI/UX & Front-End Web Development.',
    },
    tags: ['UI/UX', 'Front-End', 'HTML5', 'CSS3'],
  },
  {
    id: 'st-05',
    index: 5,
    pill: { en: 'JAN 26', ar: 'يناير ٢٦' },
    date: { en: 'Jan 2026', ar: 'يناير ٢٠٢٦' },
    city: { en: 'Cairo', ar: 'القاهرة' },
    role: {
      en: 'MERN Stack Developer Trainee at Digilians',
      ar: 'متدرّب مطوّر MERN Stack في Digilians',
    },
    organization: { en: 'Digilians', ar: 'Digilians' },
    description: {
      en: 'Contributes to a live product serving 10,000+ monthly users, helping cut API data-fetch latency by 30%.',
      ar: 'شاركت في منتج حقيقي يخدم أكثر من ١٠٬٠٠٠ مستخدم شهريًا، وساهمت في خفض زمن جلب البيانات من الـ API بنسبة ٣٠٪.',
    },
    tags: ['React', 'Node.js', 'MongoDB', 'REST APIs'],
  },
  {
    id: 'st-06',
    index: 6,
    pill: { en: 'MAY 26', ar: 'مايو ٢٦' },
    date: { en: 'May 2026', ar: 'مايو ٢٠٢٦' },
    city: { en: 'Cairo', ar: 'القاهرة' },
    role: {
      en: 'Freelance MERN Stack Developer',
      ar: 'مطوّر MERN Stack مستقل',
    },
    organization: { en: 'Self-Employed', ar: 'عمل حر' },
    description: {
      en: 'Builds bilingual Arabic/English RTL platforms for clients while shipping production React and MERN features.',
      ar: 'أبني منصّات ثنائية اللغة (عربي/إنجليزي) بدعم كامل للاتجاه من اليمين لليسار، مع تطوير ميزات إنتاجية بـ React و MERN.',
    },
    tags: ['Freelance', 'RTL', 'Next.js', 'TypeScript'],
  },
  {
    id: 'st-07',
    index: 7,
    pill: { en: 'JUL 26', ar: 'يوليو ٢٦' },
    date: { en: 'Jul 2026', ar: 'يوليو ٢٠٢٦' },
    city: { en: 'Cairo', ar: 'القاهرة' },
    role: {
      en: 'Traineeship ends — ships Mobile Car Care & Mustakileen',
      ar: 'انتهاء التدريب — إطلاق Mobile Car Care و Mustakileen',
    },
    organization: { en: 'Digilians', ar: 'Digilians' },
    description: {
      en: 'The Digilians traineeship concludes after shipping Mobile Car Care and Mustakileen to production.',
      ar: 'اختُتم التدريب في Digilians بعد إطلاق مشروعي Mobile Car Care و Mustakileen إلى الإنتاج.',
    },
    tags: ['Next.js', 'NestJS', 'React', 'MongoDB'],
  },
  {
    id: 'st-08',
    index: 8,
    pill: { en: 'NOW', ar: 'الآن' },
    date: { en: 'Now', ar: 'الآن' },
    city: { en: 'Open to relocate / remote', ar: 'متاح للانتقال أو العمل عن بُعد' },
    role: {
      en: 'Open to Junior Front-End / React / MERN roles',
      ar: 'متاح لوظائف Front-End / React / MERN للمبتدئين',
    },
    organization: {
      en: 'Egypt · Gulf (UAE/KSA) · Remote',
      ar: 'مصر · الخليج (الإمارات/السعودية) · عن بُعد',
    },
    description: {
      en: 'Seeking Junior Front-End / React / MERN roles in Egypt, the Gulf (UAE/KSA) or remote. Ready to build and ship.',
      ar: 'أبحث عن وظائف Front-End / React / MERN للمبتدئين في مصر أو الخليج (الإمارات/السعودية) أو عن بُعد. جاهز للبناء والإطلاق.',
    },
    tags: ['Open to Work', 'React', 'MERN', 'Remote'],
  },
];

/** Normalised (0..1) node coordinates for the winding S-curve, station 1→8. */
export const STATION_POINTS: ReadonlyArray<{ x: number; y: number }> = [
  { x: 0.06, y: 0.62 },
  { x: 0.19, y: 0.3 },
  { x: 0.32, y: 0.68 },
  { x: 0.45, y: 0.3 },
  { x: 0.58, y: 0.68 },
  { x: 0.71, y: 0.3 },
  { x: 0.84, y: 0.68 },
  { x: 0.96, y: 0.34 },
];

/** Normalised node coordinates for the vertical (mobile) winding line. */
export const STATION_POINTS_VERTICAL: ReadonlyArray<{ x: number; y: number }> = [
  { x: 0.34, y: 0.03 },
  { x: 0.66, y: 0.16 },
  { x: 0.34, y: 0.3 },
  { x: 0.66, y: 0.44 },
  { x: 0.34, y: 0.58 },
  { x: 0.66, y: 0.72 },
  { x: 0.34, y: 0.86 },
  { x: 0.66, y: 0.97 },
];

/** Build a smooth SVG path (Catmull-Rom → cubic) through normalised points. */
export function buildSmoothPath(
  points: ReadonlyArray<{ x: number; y: number }>,
  width: number,
  height: number,
): string {
  if (points.length === 0) return '';
  const pts = points.map((p) => ({ x: p.x * width, y: p.y * height }));
  if (pts.length < 2) return '';

  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? pts[i + 1];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}
