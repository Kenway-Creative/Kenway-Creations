# 1. Existing site audit

## Access status

My sandbox cannot reach `www.thehorseshepshed.co.uk` (proxy 403 / DNS failure, re-tested this session) or `support.toasttab.com`. That is a restriction of this environment, **not evidence the sites are down**. GPT has accessed the public site independently. Everything marked **GPT-reported** below is relayed to me and not observed by me.

## A. Verified public information (GPT-reported)

| Fact | Source page | Notes |
|---|---|---|
| Address 196 Ashby Road West, Shepshed, LE12 9EF | [Home](https://www.thehorseshepshed.co.uk/), [Contact](https://www.thehorseshepshed.co.uk/contact-us/) | Used in prototype |
| Telephone 01509 507006 | Contact | Used in prototype |
| Established independent British freehouse, bar and restaurant | [About](https://www.thehorseshepshed.co.uk/about-us/) | Wording to be re-checked before use |
| The Stables wood-fired pizzeria | Site | Used (cards and strip) |
| Six Barn Courtyard bedrooms: 2 Premium King, 4 Double | [Barn Courtyard](https://www.thehorseshepshed.co.uk/the-barn-courtyard/) | Used; room facilities **not** used |
| Reservations currently use an enquiry-based interface | [Book a table](https://www.thehorseshepshed.co.uk/book-a-table/) | Core problem the redesign addresses |
| Moving to Toast; urgently seeking a new site | Project update | Commercial context |
| Menu page exists | [Main menu](https://www.thehorseshepshed.co.uk/main-menu/) | Content not relayed |

**One AA Rosette:** from project discovery, to be verified before public use (used in prototype text, flagged in the content register).

**Treat as requiring renewed verification:** opening hours, menus, ownership history, room facilities.

## B. Still inaccessible to me

- Page-level content, headings, copy, menu text and prices
- Logo file, photographs and their dimensions/quality
- Navigation structure and URL list (needed for 301 redirects)
- Platform/CMS, page weight, Lighthouse and Core Web Vitals of the current site
- What the booking enquiry form actually does and whether Quandoo links still work
- Cookie banner, trackers, privacy policy, accessibility of PDFs/menus

**To unblock:** add `www.thehorseshepshed.co.uk` and its image hosts to this environment's allowed domains, or supply screenshots/saved HTML/exports of the six pages. A Lighthouse run of the live site is a read-only request to a public page and would be the only access made.

## C. Provisional opportunities (hypotheses)

1. **Booking confidence:** an enquiry form gives no sign a table exists. A persistent "Book a table" button opening real availability (Toast) addresses this directly.
2. **Menu presentation:** if menus are PDFs/images, native HTML menus fix mobile reading and search visibility. *Unconfirmed.*
3. **Rooms:** the Barn Courtyard deserves its own page, authentic photography and an enquiry route, framed for East Midlands Airport visitors.
4. **Brand:** retain the existing logo and identity; lift the experience around it.

## D. Checklist once access exists

- [ ] Capture IA and URL list → redirects
- [ ] Record booking journey as it behaves today
- [ ] Technology, performance, accessibility baseline
- [ ] Inventory every asset into `02-asset-manifest.md` using `08-asset-checklist.md`
- [ ] Confirm menus' format and currency; hours; policies
