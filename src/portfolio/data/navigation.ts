/**
 * Single source of truth for section navigation.
 * Consumed by DotNavigation, StickyNav, and any future nav component.
 */

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
  { id: 'contact', labelKey: 'nav.contact' },
]
