import { m } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { fadeInView, staggerContainer } from '@/portfolio/lib/motion'
import { Container, Section } from '../ui/layout/Section'
import { SectionSlate } from '../ui/layout/SectionSlate'

const REPO_URL = 'https://github.com/eddremonts86/edd-remonts-dashboard'

/**
 * Entries reference real commits in this repo — hash, date, and tools are
 * facts, not staging. Titles/learnings are i18n'd; keep them in sync with
 * the commits they cite when curating new entries.
 */
const LOG_ENTRIES: Array<{
  hash: string
  date: string
  titleKey: string
  titleFallback: string
  learningKey: string
  learningFallback: string
  tools: string[]
}> = [
  {
    hash: 'fa451a2',
    date: '2026-06-12',
    titleKey: 'log.entries.v3.title',
    titleFallback: 'Shipped the cinematic v3 — ink shader, The Lab, ⌘K palette',
    learningKey: 'log.entries.v3.learning',
    learningFallback:
      'A 6KB hand-rolled fragment shader beats a 150KB 3D library when performance is the brand.',
    tools: ['WebGL', 'GLSL', 'Framer Motion', 'Claude Code'],
  },
  {
    hash: 'd0c0bd9',
    date: '2026-06-12',
    titleKey: 'log.entries.spec.title',
    titleFallback: 'Wrote the design spec before touching code',
    learningKey: 'log.entries.spec.learning',
    learningFallback:
      'Deciding what NOT to add (three.js) was the most valuable line in the document.',
    tools: ['Markdown', 'Claude Code'],
  },
  {
    hash: '8de2052',
    date: '2026-06-01',
    titleKey: 'log.entries.grid.title',
    titleFallback: 'Cinematic grid motifs and dynamic overlays',
    learningKey: 'log.entries.grid.learning',
    learningFallback:
      'Atmosphere comes from layered subtlety — grain, vignette, hairlines — not from louder colors.',
    tools: ['CSS', 'Tailwind v4'],
  },
  {
    hash: 'a861eab',
    date: '2026-05-31',
    titleKey: 'log.entries.a11y.title',
    titleFallback: 'Accessibility pass across portfolio components',
    learningKey: 'log.entries.a11y.learning',
    learningFallback: 'Motion you can switch off is craft; motion you cannot is decoration.',
    tools: ['React', 'ARIA', 'prefers-reduced-motion'],
  },
  {
    hash: '7782c95',
    date: '2026-05-31',
    titleKey: 'log.entries.i18n.title',
    titleFallback: 'Internationalized every section — EN / ES / DK',
    learningKey: 'log.entries.i18n.learning',
    learningFallback:
      'Copy is a design material: translating it forces you to find the actual sentence.',
    tools: ['i18next', 'TypeScript'],
  },
  {
    hash: '8958847',
    date: '2026-05-29',
    titleKey: 'log.entries.v2.title',
    titleFallback: 'Site v2 — the portfolio became a database-driven product',
    learningKey: 'log.entries.v2.learning',
    learningFallback:
      'Eating my own dog food: the dashboard that manages this site is itself the case study.',
    tools: ['TanStack Start', 'Drizzle', 'PostgreSQL'],
  },
]

/**
 * Build Log — learning in public, sourced from the repo's actual history.
 * Format per entry: what shipped, what it taught, which tools did it.
 */
export const BuildLogSection = () => {
  const { t, i18n } = useTranslation()

  const formatDate = (iso: string) =>
    new Date(`${iso}T00:00:00`).toLocaleDateString(
      i18n.language === 'dk' ? 'da-DK' : i18n.language,
      { year: 'numeric', month: 'short', day: 'numeric' },
    )

  return (
    <Section id="log">
      <Container>
        <SectionSlate
          kicker={t('log.kicker', 'Learning In Public')}
          title={t('log.title', 'Build Log.')}
          accent={t('log.accent', 'Shipped, not staged.')}
          description={t(
            'log.description',
            'A curated cut of this repo’s real commit history — what shipped, what it taught me, and the tools that did it. Every hash links to the diff.',
          )}
        />

        <m.ol {...staggerContainer(0.07)} className="border-t border-subtle">
          {LOG_ENTRIES.map((entry) => (
            <m.li
              key={entry.hash}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="group border-b border-subtle"
            >
              <a
                href={`${REPO_URL}/commit/${entry.hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="grid gap-2 py-6 transition-colors duration-300 md:grid-cols-12 md:items-baseline md:gap-6 md:px-2 hover:bg-surface/40"
              >
                <span className="flex items-baseline gap-4 md:col-span-2 md:flex-col md:gap-1">
                  <code className="font-mono text-[11px] font-bold tracking-wider text-primary">
                    {entry.hash}
                  </code>
                  <time
                    dateTime={entry.date}
                    className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/45"
                  >
                    {formatDate(entry.date)}
                  </time>
                </span>

                <span className="md:col-span-6">
                  <span className="flex items-start gap-2 font-display text-base font-medium tracking-tight text-foreground md:text-lg">
                    {t(entry.titleKey, entry.titleFallback)}
                    <ArrowUpRight
                      className="mt-1 h-3.5 w-3.5 shrink-0 text-foreground/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="mt-1 block font-serif text-sm italic leading-relaxed text-foreground/65">
                    {t(entry.learningKey, entry.learningFallback)}
                  </span>
                </span>

                <span className="flex flex-wrap content-start gap-1.5 md:col-span-4 md:justify-end">
                  {entry.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-subtle bg-background/60 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-foreground/55"
                    >
                      {tool}
                    </span>
                  ))}
                </span>
              </a>
            </m.li>
          ))}
        </m.ol>

        <m.p {...fadeInView({ delay: 0.2, distance: 10 })} className="mt-8 text-left">
          <a
            href={`${REPO_URL}/commits`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/55 transition-colors duration-300 hover:text-primary"
          >
            {t('log.viewAll', 'Full history on GitHub')}
            <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </m.p>
      </Container>
    </Section>
  )
}
