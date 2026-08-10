import { Cpu, GitBranch, HelpCircle, Layers, ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { StoryProject } from '@/portfolio/data/useProjectStories'
import { COVER_WIDTHS, pictureSources } from '@/portfolio/lib/responsiveImage'

interface CaseBlockProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  body: string
}

function CaseBlock({ icon: Icon, label, body }: CaseBlockProps) {
  return (
    <div className="space-y-2">
      <span className="font-mono text-[12px] uppercase tracking-[0.2em] text-primary flex items-center gap-1.5 font-bold">
        <Icon className="h-3 w-3 shrink-0" />
        {label}
      </span>
      <p className="text-[15px] leading-relaxed text-foreground/75 font-light">{body}</p>
    </div>
  )
}

/**
 * The full case study for one project, rendered inside its row in the index.
 *
 * This used to be a standalone section: four of these stacked end to end, one
 * screen each, ahead of the index they duplicated. Inline, the same words cost
 * nothing until someone asks for them.
 */
export function ProjectStoryPanel({ story }: { story: StoryProject }) {
  const { t } = useTranslation()
  const cover = pictureSources(story.coverPath, COVER_WIDTHS)

  return (
    <div className="mt-5 grid gap-8 rounded-2xl border border-foreground/10 bg-foreground/[0.015] p-6 md:p-8 lg:grid-cols-12 dark:border-white/10 dark:bg-white/[0.02]">
      {/* Cover + headline metric */}
      <div className="space-y-4 lg:col-span-5">
        <div className="overflow-hidden rounded-xl border border-subtle bg-surface">
          <picture>
            <source
              type="image/avif"
              srcSet={cover.avif}
              sizes="(min-width: 1024px) 480px, 100vw"
            />
            <source
              type="image/webp"
              srcSet={cover.webp}
              sizes="(min-width: 1024px) 480px, 100vw"
            />
            <img
              src={cover.fallback}
              alt={`${story.title} interface`}
              loading="lazy"
              decoding="async"
              className="aspect-16/10 w-full select-none object-cover object-top"
            />
          </picture>
        </div>

        <div className="rounded-xl border border-subtle bg-surface/30 p-4">
          <span className="mb-1 block font-mono text-[12px] font-bold uppercase tracking-wider text-primary">
            {t('projects.stories.metricOutcomes', '/ Metric Outcomes')}
          </span>
          <p className="font-semibold text-foreground">{story.outcomeHeadline}</p>
          <p className="mt-1.5 text-[13px] font-light leading-relaxed text-foreground/70">
            {story.outcomeDetail}
          </p>
        </div>
      </div>

      {/* Case study */}
      <div className="space-y-6 lg:col-span-7">
        <div className="grid gap-5 sm:grid-cols-2">
          <CaseBlock
            icon={Layers}
            label={t('projects.context', '/ CONTEXT')}
            body={story.context}
          />
          <CaseBlock
            icon={HelpCircle}
            label={t('projects.complexity', '/ CHALLENGE')}
            body={story.challenge}
          />
        </div>

        <div className="border-t border-subtle pt-5">
          <CaseBlock
            icon={Cpu}
            label={t('projects.decisions', '/ DECISIONS')}
            body={story.decision}
          />
        </div>

        <div className="rounded-xl border border-primary/25 bg-primary/[0.04] p-4">
          <CaseBlock
            icon={ShieldCheck}
            label={t('projects.results', '/ RESULTS')}
            body={story.businessImpact}
          />
        </div>

        {/* Tradeoff ledger — the part a founder cannot get from a screenshot. */}
        <div className="space-y-4 rounded-xl border border-subtle bg-surface/50 p-5">
          <span className="flex items-center gap-1.5 border-b border-subtle pb-2 font-mono text-[12px] font-bold text-primary">
            <GitBranch className="h-3.5 w-3.5" />
            {t('projects.stories.tradeoffTitle', 'ARCHITECTURAL TRADEOFF LEDGER')}
          </span>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <span className="block font-mono text-[12px] font-bold text-green-600">
                {t('projects.stories.pathChosen', '✓ PATH CHOSEN')}
              </span>
              <p className="text-[15px] font-light leading-relaxed text-foreground/70">
                {story.tradeoffsChosen}
              </p>
            </div>
            <div className="space-y-1.5">
              <span className="block font-mono text-[12px] font-bold text-red-500">
                {t('projects.stories.pathRejected', '✗ PATH REJECTED')}
              </span>
              <p className="text-[15px] font-light leading-relaxed text-foreground/70">
                {story.tradeoffsRejected}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
