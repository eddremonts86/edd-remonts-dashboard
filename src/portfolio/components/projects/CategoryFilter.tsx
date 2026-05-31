import { m } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { PROJECT_CATEGORIES, CATEGORY_KEYS } from '@/portfolio/data/projectCategories'

export const CategoryFilter = ({
  active,
  onSelect,
}: {
  active: string
  onSelect: (cat: string) => void
}) => {
  const { t } = useTranslation()

  return (
    <div className="hide-scrollbar inline-flex rounded-xl border border-subtle bg-surface/50 p-1 overflow-x-auto select-none relative">
      {PROJECT_CATEGORIES.map((cat) => {
        const isActive = active === cat
        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            aria-pressed={isActive}
            className={`relative whitespace-nowrap rounded-lg px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-colors duration-300 focus:outline-none z-10 ${
              isActive ? 'text-foreground font-medium' : 'text-foreground/50 hover:text-foreground'
            }`}
          >
            {isActive && (
              <m.span
                layoutId="activeTab"
                className="absolute inset-0 rounded-lg bg-background shadow-xs border border-subtle/50 z-[-1]"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            {t(`projects.filters.${CATEGORY_KEYS[cat]}`)}
          </button>
        )
      })}
    </div>
  )
}
