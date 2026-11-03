# MASTER BUILD PROMPT — MINDTECH BIOTECHNOLOGY PRODUCT PORTFOLIO

## ROLE AND OUTCOME

Act as a senior B2B biotechnology website creative director, product UX designer, React/TypeScript engineer, and technical content architect. Upgrade the **existing** website of **Mindtech Biotechnology India Private Limited** into a sophisticated, fast, searchable, data-driven ingredient catalogue inspired by Greentech's category and product-detail experience. Integrate **all five client-provided Greentech PDFs (136 total pages)**, not only the original three. Represent advanced skin/hair actives, microbiota ingredients, vegetable oils, specialty lipactives, plant butters, oral-care actives, functional cleansers and fair-trade botanical materials in one coherent, accurately attributed catalogue.

**Mindtech brand:** “NATURE BEYOND THE FUTURE.” Preserve Mindtech's exact approved logo, existing branding, homepage content, partner links, working interactions, and responsive website structure. This is **not** a greenfield replacement or a clone of Greentech. First inspect the existing project, its routes, data, and design system; then integrate this feature cleanly.

**Reference URLs:**
- Greentech products landing: https://www.greentech.fr/en/products/
- Greentech anti-ageing catalogue: https://www.greentech.fr/en/anti-ageing/
- Greentech example detail: https://www.greentech.fr/en/cosmelene-centella-3/
- Greentech ingredient finder: https://www.greentech.fr/en/find-an-active/

**Important interpretation:** The reference's `/products/` route is chiefly an entry point. The actual screenshot-like browsing experience is on `/anti-ageing/` and related benefit-category pages. Replicate the **information architecture and browsing logic**—icon categories, image-led card grid, individual ingredient information, sample enquiry—not its dated typography, tiny card labels, header, exact graphic assets, or page code.

## CLIENT-PROVIDED MATERIALS: TREAT AS PRIMARY PRODUCT SOURCES

The client has supplied **five PDFs and one Greentech screenshot**. They must all inform the work; do not ignore or selectively overlook the additional two:

1. `Catalogue India_compressed.pdf` — 32 pages, 2023. Main Greentech India active-ingredients catalogue; skin-care overview p. 4, hair/scalp overview p. 5, detailed skin-care sheets pp. 7–19, detailed hair-care sheets pp. 21–27, supporting material elsewhere.
2. `Plaquette Hair Care 2021_V02-PRINT.pdf` — 16 pages, 2023 PDF metadata. Detailed hair/scalp portfolio; category overview p. 2, ingredient fact sheets pp. 3–13, technical tables pp. 14–15.
3. `Plaquette Microbiote-PRINT.pdf` — 12 pages, 2023. Skin/scalp microbiota science; conceptual overview p. 3, ingredient sheets pp. 4–10, technical information p. 11.
4. `Plaquette actifs Greentech 2024-PRINT.pdf` — **48 pages**, 2024. A broad, newer ingredient-family catalogue: face/body skin care (pp. 6–27), hair/scalp (pp. 28–35), oral care (pp. 36–37), functional formulation ingredients (pp. 38–39), and fair-trade ingredients (pp. 40–44). Provides product thumbnails, origin/active molecules, actions, use level, form, solubility, INCI and certification icons where applicable. **Review this newer source when reconciling older product descriptions, but never assume market availability or universal certification.**
5. `Plaquette Vegetable Oils Greentech 2022-PRINT.pdf` — **28 pages**, the vegetable oils and butters booklet. Oily actives (pp. 4, 6–10), plant-oil application index (p. 5), individual pure-oil rows (pp. 12–23), a functional oil-derived cleanser (p. 24), and four plant butters (p. 25). It contains botanical names, grades, sourcing countries, supplier item codes, sensory feel, cosmetic applications and selected study details.
6. `Screenshot 2026-11-02 at 5.16.05 PM.png` — the user's Greentech anti-ageing screenshot. Use it as the **visual pattern reference**, not as a deployable page image.

Extract text, images, ingredient identifiers, and relevant scientific context carefully. Create a source-to-product mapping with **PDF name and page number** for every fact. Proofread extraction against the **rendered page**, especially the 2024 and oils tables: these PDFs have overlapping invisible/repeated text layers, so linear `pdftotext` output sometimes mixes unrelated INCI and ACTIONS data into a row. **Never bind a stray extracted INCI or claim to the wrong product.** Scientific PDFs contain dense charts, special symbols, trademark marks, tabular data, and extraction artifacts. Prefer source-backed text over guessing. Use provided images only as authorized by the client; optimize assets as WebP/AVIF, retaining originals privately. Do not simply upload PDF pages as a replacement for properly structured, responsive product content.

### Seed the Greentech catalogue from the MAIN India catalogue

**Skin care / facial active ingredients:**

| Ingredient | Source-backed positioning / concern | Main PDF detail page |
|---|---|---:|
| ACNILYS® | Oily-skin regulation; microbiota modulation | 7 |
| BIOTILYS® | Skin defence; microbiota-friendly skin repair | 8 |
| CIRCALYS® | Chrono-detox; feel-good energizer | 9 |
| CLERILYS® | Dark-spot care / depigmenting complex | 10 |
| EXPOZEN® | Sensitive/reactive skin; anti-exposome positioning | 11 |
| FLOWER ACIDS® | Regeneration / exfoliation with tolerance positioning | 12 |
| HEBELYS® | Skin and mood; healthy-ageing positioning | 13 |
| LIFTISS® | Instant smoothing / tensor effect | 14 |
| MYRALYS | Eye contour; eyelid and under-eye care | 15 |
| REVERSKIN® | Skin firming / regeneration | 16 |
| SOLIBERINE® | Photo-protection against UV, blue light, infrared | 17 |
| COSMELENE RANGE | Water-soluble botanical actives; multiple distinct variants | 18–19 |

**Hair & scalp care:**

| Ingredient | Source-backed positioning / concern | Main PDF detail page |
|---|---|---:|
| ARCOLYS® | Anti-greying / colour-care positioning | 21 |
| HAIRILINE® | Hair-loss care / scalp microbiota | 22 |
| DANDRILYS® | Dandruff care / scalp microbiota | 23 |
| HAIR LUSTRE KARKADE | Hair softness and shine | 24 |
| HAIR STRENGTH EGX 292 | Oily hair / scalp purification | 25 |
| TILICINE® | Dehydrated, fragile hair and scalp | 26 |
| ZORYALYS® | Pollution, UV and colour protection | 27 |
| HAIR VOLUMIZING COMPLEX | Hair volume; listed in overview (verify technical-table details) | 5 |

**Additional items backed by the specialist PDFs:**
- Hair-care booklet: INCA INCHI LIPACTIVE (p. 8), BAOBAB LIPACTIVE (p. 9), APRICOT LIPACTIVE (p. 10), GLIALYS 21 (p. 12), HYDROLYZED PEA PROTEINS (p. 13). Cross-reference ARCOLYS, HAIRILINE, DANDRILYS, ZORYALYS, TILICINE and HAIR LUSTRE KARKADE instead of duplicating them.
- Microbiota booklet: LACTOPHYT (p. 7), HOLOBIOSYS (p. 8); cross-reference existing ACNILYS, BIOTILYS, EXPOZEN, DANDRILYS and HAIRILINE entries.
- The main India catalogue's COSMELENE RANGE contains multiple varieties. Create a parent range page and **individual variant records only after correctly reading pp. 18–19**. Greentech's site separately documents CENTELLA, GINSENG, TERMINALIA and other variants; do not assume those are the complete India-authorized range.
- Names such as HYDROLYZED KERATIN, KAPILARINE COMPLEX, and ANTI-DANDRUFF COMPLEX appear as mentions in the hair-care booklet; do not invent full specification sheets where the source only has a reference. Flag them for client verification.

### NEW: Integrate the complete 2024 active-ingredients catalogue

The **2024 booklet is not a repeat of the three earlier PDFs**. It introduces further named products, expands categories, and frequently supplies formulation-level data and imagery. Seed **all distinct named listings** from these pages, grouping them as follows. Product names in this index are source-based; check exact spelling, registered marks, grades, formulas and current commercial availability before publication.

| 2024 PDF page | Browsing category | Named items to include / reconcile |
|---:|---|---|
| 7 | Well-ageing, total care | HEBELYS®, EPICA®, NUCLEOLYS, SETILINE® SN, COSMELENE® CENTELLA, GOLDEN MICROALGAE, TIMELYS® |
| 8 | Antioxidants | TEALINE®, FERMENT’ACTIVE GOJI, FERMENT’ACTIVE POMEGRANATE |
| 10 | Firming / anti-sagging | REVERSKIN®, QT40®, COSMELENE® TERMINALIA, COSMELENE® GINSENG, COSMELENE® HORSETAIL, LIPACTIVE GREEN COFFEE |
| 11 | Instant lifting | LIFTISS® |
| 13 | Skin renewal / radiance | FLOWER ACIDS®, PROTEASE |
| 14 | Sebum / acne-prone skin | ACNILYS® |
| 15 | Sebum / mattifying | CANNABIDIOL (CBD) ISOLATE POWDER, GREENSIL, SEBORILYS |
| 16 | Redness / vascular tone | SILIDINE® SN, COSMELENE® HAWTHORN |
| 17 | Complexion / brightening | CLERILYS W®, PHYTELENE COMPLEXION LIGHTENING EGX 293, RAYOLYS |
| 18 | Eye contour | CERNILYS®, MYRALYS |
| 21 | Moisturisation | COSMELENE® NEPTUNE KELP, HYDRALYS M, HOLOBIOSYS®, JERICINE®, POLEVAN S |
| 22 | Pollution defence | URBALYS® |
| 24 | Sensitive skin / soothing | EXPOZEN® |
| 25 | Skin barrier | BIOTILYS® |
| 26 | Body-hair management | ARP 100 |
| 27 | Deodorant / antiperspirant | LACTOPHYT®, ANTIPERSPIRANT NATURAL COMPLEX |
| 29 | Hair ageing / colour care | ARCOLYS® |
| 31 | Scalp balance | DANDRILYS®, HAIR STRENGTH COMPLEX EGX 292 (source table contains a spelling variant) |
| 32 | Hair nutrition / repair | LIPACTIVE INCA INCHI®, LIPACTIVE APRICOT, LIPACTIVE BAOBAB |
| 34 | Curly/frizzy hair | ARGAN OIL, MURU MURU BUTTER |
| 35 | Hair volume / protection | HAIR VOLUMIZING COMPLEX, ZORYALYS® |
| 37 | Oral care | SILYPUR OC |
| 39 | Functional surfactants / cleansing | AQUASILOILS® (ECO) |
| 41 | Fair-trade / balance | ORGANIC YUZU FROM FRANCE |
| 42 | Fair-trade / protection | ORGANIC BAMBOO SAP FROM FRANCE |
| 43 | Fair-trade / nourishment | ORGANIC CAMELINA OIL FROM FRANCE |
| 44 | Fair-trade / protection | ORGANIC LOTUS FLOWERS FROM VIETNAM |

Also incorporate the booklet's taxonomy pages: p. 5 (skin care groups), p. 28 (hair/scalp groups), p. 36 (oral care), p. 38 (functional ingredients) and p. 40 (fair-trade range). Non-product storytelling pages (research, sourcing, sustainability) can inform a short **Supplier Science & Sourcing** section if the statements are dated, attributed to Greentech and client-approved. Do not create pretend products out of campaigns or page slogans.

**New high-value product examples** to demonstrate template variety, subject to exact validation:

- **TIMELYS®** (2024 p. 7): skin-longevity/well-ageing active, 1% liquid, water-soluble according to the table. Its research narrative concerns longevity-associated pathways; avoid medical or guaranteed-age-reversal statements.
- **GOLDEN MICROALGAE** (p. 7): marine microalgae-derived, 1% liquid water-soluble; source text discusses gold-bioaccumulating microalgae. Do not imply it is gold jewellery or an ordinary pigment.
- **GREENSIL** (p. 15): bamboo-derived silica mattifying powder; 0.5–5% powder, hydro/lipo-dispersible. This needs different technical fields from a liquid active.
- **JERICINE®** (p. 21): botanical moisturiser, 1–5% liquid water-soluble in the table.
- **SILYPUR OC** (p. 37): oral-care purifying active, 1–5% liquid; don't bury it under skin care or suggest it is a prescription treatment.
- **AQUASILOILS® (ECO)** (p. 39): PEG-free, oil-derived water-soluble cleanser/functional surfactant family, listed at 1–10% liquid. Its detail template should prioritise functional formulation performance, available base oils and validated INCI variants rather than skin clinical charts.

**Version reconciliation warning:** The main India PDF refers to `CLERILYS®`, while the newer 2024 catalogue names `CLERILYS W®`. The 2024 hair sheet also contains a spelling variation of `HAIR STRENGTH COMPLEX EGX 292`. Treat these as **potential variant/name changes to verify with Mindtech**, not licence to silently combine technical formulas. Log changes in use levels, INCI, preservation, claims, certification and product-code variants. The newer brochure may supersede some older data, but availability and latest TDS require confirmation.

**Regulatory/publication review:** The inclusion of CBD isolate in an international vendor brochure **does not establish that it is approved for sale or marketing in India**. Mark CBD, oral-care antimicrobial claims, sunscreen/photo-protection assertions and strong comparative claims as `needs-review` pending the client's regulatory/compliance clearance. Do not publish medicinal claims, SPF ratings, approved-use representations or distributor stock status based solely on a brochure.

### NEW: Full vegetable oils and plant butters directory

The 2022 oils brochure deserves its **own subcatalogue**, not a few generic cards in a hair tab. It documents approximately **43 named pure vegetable oils** and **four butters**. Create a `Vegetable Oils & Butters` collection with nested tabs `Pure Oils`, `Lipoactive Ingredients`, `Plant Butters`, `Functional Oil Derivatives` and concern filters such as `Dry Skin`, `Mature Skin`, `Oily Skin`, `Sun Care`, `Hair Nutrition`, `Curly/Frizzy Hair`, `Nail Care`, `Soothing`.

Seed the source-listed pure oils below, mapping each record to its exact page:

| Oils PDF page | Pure vegetable oils |
|---:|---|
| 12 | ANDIROBA, APRICOT, ARGAN, AVOCADO, BABASSU, BAOBAB |
| 13 | BLACK CUMIN, BLACK POPPY, BLACKCURRANT, BORAGO, BROCCOLI, BURITI |
| 14 | CAMELIA, CAMELINA |
| 15 | CASTOR, CHAULMOOGRA, CHIA |
| 16 | COCONUT, COTTON, DESERT DATE, EVENING PRIMROSE, GRAPE, GREEN COFFEE, HAZELNUT, HEMP |
| 18 | HIBISCUS |
| 19 | JOJOBA, LINSEED, MACADAMIA, MILK THISTLE, MORINGA, OLIVE, PISTACHIO, PRACAXI |
| 20 | PRICKLY PEAR, RICE, ROSEHIP, SAFFLOWER |
| 21 | SEA BUCKTHORN, SESAME, SWEET ALMOND |
| 23 | TIGER NUT, WHEAT |

**Plant butters, p. 25:** COCOA, MANGO, MURUMURU, SHEA.

**Specialty oily active ingredients, pp. 6–10:** SOLARINE® IV (p. 6, sun-protection/repair positioning), TAMANOL LIPACTIVE (p. 7, skin-regeneration/repair positioning), ZORYALYS® (p. 8, hair UV/pollution/colour care), and INCA INCHI® LIPACTIVE (p. 10, skin/hair repair). Reconcile ZORYALYS and INCA INCHI with their existing entries. **AQUASILOILS® (ECO)** on p. 24 is an oil-derived functional cleanser; reconcile with the 2024 p. 39 listing.

For each oil/butter retain **botanical/Latin name, source plant part, cold/hot pressing or refinement, grade, product/SKU code where printed, origin country as historically documented, fatty-acid profile where supplied, colour/appearance, sensory touch, recommended cosmetic applications and any test evidence**. Use precise claims from the particular product and grade. Do not apply a `COSMOS` or `organic` badge across the entire collection; some entries are conventional, some have optional grades, and certification marks are product-specific.

Examples of page-verified positioning:

- **ARGAN OIL**, oils p. 12: organic cold-pressed deodorised virgin kernel oil from Morocco; hair nutrition for curls/frizz, with a specific conditioner-test context. 2024 actives p. 34 also mentions argan oil. The two are cross-references/possibly different grades, not automatically two product cards.
- **BAOBAB OIL**, oils p. 12: hair/nail nutrition and dry-hair care; reconcile the **LIPACTIVE BAOBAB** family and individual approved grades rather than assuming identical products.
- **BROCCOLI OIL**, oils p. 13: hair nutrition and curly/frizzy dry-hair repair; use the supplied botanical and application descriptors.
- **CAMELINA OIL**, oils p. 14 and 2024 p. 43: skin nutrition and hair applications, with grade-specific origin/certification and potential fair-trade attribution.
- **CASTOR OIL**, oils p. 15: hair fortifying, with the documented botanical name and grade.
- **JOJOBA OIL**, oils p. 19: oil/wax with a dry touch and applications for combination-to-oily and dehydrated skin.
- **MURUMURU BUTTER**, oils p. 25; 2024 actives p. 34: highly relevant to curly/frizzy and dry hair nutrition. Handle the butter's solid/semisolid form and specific conditioner study rather than pretending it is a water-soluble liquid.
- **SHEA BUTTER**, oils p. 25: dry-skin comfort and hair nutrition, with grade-specific sourcing information.

Use the oil/butter source as the primary basis for **sensory, formulation and sourcing fields**, and the newer 2024 actives source where it adds an updated functional-use comparison. Where botanical-family overlap exists but product variants, oil grades, INCI or formulations differ, make a **parent family with explicit variants** rather than merging chemically distinct supplier SKUs. Raw material origin in these dated brochures is historical, not necessarily a guarantee for every current supply batch.

All product entries must accurately retain symbols and branded spellings. Deduplicate the same ingredient appearing in several brochures, preserving **one canonical product record with multiple source references and multiple application tags**. Label every experimental statistic with conditions, sample size, dose, duration, statistical context and page citation where available. No unsourced efficacy percentages, claims of patents, regulatory approvals, or certification badges.

## WEBSITE INFORMATION ARCHITECTURE

Keep the existing Mindtech navigation and branding. Its navigation is: **HOME, ABOUT US, PORTFOLIO, BUSINESS LINES, GLOBAL PARTNERS, WHY CHOOSE US, CONTACT US**, with the existing CONTACT US button on the right. Integrate product discovery under the existing PORTFOLIO and partner sections; do not create conflicting top-level menus or change established working URLs without a compatibility redirect.

Preferred route design, adaptable to existing conventions:

- `/portfolio` or existing `/products`: master product/ingredient discovery page.
- `/portfolio/greentech`: Greentech catalogue with application, scientific benefit, chemistry/form and concern filters. Clearly distinguish a broad **All Ingredients** view from the separate **Active Ingredients**, **Vegetable Oils & Butters**, **Functional Ingredients**, **Hair & Scalp**, **Microbiota**, **Oral Care**, and **Fair-Trade Sourcing** collections where applicable.
- `/portfolio/greentech/:slug`: single Greentech ingredient profile.
- `/portfolio/greentech/vegetable-oils`: oils and butters subcatalogue with sourced sensory/sourcing filters.
- `/portfolio/sns-silicos`, `/portfolio/vvf`, `/portfolio/fine-organics`: partner landing pages integrated into one coherent system.
- `/contact?product=<slug>&partner=greentech`: contact/enquiry destination, or a validated in-page enquiry modal.

Mindtech's **partners are GREENTECH, SNS Silicos, VVF and Fine Organics**. Give each its own branded catalogue area while clearly presenting **Mindtech as the Indian distributor/partner**, not the original inventor/manufacturer. The three uploaded PDFs support the Greentech catalogue; **do not populate SNS Silicos, VVF or Fine Organics with fabricated products.** Display verified existing content, or professionally designed “Catalogue being updated / Enquire for range” states until approved source files arrive.

## MASTER PRODUCT PAGE — VISUAL STRUCTURE

Design a distinctive, premium B2B life-sciences page. Keep the established Mindtech emerald/green identity, crisp white or off-white surfaces, graphite text, subtle botanical-laboratory imagery, generous whitespace, elegant borders, and typography matching the existing website. Respect `NATURE BEYOND THE FUTURE`. Aim for a modern 2026 biotech distributor experience, **not an online consumer shopping site**.

1. **Sticky existing header:** exact approved Mindtech logo left; navigation single row on desktop; CONTACT US right; accessible mobile menu; no horizontal overflow. Preserve current header transitions.
2. **Compact portfolio hero:** eyebrow `MINDTECH · INGREDIENT PORTFOLIO`, heading such as `Science-backed ingredients. Solutions for what's next.`, two-line description, restrained molecular/plant-inspired animation, relevant scientific image, and an anchor CTA `Explore Ingredients`.
3. **Partner selector:** authentic partner logo or typographic pill for Greentech, SNS Silicos, VVF, Fine Organics. Clear active state; no stretched logos; preserving brand identity. Show portfolio counts **computed from approved published records**, not invented numbers.
4. **Category icon rail:** inspired by Greentech's screenshot: ten circular, thin-line illustrated categories with concise labels—Anti-Ageing, Soothing, Eye Contour, Balance, Moisturising, Protection, Brightness, Exfoliation, Body and Hair. For Mindtech also provide evidence-grounded `Scalp & Hair`, `Microbiota`, `Sensitive Skin`, `Sun Care`, `Oral Care` and `Functional Ingredients` as suitable discovery facets. Provide a separate product-type navigation for **Bioactives / Botanical Extracts / Pure Vegetable Oils / Plant Butters / Functional Cleansers**; do not force the new oil and butter families into the old ten-icon cosmetic concern taxonomy. On narrower screens the category rail scrolls horizontally with snap, accessible arrows, and visible focus; never squash all ten into microscopic icons. Category selection must **actually filter** the data, not merely decorate the page. Support multi-tag products.
5. **Utility/filter bar:** full-text search by name, INCI, concern, benefit, botanical name and origin; filters for Partner, Application, Functional Benefit, Product Type, Product Family, Form (powder/liquid/butter), Solubility (water/lipo), optional natural source, and oil/butter sensory touch where sourced; sort A–Z and Z–A. Debounce search, reflect active filter chips and result counts, provide `Clear all`, preserve filters in URL query parameters, offer a useful zero-result state. Distinguish exact supplier product families from marketing benefit tags. `Organic`, `COSMOS`, `Fair for Life` and other claims must only be filterable when verified **per product/grade**.
6. **Responsive image-led product grid:** visually borrow the reference's rectangular thumbnails, light border, and name-under-image scheme, but upscale it. Use 4 columns at wide desktop, 3 at laptop/tablet, 2 on typical mobile where space allows, and 1 on narrow mobile. Card includes 16:10 or 4:3 crop, accurate product name with ® if applicable, one evidence-backed benefit line, 1–2 category chips, Greentech attribution, and discreet `View ingredient` arrow. Entire card is keyboard-accessible. Hover: modest lift, elegant emerald border/glow, image scale max 1.04, no flamboyant 3D effects. Images must accurately relate to ingredient or a clearly generic category visual; do not misrepresent clinical results.
7. **Scientific reassurance strip:** concise, sourced copy about breadth of skin/hair/microbiota portfolio; do not turn brochure claims about Greentech's research or global scale into claims that Mindtech itself achieved them.
8. **B2B enquiry callout:** `Looking for the right active for your formulation?` with `Request a Sample` and `Speak to Our Team`. No pricing cart or consumer checkout unless separately commissioned.
9. **Footer:** retain Mindtech contact details, copyright, partners, appropriate privacy/legal references and the existing site style.

## INDIVIDUAL INGREDIENT DETAIL PAGE

Use one reusable dynamic template driven by the structured product record. The Greentech site demonstrates the core reading order: title, action, origin, description, mechanism, cosmetic benefits, applications, sample request, all-products/back-category links and related actives. Modernize that into:

1. Breadcrumbs `Portfolio / Greentech / [Concern] / [Ingredient]` and back-to-results control that preserves active filters.
2. Product hero: ingredient name, category and proprietary mark, authentic visual, concise claim **from PDF**, `By Greentech · Presented by Mindtech Biotechnology`, and primary `Request Sample` / secondary `Enquire About Ingredient` CTA.
3. Overview fact panel with **Action/Benefits, Application, INCI, Recommended Use Level, Physical Form, Solubility, Natural Source/Origin** only when present and validated. Handle ranges and qualifiers exactly as written. Do not infer formulation compatibility from a category label. For oils and butters, adapt the fact panel to **Latin Botanical Name, Plant Part, Extraction/Refining Method, Grade, Supplier Reference Code, Sensory Touch, Country of Source (brochure edition), Fatty-Acid/Nutrient Profile, Form and Cosmetic Uses**; do not invent a use percentage or solubility value where a pure-oil table gives none.
4. Structured detail sections: `What it does`, `Origin & technology`, `Mechanism / Scientific rationale`, `Formulation applications`, `Evidence & studies`, `Technical specifications`, and `Documents & enquiry`. For pure oils/butters, use `Botanical Identity`, `Sourcing & Grade`, `Composition & Sensory Profile`, `Formulation Applications` and `Supporting Test Context`. For functional cleansers, use `Cleansing/Foaming/Emulsification Performance`, `Functional Chemistry` and `Formulation Use`. Collapse dense technical content elegantly on mobile, but keep it crawlable and accessible.
5. Evidence section with small, clean **source-faithful** graphs or key-study callouts where approved. State in-vitro, ex-vivo, in-vivo separately and preserve controls, time periods, sample counts, doses and limitations. No medical promises, no misleading universal certifications. The original PDF chart can also be shown only if permission and readable attribution exist.
6. Download area: public product brochure only after explicit publishing approval; gated TDS/SDS/COA or other restricted data via lead/request workflow if required. Never expose confidential source PDFs or private asset URLs by default.
7. Smart sample/technical enquiry form with auto-filled product and partner, name, business email, company, country/city, enquiry type, message, required consent and validation. Send to a configured **Mindtech** endpoint/CRM/mailbox. Add anti-spam measures and a clear success/error state. Never redirect enquiries to Greentech's own sample form. No fake submission-success toast.
8. `You may also explore` related ingredients generated from overlapping concerns and source-verified tags; link back to same partner and catalogue. Optional persistent mobile enquiry CTA that does not block content.

### Example data model

Implement typed, editable records (or a compatible CMS/Firestore collection), with roughly these fields:

```ts
type Ingredient = {
  id: string;
  slug: string;
  name: string;
  partner: 'greentech' | 'sns-silicos' | 'vvf' | 'fine-organics';
  productFamily?: string;
  productType: 'bioactive' | 'botanical-extract' | 'pure-oil' | 'plant-butter' | 'oily-active' | 'formulation-functional' | 'range';
  parentFamilyId?: string;       // e.g. COSMELENE, APRICOT / LIPACTIVE APRICOT
  variantId?: string;            // exact supplier grade or formulation
  supplierCode?: string;
  applications: string[];       // skin, hair, scalp, body, etc.
  benefitTags: string[];        // anti-ageing, microbiota, soothing, etc.
  shortBenefit?: string;
  description?: string;
  origin?: string;
  botanicalName?: string;
  plantPart?: string;
  extractionMethod?: string;
  grade?: string;
  originCountries?: string[];    // brochure-specific historical origins
  sensoryTouch?: string;
  fattyAcidProfile?: string;
  technologies?: string[];
  inci?: string;
  useLevel?: string;
  physicalForm?: string;
  solubility?: string;
  mechanism?: string;
  cosmeticUses?: string[];
  studySummary?: string;
  claims?: { text: string; studyType?: string; context?: string; sourcePage: number }[];
  certifications?: { name: string; evidencePage: number; appliesToVariantId?: string; verifiedAsOf?: string }[];
  image?: string;
  images?: string[];
  datasheetUrl?: string;        // only if client-approved for public use
  sourceRefs: { file: string; pages: number[]; editionYear?: number; note?: string }[];
  reconciliationNotes?: string[];
  verificationStatus: 'verified' | 'needs-review' | 'draft';
  publicApproved: boolean;
  updatedAt?: string;
};
```

The actual content source must be in data records—not hardcoded `if (product === ...)` branches inside JSX. Only publish `publicApproved` records. Provide a clearly identified product staging/approval workflow so the client can correct INCI, usage, grade, certification or availability without editing dozens of components. Add a **source-precedence/reconciliation log**, because the 2024 catalogue may provide a newer name, range or claim than the 2022/2023 material. Never silently treat `APRICOT` pure oil, `LIPACTIVE APRICOT`, and `AQUASILOILS` based on apricot as identical purchasable SKUs.

## FOUR SAMPLE PRODUCT TYPES TO IMPLEMENT FIRST

**ACNILYS®:** Main India brochure p. 7. Benefit: oily skin regulator / microbiota modulator; the page lists INCI as `Propanediol, Water, Rhodomyrtus Tomentosa Fruit Extract`, 2% use and liquid water-soluble form. Use p. 7 as the authoritative source for exact detail and any study callouts. Also consult microbiota booklet p. 4. Do not present clinical-study percentages without their study design and comparator context.

**HAIRILINE®:** Main India brochure p. 22, specialist hair brochure p. 4 and microbiota brochure p. 10. Benefit: hair-loss care / scalp microbiota modulation. Main India brochure lists INCI `Propanediol, Water, Lindera Strychnifolia Root Extract` and 1% use. Reconcile duplicated evidence rather than making three product cards. Label findings as cosmetic-product research, never guarantees of hair regrowth.

**TIMELYS®:** 2024 actives catalogue p. 7. Example of a **newer 2024 well-ageing active** with supporting source claims, 1% recommended concentration, liquid/water-soluble form. Keep any cellular pathway statements appropriately qualified and attributed to Greentech's source.

**MURUMURU BUTTER:** Oils and butters brochure p. 25, with another mention in the 2024 actives p. 34. Example of a **non-liquid plant butter**, with specific botanical identity, physical/sensory properties, hair-nourishing use, source location and study context. Do not force this into a microbiota-study template.

Use all four as template acceptance tests before automatically generating the complete five-PDF directory. Then verify all unique product records, family relationships and source references.

## TECHNICAL IMPLEMENTATION

- Integrate with **existing React 18 + TypeScript + Vite + Tailwind CSS** architecture and existing `motion/react`, Lucide icon usage, React routing, components, and backend if present. Do not assume Firestore is active simply because earlier project versions used it; inspect first. Preserve deployment compatibility with the current preview/hosting environment.
- Use reusable `PortfolioPage`, `PartnerSelector`, `ConcernRail`, `ProductTypeTabs`, `IngredientFilters`, `IngredientCard`, `IngredientDetail`, `OilAndButterDetail`, `ScienceEvidence`, `IngredientEnquiryForm`, and `RelatedIngredients` components (names flexible).
- Prefer data-driven pages and lightweight assets over a heavy carousel framework. If using Firestore/CMS, configure read rules and data management securely. If no backend exists for data, start with typed local JSON and a migration-ready structure; a functioning server endpoint is required for a genuinely functional enquiry form.
- Carefully handle URL slugs, browser back/forward, filter query parameters, search debouncing, loading and empty states, stable keys, error boundaries, and broken image fallbacks.
- Use micro-animation: 100–200 ms hover states, subtle staggered card reveal (about 30–50 ms separation), small underline/progress indicator in emerald, restrained hero motion. Respect `prefers-reduced-motion`; avoid animating dozens of images on scroll or slowing down mobile.
- Semantics and accessibility: proper headings (single H1), alt text, real buttons/links, ARIA for rail and filters, visible keyboard focus, contrast, touch targets at least 44 px where practical, accessible modal close/focus management.
- Performance: responsive `srcset` and intrinsic image sizes, lazy loading below fold, AVIF/WebP where supported, avoid 5,000-pixel source JPGs in 200-pixel cards, skeleton states, avoid layout shifts, code-split detail pages, keep bundle lean. Aim for good Core Web Vitals; verify rather than fabricate benchmark scores.
- SEO: canonical partner and product URLs, meaningful page titles and descriptions, breadcrumb links, sitemap, open-graph preview, product/organization structured data only where semantically correct, no fabricated offers/ratings/reviews.
- Security/privacy: validate enquiries server-side; protect PII, rate-limit, manage consent, never put API keys in client bundles; honor image/doc publishing rights.

## STRICT REQUIREMENTS

1. **No change to the existing approved Mindtech logo**—never redraw it or invent a new logo.
2. **Mindtech identity must dominate**, with Greentech visibly identified as a partner/manufacturer.
3. **No unsupported or invented products** for other partners; no false patent, certification, INCI, scientific study, efficacy or availability claims.
4. **No pixel-perfect copying** of Greentech's copyrighted creative design, category icons or website image assets without permission. Use the structural concept with original, consistent Mindtech visuals, plus approved images from client documents.
5. All cards open real, useful detail pages; all filters work; all CTAs work or are clearly blocked from launch until configured.
6. Preserve every existing working page, route, animation and responsive behavior unless specifically necessary to improve the portfolio integration.
7. Do not introduce horizontal scrolling or tiny six-across mobile cards.
8. Do not publish confidential PDFs, study data, contact details from vendor booklets or restricted technical documents without client approval.

## DELIVERABLES AND ACCEPTANCE TESTS

First review the existing repository and output a concise **existing architecture + proposed integration plan**. Then implement the pages end to end.

Provide:

1. Working responsive master portfolio and Greentech category grid.
2. Working detail pages for ACNILYS® and HAIRILINE® first, then approved catalogue entries.
3. Partner-specific landing pages for all four partners, with accurate source status.
4. Fully integrated **2024 Greentech active-ingredients** subcatalogue and **pure oils/plant butters** subcatalogue, including the newly documented oral-care and functional ingredient collections.
5. Search, filters, active category UI, URL state and related-ingredient navigation; confirm a user can independently find TIMELYS®, LACTOPHYT®, AQUASILOILS®, JOJOBA OIL and MURUMURU BUTTER.
6. Actual validated Mindtech sample/enquiry flow and appropriate fallback/errors.
7. Source mapping sheet/table: product ID, display name, **all five** PDFs and exact pages, multiple grades/variants, source precedence, data verification issues, asset permission and public approval state.
8. A client-review list of ambiguous names, duplicated records, grade-specific certification claims, conflicting editions, claims requiring review, and restricted documents requiring explicit publishing permission.
9. Desktop, tablet and mobile screenshot checks, keyboard checks, route/link checks, search/filter scenarios, form validation and image loading checks.

**Final quality bar:** a senior R&D/formulation professional can locate the right **active, functional ingredient, pure vegetable oil or plant butter** in seconds, evaluate the available source-backed technical summary, understand that Mindtech distributes Greentech ingredients, and submit a legitimate enquiry. The end result should feel like a premium international biotech portfolio, visually inspired by Greentech's browsable catalogue but more readable, accessible, responsive, elegant and professional. **No source file is omitted; no source-page tables are blindly or incorrectly merged.**
