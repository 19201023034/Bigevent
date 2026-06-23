/**
 * optimize-images.mjs
 * Kompresja obrazów JPEG i PNG w folderze public/.
 * Nadpisuje pliki w miejscu — nie trzeba zmieniać ścieżek w kodzie.
 *
 * Uruchom: node scratch/optimize-images.mjs
 */

import sharp from 'sharp';
import { readdir, stat, rename } from 'fs/promises';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PUBLIC_DIR = join(__dirname, '..', 'public');

// Pliki do pominięcia (favikony, ikony PWA — muszą mieć dokładne wymiary)
const SKIP = new Set([
  'favicon.png',
  'apple-touch-icon.png',
  'icon-192.png',
  'icon-512.png',
  'og-image.png', // zostawiamy oryginał OG
]);

const JPEG_QUALITY = 82;   // dobry balans jakość/rozmiar
const PNG_QUALITY  = { quality: 80, effort: 6 };  // oxipng-like
const MAX_WIDTH    = 1920; // nie skaluj w górę, przytnij tylko większe

async function formatBytes(bytes) {
  return (bytes / 1024).toFixed(1) + ' KB';
}

async function processFile(filePath) {
  const name = basename(filePath);
  const ext  = extname(name).toLowerCase();

  if (SKIP.has(name)) {
    console.log(`  ⏭  skip   ${name}`);
    return;
  }

  const before = (await stat(filePath)).size;
  const tmpPath = filePath + '.tmp';

  try {
    const img = sharp(filePath);
    const meta = await img.metadata();

    // Skaluj w dół jeśli szerszy niż MAX_WIDTH
    let pipeline = img;
    if (meta.width && meta.width > MAX_WIDTH) {
      pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    }

    if (ext === '.jpg' || ext === '.jpeg') {
      await pipeline
        .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
        .toFile(tmpPath);
    } else if (ext === '.png') {
      await pipeline
        .png({ ...PNG_QUALITY, compressionLevel: 9 })
        .toFile(tmpPath);
    } else {
      return; // nie obsługujemy SVG, webp itp.
    }

    const after = (await stat(tmpPath)).size;

    // Zaakceptuj tylko jeśli plik faktycznie zmalał
    if (after < before) {
      await rename(tmpPath, filePath);
      const saved = ((1 - after / before) * 100).toFixed(1);
      console.log(`  ✅ ${name.padEnd(55)} ${await formatBytes(before)} → ${await formatBytes(after)}  (-${saved}%)`);
    } else {
      // Plik już był optymalny — usuń tmp
      const { unlink } = await import('fs/promises');
      await unlink(tmpPath);
      console.log(`  ➡  ${name.padEnd(55)} ${await formatBytes(before)} (już optymalny)`);
    }
  } catch (err) {
    console.error(`  ❌ Błąd przy ${name}: ${err.message}`);
    try {
      const { unlink } = await import('fs/promises');
      await unlink(tmpPath).catch(() => {});
    } catch {}
  }
}

async function main() {
  console.log(`\n🖼  Optymalizacja obrazów w: ${PUBLIC_DIR}\n`);

  const files = await readdir(PUBLIC_DIR);
  const images = files.filter(f => /\.(jpe?g|png)$/i.test(f));

  if (images.length === 0) {
    console.log('Brak obrazów do optymalizacji.');
    return;
  }

  for (const file of images) {
    await processFile(join(PUBLIC_DIR, file));
  }

  console.log('\n✔  Gotowe!\n');
}

main().catch(err => {
  console.error('Nieoczekiwany błąd:', err);
  process.exit(1);
});
