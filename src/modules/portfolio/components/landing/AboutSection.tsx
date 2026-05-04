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

export function AboutSection({ content }: Props) {
  const { t, i18n } = useTranslation()
  const locale = i18n.language

  const bio = getBlock(content, 'about.bio', locale) || t('about.description', '')
  const philosophy = getBlock(content, 'about.philosophy', locale) || t('about.philosophy', '')

  return (
    <section id="about" className="bg-background py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-[1400px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {t('about.label', '/ about')}
            </p>
            <h2 className="mb-12 text-3xl font-light tracking-tight text-foreground md:text-5xl">
              {t('about.title', 'Crafting digital experiences')}
            </h2>
          </motion.div>

          <div className="grid gap-12 md:grid-cols-2">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              {bio}
            </motion.p>
            {philosophy && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base leading-relaxed text-muted-foreground md:text-lg"
              >
                {philosophy}
              </motion.p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
