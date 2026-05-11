import { TechIcon } from './TechIcon';
import { APPLE_EASE } from '@/portfolio/lib/motion';
import { m } from 'framer-motion';

interface TechBadgeProps {
  skill: string;
  index?: number;
}

const SPRING = { type: 'spring', stiffness: 420, damping: 18 } as const;

/** Animated skill pill used in Tech Arsenal.
 *  Hover: badge lifts + icon rotates clockwise. Tap: press-down. */
export const TechBadge = ({ skill, index = 0 }: TechBadgeProps) => (
  <m.span
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.05, ease: APPLE_EASE }}
    whileHover="hovered"
    whileTap="pressed"
    variants={{
      hovered: { y: -4, scale: 1.07, transition: SPRING },
      pressed: { y: 0, scale: 0.95, transition: SPRING },
    }}
    className="group text-foreground/70 hover:border-foreground/30 hover:bg-surface/80 flex cursor-default items-center gap-2 rounded-full border border-subtle bg-surface px-4 py-2 font-mono text-xs shadow-sm transition-colors duration-300 hover:text-foreground hover:shadow-md"
  >
    <m.span
      className="inline-flex shrink-0"
      variants={{
        hovered: { rotate: 14, scale: 1.3, transition: { type: 'spring', stiffness: 500, damping: 14 } },
        pressed: { rotate: 0, scale: 1 },
      }}
    >
      <TechIcon skill={skill} className="h-3.5 w-3.5" />
    </m.span>
    <span>{skill}</span>
  </m.span>
);
