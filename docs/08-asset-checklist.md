# 8. Authentic asset acquisition checklist

**Rules:** only the venue's own assets. No stock, no AI imagery, no assets from unrelated sites. Existing-site assets are **reference only until the owners grant written permission**. The preferred route is the owners sending originals (better quality than anything on the current site, and permission comes with it).

Record every file in `02-asset-manifest.md` (source URL, date, dimensions, subject, permission).

## What to request, in priority order

| # | Asset | Why it matters | Ideal spec | Replaces | Status |
|---|---|---|---|---|---|
| 1 | **Logo** (vector SVG/PDF; light and dark versions; clear-space guidance) | Brief: retain existing identity | SVG, or PNG ≥ 1200 px wide with transparency | Text wordmark in header/footer | Needed |
| 2 | **Hero image**: exterior (golden hour) or best dining-room shot | First impression and conversion | Landscape, ≥ 2400 px wide, uncompressed original | Hero placeholder | Needed |
| 3 | **Food**: 6–10 dishes/plates, incl. a Sunday roast and a pizza | Sells the meal | ≥ 2000 px, natural light, no heavy filters | 3 food cards, menu band | Needed |
| 4 | **Interior**: bar, dining room, fireside/seating, close details | Atmosphere | ≥ 2000 px, 4–6 images | Mosaic, welcome image | Needed |
| 5 | **Exterior/terrace/Barn Courtyard** | Sense of place; airport visitors | ≥ 2000 px, day and evening | Mosaic, Stay | Needed |
| 6 | **Premium King** (2–4 images) and **Double** (2–4 images), bathrooms, courtyard approach | Only authentic room imagery may be used | ≥ 2000 px, tidy, bright | Stay placeholders | Needed |
| 7 | **The Stables**: oven, pizza, space | Distinct offer | ≥ 2000 px | Stables card | Needed |
| 8 | **People**: kitchen, chef, team (with consent) | Warmth, independence | ≥ 2000 px | Story image | Optional |
| 9 | **Written permission** to use images and name in a private preview | Provenance and rights | Email is enough | – | Needed |
| 10 | **Photographer credit/licence** for existing images | Some photos may belong to a photographer | Name and terms | – | Ask |

## Delivery format to ask owners for

A shared folder (Drive/Dropbox/WeTransfer) of **original, unedited files** with a note of who took them. If no good set exists, a half-day shoot (food, rooms, exterior, interior) is the single highest-value investment for the pitch. Who commissions/pays for it is a separate commercial decision.

## If only the existing site's images are available (interim)

- Download only from `thehorseshepshed.co.uk`, from the public pages, into a private folder outside the repository's public output.
- Use in a **private, access-controlled preview shown to the owners only** (see `09-private-preview-plan.md`), never on a public URL.
- Note that web-resolution images may look soft at hero size; flag quality in the manifest.
- Do not crop out watermarks or credits.

## Implementation once assets arrive

1. Add originals to `assets-src/` (git-ignored if rights are pending), generate responsive sizes with Astro's built-in `<Image>` (AVIF/WebP, `srcset`, explicit width/height so CLS stays ~0).
2. Replace each `<Photo>` in `src/pages/index.astro` with `<Image>`; write meaningful alt text.
3. Replace the text wordmark in `SiteHeader.astro` / `Base.astro` with the supplied SVG logo.
4. Re-run Lighthouse (target: LCP < 2.5 s on mobile, CLS < 0.1).
