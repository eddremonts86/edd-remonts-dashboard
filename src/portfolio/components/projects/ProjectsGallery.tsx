import { AnimatePresence, m } from 'framer-motion'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMousePosition } from '@/portfolio/hooks/useMousePosition'
import { useProjectFilter } from '@/portfolio/hooks/useProjectFilter'
import { Section, Container } from '../ui/layout/Section'
import { SectionSlate } from '../ui/layout/SectionSlate'
import { CategoryFilter } from './CategoryFilter'
import { FloatingImagePreview } from './FloatingImagePreview'
import { ProjectListItem } from './ProjectListItem'

export const ProjectsGallery = () => {
  const { t } = useTranslation()
  const { activeCategory, setActiveCategory, filteredProjects, hoveredProject, setHoveredProject } =
    useProjectFilter()
  // The first row opens by default: a table of seventeen collapsed rows gives
  // no hint that anything is behind them.
  const [expandedId, setExpandedId] = useState<string | null>('builderhunt')
  const { springX, springY } = useMousePosition()

  // The full index, nothing held back. Zunzun used to be excluded here because
  // it was one of the flagship stories above; it no longer is, so hiding it
  // just made a project disappear from the site entirely.
  const additionalProjects = filteredProjects

  return (
    <Section id="projects">
      <FloatingImagePreview project={hoveredProject} cursorX={springX} cursorY={springY} />
      <Container>
        <SectionSlate
          reel={2}
          kicker={t('projects.eyebrow', 'Signature projects')}
          title={t('projects.title', 'Things I built')}
          accent={t('projects.titleAccent', 'End to end.')}
          description={t(
            'projects.description',
            'Four products of my own. For each: the problem it started from, the architecture I chose, and the path I turned down to get there.',
          )}
        />

        {/* One index, not a marquee plus a leftovers table. The four flagship
            stories open inside their own rows; see ProjectStoryPanel. */}
        <div className="mb-8 flex flex-col justify-between gap-6 border-b border-subtle pb-6 md:flex-row md:items-end text-left">
          <p className="max-w-xl text-sm text-foreground/60 leading-relaxed font-light">
            {t(
              'projects.registry.description',
              'Seventeen in total. The four at the top are my own — open a row to read the case study.',
            )}
          </p>

          <div className="shrink-0">
            <CategoryFilter active={activeCategory} onSelect={setActiveCategory} />
          </div>
        </div>

        {/* 3. Table Column Header Row (MD+) */}
        <div
          role="table"
          aria-label={t('projects.registry.aria', 'Additional projects registry')}
          className="w-full text-left"
        >
          <div
            role="row"
            className="hidden md:grid grid-cols-12 gap-4 px-4 pb-3 border-b border-subtle/50 font-mono text-[9px] uppercase tracking-wider text-foreground/35 select-none"
          >
            <span role="columnheader" className="col-span-1">
              {t('projects.registry.colIndex', 'Index')}
            </span>
            <span role="columnheader" className="col-span-4">
              {t('projects.registry.colProject', 'Project / Scope')}
            </span>
            <span role="columnheader" className="col-span-2">
              {t('projects.registry.colCategory', 'Category')}
            </span>
            <span role="columnheader" className="col-span-4">
              {t('projects.registry.colVector', 'What it does')}
            </span>
            <span role="columnheader" className="col-span-1 justify-self-end">
              {t('projects.registry.colInspect', 'Inspect')}
            </span>
          </div>

          {/* 4. Typographic Systems Integration Registry Table */}
          <div
            role="rowgroup"
            className="flex flex-col border-t border-subtle/20 relative min-h-[400px]"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {additionalProjects.map((project, index) => (
                <ProjectListItem
                  key={project.id}
                  project={project}
                  index={index}
                  expanded={expandedId === project.id}
                  onToggle={() =>
                    setExpandedId((prev) => (prev === project.id ? null : project.id))
                  }
                  onHover={setHoveredProject}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {additionalProjects.length === 0 && (
          <m.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 rounded-2xl border border-subtle bg-surface p-6 text-sm text-foreground/65 text-left"
          >
            {t('projects.empty', 'No projects found for this filter yet.')}
          </m.p>
        )}
      </Container>
    </Section>
  )
}
