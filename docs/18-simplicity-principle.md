# Simplicity principle — The Horse and future hospitality websites

**Direction set by founder:** "Subtract. Subtract. Subtract."

This is the default design, product and commercial principle for The Horse and reusable future hospitality websites. Simplicity is not an aesthetic gimmick: it should reduce the number of decisions, clicks, maintenance obligations and points of failure.

## Public website
- Lead with the exact client-approved opening: **Bar / Restaurant / Rooms**.
- Make the main user journeys unmistakable: book a table, view menus, enquire about rooms, contact the venue.
- Prefer authentic photography, short copy, clear headings and generous spacing.
- Each section needs a job. Remove duplicated introductions, repeated CTAs, generic filler, unnecessary carousels, badges, decorative effects and redundant pages.
- Preserve essential accessibility, pricing/menu accuracy, opening hours, allergen notices, privacy information and useful directions. Do not subtract information people need to make a decision.
- Mobile-first; fast-loading and calm. One primary action per section where practical.

## Staff Back Office
- Give staff the fewest sensible actions: **Menus, Photos, Events, Hours, Pages**.
- Prefer direct editing and clear **Save draft / Preview / Publish** states.
- Hide complexity behind good defaults. Use structured forms rather than open-ended configuration.
- No unnecessary dashboard analytics, multi-step wizards, duplicate records or separate tools for related content.
- Safety-critical steps (especially allergens and public publishing) stay explicit even when they add a click.

## Engineering
- Keep Astro as a lean public site and select one shared CMS for staff-managed content.
- Avoid custom infrastructure where a reliable maintained service does the job.
- Limit dependencies, third-party scripts, external API calls and brittle integrations.
- Make failures and publishing status visible without requiring technical knowledge.

## Commercial model
- Founding client The Horse: no build/setup fee; modest transparent hosting/maintenance charge to be agreed.
- Clear scope, transparent supplier pass-through costs, no unnecessary tiers or hidden extras.
- Routine content editing belongs to the venue, not to a permanent developer support queue.

## Decision filter
Before adding any feature or section:
1. What user or staff problem does this solve?
2. Can the same outcome be achieved with fewer elements or steps?
3. Is it essential for launch?
4. What can we remove instead?

**Default:** when in doubt, subtract. Never remove accessibility, security, legal necessities, or factual clarity in the name of simplicity.
