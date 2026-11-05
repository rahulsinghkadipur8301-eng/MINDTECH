import { REPLICA_PRODUCTS, REPLICA_CATEGORIES, ReplicaProduct, ReplicaCategory } from './greentechReplicaData';
import { ALL_PRODUCTS, ProductItem } from './supplierProductsData';
import { getProductSpecificImage } from './productImages';

export interface PartnerReplicaConfig {
  id: 'greentech' | 'sns-silcos' | 'fine-organics' | 'vvf-limited';
  name: string;
  shortName: string;
  country: string;
  tagline: string;
  defaultCategoryId: string;
  categories: ReplicaCategory[];
  products: Record<string, ReplicaProduct>;
}

// =========================================================================
// 1. SNS SILCOS (14 Documented Silicone Grades)
// =========================================================================
const SNS_PRODUCTS_RAW = ALL_PRODUCTS.filter(p => p.supplierId === 'sns-silcos');

export const SNS_CATEGORIES: ReplicaCategory[] = [
  {
    id: 'all',
    slug: 'all-silicones',
    label: 'All Silicones',
    heading: 'ALL SPECIALTY SILICONES',
    icon: 'Atom',
    productIds: SNS_PRODUCTS_RAW.map(p => p.slug || p.id)
  },
  {
    id: 'elastomer-blends',
    slug: 'elastomer-blends',
    label: 'Elastomers',
    heading: 'SILICONE ELASTOMER BLENDS',
    icon: 'Layers',
    productIds: ['sns-seb-45', 'sns-scb-31', 'sns-scb-21']
  },
  {
    id: 'fluids-volatiles',
    slug: 'volatiles',
    label: 'Volatiles',
    heading: 'SILICONE FLUIDS & VOLATILES',
    icon: 'Wind',
    productIds: ['sns-sfl-45', 'sns-stc-44', 'sns-scb-79']
  },
  {
    id: 'gum-blends',
    slug: 'gum-blends',
    label: 'Gum Blends',
    heading: 'SILICONE GUM BLENDS',
    icon: 'Waves',
    productIds: ['sns-sgb-15', 'sns-scb-79']
  },
  {
    id: 'dimethicones',
    slug: 'dimethicones',
    label: 'Dimethicones',
    heading: 'SILICONE FLUIDS & DIMETHICONES',
    icon: 'Droplet',
    productIds: ['sns-sf-350-m']
  },
  {
    id: 'phenyl-silicones',
    slug: 'phenyl-gloss',
    label: 'Phenyl Gloss',
    heading: 'PHENYL MODIFIED SILICONES',
    icon: 'Sparkles',
    productIds: ['sns-spf-56', 'sns-scb-31', 'sns-scb-21']
  },
  {
    id: 'water-soluble',
    slug: 'water-soluble',
    label: 'Water Soluble',
    heading: 'WATER-SOLUBLE SILICONES',
    icon: 'Droplets',
    productIds: ['sns-sep-93']
  },
  {
    id: 'emulsions',
    slug: 'emulsions',
    label: 'Hair Emulsions',
    heading: 'SILICONE EMULSIONS FOR HAIR',
    icon: 'Sparkle',
    productIds: ['sns-sep-85', 'sns-sae-49']
  },
  {
    id: 'resins-films',
    slug: 'film-formers',
    label: 'Resins & Films',
    heading: 'SILICONE RESINS & FILM FORMERS',
    icon: 'ShieldCheck',
    productIds: ['sns-smr-16']
  },
  {
    id: 'complexes',
    slug: 'specialty-complexes',
    label: 'Complexes',
    heading: 'SPECIALTY SILICONE COMPLEXES',
    icon: 'Boxes',
    productIds: ['sns-saf-701', 'sns-scb-31', 'sns-scb-21']
  }
];

export const SNS_REPLICA_PRODUCTS: Record<string, ReplicaProduct> = SNS_PRODUCTS_RAW.reduce((acc, p) => {
  acc[p.slug || p.id] = {
    id: p.slug || p.id,
    name: p.name,
    image: getProductSpecificImage(p.slug || p.id),
    categoryIds: ['all'],
    tooltip: `${p.inci} | ${p.category}`,
    inci: p.inci,
    dosage: p.dosage,
    shortBenefit: p.mainUse,
    applications: p.application.split(',').map(s => s.trim()),
    description: p.mainUse,
    botanicalOrigin: 'High-Purity Specialty Silicone Synthesis',
    sourceDoc: `Mindtech Catalog 2026, Page ${p.pdfPage}`
  };
  return acc;
}, {} as Record<string, ReplicaProduct>);

// Associate category IDs to SNS products
SNS_CATEGORIES.forEach(cat => {
  if (cat.id !== 'all') {
    cat.productIds.forEach(pid => {
      if (SNS_REPLICA_PRODUCTS[pid]) {
        SNS_REPLICA_PRODUCTS[pid].categoryIds.push(cat.id);
      }
    });
  }
});

// =========================================================================
// 2. FINE ORGANICS (48 Documented Specialty Esters & Emollients)
// =========================================================================
const FINE_PRODUCTS_RAW = ALL_PRODUCTS.filter(p => p.supplierId === 'fine-organics');

export const FINE_CATEGORIES: ReplicaCategory[] = [
  {
    id: 'all',
    slug: 'all-esters',
    label: 'All Esters',
    heading: 'ALL FINE ORGANICS SPECIALTY ESTERS',
    icon: 'FlaskConical',
    productIds: FINE_PRODUCTS_RAW.map(p => p.slug || p.id)
  },
  {
    id: 'emollient-esters',
    slug: 'emollient-esters',
    label: 'Emollient Esters',
    heading: 'EMOLLIENT ESTERS & SENSORY OILS',
    icon: 'Droplets',
    productIds: FINE_PRODUCTS_RAW.filter(p => p.category === 'Emollient Esters').map(p => p.slug || p.id)
  },
  {
    id: 'specialty-fluids',
    slug: 'specialty-fluids',
    label: 'Specialty Fluids',
    heading: 'LIGHT SPECIALTY FLUIDS & SLIP AGENTS',
    icon: 'Feather',
    productIds: FINE_PRODUCTS_RAW.filter(p => p.category === 'Specialty Fluids').map(p => p.slug || p.id)
  },
  {
    id: 'functional-ingredients',
    slug: 'functional',
    label: 'Functional',
    heading: 'FUNCTIONAL EMULSIFIERS & BASES',
    icon: 'Layers',
    productIds: FINE_PRODUCTS_RAW.filter(p => p.category === 'Functional Ingredients').map(p => p.slug || p.id)
  },
  {
    id: 'eco-friendly',
    slug: 'eco-friendly',
    label: 'Eco-Friendly',
    heading: 'ECO-FRIENDLY & BIO-BASED ESTERS',
    icon: 'Leaf',
    productIds: FINE_PRODUCTS_RAW.filter(p => p.category === 'Eco-friendly Ingredients').map(p => p.slug || p.id)
  },
  {
    id: 'triglycerides-mct',
    slug: 'caprylic-mct',
    label: 'Caprylic MCT',
    heading: 'MEDIUM CHAIN TRIGLYCERIDES (MCT)',
    icon: 'Sparkles',
    productIds: FINE_PRODUCTS_RAW.filter(p => p.inci.toLowerCase().includes('caprylic') || p.name.includes('CC 8010')).map(p => p.slug || p.id)
  },
  {
    id: 'waxes-barrier',
    slug: 'waxes',
    label: 'Barrier Waxes',
    heading: 'CETYL PALMITATE & STRUCTURING WAXES',
    icon: 'ShieldCheck',
    productIds: FINE_PRODUCTS_RAW.filter(p => p.inci.toLowerCase().includes('palmitate') || p.inci.toLowerCase().includes('stearate')).map(p => p.slug || p.id)
  },
  {
    id: 'color-pigment',
    slug: 'color-wetting',
    label: 'Color Wetting',
    heading: 'PIGMENT WETTING & MAKE-UP ESTERS',
    icon: 'Palette',
    productIds: FINE_PRODUCTS_RAW.filter(p => p.application.toLowerCase().includes('lip') || p.application.toLowerCase().includes('colour') || p.application.toLowerCase().includes('make-up') || p.application.toLowerCase().includes('nail')).map(p => p.slug || p.id)
  },
  {
    id: 'skin-lotions',
    slug: 'skin-care',
    label: 'Skin Care',
    heading: 'DAILY SKIN CARE & SERUM EMOLLIENTS',
    icon: 'Sparkle',
    productIds: FINE_PRODUCTS_RAW.filter(p => p.application.toLowerCase().includes('skin') || p.application.toLowerCase().includes('cream')).map(p => p.slug || p.id)
  },
  {
    id: 'sun-care',
    slug: 'sun-care',
    label: 'Sun Care',
    heading: 'PHOTO-STABLE UV SOLUBILIZERS',
    icon: 'Sun',
    productIds: FINE_PRODUCTS_RAW.filter(p => p.application.toLowerCase().includes('sun') || p.keyBenefits?.some(b => b.toLowerCase().includes('uv'))).map(p => p.slug || p.id)
  }
];

export const FINE_REPLICA_PRODUCTS: Record<string, ReplicaProduct> = FINE_PRODUCTS_RAW.reduce((acc, p) => {
  acc[p.slug || p.id] = {
    id: p.slug || p.id,
    name: p.name,
    image: getProductSpecificImage(p.slug || p.id),
    categoryIds: ['all'],
    tooltip: `${p.inci} | ${p.category}`,
    inci: p.inci,
    dosage: p.dosage,
    shortBenefit: p.mainUse,
    applications: p.application.split(',').map(s => s.trim()),
    description: p.mainUse,
    botanicalOrigin: 'Sustainable Oleochemical Synthesis & Esterification',
    sourceDoc: `Mindtech Catalog 2026, Page ${p.pdfPage}`
  };
  return acc;
}, {} as Record<string, ReplicaProduct>);

// Associate category IDs to Fine Organics products
FINE_CATEGORIES.forEach(cat => {
  if (cat.id !== 'all') {
    cat.productIds.forEach(pid => {
      if (FINE_REPLICA_PRODUCTS[pid]) {
        FINE_REPLICA_PRODUCTS[pid].categoryIds.push(cat.id);
      }
    });
  }
});

// =========================================================================
// 3. VVF LIMITED (7 Documented Oleochemical & Surfactant Grades)
// =========================================================================
const VVF_PRODUCTS_RAW = ALL_PRODUCTS.filter(p => p.supplierId === 'vvf-limited');

export const VVF_CATEGORIES: ReplicaCategory[] = [
  {
    id: 'all',
    slug: 'all-vvf',
    label: 'All VVF Grades',
    heading: 'ALL VVF OLEOCHEMICALS & SURFACTANTS',
    icon: 'Droplets',
    productIds: VVF_PRODUCTS_RAW.map(p => p.slug || p.id)
  },
  {
    id: 'fatty-alcohols',
    slug: 'fatty-alcohols',
    label: 'Fatty Alcohols',
    heading: 'VEGAROL® CETYL & STEARYL ALCOHOLS',
    icon: 'Layers',
    productIds: VVF_PRODUCTS_RAW.filter(p => p.category === 'Emollients' || p.name.toLowerCase().includes('vegarol')).map(p => p.slug || p.id)
  },
  {
    id: 'surfactants',
    slug: 'surfactants',
    label: 'Surfactants',
    heading: 'PRIMARY & SECONDARY SURFACTANTS',
    icon: 'Wind',
    productIds: VVF_PRODUCTS_RAW.filter(p => p.category === 'Surfactants').map(p => p.slug || p.id)
  },
  {
    id: 'conditioning',
    slug: 'conditioning',
    label: 'Conditioning',
    heading: 'CATIONIC CONDITIONING AGENTS',
    icon: 'Sparkle',
    productIds: VVF_PRODUCTS_RAW.filter(p => p.name.toLowerCase().includes('cetrimonium') || p.name.toLowerCase().includes('behentrimonium') || p.application.toLowerCase().includes('hair')).map(p => p.slug || p.id)
  },
  {
    id: 'specialty-chemicals',
    slug: 'specialty-chemicals',
    label: 'Specialty',
    heading: 'SPECIALTY OLEOCHEMICAL DERIVATIVES',
    icon: 'FlaskConical',
    productIds: ['promisoft-sn-553', 'promisoft-g-20', 'vegarol-sci-85']
  },
  {
    id: 'refined-glycerine',
    slug: 'refined-glycerine',
    label: 'Glycerine',
    heading: 'PURE REFINED VEGETABLE GLYCERINE & EMOLLIENTS',
    icon: 'Droplet',
    productIds: ['promisoft-g-20', 'promisoft-sn-553', 'vegarol-sci-85']
  },
  {
    id: 'skin-barrier',
    slug: 'skin-barrier',
    label: 'Skin Barrier',
    heading: 'EMULSION STABILIZERS & BARRIER LIPIDS',
    icon: 'ShieldCheck',
    productIds: VVF_PRODUCTS_RAW.filter(p => p.category === 'Emollients').map(p => p.slug || p.id)
  },
  {
    id: 'hair-rinse',
    slug: 'hair-care',
    label: 'Hair Rinse',
    heading: 'HAIR DETANGLING & ANTISTATIC BASES',
    icon: 'Sparkles',
    productIds: VVF_PRODUCTS_RAW.filter(p => p.application.toLowerCase().includes('hair') || p.application.toLowerCase().includes('shampoo')).map(p => p.slug || p.id)
  },
  {
    id: 'syndet-soap',
    slug: 'syndet-bases',
    label: 'Syndet Bases',
    heading: 'DERMATOLOGICAL SYNDET SOAP NOODLES',
    icon: 'Boxes',
    productIds: VVF_PRODUCTS_RAW.filter(p => p.category === 'Surfactants' || p.application.toLowerCase().includes('soap')).map(p => p.slug || p.id)
  },
  {
    id: 'sustainable-feedstock',
    slug: 'sustainable',
    label: 'Sustainable',
    heading: 'RSPO & VEGETABLE CERTIFIED BASES',
    icon: 'Leaf',
    productIds: VVF_PRODUCTS_RAW.map(p => p.slug || p.id)
  }
];

export const VVF_REPLICA_PRODUCTS: Record<string, ReplicaProduct> = VVF_PRODUCTS_RAW.reduce((acc, p) => {
  acc[p.slug || p.id] = {
    id: p.slug || p.id,
    name: p.name,
    image: getProductSpecificImage(p.slug || p.id),
    categoryIds: ['all'],
    tooltip: `${p.inci} | ${p.category}`,
    inci: p.inci,
    dosage: p.dosage,
    shortBenefit: p.mainUse,
    applications: p.application.split(',').map(s => s.trim()),
    description: p.mainUse,
    botanicalOrigin: 'Sustainable Palm & Plant Feedstocks (RSPO Certified)',
    sourceDoc: `Mindtech Catalog 2026, Page ${p.pdfPage}`
  };
  return acc;
}, {} as Record<string, ReplicaProduct>);

// Associate category IDs to VVF products
VVF_CATEGORIES.forEach(cat => {
  if (cat.id !== 'all') {
    cat.productIds.forEach(pid => {
      if (VVF_REPLICA_PRODUCTS[pid]) {
        VVF_REPLICA_PRODUCTS[pid].categoryIds.push(cat.id);
      }
    });
  }
});

// =========================================================================
// 4. UNIFIED PARTNER CONFIGURATIONS
// =========================================================================
export const ALL_PARTNERS_CONFIG: Record<string, PartnerReplicaConfig> = {
  greentech: {
    id: 'greentech',
    name: 'GREENTECH BIOTECHNOLOGIES',
    shortName: 'Greentech France',
    country: 'Saint-Beauzire, France',
    tagline: 'Active Bio-Technologies & Natural Botanical Actives',
    defaultCategoryId: 'anti-ageing',
    categories: REPLICA_CATEGORIES,
    products: REPLICA_PRODUCTS
  },
  'sns-silcos': {
    id: 'sns-silcos',
    name: 'SNS SILCOS',
    shortName: 'SNS Silcos',
    country: 'International Silicones Alliance',
    tagline: 'Specialty Silicones, Elastomers & Sensory Modifiers',
    defaultCategoryId: 'elastomer-blends',
    categories: SNS_CATEGORIES,
    products: SNS_REPLICA_PRODUCTS
  },
  'fine-organics': {
    id: 'fine-organics',
    name: 'FINE ORGANICS',
    shortName: 'Fine Organics',
    country: 'Global Oleochemical Manufacturing',
    tagline: 'High-Purity Emollient Esters & Specialty Additives',
    defaultCategoryId: 'emollient-esters',
    categories: FINE_CATEGORIES,
    products: FINE_REPLICA_PRODUCTS
  },
  'vvf-limited': {
    id: 'vvf-limited',
    name: 'VVF LIMITED',
    shortName: 'VVF Limited',
    country: 'Global Oleochemical Alliances',
    tagline: 'Fatty Alcohols, Cationic Conditioning & Syndets',
    defaultCategoryId: 'fatty-alcohols',
    categories: VVF_CATEGORIES,
    products: VVF_REPLICA_PRODUCTS
  }
};
