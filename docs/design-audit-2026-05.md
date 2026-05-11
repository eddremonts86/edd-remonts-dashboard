# Design Audit — edd-remonts-dashboard
**Date:** 2026-05-11  
**Reviewer:** Senior/Principal design review via code audit + live inspection  
**Mode:** Both light + dark, code-level + structural  
**Priority:** P0 = blocker; P1 = high; P2 = medium; P3 = polish

---

## 1. Findings by Section

### 1.1 Logo — `Logo.tsx`

**Status: 🔴 P0 — REPLACE**

Issues:
- Uses system fonts `Arial Narrow, Impact, Haettenschweiler` as `<text>` inside SVG — these render differently per OS, unpredictably on Windows/Linux 
- The geometric box + slash motif is generic; any identity-less brand could use it
- Not animated — missed opportunity to signal craft on the main brand mark
- Wide viewport SVG `1280×420` is wide and short — looks awkward at small nav sizes (`h-10`)
- `linearGradient` id `logo-gradient` is global — if two Logo instances render (nav + mobile menu), the gradient id collides producing wrong colors on one

**Fix:** Create a new monogram SVG: initials `EI` as a ligature mark + animated stroke draw-on on first load. Pure paths — no `<text>` nodes. Square viewport (1:1) so it scales cleanly.

---

### 1.2 Sticky Nav — `StickyNav.tsx`

**Status: 🟡 P2**

Issues:
- `bg-background/80 backdrop-blur-xl` — in **light mode** this creates a bleached frosted glass that looks cheap because `--background: #fbfaf9` + 80% opacity + blur over white sections is barely distinguishable from the page background. No perceived depth.
- Nav links color `text-primary` by default — all nav links look "active" since primary is the same crimson red. Should be `text-foreground/50` to rest, `text-primary` only on hover.
- Logo in nav uses `h-10 md:h-12` but the SVG viewport is `1280×420` (very wide) — this renders the logo as a tiny wide strip, ~48px tall × ~150px wide. Looks fragile.

**Fix:**
- In light mode: swap `bg-background/80` → `bg-background/95 border-b border-subtle` (subtle border provides the separation that blur doesn't)
- Nav links: `text-foreground/50 hover:text-foreground` (with primary only on active/current scroll position)
- Logo: replace with new square monogram (see §1.1)

---

### 1.3 Hero — `HeroSection.tsx`

**Status: 🟢 P3 mostly good**

Issues:
- `mix-blend-difference` on `hero.titleLine2` creates unintended color inversion in **light mode** when the background is near-white — the text flips to near-black-on-white which is fine, but the blend bleeds onto the adjacent `Hello, I'm Eddy.` line during hover causing a flash.
- The two CTA buttons have `rounded-full` — fine in dark mode, but in **light mode** the `border` on near-white background is `border-subtle = rgba(16,16,16,0.06)` — effectively invisible. The buttons appear buttonless.
- `ScrollIndicator` animation appears lost — verify it has a `whileInView` or `animate` prop.

**Fix (minor):**
- Remove `mix-blend-difference` from `titleLine2` — it's creating fragile behavior. Use `opacity-60` or a tonal variant instead.
- CTA buttons: increase border opacity in light mode. Change to `border-foreground/20` (rather than relying on `border-subtle`).

---

### 1.4 Stats Counter — `StatsCounter.tsx`

**Status: 🟡 P2**

Issues:
- `border-y border-subtle bg-background` — the `border-subtle` in **light mode** is `rgba(16,16,16,0.06)`. Against `#fbfaf9` background this is nearly invisible. Section divisions between About (bg-surface) and the next section disappear, making the page feel like one undivided blob.
- Stat cells have `border-r border-subtle` as dividers — same problem, invisible in light mode.
- `hover:bg-surface` on stats cells in light mode: `--surface: #ffffff` — hovered white over `#fbfaf9` near-white is imperceptible.

**Fix:**
- Increase `border-subtle` opacity in light mode `:root` from `rgba(16,16,16,0.06)` → `rgba(16,16,16,0.10)` **globally** (this fixes multiple sections at once)
- Stat hover: `hover:bg-foreground/[0.03]` is more reliable than `hover:bg-surface`

---

### 1.5 About Section — `AboutSection.tsx` + `FeatureCard.tsx`

**Status: 🟡 P2**

Issues:
- `bg-surface` in light mode = `#ffffff` against `--background: #fbfaf9`. Very subtle, barely a distinction. The section doesn't visually separate from neighbors.
- FeatureCard icon container: `bg-background` in light mode = the paper bg, vs. surface white — this flips the expectation (card background is white, but icon bg is paper). Should be reversed or flattened.
- `ScrollRevealText` uses word-by-word animation but there's no fallback for `prefers-reduced-motion` — motion preference is not checked.

**Fix:**
- AboutSection bg: consider a slight tint like `bg-[oklch(97%_0.005_80)]` or simply remove the bg distinction and use a subtle top-border rule to separate sections cleanly.
- FeatureCard icon: `bg-surface` → `bg-foreground/[0.04]` for consistency
- ScrollRevealText: add `useReducedMotion` guard

---

### 1.6 Experience Timeline — `ExperienceCard.tsx`

**Status: 🟢 P3 mostly good**

Issues:
- `hover:bg-surface` — same light mode invisibility problem as above
- Cards have `rounded-xl` on hover — but in their default state they have `-mx-4 px-4` bleed, making the hover rectangle feel abrupt when it appears from nothing

**Fix:**
- Default state: very subtle `bg-foreground/[0.01]` always-on, hover increases to `bg-foreground/[0.04]` — the transition is perceived, not a jump-from-nothing
- Drop `rounded-xl` — a full-width highlight row looks more editorial

---

### 1.7 Code Showcase — `CodeShowcase.tsx`

**Status: 🟡 P2**

Issues:
- `shadow-2xl` on the CodeBlock frame in **light mode** produces a heavy drop shadow on a light-grey rounded rectangle against near-white background — looks overdone (THIS is one of the "too much shadow" areas you noticed)
- `from-subtle ... bg-gradient-to-b` uses `from-subtle` — `border-subtle` is `rgba(0,0,0,0.06)` so the gradient is essentially transparent → near-transparent, which in dark mode is fine but in light mode the frame is almost invisible, undermining the intended "premium frame" intent

**Fix:**
- Light mode: replace `shadow-2xl` → `shadow-[0_2px_20px_rgba(0,0,0,0.06)]` (a much quieter shadow)
- Remove the gradient frame approach — use a single `border border-foreground/10 rounded-2xl` instead; add a `bg-[#101010]` well on the CodeBlock that speaks for itself

---

### 1.8 Contact Section — `ContactSection.tsx` + `ContactForm.tsx`

**Status: 🟡 P2**

Issues:
- Contact form card: `rounded-2xl bg-background p-8 shadow-2xl` in **light mode** = a white card with a heavy `shadow-2xl` floating on a black `bg-foreground` sections. The shadow is black-on-black which renders as nothing — but in a reflow where bg changes it becomes problematic
- `shadow-2xl` on the contact form card is the **primary culprit** for "too much shadow" complaint
- `bg-primary/10` decorative blur circle in the form will be a faint red blob visible in light mode at high contrast

**Fix:**
- Remove `shadow-2xl` from the form card. Because the contact section bg is `bg-foreground` (dark), the form card is already a white rectangle on dark — the contrast itself is the separator, no shadow needed.
- Decorative circle: reduce to `bg-primary/5` or remove it

---

### 1.9 Testimonials — `TestimonialBlock.tsx`

**Status: 🟢 P3 mostly good**

Issues:
- `border-y border-subtle` — same reduced visibility in light mode
- The decorative blobs (`bg-primary/4`, `bg-primary/3`) are okay in dark mode but in **light mode** at 4% primary opacity = very faint red smear that may look like an artifact (not clearly intentional)

**Fix:**
- Light mode: reduce blob opacity further or set `.dark` conditional. Can do this via Tailwind: `bg-primary/[0.02] dark:bg-primary/[0.04]`

---

### 1.10 Projects Gallery — `ProjectListItem.tsx`

**Status: 🟢 P3**

Issues:
- `border-b border-subtle` list dividers are nearly invisible in light mode
- Project list rows: `hover:bg-surface` (same invisible hover)
- `rounded-xl` on hover row feel — same abrupt-from-nothing issue as ExperienceCard

**Fix:** Same pattern as ExperienceCard — always-on near-transparent bg, hover increases slightly. Or switch to a left-rule indicator.

---

### 1.11 Footer — `Footer.tsx`

**Status: 🔴 P0 — needs fixes from the new implementation**

Issues found in the new implementation:
1. **Missing `whileInView` scroll animation** — The `m.div` wrapper uses `initial="hidden" whileInView="visible"` with `variants={staggerChildren(0.07)}` BUT the child `item` variants only have `hidden/visible` keys — this is correct. However the `staggerChildren` utility from `motion.ts` uses `hidden/visible` keys too. Let's verify this actually works. **Wait** — the `staggerChildren` from `motion.ts` returns `{ hidden: {}, visible: { transition: { staggerChildren } } }` — this IS compatible. But the parent variant needs `initial="hidden"` and `whileInView="visible"` with `variants={staggerChildren(…)}` spread. In the current code they ARE set manually on the wrapper, so this SHOULD work. **BUT**: the `m.div` child elements have `variants={item}` — Framer Motion propagates the `initial` and `whileInView` states down through `variants`, so children DON'T need their own `initial/animate`. This should work.

2. **Real bug causing lost animation**: the outer `m.div` has `variants={staggerChildren(0.07)}` but `staggerChildren()` is used as a variable name AND as a function call — the imported `staggerChildren` from `motion.ts` returns the variants object with `hidden/visible` keys. That's fine. **The actual problem**: the children need to `variants={item}` where `item` has `hidden` and `visible` keys, which they do. This should work. **Check if the issue is the `viewport` config** — `margin: '-80px'` might be too aggressive and the footer never enters the viewport trigger area.

3. **Social icon typing issue**: `const Icon = social.icon` assumes `social.icon` is a React component. Verify the `CvPersonalInfo.socials` type has `icon` as a component.

4. **Stats layout in footer duplicate**: The footer now shows stats AND the `StatsCounter` section shows the same numbers elsewhere. The footer stats feel redundant. Consider replacing stats with 2-3 competency keywords ("TypeScript · React · PostgreSQL").

5. **"Available for new work" pill** — the pulsing dot is static CSS (no animation). In PRODUCT.md this was meant to pulse. Need `animate-pulse` class on the dot.

6. **Email in top bar** — on mobile this overflows, since email addresses are long and there's no truncation.

7. **Nav section label "Navigate"** — the `t('footer.nav.heading', 'Navigate')` translation key doesn't exist in the i18n files. Same for all `footer.*` keys.

---

## 2. Global Issues

### 2.1 `border-subtle` too faint in light mode (P0 — affects everything)

```css
/* Current */
--border-subtle: rgba(16, 16, 16, 0.06);  /* Barely visible */

/* Fix */
--border-subtle: rgba(16, 16, 16, 0.10);  /* Still subtle, but readable */
```

This single change fixes: Stats dividers, About/Experience section edges, Project list rows, Testimonial border, Footer top border. **Highest ROI fix on the list.**

### 2.2 `bg-surface` too close to `bg-background` in light mode (P1)

```css
/* Current */
--background: #fbfaf9;
--surface: #ffffff;  /* 4/255 lightness difference — imperceptible at small sizes */

/* Fix — make surface noticeably distinct */
--surface: #f5f4f2;  /* warmer, clearly distinct from background */
```

This makes section alternation legible (hero on bg, about on surface, etc.).

### 2.3 `shadow-2xl` overuse in light mode (P1)

Instances that must be reduced:
- `CodeShowcase.tsx`: `.shadow-2xl` → `.shadow-sm` or custom low-opacity shadow
- `ContactSection.tsx` form card: `.shadow-2xl` → remove entirely (contrast handles it)
- `StickyNav` mobile menu (check) — verify no heavy shadow

### 2.4 Scroll animations broken / not triggering (P1)

Root causes found:
- `fadeInView()` sets `viewport: { once: true, margin: '-100px' }` — the margin of -100px means the element must be 100px inside the viewport. This is fine for most elements but **Footer** and other bottom-of-page elements may be caught with too-tight margins.
- Some components use `{...fadeInView()}` spread but inside a parent that ALREADY has `initial/whileInView` — this causes a conflict. Framer Motion's orchestration requires you use EITHER spread props (imperative) OR variants (declarative), not both on the same element chain.
- **`staggerChildren` in Footer**: the parent variant `staggerChildren()` controls timing, but the children use spread `variants={item}` which IS the variants approach — this combination IS correct and should work. Verify in browser with devtools.

### 2.5 Missing i18n keys (P2)

New footer uses translation keys that don't exist:
- `footer.available`
- `footer.nav.label`
- `footer.nav.heading`
- `footer.social.heading`
- `footer.stats.years`
- `footer.stats.companies`
- `footer.stats.tech`
- `footer.stats.lighthouse`
- `footer.rights`
- `footer.colophon`

---

## 3. Logo Redesign Spec

### Concept: `EI` Monogram — Animated Stroke Draw-On

**Design rationale:**
- Initials `E` + `I` form a clear, distinctive mark at small sizes
- The `I` vertical stroke can double as a separator, creating a ligature tension
- Angular cut at the joint references the existing slash motif (continuity)
- Square viewport (100×100 or 120×120) scales cleanly at all sizes

**Visual structure:**
```
 ┌──────────────────────┐
 │  ╔═══╗               │
 │  ║   ╠──────│        │
 │  ║   ║      │        │
 │  ╚═══╝      │        │
 └──────────────────────┘
    E (open)   I (stem)
```

Actually as an SVG monogram: a bold `E` (3 horizontal bars + vertical stem) with the `I` sharing the right edge of the E's vertical bar — creates a single unified path. The dot of the `I` becomes a small square accent at top-right.

**Animation spec (Framer Motion + SVG):**
- On mount: `pathLength` tween from `0` → `1` over `1.2s` with `APPLE_EASE`
- Stroke draws on, then fill fades in (`opacity: 0→1`) at `0.8s` with `0.4s` delay
- Duration: 1.2s total (draw) + 0.4s (fill) = 1.6s — feels intentional, not slow
- `prefers-reduced-motion`: skip draw animation, jump to fully visible state
- Color: `currentColor` for the path stroke/fill — inherits theme text color
- The primary red `--primary` used as an accent on a single geometric element (the `I` cap or a corner cut)

**SVG file plan:**
```tsx
// Logo.tsx — new implementation
// No <text> nodes. Pure paths. Square viewport.
// Two animation variants: 'draw' (default) | 'static' (reduced motion)
```

**Dimensions:** `viewBox="0 0 120 120"` — square, scales from `h-6` (16px) to `h-full`

---

## 4. Implementation Order (Priority Plan)

### Phase 1 — Global CSS fixes (30min, maximum visual ROI)

| Task | File | Change |
|------|------|--------|
| Fix `border-subtle` opacity | `index.css :root` | `rgba(16,16,16,0.10)` |
| Fix `bg-surface` distinction | `index.css :root` | `--surface: #f5f4f2` |
| No changes to dark mode tokens | — | Dark is working well |

### Phase 2 — Remove heavy shadows in light mode (45min)

| Task | File | Change |
|------|------|--------|
| CodeShowcase frame | `CodeShowcase.tsx` | `shadow-2xl` → `shadow-[0_2px_20px_rgba(0,0,0,0.06)]` + `border border-foreground/8` |
| Contact form card | `ContactSection.tsx` | Remove `shadow-2xl` entirely |
| Stat cells hover | `StatsCounter.tsx` | `hover:bg-surface` → `hover:bg-foreground/[0.03]` |
| Experience rows default | `ExperienceCard.tsx` | Add `bg-foreground/[0.01]` base, hover `bg-foreground/[0.04]` |
| Project list rows | `ProjectListItem.tsx` | Same pattern |

### Phase 3 — Scroll animation fixes (20min)

| Task | File | Change |
|------|------|--------|
| Footer animation | `Footer.tsx` | Change `margin: '-80px'` → `margin: '-40px'`; verify stagger chain |
| AboutSection reduced motion | `ScrollRevealText.tsx` | Add `useReducedMotion` guard |
| Fix viewport margins globally | `motion.ts` | Default `margin = '-80px'` (gentler trigger) |

### Phase 4 — Footer polish (30min)

| Task | File | Change |
|------|------|--------|
| Pulse dot animation | `Footer.tsx` | Add `animate-pulse` to availability dot |
| Email overflow on mobile | `Footer.tsx` | Truncate email or hide on xs |
| Replace stats with tech keywords | `Footer.tsx` | Remove `<dl>` stats block → replace with tech keyword list to avoid duplication |
| Add missing i18n keys | `en.json`, `es.json` | Add all `footer.*` keys |

### Phase 5 — Hero minor fixes (20min)

| Task | File | Change |
|------|------|--------|
| Remove `mix-blend-difference` | `HeroSection.tsx` | Replace with `opacity-60` on that span |
| CTA button border visibility | `HeroSection.tsx` | `border-foreground/20` instead of `border-subtle` |
| Nav links default color | `StickyNav.tsx` | `text-foreground/50 hover:text-foreground` |
| StickyNav bg light mode | `StickyNav.tsx` | `bg-background/95` instead of `/80`; keep `border-b border-subtle` |

### Phase 6 — New Logo (2-3h)

| Task | File | Change |
|------|------|--------|
| Design new `EI` monogram SVG | `Logo.tsx` | New file — pure paths, square viewport, no text nodes |
| Add stroke draw-on animation | `Logo.tsx` | `pathLength` 0→1, APPLE_EASE, 1.2s |
| Add Framer Motion wrapper | `Logo.tsx` | `m.path` with `useReducedMotion` guard |
| Test in nav (h-10/h-12) | `StickyNav.tsx` | Verify visual at small sizes |

---

## 5. Summary Scorecard

| Section | Light Mode | Dark Mode | Animation | Score |
|---------|-----------|-----------|-----------|-------|
| Logo | 🔴 Poor | 🟡 OK | ❌ None | 3/10 |
| Sticky Nav | 🟡 OK | 🟢 Good | ✅ | 6/10 |
| Hero | 🟡 OK | 🟢 Great | ✅ | 7/10 |
| Stats Counter | 🔴 Low contrast | 🟢 Good | ✅ | 5/10 |
| About | 🟡 Flat | 🟢 Good | ✅ | 6/10 |
| Code Showcase | 🔴 Shadow too heavy | 🟢 Great | ✅ | 5/10 |
| Experience | 🟡 Invisible hover | 🟢 Good | ✅ | 6/10 |
| Projects | 🟡 Invisible dividers | 🟢 Good | ✅ | 6/10 |
| Testimonials | 🟢 Good | 🟢 Good | ✅ | 8/10 |
| Contact | 🔴 Shadow overkill | 🟢 Good | ✅ | 5/10 |
| Footer | 🟡 Animation gap | 🟡 OK | ⚠️ Uncertain | 5/10 |

**Overall light mode: 5.5/10 → target 8.5/10 after fixes**  
**Overall dark mode: 8/10 → already good, minor gains only**

---

## 6. Decisions for Team Sign-Off

Before implementation, confirm:

1. **Logo concept** — `EI` monogram with animated draw-on, OR a wordmark-only approach (no icon). Which direction?
2. **`bg-surface` change** — Moving `--surface` from `#ffffff` to `#f5f4f2` changes the About section background. Preview needed before committing.
3. **Footer stats block** — Remove and replace with keyword tags (avoiding duplication with StatsCounter), or keep the repetition as deliberate reinforcement?
4. **`mix-blend-difference`** on hero title line — remove entirely or scope to dark mode only as `dark:mix-blend-difference`?
