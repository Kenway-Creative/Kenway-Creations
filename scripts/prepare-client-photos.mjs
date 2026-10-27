// Turns the owner-supplied originals in src/assets/venue/ into the optimised client-*.webp files the site prefers.
// Real photographs only: crop, resize, light sharpen. Nothing is generated or invented. Idempotent; safe to re-run.
import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const dir = new URL('../src/assets/venue/', import.meta.url);

// Crops are { left, top, width, height } in source pixels. `scale` upscales small sources with Lanczos before a gentle sharpen.
const photos = [
  { out: 'client-exterior.webp', src: 'Exterior.png', width: 1500 },
  { out: 'client-sign.webp', src: 'The Horse Sign.png', width: 1200 },
  { out: 'client-garden.webp', src: 'Exterior Seating.png', width: 1500 },
  { out: 'client-dining.webp', src: 'Interior Table.png', width: 1500 },
  // Trio: crop to 4:5, dropping the wine glass (top-left), bottle (top) and the diner's lap (bottom).
  { out: 'client-roast-plate-1.webp', src: 'Sunday Roast - Trio.jpg', crop: { left: 100, top: 85, width: 1008, height: 1260 }, width: 960 },
  { out: 'client-roast-board-1.webp', src: 'Sunday Roast - Beef.jpg', width: 960 },
  { out: 'client-katsu-1.webp', src: 'Pork Belly Katsu - Starter.jpg', width: 960 },
  { out: 'client-hash-1.webp', src: 'Potato Hash - Starter.jpg', width: 960 },
  { out: 'client-hash-2.webp', src: 'Potato Hash - Starter 2.jpg', width: 960 },
];

for (const p of photos) {
  const raw = await readFile(new URL(p.src, dir));
  let img = sharp(raw).rotate();
  if (p.crop) img = img.extract(p.crop);
  const buf = await img
    .resize({ width: p.width, kernel: 'lanczos3' })
    .sharpen({ sigma: 0.6, m1: 0.5, m2: 1.5 })
    .webp({ quality: 82, effort: 5 })
    .toBuffer();
  await writeFile(new URL(p.out, dir), buf);
  const m = await sharp(buf).metadata();
  console.log(p.out.padEnd(28), `${m.width}x${m.height}`, `${Math.round(buf.length / 1024)} KB`);
}
