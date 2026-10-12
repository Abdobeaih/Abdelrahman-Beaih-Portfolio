import { profile } from '../data/cv';

export const mailtoHref = `mailto:${profile.email}`;

/**
 * Resume target. Uses the real PDF when configured in cv.ts; otherwise falls
 * back to a polite email request (never a made-up URL).
 */
export const resumeHref =
  profile.resumeUrl ||
  `mailto:${profile.email}?subject=${encodeURIComponent('Resume request — Abdelrahman Beaih')}`;

export const resumeIsExternal = Boolean(profile.resumeUrl);

export const telHref = `tel:${profile.phoneE164}`;
