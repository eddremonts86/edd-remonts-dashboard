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
  /** Headline number for this project, and the one line that explains it. */
  outcomeHeadline: string
  outcomeDetail: string
  /**
   * Optional. The three diagrams are hand-drawn depictions of three specific
   * architectures; a project without one simply hides the architecture tab
   * rather than borrowing a picture of something it is not.
   */
  architectureDiagramType?: 'microfrontend' | 'statesync' | 'composition'
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

  // Four products designed, built and shipped end to end. The framing here is
  // deliberately not the one the client-platform case studies used: those led
  // with a measured delta on someone else's system (94% bundle cut, 98
  // Lighthouse). These are my own, and their honest numbers are product facts —
  // what they index, what they unify, what they support — not traction claims.
  const topStories: StoryProject[] = [
    {
      id: 'builderhunt',
      title: t('projects.stories.builderhunt.title', 'BuilderHunt'),
      category: t('projects.stories.builderhunt.category', 'Multi-Source Discovery Engine'),
      scaleLabel: t('projects.stories.builderhunt.scaleLabel', '13 Indexed Platforms'),
      impactLabel: t('projects.stories.builderhunt.impactLabel', 'Recency-Weighted Scoring'),
      architectureLabel: t('projects.stories.builderhunt.architectureLabel', 'Dedup & Decay Pipeline'),
      link: 'https://builderhunt.dev',
      urlPlaceholder: 'builderhunt.dev',
      coverPath: '/projects/builderhunt-cover.png',
      context: t(
        'projects.stories.builderhunt.context',
        'Hiring and open-source sourcing both run on GitHub stars, which reward what was popular years ago rather than who is shipping this month.',
      ),
      challenge: t(
        'projects.stories.builderhunt.challenge',
        'Thirteen platforms expose activity in thirteen shapes, the same person appears under different handles on each, and every signal ages at a different rate. Ranking them together means reconciling identity and freshness before a single result can be trusted.',
      ),
      decision: t(
        'projects.stories.builderhunt.decision',
        'I modelled recency as a half-life decay instead of a raw count, so a commit from last week outranks a three-year-old star pile, and put deduplication ahead of scoring so one person is one result. Contact stays manual: the product surfaces people, it never messages them.',
      ),
      businessImpact: t(
        'projects.stories.builderhunt.businessImpact',
        'In public beta with a free tier of 3 saved searches and 50 saved builders. Keyword alerts by email or RSS, private notes per profile, and CSV/JSON export, so a shortlist leaves the product in whatever tool the team already uses.',
      ),
      tradeoffsChosen: t(
        'projects.stories.builderhunt.tradeoffsChosen',
        'Decay-weighted scoring over lifetime totals, and deduplication before ranking, so freshness and identity are settled before anything is shown.',
      ),
      tradeoffsRejected: t(
        'projects.stories.builderhunt.tradeoffsRejected',
        'Automated outreach. It would have been the obvious growth lever and would have turned a discovery tool into another cold-email machine.',
      ),
      outcomeHeadline: t(
        'projects.stories.builderhunt.outcomeHeadline',
        '13 sources, one ranked list',
      ),
      outcomeDetail: t(
        'projects.stories.builderhunt.outcomeDetail',
        'GitHub, Reddit, Hacker News, DEV.to, Lobsters, Stack Overflow, npm, Hugging Face, GitLab, Codeberg, Hashnode and SourceHut, deduplicated and scored by recency.',
      ),
    },
    {
      id: 'geolocal',
      title: t('projects.stories.geolocal.title', 'GeoLocal CPH'),
      category: t('projects.stories.geolocal.category', 'Map-First Marketplace'),
      scaleLabel: t('projects.stories.geolocal.scaleLabel', '25,000 Listings'),
      impactLabel: t('projects.stories.geolocal.impactLabel', '4 Verticals, One Map'),
      architectureLabel: t('projects.stories.geolocal.architectureLabel', 'Geospatial Clustering'),
      link: 'https://geo.eduardoinerarte.dk',
      urlPlaceholder: 'geo.eduardoinerarte.dk',
      coverPath: '/projects/geolocal-cover.png',
      context: t(
        'projects.stories.geolocal.context',
        'Finding anything in Copenhagen means four different sites: Boliga for flats, DBA for cars, Facebook groups for services, Airbnb for the rest. Each one is a feed, and a feed cannot tell you what is ten minutes from your door.',
      ),
      challenge: t(
        'projects.stories.geolocal.challenge',
        'Properties, vehicles, services and experiences have almost nothing in common as data: different prices, different units, different lifespans. Putting all four on a single map means one schema flexible enough to hold them and one interface that does not turn into a filter panel.',
      ),
      decision: t(
        'projects.stories.geolocal.decision',
        'I made the map the primary surface rather than a feature of the list, and clustered by neighbourhood so a district reads at a glance before anything is filtered. Curation is deliberate and human, not a scraper firehose.',
      ),
      businessImpact: t(
        'projects.stories.geolocal.businessImpact',
        '25,000 listings across four verticals pinned over eight Copenhagen neighbourhoods, each with its own count. Free to browse, no ads, no dark patterns.',
      ),
      tradeoffsChosen: t(
        'projects.stories.geolocal.tradeoffsChosen',
        'Map first, list second, clustered per neighbourhood, so proximity is the primary filter and the rest is optional.',
      ),
      tradeoffsRejected: t(
        'projects.stories.geolocal.tradeoffsRejected',
        'An infinite ranked feed. Higher engagement, but it answers "what is popular" when the question is "what is near me".',
      ),
      outcomeHeadline: t('projects.stories.geolocal.outcomeHeadline', '25,000 listings on one map'),
      outcomeDetail: t(
        'projects.stories.geolocal.outcomeDetail',
        'Properties, vehicles, services and experiences across eight neighbourhoods, clustered so a district is legible before you filter anything.',
      ),
    },
    {
      id: 'ai-os',
      title: t('projects.stories.ai-os.title', 'AI-OS'),
      category: t('projects.stories.ai-os.category', 'Developer Environment System'),
      scaleLabel: t('projects.stories.ai-os.scaleLabel', '6 AI CLIs Unified'),
      impactLabel: t('projects.stories.ai-os.impactLabel', '~300 Shared Skills'),
      architectureLabel: t('projects.stories.ai-os.architectureLabel', 'Declarative & Idempotent'),
      link: 'https://ai-os.eduardoinerarte.dk',
      urlPlaceholder: 'ai-os.eduardoinerarte.dk',
      coverPath: '/projects/ai-os-cover.png',
      context: t(
        'projects.stories.ai-os.context',
        'Every AI CLI keeps its own config, its own skills folder and its own MCP list. Six of them means six copies of the same setup, drifting apart from the day you install the second one.',
      ),
      challenge: t(
        'projects.stories.ai-os.challenge',
        'A dev environment is not just dotfiles: it is CLIs, runtimes, language servers, model endpoints and the prompts themselves, spread across macOS, Linux and Windows. Making it reproducible means it has to be safe to run twice on a machine that is already half configured.',
      ),
      decision: t(
        'projects.stories.ai-os.decision',
        "I made one git repository the source of truth and symlinked out of it, so a skill is written once and every CLI sees it. MCP servers are declarative YAML rather than six hand-edited JSON files, and the installer is idempotent with a dry-run mode and CI validation on all three platforms. Karpathy's Spec → Verifier → Environment loop is encoded as three verifier gates per task.",
      ),
      businessImpact: t(
        'projects.stories.ai-os.businessImpact',
        'A new machine reaches a full working setup with one command: npx @edd_remonts/create-ai-os. Roughly 300 skills, 10 MCP servers, 45 CLI tools, 43 global node packages and 28 python packages, restored the same way every time.',
      ),
      tradeoffsChosen: t(
        'projects.stories.ai-os.tradeoffsChosen',
        'Symlinks from one repository over per-tool copies, so there is exactly one place a skill can be wrong.',
      ),
      tradeoffsRejected: t(
        'projects.stories.ai-os.tradeoffsRejected',
        'A sync daemon watching each tool. Less setup up front, but it turns config drift into a background process nobody can debug.',
      ),
      outcomeHeadline: t('projects.stories.ai-os.outcomeHeadline', '~300 skills across 6 AI CLIs'),
      outcomeDetail: t(
        'projects.stories.ai-os.outcomeDetail',
        'One repository, symlinked into every CLI, with 10 MCP servers as declarative YAML and an installer that is safe to run twice.',
      ),
    },
    {
      id: 'ai-schadcn-chat',
      title: t('projects.stories.ai-schadcn-chat.title', 'ai-schadcn-chat'),
      category: t('projects.stories.ai-schadcn-chat.category', 'Open-Source React Package'),
      scaleLabel: t('projects.stories.ai-schadcn-chat.scaleLabel', 'React 18 & 19'),
      impactLabel: t('projects.stories.ai-schadcn-chat.impactLabel', '8 Providers, One API'),
      architectureLabel: t(
        'projects.stories.ai-schadcn-chat.architectureLabel',
        'Provider-Agnostic Adapter',
      ),
      link: 'https://ai-chat.eduardoinerarte.dk',
      urlPlaceholder: 'ai-chat.eduardoinerarte.dk',
      coverPath: '/projects/ai-shadcn-chat-cover.png',
      context: t(
        'projects.stories.ai-schadcn-chat.context',
        'shadcn/ui gives you every primitive a chat interface needs and no chat interface. Everyone rebuilds the same streaming panel, and everyone rebuilds it welded to one provider.',
      ),
      challenge: t(
        'projects.stories.ai-schadcn-chat.challenge',
        'Streaming, markdown, code blocks, file upload and virtualised history are each easy alone and awkward together, especially while tokens are still arriving. Doing it once for Anthropic and again for every OpenAI-compatible gateway would have meant maintaining the same panel eight times.',
      ),
      decision: t(
        'projects.stories.ai-schadcn-chat.decision',
        'I put the provider behind an adapter so the panel only knows about a stream of tokens, which makes Anthropic, OpenAI and every OpenAI-compatible gateway the same integration. Configuration is deep rather than a prop soup, and the component ships as a package you install instead of a template you fork.',
      ),
      businessImpact: t(
        'projects.stories.ai-schadcn-chat.businessImpact',
        'MIT, on npm as @edd_remonts/ai-schadcn-chat. Works with Anthropic, OpenAI, OpenRouter, MiniMax, Together, Groq, vLLM and Ollama through one config object, and drops into an existing shadcn/ui app without a theme fight.',
      ),
      tradeoffsChosen: t(
        'projects.stories.ai-schadcn-chat.tradeoffsChosen',
        'One adapter boundary between the panel and the provider, so adding a gateway is configuration rather than a fork.',
      ),
      tradeoffsRejected: t(
        'projects.stories.ai-schadcn-chat.tradeoffsRejected',
        'A copy-paste template in the shadcn tradition. Easier to publish, impossible to fix once it is in fifty codebases.',
      ),
      outcomeHeadline: t(
        'projects.stories.ai-schadcn-chat.outcomeHeadline',
        '8 providers behind one config',
      ),
      outcomeDetail: t(
        'projects.stories.ai-schadcn-chat.outcomeDetail',
        'Anthropic, OpenAI, OpenRouter, MiniMax, Together, Groq, vLLM and Ollama, all the same integration for the component.',
      ),
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
                  {/* Only for projects that actually have a diagram — an empty
                      modal is worse than a missing tab. */}
                  {project.architectureDiagramType && (
                    <button
                      onClick={() => setModalState({ projectId: project.id, view: 'architecture' })}
                      aria-label={`Open ${project.title} system architecture diagram modal`}
                      className="flex-1 py-3 text-center rounded-lg cursor-pointer transition-colors flex items-center justify-center gap-1.5 font-bold bg-transparent border border-transparent text-foreground/50 hover:text-foreground hover:bg-foreground/2 w-full"
                    >
                      <GitBranch className="h-3.5 w-3.5" />
                      {t('projects.stories.viewArchitecture', '/ VIEW ARCHITECTURE')}
                    </button>
                  )}
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

                  <div className="space-y-3 font-sans">
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="font-semibold text-foreground">{project.outcomeHeadline}</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-foreground/70 font-light">
                      {project.outcomeDetail}
                    </p>
                  </div>
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
