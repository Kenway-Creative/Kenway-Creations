# Archive photography provenance

Images used in the GitHub Pages concept are sourced from The Horse Shepshed's own publicly accessible WordPress media library. These are **archive photographs from 2015–2018**, and must not be represented as current menus, staff or bedroom facilities.

The GitHub Actions build runs `scripts/prepare-venue-images.mjs` after `npm ci`. It downloads and WebP-optimises selected venue images into `src/assets/venue/`, which is gitignored. The Astro `Photo.astro` component uses the images when present, and labels missing photographs as placeholders.

| Target | Public original | Use |
|---|---|---|
| hero.webp | https://www.thehorseshepshed.co.uk/wp-content/uploads/2018/11/Homepage-Slider.jpg | Existing exterior |
| food-main.webp | https://www.thehorseshepshed.co.uk/wp-content/uploads/2018/11/banner-01.jpg | Cropped archive plated food (text excluded) |
| food-pizza.webp | https://www.thehorseshepshed.co.uk/wp-content/uploads/2016/03/Lloyds-first-Pizza_n.jpg | Historical pizza preparation |
| stables-interior.webp | https://www.thehorseshepshed.co.uk/wp-content/uploads/2016/05/The-Stables-3.jpg | The Stables kitchen |
| stables-terrace.webp | https://www.thehorseshepshed.co.uk/wp-content/uploads/2016/05/The-Stables-4.jpg | The Stables outdoor seating |
| outdoor-seating.webp | https://www.thehorseshepshed.co.uk/wp-content/uploads/2016/05/The-Stables-6.jpg | Outdoor venue seating |
| team.webp | https://www.thehorseshepshed.co.uk/wp-content/uploads/2016/03/Lloyds-first-Pizza_n.jpg | Historical staff at pizza oven (avoid describing as current team) |
| barn-courtyard.webp | https://www.thehorseshepshed.co.uk/wp-content/uploads/2018/11/The-Barn.jpg | Barn Courtyard exterior |

The Sunday-lunch, Premium King and Double bedroom placeholders remain; none of the source images has been verified to depict current Sunday dishes or actual room interiors. Historic promotional graphics with dates and offers were intentionally excluded.

**Copyright and permission:** Public availability is not a licence. The concept remains unofficial. Obtain explicit permission from the owners/rightsholders before commercial use or representing this as the venue's official site. Replace archive sources with current owner-supplied originals before public launch.

## Owner-supplied photographs (client-*.webp)

The nine photographs uploaded to `src/assets/venue/` (exterior, seating, interior table, sign, two Sunday roasts, pork belly katsu, two potato hash) are processed by `scripts/prepare-client-photos.mjs` into optimised `client-*.webp` files (63–222 KB each). The Pages workflow runs it before the archive-photo step, and the generated files are committed. The large originals are inputs only and are not bundled into the site (`Photo.astro` loads `.webp` only).

| File | Source photo | Notes |
|---|---|---|
| client-exterior.webp | Exterior.png | Hero band and Find us; gently upscaled to 1500 px |
| client-sign.webp | The Horse Sign.png | Find us, story slot |
| client-garden.webp | Exterior Seating.png | "Pull up a chair" gallery |
| client-dining.webp | Interior Table.png | Dining slots |
| client-roast-plate-1.webp | Sunday Roast - Trio.jpg | **Sunday lunch card.** Cropped 4:5 to remove a glass, a bottle and a diner's lap |
| client-roast-board-1.webp | Sunday Roast - Beef.jpg | Dish gallery |
| client-katsu-1.webp, client-hash-2.webp | Katsu / Potato Hash 2 | Dish gallery |

Deliberately **not** created: `client-hash-1.webp`, so the Lunch & Evening card keeps its existing picture. "Potato Hash - Starter.jpg" is unused.

The Stables picture (`food-pizza.webp`, an archive image fetched in CI) now gets a light enhancement in `scripts/prepare-venue-images.mjs`: gentle Lanczos upscale, 3 px median denoise, slight contrast stretch, mild sharpen. No content is altered or generated. It could not be previewed in the sandbox (the venue host is blocked), so check the first deployed result.
