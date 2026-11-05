import { getProductSpecificImage } from './productImages';

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
  videoUrl?: string;
  // Blended Technical Dossier & Catalogue Metadata
  catalogOrigin?: '2026 Mindtech Catalogue' | 'Historical Greentech Dossier' | 'Dual-Sourced / Verified';
  physicalForm?: string;
  solubility?: string;
  sourceDoc?: string;
  casNo?: string;
  botanicalSource?: string;
  mechanism?: string;
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
      'Prompt nationwide dispatch across India',
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
      'Dependable nationwide dispatch across India'
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

const RAW_SUPPLIER_PRODUCTS: ProductItem[] = [
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
    pdfPage: 19,
    videoUrl: 'https://youtube.com/watch?v=3aa3iMw0ahU&feature=shared'
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
  },

  // =========================================================================
  // 4. VVF LIMITED SPECIALTY CONDITIONING & SYNDET INGREDIENTS (7 Catalogue Names)
  // =========================================================================
  {
    id: 'vegarol-bt-80',
    slug: 'vegarol-bt-80',
    name: 'VEGAROL BT 80',
    code: 'VEGAROL BT 80',
    supplierId: 'vvf-limited',
    subSupplier: 'VVF Limited',
    category: 'Surfactants',
    inci: 'Behentrimonium Chloride (80%)',
    mainUse: 'High-performance quaternary ammonium conditioning active providing exceptional wet detangling, anti-static reduction, and velvety softness.',
    application: 'Hair Conditioners, Hair Masks, Leave-in Serums, Conditioning Shampoos',
    dosage: '0.5–3%',
    keyBenefits: ['Superior wet combability and slip', 'Anti-static flyaway control', 'Substantive cuticle smoothing', 'Long-lasting soft touch'],
    formulatorBenefits: ['High concentration (80%) reduces freight and storage volume; dissolves into hot water/oil phase'],
    verifiedInPdf: true,
    pdfPage: 14
  },
  {
    id: 'vegarol-ct-25-30',
    slug: 'vegarol-ct-25-30',
    name: 'VEGAROL CT 25/30',
    code: 'VEGAROL CT 25/30',
    supplierId: 'vvf-limited',
    subSupplier: 'VVF Limited',
    category: 'Surfactants',
    inci: 'Cetrimonium Chloride (25–30%)',
    mainUse: 'Liquid cationic surfactant and conditioning agent offering fast-acting antistatic control and light detangling for rinse-off treatments.',
    application: 'Hair Conditioners, Hair Rinses, Styling Sprays',
    dosage: '0.5–4%',
    keyBenefits: ['Effective antistatic neutralization', 'Instant wet slip and combability', 'Lightweight without buildup'],
    formulatorBenefits: ['Clear aqueous liquid for easy cold or warm processing into conditioners'],
    verifiedInPdf: true,
    pdfPage: 14
  },
  {
    id: 'vegarol-bt-70',
    slug: 'vegarol-bt-70',
    name: 'VEGAROL BT 70',
    code: 'VEGAROL BT 70',
    supplierId: 'vvf-limited',
    subSupplier: 'VVF Limited',
    category: 'Surfactants',
    inci: 'Behentrimonium Chloride & Dipropylene Glycol (70%)',
    mainUse: 'Liquid-dispersible behentrimonium conditioning system dissolved in dipropylene glycol for enhanced lubrication and ease of incorporation.',
    application: 'Hair Conditioners, Intensive Hair Treatments, Hair Serums',
    dosage: '0.5–3%',
    keyBenefits: ['Enhanced lubrication and slip', 'Pre-dissolved in DPG for smooth blending', 'Anti-static & frizz control'],
    formulatorBenefits: ['Easier processing profile compared to solid behentrimonium flakes'],
    verifiedInPdf: true,
    pdfPage: 14
  },
  {
    id: 'promisoft-btms-25-50',
    slug: 'promisoft-btms-25-50',
    name: 'Promisoft BTMS 25/50',
    code: 'Promisoft BTMS 25/50',
    supplierId: 'vvf-limited',
    subSupplier: 'VVF Limited',
    category: 'Emollients',
    inci: 'Behentrimonium Methosulfate & Cetearyl Alcohol',
    mainUse: 'Industry-standard self-emulsifying cationic conditioning wax delivering luxurious cushion, deep detangling, and silky combability.',
    application: 'Premium Hair Conditioners, Solid Conditioner Bars, Hair Masks, Body Conditioners',
    dosage: '1–8%',
    keyBenefits: ['Exceptional wet and dry detangling', 'Forms rich lamellar conditioning emulsions', 'Does not build up on fine hair', 'Gentle quaternary methosulfate'],
    formulatorBenefits: ['Primary cationic emulsifier: creates stable, thick creams without requiring secondary thickeners'],
    verifiedInPdf: true,
    pdfPage: 14
  },
  {
    id: 'promisoft-g-20',
    slug: 'promisoft-g-20',
    name: 'Promisoft G 20',
    code: 'Promisoft G 20',
    supplierId: 'vvf-limited',
    subSupplier: 'VVF Limited',
    category: 'Emollients',
    inci: 'Octyldodecanol',
    mainUse: 'High-purity Guerbet alcohol emollient delivering luxurious skin lubricity, wide pH stability, and superior active solubilization.',
    application: 'Lipsticks, Color Cosmetics, Face Creams, Sunscreen Lotions, Hair Oils',
    dosage: '1–10%',
    keyBenefits: ['Non-comedogenic branched emollient', 'Outstanding pigment wetting and active solvent', 'Hydrolytic stability at extreme pH'],
    formulatorBenefits: ['Dissolves difficult UV filters and organic actives; improves spreadability of color cosmetics'],
    verifiedInPdf: true,
    pdfPage: 14
  },
  {
    id: 'vegarol-sci-85',
    slug: 'vegarol-sci-85',
    name: 'VEGAROL SCI 85',
    code: 'VEGAROL SCI 85',
    supplierId: 'vvf-limited',
    subSupplier: 'VVF Limited',
    category: 'Surfactants',
    inci: 'Sodium Cocoyl Isethionate (85% Noodle/Flake)',
    mainUse: 'Ultra-mild "baby foam" anionic surfactant prized for dense, creamy, non-stripping lather in solid syndet bars and facial cleansers.',
    application: 'Syndet Soap Bars, Solid Shampoo Bars, Creamy Face Wash, Shaving Foams',
    dosage: '2–35%',
    keyBenefits: ['Luxurious rich creamy lather', 'Ultra-mild to epidermal barrier lipids', 'Hard water resistant', 'Biodegradable'],
    formulatorBenefits: ['High active noodle/flake grade optimized for extrusion and compression into solid syndet bars'],
    verifiedInPdf: true,
    pdfPage: 14
  },
  {
    id: 'promisoft-sn-553',
    slug: 'promisoft-sn-553',
    name: 'Promisoft SN 553',
    code: 'Promisoft SN 553',
    supplierId: 'vvf-limited',
    subSupplier: 'VVF Limited',
    category: 'Specialty Chemicals',
    inci: 'Proprietary Syndet Cleansing Base',
    mainUse: 'High-performance pre-formulated syndet cleansing compound engineered for modern soap-free dermatologist bars and gentle foaming washes.',
    application: 'Dermatological Syndet Bars, Medicated Cleansers, Gentle Body Washes',
    dosage: '5–40%',
    keyBenefits: ['Soap-free neutral pH 5.5 capability', 'Exceptional skin tolerance', 'Creamy dense micro-foam'],
    formulatorBenefits: ['Ready-to-press syndet compound accelerating development of clinic-grade soap-free bars'],
    verifiedInPdf: true,
    pdfPage: 14
  },

  // =========================================================================
  // 5. FINE ORGANICS SPECIALTY ESTERS & NATURAL-ORIGIN INGREDIENTS (48 Catalogue Names)
  // =========================================================================
  // 5.1 FinaGreen Green & Natural-Origin Ingredients
  {
    id: 'finagreen-1008',
    slug: 'finagreen-1008',
    name: 'FinaGreen 1008',
    code: 'FinaGreen 1008',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Eco-friendly Ingredients',
    inci: 'Polyglyceryl-10 Caprylate/Caprate',
    mainUse: 'Natural PEG-free green solubilizer and micro-emulsifier for essential oils, fragrances, and lipophilic actives.',
    application: 'Micellar Waters, Wet Wipes, Clear Toners, Face Wash',
    dosage: '1–5%',
    keyBenefits: ['100% bio-based green solubilizer', 'Non-sticky after-feel', 'High solubilization power for lipophilic actives'],
    formulatorBenefits: ['Cold-processable PEG-free alternative to Polysorbate 20 and PEG-40 Hydrogenated Castor Oil'],
    verifiedInPdf: true,
    pdfPage: 23
  },
  {
    id: 'finagreen-1199',
    slug: 'finagreen-1199',
    name: 'FinaGreen 1199',
    code: 'FinaGreen 1199',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Eco-friendly Ingredients',
    inci: 'Sodium Lauroyl Lactylate',
    mainUse: 'Plant-derived mild anionic surfactant, co-emulsifier, and antimicrobial booster improving skin barrier feel.',
    application: 'Mild Cleansers, Shampoos, Anti-Acne Washes, Deodorants',
    dosage: '0.5–3%',
    keyBenefits: ['Natural antimicrobial booster', 'Enhances barrier lipids', 'Soft skin after-feel'],
    formulatorBenefits: ['Synergistic with ceramides and acyl lactylates for stratum corneum barrier reinforcement'],
    verifiedInPdf: true,
    pdfPage: 23
  },
  {
    id: 'finagreen-3042',
    slug: 'finagreen-3042',
    name: 'FinaGreen 3042',
    code: 'FinaGreen 3042',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Functional Ingredients',
    inci: 'Polyglyceryl Polyricinoleate (PGPR)',
    mainUse: 'High-performance botanical W/O emulsifier delivering exceptional stability in high water-content emulsions and mineral sunscreens.',
    application: 'Water-in-Oil Creams, Mineral Sunscreens, Baby Creams, Barrier Ointments',
    dosage: '1–6%',
    keyBenefits: ['Stabilizes high internal water phase W/O systems (up to 80% water)', 'Exceptional pigment suspension', 'Smooth non-greasy spread'],
    formulatorBenefits: ['Allows formulation of ultra-light W/O textures that break easily with a refreshing water release'],
    verifiedInPdf: true,
    pdfPage: 23
  },
  {
    id: 'finagreen-3810',
    slug: 'finagreen-3810',
    name: 'FinaGreen 3810',
    code: 'FinaGreen 3810',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Functional Ingredients',
    inci: 'Polyglycerin-3 & Polyglyceryl Esters',
    mainUse: 'Multifunctional plant-based surfactant and cleansing aid providing dense gentle foam and re-fatting moisturization.',
    application: 'Gentle Facial Cleansers, Sulfate-Free Shampoos, Body Washes',
    dosage: '1–5%',
    keyBenefits: ['Biodegradable green cleansing', 'Preserves skin hydration during wash-off', 'Dense foam texture'],
    formulatorBenefits: ['Mildness booster that mitigates irritation from traditional sulfate systems'],
    verifiedInPdf: true,
    pdfPage: 23
  },
  {
    id: 'finagreen-8100',
    slug: 'finagreen-8100',
    name: 'FinaGreen 8100',
    code: 'FinaGreen 8100',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Emollient Esters',
    inci: 'Coco-Caprylate/Caprate',
    mainUse: 'Ultra-light, fast-spreading natural emollient ester serving as a plant-derived alternative to volatile silicones.',
    application: 'Light Face Serums, Daily Lotions, Natural Foundations, Dry Body Oils, Hair Serums',
    dosage: '2–20%',
    keyBenefits: ['Dry-touch silky glide', 'Fast-spreading coefficient', 'Alternative to Cyclopentasiloxane', '100% vegetable origin'],
    formulatorBenefits: ['Provides silicone-like slip with COSMOS/Ecocert compliant natural sustainability'],
    verifiedInPdf: true,
    pdfPage: 23
  },

  // 5.2 Finamide Cleansing & Foam Agents
  {
    id: 'finamide-cd-12',
    slug: 'finamide-cd-12',
    name: 'Finamide CD 12',
    code: 'Finamide CD 12',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Functional Ingredients',
    inci: 'Coco Diethanolamide (Cocamide DEA)',
    mainUse: 'Classical non-ionic foam booster and viscosity builder enhancing lather stability and lubricity in surfactant systems.',
    application: 'Shampoos, Hand Washes, Bubble Baths, Industrial Cleansers',
    dosage: '1–5%',
    keyBenefits: ['Viscosity build with electrolytes', 'Creamy long-lasting foam', 'Lubricating skin slip'],
    formulatorBenefits: ['High-efficiency thickener for standard SLES/SLS and anionic cleansing formulas'],
    verifiedInPdf: true,
    pdfPage: 23
  },
  {
    id: 'finamide-ld-12',
    slug: 'finamide-ld-12',
    name: 'Finamide LD 12',
    code: 'Finamide LD 12',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Functional Ingredients',
    inci: 'Lauric Diethanolamide (Lauramide DEA)',
    mainUse: 'High-purity lauric alkanolamide for concentrated foam stabilization and viscosity control in premium shampoos.',
    application: 'Shampoos, Facial Cleansers, Luxury Hand Washes',
    dosage: '1–5%',
    keyBenefits: ['Tight rich micro-foam structure', 'Temperature-stable viscosity builder', 'Excellent detergency'],
    formulatorBenefits: ['Provides sharper thickening response than mixed coconut fatty acid diethanolamides'],
    verifiedInPdf: true,
    pdfPage: 23
  },

  // 5.3 VBrass Plant Structuring & Conditioning Waxes
  {
    id: 'vbrass-butter',
    slug: 'vbrass-butter',
    name: 'VBrass Butter',
    code: 'VBrass Butter',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Emollient Esters',
    inci: 'Stearyl Erucate & Stearyl Behenate',
    mainUse: 'Vegetable-derived conditioning butter offering soft melting profile, cushiony barrier protection, and rich slip.',
    application: 'Lip Balms, Hair Pomades, Rich Body Creams, Conditioning Balms',
    dosage: '1–10%',
    keyBenefits: ['Skin-temperature melting curve', 'Substantive hair conditioning', 'Non-tacky protective film'],
    formulatorBenefits: ['Replaces synthetic petrolatum with a 100% plant-derived structuring butter'],
    verifiedInPdf: true,
    pdfPage: 23
  },
  {
    id: 'vbrass-crystalline-wax',
    slug: 'vbrass-crystalline-wax',
    name: 'VBrass Crystalline Wax',
    code: 'VBrass Crystalline Wax',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Functional Ingredients',
    inci: 'Stearyl Behenate',
    mainUse: 'High melting point plant ester wax delivering crystalline rigidity, structural strength, and thermal stability to stick formulations.',
    application: 'Lipsticks, Deodorant Sticks, Anhydrous Balms, Waterproof Mascaras',
    dosage: '1–15%',
    keyBenefits: ['High melting point (60–65°C)', 'Imparts stick hardness and snap resistance', 'Gloss enhancer'],
    formulatorBenefits: ['Stabilizes stick formulations against tropical slump and thermal sweating'],
    verifiedInPdf: true,
    pdfPage: 23
  },
  {
    id: 'vbrass-soft-wax',
    slug: 'vbrass-soft-wax',
    name: 'VBrass Soft Wax',
    code: 'VBrass Soft Wax',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Functional Ingredients',
    inci: 'Behenyl Erucate',
    mainUse: 'Flexible plant ester wax providing elasticity, creamy texture, and velvety pay-off in solid and semi-solid cosmetics.',
    application: 'Cream Eyeshadows, Soft Lip Balms, Conditioning Hair Waxes',
    dosage: '1–10%',
    keyBenefits: ['Pliable flexible film', 'Prevents stick brittleness and cracking', 'Soft cushiony application feel'],
    formulatorBenefits: ['Modulates hardness when blended with crystalline waxes to dial in ideal pay-off'],
    verifiedInPdf: true,
    pdfPage: 23
  },

  // 5.4 Finester Glyceryl & Emulsifying Grades
  {
    id: 'finester-1650',
    slug: 'finester-1650',
    name: 'Finester 1650',
    code: 'Finester 1650',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Functional Ingredients',
    inci: 'Glyceryl Monostearate & PEG-100 Stearate',
    mainUse: 'Global gold-standard acid-stable self-emulsifying base producing elegant, stable O/W creams and lotions.',
    application: 'Skin Care Creams, Body Lotions, Sunscreens, Foundations, Conditioners',
    dosage: '2–8%',
    keyBenefits: ['Forms brilliant white, glossy emulsions', 'Broad pH and electrolyte stability', 'Lamellar gel network creation'],
    formulatorBenefits: ['Extremely robust workhorse emulsifier forgiving of diverse formulation conditions and oil phases'],
    verifiedInPdf: true,
    pdfPage: 23
  },
  {
    id: 'finester-2240',
    slug: 'finester-2240',
    name: 'Finester 2240',
    code: 'Finester 2240',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Functional Ingredients',
    inci: 'Glyceryl Monostearate (GMS 40% Mono)',
    mainUse: 'Classical non-ionic lipophilic co-emulsifier, bodying agent, and stabilizer for cosmetic O/W emulsions.',
    application: 'Moisturizing Creams, Lotions, Hair Masks, Sunscreen Emulsions',
    dosage: '2–6%',
    keyBenefits: ['Viscosity builder and consistency modifier', 'Imparts body and opacity to creams', 'Natural vegetable feedstock'],
    formulatorBenefits: ['Increases emulsion viscosity and reduces phase separation risk during freeze-thaw cycles'],
    verifiedInPdf: true,
    pdfPage: 23
  },
  {
    id: 'finester-2840',
    slug: 'finester-2840',
    name: 'Finester 2840',
    code: 'Finester 2840',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Functional Ingredients',
    inci: 'Glyceryl Monostearate (High Purity)',
    mainUse: 'Refined high-purity mono-ester grade providing enhanced opacity, smooth skin feel, and emulsion stability.',
    application: 'Face Creams, Lotions, Eye Creams',
    dosage: '1–5%',
    keyBenefits: ['High monoester content for consistent crystal network', 'Clean white appearance', 'Non-greasy feel'],
    formulatorBenefits: ['Tight quality specification ensures batch-to-batch rheological consistency'],
    verifiedInPdf: true,
    pdfPage: 23
  },
  {
    id: 'finester-2860',
    slug: 'finester-2860',
    name: 'Finester 2860',
    code: 'Finester 2860',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Functional Ingredients',
    inci: 'Glyceryl Monostearate (Self-Emulsifying)',
    mainUse: 'Self-emulsifying glyceryl monostearate formulated with auxiliary soap for rapid single-component emulsification.',
    application: 'Vanishing Creams, Cold Creams, Hand Lotions',
    dosage: '2–6%',
    keyBenefits: ['Single-component emulsion base', 'Creates traditional matte vanishing cream texture', 'Smooth glide'],
    formulatorBenefits: ['Ideal for classical vanishing and massage creams requiring traditional matte dry-down'],
    verifiedInPdf: true,
    pdfPage: 23
  },
  {
    id: 'finester-2816',
    slug: 'finester-2816',
    name: 'Finester 2816',
    code: 'Finester 2816',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Functional Ingredients',
    inci: 'Glyceryl Monopalmitate',
    mainUse: 'Specialty conditioning ester and auxiliary stabilizer providing smooth structure and subtle pearlescence.',
    application: 'Creams, Conditioners, Pearlized Cleansers',
    dosage: '1–4%',
    keyBenefits: ['Silky conditioning after-feel', 'Assists lamellar network formation', 'Pearlizing booster'],
    formulatorBenefits: ['Helps balance crystallization kinetics in complex lipid systems'],
    verifiedInPdf: true,
    pdfPage: 23
  },
  {
    id: 'finester-2842',
    slug: 'finester-2842',
    name: 'Finester 2842',
    code: 'Finester 2842',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Functional Ingredients',
    inci: 'Glyceryl Distearate',
    mainUse: 'Lipophilic diester providing barrier consistency, structural firmness, and moisture retention in barrier formulations.',
    application: 'Protective Ointments, Rich Night Creams, Barrier Balms',
    dosage: '1–5%',
    keyBenefits: ['Forms occlusive protective film on skin', 'Builds creamy structure', 'Thermal stability'],
    formulatorBenefits: ['Adds firmness to anhydrous balms and heavy night creams without drag'],
    verifiedInPdf: true,
    pdfPage: 23
  },
  {
    id: 'finester-2880',
    slug: 'finester-2880',
    name: 'Finester 2880',
    code: 'Finester 2880',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Specialty Fluids',
    inci: 'Glyceryl Monooleate',
    mainUse: 'Liquid unsaturated mono-ester providing superior pigment wetting, W/O emulsification, and lipid-layer replenishment.',
    application: 'W/O Emulsions, Pigment Pastes, Baby Oils, Lip Care',
    dosage: '1–5%',
    keyBenefits: ['Liquid at room temperature', 'Superb pigment dispersion', 'Re-fattens stratum corneum lipids'],
    formulatorBenefits: ['Ideal wetting agent for inorganic iron oxides and titanium dioxide slurries'],
    verifiedInPdf: true,
    pdfPage: 23
  },
  {
    id: 'finester-2882',
    slug: 'finester-2882',
    name: 'Finester 2882',
    code: 'Finester 2882',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Specialty Fluids',
    inci: 'Glyceryl Monooleate (High Assay)',
    mainUse: 'High-assay distilled glyceryl monooleate for precision cosmetic dispersion and clear lipophilic systems.',
    application: 'Cosmetic Oils, Clear Ointments, Specialized Emulsions',
    dosage: '1–5%',
    keyBenefits: ['High active monoester concentration', 'Enhanced clarity and low color', 'Skin barrier compatibility'],
    formulatorBenefits: ['Precision grade where low color and high batch-to-batch repeatability are essential'],
    verifiedInPdf: true,
    pdfPage: 23
  },
  {
    id: 'finester-gms-40',
    slug: 'finester-gms-40',
    name: 'Finester GMS 40 (LG)',
    code: 'Finester GMS 40',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Functional Ingredients',
    inci: 'Glyceryl Monostearate (Low Glycerine)',
    mainUse: 'Standard cosmetic-grade GMS with low free glycerine, ideal for controlled emulsion thickening.',
    application: 'Body Lotions, Massage Creams, Hair Conditioners',
    dosage: '2–6%',
    keyBenefits: ['Economical consistency builder', 'High stability in oil phases', 'Neutral odor and color'],
    formulatorBenefits: ['Low free glycerine prevents unwanted tackiness in light lotions'],
    verifiedInPdf: true,
    pdfPage: 23
  },
  {
    id: 'finester-gms-4654v',
    slug: 'finester-gms-4654v',
    name: 'Finester GMS 4654V',
    code: 'Finester GMS 4654V',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Functional Ingredients',
    inci: 'Glyceryl Stearate (Vegetable Origin)',
    mainUse: '100% RSPO/vegetable derived glyceryl stearate compliant with clean-label cosmetics requirements.',
    application: 'Clean Beauty Creams, Natural Skin Care, Eco-certified Lotions',
    dosage: '2–6%',
    keyBenefits: ['100% vegetable origin certified', 'Sustainable palm/vegetable feedstock', 'Classic creamy touch'],
    formulatorBenefits: ['Drop-in natural replacement for standard synthetic glyceryl stearates'],
    verifiedInPdf: true,
    pdfPage: 23
  },
  {
    id: 'finester-mg-9000',
    slug: 'finester-mg-9000',
    name: 'Finester MG 9000/9500',
    code: 'Finester MG 9000/9500',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Functional Ingredients',
    inci: 'Distilled Monoglycerides (≥90% Mono)',
    mainUse: 'Ultra-pure molecularly distilled monoglyceride flaked wax providing crystal control and lamellar structuring.',
    application: 'High-end Creams, Pharmaceutical Topicals, Anhydrous Waxes',
    dosage: '1–4%',
    keyBenefits: ['≥90% monoester purity', 'Exceptional starch and lipid complexing', 'Prevents syneresis in gels'],
    formulatorBenefits: ['Molecular distillation removes diglycerides and triglycerides for unmatched batch stability'],
    verifiedInPdf: true,
    pdfPage: 23
  },

  // 5.5 Finester Sorbitan Esters (Broad HLB Coverage)
  {
    id: 'finester-2000',
    slug: 'finester-2000',
    name: 'Finester 2000',
    code: 'Finester 2000',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Functional Ingredients',
    inci: 'Sorbitan Monolaurate (Span 20)',
    mainUse: 'Hydrophilic-lipophilic balanced sorbitan ester used as auxiliary emulsifier and solubilizer in cosmetic systems.',
    application: 'Lotions, Cleansing Milks, Solubilized Sprays',
    dosage: '0.5–5%',
    keyBenefits: ['HLB ~8.6 versatility', 'Mild surfactant auxiliary', 'Biodegradable vegetable source'],
    formulatorBenefits: ['Pairs with Polysorbate 20 for custom HLB emulsion tailoring'],
    verifiedInPdf: true,
    pdfPage: 23
  },
  {
    id: 'finester-4000',
    slug: 'finester-4000',
    name: 'Finester 4000',
    code: 'Finester 4000',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Functional Ingredients',
    inci: 'Sorbitan Monopalmitate (Span 40)',
    mainUse: 'Lipophilic sorbitan ester wax (HLB ~6.7) providing auxiliary emulsification and consistency to creams.',
    application: 'Creams, Body Balms, Antiperspirant Roll-ons',
    dosage: '0.5–5%',
    keyBenefits: ['Improves emulsion viscosity', 'High thermal stability', 'Non-irritating'],
    formulatorBenefits: ['Blends cleanly with Polysorbate 40 to stabilize thick O/W lotions'],
    verifiedInPdf: true,
    pdfPage: 23
  },
  {
    id: 'finester-6000',
    slug: 'finester-6000',
    name: 'Finester 6000',
    code: 'Finester 6000',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Functional Ingredients',
    inci: 'Sorbitan Monostearate (Span 60)',
    mainUse: 'Classic low HLB (4.7) solid sorbitan ester workhorse for W/O emulsions and O/W co-emulsification.',
    application: 'Cold Creams, Sunscreens, Moisturizing Lotions, Color Cosmetics',
    dosage: '1–6%',
    keyBenefits: ['Solid waxy flakes for easy handling', 'Forms robust lamellar crystal barriers', 'Proven safety'],
    formulatorBenefits: ['Industry standard partner to Polysorbate 60 for rich, long-shelf-life creams'],
    verifiedInPdf: true,
    pdfPage: 23
  },
  {
    id: 'finester-6030',
    slug: 'finester-6030',
    name: 'Finester 6030',
    code: 'Finester 6030',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Functional Ingredients',
    inci: 'Sorbitan Tristearate (Span 65)',
    mainUse: 'Hydrophobic high-melting sorbitan tri-ester (HLB ~2.1) preventing wax crystallization and bloom in cosmetics.',
    application: 'Lipsticks, Anhydrous Balms, Solid Sticks, Mascaras',
    dosage: '0.5–4%',
    keyBenefits: ['Inhibits lipid polymorphism and fat blooming', 'Increases gloss and surface shine', 'Hydrophobic'],
    formulatorBenefits: ['Essential additive in lipsticks to prevent white crystalline blooming during hot-climate storage'],
    verifiedInPdf: true,
    pdfPage: 23
  },
  {
    id: 'finester-6080',
    slug: 'finester-6080',
    name: 'Finester 6080',
    code: 'Finester 6080',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Specialty Fluids',
    inci: 'Sorbitan Monooleate (Span 80)',
    mainUse: 'Liquid lipophilic surfactant (HLB ~4.3) delivering exceptional pigment wetting, dispersing, and W/O emulsification.',
    application: 'Foundation Makeup, Mineral Sunscreens, Baby Lotions, Lip Gloss',
    dosage: '1–5%',
    keyBenefits: ['Superior pigment wetting power', 'Liquid form for cold-process W/O emulsions', 'Smooth spreadability'],
    formulatorBenefits: ['Reduces pigment grinding time in foundations and heavy mineral SPF concentrates'],
    verifiedInPdf: true,
    pdfPage: 23
  },
  {
    id: 'finester-6085',
    slug: 'finester-6085',
    name: 'Finester 6085',
    code: 'Finester 6085',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Specialty Fluids',
    inci: 'Sorbitan Trioleate (Span 85)',
    mainUse: 'Highly lipophilic liquid ester (HLB ~1.8) acting as a specialized wetting agent and water-repellent emollient.',
    application: 'Water-Resistant Sunscreens, Waterproof Makeup, Aerosol Dispersions',
    dosage: '1–5%',
    keyBenefits: ['High water repellency', 'Aerosol valve friendly', 'Excellent solubilization in hydrocarbons'],
    formulatorBenefits: ['Ideal for water-resistant and sweat-proof sport sun lotions and setting sprays'],
    verifiedInPdf: true,
    pdfPage: 23
  },

  // 5.6 Finester Specialty Esters & Sensory Emollients
  {
    id: 'finester-bs-4018',
    slug: 'finester-bs-4018',
    name: 'Finester BS 4018',
    code: 'Finester BS 4018',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Emollient Esters',
    inci: 'Butyl Stearate',
    mainUse: 'Low-viscosity, fast-spreading emollient ester providing dry non-greasy cushion and pigment solvency.',
    application: 'Nail Polish, Lipsticks, Pressed Powders, Dry Skin Oils',
    dosage: '1–10%',
    keyBenefits: ['Fast spreading profile', 'Plasticizer in nail varnishes', 'Improves pigment pay-off in makeup'],
    formulatorBenefits: ['Provides immediate lubricity and gloss without greasy residue'],
    verifiedInPdf: true,
    pdfPage: 23
  },
  {
    id: 'finester-cc-8010',
    slug: 'finester-cc-8010',
    name: 'Finester CC 8010',
    code: 'Finester CC 8010',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Emollient Esters',
    inci: 'Caprylic/Capric Triglyceride (MCT)',
    mainUse: 'Pure vegetable-derived medium chain triglyceride serving as the universal gold-standard cosmetic carrier oil.',
    application: 'Skin Serums, Creams, Lotions, Baby Care, Hair Oils, Lip Care, Fragrance Dilutions',
    dosage: '2–25%',
    keyBenefits: ['Completely non-comedogenic', 'Indefinite oxidative stability (never goes rancid)', 'Dry, elegant skin feel'],
    formulatorBenefits: ['Universal solvent for botanical lipophilic actives, vitamins, and perfume compounds'],
    verifiedInPdf: true,
    pdfPage: 23
  },
  {
    id: 'finester-cp-1416',
    slug: 'finester-cp-1416',
    name: 'Finester CP 1416',
    code: 'Finester CP 1416',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Functional Ingredients',
    inci: 'Cetyl Palmitate',
    mainUse: 'Plant-derived synthetic spermaceti wax delivering velvety dry skin cushioning, barrier building, and opacity.',
    application: 'Cold Creams, Barrier Ointments, Hair Masks, Solid Sticks',
    dosage: '1–8%',
    keyBenefits: ['Replicates luxury spermaceti wax touch', 'Imparts dry non-tacky body', 'Enhances emulsion stability'],
    formulatorBenefits: ['Increases melting point and structure in lipsticks without dragging on application'],
    verifiedInPdf: true,
    pdfPage: 23
  },
  {
    id: 'finester-cs-1418',
    slug: 'finester-cs-1418',
    name: 'Finester CS 1418',
    code: 'Finester CS 1418',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Functional Ingredients',
    inci: 'Cetearyl Stearate',
    mainUse: 'High molecular weight wax ester providing rich protective emolliency and film formation for dry skin.',
    application: 'Winter Creams, Intensive Heel & Hand Balms, Lip Balms',
    dosage: '1–8%',
    keyBenefits: ['Rich barrier shielding against harsh cold weather', 'Reduces TEWL', 'Velvety dry-down'],
    formulatorBenefits: ['Excellent bodying agent for restorative barrier creams'],
    verifiedInPdf: true,
    pdfPage: 23
  },
  {
    id: 'finester-ep-6016',
    slug: 'finester-ep-6016',
    name: 'Finester EP 6016',
    code: 'Finester EP 6016',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Emollient Esters',
    inci: 'Ethylhexyl Palmitate (Octyl Palmitate)',
    mainUse: 'Silky, dry-touch emollient ester serving as a direct non-greasy replacement for mineral oil in cosmetic formulations.',
    application: 'Daily Face Creams, Foundations, Cleansing Oils, Sunscreens, Body Lotions',
    dosage: '2–15%',
    keyBenefits: ['Light, silky after-feel', 'Excellent mineral oil replacement', 'Superior pigment wetting power'],
    formulatorBenefits: ['Clean slip and fast spreading without leaving a heavy film on the skin'],
    verifiedInPdf: true,
    pdfPage: 23
  },
  {
    id: 'finester-ep-6018',
    slug: 'finester-ep-6018',
    name: 'Finester EP 6018',
    code: 'Finester EP 6018',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Emollient Esters',
    inci: 'Ethylhexyl Stearate (Octyl Stearate)',
    mainUse: 'Medium-spreading sensory emollient ester delivering prolonged glide, lubricity, and soft cushion.',
    application: 'Massage Lotions, Body Butters, Night Creams, Sunscreen Milks',
    dosage: '2–15%',
    keyBenefits: ['Smooth, velvety play-time during application', 'Good spreadability', 'Prevents dry skin tightness'],
    formulatorBenefits: ['Provides balanced playtime before absorbing into a soft, velvety finish'],
    verifiedInPdf: true,
    pdfPage: 23
  },
  {
    id: 'finester-lans',
    slug: 'finester-lans',
    name: 'Finester LANS',
    code: 'Finester LANS',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Emollient Esters',
    inci: 'Specialty Lanolin Substitute (Vegetable Ester Complex)',
    mainUse: '100% plant-derived alternative to animal lanolin offering superior water absorption, gloss, and adhesion.',
    application: 'Lipsticks, Lip Gloss, Nipple Creams, Intensive Healing Balms',
    dosage: '1–15%',
    keyBenefits: ['Cruelty-free 100% plant alternative to lanolin', 'Absorbs up to 200% water', 'High gloss and adhesion'],
    formulatorBenefits: ['Provides all the substantive barrier properties of lanolin without odor, animal origin, or allergenicity'],
    verifiedInPdf: true,
    pdfPage: 23
  },
  {
    id: 'finester-oo-1880',
    slug: 'finester-oo-1880',
    name: 'Finester OO 1880',
    code: 'Finester OO 1880',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Specialty Fluids',
    inci: 'Oleyl Oleate',
    mainUse: 'Liquid wax ester mirroring human sebum chemistry to deliver intense nourishing emolliency for dry and mature skin.',
    application: 'Luxury Face Oils, Anti-Aging Creams, Conditioning Hair Oils',
    dosage: '1–10%',
    keyBenefits: ['Mimics human skin sebum lipids', 'Deep barrier restoration', 'Imparts natural radiant glow'],
    formulatorBenefits: ['Liquid ester with low freeze point that enhances skin suppleness and elasticity'],
    verifiedInPdf: true,
    pdfPage: 23
  },
  {
    id: 'finester-ss',
    slug: 'finester-ss',
    name: 'Finester SS',
    code: 'Finester SS',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Functional Ingredients',
    inci: 'Stearyl Stearate',
    mainUse: 'High-purity wax ester providing clean melting at body temperature and firm structure in sticks.',
    application: 'Lipsticks, Foundation Sticks, Conditioning Balms',
    dosage: '1–10%',
    keyBenefits: ['Melts smoothly at body contact', 'Enhances stick hardness', 'Adds glossy pay-off'],
    formulatorBenefits: ['Prevents softening and distortion of solid stick cosmetics under warm storage'],
    verifiedInPdf: true,
    pdfPage: 23
  },
  {
    id: 'finester-ts-3018',
    slug: 'finester-ts-3018',
    name: 'Finester TS 3018',
    code: 'Finester TS 3018',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Emollient Esters',
    inci: 'Tridecyl Stearate',
    mainUse: 'Specialty branched emollient ester providing luxurious cushioning, long-lasting slip, and shine in cosmetics.',
    application: 'Lip Gloss, Cream Foundations, Water-Resistant Makeup, Rich Serums',
    dosage: '1–10%',
    keyBenefits: ['Cushiony velvet texture', 'Exceptional pigment wetting and gloss', 'Non-drying barrier'],
    formulatorBenefits: ['Provides rich, luxurious cushion without the greasiness of heavy oils'],
    verifiedInPdf: true,
    pdfPage: 23
  },

  // 5.7 Finester Functional, Glycol & Co-Emulsifying Grades
  {
    id: 'finester-1009',
    slug: 'finester-1009',
    name: 'Finester 1009',
    code: 'Finester 1009',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Functional Ingredients',
    inci: 'Sodium Lauroyl Lactylate',
    mainUse: 'Naturally derived acyl lactylate functioning as an antimicrobial booster, co-emulsifier, and skin moisturizer.',
    application: 'Moisturizers, Cleansers, Deodorants, Anti-Dandruff Treatments',
    dosage: '0.5–3%',
    keyBenefits: ['Strengthens stratum corneum barrier', 'Natural antimicrobial synergist', 'Mild surfactant aid'],
    formulatorBenefits: ['Improves sensory feel and provides natural preservation assistance in clean formulations'],
    verifiedInPdf: true,
    pdfPage: 23
  },
  {
    id: 'finester-sl',
    slug: 'finester-sl',
    name: 'Finester SL',
    code: 'Finester SL',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Functional Ingredients',
    inci: 'Sodium Stearoyl Lactylate',
    mainUse: 'Natural anionic co-emulsifier delivering exceptional lamellar liquid crystalline structures and rich moisture.',
    application: 'High-end Creams, Lotions, Whipped Body Butters, Hair Conditioners',
    dosage: '1–5%',
    keyBenefits: ['Forms biomimetic lamellar gel networks', 'Exceptional moisturizing substantivity', 'Natural food-grade origin'],
    formulatorBenefits: ['Provides a distinctively soft, luxurious after-feel and strengthens barrier hydration'],
    verifiedInPdf: true,
    pdfPage: 23
  },
  {
    id: 'finester-7000',
    slug: 'finester-7000',
    name: 'Finester 7000',
    code: 'Finester 7000',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Functional Ingredients',
    inci: 'Propylene Glycol Monostearate (PGMS)',
    mainUse: 'Lipophilic auxiliary emulsifier and consistency agent improving spreadability and texture in lotions.',
    application: 'Skin Lotions, Barrier Creams, Makeup Foundations',
    dosage: '1–5%',
    keyBenefits: ['Smooth spreadability', 'Aids stability of W/O and O/W systems', 'Reduces emulsion greasiness'],
    formulatorBenefits: ['Effective co-emulsifier to fine-tune melting texture on application'],
    verifiedInPdf: true,
    pdfPage: 23
  },
  {
    id: 'finester-2112',
    slug: 'finester-2112',
    name: 'Finester 2112',
    code: 'Finester 2112',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Functional Ingredients',
    inci: 'PEG-200 Monolaurate',
    mainUse: 'Non-ionic hydrophilic co-emulsifier and wetting agent aiding active ingredient dispersion.',
    application: 'Cleansing Milks, Bath Oils, Sprayable Emulsions',
    dosage: '0.5–3%',
    keyBenefits: ['Good dispersion efficiency', 'Mild non-ionic profile', 'Low viscosity fluid'],
    formulatorBenefits: ['Assists in balancing HLB for light sprayable lotion emulsions'],
    verifiedInPdf: true,
    pdfPage: 23
  },
  {
    id: 'finester-4112',
    slug: 'finester-4112',
    name: 'Finester 4112',
    code: 'Finester 4112',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Functional Ingredients',
    inci: 'PEG-400 Monolaurate',
    mainUse: 'Hydrophilic non-ionic emulsifier and solubilizer for delicate cosmetic and bath formulations.',
    application: 'Bath Oils, Wetting Systems, Spray Lotions',
    dosage: '0.5–4%',
    keyBenefits: ['Water-dispersible emulsifier', 'Aids fragrance oil solubility', 'Gentle on skin'],
    formulatorBenefits: ['Provides clean emulsification in blooming bath oils and light spray milks'],
    verifiedInPdf: true,
    pdfPage: 23
  },
  {
    id: 'finester-4180',
    slug: 'finester-4180',
    name: 'Finester 4180',
    code: 'Finester 4180',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Specialty Fluids',
    inci: 'PEG-400 Monooleate',
    mainUse: 'Liquid non-ionic emulsifier and spreading agent with high lubricating power for skincare and hair products.',
    application: 'Hair Oils, Cleansing Lotions, Body Oils',
    dosage: '1–5%',
    keyBenefits: ['Smooth lubricity', 'Excellent spreading on skin and hair', 'Cold water dispersible'],
    formulatorBenefits: ['Improves rinse-off characteristics in oil-based makeup removers'],
    verifiedInPdf: true,
    pdfPage: 23
  },
  {
    id: 'finester-6218',
    slug: 'finester-6218',
    name: 'Finester 6218',
    code: 'Finester 6218',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Functional Ingredients',
    inci: 'PEG-400 Monostearate',
    mainUse: 'Solid non-ionic emulsifier providing body, thickening, and stability in creams and hair conditioners.',
    application: 'Creams, Conditioners, Hair Styling Products',
    dosage: '1–5%',
    keyBenefits: ['Emulsion stabilizer', 'Adds soft creamy viscosity', 'Electrolyte compatible'],
    formulatorBenefits: ['Reliable auxiliary emulsifier for high-viscosity conditioning bases'],
    verifiedInPdf: true,
    pdfPage: 23
  },
  {
    id: 'finester-dg-2012',
    slug: 'finester-dg-2012',
    name: 'Finester DG 2012',
    code: 'Finester DG 2012',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Functional Ingredients',
    inci: 'Diglycol Laurate (Diethylene Glycol Monolaurate)',
    mainUse: 'Specialty co-emulsifier, lubricant, and spreading modifier for lotions and anhydrous systems.',
    application: 'Lotions, Creams, Anhydrous Ointments',
    dosage: '1–5%',
    keyBenefits: ['Good solvency', 'Improves emulsion spread', 'Mild emolliency'],
    formulatorBenefits: ['Auxiliary solubilizer and plasticizer for cosmetic formulations'],
    verifiedInPdf: true,
    pdfPage: 23
  },
  {
    id: 'finester-dg-2018',
    slug: 'finester-dg-2018',
    name: 'Finester DG 2018',
    code: 'Finester DG 2018',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Functional Ingredients',
    inci: 'Diglycol Stearate (Diethylene Glycol Stearate)',
    mainUse: 'Pearlizing agent and consistency modifier imparting an attractive opalescent sheen to cleansers and creams.',
    application: 'Pearlized Shampoos, Liquid Soaps, Facial Cleansers, Hand Washes',
    dosage: '1–5%',
    keyBenefits: ['Brilliant opalescent luster', 'Viscosity building in surfactant systems', 'Smooth conditioning touch'],
    formulatorBenefits: ['Generates consistent, stable pearlizing crystals that remain suspended over shelf life'],
    verifiedInPdf: true,
    pdfPage: 23
  },
  {
    id: 'finester-eg-1018',
    slug: 'finester-eg-1018',
    name: 'Finester EG 1018',
    code: 'Finester EG 1018',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Functional Ingredients',
    inci: 'Ethylene Glycol Monostearate (EGMS)',
    mainUse: 'Classic high-sheen pearlizing agent producing dense, silky, reflective luster in shampoos and body washes.',
    application: 'Pearlized Shampoos, Body Washes, Facial Washes, Liquid Soaps',
    dosage: '1–4%',
    keyBenefits: ['Dense, brilliant silver-pearl luster', 'Enhances product opacity and luxury visual appeal', 'Creamy foam texture'],
    formulatorBenefits: ['Hot-process pearlizer that crystallizes upon controlled cooling for uniform iridescence'],
    verifiedInPdf: true,
    pdfPage: 23
  },
  {
    id: 'finester-eg-1020',
    slug: 'finester-eg-1020',
    name: 'Finester EG 1020',
    code: 'Finester EG 1020',
    supplierId: 'fine-organics',
    subSupplier: 'Fine Organics',
    category: 'Functional Ingredients',
    inci: 'Ethylene Glycol Distearate (EGDS)',
    mainUse: 'Premier pearlizing and opacifying agent producing intense, long-lasting pearlescent radiance and rich body in surfactant formulations.',
    application: 'Shampoos, Body Washes, Hand Soaps, Shower Foams',
    dosage: '1–4%',
    keyBenefits: ['Maximum reflective pearlescence', 'Effective opacifying agent', 'Builds rich lather feel'],
    formulatorBenefits: ['Higher melting point and crystallization yield than EGMS, providing superior long-term shelf stability'],
    verifiedInPdf: true,
    pdfPage: 23
  }
];



export const HISTORICAL_GREENTECH_PRODUCTS: ProductItem[] = [
  {
    "id": "murumuru-butter",
    "slug": "murumuru-butter",
    "name": "MURUMURU BUTTER",
    "code": "GT-MURUMURU_B",
    "supplierId": "greentech",
    "category": "Plant Butters",
    "inci": "Astrocaryum Murumuru Seed Butter",
    "mainUse": "Solid plant butter rich in lauric and myristic fatty acids providing profound cuticle repair and curl definition.",
    "application": "Hair Care, Curly & Frizzy Hair Nutrition, Deep Conditioning Hair Masks, Rich Body Balms",
    "dosage": "1–10% in hair conditioning; up to 100% in anhydrous balms",
    "keyBenefits": [
      "Significant improvement in curly/frizzy hair combability and strand lubrication",
      "Restores intercellular lipid cement of damaged hair cuticles"
    ],
    "formulatorBenefits": [
      "Incorporates directly into the lipid cement of hair cuticles, restoring low-friction slip, sealing split ends, and controlling high-humidity frizz."
    ],
    "suggestions": "Ethically sourced from Wild-harvested seeds from the Amazon basin rainforest. Verified in Greentech Technical Dossier.",
    "verifiedInPdf": true,
    "pdfPage": 25,
    "catalogOrigin": "Historical Greentech Dossier",
    "physicalForm": "Solid butter (melting point ~33°C)",
    "solubility": "Lipophilic / Oil-soluble",
    "sourceDoc": "Plaquette Vegetable Oils Greentech 2022-PRINT.pdf p.25",
    "botanicalSource": "Astrocaryum murumuru"
  },
  {
    "id": "biotilys",
    "slug": "biotilys",
    "name": "BIOTILYS®",
    "code": "GT-BIOTILYS",
    "supplierId": "greentech",
    "category": "Bio-Active Specialties",
    "inci": "Lactobacillus Ferment Lysate",
    "mainUse": "Skin barrier defensive postbiotic active optimizing cutaneous immune response and stratum corneum hydration.",
    "application": "Barrier Repair Creams, Microbiome Skincare, Defensive Moisturizers",
    "dosage": "1–2%",
    "keyBenefits": [
      "Accelerates stratum corneum recovery and boosts antimicrobial peptides",
      "Reduces TEWL and restores hydration in stressed skin within 14 days"
    ],
    "formulatorBenefits": [
      "Stimulates human beta-defensin-2 (hBD-2), promotes tight junction claudin-1 synthesis, and maintains optimum stratum corneum lipid organization."
    ],
    "suggestions": "Ethically sourced from Biotechnological culture and gentle thermal lysis of Lactobacillus pentosus. Verified in Greentech Technical Dossier.",
    "verifiedInPdf": true,
    "pdfPage": 8,
    "catalogOrigin": "Historical Greentech Dossier",
    "physicalForm": "Liquid",
    "solubility": "Water-soluble",
    "sourceDoc": "Catalogue India_compressed.pdf p.8",
    "botanicalSource": "Lactobacillus pentosus ferment lysate"
  },
  {
    "id": "liftiss",
    "slug": "liftiss",
    "name": "LIFTISS®",
    "code": "GT-LIFTISS",
    "supplierId": "greentech",
    "category": "Bio-Active Specialties",
    "inci": "Water, Adansonia Digitata Fruit Extract",
    "mainUse": "Instant smoothing and mechanical tensor effect reducing expression wrinkles within 5 minutes.",
    "application": "Instant Tensor Serums, Flash Smoothing Ampoules, Pre-Makeup Primers, Express Lifting Creams",
    "dosage": "1–5%",
    "keyBenefits": [
      "Instant visual smoothing of expression wrinkles within 5 minutes",
      "Immediate mechanical tensor effect confirmed by 85% of panelists"
    ],
    "formulatorBenefits": [
      "Forms a cohesive 3D biopolymer film on skin surface that exerts mechanical retraction upon drying while retaining surface water."
    ],
    "suggestions": "Ethically sourced from Adansonia digitata (Baobab) fruit pulp from Senegal. Verified in Greentech Technical Dossier.",
    "verifiedInPdf": true,
    "pdfPage": 14,
    "catalogOrigin": "Historical Greentech Dossier",
    "physicalForm": "Liquid",
    "solubility": "Water-soluble",
    "sourceDoc": "Catalogue India_compressed.pdf p.14",
    "botanicalSource": "Adansonia digitata"
  },
  {
    "id": "cosmelene-hawthorn",
    "slug": "cosmelene-hawthorn",
    "name": "COSMELENE® HAWTHORN",
    "code": "GT-COSMELENE_",
    "supplierId": "greentech",
    "category": "Botanical Extracts",
    "inci": "Water, Butylene Glycol, Crataegus Monogyna Flower Extract",
    "mainUse": "Flavonoid-rich Crataegus extract improving vascular tone and calming facial flushing.",
    "application": "Couperose & Redness, Microcirculation Toners, Sensitive Skin Serums",
    "dosage": "1–5%",
    "keyBenefits": [
      "Strengthens vascular tone and calms facial couperose redness"
    ],
    "formulatorBenefits": [
      "Strengthens microvascular walls, reduces capillary permeability, and prevents redness and edema."
    ],
    "suggestions": "Ethically sourced from Crataegus monogyna (Hawthorn) flowering tops. Verified in Greentech Technical Dossier.",
    "verifiedInPdf": true,
    "pdfPage": 18,
    "catalogOrigin": "Historical Greentech Dossier",
    "physicalForm": "Liquid",
    "solubility": "Water-soluble",
    "sourceDoc": "Catalogue India_compressed.pdf p.18",
    "botanicalSource": "Crataegus monogyna"
  },
  {
    "id": "hair-lustre-karkade",
    "slug": "hair-lustre-karkade",
    "name": "HAIR LUSTRE KARKADE",
    "code": "GT-HAIR_LUSTR",
    "supplierId": "greentech",
    "category": "Bio-Active Specialties",
    "inci": "Water, Butylene Glycol, Hibiscus Sabdariffa Flower Extract",
    "mainUse": "Natural hibiscus flower acid active smoothing hair scales and delivering radiant gloss and softness.",
    "application": "Gloss Shampoos, Shine Hair Mists, Lustre Conditioners, Color Illuminating Sprays",
    "dosage": "1–5%",
    "keyBenefits": [
      "Smooths cuticle scales and magnifies hair shine and light reflection"
    ],
    "formulatorBenefits": [
      "Lowers cuticle surface pH, tightly closing overlapping keratin scales, and dramatically enhances specular light reflection."
    ],
    "suggestions": "Ethically sourced from Hibiscus sabdariffa chalices. Verified in Greentech Technical Dossier.",
    "verifiedInPdf": true,
    "pdfPage": 24,
    "catalogOrigin": "Historical Greentech Dossier",
    "physicalForm": "Liquid",
    "solubility": "Water-soluble",
    "sourceDoc": "Catalogue India_compressed.pdf p.24",
    "botanicalSource": "Hibiscus sabdariffa"
  },
  {
    "id": "hair-strength-egx-292",
    "slug": "hair-strength-egx-292",
    "name": "HAIR STRENGTH COMPLEX EGX 292",
    "code": "GT-HAIR_STREN",
    "supplierId": "greentech",
    "category": "Bio-Active Specialties",
    "inci": "Water, Butylene Glycol, Botanical Multi-Extract Complex (refer to TDS)",
    "mainUse": "Synergistic botanical complex regulating oily scalp sebum and strengthening weak hair roots.",
    "application": "Purifying Scalp Shampoos, Oily Scalp Tonics, Hair Follicle Fortifiers",
    "dosage": "1–5%",
    "keyBenefits": [
      "Decongests hair follicles and purifies oily scalp"
    ],
    "formulatorBenefits": [
      "Inhibits follicular 5α-reductase, decongests sebum plugs, and stimulates micro-capillary nutrient flow."
    ],
    "suggestions": "Ethically sourced from Multi-botanical synergy of Burdock, Watercress, Ivy, Rosemary, Arnica, and Pine. Verified in Greentech Technical Dossier.",
    "verifiedInPdf": true,
    "pdfPage": 25,
    "catalogOrigin": "Historical Greentech Dossier",
    "physicalForm": "Liquid",
    "solubility": "Water-soluble",
    "sourceDoc": "Catalogue India_compressed.pdf p.25",
    "botanicalSource": "Arctium lappa, Nasturtium officinale, Hedera helix, Rosmarinus officinalis"
  },
  {
    "id": "zoryalys",
    "slug": "zoryalys",
    "name": "ZORYALYS®",
    "code": "GT-ZORYALYS",
    "supplierId": "greentech",
    "category": "Bio-Active Specialties",
    "inci": "Water, Propanediol, Botanical Protection Complex (refer to TDS)",
    "mainUse": "Shield against UV, pollution, and color fading, preserving keratin structure and color brilliance.",
    "application": "Colour Protection Shampoos, Anti-Pollution Hair Sprays, UV Shield Hair Serums",
    "dosage": "0.5–2%",
    "keyBenefits": [
      "Preserves hair color brilliance against UV radiation and wash fading",
      "Reduces adhesion of airborne pollution micro-particles to hair strands"
    ],
    "formulatorBenefits": [
      "Quenches UV-induced singlet oxygen, blocks carbon particles from adhering to the hair cuticle, and prevents keratin protein carbonylation."
    ],
    "suggestions": "Ethically sourced from Synergy of Pracaxi oil, Ginger root, and Magnolia bark extracts. Verified in Greentech Technical Dossier.",
    "verifiedInPdf": true,
    "pdfPage": 27,
    "catalogOrigin": "Historical Greentech Dossier",
    "physicalForm": "Liquid",
    "solubility": "Water/lipo dispersible depending on variant",
    "sourceDoc": "Catalogue India_compressed.pdf p.27",
    "botanicalSource": "Pentaclethra macroloba, Zingiber officinale, Magnolia grandiflora"
  },
  {
    "id": "lipactive-inca-inchi",
    "slug": "lipactive-inca-inchi",
    "name": "LIPACTIVE INCA INCHI®",
    "code": "GT-LIPACTIVE_",
    "supplierId": "greentech",
    "category": "Lipophilic Bio-Actives",
    "inci": "Plukenetia Volubilis Seed Oil",
    "mainUse": "Extraordinary virgin plant oil boasting the highest known botanical concentration of Omega-3 (>45%).",
    "application": "Dry Hair Repair Oils, Sensitized Scalp Serums, Intensive Conditioning Masks",
    "dosage": "1–5%",
    "keyBenefits": [
      "Restores the cuticle 18-MEA lipid layer on damaged, chemically treated hair"
    ],
    "formulatorBenefits": [
      "Replenishes 18-MEA cuticle lipid layer and seals broken disulfide lipid junctions in bleached hair."
    ],
    "suggestions": "Ethically sourced from Plukenetia volubilis (Inca Inchi) seeds wild-harvested in Peru. Verified in Greentech Technical Dossier.",
    "verifiedInPdf": true,
    "pdfPage": 8,
    "catalogOrigin": "Historical Greentech Dossier",
    "physicalForm": "Liquid oil",
    "solubility": "Lipophilic / Oil-soluble",
    "sourceDoc": "Plaquette Hair Care 2021_V02-PRINT.pdf p.8",
    "botanicalSource": "Plukenetia volubilis"
  },
  {
    "id": "lipactive-baobab",
    "slug": "lipactive-baobab",
    "name": "LIPACTIVE BAOBAB",
    "code": "GT-LIPACTIVE_",
    "supplierId": "greentech",
    "category": "Lipophilic Bio-Actives",
    "inci": "Adansonia Digitata Seed Oil",
    "mainUse": "Nutrient-rich baobab oil rich in palmitic, oleic, and linoleic acids restoring hair flexibility and shine.",
    "application": "Hair Nutrition, Dry Scalp Treatments, Nail Strengthening Oils",
    "dosage": "1–5%",
    "keyBenefits": [
      "Increases hair strand elasticity and reduces combing breakage"
    ],
    "formulatorBenefits": [
      "Penetrates hair fiber and seals lipid envelope around keratin strands."
    ],
    "suggestions": "Ethically sourced from Adansonia digitata seeds from Senegal. Verified in Greentech Technical Dossier.",
    "verifiedInPdf": true,
    "pdfPage": 9,
    "catalogOrigin": "Historical Greentech Dossier",
    "physicalForm": "Liquid oil",
    "solubility": "Oil-soluble",
    "sourceDoc": "Plaquette Hair Care 2021_V02-PRINT.pdf p.9",
    "botanicalSource": "Adansonia digitata"
  },
  {
    "id": "lipactive-apricot",
    "slug": "lipactive-apricot",
    "name": "LIPACTIVE APRICOT",
    "code": "GT-LIPACTIVE_",
    "supplierId": "greentech",
    "category": "Lipophilic Bio-Actives",
    "inci": "Prunus Armeniaca (Apricot) Kernel Oil",
    "mainUse": "Oleic-rich apricot kernel lipactive imparting silky glide, softness, and radiant sheen to hair.",
    "application": "Hair Softness, Illuminating Hair Oils, Sensory Shampoos",
    "dosage": "1–5%",
    "keyBenefits": [
      "Imparts lightweight silky slip and hair softness without heaviness"
    ],
    "formulatorBenefits": [
      "Lubricates hair shaft, reduces inter-fiber friction, and enhances specular reflection."
    ],
    "suggestions": "Ethically sourced from Prunus armeniaca kernels. Verified in Greentech Technical Dossier.",
    "verifiedInPdf": true,
    "pdfPage": 10,
    "catalogOrigin": "Historical Greentech Dossier",
    "physicalForm": "Liquid oil",
    "solubility": "Oil-soluble",
    "sourceDoc": "Plaquette Hair Care 2021_V02-PRINT.pdf p.10",
    "botanicalSource": "Prunus armeniaca"
  },
  {
    "id": "glialys-21",
    "slug": "glialys-21",
    "name": "GLIALYS 21",
    "code": "GT-GLIALYS_21",
    "supplierId": "greentech",
    "category": "Bio-Active Specialties",
    "inci": "Water, Hydrolyzed Wheat Gluten",
    "mainUse": "Hydrolyzed wheat gluten protein complex repairing hair cuticles and boosting tensile resistance.",
    "application": "Cuticle Bonding Masks, Leave-In Hair Repair Milks, Anti-Breakage Conditioners",
    "dosage": "1–5%",
    "keyBenefits": [
      "Bonds damaged hair cuticles and restores mechanical strength"
    ],
    "formulatorBenefits": [
      "Penetrates damaged hair cuticles and forms cystine-like crosslinks that bond lifted scales back to the hair cortex."
    ],
    "suggestions": "Ethically sourced from Triticum aestivum (Wheat) gluten. Verified in Greentech Technical Dossier.",
    "verifiedInPdf": true,
    "pdfPage": 12,
    "catalogOrigin": "Historical Greentech Dossier",
    "physicalForm": "Liquid",
    "solubility": "Water-soluble",
    "sourceDoc": "Plaquette Hair Care 2021_V02-PRINT.pdf p.12",
    "botanicalSource": "Triticum aestivum"
  },
  {
    "id": "hydrolyzed-pea-proteins",
    "slug": "hydrolyzed-pea-proteins",
    "name": "HYDROLYZED PEA PROTEINS",
    "code": "GT-HYDROLYZED",
    "supplierId": "greentech",
    "category": "Bio-Active Specialties",
    "inci": "Water, Hydrolyzed Pea Protein",
    "mainUse": "Sustainable vegan pea protein hydrolysate delivering deep hair hydration and fiber resilience.",
    "application": "Vegan Keratin Hair Treatments, Volumizing Shampoos, Anti-Ageing Hair Serums",
    "dosage": "1–5%",
    "keyBenefits": [
      "Vegan alternative to keratin boosting hair hydration and tensile strength"
    ],
    "formulatorBenefits": [
      "Adsorbs onto hair cuticle surface and penetrates into cortex to reinforce hydrogen bonding networks."
    ],
    "suggestions": "Ethically sourced from Pisum sativum (Green Pea) seeds. Verified in Greentech Technical Dossier.",
    "verifiedInPdf": true,
    "pdfPage": 13,
    "catalogOrigin": "Historical Greentech Dossier",
    "physicalForm": "Liquid",
    "solubility": "Water-soluble",
    "sourceDoc": "Plaquette Hair Care 2021_V02-PRINT.pdf p.13",
    "botanicalSource": "Pisum sativum"
  },
  {
    "id": "lactophyt",
    "slug": "lactophyt",
    "name": "LACTOPHYT®",
    "code": "GT-LACTOPHYT",
    "supplierId": "greentech",
    "category": "Bio-Active Specialties",
    "inci": "Propanediol, Water, Humulus Lupulus Extract",
    "mainUse": "Microbiota-modulating natural active selectively eliminating odor-causing bacteria without blocking perspiration.",
    "application": "Microbiome Deodorants, Body Odour Control Lotions, Underarm Care Serums",
    "dosage": "1–2%",
    "keyBenefits": [
      "Selectively stops odor-causing Corynebacterium while preserving benign microflora",
      "24-hour clinical reduction in underarm malodor without aluminum salts"
    ],
    "formulatorBenefits": [
      "Specifically inhibits Corynebacterium striatum and Corynebacterium jeikeium bacteria responsible for enzymatic transformation of sweat into malodor, without aluminum salts."
    ],
    "suggestions": "Ethically sourced from Humulus lupulus (Hops) and botanical extracts. Verified in Greentech Technical Dossier.",
    "verifiedInPdf": true,
    "pdfPage": 7,
    "catalogOrigin": "Historical Greentech Dossier",
    "physicalForm": "Liquid",
    "solubility": "Water-soluble",
    "sourceDoc": "Plaquette Microbiote-PRINT.pdf p.7",
    "botanicalSource": "Humulus lupulus"
  },
  {
    "id": "silypur-oc",
    "slug": "silypur-oc",
    "name": "SILYPUR OC",
    "code": "GT-SILYPUR_OC",
    "supplierId": "greentech",
    "category": "Bio-Active Specialties",
    "inci": "Water, Glycerin, Silybum Marianum Seed Extract",
    "mainUse": "Targeted oral-care botanical purifying active reducing dental plaque and gingival discomfort.",
    "application": "Oral Care, Purifying Toothpastes, Mouthwashes, Gum Health Gels",
    "dosage": "1–5%",
    "keyBenefits": [
      "Reduces dental plaque biofilm formation and protects gingival tissues"
    ],
    "formulatorBenefits": [
      "Inhibits Streptococcus mutans glucosyltransferase enzymes responsible for plaque biofilm adhesion; soothes gingival inflammatory pathways."
    ],
    "suggestions": "Ethically sourced from Silybum marianum (Milk Thistle) seeds. Verified in Greentech Technical Dossier.",
    "verifiedInPdf": true,
    "pdfPage": 37,
    "catalogOrigin": "Historical Greentech Dossier",
    "physicalForm": "Liquid",
    "solubility": "Water-soluble",
    "sourceDoc": "Plaquette actifs Greentech 2024-PRINT.pdf p.37",
    "botanicalSource": "Silybum marianum"
  },
  {
    "id": "aquasiloils-eco",
    "slug": "aquasiloils-eco",
    "name": "AQUASILOILS® (ECO)",
    "code": "GT-AQUASILOIL",
    "supplierId": "greentech",
    "category": "Bio-Active Specialties",
    "inci": "Functionalized Vegetable Oil Polyglyceryl Esters (variant-specific: e.g. Argan Oil Polyglyceryl-6 Esters)",
    "mainUse": "PEG-free, 100% plant-oil derived water-soluble functional cleansers and solubilizers.",
    "application": "Micellar Waters, Oil-to-Milk Cleansers, Clear Shampoos, PEG-Free Solubilizers",
    "dosage": "1–10%",
    "keyBenefits": [
      "100% water-soluble vegetable oil functional cleanser with PEG-free profile",
      "Non-irritating to eyes and sensitive mucosa"
    ],
    "formulatorBenefits": [
      "Forms crystal-clear aqueous micellar solutions that solubilize essential oils, lipid actives, and gently dissolve sebum and makeup without foam collapse."
    ],
    "suggestions": "Ethically sourced from Natural plant oils functionalized via eco-friendly green chemistry. Verified in Greentech Technical Dossier.",
    "verifiedInPdf": true,
    "pdfPage": 24,
    "catalogOrigin": "Historical Greentech Dossier",
    "physicalForm": "Liquid",
    "solubility": "100% Water-soluble",
    "sourceDoc": "Plaquette Vegetable Oils Greentech 2022-PRINT.pdf p.24",
    "botanicalSource": "Functionalized vegetable oil triglycerides"
  },
  {
    "id": "argan-oil",
    "slug": "argan-oil",
    "name": "ARGAN OIL (VIRGIN / ORGANIC)",
    "code": "GT-ARGAN_OIL",
    "supplierId": "greentech",
    "category": "Pure Vegetable Oils",
    "inci": "Argania Spinosa Kernel Oil",
    "mainUse": "Precious Moroccan kernel oil rich in oleic & linoleic acids for intensive hair softness and anti-frizz.",
    "application": "Hair Nutrition, Curly / Frizzy Hair, Nourishing Face Creams, Anti-Ageing Body Oils",
    "dosage": "1–10% in hair formulations; up to 100% in anhydrous oils",
    "keyBenefits": [
      "Increases hair smoothness, reduces frizz, and enhances curl definition"
    ],
    "formulatorBenefits": [
      "Replenishes lost intercellular lipids within the hair cortex and restores stratum corneum barrier flexibility."
    ],
    "suggestions": "Ethically sourced from Argania spinosa kernels wild-harvested by Berber women’s cooperatives in Morocco. Verified in Greentech Technical Dossier.",
    "verifiedInPdf": true,
    "pdfPage": 12,
    "catalogOrigin": "Historical Greentech Dossier",
    "physicalForm": "Liquid vegetable oil",
    "solubility": "Lipophilic / Oil-soluble",
    "sourceDoc": "Plaquette Vegetable Oils Greentech 2022-PRINT.pdf p.12",
    "botanicalSource": "Argania spinosa"
  },
  {
    "id": "jojoba-oil",
    "slug": "jojoba-oil",
    "name": "JOJOBA OIL (GOLDEN / WATER-CLEAR)",
    "code": "GT-JOJOBA_OIL",
    "supplierId": "greentech",
    "category": "Pure Vegetable Oils",
    "inci": "Simmondsia Chinensis (Jojoba) Seed Oil",
    "mainUse": "Liquid wax ester mirroring human sebum with a dry, non-greasy velvet touch for all skin types.",
    "application": "Sebum Control, Dry Touch Hair Serums, Acne-Prone Skin Care, Makeup Removal Oils",
    "dosage": "1–20% in emulsions; up to 100% in facial oils",
    "keyBenefits": [
      "Mimics natural human sebum to balance skin oiliness with a dry silky touch"
    ],
    "formulatorBenefits": [
      "Dissolves sebum plugs, restores optimal lipid barrier integrity without comedogenicity, and stabilizes formula oxidation."
    ],
    "suggestions": "Ethically sourced from Simmondsia chinensis seeds cultivated in arid desert climates. Verified in Greentech Technical Dossier.",
    "verifiedInPdf": true,
    "pdfPage": 19,
    "catalogOrigin": "Historical Greentech Dossier",
    "physicalForm": "Liquid wax ester (solidifies below 10°C)",
    "solubility": "Lipophilic / Oil-soluble",
    "sourceDoc": "Plaquette Vegetable Oils Greentech 2022-PRINT.pdf p.19",
    "botanicalSource": "Simmondsia chinensis"
  },
  {
    "id": "broccoli-oil",
    "slug": "broccoli-oil",
    "name": "BROCCOLI SEED OIL",
    "code": "GT-BROCCOLI_O",
    "supplierId": "greentech",
    "category": "Pure Vegetable Oils",
    "inci": "Brassica Oleracea Italica (Broccoli) Seed Oil",
    "mainUse": "Natural plant silicone replacement rich in erucic acid imparting high gloss and combability.",
    "application": "Silicone Alternative, Frizz Control Serums, Hair Gloss Elixirs",
    "dosage": "1–10%",
    "keyBenefits": [
      "Natural plant replacement for silicones delivering high gloss and detangling"
    ],
    "formulatorBenefits": [
      "Forms a low-friction microscopic lubricating film on hair cuticles, eliminating static flyaways and smoothing coarse hair."
    ],
    "suggestions": "Ethically sourced from Brassica oleracea italica seeds. Verified in Greentech Technical Dossier.",
    "verifiedInPdf": true,
    "pdfPage": 13,
    "catalogOrigin": "Historical Greentech Dossier",
    "physicalForm": "Liquid oil",
    "solubility": "Oil-soluble",
    "sourceDoc": "Plaquette Vegetable Oils Greentech 2022-PRINT.pdf p.13",
    "botanicalSource": "Brassica oleracea italica"
  },
  {
    "id": "castor-oil",
    "slug": "castor-oil",
    "name": "CASTOR OIL (VIRGIN / FIRST PRESS)",
    "code": "GT-CASTOR_OIL",
    "supplierId": "greentech",
    "category": "Pure Vegetable Oils",
    "inci": "Ricinus Communis (Castor) Seed Oil",
    "mainUse": "Viscous ricinoleic-rich oil fortifying hair keratin, enhancing eyelash growth, and providing high cushion.",
    "application": "Hair Fortification, Eyelash & Eyebrow Serums, Lipsticks & Color Cosmetics",
    "dosage": "1–50% in lipsticks and hair fortifiers",
    "keyBenefits": [
      "Fortifies hair fibers, lashes and nails, boosting shine and breakage resistance"
    ],
    "formulatorBenefits": [
      "Forms a high-adhesion lipid cushion that coats hair cuticles and provides high refractive index gloss to color cosmetics."
    ],
    "suggestions": "Ethically sourced from Ricinus communis seeds. Verified in Greentech Technical Dossier.",
    "verifiedInPdf": true,
    "pdfPage": 15,
    "catalogOrigin": "Historical Greentech Dossier",
    "physicalForm": "High-viscosity liquid oil",
    "solubility": "Oil-soluble / Alcohol-soluble",
    "sourceDoc": "Plaquette Vegetable Oils Greentech 2022-PRINT.pdf p.15",
    "botanicalSource": "Ricinus communis"
  },
  {
    "id": "camelina-oil",
    "slug": "camelina-oil",
    "name": "ORGANIC CAMELINA OIL FROM FRANCE",
    "code": "GT-CAMELINA_O",
    "supplierId": "greentech",
    "category": "Pure Vegetable Oils",
    "inci": "Camelina Sativa Seed Oil",
    "mainUse": "French organic oil rich in Omega-3 (>35%) calming skin redness and restoring lipid barrier flexibility.",
    "application": "Sensitive Skin Care, Anti-Inflammatory Balms, Atopic Scalp Treatments, Dry Hair Nutrition",
    "dosage": "1–10% in skin and hair care; up to 100% in face oils",
    "keyBenefits": [
      "Rich in Omega-3 to soothe cutaneous inflammation and restore lipid cement"
    ],
    "formulatorBenefits": [
      "Restores anti-inflammatory prostaglandin balance in skin lipids, suppresses TEWL, and accelerates barrier lipid repair."
    ],
    "suggestions": "Ethically sourced from Camelina sativa seeds cultivated in France under fair organic contracts. Verified in Greentech Technical Dossier.",
    "verifiedInPdf": true,
    "pdfPage": 14,
    "catalogOrigin": "Historical Greentech Dossier",
    "physicalForm": "Liquid oil",
    "solubility": "Oil-soluble",
    "sourceDoc": "Plaquette Vegetable Oils Greentech 2022-PRINT.pdf p.14",
    "botanicalSource": "Camelina sativa"
  },
  {
    "id": "shea-butter",
    "slug": "shea-butter",
    "name": "SHEA BUTTER (NILOTICA & PARTHENOCARPIC)",
    "code": "GT-SHEA_BUTTE",
    "supplierId": "greentech",
    "category": "Plant Butters",
    "inci": "Butyrospermum Parkii (Shea) Butter",
    "mainUse": "Rich unctuous plant butter loaded with stearic-oleic lipids and unsaponifiables for barrier comfort.",
    "application": "Rich Body Creams, Lip Repair Balms, Curly Hair Conditioning, Dry Skin Comfort",
    "dosage": "1–20% in emulsions; up to 100% in solid balms",
    "keyBenefits": [
      "High unsaponifiable content provides long-lasting barrier cushion and soothing comfort"
    ],
    "formulatorBenefits": [
      "Forms a breathable lipid barrier on the epidermis, replenishes stratum corneum ceramides, and shields against cold-weather barrier cracking."
    ],
    "suggestions": "Ethically sourced from Butyrospermum parkii nuts ethically wild-harvested in West Africa (Burkina Faso). Verified in Greentech Technical Dossier.",
    "verifiedInPdf": true,
    "pdfPage": 25,
    "catalogOrigin": "Historical Greentech Dossier",
    "physicalForm": "Solid butter (melting point ~34–38°C)",
    "solubility": "Lipophilic / Oil-soluble",
    "sourceDoc": "Plaquette Vegetable Oils Greentech 2022-PRINT.pdf p.25",
    "botanicalSource": "Butyrospermum parkii (Vitellaria paradoxa)"
  },
  {
    "id": "cocoa-butter",
    "slug": "cocoa-butter",
    "name": "COCOA BUTTER",
    "code": "GT-COCOA_BUTT",
    "supplierId": "greentech",
    "category": "Plant Butters",
    "inci": "Theobroma Cacao (Cocoa) Seed Butter",
    "mainUse": "Solid aromatic plant butter with precise body-temperature melting curve for velvety structural texture.",
    "application": "Solid Body Balms, Lip Balms, Emulsion Consistency Enhancers",
    "dosage": "1–30%",
    "keyBenefits": [
      "Crisp body-temperature melting transition delivering luxurious velvety barrier comfort"
    ],
    "formulatorBenefits": [
      "Provides crystal structure stabilization and moisture occlusion to prevent water loss."
    ],
    "suggestions": "Ethically sourced from Theobroma cacao beans. Verified in Greentech Technical Dossier.",
    "verifiedInPdf": true,
    "pdfPage": 25,
    "catalogOrigin": "Historical Greentech Dossier",
    "physicalForm": "Hard solid butter (melting point ~34–36°C)",
    "solubility": "Oil-soluble",
    "sourceDoc": "Plaquette Vegetable Oils Greentech 2022-PRINT.pdf p.25",
    "botanicalSource": "Theobroma cacao"
  },
  {
    "id": "mango-butter",
    "slug": "mango-butter",
    "name": "MANGO BUTTER",
    "code": "GT-MANGO_BUTT",
    "supplierId": "greentech",
    "category": "Plant Butters",
    "inci": "Mangifera Indica (Mango) Seed Butter",
    "mainUse": "Soft, creamy plant butter rich in oleic and stearic acids imparting smooth glide and elasticity.",
    "application": "Hair Conditioners, Body Cremes, After-Sun Balms",
    "dosage": "1–20%",
    "keyBenefits": [
      "Softens dry hair and skin with smooth non-grainy melting profile"
    ],
    "formulatorBenefits": [
      "Lubricates stratum corneum and hair cuticles, softening brittle keratin without greasy drag."
    ],
    "suggestions": "Ethically sourced from Mangifera indica kernels. Verified in Greentech Technical Dossier.",
    "verifiedInPdf": true,
    "pdfPage": 25,
    "catalogOrigin": "Historical Greentech Dossier",
    "physicalForm": "Soft solid butter (melting point ~30–35°C)",
    "solubility": "Oil-soluble",
    "sourceDoc": "Plaquette Vegetable Oils Greentech 2022-PRINT.pdf p.25",
    "botanicalSource": "Mangifera indica"
  },
  {
    "id": "solarine-iv",
    "slug": "solarine-iv",
    "name": "SOLARINE® IV",
    "code": "GT-SOLARINE_I",
    "supplierId": "greentech",
    "category": "Lipophilic Bio-Actives",
    "inci": "Vegetable Oil, Botanical Active Lipids (refer to TDS)",
    "mainUse": "Specialty oily active derived from botanical lipophilic unsaponifiables for cellular UV protection and repair.",
    "application": "Sun Care Oils, Post-Sun Repair Serums, Photoprotective Balms",
    "dosage": "1–5%",
    "keyBenefits": [
      "Protects cell membranes against UV-induced lipid peroxidation"
    ],
    "formulatorBenefits": [
      "Quenches UV-induced singlet oxygen and preserves membrane lipid integrity."
    ],
    "suggestions": "Ethically sourced from Selected botanical oil lipophilic fraction. Verified in Greentech Technical Dossier.",
    "verifiedInPdf": true,
    "pdfPage": 6,
    "catalogOrigin": "Historical Greentech Dossier",
    "physicalForm": "Liquid oil",
    "solubility": "Oil-soluble",
    "sourceDoc": "Plaquette Vegetable Oils Greentech 2022-PRINT.pdf p.6",
    "botanicalSource": "Botanical unsaponifiables in plant oil"
  },
  {
    "id": "tamanol-lipactive",
    "slug": "tamanol-lipactive",
    "name": "TAMANOL LIPACTIVE",
    "code": "GT-TAMANOL_LI",
    "supplierId": "greentech",
    "category": "Lipophilic Bio-Actives",
    "inci": "Calophyllum Inophyllum Seed Oil",
    "mainUse": "Calophyllum inophyllum seed lipactive accelerating tissue repair and soothing sensitized skin.",
    "application": "Skin Regeneration, Scar & Blemish Balms, Soothing Atopic Oils",
    "dosage": "1–5%",
    "keyBenefits": [
      "Accelerates skin regeneration and soothes sensitized inflamed tissue"
    ],
    "formulatorBenefits": [
      "Stimulates keratinocyte and fibroblast migration to close dermal wounds; inhibits inflammatory COX-2."
    ],
    "suggestions": "Ethically sourced from Calophyllum inophyllum nuts wild-harvested in Madagascar. Verified in Greentech Technical Dossier.",
    "verifiedInPdf": true,
    "pdfPage": 7,
    "catalogOrigin": "Historical Greentech Dossier",
    "physicalForm": "Greenish viscous oil",
    "solubility": "Oil-soluble",
    "sourceDoc": "Plaquette Vegetable Oils Greentech 2022-PRINT.pdf p.7",
    "botanicalSource": "Calophyllum inophyllum"
  },
  {
    "id": "rosehip-oil",
    "slug": "rosehip-oil",
    "name": "ROSEHIP SEED OIL (ORGANIC)",
    "code": "GT-ROSEHIP_OI",
    "supplierId": "greentech",
    "category": "Pure Vegetable Oils",
    "inci": "Rosa Canina Seed Oil",
    "mainUse": "Cold-pressed Rosa canina/rubiginosa oil rich in pro-vitamin A and Omega-3/6 for scar and wrinkle regeneration.",
    "application": "Anti-Ageing Face Oils, Scar Repair Balms, Stretch Mark Creams",
    "dosage": "1–20%; up to 100% in facial oils",
    "keyBenefits": [
      "Stimulates cellular renewal and smooths superficial wrinkles and scars"
    ],
    "formulatorBenefits": [
      "Promotes epidermal regeneration and cellular turnover through natural carotenoid and fatty acid pathways."
    ],
    "suggestions": "Ethically sourced from Rosa canina / rubiginosa seeds. Verified in Greentech Technical Dossier.",
    "verifiedInPdf": true,
    "pdfPage": 20,
    "catalogOrigin": "Historical Greentech Dossier",
    "physicalForm": "Liquid oil",
    "solubility": "Oil-soluble",
    "sourceDoc": "Plaquette Vegetable Oils Greentech 2022-PRINT.pdf p.20",
    "botanicalSource": "Rosa canina / Rosa rubiginosa"
  },
  {
    "id": "sweet-almond-oil",
    "slug": "sweet-almond-oil",
    "name": "SWEET ALMOND OIL",
    "code": "GT-SWEET_ALMO",
    "supplierId": "greentech",
    "category": "Pure Vegetable Oils",
    "inci": "Prunus Amygdalus Dulcis (Sweet Almond) Oil",
    "mainUse": "Classic soothing emollient oil rich in oleic acid and squalene for delicate baby and sensitive skin.",
    "application": "Baby Care, Sensitive Skin Creams, Body Massage Oils, Gentle Cleansing Lotions",
    "dosage": "1–50%; up to 100% in body oils",
    "keyBenefits": [
      "Hypoallergenic soothing emollient calms sensitive skin and baby skin barrier"
    ],
    "formulatorBenefits": [
      "Softens keratin plaques, soothes pruritus, and prevents transepidermal water loss."
    ],
    "suggestions": "Ethically sourced from Prunus amygdalus dulcis kernels. Verified in Greentech Technical Dossier.",
    "verifiedInPdf": true,
    "pdfPage": 21,
    "catalogOrigin": "Historical Greentech Dossier",
    "physicalForm": "Liquid oil",
    "solubility": "Oil-soluble",
    "sourceDoc": "Plaquette Vegetable Oils Greentech 2022-PRINT.pdf p.21",
    "botanicalSource": "Prunus amygdalus dulcis"
  },
  {
    "id": "macadamia-oil",
    "slug": "macadamia-oil",
    "name": "MACADAMIA OIL",
    "code": "GT-MACADAMIA_",
    "supplierId": "greentech",
    "category": "Pure Vegetable Oils",
    "inci": "Macadamia Integrifolia Seed Oil",
    "mainUse": "Palmitoleic acid (Omega-7) rich plant oil restoring depleted sebum in mature skin with rapid absorption.",
    "application": "Mature Skin Creams, Hair Nutrition, Fast Absorbing Body Oils",
    "dosage": "1–20%; up to 100% in dry body oils",
    "keyBenefits": [
      "High Omega-7 content replenishes mature skin sebum with rapid dry-touch absorption"
    ],
    "formulatorBenefits": [
      "Restores depleted sebum omega-7 levels, accelerates micro-circulation, and reinforces barrier lipids."
    ],
    "suggestions": "Ethically sourced from Macadamia integrifolia nuts. Verified in Greentech Technical Dossier.",
    "verifiedInPdf": true,
    "pdfPage": 19,
    "catalogOrigin": "Historical Greentech Dossier",
    "physicalForm": "Liquid oil",
    "solubility": "Oil-soluble",
    "sourceDoc": "Plaquette Vegetable Oils Greentech 2022-PRINT.pdf p.19",
    "botanicalSource": "Macadamia integrifolia"
  },
  {
    "id": "avocado-oil",
    "slug": "avocado-oil",
    "name": "AVOCADO OIL",
    "code": "GT-AVOCADO_OI",
    "supplierId": "greentech",
    "category": "Pure Vegetable Oils",
    "inci": "Persea Gratissima (Avocado) Oil",
    "mainUse": "Unctuous green oil rich in oleic acid, phytosterols, and vitamins A, D, and E for deep tissue regeneration.",
    "application": "Dry Skin Nourishment, Eczema Comfort Balms, Hair Conditioning",
    "dosage": "1–25%; up to 100% in body balms",
    "keyBenefits": [
      "Sterolins penetrate deeply to regenerate dry, cracked skin and stimulate collagen"
    ],
    "formulatorBenefits": [
      "Stimulates collagen metabolism in connective tissue and softens hardened stratum corneum plaques."
    ],
    "suggestions": "Ethically sourced from Persea gratissima fruit pulp. Verified in Greentech Technical Dossier.",
    "verifiedInPdf": true,
    "pdfPage": 12,
    "catalogOrigin": "Historical Greentech Dossier",
    "physicalForm": "Greenish liquid oil",
    "solubility": "Oil-soluble",
    "sourceDoc": "Plaquette Vegetable Oils Greentech 2022-PRINT.pdf p.12",
    "botanicalSource": "Persea gratissima"
  },
  {
    "id": "black-cumin-oil",
    "slug": "black-cumin-oil",
    "name": "BLACK CUMIN (NIGELLA) OIL",
    "code": "GT-BLACK_CUMI",
    "supplierId": "greentech",
    "category": "Pure Vegetable Oils",
    "inci": "Nigella Sativa Seed Oil",
    "mainUse": "Thymoquinone-rich Nigella sativa oil providing potent antibacterial and anti-blemish soothing action.",
    "application": "Acne-Prone Skin Care, Purifying Scalp Serums, Anti-Inflammatory Balms",
    "dosage": "1–10%",
    "keyBenefits": [
      "Naturally clears acne blemishes and calms inflamed follicles with natural thymoquinone"
    ],
    "formulatorBenefits": [
      "Inhibits Cutibacterium acnes growth, downregulates leukotriene B4, and soothes inflammatory blemishes."
    ],
    "suggestions": "Ethically sourced from Nigella sativa seeds. Verified in Greentech Technical Dossier.",
    "verifiedInPdf": true,
    "pdfPage": 13,
    "catalogOrigin": "Historical Greentech Dossier",
    "physicalForm": "Aromatic amber liquid oil",
    "solubility": "Oil-soluble",
    "sourceDoc": "Plaquette Vegetable Oils Greentech 2022-PRINT.pdf p.13",
    "botanicalSource": "Nigella sativa"
  },
  {
    "id": "buriti-oil",
    "slug": "buriti-oil",
    "name": "BURITI OIL",
    "code": "GT-BURITI_OIL",
    "supplierId": "greentech",
    "category": "Pure Vegetable Oils",
    "inci": "Mauritia Flexuosa Fruit Oil",
    "mainUse": "World’s richest natural source of beta-carotene giving radiant golden glow and solar antioxidant defense.",
    "application": "Sun Care & Tanning Oils, Antioxidant Glow Serums, Post-Sun Repair Balms",
    "dosage": "0.5–5% in face creams; up to 10% in tanning oils",
    "keyBenefits": [
      "World-record beta-carotene content shields against UV free radicals and imparts natural glow"
    ],
    "formulatorBenefits": [
      "Quenches UV-induced singlet oxygen and free radicals; imparts natural warm carotenoid pigment to skin."
    ],
    "suggestions": "Ethically sourced from Mauritia flexuosa fruit pulp from the Brazilian Amazon. Verified in Greentech Technical Dossier.",
    "verifiedInPdf": true,
    "pdfPage": 13,
    "catalogOrigin": "Historical Greentech Dossier",
    "physicalForm": "Deep ruby-red liquid oil",
    "solubility": "Oil-soluble",
    "sourceDoc": "Plaquette Vegetable Oils Greentech 2022-PRINT.pdf p.13",
    "botanicalSource": "Mauritia flexuosa"
  },
  {
    "id": "org-yuzu-france",
    "slug": "org-yuzu-france",
    "name": "ORGANIC YUZU FROM FRANCE",
    "code": "GT-ORG_YUZU_F",
    "supplierId": "greentech",
    "category": "Botanical Extracts",
    "inci": "Water, Glycerin, Citrus Junos Fruit Extract, Zinc PCA",
    "mainUse": "Organic French-grown Yuzu extract combined with Zinc PCA for sebum regulation and citrus radiance.",
    "application": "Oily Skin Balancing, Radiance Day Fluids, Pore Tightening Toners",
    "dosage": "1–5%",
    "keyBenefits": [
      "Tightens enlarged pores and regulates sebum with guaranteed French organic origin"
    ],
    "formulatorBenefits": [
      "Zinc PCA combined with yuzu flavonoids regulates sebaceous gland activity and reduces surface bacterial proliferation."
    ],
    "suggestions": "Ethically sourced from Citrus junos (Yuzu) organically grown in Occitanie, France. Verified in Greentech Technical Dossier.",
    "verifiedInPdf": true,
    "pdfPage": 41,
    "catalogOrigin": "Historical Greentech Dossier",
    "physicalForm": "Liquid",
    "solubility": "Water-soluble",
    "sourceDoc": "Plaquette actifs Greentech 2024-PRINT.pdf p.41",
    "botanicalSource": "Citrus junos"
  },
  {
    "id": "org-bamboo-sap",
    "slug": "org-bamboo-sap",
    "name": "ORGANIC BAMBOO SAP FROM FRANCE",
    "code": "GT-ORG_BAMBOO",
    "supplierId": "greentech",
    "category": "Botanical Extracts",
    "inci": "Phyllostachys Viridiglaucescens Stem Sap",
    "mainUse": "Pure organic French bamboo sap rich in bio-silicon and amino acids for cutaneous remineralization.",
    "application": "Remineralizing Lotions, Cellular Hydration Essences, Anti-Pollution Mists",
    "dosage": "1–10%; can replace water in formulation",
    "keyBenefits": [
      "Pure bio-silica spring sap remineralizes skin and shields against pollution"
    ],
    "formulatorBenefits": [
      "Supplies bio-available organic silicon directly to keratinocytes, reinforcing cell cohesion and hydration reserves."
    ],
    "suggestions": "Ethically sourced from Phyllostachys viridiglaucescens sap harvested in the Cevennes, France. Verified in Greentech Technical Dossier.",
    "verifiedInPdf": true,
    "pdfPage": 42,
    "catalogOrigin": "Historical Greentech Dossier",
    "physicalForm": "Clear aqueous liquid",
    "solubility": "Water-soluble",
    "sourceDoc": "Plaquette actifs Greentech 2024-PRINT.pdf p.42",
    "botanicalSource": "Phyllostachys viridiglaucescens"
  },
  {
    "id": "org-lotus-flowers",
    "slug": "org-lotus-flowers",
    "name": "ORGANIC LOTUS FLOWERS FROM VIETNAM",
    "code": "GT-ORG_LOTUS_",
    "supplierId": "greentech",
    "category": "Botanical Extracts",
    "inci": "Water, Glycerin, Nelumbo Nucifera Flower Extract",
    "mainUse": "Fair-trade Vietnamese white lotus flower active soothing skin and neutralizing oxidative exposome damage.",
    "application": "Soothing Radiance Serums, Anti-Pollution Creams, Zen Wellness Cosmetics",
    "dosage": "1–5%",
    "keyBenefits": [
      "Soothes stressed skin and neutralizes exposome free radicals with ethical fair-trade sourcing"
    ],
    "formulatorBenefits": [
      "Potent scavenging of nitric oxide and hydroxyl radicals, downregulates inflammation mediators, and protects dermal fibroblasts."
    ],
    "suggestions": "Ethically sourced from Nelumbo nucifera (Sacred Lotus) flowers cultivated in the Mekong Delta, Vietnam. Verified in Greentech Technical Dossier.",
    "verifiedInPdf": true,
    "pdfPage": 44,
    "catalogOrigin": "Historical Greentech Dossier",
    "physicalForm": "Liquid",
    "solubility": "Water-soluble",
    "sourceDoc": "Plaquette actifs Greentech 2024-PRINT.pdf p.44",
    "botanicalSource": "Nelumbo nucifera"
  }
];

const DUAL_SOURCED_IDS = new Set([
  'acnilys', 'hairiline', 'timelys', 'hebelys', 'reverskin', 'circalys', 'clerilys', 'expozen', 'flower-acids',
  'myralys', 'soliberine', 'cosmelene-centella', 'cosmelene-ginseng', 'cosmelene-terminalia',
  'cosmelene-neptune-kelp', 'cosmelene-horsetail', 'arcolys', 'dandrilys', 'tilicine',
  'holobiosys', 'golden-microalgae', 'greensil', 'jericine', 'silidine-sn', 'cbd-isolate'
]);

function inferPhysicalForm(p: ProductItem): string {
  if (p.physicalForm) return p.physicalForm;
  const txt = (p.name + ' ' + (p.inci || '') + ' ' + (p.category || '') + ' ' + (p.mainUse || '')).toLowerCase();
  if (txt.includes('butter')) return 'Plant Butter / Rich Paste';
  if (txt.includes('powder') || txt.includes('crystalline') || txt.includes('crystals')) return 'Fine White Crystalline Powder';
  if (txt.includes('fluid') || txt.includes('dimethicone') || txt.includes('silicone')) return 'Clear Silky Fluid';
  if (txt.includes('oil')) return 'Virgin Liquid Botanical Oil';
  if (txt.includes('wax') || txt.includes('flakes') || txt.includes('pellets')) return 'Cosmetic Waxes / Pastilles';
  if (txt.includes('gel')) return 'Clear Viscous Gel';
  return 'Liquid Solution';
}

function inferSolubility(p: ProductItem): string {
  if (p.solubility) return p.solubility;
  const txt = (p.name + ' ' + (p.inci || '') + ' ' + (p.category || '') + ' ' + (p.supplierId || '')).toLowerCase();
  if (txt.includes('silicone') || p.supplierId === 'sns-silcos') return 'Silicone & Isododecane soluble';
  if (txt.includes('oil') || txt.includes('butter') || txt.includes('ester') || txt.includes('stearate') || txt.includes('palmitate') || p.supplierId === 'fine-organics') return 'Oil soluble / Lipophilic';
  if (txt.includes('extract') || txt.includes('bioactive') || txt.includes('ferment') || txt.includes('hydrolyzed') || p.supplierId === 'greentech') return 'Water soluble';
  if (txt.includes('surfactant') || txt.includes('glucoside')) return 'Water soluble / Surfactant phase';
  return 'Dispersible';
}

export const ALL_PRODUCTS: ProductItem[] = [
  ...RAW_SUPPLIER_PRODUCTS.map(p => {
    const isDual = DUAL_SOURCED_IDS.has(p.id);
    const origin: 'Dual-Sourced / Verified' | '2026 Mindtech Catalogue' = isDual ? 'Dual-Sourced / Verified' : '2026 Mindtech Catalogue';
    return {
      ...p,
      image: p.image || getProductSpecificImage(p.id),
      catalogOrigin: origin,
      sourceDoc: isDual 
        ? 'Mindtech 2026 Catalogue p.' + p.pdfPage + ' & Historical Greentech Dossier'
        : 'Mindtech 2026 Master Catalogue p.' + p.pdfPage,
      physicalForm: inferPhysicalForm(p),
      solubility: inferSolubility(p)
    };
  }),
  ...HISTORICAL_GREENTECH_PRODUCTS.map(p => ({
    ...p,
    image: p.image || getProductSpecificImage(p.id),
    physicalForm: inferPhysicalForm(p),
    solubility: inferSolubility(p)
  }))
];
