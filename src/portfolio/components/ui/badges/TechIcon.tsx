import { techIconMap } from '@/portfolio/data/techIcons';

interface TechIconProps {
  skill: string;
  /** Size class applied to both width and height, e.g. "h-4 w-4" */
  className?: string;
}

/**
 * Renders a tech icon SVG for a given skill name.
 * - Grayscale by default to keep a consistent monochrome aesthetic.
 * - `dark:invert` flips the black SimpleIcons SVGs to white in dark mode.
 * - Falls back to `default-tech.svg` when no icon is mapped.
 */
export const TechIcon = ({ skill, className = 'h-4 w-4' }: TechIconProps) => {
  const src = techIconMap[skill] ?? '/tech-icons/default-tech.svg';
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className={`shrink-0 grayscale opacity-70 dark:invert dark:opacity-80 transition-opacity duration-300 ${className}`}
    />
  );
};
