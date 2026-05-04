import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { Testimonial } from '../../types'

interface Props {
  testimonials: Testimonial[]
}

export function TestimonialsSection({ testimonials }: Props) {
  const { t, i18n } = useTranslation()
  const locale = (i18n.language as 'en' | 'es' | 'dk') ?? 'en'

  const visible = testimonials.filter((t) => t.visible !== false)

  return (
    <section id="testimonials" className="bg-muted/30 py-24 md:py-32">
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
              {t('testimonials.label', '/ testimonials')}
            </p>
            <h2 className="text-3xl font-light tracking-tight text-foreground md:text-5xl">
              {t('testimonials.title', 'What people say')}
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {visible.map((item, i) => {
              const translation = item.translations?.find((tr) => tr.locale === locale)
                ?? item.translations?.[0]
              return (
                <motion.figure
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="rounded-2xl border border-border bg-card p-8"
                >
                  <blockquote className="mb-6 text-base leading-relaxed text-foreground">
                    "{translation?.quote ?? ''}"
                  </blockquote>
                  <figcaption className="flex items-center gap-3">
                    {item.avatarUrl && (
                      <img
                        src={item.avatarUrl}
                        alt={item.authorName}
                        className="size-10 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.authorName}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.authorRole}
                        {item.authorCompany ? `, ${item.authorCompany}` : ''}
                      </p>
                    </div>
                  </figcaption>
                </motion.figure>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
