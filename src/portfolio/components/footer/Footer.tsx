import { m } from 'framer-motion'
import { Server } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { usePortfolioData } from '@/portfolio/contexts/PortfolioDataContext'
import { NAV_SECTIONS } from '@/portfolio/data/navigation'

const FOOTER_NAV = NAV_SECTIONS.filter((s) => s.id !== 'hero')

export const Footer = () => {
  const { t } = useTranslation()
  const { personalInfo } = usePortfolioData()
  const currentYear = new Date().getFullYear()

  const nameParts = personalInfo.name.trim().split(/\s+/)
  const givenName = nameParts[0] ?? personalInfo.name
  const familyName = nameParts.slice(1).join(' ')

  return (
    <footer className="relative bg-background text-foreground border-t border-subtle pb-[max(3rem,env(safe-area-inset-bottom))] pt-20 selection:bg-primary selection:text-primary-foreground overflow-hidden w-full">
      {/* Soft tonal aura — editorial light, no grid */}
      <div aria-hidden="true" className="pf-section-bg" />

      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.8 }}
        className="w-full px-6 md:px-16 xl:px-24"
      >
        {/* ── Main body: name + social ────────────────────── */}
        <div className="grid grid-cols-1 gap-12 pb-12 lg:grid-cols-12 lg:gap-16">
          {/* Col 1: Identity (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div>
              <h3 className="font-serif text-3xl font-light tracking-tight text-foreground md:text-4xl uppercase">
                {givenName} <span className="font-serif italic text-primary">{familyName}</span>.
              </h3>
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-foreground/60 mt-2 flex items-center gap-1.5">
                <Server className="h-3 w-3 text-primary animate-pulse" />
                {t('footer.sub', 'Platforms & Systems Engineer')}
              </p>
            </div>

            <p className="text-xs leading-relaxed text-foreground/60 max-w-xl font-light">
              {t(
                'footer.manifesto',
                'Building resilient product systems since 2007. From Cuba to Copenhagen. Still obsessed with optimized rendering, fast interfaces, and strict boundary control.',
              )}
            </p>
          </div>

          {/* Col 2: Social links (4 cols, right-aligned) */}
          <div className="lg:col-span-4 lg:justify-self-end space-y-3">
            <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-foreground font-bold flex items-center gap-2 before:content-[''] before:block before:h-px before:w-4 before:bg-primary before:shrink-0">
              {t('footer.social.heading', 'ELSEWHERE')}
            </p>
            <div className="flex flex-col gap-2.5 font-mono text-[10px]">
              {personalInfo.socials.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/60 hover:text-primary transition-colors duration-200 flex items-center gap-2 w-fit group"
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0 transition-colors duration-200" />
                    {social.name.toUpperCase()}
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── Nav row: all sections as a horizontal strip ────────── */}
        <div className="border-t border-subtle py-6 flex flex-wrap items-center gap-x-8 gap-y-3">
          <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-foreground font-bold flex items-center gap-2 shrink-0 before:content-[''] before:block before:h-px before:w-4 before:bg-primary before:shrink-0">
            {t('footer.nav.heading', 'NAVIGATE')}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px]">
            {FOOTER_NAV.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-foreground/50 hover:text-primary transition-colors duration-200"
              >
                /{section.id.toUpperCase()}
              </a>
            ))}
          </div>
        </div>

        {/* ── Bottom rule: copyright ────────────────────────────── */}
        <div className="flex flex-col items-start justify-between gap-6 border-t border-subtle py-8 sm:flex-row sm:items-center">
          <p className="font-mono text-[9px] uppercase tracking-widest text-foreground/60">
            &copy; {currentYear} {personalInfo.name}. {t('footer.rights', 'All rights reserved.')}
          </p>
        </div>
      </m.div>
    </footer>
  )
}
