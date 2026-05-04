import { useSyncExternalStore } from 'react';
import { useTheme } from '@/portfolio/contexts/ThemeContextBase';

const mql =
  typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)') : null;

function subscribeSystemTheme(cb: () => void) {
  mql?.addEventListener('change', cb);
  return () => mql?.removeEventListener('change', cb);
}

function getSystemSnapshot(): 'light' | 'dark' {
  return mql?.matches ? 'dark' : 'light';
}

/**
 * Returns the effective theme ('light' | 'dark'), resolving 'system'
 * via the OS media query. Reacts to OS-level theme changes in real time.
 */
export function useResolvedTheme(): 'light' | 'dark' {
  const { theme } = useTheme();
  const systemTheme = useSyncExternalStore(
    subscribeSystemTheme,
    getSystemSnapshot,
    () => 'light' as const,
  );
  return theme === 'system' ? systemTheme : (theme as 'light' | 'dark');
}
