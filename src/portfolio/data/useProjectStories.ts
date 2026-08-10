import { useTranslation } from 'react-i18next'

export interface StoryProject {
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

/**
 * The flagship case studies, keyed by the same id the database uses for the
 * project index, so one row can render its own story inline.
 *
 * These live here rather than in the database because they are long-form
 * editorial copy in three languages: i18next already owns that, and putting
 * prose behind a migration would make every wording fix a schema change.
 */
export function useProjectStories(): Record<string, StoryProject> {
  const { t } = useTranslation()

  // Four products designed, built and shipped end to end. The framing here is
  // deliberately not the one the client-platform case studies used: those led
  // with a measured delta on someone else's system (94% bundle cut, 98
  // Lighthouse). These are my own, and their honest numbers are product facts —
  // what they index, what they unify, what they support — not traction claims.
  const stories: StoryProject[] = [
    {
      id: 'builderhunt',
      title: t('projects.stories.builderhunt.title', 'BuilderHunt'),
      category: t('projects.stories.builderhunt.category', 'Multi-Source Discovery Engine'),
      scaleLabel: t('projects.stories.builderhunt.scaleLabel', '13 Indexed Platforms'),
      impactLabel: t('projects.stories.builderhunt.impactLabel', 'Recency-Weighted Scoring'),
      architectureLabel: t(
        'projects.stories.builderhunt.architectureLabel',
        'Dedup & Decay Pipeline',
      ),
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

  return Object.fromEntries(stories.map((s) => [s.id, s]))
}
