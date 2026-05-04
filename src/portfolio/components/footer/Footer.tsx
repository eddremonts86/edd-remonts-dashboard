import { Logo } from '@/portfolio/components/ui/media/Logo';
import { usePortfolioData } from '@/portfolio/contexts/PortfolioDataContext';
import { fadeInView } from '@/portfolio/lib/motion';
import { m } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();
  const { personalInfo } = usePortfolioData();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-subtle bg-background py-16 pb-[max(4rem,env(safe-area-inset-bottom))] md:py-24 md:pb-[max(6rem,env(safe-area-inset-bottom))]">
      <div className="container relative z-10 mx-auto max-w-[1400px] px-6">
        <m.div
          {...fadeInView()}
          className="flex flex-col items-center justify-between gap-12 md:flex-row"
        >
          {/* Logo / Branding */}
          <div className="text-center md:text-left">
            <a href="#hero" className="inline-block text-foreground transition-opacity hover:opacity-80">
              <Logo className="mb-3 h-16 w-auto md:h-28" />
            </a>
            <p className="text-foreground/40 font-mono text-[10px] uppercase tracking-widest">
              {t('footer.inspired', 'Crafted with intent.')}
            </p>
          </div>

          {/* Elegant Social Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {personalInfo.socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-subtle text-foreground transition-all duration-300 hover:bg-surface hover:text-primary"
                  aria-label={social.name}
                >
                  <Icon className="h-4 w-4 opacity-70 transition-opacity group-hover:opacity-100" />
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="mt-8 text-center font-mono text-[11px] uppercase tracking-widest opacity-50 md:mt-0 md:text-right">
            <p>
              &copy; {currentYear} {personalInfo.name}.
            </p>
            <p className="mt-2 text-[10px]">{t('footer.rights', 'ALL RIGHTS RESERVED')}</p>
          </div>
        </m.div>
      </div>
    </footer>
  );
};
