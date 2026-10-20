# 12. Visual-development plan (next milestone)

Prepared with `agent-skills:frontend-ui-engineering` (design contract, anti-"AI aesthetic" table, responsive and accessibility gates). **Plan only: no site code was changed for this document.** Evidence: fresh Chromium screenshots at 320, 768, 1024 and 1440 px, plus code checks.

## Premise

The homepage's weaknesses are still **missing authentic photography, missing logo and placeholder content**. This plan does not paper over them with decoration (no parallax, glass, glow, heavier gradients, extra textures or animation libraries). It improves what can be improved honestly now: typography, layout, booking hierarchy, menu readability and mobile behaviour. It keeps the working components (`Photo`, `SiteHeader`, `ToastWidget`, `Base`, the booking flow) and changes them only where an observed problem justifies it.

## Design contract (per the skill)

| | |
|---|---|
| **Screen job** | Make a first-time visitor on a phone want to eat or stay here, and book a table in two taps |
| **Primary action** | "Book a table" (one visual treatment everywhere: brass pill on dark, forest pill on light) |
| **Secondary actions** | Call (verified number), directions, room enquiry |
| **Required states** | Real-photo and placeholder (both exist), booking steps 1–4, empty slots ("no tables that day"), no-JS fallback, reduced motion |
| **Responsive rules** | Design at 320 first; verify at 320 / 768 / 1024 / 1440; tap targets ≥ 44 px; no horizontal scroll |
| **Reject** | Equal three-card grids as the main layout, decorative effects standing in for photos, placeholder "meta" text competing with real hierarchy, sub-13 px labels, one-off spacing values |
| **References** | None supplied. GPT to provide 2–3 reference pages (structure and hierarchy only; nothing copied). Assumption until then: editorial gastropub, text-led, photography-forward |

## What the review found

| # | Evidence | Where |
|---|---|---|
| 1 | Header "Book a table" **wraps to two lines (122 × 56 px)** at 320 px; the primary action looks cramped | `SiteHeader` / `.btn--sm` |
| 2 | The hero "photo pending" box reads like a **broken image** on mobile (caption fades out at ~150 px) and pushes copy down | `index.astro` hero, `.hero__ph` |
| 3 | Eyebrow and facts strip **wrap awkwardly** at 320 px ("· SHEPSHED", orphan "STABLES") | `.eyebrow`, `.strip` |
| 4 | Visible **"Placeholder…" paragraphs** sit in the main reading flow at the same weight as real copy, so the page reads as a wireframe | welcome, story, stay, events |
| 5 | **Three equal food cards**: the stock-grid pattern the skill warns about; no lead item | Eat section |
| 6 | **5 labels under 13 px** (0.56–0.72 rem); **32 distinct spacing literals**; **4 inline styles** in `book.astro` | `global.css`, `book.astro` |
| 7 | Welcome lede (28ch) vs body (62ch) produce inconsistent measure at 768 | `.lede--xl` |
| 8 | Menu preview is a skeleton of grey bars: not readable, not accessible content | Eat section |

## Tasks, in order

Each task: invoke `frontend-ui-engineering`, build small, then verify with `verification-before-completion` (build, tests, axe, 4-width screenshots, keyboard run) before reporting.

| ID | Task | Depends on assets? | Size |
|---|---|---|---|
| **V1** | **Mobile header and hero.** Header button on one line at 320 (shorter label or padding; keep "Book a table"). Until a real photo exists, show a text-first hero on small screens, with no "photo pending" box above the fold. The photo slot stays wired for the real image. Add "Prefer to call?" under the hero form (verified number). | No | Small |
| **V2** | **Tokens, not decoration.** Type scale (`--step-*`), spacing scale (`--space-*`), minimum label size 13 px, consistent measure. Apply only to rules touched by V1/V3/V5, not a rewrite. Replace the 4 inline styles with a `.btn--ghost-dark` modifier. | No | Small |
| **V3** | **Editorial composition.** Replace the three equal cards with a lead block (large "Lunch & evening" slot) plus two supporting items; tighten the welcome section; one consistent, quiet `.note` style for placeholder copy so real hierarchy leads; facts strip as a 2-column grid on narrow screens. | No (slots only) | Medium |
| **V4** | **Booking hierarchy.** One CTA treatment site-wide; confirm hero form is above the fold at 320/390; closing CTA includes call and directions. No sticky mobile bar (the header is already sticky). | No | Small |
| **V5** | **Readable, accessible menus.** `Menu` component: `<section>` + `<h3>` per section, `<ul>` of dishes (name, description, price as text), single column on mobile and two from 52 rem, jump links between menus, a visible "subject to restaurant confirmation" note, no allergen data unless staff supplied it. | **Yes**: needs the menu PDFs | Medium |
| **V6** | **Authentic brand presentation.** `Logo` slot that takes the supplied SVG (placeholder wordmark until then); per-slot crop rules and `object-position` for the real photos; real `alt` text; a single subtle scrim only where text overlays a photo. | **Yes**: logo, A1–A3 | Medium |
| **V7** | **Mobile polish pass.** 320/390 walkthrough of every section; tap targets; form ergonomics (`inputmode`, native date picker); safe-area padding. | No | Small |

## Hand-offs

- **GPT:** supplies references, final copy (replaces all placeholders) and design review after V1–V4. Claude sends screenshots at 390, 820 and 1440 px plus a list of open placeholders.
- **Review agents:** one `code-reviewer` pass after V4 (before anything leaves the machine), and `web-performance-auditor` once real photographs are in. No agent for layout decisions: they need this conversation's context.

## Acceptance (every task)

axe-core 0 violations at all four widths on `/` and `/book`; no horizontal overflow; no console errors; keyboard-only booking journey passes; Lighthouse accessibility and best-practice 100 and performance ≥ 95 on mobile; `noindex` and the unofficial banner intact; screenshots reviewed against the contract above.

## Cross-browser risk notes (analysis, not test results)

Firefox and WebKit could not be installed (network policy), so none of this has been tested in them. Features to check in Safari/Firefox once available: `text-wrap: balance|pretty` (degrades to normal wrapping), `clip-path` reveal transition, native `<input type="date">` rendering and keyboard behaviour (differs most by browser), `:focus-visible` ring on the hidden chip radios, `min()`/`clamp()` sizing, `scroll-padding-top` with the sticky header. All are designed to degrade gracefully, but that is an expectation, not evidence.

---

## V1 status: implemented 20 Oct 2026 (awaiting visual review; V2 not started)

Skills used: `agent-skills:frontend-ui-engineering`, `superpowers:verification-before-completion`. Design references (thepighotel.com, thebullcharlbury.com, blackhorsebeamish.co.uk) could **not** be fetched from the sandbox (DNS blocked), so they were not studied; V1 follows the design contract above.

| Item | Done |
|---|---|
| Header CTA | One line at 320 px, 44 px tall, no overlap (was 2 lines, 122 × 56) |
| Hero | Text-first: approved eyebrow, headline (one sentence per line), description, **Book a Table** / **Explore Our Menus**; ivory "Find a table" card (right on desktop, below the CTAs on mobile) with verified phone number. The photo slot is wired (`hero.jpg`) and hidden until a real photo exists |
| Secondary CTA | New `/menus/` page linking the two official PDFs (URLs supplied by GPT), with a booking CTA |
| Wireframe language | Removed from the layout: menu skeleton, "Placeholder…" paragraphs, "to be confirmed" pills, the AA Rosette line (unverified). Unofficial notice kept in the banner and footer |
| Copy | Approved prototype copy applied to hero, food, pub, stay and closing sections (see `content-register.md`) |
| Tokens | `--space-1…9` and `--step-label` introduced and used by all new rules; the rest of the stylesheet migrates in V2 |

Issues found by inspecting the rendered result (not by the tests) and fixed: headline split mid-sentence at 768; facts strip wrapping unevenly; unequal closing buttons; italic address; oversized gap on `/menus/`.

Known weaknesses remaining: the hero is flat forest green with no imagery; two adjacent booking actions on desktop (CTA and card); sentence-case card heading vs title-case buttons; visible "Photo pending" labels still 10.4 px (V2); `/menus/` is only two PDF links until V5; hero card date input shows US format in headless Chromium (browser locale); Firefox/WebKit untested.
