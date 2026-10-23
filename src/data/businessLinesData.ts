export interface BusinessLineSlide {
  id: string;
  route: string;
  businessLineName: string;
  slideNumber: string;
  railLabel: string;
  label: string;
  headline: string;
  supportingHeadline: string;
  description: string;
  featuredProducts: string[];
  image: string;
  fallbackImage: string;
  imageAlt: string;
  primaryCategory: string;
}

export const BUSINESS_LINE_SLIDES: BusinessLineSlide[] = [
  {
    id: 'skin-care',
    route: 'skin-care',
    businessLineName: 'Skin Care & Anti-Pigmentation',
    slideNumber: '01',
    railLabel: 'Skin Care',
    label: 'SKIN SCIENCE',
    headline: 'Skin Care & Anti-Pigmentation',
    supportingHeadline: 'Radiance, Hydration & Skin Barrier Care',
    description: 'Explore specialty products for brightening formulations, hydration, barrier-care concepts and targeted skin-care applications.',
    featuredProducts: [
      'Alpha Arbutin and Beta Arbutin',
      'Kojic Acid and Kojic Dipalmitate',
      'Ethyl Ascorbic Acid and Niacinamide'
    ],
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1920&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1920&q=85',
    imageAlt: 'Premium skincare serum textures, cosmetic glassware and laboratory formulations',
    primaryCategory: 'Brightening, Hydration & Barrier Actives'
  },
  {
    id: 'hair-care',
    route: 'hair-care',
    businessLineName: 'Hair Care & Conditioning',
    slideNumber: '02',
    railLabel: 'Hair Care',
    label: 'HAIR THERAPY',
    headline: 'Hair Care & Conditioning',
    supportingHeadline: 'Conditioning, Smoothness & Hair-Fibre Care',
    description: 'Discover conditioning polymers, hydrolyzed proteins and specialty products for hair-care formulations.',
    featuredProducts: [
      'Polyquaternium-7, Polyquaternium-10 and Polyquaternium-39',
      'Hydrolyzed Keratin',
      'Silicone Conditioning Emulsions'
    ],
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1920&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1920&q=85',
    imageAlt: 'Luxury hair-care conditioning, flowing hair fibers and rich serum textures',
    primaryCategory: 'Conditioning Polymers & Hair-Fibre Care'
  },
  {
    id: 'sun-care',
    route: 'sun-care',
    businessLineName: 'Sun Care & Photoprotection',
    slideNumber: '03',
    railLabel: 'Sun Care',
    label: 'PHOTOPROTECTION',
    headline: 'Sun Care & Photoprotection',
    supportingHeadline: 'Products for Modern Sun-Care Formulations',
    description: 'Explore products used in sunscreen and daily photoprotection formulations.',
    featuredProducts: [
      'Avobenzone',
      'Octocrylene',
      'Micronized Surface-Treated Titanium Dioxide'
    ],
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1920&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1920&q=85',
    imageAlt: 'Sunlit cosmetic sunscreen creams and laboratory photoprotection glass surfaces',
    primaryCategory: 'Organic & Inorganic UV Filters'
  },
  {
    id: 'color-cosmetics',
    route: 'color-cosmetics',
    businessLineName: 'Color Cosmetics & Make-up',
    slideNumber: '04',
    railLabel: 'Color Cosmetics',
    label: 'COLOR & FINISH',
    headline: 'Color Cosmetics & Make-up',
    supportingHeadline: 'Texture, Sensory Feel & Film-Forming Materials',
    description: 'Discover specialty materials used to modify texture, sensory feel and finish in colour cosmetics.',
    featuredProducts: [
      'Trimethylsiloxysilicate',
      'Dimethicone Crosspolymers',
      'Specialty Silicone Fluids'
    ],
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1920&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=1920&q=85',
    imageAlt: 'Luxury foundation swatches, cosmetic powders and velvety silicone material textures',
    primaryCategory: 'Film-Forming Resins & Sensory Silicones'
  },
  {
    id: 'bath-body',
    route: 'bath-body',
    businessLineName: 'Bath, Body & Mild Cleansing',
    slideNumber: '05',
    railLabel: 'Bath & Body',
    label: 'GENTLE CLEANSING',
    headline: 'Bath, Body & Mild Cleansing',
    supportingHeadline: 'Surfactants for Personal-Care Formulations',
    description: 'Explore surfactants and related products for bath, body and personal-cleansing applications.',
    featuredProducts: [
      'Coco, Decyl and Lauryl Glucosides',
      'Sodium Cocoyl Isethionate',
      'Cocamidopropyl Betaine'
    ],
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1920&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1608248597359-7b3b7b99c095?auto=format&fit=crop&w=1920&q=85',
    imageAlt: 'Rich cleansing foam, transparent liquid textures and mild surfactants',
    primaryCategory: 'Mild Glucosides, Isethionates & Betaines'
  },
  {
    id: 'biotechnology',
    route: 'biotechnology',
    businessLineName: 'Active Bio-Technology & Greentech',
    slideNumber: '06',
    railLabel: 'Biotechnology',
    label: 'GREENTECH SCIENCE',
    headline: 'Active Bio-Technology & Greentech',
    supportingHeadline: 'Botanical Products & Biotechnology-Inspired Actives',
    description: 'Discover botanical products and biotechnology-inspired actives for personal-care formulations.',
    featuredProducts: [
      'HEBÉLYS®',
      'EPICA® and NUCLEOLYS',
      'REVERSKIN®, QT40® and HOLOBIOSYS®'
    ],
    image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=1920&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1920&q=85',
    imageAlt: 'Botanical extracts, marine algae and biotechnology laboratory research',
    primaryCategory: 'Bio-Fermentation & Botanical Actives'
  }
];
