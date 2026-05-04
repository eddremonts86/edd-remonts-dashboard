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
    <div className="hide-scrollbar mt-8 flex w-full gap-4 overflow-x-auto pb-4 md:mt-0 md:w-auto md:pb-0">
      {PROJECT_CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          aria-pressed={active === cat}
          className={`min-h-[44px] whitespace-nowrap rounded-full border px-6 py-2 font-mono text-[11px] uppercase tracking-widest transition-all ${
            active === cat
              ? 'border-foreground bg-foreground text-background'
              : 'text-foreground/50 hover:border-foreground/30 border-subtle bg-transparent hover:text-foreground'
          }`}
        >
          {t(`projects.filters.${CATEGORY_KEYS[cat]}`)}
        </button>
      ))}
    </div>
  );
};
