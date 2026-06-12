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
  { id: 'projects', labelKey: 'nav.projects' },
  { id: 'lab', labelKey: 'nav.lab' },
  { id: 'log', labelKey: 'nav.log' },
  { id: 'about', labelKey: 'nav.about' },
  { id: 'authority', labelKey: 'nav.authority' },
  { id: 'experience', labelKey: 'nav.experience' },
  { id: 'contact', labelKey: 'nav.contact' },
]
