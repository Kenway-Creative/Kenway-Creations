# 11. QA report (prototype build, 20 Oct 2026)

Run against `dist/` served locally, with placeholders in place of real photography. Lighthouse 13.5.0 via headless Chromium; axe-core with WCAG 2.0/2.1/2.2 A + AA and best-practice rules.

| Check | Result |
|---|---|
| Lighthouse, home (mobile / desktop) | Performance 99 / 100 · Accessibility 100 · Best Practices 100 · SEO 60* |
| Lighthouse, /book (mobile / desktop) | Performance 100 / 100 · Accessibility 100 · Best Practices 100 · SEO 60* |
| Core Web Vitals (lab, mobile) | LCP 1.1–1.7 s · CLS 0.005–0.043 · TBT 0 ms |
| axe-core | **No violations** on home (desktop, mobile, mobile menu open) and on every booking step (1–4) at both sizes |
| Keyboard only | Full journey completed with Tab / Space / Enter; skip link works; step heading receives focus after each step; mobile menu opens with Enter and closes with Esc; all focus stops show a ≥ 3 px ring |
| Reduced motion | No hidden content; animations and clip reveals disabled |
| Reflow at 320 px | No horizontal scroll on / or /book |
| Mobile | Booking form above the fold on a 390 × 844 viewport |

\* SEO 60 is the deliberate `noindex` (the `is-crawlable` audit). Every other SEO audit passes. The score will be recalculated when the prototype is replaced by a real launch.

## Issues found and fixed this round

- Contrast: hero-form labels (brass on translucent green, 3.68:1) and footer eyebrow (clay on dark green, 2.04:1).
- `role="img"` on photo placeholder `<figure>` (invalid); the visible "Photo pending" caption now carries the meaning.
- Prototype notice outside any landmark → now an `<aside>` with a label.
- `/book` had no `<h1>`.
- Logo accessible name didn't contain its visible text.

## Not covered (be explicit)

- **Cross-browser:** only Chromium is installed in this sandbox (mobile emulation included). **Firefox and Safari/WebKit were not tested.** The site uses standard CSS/JS (`clip-path`, `IntersectionObserver`, `clamp()`), but the date input renders differently per browser. Needs a pass in real Safari (iOS) and Firefox.
- **Screen readers** (NVDA, VoiceOver) not run; axe and keyboard checks are not a substitute.
- **Real-device performance** and field Core Web Vitals not measured.
- **Toast widget:** not connected, so its performance, accessibility, cookies and CSP impact are untested.
- Real photography will change LCP; re-test once assets are added.

## Re-verification, 20 Oct 2026 (fresh run, Chromium 1194)

| Check | Result |
|---|---|
| `npm run build` | Exit 0, 2 pages |
| `npm test` | 4 pass, 0 fail |
| `/` and `/book/` at 320, 768, 1024, 1440 px | No horizontal overflow; axe-core (WCAG 2.2 A/AA + best-practice) 0 violations; 0 console errors (24 checks) |
| Keyboard-only booking journey (390 px) | Passes; step heading takes focus; confirmation labelled "nothing has been booked" |
| Privacy | Every request is same-origin (4 requests); no third-party calls |
| Guardrails | `noindex, nofollow` and the "Unofficial concept" banner present |

## Cross-browser: NOT DONE (blocked)

Installing Playwright's Firefox and WebKit was approved, but both download hosts are denied by this sandbox's network policy: `cdn.playwright.dev` and `playwright.download.prss.microsoft.com`. Nothing was downloaded or substituted. **No Firefox or WebKit result exists.** To proceed, add those two hosts under the environment's Network access → Allowed domains; browsers will install into the scratchpad (outside the tracked project) and the same checks will be re-run.

## Observed design issues (see `12-visual-development-plan.md`)

Header CTA wraps to two lines at 320 px; the hero placeholder reads like a broken image on mobile; five labels under 13 px.

## V1 verification, 20 Oct 2026 (fresh run after final change)

`npm run build` exit 0 (3 pages); `npm test` 4 pass / 0 fail; Playwright + Chromium at 320, 390, 768, 1024, 1440 px on `/`, `/book/`, `/menus/`: **85 checks, 0 failures**: no horizontal scroll, axe 0 violations, 0 console errors, header single-line with no overlap (44 px target), primary CTA inside the first mobile viewport, one `h1` with no skipped levels, no visible text under 13 px in header/hero/strip (logo wordmark excluded), secondary CTA reaches `/menus/`, both PDF links are the official URLs with `noopener`, hero form hands party size to `/book/`, keyboard-only booking journey completes with the demonstration label, reduced motion shows hero content, `noindex` and the unofficial notice on all three pages, every request same-origin. Screenshots were inspected by eye; five visual flaws were found and fixed (see `12-visual-development-plan.md`). Firefox/WebKit still blocked.
