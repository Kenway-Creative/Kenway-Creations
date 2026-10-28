# The Horse — self-service Back Office roadmap

**Requirement added 28 October 2026.** The finished site must have one easy-to-use staff Back Office so routine content changes do not depend on the developer. This is a **core launch requirement**, not a future paid add-on. The Horse is a founding reference customer: no build or setup charge; hosting commercials to be agreed later.

## Goal
Staff should be able to log in securely, make simple updates on a phone, tablet or desktop, preview them, and publish to the live site without opening GitHub or contacting the developer.

## Core modules — launch scope
1. **Menu Manager** — weekly lunch, evening, Sunday and phone-takeaway menus; sections, dishes, prices, availability, chef-verified allergens, duplicate week, preview and publish. Already exists as a **browser-local prototype**, not a shared live system.
2. **Photo Library** — upload genuine venue photos, select a hero/gallery image, change photo order, replace images and edit captions/alt text. Automatically resize and optimise originals; retain safe versions and clear usage permissions. No AI-generated imagery.
3. **Events Manager** — create/edit events with title, description, dates, start/end time, approved image, booking instructions, visibility and automatic expiry. Staff may use The Horse Facebook page as a reference, but events are **manually verified**; no automatic Facebook scraping or republishing.
4. **Page Content** — edit designated text areas on home, menus, stay, story, what's on and takeaway, plus approved announcements. Do not expose site layout, code or critical booking links as unrestricted free-form HTML.
5. **Opening Hours and Notices** — edit regular hours, exceptions/bank holidays and temporary closure notices with preview and effective dates.
6. **Preview & Publish** — clear draft/published status, who changed it, last updated time, approval where needed, restore previous version and visible deployment status.

## Experience
- Home screen with six plain-language tiles and **quick actions**: Update this week's menu, Add an event, Change a photo, Update hours.
- Large tap targets, clear field labels and inline validation; usable on a kitchen tablet.
- Upload a photo from phone camera or files; show a crop/preview before publishing.
- Explicit **Save draft**, **Preview** and **Publish** actions; publication must not be confused with merely saving.
- Restrict sensitive fields, allow nontechnical editing, and explain failures in everyday language.
- Content ownership: venue retains approved photos, copy, events and menus.

## Accounts and permissions
- **Admin/manager**: manage staff access, pages, photos, events, hours and publish.
- **Chef/editor**: manage menus and optionally publish them.
- Optional **contributor**: prepare drafts without publishing.
- No public access to admin. Authenticated staff accounts, role checks, audit log, backups and revocation required before live use.

## Technical direction
- Keep the Astro public website, GitHub as source control only and a separate production host.
- Use **one shared CMS/content service** for all Back Office modules, not six unrelated tools.
- Prefer an established hosted CMS with configurable friendly editing screens, secure roles and asset management; compare total costs before selecting.
- Publishing updates the production website via a secure deploy hook (or approved dynamic data strategy for time-sensitive updates).
- A static-site rebuild may take minutes; staff must see actual publication status. Scheduled activation/expiry requires a verified scheduler and GMT/BST handling.
- No online takeaway checkout, payments, delivery, or e-commerce in scope.

## Updated milestones

### A — Menu prototype and unified Back Office shell (current)
- Refine the browser-local menu editor with the chef.
- Design Back Office dashboard/navigation so the menu editor becomes the first module.
- Prototype Photo Library and Events Manager editing workflows with **sample placeholders only**; no real uploads/publishing until backend exists.
- Obtain venue feedback on what staff actually need to edit.

### B — Secure CMS foundation
- Choose the hosted CMS and production architecture based on module requirements and pricing.
- Implement staff authentication/roles, shared content schemas, media storage, audit/versioning, preview and publishing.
- Test backups, access revocation, and publication failure/retry.

### C — Complete launch modules
- Wire menu listings, photo selections, events, editable page content and opening hours to live website templates.
- Implement genuine image optimisation, automatic event expiry and bank-holiday hours.
- Ensure editor changes do not break layout or override booking CTAs.

### D — Venue content, integrations and acceptance
- Obtain approved real photography, current menus, hours, event details and booking link/widget.
- Test from phone/tablet with chef and manager; confirm they can update a menu, image, event and hours independently.
- Verify no stale events, no invented allergen information and no unauthorised image reuse.

### E — Production launch
- Deploy outside GitHub Pages to venue-approved domain, preserve email DNS, test SEO/redirects, security, privacy and performance.
- Train staff, provide a concise operating guide and agree low-touch maintenance.
- Obtain permission for later case-study/reference use separately.

## Launch acceptance test
A staff member who has never seen the code can independently:
1. Sign in on a tablet and publish a revised weekly menu.
2. Upload and replace a homepage photo.
3. Add an event that disappears after its end date.
4. Update bank-holiday opening hours.
5. Preview all four changes and confirm they are live.
6. Recover an accidental content change without developer intervention.

**Current status:** only the menu editor browser-local prototype is built. No real Back Office dashboard, photo uploads, events editor, shared CMS, staff login or production publishing exists yet.
