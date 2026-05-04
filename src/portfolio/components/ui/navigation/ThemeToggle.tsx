import { useTheme, THEME_CYCLE } from '@/portfolio/contexts/ThemeContextBase';
import type { Theme } from '@/portfolio/contexts/ThemeContextBase';
import { APPLE_EASE } from '@/portfolio/lib/motion';
import { m } from 'framer-motion';
import { Monitor, Moon, Sun } from 'lucide-react';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const next = () => {
    const idx = THEME_CYCLE.indexOf(theme);
    setTheme(THEME_CYCLE[(idx + 1) % THEME_CYCLE.length]);
  };

  const isActive = (t: Theme) => theme === t;

  return (
    <button
      onClick={next}
      className="text-foreground/70 group relative flex h-10 min-h-[40px] w-10 min-w-[40px] items-center justify-center overflow-hidden rounded-full border-subtle transition-colors duration-500 hover:text-foreground"
      aria-label={`Theme: ${theme}. Click to switch.`}
    >
      <m.div
        initial={false}
        animate={{
          rotate: isActive('dark') ? 0 : 90,
          scale: isActive('dark') ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: APPLE_EASE }}
        className="absolute"
      >
        <Moon className="h-4 w-4 text-primary transition-colors group-hover:text-foreground" />
      </m.div>
      <m.div
        initial={false}
        animate={{
          rotate: isActive('light') ? 0 : -90,
          scale: isActive('light') ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: APPLE_EASE }}
        className="absolute"
      >
        <Sun className="h-4 w-4 text-primary transition-colors group-hover:text-foreground" />
      </m.div>
      <m.div
        initial={false}
        animate={{
          rotate: isActive('system') ? 0 : -90,
          scale: isActive('system') ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: APPLE_EASE }}
        className="absolute"
      >
        <Monitor className="h-4 w-4 text-primary transition-colors group-hover:text-foreground" />
      </m.div>
      <span className="invisible h-4 w-4" aria-hidden="true" />
    </button>
  );
};
