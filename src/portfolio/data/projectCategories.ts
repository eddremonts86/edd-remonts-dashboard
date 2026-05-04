/**
 * Project category definitions.
 * Single source of truth for CategoryFilter and useProjectFilter.
 */

export const DEFAULT_CATEGORY = 'All';

export const PROJECT_CATEGORIES = ['All', 'Frontend', 'Full Stack'] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

/** Maps category values to their i18n translation keys */
export const CATEGORY_KEYS: Record<ProjectCategory, string> = {
  All: 'all',
  Frontend: 'frontend',
  'Full Stack': 'fullStack',
};
