# Portfolio Cinematic v3 — Design Spec

**Date:** 2026-06-12 · **Branch:** `site-v3` · **Scope:** `src/portfolio` only (dashboard untouched)

## Goal

Turn the portfolio from a static editorial presentation into a **living system of evidence**
(per "The New Design Portfolio" thesis), adapted for a **software engineer**: the spectacle must
itself be proof of engineering judgment — performance, accessibility, and zero bundle bloat are
part of the show, not casualties of it.

Pass the 55-second test: visual polish on first paint, something to _touch_ within one scroll,
personality everywhere, tools-used receipts on every experiment.

## Approaches considered

1. **Add three.js / @react-three/fiber for 3D scenes.** Maximum out-of-the-box wow, but adds
   ~150KB+ gz to a portfolio whose hero metric is "94% bundle reduction" and "100% Core Web
   Vitals". Self-contradicting. Rejected.
2. **CSS-only refresh (tilt cards, scroll-driven CSS animations).** Cheap, safe, but doesn't
   deliver "cinematic 3D" or anything a hiring manager hasn't seen. Rejected.
3. **Hand-rolled WebGL shader engine + expanded Framer Motion choreography + live playground —
   zero new runtime dependencies.** Raw GLSL ink/smoke shader (~6KB of code) is itself a flex
   for an engineer; CSS 3D perspective + springs cover dimensional motion; the Lab section
   makes the site explorable. **Chosen.**

## Design language: "EDD — Title Sequence"

Keep the existing identity (Cinzel serif, Epilogue, JetBrains Mono; paper-white/ink-black,
crimson `#d13426`/`#ff4a3a`, film grain + vignette) — it is already distinctive. Elevate it from
_printed editorial_ to _film production_:

- Every section opens with a **slate** (film clapperboard header): `REEL 02 — SELECTED WORK`
  mono kicker, serif headline with masked line reveal, hairline rule that draws on scroll.
- The hero becomes a **living ink shot**: full-bleed WebGL fragment shader — fbm-driven ink
  flow in background tones with crimson undertow, reacting to the pointer. Falls back to the
  current static gradients when WebGL is unavailable or `prefers-reduced-motion`.
- Theme toggle uses the **View Transitions API** (circular wipe from the toggle), progressive
  enhancement only.

## Page composition (new order — evidence first)

1. **Hero** — shader canvas + tightened copy (name, role, one-line value prop, 3 CTAs:
   View work / Enter the lab / CV). Metrics panel stays, gains pointer-tracked 3D tilt.
   Outcome bullets move out of the hero (they survive in About/Authority copy).
2. **StatsCounter** — restyled as a slim ticker band (DB-driven, count-up preserved).
3. **Selected Work** — ProductStories + project registry. Browser-chrome panels get 3D tilt +
   sheen; `FloatingImagePreview` (currently orphaned) is re-mounted on the registry rows.
4. **The Lab** _(new)_ — live playground grid, 5 exhibits, each a working artifact with
   `Goal:` and `Tools:` microcopy:
   - **Ink Study** — the hero shader in a card with live uniform sliders (turbulence, speed, ink).
   - **Spring Lab** — stiffness/damping/mass sliders driving a spring-animated ball; presets.
   - **Scramble** — type-in input that letter-scrambles output (reuses `useTextScramble`).
   - **Magnetic Field** — grid of dots with spring repulsion physics around the cursor.
   - **Code Cinema** — revives the dead `CodeShowcase` suite (~650 lines) as an exhibit.
5. **BusinessImpact** — kept, slate header added.
6. **About + Engineering Authority** — kept, tightened with slates ("How I think" stays short).
7. **Tech Film Strip** _(new, replaces the misnamed static SkillsMarquee's missing motion)_ —
   infinite icon marquee from the 52 unused `/tech-icons/*.svg` + `techIcons.ts`, velocity/skew
   tied to scroll speed. The Architectural Capabilities card matrix stays below it.
8. **Experience / Testimonials / Contact / Footer** — kept, slate headers + microinteraction pass.

**Command palette (⌘K / Ctrl+K)** — engineer-signature easter egg: jump to sections, toggle
theme, switch language, download CV, pause the shader, plus playful hidden commands
(`sudo make coffee` → HTTP 418 toast). ARIA dialog, focus trap, ESC. Hinted in nav + footer.

**Preloader** — restyled as a boot/title sequence: mono build-log lines + wordmark masked
reveal + 1px progress bar. Max ~1.8s, click to skip.

## Architecture

```
src/portfolio/
  components/gl/InkCanvas.tsx        — reusable WebGL canvas (props: palette, speed, turbulence,
                                       interactive, paused). Mounts client-only; rAF loop pauses
                                       when offscreen (IntersectionObserver) or tab hidden.
  components/gl/inkShader.ts         — GLSL source + tiny program/uniform helpers (no deps).
  components/lab/LabSection.tsx      — slate + responsive exhibit grid.
  components/lab/ExhibitCard.tsx     — frame: demo slot + goal + tools chips.
  components/lab/exhibits/*.tsx      — InkStudy, SpringLab, Scramble, MagneticField, CodeCinema.
  components/ui/layout/SectionSlate.tsx — film-slate section header.
  components/ui/navigation/CommandPalette.tsx + hooks/useCommandPalette.ts
  components/skills/TechFilmStrip.tsx — scroll-velocity marquee.
  components/ui/effects/TiltCard.tsx  — pointer-tracked perspective tilt wrapper (springs).
```

Data layer (`PortfolioDataContext`, DB server fns, i18n instance, theme system) is untouched.
All new copy goes through `t()` with inline English fallbacks **and** keys added to
`locales/{en,es,dk}/translation.json`. `navigation.ts` gains `lab`.

## Guardrails

- **Zero new runtime dependencies.** Framer Motion (already present) + raw WebGL + CSS only.
- **Performance:** shader ≤ 1 canvas at a time at full res (hero); Lab instances render at
  reduced resolution; all rAF loops stop offscreen; below-fold sections stay lazy;
  `LazyMotion` strict mode preserved (keep to `m.*`).
- **Reduced motion:** `useReducedMotion` gates shader animation (renders one static frame),
  marquee (static row), tilt (disabled), preloader (instant).
- **A11y:** palette is a focus-trapped dialog; exhibits keyboard-operable (native inputs/buttons);
  slates use real heading levels; skip-link, scroll-spy, dot nav preserved.
- **Honesty:** no invented projects, metrics, or testimonials. Lab exhibits are real, working
  artifacts; `Tools:` lines list only tools actually used (React, TypeScript, Framer Motion,
  WebGL/GLSL, Claude Code).

## Verification

`pnpm lint` + `pnpm type-check` + `pnpm test` + `pnpm build`, then visual pass via local
preview (light/dark × desktop/mobile screenshots) before commit.
