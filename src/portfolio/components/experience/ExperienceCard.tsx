import { fadeInView } from '@/portfolio/lib/motion';
import { m } from 'framer-motion';
import { ShieldCheck, Cpu, Compass, Layers } from 'lucide-react';

export interface EraData {
  id: string;
  period: string;
  title: string;
  focus: string;
  scopeLevel: string;
  description: string;
  achievements: string[];
  companies: string[];
  vector: string;
}

interface ExperienceCardProps {
  era: EraData;
  index: number;
}

const ERA_ICONS = {
  platforms: ShieldCheck,
  scaling: Cpu,
  genesis: Compass,
};

export const ExperienceCard = ({ era, index }: ExperienceCardProps) => {
  const Icon = ERA_ICONS[era.id as keyof typeof ERA_ICONS] || Cpu;

  return (
    <m.div
      {...fadeInView({ delay: Math.min(index * 0.12, 0.4) })}
      className="group relative flex cursor-default gap-6 py-12 transition-colors duration-500 md:gap-10 border-b border-subtle/30 last:border-b-0"
    >
      {/* Timeline Node & Evolution Line */}
      <div
        aria-hidden
        className="mt-1.5 hidden shrink-0 flex-col items-center md:flex"
      >
        <span className="h-3.5 w-3.5 rounded-full border-2 border-primary bg-background ring-4 ring-background transition-all duration-500 group-hover:bg-primary group-hover:scale-110" />
        <div className="w-px flex-1 bg-subtle/30 mt-3 group-hover:bg-primary/20 transition-colors duration-500" />
      </div>

      {/* Content Layout */}
      <div className="-mx-4 flex flex-1 flex-col justify-between px-4 transition-colors duration-500 hover:bg-foreground/[0.01] dark:hover:bg-white/[0.01] md:flex-row md:rounded-3xl md:px-6 md:py-6">
        
        {/* Left Column: Period, Era Title, Authority scope, and Company taglines (4 cols on desktop) */}
        <div className="mb-8 flex w-full flex-col md:mb-0 md:w-[35%] md:pr-8">
          <span className="mb-2 font-mono text-[10px] tracking-[0.25em] text-primary uppercase font-bold">
            {era.period}
          </span>
          <h3 className="mb-2 text-2xl font-light tracking-tight text-white font-serif italic group-hover:text-primary transition-colors duration-350">
            {era.title}
          </h3>
          
          {/* Authority Scope Meter */}
          <div className="mt-5 space-y-1.5 max-w-xs">
            <div className="flex items-center justify-between font-mono text-[9px] text-foreground/45 uppercase tracking-wider">
              <span>Authority Scope</span>
              <span className="font-semibold text-white/70">{era.scopeLevel}</span>
            </div>
            <div className="h-1 w-full bg-foreground/10 dark:bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-700 group-hover:scale-x-105 origin-left"
                style={{ width: era.scopeLevel }}
              />
            </div>
          </div>

          {/* Associated Company matrices (Clean, monospaced tag pills) */}
          <div className="mt-6 flex flex-wrap gap-2">
            {era.companies.map((c) => (
              <span key={c} className="rounded-md border border-subtle/60 dark:border-white/5 bg-surface/30 px-2 py-0.5 font-mono text-[8.5px] text-foreground/50 tracking-wider">
                [{c.toUpperCase()}]
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: Focus, Description, and Bullet Achievements (8 cols on desktop) */}
        <div className="flex w-full flex-col justify-start md:w-[65%]">
          <div className="mb-4 space-y-1">
            <span className="font-mono text-[9px] text-white/35 uppercase tracking-widest block">
              Core Architectural Focus
            </span>
            <div className="flex items-center gap-1.5 font-display text-lg font-medium text-white transition-colors group-hover:text-white">
              <Icon className="h-4.5 w-4.5 text-primary animate-pulse" />
              <span>{era.focus}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-foreground/75 text-sm font-light leading-relaxed mb-6 font-display">
            {era.description}
          </p>

          {/* High-impact Achievements List */}
          <ul className="space-y-3 pl-1 mb-6">
            {era.achievements.map((ach, i) => (
              <li key={i} className="flex gap-3 text-xs leading-relaxed text-foreground/65 font-light">
                <span className="text-primary shrink-0 select-none font-mono">/</span>
                <span className="font-display">{ach}</span>
              </li>
            ))}
          </ul>

          {/* Tech Vector indicator */}
          <div className="mt-auto flex items-center gap-2 border-t border-subtle/30 pt-4">
            <Layers className="h-3.5 w-3.5 text-foreground/25 shrink-0" />
            <span className="font-mono text-[9.5px] uppercase tracking-wider text-foreground/45">
              Vector: {era.vector}
            </span>
          </div>
        </div>
      </div>
    </m.div>
  );
};
