/**
 * theme.ts — dark/light theme state.
 * Dark+gold is the default identity; light mode is opt-in and persisted.
 * The <html data-theme> attribute is the single switch: tokens.css holds both
 * palettes, and an inline script in index.html applies the saved choice before
 * first paint so there is no flash.
 */

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'ab-theme';

export function readTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  return window.localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark';
}

export function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* private mode etc. — the attribute still flips for this session */
  }
}

export function toggleTheme(): Theme {
  const next: Theme = readTheme() === 'light' ? 'dark' : 'light';
  applyTheme(next);
  return next;
}
