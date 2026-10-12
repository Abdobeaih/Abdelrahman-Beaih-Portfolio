import { memo, type CSSProperties } from 'react';
import { useLang } from '../i18n/context';
import { profile, whatsappLink } from '../data/cv';
import { Magnetic } from './Magnetic';
import {
  LinkedInIcon,
  GitHubIcon,
  MailIcon,
  WhatsAppIcon,
  ArrowUpRightIcon,
} from './icons';
import { JourneyMap } from './JourneyMap';
import { mailtoHref, resumeHref, resumeIsExternal } from '../lib/links';

interface SocialLink {
  href: string;
  label: string;
  Icon: typeof LinkedInIcon;
  external: boolean;
}

const delay = (ms: number): CSSProperties => ({ '--d': `${ms}ms` }) as CSSProperties;

function HeroBase() {
  const { t, lang } = useLang();

  const socials: SocialLink[] = [
    { href: profile.links.linkedin, label: 'LinkedIn', Icon: LinkedInIcon, external: true },
    { href: profile.links.github, label: 'GitHub', Icon: GitHubIcon, external: true },
    { href: mailtoHref, label: t.contact.email, Icon: MailIcon, external: false },
    { href: whatsappLink, label: t.contact.whatsapp, Icon: WhatsAppIcon, external: true },
  ];

  return (
    <section id="home" className="relative overflow-hidden pt-16 sm:pt-24">
      <div
        aria-hidden="true"
        className="hero-orb flow-drift -top-40 start-[-10%] sm:start-[30%]"
      />
      <div className="shell relative z-10 grid gap-12 pb-20 sm:pb-28 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)] lg:items-center">
        <div className="flex min-w-0 flex-col gap-7">
          <div className="hero-in flex flex-wrap items-center gap-3" style={delay(0)}>
            <span className="label">{t.hero.eyebrow}</span>
            <span className="chip border-[var(--accent-soft)] text-[var(--text-muted)]">
              <span className="flow-dot h-1.5 w-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
              {profile.location[lang]}
            </span>
          </div>

          <h1
            className="font-display hero-in"
            style={{ fontSize: 'var(--hero-name)', lineHeight: 0.98, letterSpacing: '-0.02em', ...delay(90) }}
          >
            <span className="block text-[var(--text-muted)] text-2xl sm:text-3xl">
              {t.hero.greeting}
            </span>
            {profile.display[lang]}
          </h1>

          <p
            className="hero-in max-w-xl text-lg text-[var(--text)] sm:text-xl"
            style={delay(180)}
          >
            {t.hero.valueLine}
          </p>

          <p className="hero-in max-w-2xl text-[var(--text-muted)]" style={delay(270)}>
            {t.hero.paragraphLead}{' '}
            <span className="gold">{t.hero.paragraphMid}</span>.{' '}
            {t.hero.paragraphTail}
          </p>

          <div className="hero-in flex flex-wrap items-center gap-3" style={delay(360)}>
            <Magnetic>
              <a
                href={resumeHref}
                className="btn btn-primary"
                {...(resumeIsExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {t.hero.ctaResume}
                <ArrowUpRightIcon width={16} height={16} />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="btn btn-outline">
                {t.hero.ctaTalk}
              </a>
            </Magnetic>
          </div>

          <ul className="hero-in flex items-center gap-2 pt-2" style={delay(450)} aria-label="Social links">
            {socials.map(({ href, label, Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-in min-w-0" style={delay(200)}>
          <JourneyMap />
        </div>
      </div>
    </section>
  );
}

export const Hero = memo(HeroBase);
