import fs from 'fs';
import zlib from 'zlib';

const buf = fs.readFileSync('public/mindtech_extracted.png');
const width = buf.readUInt32BE(16);
const height = buf.readUInt32BE(20);

let idatChunks = [];
let offset = 8;
while (offset < buf.length) {
  let len = buf.readUInt32BE(offset);
  let type = buf.toString('ascii', offset + 4, offset + 8);
  if (type === 'IDAT') idatChunks.push(buf.subarray(offset + 8, offset + 8 + len));
  offset += 12 + len;
}

const idatData = Buffer.concat(idatChunks);
const rawData = zlib.inflateSync(idatData);
const stride = 1 + width * 4;

const pixels = new Uint8ClampedArray(width * height * 4);
for (let y = 0; y < height; y++) {
  const filterType = rawData[y * stride];
  const rowStart = y * stride + 1;
  const outRowStart = y * width * 4;

  for (let x = 0; x < width * 4; x++) {
    const rawVal = rawData[rowStart + x];
    let a = x >= 4 ? pixels[outRowStart + x - 4] : 0;
    let b = y > 0 ? pixels[(y - 1) * width * 4 + x] : 0;
    let c = (x >= 4 && y > 0) ? pixels[(y - 1) * width * 4 + x - 4] : 0;

    let val = 0;
    if (filterType === 0) val = rawVal;
    else if (filterType === 1) val = (rawVal + a) & 0xff;
    else if (filterType === 2) val = (rawVal + b) & 0xff;
    else if (filterType === 3) val = (rawVal + Math.floor((a + b) / 2)) & 0xff;
    else if (filterType === 4) {
      let p = a + b - c;
      let pa = Math.abs(p - a);
      let pb = Math.abs(p - b);
      let pc = Math.abs(p - c);
      let pr = (pa <= pb && pa <= pc) ? a : (pb <= pc ? b : c);
      val = (rawVal + pr) & 0xff;
    }
    pixels[outRowStart + x] = val;
  }
}

// CRC32
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  crcTable[n] = c;
}
function crc32(b) {
  let c = 0xffffffff;
  for (let i = 0; i < b.length; i++) c = crcTable[(c ^ b[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crc]);
}
function encodePNG(w, h, rgba) {
  const raw = Buffer.alloc(h * (1 + w * 4));
  for (let y = 0; y < h; y++) {
    raw[y * (1 + w * 4)] = 0;
    for (let x = 0; x < w * 4; x++) {
      raw[y * (1 + w * 4) + 1 + x] = rgba[y * w * 4 + x];
    }
  }
  const compressed = zlib.deflateSync(raw);
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  return Buffer.concat([signature, makeChunk('IHDR', ihdr), makeChunk('IDAT', compressed), makeChunk('IEND', Buffer.alloc(0))]);
}

// Emblem exact bounds: minX: 46, maxX: 869, minY: 47, maxY: 643
const emblemMinX = 46;
const emblemMaxX = 869;
const emblemMinY = 47;
const emblemMaxY = 643;

const centerX = (emblemMinX + emblemMaxX) / 2; // 457.5
const centerY = (emblemMinY + emblemMaxY) / 2; // 345

// Let square size be 840 so the emblem fills the space cleanly
const cropSize = 840;
const startX = Math.round(centerX - cropSize / 2);
const startY = Math.round(centerY - cropSize / 2);

// Clean crop
const cropped = new Uint8ClampedArray(cropSize * cropSize * 4);
for (let y = 0; y < cropSize; y++) {
  const srcY = startY + y;
  for (let x = 0; x < cropSize; x++) {
    const srcX = startX + x;
    const destIdx = (y * cropSize + x) * 4;
    if (srcX >= 0 && srcX < width && srcY >= 0 && srcY <= 644) {
      const srcIdx = (srcY * width + srcX) * 4;
      cropped[destIdx] = pixels[srcIdx];
      cropped[destIdx + 1] = pixels[srcIdx + 1];
      cropped[destIdx + 2] = pixels[srcIdx + 2];
      cropped[destIdx + 3] = pixels[srcIdx + 3];
    } else {
      cropped[destIdx + 3] = 0;
    }
  }
}

// High quality resampling function
function resample(src, sw, sh, dw, dh) {
  const dest = new Uint8ClampedArray(dw * dh * 4);
  const xRatio = sw / dw;
  const yRatio = sh / dh;

  for (let dy = 0; dy < dh; dy++) {
    for (let dx = 0; dx < dw; dx++) {
      const sx0 = Math.floor(dx * xRatio);
      const sx1 = Math.min(sw - 1, Math.ceil((dx + 1) * xRatio));
      const sy0 = Math.floor(dy * yRatio);
      const sy1 = Math.min(sh - 1, Math.ceil((dy + 1) * yRatio));

      let rSum = 0, gSum = 0, bSum = 0, aSum = 0, count = 0;
      for (let sy = sy0; sy <= sy1; sy++) {
        for (let sx = sx0; sx <= sx1; sx++) {
          const idx = (sy * sw + sx) * 4;
          const a = src[idx + 3] / 255;
          rSum += src[idx] * a;
          gSum += src[idx + 1] * a;
          bSum += src[idx + 2] * a;
          aSum += src[idx + 3];
          count++;
        }
      }
      const destIdx = (dy * dw + dx) * 4;
      const avgA = aSum / count;
      dest[destIdx + 3] = Math.round(avgA);
      if (avgA > 0) {
        dest[destIdx] = Math.round((rSum / count) / (avgA / 255));
        dest[destIdx + 1] = Math.round((gSum / count) / (avgA / 255));
        dest[destIdx + 2] = Math.round((bSum / count) / (avgA / 255));
      }
    }
  }
  return dest;
}

// 1. Generate clean transparent emblem PNGs at 512, 192, 180, 48, 32, 16
const emblem512 = resample(cropped, cropSize, cropSize, 512, 512);
const emblem192 = resample(cropped, cropSize, cropSize, 192, 192);
const emblem180 = resample(cropped, cropSize, cropSize, 180, 180);
const emblem48 = resample(cropped, cropSize, cropSize, 48, 48);
const emblem32 = resample(cropped, cropSize, cropSize, 32, 32);
const emblem16 = resample(cropped, cropSize, cropSize, 16, 16);

// Encode transparent emblem to base64 for embedding inside SVG
const rawEmblem512PNG = encodePNG(512, 512, emblem512);
const emblem512Base64 = rawEmblem512PNG.toString('base64');

// 2. High-precision antialiased squircle badge renderer in pure math
function renderBadge(size) {
  const canvas = new Uint8ClampedArray(size * size * 4);
  const r = size * 0.22; // corner radius
  const borderWidth = Math.max(1.5, size * 0.035);
  const halfSize = size / 2;

  for (let y = 0; y < size; y++) {
    const py = y + 0.5; // pixel center
    for (let x = 0; x < size; x++) {
      const px = x + 0.5;
      const idx = (y * size + x) * 4;

      // Distance from center
      const qx = Math.abs(px - halfSize) - (halfSize - r);
      const qy = Math.abs(py - halfSize) - (halfSize - r);

      // Signed distance function for rounded box
      let distInside = 0;
      if (qx > 0 && qy > 0) {
        distInside = r - Math.sqrt(qx * qx + qy * qy);
      } else {
        distInside = Math.min(halfSize - Math.abs(px - halfSize), halfSize - Math.abs(py - halfSize));
      }

      // Smoothstep coverage alpha
      let alpha = 0;
      if (distInside > 0.5) alpha = 1;
      else if (distInside > -0.5) alpha = distInside + 0.5;

      if (alpha > 0) {
        // Border smooth coverage
        let borderAlpha = 0;
        const distFromBorder = distInside - borderWidth;
        if (distFromBorder < -0.5) borderAlpha = 1;
        else if (distFromBorder < 0.5) borderAlpha = 0.5 - distFromBorder;

        // Background: pure clean white #ffffff
        // Border: vibrant emerald #10b981
        const borderR = 16, borderG = 185, borderB = 129;
        const bgR = 255, bgG = 255, bgB = 255;

        canvas[idx] = Math.round(borderR * borderAlpha + bgR * (1 - borderAlpha));
        canvas[idx + 1] = Math.round(borderG * borderAlpha + bgG * (1 - borderAlpha));
        canvas[idx + 2] = Math.round(borderB * borderAlpha + bgB * (1 - borderAlpha));
        canvas[idx + 3] = Math.round(255 * alpha);
      }
    }
  }

  // Composite emblem into center (fills 80% of badge)
  const emblemSize = Math.round(size * 0.80);
  const emblemResampled = resample(cropped, cropSize, cropSize, emblemSize, emblemSize);
  const offsetX = Math.round((size - emblemSize) / 2);
  const offsetY = Math.round((size - emblemSize) / 2);

  for (let y = 0; y < emblemSize; y++) {
    for (let x = 0; x < emblemSize; x++) {
      const srcIdx = (y * emblemSize + x) * 4;
      const destIdx = ((offsetY + y) * size + (offsetX + x)) * 4;
      const sa = emblemResampled[srcIdx + 3] / 255;
      if (sa > 0) {
        const sr = emblemResampled[srcIdx];
        const sg = emblemResampled[srcIdx + 1];
        const sb = emblemResampled[srcIdx + 2];
        const da = canvas[destIdx + 3] / 255;
        const outA = sa + da * (1 - sa);
        if (outA > 0) {
          canvas[destIdx] = Math.round((sr * sa + canvas[destIdx] * da * (1 - sa)) / outA);
          canvas[destIdx + 1] = Math.round((sg * sa + canvas[destIdx + 1] * da * (1 - sa)) / outA);
          canvas[destIdx + 2] = Math.round((sb * sa + canvas[destIdx + 2] * da * (1 - sa)) / outA);
          canvas[destIdx + 3] = Math.round(outA * 255);
        }
      }
    }
  }

  return canvas;
}

const badged512 = encodePNG(512, 512, renderBadge(512));
const badged192 = encodePNG(192, 192, renderBadge(192));
const badged180 = encodePNG(180, 180, renderBadge(180));
const badged48 = encodePNG(48, 48, renderBadge(48));
const badged32 = encodePNG(32, 32, renderBadge(32));
const badged16 = encodePNG(16, 16, renderBadge(16));

// Write all standard favicon files
fs.writeFileSync('public/favicon-512x512.png', badged512);
fs.writeFileSync('public/favicon-192x192.png', badged192);
fs.writeFileSync('public/apple-touch-icon.png', badged180);
fs.writeFileSync('public/favicon-48x48.png', badged48);
fs.writeFileSync('public/favicon-32x32.png', badged32);
fs.writeFileSync('public/favicon-16x16.png', badged16);
fs.writeFileSync('public/favicon.png', badged32);

// Build multi-res favicon.ico
function buildICO(pngBuffers) {
  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);

  let dirEntries = [];
  let imageOffset = 6 + count * 16;

  for (let i = 0; i < count; i++) {
    const png = pngBuffers[i].buf;
    const size = pngBuffers[i].size;
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(imageOffset, 12);
    dirEntries.push(entry);
    imageOffset += png.length;
  }

  return Buffer.concat([header, ...dirEntries, ...pngBuffers.map(p => p.buf)]);
}

const ico = buildICO([
  { size: 16, buf: badged16 },
  { size: 32, buf: badged32 },
  { size: 48, buf: badged48 }
]);
fs.writeFileSync('public/favicon.ico', ico);

// Write SVG favicon with mathematically pure vector squircle + emerald border + centered emblem
const svgFavicon = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <!-- Crisp shadow for standalone app / tab viewing -->
    <filter id="card-shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="12" flood-color="#041f10" flood-opacity="0.18"/>
    </filter>
  </defs>
  
  <!-- Premium squircle background card with high-contrast emerald border -->
  <rect 
    x="12" 
    y="12" 
    width="488" 
    height="488" 
    rx="108" 
    fill="#ffffff" 
    stroke="#10b981" 
    stroke-width="18"
    filter="url(#card-shadow)"
  />
  
  <!-- Official Mindtech Biotechnology MT Emblem -->
  <image 
    x="51" 
    y="51" 
    width="410" 
    height="410" 
    href="data:image/png;base64,${emblem512Base64}"
  />
</svg>
`;

fs.writeFileSync('public/favicon.svg', svgFavicon);

console.log('FLAWLESS Favicon Suite successfully compiled and saved to /public!');
