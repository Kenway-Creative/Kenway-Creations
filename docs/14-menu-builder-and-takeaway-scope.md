# The Horse — weekly menu builder and takeaway ordering scope
**Status:** proposal only; not implemented, commissioned, approved or connected to live systems.
**Product principle:** the restaurant, its bookings and in-person experience come first. Takeaway is a small, kitchen-controlled collection channel, not a competing delivery marketplace.

## 1. Desired outcomes
- Chef can prepare, preview, schedule and publish this week's restaurant menus without touching code or asking a developer.
- Guests can see an accurate, dated current menu on mobile, including relevant prices and dietary/allergen information approved by the venue.
- Chef can optionally offer selected dishes for **collection**, independently of the dine-in menu.
- Online ordering can be switched off instantly during a busy service, with no stale availability or accidental orders.
- Book a Table remains the primary site conversion; takeaway is discoverable but secondary.

## 2. Important discovery before building
1. Confirm the venue actually wants takeaway, whether collection only, which days/services, lead time, cutoff, maximum orders per slot, minimum spend, packaging charges and collection handoff.
2. Confirm the planned Toast products, UK merchant configuration, account ownership and **actual** supported capabilities for menu publishing, online ordering, payments, kitchen routing, webhooks and embed/hosted links. Do not assume Toast Tables (reservations) also provides online ordering.
3. Ask who owns menu publishing (head chef, sous chef, manager), who approves prices and allergens, and whether the venue has a source-of-truth POS menu.
4. Agree food allergen review/approval, VAT/price display, cancellation/refund terms, customer contact details and privacy policy with the operator.
5. Confirm whether existing menu PDFs remain as archives or should be replaced by web-rendered weekly menus.

## 3. Recommended implementation decision
**Prefer existing Toast capability if it fits:** if the venue's confirmed Toast setup can host takeaway ordering and route orders to the kitchen, link or embed its approved customer flow instead of duplicating POS, payments and kitchen operations. Validate branding, UK availability, merchant fees and data access first.

**If Toast does not cover chef-managed weekly menus:** build a small authenticated content-management layer to publish menus into Astro. Keep reservations with Toast Tables.

**Only build a custom ordering backend if necessary:** this is a separate operational and security project, not an extension of the current static GitHub Pages demo. A hosted payment provider, secure API, persistent database and kitchen order-acceptance flow are prerequisites. Do not put API keys or payment handling in client-side Astro code.

## 4. Chef-facing menu builder (MVP)
### Content model
- **Menu:** name, channel (dine-in/takeaway), service (lunch/evening/Sunday), start/end date and time, status (draft/scheduled/published/archived), last published timestamp, revision.
- **Section:** starters, mains, sides, desserts etc.; display order.
- **Dish:** title, short description, optional genuine photograph, price in GBP, allergens and dietary tags, operator-approved allergen notes, available/unavailable flag.
- **Menu item:** dish + per-menu price/description override and ordering position. Reuse a dish across weeks without overwriting historical prices.
- **Availability:** channel-specific toggle, optional per-day stock limit, service times; never imply all dine-in dishes can be taken away.
- **Audit:** editor, approver, publish date and previous revision for rollback.

### Chef workflow
1. Sign in with a role-based account; no public write access.
2. Duplicate last week's menu, edit items and prices, reorder sections with simple controls.
3. Preview exactly what customers will see on mobile, including allergen information.
4. Save draft; manager/chef approval required before publishing (configurable).
5. Publish now or schedule by local UK date/time. The public menu displays its effective week/date and an enquiry fallback if none is published.
6. Mark a dish unavailable, pause takeaway or roll back a published version without redeploying code manually.
7. View an audit trail of who changed a price, dish or allergen statement.

### Public website
- Dedicated **This week's menus** view (responsive HTML, accessible and indexable only after official launch).
- Distinct restaurant and takeaway menus, with clear date/service labels.
- Menu may change; do not show fabricated dishes, prices or availability in the current prototype.
- Keep PDF links during transition, then remove only with venue approval.
- For a static Astro site, a secured publish action may trigger a rebuild; for time-critical availability and takeaway orders, use a live server endpoint rather than relying on build timing.

## 5. Collection ordering — separate phase
### Guest journey
1. Open Takeaway; see only the current takeaway menu for a valid collection service.
2. Select dishes, quantities and permitted modifiers; see running total and any charges.
3. Choose a **real** collection slot offered by the kitchen, accounting for lead time and capacity.
4. Enter minimum required contact details, review allergens and order details, and pay via a compliant hosted checkout if online payment is approved.
5. Receive a clear confirmation **only after** the order is durably accepted by the system and routed to the kitchen; otherwise show failure/retry guidance.
6. Receive collection reference, time and contact instructions. No delivery option in MVP.

### Kitchen controls
- Open/close ordering by service, pause instantly, set slot capacity and preparation lead time.
- Set dishes as sold out, manage modifiers and per-item stock where supported.
- Receive new orders through a confirmed kitchen workflow (prefer POS/KDS integration; otherwise a dedicated, monitored tablet/print path).
- Accept/reject and mark preparing/ready/collected; prevent orders during closed or saturated slots.
- Handle missed pickups, cancellations, refunds and failed payments explicitly.

### Safety, data and reliability
- Server-side price and availability validation at checkout; never trust client totals.
- Transaction-safe slot/stock reservations, duplicate-request protection and idempotent payment webhooks.
- No card details stored by the website; use a PCI-compliant hosted payment provider.
- Least-privilege staff roles, secure sessions, audit logs, rate limits, backups and monitoring.
- UK GDPR: minimal personal data, retention/deletion rules, privacy notice and appropriate processor agreements.
- Allergen information must be supplied and verified by the venue; establish a process for changes, cross-contact notices and staff escalation.
- Define kitchen outage fallback: disable new orders rather than silently accepting them.

## 6. Suggested high-level data entities
`staff_users`, `roles`, `menus`, `menu_revisions`, `sections`, `dishes`, `menu_items`, `service_windows`, `pickup_slots`, `slot_capacity`, `orders`, `order_lines` (immutable price/name snapshot), `payment_events`, `order_status_events`, `audit_events`.

Do not store a customer's order against mutable live dish records alone; keep snapshots for receipts and refunds. Define venue-local time zone as Europe/London for scheduling.

## 7. Rollout milestones
**Phase 0 — discovery and operator sign-off:** Toast capability audit, menu ownership, collection operations, compliance and payment decision. Output: signed-off flow and acceptance criteria.

**Phase 1 — weekly menus:** chef login, menu CRUD, draft/preview, scheduling/publishing, responsive public menu, fallback and audit trail. No orders/payments. Test a weekly publish and rollback with the chef.

**Phase 2 — collection MVP:** live availability, limited takeaway menu, slot capacity, kitchen routing, checkout, confirmation, refund and pause controls. Pilot on one quiet service with order caps.

**Phase 3 — optimisation:** menu performance, repeat customers with appropriate consent, waste/stock insights and operational reporting; only after a successful pilot.

## 8. Acceptance criteria
- Chef can replace the weekly menu and publish from a phone or tablet without developer help.
- Incorrect/unapproved menus cannot go live accidentally; last good published menu remains recoverable.
- Dine-in menu and Book a Table remain more prominent than takeaway.
- A takeaway order cannot be placed for a closed service, sold-out item or full collection slot.
- Staff can stop new orders immediately and see every accepted order.
- Customers never receive a false confirmation or a charge without a documented resolution path.
- End-to-end tests cover publication, scheduling across BST/GMT, allergens, unavailable items, duplicate checkout, payment failures, kitchen outage and refunds.

## 9. Out of scope for the first release
Delivery, marketplace integrations, driver tracking, loyalty accounts, complex discounts, gift cards, multi-venue routing, AI-written menus and automatically inferred allergen data.

## 10. Current website prototype status
The public concept has a secondary takeaway section and an informational `/takeaway/` page. **It cannot accept takeaway orders**. No menu CMS, authenticated admin, database, checkout or Toast online-order integration has been implemented. Do not label any of these as live until configured, tested and approved by the venue.
