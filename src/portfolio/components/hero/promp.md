```txt
================================================================================
V11 MASTER ENGINEERING PROMPT — OBVIOUS STAFF ENGINEER POSITIONING
================================================================================

You are a world-class Product Designer, Creative Director, UX Architect, Accessibility Specialist, and Elite Frontend Systems Engineer working on a React/TypeScript portfolio website.

Your goal is to transition this website into a premium, credible, highly accessible, and ultra-scannable "Executive Landing Page" for an Obvious Staff Frontend Engineer & Technical Leader.

The site is built with React, TypeScript, and Vite. Component files are located in `/src/portfolio` and routes in `/src/routes`. The styling leverages standard CSS in combination with modern Tailwind.

================================================================================
GLOBAL VISUAL & EXPERIENTIAL DIRECTION
================================================================================
- TONE: Calm, mature, highly engineered, editorial, and deeply trustworthy.
- AESTHETIC STYLE: Obsidian glass, premium dark mode, rich dark-gray grids, restrained micro-animations, and spacious layouts (Vercel, Linear, Stripe, Apple, Railway).
- CONTENT RATIO: Curated, high-hierarchy, outcomes-first, and 100% human-credible.
- AVOID: Distracting animation spam, generic developer templates, massive duplicated logos, robotic AI buzzwords ("genesis", "leverage", "holistic"), and excessive uppercase labeling ("CAPABILITY_01", "OUTCOME_01").

================================================================================
CORE TECHNICAL & UX/UI OBJECTIVES (THE SUGGESTIONS AUDIT)
================================================================================

1. CREDIBILITY & PROOF POINTS
   - Replace or back up arbitrary claim labels (like "[VERIFIED]") with concrete proof. Shift claim terminology from raw self-assertion to "Measured/Reported" outcomes.
   - For every major metric, provide a clean "proof link" placeholder linking to public code commits, live monitoring setups, repository structures, or a dedicated `/proof` subpage.

2. HUMAN COPYWRITING & SCAN-PATTERNS
   - Write copy focused on benefits-first (to address Engineering Managers and CTOs). Use short, punchy sentences.
   - Remove repetitive technical lists in favor of meaningful, high-level business value summaries.
   - Adhere strictly to proper English grammar rules: use the Oxford Comma in lists of three or more, and hyphenate compound modifiers preceding nouns (e.g., "high-traffic consumer applications", "real-time dashboard streams").

3. DESIGN SYSTEM & SECTION CONSISTENCY
   - Define a simple design system consisting of lightweight spacing tokens, clear layout guidelines, and standardized borders.
   - Create 1 or 2 unified, reusable `<Section>` and `<Container>` components with predictable grids (Desktop: 2 columns, Mobile: 1 column). Ensure spacing and widths remain perfectly consistent.

4. SEAMLESS ACCESSIBILITY (a11y)
   - Implement a visible-on-focus "skip to content" link at the top of the page.
   - Enforce a strict semantic heading hierarchy (exactly one H1 in the hero, H2s for section titles, H3s for component titles).
   - Use high-contrast focus states (`focus-visible:ring-2`), distinguishable links, and explicit ARIA labels on all interactive triggers (e.g., replace vague labels with descriptive strings like "Jump to Experience section" or "Open Schilling Architecture Modal").

5. CLEAN PRODUCTION RENDERING (NO DEVTOOLS IN LIVE BUILD)
   - Ensure all dev tools (e.g., TanStack DevTools, local dashboard test buttons) are rendered strictly in development builds. Conditionally hide them using `import.meta.env.DEV` or `process.env.NODE_ENV === 'development'`.

6. CONTACT ROBUSTNESS & COMPLIANCE
   - Ensure the contact form supports full visual states: sending (loading), sent (success), and error alerts.
   - Implement accessible form validation, a invisible honeypot field, and a legal notice detailing data preservation (e.g., "We only use your email to respond to your direct inquiry").

7. ENTERPRISE SEO & DISCOVERABILITY
   - Inject complete meta tags, OpenGraph (og) headers, and Twitter cards targeting keywords for "Staff Frontend Engineer" and "Frontend Architect".
   - Include a valid JSON-LD structure of type "Person" and "WebSite" along with robots.txt and sitemap.xml.

================================================================================
STEP-BY-STEP SECTION CHECKLIST
================================================================================

--------------------------------------------------------------------------------
1. META / ARCHITECTURE
--------------------------------------------------------------------------------
- Define lightweight design system tokens (spacing, typography scale, borders) and unify layouts under reusable Section/Container wrappers.
- Implement a rigid semantic heading structure (H1, H2, H3) and custom typography helpers.
- Hide developer tools in production: `if (!import.meta.env.DEV) return null;`.

--------------------------------------------------------------------------------
2. NAVIGATION (StickyNav + DotNavigation)
--------------------------------------------------------------------------------
- Add a "skip to content" link at the top of the page targeting `<main id="content">`.
- Synchronize active states using `IntersectionObserver` to highlight navigation dots and header links.
- Use explicit, accessible names on all dot links (e.g., `aria-label="Jump to Experience section"`).
- Maintain consistent anchors: `#about`, `#projects`, `#authority`, `#experience`, `#contact`.

--------------------------------------------------------------------------------
3. HERO SECTION
--------------------------------------------------------------------------------
- Clean up Hero copy: keep it short and present 2-3 immediate, outcome-focused highlights.
- Keep CTA buttons clear: "View Work" (Primary) and "Download CV" (Secondary).
- Integrate an active `AvailabilityCard` highlighting:
  * Availability status: Q3 2026 Engagement
  * Geography: Copenhagen, Denmark
  * Modes: EU Remote-Friendly / Hybrid (GMT+2/1)

--------------------------------------------------------------------------------
4. BUSINESS OUTCOMES (Stats Section)
--------------------------------------------------------------------------------
- Standardize the 4 stats cards: display `title` (e.g., "Payload Reduction"), `metric`, `what changed` (technical action), and `what it improved` (business outcome).
- Strip out repetitive labels like "Outcome 01".
- Add an optional "proof link" per card to link to a `/proof` page or public repo.

--------------------------------------------------------------------------------
5. ABOUT / CAPABILITIES ("Technical Expertise")
--------------------------------------------------------------------------------
- Remove tags like "CAPABILITY_01" and use elegant labels like "Capability 01" or "Capability A".
- Standardize 4 capability cards:
  1. **Architecture & Governance:** Monorepo boundaries, Design Systems, SaaS Decoupling.
  2. **Performance Engineering:** Interaction latency, optimistic rendering, Core Web Vitals.
  3. **Technical Leadership:** Developer experience, Mentorship, automated CI/CD gates.
  4. **Product Systems Integration:** Domain modeling, Stakeholders coordination, cache contracts.
- Limit card content to: 1 clear "Value Proof" sentence + 3 bullet points (max 7-9 words per bullet).

--------------------------------------------------------------------------------
6. PRODUCT STORIES (Flagship Case Studies)
--------------------------------------------------------------------------------
- Present the 3 flagship stories with clear headings (Product name + 1-line context).
- Restructure the view tabs: "View Interface" and "View System Architecture" should trigger a modal displaying high-fidelity captures and SVG system topologies.
- Reformat the "METRICS_BENCHMARK::OUTCOMES" sub-panel: display a concise list/table showing 3-4 metrics maximum with a subtitle "What we changed / Why it mattered".
- Extract architectural tradeoffs into a single, clean, reusable `<TradeoffLedger>` component. Remove duplicated visual boxes.

--------------------------------------------------------------------------------
7. ADDITIONAL PROJECTS (List View)
--------------------------------------------------------------------------------
- Keep interactive filters: "All", "Frontend", "Full-Stack".
- Ensure the table and lists use accessible ARIA roles, have distinguishable grid systems, and render responsively on mobile.
- Normalize terms in the "Architectural Vector" column (e.g., standardizing on "Systems Integration", "Frontend Architecture", "Platform Decoupling").

--------------------------------------------------------------------------------
8. AUTHORITY (Leadership & Philosophy)
--------------------------------------------------------------------------------
- Present "Lessons From 18 Years" as an ordered list (`<ol>`) using standard typography instead of large hardcoded labels.
- For "How I Work", format each block clearly as: `Strategy → Action → Outcome`.

--------------------------------------------------------------------------------
9. PROFESSIONAL EXPERIENCE
--------------------------------------------------------------------------------
- Standardize all 3 era blocks: display company name, date range, leadership role, stack context (1 concise line), contributions (3 active bullets), and business outcomes (2 metric-backed bullets).
- Include optional lazy-loaded company logos with descriptive `alt` texts.

--------------------------------------------------------------------------------
10. TESTIMONIALS ("What Clients Say")
--------------------------------------------------------------------------------
- Implement a `TestimonialsSection` containing 2-3 reviews max.
- Include: quote, author name, official title, length of working relationship, and company context.
- Support auto-rotation with "pause on hover".

--------------------------------------------------------------------------------
11. CONTACT & OUTREACH
--------------------------------------------------------------------------------
- Ensure the direct email link has the correct attributes (`rel="noopener noreferrer"`).
- Support full state handling in the contact form (sending, successfully sent, error).
- Implement inline accessible validation messages.
- Protect the form with an invisible honeypot field and basic rate-limiting.
- Add a minimal data compliance notice regarding how emails are handled.

--------------------------------------------------------------------------------
12. SEO + DOCUMENT DATA
--------------------------------------------------------------------------------
- Set complete meta tags, OG headers, Twitter cards, and canonical links.
- Embed a JSON-LD structured schema containing "Person" and "WebSite" properties.
- Serve a clean robots.txt and sitemap.xml.

--------------------------------------------------------------------------------
13. FINAL POLISH & RESPONSIVENESS
--------------------------------------------------------------------------------
- Clean up excessive uppercase text, enforce generous vertical margins, and align margins to a grid.
- Guarantee a 100% responsive layout on mobile (zero overflow, robust table column scaling, and touch target sizes of at least 44px).
================================================================================
```
