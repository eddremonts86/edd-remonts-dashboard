import { AnimatePresence, m } from 'framer-motion';
import { ChevronDown, ChevronUp, Layers, Database, Cpu, Compass } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TechIcon } from '@/portfolio/components/ui/badges/TechIcon';
import { usePortfolioData } from '@/portfolio/contexts/PortfolioDataContext';
import { fadeInView } from '@/portfolio/lib/motion';

interface StackLayer {
  id: string;
  name: string;
  annot: string;
  desc: string;
  Icon: typeof Layers;
  items: string[];
}

export const SkillsMarquee = () => {
  const { t } = useTranslation();
  const { skills, isLoading } = usePortfolioData();
  const [showFullStack, setShowFullStack] = useState(false);

  const allSkills = useMemo(
    () => skills.filter((value, idx, arr) => arr.indexOf(value) === idx),
    [skills],
  );

  // Group technologies into three logical architectural layers
  const stackLayers: StackLayer[] = useMemo(() => {
    return [
      {
        id: 'client',
        name: 'Client Layout & Hydration Core',
        annot: '/ PRESENTATION 01',
        desc: 'Highly interactive, accessible, and fluid user experiences with sub-millisecond transition scopes.',
        Icon: Compass,
        items: ['React', 'Next.js', 'Framer Motion', 'Radix UI', 'Tailwind CSS'],
      },
      {
        id: 'sync',
        name: 'State Transaction & Sync boundary',
        annot: '/ SYNCHRONIZATION 02',
        desc: 'Type-safe contracts, local data caching, deduplicated queries, and event sync schemas.',
        Icon: Layers,
        items: ['TypeScript', 'TanStack Query', 'Drizzle ORM', 'Zod', 'React Hook Form'],
      },
      {
        id: 'infra',
        name: 'Edge Environment & Data Storage',
        annot: '/ INFRASTRUCTURE 03',
        desc: 'Scalable backend containers, transactional persistence databases, and AI agent execution blocks.',
        Icon: Database,
        items: ['Node.js', 'PostgreSQL', 'Docker', 'Ollama', 'GitHub Actions'],
      },
    ];
  }, []);

  if (isLoading || skills.length === 0) return null;

  return (
    <section
      id="stack"
      className="relative z-20 isolate border-y border-subtle bg-surface py-28 md:py-40"
      aria-label={t('a11y.skillsMarquee')}
    >
      <div className="absolute inset-0 pointer-events-none opacity-[2.5%] bg-[linear-gradient(to_right,#efefef_1px,transparent_1px),linear-gradient(to_bottom,#efefef_1px,transparent_1px)] bg-size-[32px_32px] mask-image-[linear-to-b,transparent,rgba(0,0,0,1)_20%,rgba(0,0,0,1)_80%,transparent]" />

      <div className="container mx-auto max-w-7xl px-6">
        
        {/* Section Title */}
        <div className="mb-20 max-w-3xl">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
            / TECH STACK
          </p>
          <h2 className="font-display text-4xl font-light tracking-tight md:text-6xl lg:text-7xl text-foreground">
            The Isomorphic <br />
            <span className="font-serif italic text-primary">Systems Stack</span>
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-foreground/70 md:text-base font-light">
            A representation of my core technical stack organized by structural boundaries, rather than a generic checklist. Built for scale, type safety, and real-time synchronization.
          </p>
        </div>

        {/* The horizontal system stack pipeline map */}
        <div className="grid gap-8 lg:grid-cols-3 relative mb-20">
          
          {/* Connector lines behind cards for large viewports */}
          <div className="absolute top-1/2 left-0 right-0 h-px border-t border-dashed border-border-default/35 -translate-y-1/2 hidden lg:block pointer-events-none" />

          {stackLayers.map((layer, index) => {
            const Icon = layer.Icon;
            return (
              <m.div
                key={layer.id}
                {...fadeInView({ delay: index * 0.12 })}
                className="group relative rounded-2xl border border-subtle bg-background p-6 md:p-8 shadow-xs transition-all duration-500 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_24px_48px_rgba(0,0,0,0.05)]"
              >
                {/* Visual coordinate details */}
                <div className="absolute top-4 right-5 font-mono text-[8px] text-foreground/20 uppercase tracking-widest hidden md:block">
                  {layer.annot}
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-subtle text-foreground/50 transition-colors group-hover:border-primary/45 group-hover:text-primary bg-surface/50">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary block">
                      LAYER 0{index + 1}
                    </span>
                    <h3 className="text-base font-semibold tracking-tight text-foreground font-display">
                      {layer.name}
                    </h3>
                  </div>
                </div>

                <p className="text-xs leading-relaxed text-foreground/65 font-light mb-6">
                  {layer.desc}
                </p>

                {/* Sub items within this layer */}
                <div className="flex flex-wrap gap-2">
                  {layer.items.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1.5 rounded-full border border-subtle bg-surface/40 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-foreground/75 transition-colors group-hover:border-foreground/20 group-hover:bg-background"
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

        {/* The engineering toolbox: full browseable stack */}
        <div className="rounded-2xl border border-subtle bg-background/65 px-4 py-3 max-w-4xl mx-auto">
          <button
            type="button"
            onClick={() => setShowFullStack((prev) => !prev)}
            className="flex w-full items-center justify-between gap-4 rounded-xl px-2 py-2 text-left focus:outline-none"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/65 flex items-center gap-2">
              <Cpu className="h-3.5 w-3.5 text-primary animate-pulse" />
              {t('skills.toolbox', 'Engineering toolbox')}
            </span>
            <span className="inline-flex items-center gap-2 text-xs text-foreground/60">
              {showFullStack
                ? t('skills.hide', 'Hide full stack')
                : t('skills.view', 'View full stack')}
              {showFullStack ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </span>
          </button>

          <AnimatePresence initial={false} mode="wait">
            {showFullStack && (
              <m.div
                key="full-stack"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.28 }}
                className="mt-4 pb-3 flex flex-wrap gap-2 overflow-hidden border-t border-subtle pt-4 px-2"
              >
                {allSkills.length > 0 ? (
                  allSkills.map((skill, index) => (
                    <m.span
                      key={skill}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, delay: Math.min(index * 0.012, 0.32) }}
                      whileHover={{ y: -2, scale: 1.02 }}
                      className="inline-flex items-center gap-1.5 rounded-full border border-subtle bg-background px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/70 transition-colors hover:border-foreground/25 hover:text-foreground"
                    >
                      <TechIcon skill={skill} className="h-3.5 w-3.5" />
                      {skill}
                    </m.span>
                  ))
                ) : (
                  <p className="text-xs text-foreground/60">
                    {t('skills.fullStackEmpty', 'The full stack is already represented.')}
                  </p>
                )}
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
