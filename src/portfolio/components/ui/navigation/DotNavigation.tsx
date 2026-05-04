import { NAV_SECTIONS } from '@/portfolio/data/navigation';
import { m } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useScrollSpy } from '@/portfolio/hooks/useScrollSpy';

export const DotNavigation = () => {
  const { t } = useTranslation();
  const { activeSection, isVisible } = useScrollSpy(NAV_SECTIONS);

  if (!isVisible) return null;

  return (
    <nav
      className="fixed right-6 top-1/2 z-[90] hidden -translate-y-1/2 flex-col gap-4 lg:flex"
      aria-label={t('a11y.sectionNav')}
    >
      {NAV_SECTIONS.map(({ id, labelKey }) => (
        <a
          key={id}
          href={id === 'hero' ? '#' : `#${id}`}
          aria-label={t(labelKey)}
          className="group relative flex h-4 items-center justify-end"
        >
          {/* Label tooltip */}
          <span className="text-foreground/70 pointer-events-none absolute right-6 whitespace-nowrap rounded border border-primary bg-surface px-2 py-1 font-mono text-[10px] uppercase tracking-widest opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {t(labelKey)}
          </span>

          <m.div
            className={`rounded-full transition-all duration-500 ${
              activeSection === id
                ? 'h-6 w-1.5 bg-primary'
                : 'hover:bg-foreground/50 hover:border-foreground/50 h-1.5 w-1.5 border border-primary bg-primary'
            }`}
          />
        </a>
      ))}
    </nav>
  );
};
