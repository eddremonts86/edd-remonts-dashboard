import { NAV_SECTIONS } from '@/portfolio/data/navigation';
import { m } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollSpy } from '@/portfolio/hooks/useScrollSpy';

export const DotNavigation = () => {
  const { t } = useTranslation();
  const { activeSection, isVisible } = useScrollSpy(NAV_SECTIONS);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track global page scroll progress for the vertical track fill
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <nav
      className="fixed right-6 top-1/2 z-[90] hidden -translate-y-1/2 flex-col items-center gap-6 lg:flex select-none"
      aria-label={t('a11y.sectionNav')}
    >
      {/* Background Track Line */}
      <div className="absolute right-[11px] top-2 bottom-2 w-[1.5px] bg-foreground/10 dark:bg-white/10 rounded-full pointer-events-none" />

      {/* Active Scroll Progress Line */}
      <m.div 
        className="absolute right-[11px] top-2 w-[1.5px] bg-primary rounded-full origin-top pointer-events-none" 
        style={{ height: `${scrollProgress}%`, maxHeight: 'calc(100% - 16px)' }}
        transition={{ type: 'spring', stiffness: 80, damping: 15 }}
      />

      {NAV_SECTIONS.map(({ id, labelKey }, index) => {
        const isActive = activeSection === id;

        return (
          <a
            key={id}
            href={id === 'hero' ? '#' : `#${id}`}
            aria-label={`Jump to ${t(labelKey)} section`}
            className="group relative flex h-6 w-6 items-center justify-center cursor-pointer"
          >
            {/* Elegant Glassmorphic Label Tooltip */}
            <span className="text-foreground/80 pointer-events-none absolute right-8 whitespace-nowrap rounded-lg border border-subtle bg-surface/85 backdrop-blur-md px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-widest opacity-0 scale-90 translate-x-2 origin-right transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 shadow-lg flex items-center gap-2">
              <span className="text-primary font-bold">/0{index + 1}</span>
              <span className="text-foreground/90">{t(labelKey)}</span>
            </span>

            {/* Sliding Dot Capsule */}
            <div className="relative flex items-center justify-center h-6 w-6">
              {isActive ? (
                <m.div
                  layoutId="activeDot"
                  className="h-6 w-1.5 bg-primary rounded-full shadow-[0_0_12px_rgba(209,52,38,0.5)] z-20"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              ) : (
                <m.div
                  className="h-2 w-2 rounded-full border border-subtle bg-surface/80 hover:border-primary hover:bg-primary/20 transition-all duration-300 z-20 scale-100 hover:scale-125"
                />
              )}
            </div>
          </a>
        );
      })}
    </nav>
  );
};
