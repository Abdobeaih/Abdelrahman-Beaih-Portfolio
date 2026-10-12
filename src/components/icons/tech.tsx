import type { SVGProps } from 'react';

export type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
};

const solid = { ...base, fill: 'currentColor', stroke: 'none' };

/** Rounded tile with a short label — used for the lettered technology marks. */
function LetterMark({ label, size = 8.6, ...props }: IconProps & { label: string; size?: number }) {
  return (
    <svg {...base} {...props}>
      <rect x="2.6" y="2.6" width="18.8" height="18.8" rx="4.6" />
      <text
        x="12"
        y="12.3"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={size}
        fontWeight={700}
        fontFamily="'JetBrains Mono', ui-monospace, monospace"
        fill="currentColor"
        stroke="none"
      >
        {label}
      </text>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Languages                                                                  */
/* -------------------------------------------------------------------------- */

export function JavaScriptIcon(props: IconProps) {
  return <LetterMark label="JS" {...props} />;
}

export function TypeScriptIcon(props: IconProps) {
  return <LetterMark label="TS" {...props} />;
}

export function Html5Icon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 3h16l-1.5 15.5L12 21l-6.5-2.5L4 3Z" />
      <path d="M8.3 7.5h7.4l-.4 4H9.6l.3 3 2.1.6 2.1-.6.2-2.4" />
    </svg>
  );
}

export function Css3Icon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 3h16l-1.5 15.5L12 21l-6.5-2.5L4 3Z" />
      <path d="M15.6 8H8.6l.2 2.6h6.5l-.3 3.1-3 1-2.9-1-.2-2" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Frontend                                                                   */
/* -------------------------------------------------------------------------- */

export function ReactIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="1.9" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="9.2" ry="3.9" strokeWidth={1.3} />
      <ellipse cx="12" cy="12" rx="9.2" ry="3.9" strokeWidth={1.3} transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9.2" ry="3.9" strokeWidth={1.3} transform="rotate(120 12 12)" />
    </svg>
  );
}

export function NextJsIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.6 16V8l6.8 9.2M14.4 8v4.6" />
    </svg>
  );
}

export function ReduxIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="5.4" r="2.2" />
      <circle cx="5.6" cy="16.4" r="2.2" />
      <circle cx="18.4" cy="16.4" r="2.2" />
      <path d="M10.2 7.2 7 14.4M13.8 7.2 17 14.4M7.8 16.4h8.4" />
    </svg>
  );
}

export function ContextApiIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z" />
      <path d="m4 12 8 4.5 8-4.5" />
      <path d="m4 16.5 8 4.5 8-4.5" />
    </svg>
  );
}

export function ZustandIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 20 7.6v8.8L12 21l-8-4.6V7.6L12 3Z" />
      <path d="M4 7.6 12 12l8-4.4M12 12v9" />
    </svg>
  );
}

export function TailwindIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 12.6c1.6-3.9 4-5.4 6.8-4.3 1.7.7 2.6 2.2 4.2 2.6 1.9.5 3.4-.4 4.5-2.4" />
      <path d="M6.5 17.9c1.6-3.9 4-5.4 6.8-4.3 1.7.7 2.6 2.2 4.2 2.6 1.9.5 3.4-.4 4.5-2.4" />
    </svg>
  );
}

export function BootstrapIcon(props: IconProps) {
  return <LetterMark label="B" size={11} {...props} />;
}

export function GsapIcon(props: IconProps) {
  return (
    <svg {...solid} {...props}>
      <path d="M13.2 2 5.4 13.2a.6.6 0 0 0 .5.9h4.6l-1 7.6a.4.4 0 0 0 .7.3l7.8-11.1a.6.6 0 0 0-.5-.9h-4.6l1-7.7a.4.4 0 0 0-.7-.3Z" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Backend                                                                    */
/* -------------------------------------------------------------------------- */

export function NodeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2.5 20.2 7v10L12 21.5 3.8 17V7L12 2.5Z" />
      <path d="M9.4 15.4c.6.4 1.6.6 2.6.6 1.6 0 2.6-.8 2.6-3V9" />
    </svg>
  );
}

export function ExpressIcon(props: IconProps) {
  return <LetterMark label="ex" size={8} {...props} />;
}

export function NestJsIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2.5 19.6 6v6.2c0 4.2-3.2 7.4-7.6 9.3-4.4-1.9-7.6-5.1-7.6-9.3V6L12 2.5Z" />
      <path d="M9.4 15.5V8.5l5.2 7V8.5" />
    </svg>
  );
}

export function RestApiIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9.4 4C7.6 4 6.8 4.9 6.8 6.6v1.6c0 1.4-.8 2.1-2.4 2.8 1.6.7 2.4 1.4 2.4 2.8v2.6C6.8 20.1 7.6 21 9.4 21" />
      <path d="M14.6 4c1.8 0 2.6.9 2.6 2.6v1.6c0 1.4.8 2.1 2.4 2.8-1.6.7-2.4 1.4-2.4 2.8v2.6c0 1.9-.8 2.8-2.6 2.8" />
    </svg>
  );
}

export function JwtIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4.8" y="10.4" width="14.4" height="10" rx="2.6" />
      <path d="M8 10.4V7.8a4 4 0 0 1 8 0v2.6" />
      <circle cx="12" cy="15.4" r="1.5" fill="currentColor" stroke="none" />
      <path d="M12 16.9v1.6" />
    </svg>
  );
}

export function RbacIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2.5 19.5 6v6c0 4.4-3.2 7.7-7.5 9.4C7.7 19.7 4.5 16.4 4.5 12V6L12 2.5Z" />
      <circle cx="12" cy="10" r="2.1" />
      <path d="M8.7 16.4c.5-1.7 1.9-2.6 3.3-2.6s2.8.9 3.3 2.6" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Databases                                                                  */
/* -------------------------------------------------------------------------- */

export function MongoDbIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2.4c3.4 3.7 4.6 7.5 3.6 10.8-.8 2.7-2.6 4.3-3.6 4.8-1-.5-2.8-2.1-3.6-4.8-1-3.3.2-7.1 3.6-10.8Z" />
      <path d="M12 2.4v15.6m0 0c-.4 1.4-.5 2.5-.4 3.5m.4-3.5c.4 1.4.5 2.5.4 3.5" />
    </svg>
  );
}

export function PostgresIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <ellipse cx="12" cy="6" rx="8" ry="3.2" />
      <path d="M4 6v12c0 1.8 3.6 3.2 8 3.2s8-1.4 8-3.2V6" />
      <path d="M4 12c0 1.8 3.6 3.2 8 3.2s8-1.4 8-3.2" />
    </svg>
  );
}

export function SupabaseIcon(props: IconProps) {
  return (
    <svg {...solid} {...props}>
      <path d="M13.5 2 5 12.8a.5.5 0 0 0 .4.8H11l-1.4 8.4 8.5-10.8a.5.5 0 0 0-.4-.8H13l.5-8.4Z" />
    </svg>
  );
}

export function PrismaIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 20 20H4L12 3Z" />
      <path d="M12 3v17" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Tools                                                                      */
/* -------------------------------------------------------------------------- */

export function GitIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="6.5" cy="6" r="2.4" />
      <circle cx="6.5" cy="18" r="2.4" />
      <circle cx="17.5" cy="9" r="2.4" />
      <path d="M6.5 8.4v7.2M17.5 11.4c0-2.9-2-4.3-4.4-4.3H9" />
    </svg>
  );
}

export function GitHubIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.6 5.4 2.9 5.4 2.9a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.3c0 4.6 2.7 5.7 5.5 6-.5.6-.5 1.2-.5 2V19" />
    </svg>
  );
}

export function NpmIcon(props: IconProps) {
  return <LetterMark label="npm" size={6.8} {...props} />;
}

export function ViteIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.6 5h16.8L12 21 3.6 5Z" />
      <path d="M12.6 8.4 10 13h3l-2.2 4.6" />
    </svg>
  );
}

export function DockerIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="7" y="8" width="3.2" height="3.2" rx="0.6" />
      <rect x="11" y="8" width="3.2" height="3.2" rx="0.6" />
      <rect x="3" y="12" width="3.2" height="3.2" rx="0.6" />
      <rect x="7" y="12" width="3.2" height="3.2" rx="0.6" />
      <rect x="11" y="12" width="3.2" height="3.2" rx="0.6" />
      <path d="M2 16.2h16.5c1.2 0 2.5-.5 3.5-1.4-1-1.1-2.4-1.3-3.6-1-.3-1.2-.9-2.1-1.7-2.8" />
    </svg>
  );
}

export function VercelIcon(props: IconProps) {
  return (
    <svg {...solid} {...props}>
      <path d="M12 3.5 21.6 20.5H2.4L12 3.5Z" />
    </svg>
  );
}

export function NetlifyIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 21 12l-9 9-9-9 9-9Z" />
      <path d="M12 3v18M3 12h18" />
    </svg>
  );
}

export function VsCodeIcon(props: IconProps) {
  return <LetterMark label="VS" {...props} />;
}

/* -------------------------------------------------------------------------- */
/* Practices                                                                  */
/* -------------------------------------------------------------------------- */

export function ResponsiveIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="5" width="13" height="9.5" rx="1.6" />
      <path d="M6 18.5h6" />
      <rect x="16.5" y="9" width="5" height="10" rx="1.4" />
    </svg>
  );
}

export function WcagIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="7.3" r="1.4" fill="currentColor" stroke="none" />
      <path d="M6.6 10.2c3.6 1 7.2 1 10.8 0" />
      <path d="M12 10.6v4m0 0-2.4 4.4m2.4-4.4 2.4 4.4" />
    </svg>
  );
}

export function MonorepoIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="7.5" height="7.5" rx="1.6" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.6" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.6" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.6" />
    </svg>
  );
}

export function BilingualIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.4 3.8 5.4 3.8 9s-1.3 6.6-3.8 9c-2.5-2.4-3.8-5.4-3.8-9S9.5 5.4 12 3Z" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Generic + group headers                                                    */
/* -------------------------------------------------------------------------- */

export function CodeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 6l-3 12" />
    </svg>
  );
}

export function LayoutIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2.2" />
      <path d="M3 9h18M9 9v11" />
    </svg>
  );
}

export function ServerIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4" width="18" height="7" rx="2.2" />
      <rect x="3" y="13" width="18" height="7" rx="2.2" />
      <path d="M7 7.5h.01M7 16.5h.01" />
    </svg>
  );
}

export function DatabaseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <ellipse cx="12" cy="6" rx="8" ry="3.2" />
      <path d="M4 6v12c0 1.8 3.6 3.2 8 3.2s8-1.4 8-3.2V6" />
      <path d="M4 12c0 1.8 3.6 3.2 8 3.2s8-1.4 8-3.2" />
    </svg>
  );
}

export function SlidersIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h9M18 7h2M4 17h2M9 17h11" />
      <circle cx="15.5" cy="7" r="2.1" />
      <circle cx="6.5" cy="17" r="2.1" />
    </svg>
  );
}

export function CheckBadgeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.2 2.7 2.7L16 9.5" />
    </svg>
  );
}
