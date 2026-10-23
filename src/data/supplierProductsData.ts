export type SupplierId = 'greentech' | 'sns-silcos' | 'fine-organics' | 'vvf-limited' | 'vvf-fine-organics' | 'general-range' | 'all-products';

export interface SupplierInfo {
  id: SupplierId;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  country: string;
  heroImage: string;
  websiteUrl?: string;
  categoryTags: string[];
  keyStrengths: string[];
}

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  code?: string;
  supplierId: SupplierId;
  subSupplier?: 'VVF Limited' | 'Fine Organics';
  category: string;
  inci: string;
  mainUse: string;
  application: string;
  dosage: string;
  keyBenefits?: string[];
  formulatorBenefits?: string[];
  suggestions?: string;
  verifiedInPdf: boolean;
  pdfPage: number;
  image?: string;
}

export const BUSINESS_LINES = [
  'All Business Lines',
  'Skin Care & Anti-Pigmentation',
  'Hair Care & Conditioning',
  'Sun Care & Photoprotection',
  'Color Cosmetics & Make-up',
  'Bath, Body & Mild Cleansing',
  'Active Bio-Technology & Greentech'
] as const;

export type BusinessLine = typeof BUSINESS_LINES[number];

export function getProductBusinessLines(product: ProductItem): string[] {
  const lines: string[] = [];
  const text = `${product.name} ${product.category} ${product.application} ${product.mainUse} ${product.inci}`.toLowerCase();

  if (product.supplierId === 'greentech' || text.includes('greentech') || text.includes('biotech') || text.includes('ferment') || text.includes('algae') || text.includes('marine') || text.includes('extract') || text.includes('botanical') || text.includes('cellular')) {
    lines.push('Active Bio-Technology & Greentech');
  }

  if (text.includes('hair') || text.includes('scalp') || text.includes('shampoo') || text.includes('condition') || text.includes('strand') || text.includes('frizz') || text.includes('keratin')) {
    lines.push('Hair Care & Conditioning');
  }

  if (text.includes('sun') || text.includes('uv') || text.includes('spf') || text.includes('photo') || text.includes('avobenzone') || text.includes('titanium') || text.includes('filter')) {
    lines.push('Sun Care & Photoprotection');
  }

  if (text.includes('color') || text.includes('colour') || text.includes('lipstick') || text.includes('foundation') || text.includes('make-up') || text.includes('makeup') || text.includes('pigment') || text.includes('resin') || text.includes('mascara') || text.includes('eyeliner') || text.includes('primer')) {
    lines.push('Color Cosmetics & Make-up');
  }

  if (text.includes('clean') || text.includes('wash') || text.includes('bath') || text.includes('shower') || text.includes('surfactant') || text.includes('soap') || text.includes('foam') || text.includes('body wash') || text.includes('hand wash')) {
    lines.push('Bath, Body & Mild Cleansing');
  }

  if (text.includes('skin') || text.includes('face') || text.includes('lighten') || text.includes('whiten') || text.includes('pigment') || text.includes('anti-age') || text.includes('wrinkle') || text.includes('moistur') || text.includes('serum') || text.includes('barrier') || text.includes('ceramide') || text.includes('kojic') || text.includes('arbutin') || text.includes('cream') || text.includes('lotion') || text.includes('hydrat')) {
    lines.push('Skin Care & Anti-Pigmentation');
  }

  if (lines.length === 0) {
    lines.push('Skin Care & Anti-Pigmentation');
  }

  return lines;
}

export const SUPPLIER_PROFILES: Record<string, SupplierInfo> = {
  greentech: {
    id: 'greentech',
    name: 'GREENTECH BIOTECHNOLOGIES',
    shortName: 'Greentech France',
    tagline: 'Biotechnology-Inspired Actives & Botanical Solutions',
    description: 'Biotechnology-inspired cosmetic actives and botanical solutions for skin-care, hair-care and related applications.',
    country: 'Saint-Beauzire, France',
    heroImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1600&q=85',
    websiteUrl: 'https://www.greentech.fr/en/',
    categoryTags: [
      'Skin Care Actives',
      'Anti-ageing & Well-Aging',
      'Hydration & Skin Barrier',
      'Hair Care & Growth',
      'Botanical & Natural Products'
    ],
    keyStrengths: [
      'Science of nature, backed by research',
      'Efficacy and cosmetic safety',
      'Sustainable French biotechnology',
      'Targeted solutions for modern formulations'
    ]
  },
  'sns-silcos': {
    id: 'sns-silcos',
    name: 'SNS SILCOS',
    shortName: 'SNS Silcos',
    tagline: 'Specialty Silicone Materials & Sensory Modifiers',
    description: 'Specialty silicone materials and formulation-focused solutions for cosmetic applications.',
    country: 'International Supply Alliance',
    heroImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=85',
    categoryTags: [
      'Silicone Fluids',
      'Functional Silicones',
      'Silicone Emulsions',
      'Elastomer Gels',
      'Specialty Silicone Actives'
    ],
    keyStrengths: [
      'Silicone synthesis & material purity',
      'Enhances texture, slip & sensorial performance',
      'Volatile & linear silicone technologies',
      'Tailored for cosmetic formulation & wear'
    ]
  },
  'fine-organics': {
    id: 'fine-organics',
    name: 'FINE ORGANICS',
    shortName: 'Fine Organics',
    tagline: 'Specialty Additives & Oleochemical-Derived Ingredients',
    description: 'Specialty additives and oleochemical-derived ingredients for a range of industrial and personal-care applications.',
    country: 'Global Manufacturing & Export',
    heroImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1600&q=85',
    websiteUrl: 'https://www.fineorganics.com/',
    categoryTags: [
      'Emollient Esters',
      'Specialty Fluids',
      'Functional Ingredients',
      'Eco-friendly Ingredients'
    ],
    keyStrengths: [
      'High-performance specialty esters and emollients',
      'Global quality standards & compliance',
      'Sustainable & eco-conscious chemistry',
      'Dependable supply support via Bawana Hub'
    ]
  },
  'vvf-limited': {
    id: 'vvf-limited',
    name: 'VVF LIMITED',
    shortName: 'VVF Limited',
    tagline: 'Specialty Oleochemicals & Personal Care Materials',
    description: 'Specialty oleochemicals and personal-care-related materials, including supported fatty acid, fatty alcohol and glycerine product families.',
    country: 'Global Manufacturing Alliances',
    heroImage: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1600&q=85',
    websiteUrl: 'https://vvfltd.com/',
    categoryTags: [
      'Surfactants',
      'Emollients',
      'Specialty Chemicals',
      'Oleochemicals'
    ],
    keyStrengths: [
      'Portfolio of oleochemicals & surfactants',
      'Strong industrial scale and manufacturing',
      'Consistent quality & dependable supply',
      'Extensive personal care applications'
    ]
  },
  'vvf-fine-organics': {
    id: 'vvf-fine-organics',
    name: 'VVF LIMITED & FINE ORGANICS',
    shortName: 'VVF & Fine Organics',
    tagline: 'Specialty Oleochemicals & Functional Ingredients',
    description: 'Specialty chemical and functional ingredient portfolios across emollients, surfactants, specialty fluids, and related formulation applications.',
    country: 'Global Supply Alliances',
    heroImage: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1600&q=85',
    categoryTags: [
      'Surfactants',
      'Emollients',
      'Specialty Chemicals',
      'Oleochemicals',
      'Emollient Esters',
      'Specialty Fluids'
    ],
    keyStrengths: [
      'VVF: Oleochemicals & surfactants',
      'Fine Organics: Specialty esters & emollients'
    ]
  },
  'general-range': {
    id: 'general-range',
    name: 'MINDTECH GENERAL PRODUCT RANGE',
    shortName: 'General Range',
    tagline: 'Essential Formulator Raw Materials & High-Purity Actives',
    description: 'Comprehensive cosmetic raw materials including high-potency skin lighteners, ceramides, rheology modifiers, mild surfactants, UV filters, conditioning agents, and preservatives.',
    country: 'Mindtech Central Bawana Hub',
    heroImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1600&q=85',
    categoryTags: [
      'Skin Lightening & Anti-Pigmentation',
      'Anti-Ageing & Skin Barrier',
      'Moisturizers & Soothing',
      'Thickeners & Rheology Modifiers',
      'Mild & Sulfate-Free Surfactants',
      'Conditioning Agents',
      'Sunscreens & UV Filters',
      'Preservatives & Antimicrobials'
    ],
    keyStrengths: [
      '100% CoA & TDS verified batch quality',
      'Direct central warehouse buffer in Bawana, Delhi',
      'Fast 24-48h dispatch across India',
      'Complete regulatory documentation'
    ]
  },
  'all-products': {
    id: 'all-products',
    name: 'COMPLETE PRODUCT CATALOGUE',
    shortName: 'Full Catalogue',
    tagline: 'Searchable Directory of All 90+ Documented Active Ingredients',
    description: 'Explore our complete verified catalogue across Greentech Biotechnologies, SNS Silcos, Fine Organics, VVF Limited, and the Mindtech General Range with multi-dimensional chemical filtering.',
    country: 'Central Distribution Hub, Delhi',
    heroImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1600&q=85',
    categoryTags: [
      'Bio-Actives',
      'Specialty Silicones',
      'Oleochemicals & Esters',
      'Conditioning Polymers',
      'Rheology Modifiers',
      'UV Filters'
    ],
    keyStrengths: [
      'Comprehensive 90+ documented ingredients',
      '100% CoA, TDS & MSDS compliance',
      'Direct distribution from Bawana Hub',
      'Prompt 24-48h dispatch across India'
    ]
  }
};

export const VVF_PORTFOLIO_CATEGORIES = [
  {
    name: 'Surfactants',
    description: 'Gentle cleansing agents, primary and secondary surfactants, and foam boosters designed for personal wash and hair care systems.',
    keyAttributes: ['High foaming power', 'Biodegradable profile', 'Mild to skin and scalp', 'Low irritation potential'],
    applications: 'Shampoos, body washes, facial cleansers, liquid hand soaps'
  },
  {
    name: 'Emollients',
    description: 'Fatty alcohols (cetyl, stearyl, cetearyl), fatty acids, and high-purity natural emollient bases providing structural consistency.',
    keyAttributes: ['Superior conditioning', 'Emulsion stabilization', 'Rich velvety skin feel', 'Naturally derived'],
    applications: 'Creams, lotions, hair conditioners, body butters'
  },
  {
    name: 'Specialty Chemicals',
    description: 'Cosmetic-grade oleochemical derivatives and formulation aids providing rheology control, lubricity, and solvent power.',
    keyAttributes: ['High chemical purity', 'Thermal and oxidative stability', 'Versatile compounding compatibility'],
    applications: 'Specialty cosmetic bases, color cosmetics, sunscreens'
  },
  {
    name: 'Oleochemicals',
    description: 'Vegetable-origin refined glycerine, stearic acids, and distilled fatty acids sourced from sustainable plant feedstocks.',
    keyAttributes: ['High assay vegetable grade', 'RSPO / sustainable sourcing options', 'Kosher & Halal certified'],
    applications: 'Soaps, emulsions, personal care formulations'
  }
];

export const FINE_ORGANICS_PORTFOLIO_CATEGORIES = [
  {
    name: 'Emollient Esters',
    description: 'High-purity fatty acid esters offering tailored spreading profiles, light non-greasy after-feel, and excellent pigment wetting.',
    keyAttributes: ['Fast to medium spreading', 'Dry-touch sensory profile', 'Pigment dispersion efficiency', 'Alternative to mineral oils'],
    applications: 'Light face serums, foundations, lipsticks, daily moisturizers'
  },
  {
    name: 'Specialty Fluids',
    description: 'Functional cosmetic fluids designed to enhance spreadability, lubricity, and barrier resilience without heavy residue.',
    keyAttributes: ['Silky skin feel', 'Non-comedogenic', 'Enhanced playtime and glide', 'Oxidative resilience'],
    applications: 'Sun care lotions, massage oils, body treatments'
  },
  {
    name: 'Functional Ingredients',
    description: 'Polyglyceryl emulsifiers, solubilizers, and anti-static additives supporting stable green cosmetic emulsions.',
    keyAttributes: ['PEG-free emulsification', 'Cold and hot process options', 'Gentle on barrier lipids', 'Broad HLB coverage'],
    applications: 'Natural skin creams, micellar waters, hair conditioners'
  },
  {
    name: 'Eco-friendly Ingredients',
    description: 'Bio-based, renewable, and environmentally responsible raw materials tailored for clean beauty and sustainable consumer products.',
    keyAttributes: ['Readily biodegradable', 'Derived from renewable feedstocks', 'Conforms to green chemistry principles'],
    applications: 'Clean cosmetics, eco-certified skincare, green personal wash'
  }
];

export const ALL_PRODUCTS: ProductItem[] = [
  // =========================================================================
  // 1. SNS SILCOS SPECIALTY SILICONES (Catalogue Page 5)
  // =========================================================================
  {
    id: 'sns-sfl-45',
    slug: 'sns-sfl-45',
    name: 'SNS SFL 45',
    code: 'SNS SFL 45',
    supplierId: 'sns-silcos',
    category: 'Silicone Fluids & Volatiles',
    inci: 'Cyclopentasiloxane',
    mainUse: 'Volatile silicone fluid providing elegant texture, quick evaporation, and a silky, non-greasy after-feel.',
    application: 'Skin Care Emulsions, Hair Care, Conditioners, Serums, Colour Cosmetics, Sunscreens, Make-up',
    dosage: '1–50%',
    keyBenefits: ['Silky & smooth feel', 'Spreadability enhancer', 'Non-greasy dry-down', 'Pigment wetting'],
    formulatorBenefits: ['Provides immediate slip without residue', 'Acts as a volatile carrier for active ingredients'],
    verifiedInPdf: true,
    pdfPage: 5
  },
  {
    id: 'sns-stc-44',
    slug: 'sns-stc-44',
    name: 'SNS STC 44',
    code: 'SNS STC 44',
    supplierId: 'sns-silcos',
    category: 'Silicone Fluids & Volatiles',
    inci: 'Cyclotetrasiloxane',
    mainUse: 'Lightweight volatile cyclomethicone carrier fluid delivering instant spreading and zero tacky after-feel.',
    application: 'Skin Care, Hair Care, Colour Cosmetics, Sunscreens, Toners, Make-up',
    dosage: '1–50%',
    keyBenefits: ['Weightless skin feel', 'Volatile carrier', 'Rapid absorption', 'Clarity and low surface tension'],
    formulatorBenefits: ['Improves sprayability in hair and skin mists', 'Reduces formula tackiness'],
    verifiedInPdf: true,
    pdfPage: 5
  },
  {
    id: 'sns-sgb-15',
    slug: 'sns-sgb-15',
    name: 'SNS SGB 15',
    code: 'SNS SGB 15',
    supplierId: 'sns-silcos',
    category: 'Silicone Gum Blends',
    inci: 'Cyclopentasiloxane & Dimethiconol',
    mainUse: 'High molecular weight dimethiconol silicone gum in volatile carrier for rich velvet cushioning and split-end repair.',
    application: 'Skin Care, Hair Care, Colour Cosmetics, Sunscreens, Toners, Make-up',
    dosage: '1–50%',
    keyBenefits: ['Long-lasting velvet cushion', 'Repairs and seals split ends', 'Wash-off resistance', 'Protective barrier'],
    formulatorBenefits: ['Key ingredient for premium hair serums', 'Provides substantive barrier against moisture loss'],
    verifiedInPdf: true,
    pdfPage: 5
  },
  {
    id: 'sns-sf-350-m',
    slug: 'sns-sf-350-m',
    name: 'SNS SF 350 M',
    code: 'SNS SF 350 M',
    supplierId: 'sns-silcos',
    category: 'Silicone Fluids & Dimethicones',
    inci: 'Dimethicone (350 cSt)',
    mainUse: 'Medium viscosity linear dimethicone fluid providing emolliency, slip, and waterproof barrier protection.',
    application: 'Skin Care, Hair Care, Deodorants, Antiperspirants, Hair Conditioners',
    dosage: '1–10%',
    keyBenefits: ['Smooth skin glide', 'Anti-whitening in antiperspirants', 'Water-repellent protective film', 'Reduces soaping effect'],
    formulatorBenefits: ['Suppresses whitening effect in antiperspirants and sunscreens', 'Eliminates foaming on application'],
    verifiedInPdf: true,
    pdfPage: 5
  },
  {
    id: 'sns-spf-56',
    slug: 'sns-spf-56',
    name: 'SNS SPF 56',
    code: 'SNS SPF 56',
    supplierId: 'sns-silcos',
    category: 'Phenyl Modified Silicones',
    inci: 'Phenyl Trimethicone',
    mainUse: 'High refractive index silicone fluid delivering brilliant gloss, hair shine, and organic cosmetic ingredient compatibility.',
    application: 'Skin Care, Hair Care, Body Creams, Lotions, Sunscreens, Make-up, Deodorants, Antiperspirants, Hair Conditioners',
    dosage: '1–50%',
    keyBenefits: ['Brilliant optical gloss & shine', 'High compatibility with mineral & vegetable oils', 'Non-greasy emollient', 'UV filter solubility'],
    formulatorBenefits: ['Significantly improves gloss in lipsticks and hair serums', 'Improves spreadability of organic UV filters'],
    verifiedInPdf: true,
    pdfPage: 5
  },
  {
    id: 'sns-seb-45',
    slug: 'sns-seb-45',
    name: 'SNS SEB 45',
    code: 'SNS SEB 45',
    supplierId: 'sns-silcos',
    category: 'Silicone Elastomer Blends',
    inci: 'Cyclopentasiloxane & Dimethicone Crosspolymer',
    mainUse: 'Crosslinked silicone elastomer gel imparting an immediate matte, powdery, optical soft-focus finish.',
    application: 'Skin Care, Hair Care, Colour Cosmetics, Sunscreens, Toners, Make-up, Deodorants, Antiperspirants, Hair Conditioners',
    dosage: '1–50%',
    keyBenefits: ['Powdery velvet touch', 'Line & pore blurring effect', 'Mattifying sebum control', 'Thickens oil phase'],
    formulatorBenefits: ['Ideal for primer bases, matte foundations, and velvety sun protection gels'],
    verifiedInPdf: true,
    pdfPage: 5
  },
  {
    id: 'sns-sep-93',
    slug: 'sns-sep-93',
    name: 'SNS SEP 93',
    code: 'SNS SEP 93',
    supplierId: 'sns-silcos',
    category: 'Water-Soluble Silicones',
    inci: 'PEG-12 Dimethicone',
    mainUse: 'Water-soluble silicone polyether delivering silky emolliency, foam density, and combability to clear aqueous formulations.',
    application: 'Face Wash, Shampoos, Shower Gel, Body Wash',
    dosage: '1–10%',
    keyBenefits: ['Water-soluble & clear systems compatible', 'Dense, creamy foam', 'Wet combability', 'Reduced surfactant irritation'],
    formulatorBenefits: ['Readily incorporates into cold-process aqueous formulas without clouding'],
    verifiedInPdf: true,
    pdfPage: 5
  },
  {
    id: 'sns-sep-85',
    slug: 'sns-sep-85',
    name: 'SNS SEP 85',
    code: 'SNS SEP 85',
    supplierId: 'sns-silcos',
    category: 'Silicone Emulsions',
    inci: 'Dimethicone, TEA & Dodecylbenzenesulfonate',
    mainUse: 'Anionic silicone emulsion specially engineered for 2-in-1 conditioning shampoos, delivering exceptional wet and dry combability.',
    application: '2-in-1 Shampoo & Conditioner',
    dosage: '0.5–5%',
    keyBenefits: ['Effortless wet and dry combability', 'Uniform hair deposition', 'Maintains shampoo lather', 'Silky softness'],
    formulatorBenefits: ['Stable emulsion for direct addition into surfactant-rich cleansing products'],
    verifiedInPdf: true,
    pdfPage: 5
  },
  {
    id: 'sns-sae-49',
    slug: 'sns-sae-49',
    name: 'SNS SAE 49',
    code: 'SNS SAE 49',
    supplierId: 'sns-silcos',
    category: 'Silicone Emulsions',
    inci: 'Amodimethicone & Cetrimonium Chloride & Trideceth-12',
    mainUse: 'Cationic amodimethicone micro-emulsion targeted for selective conditioning on damaged, color-treated hair.',
    application: 'Shampoos, Conditioners',
    dosage: '0.5–5%',
    keyBenefits: ['Targeted damaged hair repair', 'Color protection against wash-out', 'Thermal heat protection', 'Anti-static control'],
    formulatorBenefits: ['Does not build up on repeated washing; deposits selectively on damaged cuticles'],
    verifiedInPdf: true,
    pdfPage: 5
  },
  {
    id: 'sns-scb-79',
    slug: 'sns-scb-79',
    name: 'SNS SCB 79',
    code: 'SNS SCB 79',
    supplierId: 'sns-silcos',
    category: 'Silicone Resins & Film Formers',
    inci: 'Cyclopentasiloxane & Trimethylsiloxysilicate',
    mainUse: 'Liquid blend of MQ silicone resin providing transfer resistance, long wear, and waterproofing in lipsticks and foundations.',
    application: 'Lipstick / Colour Cosmetics',
    dosage: '1–5%',
    keyBenefits: ['Transfer-resistant film', 'Long-lasting wear', 'Water and sweat resistance', 'Non-sticky dry-down'],
    formulatorBenefits: ['Essential film former for liquid lipsticks, smudge-proof mascaras, and long-wear foundations'],
    verifiedInPdf: true,
    pdfPage: 5
  },
  {
    id: 'sns-smr-16',
    slug: 'sns-smr-16',
    name: 'SNS SMR 16',
    code: 'SNS SMR 16',
    supplierId: 'sns-silcos',
    category: 'Silicone Resins & Film Formers',
    inci: 'Trimethylsiloxysilicate (100% Powder)',
    mainUse: 'Pure MQ silicone resin powder delivering durable, waterproof, flexible barrier films for high-performance makeup.',
    application: 'Colour Cosmetics / Lipstick',
    dosage: 'Not specified (Typical: 1–8%)',
    keyBenefits: ['100% active powder form', 'Superior transfer-resistance', 'Breathable flexible film', 'Extreme water repellency'],
    formulatorBenefits: ['Allows custom dissolution into preferred volatile fluids for tailored drying speeds'],
    verifiedInPdf: true,
    pdfPage: 5
  },
  {
    id: 'sns-saf-701',
    slug: 'sns-saf-701',
    name: 'SNS SAF 701',
    code: 'SNS SAF 701',
    supplierId: 'sns-silcos',
    category: 'Silicone Elastomer Powders',
    inci: 'Dimethicone/Vinyl Dimethicone Crosspolymer & Silica',
    mainUse: 'Silicone elastomer powder coated with silica for sebum absorption, shine suppression, and silky thickening.',
    application: 'Colour Cosmetics, Skin Care, Sun Care, Hydrogels',
    dosage: '0.05–1%',
    keyBenefits: ['High oil absorption capacity', 'Soft powdery finish', 'Wrinkle masking optical effect', 'Anti-caking agent'],
    formulatorBenefits: ['Reduces oiliness in sunscreens and foundations with subtle soft-focus blurring'],
    verifiedInPdf: true,
    pdfPage: 5
  },
  {
    id: 'sns-scb-31',
    slug: 'sns-scb-31',
    name: 'SNS SCB 31',
    code: 'SNS SCB 31',
    supplierId: 'sns-silcos',
    category: 'Specialty Silicone Complexes',
    inci: 'Cyclopentasiloxane & Phenyl Trimethicone & Dimethiconol & C12-15 Alkyl Benzoate & Dimethicone Crosspolymer',
    mainUse: 'Multi-functional silicone complex combining gloss, cushioning, and silky spreadability for multi-benefit formulations.',
    application: 'Hair Care, Skin Care & Sun Care',
    dosage: '1–5%',
    keyBenefits: ['Multi-dimensional sensory experience', 'High gloss plus matte dry-down', 'Enhanced spreadability', 'Velvet cushion'],
    formulatorBenefits: ['Ready-to-use complex that replaces multiple individual raw materials in one addition'],
    verifiedInPdf: true,
    pdfPage: 5
  },
  {
    id: 'sns-scb-21',
    slug: 'sns-scb-21',
    name: 'SNS SCB 21',
    code: 'SNS SCB 21',
    supplierId: 'sns-silcos',
    category: 'Specialty Silicone Complexes',
    inci: 'Cyclopentasiloxane & Phenyl Trimethicone & Dimethiconol & C12-15 Alkyl Benzoate & Dimethicone Crosspolymer',
    mainUse: 'Advanced silicone complex optimized for hair gloss sprays, leave-on conditioners, and vibrant color cosmetics.',
    application: 'Hair Care, Hair Spray, Leave-on Conditioner, Colour Cosmetics',
    dosage: '3–10%',
    keyBenefits: ['High luster shine without heaviness', 'Frizz control in humid climates', 'Smooth detangling', 'Color brilliance'],
    formulatorBenefits: ['Ideal for sprayable hair serums and lightweight gloss treatments'],
    verifiedInPdf: true,
    pdfPage: 5
  },

  // =========================================================================
  // 2. GREENTECH BIOTECHNOLOGIES ACTIVES & EXTRACTS (Catalogue Pages 12–22)
  // =========================================================================
  // 2.1 Anti-Ageing & Well-Aging (Page 13)
  {
    id: 'hebelys',
    slug: 'hebelys',
    name: 'HEBELYS®',
    code: 'HEBELYS',
    supplierId: 'greentech',
    category: 'Anti-ageing & Well-Aging',
    inci: 'Sphingomonas ferment / polar lipids',
    mainUse: 'Anti-ageing active for mature skin, targeting wrinkles, radiance, skin density, and emotional mood uplift.',
    application: 'Anti-ageing creams, serums',
    dosage: '1%',
    keyBenefits: ['Limits senescent "zombie" cells', 'Restores epidermal thickness & density', 'Improves skin luminosity & texture', 'Scientifically proven positive mood impact'],
    formulatorBenefits: ['Cosmos approved biotechnological active produced by gentle bacterial fermentation'],
    verifiedInPdf: true,
    pdfPage: 13
  },
  {
    id: 'epica',
    slug: 'epica',
    name: 'EPICA®',
    code: 'EPICA',
    supplierId: 'greentech',
    category: 'Anti-ageing & Well-Aging',
    inci: 'Standardized blackcurrant leaf & pine bark extracts',
    mainUse: 'Synergistic botanical complex for dual antioxidant protection, anti-wrinkle action, and fine-line smoothing.',
    application: 'Anti-ageing creams, serums',
    dosage: '0.5–5%',
    keyBenefits: ['Inhibits collagenase and elastase enzymes', 'Strong free-radical scavenger', 'Smooths micro-relief of mature skin'],
    formulatorBenefits: ['Standardized polyphenol content ensures predictable batch-to-batch efficacy'],
    verifiedInPdf: true,
    pdfPage: 13
  },
  {
    id: 'nucleolys',
    slug: 'nucleolys',
    name: 'NUCLEOLYS',
    code: 'NUCLEOLYS',
    supplierId: 'greentech',
    category: 'Anti-ageing & Well-Aging',
    inci: 'White quebracho extract, fermented & bio-purified; gallic acid / proanthocyanidins',
    mainUse: 'Advanced cellular DNA protection and defense against oxidative stress and UV-induced photo-damage.',
    application: 'Anti-ageing / protective skin care',
    dosage: '2–5%',
    keyBenefits: ['Cellular DNA shielding', 'Reduces UV-induced thymine dimers', 'Potent proanthocyanidin antioxidant profile'],
    formulatorBenefits: ['Combines well with SPF formulations and protective anti-pollution daytime creams'],
    verifiedInPdf: true,
    pdfPage: 13
  },
  {
    id: 'setiline-sn',
    slug: 'setiline-sn',
    name: 'SETILINE® SN',
    code: 'SETILINE-SN',
    supplierId: 'greentech',
    category: 'Anti-ageing & Well-Aging',
    inci: 'Oligogalactomannans from fenugreek seed',
    mainUse: 'Targeted anti-glycation active reducing dermal stiffening, smoothing wrinkles, and recovering skin firmness.',
    application: 'Anti-ageing formulations',
    dosage: '1%',
    keyBenefits: ['Inhibits AGEs (Advanced Glycation End-products)', 'Protects elastin and collagen elasticity', 'Firms loose facial contours'],
    formulatorBenefits: ['Water-soluble galactomannans easily incorporated into emulsions and clear gels'],
    verifiedInPdf: true,
    pdfPage: 13
  },
  {
    id: 'cosmelene-centella',
    slug: 'cosmelene-centella',
    name: 'COSMELENE® CENTELLA',
    code: 'COSMELENE-CENTELLA',
    supplierId: 'greentech',
    category: 'Anti-ageing & Well-Aging',
    inci: 'Centella asiatica extract, asiaticoside/madecassoside',
    mainUse: 'Standardized Centella extract supporting collagen synthesis, deep wrinkle reduction, and tissue repair.',
    application: 'Creams, serums, firming care',
    dosage: '1–10%',
    keyBenefits: ['Stimulates type I collagen synthesis', 'Accelerates barrier healing', 'Soothes micro-inflammation'],
    formulatorBenefits: ['Proven active with rich clinical history in Cica-care and restorative cosmetics'],
    verifiedInPdf: true,
    pdfPage: 13
  },
  {
    id: 'golden-microalgae',
    slug: 'golden-microalgae',
    name: 'GOLDEN MICROALGAE',
    code: 'GOLDEN-MICROALGAE',
    supplierId: 'greentech',
    category: 'Anti-ageing & Well-Aging',
    inci: 'Tetraselmis chuii extract',
    mainUse: 'Marine microalgae active delivering deep cellular hydration, lipid renewal, antioxidant defense, and radiant vitality.',
    application: 'Anti-ageing / revitalizing care',
    dosage: '1%',
    keyBenefits: ['Stimulates cellular respiration', 'Rich in marine antioxidants and omega lipids', 'Revitalizes tired, sluggish skin cells'],
    formulatorBenefits: ['Sustainable photobioreactor cultivation ensuring zero marine ecosystem depletion'],
    verifiedInPdf: true,
    pdfPage: 13
  },
  {
    id: 'timelys',
    slug: 'timelys',
    name: 'TIMELYS®',
    code: 'TIMELYS',
    supplierId: 'greentech',
    category: 'Anti-ageing & Well-Aging',
    inci: 'Schisandra chinensis extract, lignans / AHA',
    mainUse: 'Multi-benefit adaptogenic berry extract enhancing skin radiance, hydration, barrier resilience, and microcirculation.',
    application: 'Anti-ageing / revitalizing care',
    dosage: '1%',
    keyBenefits: ['Boosts microvascular tone for healthy rosy glow', 'Strengthens epidermal barrier', 'Protects against environmental stress'],
    formulatorBenefits: ['Combines organic fruit acids with bioactive lignans for dual chemical & biological action'],
    verifiedInPdf: true,
    pdfPage: 13
  },
  {
    id: 'reverskin',
    slug: 'reverskin',
    name: 'REVERSKIN®',
    code: 'REVERSKIN',
    supplierId: 'greentech',
    category: 'Anti-ageing & Well-Aging',
    inci: 'Polysaccharides/polyphenols from fern Polypodium leucotomos',
    mainUse: 'Powerful firming and redensifying active stimulating deep epidermal renewal and smoothing mature wrinkles.',
    application: 'Firming / redensifying products',
    dosage: '2%',
    keyBenefits: ['Re-thickens thinning mature skin', 'Strengthens dermo-epidermal junction (DEJ)', 'Smooths crow’s feet and deep wrinkles'],
    formulatorBenefits: ['Clinically proven to reverse epidermal thinning in post-menopausal skin'],
    verifiedInPdf: true,
    pdfPage: 13
  },
  {
    id: 'qt40',
    slug: 'qt40',
    name: 'QT40®',
    code: 'QT40',
    supplierId: 'greentech',
    category: 'Anti-ageing & Well-Aging',
    inci: 'Green seaweed Ulva lactuca extract',
    mainUse: 'Marine oligosaccharide delivering V-shape facial contour lifting, skin elasticity, and dermal-filler effect.',
    application: 'Lifting / firming serums & creams',
    dosage: '2%',
    keyBenefits: ['Stimulates collagen and hyaluronic acid synthesis', 'Re-sculpts sagging jawline (V-shape lifting)', 'Improves skin firmness & elasticity'],
    formulatorBenefits: ['High-performance marine oligosaccharide with fast perceptible tightening benefits'],
    verifiedInPdf: true,
    pdfPage: 13
  },
  {
    id: 'cosmelene-terminalia',
    slug: 'cosmelene-terminalia',
    name: 'COSMELENE® TERMINALIA',
    code: 'COSMELENE-TERMINALIA',
    supplierId: 'greentech',
    category: 'Anti-ageing & Well-Aging',
    inci: 'Terminalia arjuna extract, triterpenic acids',
    mainUse: 'Botanical firming extract supporting microvascular health, dermal tonicity, and structural collagen matrix.',
    application: 'Firming / anti-ageing',
    dosage: '1–10%',
    keyBenefits: ['Enhances skin vascular density', 'Improves dermal elasticity and firmness', 'Tones sagging skin'],
    formulatorBenefits: ['Rich in arjunic and terminic triterpenic acids with strong tonicity effects'],
    verifiedInPdf: true,
    pdfPage: 13
  },
  {
    id: 'cosmelene-ginseng',
    slug: 'cosmelene-ginseng',
    name: 'COSMELENE® GINSENG',
    code: 'COSMELENE-GINSENG',
    supplierId: 'greentech',
    category: 'Anti-ageing & Well-Aging',
    inci: 'Ginseng root extract / ginsenosides',
    mainUse: 'Energizing adaptogenic extract promoting cellular vitality, collagen synthesis, and youthful elasticity.',
    application: 'Anti-ageing / firming',
    dosage: '1–10%',
    keyBenefits: ['Cellular energizer', 'Boosts pro-collagen production', 'Combats signs of metabolic skin fatigue'],
    formulatorBenefits: ['Standardized ginsenosides delivering reliable cellular revitalizing action'],
    verifiedInPdf: true,
    pdfPage: 13
  },
  {
    id: 'cosmelene-horsetail',
    slug: 'cosmelene-horsetail',
    name: 'COSMELENE® HORSETAIL',
    code: 'COSMELENE-HORSETAIL',
    supplierId: 'greentech',
    category: 'Anti-ageing & Well-Aging',
    inci: 'Horsetail extract, flavonoids & silica',
    mainUse: 'Natural bio-silica rich extract reinforcing connective tissue firmness, elasticity, and remineralization.',
    application: 'Firming / anti-ageing',
    dosage: '1–10%',
    keyBenefits: ['Supplies bio-available organic silica', 'Strengthens dermal connective tissue', 'Firms body and facial skin'],
    formulatorBenefits: ['Ideal for body firming formulations, bust lotions, and anti-aging toners'],
    verifiedInPdf: true,
    pdfPage: 13
  },
  {
    id: 'lipactive-green-coffee',
    slug: 'lipactive-green-coffee',
    name: 'LIPACTIVE® GREEN COFFEE',
    code: 'LIPACTIVE-GREEN-COFFEE',
    supplierId: 'greentech',
    category: 'Anti-ageing & Well-Aging',
    inci: 'Green coffee seed oil, fatty acids, sterols, vitamin E & caffeine',
    mainUse: 'Lipophilic coffee extract combining phytosterols and caffeine for firming, softening, and deep lipid nourishment.',
    application: 'Skin care / body care',
    dosage: '1–3%',
    keyBenefits: ['Stimulates lipid metabolism', 'Firms and tones contours', 'Replenishes essential fatty acids'],
    formulatorBenefits: ['Oil-soluble active that enriches the sensorial profile of premium face and body oils'],
    verifiedInPdf: true,
    pdfPage: 13
  },

  // 2.2 Antioxidants & Anti-Fatigue (Page 14)
  {
    id: 'tealine',
    slug: 'tealine',
    name: 'TEALINE®',
    code: 'TEALINE',
    supplierId: 'greentech',
    category: 'Antioxidants & Anti-Fatigue',
    inci: 'Green tea (Camellia sinensis) + rooibos (Aspalathus linearis) extracts; catechins & flavonoids',
    mainUse: 'Super-antioxidant complex protecting against photo-ageing, free radicals, and environmental oxidation.',
    application: 'Anti-ageing / antioxidant care',
    dosage: '0.5–2% (Recommended)',
    keyBenefits: ['High ORAC antioxidant value', 'Protects against UV photo-oxidation', 'Neutralizes urban environmental pollutants'],
    formulatorBenefits: ['Synergy of green tea EGCG and rooibos aspalathin delivers superior free-radical defense'],
    verifiedInPdf: true,
    pdfPage: 14
  },
  {
    id: 'ferment-active-goji',
    slug: 'ferment-active-goji',
    name: 'FERMENT’ACTIVE GOJI',
    code: 'FERMENT-ACTIVE-GOJI',
    supplierId: 'greentech',
    category: 'Antioxidants & Anti-Fatigue',
    inci: 'Fermented Lycium barbarum (Goji) fruit extract',
    mainUse: 'Bio-fermented superberry active delivering enhanced bioavailability, cellular protection, and antioxidant radiance.',
    application: 'Skin care / antioxidant products',
    dosage: '1–3% (Recommended)',
    keyBenefits: ['Bio-fermentation unlocks smaller active molecules', 'Fights reactive oxygen species (ROS)', 'Boosts skin vitality'],
    formulatorBenefits: ['Fermentation increases polyphenol bioavailability compared to standard macerated extracts'],
    verifiedInPdf: true,
    pdfPage: 14
  },
  {
    id: 'ferment-active-pomegranate',
    slug: 'ferment-active-pomegranate',
    name: 'FERMENT’ACTIVE POMEGRANATE',
    code: 'FERMENT-ACTIVE-POM',
    supplierId: 'greentech',
    category: 'Antioxidants & Anti-Fatigue',
    inci: 'Fermented Punica granatum (Pomegranate) fruit extract, polyphenols & tannins',
    mainUse: 'Fermented pomegranate extract rich in ellagic acid and tannins, protecting against oxidative stress and photo-damage.',
    application: 'Anti-ageing / antioxidant care',
    dosage: '1–3% (Recommended)',
    keyBenefits: ['Potent ellagic acid source', 'Strengthens cellular antioxidant enzymes', 'Protects collagen from oxidative degradation'],
    formulatorBenefits: ['Enhanced sensory feel and reduced astringency compared to raw pomegranate extract'],
    verifiedInPdf: true,
    pdfPage: 14
  },
  {
    id: 'circalys',
    slug: 'circalys',
    name: 'CIRCALYS®',
    code: 'CIRCALYS',
    supplierId: 'greentech',
    category: 'Antioxidants & Anti-Fatigue',
    inci: 'Andrographis paniculata leaf extract',
    mainUse: 'Ayurvedic adaptogen active targeting circadian fatigue, dark circles, eye-bags, and dull skin complexion.',
    application: 'Face, eye & body care',
    dosage: '1%',
    keyBenefits: ['Resets cellular circadian rhythm', 'Reduces dark circles and puffy under-eye bags', 'Restores fresh, rested glow'],
    formulatorBenefits: ['Proven active that counteracts the visible effects of blue-light sleep deprivation on skin'],
    verifiedInPdf: true,
    pdfPage: 14
  },
  {
    id: 'somitine',
    slug: 'somitine',
    name: 'SOMITINE®',
    code: 'SOMITINE',
    supplierId: 'greentech',
    category: 'Antioxidants & Anti-Fatigue',
    inci: 'Purified mannosyl glucuronic acid oligosaccharide',
    mainUse: 'Cellular energy and radiance booster, awakening fatigued cells and boosting metabolic vitality.',
    application: 'Skin revitalization',
    dosage: '2–5%',
    keyBenefits: ['Boosts mitochondrial ATP production', 'Eliminates grey, dull skin fatigue tone', 'Smooths rough skin texture'],
    formulatorBenefits: ['Pure oligosaccharide structure with high water-solubility and broad pH stability'],
    verifiedInPdf: true,
    pdfPage: 14
  },

  // 2.3 Skin Renewal, Exfoliation & Radiance (Page 14)
  {
    id: 'flower-acids',
    slug: 'flower-acids',
    name: 'FLOWER ACIDS®',
    code: 'FLOWER-ACIDS',
    supplierId: 'greentech',
    category: 'Skin Renewal & Radiance',
    inci: 'Hibiscus sabdariffa flower extract; organic acids (AHA)',
    mainUse: 'Natural gentle AHA exfoliant promoting gentle cellular renewal, refined pores, and luminous skin radiance.',
    application: 'Peels, exfoliating & brightening products',
    dosage: '2–10%',
    keyBenefits: ['Non-irritating natural AHA alternative to glycolic acid', 'Refines skin grain and unclogs pores', 'Stimulates mucopolysaccharide synthesis'],
    formulatorBenefits: ['Gentle peeling effect suitable for sensitive skin formulations without peeling redness'],
    verifiedInPdf: true,
    pdfPage: 14
  },
  {
    id: 'protease',
    slug: 'protease',
    name: 'PROTEASE',
    code: 'PROTEASE-SUBTILISIN',
    supplierId: 'greentech',
    category: 'Skin Renewal & Radiance',
    inci: 'Protease (Subtilisin) from Bacillus subtilis',
    mainUse: 'Enzymatic exfoliant gently cleaving dead keratinocyte bonds without mechanical scrubbing or harsh acid irritation.',
    application: 'Enzyme peels / exfoliation',
    dosage: '0.1–0.5%',
    keyBenefits: ['Selective enzymatic desquamation', 'Gentle on skin barrier', 'Reveals smooth, baby-soft skin'],
    formulatorBenefits: ['Biological exfoliation for enzyme powder washes, peeling masks, and gentle daily cleansers'],
    verifiedInPdf: true,
    pdfPage: 14
  },
  {
    id: 'aceromine',
    slug: 'aceromine',
    name: 'ACEROMINE',
    code: 'ACEROMINE',
    supplierId: 'greentech',
    category: 'Skin Renewal & Radiance',
    inci: 'Acerola (Malpighia glabra) fruit extract, Vitamin C (ascorbic acid), liposome technology',
    mainUse: 'Liposomal Vitamin C complex from organic acerola cherry, boosting collagen synthesis, antioxidant defense, and brightening.',
    application: 'Vitamin C serums / creams',
    dosage: '2–5%',
    keyBenefits: ['Encapsulated natural Vitamin C for high stability', 'Fades post-inflammatory hyperpigmentation', 'Protects against UV photo-damage'],
    formulatorBenefits: ['Liposome technology prevents rapid Vitamin C oxidation and browning in formulations'],
    verifiedInPdf: true,
    pdfPage: 14
  },
  {
    id: 'retimine-iii',
    slug: 'retimine-iii',
    name: 'RETIMINE® III',
    code: 'RETIMINE-III',
    supplierId: 'greentech',
    category: 'Skin Renewal & Radiance',
    inci: 'Pro-vitamin A encapsulated; retinyl palmitate',
    mainUse: 'Encapsulated pro-vitamin A complex delivering skin regeneration, elasticity enhancement, and gentle smoothing.',
    application: 'Anti-ageing / revitalizing care',
    dosage: '1–5%',
    keyBenefits: ['Slow sustained release of retinoid benefits', 'Zero irritation or retinoid flaking', 'Stimulates cellular turnover'],
    formulatorBenefits: ['Encapsulation guarantees stability against light and oxidation during manufacturing'],
    verifiedInPdf: true,
    pdfPage: 14
  },
  {
    id: 'rosamine',
    slug: 'rosamine',
    name: 'ROSAMINE',
    code: 'ROSAMINE',
    supplierId: 'greentech',
    category: 'Skin Renewal & Radiance',
    inci: 'Vitamins A, C, E, F + carotenoids',
    mainUse: 'Complete multivitamin complex restoring skin nutrition, antioxidant reserve, and healthy barrier luminescence.',
    application: 'Vitamin concentrate / serums',
    dosage: '1–5%',
    keyBenefits: ['Comprehensive vitamin nutrition (A, C, E, F)', 'Combats dull, devitalized skin tone', 'Reinforces lipid barrier'],
    formulatorBenefits: ['Balanced blend of water and lipid-soluble vitamins optimized for high formulation compatibility'],
    verifiedInPdf: true,
    pdfPage: 14
  },

  // 2.4 Skin Brightening & Anti-Pigmentation (Page 15)
  {
    id: 'clerilys',
    slug: 'clerilys',
    name: 'CLERILYS® / CLERILYS W®',
    code: 'CLERILYS',
    supplierId: 'greentech',
    category: 'Skin Brightening',
    inci: 'Hibiscus, mulberry, cucumber extracts; phenolic compounds',
    mainUse: 'Targeted botanical brightening complex reducing dark spots, post-acne marks, and uneven pigmentation.',
    application: 'Brightening creams, serums',
    dosage: '1–3%',
    keyBenefits: ['Inhibits tyrosinase enzyme activity', 'Fades melasma and solar lentigines', 'Promotes crystal-clear skin tone'],
    formulatorBenefits: ['CLERILYS W is a clear, water-soluble grade tailored for transparent serums and toners'],
    verifiedInPdf: true,
    pdfPage: 15
  },
  {
    id: 'phytelene-egx-293',
    slug: 'phytelene-egx-293',
    name: 'PHYTELENE COMPLEX LIGHTENING EGX 293',
    code: 'EGX 293',
    supplierId: 'greentech',
    category: 'Skin Brightening',
    inci: 'Daisy, Madonna lily, licorice & camu extracts',
    mainUse: 'Multi-target brightening complex regulating melanin synthesis, melanosome transfer, and antioxidant protection.',
    application: 'Brightening / anti-spot',
    dosage: '1–5%',
    keyBenefits: ['Dual action: blocks tyrosinase and melanosome migration', 'Soothes inflammation-triggered hyperpigmentation', 'Enhances skin clarity'],
    formulatorBenefits: ['High synergy across 4 distinct botanical mechanisms for stubborn pigmentation'],
    verifiedInPdf: true,
    pdfPage: 15
  },
  {
    id: 'rayolys',
    slug: 'rayolys',
    name: 'RAYOLYS',
    code: 'RAYOLYS',
    supplierId: 'greentech',
    category: 'Skin Brightening',
    inci: 'Peach, apple & raspberry extracts; flavonoids / AHA',
    mainUse: 'Fruit extract blend targeting dark spots and complexion brightening through gentle organic fruit AHA renewal.',
    application: 'Brightening / skin lightener',
    dosage: '1–5%',
    keyBenefits: ['Lightens hyperpigmented spots', 'Freshens dull, yellow skin tones', 'Gentle fruit AHA exfoliation'],
    formulatorBenefits: ['Pleasant sensorial profile with natural fruit sugar humectancy'],
    verifiedInPdf: true,
    pdfPage: 15
  },
  {
    id: 'soliberine',
    slug: 'soliberine',
    name: 'SOLIBERINE®',
    code: 'SOLIBERINE',
    supplierId: 'greentech',
    category: 'Skin Brightening',
    inci: 'Buddleja officinalis extract; phenylpropanoids',
    mainUse: 'Full-spectrum photo-protector shielding against UV, Blue Light, and Infrared to prevent hyperpigmentation.',
    application: 'Sun care, anti-pigmentation',
    dosage: '0.2–2%',
    keyBenefits: ['Protects against HEV (High Energy Visible) Blue Light', 'Blocks solar Infrared thermal ageing', 'Prevents photo-induced brown spots'],
    formulatorBenefits: ['Award-winning active for modern screen defense and daily city protection serums'],
    verifiedInPdf: true,
    pdfPage: 15
  },

  // 2.5 Eye Care (Page 15)
  {
    id: 'myralys',
    slug: 'myralys',
    name: 'MYRALYS®',
    code: 'MYRALYS',
    supplierId: 'greentech',
    category: 'Eye Care',
    inci: 'Gentiana lutea root extract / gentiopicroside',
    mainUse: 'Specialized eye contour rejuvenator clinically proven to lift upper eyelids, reduce dark circles, and diminish eye bags.',
    application: 'Eye creams, eye serums',
    dosage: '0.1–0.5%',
    keyBenefits: ['Upper eyelid lifting effect', 'Targets vascular and pigmented dark circles', 'Reduces puffiness in 14 days'],
    formulatorBenefits: ['Effective at ultra-low dosage (0.1–0.5%), excellent cost-benefit ratio for premium eye products'],
    verifiedInPdf: true,
    pdfPage: 15
  },
  {
    id: 'cernilys',
    slug: 'cernilys',
    name: 'CERNILYS®',
    code: 'CERNILYS',
    supplierId: 'greentech',
    category: 'Eye Care',
    inci: 'Cedar bark extract',
    mainUse: 'Cedar bark active promoting vascular tone, microcirculation, and antioxidant defense to eliminate dark under-eye rings.',
    application: 'Eye contour products',
    dosage: '1%',
    keyBenefits: ['Improves capillary resistance', 'Clears accumulated blood pigments under thin skin', 'Soothes delicate periorbital tissue'],
    formulatorBenefits: ['Upcycled active extracted from cedar forestry by-products with circular economy credentials'],
    verifiedInPdf: true,
    pdfPage: 15
  },

  // 2.6 Sebum Control, Anti-Blemish & Anti-Acne (Page 16)
  {
    id: 'acnilys',
    slug: 'acnilys',
    name: 'ACNILYS®',
    code: 'ACNILYS',
    supplierId: 'greentech',
    category: 'Sebum Control & Acne',
    inci: 'Rhodomyrtus tomentosa fruit extract',
    mainUse: 'Multifunctional active targeting excess sebum, hyperkeratinization, acne bacteria, and Cutibacterium acnes biofilm.',
    application: 'Acne / oily-skin products',
    dosage: '2%',
    keyBenefits: ['Reduces sebum hyper-secretion', 'Inhibits C. acnes biofilm formation', 'Soothes inflammatory acne lesions', 'Modulates skin microbiota'],
    formulatorBenefits: ['Non-drying botanical alternative to harsh benzoyl peroxide, maintaining barrier moisture'],
    verifiedInPdf: true,
    pdfPage: 16
  },
  {
    id: 'cbd-isolate',
    slug: 'cbd-isolate',
    name: 'CANNABIDIOL (CBD) ISOLATE POWDER',
    code: 'CBD ISOLATE',
    supplierId: 'greentech',
    category: 'Sebum Control & Acne',
    inci: 'Cannabidiol, CBD ≥98%',
    mainUse: 'Ultra-pure crystalline cannabinoid providing potent sebostatic, anti-inflammatory, and calming actions.',
    application: 'Leave-on / rinse-off formulations',
    dosage: '0.01–0.4% leave-on; up to 5% rinse-off',
    keyBenefits: ['Regulates sebocyte lipid synthesis', 'Calms acute neurogenic inflammation', 'High antioxidant protection'],
    formulatorBenefits: ['≥98% pure crystalline powder, THC-free, dissolves in cosmetic oils and esters'],
    verifiedInPdf: true,
    pdfPage: 16
  },
  {
    id: 'greensil',
    slug: 'greensil',
    name: 'GREENSIL®',
    code: 'GREENSIL',
    supplierId: 'greentech',
    category: 'Sebum Control & Acne',
    inci: 'Bamboo silica powder',
    mainUse: '100% plant-origin bamboo silica delivering superior sebum absorption, matte soft-focus finish, and natural deodorizing action.',
    application: 'Face powders, masks, body care',
    dosage: '0.5–5%',
    keyBenefits: ['Absorbs 200%+ of its weight in sebum', 'Provides velvety matte finish', 'Natural micro-exfoliant in scrubs'],
    formulatorBenefits: ['Natural alternative to synthetic PMMA beads and nylon powders for clean beauty'],
    verifiedInPdf: true,
    pdfPage: 16
  },
  {
    id: 'seborilys',
    slug: 'seborilys',
    name: 'SEBORILYS',
    code: 'SEBORILYS',
    supplierId: 'greentech',
    category: 'Sebum Control & Acne',
    inci: 'Rosemary, terminalia, nasturtium & microalgae complex',
    mainUse: 'Botanical and microalgal synergy controlling hyper-seborrhea, purifying congested pores, and eliminating scalp greasiness.',
    application: 'Oily skin / scalp care',
    dosage: '1–5%',
    keyBenefits: ['5-alpha reductase enzyme inhibition', 'Astringent pore tightening', 'Antimicrobial against oily scalp yeast'],
    formulatorBenefits: ['Equally effective in clarifying facial cleansers and purifying anti-grease shampoos'],
    verifiedInPdf: true,
    pdfPage: 16
  },

  // 2.7 Skin Moisturization & Hydration (Page 16)
  {
    id: 'cariciline',
    slug: 'cariciline',
    name: 'CARICILINE®',
    code: 'CARICILINE',
    supplierId: 'greentech',
    category: 'Hydration & Moisture',
    inci: 'Fig extract, sugars & AHA',
    mainUse: 'Rich fruit active replenishing natural moisturizing factor (NMF) components and delivering prolonged hydration.',
    application: 'Creams, lotions, serums',
    dosage: '1%',
    keyBenefits: ['Prolonged hydration (+40% after 8h)', 'Restores physiological water retention', 'Smooths micro-cracks on dry skin'],
    formulatorBenefits: ['Rich in natural fruit mucilages providing comforting, non-tacky cushioning'],
    verifiedInPdf: true,
    pdfPage: 16
  },
  {
    id: 'cosmelene-neptune-kelp',
    slug: 'cosmelene-neptune-kelp',
    name: 'COSMELENE® NEPTUNE KELP',
    code: 'COSMELENE-KELP',
    supplierId: 'greentech',
    category: 'Hydration & Moisture',
    inci: 'Laminaria saccharina extract, polysaccharides',
    mainUse: 'Marine kelp extract packed with fucoidans and alginates for intensive moisture binding and comfort.',
    application: 'Moisturizers',
    dosage: '1–5%',
    keyBenefits: ['High water-binding alginate network', 'Replenishes trace marine minerals', 'Soothes wind-chapped skin'],
    formulatorBenefits: ['Imparts a fresh, hydrating sea-mineral sensation to creams and hydro-gels'],
    verifiedInPdf: true,
    pdfPage: 16
  },
  {
    id: 'hydralys-m',
    slug: 'hydralys-m',
    name: 'HYDRALYS M',
    code: 'HYDRALYS-M',
    supplierId: 'greentech',
    category: 'Hydration & Moisture',
    inci: 'Cantaloupe melon extract, sugars',
    mainUse: 'Melon extract rich in sugars and superoxide dismutase (SOD), preventing trans-epidermal water loss (TEWL).',
    application: 'Moisturizers / lotions',
    dosage: '1–10%',
    keyBenefits: ['Protects against dehydration spikes', 'Antioxidant SOD defense', 'Softens rough skin'],
    formulatorBenefits: ['Ideal for refreshing summer gels, post-sun replenishing lotions, and body milks'],
    verifiedInPdf: true,
    pdfPage: 16
  },
  {
    id: 'holobiosys',
    slug: 'holobiosys',
    name: 'HOLOBIOSYS®',
    code: 'HOLOBIOSYS',
    supplierId: 'greentech',
    category: 'Hydration & Moisture',
    inci: 'Gentiana lutea + fermented extract',
    mainUse: 'Holobiont-concept active stimulating epidermal lipid synthesis, filaggrin production, and deep hydration.',
    application: 'Skin hydration / barrier care',
    dosage: '1%',
    keyBenefits: ['Boosts skin holobiont ecosystem', 'Stimulates ceramide and hyaluronic acid synthesis', 'Rebuilds compromised skin barriers'],
    formulatorBenefits: ['Winner of formulation innovation awards for comprehensive barrier-lipid rejuvenation'],
    verifiedInPdf: true,
    pdfPage: 16
  },
  {
    id: 'jericine',
    slug: 'jericine',
    name: 'JERICINE®',
    code: 'JERICINE',
    supplierId: 'greentech',
    category: 'Hydration & Moisture',
    inci: 'Selaginella lepidophylla extract / trehalose',
    mainUse: 'Resurrection plant extract containing trehalose, protecting cellular membranes against acute dehydration stress.',
    application: 'Moisturizers',
    dosage: '1–5%',
    keyBenefits: ['Extreme dehydration resistance', 'Cellular membrane stabilization', 'Accelerates skin recovery after dry cold weather'],
    formulatorBenefits: ['Mimics the survival biology of desert resurrection plants for barrier emergency treatments'],
    verifiedInPdf: true,
    pdfPage: 16
  },
  {
    id: 'polevan-s',
    slug: 'polevan-s',
    name: 'POLEVAN S',
    code: 'POLEVAN-S',
    supplierId: 'greentech',
    category: 'Hydration & Moisture',
    inci: 'Levan biopolymer',
    mainUse: 'Natural fructan biopolymer acting as a plant-derived hyaluronic acid alternative, binding water and stimulating renewal.',
    application: 'Hydrating formulations',
    dosage: '1–2%',
    keyBenefits: ['Hyaluronic-acid-like water retention', 'Non-sticky silky slip', 'Supports skin barrier renewal'],
    formulatorBenefits: ['Excellent electrolyte and pH stability compared to traditional sodium hyaluronate'],
    verifiedInPdf: true,
    pdfPage: 16
  },

  // 2.8 Anti-Redness, Soothing & Sensitive Skin (Page 17)
  {
    id: 'expozen',
    slug: 'expozen',
    name: 'EXPOZEN®',
    code: 'EXPOZEN',
    supplierId: 'greentech',
    category: 'Soothing & Sensitive Skin',
    inci: 'Halymenia durvillei extract',
    mainUse: 'Marine red algae active clinically formulated to relieve redness, calm neuro-inflammation, and rebalance microbiota.',
    application: 'Sensitive-skin care',
    dosage: '1–5%',
    keyBenefits: ['Reduces neurogenic stinging and burning', 'Downregulates inflammatory interleukins', 'Eliminates visible facial erythema', 'Protects against environmental exposome'],
    formulatorBenefits: ['Specifically engineered for reactive, hypersensitive, and rosacea-prone skin types'],
    verifiedInPdf: true,
    pdfPage: 17
  },
  {
    id: 'protectol',
    slug: 'protectol',
    name: 'PROTECTOL®',
    code: 'PROTECTOL',
    supplierId: 'greentech',
    category: 'Soothing & Sensitive Skin',
    inci: 'Birch bark + figwort extracts',
    mainUse: 'Anti-inflammatory botanical synergy calming UV-induced solar erythema, contact redness, and skin discomfort.',
    application: 'Sensitive / after-sun care',
    dosage: '1–5%',
    keyBenefits: ['Fast soothing of solar erythema', 'Calms acute irritation after shaving or peeling', 'Strengthens micro-capillary walls'],
    formulatorBenefits: ['Essential addition for after-sun milks, soothing baby balms, and post-procedure ointments'],
    verifiedInPdf: true,
    pdfPage: 17
  },
  {
    id: 'biomoduline',
    slug: 'biomoduline',
    name: 'BIOMODULINE',
    code: 'BIOMODULINE',
    supplierId: 'greentech',
    category: 'Soothing & Sensitive Skin',
    inci: 'Shiitake extract / beta-glucans',
    mainUse: 'Immunomodulating shiitake beta-glucan complex enhancing skin defense mechanisms and reducing hypersensitivity.',
    application: 'Sensitive-skin products',
    dosage: '0.5–2%',
    keyBenefits: ['Boosts cutaneous immune response', 'Protects Langerhans defense cells', 'Reduces hypersensitivity reactions'],
    formulatorBenefits: ['Strengthens fragile, hyper-reactive skin from the inside out'],
    verifiedInPdf: true,
    pdfPage: 17
  },
  {
    id: 'silidine-sn',
    slug: 'silidine-sn',
    name: 'SILIDINE® SN',
    code: 'SILIDINE-SN',
    supplierId: 'greentech',
    category: 'Soothing & Sensitive Skin',
    inci: 'Marine red microalgae extract',
    mainUse: 'Oligosaccharide extract of Porphyridium cruentum stimulating synthesis of endothelin-1 to vasoconstrict red capillaries.',
    application: 'Redness / leg-care products',
    dosage: '1%',
    keyBenefits: ['Vascular toning action', 'Reduces visible facial telangiectasia (spider veins)', 'Lightens diffuse redness on cheeks'],
    formulatorBenefits: ['Clinical vascular toning effect for anti-redness creams, heavy leg gels, and eye dark circle formulations'],
    verifiedInPdf: true,
    pdfPage: 17
  },

  // 2.9 Hair Care, Anti-Greying, Growth & Conditioning (Pages 19–20)
  {
    id: 'arcolys',
    slug: 'arcolys',
    name: 'ARCOLYS®',
    code: 'ARCOLYS',
    supplierId: 'greentech',
    category: 'Hair Care & Scalp',
    inci: 'Picrorhiza scrophulariiflora root extract',
    mainUse: 'Breakthrough anti-greying active repigmenting hair naturally from the root by boosting melanogenesis and catalase.',
    application: 'Leave-on anti-greying products',
    dosage: '1%',
    keyBenefits: ['Restores natural hair color without dye', 'Increases follicular tyrosinase and melanin synthesis', 'Reduces hydrogen peroxide stress on hair follicles'],
    formulatorBenefits: ['Clinical studies demonstrate visible reduction of white hair density after 3 months of use'],
    verifiedInPdf: true,
    pdfPage: 19
  },
  {
    id: 'hairiline',
    slug: 'hairiline',
    name: 'HAIRILINE®',
    code: 'HAIRILINE',
    supplierId: 'greentech',
    category: 'Hair Care & Scalp',
    inci: 'Lindera strychniifolia root extract',
    mainUse: 'Anti-hair loss and hair density active rebalancing the scalp microbiota, strengthening hair anchorage, and slowing fall.',
    application: 'Hair-growth / scalp serums',
    dosage: '1%',
    keyBenefits: ['Slows down acute and chronic hair loss', 'Stimulates dermal papilla cell proliferation', 'Improves anagen/telogen hair ratio'],
    formulatorBenefits: ['Effective in light leave-on water-based hair tonics and scalp serums'],
    verifiedInPdf: true,
    pdfPage: 19
  },
  {
    id: 'kapilarine',
    slug: 'kapilarine',
    name: 'KAPILARINE',
    code: 'KAPILARINE',
    supplierId: 'greentech',
    category: 'Hair Care & Scalp',
    inci: 'Cinnamon bark, clary sage, ginkgo & kigelia extracts',
    mainUse: 'Synergistic botanical complex preventing hair loss, stimulating microcirculation, and regulating follicle sebum.',
    application: 'Hair/scalp leave-on',
    dosage: '1–5%',
    keyBenefits: ['Inhibits 5-alpha reductase enzyme', 'Stimulates micro-blood circulation to roots', 'Anti-inflammatory on scalp tissues'],
    formulatorBenefits: ['Traditional multi-herb synergy tested and validated for men and women’s anti-hairfall lotions'],
    verifiedInPdf: true,
    pdfPage: 19
  },
  {
    id: 'dandrilys',
    slug: 'dandrilys',
    name: 'DANDRILYS®',
    code: 'DANDRILYS',
    supplierId: 'greentech',
    category: 'Hair Care & Scalp',
    inci: 'Ziziphus joazeiro bark extract / saponins',
    mainUse: 'Natural bio-saponin anti-dandruff active outperforming zinc pyrithione in reducing flakes, itching, and sebum.',
    application: 'Anti-dandruff shampoo',
    dosage: '1%',
    keyBenefits: ['Clinically proven faster dandruff reduction than Zinc Pyrithione', 'Immediate soothing of itchy scalp', 'Rebalances scalp microbiome without chemical toxicity'],
    formulatorBenefits: ['100% natural, sulfate-free shampoo friendly, non-cytotoxic replacement for banned zinc pyrithione'],
    verifiedInPdf: true,
    pdfPage: 19
  },
  {
    id: 'tilicine',
    slug: 'tilicine',
    name: 'TILICINE®',
    code: 'TILICINE',
    supplierId: 'greentech',
    category: 'Hair Care & Scalp',
    inci: 'Acetylated polysaccharides + sugars from linden buds',
    mainUse: 'Natural hair volume and moisture active coating the hair fiber with a protective smoothing, anti-static envelope.',
    application: 'Shampoo, conditioner, styling',
    dosage: '1–5%',
    keyBenefits: ['Forms continuous film on hair cuticles', 'Boosts volume and bounce without stiffness', 'Anti-static combability'],
    formulatorBenefits: ['Substantive film former ideal for lightweight curl enhancers and blow-dry primers'],
    verifiedInPdf: true,
    pdfPage: 19
  },

  // 2.10 Sensorial, Emulsifiers & Natural Ingredients (Pages 21–22)
  {
    id: 'greensoft',
    slug: 'greensoft',
    name: 'GREENSOFT™',
    code: 'GREENSOFT',
    supplierId: 'greentech',
    category: 'Sensorial & Emulsifiers',
    inci: 'Plant-derived butter/oil association; hydrogenated vegetable oil',
    mainUse: 'Natural multifunctional emulsifier and co-emulsifier creating rich, creamy, soft butter-like textures.',
    application: 'Creams, lotions, emulsions',
    dosage: 'As required according to formulation',
    keyBenefits: ['Forms lamellar liquid crystalline networks', 'Luxurious velvet after-feel', 'Excellent stability across broad temperature range'],
    formulatorBenefits: ['Enables creation of thick, luxurious creams without heavy synthetic waxes'],
    verifiedInPdf: true,
    pdfPage: 21
  },
  {
    id: 'sensol-100',
    slug: 'sensol-100',
    name: 'SENSOL 100®',
    code: 'SENSOL-100',
    supplierId: 'greentech',
    category: 'Sensorial & Emulsifiers',
    inci: 'Avocado-derived concentrate / vegetable emollient',
    mainUse: 'Vegetable-derived sensory enhancer replicating the light, dry, non-greasy velvet touch of volatile silicones.',
    application: 'Skin & hair care',
    dosage: '5–20%',
    keyBenefits: ['Natural silicone-like dry touch', 'Improves formula playtime and spread', 'Non-greasy nourishing after-feel'],
    formulatorBenefits: ['Ideal plant-based replacement for D5 and light dimethicones in clean green formulations'],
    verifiedInPdf: true,
    pdfPage: 21
  },
  {
    id: 'soft-butter',
    slug: 'soft-butter',
    name: 'SOFT BUTTER™',
    code: 'SOFT-BUTTER',
    supplierId: 'greentech',
    category: 'Sensorial & Emulsifiers',
    inci: 'Vegetable oil/butter association',
    mainUse: 'Natural consistency enhancer and emollient butter delivering instant melting sensation on skin contact.',
    application: 'Skin/hair formulations',
    dosage: 'As required',
    keyBenefits: ['Body-temperature melting curve', 'Cushioning barrier protection', 'Smooth non-grainy texture'],
    formulatorBenefits: ['Provides rich structural body to lip balms, body butters, and hair conditioners'],
    verifiedInPdf: true,
    pdfPage: 21
  },
  {
    id: 'org-yuzu',
    slug: 'org-yuzu',
    name: 'ORGANIC YUZU FROM FRANCE',
    code: 'ORG-YUZU',
    supplierId: 'greentech',
    category: 'Botanical & Natural Products',
    inci: 'Yuzu fruit extract + Zinc PCA',
    mainUse: 'Certified organic French yuzu extract combined with zinc for purifying, sebum-regulating, and radiance care.',
    application: 'Oily-skin care',
    dosage: 'Depending on use (1–5%)',
    keyBenefits: ['Pore tightening and sebum balancing', 'Uplifting natural citrus aroma', 'Brightens dull complexion'],
    formulatorBenefits: ['COSMOS organic certified origin with guaranteed French provenance'],
    verifiedInPdf: true,
    pdfPage: 22
  },
  {
    id: 'org-inca-inchi',
    slug: 'org-inca-inchi',
    name: 'ORGANIC & FAIR TRADE INCA INCHI FROM PERU',
    code: 'ORG-INCA-INCHI',
    supplierId: 'greentech',
    category: 'Botanical & Natural Products',
    inci: 'Inca Inchi (Plukenetia volubilis) seed oil',
    mainUse: 'Extraordinary virgin plant oil boasting the highest known plant concentration of Omega-3 (α-linolenic acid, >45%).',
    application: 'Skin / hair care',
    dosage: '1–5%',
    keyBenefits: ['World’s richest botanical source of Omega-3', 'Restores epidermal lipid cement', 'Relieves dry, itchy, atopic skin'],
    formulatorBenefits: ['Fair trade certified sourcing supporting native Amazonian farming cooperatives in Peru'],
    verifiedInPdf: true,
    pdfPage: 22
  },

  // =========================================================================
  // 3. GENERAL MINDTECH PRODUCT RANGE (Catalogue Pages 6–11)
  // =========================================================================
  // 3.1 Skin Lightening & Anti-Pigmentation Actives (Page 6)
  {
    id: 'alpha-arbutin',
    slug: 'alpha-arbutin',
    name: 'Alpha Arbutin',
    code: 'M-AA-99',
    supplierId: 'general-range',
    category: 'Skin Lightening & Anti-Pigmentation',
    inci: 'Alpha Arbutin (≥99%)',
    mainUse: 'Gold-standard biosynthesized skin lightener blocking tyrosinase without cytotoxicity, safe for daily use.',
    application: 'Creams, Lotions, Scrubs, Masks, Serums, Face Packs',
    dosage: '0.2–2%',
    keyBenefits: ['Rapid fading of hyperpigmentation', '9x more effective than beta arbutin', 'Safe and gentle for long-term use'],
    formulatorBenefits: ['High purity crystalline powder, easily dissolved in water phase at neutral pH (5.0–7.0)'],
    verifiedInPdf: true,
    pdfPage: 6
  },
  {
    id: 'beta-arbutin',
    slug: 'beta-arbutin',
    name: 'Beta Arbutin',
    code: 'M-BA-99',
    supplierId: 'general-range',
    category: 'Skin Lightening & Anti-Pigmentation',
    inci: 'Beta Arbutin',
    mainUse: 'Traditional botanical skin brightening active offering economical tyrosinase inhibition.',
    application: 'Creams, Lotions, Scrubs, Masks, Serums',
    dosage: '1–7%',
    keyBenefits: ['Gradual, natural skin brightening', 'Prevents freckle formation', 'Proven cosmetic safety'],
    formulatorBenefits: ['Cost-effective brightening solution for high-volume commercial whitening lotions'],
    verifiedInPdf: true,
    pdfPage: 6
  },
  {
    id: 'kojic-acid',
    slug: 'kojic-acid',
    name: 'Kojic Acid',
    code: 'M-KA-99',
    supplierId: 'general-range',
    category: 'Skin Lightening & Anti-Pigmentation',
    inci: 'Kojic Acid',
    mainUse: 'Potent copper-chelating tyrosinase inhibitor derived from fungal fermentation, widely used in spot treatments.',
    application: 'Creams, Lotions, Scrubs, Masks, Serums, Face Packs',
    dosage: '0.5–5%',
    keyBenefits: ['Direct copper chelation on tyrosinase', 'Lightens age spots and melasma', 'Mild antimicrobial activity'],
    formulatorBenefits: ['Chelating agents (EDTA) and antioxidants recommended to prevent discoloration over time'],
    verifiedInPdf: true,
    pdfPage: 6
  },
  {
    id: 'kojic-acid-dipalmitate',
    slug: 'kojic-acid-dipalmitate',
    name: 'Kojic Acid Dipalmitate (KAD)',
    code: 'M-KAD',
    supplierId: 'general-range',
    category: 'Skin Lightening & Anti-Pigmentation',
    inci: 'Kojic Dipalmitate',
    mainUse: 'Oil-soluble esterified derivative of kojic acid with superior thermal, photo, and pH color stability.',
    application: 'Creams, Lotions, Scrubs, Masks, Serums, Face Packs',
    dosage: '0.5–5%',
    keyBenefits: ['Does not turn brown or discolor over time', 'Oil-soluble, dissolves smoothly into lipid phase', 'Enhanced skin absorption'],
    formulatorBenefits: ['Completely overcomes the yellowing/browning drawback of free kojic acid in lotions'],
    verifiedInPdf: true,
    pdfPage: 6
  },
  {
    id: 'ethyl-ascorbic-acid',
    slug: 'ethyl-ascorbic-acid',
    name: 'Ethyl Ascorbic Acid (EAA)',
    code: 'M-EAA-99',
    supplierId: 'general-range',
    category: 'Skin Lightening & Anti-Pigmentation',
    inci: '3-O-Ethyl Ascorbic Acid',
    mainUse: 'Highly stable etherified Vitamin C derivative offering direct enzymatic conversion into active ascorbic acid in skin.',
    application: 'Creams, Lotions, Scrubs, Masks, Serums, Face Packs',
    dosage: '0.5–25%',
    keyBenefits: ['High molecular stability (does not oxidize)', 'Direct tyrosinase inhibition', 'Stimulates collagen synthesis (+26%)'],
    formulatorBenefits: ['Water and oil soluble, stable across pH 4.0–7.0 without nitrogen sparging'],
    verifiedInPdf: true,
    pdfPage: 6
  },
  {
    id: 'niacinamide',
    slug: 'niacinamide',
    name: 'Niacinamide (Vitamin B3)',
    code: 'M-VB3',
    supplierId: 'general-range',
    category: 'Skin Lightening & Anti-Pigmentation',
    inci: 'Niacinamide (USP / Cosmetic Grade)',
    mainUse: 'Multifunctional active inhibiting melanosome transfer, strengthening ceramides, and reducing enlarged pores.',
    application: 'Fairness Creams, Sunscreens, Moisturizers, Hair Tonics, Bath Products, Shampoos',
    dosage: '0.1–2%',
    keyBenefits: ['Blocks melanosome transfer to keratinocytes', 'Increases epidermal ceramide synthesis', 'Controls excess sebum and pore size'],
    formulatorBenefits: ['Low residual nicotinic acid content ensures zero flushing or redness on sensitive skin'],
    verifiedInPdf: true,
    pdfPage: 6
  },

  // 3.2 Anti-Ageing & Skin Barrier Actives (Page 7)
  {
    id: 'ceramides-np',
    slug: 'ceramides',
    name: 'Ceramides Complex',
    code: 'M-CERAMIDES',
    supplierId: 'general-range',
    category: 'Anti-Ageing & Skin Barrier Actives',
    inci: 'Ceramides',
    mainUse: 'Essential physiological stratum corneum lipids repairing the permeability barrier and preventing water loss.',
    application: 'Creams, Lotions, Serums, Masks, Oils',
    dosage: '0.5–2%',
    keyBenefits: ['Restores damaged skin barrier', 'Significantly reduces TEWL', 'Combats dry eczema and xerosis', 'Firms loose skin'],
    formulatorBenefits: ['Replaces depleted lipid mortar between skin cells in anti-aging and barrier repair formulations'],
    verifiedInPdf: true,
    pdfPage: 7
  },

  // 3.3 Moisturizers, Emollients & Soothing (Page 7)
  {
    id: 'sodium-pca',
    slug: 'sodium-pca',
    name: 'Sodium PCA (50% Solution)',
    code: 'M-NA-PCA',
    supplierId: 'general-range',
    category: 'Moisturizers & Soothing',
    inci: 'Sodium PCA',
    mainUse: 'Naturally occurring sodium salt of pyroglutamic acid, key component of skin’s Natural Moisturizing Factor (NMF).',
    application: 'Creams, Lotions, Serums, Face Wash, Shampoo, Conditioners',
    dosage: '1–5%',
    keyBenefits: ['Binds 1.5x more water than glycerine', 'Non-sticky humectancy', 'Enhances hair elasticity and softness'],
    formulatorBenefits: ['Clear aqueous solution for effortless cold-process incorporation into hair and skincare'],
    verifiedInPdf: true,
    pdfPage: 7
  },
  {
    id: 'allantoin',
    slug: 'allantoin',
    name: 'Allantoin',
    code: 'M-ALLANTOIN',
    supplierId: 'general-range',
    category: 'Moisturizers & Soothing',
    inci: 'Allantoin',
    mainUse: 'Proven anti-irritant and epithelial stimulant accelerating cell proliferation and soothing sensitized skin.',
    application: 'Creams, Lotions, Serums, Face Wash, Shampoo, Conditioners',
    dosage: '0.2–2%',
    keyBenefits: ['Soothes irritation and redness', 'Softens keratin and smooths rough patches', 'Promotes tissue healing'],
    formulatorBenefits: ['Add during cool-down phase below 50°C to prevent recrystallization'],
    verifiedInPdf: true,
    pdfPage: 7
  },
  {
    id: 'd-panthenol',
    slug: 'd-panthenol',
    name: 'D-Panthenol (Pro-Vitamin B5)',
    code: 'M-PANTHENOL',
    supplierId: 'general-range',
    category: 'Moisturizers & Soothing',
    inci: 'D-Panthenol',
    mainUse: 'Deeply penetrating provitamin converted to pantothenic acid, providing long-lasting moisturization and hair repair.',
    application: 'Creams, Lotions, Serums',
    dosage: '0.5–2%',
    keyBenefits: ['Deep cellular hydration', 'Improves hair tensile strength and combability', 'Accelerates barrier repair'],
    formulatorBenefits: ['Viscous clear liquid with broad chemical stability across pH 4.0–7.0'],
    verifiedInPdf: true,
    pdfPage: 7
  },

  // 3.4 Thickeners & Rheology Modifiers (Page 8)
  {
    id: 'carbomer-940',
    slug: 'carbomer-940',
    name: 'Carbomer 940',
    code: 'M-CARB-940',
    supplierId: 'general-range',
    category: 'Thickeners & Rheology Modifiers',
    inci: 'Carbomer 940',
    mainUse: 'High molecular weight crosslinked polyacrylic acid polymer delivering crystal-clear sparkling gels and suspension.',
    application: 'Creams, Lotions, Serums, Gels, Hand Sanitizers',
    dosage: '0.2–1%',
    keyBenefits: ['Crystal-clear high-viscosity gels', 'Short-flow non-dripping rheology', 'Excellent particulate suspension'],
    formulatorBenefits: ['Industry standard for ultrasound gels, sparkling hydro-gels, and sanitizer preparations'],
    verifiedInPdf: true,
    pdfPage: 8
  },
  {
    id: 'acrylates-c10-30',
    slug: 'acrylates-c10-30',
    name: 'Acrylates/C10-30 Alkyl Acrylate Crosspolymer',
    code: 'M-ACRY-C10-30',
    supplierId: 'general-range',
    category: 'Thickeners & Rheology Modifiers',
    inci: 'Acrylates/C10-30 Alkyl Acrylate Crosspolymer',
    mainUse: 'Hydrophobically modified polymer providing exceptional electrolyte tolerance and high oil emulsification without surfactants.',
    application: 'Face Wash, Body Wash, Shampoos, Shower Gel, Creams, Lotions, Hair Gels',
    dosage: '0.2–1%',
    keyBenefits: ['Electrolyte and salt tolerant', 'Self-emulsifies up to 20% oil without traditional surfactants', 'Silky, fresh skin feel'],
    formulatorBenefits: ['Superior electrolyte tolerance over traditional carbomer 940, ideal for serum formulas with botanical extracts'],
    verifiedInPdf: true,
    pdfPage: 8
  },

  // 3.5 Mild & Sulfate-Free Surfactants (Page 9)
  {
    id: 'coco-glucoside',
    slug: 'coco-glucoside',
    name: 'Coco Glucoside',
    code: 'M-COCO-GLUC',
    supplierId: 'general-range',
    category: 'Mild & Sulfate-Free Surfactants',
    inci: 'Coco Glucoside',
    mainUse: 'Gentle plant-derived non-ionic surfactant providing rich stable foam, ideal for baby care and sensitive formulations.',
    application: 'Shampoos, Face Wash, Body Wash, Shower Gel, Baby Care',
    dosage: '3–20%',
    keyBenefits: ['100% renewable coconut and glucose origin', 'Exceptionally mild to skin and eyes', 'Readily biodegradable'],
    formulatorBenefits: ['Effective secondary surfactant to reduce irritation of primary cleansing systems'],
    verifiedInPdf: true,
    pdfPage: 9
  },
  {
    id: 'decyl-glucoside',
    slug: 'decyl-glucoside',
    name: 'Decyl Glucoside',
    code: 'M-DECYL-GLUC',
    supplierId: 'general-range',
    category: 'Mild & Sulfate-Free Surfactants',
    inci: 'Decyl Glucoside',
    mainUse: 'Highly versatile, non-ionic surfactant producing luxurious quick flash-foam with gentle skin compatibility.',
    application: 'Shampoos, Face Wash, Cleansers, Shower Gels, Bubble Bath, Body Wash, Soap Bars, Hand Wash',
    dosage: '3–20%',
    keyBenefits: ['Instant high flash-foaming', 'Non-irritating to sensitive skin', 'Ecocert / COSMOS approved feedstock'],
    formulatorBenefits: ['Excellent cloud-point profile and compatibility with all surfactant classes'],
    verifiedInPdf: true,
    pdfPage: 9
  },
  {
    id: 'sci-powder',
    slug: 'sodium-cocoyl-isethionate',
    name: 'Sodium Cocoyl Isethionate (SCI)',
    code: 'M-SCI-85',
    supplierId: 'general-range',
    category: 'Mild & Sulfate-Free Surfactants',
    inci: 'Sodium Cocoyl Isethionate',
    mainUse: '"Baby foam" anionic surfactant prized for dense creamy lather and ultra-mild, non-stripping after-feel.',
    application: 'Soap Base, Cleansing Products, Shampoo Bars',
    dosage: '2–25%',
    keyBenefits: ['Rich, dense, shaving-cream-like lather', 'Does not strip skin’s natural lipid mantle', 'Hard water resistant'],
    formulatorBenefits: ['Key ingredient for syndet bars, solid shampoo bars, and ultra-mild facial cleansing creams'],
    verifiedInPdf: true,
    pdfPage: 9
  },

  // 3.6 Conditioning Agents (Page 10)
  {
    id: 'polyquaternium-7',
    slug: 'polyquaternium-7',
    name: 'Polyquaternium-7',
    code: 'M-PQ-7',
    supplierId: 'general-range',
    category: 'Conditioning Agents',
    inci: 'Polyquaternium-7',
    mainUse: 'Highly charged cationic conditioning copolymer providing lubricity, foam stabilization, and wet combability.',
    application: 'Skin & Hair Care Formulations',
    dosage: '0.5–3%',
    keyBenefits: ['Creamy, rich foam boost', 'Smooth wet combability without buildup', 'Silky body wash skin feel'],
    formulatorBenefits: ['Compatible with anionic surfactants, clear formulations, and cold-process blending'],
    verifiedInPdf: true,
    pdfPage: 10
  },
  {
    id: 'polyquaternium-10',
    slug: 'polyquaternium-10',
    name: 'Polyquaternium-10 (JR-400 / LR-400)',
    code: 'M-PQ-10',
    supplierId: 'general-range',
    category: 'Conditioning Agents',
    inci: 'Polyquaternium-10',
    mainUse: 'Cellulose-derived cationic polymer delivering substantive conditioning, split-end repair, and antistatic control.',
    application: 'Shampoo & Hair Care',
    dosage: '0.5–5%',
    keyBenefits: ['Improves wet and dry hair combability', 'Mends split ends', 'Does not weigh down fine hair'],
    formulatorBenefits: ['Classic conditioning polymer for 2-in-1 shampoos and clarifying hair treatments'],
    verifiedInPdf: true,
    pdfPage: 10
  },
  {
    id: 'hydrolyzed-keratin',
    slug: 'hydrolyzed-keratin',
    name: 'Hydrolyzed Keratin',
    code: 'M-HYD-KERATIN',
    supplierId: 'general-range',
    category: 'Conditioning Agents',
    inci: 'Hydrolyzed Keratin',
    mainUse: 'Low-molecular weight protein hydrolysate penetrating hair cortex to repair structural disulfide damage.',
    application: 'Hair Care, Skin Care',
    dosage: '0.5–5%',
    keyBenefits: ['Rebuilds internal keratin matrix', 'Increases hair tensile strength', 'Reduces hair breakage by up to 50%'],
    formulatorBenefits: ['Substantive protein for salon-grade keratin treatments, bonding masks, and nail strengtheners'],
    verifiedInPdf: true,
    pdfPage: 10
  },

  // 3.7 Sunscreens & UV Filters (Page 10)
  {
    id: 'avobenzone',
    slug: 'avobenzone',
    name: 'Avobenzone (Butyl Methoxydibenzoylmethane)',
    code: 'M-AVOBENZONE',
    supplierId: 'general-range',
    category: 'Sunscreens & UV Filters',
    inci: 'Butyl Methoxydibenzoylmethane (Avobenzone)',
    mainUse: 'Global gold-standard organic broad-spectrum UVA filter protecting deep dermis from photo-aging.',
    application: 'Sunscreen Creams, Lotions, Anti-ageing Products, Skin Lightening Products',
    dosage: '1–5%',
    keyBenefits: ['Broad absorption across full UVA spectrum (310–400 nm)', 'Prevents deep collagen breakdown and photo-damage'],
    formulatorBenefits: ['Combine with octocrylene or photostabilizers to ensure long-lasting UV protection'],
    verifiedInPdf: true,
    pdfPage: 10
  },
  {
    id: 'octocrylene',
    slug: 'octocrylene',
    name: 'Octocrylene',
    code: 'M-OCTOCRYLENE',
    supplierId: 'general-range',
    category: 'Sunscreens & UV Filters',
    inci: 'Octocrylene',
    mainUse: 'Oil-soluble UVB and short-wave UVA filter functioning as an exceptional photostabilizer for Avobenzone.',
    application: 'Sun Care / Sunscreen Formulations',
    dosage: '1–5%',
    keyBenefits: ['Water-resistant UV filter', 'Crucial photostabilizer for avobenzone', 'Improves broad-spectrum SPF rating'],
    formulatorBenefits: ['Liquid oil filter that also acts as a solvent for solid organic sunscreen powders'],
    verifiedInPdf: true,
    pdfPage: 10
  },
  {
    id: 'micronized-tio2',
    slug: 'micronized-tio2',
    name: 'Micronized TiO2 (Titanium Dioxide)',
    code: 'M-TIO2-MICRON',
    supplierId: 'general-range',
    category: 'Sunscreens & UV Filters',
    inci: 'Titanium Dioxide (Micronized / Coated)',
    mainUse: 'Inorganic physical mineral sunblock reflecting and scattering UVA and UVB radiation without chemical breakdown.',
    application: 'Sun Care / UV Protection',
    dosage: '1–20%',
    keyBenefits: ['Broad spectrum physical mineral defense', 'Photostable, does not degrade in sun', 'Gentle on baby and sensitive skin'],
    formulatorBenefits: ['Coated surface treatment ensures smooth dispersion without agglomeration or severe white-cast'],
    verifiedInPdf: true,
    pdfPage: 10
  },

  // 3.8 Preservatives & Antimicrobials (Page 11)
  {
    id: 'imidazolidinyl-urea',
    slug: 'imidazolidinyl-urea',
    name: 'Imidazolidinyl Urea',
    code: 'M-IMID-UREA',
    supplierId: 'general-range',
    category: 'Preservatives & Antimicrobials',
    inci: 'Imidazolidinyl Urea',
    mainUse: 'Broad-spectrum water-soluble preservative effective against Gram-positive and Gram-negative bacteria.',
    application: 'Skin Care, Hair Care, Sunscreens, Personal Care',
    dosage: '0.2–2%',
    keyBenefits: ['Highly effective against bacteria', 'Completely water-soluble', 'Compatible with all cosmetic ingredients'],
    formulatorBenefits: ['Ideal water-phase preservative often combined with parabens or IPBC for total anti-microbial coverage'],
    verifiedInPdf: true,
    pdfPage: 11
  },
  {
    id: 'dmdmh-ipbc',
    slug: 'dmdmh-ipbc',
    name: 'DMDMH & IPBC (Preservative Blend)',
    code: 'M-DMDMH-IPBC',
    supplierId: 'general-range',
    category: 'Preservatives & Antimicrobials',
    inci: 'DMDM Hydantoin & Iodopropyl Butylcarbamate',
    mainUse: 'Synergistic liquid preservative system offering complete bactericidal and fungicidal defense.',
    application: 'Personal Care / Cosmetic Products',
    dosage: '0.3–1%',
    keyBenefits: ['Broad-spectrum: stops bacteria, yeasts, and molds', 'Low odor liquid blend', 'Highly active at low concentrations'],
    formulatorBenefits: ['Ready-to-use liquid blend that disperses smoothly at cool-down temperatures below 50°C'],
    verifiedInPdf: true,
    pdfPage: 11
  },
  {
    id: 'cpc',
    slug: 'cetyl-pyridinium-chloride',
    name: 'Cetyl Pyridinium Chloride (CPC)',
    code: 'M-CPC-99',
    supplierId: 'general-range',
    category: 'Preservatives & Antimicrobials',
    inci: 'Cetylpyridinium Chloride',
    mainUse: 'Broad-spectrum cationic quaternary ammonium antimicrobial and anti-plaque agent.',
    application: 'Mouthwash, Toothpaste, Deodorants, Toiletries, Facial Wipes',
    dosage: '0.05–1%',
    keyBenefits: ['Kills 99.9% of oral and odor-causing bacteria', 'Long substantivity on oral tissues', 'Deodorizing active'],
    formulatorBenefits: ['USP grade for oral care mouthwashes and antimicrobial personal hygiene wipes'],
    verifiedInPdf: true,
    pdfPage: 11
  }
];
