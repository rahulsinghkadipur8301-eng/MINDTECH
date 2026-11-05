// Node script to generate authentic, high-resolution SVG product cards
// for all products in SNS Silcos, Fine Organics, and VVF Limited.
const fs = require('fs');
const path = require('path');

// Ensure output directories exist
const dirs = [
  'public/products/sns',
  'public/products/vvf',
  'public/products/fine-organics'
];

dirs.forEach(d => {
  if (!fs.existsSync(d)) {
    fs.mkdirSync(d, { recursive: true });
  }
});

// Import ALL_PRODUCTS metadata from ts file using regex extraction
const content = fs.readFileSync('src/data/supplierProductsData.ts', 'utf8');

function extractProducts(supplierId) {
  const products = [];
  const regex = /{\s*id:\s*'([^']+)',[\s\S]*?supplierId:\s*'([^']+)',[\s\S]*?name:\s*'([^']+)',[\s\S]*?category:\s*'([^']+)',[\s\S]*?inci:\s*'([^']+)',[\s\S]*?dosage:\s*'([^']+)',/g;
  let m;
  while ((m = regex.exec(content)) !== null) {
    if (m[2] === supplierId) {
      products.push({
        id: m[1],
        supplierId: m[2],
        name: m[3],
        category: m[4],
        inci: m[5],
        dosage: m[6]
      });
    }
  }
  return products;
}

const snsProducts = [
  { id: 'sns-sfl-45', name: 'SNS SFL 45', category: 'Volatile Silicone Fluid', inci: 'Disiloxane / Dimethicone', dosage: '1–50%', benefit: 'Flash Evaporating Carrier' },
  { id: 'sns-stc-44', name: 'SNS STC 44', category: 'Sensory Carrier', inci: 'Caprylyl Methicone', dosage: '1–25%', benefit: 'Silky Volatile Slip' },
  { id: 'sns-sgb-15', name: 'SNS SGB 15', category: 'Gum Blend', inci: 'Cyclopentasiloxane & Dimethiconol', dosage: '1–50%', benefit: 'Velvet Hair Cushion' },
  { id: 'sns-sf-350-m', name: 'SNS SF 350 M', category: 'Dimethicone Fluid', inci: 'Dimethicone 350 cSt', dosage: '1–10%', benefit: 'Classic Emollient Barrier' },
  { id: 'sns-spf-56', name: 'SNS SPF 56', category: 'Phenyl Silicone', inci: 'Phenyl Trimethicone', dosage: '0.5–10%', benefit: 'High-Refractive Diamond Shine' },
  { id: 'sns-seb-45', name: 'SNS SEB 45', category: 'Elastomer Gel', inci: 'Dimethicone Crosspolymer', dosage: '1–50%', benefit: 'Matte Blurring Powder Feel' },
  { id: 'sns-sep-93', name: 'SNS SEP 93', category: 'Water Dispersible', inci: 'PEG-12 Dimethicone', dosage: '1–5%', benefit: 'Pro-Foam Aqueous Slip' },
  { id: 'sns-sep-85', name: 'SNS SEP 85', category: 'Amino Emulsion', inci: 'Amodimethicone Microemulsion', dosage: '1–5%', benefit: 'Targeted Cuticle Repair' },
  { id: 'sns-sae-49', name: 'SNS SAE 49', category: 'Amino Silicone', inci: 'Amodimethicone & Trideceth-12', dosage: '1–5%', benefit: 'Anti-Frizz Thermal Defense' },
  { id: 'sns-scb-79', name: 'SNS SCB 79', category: 'MQ Resin Blend', inci: 'Trimethylsiloxysilicate & Fluid', dosage: '1–8%', benefit: 'Transfer-Proof Waterproof Film' },
  { id: 'sns-smr-16', name: 'SNS SMR 16', category: 'Pure MQ Resin', inci: 'Trimethylsiloxysilicate', dosage: '1–10%', benefit: '3D Silicate Cage Shield' },
  { id: 'sns-saf-701', name: 'SNS SAF 701', category: 'Spherical Powder', inci: 'Dimethicone Crosspolymer & Silica', dosage: '1–20%', benefit: 'Optical Soft-Focus Velvet' },
  { id: 'sns-scb-31', name: 'SNS SCB 31', category: 'Complex Blend', inci: 'Silicone Acrylate / Crosspolymer', dosage: '1–15%', benefit: 'Long-Wear Lip Integrity' },
  { id: 'sns-scb-21', name: 'SNS SCB 21', category: 'Resin Solution', inci: 'Silicone Polyether / Resin', dosage: '1–12%', benefit: 'Crease-Proof Eye Mantle' }
];

const vvfProducts = [
  { id: 'vegarol-bt-80', name: 'VEGAROL BT 80', category: 'Cationic Conditioning', inci: 'Behentrimonium Chloride 80%', dosage: '0.5–3%', benefit: 'Anti-Static Cuticle Slip' },
  { id: 'vegarol-ct-25-30', name: 'VEGAROL CT 25/30', category: 'Cationic Surfactant', inci: 'Cetrimonium Chloride 25–30%', dosage: '0.5–4%', benefit: 'Lightweight Detangling Rinse' },
  { id: 'vegarol-bt-70', name: 'VEGAROL BT 70', category: 'Liquid Cationic', inci: 'Behentrimonium Chloride & DPG', dosage: '0.5–3%', benefit: 'Easy Cold Process Slip' },
  { id: 'promisoft-btms-25-50', name: 'Promisoft BTMS 25/50', category: 'Conditioning Emulsifier', inci: 'BTMS & Cetearyl Alcohol', dosage: '1–8%', benefit: 'Lamellar Hair Mask Base' },
  { id: 'promisoft-g-20', name: 'Promisoft G 20', category: 'Branched Emollient', inci: 'Octyldodecanol (Guerbet Alcohol)', dosage: '1–10%', benefit: 'Pure Lipid Solubilizer' },
  { id: 'vegarol-sci-85', name: 'VEGAROL SCI 85', category: 'Mild Syndet Surfactant', inci: 'Sodium Cocoyl Isethionate 85%', dosage: '2–35%', benefit: 'Rich Baby-Foam Lather' },
  { id: 'promisoft-sn-553', name: 'Promisoft SN 553', category: 'Syndet Base', inci: 'Syndet Cleansing Compound', dosage: '5–40%', benefit: 'Dermatologist Syndet Bar' }
];

const fineProductIds = [
  { id: 'finagreen-1008', name: 'FinaGreen 1008', category: 'Eco Solubilizer', inci: 'Polyglyceryl-10 Caprylate', dosage: '1–20%', benefit: 'PEG-Free Micro-Emulsion' },
  { id: 'finagreen-1199', name: 'FinaGreen 1199', category: 'Green Emollient', inci: 'Polyglyceryl-4 Cocoate', dosage: '1–15%', benefit: 'Botanical Plant Lipid' },
  { id: 'finagreen-3042', name: 'FinaGreen 3042', category: 'Green Solubilizer', inci: 'Polyglyceryl-3 Polyricinoleate', dosage: '1–10%', benefit: 'W/O Mineral Sunscreen Base' },
  { id: 'finagreen-3810', name: 'FinaGreen 3810', category: 'Bio-Solubilizer', inci: 'Polyglyceryl-6 Caprylate / Caprate', dosage: '1–15%', benefit: 'Cleansing Water & Micellar' },
  { id: 'finagreen-8100', name: 'FinaGreen 8100', category: 'Sensory Emollient', inci: 'Polyglyceryl-4 Laurate', dosage: '1–10%', benefit: 'Ultra-Mild Wet Wipe Base' },
  { id: 'finamide-cd-12', name: 'Finamide CD 12', category: 'Foam Booster', inci: 'Cocamide DEA (High Purity)', dosage: '1–5%', benefit: 'Dense Creamy Micro-Lather' },
  { id: 'finamide-ld-12', name: 'Finamide LD 12', category: 'Foam Booster', inci: 'Lauramide DEA', dosage: '1–5%', benefit: 'Viscosity Builder & Slip' },
  { id: 'vbrass-butter', name: 'VBrass Butter', category: 'Plant Conditioning', inci: 'Stearyl Erucate Conditioning Butter', dosage: '1–15%', benefit: 'Melting Velvet Cushion' },
  { id: 'vbrass-crystalline-wax', name: 'VBrass Crystalline Wax', category: 'Structuring Wax', inci: 'Stearyl Behenate Wax', dosage: '2–20%', benefit: 'Lipstick Thermal Stability' },
  { id: 'vbrass-soft-wax', name: 'VBrass Soft Wax', category: 'Barrier Lipid', inci: 'Synthetic Jojoba Wax Derivative', dosage: '1–12%', benefit: 'Flexible Moisture Shield' },
  { id: 'finester-1650', name: 'Finester 1650', category: 'Self-Emulsifying Base', inci: 'Glyceryl Stearate & PEG-100 Stearate', dosage: '2–8%', benefit: 'Gold Standard Cream Matrix' },
  { id: 'finester-2240', name: 'Finester 2240', category: 'Glyceryl Ester', inci: 'Glyceryl Stearate SE', dosage: '2–10%', benefit: 'Anionic Emulsifying System' },
  { id: 'finester-2840', name: 'Finester 2840', category: 'Sorbitan Ester', inci: 'Sorbitan Monostearate (SMS)', dosage: '1–6%', benefit: 'W/O Co-Emulsifier' },
  { id: 'finester-2860', name: 'Finester 2860', category: 'Polysorbate Co-Emulsifier', inci: 'Polysorbate 60', dosage: '1–5%', benefit: 'High HLB Hydrophilic Emulsifier' },
  { id: 'finester-2816', name: 'Finester 2816', category: 'Sorbitan Ester', inci: 'Sorbitan Palmitate', dosage: '1–5%', benefit: 'Lamellar Gel Network' },
  { id: 'finester-2842', name: 'Finester 2842', category: 'Sorbitan Tri-Ester', inci: 'Sorbitan Tristearate', dosage: '1–5%', benefit: 'W/O Barrier Structurant' },
  { id: 'finester-2880', name: 'Finester 2880', category: 'Polysorbate Active', inci: 'Polysorbate 80 (Cosmetic Grade)', dosage: '1–10%', benefit: 'Essential Oil Solubilizer' },
  { id: 'finester-2882', name: 'Finester 2882', category: 'Sorbitan Oleate', inci: 'Sorbitan Trioleate', dosage: '1–5%', benefit: 'Hydrophobic Spreading Ester' },
  { id: 'finester-gms-40', name: 'Finester GMS 40 (LG)', category: 'Glyceryl Stearate', inci: 'GMS 40% Monoglyceride (LG Grade)', dosage: '1–8%', benefit: 'Emulsion Body & Opacity' },
  { id: 'finester-gms-4654v', name: 'Finester GMS 4654V', category: 'Glyceryl Stearate Pure', inci: 'GMS High Mono Vegetable Grade', dosage: '1–10%', benefit: 'Vegetable Viscosity Builder' },
  { id: 'finester-mg-9000', name: 'Finester MG 9000/9500', category: 'Distilled Monoglyceride', inci: 'Distilled Monoglyceride 90%+', dosage: '1–6%', benefit: 'Crystal Lamellar Network' },
  { id: 'finester-2000', name: 'Finester 2000', category: 'Sorbitan Ester', inci: 'Sorbitan Monolaurate', dosage: '1–5%', benefit: 'W/O Liquid Co-Emulsifier' },
  { id: 'finester-4000', name: 'Finester 4000', category: 'Polysorbate Base', inci: 'Polysorbate 20', dosage: '1–10%', benefit: 'Fragrance & Oil Solubilizer' },
  { id: 'finester-6000', name: 'Finester 6000', category: 'Sorbitan Oleate', inci: 'Sorbitan Monooleate', dosage: '1–6%', benefit: 'Lipophilic Water-in-Oil Base' },
  { id: 'finester-6030', name: 'Finester 6030', category: 'Polyglyceryl Oleate', inci: 'Polyglyceryl-3 Oleate', dosage: '1–8%', benefit: 'Natural W/O Emulsifier' },
  { id: 'finester-6080', name: 'Finester 6080', category: 'Polyglyceryl Polyricinoleate', inci: 'Polyglyceryl-6 Polyricinoleate', dosage: '1–8%', benefit: 'High Internal Phase W/O' },
  { id: 'finester-6085', name: 'Finester 6085', category: 'Polyglyceryl Oleate', inci: 'Polyglyceryl-6 Oleate', dosage: '1–8%', benefit: 'Cold Process Solubilizer' },
  { id: 'finester-bs-4018', name: 'Finester BS 4018', category: 'Specialty Ester', inci: 'Butyl Stearate', dosage: '1–10%', benefit: 'Fast Spreading Dry Oil' },
  { id: 'finester-cc-8010', name: 'Finester CC 8010', category: 'Caprylic Ester', inci: 'Caprylic/Capric Triglyceride (Pure)', dosage: '2–30%', benefit: 'Non-Greasy Botanical Carrier' },
  { id: 'finester-cp-1416', name: 'Finester CP 1416', category: 'Cetyl Palmitate', inci: 'Cetyl Palmitate (Synthetic Spermaceti)', dosage: '1–10%', benefit: 'Synthetic Wax Structurant' },
  { id: 'finester-cs-1418', name: 'Finester CS 1418', category: 'Cetyl Stearate', inci: 'Cetyl Stearate', dosage: '1–10%', benefit: 'Skin Conditioning Cushion' },
  { id: 'finester-ep-6016', name: 'Finester EP 6016', category: 'Ethylhexyl Palmitate', inci: 'Ethylhexyl Palmitate', dosage: '2–25%', benefit: 'Mineral Oil Free Slip' },
  { id: 'finester-ep-6018', name: 'Finester EP 6018', category: 'Ethylhexyl Stearate', inci: 'Ethylhexyl Stearate', dosage: '2–25%', benefit: 'Silky Solvent for UV Filters' },
  { id: 'finester-lans', name: 'Finester LANS', category: 'Lanolin Replacer', inci: 'Vegetable Lanolin Substitute Complex', dosage: '1–15%', benefit: 'Vegetable Gloss & Cushion' },
  { id: 'finester-oo-1880', name: 'Finester OO 1880', category: 'Oleyl Oleate', inci: 'Oleyl Oleate', dosage: '1–12%', benefit: 'High-Slip Jojoba Mimic' },
  { id: 'finester-ss', name: 'Finester SS', category: 'Stearyl Stearate', inci: 'Stearyl Stearate Wax', dosage: '1–10%', benefit: 'Body Polish Wax Flakes' },
  { id: 'finester-ts-3018', name: 'Finester TS 3018', category: 'Glyceryl Tri-Ester', inci: 'Trihydroxystearin', dosage: '0.5–5%', benefit: 'Natural Oil Gelator & Suspension' },
  { id: 'finester-1009', name: 'Finester 1009', category: 'Specialty Ester', inci: 'Polyglyceryl-10 Oleate', dosage: '1–10%', benefit: 'High Translucency Emulsifier' },
  { id: 'finester-sl', name: 'Finester SL', category: 'Acyl Lactylate', inci: 'Sodium Lauroyl Lactylate', dosage: '1–5%', benefit: 'Ceramide Enhancer & Humectant' },
  { id: 'finester-7000', name: 'Finester 7000', category: 'Complex Polyglyceryl', inci: 'Polyglyceryl-10 Stearate', dosage: '1–5%', benefit: 'Crystal Lamellar Dispersion' },
  { id: 'finester-2112', name: 'Finester 2112', category: 'Propylene Glycol Ester', inci: 'Propylene Glycol Monolaurate', dosage: '1–8%', benefit: 'Micro-Penetration Active Slip' },
  { id: 'finester-4112', name: 'Finester 4112', category: 'PEG Fatty Acid', inci: 'PEG-8 Laurate', dosage: '1–6%', benefit: 'Gentle Rinse Cleanser' },
  { id: 'finester-4180', name: 'Finester 4180', category: 'PEG Ester', inci: 'PEG-8 Oleate', dosage: '1–8%', benefit: 'Self-Emulsifying Bath Oil' },
  { id: 'finester-6218', name: 'Finester 6218', category: 'Isostearyl Ester', inci: 'Isostearyl Isostearate', dosage: '2–15%', benefit: 'Breathable Barrier Lipid' },
  { id: 'finester-dg-2012', name: 'Finester DG 2012', category: 'Polyglyceryl Dilaurate', inci: 'Polyglyceryl-2 Dilaurate', dosage: '1–8%', benefit: 'Substantive Lip Conditioning' },
  { id: 'finester-dg-2018', name: 'Finester DG 2018', category: 'Polyglyceryl Distearate', inci: 'Polyglyceryl-2 Distearate', dosage: '1–8%', benefit: 'Rich Satin Cream Body' },
  { id: 'finester-eg-1018', name: 'Finester EG 1018', category: 'Glycol Stearate', inci: 'Glycol Stearate (EGMS)', dosage: '1–5%', benefit: 'Opacifier & Pearliser Base' },
  { id: 'finester-eg-1020', name: 'Finester EG 1020', category: 'Glycol Di-Stearate', inci: 'Glycol Distearate (EGDS)', dosage: '1–5%', benefit: 'Brilliant Silver Pearlescence' }
];

function escapeXml(unsafe) {
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateSvg({ partner, name, category, inci, dosage, benefit }) {
  const isSns = partner === 'sns';
  const isVvf = partner === 'vvf';

  // Partner specific palette & typography
  const pName = isSns ? 'SNS SILCOS' : isVvf ? 'VVF LIMITED' : 'FINE ORGANICS';
  const pSub = isSns ? 'SPECIALTY SILICONE CHEMISTRY' : isVvf ? 'OLEOCHEMICAL & SYNDET ALLIANCE' : 'SPECIALTY ESTERS & EMULSIFIERS';
  const primary = isSns ? '#0284c7' : isVvf ? '#0f766e' : '#047857';
  const darkText = isSns ? '#0c4a6e' : isVvf ? '#134e4a' : '#064e3b';
  const gradStart = isSns ? '#f0f9ff' : isVvf ? '#f0fdfa' : '#f0fdf4';
  const gradMid = isSns ? '#e0f2fe' : isVvf ? '#ccfbf1' : '#dcfce7';
  const gradEnd = '#ffffff';
  const accentGlow = isSns ? '#38bdf8' : isVvf ? '#2dd4bf' : '#34d399';

  // Cosmetic graphic paths
  const chemistryIcon = isSns 
    ? `<circle cx="140" cy="85" r="32" fill="${gradMid}" stroke="${primary}" stroke-width="2" opacity="0.9"/>
       <path d="M125 85 C125 75 140 68 140 68 C140 68 155 75 155 85 C155 94 147 100 140 100 C133 100 125 94 125 85 Z" fill="${primary}"/>
       <circle cx="140" cy="74" r="3.5" fill="#ffffff"/>
       <line x1="108" y1="85" x2="172" y2="85" stroke="${accentGlow}" stroke-width="1.5" stroke-dasharray="3 3"/>`
    : isVvf 
    ? `<circle cx="140" cy="85" r="32" fill="${gradMid}" stroke="${primary}" stroke-width="2" opacity="0.9"/>
       <path d="M140 68 L154 77 L154 93 L140 102 L126 93 L126 77 Z" fill="none" stroke="${primary}" stroke-width="2.5"/>
       <circle cx="140" cy="85" r="6" fill="${primary}"/>
       <circle cx="140" cy="68" r="3" fill="${accentGlow}"/>
       <circle cx="154" cy="93" r="3" fill="${accentGlow}"/>
       <circle cx="126" cy="93" r="3" fill="${accentGlow}"/>`
    : `<circle cx="140" cy="85" r="32" fill="${gradMid}" stroke="${primary}" stroke-width="2" opacity="0.9"/>
       <path d="M140 66 C148 74 156 84 156 92 C156 100 148 104 140 104 C132 104 124 100 124 92 C124 84 132 74 140 66 Z" fill="${primary}"/>
       <path d="M140 76 Q144 88 150 94" stroke="#ffffff" stroke-width="1.5" fill="none" stroke-linecap="round"/>
       <circle cx="140" cy="72" r="2.5" fill="#ffffff"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="280" height="200" viewBox="0 0 280 200">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${gradStart}"/>
      <stop offset="50%" stop-color="${gradMid}"/>
      <stop offset="100%" stop-color="${gradEnd}"/>
    </linearGradient>
    <linearGradient id="barGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${primary}"/>
      <stop offset="100%" stop-color="${accentGlow}"/>
    </linearGradient>
  </defs>

  <!-- Clean Canvas Background matching Greentech Aspect -->
  <rect width="280" height="200" fill="url(#bgGrad)" stroke="#e2e8f0" stroke-width="1.5" rx="6"/>

  <!-- Top Decorative Identity Stripe -->
  <rect x="0" y="0" width="280" height="4" fill="url(#barGrad)"/>

  <!-- Partner Badge Header -->
  <rect x="12" y="14" width="94" height="18" rx="9" fill="#ffffff" stroke="${primary}" stroke-width="1"/>
  <text x="59" y="26.5" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8" font-weight="800" fill="${darkText}" text-anchor="middle" letter-spacing="0.5">${escapeXml(pName)}</text>

  <!-- Certified Grade Tag -->
  <rect x="204" y="14" width="64" height="18" rx="9" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
  <text x="236" y="26.5" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="7.5" font-weight="700" fill="#475569" text-anchor="middle" letter-spacing="0.3">100% CoA</text>

  <!-- Central Scientific Illustration -->
  <g transform="translate(0, -6)">
    ${chemistryIcon}
  </g>

  <!-- Product Code / Name Display -->
  <text x="140" y="132" font-family="'Outfit', -apple-system, BlinkMacSystemFont, sans-serif" font-size="14.5" font-weight="800" fill="${darkText}" text-anchor="middle" letter-spacing="0.5">${escapeXml(name.toUpperCase())}</text>

  <!-- INCI Name Description -->
  <text x="140" y="148" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="9" font-weight="600" fill="#475569" text-anchor="middle">${escapeXml(inci.length > 38 ? inci.substring(0, 36) + '…' : inci)}</text>

  <!-- Bottom Benefit & Dosage Pill -->
  <rect x="12" y="166" width="256" height="22" rx="11" fill="#ffffff" stroke="#e2e8f0" stroke-width="1"/>
  <text x="22" y="180.5" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="8.5" font-weight="700" fill="${primary}">${escapeXml(category)}</text>
  <text x="258" y="180.5" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700" fill="#64748b" text-anchor="end">Dose: ${escapeXml(dosage)}</text>
</svg>`;
}

// Generate SNS
let countSns = 0;
snsProducts.forEach(p => {
  const svg = generateSvg({ partner: 'sns', ...p });
  fs.writeFileSync(path.join('public/products/sns', `${p.id}.svg`), svg, 'utf8');
  countSns++;
});
console.log(`Generated ${countSns} SNS SVGs`);

// Generate VVF
let countVvf = 0;
vvfProducts.forEach(p => {
  const svg = generateSvg({ partner: 'vvf', ...p });
  fs.writeFileSync(path.join('public/products/vvf', `${p.id}.svg`), svg, 'utf8');
  countVvf++;
});
console.log(`Generated ${countVvf} VVF SVGs`);

// Generate Fine Organics
let countFine = 0;
fineProductIds.forEach(p => {
  const svg = generateSvg({ partner: 'fine-organics', ...p });
  fs.writeFileSync(path.join('public/products/fine-organics', `${p.id}.svg`), svg, 'utf8');
  countFine++;
});
console.log(`Generated ${countFine} Fine Organics SVGs`);
