# 10. Skills, agents, MCP and tooling audit

Audit date 20 Oct 2026. **Read-only**: nothing was installed, enabled, downloaded or changed, and the website was not touched. No credentials were read or are shown here (settings files were inspected for key names only).

> Numbering note: the QA report was renamed to `11-qa-report.md` (approved), so this audit keeps `10-`.

## How availability was established

"Invocable" is taken from what this session actually lists as callable (Skill tool listing, `ListSkills`, `ListPlugins`, `ListConnectors`, the Agent tool's agent types, and the tool list), **not** from files on disk. "Verified" means I ran it in this project. Skills marked *listed* are invocable but **I have not yet invoked them**; no skill has been used on this project so far (a process gap: earlier turns proceeded straight to implementation).

| Status | Meaning |
|---|---|
| **Verified** | Used successfully in this project |
| **Listed** | Callable per the session, not yet exercised |
| **Present, not usable here** | Skill/tool exists but its prerequisite is absent |
| **Not installed** | Absent from this environment |

## Summary table

| Skill / Tool | Source | Available? | Relevant capability | Recommended use | Priority |
|---|---|---|---|---|---|
| Playwright + Chromium 1194 | Global npm + `/opt/pw-browsers` | **Verified** (Chromium only) | Screenshots, mobile emulation, journey scripts, keyboard tests | The QA and screenshot harness; capture three breakpoints for GPT's design review | **High** |
| axe-core + Lighthouse 13.5.0 | Installed earlier in the session scratchpad (outside the project; npm registry is reachable) | **Verified** | WCAG 2.2 AA and CWV measurement | Re-run after every visual change | **High** |
| Astro `<Image>` / `getImage` + `sharp` 0.35.5 | Astro 7.4.1; sharp already in `node_modules` | **Verified present** (not yet used) | AVIF/WebP, responsive `srcset`, explicit dimensions | The asset pipeline; no new dependency needed | **High** |
| ImageMagick `convert`, Pillow 12.3, `pdftotext`/`pdftoppm`, `ffmpeg` | System | **Verified present** | Inspect image size/quality, extract menu PDFs, record or convert preview clips | Asset review and menu-content extraction | **High** |
| `agent-skills:frontend-ui-engineering` | agent-skills 0.6.12 | **Listed** | Accessible, responsive production UI, per its description | Guide the homepage polish; invoke at the start of the visual milestone | **High** |
| `superpowers:verification-before-completion` | superpowers 6.4.2 | **Listed** | Evidence before claiming done | Gate every "ready for owners" claim | **High** |
| `agent-skills:web-performance-auditor` (agent) + `agent-skills:webperf` | agent-skills | **Listed** | Core Web Vitals, structural performance review | One audit once real photography is in | Medium |
| `agent-skills:code-reviewer` / `security-auditor` / `test-engineer` (agents) | agent-skills | **Listed** | Fresh-context review, security, test design | Review before any private deployment; security review for the Toast widget/CSP plan | Medium |
| `agent-skills:security-and-hardening` | agent-skills | **Listed** | CSP, third-party script risks | Toast widget integration prep | Medium |
| `agent-skills:source-driven-development` | agent-skills | **Listed** | Grounds decisions in official docs | Toast widget details (but needs access to Toast's docs) | Medium |
| `superpowers:brainstorming`, `agent-skills:spec` / `plan` | superpowers / agent-skills | **Listed** | Design exploration, specs, task breakdown | Use lightly: direction already exists from GPT | Low |
| `ponytail` (mode active: full) | ponytail 5.3.2 | **Verified active** | Smallest-change discipline | Keep for infrastructure; **drop to `lite` for visual polish**, since "least code" can under-invest in craft | Medium |
| Canva connector | claude.ai connector | **Connected**, tools not yet exercised | Designs, brand kits, exports | Owner-facing pitch deck/one-pager. **Never** `generate-image` for venue imagery | Low |
| Claude Docs MCP; `docs`, `pdf`, `docx`, `pptx` skills | claude.ai | **Listed** | Documents/decks | Owner-facing summary. User preference: Access branding for proposals | Low |
| `Artifact` tool | Built in | Available | Hosted private pages | **Not for this site**: pages using the venue's name/branding fall under its no-impersonation rule | Avoid |
| `gh` CLI | `/usr/local/bin/gh`, proxy-configured | Present, **auth not tested** | PRs/remote | Not needed; no remote pushes without your instruction | Parked |
| `claude-code-remote` MCP | Built in | Available | Sessions, repo attach, triggers | Not needed for this milestone | Parked |
| Global `prettier`, `eslint`, `typescript` | Global npm | **Verified present** | Formatting/lint/types | Use prettier via `npx`/global for formatting; no project install | Low |
| Built-in browser / Claude-in-Chrome / computer-use | claude.ai skills | **Present, not usable here** | Real-browser testing | Their tools (`mcp__Claude_Browser__*`, `mcp__claude-in-chrome__*`) are not in this cloud session; they need the desktop app or a linked computer | n/a |
| `agent-skills:browser-testing-with-devtools` | agent-skills | **Present, not usable here** | DevTools-based browser testing | Needs a Chrome DevTools MCP server, which is **not configured**. Playwright covers the need | n/a |
| Shopify, Indeed, Docusign connectors | claude.ai | Connected | Unrelated to this project | **Don't use.** Docusign could matter much later for agreements (not now) | n/a |
| Booking.com, Microsoft 365, Spotify, Courtroom5 | claude.ai | Not connected | – | Irrelevant | n/a |
| Supabase | – | **Not installed** (not in connectors or tools) | – | Not needed (no database by design) | n/a |
| Hosting/deploy connectors (Vercel, Netlify, Cloudflare, etc.) | Registry lists them | **Not installed** | – | Not needed; local preview first (see `09-private-preview-plan.md`) | n/a |
| Figma connector | Registry | **Not installed** | Design context | Only if GPT or the owners supply Figma frames | n/a |
| Firefox / WebKit browsers | – | **Not installed** | Cross-browser testing | **Gap** (see below) | – |
| Ace of Raves skills/notes | – | **Not found** | – | No trace in `~/.claude`, `/home/claude/.claude`, `/home` or plugin dirs. Lessons must be pasted in | – |

## 1. Skills

- **Local plugins (3):** `superpowers` 6.4.2 (15 skills), `agent-skills` 0.6.12 (25 skills, 4 agents, 9 slash commands), `ponytail` 5.3.2 (6 skills/commands). All listed as invocable.
- **claude.ai account skills (14):** docs, google-workspace, computer-use, chrome-browser, built-in-browser, deep-research, import-memory, morning, skill-creator, xlsx, pptx, pdf, docx. `ListPlugins` returns none at account level.
- **Built-in:** code-review, simplify, security-review, init, run, loop, claude-api, update-config and others.
- **Project/user level:** no project `.claude/`, no `CLAUDE.md`, no user `agents/` or `commands/` directories. Only a `session-start-hook` skill and the synced plugin/skill copies exist under `~/.claude`.
- **Hooks:** one `Stop` hook in the launcher settings (git/reply checks). No tool-call hooks affect the site.
- **Not present:** a dedicated "frontend-design / distinctive aesthetics" skill; no skill specific to image processing, animation or hospitality UX. `artifact-design` is for Artifacts only.

## 2. Specialist agents (Agent tool)

| Need | Available agent | Notes |
|---|---|---|
| Frontend engineering | none dedicated (`general-purpose`, `claude`) | Do directly |
| UI/UX design, visual design review | **None** | By design this is GPT's role; I supply screenshots at set breakpoints |
| Technical architecture | `Plan` | Marginal: architecture is decided (`04-architecture.md`) |
| Code review | `agent-skills:code-reviewer`; built-in `code-review` skill | Fresh-context review is the real value |
| Accessibility testing | **None dedicated** | axe-core + keyboard script (done) is stronger than an agent opinion; `test-engineer` can design cases |
| Security review | `agent-skills:security-auditor`; built-in `security-review` | Worth one pass for the Toast widget/CSP and any preview hosting |
| QA / browser automation | `agent-skills:test-engineer`; Playwright directly | Do directly: scripts need my live project context |
| Performance | `agent-skills:web-performance-auditor` | Use after real images land |
| Documentation | none dedicated; `docs`/`docx`/`pdf` skills | Direct |
| Exploration | `Explore`, `claude-code-guide` | Rarely needed here |

**Use an agent when** you want an independent, cold-start second opinion (review, security, performance), or have genuinely parallel read-only work. **Do it directly when** the task needs this conversation's context: design iteration, asset integration, copy placement and anything that edits many files in sequence. Agents start cold and cost more; the `Workflow` fan-out tool needs your explicit opt-in and isn't warranted here.

## 3. MCP and integrations

| State | Items |
|---|---|
| **Available and working** | Canva (connected; tools not yet exercised), Claude Docs, Shopify, Docusign, Indeed (connected, unrelated), `claude-code-remote`, web search; WebFetch is **blocked for `thehorseshepshed.co.uk` and `support.toasttab.com`** (not tested against other hosts) |
| **Installed but not configured / not connected** | Booking.com, Microsoft 365 (incomplete connect), Spotify, Courtroom5 |
| **Configured but inaccessible** | The two hosts above (sandbox network policy). `gh` is present but not tested |
| **Not installed** | GitHub MCP, Playwright MCP, Chrome DevTools MCP, Supabase, Vercel, Netlify, Cloudflare, Figma, any image-processing MCP |

Resource listing returned nothing; no MCP servers expose resources. No secrets were opened.

## 4. Project tooling (`/home/user/horse-shepshed`)

| Area | State |
|---|---|
| Framework | Astro **7.4.1**, static output, no UI framework |
| Dependencies | `astro`, two `@fontsource-variable` fonts. Nothing else at runtime |
| Image optimisation | `sharp` 0.35.5 is installed (via Astro); **`<Image>` not used yet** (no real images) |
| Scripts | `dev`, `build`, `preview`, `check`, `test` (Node test runner, 4 tests on demo slots) |
| TypeScript | **No `tsconfig.json`**, `typescript`/`@astrojs/check` not installed, so `npm run check` would fail. Scripts in `.astro` files use TS syntax and compile through Vite |
| Lint/format | None configured in the project (prettier/eslint exist globally) |
| Components | `Photo`, `SiteHeader`, `ToastWidget`, `Base` layout; one global stylesheet with tokens (227 lines); two pages (~330 lines) |
| Git | Initialised, **no commits**, no remote |
| Browser/screenshot | Playwright + Chromium work (Chromium only), Lighthouse/axe (scratchpad install) |
| Not in project | CI, visual regression, CLAUDE.md |

## 5. Gaps worth closing (and only these)

| Gap | Impact | Proposed fix | Install needed? |
|---|---|---|---|
| Cross-browser (Firefox, Safari/WebKit) | Owners will use iPhones; Safari is untested | Ask whether Playwright's Firefox/WebKit builds may be downloaded, or test on a real iPhone | Yes, needs approval |
| Durable guardrails | Rules (no AI imagery, noindex, no pricing, no deploy/commit) live only in chat | A short project `CLAUDE.md` | No install; edit, needs approval |
| TypeScript/Astro check | `npm run check` unusable | Either add `typescript` + `@astrojs/check` (devDeps) or remove the script | Optional, low value now |
| Visual regression | Hard to see unintended design drift | Keep dated Playwright screenshots under `qa/` (no new dependency) | No |
| Real assets and menus | Biggest quality lever | The milestone below | No |
| Ace of Raves lessons | Not available here | Paste or summarise them if you want them applied | No |
| Distinctive-design guidance | Risk of a generic look | GPT's creative direction + screenshot review loop; not another skill | No |

**Deliberately not recommended:** GSAP or any animation library (CSS + Astro view transitions suffice), any hosting/deploy connector, Figma, Supabase, an image-processing MCP (sharp, ImageMagick and Pillow already cover it), and extra skill packs (the three existing plugins already overlap).

## 6. Overlaps and redundancy

| Capability | Overlapping skills | Use |
|---|---|---|
| TDD | `superpowers:test-driven-development`, `agent-skills:test-driven-development`, `agent-skills:test` | One (superpowers); little logic here to test-drive |
| Planning/spec | `agent-skills:spec`, `spec-driven-development`, `plan`, `planning-and-task-breakdown`, `superpowers:writing-plans` | Mostly unneeded; the plan exists |
| Code review | `code-review-and-quality`, `agent-skills:review`, `superpowers:requesting-code-review`, built-in `code-review`, `ponytail-review`, agent `code-reviewer` | The `code-reviewer` agent, once |
| Simplify | `code-simplify`, `code-simplification`, built-in `simplify` | Rarely |
| Debugging | `systematic-debugging`, `debugging-and-error-recovery` | Either |
| Shipping | `shipping-and-launch`, `ship` | Later, only when a private preview is approved |
| Docs | `documentation-and-adrs`, `docs` skill | `docs` for owner-facing material |
| Browser | `built-in-browser`, `chrome-browser`, `browser-testing-with-devtools`, `computer-use` | None apply in this cloud session; Playwright is the tool |
| Tone conflict | `ponytail` (minimal code) vs polish goals | Set `lite` during visual work |

## 7. Top five to use actively

1. **Playwright + Chromium** (with axe/Lighthouse from the scratchpad install): the QA and screenshot loop that feeds GPT's design review.
2. **Astro `<Image>` + sharp** (plus ImageMagick/`pdftotext` for inspection and menu extraction): turns recovered photos into responsive AVIF/WebP with no new dependency.
3. **`agent-skills:frontend-ui-engineering`**: guides the homepage polish; invoke it first.
4. **`superpowers:verification-before-completion`**: no "owner-ready" claim without evidence.
5. **`agent-skills:code-reviewer` agent (plus `security-auditor` for the Toast widget plan)**: one independent review before anything leaves the machine.

## 8. Division of responsibility

| GPT | Claude |
|---|---|
| Content strategy, copy, tone, creative direction, brand positioning, design critique, commercial proposition | Implementation, architecture, components, asset integration, testing, browser QA, deployment preparation (never executing it without approval) |

Hand-offs: Claude sends screenshots (mobile 390, tablet 820, desktop 1440) and a list of placeholders; GPT returns copy and design notes.

## 9. Suggested workflow for the next milestone (asset recovery and visual concept)

1. **Retrieve** the seven first-party URLs. If the sandbox still blocks them, stop and request local copies in a git-ignored `assets-src/` (no workarounds).
2. **Inspect**: `identify` for dimensions/format, view each image, assess quality and composition, and extract the menu PDFs with `pdftotext` / `pdftoppm`.
3. **Record** URLs, dates and intended use in `02-asset-manifest.md`; keep the logo as a placeholder.
4. **Integrate** real images through Astro `<Image>` into the private local build only; no baked-in banner text reused as design language.
5. **Build** demonstration menu content from the published menus, with every dish and price marked "subject to restaurant confirmation".
6. **Polish** the homepage with `frontend-ui-engineering` guidance, `ponytail` at `lite`.
7. **QA**: Playwright screenshots (3 breakpoints), axe, keyboard, Lighthouse. Then one `code-reviewer` pass.
8. **Verify** with `verification-before-completion`, then report with screenshots for GPT's review.
9. **Hand-off**: local preview or screen recording; no deployment, hosting purchase or remote commit without your instruction.
