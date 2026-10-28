# The Horse — production hosting, operating costs and commercial options
**Working commercial model, 27 October 2026. Not a client quote, contract, commitment or implementation approval.** The public GitHub Pages website is an **unofficial prototype only**. The venue's live website and domain must remain unchanged until a signed-off launch plan and owner authorisation.

## 1. Hosting architecture

| Layer | Recommended approach | Ownership |
|---|---|---|
| Development source | GitHub private repository; development history, pull requests and staging only | Developer or agreed transfer |
| Prototype | Existing GitHub Pages preview, `noindex`; never the official venue host | Developer |
| **Production website** | **Cloudflare Pages** (or a comparable managed static host) deploying the existing Astro site | **Venue-owned Cloudflare account** preferred |
| **Menu editor / content** | Hosted **Sanity CMS** (or evaluated alternative) for weekly restaurant/takeaway listings | **Venue-owned CMS project** preferred |
| Menu publishing | CMS Publish → authenticated production deploy hook → Astro build → Cloudflare Pages → visible published revision | Scoped integration |
| Domain/DNS | Retain existing `thehorseshepshed.co.uk` registration; point only approved website records at cutover | **Venue** |
| Bookings | Venue's approved Toast Tables booking widget/link, separate from hosting/CMS | Venue |
| Takeaway | Website displays chef-published takeaway menu and **01509 507006** phone link; **no online ordering or payment** | Venue |
| Email | Preserve existing MX/SPF/DKIM/DMARC and email provider records; no email migration included | Venue |

GitHub remains necessary for version control and automated build integration, but it is **not** the public production hosting service.

## 2. Supplier list prices (verified 27 Oct 2026; USD as published)

| Service | Free/entry option | Paid option | Notes |
|---|---|---|---|
| Cloudflare Pages | Free tier; 500 builds/month; custom domains | Cloudflare Pro **$20/month billed annually** or **$25 monthly** (site/account plan; confirm exact plan feature applicability) | Managed CDN and TLS. Paid plan is optional, not a guaranteed uptime SLA. |
| Sanity CMS | Free: up to 20 users, public datasets, hosted Studio, basic roles | Growth **$15 per seat/month** | Growth adds Editor role, scheduled drafts and more granular roles; usage/overage conditions apply. |
| Netlify alternative | Free: 300 credits/month | Personal **$9/month**, Pro **$20/month** | Credit-based deployments, requests and bandwidth; compare actual traffic and menu publishing frequency before choosing. |
| Existing venue domain | Already registered | Registrar renewal price unknown | **Do not buy, transfer or alter the venue's domain without authorisation.** |
| Toast Tables | Existing/planned venue service | Venue contract unknown | No assumption of free licence, integration or reservation API. |

Sources (official):
- https://developers.cloudflare.com/pages/platform/limits/
- https://www.cloudflare.com/plans/
- https://www.sanity.io/pricing
- https://www.netlify.com/pricing/
- https://pricing.registrar.cloudflare.com/

**Planning allowance, not a supplier quote:** budget approximately **£0–£60/month** for website/CMS platform charges during a small-site launch, depending on selected plans, number of paid editor seats, exchange rates, usage and tax. It can start at £0 on qualifying free tiers, but production suitability, backups, roles, scheduling and support must be checked. Domain renewal, Toast, business email and optional paid analytics are separate.

Do not convert USD to a fixed GBP charge or promise an ongoing free plan without checking the provider at contract time.

## 3. Founding client commercial arrangement — The Horse

**Founder decision (27 October 2026): The Horse is the first customer and a reference account. No design, development, setup, chef menu-manager or core Back Office implementation fee will be charged.** The business intends to charge only a modest monthly managed-hosting fee, not a conventional agency project fee.

### Proposed founding-client offer (not yet accepted by the venue)

| Item | Price | Scope |
|---|---:|---|
| Design and development | **£0 one-off** | Finish the website, build the chef menu manager and unified staff Back Office (photos, events, editable content, hours), implement approved public menu listings and telephone takeaway information |
| Initial setup and launch | **£0 one-off** | Production deployment, domain migration coordination, basic chef handover |
| Managed website hosting | **£25/month** | Website hosting oversight, deployment maintenance, basic security/dependency updates and reasonable bug fixes |
| First-year managed hosting | **£300** | 12 × £25; no setup charge |
| Existing domain renewal | **At cost / paid by venue** | Retain venue ownership and registrar billing |
| Optional paid CMS/hosting upgrades | **At cost, only with prior written approval** | If free tiers prove insufficient, explain costs before enabling them |
| Toast reservations / third-party licences | **Venue's own costs, if any** | Not included in hosting |

All prices are illustrative and **exclude VAT if applicable**. This is a pricing recommendation, **not an accepted agreement**.

### What £25/month does and does not mean

This is a **founding-client preferential price** for the first reference site, not a general price list. It assumes low traffic, modest CMS usage and eligibility for appropriate free-tier hosting/CMS services.

Included: basic hosting management, deployment monitoring, routine security/dependency checks, restoring a failed deployment where practical and correcting defects in the delivered functionality.

Excluded: unlimited design changes, continuous new-feature development, paid supplier upgrades, domain renewal, premium support SLA, round-the-clock response, restaurant content entry, social media management, photography, SEO campaigns and Toast licence/support.

The chef manages their own weekly menu updates using the editor. Larger enhancements should be separately agreed; do not imply future development is free indefinitely.

### Reference relationship and ownership

Before go-live, agree in writing:
1. Venue approves being named as a **case study/reference**, including use of its name, approved screenshots and a link to the finished website in the developer's portfolio.
2. Request a genuine testimonial after the site has been in use; do **not** require a positive review or guarantee a testimonial.
3. Venue owns its domain, approved content, and ideally its production hosting and CMS accounts. Document access, backups, export and offboarding.
4. State whether the £25/month is fixed for an initial period (suggest **12 months**) and how any future increase will be agreed with notice.
5. Clarify VAT treatment, invoice date, payment terms and a reasonable cancellation/notice period (suggest **30 days** after any agreed initial period).
6. Define maintenance boundaries and response expectations so a low-cost reference project does not become an unlimited support obligation.
7. Obtain venue approval before DNS changes, subscriptions or any production launch.

### Business rationale

The value is a real, live hospitality reference: working weekly menus, genuine photography, phone takeaway enquiries, reliable table-booking journeys and measurable website improvements. Collect permitted screenshots, usage/performance evidence and an authentic customer quote for later sales. The goal is **credible proof and repeatable delivery**, not maximising first-client revenue.

## 4. Launch requirements and exclusions

Before pricing is firm:
1. Confirm exact pages, whether room booking is enquiry-only, whether Toast booking is ready, and what photos/menus the venue approves.
2. Confirm chef editors (number of users), need for approval roles, scheduled menus and frequency of publication; paid CMS tier may be required.
3. Confirm domain registrar, current website host, DNS/email ownership, current SEO URLs and redirect plan.
4. Agree live site design, copy, GDPR/privacy/cookie requirements, accessibility, performance and backup/restore acceptance tests.
5. Agree menu editing demo and training, CMS publication latency, fallback when CMS/deploy fails and support hours.
6. Agree who pays hosting/CMS directly, who retains ownership of GitHub source and which services are transferable on exit.
7. Keep staging `noindex`; official production removes `noindex` only with venue approval and uses appropriate canonical URLs/redirects.

## 5. Go-live checklist
- Production Cloudflare and CMS accounts set up under agreed ownership, with least-privilege access and billing alerts.
- Astro build configured for root-domain paths (not the GitHub Pages `/Kenway-Creations/` base).
- Menu CMS authenticated; drafts private; publish triggers production deployment; preview and rollback verified.
- Approved menus and genuine imagery, verified prices and allergens; no fabricated venue facts.
- DNS cutover coordinated with the venue; preserve email records and ensure existing live site rollback is possible.
- SSL, redirects, 404s, forms, phone links, Toast reservations, mobile/desktop, accessibility, SEO, privacy and analytics consent tested.
- Chef signs off live publishing workflow; venue approves launch; 30-day stabilisation period and support contacts documented.

## 6. Decisions pending
- Which hosting provider and CMS plan will be purchased, if any?
- Does the venue want ownership of the code repository from day one or contractual handover on final payment?
- Exact staff Back Office scope, publication frequency, editor count, CMS media storage and approval/scheduling requirements?
- Confirm whether the proposed founding-client hosting price covers the selected CMS/media usage. **No setup/build charge**; agree hosting pricing with the venue later.
