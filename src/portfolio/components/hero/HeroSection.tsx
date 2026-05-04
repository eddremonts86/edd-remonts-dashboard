import { LanguageSelector } from '@/portfolio/components/ui/navigation/LanguageSelector';
import { StatusBadge } from '@/portfolio/components/ui/badges/StatusBadge';
import { ThemeToggle } from '@/portfolio/components/ui/navigation/ThemeToggle';
import { useResolvedTheme } from '@/portfolio/hooks/useResolvedTheme';
import { useHeroParallax } from '@/portfolio/hooks/useHeroParallax';
import { APPLE_EASE } from '@/portfolio/lib/motion';
import { getCvUrl } from '@/portfolio/lib/cvUrl';
import { getHoverColors } from '@/portfolio/lib/hoverColors';
import { m, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AmbientLight } from './AmbientLight';
import { BackgroundReveal } from './BackgroundReveal';
import { ScrollIndicator } from './ScrollIndicator';

export const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const resolvedTheme = useResolvedTheme();
  const containerRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const cvUrl = getCvUrl(i18n.language, resolvedTheme);
  const { opacity, scale, y } = useHeroParallax(containerRef);

  const dynamicBG = resolvedTheme === 'dark' ? '/edd/edd_dark.jpg' : '/edd/edd_light.jpg';

  const { bgColor, textColor, mutedTextColor, sublineTextColor, borderColor, buttonHover, greetingTextColor } =
    getHoverColors(isHovered, resolvedTheme);

  return (
    <section
      ref={containerRef}
      className={`relative flex min-h-[100svh] min-h-screen flex-col justify-end overflow-hidden pb-24 transition-colors duration-1000 md:pb-32 ${bgColor}`}
    >
      <AnimatePresence>
        {isHovered && <BackgroundReveal src={dynamicBG} theme={resolvedTheme} />}
      </AnimatePresence>

      <AmbientLight hidden={isHovered} />

      {/* Header Utilities */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className={`absolute right-6 top-6 z-50 flex items-center gap-6 transition-colors duration-700 lg:right-10 lg:top-10 ${textColor}`}
      >
        <LanguageSelector />
        <ThemeToggle />
      </m.div>

      {/* Main Content */}
      <m.div style={{ opacity, scale, y }} className="container relative z-10 mx-auto w-full px-6">
        <div className="mx-auto w-full max-w-[1400px] xl:pl-12">
          {/* Top Label */}
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: APPLE_EASE }}
            className="mb-4 flex flex-col items-baseline gap-4 sm:flex-row sm:items-center md:mb-8"
          >
            <StatusBadge
              label={t('hero.available', 'STATUS: ACCEPTING SELECT PROJECTS')}
              className={`transition-colors duration-700 ${sublineTextColor}`}
            />
          </m.div>

          {/* Huge Typography */}
          <div className="relative z-10 w-full">
            <h1
              className={`mb-8 flex w-full flex-col text-[12vw] font-light leading-[0.9] tracking-tight transition-colors duration-700 sm:text-[10vw] md:mb-12 md:text-[8vw] lg:text-[7.5rem] ${textColor}`}
            >
              <m.span
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: APPLE_EASE, delay: 0.3 }}
                className={`group relative w-fit cursor-crosshair font-serif transition-colors duration-700 ${greetingTextColor}`}
                onPointerEnter={() => setIsHovered(true)}
                onPointerLeave={() => setIsHovered(false)}
              >
                <span className="relative z-10 transition-colors duration-100">
                  {t('hero.greeting', "Hello, I'm")} Eddy.
                </span>
                <span className="bg-primary/30 absolute -bottom-2 left-0 right-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 md:-bottom-4 md:h-[4px]" />
              </m.span>

              <m.span
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: APPLE_EASE, delay: 0.4 }}
                className="mt-2 block font-display font-medium tracking-tighter dark:mix-blend-difference md:mt-4"
              >
                {t('hero.titleLine1')}
              </m.span>

              <m.span
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: APPLE_EASE, delay: 0.5 }}
                className="ml-[10%] block font-serif italic opacity-70 sm:ml-[15%] lg:ml-[20%]"
              >
                {t('hero.titleLine2')}
              </m.span>
            </h1>
          </div>

          {/* Description & CTAs */}
          <div className="mt-12 flex flex-col gap-8 md:mt-24 md:flex-row md:items-end">
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1.5 }}
              className="flex-1"
            >
              <p
                className={`max-w-xl font-body text-base font-light leading-relaxed transition-colors duration-700 md:text-xl ${mutedTextColor}`}
              >
                {t('personalInfo.description')}
              </p>
            </m.div>

            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1.5 }}
              className="flex shrink-0 flex-col items-start gap-3"
            >
              <a
                href="#projects"
                className={`group inline-flex items-center justify-center gap-4 whitespace-nowrap rounded-full border bg-transparent px-6 py-3 text-[11px] font-medium uppercase tracking-widest transition-all duration-700 md:text-xs ${textColor} ${borderColor} ${buttonHover}`}
              >
                <span>{t('hero.explore')}</span>
                <ArrowRight className="h-3 w-3 shrink-0 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-4 whitespace-nowrap rounded-full border px-6 py-3 text-[11px] font-bold uppercase tracking-widest transition-all duration-700 md:text-xs ${textColor} ${borderColor} ${buttonHover}`}
                onPointerEnter={() => setIsHovered(true)}
                onPointerLeave={() => setIsHovered(false)}
              >
                <span>{t('nav.resume')}</span>
              </a>
            </m.div>
          </div>
        </div>
      </m.div>

      <ScrollIndicator
        label={t('hero.scroll', 'Scroll')}
        isHovered={isHovered}
        theme={resolvedTheme}
      />
    </section>
  );
};
