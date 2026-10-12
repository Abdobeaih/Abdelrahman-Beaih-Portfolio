import { useEffect, useState } from 'react';
import { Color } from 'three';

/**
 * Bridge between the CSS design tokens (src/styles/tokens.css) and three.js.
 * The 3D scene must never hardcode a hex value: it reads colours exclusively
 * from here, which resolves the live CSS variables at runtime.
 *
 * Re-reads when `data-theme`, `dir` or `class` change on <html>, so switching
 * language (which flips `dir`) or rethemeing recolours the scene instantly.
 */
export interface ThemeColors {
  accent: Color;
  bg: Color;
  borderStrong: Color;
  text: Color;
  textMuted: Color;
  focus: Color;
}

const TOKEN_NAMES = {
  accent: '--accent',
  bg: '--bg',
  borderStrong: '--border-strong',
  text: '--text',
  textMuted: '--text-muted',
  focus: '--focus',
} as const;

/** Used only if a CSS variable is somehow undefined. */
const FALLBACKS: Record<keyof typeof TOKEN_NAMES, string> = {
  accent: '#d4af37',
  bg: '#0a0a0b',
  borderStrong: '#3a3a3f',
  text: '#f5f5f2',
  textMuted: '#a1a1a6',
  focus: '#f2d675',
};

type ColorKey = keyof typeof TOKEN_NAMES;

function makeColor(key: ColorKey, styles?: CSSStyleDeclaration): Color {
  if (!styles) return new Color(FALLBACKS[key]);
  const value = styles.getPropertyValue(TOKEN_NAMES[key]).trim();
  return new Color(value.length > 0 ? value : FALLBACKS[key]);
}

function readColors(): ThemeColors {
  const styles =
    typeof window !== 'undefined' && typeof document !== 'undefined'
      ? getComputedStyle(document.documentElement)
      : undefined;
  return {
    accent: makeColor('accent', styles),
    bg: makeColor('bg', styles),
    borderStrong: makeColor('borderStrong', styles),
    text: makeColor('text', styles),
    textMuted: makeColor('textMuted', styles),
    focus: makeColor('focus', styles),
  };
}

export function useThemeColors(): ThemeColors {
  const [colors, setColors] = useState<ThemeColors>(readColors);

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => setColors(readColors()));
    observer.observe(root, {
      attributes: true,
      attributeFilter: ['data-theme', 'dir', 'class', 'style'],
    });
    return () => observer.disconnect();
  }, []);

  return colors;
}
