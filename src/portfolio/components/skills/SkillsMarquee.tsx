import { m, AnimatePresence } from 'framer-motion';
import { Layers, Database, Cpu, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TechIcon } from '@/portfolio/components/ui/badges/TechIcon';
import { fadeInView } from '@/portfolio/lib/motion';

interface ExtendedCategory {
  title: string;
  annot: string;
  items: string[];
}

const EXTENDED_CATEGORIES: ExtendedCategory[] = [
  {
    title: 'Frontend & UI Systems',
    annot: 'EXT_PRESENTATION',
    items: [
      'React',
      'Vue.js',
      'Next.js',
      'Nuxt.js',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'HTML5',
      'CSS3',
      'SCSS',
      'SASS',
      'Framer Motion',
      'Radix UI',
      'React Hook Form',
      'Recharts',
      'i18next',
      'Lucide'
    ],
  },
  {
    title: 'State, API & Database',
    annot: 'EXT_PERSISTENCE',
    items: [
      'TanStack Query',
      'TanStack Start',
      'TanStack Router',
      'TanStack Form',
      'TanStack Table',
      'Node.js',
      'PHP',
      'Laravel',
      'Symfony',
      'PostgreSQL',
      'PostGIS',
      'MySQL',
      'Drizzle ORM',
      'ChromaDB',
      'Zod',
      'Axios',
      'date-fns',
      'OpenAI',
      'Anthropic Claude',
      'Ollama'
    ],
  },
  {
    title: 'Infra, DevOps & Security',
    annot: 'EXT_INFRASTRUCTURE',
    items: [
      'Docker',
      'Nginx',
      'Apache',
      'Linux',
      'bash',
      'macOS',
      'Git',
      'GitHub Actions',
      'Netlify',
      'pnpm',
      'Vite',
      'Clerk',
      'Better Auth',
      'Stripe',
      'MapLibre GL'
    ],
  },
  {
    title: 'Quality, CMS & PM',
    annot: 'EXT_GOVERNANCE',
    items: [
      'Vitest',
      'Playwright',
      'Cypress',
      'ESLint',
      'Prettier',
      'Sentry',
      'Drupal',
      'WordPress',
      'Jira',
      'Confluence',
      'DnD Kit'
    ],
  },
];

interface CuratedLayer {
  id: string;
  name: string;
  annot: string;
  Icon: typeof Layers;
  items: string[];
  rationale: string;
}

export const SkillsMarquee = () => {
  const { t } = useTranslation();
  const [isArsenalExpanded, setIsArsenalExpanded] = useState(false);

  const curatedLayers: CuratedLayer[] = useMemo(() => {
    return [
      {
        id: 'governance',
        name: 'Governance & Monorepos',
        annot: '/ WORKSPACE ARCHITECTURE',
        Icon: Layers,
        items: ['Vite', 'pnpm', 'Docker'],
        rationale: 'Establishes rigid boundaries, monorepo configurations, and strict semantic contracts to keep large-scale SaaS systems clean and composable.',
      },
      {
        id: 'performance',
        name: 'Performance & Scale',
        annot: '/ LATENCY & CONVERSION',
        Icon: Cpu,
        items: ['React', 'TypeScript', 'TanStack Query'],
        rationale: 'Enforces sub-12ms interaction latency, optimistic state synchronization, and perfect 100% Core Web Vitals under intensive real-time loads.',
      },
      {
        id: 'leadership',
        name: 'Technical Leadership',
        annot: '/ TEAM SYNCHRONIZATION',
        Icon: Sparkles,
        items: ['GitHub Actions', 'Vitest', 'Playwright'],
        rationale: 'Orchestrates test suites and automated deployment checks, governing technical standards adopted by 20+ engineers across 4 teams.',
      },
      {
        id: 'product',
        name: 'Product Engineering',
        annot: '/ FULL-STACK MATURITY',
        Icon: Database,
        items: ['TanStack Start', 'PostgreSQL', 'Drizzle ORM'],
        rationale: 'Models robust domain layers from database schemas to client state to guarantee type-safety and ensure seamless, high-fidelity user experiences.',
      },
    ];
  }, []);

  return (
    <section
      id="stack"
      className="relative z-20 isolate border-t border-subtle bg-surface py-28 md:py-40"
      aria-label={t('a11y.skillsMarquee')}
    >
      <div className="absolute inset-0 pointer-events-none opacity-[2.5%] bg-[linear-gradient(to_right,#efefef_1px,transparent_1px),linear-gradient(to_bottom,#efefef_1px,transparent_1px)] bg-size-[32px_32px] mask-image-[linear-to-b,transparent,rgba(0,0,0,1)_20%,rgba(0,0,0,1)_80%,transparent]" />

      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-24 items-start">
          
          {/* Left Column: Section Title & Narrative (5 cols) */}
          <m.div 
            {...fadeInView()} 
            className="lg:col-span-5 space-y-6"
          >
            <div>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-primary font-bold">
                / TECHNICAL EXPERTISE
              </p>
              <h2 className="font-display text-4xl font-light tracking-tight md:text-5xl lg:text-6xl text-white leading-[1.1]">
                Architectural <br />
                <span className="font-serif italic text-primary">Capabilities</span>
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-foreground/65 font-light font-display">
                Technologies are commodities; architectural alignment and governance are competitive differentiators. Here is how my technical stacks are marshaled to deliver verified business speed and performance stability.
              </p>
              
              {/* Deployed full tech registry trigger */}
              <div className="mt-8">
                <button
                  onClick={() => setIsArsenalExpanded(!isArsenalExpanded)}
                  className="group inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 hover:bg-primary/10 px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-primary font-bold transition-all duration-300 hover:border-primary/45 select-none cursor-pointer"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  {isArsenalExpanded ? '/ COLLAPSE FULL REGISTRY' : '/ DEPLOY FULL TECH REGISTRY'}
                </button>
              </div>
            </div>
          </m.div>

          {/* Right Column: The Curated Stack Layers Matrix (7 cols) */}
          <div className="lg:col-span-7 grid gap-6 sm:grid-cols-2 relative">
            {curatedLayers.map((layer, index) => {
              const Icon = layer.Icon;
              return (
                <m.div
                  key={layer.id}
                  {...fadeInView({ delay: index * 0.08 })}
                  className="group relative rounded-2xl border border-subtle bg-background p-6 shadow-xs transition-all duration-500 hover:border-primary/20 hover:shadow-[0_16px_36px_rgba(209,52,38,0.02)] hover:-translate-y-0.5"
                >
                  {/* Visual coordinate annotation */}
                  <div className="absolute top-4 right-5 font-mono text-[8px] text-foreground/20 uppercase tracking-widest">
                    {layer.annot}
                  </div>

                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-subtle text-foreground/45 transition-colors group-hover:border-primary/45 group-hover:text-primary bg-surface/50">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-primary block font-bold">
                        SYSTEM_0{index + 1}
                      </span>
                      <h3 className="text-sm font-semibold tracking-tight text-foreground font-display">
                        {layer.name}
                      </h3>
                    </div>
                  </div>

                  {/* Monospaced Rationale Statement (Engineering Judgement) */}
                  <p className="font-mono text-[9px] text-foreground/60 leading-relaxed mb-6 bg-surface/40 p-3 rounded-lg border border-subtle select-none">
                    <span className="text-primary block font-bold uppercase tracking-wider text-[8px] mb-1">/ SYSTEM DESIGN DECISION</span>
                    {layer.rationale}
                  </p>

                  {/* Curated Tech Items (Premium Outline Pills) */}
                  <div className="flex flex-wrap gap-2">
                    {layer.items.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1.5 rounded-full border border-subtle bg-surface/40 px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider text-foreground/75 transition-colors group-hover:border-foreground/20 group-hover:bg-background"
                      >
                        <TechIcon skill={tech} className="h-3.5 w-3.5" />
                        {tech}
                      </span>
                    ))}
                  </div>
                </m.div>
              );
            })}
          </div>

        </div>

        {/* Extended Technical Registry inspector panel */}
        <AnimatePresence>
          {isArsenalExpanded && (
            <m.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 48 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border border-white/10 bg-zinc-950/40 rounded-3xl p-8 backdrop-blur-md relative select-none"
            >
              {/* Technical Grid Blueprint */}
              <div className="absolute inset-0 pointer-events-none opacity-[1.5%] bg-[linear-gradient(to_right,#efefef_1px,transparent_1px),linear-gradient(to_bottom,#efefef_1px,transparent_1px)] bg-size-[20px_20px]" />

              {/* Panel Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/55">
                    Extended Technical Registry
                  </span>
                </div>
                <div className="font-mono text-[8px] text-white/35">SYS_INSPECTOR: DEPLOYED</div>
              </div>

              {/* Responsive Columns */}
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
                {EXTENDED_CATEGORIES.map((cat, i) => (
                  <div key={cat.title} className="space-y-4">
                    <div className="border-b border-white/5 pb-2">
                      <span className="font-mono text-[8.5px] text-primary uppercase tracking-widest block">
                        / 0{i + 1} {cat.annot}
                      </span>
                      <h4 className="font-display text-sm font-semibold text-white mt-1">
                        {cat.title}
                      </h4>
                    </div>
                    <ul className="space-y-2.5 font-mono text-[9.5px]">
                      {cat.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-foreground/75 hover:text-white transition-colors duration-250 select-none">
                          <TechIcon skill={item} className="h-3.5 w-3.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
