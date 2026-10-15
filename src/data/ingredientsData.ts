export interface RawMaterialItem {
  id: string;
  name: string;
  inci: string;
  casNo?: string;
  principal: 'Fine Organics' | 'VVF Limited' | 'SNS Silcos' | 'Greentech France' | 'Mindtech Direct';
  category: 'Skin Care' | 'Hair Care' | 'Sun Care' | 'Color Cosmetics' | 'Mild Cleansing' | 'Bio-Actives';
  function: string;
  recommendedDosage: string;
  appearance: string;
  certifications: string[];
  keyBenefits: string[];
  description: string;
}

export const INGREDIENT_CATALOG: RawMaterialItem[] = [
  // 1. SKIN CARE & BIO-ACTIVES (Greentech & Mindtech)
  {
    id: "hebelys",
    name: "HEBÉLYS®",
    inci: "Sphingomonas Ferment Extract",
    principal: "Greentech France",
    category: "Bio-Actives",
    function: "Senescence Reversal & Cellular Longevity Actives",
    recommendedDosage: "1.0% – 2.0%",
    appearance: "Clear to opalescent amber liquid",
    certifications: ["COSMOS Approved", "IECIC China Listed", "ISO 16128 Natural 99%"],
    keyBenefits: ["Targets cellular senescence (zombie cells)", "Boosts skin density and collagen I", "Improves skin luminosity & texture"],
    description: "Patented biotechnology active produced by fermentation of Sphingomonas paucimobilis, designed to limit the accumulation of senescent cells."
  },
  {
    id: "reverskin",
    name: "REVERSKIN®",
    inci: "Phytosterols, Glycolipids",
    principal: "Greentech France",
    category: "Bio-Actives",
    function: "Epidermal Redensifier & Dermo-Epidermal Junction Booster",
    recommendedDosage: "1.0% – 3.0%",
    appearance: "Viscous pale yellow fluid",
    certifications: ["COSMOS Approved", "Preservative-Free", "IECIC China Listed"],
    keyBenefits: ["Recreates epidermal volume", "Strengthens DEJ anchoring", "Smooths deep wrinkles in mature skin"],
    description: "Botanical lipid complex rich in phytoecdysteroids from Polypodium vulgare rhizomes, restoring youthful epidermal architecture."
  },
  {
    id: "expozen",
    name: "EXPOZEN®",
    inci: "Hydrolyzed Rhodophycea Extract",
    principal: "Greentech France",
    category: "Skin Care",
    function: "Exposome Defense & Neuro-Sensory Soothing",
    recommendedDosage: "1.0% – 2.5%",
    appearance: "Reddish brown aqueous solution",
    certifications: ["COSMOS Approved", "Halal Compliant", "Marine Sustainable"],
    keyBenefits: ["Reduces skin redness & neuro-inflammation", "Protects against pollution & UV exposome", "Alleviates tingling and stinging sensations"],
    description: "Halymenia durvillei red algae active developed specifically to shield reactive and sensitive skin from environmental stressors."
  },
  {
    id: "sodium-hyaluronate",
    name: "Sodium Hyaluronate (Multi-Molecular)",
    inci: "Sodium Hyaluronate",
    casNo: "9067-32-7",
    principal: "Mindtech Direct",
    category: "Skin Care",
    function: "Deep Dermal Hydrator & Moisture Reservoir",
    recommendedDosage: "0.1% – 1.5%",
    appearance: "White crystalline powder",
    certifications: ["Non-GMO", "Vegan Certified", "EP/USP Grade", "ECOCERT"],
    keyBenefits: ["Multi-depth skin hydration (Oligo, Low, Medium, High MW)", "Strengthens stratum corneum moisture retention", "Plumps fine lines and enhances barrier integrity"],
    description: "Biotechnologically bio-fermented hyaluronic acid fractions tailored for intensive hydration serums, barrier repair creams, and essence lotions."
  },
  {
    id: "niacinamide-pc",
    name: "Niacinamide PC Grade (Low Nicotinic Acid)",
    inci: "Niacinamide",
    casNo: "98-92-0",
    principal: "Mindtech Direct",
    category: "Skin Care",
    function: "Brightening, Sebum Balancing & Barrier Support",
    recommendedDosage: "2.0% – 5.0%",
    appearance: "Fine white crystalline powder",
    certifications: ["USP/BP Grade", "Residual Nicotinic Acid < 100 ppm", "Halal Certified"],
    keyBenefits: ["Ultra-low residual nicotinic acid prevents facial flushing", "Fades hyperpigmentation & post-acne marks", "Refines pore appearance & regulates sebum"],
    description: "Ultra-pure cosmetic grade Vitamin B3 specially formulated to prevent skin tingling or redness while delivering maximum brightening efficacy."
  },

  // 2. HAIR CARE & CONDITIONING
  {
    id: "arcolys",
    name: "ARCOLYS®",
    inci: "Picrorhiza Scrophulariiflora Root Extract",
    principal: "Greentech France",
    category: "Hair Care",
    function: "Anti-Greying & Hair Pigmentation Repigmenting Active",
    recommendedDosage: "1.0% – 2.0%",
    appearance: "Dark amber fluid",
    certifications: ["COSMOS Approved", "Patented Active", "ISO 16128 100% Natural"],
    keyBenefits: ["Stimulates melanin synthesis at the hair bulb", "Protects follicular melanocytes against oxidative stress", "Clinically proven to reverse hair greying without synthetic dyes"],
    description: "Ayurvedic plant-derived active that restores natural hair repigmentation by reactivating hair bulb tyrosinase and reducing oxidative stress."
  },
  {
    id: "hairiline",
    name: "HAIRILINE®",
    inci: "Lindera Strychnifolia Root Extract",
    principal: "Greentech France",
    category: "Hair Care",
    function: "Anti-Hair Loss & Follicular Anchoring",
    recommendedDosage: "1.0% – 2.0%",
    appearance: "Clear pale yellow liquid",
    certifications: ["COSMOS Approved", "IECIC Listed"],
    keyBenefits: ["Stimulates hair follicle growth phase (Anagen)", "Inhibits 5-alpha reductase activity", "Reduces seasonal and stress-related hair shedding"],
    description: "Biotech active acting on follicular micro-circulation and stem cell longevity to restore dense, resilient hair growth."
  },
  {
    id: "polyquat-7",
    name: "Polyquaternium-7 (High Purity)",
    inci: "Polyquaternium-7",
    casNo: "26590-05-6",
    principal: "VVF Limited",
    category: "Hair Care",
    function: "Cationic Conditioning Polymer & Foam Booster",
    recommendedDosage: "0.5% – 3.0%",
    appearance: "Clear viscous liquid",
    certifications: ["Acrylamide monomer < 1 ppm", "ISO 9001 Certified"],
    keyBenefits: ["Provides superior wet and dry combability", "Enhances rich creamy foam in sulfate-free shampoos", "Leaves hair velvety without heavy buildup"],
    description: "High-grade cationic conditioning agent offering exceptional sensory glide, static control, and lather stabilization in shampoos and body washes."
  },

  // 3. SPECIALTY EMULSIFIERS & LIPIDS (Fine Organics & VVF Limited)
  {
    id: "finamul-90",
    name: "FINAMUL® 90 (GMS Distilled Monoglyceride)",
    inci: "Glyceryl Stearate",
    casNo: "31566-31-1",
    principal: "Fine Organics",
    category: "Skin Care",
    function: "Non-Ionic O/W Emulsifier & Consistency Factor",
    recommendedDosage: "1.5% – 5.0%",
    appearance: "Off-white micro-beads / flakes",
    certifications: ["RSPO Mass Balance Certified", "Kosher", "Halal", "ECOCERT"],
    keyBenefits: ["Imparts luxurious lamellar liquid crystal stability", "Enhances emulsion viscosity and heat stability", "100% vegetable-derived sustainable palm source"],
    description: "High-purity molecularly distilled glycerol monostearate with minimum 90% monoester content, ensuring robust emulsion architecture."
  },
  {
    id: "finawax-c",
    name: "FINAWAX® C (Cetyl Palmitate Wax)",
    inci: "Cetyl Palmitate",
    casNo: "540-10-3",
    principal: "Fine Organics",
    category: "Color Cosmetics",
    function: "Synthetic Spermaceti Wax Substitute & Emollient",
    recommendedDosage: "2.0% – 8.0%",
    appearance: "White crystalline flakes",
    certifications: ["100% Vegetable Derived", "RSPO Certified", "Non-Animal"],
    keyBenefits: ["Gives body and dry velvet cushion to lotions and lipsticks", "Increases melting temperature of stick formulations", "Non-comedogenic emollient cushion"],
    description: "Pure ester wax providing non-greasy emolliency, high gloss, and structure in lip products, mascara, and premium body butters."
  },
  {
    id: "vvf-cetearyl",
    name: "Cetearyl Alcohol 30/70 (Vegetable Derived)",
    inci: "Cetearyl Alcohol",
    casNo: "67762-27-0",
    principal: "VVF Limited",
    category: "Skin Care",
    function: "Viscosity Builder & Emulsion Stabilizer",
    recommendedDosage: "1.0% – 6.0%",
    appearance: "Pure white waxy pastilles",
    certifications: ["RSPO MB", "Halal", "Kosher", "ISO 14001"],
    keyBenefits: ["Builds rich velvety cream rheology", "Acts as co-emulsifier stabilizing lamellar phases", "Zero synthetic petroleum residues"],
    description: "Naturally derived fatty alcohol blend from sustainable vegetable oils providing reliable body, slip, and opacifying properties."
  },

  // 4. SPECIALTY SILICONES & SENSORY ELASTOMERS (SNS Silcos)
  {
    id: "silcos-9040",
    name: "Silcos-9040 Silicone Elastomer Blend",
    inci: "Cyclopentasiloxane, Dimethicone Crosspolymer",
    principal: "SNS Silcos",
    category: "Color Cosmetics",
    function: "Silky Velvet Sensory Modifier & Matte Primer Base",
    recommendedDosage: "3.0% – 25.0%",
    appearance: "Translucent thick gel",
    certifications: ["D4/D5 Controlled Ultra-Low Residuals", "ISO 9001"],
    keyBenefits: ["Delivers extraordinary powdery matte sensory finish", "Instantly blurs fine lines and pores", "Excellent base for pore-blurring primers & matte lip tints"],
    description: "Crosslinked silicone polymer dispersed in volatile fluid providing smooth, cushiony, non-tacky feel and superior soft-focus optics."
  },
  {
    id: "silcos-tms",
    name: "Silcos-TMS Trimethylsiloxysilicate Resin",
    inci: "Trimethylsiloxysilicate",
    casNo: "68988-56-7",
    principal: "SNS Silcos",
    category: "Color Cosmetics",
    function: "Waterproof Long-Wear Film Former",
    recommendedDosage: "2.0% – 12.0%",
    appearance: "White free-flowing powder or solution",
    certifications: ["Heavy-Metal Tested", "REACH Registered"],
    keyBenefits: ["Provides 24H smudge-proof and transfer-proof longevity", "High resistance to sebum, tears, and water", "Essential for long-lasting liquid lipsticks & eyeliners"],
    description: "Highly three-dimensional silicone MQ resin creating a durable, flexible, waterproof barrier on the skin."
  },

  // 5. SUN CARE & PHOTOPROTECTION
  {
    id: "avobenzone-usp",
    name: "Avobenzone (Butyl Methoxydibenzoylmethane)",
    inci: "Butyl Methoxydibenzoylmethane",
    casNo: "70356-09-1",
    principal: "Mindtech Direct",
    category: "Sun Care",
    function: "Broad-Spectrum UVA-I & UVA-II Filter (320–400 nm)",
    recommendedDosage: "2.0% – 3.0%",
    appearance: "White to yellowish crystalline powder",
    certifications: ["USP / Ph. Eur. Grade", "Batch-Specific Assay > 99.0%"],
    keyBenefits: ["Gold-standard organic UVA absorber", "Protects against deep dermal photo-ageing", "High compatibility with modern cosmetic emollients"],
    description: "Oil-soluble broad-spectrum UVA filter essential for achieving high PA++++ protection ratings in daily anti-ageing sunscreens."
  },
  {
    id: "octocrylene",
    name: "Octocrylene (Photostabilized)",
    inci: "Octocrylene",
    casNo: "6197-30-4",
    principal: "Mindtech Direct",
    category: "Sun Care",
    function: "UVB & Short UVA Absorber + Avobenzone Stabilizer",
    recommendedDosage: "3.0% – 10.0%",
    appearance: "Viscous pale yellow transparent liquid",
    certifications: ["Purity > 98.5%", "GC Purity Tested", "Halal"],
    keyBenefits: ["Photostabilizes Avobenzone in formulations", "Provides substantial water-resistance to sports sunscreens", "Excellent solubilizer for solid organic UV filters"],
    description: "Liquid organic UV filter offering robust UVB absorption (280–320 nm) and stabilizing synergies for broad-spectrum SPF formulas."
  },

  // 6. MILD CLEANSING & SULFATE-FREE SURFACTANTS
  {
    id: "coco-glucoside",
    name: "Coco-Glucoside (50% Active)",
    inci: "Coco-Glucoside",
    casNo: "141464-42-8",
    principal: "Fine Organics",
    category: "Mild Cleansing",
    function: "Ultra-Mild Non-Ionic Surfactant",
    recommendedDosage: "2.0% – 20.0%",
    appearance: "Clear to slightly cloudy viscous liquid",
    certifications: ["COSMOS Certified", "100% Bio-based", "Readily Biodegradable", "Preservative-Free"],
    keyBenefits: ["Extremely mild on skin and mucous membranes", "Produces rich, stable foam without sulfates", "Ideal for baby shampoo, sensitive facewashes & micellar water"],
    description: "Plant-derived alkyl polyglucoside synthesized from natural coconut fatty alcohols and corn starch glucose."
  },
  {
    id: "sodium-cocoyl-isethionate",
    name: "Sodium Cocoyl Isethionate (SCI 85% Needles)",
    inci: "Sodium Cocoyl Isethionate",
    casNo: "61789-32-0",
    principal: "Mindtech Direct",
    category: "Mild Cleansing",
    function: "Baby-Foam Anionic Surfactant & Bar Cleanser",
    recommendedDosage: "5.0% – 50.0%",
    appearance: "White free-flowing needles",
    certifications: ["Sulfate-Free", "Low Salt Content", "High Biodegradability"],
    keyBenefits: ["Known as 'Baby Foam' for its gentle, skin-cushion lather", "Leaves skin with a soft, non-stripped moisturizing feel", "Essential for syndet cleansing bars & cream cleansers"],
    description: "Mild fatty acid ester surfactant that forms a luxurious, dense, whipped-cream lather even in hard water."
  }
];
