import { AnimatePresence, m } from 'framer-motion';
import {
  ArrowUpRight,
  Boxes,
  Brain,
  ChevronDown,
  Cloud,
  Code2,
  Cpu,
  Database,
  FlaskConical,
  Gauge,
  Layers,
  Rocket,
  Search,
  Shield,
  Smartphone,
  Sparkles,
  Workflow,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePortfolioData } from '@/portfolio/contexts/PortfolioDataContext';
import { fadeInView } from '@/portfolio/lib/motion';

const ICON_MAP: Record<string, LucideIcon> = {
  code: Code2,
  design: Sparkles,
  mobile: Smartphone,
  search: Search,
  rocket: Rocket,
  shield: Shield,
  database: Database,
  cloud: Cloud,
  ai: Brain,
  zap: Zap,
  brain: Brain,
  layers: Layers,
  workflow: Workflow,
  cpu: Cpu,
  gauge: Gauge,
  flask: FlaskConical,
};

function toList(value: string | undefined, fallback: string[]): string[] {
  if (!value) return fallback;
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function getIcon(slug: string | undefined): LucideIcon {
  if (!slug) return Boxes;
  return ICON_MAP[slug.toLowerCase()] ?? Boxes;
}

interface Practice {
  id: string;
  title: string;
  body: string;
  icon: LucideIcon;
}

export function EngineeringAuthoritySection() {
  const { t } = useTranslation();
  const { content, services } = usePortfolioData();
  const [openId, setOpenId] = useState<string>('architecture');

  const principles = toList(content['authority.principles'], [
    'Composition over inheritance for long-term maintainability',
    'Type-safe boundaries between UI, API, and domain',
    'Performance budgets enforced as product requirements',
    'Accessibility-first components as default behavior',
  ]);

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

  const practices: Practice[] = [
    {
      id: 'architecture',
      title: t('authority.tabs.architecture', 'Architecture'),
      icon: Layers,
      body:
        content['authority.architecture'] ||
        'Modular feature ownership, typed contracts, and explicit boundaries to prevent accidental coupling.',
    },
    {
      id: 'dx',
      title: t('authority.tabs.dx', 'Developer Experience'),
      icon: Workflow,
      body:
        content['authority.dx'] ||
        'Reusable CRUD primitives, quality gates, and clear conventions that keep delivery fast and consistent.',
    },
    {
      id: 'testing',
      title: t('authority.tabs.testing', 'Testing & Quality'),
      icon: FlaskConical,
      body:
        content['authority.testing'] ||
        'Unit + E2E coverage for critical workflows, with confidence focused on business behavior and regressions.',
    },
    {
      id: 'performance',
      title: t('authority.tabs.performance', 'Performance'),
      icon: Gauge,
      body:
        content['authority.performance'] ||
        'Measurable improvements through rendering strategy, payload discipline, and observability-led tuning.',
    },
    {
      id: 'ai',
      title: t('authority.tabs.ai', 'AI-assisted workflow'),
      icon: Brain,
      body:
        content['authority.ai'] ||
        'Agent-assisted planning, review automation, and verification loops that reduce cycle time without lowering quality.',
    },
  ];

  return (
    <section
      id="authority"
      className="relative overflow-hidden border-y border-subtle bg-background py-24 md:py-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[4%] bg-[radial-gradient(circle_at_1px_1px,currentColor_1px,transparent_0)] bg-size-[24px_24px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-20 h-112 w-md rounded-full bg-primary/5 blur-3xl"
      />

      <div className="container relative z-10 mx-auto max-w-[1400px] px-6">
        <m.div {...fadeInView()} className="mb-14 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-primary/70">
              {content['authority.eyebrow'] || t('authority.eyebrow', 'Engineering Authority')}
            </p>
            <h2 className="font-serif text-5xl font-light leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
              {content['authority.title'] || t('authority.title', 'From execution to systems leadership')}
            </h2>
          </div>
          <div className="flex items-end lg:col-span-5">
            <p className="max-w-md text-base font-light leading-relaxed text-foreground/70 md:text-lg">
              {content['authority.subtitle'] ||
                t(
                  'authority.subtitle',
                  'Beyond shipping interfaces: product engineering, scalable architecture, and measurable outcomes.',
                )}
            </p>
          </div>
        </m.div>

        <div className="overflow-hidden rounded-2xl border border-subtle bg-subtle">
          {services.length > 0 && (
            <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, idx) => {
                const Icon = getIcon(service.iconSlug);
                return (
                  <m.div
                    key={service.id}
                    {...fadeInView({ delay: idx * 0.05 })}
                    className="group flex flex-col gap-4 bg-background px-6 py-7 transition-colors duration-300 hover:bg-foreground/3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-subtle text-foreground/50 transition-colors group-hover:border-primary/45 group-hover:text-primary">
                        <Icon className="h-4 w-4" aria-hidden />
                      </div>
                      <span className="font-mono text-[10px] tabular-nums text-foreground/30">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-foreground">{service.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/65">
                        {service.description}
                      </p>
                    </div>
                  </m.div>
                );
              })}
            </div>
          )}

          <div className="grid gap-px lg:grid-cols-12">
            <m.div
              {...fadeInView({ delay: 0.08 })}
              className="bg-background px-6 py-8 lg:col-span-5 lg:px-8 lg:py-10"
            >
              <p className="mb-7 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/45">
                {t('authority.principlesLabel', 'Engineering principles')}
              </p>
              <ol className="space-y-6">
                {principles.map((item, idx) => (
                  <li key={item} className="flex items-start gap-4">
                    <span className="mt-0.5 font-mono text-[11px] tracking-[0.22em] text-primary/65">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <p className="text-[15px] leading-relaxed text-foreground/80 md:text-base">{item}</p>
                  </li>
                ))}
              </ol>
            </m.div>

            <m.div
              {...fadeInView({ delay: 0.12 })}
              className="bg-background px-6 py-8 lg:col-span-7 lg:px-8 lg:py-10"
            >
              <p className="mb-7 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/45">
                {t('authority.practiceLabel', 'How it shows in practice')}
              </p>
              <div className="overflow-hidden rounded-xl border border-subtle bg-subtle">
                {practices.map((practice) => {
                  const isOpen = openId === practice.id;
                  const Icon = practice.icon;
                  return (
                    <div key={practice.id} className="bg-background border-b border-subtle last:border-b-0">
                      <button
                        type="button"
                        onClick={() => setOpenId(practice.id)}
                        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-foreground/3"
                      >
                        <span className="flex min-w-0 items-center gap-4">
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                              isOpen
                                ? 'border-primary/45 bg-primary/8 text-primary'
                                : 'border-subtle text-foreground/55'
                            }`}
                          >
                            <Icon className="h-4 w-4" aria-hidden />
                          </span>
                          <span className="text-base font-medium text-foreground md:text-lg">
                            {practice.title}
                          </span>
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 text-foreground/45 transition-transform duration-300 ${
                            isOpen ? 'rotate-180 text-foreground' : ''
                          }`}
                          aria-hidden
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <m.div
                            id={`practice-${practice.id}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="px-5 pb-6 pl-17 text-sm leading-relaxed text-foreground/70 md:text-base">
                              {practice.body}
                            </p>
                          </m.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </m.div>
          </div>

          <div className="grid gap-px md:grid-cols-2">
            {convictions.map((item, i) => (
              <figure
                key={item.tag}
                className="group flex flex-col gap-4 bg-background px-6 py-7 transition-colors duration-500 hover:bg-foreground/3"
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="font-mono text-[10px] tabular-nums text-foreground/25 transition-colors duration-500 group-hover:text-primary/55"
                  >
                    0{i + 1}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/60">
                    {item.tag}
                  </span>
                </div>
                <figcaption className="text-base font-medium leading-snug tracking-tight text-foreground md:text-lg">
                  {item.headline}
                </figcaption>
                <p className="text-sm font-light leading-relaxed text-foreground/60">{item.body}</p>
              </figure>
            ))}
          </div>

          <div className="flex flex-col items-start justify-between gap-6 bg-background px-6 py-7 md:flex-row md:items-center md:px-8">
            <div className="max-w-xl">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-primary/70">
                {t('authority.ctaLabel', 'Next step')}
              </p>
              <p className="text-lg font-light tracking-tight text-foreground md:text-xl">
                {content['authority.cta'] ||
                  t(
                    'authority.cta',
                    "Looking for an engineer who owns systems, not just tickets? Let's talk.",
                  )}
              </p>
            </div>
            <a
              href="#contact"
              className="group inline-flex shrink-0 items-center gap-3 whitespace-nowrap rounded-full border border-foreground/30 bg-foreground px-6 py-3 text-[11px] font-medium uppercase tracking-widest text-background transition-all duration-500 hover:bg-primary hover:text-white md:text-xs"
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
