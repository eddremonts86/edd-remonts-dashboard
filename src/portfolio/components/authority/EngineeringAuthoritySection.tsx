import { m } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { usePortfolioData } from '@/portfolio/contexts/PortfolioDataContext';
import { fadeInView } from '@/portfolio/lib/motion';
import { ArchitectureAtlas } from './ArchitectureAtlas';

export function EngineeringAuthoritySection() {
  const { t } = useTranslation();
  const { content } = usePortfolioData();

  const convictions = [
    {
      tag: t('authority.conv1Tag', 'Architecture'),
      headline: t('authority.conv1Head', 'Governance prevents collapse.'),
      body:
        content['authority.conv1'] ||
        t(
          'authority.conv1Body',
          'Most frontend codebases collapse because velocity is prioritized over boundaries. Explicit ownership, typed contracts, and feature-scoped modules are not overhead — they are the delivery strategy.',
        ),
    },
    {
      tag: t('authority.conv2Tag', 'State'),
      headline: t('authority.conv2Head', 'Model the domain first.'),
      body:
        content['authority.conv2'] ||
        t(
          'authority.conv2Body',
          'State management problems are usually domain modeling problems. Before reaching for a library, clarify what the UI owns, what the server owns, and where the boundary sits.',
        ),
    },
    {
      tag: t('authority.conv3Tag', 'Resilience'),
      headline: t('authority.conv3Head', 'Types raise confidence; structure defines durability.'),
      body:
        content['authority.conv3'] ||
        t(
          'authority.conv3Body',
          'TypeScript removes a class of bugs, but it does not replace architecture. A well-typed spaghetti codebase is still spaghetti. Invest in the shape of the system, not just its annotations.',
        ),
    },
    {
      tag: t('authority.conv4Tag', 'Performance'),
      headline: t('authority.conv4Head', 'Performance is a product requirement.'),
      body:
        content['authority.conv4'] ||
        t(
          'authority.conv4Body',
          'Treating performance as a post-launch concern is a UX tax. Rendering strategy, payload discipline, and Core Web Vitals belong in the definition of done — not in the retrospective.',
        ),
    },
  ];

  return (
    <section
      id="authority"
      className="relative overflow-hidden border-t border-subtle bg-background py-28 md:py-40"
    >
      {/* Decorative Blueprint Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[1.5%] bg-[radial-gradient(circle_at_1px_1px,currentColor_1px,transparent_0)] bg-size-[20px_20px]" />

      <div className="container relative z-10 mx-auto max-w-[1400px] px-6">
        
        {/* Section Header */}
        <m.div {...fadeInView()} className="mb-20 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-primary font-bold block">
              / TECHNICAL PRINCIPLES
            </span>
            <h2 className="font-serif text-4xl font-light leading-[0.95] tracking-tight md:text-6xl lg:text-8xl">
              Technical <br />
              <span className="font-serif italic text-primary">Principles</span>
            </h2>
          </div>
          <div className="flex items-end lg:col-span-5">
            <p className="max-w-md text-sm font-light leading-relaxed text-foreground/75 md:text-base font-display">
              My engineering convictions are grounded in structural integrity, rigorous quality gates, and data-backed product outcomes. I do not merely write features; I architect durable systems.
            </p>
          </div>
        </m.div>

        {/* Modular Workspace Layout */}
        <div className="space-y-24">
          
          {/* Flagship Component: The Interactive Architecture Atlas */}
          <ArchitectureAtlas />

          {/* Editorial Convictions (Curated & High-Contrast Grid) */}
          <div className="border-t border-subtle/50 pt-16">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary/70 block mb-12 font-bold">
              / CORE CONVICTIONS
            </span>
            
            <div className="grid gap-12 md:grid-cols-2 lg:gap-16">
              {convictions.map((item, i) => (
                <m.div
                  key={item.tag}
                  {...fadeInView({ delay: i * 0.08 })}
                  className="space-y-4 hover:bg-foreground/[0.005] dark:hover:bg-white/[0.005] transition-colors duration-300 p-4 rounded-2xl"
                >
                  <div className="flex items-center gap-2 border-b border-subtle/40 pb-3">
                    <span className="font-mono text-sm font-bold text-primary mr-1">
                      / 0{i + 1}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/45 font-bold">
                      {item.tag}
                    </span>
                  </div>
                  <h4 className="text-xl font-medium leading-snug tracking-tight text-white font-display">
                    {item.headline}
                  </h4>
                  <p className="text-sm font-light leading-relaxed text-foreground/65 max-w-xl font-display">
                    {item.body}
                  </p>
                </m.div>
              ))}
            </div>
          </div>

          {/* Strategic CTA */}
          <div className="flex flex-col items-start justify-between gap-6 border-t border-subtle/50 pt-12 md:flex-row md:items-center">
            <div className="max-w-xl">
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary block mb-2 font-bold">
                / NEXT STEP
              </span>
              <p className="text-lg font-light tracking-tight text-foreground md:text-xl max-w-lg font-display">
                {content['authority.cta'] ||
                  t(
                    'authority.cta',
                    "Looking for an engineer who owns systems, not just tickets? Let's talk.",
                  )}
              </p>
            </div>
            <a
              href="#contact"
              className="group inline-flex shrink-0 items-center gap-3 whitespace-nowrap rounded-full border border-foreground/30 dark:border-white/20 bg-foreground dark:bg-white text-background dark:text-zinc-950 px-6 py-3.5 text-[11px] font-medium uppercase tracking-widest transition-all duration-500 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white md:text-xs cursor-pointer font-mono"
            >
              {t('authority.ctaButton', 'Start a conversation')}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
