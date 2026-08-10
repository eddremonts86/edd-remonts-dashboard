/**
 * Single source of truth for section navigation.
 * Consumed by DotNavigation, StickyNav, and any future nav component.
 */

export interface NavSection {
  id: string
  labelKey: string
}

// The Lab section is no longer on the page (see App.tsx). Its components and
// translations are kept for a possible standalone route, but it must not appear
// here — DotNavigation and the command palette would offer a dead anchor.
export const NAV_SECTIONS: NavSection[] = [
  { id: 'hero', labelKey: 'nav.home' },
  { id: 'projects', labelKey: 'nav.projects' },
  { id: 'log', labelKey: 'nav.log' },
  { id: 'about', labelKey: 'nav.about' },
  { id: 'authority', labelKey: 'nav.authority' },
  { id: 'experience', labelKey: 'nav.experience' },
  { id: 'contact', labelKey: 'nav.contact' },
]
