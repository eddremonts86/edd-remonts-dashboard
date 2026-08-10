import { m, AnimatePresence } from 'framer-motion'
import { Activity, GitBranch, Laptop, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { TiltCard } from '@/portfolio/components/ui/effects/TiltCard'
import { fadeInView } from '@/portfolio/lib/motion'
import { COVER_WIDTHS, pictureSources } from '@/portfolio/lib/responsiveImage'

const coverSources = (path: string) => pictureSources(path, COVER_WIDTHS)

interface StoryProject {
  id: string
  title: string
  category: string
  scaleLabel: string
  impactLabel: string
  architectureLabel: string
  link?: string
  urlPlaceholder: string
  coverPath: string
  context: string
  challenge: string
  decision: string
  businessImpact: string
  tradeoffsChosen: string
  tradeoffsRejected: string
  architectureDiagramType: 'microfrontend' | 'statesync' | 'composition'
}

const TradeoffLedger = ({ chosen, rejected }: { chosen: string; rejected: string }) => {
  const { t } = useTranslation()
  return (
    <div className="rounded-xl border border-subtle bg-surface/50 p-5 font-mono text-[9.5px] space-y-4 shadow-sm">
      <div className="flex items-center justify-between border-b border-subtle pb-2 select-none">
        <span className="text-primary font-bold flex items-center gap-1.5">
          <GitBranch className="h-3.5 w-3.5 text-primary" />
          {t('projects.stories.tradeoffTitle', 'ARCHITECTURAL TRADEOFF LEDGER')}
        </span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <span className="text-green-600 font-bold block">
            {t('projects.stories.pathChosen', '✓ PATH CHOSEN')}
          </span>
          <p className="text-foreground/70 leading-relaxed font-light font-sans text-xs">
            {chosen}
          </p>
        </div>
        <div className="space-y-1.5">
          <span className="text-red-500 font-bold block">
            {t('projects.stories.pathRejected', '✗ PATH REJECTED')}
          </span>
          <p className="text-foreground/70 leading-relaxed font-light font-sans text-xs">
            {rejected}
          </p>
        </div>
      </div>
    </div>
  )
}

export const ProductStories = () => {
  const { t } = useTranslation()
  const [modalState, setModalState] = useState<{
    projectId: string
    view: 'interface' | 'architecture'
  } | null>(null)

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalState(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const topStories: StoryProject[] = [
    {
      id: 'schilling',
      title: t('projects.stories.schilling.title', 'Schilling SaaS Enterprise Platform'),
      category: t('projects.stories.schilling.category', 'Enterprise Platform Architecture'),
      scaleLabel: t('projects.stories.schilling.scaleLabel', '100k+ Lines of Code'),
      impactLabel: t('projects.stories.schilling.impactLabel', '94% Bundle Cut'),
      architectureLabel: t('projects.stories.schilling.architectureLabel', 'Micro-Frontend Core'),
      link: 'https://schilling.dk/',
      urlPlaceholder: 'console.schilling.dk/workspace',
      coverPath: '/projects/schilling-cover.png',
      context: t(
        'projects.stories.schilling.context',
        'Enterprise publishing SaaS serving large media organizations across Europe with high-data-density requirements.',
      ),
      challenge: t(
        'projects.stories.schilling.challenge',
        'Monolithic bundle sizes exceeded 6MB, which triggered LCP delays over 7.5s, raised bounce rates, and caused high-load abandonment. Complete core platform rewrites were strictly forbidden due to legacy billing and data-structure regression risks.',
      ),
      decision: t(
        'projects.stories.schilling.decision',
        'Rather than freeze features for a multi-year rewrite, I designed Vite-based monorepo partitions, enabled route isolation, and established strict semantic contracts between modules, allowing product teams to build and ship independently.',
      ),
      businessImpact: t(
        'projects.stories.schilling.businessImpact',
        'Slashed initial bundle payloads by 94% (6.2MB to 350KB), which dropped customer abandonment to near-zero, accelerated feature-delivery speeds by 30%, and allowed 20+ engineers to ship features with zero regressions.',
      ),
      tradeoffsChosen: t(
        'projects.stories.schilling.tradeoffsChosen',
        'Scoped monorepo sub-app partitions with strict semantic-version contracts to support independent, low-risk releases.',
      ),
      tradeoffsRejected: t(
        'projects.stories.schilling.tradeoffsRejected',
        'Monolithic rewrite, avoiding a 12-month feature freeze and multi-million-euro regression risks.',
      ),
      architectureDiagramType: 'microfrontend',
    },
    {
      id: 'edd-remonts',
      title: t('projects.stories.edd-remonts.title', 'Edd Remonts System Dashboard'),
      category: t('projects.stories.edd-remonts.category', 'Real-Time Transactional Dashboard'),
      scaleLabel: t('projects.stories.edd-remonts.scaleLabel', 'Real-time Event Stream'),
      impactLabel: t('projects.stories.edd-remonts.impactLabel', '98 Lighthouse Score'),
      architectureLabel: t(
        'projects.stories.edd-remonts.architectureLabel',
        'TanStack DB Synchronization',
      ),
      urlPlaceholder: 'logistics.remonts.io/dashboard',
      coverPath: '/projects/edd-remonts-cover.png',
      context: t(
        'projects.stories.edd-remonts.context',
        'Real-time logistics tracking and transactional control dashboard managing high-frequency operational KPIs.',
      ),
      challenge: t(
        'projects.stories.edd-remonts.challenge',
        'Constant high-frequency data polling saturated client sockets, triggered heavy server-side load, and caused severe page-load latency. Direct WebSockets caused massive DOM thrashing and layout shifts on unstable mobile networks.',
      ),
      decision: t(
        'projects.stories.edd-remonts.decision',
        'Engineered virtualized-DOM memoization queues, integrated TanStack Query for optimistic caching, and isolated rendering updates strictly to active cells instead of re-rendering whole list panels.',
      ),
      businessImpact: t(
        'projects.stories.edd-remonts.businessImpact',
        'Slashed socket query traffic by 60%, reduced server-infrastructure costs, and secured a perfect 98 Lighthouse score. The application runs at a steady 60FPS on commercial-grade mobile devices even under intensive real-time transactional streams (500+ updates/sec).',
      ),
      tradeoffsChosen: t(
        'projects.stories.edd-remonts.tradeoffsChosen',
        'Optimistic state synchronization coupled with a 150ms virtualized-DOM throttle to isolate CPU load.',
      ),
      tradeoffsRejected: t(
        'projects.stories.edd-remonts.tradeoffsRejected',
        'Raw WebSockets under 10ms, which would saturate mobile sockets and cause clientside layout shifts.',
      ),
      architectureDiagramType: 'statesync',
    },
    {
      id: 'zunzun',
      title: t('projects.stories.zunzun.title', 'Zunzun.io Platform Engine'),
      category: t('projects.stories.zunzun.category', 'Full-Stack Performance Ecosystem'),
      scaleLabel: t('projects.stories.zunzun.scaleLabel', 'Sub-millisecond Rendering'),
      impactLabel: t('projects.stories.zunzun.impactLabel', '100% Core Web Vitals'),
      architectureLabel: t('projects.stories.zunzun.architectureLabel', 'Modular State Framework'),
      link: 'https://www.zunzun.io/',
      urlPlaceholder: 'zunzun.io/canvas/assembler',
      coverPath: '/projects/zunzun-cover.png',
      context: t(
        'projects.stories.zunzun.context',
        'Full-stack canvas-builder and layout-assembler focused on modular templates and fast static-site regeneration.',
      ),
      challenge: t(
        'projects.stories.zunzun.challenge',
        'Canvas assembly of hundreds of elements triggered global state-re-render cascades, spiked key interaction delays (INP), and degraded user experiences.',
      ),
      decision: t(
        'projects.stories.zunzun.decision',
        'Re-architected state flow to use localized reactive nodes, treated layout elements as independent registers, and completely isolated visual mutations from the global state tree to prevent cascades.',
      ),
      businessImpact: t(
        'projects.stories.zunzun.businessImpact',
        'Guaranteed sub-12ms response times, maintained a 100% Core Web Vitals score across all outputs, and eliminated drop-offs during intensive real-time editing.',
      ),
      tradeoffsChosen: t(
        'projects.stories.zunzun.tradeoffsChosen',
        'Strict composite-UI layout nodes operating as independent registers to isolate mutations to leaves.',
      ),
      tradeoffsRejected: t(
        'projects.stories.zunzun.tradeoffsRejected',
        'Single global-state dispatch, avoiding global re-render cascades that spike key input latency (INP).',
      ),
      architectureDiagramType: 'composition',
    },
  ]

  const activeProject = modalState ? topStories.find((p) => p.id === modalState.projectId) : null

  return (
    <div className="space-y-36">
      {topStories.map((project, index) => {
        const isOdd = index % 2 !== 0

        return (
          <m.section
            key={project.id}
            {...fadeInView({ duration: 0.8 })}
            className="relative overflow-hidden rounded-3xl border border-subtle bg-surface/30 p-6 md:p-12 lg:p-16 backdrop-blur-md"
          >
            {/* Soft tonal aura — editorial light, no grid */}
            <div aria-hidden="true" className="pf-section-bg" />

            {/* Top Header metadata */}
            <div className="flex flex-wrap items-baseline justify-between gap-6 border-b border-subtle pb-6 mb-12">
              <div>
                <span className="font-serif text-lg italic text-primary">
                  0{index + 1} / {project.category}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-mono text-[9px] uppercase tracking-wider text-primary font-bold">
                  {project.impactLabel}
                </span>
                <span className="rounded-full border border-subtle bg-background px-3 py-1 font-mono text-[9px] uppercase tracking-wider text-foreground/60">
                  {project.architectureLabel}
                </span>
                <span className="rounded-full border border-subtle bg-background px-3 py-1 font-mono text-[9px] uppercase tracking-wider text-foreground/60">
                  {project.scaleLabel}
                </span>
              </div>
            </div>

            {/* 2-Column Responsive Layout */}
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
              {/* Col A: The Visual Showcase Console (MacBook Viewport Frame) */}
              <div className={`lg:col-span-6 space-y-6 ${isOdd ? 'lg:order-2' : ''}`}>
                {/* 1. MacBook Browser Frame Container — pointer-tracked 3D tilt */}
                <TiltCard maxTilt={4} className="rounded-2xl">
                  <div className="w-full relative shadow-2xl rounded-2xl overflow-hidden border border-subtle bg-surface">
                    {/* Top Window Bar */}
                    <div className="bg-surface px-4 py-2.5 flex items-center justify-between border-b border-subtle select-none">
                      {/* Dots */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                      </div>
                      {/* URL Input */}
                      <div className="rounded-md bg-background px-6 py-0.5 border border-subtle font-mono text-[8px] text-foreground/60 tracking-wider truncate max-w-55 w-full text-center">
                        {project.urlPlaceholder}
                      </div>
                      <div className="w-12 shrink-0" /> {/* Spacer */}
                    </div>

                    {/* Viewport Canvas (Static screenshot frame) */}
                    <div className="w-full aspect-4/3 relative bg-surface flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 w-full h-full">
                        {/* These covers are PNG screenshots up to 807 KB. The
                            card is never wider than ~640px, so the 800px AVIF
                            (17-26 KB) is what should actually be fetched. */}
                        <picture>
                          <source
                            type="image/avif"
                            srcSet={coverSources(project.coverPath).avif}
                            sizes="(min-width: 1024px) 640px, 100vw"
                          />
                          <source
                            type="image/webp"
                            srcSet={coverSources(project.coverPath).webp}
                            sizes="(min-width: 1024px) 640px, 100vw"
                          />
                          <img
                            src={project.coverPath}
                            alt={`${project.title} Interface UI`}
                            className="w-full h-full object-cover object-top select-none"
                            loading="lazy"
                            decoding="async"
                          />
                        </picture>
                      </div>
                    </div>
                  </div>
                </TiltCard>

                {/* 2. Interactive Monospaced View Controller Tabs */}
                <div className="flex border border-subtle rounded-xl bg-surface/50 p-1 divide-x divide-subtle font-mono text-[9px] tracking-wider relative select-none">
                  <button
                    onClick={() => setModalState({ projectId: project.id, view: 'interface' })}
                    aria-label={`Open ${project.title} interface screenshot modal`}
                    className="flex-1 py-3 text-center rounded-lg cursor-pointer transition-colors flex items-center justify-center gap-1.5 font-bold bg-transparent border border-transparent text-foreground/50 hover:text-foreground hover:bg-foreground/2 w-full"
                  >
                    <Laptop className="h-3.5 w-3.5" />
                    {t('projects.stories.viewInterface', '/ VIEW FULL INTERFACE')}
                  </button>
                  <button
                    onClick={() => setModalState({ projectId: project.id, view: 'architecture' })}
                    aria-label={`Open ${project.title} system architecture diagram modal`}
                    className="flex-1 py-3 text-center rounded-lg cursor-pointer transition-colors flex items-center justify-center gap-1.5 font-bold bg-transparent border border-transparent text-foreground/50 hover:text-foreground hover:bg-foreground/2 w-full"
                  >
                    <GitBranch className="h-3.5 w-3.5" />
                    {t('projects.stories.viewArchitecture', '/ VIEW ARCHITECTURE')}
                  </button>
                </div>

                {/* 3. Performance Metrics Benchmarks */}
                <div className="rounded-xl border border-subtle bg-surface/30 p-5 space-y-4 font-mono text-[10px] text-left">
                  <div className="border-b border-subtle pb-2">
                    <span className="text-[9px] uppercase tracking-wider text-primary block font-bold">
                      {t('projects.stories.metricOutcomes', '/ Metric Outcomes')}
                    </span>
                    <span className="text-[8px] text-foreground/60 block mt-0.5">
                      {t('projects.stories.metricSubtitle', 'What we changed / Why it mattered')}
                    </span>
                  </div>

                  {project.architectureDiagramType === 'microfrontend' && (
                    <div className="space-y-3 font-sans">
                      <div className="flex justify-between items-baseline gap-2">
                        <span className="font-semibold text-foreground">
                          {t(
                            'projects.stories.outcomePayload',
                            '94% Payload Reduction [6.2MB → 350KB]',
                          )}
                        </span>
                      </div>
                      <p className="text-[10px] text-foreground/60 leading-relaxed font-light">
                        {t(
                          'projects.stories.outcomePayloadDesc',
                          'Vite-based monorepo partitions decoupled legacy assets, securing a perfect 1.4s LCP load time.',
                        )}
                      </p>
                    </div>
                  )}

                  {project.architectureDiagramType === 'statesync' && (
                    <div className="space-y-3 font-sans">
                      <div className="flex justify-between items-baseline gap-2">
                        <span className="font-semibold text-foreground">
                          {t(
                            'projects.stories.outcomeDeduplication',
                            '60% Request Deduplication [500+ updates/sec]',
                          )}
                        </span>
                      </div>
                      <p className="text-[10px] text-foreground/60 leading-relaxed font-light">
                        {t(
                          'projects.stories.outcomeDeduplicationDesc',
                          'Virtualized-DOM rendering throttles prevented mobile thrashing and cut server-infrastructure costs.',
                        )}
                      </p>
                    </div>
                  )}

                  {project.architectureDiagramType === 'composition' && (
                    <div className="space-y-3 font-sans">
                      <div className="flex justify-between items-baseline gap-2">
                        <span className="font-semibold text-foreground">
                          {t(
                            'projects.stories.outcomeVitals',
                            '100% Core Web Vitals [INP Sub-12ms]',
                          )}
                        </span>
                      </div>
                      <p className="text-[10px] text-foreground/60 leading-relaxed font-light">
                        {t(
                          'projects.stories.outcomeVitalsDesc',
                          'Localized reactive leaf nodes completely isolated visual mutations from the global state tree.',
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Col B: Case Study Info & Tradeoffs (6 cols) */}
              <div className={`lg:col-span-6 space-y-6 text-left ${isOdd ? 'lg:order-1' : ''}`}>
                <div>
                  <h3 className="font-display text-3xl font-light tracking-tight text-foreground md:text-4xl">
                    {project.title}
                  </h3>
                </div>

                {/* 4-Stage Case Study Layout (Context, Challenge, Decision, Impact) */}
                <div className="space-y-5 font-display">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <span className="font-mono text-[8.5px] uppercase tracking-wider text-primary font-bold block">
                        {t('projects.context', '/ CONTEXT')}
                      </span>
                      <p className="text-xs leading-relaxed text-foreground/75 font-light">
                        {project.context}
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <span className="font-mono text-[8.5px] uppercase tracking-wider text-primary font-bold block">
                        {t('projects.complexity', '/ CHALLENGE')}
                      </span>
                      <p className="text-xs leading-relaxed text-foreground/75 font-light">
                        {project.challenge}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-subtle pt-4 space-y-1.5">
                    <span className="font-mono text-[8.5px] uppercase tracking-wider text-primary font-bold block">
                      {t('projects.decisions', '/ TECHNICAL LEADERSHIP DECISION')}
                    </span>
                    <p className="text-xs leading-relaxed text-foreground/75 font-light">
                      {project.decision}
                    </p>
                  </div>

                  {/* Highlighted Outcome Box */}
                  <div className="pf-accent-panel p-5">
                    <span className="font-mono text-[8.5px] uppercase tracking-wider text-primary block font-bold mb-1.5">
                      {t('projects.results', '/ BUSINESS IMPACT')}
                    </span>
                    <p className="text-xs text-foreground/80 leading-relaxed font-light font-display">
                      {project.businessImpact}
                    </p>
                  </div>
                </div>

                {/* Architectural Tradeoff Component */}
                <TradeoffLedger
                  chosen={project.tradeoffsChosen}
                  rejected={project.tradeoffsRejected}
                />
              </div>
            </div>
          </m.section>
        )
      })}

      {/* Modal Overlay for high-res images and SVG topologies */}
      <AnimatePresence>
        {modalState && activeProject && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-500 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            onClick={() => setModalState(null)}
          >
            <m.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full bg-background border border-subtle rounded-2xl overflow-hidden shadow-2xl p-6 space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-subtle pb-3">
                <div>
                  <h4 className="text-sm font-semibold tracking-tight text-foreground font-mono">
                    {activeProject.title.toUpperCase()}
                  </h4>
                  <span className="text-[9px] uppercase tracking-wider text-primary font-bold font-mono">
                    /{' '}
                    {modalState.view === 'interface'
                      ? t('projects.stories.modal.interfaceCapture', 'Interface Viewport Capture')
                      : t('projects.stories.modal.topologySchema', 'Workspace Topology Schema')}
                  </span>
                </div>
                <button
                  onClick={() => setModalState(null)}
                  className="p-1.5 rounded-lg border border-subtle bg-surface text-foreground/50 hover:text-foreground transition-colors duration-300 cursor-pointer"
                  aria-label="Close modal dialog"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="w-full aspect-[16/9] relative bg-surface rounded-lg flex items-center justify-center overflow-hidden border border-subtle">
                {modalState.view === 'interface' ? (
                  <picture>
                    <source
                      type="image/avif"
                      srcSet={coverSources(activeProject.coverPath).avif}
                      sizes="(min-width: 1024px) 900px, 100vw"
                    />
                    <source
                      type="image/webp"
                      srcSet={coverSources(activeProject.coverPath).webp}
                      sizes="(min-width: 1024px) 900px, 100vw"
                    />
                    <img
                      src={activeProject.coverPath}
                      alt={`${activeProject.title} Interface Visual`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain select-none"
                    />
                  </picture>
                ) : (
                  <div className="w-full h-full p-8 flex flex-col justify-between select-none">
                    <div className="absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(circle_at_1px_1px,#ff4a3a_1px,transparent_0)] bg-size-[12px_12px]" />

                    <div className="flex items-center justify-between border-b border-subtle pb-3">
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary flex items-center gap-1.5 font-bold">
                        <Activity className="h-3 w-3 text-primary animate-pulse" />
                        {t('projects.stories.modal.topology', 'SYSTEM TOPOLOGY')}
                      </span>
                      <span className="font-mono text-[8px] text-foreground/35">
                        {t('projects.stories.modal.diagnostic', 'DIAGNOSTIC_SNAP')}
                      </span>
                    </div>

                    {activeProject.architectureDiagramType === 'microfrontend' && (
                      <svg className="w-full h-60 my-auto" viewBox="0 0 200 120" fill="none">
                        <rect
                          x="15"
                          y="10"
                          width="170"
                          height="20"
                          rx="3"
                          fill="var(--primary)"
                          fillOpacity="0.1"
                          stroke="var(--primary)"
                          strokeWidth="0.7"
                          strokeDasharray="3 3"
                        />
                        <text
                          x="100"
                          y="22"
                          fill="var(--primary)"
                          fontSize="6"
                          fontFamily="monospace"
                          textAnchor="middle"
                        >
                          {t('projects.stories.modal.workspace', 'MONOREPO WORKSPACE [SCHILLING]')}
                        </text>
                        <line
                          x1="45"
                          y1="30"
                          x2="45"
                          y2="55"
                          stroke="var(--primary)"
                          strokeWidth="0.5"
                        />
                        <line
                          x1="100"
                          y1="30"
                          x2="100"
                          y2="55"
                          stroke="var(--primary)"
                          strokeWidth="0.5"
                        />
                        <line
                          x1="155"
                          y1="30"
                          x2="155"
                          y2="55"
                          stroke="var(--primary)"
                          strokeWidth="0.5"
                        />
                        <rect
                          x="20"
                          y="55"
                          width="50"
                          height="20"
                          rx="2"
                          fill="var(--surface)"
                          stroke="var(--border-default)"
                          strokeWidth="0.5"
                        />
                        <text
                          x="45"
                          y="67"
                          fill="var(--foreground)"
                          fontSize="5"
                          fontFamily="monospace"
                          textAnchor="middle"
                        >
                          core-platform
                        </text>
                        <rect
                          x="75"
                          y="55"
                          width="50"
                          height="20"
                          rx="2"
                          fill="var(--surface)"
                          stroke="var(--border-default)"
                          strokeWidth="0.5"
                        />
                        <text
                          x="100"
                          y="67"
                          fill="var(--foreground)"
                          fontSize="5"
                          fontFamily="monospace"
                          textAnchor="middle"
                        >
                          shared-design-sys
                        </text>
                        <rect
                          x="130"
                          y="55"
                          width="50"
                          height="20"
                          rx="2"
                          fill="var(--surface)"
                          stroke="var(--border-default)"
                          strokeWidth="0.5"
                        />
                        <text
                          x="155"
                          y="67"
                          fill="var(--foreground)"
                          fontSize="5"
                          fontFamily="monospace"
                          textAnchor="middle"
                        >
                          feature-billing
                        </text>
                        <line
                          x1="45"
                          y1="75"
                          x2="100"
                          y2="95"
                          stroke="var(--primary)"
                          strokeWidth="0.5"
                        />
                        <line
                          x1="100"
                          y1="75"
                          x2="100"
                          y2="95"
                          stroke="var(--primary)"
                          strokeWidth="0.5"
                        />
                        <line
                          x1="155"
                          y1="75"
                          x2="100"
                          y2="95"
                          stroke="var(--primary)"
                          strokeWidth="0.5"
                        />
                        <circle cx="100" cy="95" r="10" fill="var(--primary)" />
                        <text
                          x="100"
                          y="97.5"
                          fill="var(--primary-foreground)"
                          fontSize="7"
                          fontWeight="bold"
                          fontFamily="monospace"
                          textAnchor="middle"
                        >
                          VITE
                        </text>
                      </svg>
                    )}

                    {activeProject.architectureDiagramType === 'statesync' && (
                      <svg className="w-full h-60 my-auto" viewBox="0 0 200 120" fill="none">
                        <path
                          d="M10,20 Q50,45 100,20 T190,20"
                          stroke="var(--primary)"
                          strokeWidth="0.6"
                          strokeDasharray="3 2"
                        />
                        <text
                          x="100"
                          y="10"
                          fill="var(--primary)"
                          fontSize="5"
                          fontFamily="monospace"
                          textAnchor="middle"
                        >
                          {t(
                            'projects.stories.modal.stream',
                            'LIVE TRANSACTIONAL OPERATIONS STREAM',
                          )}
                        </text>
                        <rect
                          x="25"
                          y="45"
                          width="40"
                          height="24"
                          rx="2"
                          fill="var(--surface)"
                          stroke="var(--border-default)"
                          strokeWidth="0.5"
                        />
                        <text
                          x="45"
                          y="59"
                          fill="var(--foreground)"
                          fontSize="5"
                          fontFamily="monospace"
                          textAnchor="middle"
                        >
                          PostgreSQL
                        </text>
                        <line
                          x1="65"
                          y1="57"
                          x2="95"
                          y2="57"
                          stroke="var(--primary)"
                          strokeWidth="0.7"
                        />
                        <polygon points="95,57 91,55 91,59" fill="var(--primary)" />
                        <rect
                          x="95"
                          y="45"
                          width="45"
                          height="24"
                          rx="2"
                          fill="var(--primary)"
                          fillOpacity="0.05"
                          stroke="var(--primary)"
                          strokeWidth="0.7"
                        />
                        <text
                          x="117.5"
                          y="59"
                          fill="var(--primary)"
                          fontSize="5"
                          fontFamily="monospace"
                          textAnchor="middle"
                        >
                          TanStack Cache
                        </text>
                        <line
                          x1="140"
                          y1="57"
                          x2="160"
                          y2="57"
                          stroke="var(--foreground)"
                          strokeWidth="0.5"
                        />
                        <rect
                          x="160"
                          y="45"
                          width="25"
                          height="24"
                          rx="2"
                          fill="var(--surface)"
                          stroke="var(--border-default)"
                          strokeWidth="0.5"
                        />
                        <text
                          x="172.5"
                          y="59"
                          fill="var(--foreground)"
                          fontSize="5"
                          fontFamily="monospace"
                          textAnchor="middle"
                        >
                          v-DOM
                        </text>
                      </svg>
                    )}

                    {activeProject.architectureDiagramType === 'composition' && (
                      <svg className="w-full h-60 my-auto" viewBox="0 0 200 120" fill="none">
                        <circle
                          cx="100"
                          cy="20"
                          r="12"
                          fill="var(--primary)"
                          fillOpacity="0.1"
                          stroke="var(--primary)"
                          strokeWidth="0.7"
                        />
                        <text
                          x="100"
                          y="22.5"
                          fill="var(--primary)"
                          fontSize="5.5"
                          fontFamily="monospace"
                          textAnchor="middle"
                        >
                          {t('projects.stories.modal.store', 'Global Store')}
                        </text>
                        <line
                          x1="90"
                          y1="31"
                          x2="60"
                          y2="60"
                          stroke="var(--border-default)"
                          strokeWidth="0.5"
                        />
                        <line
                          x1="110"
                          y1="31"
                          x2="140"
                          y2="60"
                          stroke="var(--border-default)"
                          strokeWidth="0.5"
                        />
                        <rect
                          x="35"
                          y="60"
                          width="45"
                          height="18"
                          rx="2"
                          fill="var(--surface)"
                          stroke="var(--border-default)"
                          strokeWidth="0.5"
                        />
                        <text
                          x="57.5"
                          y="70"
                          fill="var(--foreground)"
                          fontSize="5"
                          fontFamily="monospace"
                          textAnchor="middle"
                        >
                          {t('projects.stories.modal.registry', 'Client Registry')}
                        </text>
                        <rect
                          x="120"
                          y="60"
                          width="45"
                          height="18"
                          rx="2"
                          fill="var(--surface)"
                          stroke="var(--border-default)"
                          strokeWidth="0.5"
                        />
                        <text
                          x="142.5"
                          y="70"
                          fill="var(--foreground)"
                          fontSize="5"
                          fontFamily="monospace"
                          textAnchor="middle"
                        >
                          {t('projects.stories.modal.leaf', 'Isolated Leaf')}
                        </text>
                        <path
                          d="M142.5,78 L142.5,95"
                          stroke="var(--primary)"
                          strokeWidth="0.7"
                          strokeDasharray="2 2"
                        />
                        <circle cx="142.5" cy="98" r="4" fill="var(--primary)" />
                      </svg>
                    )}

                    <div className="border-t border-subtle pt-2 flex items-center justify-between font-mono text-[7px]">
                      <span className="text-foreground/60">
                        {t('projects.stories.modal.verified', 'VERIFIED: OK')}
                      </span>
                      <span className="text-primary font-bold">
                        {t('projects.stories.modal.standards', '100% STANDARDS VERIFIED')}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}
