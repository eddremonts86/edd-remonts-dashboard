import { m } from 'framer-motion';
import { ArrowUpRight, Compass, ShieldCheck, Zap, Activity, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { fadeInView } from '@/portfolio/lib/motion';

interface LessonItem {
  index: string;
  title: string;
  body: string;
}

interface HowIWorkItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
}

const LESSONS: LessonItem[] = [
  {
    index: '01',
    title: 'Architecture is People',
    body: 'Systems succeed when developer coordination boundaries align cleanly with system boundaries. Conway’s Law is not a theory; it is an active engineering constraint.',
  },
  {
    index: '02',
    title: 'Governance Enables Velocity',
    body: 'Rigid system boundaries and strict semantic contracts are not blockers. They are the essential guardrails that allow independent teams to move and release at maximum speed.',
  },
  {
    index: '03',
    title: 'Performance is a Business Metric',
    body: 'Interaction latency and LCP directly determine user retention and business conversion. Treating performance as a post-launch polish is a high-cost operational tax.',
  },
  {
    index: '04',
    title: 'Complexity Compounds',
    body: 'The most expensive line of code is the one you write without a clear boundary contract. A well-typed spaghetti codebase is still spaghetti; model the domain structure first.',
  },
  {
    index: '05',
    title: 'The Best Systems are Boring',
    body: 'Highly predictable, stable, and decoupled patterns outperform exciting but hyper-coupled novelties every single day. Predictability is the ultimate indicator of systems maturity.',
  },
];

const HOW_I_WORK: HowIWorkItem[] = [
  {
    icon: Compass,
    title: 'Pragmatic Decision Making',
    body: 'I prioritize stable, predictable standards and model structural boundaries and data schemas before choosing libraries or tools.',
  },
  {
    icon: ShieldCheck,
    title: 'Active Mentorship & Trust',
    body: 'I replace isolated developer silos with active peer alignment, code reviews, and shared contracts, raising the capabilities of the entire team.',
  },
  {
    icon: Zap,
    title: 'Product-Minded Alignment',
    body: 'I translate technical possibilities directly into business value, coordinating closely with product managers and stakeholders to bridge execution gaps.',
  },
  {
    icon: Activity,
    title: 'Debt Minimization Strategy',
    body: 'I manage tech debt proactively by establishing strict module isolation, preventing coupling, and maintaining clear API documentation.',
  },
  {
    icon: Award,
    title: 'Empowered Autonomy',
    body: 'I architect system guidelines and standards so that individual product squads can build and deploy safely with absolute confidence and zero friction.',
  },
];

export function EngineeringAuthoritySection() {
  const { t } = useTranslation();

  return (
    <section
      id="authority"
      className="relative overflow-hidden border-t border-subtle bg-background py-28 md:py-40"
    >
      {/* Decorative Blueprint Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[1.5%] bg-[radial-gradient(circle_at_1px_1px,currentColor_1px,transparent_0)] bg-size-[24px_24px]" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <m.div {...fadeInView()} className="mb-24 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="mb-4 font-mono text-[9px] uppercase tracking-[0.25em] text-primary font-bold block animate-pulse">
              / LEADERSHIP & PHILOSOPHY
            </span>
            <h2 className="font-serif text-4xl font-light leading-[0.95] tracking-tight md:text-6xl lg:text-7xl text-white">
              Engineering <br />
              <span className="font-serif italic text-primary">Leadership</span>
            </h2>
          </div>
          <div className="flex items-end lg:col-span-5">
            <p className="max-w-md text-sm font-light leading-relaxed text-foreground/75 md:text-base font-display">
              Technical excellence is not just about typing code; it is about scaling systems, aligning teams, and driving business outcomes through mature technical governance.
            </p>
          </div>
        </m.div>

        {/* Dual Column Leadership Grid */}
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-24 items-start">
          
          {/* Column A: Lessons From 18 Years */}
          <div className="lg:col-span-6 space-y-12">
            <div className="border-b border-white/5 pb-6">
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary/70 block mb-2 font-bold">
                / MATURITY
              </span>
              <h3 className="text-2xl font-light tracking-tight text-white font-display">
                Lessons From 18 Years
              </h3>
            </div>

            <div className="space-y-8">
              {LESSONS.map((lesson) => (
                <m.div
                  key={lesson.index}
                  {...fadeInView()}
                  className="flex gap-6 items-start"
                >
                  <span className="font-serif text-2xl font-light italic text-foreground/20 shrink-0">
                    /{lesson.index}
                  </span>
                  <div className="space-y-1.5">
                    <h4 className="text-sm font-semibold tracking-tight text-white font-display">
                      {lesson.title}
                    </h4>
                    <p className="text-xs leading-relaxed text-foreground/65 font-light font-display">
                      {lesson.body}
                    </p>
                  </div>
                </m.div>
              ))}
            </div>
          </div>

          {/* Column B: How I Work */}
          <div className="lg:col-span-6 space-y-12 lg:mt-0">
            <div className="border-b border-white/5 pb-6">
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary/70 block mb-2 font-bold">
                / EXECUTION
              </span>
              <h3 className="text-2xl font-light tracking-tight text-white font-display">
                How I Work
              </h3>
            </div>

            <div className="grid gap-6">
              {HOW_I_WORK.map((item, i) => {
                const Icon = item.icon;
                return (
                  <m.div
                    key={item.title}
                    {...fadeInView({ delay: i * 0.06 })}
                    className="group rounded-2xl border border-white/10 bg-white/[0.01] p-6 backdrop-blur-md flex gap-5 items-start transition-all duration-500 hover:border-primary/20 hover:bg-white/[0.02]"
                  >
                    <div className="p-2 rounded-lg border border-white/5 bg-zinc-950 text-white/40 group-hover:text-primary transition-colors shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="text-sm font-semibold tracking-tight text-white group-hover:text-primary transition-colors duration-300">
                        {item.title}
                      </h4>
                      <p className="text-xs leading-relaxed text-foreground/65 font-light font-display">
                        {item.body}
                      </p>
                    </div>
                  </m.div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Strategic CTA */}
        <div className="flex flex-col items-start justify-between gap-6 border-t border-white/5 pt-16 mt-24 md:flex-row md:items-center">
          <div className="max-w-xl">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary block mb-2 font-bold">
              / PARTNERSHIP
            </span>
            <p className="text-lg font-light tracking-tight text-foreground md:text-xl max-w-lg font-display">
              Looking for a Staff Engineer who coordinates systems, governs boundaries, and mentors squads? Let’s talk.
            </p>
          </div>
          <a
            href="#contact"
            className="group inline-flex shrink-0 items-center gap-3 whitespace-nowrap rounded-full border border-foreground/30 dark:border-white/20 bg-white text-zinc-950 px-6 py-3.5 text-[11px] font-medium uppercase tracking-widest transition-all duration-500 hover:bg-primary hover:text-white md:text-xs cursor-pointer font-mono"
          >
            {t('authority.ctaButton', 'Start a conversation')}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
          </a>
        </div>

      </div>
    </section>
  );
}
