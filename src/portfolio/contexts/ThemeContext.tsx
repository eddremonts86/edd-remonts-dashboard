import { useEffect } from 'react';
import { ThemeProviderContext, type Theme, type ThemeProviderProps } from './ThemeContextBase';
import { STORAGE_KEYS } from '@/portfolio/lib/storageKeys';

export const ThemeProvider = ({
  children,
  defaultTheme = 'system',
  storageKey = STORAGE_KEYS.theme,
  ...props
}: ThemeProviderProps) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');
    root.classList.add('dark');
  }, []);

  const value = {
    theme: 'dark' as Theme,
    setTheme: () => {},
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
};
