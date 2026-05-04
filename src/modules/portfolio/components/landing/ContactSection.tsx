import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { ContentBlock } from '../../types'

interface Props {
  content: ContentBlock[]
}

function getBlock(content: ContentBlock[], key: string, locale: string): string {
  const block = content.find((b) => b.key === key)
  if (!block) return ''
  if (locale === 'es') return block.valueEs || block.valueEn
  if (locale === 'dk') return block.valueDk || block.valueEn
  return block.valueEn
}

export function ContactSection({ content }: Props) {
  const { t, i18n } = useTranslation()
  const locale = i18n.language

  const email = getBlock(content, 'contact.email', locale) || 'eduardo@remonts.dev'
  const phone = getBlock(content, 'contact.phone', locale) || ''
  const linkedin = getBlock(content, 'social.linkedin', locale) || ''
  const github = getBlock(content, 'social.github', locale) || ''

  return (
    <section id="contact" className="bg-background py-24 md:py-32">
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
              {t('contact.label', '/ contact')}
            </p>
            <h2 className="text-3xl font-light tracking-tight text-foreground md:text-5xl">
              {t('contact.title', "Let's work together")}
            </h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              {t('contact.description', 'Have a project in mind or want to discuss a potential collaboration? Feel free to reach out.')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="group flex items-center gap-2 text-foreground underline-offset-4 hover:underline"
                >
                  <span className="text-muted-foreground">✉</span> {email}
                </a>
              )}
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="group flex items-center gap-2 text-foreground underline-offset-4 hover:underline"
                >
                  <span className="text-muted-foreground">☎</span> {phone}
                </a>
              )}
              <div className="flex gap-4">
                {linkedin && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                  >
                    LinkedIn ↗
                  </a>
                )}
                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                  >
                    GitHub ↗
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
