# 13. GitHub migration and protected Cloudflare Pages preview: runbook

Independent, unofficial proof of concept. Not a commissioned website. **Nothing in this runbook has been executed against GitHub or Cloudflare yet** (see status).

## Status (20 Oct 2026)

| Item | State | Evidence |
|---|---|---|
| Repository `Kenway-Creative/Kenway-Creations` visibility | **UNVERIFIED** (last known public: treat as public) | Could not be checked, see blocker |
| Active GitHub account / push permission | **UNVERIFIED** | `gh auth status`: `GH_TOKEN` is invalid; `add_repo` (push) refused: "you need push access to kenway-creative/kenway-creations" |
| Push to GitHub | **NOT DONE (deliberately)**: no push until privacy is confirmed | – |
| Local audit, tests, production build | Done (see "Local audit") | commands below |
| Local commit on `main` | Prepared locally only (no remote configured) | `git log` |
| Cloudflare project / Access | **Not created.** No Cloudflare access from this environment | – |

### Blocker: GitHub access (owner actions)

1. Connect or reconnect GitHub for the account that should push, at <https://claude.ai/connect-github>. That account must have **write access** to `Kenway-Creative/Kenway-Creations`.
2. Make sure the **Claude GitHub App is installed on the `Kenway-Creative` organisation** with this repository selected (an organisation owner can do this from the same page).
3. A session's repositories are chosen when it starts, so if the repository still cannot be attached, start a new session with it selected.
4. In GitHub: *Settings → General → Danger Zone → Change visibility → Private.* **This must be done before the first push.**
5. Tell me when done. I will then run the preflight below. I will not use any other credential and will not push on an unconfirmed repository.

### Preflight to run once access exists (nothing is pushed until all pass)

```bash
gh auth status                                   # account must be Kenway-Creative; token never printed
gh repo view Kenway-Creative/Kenway-Creations \
  --json visibility,isPrivate,viewerPermission,isEmpty,defaultBranchRef,url
#   required: isPrivate=true, visibility=PRIVATE, viewerPermission in (WRITE, MAINTAIN, ADMIN)
gh api repos/Kenway-Creative/Kenway-Creations/commits --jq 'length'   # empty repo returns an error/0; otherwise inspect and reconcile (no force-push)
```

## Local audit (done)

- `.gitignore` covers `node_modules`, `dist`, `.astro`, `.env`, `.env.*` (but not `.env.example`), `assets-src/`, `src/assets/venue/`.
- No nested repositories; no remotes configured; branch renamed to `main`.
- 32 files staged (about 251 KB including the lockfile), all source, tests and docs, added by explicit path, not `git add .`. The secret and personal-data scans were run on the candidate files and again on the staged diff.
- Scans of those files: no tokens/keys/private keys, no email addresses, no files over 200 KB, no recordings, PDFs or images. The only personal-looking items are the venue's public phone number and sandbox path mentions in docs.
- **Deliberately excluded:** `node_modules/`, `dist/`, `.astro/`, any `.env`, `assets-src/` (venue originals, none present yet), `src/assets/venue/` (venue photos, none yet), screenshots, scratchpad files, test tooling (Playwright/axe/Lighthouse live outside the project).
- No real customer data exists anywhere; the booking demo uses fictional availability and sends/stores nothing.

## Push sequence (after privacy is confirmed)

```bash
cd /home/user/horse-shepshed
git remote add origin https://github.com/Kenway-Creative/Kenway-Creations.git   # only if no origin exists
git push -u origin main
git push origin holding            # the innocuous holding branch, see below
gh repo view Kenway-Creative/Kenway-Creations --json isPrivate,defaultBranchRef
git ls-remote origin               # confirm the commit SHA on GitHub equals local HEAD
```

If the remote already has commits: `git fetch origin`, inspect, then merge or rebase. Never force-push or delete history.

## Cloudflare Pages: secure-by-construction sequence

**Hazard:** a Pages project gets a public `<project>.pages.dev` hostname, plus a hostname per branch and per commit. Connecting the repository triggers a first build immediately. So the first thing Cloudflare builds must be harmless, and no full-prototype deployment may exist until Access is verified.

**Design:** a separate orphan branch `holding` (prepared locally) contains only a one-page notice with no venue name, assets or prototype content. It is the production branch until protection is verified.

| # | Step | Notes |
|---|---|---|
| 1 | Cloudflare account owned by Kenway Creative. Free plan is expected to be sufficient (Pages, and Zero Trust Access for a small named list); **confirm current limits** before relying on them | No Workers, Functions, KV, D1 or other runtime services |
| 2 | Workers & Pages → Create → Pages → **Connect to Git** → GitHub → grant the Cloudflare app **"Only select repositories": `Kenway-Creations`** | Do not grant access to all repositories |
| 3 | Project name `horse-concept-preview` (nothing that looks official). **Production branch: `holding`** | Not `main` |
| 4 | Framework preset **Astro**; build command `npm run build`; output directory `dist`; root directory `/`; install `npm ci` (lockfile present; Cloudflare uses it automatically) | Environment variable `NODE_VERSION=22.22.0`. `.node-version` is committed too. Astro 7 requires Node ≥ 22.22.0: **confirm the Pages build image supports it** |
| 5 | Immediately after creation: *Settings → Builds → Branch control* → **Preview branches: None**; *Automatic production deployments* stays on `holding` only | Stops any non-production branch building |
| 6 | *Settings → General → Enable access policy* (Cloudflare's own control for `*.pages.dev` and preview deployments). Then, in **Zero Trust → Access → Applications**, check there are applications covering **both** `horse-concept-preview.pages.dev` **and** `*.horse-concept-preview.pages.dev`. If either is missing, create a self-hosted application for it | Cloudflare's wording on whether the setting also gates the main domain differs between sources: **do not rely on it; test it** |
| 7 | Policy on every application: **Allow → Emails** (explicit list supplied by the owner, not invented); login method **One-time PIN**; **no** Bypass, Everyone, Service Auth or IP-allow rules; session length 24 h | A decision for the owner: who may view |
| 8 | Run the protection tests below | Pass/fail evidence required |
| 9 | Only if all pass: *Settings → Builds → Branch control* → production branch `main`; preview branches **All non-production branches** (or a `feature/*` pattern). Trigger a build of `main` | Previews now protected by the wildcard application |
| 10 | Re-run the protection tests against the first real deployment's hostnames, then Phase E checks as an authorised user | |

**Not now:** custom domains (the live Horse domain is never connected). Known Pages limits to remember: no wildcard custom domains, and a custom domain cannot be added while an Access policy already covers it (add it first, then protect), per Cloudflare's known-issues page as summarised by search; verify before any custom domain work.

### Protection tests (fresh, unauthenticated; no cookies, private window or `curl`)

Expected for every URL: a redirect to the Cloudflare Access login (`*.cloudflareaccess.com` or `/cdn-cgi/access/...`), **HTTP 302/401/403, and none of the site's content** (the body must not contain `Unofficial concept`, `Good food`, or the holding text).

```bash
P=horse-concept-preview
for h in "$P.pages.dev" "main.$P.pages.dev" "holding.$P.pages.dev" "<8-char-commit-hash>.$P.pages.dev"; do
  for path in / /book/ /menus/ /robots.txt "/_astro/<an-asset-filename>"; do
    code=$(curl -s -o /tmp/body -w "%{http_code} %{redirect_url}" "https://$h$path")
    leak=$(grep -ciE "unofficial concept|good food|horse" /tmp/body)
    echo "$h$path -> $code | content leaked: $leak"
  done
done
```

Pass = every line is a redirect/deny with `content leaked: 0`. Then, in a separate browser, sign in as **one explicitly authorised email** and confirm the full site loads, and sign in as an **unlisted email** and confirm refusal. Record results in `docs/11-qa-report.md`. If *anything* leaks: disable the deployment immediately (Pages → deployment → delete, or pause the project), fix the policy, and re-test before continuing.

Note: this sandbox's network policy may not allow `*.pages.dev`; if so, the owner runs the tests and reports the output.

## The holding branch (prepared locally, not pushed)

Orphan branch `holding`: `package.json` with `"build": "node build.mjs"`, `build.mjs` writes `dist/index.html` (a neutral "private preview" notice with `noindex`), `package-lock.json`, `.gitignore`. No dependencies, no venue content.

## Phase E: after a protected deployment exists

As an authorised user: homepage loads; `/book/` works; `/menus/` links; fonts render (self-hosted); navigation and the mobile layout; booking is a demonstration (labelled, nothing sent); the Toast widget slot is empty (`ToastWidget.astro` has no snippet); axe and console clean; every preview route still refuses an unauthenticated visitor. No live Horse domain, no real reservations or payments.

## Development workflow (Phase F)

- `main` is the baseline: no direct pushes once the repository exists; changes arrive by short-lived `feature/<topic>` branches and pull requests when practical (one small PR per design task, V2, V3…). Enable branch protection or a ruleset on `main` (require PR, block force-push and deletion) **if the GitHub plan supports it for private repositories**; otherwise follow the convention.
- Preview builds for feature branches only after step 9, with the wildcard Access application verified.
- Repeatable release: PR merged to `main` → Cloudflare builds `main` → protection tests re-run only if hostnames or Access settings changed.
- No other bureaucracy (no CI pipeline) until needed; `npm test` and `npm run build` are the gates before a PR.

## Manual actions needed from the owner

1. Fix GitHub access (connect, App on the org, repository selected) and confirm the repository is **Private**.
2. Create/own the Cloudflare account; authorise the Cloudflare GitHub app for the one repository.
3. Supply the **email addresses** allowed through Access.
4. Run or approve the protection tests, and confirm the Node version is supported by the Pages build image.
