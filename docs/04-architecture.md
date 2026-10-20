# 4. Technology recommendation

**Choice: Astro (static output, TypeScript where useful), self-hosted fonts, no UI framework, no database, no CMS in phase 1.**

| Criterion | A. Next.js + managed CMS | B. Static frontend + headless CMS (Astro) | C. Modernised WordPress |
|---|---|---|---|
| Performance / CWV | Good, but ships a React runtime | **Best** – near-zero JS by default | Depends heavily on theme/plugins |
| SEO | Good | Good (pre-rendered HTML) | Good with plugins |
| Accessibility control | Full | **Full** | Theme-dependent |
| Editing simplicity | CMS-dependent | Menus/events from Toast or a small content file; CMS can be added later | Familiar, but more to maintain |
| Long-term maintenance | Framework upgrades, hosting runtime | **Lowest** – static files, nothing to patch at runtime | Constant core/plugin/security updates |
| Hosting cost | Free–£20/mo | **£0–£5/mo** (static host) | £10–£40/mo managed hosting |
| Toast integration | Fine | **Fine – Toast Tables widget/link is plain HTML/JS; menu data can be fetched at build time if API access is granted** | Fine, via plugins |
| Reusable for other venues | Yes | **Yes** – shared components, content files per venue | Possible, heavier |

**Why not more:** a managed CMS, database or auth is not justified until the owners confirm who edits what. If Toast is the menu source of truth, no separate menu editor is needed. If it isn't, the lightest option is a small Git-based or hosted CMS added in phase 2.

**Animation:** CSS transitions + one `IntersectionObserver` (already in the layout). GSAP not used: no experience benefit justifies the dependency. `prefers-reduced-motion` respected.

**Hosting (UK small business; costs in `06-costs.md`):** static hosting on Cloudflare Pages, Netlify or Vercel's free tiers is adequate; all serve from a global CDN including UK edges. Domain stays with the owners. Verify current free-tier limits at purchase time; they change.

**Environments:** local `npm run dev`; per-branch preview URLs from the host; production = the owner's domain, switched only with permission. Secrets never in Git (`.env` ignored; only `PUBLIC_` values reach the browser).

**Dependencies today:** `astro`, `@fontsource-variable/fraunces`, `@fontsource-variable/hanken-grotesk`. Nothing else at runtime.

## Design system (summary)

- **Palette** (exploratory): ivory `#F2EBDD`, forest `#253A2E`, clay `#784C3A`, brass `#C49A61`, charcoal `#252623`. Brass is for decoration/large text on ivory only (contrast < 4.5:1); on forest it passes.
- **Type:** Fraunces (variable, optical sizing) for headings with italic accents; Hanken Grotesk for body. Fluid scale via `clamp()`. Logo to be dropped in as supplied.
- **Motion:** 0.8 s fade/rise on scroll, hover lifts on buttons. No parallax.
- **A11y:** skip link, visible 3 px focus ring, 48 px minimum targets, labelled form controls, step headings receive focus in the booking flow, `aria-live` step announcements.
- Tokens are CSS variables at the top of `src/styles/global.css`.
