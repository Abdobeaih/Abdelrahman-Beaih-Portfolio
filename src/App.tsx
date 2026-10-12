import { lazy, Suspense } from 'react';
import { useLang } from './i18n/context';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { DeferSection } from './components/DeferSection';

// Every scroll-animated section is code-split and only fetched when first
// needed, which also keeps GSAP/ScrollTrigger out of the initial JS graph.
const StatsStrip = lazy(() =>
  import('./components/StatsStrip').then((m) => ({ default: m.StatsStrip })),
);
const Works = lazy(() => import('./components/Works').then((m) => ({ default: m.Works })));
const Skills = lazy(() => import('./components/Skills').then((m) => ({ default: m.Skills })));
const Timeline = lazy(() => import('./components/Timeline').then((m) => ({ default: m.Timeline })));
const Community = lazy(() => import('./components/Community').then((m) => ({ default: m.Community })));
const Philosophy = lazy(() => import('./components/Philosophy').then((m) => ({ default: m.Philosophy })));
const Contact = lazy(() => import('./components/Contact').then((m) => ({ default: m.Contact })));

function SectionFallback() {
  const { t } = useLang();
  return (
    <div className="shell section-y" role="status" aria-live="polite" aria-label={t.common.loading}>
      <span className="sr-only">{t.common.loading}</span>
    </div>
  );
}

export function App() {
  const { t } = useLang();

  return (
    <>
      <a href="#main" className="sr-only-focusable btn btn-primary fixed start-4 top-4 z-[200]">
        {t.common.skipToContent}
      </a>

      <div className="grain-overlay" aria-hidden="true" />

      <Navbar />

      <main id="main">
        <Hero />
        <DeferSection minHeight={280} rootMargin="0px">
          <Suspense fallback={<SectionFallback />}>
            <StatsStrip />
          </Suspense>
        </DeferSection>
        <DeferSection id="works">
          <Suspense fallback={<SectionFallback />}>
            <Works />
          </Suspense>
        </DeferSection>
        <DeferSection id="skills">
          <Suspense fallback={<SectionFallback />}>
            <Skills />
          </Suspense>
        </DeferSection>
        <DeferSection id="timeline">
          <Suspense fallback={<SectionFallback />}>
            <Timeline />
          </Suspense>
        </DeferSection>
        <DeferSection id="education" minHeight={320}>
          <Suspense fallback={<SectionFallback />}>
            <Community />
          </Suspense>
        </DeferSection>
        <DeferSection minHeight={320}>
          <Suspense fallback={<SectionFallback />}>
            <Philosophy />
          </Suspense>
        </DeferSection>
        <DeferSection id="contact" minHeight={320}>
          <Suspense fallback={<SectionFallback />}>
            <Contact />
          </Suspense>
        </DeferSection>
      </main>

      <Footer />
    </>
  );
}
