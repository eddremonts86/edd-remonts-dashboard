/**
 * Single source of truth for section navigation.
 * Consumed by DotNavigation, StickyNav, and any future nav component.
 */

export interface NavSection {
  id: string
  labelKey: string
}

export const NAV_SECTIONS: NavSection[] = [
  { id: 'hero', labelKey: 'nav.home' },
  { id: 'about', labelKey: 'nav.about' },
  { id: 'projects', labelKey: 'nav.projects' },
  { id: 'authority', labelKey: 'nav.authority' },
  { id: 'experience', labelKey: 'nav.experience' },
  { id: 'contact', labelKey: 'nav.contact' },
]
