/**
 * Centralised localStorage key names for the entire app.
 * Import from here instead of hardcoding strings in multiple files.
 */
export const STORAGE_KEYS = {
  lang: 'edd-portfolio-lang',
  // Shared with the dashboard ThemeProvider (src/shared/providers/theme-provider.tsx).
  // Both providers write `light|dark|system` to <html>; one key keeps them agreeing
  // on load instead of racing (portfolio effect runs first, dashboard's last).
  theme: 'tanstack-template-theme',
  // sessionStorage, not localStorage: the title sequence should play once per
  // visit, not once ever. A founder who comes back next week still gets it.
  titleSequencePlayed: 'edd-portfolio-title-sequence',
} as const
