# The Horse, Shepshed – redesign prototype

Independent design prototype for a pitch to the owners. **Not the official website. No changes are made to the live site.**

## Status (20 Oct 2026)

| Item | State |
|---|---|
| Homepage prototype (responsive, accessible, no cookies/third parties) | Built and refined; Lighthouse 99–100 perf, 100 a11y/best-practice (SEO 60 = deliberate `noindex`) |
| Demonstration booking journey (fictional availability) | Built; empty `ToastWidget` slot ready for the venue's snippet |
| Toast approach | Revised: Astro → Toast Tables widget/link → Toast-managed reservations (no reservation backend) |
| Audit | Verified public facts incorporated (GPT-reported); page content/assets still not reachable from the sandbox |
| Real logo and photography | **Not yet available** – labelled placeholders and text wordmark. See `docs/08-asset-checklist.md` |
| GitHub and private preview | Not yet pushed or deployed: waiting on GitHub access and a confirmed-private repository. Secure sequence in `docs/13-github-and-cloudflare-runbook.md` (earlier plan: `docs/09-private-preview-plan.md`) |
| QA | `docs/11-qa-report.md` (Chromium only; Firefox/WebKit blocked by the sandbox network policy) |

This is a self-funded, unofficial concept: no contract, fee or approval exists. Docs contain no development charges.

## Run

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in dist/
npm test           # demo-availability unit tests
```

Config lives in `.env` (copy `.env.example`; never commit). The only variable is `PUBLIC_TOAST_BOOKING_URL`, the hosted Toast Tables link, available only once the restaurant has enabled online reservations. The Toast widget snippet goes in `src/components/ToastWidget.astro` once the venue supplies it.

## Rules this prototype follows

- `noindex` on every page; no analytics, cookies or external requests (fonts are self-hosted).
- Photographs are labelled placeholders. No stock or AI imagery. No dishes, prices, hours, awards, rates or events are invented.
- The booking journey is labelled as a demonstration, sends nothing and stores nothing.

## Layout

```
src/pages/        index (homepage), menus (links to the published menu PDFs), book (demo journey)
src/components/   Photo (placeholder), SiteHeader
src/lib/          demo-slots.js (fictional availability) + test/
src/styles/       global.css (design tokens at top)
docs/             audit, asset manifest + checklist, Toast approach, architecture, sitemap, running costs, access list, content register, preview plan, tooling audit, QA report, visual-development plan
```
