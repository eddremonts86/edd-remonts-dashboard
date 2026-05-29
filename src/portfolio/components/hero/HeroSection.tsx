import { m, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowDownToLine } from 'lucide-react';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MagneticButton } from '@/portfolio/components/ui/effects/MagneticButton';
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
      value: `${stats.years} +`,
      label: t('stats.yearsExperience', 'Years of experience'),
    },
    {
      value: `${stats.companies}`,
      label: t('stats.companies', 'Companies'),
    },
    {
      value: '3',
      label: t('hero.metricLanguages', 'Languages'),
    },
  ];

  const pipelineStages = [
    t('hero.pipeline.plan', 'Plan'),
    t('hero.pipeline.build', 'Build'),
    t('hero.pipeline.validate', 'Validate'),
    t('hero.pipeline.ship', 'Ship'),
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
        className={`absolute inset-x-0 top-6 z-50 flex items-center justify-end px-6 transition-colors duration-700 lg:top-10 lg:px-12 ${textColor}`}
      >
        <div className="flex items-center gap-6">
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
            {/* Kicker — drawer reveal */}
            <div className="overflow-hidden mb-6">
              <m.p
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ delay: 0.15, duration: 0.9, ease: APPLE_EASE }}
                className={`font-mono text-[10px] font-medium uppercase tracking-[0.3em] transition-colors duration-700 md:text-xs ${sublineTextColor}`}
              >
                {t('hero.greeting', "Hello, I'm")}
              </m.p>
            </div>

            {/* Name — drawer reveal, no opacity fade — the text materialises from beneath */}
            <h1
              className={`mb-10 flex flex-col font-serif text-[14vw] font-light leading-[0.86] tracking-[-0.02em] transition-colors duration-700 sm:text-[12vw] md:mb-12 md:text-[10vw] lg:text-[clamp(5rem,8vw,9rem)] ${greetingTextColor}`}
            >
              <div className="overflow-hidden">
                <m.span
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.05, ease: APPLE_EASE, delay: 0.3 }}
                  className="group relative inline-block w-fit cursor-crosshair"
                  onPointerEnter={() => setIsHovered(true)}
                  onPointerLeave={() => setIsHovered(false)}
                >
                  <span className="relative z-10">{givenName}</span>
                  <span className="bg-primary/40 absolute -bottom-1 left-0 right-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 md:-bottom-2 md:h-0.75" />
                </m.span>
              </div>
              {familyName && (
                <div className="overflow-hidden">
                  <m.span
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 1.05, ease: APPLE_EASE, delay: 0.42 }}
                    className="inline-block"
                  >
                    {familyName}
                    <span className="text-primary">.</span>
                  </m.span>
                </div>
              )}
            </h1>

            {/* Role — drawer reveal */}
            <div className="overflow-hidden mb-8 md:mb-10">
              <m.div
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{ delay: 0.58, duration: 0.95, ease: APPLE_EASE }}
                className={`max-w-3xl border-l-2 border-primary/60 pl-5 transition-colors duration-700 md:pl-6 ${textColor}`}
              >
                <p className="font-display text-2xl font-medium leading-[1.05] tracking-tight md:text-4xl lg:text-[2.75rem]">
                  <span>{roleLine1}</span>{' '}
                  <span className="font-light italic opacity-80">{roleLine2}</span>
                </p>
              </m.div>
            </div>

            {/* Description */}
            <m.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75, duration: 1 }}
              className={`mb-10 max-w-xl font-body text-base font-light leading-relaxed transition-colors duration-700 md:text-lg ${mutedTextColor}`}
            >
              {description}
            </m.p>

            {/* CTAs — horizontal, each wrapped for magnetic pull */}
            <m.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.9, ease: APPLE_EASE }}
              className="flex flex-wrap items-center gap-3"
            >
              <MagneticButton>
                <a
                  href="#projects"
                  className="group inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full border border-foreground/30 bg-foreground px-6 py-3 text-[11px] font-medium uppercase tracking-widest text-background transition-all duration-500 hover:bg-primary hover:text-white md:text-xs"
                >
                  <span>{t('hero.explore')}</span>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-1" />
                </a>
              </MagneticButton>
              <MagneticButton>
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
              </MagneticButton>
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
              className={`overflow-hidden rounded-2xl border border-foreground/10 dark:border-white/10 bg-background/25 backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-colors duration-700 ${textColor}`}
            >
              {/* HUD Active Node Header */}
              <div className="flex items-center justify-between border-b border-foreground/10 dark:border-white/10 px-6 py-3.5 bg-foreground/[0.02] dark:bg-white/[0.02] md:px-7">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] opacity-60">
                    System Monitor HUD
                  </span>
                </div>
                <span className="font-mono text-[8px] opacity-45">[SYS::ACTIVE]</span>
              </div>

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
              <dl className="border-t border-foreground/10 dark:border-white/10">
                {heroMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="group flex items-baseline justify-between gap-4 border-b border-foreground/5 dark:border-white/5 px-6 py-4 transition-colors duration-500 last:border-b-0 hover:bg-foreground/3 dark:hover:bg-white/3 md:px-7"
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

              {/* Section 3 — Product delivery pipeline */}
              <div className="border-t border-foreground/10 dark:border-white/10 px-6 py-4 md:px-7">
                <p
                  className={`mb-3 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-700 ${sublineTextColor}`}
                >
                  {t('hero.pipelineLabel', 'Delivery pipeline')}
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {pipelineStages.map((stage, index) => (
                    <div key={stage} className="space-y-2">
                      <m.span
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.12, ease: APPLE_EASE }}
                        className="block h-1 origin-left rounded-full bg-foreground/15 dark:bg-white/10 overflow-hidden"
                      >
                        <m.span
                          className="block h-full rounded-full bg-primary shadow-[0_0_8px_rgba(209,52,38,0.6)]"
                          animate={{ opacity: [0.35, 1, 0.35] }}
                          transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.22 }}
                        />
                      </m.span>
                      <p className={`font-mono text-[9px] uppercase tracking-[0.16em] ${sublineTextColor}`}>
                        {stage}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 4 — Location + availability */}
              <dl
                className={`flex items-center justify-between gap-4 border-t border-foreground/10 dark:border-white/10 px-6 py-4 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-700 md:px-7 ${sublineTextColor}`}
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
