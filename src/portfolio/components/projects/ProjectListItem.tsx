import { m } from 'framer-motion'
import { Cpu, Layers, ShieldCheck, HelpCircle } from 'lucide-react'
import { forwardRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type CvProject } from '@/portfolio/contexts/PortfolioDataContext'
import { useProjectStories } from '@/portfolio/data/useProjectStories'
import { MorphingIcon } from '@/portfolio/components/ui/icons/MorphingIcon'
import {
  ARROW_UP_RIGHT,
  EXTERNAL_LINK,
  MINUS,
  PLUS,
} from '@/portfolio/components/ui/icons/morphIconNodes'
import { ProjectStoryPanel } from './ProjectStoryPanel'

type Project = CvProject

interface Props {
  project: Project
  index: number
  expanded: boolean
  onToggle: () => void
  onHover: (p: Project | null) => void
}

export const ProjectListItem = forwardRef<HTMLDivElement, Props>(
  ({ project, index, expanded, onToggle, onHover }, ref) => {
    const { t } = useTranslation()
    const hasLink = Boolean(project.link)
    const story = useProjectStories()[project.id]
    const [linkHovered, setLinkHovered] = useState(false)
    const hasCaseStudy = Boolean(
      story ||
      project.problem ||
      project.results ||
      project.context ||
      project.role ||
      project.decisions,
    )

    const getNormalizedVector = (label?: string) => {
      if (!label) return 'Systems Integration'
      const l = label.toLowerCase()
      if (
        l.includes('decouple') ||
        l.includes('isolate') ||
        l.includes('partition') ||
        l.includes('micro')
      ) {
        return 'Platform Decoupling'
      }
      if (
        l.includes('front') ||
        l.includes('arch') ||
        l.includes('monorepo') ||
        l.includes('system') ||
        l.includes('design')
      ) {
        return 'Frontend Architecture'
      }
      return 'Systems Integration'
    }

    const techVector = getNormalizedVector(project.architectureLabel || project.scaleLabel)

    return (
      <m.div
        ref={ref}
        layout="position"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        role="row"
        // No floating cover while this row is open: the panel already shows it,
        // and the preview lands on top of the case study.
        onMouseEnter={() => onHover(expanded ? null : project)}
        onMouseLeave={() => onHover(null)}
        className="border-b border-subtle/30 py-4.5 transition-all duration-300 hover:bg-foreground/[0.02] rounded-xl px-4 cursor-pointer"
        onClick={hasCaseStudy ? onToggle : undefined}
      >
        {/* 12-Column Structured Grid Row (MD+), Flex layout on Mobile */}
        <div className="flex flex-col gap-3 md:grid md:grid-cols-12 md:items-center md:gap-4">
          {/* Col 1: Serial Tracker Index (Col span: 1) */}
          <div role="cell" className="md:col-span-1 flex items-center gap-2">
            <span className="font-mono text-[13px] text-primary/65 font-bold select-none tracking-widest">
              0{index + 1}
            </span>
            {/* Mobile indicator line */}
            <span className="h-px w-4 bg-primary/20 md:hidden" />
          </div>

          {/* Col 2: Project Title (Col span: 4) */}
          <div role="cell" className="md:col-span-4 min-w-0">
            <h3 className="font-display text-[17px] font-semibold leading-tight tracking-tight text-foreground transition-colors group-hover:text-primary">
              {project.title}
            </h3>
          </div>

          {/* Col 3: Category Pill (Col span: 2) */}
          <div role="cell" className="md:col-span-2">
            <span className="inline-flex rounded-md border border-subtle bg-surface/50 px-2 py-0.5 font-mono text-[12px] uppercase tracking-wider text-foreground/72">
              {project.category}
            </span>
          </div>

          {/* Col 4: Technology/Architectural Vector (Col span: 4) */}
          <div role="cell" className="md:col-span-4 min-w-0 flex items-center gap-2">
            <Layers className="h-3.5 w-3.5 text-foreground/25 shrink-0" />
            {/* For a project with a story, the row carries its headline number.
                "Systems Integration" told a reader nothing about which of
                seventeen rows was worth opening. */}
            <span
              className={`font-mono text-[13px] truncate max-w-full ${
                story ? 'text-foreground/75 font-semibold' : 'text-foreground/72'
              }`}
            >
              {story ? story.outcomeHeadline : techVector}
            </span>
          </div>

          {/* Col 5: Actions Links (Col span: 1, aligned right) */}
          <div
            role="cell"
            className="md:col-span-1 justify-self-end flex items-center gap-3 mt-2 md:mt-0"
            onClick={(e) => e.stopPropagation()} // Prevent double trigger with row click
          >
            {hasCaseStudy && (
              <button
                type="button"
                onClick={onToggle}
                className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 ${
                  expanded
                    ? 'border-primary bg-primary text-white'
                    : 'border-subtle bg-background text-foreground/75 hover:border-foreground/25 hover:text-foreground'
                }`}
                aria-label={t('projects.toggleDetails', 'Toggle case details')}
              >
                <MorphingIcon icon={expanded ? MINUS : PLUS} size={14} />
              </button>
            )}

            {hasLink && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onPointerEnter={() => setLinkHovered(true)}
                onPointerLeave={() => setLinkHovered(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-subtle bg-background text-foreground/75 transition-all duration-500 hover:border-primary hover:bg-primary hover:text-white"
                aria-label={t('projects.view', 'View Project')}
              >
                <MorphingIcon icon={linkHovered ? EXTERNAL_LINK : ARROW_UP_RIGHT} size={14} />
              </a>
            )}
          </div>
        </div>

        {/*
          Collapsed with a CSS grid-row transition rather than unmounted. The
          server-rendered HTML has to contain every word of these case studies:
          Googlebot does not click. `inert` keeps the hidden copy out of the tab
          order and off the accessibility tree.
        */}
        {hasCaseStudy && (
          <div
            className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
            style={{ gridTemplateRows: expanded ? '1fr' : '0fr' }}
            inert={!expanded}
          >
            <div className="overflow-hidden">
              {story ? (
                <ProjectStoryPanel story={story} />
              ) : (
                <div className="mt-5 grid gap-6 rounded-2xl border border-foreground/10 bg-foreground/2 p-6 md:grid-cols-2 md:p-8 lg:grid-cols-4 dark:border-white/10 dark:bg-white/[0.02]">
                  {project.context && (
                    <CaseBlock
                      icon={Layers}
                      label={t('projects.context', 'Context')}
                      body={project.context}
                    />
                  )}
                  {project.problem && (
                    <CaseBlock
                      icon={HelpCircle}
                      label={t('projects.problem', 'Challenge')}
                      body={project.problem}
                    />
                  )}
                  {project.decisions && (
                    <CaseBlock
                      icon={Cpu}
                      label={t('projects.decisions', 'Decisions')}
                      body={project.decisions}
                    />
                  )}
                  {project.results && (
                    <CaseBlock
                      icon={ShieldCheck}
                      label={t('projects.results', 'Results')}
                      body={project.results}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </m.div>
    )
  },
)

interface CaseBlockProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  body: string
}

function CaseBlock({ icon: Icon, label, body }: CaseBlockProps) {
  return (
    <div className="group/block relative space-y-3 rounded-xl border border-foreground/[0.05] dark:border-white/[0.05] bg-foreground/[0.01] dark:bg-white/[0.01] p-4 transition-all duration-300 hover:border-primary/20 hover:bg-foreground/[0.02] dark:hover:bg-white/[0.02] hover:shadow-[0_4px_24px_rgba(209,52,38,0.05)]">
      {/* Decorative telemetry header */}
      <div className="flex items-center justify-between border-b border-foreground/[0.05] dark:border-white/[0.05] pb-2">
        <span className="font-mono text-[12px] uppercase tracking-[0.2em] text-primary flex items-center gap-1.5 font-bold">
          <Icon className="h-3 w-3 text-primary shrink-0 animate-pulse" />
          {label}
        </span>
        <span className="h-1.5 w-1.5 rounded-full bg-primary/25 transition-all duration-500 group-hover/block:bg-primary group-hover/block:shadow-[0_0_8px_rgba(209,52,38,0.8)]" />
      </div>
      <p className="text-[15px] leading-relaxed text-foreground/75 font-mono">{body}</p>
    </div>
  )
}
