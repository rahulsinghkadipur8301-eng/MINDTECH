# UNIFIED MASTER BUILD PROMPT — MINDTECH BIOTECHNOLOGY
## All four partners, 2026 Mindtech catalogue, and all legacy Greentech brochures

### Task

Upgrade the **existing** Mindtech Biotechnology India Pvt. Ltd. website into a premium, responsive, animated, scientifically grounded B2B product-discovery experience that supports ALL four named manufacturer partners:

1. GREENTECH BIOTECHNOLOGIES — natural, biotech, skin, hair, scalp, microbiota, oils, butters and functional ingredients.
2. FINE ORGANICS — emulsifiers, specialty esters, emollients, surfactants, green functional ingredients and waxes.
3. SNS SILCOS — silicone fluids, silicone elastomer blends, film formers and conditioning systems.
4. VVF LIMITED — VEGAROL and Promisoft surfactants, conditioning agents and syndet materials.

The project must **not** reduce Greentech to the 2026 selection: integrate the five previously supplied Greentech PDFs as historical technical sources and product-discovery candidates, including the approximately 43 pure vegetable oils and four plant butters in the 2022 oils booklet. Retain older actives such as BIOTILYS®, LIFTISS®, and legacy microbiota/hair products that are not visible in the current Mindtech curated list. Do not claim that every historical or global manufacturer product is now supplied, stocked, available, current, or approved for publication by Mindtech.

**This first section supersedes conflicting assumptions in the earlier Greentech-focused prompt appended below.** Apply this section to all four suppliers and use the appended technical annex for the rich Greentech-specific extraction, science and user experience requirements.

### Required input files and source priority

Read these inputs; do not pretend that missing attachments have been read. If a file is absent in the target development environment, identify it before implementing product data:

- "MINDTECH CATALOG  -  2026.pdf" — client distributor catalogue, 30 pages.
- "mindtech_partner_products_2026.xlsx" — supplier-separated source rows, 196 unique listing names, including 35 unassigned.
- "mindtech_products_2026_website.json" — website-ready baseline records with partner, INCI / constituents, benefits, applications, catalogue dosage, PDF source pages, slug, and pending approval status.
- "Catalogue India_compressed.pdf" — older Greentech India catalogue, 32 pages.
- "Plaquette Hair Care 2021_V02-PRINT.pdf" — Greentech hair and scalp care, 16 pages.
- "Plaquette Microbiote-PRINT.pdf" — Greentech microbiota catalogue, 12 pages.
- "Plaquette actifs Greentech 2024-PRINT.pdf" — Greentech actives and application tables, 48 pages.
- "Plaquette Vegetable Oils Greentech 2022-PRINT.pdf" — Greentech pure oils, oily actives and butters, 28 pages.
- Any previously supplied approved partner logo and Greentech visual-reference screenshot; do not redraw Mindtech's exact logo.

Use the 2026 Mindtech catalogue and JSON as the **current distributor-listed baseline**, and legacy PDFs as **technical enrichment / historic product candidates**. An older Greentech mention is not proof of current Mindtech distribution. Product facts must retain PDF filename, edition, exact page, a confidence/review state, and any conflicting manufacturer nomenclature. The 2024 Greentech technical content may refine the 2023 description, but only a current TDS/SDS or client approval can confirm current commercial specifications, legal claims or market availability. Never mix an INCI or dosage from one row into a neighboring row: rendered PDF tables can have corrupt text order.

### Product count and integrity baseline

2026 Mindtech catalogue: Greentech **92** unique display names, Fine Organics **48**, SNS Silcos **14**, VVF **7** = **161** partner-linked names, plus **35 Mindtech ingredients with supplier unassigned**. Total distinct listing names: **196**. These are catalogue row/name counts, NOT necessarily individual SKU counts; slash-separated grades such as BTMS 25/50 or MG 9000/9500 may require separate variant records after confirmation.

Create five top-level dataset views: Greentech, Fine Organics, SNS Silcos, VVF, and Mindtech Other/Unassigned. Do not assign the unbranded material on Mindtech PDF pages 6–11 or the Japan liposomal section on page 17 to SNS or any partner by proximity. Preserve the unassigned 35 as a separate client-review queue and optional Mindtech-brand portfolio area.

A source attribution discrepancy exists on page 14: Finester EG 1018, Finester EG 1020, Finester DG 2018 and Finester DG 2012 appear below a VVF logo, whereas external Fine Organics product material identifies these as Fine Organics / Finester products. Temporarily group them under Fine Organics with an explicit "Supplier attribution requires confirmation" note. Never quietly hide the source conflict.

### Complete product seed — Fine Organics (48 distinct catalogue names)

**FinaGreen green/natural-origin ingredients:** FinaGreen 1008 (Polyglyceryl-10 Caprylate/Caprate; green emulsifier/solubilizer); FinaGreen 1199 (Sodium Lauroyl Lactylate; mild surfactant/co-emulsifier); FinaGreen 3042 (Polyglyceryl Polyricinoleate; W/O emulsifier, cosmetics); FinaGreen 3810 (Polyglycerin-3 and polyglyceryl esters; multifunctional cleansing/emulsification); FinaGreen 8100 (Coco-Caprylate/Caprate; natural-derived emollient).

**Finamide cleansing/foam:** Finamide CD 12 (Coco Diethanolamide; foam/viscosity builder); Finamide LD 12 (Lauric Diethanolamide; thickener/foam stabilizer).

**VBrass structuring:** VBrass Butter (Stearyl Erucate and Stearyl Behenate; emollient/conditioning); VBrass Crystalline Wax (Stearyl Behenate; hardness/structure); VBrass Soft Wax (Behenyl Erucate; flexibility/texture).

**Finester glyceryl/emulsifying grades:** Finester 1650, 2240, 2816, 2840, 2842, 2860, 2880, 2882, GMS 40 (LG), GMS 4654V, MG 9000/9500.
- Examples: 1650 is Glyceryl Monostearate + PEG-100 Stearate for self-emulsification; 2240/2840/2860 are Glyceryl Monostearate grades for creams and lotions; 2816 is Glyceryl Monopalmitate for conditioning; 2842 is Glyceryl Distearate for consistency; 2880/2882 are Glyceryl Monooleate grades for spreading and dispersion.

**Finester sorbitan esters:** Finester 2000 (Sorbitan Monolaurate), 4000 (Sorbitan Monopalmitate), 6000 (Sorbitan Monostearate), 6030 (Sorbitan Tristearate), 6080 (Sorbitan Monooleate), 6085 (Sorbitan Trioleate). Functions: emulsification, auxiliary emulsification, wetting or dispersion, with individual grade validation.

**Finester other specialty esters/emollients:** Finester BS 4018 (Butyl Stearate), CC 8010 (Caprylic/Capric Triglyceride), CP 1416 (Cetyl Palmitate), CS 1418 (Cetearyl Stearate), EP 6016 (Ethylhexyl Palmitate), EP 6018 (Ethylhexyl Stearate), LANS (lanolin substitute; exact INCI pending), OO 1880 (Oleyl Oleate), SS (Stearyl Stearate), TS 3018 (Tridecyl Stearate).

**Finester functional/co-emulsifying and glycol grades:** Finester 1009 (Sodium Lauroyl Lactylate), 2112 (PEG-200 Monolaurate), 4112 (PEG-400 Monolaurate), 4180 (PEG-400 Monooleate), 6218 (PEG-400 Monostearate), 7000 (Propylene Glycol Monostearate), SL (Sodium Stearoyl Lactylate), DG 2012 (Diglycol Laurate), DG 2018 (Diglycol Stearate), EG 1018 (Ethylene Glycol Monostearate), EG 1020 (Ethylene Glycol Distearate).

Do not infer every grade is chemically interchangeable or use the same INCI/specifications for all product-family codes. Include all exact names and source page references from the 2026 JSON; link a supplier's manufacturer detail page only after reviewing the actual matched item.

### Complete product seed — SNS SILCOS (14 catalogue names)

Make a **Silicones & Silicone Specialties** landing page with meaningful functional filtering and a detail page for every record:

1. SNS SFL 45 — Cyclopentasiloxane; spreadability, silky fluid, skin/hair/makeup.
2. SNS STC 44 — Cyclotetrasiloxane; silicone carrier for skin/hair/cosmetics.
3. SNS SGB 15 — Cyclopentasiloxane + Dimethiconol; conditioning, smoothness.
4. SNS SF 350 M — Dimethicone; conditioning, protective film.
5. SNS SPF 56 — Phenyl Trimethicone; sensorial shine, slip, gloss.
6. SNS SEB 45 — Cyclopentasiloxane + Dimethicone Crosspolymer; elastomer texture.
7. SNS SEP 93 — PEG-12 Dimethicone; silicone formulation aid in cleansers.
8. SNS SEP 85 — Dimethicone + TEA Dodecylbenzenesulfonate; 2-in-1 hair conditioning.
9. SNS SAE 49 — Amodimethicone + Cetrimonium Chloride + Trideceth-12; shampoo/conditioner.
10. SNS SCB 79 — Cyclopentasiloxane + Trimethylsiloxysilicate; film forming, lipstick and cosmetics.
11. SNS SMR 16 — Trimethylsiloxysilicate; film former.
12. SNS SAF 701 — Dimethicone/Vinyl Dimethicone Crosspolymer + Silica; soft-focus/powder texture.
13. SNS SCB 31 — multi-component silicone elastomer blend, hair/skin/sun care.
14. SNS SCB 21 — multi-component silicone elastomer blend, hair styling and colour cosmetics.

Keep exact multi-ingredient INCI as recorded in the JSON. Display dosage only as "Catalogue reference, subject to technical verification" and only after client review; show "Not specified" for SNS SMR 16. Do not invent downloadable SNS brochures, manufacturer patents or tests.

### Complete product seed — VVF Limited (7 catalogue names)

Create a dedicated **VVF Conditioning & Syndet Ingredients** page, distinct from Fine Organics:

1. VEGAROL BT 80 — Behentrimonium Chloride; hair conditioning, softness, anti-static.
2. VEGAROL CT 25/30 — Cetrimonium Chloride; conditioning, anti-static.
3. VEGAROL BT 70 — Behentrimonium Chloride + Dipropylene Glycol; conditioning and lubrication.
4. Promisoft BTMS 25/50 — Behentrimonium Methosulfate + Cetyl/Cetearyl Alcohol; deep conditioning, combability.
5. Promisoft G 20 — Octyldodecanol; emollient and lubricant for skin/hair.
6. VEGAROL SCI 85 — Sodium Cocoyl Isethionate; mild foaming syndet/cleansing.
7. Promisoft SN 553 — proprietary syndet base; mild cleansing and foam.

Show specific intended formulations (conditioner, styling, shampoo, face wash, syndet bar) from the Mindtech catalogue. Keep 25/30 and 25/50 as catalogued grade groups until actual variants are confirmed. Do not list VVF's entire global oleochemical or consumer-soap inventory under Mindtech unless the client supplies proof of the relationship for those items.

### Greentech — complete 2026 baseline plus historical enrichment

Import **all 92** Greentech records in the 2026 JSON, not just the selected examples below. The current catalogue clusters them into: well-aging, antioxidants, renewal, brightening, eye care, sebum control, hydration, skin repair, soothing/sensitive skin, sun/pollution, body care, hair growth/loss/greying, hair repair, curly hair/styling, hygiene, nail care, cleansing, sensorial ingredients and natural-origin ingredients. A single active can have multiple category tags without duplicate product cards.

For a fallback inventory, check these current names against the JSON and add only missing canonical records:
- Well-aging: HEBELYS®, EPICA®, NUCLEOLYS®, SETILINE® SN, COSMELENE® CENTELLA, GOLDEN MICROALGAE, TIMELYS®, REVERSKIN®, QT40®, COSMELENE® TERMINALIA, COSMELENE® GINSENG, COSMELENE® HORSETAIL, LIPACTIVE® GREEN COFFEE.
- Antioxidants/renewal: TEALINE®, FERMENT'ACTIVE GOJI, FERMENT'ACTIVE POMEGRANATE, CIRCALYS®, SOMITINE®, FLOWERACIDS®, PROTEASE, ACEROMINE®, RETIMINE® III, ROSAMINE.
- Brightening/eye: CLERILYS® / CLERILYS W®, PHYTELENE COMPLEX LIGHTENING, RAYOLYS®, SOLIBERINE®, MYRALYS®, CERNILYS®.
- Oily/sensitive/hydrating skin: ACNILYS®, CANNABIDIOL (CBD) ISOLATE POWDER, GREENSIL®, SEBORILYS®, CARICILINE®, COSMELENE® NEPTUNE, HYDRALYS M, HOLOBIOSYS®, JERICINE®, POLEVAN S, EXPOZEN®, PROTECTOL®, BIOMODULINE®, COSMELENE® ECHINACEA, COSMELENE® MATRICARIA, COSMELENE® PASSION FLOWER, SILIDINE® SN, COSMELENE® HAWTHORN.
- Lipactive/body/sun: LIPACTIVE® CAMELINA, LIPACTIVE® INCA INCHI, LIPACTIVE® TAMANOL, URBALYS®, LIPACTIVE® SOLARINE®, SUN PROTECTION COMPLEX, ARP 100, KIGELINE®, TIMILINE®, IAA 50, COSMELENE® IVY, ANTI-STRETCH MARK COMPLEX.
- Hair/scalp: ARCOLYS®, HAIRILINE®, KAPILARINE, HAIR STRENGTH EGX 292, DANDRILYS®, TILICINE®, LIPACTIVE® APRICOT, LIPACTIVE® BAOBAB, GLIALYS 21, HYDROLYZED KERATIN, HYDROLYZED PEA PROTEINS, ARGAN OIL, MURU MURU BUTTER, HAIR LUSTRE KARKADE, HAIR VOLUMIZING COMPLEX, ZORYALYS®.
- Hygiene/nail/functional: LACTOPHYT®, ANTIPERSPIRANT NATURAL COMPLEX, LIPACTIVE® BABASSU, AQUASILOLS® ECO, SILYPUR OC, GREENSOFT™, SENSOL 100™, SOFT BUTTER™.
- Natural-origin entries: ORGANIC YUZU FROM FRANCE; ORGANIC ALOE VERA FROM MEXICO; ORGANIC BAMBOO SAP FROM FRANCE; ORGANIC COCONUT SAP FROM INDONESIA; ORGANIC CAMELINA OIL FROM FRANCE; ORGANIC FAIR TRADE INCA INCHI FROM PERU; ORGANIC LOTUS FLOWERS FROM VIETNAM; ORGANIC SWEET ALMOND MILK FROM PALESTINA; ORGANIC TURMERIC FROM MADAGASCAR.

**Additional legacy candidates specifically requiring inclusion in internal product discovery and source review:** BIOTILYS® (microbiota defence/skin barrier), LIFTISS® (instant smoothing/tensor), legacy FLOWER ACIDS® spelling, KAPILARINE COMPLEX, ANTI-DANDRUFF COMPLEX, HYDROPROSOIE (hair specialist catalogue mention), TABASHIREX (exfoliant noted in actives tables), and any other distinct named grades found in the five historical PDFs. Do not assign confirmed current availability just because historical brochures contain them.

**The 2022 Vegetable Oils & Butters subcatalogue MUST be complete:** roughly 43 distinct pure oils (ANDIROBA, APRICOT, ARGAN, AVOCADO, BABASSU, BAOBAB, BLACK CUMIN, BLACK POPPY, BLACKCURRANT, BORAGO, BROCCOLI, BURITI, CAMELIA, CAMELINA, CASTOR, CHAULMOOGRA, CHIA, COCONUT, COTTON, DESERT DATE, EVENING PRIMROSE, GRAPE, GREEN COFFEE, HAZELNUT, HEMP, HIBISCUS, JOJOBA, LINSEED, MACADAMIA, MILK THISTLE, MORINGA, OLIVE, PISTACHIO, PRACAXI, PRICKLY PEAR, RICE, ROSEHIP, SAFFLOWER, SEA BUCKTHORN, SESAME, SWEET ALMOND, TIGER NUT, WHEAT) and four butters (COCOA, MANGO, MURUMURU, SHEA). The 2022 PDF documents exact grades, botanical names, supplier product codes, origins, sensory touches, composition and applications; source each record. Oils should have the historical brochure status until Mindtech confirms its current offering.

**Do not automatically equate** ARGAN OIL with a LIPACTIVE version, or APRICOT OIL with LIPACTIVE APRICOT, or MURUMURU BUTTER with every generic butters catalogue entry; preserve source/formula/grade differences. Reconciling the same product across multiple brochures yields one canonical record with multiple source citations; different formulations receive separate explicit variants. Distinguish a supplier-verified product from a mere mention or legacy candidate.

### Partner catalogue UI (all four, not Greentech-only)

- Preserve the exact existing Mindtech logo, company name and tagline "NATURE BEYOND THE FUTURE."
- Keep approved navbar: HOME, ABOUT US, PORTFOLIO, BUSINESS LINES, GLOBAL PARTNERS, WHY CHOOSE US, CONTACT US; maintain the right-hand CONTACT US CTA.
- Master /portfolio page: prominent hero, accessible interactive partner grid, number-of-products displays sourced from approved data, category rail, universal search and filters by company/application/INCI/function/form, and latest verified technical data.
- /portfolio/greentech: grouped live actives, legacy review collection, microbiota science, hair/scalp, **Vegetable Oils & Butters**, botanical sourcing and functional cleanser categories.
- /portfolio/fine-organics: Finester, FinaGreen, Finamide and VBrass family navigation; use-case filters for skin, hair, cleansing, makeup, pharma and waxes; per-product INCI/function/use application.
- /portfolio/sns-silcos: silicone fluid, elastomer, conditioning emulsion and film former categories; clean high-tech molecular visuals.
- /portfolio/vvf: hair conditioning and mild cleansing/syndet groups, visibly distinct from Fine Organics.
- /portfolio/other-ingredients: generic Mindtech-supplied actives and the Japan liposomal entries, with supplier "To be confirmed"; do not expose the review queue if the client does not approve it.
- /portfolio/{partner}/{product-slug}: fast, semantic, source-backed detail page with approved image, manufacturer, benefits, verified INCI, typical application, formulation notes, source-controlled technical specs, related products and a functional Mindtech enquiry CTA.
- Expose a pending-approval state only in an internal admin/editor workflow. Public users must never see made-up availability or incomplete claims.
- Use smooth original editorial/biotech art direction: emerald, white and restrained deep navy; partner color accents; responsive science illustrations; animated category transitions, tasteful reveal, filters and micro-interactions; reduced-motion support. Avoid excessive motion that harms technical readability or mobile performance.
- User journey must be B2B: view product, compare ingredient options, request a sample, request TDS/SDS or speak with a Mindtech technical representative. No consumer cart, invented prices, sales stock labels or unapproved downloadable technical documents.
- Search by exact trade name, spelling variants, INCI, supplier, application and ingredient family. Return tagged variants and indicate whether current or historical. No fake search results.
- Server-backed enquiry form must prefill partner and product, validate business email/company and submission, store/send to the configured Mindtech destination, show actual success/failure and mitigate spam.

### Data and acceptance requirements

Implement an editable typed dataset; minimum fields:
product_id, canonical_name, aliases, partner, product_family, grade_or_variant, category_tags, ingredient_type, inci_or_actives, botanical_name, composition, description, validated_functions, applications, form, solubility, usage_level_and_source, approved_claims, source_documents_and_page_numbers, source_edition, asset_rights, technical_document_permission, supplier_attribution_status, availability_status, public_approved, review_notes, slug, related_product_ids.

**Publish only when public_approved=true.** The website can display information approved by Mindtech; unconfirmed legacy items remain draft for administrator review. Build a CSV/JSON import path that can absorb revised client data without rebuilding components.

Validate:
1. All 161 named partner-linked 2026 records are imported (92 Greentech, 48 Fine, 14 SNS, 7 VVF).
2. All 35 unassigned entries remain unassigned.
3. All 5 legacy Greentech PDFs have source-index coverage; no PDF silently omitted.
4. BIOTILYS®, LIFTISS®, all legacy pure oil/butter rows, and source-backed microbiota/functional ingredients are represented as current or legacy-review records, never invented current-stock records.
5. A multi-source active has one canonical detail page, unless formula/grade differs; source refs merge.
6. Fine Organics page-14 supplier logo discrepancy remains a visible internal review issue.
7. Every product card has a functioning detail link; partner filters, benefit chips, search, breadcrumbs, browser back/forward and related suggestions work.
8. Enquiry actually submits or remains launch-blocked, with no fake toast.
9. Desktop/tablet/mobile rendering has no horizontal overflow, clipped labels or dead controls; keyboard and reduced-motion checks pass.
10. Deliver source reconciliation, content QA report, approvals needed, sample URLs, and before/after implementation summary.

### Existing Greentech technical annex

The following is the previously prepared detailed Greentech prompt. Retain its exact PDF page maps, scientific-example constraints, source extraction guidance and advanced UI/technical instructions. Where it says "Greentech-only", interpret within the expanded four-supplier architecture above.

---

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

