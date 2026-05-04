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

export function HeroSection({ content }: Props) {
  const { t, i18n } = useTranslation()
  const locale = i18n.language

  const name = getBlock(content, 'hero.name', locale) || 'Eduardo Inerarte'
  const title = getBlock(content, 'hero.title', locale) || t('personalInfo.title', 'Senior Frontend Engineer')
  const tagline = getBlock(content, 'hero.tagline', locale) || t('personalInfo.description', '')

  return (
    <section
      id="home"
      className="relative flex min-h-svh flex-col justify-end overflow-hidden bg-background pb-24 md:pb-32"
    >
      <div className="container relative z-10 mx-auto w-full px-6">
        <div className="mx-auto w-full max-w-[1400px] xl:pl-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-4 flex items-center gap-2 md:mb-8"
          >
            <span className="rounded-full border border-border px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {t('hero.available', 'Available for opportunities')}
            </span>
          </motion.div>

          <div className="relative z-10 w-full">
            <h1 className="mb-8 flex w-full flex-col text-[12vw] font-light leading-[0.9] tracking-tight text-foreground sm:text-[10vw] md:mb-12 md:text-[8vw] lg:text-[7.5rem]">
              <motion.span
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="font-serif"
              >
                {t('hero.greeting', 'Hello, I\'m')}
              </motion.span>
              <motion.span
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.5 }}
                className="font-light"
              >
                {name}
              </motion.span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
            >
              <div className="max-w-xl">
                <p className="text-lg font-medium text-foreground md:text-xl">{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">{tagline}</p>
              </div>
              <a
                href="#about"
                className="group flex w-fit items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                {t('hero.explore', 'Explore My Work')}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
