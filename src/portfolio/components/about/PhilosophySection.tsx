import { m } from 'framer-motion';
import { fadeInView } from '@/portfolio/lib/motion';
import { Terminal, Shield, Compass } from 'lucide-react';

interface PhilosophyLog {
  id: string;
  index: string;
  tag: string;
  title: string;
  quote: string;
  spec: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const PHILOSOPHY_LOGS: PhilosophyLog[] = [
  {
    id: 'mission',
    index: '/ 01',
    tag: 'GENESIS CONSTRAINTS',
    title: 'Constraints Fuel Invention',
    quote: 'Havana in 2007 taught me that extreme limitations are an engineer\'s greatest gift. When bandwidth is measured in kilobytes, load order and custom asset parsing are not optimizations—they are the survival strategy. My biggest early mistake was thinking raw compute solved latency; in truth, structural constraints teach absolute discipline.',
    spec: 'Inflection: Constrained environments establish lifelong code hygiene.',
    Icon: Terminal,
  },
  {
    id: 'philosophy',
    index: '/ 02',
    tag: 'THE SPEED FALLACY',
    title: 'Structure Creates Speed',
    quote: 'I used to believe that writing code rapidly was the ultimate indicator of developer velocity. I was wrong. Rapid, coupling-heavy coding is a technical debt trap. True speed is a byproduct of structure. Building strict modular boundaries is what enables teams to release independently with absolute confidence.',
    spec: 'Learning: Decoupled component contracts are the true delivery strategy.',
    Icon: Shield,
  },
  {
    id: 'human',
    index: '/ 03',
    tag: 'HUMAN INTERFACES',
    title: 'Bridges Over Silos',
    quote: 'You can engineer the most technically perfect architecture in the world, but if it doesn\'t align with product intent or collaborate comfortably across design systems, its value is zero. Products succeed when developers step out of isolation, coordinate directly with humans, and bridge the gap between intent and outcome.',
    spec: 'Realization: Composable systems succeed through shared trust, not just code.',
    Icon: Compass,
  },
];

export const PhilosophySection = () => {
  return (
    <section className="relative overflow-hidden bg-background py-28 md:py-40 border-t border-subtle/40">
      {/* Decorative background grid and lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-[1.5%] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-size-[24px_24px]" />
      <div className="pointer-events-none absolute -left-40 top-1/4 h-120 w-120 rounded-full bg-primary/[0.015] blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-120 w-120 rounded-full bg-primary/[0.015] blur-3xl" />

      <div className="container mx-auto max-w-350 px-6">
        {/* Section Header (Clean, no monospaced roleplay labels) */}
        <div className="mb-20 max-w-3xl">
          <h2 className="text-4xl font-light tracking-tight md:text-6xl lg:text-7xl leading-[1.05]">
            Career Convictions: <br />
            <span className="font-serif italic text-primary">Philosophy in Action</span>
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-foreground/60 md:text-base font-light">
            Reflective milestones, lessons learned, and real-world engineering failures that shaped a focus on systems resilience.
          </p>
        </div>

        {/* 3-Column Asymmetric Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {PHILOSOPHY_LOGS.map((log, idx) => {
            const Icon = log.Icon;
            return (
              <m.div
                key={log.id}
                {...fadeInView({ delay: idx * 0.15 })}
                className="group relative flex flex-col justify-between rounded-3xl border border-subtle bg-surface/35 p-8 backdrop-blur-md transition-all duration-500 hover:border-primary/20 hover:bg-surface/50 hover:shadow-[0_12px_40px_rgba(209,52,38,0.03)]"
              >
                {/* Visual mesh pattern behind card on hover */}
                <div className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-[1%] bg-[radial-gradient(circle_at_1px_1px,currentColor_1px,transparent_0)] bg-size-[12px_12px] transition-opacity duration-500" />

                <div className="space-y-6 relative z-10">
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-subtle/50 pb-4">
                    <span className="font-serif text-3xl font-light italic text-foreground/35 select-none transition-colors duration-500 group-hover:text-primary/75">
                      {log.index}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/45 font-semibold group-hover:text-foreground/75 transition-colors">
                        {log.tag}
                      </span>
                      <div className="rounded-md border border-subtle/60 bg-background/50 p-1.5 text-foreground/35 group-hover:text-primary transition-colors">
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Conviction Title */}
                  <h3 className="font-display text-xl font-medium tracking-tight text-foreground transition-colors duration-500 group-hover:text-primary">
                    {log.title}
                  </h3>

                  {/* Core Quote */}
                  <blockquote className="font-serif text-base italic font-light text-foreground/80 leading-relaxed py-2 pl-4 border-l border-primary/30">
                    &ldquo;{log.quote}&rdquo;
                  </blockquote>
                </div>

                {/* Scope Spec Footer */}
                <div className="mt-8 border-t border-subtle/50 pt-4 relative z-10">
                  <span className="font-mono text-[9px] text-foreground/35 uppercase block tracking-wider mb-1">
                    Architectural Out-Take
                  </span>
                  <p className="font-mono text-[10px] leading-relaxed text-foreground/60">
                    {log.spec}
                  </p>
                </div>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
