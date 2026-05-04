/**
 * PortfolioRoot — Wraps the original portfolio App with its own isolated providers.
 *
 * Isolation strategy:
 * - i18n:  uses a named i18next instance (not the dashboard's global one)
 * - theme: uses the portfolio's own ThemeProvider (writes .dark to <html>,
 *          CSS variables are scoped to the .pf wrapper div)
 * - helmet: HelmetProvider for react-helmet-async (client-side SEO)
 */

import { I18nextProvider } from 'react-i18next';
import { HelmetProvider } from 'react-helmet-async';
import { App } from './App';
import { PortfolioDataProvider } from './contexts/PortfolioDataContext';
import { ThemeProvider } from './contexts/ThemeContext';
import portfolioI18n from './i18n';

export function PortfolioRoot() {
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
