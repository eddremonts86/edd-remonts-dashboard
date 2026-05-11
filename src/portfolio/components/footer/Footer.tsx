import { usePortfolioData } from '@/portfolio/contexts/PortfolioDataContext';
import { NAV_SECTIONS } from '@/portfolio/data/navigation';
import { APPLE_EASE, staggerChildren } from '@/portfolio/lib/motion';
import { m } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FOOTER_NAV = NAV_SECTIONS.filter((s) => s.id !== 'hero');

const TECH_KEYWORDS = ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Tailwind', 'Docker'];

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: APPLE_EASE },
  },
};

export const Footer = () => {
  const { t } = useTranslation();
  const { personalInfo } = usePortfolioData();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-subtle bg-background pb-[max(3rem,env(safe-area-inset-bottom))]">
      <m.div
        variants={staggerChildren(0.07)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="mx-auto max-w-[1400px] px-6"
      >
        {/* ── Top bar: availability pill ─────────────────────────── */}
        <m.div
          variants={item}
          className="flex items-center justify-between border-b border-subtle py-5"
        >
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-foreground/40">
            <span
              className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-primary"
              aria-hidden="true"
            />
            {t('footer.available', 'Available for new work')}
          </span>
          <a
            href={`mailto:${personalInfo.email}`}
            className="group hidden items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-foreground/40 transition-colors duration-200 hover:text-foreground sm:flex"
          >
            <span className="max-w-[18ch] truncate">{personalInfo.email}</span>
            <ArrowUpRight
              className="h-3 w-3 flex-shrink-0 transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px"
              aria-hidden="true"
            />
          </a>
        </m.div>

        {/* ── Main body: name + nav + socials ────────────────────── */}
        <div className="grid grid-cols-1 gap-12 py-12 md:grid-cols-[1fr_auto_auto] md:gap-16 md:py-14">
          {/* Name block */}
          <m.div variants={item} className="space-y-4">
            <a
              href="#hero"
              className="block text-[clamp(2.2rem,6vw,4.5rem)] font-semibold leading-none tracking-tight text-foreground transition-opacity duration-300 hover:opacity-70"
              style={{ fontFamily: 'var(--font-display, inherit)' }}
            >
              {personalInfo.name}
            </a>
            <p className="max-w-xs text-sm leading-relaxed text-foreground/50">
              {personalInfo.title}
            </p>
            {/* Tech keywords */}
            <div className="flex flex-wrap gap-x-3 gap-y-1 pt-1">
              {TECH_KEYWORDS.map((kw) => (
                <span key={kw} className="font-mono text-[10px] uppercase tracking-widest text-foreground/30">
                  {kw}
                </span>
              ))}
            </div>
          </m.div>

          {/* Nav links */}
          <m.nav
            variants={item}
            aria-label={t('footer.nav.label', 'Footer navigation')}
            className="space-y-2.5"
          >
            <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-foreground/30">
              {t('footer.nav.heading', 'Navigate')}
            </p>
            {FOOTER_NAV.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="block text-sm text-foreground/60 transition-colors duration-150 hover:text-foreground"
              >
                {t(section.labelKey)}
              </a>
            ))}
          </m.nav>

          {/* Socials */}
          <m.div variants={item} className="space-y-2.5">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-foreground/30">
              {t('footer.social.heading', 'Elsewhere')}
            </p>
            {personalInfo.socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-sm text-foreground/60 transition-colors duration-150 hover:text-foreground"
                >
                  <Icon
                    className="h-3.5 w-3.5 flex-shrink-0 opacity-60 transition-opacity duration-150 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                  {social.name}
                </a>
              );
            })}
          </m.div>
        </div>

        {/* ── Bottom rule: copyright ──────────────────────────────── */}
        <m.div
          variants={item}
          className="flex flex-col items-start justify-between gap-3 border-t border-subtle py-6 sm:flex-row sm:items-center"
        >
          <p className="font-mono text-[10px] uppercase tracking-widest text-foreground/30">
            &copy; {currentYear} {personalInfo.name}.{' '}
            {t('footer.rights', 'All rights reserved.')}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-foreground/20">
            {t('footer.colophon', 'Crafted with intent.')}
          </p>
        </m.div>
      </m.div>
    </footer>
  );
};
