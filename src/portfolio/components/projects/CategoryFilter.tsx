import { PROJECT_CATEGORIES, CATEGORY_KEYS } from '@/portfolio/data/projectCategories';
import { useTranslation } from 'react-i18next';

export const CategoryFilter = ({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (cat: string) => void;
}) => {
  const { t } = useTranslation();

  return (
    <div className="hide-scrollbar inline-flex rounded-xl border border-subtle bg-surface/50 p-1 overflow-x-auto select-none">
      {PROJECT_CATEGORIES.map((cat) => {
        const isActive = active === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            aria-pressed={isActive}
            className={`whitespace-nowrap rounded-lg px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-all duration-300 focus:outline-none ${
              isActive
                ? 'bg-background text-foreground shadow-xs'
                : 'text-foreground/50 hover:text-foreground'
            }`}
          >
            {t(`projects.filters.${CATEGORY_KEYS[cat]}`)}
          </button>
        );
      })}
    </div>
  );
};
