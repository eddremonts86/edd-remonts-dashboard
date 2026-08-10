import { createFileRoute } from '@tanstack/react-router'
import { getContentBlocks } from '@/modules/portfolio/server/content'
import { getExperiences } from '@/modules/portfolio/server/experiences'
import { getProjects } from '@/modules/portfolio/server/projects'
import { getServices } from '@/modules/portfolio/server/services'
import { getSkills } from '@/modules/portfolio/server/skills'
import { getTestimonials } from '@/modules/portfolio/server/testimonials'
import { PortfolioRoot } from '@/portfolio/PortfolioRoot'
import { personJsonLd, socialMeta } from '@/shared/lib/seo'

export const Route = createFileRoute('/_landing/')({
  // Social cards and JSON-LD must be server-rendered: Slack, LinkedIn, X and
  // Googlebot's first pass never run the client bundle, so the equivalent tags
  // in <SEO /> (react-helmet-async, mounted after the preloader) reach nobody.
  head: () => ({
    meta: socialMeta(),
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(personJsonLd()),
      },
    ],
  }),
  /**
   * Every section of this page is fed by a useQuery in PortfolioDataContext,
   * and a query has no data during SSR. The server was rendering the headings
   * and the marketing copy over an empty dataset — the projects table said
   * "No projects found for this filter yet", the timeline had no roles, and
   * the skills, services and testimonials sections rendered nothing at all.
   * The client filled it in a moment after hydration, so it looked fine in a
   * browser and was invisible to anything that reads the HTML: Googlebot's
   * first pass, Slack, LinkedIn, and every crawler that does not run JS.
   *
   * Loading here puts the real data in the server-rendered markup, and the
   * loader result seeds the same queries as initialData so the client never
   * refetches on arrival.
   */
  loader: async () => {
    // Never let the database take the page down with it. Rendering on the
    // server means a dead connection now throws inside the route instead of
    // resolving to an empty query, and the whole landing page collapses into
    // an error boundary — the failure mode is total where it used to be
    // cosmetic. On failure this hands back nothing, the client refetches, and
    // the visitor sees what they saw before this loader existed.
    // undefined, not []: an empty array is data as far as React Query is
    // concerned, and with a five-minute staleTime it would sit there instead of
    // refetching. undefined leaves initialData unset so the query runs.
    const settle = async <T,>(
      label: string,
      run: () => Promise<T[]>,
    ): Promise<T[] | undefined> => {
      try {
        return await run()
      } catch (error) {
        console.error(`[landing] ${label} did not load; falling back to the client`, error)
        return undefined
      }
    }

    const [content, experiences, skills, projects, services, testimonials] = await Promise.all([
      settle('content', getContentBlocks),
      settle('experiences', getExperiences),
      settle('skills', getSkills),
      settle('projects', getProjects),
      settle('services', getServices),
      settle('testimonials', getTestimonials),
    ])
    return { content, experiences, skills, projects, services, testimonials }
  },
  component: PortfolioRoot,
})
