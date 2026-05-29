import { fadeInView } from '@/portfolio/lib/motion';
import { m } from 'framer-motion';
import { Compass, Sparkles, Layers } from 'lucide-react';

export interface EraData {
  id: string;
  period: string;
  title: string;
  focus: string;
  scopeLevel: string;
  narrative: string;
  changed: string;
  remained: string;
  learned: string;
  companies: string[];
  vector: string;
  teamScope?: string;
  governanceScope?: string;
}

interface ExperienceCardProps {
  era: EraData;
  index: number;
}

export const ExperienceCard = ({ era, index }: ExperienceCardProps) => {
  return (
    <m.div
      {...fadeInView({ delay: Math.min(index * 0.12, 0.4) })}
      className="group relative flex cursor-default gap-6 py-16 transition-colors duration-500 md:gap-10 border-b border-subtle/30 last:border-b-0"
    >
      {/* Timeline Node & Evolution Line */}
      <div
        aria-hidden
        className="mt-1.5 shrink-0 flex-col items-center md:flex"
      >
        <span className="h-3.5 w-3.5 rounded-full border-2 border-primary bg-background ring-4 ring-background transition-all duration-500 group-hover:bg-primary group-hover:scale-110" />
        <div className="w-px flex-1 bg-subtle/30 mt-3 group-hover:bg-primary/20 transition-colors duration-500" />
      </div>

      {/* Content Layout */}
      <div className="-mx-4 flex flex-1 flex-col justify-between px-4 transition-colors duration-500 hover:bg-foreground/[0.005] md:flex-row md:rounded-3xl md:px-6 md:py-6">
        
        {/* Left Column: Period, Era Title, Authority scope, and Company taglines */}
        <div className="mb-8 flex w-full flex-col md:mb-0 md:w-[35%] md:pr-8">
          <span className="mb-2 font-mono text-[10px] tracking-[0.25em] text-primary uppercase font-bold">
            {era.period}
          </span>
          <h3 className="mb-4 text-3xl font-light tracking-tight text-white font-serif italic group-hover:text-primary transition-colors duration-350 leading-tight">
            {era.title}
          </h3>
          
          {/* Authority Scope Meter */}
          <div className="mt-2 space-y-1.5 max-w-xs">
            <div className="flex items-center justify-between font-mono text-[9px] text-foreground/45 uppercase tracking-wider">
              <span>Operational Complexity</span>
              <span className="font-semibold text-white/70">{era.scopeLevel}</span>
            </div>
            <div className="h-1 w-full bg-foreground/10 dark:bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-700 group-hover:scale-x-105 origin-left"
                style={{ width: era.scopeLevel }}
              />
            </div>
          </div>

          {/* Scope Boundaries */}
          {(era.teamScope || era.governanceScope) && (
            <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.01] p-3 space-y-2 font-mono text-[8.5px] max-w-xs select-none">
              {era.teamScope && (
                <div>
                  <span className="text-foreground/35 block uppercase tracking-wider">/ TEAM SCOPE</span>
                  <span className="text-white/80 font-bold block mt-0.5">{era.teamScope}</span>
                </div>
              )}
              {era.governanceScope && (
                <div>
                  <span className="text-foreground/35 block uppercase tracking-wider">/ GOVERNANCE SCOPE</span>
                  <span className="text-white/80 font-bold block mt-0.5">{era.governanceScope}</span>
                </div>
              )}
            </div>
          )}

          {/* Associated Company matrices (Clean, no brackets, elegant mono tags) */}
          <div className="mt-8">
            <span className="font-mono text-[8px] text-foreground/35 uppercase tracking-widest block mb-2">
              Milestone Anchors
            </span>
            <div className="flex flex-wrap gap-1.5">
              {era.companies.map((c) => (
                <span key={c} className="rounded-md border border-subtle bg-surface/35 px-2.5 py-1 font-mono text-[8px] text-foreground/60 tracking-wider">
                  {c.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Focus, Narrative, and structured 3-part ledger */}
        <div className="flex w-full flex-col justify-start md:w-[65%] space-y-6">
          <div className="space-y-1">
            <span className="font-mono text-[8.5px] text-white/35 uppercase tracking-widest block">
              Core Architecture Focus
            </span>
            <div className="flex items-center gap-1.5 font-display text-lg font-medium text-white">
              <Compass className="h-4 w-4 text-primary animate-pulse" />
              <span>{era.focus}</span>
            </div>
          </div>

          {/* Narrative */}
          <p className="text-foreground/75 text-sm font-light leading-relaxed font-display max-w-2xl italic">
            &ldquo;{era.narrative}&rdquo;
          </p>

          {/* Cinematic 3-Part Ledger (Refined, high-contrast, text-driven) */}
          <div className="grid gap-6 sm:grid-cols-3 border-t border-subtle/30 pt-6">
            <div className="space-y-2">
              <span className="font-mono text-[8px] uppercase tracking-widest text-primary font-bold block">
                / WHAT CHANGED
              </span>
              <p className="text-[11px] leading-relaxed text-foreground/70 font-light font-display">
                {era.changed}
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-[8px] uppercase tracking-widest text-primary font-bold block">
                / WHAT REMAINED
              </span>
              <p className="text-[11px] leading-relaxed text-foreground/70 font-light font-display">
                {era.remained}
              </p>
            </div>

            <div className="space-y-2 rounded-xl border border-primary/10 bg-primary/[0.015] p-3">
              <span className="font-mono text-[8px] uppercase tracking-widest text-primary font-bold block flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-primary" />
                LEARNED
              </span>
              <p className="text-[11px] leading-relaxed text-foreground/75 font-light font-display">
                {era.learned}
              </p>
            </div>
          </div>

          {/* Tech Vector indicator */}
          <div className="flex items-center gap-2 border-t border-subtle/30 pt-4">
            <Layers className="h-3.5 w-3.5 text-foreground/25 shrink-0" />
            <span className="font-mono text-[9px] uppercase tracking-wider text-foreground/45">
              Core Technologies: {era.vector}
            </span>
          </div>
        </div>
      </div>
    </m.div>
  );
};
