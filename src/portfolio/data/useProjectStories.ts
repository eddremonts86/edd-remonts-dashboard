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

  // Seven products designed, built and shipped end to end. The framing here is
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
    {
      id: 'hunterready',
      title: t('projects.stories.hunterready.title', 'HunterReady'),
      category: t('projects.stories.hunterready.category', 'Verifiable Document Renderer'),
      scaleLabel: t('projects.stories.hunterready.scaleLabel', '103 Designs'),
      impactLabel: t('projects.stories.hunterready.impactLabel', 'Round-Trip Proven'),
      architectureLabel: t('projects.stories.hunterready.architectureLabel', 'WASM Vector PDF'),
      link: 'https://hunterready.eduardoinerarte.dk',
      urlPlaceholder: 'hunterready.eduardoinerarte.dk',
      coverPath: '/projects/hunterready-cover.png',
      context: t(
        'projects.stories.hunterready.context',
        'CV tools are either pretty and unparseable or parseable and ugly. Both sell the same promise — "ATS-friendly" — and neither can show you what an automated screen actually read back.',
      ),
      challenge: t(
        'projects.stories.hunterready.challenge',
        'A PDF that looks correct proves nothing: the text layer can arrive out of reading order, or be an image with no text at all. And the render path is WASM, which a green build silently drops — the bundler cannot see a file read at runtime, so dev and CI both pass while production has no renderer.',
      ),
      decision: t(
        'projects.stories.hunterready.decision',
        'Every design renders in a test that reads the PDF back with an independent parser and asserts each critical field survived in reading order, so the build fails rather than the applicant. A second test fails if any template has no round-trip test, and health checks assert the WASM binary and fonts are present instead of merely that the server is up.',
      ),
      businessImpact: t(
        'projects.stories.hunterready.businessImpact',
        'In beta at €12/month with checkout still closed. 28 structures across 17 themes, 60 bundled font families, five input formats including scans, and a public API of eight endpoints with its own OpenAPI reference.',
      ),
      tradeoffsChosen: t(
        'projects.stories.hunterready.tradeoffsChosen',
        'An independent parser as the judge, and a per-structure honesty rating: one of the 28 is labelled design-first rather than verified, because it is.',
      ),
      tradeoffsRejected: t(
        'projects.stories.hunterready.tradeoffsRejected',
        'Right-to-left PDF support. The glyphs and layout come out right and the text layer comes back reversed — a document that looks perfect and silently fails the one thing this product sells. The endpoint answers 422 and names the formats that do work.',
      ),
      outcomeHeadline: t(
        'projects.stories.hunterready.outcomeHeadline',
        'Every design read back, every build',
      ),
      outcomeDetail: t(
        'projects.stories.hunterready.outcomeDetail',
        'Fabrication is blocked in code rather than asked for in a prompt: numbers, names and acronyms must be grounded in the source document, and refused claims come back marked as refused.',
      ),
    },
    {
      id: 'enforma',
      title: t('projects.stories.enforma.title', 'enForma'),
      category: t('projects.stories.enforma.category', 'Local-First Training Platform'),
      scaleLabel: t('projects.stories.enforma.scaleLabel', '2,076 Movements Offline'),
      impactLabel: t('projects.stories.enforma.impactLabel', 'Encrypted Row Sync'),
      architectureLabel: t('projects.stories.enforma.architectureLabel', 'Envelopes, Not Blobs'),
      link: 'https://enforma.eduardoinerarte.dk',
      urlPlaceholder: 'enforma.eduardoinerarte.dk',
      coverPath: '/projects/enforma-cover.png',
      context: t(
        'projects.stories.enforma.context',
        'A training log is health data, and the box where you describe your situation is where somebody writes about an injury. Every tracker asks for an account first and holds that in plain text on its own server.',
      ),
      challenge: t(
        'projects.stories.enforma.challenge',
        'Encrypting on the device is the easy half. One encrypted blob per account is fine on one device and destroys data on two: train on the phone, open the laptop holding a stale copy, and the session is gone. Syncing without ever letting the server read a workout means the merge has to work on data it cannot see.',
      ),
      decision: t(
        'projects.stories.enforma.decision',
        'Rows, not blobs: one workout is one record with its own id and timestamp, and the server moves envelopes whose metadata is plaintext for merging while the body stays the same AES-GCM ciphertext that sits on the device. A random data key wrapped by the passphrase-derived key means a password change re-wraps one blob instead of re-encrypting every row. Sync is opt-in, and the active workout never leaves the device.',
      ),
      businessImpact: t(
        'projects.stories.enforma.businessImpact',
        'In production as an installable offline PWA, with web push and a paid panel gyms use to publish announcements, events, menus and programmes to their members. Pricing is published at €200 to €1,000 a month and invoiced by hand.',
      ),
      tradeoffsChosen: t(
        'projects.stories.enforma.tradeoffsChosen',
        'Deterministic arithmetic owns the timeline and the model only picks movements, so the plan can refuse a date instead of flattering one. Ask for one month to lose 60 kg and it still says twenty.',
      ),
      tradeoffsRejected: t(
        'projects.stories.enforma.tradeoffsRejected',
        'A payment processor. A subscription state machine with no payments behind it is a mechanism pretending to be a fact, so the gym plan is a field a human sets and the invoice is a human writing one.',
      ),
      outcomeHeadline: t(
        'projects.stories.enforma.outcomeHeadline',
        'A server that cannot read a workout',
      ),
      outcomeDetail: t(
        'projects.stories.enforma.outcomeDetail',
        '17 collections behind an opt-in sync server, and 2,076 movements bundled for offline use — held in separate files by licence, so share-alike attribution never leaks into a generated programme.',
      ),
    },
    {
      id: 'plans-explorer',
      title: t('projects.stories.plans-explorer.title', 'Plans Explorer'),
      category: t('projects.stories.plans-explorer.category', 'Static Faceted Search'),
      scaleLabel: t('projects.stories.plans-explorer.scaleLabel', '927 Indexed Plans'),
      impactLabel: t('projects.stories.plans-explorer.impactLabel', 'No Backend At All'),
      architectureLabel: t('projects.stories.plans-explorer.architectureLabel', 'Build-Time Index'),
      link: 'https://plans.eduardoinerarte.dk',
      urlPlaceholder: 'plans.eduardoinerarte.dk',
      coverPath: '/projects/plans-explorer-cover.png',
      context: t(
        'projects.stories.plans-explorer.context',
        'A corpus of 927 product plans, five documents each, sitting in folders. Deciding what to build next meant opening directories one at a time, and a corpus you cannot search is a corpus you rewrite by accident.',
      ),
      challenge: t(
        'projects.stories.plans-explorer.challenge',
        'The facets a reader wants are buried in prose written by successive generations of tooling: the country is a loose line, what someone will pay is free text, the stack is a bold label halfway down a plan. Faceted search over that means parsing prose reliably — and the whole thing had to keep running on a static file server.',
      ),
      decision: t(
        'projects.stories.plans-explorer.decision',
        'The index is built once at build time into JSON, and search runs in the browser over it. Each plan’s five documents are their own file, fetched only when a plan is opened, so the first paint carries the index rather than the corpus.',
      ),
      businessImpact: t(
        'projects.stories.plans-explorer.businessImpact',
        'Live and free with no account. 927 plans faceted by 58 categories, 318 tags, 1,821 technologies and 45 countries, ranked on three axes, with every plan shareable as its own URL.',
      ),
      tradeoffsChosen: t(
        'projects.stories.plans-explorer.tradeoffsChosen',
        'Build-time indexing and client-side search, so hosting is a static file server and there is nothing to keep running.',
      ),
      tradeoffsRejected: t(
        'projects.stories.plans-explorer.tradeoffsRejected',
        'A search backend. It would have handled a corpus ten times the size, and added a service to operate for a reader count that will never need one.',
      ),
      outcomeHeadline: t(
        'projects.stories.plans-explorer.outcomeHeadline',
        '927 plans, zero servers',
      ),
      outcomeDetail: t(
        'projects.stories.plans-explorer.outcomeDetail',
        'An 813 KB index searched in the browser with Fuse.js, and each plan’s SPEC, PRODUCT, PLAN, DESIGN and TASKS loaded only on open.',
      ),
    },
  ]

  return Object.fromEntries(stories.map((s) => [s.id, s]))
}
