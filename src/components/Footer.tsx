import { memo } from 'react';
import { useLang } from '../i18n/context';
import { profile, whatsappLink } from '../data/cv';
import { LinkedInIcon, GitHubIcon, MailIcon, PhoneIcon, WhatsAppIcon, ArrowUpIcon } from './icons';
import { mailtoHref, telHref } from '../lib/links';

const NAV = [
  { id: 'home', key: 'home' },
  { id: 'works', key: 'works' },
  { id: 'skills', key: 'skills' },
  { id: 'timeline', key: 'timeline' },
  { id: 'education', key: 'education' },
  { id: 'contact', key: 'contact' },
] as const;

function FooterBase() {
  const { t, lang } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="section-flow border-t border-[var(--border)] bg-[var(--bg-elevated)]">
      <div className="shell grid gap-10 py-14 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div className="flex flex-col gap-3">
          <a href="#home" className="font-display text-2xl">
            {profile.display[lang]}
            <span className="gold">.</span>
          </a>
          <p className="max-w-sm text-sm text-[var(--text-muted)]">{t.footer.tagline}</p>
          <p className="mono-isolate text-xs text-[var(--text-faint)]">
            {profile.email} · {profile.phone}
          </p>
        </div>

        <nav aria-label={t.footer.explore} className="flex flex-col gap-3">
          <span className="label">{t.footer.explore}</span>
          <ul className="flex flex-col gap-2">
            {NAV.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="inline-flex min-h-[32px] items-center text-sm text-[var(--text-muted)] hover:text-[var(--accent)]"
                >
                  {t.nav[item.key]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-3">
          <span className="label">{t.footer.connect}</span>
          <ul className="flex flex-col gap-2">
            <li>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[32px] items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent)]"
              >
                <LinkedInIcon width={16} height={16} />
                {t.contact.linkedin}
              </a>
            </li>
            <li>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[32px] items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent)]"
              >
                <GitHubIcon width={16} height={16} />
                {t.contact.github}
              </a>
            </li>
            <li>
              <a
                href={mailtoHref}
                className="inline-flex min-h-[32px] items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent)]"
              >
                <MailIcon width={16} height={16} />
                {t.contact.email}
              </a>
            </li>
            <li>
              <a
                href={telHref}
                className="inline-flex min-h-[32px] items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent)]"
              >
                <PhoneIcon width={16} height={16} />
                {t.contact.phone}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[32px] items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent)]"
              >
                <WhatsAppIcon width={16} height={16} />
                {t.contact.whatsapp}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--border)]">
        <div className="shell flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-xs text-[var(--text-faint)]">
            © {year} {profile.display[lang]}. {t.footer.rights}
          </p>
          <p className="text-xs text-[var(--text-faint)]">{t.footer.builtWith}</p>
          <a
            href="#home"
            className="inline-flex min-h-[44px] items-center gap-2 text-xs text-[var(--text-muted)] hover:text-[var(--accent)]"
          >
            <ArrowUpIcon width={16} height={16} />
            {t.footer.toTop}
          </a>
        </div>
      </div>
    </footer>
  );
}

export const Footer = memo(FooterBase);
