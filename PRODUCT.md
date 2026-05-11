# Product

## Register
brand

## Users
Prospective clients and employers evaluating Eduardo Inerarte as a software engineer for hire. They arrive from referrals, LinkedIn, or word of mouth. They are design-literate and experienced: they compare against other strong practitioners, not average resumes. They scan quickly in a professional context.

## Product Purpose
A personal portfolio that communicates Eduardo's craft, seniority, and personality through the quality of the work itself. Success is a visitor who books a call or sends a message — not one who skims a feature list.

## Brand Personality
**Precise · Quiet · Confident.** References: Linear's documentation discipline, Paco Tuffarello's typographic austerity, Adam Morse's type-as-image approach. The voice is measured, never boastful. The design does the talking.

## Physical Scene
A design-literate hiring manager or prospective client opens this link on a laptop at their desk — medium ambient light, focused, comparing it against two other portfolios in adjacent tabs. They have 90 seconds. They're pattern-matching for "does this person think clearly?" Speed and signal density matter. No gimmicks, no loading surprise. The typography and layout answer before the words do.

## Color Strategy
**Restrained** — tinted neutrals + one accent used sparingly as punctuation (≤8% surface). OKLCH throughout. Brand hue direction: cool slate (hue ~250–270°). No palette drama. Silence is the aesthetic.

Light mode default. Dark mode available via toggle. Both modes must feel considered, not inverted.

## Typography Direction
Three brand-voice words: **dense · archival · unassuming**.

Fonts in use (existing): Epilogue (sans, body/UI), Cinzel (serif display, wordmark/accent), JetBrains Mono (code blocks). These are existing brand assets — NOT subject to the reflex-reject rule for new decisions. Cinzel + Epilogue is the committed pairing.

New typographic decisions must not introduce a third family. Weight and size contrast within Epilogue is sufficient for hierarchy in all non-display contexts.

## Saturated Aesthetic Lanes to Avoid
The design must not land in:
- **Editorial-typographic** (display serif italic + mono labels + ruled columns) — already saturated in 2026 portfolios. The existing Cinzel usage is display-as-wordmark only, not editorial layout.
- **Neon-on-dark developer aesthetic** — anti-reference confirmed.
- **SaaS metrics dashboard** — hero-metric cards, gradient stat blobs are banned.

Second-order check: a visitor who has seen 20 portfolios this week should NOT be able to predict the aesthetic from "senior frontend engineer portfolio" alone. The surface should surprise with its restraint and precision.

## Anti-references
- Generic React/Bootstrap portfolio with Lottie animations and icon cards
- Neon-on-black "hacker" aesthetics
- SaaS landing pages with gradient blobs and hero-metric cards
- Over-animated particle backgrounds or 3D gimmicks
- Busy nav bars with every social icon duplicated in every section
- Editorial-typographic layout (italic serifs + ruled columns + editorial magazine grid)

## Design Principles
1. **Let the work speak.** Every decorative element must earn its place; remove anything that competes with the content.
2. **Precision over personality.** Quiet confidence — no boastful copy, no flashy effects. The craft signals competence.
3. **One decisive move per section.** One strong typographic choice, one layout risk. Don't dilute.
4. **Restraint is voice.** Whitespace, weight contrast, and tight tracking are the aesthetic. Color is used sparingly, as punctuation.
5. **Colophon principle.** The footer closes the page like the last line in a well-edited essay: complete, spare, intentional.

## Motion Strategy
Minimal. One orchestrated entrance per section (staggered fadeInView). No scattered micro-animations. Hover states: subtle scale on interactive elements (1.03), no bouncing. Exit = 75% of entrance duration. APPLE_EASE `(0.16, 1, 0.3, 1)` throughout.

`prefers-reduced-motion` respected: all animations collapse to instant opacity transitions.

## Absolute Bans (confirmed for this project)
- Side-stripe borders on any card or callout
- Gradient text anywhere
- Glassmorphism or blur cards
- Hero-metric template (big number + gradient accent)
- Identical icon+heading+text card grids
- Bounce or elastic easing
- em dashes in copy

## Accessibility & Inclusion
WCAG AA minimum. Support prefers-reduced-motion. Sufficient contrast in both light and dark modes. Focus rings visible on all interactive elements. Decorative icons aria-hidden. Interactive icon-only controls have aria-label.
