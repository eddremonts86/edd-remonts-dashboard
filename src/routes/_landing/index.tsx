import { createFileRoute } from '@tanstack/react-router'
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
  component: PortfolioRoot,
})
