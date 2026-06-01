import { Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from '@/portfolio/contexts/ThemeContextBase'

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div
      className="flex border border-border-default/50 rounded-full bg-surface/50 p-1 gap-1 select-none shrink-0 backdrop-blur-md"
      role="group"
      aria-label="Select color theme"
    >
      <button
        onClick={() => setTheme('light')}
        className={`flex h-7 w-7 items-center justify-center rounded-full transition-all duration-200 cursor-pointer ${
          theme === 'light'
            ? 'bg-foreground text-background shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-foreground/5 scale-105 font-bold z-10'
            : 'text-foreground/50 hover:text-foreground/80 hover:bg-foreground/[0.04]'
        }`}
        aria-label="Light mode"
        title="Light Mode"
      >
        <Sun className="h-3.5 w-3.5" />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`flex h-7 w-7 items-center justify-center rounded-full transition-all duration-200 cursor-pointer ${
          theme === 'dark'
            ? 'bg-foreground text-background shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-foreground/5 scale-105 font-bold z-10'
            : 'text-foreground/50 hover:text-foreground/80 hover:bg-foreground/[0.04]'
        }`}
        aria-label="Dark mode"
        title="Dark Mode"
      >
        <Moon className="h-3.5 w-3.5" />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`flex h-7 w-7 items-center justify-center rounded-full transition-all duration-200 cursor-pointer ${
          theme === 'system'
            ? 'bg-foreground text-background shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-foreground/5 scale-105 font-bold z-10'
            : 'text-foreground/50 hover:text-foreground/80 hover:bg-foreground/[0.04]'
        }`}
        aria-label="System mode"
        title="System Mode"
      >
        <Monitor className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
