/**
 * Single source of truth for section navigation.
 * Consumed by DotNavigation, StickyNav, and any future nav component.
 */

export interface NavSection {
  id: string;
  labelKey: string;
}

export const NAV_SECTIONS: NavSection[] = [
  { id: 'hero', labelKey: 'nav.home' },
  { id: 'about', labelKey: 'nav.about' },
  { id: 'experience', labelKey: 'nav.experience' },
  { id: 'projects', labelKey: 'nav.projects' },
  { id: 'contact', labelKey: 'nav.contact' },
];
