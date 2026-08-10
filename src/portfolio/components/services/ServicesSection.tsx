import { m } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { usePortfolioData } from '@/portfolio/contexts/PortfolioDataContext'
import { fadeInView } from '@/portfolio/lib/motion'
import { type MorphIconData, MorphingIcon } from '../ui/icons/MorphingIcon'
import { CPU, DATABASE, LAYERS, SPARKLES } from '../ui/icons/morphIconNodes'
import { Container, Section } from '../ui/layout/Section'
import { SectionSlate } from '../ui/layout/SectionSlate'

/**
 * iconSlug is a free-text column, so an editor can type anything into it. An
 * unknown slug falls back to LAYERS rather than crashing the section.
 */
const ICONS: Record<string, MorphIconData> = {
  layers: LAYERS,
  cpu: CPU,
  sparkles: SPARKLES,
  database: DATABASE,
}

export const ServicesSection = () => {
  const { t } = useTranslation()
  const { services } = usePortfolioData()

  // The table has a `visible` flag and the section is optional by design: if
  // the full-time search ends, this can be emptied from the dashboard without
  // a deploy, and the page should close over the gap rather than show a
  // heading with nothing under it.
  if (services.length === 0) return null

  return (
    <Section id="services">
      <Container>
        <SectionSlate
          reel={3}
          kicker={t('services.eyebrow', 'Ways in')}
          title={t('services.title', "What you'd hand me")}
          accent={t('services.titleAccent', 'And what comes back.')}
          description={t(
            'services.description',
            'Four shapes this work usually takes. Each one is something I have already shipped, with the number it came with.',
          )}
        />

        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service, i) => (
            <m.article
              key={service.id}
              {...fadeInView({ delay: i * 0.06 })}
              className="pf-card group flex items-start gap-5 p-6"
            >
              <div className="p-2 rounded-lg border border-subtle bg-surface text-foreground/78 group-hover:text-primary transition-colors shrink-0">
                <MorphingIcon icon={ICONS[service.iconSlug] ?? LAYERS} size={18} />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-[16px] font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-foreground/80 font-light font-display">
                  {service.description}
                </p>
              </div>
            </m.article>
          ))}
        </div>
      </Container>
    </Section>
  )
}
