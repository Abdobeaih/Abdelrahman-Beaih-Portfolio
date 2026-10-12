/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-elevated': 'var(--bg-elevated)',
        'bg-soft': 'var(--bg-soft)',
        border: 'var(--border)',
        'border-strong': 'var(--border-strong)',
        text: 'var(--text)',
        'text-muted': 'var(--text-muted)',
        'text-faint': 'var(--text-faint)',
        accent: 'var(--accent)',
        'accent-soft': 'var(--accent-soft)',
        'accent-glow': 'var(--accent-glow)',
        focus: 'var(--focus)',
      },
      fontFamily: {
        display: 'var(--font-display)',
        body: 'var(--font-body)',
        mono: 'var(--font-mono)',
      },
      borderRadius: {
        card: 'var(--radius-card)',
        pill: 'var(--radius-pill)',
        modal: 'var(--radius-modal)',
      },
      maxWidth: {
        shell: 'var(--shell)',
      },
      transitionTimingFunction: {
        entrance: 'var(--ease-entrance)',
        hover: 'var(--ease-hover)',
      },
      spacing: {
        gutter: 'var(--gutter)',
        section: 'var(--section-y)',
      },
    },
  },
  plugins: [],
};
