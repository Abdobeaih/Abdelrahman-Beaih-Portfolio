import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useLang } from '../i18n/context';
import { profile, whatsappLink } from '../data/cv';
import { SectionHeading } from './SectionHeading';
import { useReveal } from '../hooks/useReveal';
import {
  LinkedInIcon,
  GitHubIcon,
  PhoneIcon,
  MailIcon,
  CopyIcon,
  CheckIcon,
  ArrowUpRightIcon,
  WhatsAppIcon,
} from './icons';
import { mailtoHref, resumeHref, resumeIsExternal, telHref } from '../lib/links';

function ContactBase() {
  const { t } = useLang();
  const revealRef = useReveal<HTMLDivElement>();
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      const input = document.createElement('input');
      input.value = profile.email;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  }, []);

  const cards = [
    {
      key: 'linkedin',
      label: t.contact.linkedin,
      value: 'in/abdelrhmanbeaih',
      href: profile.links.linkedin,
      Icon: LinkedInIcon,
      external: true,
    },
    {
      key: 'github',
      label: t.contact.github,
      value: '@Abdobeaih',
      href: profile.links.github,
      Icon: GitHubIcon,
      external: true,
    },
    {
      key: 'phone',
      label: t.contact.phone,
      value: profile.phone,
      href: telHref,
      Icon: PhoneIcon,
      external: false,
    },
    {
      key: 'resume',
      label: t.contact.resume,
      value: t.contact.resumeHint,
      href: resumeHref,
      Icon: ArrowUpRightIcon,
      external: resumeIsExternal,
    },
  ];

  return (
    <section className="section-flow section-y border-t border-[var(--border)]">
      <div className="shell">
        <SectionHeading
          eyebrow={t.contact.eyebrow}
          title={t.contact.title}
          accent={t.contact.title.split(' ').slice(-1)[0]}
          subtitle={t.contact.subtitle}
        />

        <div ref={revealRef} className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div className="card flex flex-col gap-6 p-6 sm:p-8" data-reveal>
            <span className="label">{t.contact.email}</span>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={mailtoHref}
                className="mono-isolate break-all text-xl text-[var(--text)] hover:text-[var(--accent)] sm:text-2xl"
              >
                {profile.email}
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button type="button" onClick={copyEmail} className="btn btn-primary" aria-live="polite">
                {copied ? <CheckIcon width={16} height={16} /> : <CopyIcon width={16} height={16} />}
                {copied ? t.contact.copied : t.contact.copy}
              </button>
              <a href={mailtoHref} className="btn btn-outline">
                <MailIcon width={16} height={16} />
                {t.hero.ctaTalk}
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <WhatsAppIcon width={16} height={16} />
                {t.contact.whatsapp}
                <ArrowUpRightIcon width={16} height={16} />
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {cards.map(({ key, label, value, href, Icon, external }) => (
              <a
                key={key}
                href={href}
                className="card card-hover flex items-center justify-between gap-4 p-5"
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                data-reveal
              >
                <span className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--accent)]">
                    <Icon width={18} height={18} />
                  </span>
                  <span className="flex flex-col">
                    <span className="label">{label}</span>
                    <span className="mono-isolate text-sm text-[var(--text)]">{value}</span>
                  </span>
                </span>
                <ArrowUpRightIcon width={16} height={16} className="text-[var(--text-faint)]" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export const Contact = memo(ContactBase);
