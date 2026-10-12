import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { en } from './en';
import { ar } from './ar';
import type { Dict, Lang } from './types';
import { LanguageContext, type LanguageContextValue } from './context';

const STORAGE_KEY = 'ab-lang';
const dictionaries: Record<Lang, Dict> = { en, ar };

function readInitialLang(): Lang {
  if (typeof window === 'undefined') return 'en';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'ar' || stored === 'en') return stored;
  const browser = window.navigator.language?.toLowerCase() ?? '';
  return browser.startsWith('ar') ? 'ar' : 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang);
  const dir: 'ltr' | 'rtl' = lang === 'ar' ? 'rtl' : 'ltr';
  const t = dictionaries[lang];

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = dir;
    document.title = t.meta.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', t.meta.description);
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* storage may be unavailable (private mode) — ignore. */
    }
  }, [lang, dir, t]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);
  const toggle = useCallback(() => setLangState((prev) => (prev === 'en' ? 'ar' : 'en')), []);

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, dir, t, setLang, toggle }),
    [lang, dir, t, setLang, toggle],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
