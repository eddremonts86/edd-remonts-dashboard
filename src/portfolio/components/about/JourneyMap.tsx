import { m } from 'framer-motion';
import { useState } from 'react';
import { MapPin, Compass, Globe } from 'lucide-react';

interface JourneyMilestone {
  year: string;
  location: string;
  coordinates: string;
  title: string;
  era: string;
  philosophy: string;
  description: string;
  impact: string;
}

const MILESTONES: JourneyMilestone[] = [
  {
    year: '2007',
    location: 'Havana, Cuba',
    coordinates: '23.1136° N, 82.3666° W',
    era: 'The Genesis Era',
    title: 'Extreme Constraint Engineering',
    philosophy: 'Bandwidth is a luxury; performance is absolute.',
    description: 'Developed high-performance systems under severe infrastructure limits. When connection speed is measured in kilobytes, load order, caching strategies, and asset optimization are not optimizations—they are the survival strategy.',
    impact: 'Engineered custom ultra-lightweight client-side parsing libraries and custom DB syncing layers.',
  },
  {
    year: '2014',
    location: 'Remote Ecosystems',
    coordinates: '41.3851° N, 2.1734° E',
    era: 'The Full-Stack Era',
    title: 'Scaling Architectural Boundaries',
    philosophy: 'Decouple state from delivery; protect domain interfaces.',
    description: 'Transitioned to complex service architectures and event-driven state models. Learned to coordinate large migrations from legacy systems to decoupled frontends, defining robust API boundaries.',
    impact: 'Architected scalable ecommerce frontends and modular billing portals with zero-downtime database schemas.',
  },
  {
    year: '2018',
    location: 'Copenhagen, Denmark',
    coordinates: '55.6761° N, 12.5683° E',
    era: 'The Systems Era',
    title: 'Platform Engineering & Governance',
    philosophy: 'Craft components as infrastructure; govern the boundary.',
    description: 'Spearheading design system maturity, enterprise architecture, and micro-frontend structures. Mentoring engineering divisions and converting complex business domains into composable, resilient platforms.',
    impact: 'Pioneered core frontend platforms for Schilling, slashing initial bundle sizes by 42% and cycle times by 30%.',
  },
];

export const JourneyMap = () => {
  const [activeIndex, setActiveIndex] = useState(2);

  return (
    <div className="relative mt-16 rounded-3xl border border-subtle bg-surface/40 p-6 md:p-10 backdrop-blur-md">
      {/* Decorative topology coordinates */}
      <div className="absolute top-4 right-6 font-mono text-[9px] text-foreground/20 hidden md:block">
        / TOPOLOGY SYNC: 55.6761 · 12.5683
      </div>

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        {/* Left Column: Visual Journey Track */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Compass className="h-4 w-4 text-primary animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/45">
                Trajectory Blueprint
              </span>
            </div>
            <h3 className="text-2xl font-light tracking-tight md:text-3xl font-display mb-8">
              The Evolution of a <br />
              <span className="font-serif italic text-primary">Systems Mindset</span>
            </h3>
          </div>

          {/* Vertical Milestone Selector Track */}
          <div className="relative flex flex-col gap-8 md:pl-4">
            {/* Background line */}
            <div className="absolute left-4 top-2 bottom-2 w-px border-l border-dashed border-border-default/45 md:left-5" />

            {MILESTONES.map((milestone, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={milestone.year}
                  onClick={() => setActiveIndex(idx)}
                  className="group relative flex items-start gap-4 text-left focus:outline-none transition-all duration-300"
                >
                  <div
                    className={`z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-500 md:h-10 md:w-10 ${
                      isActive
                        ? 'border-primary bg-primary text-white scale-110 shadow-[0_0_15px_rgba(209,52,38,0.3)]'
                        : 'border-white/10 dark:border-white/5 bg-background/25 text-foreground/45 group-hover:border-foreground/35 group-hover:text-foreground'
                    }`}
                  >
                    <span className="font-mono text-xs font-bold leading-none">{milestone.year.slice(2)}</span>
                  </div>

                  <div className="min-w-0 pt-1">
                    <h4
                      className={`text-sm font-semibold tracking-tight transition-colors duration-300 ${
                        isActive ? 'text-primary' : 'text-foreground/60 group-hover:text-foreground'
                      }`}
                    >
                      {milestone.location}
                    </h4>
                    <span className="block font-mono text-[9px] tracking-wider text-foreground/30 uppercase mt-0.5">
                      {milestone.era}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Mindset Inspector Panel */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-white/10 dark:border-white/5 bg-background/30 p-6 md:p-8 backdrop-blur-md shadow-[0_8px_32px_0_rgba(0,0,0,0.15)] relative overflow-hidden">
          {/* Blueprint grid background */}
          <div className="absolute inset-0 pointer-events-none opacity-[2%] bg-[radial-gradient(circle_at_1px_1px,currentColor_1px,transparent_0)] bg-size-[16px_16px]" />

          <m.div
            key={activeIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="space-y-6 relative z-10"
          >
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary/70 block">
                  Milestone Coordinates
                </span>
                <span className="font-mono text-xs text-foreground/60 flex items-center gap-1.5 mt-1">
                  <MapPin className="h-3 w-3 text-foreground/40" />
                  {MILESTONES[activeIndex].coordinates}
                </span>
              </div>
              <div className="rounded-md border border-white/10 bg-background/25 px-3 py-1 font-mono text-xs tracking-wider text-foreground/60 backdrop-blur-xs">
                YEAR: {MILESTONES[activeIndex].year}
              </div>
            </div>

            {/* Core titles */}
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/45 block mb-1">
                {MILESTONES[activeIndex].era}
              </span>
              <h4 className="font-display text-2xl font-light tracking-tight text-foreground md:text-3xl">
                {MILESTONES[activeIndex].title}
              </h4>
            </div>

            {/* Philosophy quote */}
            <div className="border-l-2 border-primary/40 pl-4 py-1 italic text-foreground/80 font-serif text-base">
              &ldquo;{MILESTONES[activeIndex].philosophy}&rdquo;
            </div>

            {/* Narrative description */}
            <p className="text-sm leading-relaxed text-foreground/70 md:text-base font-light">
              {MILESTONES[activeIndex].description}
            </p>

            {/* Proof of impact metrics */}
            <div className="rounded-xl border border-primary/10 bg-primary/[0.01] p-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary block mb-1.5">
                Core Systems Contribution
              </span>
              <p className="text-xs md:text-sm text-foreground/75 leading-relaxed font-mono">
                {MILESTONES[activeIndex].impact}
              </p>
            </div>
          </m.div>

          {/* Compass / Globe graphic inside the inspector */}
          <div className="absolute right-4 bottom-4 opacity-5 pointer-events-none hidden md:block">
            <Globe className="h-32 w-32 text-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
};
