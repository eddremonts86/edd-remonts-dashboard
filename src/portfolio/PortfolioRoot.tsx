/**
 * PortfolioRoot — Wraps the original portfolio App with its own isolated providers.
 *
 * Isolation strategy:
 * - i18n:  uses a named i18next instance (not the dashboard's global one)
 * - theme: uses the portfolio's own ThemeProvider (writes .dark to <html>,
 *          CSS variables are scoped to the .pf wrapper div)
 * - helmet: HelmetProvider for react-helmet-async (client-side SEO)
 */

import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { HelmetProvider } from 'react-helmet-async';
import { App } from './App';
import { PortfolioDataProvider } from './contexts/PortfolioDataContext';
import { ThemeProvider } from './contexts/ThemeContext';
import portfolioI18n from './i18n';
import { resolveBrowserLang } from '@/portfolio/data/languages';
import { STORAGE_KEYS } from '@/portfolio/lib/storageKeys';

export function PortfolioRoot() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage =
        localStorage.getItem(STORAGE_KEYS.lang) ||
        resolveBrowserLang(navigator.language);
      if (savedLanguage && savedLanguage !== portfolioI18n.language) {
        portfolioI18n.changeLanguage(savedLanguage);
      }
    }
  }, []);

  return (
    <I18nextProvider i18n={portfolioI18n}>
      <HelmetProvider>
        <ThemeProvider defaultTheme="system">
          <PortfolioDataProvider>
            <div className="pf min-h-screen">
              <App />
            </div>
          </PortfolioDataProvider>
        </ThemeProvider>
      </HelmetProvider>
    </I18nextProvider>
  );
}
