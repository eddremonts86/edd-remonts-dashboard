# Design Audit — edd-remonts-dashboard Portfolio

**Auditor:** GitHub Copilot  
**Skills applied:** design-auditor, refactoring-ui, ux-heuristics, frontend-design, microinteractions, web-design-guidelines  
**Date:** 2026-05-11  
**App:** http://localhost:3000 (Spanish locale observed)

---

## Executive Summary

The portfolio has a strong aesthetic foundation: dark theme, serif/mono type mix, Framer Motion animations, and a clear editorial direction. However, three systemic issues dilute the impact:

1. **Border overload** — `border-subtle` is applied on almost every section boundary, creating a "caged" feeling where the eye never flows freely between sections.
2. **Spacing inconsistency** — Section padding alternates between `py-10`, `py-24`, `py-28`, `py-36`, `py-40` with no clear scale, making rhythm feel accidental.
3. **Visual hierarchy gaps** — Several sections (Stats, Skills Marquee, ExperienceCard) compete visually rather than creating a clear focal point.

**Overall score by framework:**
| Framework | Score |
|---|---|
| Refactoring UI (hierarchy/spacing/color) | 6.5/10 |
| UX Heuristics (usability/clarity) | 7/10 |
| Microinteractions (feedback/states) | 6/10 |
| Accessibility (contrast/focus/a11y) | 6.5/10 |
| **Composite** | **6.5/10** |

---

## 1. Border Overload — HIGH PRIORITY

### Problem
Every section uses `border-t border-subtle`, `border-b border-subtle`, or `border-y border-subtle` as a separator. Counting actual occurrences in the component tree:

| Component | Border class |
|---|---|
| `AboutSection` | `border-t border-subtle` (section) |
| `ExperienceTimeline` | `border-t border-subtle` (section) + `border-t border-subtle` (inner list container) |
| `ExperienceCard` | `border-b border-subtle` (every card) |
| `FeatureCard` | `border-b border-subtle` (every feature) |
| `SkillsMarquee` | `border-y border-subtle` |
| `StatsCounter` | `border-y border-subtle` |
| `TestimonialBlock` | `border-y border-subtle` |
| `CodeShowcase` | `border-b border-subtle` |
| `ProjectsGallery` | `border-b border-subtle` (heading) + `border-t border-subtle` (list) = **double border** |
| `Footer` | `border-t border-subtle` |
| `StickyNav` | `border-b border-subtle` |
| `TechArsenal heading` | `border-b border-subtle` |
| `TechBadge` | `border border-subtle` (every badge) |
| `CarouselControls` buttons | `border border-subtle` (prev + next buttons) |

**Result:** The page has ~15+ horizontal dividing lines. This creates a segmented, over-divided layout that fights against flow and makes section transitions feel heavy.

### Fix Strategy

**Rule: Use background shift OR border — never both. Use neither when spacing alone suffices.**

- **Keep** section `border-t/b` only when two sections share the SAME background color (background ↔ background). When the adjacent sections already have different backgrounds (`bg-background` → `bg-surface`), the color contrast IS the separator — the line is redundant.
- **Remove** inner component dividers (ExperienceCard bottom border, FeatureCard bottom border) — spacing + generous `py-10/py-12` already creates visual grouping.
- **ProjectsGallery**: The heading has `border-b` and the list immediately follows with `border-t` — this creates a visible double-line gap (1px gap between two hairlines). Remove the `border-t` from the list.

**Specific actions:**
```
AboutSection:          border-t border-subtle → REMOVE (comes after Hero which already ends with padding)
ExperienceTimeline:    border-t border-subtle (section) → KEEP (transitions from bg-background to bg-background)
ExperienceTimeline:    border-t border-subtle (inner div) → REMOVE (spacing already separates)
ExperienceCard:        border-b border-subtle → REMOVE (last card has no bottom content; use gap instead)
FeatureCard:           border-b border-subtle → REMOVE (spacing + hover state is sufficient)
SkillsMarquee:         border-y border-subtle → KEEP only border-b, remove border-t
StatsCounter:          border-y border-subtle → KEEP (visually distinct block between sections)
TestimonialBlock:      border-y border-subtle → KEEP (marks a contained pause in content)
CodeShowcase:          border-b border-subtle → REMOVE (Contact section's dark bg provides transition)
ProjectsGallery list:  border-t border-subtle → REMOVE (double-border with heading's border-b)
TechArsenal heading:   border-b border-subtle → REMOVE (font/spacing contrast is enough)
TechBadge:             border border-subtle → Consider: bg-surface already differentiates from bg-background; remove border or reduce to border-transparent hover:border-subtle
```

---

## 2. Stats Section — Spacing & Rhythm

### Problem
`StatsCounter` uses `border-y border-subtle` combined with `divide-subtle md:divide-x`. On desktop, this creates vertical dividers between stat columns. On mobile, the stats stack vertically with no dividers but the section border remains, creating an inconsistent feel.

The padding is `py-10 md:py-0` — on desktop the stats only get padding from the inner cells (`py-16`), on mobile there's only `py-10` which feels tight.

### Fix
- Remove the outer `border-y` and let the section sit between Hero and About using background alone.
- Change `py-10 md:py-0` → `py-16 md:py-0` so mobile stats get more breathing room.
- The `divide-x` creates thin vertical lines that feel mechanical and out of character with the editorial tone. Consider replacing with a subtle absolute-positioned separator or simply relying on spacing:
  ```tsx
  // Before
  className="flex flex-col divide-subtle md:flex-row md:divide-x"
  // After
  className="flex flex-col md:flex-row"
  // Each stat cell then gets a right-border on all but last:
  // "border-r border-subtle last:border-r-0" (optional, only if visual separation is needed)
  ```

---

## 3. ExperienceCard — Visual Hierarchy

### Problem
Each `ExperienceCard` has three competing visual elements at equal weight:
1. The period (primary brand color — `text-primary`)
2. The company name (large, `text-xl/2xl`)
3. The role title (serif italic, also `text-xl/2xl`)

The period drawing primary color attention is counter-intuitive — the **role** and **company** should be the focal point, with the period being secondary context.

Additionally, the `border-b border-subtle` separator between every card (12 cards total) creates an overwhelming grid of horizontal lines in the Experience section.

### Fix
```tsx
// Period: demote — was text-primary, should be text-foreground/40
<span className="mb-2 font-mono text-[11px] tracking-widest text-foreground/40">

// Company: promote — make it the anchor
<h4 className="mb-1 text-xl font-semibold tracking-tight md:text-2xl">{exp.company}</h4>

// Location: keep small
<span className="text-foreground/35 font-mono text-xs uppercase tracking-wider">

// Role: secondary to company, but still prominent
<h3 className="break-words font-serif text-lg text-foreground/80 group-hover:text-primary md:text-xl">
```

Replace border separators with spacing: change `border-b border-subtle` to `border-b-0` and add `mb-2` between cards.

---

## 4. ProjectsGallery — Double Border

### Problem
```tsx
// Line ~18: heading block has border-b
<div className="... border-b border-subtle pb-12">

// Line ~30: list block immediately after has border-t
<div className="relative border-t border-subtle">
```

These two lines sit next to each other with no gap between them, creating a visible "double hairline" that looks like a rendering artifact.

### Fix
Remove the `border-t border-subtle` from the list wrapper in `ProjectsGallery.tsx`. The heading's `border-b` already creates the separator.

---

## 5. About Section — FeatureCard Borders

### Problem
Each `FeatureCard` has `border-b border-subtle pb-12` which creates a horizontal rule below each service card. With 3 cards stacked vertically, this generates 3 unnecessary horizontal lines in an already border-heavy page.

### Fix
Remove `border-b border-subtle` from `FeatureCard`. Use the existing `gap-12 md:gap-16` between cards for separation. The hover state (`group-hover:border-foreground/20`) is also tied to this border — keep the hover behavior but use a different approach:
```tsx
// Replace border-based hover with a subtle left accent
<div className="group-hover:translate-x-1 relative z-10 flex-1 pb-12 transition-transform duration-700 md:pb-16">
  // Add a vertical accent line on the left:
  <div className="transition-opacity duration-700 absolute -left-4 top-0 h-full w-px bg-primary opacity-0 group-hover:opacity-100" />
```

---

## 6. Skills Marquee — Context & Hierarchy

### Problem
`SkillsMarquee` renders as `border-y border-subtle bg-surface` — the `bg-surface` already distinguishes it from adjacent `bg-background` sections. The `border-y` is redundant.

Additionally, the marquee has no heading/label. Users scrolling quickly have no anchoring context for what the scrolling pills represent. The `ARSENAL TECNOLÓGICO` heading is inside `TechArsenal` (the right column of Experience section), not visible near the marquee itself.

### Fix
- Remove `border-y` from `SkillsMarquee` — the surface background + top padding of the adjacent section provides separation.
- Consider adding a subtle eyebrow above the marquee:
  ```tsx
  <p className="mb-6 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/30">
    Tech Stack
  </p>
  ```

---

## 7. TechArsenal — Heading Rule

### Problem
```tsx
<h3 className="... border-b border-subtle pb-4">ARSENAL TECNOLÓGICO</h3>
```

A heading with an underline border feels like an `<hr>` was misplaced as a text decoration. It's a pattern from 2010-era websites.

### Fix
Remove `border-b border-subtle pb-4` from the heading. Increase letter-spacing or add a decorative accent:
```tsx
<h3 className="text-foreground/50 mb-8 font-mono text-sm uppercase tracking-[0.3em]">
  Arsenal Tecnológico
</h3>
```

---

## 8. Sticky Nav — Visual Weight

### Problem
`StickyNav` uses `border-b border-subtle` on the nav bar itself, which is fine. But the mobile menu panel also uses `border-t border-subtle`:
```tsx
// Mobile menu
<div className="overflow-hidden border-t border-subtle md:hidden">
```

This combined with the nav's own `border-b` creates a sandwich of two borders when the mobile menu opens, with the nav border-b and menu border-t touching.

### Fix
Remove `border-t border-subtle` from the mobile menu panel — the nav's own bottom border already creates the visual separation.

---

## 9. Spacing Scale Inconsistency — MEDIUM PRIORITY

The current section padding values form no discernible scale:

| Section | Mobile | Desktop |
|---|---|---|
| Hero | — | `pb-24 md:pb-32` |
| Stats | `py-10` | `py-0` (inner cells `py-16`) |
| About | `py-24` | `md:py-40` |
| Experience | `py-24` | `md:py-40` |
| Skills Marquee | `py-12` | `py-12` |
| Projects | `py-24` | `md:py-40` |
| CodeShowcase | `py-24` | `md:py-40` |
| Testimonials | `py-28` | `md:py-36` |
| Contact | `py-24` | `md:py-32` |
| Footer | `py-16` | `md:py-24` |

Problems:
- Testimonials `py-28/md:py-36` doesn't match any other section's scale.
- Stats `py-10` is jarring — much tighter than everything around it.
- `md:py-40` is used for 4 sections identically (which is fine), but `md:py-36` and `md:py-32` are one-offs.

### Proposed Scale
Define a consistent Tailwind-based rhythm:
```
xs:  py-10 md:py-12  — narrow strips (Stats, Marquee)
sm:  py-16 md:py-20  — compact sections
md:  py-24 md:py-32  — standard sections
lg:  py-32 md:py-40  — flagship sections (About, Experience, Projects)
xl:  py-40 md:py-52  — hero-level sections (unused currently)
```

Apply:
- Stats → `py-12 md:py-0` (inner cells stay `py-16`)
- Testimonials → `py-28 md:py-40` (align with lg scale)

---

## 10. Typography — Heading Split Inconsistency

### Problem
Navigation section labels use an inconsistent split pattern:
- Hero: `"Hola, soy Eddy."` + `"FrontendArtesano."` — clear intentional split
- About: `t('about.titleAccent')` on one line + `<br/>` + italic `t('about.title')` — split controlled by translation key
- Projects: `t('projects.title')` then `<span class="block">t('projects.titleAccent')</span>` — block-span split
- Experience: same block-span split
- Contact: `{title}<br/><span text-primary>{titleAccent}</span>`

The result looks visually similar but the DOM structure varies. More importantly, the section label split (primary title / italic accent) is a strong identity pattern but the **which part is italic and which is bold varies**:
- About: accent = italic serif (primary color)
- Projects: accent = italic serif (primary color)  ✓ consistent
- Experience: accent = italic serif (primary color) ✓ consistent
- Contact: accent = same color (primary) but uppercase bold, not serif italic

### Fix
Contact section heading should follow the pattern established elsewhere — use serif italic for the accent rather than bold uppercase:
```tsx
// ContactSection.tsx — current:
<h2 className="mb-6 text-5xl font-black uppercase ... text-background">
  {t('contact.title')} <br />
  <span className="text-primary">{t('contact.titleAccent')}</span>
</h2>

// Proposed (matches site pattern):
<h2 className="mb-6 text-5xl font-light tracking-tight text-background md:text-7xl">
  {t('contact.title')}
  <span className="mt-2 block font-serif italic text-primary">
    {t('contact.titleAccent')}
  </span>
</h2>
```

The Contact section's inverted background (`bg-foreground`) makes it a deliberate contrast moment, so the bolder typographic choice *could* be intentional. If keeping the bold uppercase, at least make the main title weight consistent with other sections (`font-light` instead of `font-black`), using weight contrast for hierarchy rather than doubling font-black + uppercase.

---

## 11. Microinteractions — Missing States

### Issues

| Element | Missing State | Impact |
|---|---|---|
| `CarouselControls` prev/next | No active/pressed visual state (`:active` scale) | Medium |
| `CategoryFilter` pills | Active state uses `bg-foreground text-background` but no transition-in animation | Low |
| `ContactForm` submit button | Loading spinner appears inside button but button doesn't disable visually (no `opacity-50 cursor-not-allowed`) | High |
| `ProjectListItem` | Hover shows `bg-surface` but no focus-visible ring for keyboard users | High |
| `ThemeToggle` | Switching theme has no transition feedback — icon swaps instantly | Low |
| `ExperienceCard` arrow icon | Arrow appears on hover but has no keyboard-visible trigger (`focus-within`) | Medium |

### Priority Fixes

**ContactForm submit button — disable during loading:**
```tsx
// ContactForm.tsx
<button
  type="submit"
  disabled={status === 'submitting'}
  className={`... transition-opacity duration-300 ${status === 'submitting' ? 'cursor-not-allowed opacity-60' : ''}`}
>
```

**ProjectListItem — add focus-visible ring:**
```tsx
<m.article
  className="... focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
  tabIndex={0}
>
```

**CarouselControls — add active scale:**
```tsx
className="... active:scale-90"
```

---

## 12. Accessibility — WCAG Gaps

| Issue | Location | Severity |
|---|---|---|
| `ProjectListItem` is a `<div>` acting as a link — not keyboard accessible | `ProjectListItem.tsx` | Critical |
| Stats section numbers count from 0 — screen reader announces "0+" before animation starts | `StatsCounter.tsx` | Medium |
| `FloatingImagePreview` has no `aria-hidden` — floating preview image announced to screen readers on every hover | `FloatingImagePreview.tsx` | Medium |
| Decorative `"` quote mark in TestimonialBlock has `aria-hidden` ✓ | — | — |
| `SkillsMarquee` marquee has no `aria-label` and no `prefers-reduced-motion` pause | `SkillsMarquee.tsx` | High |
| Language switcher buttons lack `aria-label` with the full language name | `LanguageSelector.tsx` | Medium |
| `ExperienceCard` hover arrow (`ArrowUpRight`) is hidden with `hidden md:block` but has no `aria-hidden` | `ExperienceCard.tsx` | Low |

### Fix for `ProjectListItem`:
```tsx
// Wrap the card in an <a> or add role="link" + keydown handler
<m.a
  href={project.link}
  target="_blank"
  rel="noopener noreferrer"
  className="group relative z-10 ..."
>
```

### Fix for `SkillsMarquee` reduced motion:
```tsx
// In SkillsMarquee: pause animation on prefers-reduced-motion
<div className="... motion-safe:animate-marquee motion-reduce:animate-none flex">
```

---

## 13. Mobile — Responsive Issues

| Issue | Component | Notes |
|---|---|---|
| Hero `pb-24 md:pb-32` — bottom padding doesn't account for mobile notch/safe area on older iPhones | `HeroSection.tsx` | `pb-[max(6rem,env(safe-area-inset-bottom))]` pattern used in Footer but not Hero |
| `StatsCounter` `py-0` on desktop relies entirely on inner cell padding — if a stat card text wraps, there's no guaranteed vertical rhythm | `StatsCounter.tsx` | Add `min-h-[180px]` per cell |
| `ExperienceCard` description text `text-sm md:text-base` — the 12+ card descriptions at small size starting to feel dense on mobile | `ExperienceCard.tsx` | Consider `text-base` always, or use `text-sm` only for the period/location labels |
| `ContactSection` form card `p-8 md:p-12 lg:p-14` — on small screens the form card is very edge-to-edge inside the section's `px-6` container | `ContactSection.tsx` | Add `mx-2 sm:mx-0` or reduce container padding on mobile |

---

## 14. Code Section — Realism

### Problem
The `CodeShowcase` section shows a TypeScript file with:
```ts
experience: { years: 19, companies: 10 }
```
…but the stats section and seeded data show `years: 18, companies: 12`. This is a hardcoded string out of sync with the database-driven data.

### Fix
Either:
1. Connect the code block content to the `usePortfolioData()` context (dynamic), or
2. Update the static string to match actual values: `years: 18, companies: 12`

---

## 15. Color — Dark Mode Only

The portfolio currently appears to be primarily designed for dark mode, with light mode as an afterthought. The `getHoverColors` helper in HeroSection applies different `bgColor`, `textColor`, etc. based on the resolved theme, but many sections hardcode dark-mode assumptions:

- `ContactForm` inputs: `bg-foreground/5` — works in both modes ✓
- `CodeBlock`: `bg-[#0A0A0A]` and `bg-[#151515]` — hardcoded dark colors, broken in light mode

### Fix (CodeBlock specifically)
```tsx
// WindowChrome.tsx — hardcoded dark
className="... bg-[#151515] ..."

// Replace with:
className="... bg-surface/80 dark:bg-[#151515] ..."
```

---

## 16. Footer — Missing Quick Nav

### Observation
The footer has branding (logo + copyright) and social links, but no quick navigation links. For a portfolio, a footer with a "Return to top" or section links (About, Projects, Contact) is a standard UX affordance, especially since the sticky nav disappears on first scroll for users who reach the footer.

### Proposed Addition
```tsx
// Simple footer nav row
<nav className="mb-12 flex flex-wrap justify-center gap-x-8 gap-y-3">
  {['about', 'experience', 'projects', 'contact'].map(section => (
    <a key={section} href={`#${section}`} className="font-mono text-xs uppercase tracking-widest text-foreground/40 transition-colors hover:text-foreground">
      {section}
    </a>
  ))}
</nav>
```

---

## 17. Performance — Animation Budget

### Observation
Several animations overlap on scroll entry:
1. Stats counter animation
2. `fadeInView` on every ExperienceCard (12 cards) with `index * 0.1` delay = 1.2s total stagger
3. `ScrollRevealText` in About (word-by-word reveal)
4. Marquee in Skills

On low-powered devices, this concurrent animation load can cause jank. The stagger chain for 12 ExperienceCards means the last card doesn't animate until 1.2s after viewport entry.

### Fix
Cap the stagger delay:
```tsx
// In ExperienceCard.tsx
{...fadeInView({ delay: Math.min(index * 0.1, 0.4) })}
```

Add `will-change: transform` only to the actively animating elements (Framer Motion does this automatically, but verify via DevTools).

---

## Priority Roadmap

### 🔴 Do First (1–2 days)
1. Remove redundant section borders (§1) — highest visual impact
2. Remove ProjectsGallery double border (§4)
3. Fix ContactForm submit button disabled state (§11)
4. Fix `ProjectListItem` keyboard accessibility (§12)

### 🟡 Do Next (1 week)
5. Fix ExperienceCard visual hierarchy — period color (§3)
6. Remove FeatureCard border (§5)
7. Remove TechArsenal heading border (§7)
8. Fix mobile nav double border (§8)
9. Align Contact section heading style (§10)
10. Fix CodeShowcase hardcoded values (§14)

### 🟢 Polish (ongoing)
11. Spacing scale normalization (§9)
12. Remaining microinteraction states (§11)
13. SkillsMarquee reduced-motion support (§12)
14. Footer quick nav (§16)
15. ExperienceCard stagger cap (§17)
16. Light mode CodeBlock colors (§15)

---

## Quick Reference — File × Issue Map

| File | Issues |
|---|---|
| `ExperienceCard.tsx` | §1 (border-b), §3 (hierarchy), §12 (aria-hidden arrow), §17 (stagger) |
| `ExperienceTimeline.tsx` | §1 (inner border-t) |
| `FeatureCard.tsx` | §1, §5 |
| `ProjectsGallery.tsx` | §1, §4, §12 (ProjectListItem keyboard) |
| `ProjectListItem.tsx` | §12 (keyboard a11y), §11 (focus ring) |
| `SkillsMarquee.tsx` | §1, §6, §12 (reduced-motion) |
| `StatsCounter.tsx` | §1, §2, §12 (sr count) |
| `TechArsenal.tsx` | §7 |
| `StickyNav.tsx` | §8 |
| `TestimonialBlock.tsx` | §1 (keep, justified) |
| `ContactSection.tsx` | §10, §13 |
| `ContactForm.tsx` | §11 (disabled state) |
| `CodeShowcase.tsx` | §1, §14 |
| `CodeBlock.tsx` / `WindowChrome.tsx` | §15 (light mode) |
| `Footer.tsx` | §16 |
| `HeroSection.tsx` | §13 (safe-area) |
| `LanguageSelector.tsx` | §12 (aria-label) |
| `FloatingImagePreview.tsx` | §12 (aria-hidden) |
| `CarouselControls.tsx` | §11 (active state) |
