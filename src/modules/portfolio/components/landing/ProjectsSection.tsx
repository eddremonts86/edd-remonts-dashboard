import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { Project } from '../../types'

interface Props {
  projects: Project[]
}

export function ProjectsSection({ projects }: Props) {
  const { t, i18n } = useTranslation()
  const locale = (i18n.language as 'en' | 'es' | 'dk') ?? 'en'

  const featured = projects.filter((p) => p.featured)

  return (
    <section id="projects" className="bg-background py-24 md:py-32">
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
              {t('projects.label', '/ projects')}
            </p>
            <h2 className="text-3xl font-light tracking-tight text-foreground md:text-5xl">
              {t('projects.title', 'Selected work')}
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((project, i) => {
              const translation = project.translations?.find((tr) => tr.locale === locale)
                ?? project.translations?.[0]
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:bg-muted/40"
                >
                  {project.coverImageUrl && (
                    <div className="mb-4 overflow-hidden rounded-xl">
                      <img
                        src={project.coverImageUrl}
                        alt={project.title}
                        className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-medium text-foreground">{project.title}</h3>
                      {project.category && (
                        <p className="mt-0.5 text-xs text-muted-foreground">{project.category}</p>
                      )}
                    </div>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 text-xs text-muted-foreground underline-offset-4 hover:underline"
                      >
                        ↗
                      </a>
                    )}
                  </div>
                  {translation?.description && (
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {translation.description}
                    </p>
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
