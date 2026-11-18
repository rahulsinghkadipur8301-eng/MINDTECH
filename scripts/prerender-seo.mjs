import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

const BASE_URL = 'https://mindtech-bio.com';

const ROUTE_SPECS = [
  {
    routePath: '/',
    title: 'Mindtech Biotechnology | Cosmetic Raw Material Supplier India',
    description:
      'Mindtech Biotechnology supplies cosmetic and personal care ingredients in India, including bio-actives, specialty silicones, emulsifiers, esters and surfactants.',
    h1: 'Mindtech Biotechnology — Cosmetic & Personal Care Ingredients',
    subtitle: 'NATURE BEYOND THE FUTURE',
    summary:
      'Mindtech Biotechnology India Pvt. Ltd. is an importer and supplier of cosmetic and personal care ingredients in New Delhi, India, offering bio-actives, botanical oils, specialty silicones, emulsifiers, esters and surfactants with COA, TDS and MSDS support.',
    highlights: [
      'Greentech Biotechnologies (France): Cosmetic bio-actives, microbiota care, plant ferments, botanical oils and plant butters',
      'SNS Silcos: Specialty silicones, dimethicone crosspolymer elastomer gels, volatile fluids and MQ film-forming resins',
      'Fine Organics: Specialty esters, bio-solubilizers, glyceryl and sorbitan emulsifiers and structuring waxes',
      'VVF Limited: VEGAROL cationic conditioning agents, Promisoft BTMS emulsifiers and SCI syndet cleansing bases',
      'Bawana Hub, New Delhi: Ground Floor-181, Pkt-D, Sec-3 Bawana DSIDC City, New Delhi - 110039, India | +91-8368947579 | sales@mindtec.org.in',
    ],
  },
  {
    routePath: '/portfolio/greentech',
    title: 'Greentech Cosmetic Ingredients India | Mindtech Biotechnology',
    description:
      'Explore Greentech cosmetic bio-actives, botanical oils, biotechnology ingredients and skin and hair care formulation ingredients through Mindtech Biotechnology India.',
    h1: 'Greentech Biotechnologies — Cosmetic Actives & Ingredients',
    subtitle: 'French Manufacturer Portfolio Supplied in India by Mindtech Biotechnology',
    summary:
      'Manufactured by Greentech (Saint-Beauzire, France) and supplied across India by Mindtech Biotechnology. Covering skin care actives, hair care phyto-actives, skin & scalp microbiota modulators, fair-trade botanical oils and plant butters with 100g bench samples and 1 kg / 5 kg commercial pack sizes.',
    highlights: [
      'Key Active Families: Anti-ageing & longevity (HEBÉLYS®, TIMELYS®, REVERSKIN®, QT40®), brightening & barrier repair (LETILYS®, EXPOZEN®), hair & scalp care (HAIRILINE®, ARCOLYS®)',
      'Botanical & Natural Products: Pure cold-pressed vegetable oils, Inca Inchi oil, Abyssinian oil, plant butters and standardized extracts',
      'Indian Supplier Documentation: Batch COA, Technical Data Sheet (TDS), MSDS, GST invoicing, 100g certified bench samples and 1 kg / 5 kg pack sizes from Bawana Hub, New Delhi',
    ],
  },
  {
    routePath: '/partners/sns-silcos',
    title: 'SNS Silcos Silicone Ingredients India | Mindtech Biotechnology',
    description:
      'Explore SNS Silcos specialty silicone fluids, elastomer gels, MQ resins and micro-emulsions for skin care and hair care formulations in India at Mindtech Biotechnology.',
    h1: 'SNS SILCOS — Specialty Silicone Ingredients',
    subtitle: 'Silicone Fluids, Elastomer Gels, MQ Resins & Micro-Emulsions in India',
    summary:
      'Through Mindtech Biotechnology, cosmetic manufacturers across India access 14 catalogued SNS Silcos specialty silicones for silk-feel skincare serums, sunscreens, hair conditioners and transfer-resistant color cosmetics.',
    highlights: [
      'Categories: Dimethicone crosspolymer elastomer gels, volatile methyl siloxanes, phenyl trimethicone gloss agents, trimethylsiloxysilicate MQ resins and conditioning emulsions',
      'Commercial Packaging: 50 kg and 190 kg pack sizes alongside 100g R&D bench evaluation packs with COA and TDS',
    ],
  },
  {
    routePath: '/suppliers/fine-organics',
    title: 'Fine Organics Esters & Emulsifiers | Mindtech Biotechnology',
    description:
      'Browse Fine Organics specialty esters, bio-solubilizers, glyceryl esters and structuring waxes supplied across India by Mindtech Biotechnology.',
    h1: 'FINE ORGANICS — Specialty Esters & Emulsifiers',
    subtitle: 'FinaGreen Bio-Solubilizers, Finester Emollients & VBrass Structuring Waxes',
    summary:
      'Explore 48 catalogued Fine Organics cosmetic ingredients supplied in India by Mindtech Biotechnology across four documented chemistry families for creams, lotions, lip care and emulsion stability.',
    highlights: [
      'Families: FinaGreen bio-solubilizers, Finester specialty esters, glyceryl & sorbitan emulsifiers and VBrass plant-derived structuring waxes',
      'Commercial Pack Sizes: 50 kg and 190 kg commercial packs plus 100g laboratory samples with COA & TDS',
    ],
  },
  {
    routePath: '/suppliers/vvf-limited',
    title: 'VVF Limited Surfactants & Conditioning | Mindtech Biotechnology',
    description:
      'Discover VVF Limited VEGAROL cationic conditioning quats, Promisoft BTMS emulsifiers and SCI syndet bases supplied in India by Mindtech Biotechnology.',
    h1: 'VVF LIMITED — Surfactants & Conditioning Agents',
    subtitle: 'VEGAROL Cationic Quats, Promisoft BTMS & Mild Syndet Cleansing Systems',
    summary:
      'Mindtech Biotechnology supplies VVF Limited oleochemicals, cationic conditioning agents, Promisoft BTMS conditioning emulsifiers and Sodium Cocoyl Isethionate (SCI) syndet bases across India.',
    highlights: [
      'Portfolio Grades: VEGAROL fatty alcohols & conditioning quats, Promisoft BTMS series, and mild sulfate-free syndet bases',
      'Commercial Pack Sizes: 50 kg and 190 kg pack sizes plus 100g R&D evaluation packs with batch COA',
    ],
  },
  {
    routePath: '/suppliers/general-range',
    title: 'General Cosmetic Ingredients Range | Mindtech Biotechnology India',
    description:
      'Cosmetic actives, UV filters, niacinamide, arbutin and mild surfactants available from Mindtech Biotechnology India Bawana warehouse.',
    h1: 'General Range — Cosmetic Actives, UV Filters & Functional Raw Materials',
    subtitle: 'Central Bawana Hub Ready Stock for Skin Care, Sun Care & Cleansing',
    summary:
      'Browse 24 functional cosmetic raw materials including Alpha & Beta Arbutin, Kojic Dipalmitate, Ethyl Ascorbic Acid, Niacinamide, broad-spectrum UV filters and mild glucosides stocked at Mindtech Biotechnology, New Delhi.',
    highlights: [
      'Actives & Brighteners: Alpha Arbutin, Beta Arbutin, Kojic Acid, Kojic Dipalmitate, Niacinamide, Ethyl Ascorbic Acid',
      'Sun Care & Conditioning: Avobenzone, Octocrylene, Benzophenone grades, Polyquaternium-7/10 and mild surfactants',
    ],
  },
  {
    routePath: '/suppliers/all-products',
    title: 'Cosmetic Ingredient Portfolio India | Mindtech Biotechnology',
    description:
      'Complete multi-supplier portfolio of cosmetic raw materials from Greentech, SNS Silcos, Fine Organics and VVF Limited at Mindtech Biotechnology.',
    h1: 'Complete Cosmetic & Personal Care Ingredient Portfolio',
    subtitle: '180+ Verified Raw Materials Across Global Manufacturing Partners',
    summary:
      'Search and compare cosmetic raw materials across Greentech Biotechnologies, SNS Silcos, Fine Organics, VVF Limited and Mindtech General Range by INCI name, application sector and formulation function.',
    highlights: [
      'Multi-Supplier Coverage: Bio-actives, specialty silicones, specialty esters, emulsifiers, surfactants, syndets and UV filters',
      'Sample & Quotation Desk: Direct 100g bench samples, batch COA/TDS verification and Pan-India dispatch',
    ],
  },
  {
    routePath: '/business-lines/skin-care',
    title: 'Skin Care & Anti-Pigmentation Ingredients | Mindtech Biotechnology',
    description:
      'Browse verified raw materials and cosmetic actives for Skin Care & Anti-Pigmentation formulations supplied across India by Mindtech Biotechnology.',
    h1: 'Skin Care & Anti-Pigmentation Ingredients',
    subtitle: 'Cosmetic & Personal Care Ingredients Supplied in India by Mindtech Biotechnology',
    summary:
      'Explore radiance actives, barrier repair bio-ferments, moisturizers, emollient esters and light-touch silicones curated for facial serums, creams and brightening formulations.',
    highlights: [
      'Key Applications: Serums, anti-ageing emulsions, hyperpigmentation creams and barrier repair lotions',
    ],
  },
  {
    routePath: '/business-lines/hair-care',
    title: 'Hair Care & Conditioning Ingredients | Mindtech Biotechnology',
    description:
      'Browse verified raw materials and cosmetic actives for Hair Care & Conditioning formulations supplied across India by Mindtech Biotechnology.',
    h1: 'Hair Care & Conditioning Ingredients',
    subtitle: 'Cosmetic & Personal Care Ingredients Supplied in India by Mindtech Biotechnology',
    summary:
      'Cationic conditioning polymers, silicone micro-emulsions, scalp microbiota bio-actives and anti-greying botanical extracts for shampoos, conditioners and hair serums.',
    highlights: [
      'Key Applications: Sulfate-free shampoos, frizz-control hair serums, scalp tonics and intensive conditioning masks',
    ],
  },
  {
    routePath: '/business-lines/sun-care',
    title: 'Sun Care & Photoprotection Ingredients | Mindtech Biotechnology',
    description:
      'Browse verified raw materials and cosmetic actives for Sun Care & Photoprotection formulations supplied across India by Mindtech Biotechnology.',
    h1: 'Sun Care & Photoprotection Ingredients',
    subtitle: 'Cosmetic & Personal Care Ingredients Supplied in India by Mindtech Biotechnology',
    summary:
      'Photostable UV filters, light spreading emollient esters, film-forming MQ resins and soothing botanical actives for high-comfort daily sunscreens.',
    highlights: [
      'Key Applications: Broad-spectrum UVA/UVB creams, fluid sunscreens, zero white-cast gels and after-sun care',
    ],
  },
  {
    routePath: '/business-lines/color-cosmetics',
    title: 'Color Cosmetics & Make-up Ingredients | Mindtech Biotechnology',
    description:
      'Browse verified raw materials and cosmetic actives for Color Cosmetics & Make-up formulations supplied across India by Mindtech Biotechnology.',
    h1: 'Color Cosmetics & Make-up Ingredients',
    subtitle: 'Cosmetic & Personal Care Ingredients Supplied in India by Mindtech Biotechnology',
    summary:
      'Silicone elastomer gels, volatile fluids, trimethylsiloxysilicate MQ resins and specialty structuring waxes delivering velvet matte textures and transfer resistance.',
    highlights: [
      'Key Applications: Long-wear lipsticks, foundations, matte primers, mascaras and color cosmetics',
    ],
  },
  {
    routePath: '/business-lines/bath-body',
    title: 'Bath, Body & Mild Cleansing Ingredients | Mindtech Biotechnology',
    description:
      'Browse verified raw materials and cosmetic actives for Bath, Body & Mild Cleansing formulations supplied across India by Mindtech Biotechnology.',
    h1: 'Bath, Body & Mild Cleansing Ingredients',
    subtitle: 'Cosmetic & Personal Care Ingredients Supplied in India by Mindtech Biotechnology',
    summary:
      'Mild sulfate-free glucosides, Sodium Cocoyl Isethionate (SCI) syndet bases, betaines and soothing botanical cleansers for gentle body washes and facial cleansers.',
    highlights: [
      'Key Applications: Mild facial washes, syndet bars, baby cleansers and sulfate-free body washes',
    ],
  },
  {
    routePath: '/business-lines/biotechnology',
    title: 'Active Bio-Technology & Greentech Ingredients | Mindtech Biotechnology',
    description:
      'Browse verified raw materials and cosmetic actives for Active Bio-Technology & Greentech formulations supplied across India by Mindtech Biotechnology.',
    h1: 'Active Bio-Technology & Greentech Ingredients',
    subtitle: 'Cosmetic & Personal Care Ingredients Supplied in India by Mindtech Biotechnology',
    summary:
      'Bio-fermentation actives, marine macroalgae extracts, microbiota-balancing peptides and fair-trade botanical actives from Greentech Biotechnologies supplied by Mindtech Biotechnology India.',
    highlights: [
      'Key Applications: Cellular longevity skincare, microbiome balancing serums and botanical scalp therapies',
    ],
  },
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildRouteNavLinks() {
  const navRoutes = [
    { href: '/', label: 'Home' },
    { href: '/portfolio/greentech', label: 'Greentech Biotechnologies' },
    { href: '/partners/sns-silcos', label: 'SNS Silcos Silicones' },
    { href: '/suppliers/fine-organics', label: 'Fine Organics Esters' },
    { href: '/suppliers/vvf-limited', label: 'VVF Limited Surfactants' },
    { href: '/suppliers/general-range', label: 'General Ingredient Range' },
    { href: '/suppliers/all-products', label: 'Full Product Portfolio' },
    { href: '/business-lines/skin-care', label: 'Skin Care & Anti-Pigmentation' },
    { href: '/business-lines/hair-care', label: 'Hair Care & Conditioning' },
    { href: '/business-lines/sun-care', label: 'Sun Care & Photoprotection' },
    { href: '/business-lines/color-cosmetics', label: 'Color Cosmetics & Make-up' },
    { href: '/business-lines/bath-body', label: 'Bath, Body & Mild Cleansing' },
    { href: '/business-lines/biotechnology', label: 'Active Bio-Technology & Greentech' },
  ];

  return navRoutes
    .map((item) => `<li><a href="${item.href}">${escapeHtml(item.label)}</a></li>`)
    .join('\n          ');
}

function buildPrerenderedRootContent(spec) {
  const highlightsHtml = spec.highlights
    .map((line) => `<li>${escapeHtml(line)}</li>`)
    .join('\n          ');

  return `
      <main data-prerendered-seo="true" style="max-width:1100px;margin:0 auto;padding:32px 20px;font-family:sans-serif;color:#1a2e26;">
        <header style="border-bottom:1px solid #d1e7dd;padding-bottom:16px;margin-bottom:24px;">
          <p style="font-size:12px;font-weight:700;letter-spacing:0.08em;color:#107c41;margin:0 0 6px;">MINDTECH BIOTECHNOLOGY INDIA PVT. LTD. · ${escapeHtml(spec.subtitle)}</p>
          <h1 style="font-size:32px;line-height:1.2;margin:0 0 12px;color:#072414;">${escapeHtml(spec.h1)}</h1>
          <p style="font-size:16px;line-height:1.6;margin:0;color:#334155;">${escapeHtml(spec.summary)}</p>
        </header>
        <section style="margin-bottom:24px;">
          <h2 style="font-size:18px;margin:0 0 10px;color:#072414;">Key Product Portfolio &amp; Supply Details</h2>
          <ul style="line-height:1.7;padding-left:20px;color:#334155;">
          ${highlightsHtml}
          </ul>
        </section>
        <nav aria-label="Mindtech Biotechnology Directory" style="margin-bottom:24px;">
          <h2 style="font-size:16px;margin:0 0 8px;color:#072414;">Explore Global Partners &amp; Formulation Sectors</h2>
          <ul style="display:flex;flex-wrap:wrap;gap:12px 20px;list-style:none;padding:0;margin:0;">
          ${buildRouteNavLinks()}
          </ul>
        </nav>
        <footer style="border-top:1px solid #d1e7dd;padding-top:16px;font-size:14px;color:#475569;">
          <p style="margin:0;"><strong>Mindtech Biotechnology India Pvt. Ltd.</strong> · Ground Floor-181, Pkt-D, Sec-3 Bawana DSIDC City, Opp. Delhi Jal Board Bawana, New Delhi - 110039, India · Tel: +91-8368947579 · Email: sales@mindtec.org.in</p>
        </footer>
      </main>
    `;
}

function injectBreadcrumbSchema(html, spec) {
  if (spec.routePath === '/') return html;
  const canonicalUrl = `${BASE_URL}${spec.routePath}`;
  const breadcrumbJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Mindtech Biotechnology', item: `${BASE_URL}/` },
      { '@type': 'ListItem', position: 2, name: spec.h1, item: canonicalUrl },
    ],
  });
  const scriptTag = `\n    <script id="dynamic-breadcrumb-jsonld" type="application/ld+json">${breadcrumbJson}</script>`;
  return html.replace('</head>', `${scriptTag}\n  </head>`);
}

function applyRouteMetadata(templateHtml, spec) {
  const canonicalUrl = `${BASE_URL}${spec.routePath === '/' ? '/' : spec.routePath}`;
  let out = templateHtml;

  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(spec.title)}</title>`);
  out = out.replace(
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escapeHtml(spec.description)}" />`
  );
  out = out.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${canonicalUrl}" />`
  );
  out = out.replace(
    /<meta property="og:url" content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${canonicalUrl}" />`
  );
  out = out.replace(
    /<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${escapeHtml(spec.title)}" />`
  );
  out = out.replace(
    /<meta property="og:description" content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${escapeHtml(spec.description)}" />`
  );
  out = out.replace(
    /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${escapeHtml(spec.title)}" />`
  );
  out = out.replace(
    /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${escapeHtml(spec.description)}" />`
  );

  out = injectBreadcrumbSchema(out, spec);
  out = out.replace(
    '<div id="root" class="w-full max-w-full overflow-x-hidden"></div>',
    `<div id="root" class="w-full max-w-full overflow-x-hidden">${buildPrerenderedRootContent(spec)}</div>`
  );

  return out;
}

function run() {
  const indexHtmlPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    throw new Error('dist/index.html not found. Run vite build before prerender-seo.mjs.');
  }

  const baseTemplate = fs.readFileSync(indexHtmlPath, 'utf-8');

  for (const spec of ROUTE_SPECS) {
    const html = applyRouteMetadata(baseTemplate, spec);
    if (spec.routePath === '/') {
      fs.writeFileSync(indexHtmlPath, html, 'utf-8');
    } else {
      const cleanRel = spec.routePath.replace(/^\/+/, '');
      const targetHtmlPath = path.join(distDir, `${cleanRel}.html`);
      fs.mkdirSync(path.dirname(targetHtmlPath), { recursive: true });
      fs.writeFileSync(targetHtmlPath, html, 'utf-8');
    }
  }

  console.log(`[prerender-seo] Generated static SEO HTML snapshots for ${ROUTE_SPECS.length} canonical routes in dist/.`);
}

run();
