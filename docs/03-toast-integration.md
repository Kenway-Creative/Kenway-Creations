# 3. Toast integration approach (revised: the widget exists)

**Intended production architecture:** Bespoke Astro site → Toast Tables booking widget (or hosted link) → Toast-managed reservations. **No separate reservation database or backend.**

> **Correction.** My first draft said no embeddable widget had been found. That was wrong. Toast's help article ["How can I add Toast Tables to my website?"](https://support.toasttab.com/en/article/Toast-Tables-How-can-I-add-Toast-Tables-to-my-website) describes two routes: a hosted reservation link, and a **website widget** snippet. My sandbox cannot open `support.toasttab.com`, so the widget details below come from search-engine summaries of that article plus GPT's report, and must be re-read against the live article before any build.

## What the documentation says (public, not yet tested on the venue's account)

| Item | Finding | Confidence |
|---|---|---|
| Hosted link | Toast Web → Waitlist & Reservations → Settings → Reservations → Online access → "Copy online reservation link". Can be a button or nav item. | Medium (search summary) |
| **Website widget** | Same area of Toast Web: copy the snippet under "Website widget" and paste into the page's HTML where the button should appear. Opens a booking **modal over the page**, so guests stay on the site. Article cites third-party builders (Squarespace, Wix, WordPress). | Medium (search summary) |
| Prerequisites | Online reservations on globally (Reservation controls) **and** on for each schedule that should be bookable online. If the button shows no times, check these first. | Medium |
| No conventional API | Toast has no reservation API; integrations push reservations via the orders API. We are not building one. | High ([dev docs](https://doc.toasttab.com/doc/cookbook/apiIntegrationChecklistReservation.html)) |
| UK | Toast UK launched May 2023 (London first). UK site markets Tables as an add-on to the POS with no cover fees; UK customers add it via Toast Customer Care. | Medium; **Shepshed eligibility unconfirmed** |
| Menus | Menus API V2 (`menus:read`) gives resolved menus per location; V3 is ordering-partners only. | Medium |
| Google | Tables bookings can surface on Google Business Profile. | Medium |

## Astro compatibility plan

- The snippet is plain HTML/JS, so it drops into an Astro component. `src/components/ToastWidget.astro` is the slot: empty until the venue's own snippet is pasted, and the demo journey runs meanwhile. **No snippet has been invented.**
- Load only on `/book` and the homepage booking button (not site-wide) to keep Lighthouse scores and privacy exposure down. Current baseline (no widget): Performance 99–100, Accessibility 100.
- **Security:** third-party script. Needs a Content-Security-Policy allowlist for Toast's script/frame origins (read from the snippet), Subresource Integrity if Toast offers it, and no secrets on the page (the snippet is public by design).
- **Privacy:** check whether the widget sets cookies or loads trackers. If so, the site needs a consent notice or must load the widget only after a click (a facade button that injects the script on press is the privacy-friendly pattern).
- **Accessibility:** the modal is Toast's, so we can't fix it. Test it with keyboard, screen-reader and 200% zoom before launch, and always keep the hosted link as a fallback.
- **Fallback:** if the widget misbehaves, "Book a table" simply opens the hosted link (`PUBLIC_TOAST_BOOKING_URL`).

## Booking journey

1. **Now (prototype):** fictional demo at `/book`, labelled as such.
2. **Production:** every "Book a table" button opens the Toast widget (modal) or hosted link. The homepage quick-booking bar becomes a button, unless Toast supports pre-filled party/date parameters (**unverified**; test).
3. The demo UI is retired or kept only as a presentation aid. It must never imply a booking is confirmed unless Toast confirmed it.

## Still to verify (venue/Toast)

1. Does the venue have Toast Tables and online reservations switched on? (Don't assume.)
2. Exact widget snippet, styling options (can it match the site's colours/type?), and modal behaviour on mobile.
3. Widget cookies/trackers; CSP origins.
4. Pre-fill support for party size/date.
5. Menus: Toast Menus API access for a venue-operator account in the UK, or a maintained content file.
6. Toast Websites remains a fallback to benchmark against (native module, menu sync, limited design freedom).
