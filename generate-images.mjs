import sharp from 'sharp';
import { writeFileSync } from 'fs';

// ── OG Image SVG (1200×630) ──────────────────────────────────────────────────
const ogSVG = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bg" cx="30%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#141414"/>
      <stop offset="100%" stop-color="#0C0C0C"/>
    </radialGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ADD034" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#ADD034" stop-opacity="0"/>
    </radialGradient>
    <filter id="blur"><feGaussianBlur stdDeviation="32"/></filter>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- LED pixel grid -->
  ${Array.from({length: 32}, (_,row) =>
    Array.from({length: 60}, (_,col) => {
      const o = (Math.sin(col*0.4+row*0.6)*0.3 + 0.12).toFixed(2);
      return `<rect x="${col*20+1}" y="${row*20+1}" width="8" height="8" rx="1" fill="#ADD034" opacity="${o}"/>`;
    }).join('')
  ).join('')}

  <!-- Overlay fade -->
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect width="1200" height="630" fill="#0C0C0C" opacity="0.62"/>

  <!-- Left accent bar -->
  <rect x="80" y="140" width="3" height="350" rx="2" fill="#ADD034" opacity="0.9"/>

  <!-- BigEvent wordmark -->
  <text x="110" y="220" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="88" fill="#FFFFFF" letter-spacing="-3">BigEvent</text>

  <!-- Tagline -->
  <text x="110" y="288" font-family="Arial, sans-serif" font-weight="400" font-size="28" fill="#ADD034" letter-spacing="4">EKRANY LED · STUDIO FILMOWE · EVENTY</text>

  <!-- Description -->
  <text x="110" y="360" font-family="Arial, sans-serif" font-size="24" fill="#B0AFA8">Wynajem ekranów LED na targi, konferencje i eventy.</text>
  <text x="110" y="396" font-family="Arial, sans-serif" font-size="24" fill="#B0AFA8">Studio wirtualnej produkcji 4K. Aachen, Niemcy.</text>

  <!-- Stats -->
  <rect x="110" y="460" width="180" height="80" rx="8" fill="#1C1C1C" stroke="#ADD034" stroke-width="0.8" stroke-opacity="0.4"/>
  <text x="200" y="495" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="30" fill="#ADD034">500+</text>
  <text x="200" y="522" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" fill="#606058">eventów</text>

  <rect x="310" y="460" width="180" height="80" rx="8" fill="#1C1C1C" stroke="#ADD034" stroke-width="0.8" stroke-opacity="0.4"/>
  <text x="400" y="495" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="30" fill="#ADD034">1500m²</text>
  <text x="400" y="522" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" fill="#606058">paneli LED</text>

  <rect x="510" y="460" width="180" height="80" rx="8" fill="#1C1C1C" stroke="#ADD034" stroke-width="0.8" stroke-opacity="0.4"/>
  <text x="600" y="495" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="30" fill="#ADD034">4K</text>
  <text x="600" y="522" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" fill="#606058">rozdzielczość</text>

  <!-- Domain -->
  <text x="1120" y="590" text-anchor="end" font-family="Arial, sans-serif" font-size="18" fill="#606058">bigevent.de</text>

  <!-- Right glow accent -->
  <ellipse cx="980" cy="315" rx="280" ry="220" fill="#ADD034" opacity="0.04" filter="url(#blur)"/>
</svg>`;

// ── Favicon SVG (32×32) ────────────────────────────────────────────────────
const faviconSVG = `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" rx="6" fill="#0C0C0C"/>
  <rect x="2" y="2" width="28" height="28" rx="5" fill="#141414"/>
  <!-- B letterform in lime -->
  <text x="16" y="23" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="20" fill="#ADD034">B</text>
  <!-- Lime corner dot -->
  <circle cx="27" cy="6" r="3" fill="#ADD034"/>
</svg>`;

// ── Apple Touch Icon SVG (180×180) ─────────────────────────────────────────
const appleSVG = `<svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
  <rect width="180" height="180" rx="40" fill="#0C0C0C"/>
  <!-- LED pixel grid bg -->
  ${Array.from({length:8}, (_,row) =>
    Array.from({length:8}, (_,col) => {
      const o = (Math.sin(col*1.1+row*0.8)*0.25 + 0.12).toFixed(2);
      return `<rect x="${col*22+4}" y="${row*22+4}" width="10" height="10" rx="2" fill="#ADD034" opacity="${o}"/>`;
    }).join('')
  ).join('')}
  <!-- Overlay -->
  <rect width="180" height="180" rx="40" fill="#0C0C0C" opacity="0.72"/>
  <!-- BigEvent B -->
  <text x="90" y="118" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="96" fill="#ADD034">B</text>
  <!-- Lime dot accent -->
  <circle cx="148" cy="36" r="10" fill="#ADD034"/>
</svg>`;

// ── Generate files ──────────────────────────────────────────────────────────
const PUBLIC = './public';

// og-image.jpg (1200×630)
await sharp(Buffer.from(ogSVG))
  .jpeg({ quality: 92, mozjpeg: true })
  .toFile(`${PUBLIC}/og-image.jpg`);
console.log('✓ og-image.jpg');

// og-image.png (also, for platforms that prefer PNG)
await sharp(Buffer.from(ogSVG))
  .png({ compressionLevel: 8 })
  .toFile(`${PUBLIC}/og-image.png`);
console.log('✓ og-image.png');

// favicon.png (32×32)
await sharp(Buffer.from(faviconSVG))
  .resize(32, 32)
  .png()
  .toFile(`${PUBLIC}/favicon.png`);
console.log('✓ favicon.png');

// apple-touch-icon.png (180×180)
await sharp(Buffer.from(appleSVG))
  .resize(180, 180)
  .png()
  .toFile(`${PUBLIC}/apple-touch-icon.png`);
console.log('✓ apple-touch-icon.png');

// Also generate 192×192 and 512×512 for PWA
await sharp(Buffer.from(appleSVG))
  .resize(192, 192)
  .png()
  .toFile(`${PUBLIC}/icon-192.png`);
console.log('✓ icon-192.png');

await sharp(Buffer.from(appleSVG))
  .resize(512, 512)
  .png()
  .toFile(`${PUBLIC}/icon-512.png`);
console.log('✓ icon-512.png');

console.log('\nWszystkie obrazy wygenerowane pomyślnie!');
