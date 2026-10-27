# The Horse, Shepshed – redesign prototype

Independent design prototype for a pitch to the owners. **Not the official website. No changes are made to the live site.**

## Current status (27 Oct 2026)

- Public **unofficial** concept on GitHub Pages: https://kenway-creative.github.io/Kenway-Creations/ (noindex, not the official restaurant site).
- Astro site and responsive pages deployed through `.github/workflows/pages.yml`. This README does not certify any particular workflow run as successful.
- Genuine venue and owner-supplied photos used where available; poor-quality terrace photograph removed in favour of a labelled placeholder. No AI-generated venue imagery.
- Menu page currently links **previously published PDFs**, not live weekly menu listings.
- Takeaway is a **phone enquiry/order path**, not e-commerce: `/takeaway/` points customers to 01509 507006. No online orders or payments.
- **Chef menu manager is a proposed next build**, not implemented. See `docs/14-menu-builder-and-takeaway-scope.md`. Its Publish action must update the website's public weekly menu listings without developer intervention.
- Venue Facebook reference for genuine imagery and event research: https://www.facebook.com/TheHorseShepshed.co.uk/ . Verify event facts and photo permissions before reuse.
- Table-booking journey remains a demonstration; Toast Tables integration requires venue setup/approval.

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
- Only genuine venue/owner-supplied photographs or labelled placeholders. No stock or AI-generated venue imagery. No dishes, prices, hours, awards, rates or events are invented.
- The booking journey is labelled as a demonstration, sends nothing and stores nothing.

## Layout

```
src/pages/        index (homepage), menus (links to the published menu PDFs), book (demo journey)
src/components/   Photo (placeholder), SiteHeader
src/lib/          demo-slots.js (fictional availability) + test/
src/styles/       global.css (design tokens at top)
docs/             audit, asset manifest + checklist, Toast approach, architecture, sitemap, running costs, access list, content register, preview plan, tooling audit, QA report, visual-development plan
```
