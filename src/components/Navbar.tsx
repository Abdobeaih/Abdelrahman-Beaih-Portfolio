import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useLang } from '../i18n/context';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { MenuIcon, CloseIcon } from './icons';
import { profile } from '../data/cv';

const NAV_IDS = ['home', 'works', 'skills', 'timeline', 'education', 'contact'] as const;
type NavId = (typeof NAV_IDS)[number];

/** Stable array identity so `useScrollSpy` does not rebuild its observer each render. */
const SCROLL_IDS = [...NAV_IDS];

const NAV_KEYS: Record<NavId, string> = {
  home: 'home',
  works: 'works',
  skills: 'skills',
  timeline: 'timeline',
  education: 'education',
  contact: 'contact',
};

function NavbarBase() {
  const { t, lang, toggle } = useLang();
  const activeId = useScrollSpy(SCROLL_IDS);
  const [open, setOpen] = useState(false);
  const listRef = useRef<HTMLUListElement | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false });

  const items = useMemo(
    () => NAV_IDS.map((id) => ({ id, label: t.nav[NAV_KEYS[id] as keyof typeof t.nav] })),
    [t],
  );

  useLayoutEffect(() => {
    const container = listRef.current;
    const link = linkRefs.current[activeId];
    if (!container || !link) {
      setIndicator((prev) => ({ ...prev, visible: false }));
      return;
    }
    const cr = container.getBoundingClientRect();
    const lr = link.getBoundingClientRect();
    setIndicator({ left: lr.left - cr.left, width: lr.width, visible: true });
  }, [activeId, lang, items]);

  useEffect(() => {
    const onResize = () => {
      const container = listRef.current;
      const link = linkRefs.current[activeId];
      if (!container || !link) return;
      const cr = container.getBoundingClientRect();
      const lr = link.getBoundingClientRect();
      setIndicator({ left: lr.left - cr.left, width: lr.width, visible: true });
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [activeId]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const handleNavClick = useCallback(() => setOpen(false), []);

  return (
    <header className="glass sticky top-0 z-50 border-b border-[var(--border)]">
      <nav
        className="shell flex h-16 items-center justify-between gap-4"
        aria-label={lang === 'ar' ? 'التنقل الرئيسي' : 'Primary navigation'}
      >
        <a
          href="#home"
          className="font-display text-xl tracking-tight"
          aria-label={`AB — ${profile.display[lang]}`}
          onClick={handleNavClick}
        >
          <span className="mono-isolate">AB</span>
          <span className="gold">.</span>
        </a>

        <ul ref={listRef} className="relative hidden items-center gap-7 lg:flex">
          {items.map((item) => (
            <li key={item.id}>
              <a
                ref={(el) => {
                  linkRefs.current[item.id] = el;
                }}
                href={`#${item.id}`}
                className="nav-link text-sm"
                aria-current={activeId === item.id ? 'true' : undefined}
                onClick={handleNavClick}
              >
                {item.label}
              </a>
            </li>
          ))}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 h-0.5 rounded-full bg-[var(--accent)] transition-[left,width,opacity] duration-300"
            style={{
              left: indicator.left,
              width: indicator.width,
              opacity: indicator.visible ? 1 : 0,
              transitionTimingFunction: 'var(--ease-entrance)',
            }}
          />
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            className="chip hover:border-[var(--border-strong)]"
            aria-label={`${t.lang.label} — ${t.lang.switchTo}`}
          >
            <span className="mono-isolate">{t.lang.label}</span>
          </button>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.close : t.nav.menu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="glass border-t border-[var(--border)] lg:hidden"
      >
        <ul className="shell flex flex-col py-3">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="flex min-h-[44px] items-center text-base text-[var(--text-muted)] hover:text-[var(--text)]"
                aria-current={activeId === item.id ? 'true' : undefined}
                onClick={handleNavClick}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

export const Navbar = memo(NavbarBase);
