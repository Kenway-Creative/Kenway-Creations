// Use genuine images from The Horse's public WordPress site for the unofficial client-review build.
// These are archive photographs (2015-2018), not guaranteed to reflect the current menu, team or rooms.
// Never generate replacement photography. Do not commit the downloaded originals to the public repo.
// Confirm permission and get newer high-resolution originals before an official launch.
import { mkdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const base = 'https://www.thehorseshepshed.co.uk/wp-content/uploads/';
const output = new URL('../src/assets/venue/', import.meta.url);
// Tasteful clean-up for small archive Stables images: gentle upscale (Lanczos), light denoise, slight contrast, mild sharpen.
// No content is altered or generated.
const enhance = (img) => img.median(3).normalise({ lower: 2, upper: 98 }).sharpen({ sigma: 0.8, m1: 0.6, m2: 1.8 });
const photos = [
  { name: 'hero.webp', url: base+'2018/11/Homepage-Slider.jpg', width: 1600 },
  { name: 'food-main.webp', url: base+'2018/11/banner-01.jpg', crop: { left: 750, top: 0, width: 530, height: 508 }, width: 1060 },
  { name: 'food-pizza.webp', url: base+'2016/03/Lloyds-first-Pizza_n.jpg', width: 960, enlarge: true, enhance: true },
  { name: 'stables-interior.webp', url: base+'2016/05/The-Stables-3.jpg', width: 1100 },
  { name: 'stables-terrace.webp', url: base+'2016/05/The-Stables-4.jpg', width: 1100 },
  { name: 'outdoor-seating.webp', url: base+'2016/05/The-Stables-6.jpg', width: 1100 },
  { name: 'team.webp', url: base+'2016/03/Lloyds-first-Pizza_n.jpg', width: 960 },
  { name: 'barn-courtyard.webp', url: base+'2018/11/The-Barn.jpg', width: 1280 },
];
await mkdir(output, { recursive: true });
let successes = 0;
for (const photo of photos) {
  try {
    const response = await fetch(photo.url, { signal: AbortSignal.timeout(25000), headers: { 'User-Agent': 'Mozilla/5.0 (Kenway Creative concept review)' } });
    if (!response.ok) throw new Error('HTTP '+response.status);
    const raw = Buffer.from(await response.arrayBuffer());
    let image = sharp(raw).rotate();
    const meta = await image.metadata();
    if (!meta.width || !meta.height) throw new Error('Invalid image');
    if (photo.crop) image = image.extract(photo.crop);
    if (photo.enhance) image = enhance(image);
    const buffer = await image.resize({ width: photo.width, withoutEnlargement: !photo.enlarge, kernel: 'lanczos3' }).webp({ quality: 80, effort: 5 }).toBuffer();
    await writeFile(new URL(photo.name,output), buffer);
    successes++;
    console.log(photo.name,meta.width+'x'+meta.height,buffer.length+' bytes');
  } catch (err) {
    // Photo.astro provides a labelled placeholder when a source isn't available.
    console.warn('Photo unavailable; retaining placeholder for '+photo.name+': '+String(err));
  }
}
if (successes === 0) console.warn('No originals fetched. The site will still build with labelled placeholders.');
