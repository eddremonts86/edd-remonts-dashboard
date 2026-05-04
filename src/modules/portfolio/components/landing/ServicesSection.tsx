import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { Service } from '../../types'

// Map icon slug → lucide-react component name for rendering
const ICON_MAP: Record<string, string> = {
  code: '💻',
  design: '🎨',
  mobile: '📱',
  search: '🔍',
  rocket: '🚀',
  shield: '🛡️',
  database: '🗄️',
  cloud: '☁️',
  ai: '🤖',
}

interface Props {
  services: Service[]
}

export function ServicesSection({ services }: Props) {
  const { t, i18n } = useTranslation()
  const locale = i18n.language

  const visible = services.filter((s) => s.visible !== false)

  if (visible.length === 0) return null

  return (
    <section id="services" className="bg-muted/30 py-24 md:py-32">
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
              {t('services.label', '/ services')}
            </p>
            <h2 className="text-3xl font-light tracking-tight text-foreground md:text-5xl">
              {t('services.title', 'What I do')}
            </h2>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((svc, i) => {
              const tr =
                svc.translations.find((t) => t.locale === locale) ??
                svc.translations.find((t) => t.locale === 'en')
              const icon = ICON_MAP[svc.iconSlug] ?? '⚙️'

              return (
                <motion.div
                  key={svc.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="rounded-2xl border border-border bg-background p-8"
                >
                  <span className="mb-4 block text-3xl">{icon}</span>
                  <h3 className="mb-3 text-xl font-medium text-foreground">
                    {tr?.title ?? ''}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {tr?.description ?? ''}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
