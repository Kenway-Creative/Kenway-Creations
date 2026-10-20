# 9. Private preview deployment plan

**Nothing is deployed. No account has been created and no spend incurred.** This is the plan for approval.

## Principles

- It is an **unofficial, independent concept**. Not commissioned or approved. The banner and `noindex` stay on every page.
- Private by default: only named people can open it. No public URL, no search indexing, no social previews.
- Zero cost. Nothing is purchased without explicit approval.
- Authentic venue assets (once permitted) appear **only** in the access-controlled preview.
- The live website is never touched; no DNS, domain or account of the venue is involved.

## Options

| Option | Access control | Cost | Notes |
|---|---|---|---|
| **1. Show it locally** (`npm run build`, then `npm run preview` on a laptop, or a screen-share) | Physical | £0 | Zero exposure. Best for the first conversation in person |
| **2. Zipped static build** (`dist/`) sent to the owners | Whoever has the file | £0 | They can open `index.html` via a local server only (root-relative links), so send a ready-to-run folder or a screen recording |
| **3. Static host + identity gate (Cloudflare Pages + Cloudflare Access)** | Email one-time PIN limited to named addresses | Reported free for small teams (Cloudflare's announcement cites 50 seats on the free tier). **Verify current terms before signing up** | Needs a Cloudflare account; preview URLs persist until deleted, so the Access policy must cover *all* hostnames |
| 4. Password-protected hosting on other platforms | Shared password | Often a paid feature | **Do not use without approval** |

**Recommendation:** start with Option 1 plus a short screen recording; if the owners want to look on their phones, set up Option 3 after you approve creating the account.

## Steps for Option 3 (when approved)

1. Create the host account under your identity (not the venue's). Use a project name that does not imitate an official site (e.g. `horse-concept-preview`).
2. Connect a **private** Git repository; confirm `.env` is git-ignored and no secrets exist (`git grep -i -E "key|token|secret"`).
3. Build with `npm run build`; publish `dist/`.
4. Add a Cloudflare Access application covering the production **and** preview hostnames with an allow-list of the named email addresses only.
5. Test as an unlisted address (must be refused) and from a private window.
6. Confirm `X-Robots-Tag`/`noindex` and that `robots.txt` disallows all (add `public/robots.txt` at that point).
7. Remove third-party content not permitted yet (venue logo/photos) unless written permission exists.
8. Share the link only with approved recipients; set an expiry/review date; delete the project afterwards if not proceeding.

## Pre-publication checklist

- [ ] You have approved hosting, name and recipients
- [ ] Written permission for any venue assets, or placeholders only
- [ ] Banner reads "unofficial concept; not commissioned, approved or endorsed"
- [ ] No cookies, analytics or third-party scripts (Toast widget **not** connected)
- [ ] Demo booking is clearly labelled; no real emails sent, no payments, no customer data
- [ ] Access list tested; unlisted users refused
- [ ] Rollback: delete the project/deployment
