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
      className="relative overflow-hidden border-y border-subtle bg-background py-28 md:py-40"
    >
      {/* Decorative Blueprint Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[2.5%] bg-[radial-gradient(circle_at_1px_1px,currentColor_1px,transparent_0)] bg-size-[20px_20px]" />

      <div className="container relative z-10 mx-auto max-w-[1400px] px-6">
        
        {/* Section Header */}
        <m.div {...fadeInView()} className="mb-20 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
              / INTELLECTUAL LEADERSHIP
            </p>
            <h2 className="font-serif text-4xl font-light leading-[0.95] tracking-tight md:text-6xl lg:text-8xl">
              Systems &amp; <br />
              <span className="font-serif italic text-primary">Intellectual Leadership</span>
            </h2>
          </div>
          <div className="flex items-end lg:col-span-5">
            <p className="max-w-md text-sm font-light leading-relaxed text-foreground/70 md:text-base">
              My engineering convictions are grounded in architectural governance, rigorous quality gates, and data-backed product outcomes. I do not merely write features; I build platforms.
            </p>
          </div>
        </m.div>

        {/* Unified Editorial Layout Workspace */}
        <div className="space-y-24">
          
          {/* 1. Systems Capability Table (Replaces generic service cards) */}
          {services.length > 0 && (
            <div className="border-t border-subtle">
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary/70 block py-4">
                / CAPABILITIES MATRIX
              </span>
              
              <div className="divide-y divide-subtle">
                {services.map((service, idx) => {
                  const Icon = getIcon(service.iconSlug);
                  return (
                    <m.div
                      key={service.id}
                      {...fadeInView({ delay: idx * 0.05 })}
                      className="group py-8 flex flex-col md:flex-row gap-6 md:items-start justify-between hover:bg-foreground/[0.01] transition-colors duration-300 md:px-6"
                    >
                      <div className="flex items-start gap-6 md:w-1/3">
                        <span className="font-mono text-xs text-primary/65 pt-1 font-bold">
                          SYSTEM 0{idx + 1}
                        </span>
                        <div>
                          <h3 className="text-lg font-medium text-foreground font-display flex items-center gap-2">
                            <Icon className="h-4.5 w-4.5 text-foreground/45 group-hover:text-primary transition-colors" />
                            {service.title}
                          </h3>
                        </div>
                      </div>
                      <div className="md:w-2/3 md:pl-10">
                        <p className="text-sm leading-relaxed text-foreground/65 max-w-2xl font-light">
                          {service.description}
                        </p>
                      </div>
                    </m.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. Principles & Practices Layout */}
          <div className="grid gap-12 lg:grid-cols-12 border-t border-subtle pt-16">
            
            {/* Left Column: Principles */}
            <m.div
              {...fadeInView({ delay: 0.08 })}
              className="lg:col-span-5 space-y-8"
            >
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary/70 block mb-2">
                  / CORE PRINCIPLES
                </span>
                <h3 className="font-serif text-3xl font-light tracking-tight text-foreground">
                  Foundational <br />
                  <span className="font-serif italic text-primary">Precepts</span>
                </h3>
              </div>
              
              <ol className="space-y-8">
                {principles.map((item, idx) => (
                  <li key={item} className="flex items-start gap-4">
                    <span className="font-mono text-xs text-primary/65 pt-0.5 font-bold">
                      {String(idx + 1).padStart(2, '0')}.
                    </span>
                    <p className="text-[15px] leading-relaxed text-foreground/80 font-light">{item}</p>
                  </li>
                ))}
              </ol>
            </m.div>

            {/* Right Column: Practices (Interactive Accordion) */}
            <m.div
              {...fadeInView({ delay: 0.12 })}
              className="lg:col-span-7 space-y-8"
            >
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary/70 block mb-2">
                  / PRACTICES IN ACTION
                </span>
                <h3 className="font-serif text-3xl font-light tracking-tight text-foreground">
                  Mindset in <br />
                  <span className="font-serif italic text-primary">Action</span>
                </h3>
              </div>

              <div className="rounded-xl border border-subtle bg-surface/30 backdrop-blur-xs divide-y divide-subtle overflow-hidden">
                {practices.map((practice) => {
                  const isOpen = openId === practice.id;
                  const Icon = practice.icon;
                  return (
                    <div key={practice.id} className="bg-background/40">
                      <button
                        type="button"
                        onClick={() => setOpenId(practice.id)}
                        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-foreground/[0.02]"
                      >
                        <span className="flex min-w-0 items-center gap-4">
                          <span
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                              isOpen
                                ? 'border-primary/45 bg-primary/8 text-primary'
                                : 'border-subtle text-foreground/55 bg-background'
                            }`}
                          >
                            <Icon className="h-4 w-4" aria-hidden />
                          </span>
                          <span className="text-base font-semibold text-foreground font-display">
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
                            <p className="px-6 pb-6 pl-18 text-sm leading-relaxed text-foreground/70 font-light">
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

          {/* 3. Asymmetric Editorial Convictions (Replaces standard cards grid) */}
          <div className="border-t border-subtle pt-16">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary/70 block mb-12">
              / CORE CONVICTIONS
            </span>
            
            <div className="grid gap-12 md:grid-cols-2 lg:gap-16">
              {convictions.map((item, i) => (
                <m.div
                  key={item.tag}
                  {...fadeInView({ delay: i * 0.08 })}
                  className="space-y-4 hover:bg-foreground/[0.005] transition-colors duration-300 p-4 rounded-xl"
                >
                  <div className="flex items-center gap-2 border-b border-subtle pb-3">
                    <span className="font-serif text-3xl font-light text-primary/20 leading-none select-none font-display">
                      [0{i + 1}]
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary font-bold">
                      {item.tag}
                    </span>
                  </div>
                  <h4 className="text-xl font-medium leading-snug tracking-tight text-foreground font-display">
                    {item.headline}
                  </h4>
                  <p className="text-sm font-light leading-relaxed text-foreground/65 max-w-xl">
                    {item.body}
                  </p>
                </m.div>
              ))}
            </div>
          </div>

          {/* 4. Strategic CTA */}
          <div className="flex flex-col items-start justify-between gap-6 border-t border-subtle pt-12 md:flex-row md:items-center">
            <div className="max-w-xl">
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary block mb-2">
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
