import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { Experience } from '../../types'

interface Props {
  experiences: Experience[]
}

export function ExperienceSection({ experiences }: Props) {
  const { t, i18n } = useTranslation()
  const locale = (i18n.language as 'en' | 'es' | 'dk') ?? 'en'

  return (
    <section id="experience" className="bg-background py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-[1400px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {t('experience.label', '/ experience')}
            </p>
            <h2 className="text-3xl font-light tracking-tight text-foreground md:text-5xl">
              {t('experience.title', 'Work history')}
            </h2>
          </motion.div>

          <div className="space-y-0">
            {experiences.map((exp, i) => {
              const translation = exp.translations?.find((tr) => tr.locale === locale)
                ?? exp.translations?.[0]
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className="group grid border-t border-border py-6 md:grid-cols-[200px_1fr_auto] md:gap-8"
                >
                  <div className="mb-2 md:mb-0">
                    <span className="text-sm text-muted-foreground">
                      {exp.periodStart}
                      {exp.periodEnd ? ` – ${exp.periodEnd}` : ' – Present'}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{translation?.role ?? ''}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {exp.company}
                      {exp.location ? `, ${exp.location}` : ''}
                    </p>
                    {translation?.description && (
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {translation.description}
                      </p>
                    )}
                  </div>
                  {exp.url && (
                    <a
                      href={exp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 hidden text-xs text-muted-foreground underline-offset-4 hover:underline md:mt-0 md:block"
                    >
                      ↗
                    </a>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
