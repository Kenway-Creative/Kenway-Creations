# The Horse — chef menu publisher, phone takeaway and venue content

**Status:** approved project direction for an **unofficial prototype**, not a live venue-approved service. The menu editor is **scoped but not built**. No e-commerce, online order acceptance, basket, checkout or payment integrations.

**Primary objective:** bring guests into the restaurant. Table bookings and dining-in remain the primary calls to action. Takeaway is a modest secondary option handled by phone.

## 1. What we are building

A secure, chef-friendly **Menu Manager** to create, edit, preview, schedule and publish this week's menus to the website's **live public menu listings**, without touching GitHub, code or a developer.

The same tool should support:
- **Restaurant menus:** lunch, evening, Sunday and any other approved service.
- **Takeaway menu:** independently selected dishes and prices, displayed as a listing with **Call to Order**. Orders are taken by telephone on **01509 507006**; collection arrangements are agreed with staff.
- **Menu revisions:** draft, scheduled, published, archived; previous versions remain recoverable.
- **Dish availability:** mark unavailable, remove from this week's menu or publish a replacement.

The public website must not imply that every dine-in dish is offered for takeaway. There is no live ordering workflow.

## 2. Chef-facing editing experience

### Menu list / dashboard
- Clear cards for **This Week's Lunch**, **Evening**, **Sunday Lunch**, **Takeaway**.
- Current publication status, effective dates and last published time.
- **Create**, **Duplicate last week**, **Edit**, **Preview**, **Publish**, **Schedule** and **Unpublish**.
- Easy to use on a tablet or mobile in a working kitchen, not a technical CMS interface.

### Menu editor
- Add sections such as starters, mains, sides, desserts; drag to reorder.
- Add or reuse dishes with name, description, GBP price, dietary/allergen data, optional **genuine** photograph, and available/unavailable status.
- Override description and price per menu without changing other menus.
- Set menu's effective date/time in **Europe/London**; optionally show an **Updated** timestamp.
- Preview the exact public layout before publishing.
- Validate missing prices, empty menus, allergen review and unintended duplicate dishes before publication.
- Confirmation for publish/unpublish; manager approval optional depending on staffing.
- Audit history (who changed what and when) and one-click restore of a previous version.

### Suggested content model
- `menu`: id, title, service, channel (restaurant/takeaway), start_at, end_at, status, published_revision_id.
- `menu_section`: menu_id, title, sort_order.
- `dish`: id, title, description, genuine_image_asset, allergen_flags, dietary_tags, allergen_reviewed_at.
- `menu_item`: menu_section_id, dish_id, displayed_price_gbp, description_override, sort_order, available.
- `menu_revision`: snapshot, editor, approved_by, created_at, published_at.
- `staff_user`: identity and editor/publisher roles.
- `audit_event`: actor, action, target, timestamp.

Do not infer allergens from dish names or AI; the restaurant is responsible for verifying all allergen statements.

## 3. Publishing to the live site

**Recommendation for MVP:** a managed headless CMS with a friendly editor and role-based sign-in (evaluate Sanity or a comparable platform). Connect its **Publish** action to a protected GitHub Actions deployment trigger for the existing Astro + GitHub Pages site.

Flow:

`Chef signs in → edits menu → previews → clicks Publish → CMS validates/saves → authenticated webhook triggers GitHub Pages build → site reads published CMS menu data → deployment succeeds → new menu visible on /menus/ and /takeaway/`

The chef never needs a GitHub account or access to the code repository.

**Important:** the current GitHub Pages website is static. Publishing via a rebuild is **not instantaneous**; design for updates to appear within a few minutes and show publication/deployment status, including failure/retry. Do not tell the chef a menu is live until deployment has succeeded and the public page reflects the revision. Keep the last known-good public menu on build failure.

If immediate sold-out changes become essential, evaluate a secured runtime content API and cache invalidation separately. Do not pretend a static rebuild provides real-time inventory.

### CMS acceptance criteria
1. Chef can publish an approved weekly menu from a phone or tablet without developer involvement.
2. The public **/menus/** shows the latest published restaurant menus with effective dates, dish descriptions and approved prices.
3. The public **/takeaway/** shows only the published takeaway menu, plus prominent **Call 01509 507006** action; never a basket or checkout.
4. A successful publish triggers a production rebuild and the chef can see whether the revision is **Live**, **Publishing** or **Failed**.
5. Scheduled menu activation and expiry work across GMT/BST boundaries, including missing-menu fallback.
6. Published menus are archived for rollback and changes are audited.
7. Drafts, unpublished prices and staff identities are not exposed publicly.
8. Book a Table remains the most prominent conversion path.

## 4. Public website presentation

### /menus/
- **This week's menus**: lunch, evening and Sunday (only those approved and currently published).
- Clean web-native sections and dish listings; mobile readable; accessible.
- Show effective week/date and last update. Clearly distinguish dine-in from takeaway.
- Existing venue PDFs remain labelled **previously published PDFs** during transition, never automatically described as current.
- No fabricated dishes, prices, service times or allergen claims.

### /takeaway/
- Secondary navigation path from homepage and menus; do not displace restaurant booking CTAs.
- Chef-selected **Takeaway this week** listing, if a current menu is published.
- Primary action **Call to order: 01509 507006**.
- Explain that dishes and collection times are confirmed with the team by phone.
- No online orders, carts, checkout, delivery, payment gateway, pickup-slot reservations or customer accounts.

## 5. Facebook photographs and events

User-provided reference: https://www.facebook.com/TheHorseShepshed.co.uk/

Use the venue's Facebook presence as a **research and content-sourcing reference** for genuine photographs, events, offers and announcements. Facebook was not accessible for direct review in this session, so **no specific event is verified**.

Editorial process:
1. Staff or project owner identifies a post, photo or event.
2. Verify date, venue, details, whether still current and any ticket/booking instructions with the venue.
3. Obtain permission for image reuse and retain the approved original file, caption/credit and source URL.
4. Add to a reviewed events list with start/end date and publication/expiry controls.
5. Do not auto-scrape, hotlink or automatically republish social posts; never publish expired events.
6. Prioritise approved real photography over old archive images; **no AI-generated venue imagery**.

The public **What's On** page links to the Facebook page as an interim way to check announcements. A proper event manager can be a later extension of the same CMS, but not a blocker for weekly menu publishing.

## 6. Build sequence

**Milestone A — confirm content and ownership**
- Confirm menu categories, source of truth (Toast POS vs website), editor accounts and who signs off allergens/prices.
- Confirm if the venue wants a menu on takeaway at all times or only when it is offered.
- Agree publication SLA (e.g. within a few minutes), role permissions and menu expiry behaviour.
- Obtain permission to use Facebook-sourced photographs/events.

**Milestone B — chef menu publisher MVP**
- Select CMS, create roles, content schemas and friendly editing screens.
- Implement draft/preview/publish and publication webhook/deployment status.
- Render approved current menus from CMS in Astro; preserve PDF fallback.
- Test on mobile/tablet with a real chef and test expiry/rollback.

**Milestone C — phone takeaway listing**
- Use the same CMS to mark selected menu items as takeaway.
- Publish takeaway-only listing and telephone CTA; no customer data captured.
- Check the kitchen can honour the published selection and that changes propagate promptly.

**Later (separately approved):** CMS-managed events, seasonal promotions, better photo library. No e-commerce is in the current scope.

## 7. Explicit exclusions

- No online payments, carts, checkout, online order submissions or delivery.
- No order, payment, pickup-slot or customer account tables.
- No Toast online ordering integration. Toast **Tables reservations** remain a separate workstream; any POS menu integration requires validation of actual API capabilities and venue permission.
- No automatic Facebook scraping or auto-publishing unverified events.
- No fictitious dishes, prices, photos, service times or allergens.

## 8. Current prototype vs future functionality

**Already on GitHub Pages:** static homepage takeaway section, informational `/takeaway/` page with telephone link, menu PDFs, link to the venue's Facebook page on `/whats-on/`, and the existing table-booking demonstration.

**Not yet implemented:** authenticated chef admin, content database/CMS, live weekly menu listings, publish webhook, deployment status, scheduled publishing or menu rollback. These must not be presented as working until actually built, tested and approved.
