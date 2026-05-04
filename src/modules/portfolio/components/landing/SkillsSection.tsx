import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { Skill } from '../../types'

interface Props {
  skills: Skill[]
}

export function SkillsSection({ skills }: Props) {
  const { t } = useTranslation()

  const visible = skills.filter((s) => s.visible !== false)
  const grouped = visible.reduce<Record<string, Skill[]>>((acc, skill) => {
    const cat = skill.category ?? 'Other'
    ;(acc[cat] ??= []).push(skill)
    return acc
  }, {})

  return (
    <section id="skills" className="bg-muted/30 py-24 md:py-32">
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
              {t('skills.label', '/ skills')}
            </p>
            <h2 className="text-3xl font-light tracking-tight text-foreground md:text-5xl">
              {t('skills.title', 'Tech arsenal')}
            </h2>
          </motion.div>

          <div className="space-y-10">
            {Object.entries(grouped).map(([category, items], ci) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: ci * 0.08 }}
              >
                <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  {category}
                </p>
                <div className="flex flex-wrap gap-3">
                  {items.map((skill) => (
                    <span
                      key={skill.id}
                      className="rounded-full border border-border px-4 py-1.5 text-sm text-foreground"
                    >
                      {skill.name}
                      {skill.proficiency != null && skill.proficiency >= 85 && (
                        <span className="ml-1.5 text-xs text-muted-foreground">★</span>
                      )}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
