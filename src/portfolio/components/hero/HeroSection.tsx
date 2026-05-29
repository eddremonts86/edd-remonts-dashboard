import { m, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowDownToLine } from 'lucide-react';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StatusBadge } from '@/portfolio/components/ui/badges/StatusBadge';
import { LanguageSelector } from '@/portfolio/components/ui/navigation/LanguageSelector';
import { ThemeToggle } from '@/portfolio/components/ui/navigation/ThemeToggle';
import { usePortfolioData } from '@/portfolio/contexts/PortfolioDataContext';
import { useHeroParallax } from '@/portfolio/hooks/useHeroParallax';
import { useResolvedTheme } from '@/portfolio/hooks/useResolvedTheme';
import { getCvUrl } from '@/portfolio/lib/cvUrl';
import { getHoverColors } from '@/portfolio/lib/hoverColors';
import { APPLE_EASE } from '@/portfolio/lib/motion';
import { AmbientLight } from './AmbientLight';
import { BackgroundReveal } from './BackgroundReveal';
import { ScrollIndicator } from './ScrollIndicator';

export const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const { personalInfo, content, stats } = usePortfolioData();
  const resolvedTheme = useResolvedTheme();
  const containerRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const cvUrl = getCvUrl(i18n.language, resolvedTheme);
  const { opacity, scale, y } = useHeroParallax(containerRef);

  const dynamicBG = resolvedTheme === 'dark' ? '/edd/edd_dark.jpg' : '/edd/edd_light.jpg';

  const { bgColor, textColor, mutedTextColor, sublineTextColor, buttonHover, greetingTextColor } =
    getHoverColors(isHovered, resolvedTheme);

  // ── Headline parts ────────────────────────────────────────────────────────
  // Split full name into given + family so we can stack them on two tight lines.
  const nameParts = personalInfo.name.trim().split(/\s+/);
  const givenName = nameParts[0] ?? personalInfo.name;
  const familyName = nameParts.slice(1).join(' ');

  const roleLine1 = content['hero.positioningLine1'] || t('hero.titleLine1');
  const roleLine2 = content['hero.positioningLine2'] || t('hero.titleLine2');
  const description =
    content['hero.positioningDescription'] ||
    personalInfo.description ||
    t('personalInfo.description');

  // ── Hero proof metrics ────────────────────────────────────────────────────
  // The 3 strongest credibility signals. Lighter / secondary stats live in
  // <StatsCounter />. Values come from the same context to stay in sync.
  const heroMetrics = [
    {
      value: `${stats.years}+`,
      label: t('stats.yearsExperience', 'Years of experience'),
    },
    {
      value: `${stats.companies}+`,
      label: t('stats.companies', 'Companies'),
    },
    {
      value: '3',
      label: t('hero.metricLanguages', 'Languages'),
    },
  ];

  return (
    <section
      ref={containerRef}
      className={`relative flex min-h-svh flex-col overflow-hidden transition-colors duration-1000 ${bgColor}`}
    >
      <AnimatePresence>
        {isHovered && <BackgroundReveal src={dynamicBG} theme={resolvedTheme} />}
      </AnimatePresence>

      <AmbientLight hidden={isHovered} />

      {/* ── Top utility row ──────────────────────────────────────────────── */}
      <m.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8, ease: APPLE_EASE }}
        className={`absolute inset-x-0 top-6 z-50 flex items-center justify-between px-6 transition-colors duration-700 lg:top-10 lg:px-12 ${textColor}`}
      >
        <StatusBadge
          label={t('hero.available', 'Available for new opportunities')}
          className={`hidden transition-colors duration-700 sm:inline-flex ${sublineTextColor}`}
        />
        <div className="ml-auto flex items-center gap-6">
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </m.div>

      {/* ── Main grid ───────────────────────────────────────────────────── */}
      <m.div
        style={{ opacity, scale, y }}
        className="container relative z-10 mx-auto flex flex-1 w-full items-center px-6 py-28 md:py-32"
      >
        <div className="mx-auto grid w-full max-w-350 gap-12 lg:grid-cols-12 lg:gap-16 xl:pl-12">
          {/* ── LEFT column ─ identity + role + description + CTAs ──────── */}
          <div className="lg:col-span-8">
            {/* Kicker */}
            <m.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: APPLE_EASE }}
              className={`mb-6 font-mono text-[10px] font-medium uppercase tracking-[0.3em] transition-colors duration-700 md:text-xs ${sublineTextColor}`}
            >
              {t('hero.greeting', "Hello, I'm")}
            </m.p>

            {/* Name — the protagonist */}
            <h1
              className={`mb-10 flex flex-col font-serif text-[14vw] font-light leading-[0.86] tracking-[-0.02em] transition-colors duration-700 sm:text-[12vw] md:mb-12 md:text-[10vw] lg:text-[clamp(5rem,8vw,9rem)] ${greetingTextColor}`}
            >
              <m.span
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.1, ease: APPLE_EASE, delay: 0.3 }}
                className="group relative w-fit cursor-crosshair"
                onPointerEnter={() => setIsHovered(true)}
                onPointerLeave={() => setIsHovered(false)}
              >
                <span className="relative z-10">{givenName}</span>
                <span className="bg-primary/40 absolute -bottom-1 left-0 right-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 md:-bottom-2 md:h-0.75" />
              </m.span>
              {familyName && (
                <m.span
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.1, ease: APPLE_EASE, delay: 0.4 }}
                  className="block"
                >
                  {familyName}
                  <span className="text-primary">.</span>
                </m.span>
              )}
            </h1>

            {/* Role — clean sans, no decorative indent, single treatment */}
            <m.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.9, ease: APPLE_EASE }}
              className={`mb-8 max-w-3xl border-l-2 border-primary/60 pl-5 transition-colors duration-700 md:mb-10 md:pl-6 ${textColor}`}
            >
              <p className="font-display text-2xl font-medium leading-[1.05] tracking-tight md:text-4xl lg:text-[2.75rem]">
                <span>{roleLine1}</span>{' '}
                <span className="font-light italic opacity-80">{roleLine2}</span>
              </p>
            </m.div>

            {/* Description */}
            <m.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75, duration: 1 }}
              className={`mb-10 max-w-xl font-body text-base font-light leading-relaxed transition-colors duration-700 md:text-lg ${mutedTextColor}`}
            >
              {description}
            </m.p>

            {/* CTAs — horizontal */}
            <m.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.9, ease: APPLE_EASE }}
              className="flex flex-wrap items-center gap-3"
            >
              <a
                href="#projects"
                className="group inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full border border-foreground/30 bg-foreground px-6 py-3 text-[11px] font-medium uppercase tracking-widest text-background transition-all duration-500 hover:bg-primary hover:text-white md:text-xs"
              >
                <span>{t('hero.explore')}</span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`group inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full border border-foreground/20 bg-transparent px-6 py-3 text-[11px] font-medium uppercase tracking-widest transition-all duration-700 md:text-xs ${textColor} ${buttonHover}`}
                onPointerEnter={() => setIsHovered(true)}
                onPointerLeave={() => setIsHovered(false)}
              >
                <ArrowDownToLine className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-y-0.5" />
                <span>{t('nav.resume')}</span>
              </a>
            </m.div>
          </div>

          {/* ── RIGHT column ─ unified credentials panel ────────────────── */}
          <m.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 1, ease: APPLE_EASE }}
            className="lg:col-span-4 lg:self-center"
          >
            <div
              className={`overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/2 backdrop-blur-sm transition-colors duration-700 ${textColor}`}
            >
              {/* Section 1 — Now */}
              <div className="p-6 md:p-7">
                <p
                  className={`mb-3 font-mono text-[10px] font-medium uppercase tracking-[0.3em] transition-colors duration-700 ${sublineTextColor}`}
                >
                  {t('hero.nowLabel', 'Now')}
                </p>
                <p className="font-display text-base font-light leading-snug md:text-lg">
                  {t(
                    'hero.nowBody',
                    'Shipping data-intensive product UIs with TanStack Start, Drizzle and Postgres.',
                  )}
                </p>
              </div>

              {/* Section 2 — Proof metrics as rows (label ↔ value) */}
              <dl className="border-t border-foreground/10">
                {heroMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="group flex items-baseline justify-between gap-4 border-b border-foreground/5 px-6 py-4 transition-colors duration-500 last:border-b-0 hover:bg-foreground/3 md:px-7"
                  >
                    <dt
                      className={`font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-700 ${sublineTextColor}`}
                    >
                      {metric.label}
                    </dt>
                    <dd
                      className={`font-display text-3xl font-light leading-none tabular-nums tracking-tight transition-colors duration-500 group-hover:text-primary md:text-4xl ${textColor}`}
                    >
                      {metric.value}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* Section 3 — Location + availability */}
              <dl
                className={`flex items-center justify-between gap-4 border-t border-foreground/10 px-6 py-4 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-700 md:px-7 ${sublineTextColor}`}
              >
                <div className="flex flex-col gap-1">
                  <dt>{t('hero.basedIn', 'Based in')}</dt>
                  <dd className={`text-xs ${textColor}`}>
                    {personalInfo.location || 'Copenhagen'}
                  </dd>
                </div>
                <div className="flex flex-col gap-1 text-right">
                  <dt>{t('hero.availability', 'Availability')}</dt>
                  <dd className={`text-xs ${textColor}`}>
                    {t('hero.availabilityValue', 'Q3 2026')}
                  </dd>
                </div>
              </dl>
            </div>
          </m.aside>
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
