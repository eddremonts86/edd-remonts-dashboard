import { useTheme } from '@/portfolio/contexts/ThemeContextBase';
import { Sun, Moon, Monitor } from 'lucide-react';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div 
      className="flex border border-subtle rounded-full bg-surface/80 p-0.5 select-none shrink-0 backdrop-blur-md" 
      role="group" 
      aria-label="Select color theme"
    >
      <button
        onClick={() => setTheme('light')}
        className={`flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300 cursor-pointer ${
          theme === 'light'
            ? 'bg-primary text-primary-foreground shadow-md'
            : 'text-foreground/60 hover:text-foreground hover:bg-foreground/[0.05]'
        }`}
        aria-label="Light mode"
        title="Light Mode"
      >
        <Sun className="h-3.5 w-3.5" />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300 cursor-pointer ${
          theme === 'dark'
            ? 'bg-primary text-primary-foreground shadow-md'
            : 'text-foreground/60 hover:text-foreground hover:bg-foreground/[0.05]'
        }`}
        aria-label="Dark mode"
        title="Dark Mode"
      >
        <Moon className="h-3.5 w-3.5" />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300 cursor-pointer ${
          theme === 'system'
            ? 'bg-primary text-primary-foreground shadow-md'
            : 'text-foreground/60 hover:text-foreground hover:bg-foreground/[0.05]'
        }`}
        aria-label="System mode"
        title="System Mode"
      >
        <Monitor className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};
