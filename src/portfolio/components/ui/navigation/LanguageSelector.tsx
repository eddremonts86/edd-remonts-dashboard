import { useLanguageCycler } from '@/portfolio/hooks/useLanguageCycler';

export const LanguageSelector = () => {
  const { currentLang, nextLang, toggle } = useLanguageCycler();

  return (
    <div className="relative z-50">
      <button
        onClick={toggle}
        className="border-foreground/10 flex h-10 min-w-[44px] items-center justify-center rounded-full bg-transparent px-4 text-[10px] font-medium tracking-widest text-foreground transition-colors duration-500 hover:bg-foreground hover:text-background"
        aria-label={`Current language: ${currentLang}. Click to change to ${nextLang.toUpperCase()}`}
      >
        <span className="uppercase text-primary">{currentLang}</span>
      </button>
    </div>
  );
};
