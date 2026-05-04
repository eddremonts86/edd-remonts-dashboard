export interface HoverColors {
  bgColor: string;
  textColor: string;
  mutedTextColor: string;
  sublineTextColor: string;
  borderColor: string;
  buttonHover: string;
  greetingTextColor: string;
}

export function getHoverColors(isHovered: boolean, resolvedTheme: string): HoverColors {
  const isDark = isHovered && resolvedTheme === 'dark';
  const isLight = isHovered && resolvedTheme === 'light';

  return {
    bgColor: isDark ? 'bg-black' : isLight ? 'bg-white' : 'bg-background',
    textColor: isDark ? 'text-white' : isLight ? 'text-black' : 'text-foreground',
    mutedTextColor: isDark ? 'text-white/80' : isLight ? 'text-black/80' : 'text-foreground/80',
    sublineTextColor: isDark ? 'text-white/60' : isLight ? 'text-black/60' : 'text-foreground/60',
    borderColor: isDark ? 'border-white/20' : isLight ? 'border-black/20' : 'border-foreground/20',
    buttonHover: isDark
      ? 'hover:bg-white hover:text-black'
      : isLight
        ? 'hover:bg-black hover:text-white'
        : 'hover:bg-foreground hover:text-background',
    greetingTextColor: isDark ? 'text-white' : isLight ? 'text-black' : 'text-primary',
  };
}
