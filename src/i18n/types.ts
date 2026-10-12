/**
 * types.ts — shape of the UI dictionary. `en.ts` and `ar.ts` must both satisfy
 * `Dict`, so a missing Arabic string is a compile error, never a runtime gap.
 */
export type Lang = 'en' | 'ar';

export interface Dict {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    works: string;
    skills: string;
    timeline: string;
    education: string;
    contact: string;
    resume: string;
    menu: string;
    close: string;
  };
  lang: {
    label: string;
    switchTo: string;
  };
  hero: {
    eyebrow: string;
    greeting: string;
    valueLine: string;
    paragraphLead: string;
    paragraphMid: string;
    paragraphTail: string;
    availability: string;
    ctaResume: string;
    ctaTalk: string;
  };
  journey: {
    next: string;
    stationWord: string;
    range: string;
    keyboardHint: string;
    journeyRegion: string;
    nodeLabel: string;
    goTo: string;
  };
  stats: {
    title: string;
    stackLabel: string;
    labels: {
      users: { big: string; small: string };
      latency: { big: string; small: string };
      projects: { big: string; small: string };
      roles: { big: string; small: string };
    };
  };
  works: {
    eyebrow: string;
    title: string;
    subtitle: string;
    viewLive: string;
    viewCode: string;
    details: string;
    liveUnavailable: string;
    modalPrev: string;
    modalNext: string;
    modalClose: string;
    overview: string;
    stack: string;
    role: string;
    highlights: string;
    project: string;
    of: string;
  };
  skills: {
    eyebrow: string;
    title: string;
    subtitle: string;
    groups: {
      languages: string;
      frontend: string;
      backend: string;
      databases: string;
      tools: string;
      practices: string;
    };
    certificationTitle: string;
    certificationLabel: string;
    certificationIssuer: string;
    certificationYear: string;
    issued: string;
  };
  timeline: {
    eyebrow: string;
    title: string;
    subtitle: string;
    more: string;
    less: string;
    present: string;
    educationTitle: string;
    educationSubtitle: string;
    gradeLabel: string;
    graduationProjectLabel: string;
    graduationGradeLabel: string;
  };
  community: {
    eyebrow: string;
    title: string;
    subtitle: string;
    marqueeLabel: string;
  };
  philosophy: {
    eyebrow: string;
    quote: string;
    steps: { title: string; body: string }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    copy: string;
    copied: string;
    email: string;
    phone: string;
    whatsapp: string;
    location: string;
    linkedin: string;
    github: string;
    resume: string;
    resumeHint: string;
    openCard: string;
  };
  footer: {
    tagline: string;
    explore: string;
    connect: string;
    rights: string;
    builtWith: string;
    toTop: string;
    backToTopLabel: string;
  };
  common: {
    skipToContent: string;
    loading: string;
    errorBoundary: string;
    externalLink: string;
    opensNewTab: string;
  };
  /** Per-project prose, keyed by Project.id. */
  projectContent: Record<
    string,
    {
      tagline: string;
      overview: string;
      role: string;
      highlights: string[];
    }
  >;
  /** Per-experience prose, keyed by Experience.id. */
  experienceContent: Record<
    string,
    {
      role: string;
      company: string;
      summary: string;
      bullets: string[];
    }
  >;
}
