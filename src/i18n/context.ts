import { createContext, useContext } from 'react';
import type { Dict, Lang } from './types';

export interface LanguageContextValue {
  lang: Lang;
  dir: 'ltr' | 'rtl';
  t: Dict;
  setLang: (lang: Lang) => void;
  toggle: () => void;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);

/** Access the active language, direction and dictionary. */
export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>');
  return ctx;
}
