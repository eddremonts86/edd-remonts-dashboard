import { fadeInView } from '@/portfolio/lib/motion';
import { m } from 'framer-motion';
import { Layers, Briefcase, Calendar } from 'lucide-react';

export interface EraData {
  id: string;
  period: string;
  company: string;
  role: string;
  bullets: string[];
  vector: string;
}

interface ExperienceCardProps {
  era: EraData;
  index: number;
}

export const ExperienceCard = ({ era, index }: ExperienceCardProps) => {
  // Simple bold parser: splits by '**' and renders odd indices inside <strong>
  const parseBoldText = (text: string) => {
    const parts = text.split('**');
    return parts.map((part, i) =>
      i % 2 === 1 ? (
        <strong key={i} className="text-white font-semibold group-hover:text-primary transition-colors duration-300">
          {part}
        </strong>
      ) : (
        part
      )
    );
  };

  return (
    <m.div
      {...fadeInView({ delay: Math.min(index * 0.12, 0.4) })}
      className="group relative flex cursor-default gap-6 py-12 transition-colors duration-500 md:gap-10 border-b border-white/5 last:border-b-0"
    >
      {/* Timeline Node */}
      <div aria-hidden className="mt-1.5 shrink-0 flex-col items-center md:flex hidden">
        <span className="h-3 w-3 rounded-full border border-primary bg-background ring-4 ring-background transition-all duration-500 group-hover:bg-primary group-hover:scale-110" />
        <div className="w-px flex-1 bg-white/5 mt-3 group-hover:bg-primary/20 transition-colors duration-500" />
      </div>

      {/* Content Layout */}
      <div className="flex flex-1 flex-col justify-between px-2 transition-colors duration-500 hover:bg-white/[0.005] md:flex-row md:rounded-2xl md:p-6 gap-8">
        
        {/* Left Column: Period, Role, Company */}
        <div className="flex w-full flex-col md:w-[35%]">
          <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.25em] text-primary uppercase font-bold mb-3">
            <Calendar className="h-3 w-3" />
            {era.period}
          </span>
          <h3 className="text-2xl font-light tracking-tight text-white font-serif italic group-hover:text-primary transition-colors duration-300 leading-snug">
            {era.role}
          </h3>
          <p className="flex items-center gap-2 mt-2 font-mono text-[10px] text-foreground/50 tracking-wider">
            <Briefcase className="h-3.5 w-3.5 shrink-0 text-white/20" />
            {era.company.toUpperCase()}
          </p>

          {/* Tech Vector indicator */}
          <div className="flex items-start gap-2 mt-6 border-t border-white/5 pt-4">
            <Layers className="h-3.5 w-3.5 text-white/20 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-mono text-[8px] uppercase tracking-wider text-white/35 block">
                Milestone Stack
              </span>
              <p className="font-mono text-[9px] leading-relaxed text-foreground/60">
                {era.vector}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Bullets list */}
        <div className="flex w-full flex-col justify-start md:w-[65%] space-y-4">
          <span className="font-mono text-[8px] text-white/35 uppercase tracking-widest block border-b border-white/5 pb-2">
            / Core Contributions & Outcomes
          </span>

          <ul className="space-y-3.5">
            {era.bullets.map((bullet, bulletIdx) => (
              <li
                key={bulletIdx}
                className="flex items-start gap-3 text-xs leading-relaxed text-foreground/70 font-light font-display"
              >
                <span className="text-primary mt-1.5 shrink-0 block h-1 w-1 rounded-full bg-primary" />
                <span className="flex-1">{parseBoldText(bullet)}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </m.div>
  );
};
