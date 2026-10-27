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

## 3. Commercial proposal options — developer's illustrative selling prices (GBP)

These are **suggested fees to charge**, not externally sourced market averages and not prices accepted by the venue.

| Package | One-off implementation | Ongoing developer support | Included |
|---|---:|---:|---|
| A — Website refresh | **£1,750–£2,500** | **£45–£75/month** | Finalise existing Astro website, approved content/photos, mobile QA, domain launch, booking link/widget configuration; **no menu CMS** |
| **B — Website + chef menu manager (recommended)** | **£3,000–£4,500** | **£75–£125/month** | Package A plus secure CMS, menu schema, draft/preview/publish, weekly restaurant/takeaway listings, phone takeaway CTA, publishing automation, chef handover |
| C — Fully managed content | **£4,500–£6,000+** | **£150–£250+/month** | Package B plus ongoing events/content updates, extra change allowance, periodic performance reviews and more active editorial support |

**Proposed first client-facing offer to consider:** **£3,250 setup + £95/month** for Package B, **plus third-party charges at cost**, and **VAT if applicable**.

Suggested internal breakdown of £3,250: website finishing/content/QA £1,250; menu CMS and integration £1,500; production hosting/domain cutover, testing and chef training £500. This is a planning allocation, not a timesheet or cost accounting.

12 months of developer support at £95/month = **£1,140/year**. First-year project + support = **£4,390**, **excluding** third-party platform charges, domain renewal, Toast costs and any applicable VAT.

### What the £95/month support fee could include
- Hosting/deployment monitoring and response to failed deployments during stated business hours.
- Routine dependency/security review and small maintenance fixes.
- Basic CMS publishing assistance and one small change request per month (up to **1 hour**); chef manages routine menu content.
- Reasonable backup/export check and support for rollback.
- Annual review of vendor usage and costs.

**Not included:** 24/7 support, guaranteed emergency response, full-time content management, new pages/features, bespoke integrations, POS support, Toast licence, email hosting, ongoing photography, extensive SEO campaigns or event management.

Additional agreed work: illustrative **£60/hour**, subject to written approval. Avoid unlimited support promises.

### Payment and contract model
- Written scope and acceptance criteria before work begins.
- **50% deposit / 50% on approved go-live**, with change control for additions.
- Developer support billed monthly; define cancellation/notice (suggest 30 days) and any initial minimum term separately.
- Third-party provider charges either **billed directly to the venue** or itemised as transparent pass-through at cost; avoid hiding them inside an unexplained 'hosting' markup.
- Venue owns domain, customer-facing content, CMS and production hosting accounts. Provide an agreed code handover/licence and offboarding process in the contract.
- VAT: show whether the supplier is VAT registered; add VAT only if applicable.
- No purchase, account creation, DNS change or public launch without explicit authorisation.

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
- Exact site scope, publication frequency, chef user count and CMS approval/scheduling requirements?
- Whether £3,250 + £95/month is the right positioning for this particular client after discovery?
