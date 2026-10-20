# CLAUDE.md – The Horse, Shepshed (independent website concept)

## Objective
An **independent, unofficial, self-funded proof of concept**: a redesigned website for The Horse, Shepshed (196 Ashby Road West, Shepshed, LE12 9EF), built to win the venue as a first website client.
**Primary commercial goal: more restaurant reservations.** Make booking obvious and frictionless; everything else supports that.

## Design direction
Modern British gastropub: warm, refined, homely, approachable. Not luxury fine dining. Editorial, natural palette (ivory, forest, clay, brass, charcoal – tokens at the top of `src/styles/global.css`), serif headings (Fraunces) with highly legible body text (Hanken Grotesk). Restrained, purposeful motion; nothing that distracts from booking. **Primary aesthetic benchmark: The Bull Charlbury (thebullcharlbury.com)**; study its principles, never copy its artwork, layout or branding (the site is not reachable from the sandbox, so screenshots are needed). **The current prototype is not visually approved**; the next priority is visual redesign and genuine asset integration, not new functionality.

## Brand and imagery
- **Preserve the venue's existing logo.** Until an authentic, usable logo file is supplied, keep the text wordmark placeholder. Never redraw or invent a logo.
- **Use authentic venue imagery only.** No AI-generated images, no stock or unrelated photography, ever. Where no real photo exists, use the labelled placeholder (`Photo.astro`).
- Real files go in `src/assets/venue/` (git-ignored until the owners grant permission); `Photo.astro` picks them up via `asset="file.jpg"`. Originals and downloads live in `assets-src/` (git-ignored). Write real `alt` text for every image.
- Do not reuse text baked into venue banners as the new site's design language.
- Record every asset's URL, date and intended use in `docs/02-asset-manifest.md`.

## Roles
- **GPT** owns creative direction, brand positioning, UX/design review, commercial proposition and **final copy**. All copy in the repo is temporary placeholder text until GPT supplies it.
- **Claude** owns technical implementation, architecture, components, asset integration, testing, browser QA and deployment *preparation*.

## Stack and reservations
- **Astro (static output) remains the framework.** No database, backend, CMS, UI framework or new dependency without a documented need and approval.
- **Toast is the intended reservations provider, subject to integration confirmation.** Architecture: Astro site → Toast Tables widget or hosted link → Toast-managed reservations. **Do not build a reservation backend or database.** The widget snippet comes only from the venue's own Toast account (`src/components/ToastWidget.astro` is the empty slot); never invent one. Until then, `/book` is a clearly labelled **demonstration** with fictional availability that sends and stores nothing.
- Menu source of truth is undecided (Toast API vs a maintained file). Don't build a menu-management backend yet.
- **Repository and hosting:** GitHub `Kenway-Creative/Kenway-Creations` (must be private); Cloudflare Pages, static only (no Workers, Functions or databases); build `npm run build`, output `dist`, Node `>=22.22.0` (`.node-version`). `main` is the baseline; work on `feature/<topic>` branches and merge by pull request when practical. Secure sequence and Access tests: `docs/13-github-and-cloudflare-runbook.md`.

## Hard guardrails (standing instructions from the project owner)
1. **Unofficial and private.** Every page keeps `noindex` and the "Unofficial concept – not commissioned, approved or endorsed by The Horse" banner. Never imply the owners have approved anything. Never publish an official-looking replacement site.
2. **Never alter the live restaurant website** without authorisation; it is only ever read in public, never modified. **Do not incur paid expenses** (hosting, subscriptions, services) without approval. **Remote pushes are authorised only to `Kenway-Creative/Kenway-Creations`, and only after its visibility is verified as PRIVATE** (never force-push; never push to any other remote). **Deploying is authorised only to the Cloudflare Pages project described in `docs/13-github-and-cloudflare-runbook.md`, and only after Cloudflare Access is verified on both the main `pages.dev` hostname and all preview hostnames.** Never connect the live Horse domain. Never print or store tokens.
3. **No invented facts.** Don't make up dishes, prices, opening hours, awards, testimonials, room rates, amenities, events, policies or capacity. Menu content derived from published menus must be marked **"subject to restaurant confirmation"**. Allergen/dietary data only if entered or verified by staff. Log claims in `docs/content-register.md`.
4. **No money talk.** No day rates, development charges, quotes or invoices in any doc or owner-facing material. `docs/06-costs.md` covers infrastructure running costs only.
5. **Permission before external use.** Venue assets are for the private local build only until the owners agree in writing. Respect that the sandbox may block the venue's host: do not work around network restrictions; ask for local copies instead.
6. **No real customer data, emails or payments** in the demo.
7. Don't install, enable or download tools without approval. No secrets in Git (`.env` is ignored; only `PUBLIC_` variables reach the browser).

## Skills requirement
Before each substantive development task:
1. Identify the applicable installed skills (see `docs/10-skills-and-tooling-audit.md`).
2. Read and invoke them through the Skill tool (a file on disk is not an active skill).
3. Apply their actual guidance, not just their names.
4. Don't invoke redundant skills with overlapping purposes (the audit lists the overlaps).
5. Report which skills were used and how they changed the implementation.

Default pair: **`agent-skills:frontend-ui-engineering`** for visual development and **`superpowers:verification-before-completion`** for technical validation (no completion claim without a fresh command run and its output). Use specialist review agents (`code-reviewer`, `security-auditor`, `web-performance-auditor`, `test-engineer`) when their expertise is relevant, e.g. a review before anything leaves the machine or a security look at the Toast widget/CSP plan.

## Engineering standards
- Mobile-first, semantic HTML, WCAG 2.2 AA, visible focus, keyboard operable, `prefers-reduced-motion` respected, UK English.
- Quality bar before calling anything ready: axe-core clean, Lighthouse accessibility/best-practice 100 and strong performance (LCP < 2.5 s, CLS < 0.1 on mobile), keyboard walkthrough, 320 px reflow. Current QA: `docs/11-qa-report.md` (Chromium only; Firefox/WebKit downloads are blocked by the sandbox network policy).
- Animation: CSS plus the existing `IntersectionObserver`; no GSAP unless a clear benefit is shown.
- Verify before claiming done: run the build and tests and look at the result (screenshots at 390, 820 and 1440 px).

## Commands
```
npm run dev     # http://localhost:4321
npm run build   # static output in dist/
npm test        # demo-availability unit tests
```
Browser QA uses the pre-installed Chromium (`/opt/pw-browsers/chromium-1194`) with Playwright. Firefox/WebKit installs were approved but are blocked by the network policy (hosts `cdn.playwright.dev`, `playwright.download.prss.microsoft.com`); keep any browser downloads and test tooling outside the tracked project (scratchpad), not in `package.json`.

## Documents
Project docs are in `docs/` (audit, asset manifest, Toast approach, architecture, sitemap, costs, access list, content register, preview plan, tooling audit, QA report, `12-visual-development-plan.md` for the next design tasks, `13-github-and-cloudflare-runbook.md` for repository, hosting and Access protection). Owner-facing proposals or documents use **Access branding** (Access Red `#E5173F`, Teal `#54B9B3`, Purple `#4B112C`; Open Sans). The website itself uses the venue's palette, not Access branding.
