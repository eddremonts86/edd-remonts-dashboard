import type React from 'react';
import { createContext, useContext } from 'react';

export type Theme = 'light' | 'dark' | 'system';

/** Ordered cycle used by ThemeToggle to step through theme options */
export const THEME_CYCLE: Theme[] = ['light', 'dark', 'system'];

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeProviderContext = createContext<ThemeProviderState | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === null) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
