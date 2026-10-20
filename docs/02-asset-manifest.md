# 2. Asset manifest (first-party venue assets)

**Status 20 Oct 2026: URLs recorded, none retrieved.** GPT recovered these from the public site. Every attempt from this sandbox failed at the network layer (no HTTP response; DNS lookup fails), so **no file has been downloaded, reviewed or used**. No workaround was attempted. Local copies are needed (see below).

Rules: all assets are the venue's own and are **reference/prototype material pending written permission**. Use only in the private local build; never on a public URL. No AI-generated or unrelated stock imagery. Don't reuse text baked into banners as the new site's design language. Keep the logo as a placeholder until an authentic, usable logo is supplied.

"Date" below is the **WordPress upload folder in the URL** (year/month the file was uploaded), not the date a photo was taken.

| ID | Type | Original URL | Upload folder | Retrieved? | Intended use (proposed) | Quality review |
|---|---|---|---|---|---|---|
| A1 | Exterior photo (PNG) | https://www.thehorseshepshed.co.uk/wp-content/uploads/2015/10/DSC_0420.png | 2015-10 | **No – blocked** | Hero or welcome image, if resolution and composition hold up | Not reviewed (a 2015 file; check size, light, cars/signage) |
| A2 | Food banner (JPG) | https://www.thehorseshepshed.co.uk/wp-content/uploads/2018/11/banner-01.jpg | 2018-11 | **No – blocked** | Food section imagery, only if it can be cropped to remove any baked-in text | Not reviewed (banner crops are usually low-height) |
| A3 | Breakfast and venue banner (JPG) | https://www.thehorseshepshed.co.uk/wp-content/uploads/2018/11/banner-02.jpg | 2018-11 | **No – blocked** | Atmosphere section; same text/crop caveat | Not reviewed |
| P1 | Page | https://www.thehorseshepshed.co.uk/about-us/ | – | No | Verify venue wording and claims | – |
| P2 | Page | https://www.thehorseshepshed.co.uk/the-barn-courtyard/ | – | No | Room facts and any room photography (none listed yet) | – |
| M1 | Menu PDF | https://www.thehorseshepshed.co.uk/wp-content/uploads/2025/10/2025-MAIN-MENU.pdf | 2025-10 | **No – blocked** | Demonstration menu content (every item/price "subject to restaurant confirmation") | Not extracted |
| M2 | Menu PDF | https://www.thehorseshepshed.co.uk/wp-content/uploads/2025/10/2025-Sunday-Lunch-Menu.pdf | 2025-10 | **No – blocked** | Same, Sunday lunch | Not extracted |
| L1 | Logo | – | – | **No source yet** | Header/footer | Text wordmark placeholder stays |

## What I need from you

Save these into `/home/user/horse-shepshed/assets-src/original/` (any way that works for you: download in a browser, then upload or paste into the session): **DSC_0420.png, banner-01.jpg, banner-02.jpg, 2025-MAIN-MENU.pdf, 2025-Sunday-Lunch-Menu.pdf**, plus the saved text of the About and Barn Courtyard pages if convenient. Original, full-resolution files are better than screenshots.

## Pipeline once files arrive (already wired)

1. `identify` for dimensions and format; view each image; record quality and composition above.
2. Copy chosen images to `src/assets/venue/` (git-ignored). `Photo.astro` picks up `asset="file.jpg"` automatically and serves responsive WebP with `srcset`; otherwise it shows the labelled placeholder. Tested with a generated fixture (removed).
3. Write real `alt` text per image (the default falls back to the placeholder label).
4. Extract menus with `pdftotext -layout`; build demonstration content with a visible "subject to restaurant confirmation" label.
