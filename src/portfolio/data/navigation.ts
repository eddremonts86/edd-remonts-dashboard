/**
 * Single source of truth for section navigation.
 * Consumed by DotNavigation, StickyNav, and any future nav component.
 */

import { useMemo } from 'react'
import { usePortfolioData } from '@/portfolio/contexts/PortfolioDataContext'

export interface NavSection {
  id: string
  labelKey: string
}

// The Lab and the build log are no longer on the page (see App.tsx). Their
// components and translations are kept for a possible standalone route, but
// they must not appear here — DotNavigation and the command palette would
// offer dead anchors.
export const NAV_SECTIONS: NavSection[] = [
  { id: 'hero', labelKey: 'nav.home' },
  { id: 'projects', labelKey: 'nav.projects' },
  { id: 'about', labelKey: 'nav.about' },
  { id: 'authority', labelKey: 'nav.authority' },
  { id: 'experience', labelKey: 'nav.experience' },
  { id: 'services', labelKey: 'nav.services' },
  { id: 'contact', labelKey: 'nav.contact' },
]

/**
 * The sections that are actually on the page right now.
 *
 * Services come from the database and can be emptied from the dashboard, in
 * which case ServicesSection renders nothing. Reading the static list directly
 * would then point a nav dot and a command-palette entry at an anchor that is
 * not there — the same dead-anchor problem the Lab and build log caused.
 */
export function useNavSections(): NavSection[] {
  const { services } = usePortfolioData()
  const hasServices = services.length > 0
  // Memoised: useScrollSpy keys its listener off the array identity, so a new
  // array every render would tear the scroll listener down and rebuild it.
  return useMemo(
    () => (hasServices ? NAV_SECTIONS : NAV_SECTIONS.filter((s) => s.id !== 'services')),
    [hasServices],
  )
}
