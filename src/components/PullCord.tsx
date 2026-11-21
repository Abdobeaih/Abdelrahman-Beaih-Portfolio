import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';
import { readTheme, toggleTheme, type Theme } from '../lib/theme';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * PullCord — the lamp-cord theme switch.
 * A gold-tipped cord hangs from the top edge of the page. Pull it down past
 * the snap point (or click / press Enter) and the light snaps on (light mode)
 * or off (dark mode), with a springy recoil. Dark+gold stays the default.
 */

const REST = 88; // px — cord length at rest
const SNAP = 44; // px — extra pull needed to trigger
const MAX = 170; // px — hard stop for the stretch

function PullCordBase() {
  const [theme, setTheme] = useState<Theme>('dark');
  const reduced = useReducedMotion();
  const cordRef = useRef<HTMLDivElement>(null);
  const stretch = useRef(0);
  const dragging = useRef(false);
  const moved = useRef(0);
  const startY = useRef(0);
  const busy = useRef(false);

  useEffect(() => {
    setTheme(readTheme());
  }, []);

  const render = useCallback((x: number) => {
    const el = cordRef.current;
    if (el) el.style.height = `${REST + x}px`;
  }, []);

  const recoil = useCallback(
    (snap: boolean) => {
      const obj = { x: stretch.current };
      if (snap) {
        // Quick dip past the snap point, then elastic settle — the lamp "click".
        gsap
          .timeline({
            onUpdate: () => render(obj.x),
            onComplete: () => {
              stretch.current = 0;
              busy.current = false;
            },
          })
          .to(obj, { x: SNAP + 14, duration: 0.08, ease: 'power2.in' })
          .to(obj, { x: 0, duration: reduced ? 0.01 : 0.9, ease: 'elastic.out(1.1, 0.32)' });
      } else {
        gsap.to(obj, {
          x: 0,
          duration: reduced ? 0.01 : 0.8,
          ease: 'elastic.out(1.1, 0.35)',
          onUpdate: () => render(obj.x),
          onComplete: () => {
            stretch.current = 0;
            busy.current = false;
          },
        });
      }
    },
    [render, reduced],
  );

  const fire = useCallback(() => {
    setTheme(toggleTheme());
  }, []);

  const release = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    const pulled = stretch.current;
    const wasClick = moved.current < 6;
    busy.current = true;
    if (pulled >= SNAP || wasClick) {
      fire();
      recoil(true);
    } else {
      recoil(false);
    }
  }, [fire, recoil]);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
    if (busy.current) return;
    dragging.current = true;
    moved.current = 0;
    startY.current = e.clientY;
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      if (!dragging.current) return;
      const dy = e.clientY - startY.current;
      moved.current = Math.max(moved.current, Math.abs(dy));
      // Resistance: the further you pull, the heavier the cord feels.
      const x = Math.max(0, Math.min(MAX, dy * 0.55));
      stretch.current = x;
      render(x);
    },
    [render],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (busy.current) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        busy.current = true;
        fire();
        recoil(true);
      }
    },
    [fire, recoil],
  );

  const light = theme === 'light';

  return (
    <div className="pullcord" aria-hidden="false">
      {light ? <div className="pullcord-glow" aria-hidden="true" /> : null}
      <div ref={cordRef} className="pullcord-cord" style={{ height: REST }}>
        <span className="pullcord-line" />
      </div>
      <button
        type="button"
        className={`pullcord-knob${light ? ' is-on' : ''}`}
        role="switch"
        aria-checked={light}
        aria-label={light ? 'Switch to dark mode' : 'Switch to light mode'}
        title={light ? 'Lights on — pull to go dark' : 'Pull the cord for light mode'}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={release}
        onPointerCancel={release}
        onKeyDown={onKeyDown}
      >
        <span className="pullcord-ring" aria-hidden="true" />
      </button>
    </div>
  );
}

export const PullCord = memo(PullCordBase);
