import { techIconMap } from '@/portfolio/data/techIcons';
import { APPLE_EASE } from '@/portfolio/lib/motion';
import { m } from 'framer-motion';

interface TechBadgeProps {
  skill: string;
  index?: number;
}

/** Animated skill pill with optional tech icon. */
export const TechBadge = ({ skill, index = 0 }: TechBadgeProps) => (
  <m.span
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.05, ease: APPLE_EASE }}
    className="text-foreground/70 hover:border-foreground/30 flex items-center gap-2 rounded-full border border-subtle bg-surface px-4 py-2 font-mono text-xs transition-all duration-300 hover:text-foreground"
  >
    {techIconMap[skill] && (
      <img
        src={techIconMap[skill]}
        alt={skill}
        loading="lazy"
        className="h-3.5 w-3.5 opacity-70 grayscale transition-all group-hover:opacity-100 group-hover:grayscale-0"
      />
    )}
    <span>{skill}</span>
  </m.span>
);
