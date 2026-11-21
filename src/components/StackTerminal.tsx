import { memo, useEffect, useState } from 'react';
import { useLang } from '../i18n/context';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface TermLine {
  cmd: string;
  out: string;
}

/**
 * The stack story as a living terminal. Each line types itself out, prints its
 * output, then the next runs; when the script ends the session restarts.
 * Code stays English in both languages — it is literal shell, not prose.
 */
const SCRIPT: TermLine[] = [
  { cmd: 'whoami', out: 'abdelrahman.beaih — full-stack MERN developer' },
  { cmd: 'npm run build', out: '✓ react · typescript · node · mongodb — production ready' },
  { cmd: 'git push origin main', out: '✓ deployed — vercel / github pages' },
  { cmd: 'docker compose up -d', out: '✓ api + database containers healthy' },
];

function StackTerminalBase() {
  const { t } = useLang();
  const reduced = useReducedMotion();

  // done  = lines fully printed (cmd + out)
  // typed = chars typed of the current command
  // out   = current line's output visible
  const [done, setDone] = useState(0);
  const [typed, setTyped] = useState(0);
  const [out, setOut] = useState(false);

  useEffect(() => {
    if (reduced) return undefined;
    let id: ReturnType<typeof setTimeout>;

    if (done >= SCRIPT.length) {
      // Session complete — hold, then restart fresh.
      id = setTimeout(() => {
        setDone(0);
        setTyped(0);
        setOut(false);
      }, 5000);
    } else if (typed < SCRIPT[done].cmd.length) {
      id = setTimeout(() => setTyped((c) => c + 1), 45 + Math.random() * 55);
    } else if (!out) {
      id = setTimeout(() => setOut(true), 380);
    } else {
      id = setTimeout(() => {
        setDone((d) => d + 1);
        setTyped(0);
        setOut(false);
      }, 1100);
    }

    return () => clearTimeout(id);
  }, [done, typed, out, reduced]);

  const rendered = reduced
    ? SCRIPT.map((line) => ({ ...line, typedCmd: line.cmd, showOut: true }))
    : [
        ...SCRIPT.slice(0, done).map((line) => ({ ...line, typedCmd: line.cmd, showOut: true })),
        ...(done < SCRIPT.length
          ? [
              {
                ...SCRIPT[done],
                typedCmd: SCRIPT[done].cmd.slice(0, typed),
                showOut: out,
              },
            ]
          : []),
      ];

  return (
    <div className="term" dir="ltr" aria-label={t.skills.terminalLabel}>
      <div className="term-bar">
        <span className="term-dot" style={{ background: '#ff5f57' }} />
        <span className="term-dot" style={{ background: '#febc2e' }} />
        <span className="term-dot" style={{ background: '#28c840' }} />
        <span className="term-title mono-isolate">{t.skills.terminalTitle}</span>
        <span className="term-live mono-isolate">
          <span className="term-live-dot" aria-hidden="true" />
          {t.skills.terminalLive}
        </span>
      </div>
      <div className="term-body">
        {rendered.map((line, i) => (
          <div key={`${line.cmd}-${i}`}>
            <div className="term-line">
              <span className="term-prompt">$</span> <span className="term-cmd">{line.typedCmd}</span>
              {i === rendered.length - 1 && !line.showOut ? (
                <span className="term-cursor" aria-hidden="true" />
              ) : null}
            </div>
            {line.showOut ? <div className="term-out">{line.out}</div> : null}
          </div>
        ))}
        {done >= SCRIPT.length || reduced ? (
          <div className="term-line">
            <span className="term-prompt">$</span> <span className="term-cursor" aria-hidden="true" />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export const StackTerminal = memo(StackTerminalBase);
