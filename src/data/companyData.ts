export interface IndustrySegment {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badge: string;
  keyProductsSummary: string[];
}

export const COMPANY_DETAILS = {
  name: "Mindtech Biotechnology India Pvt. Ltd.",
  shortName: "Mindtech Biotechnology",
  tagline: "NATURE BEYOND THE FUTURE",
  mission: "To deliver quality ingredients, dependable supply and responsive support while building long-term relationships with our customers and global partners.",
  vision: "To become a trusted and preferred ingredient partner for the personal care industry by connecting quality global ingredients with innovative formulation opportunities.",
  overview: "Mindtech Biotechnology India Pvt. Ltd. is a trusted importer and distributor of premium cosmetic and personal care ingredients, delivering high-quality raw material solutions to manufacturers, formulators and personal care brands.",
  extendedOverview: "Our portfolio brings together specialty silicones, natural actives, skin-lightening ingredients, specialty esters, conditioning ingredients and other functional raw materials designed to support the evolving needs of modern personal care formulations. With a strong focus on quality, consistency, reliable sourcing and customer support, we work closely with our customers to provide the right ingredients for their formulation requirements.",
  philosophy: "At Mindtech, we believe that supplying ingredients is more than a transaction — it is about building dependable partnerships that contribute to innovation, formulation excellence and long-term business growth.",
  phones: [
    { label: "Sales Head (Ajay Patel)", number: "+91-8368947579", raw: "+918368947579" },
    { label: "Formulation Support", number: "+91-8707403441", raw: "+918707403441" },
    { label: "Logistics & Warehouse", number: "+91-9555446794", raw: "+919555446794" }
  ],
  emails: [
    { role: "Sales Head", email: "Ajaypatel@mindtec.org.in" },
    { role: "Sales Team", email: "sales@mindtec.org.in" },
    { role: "General Inquiries", email: "info@mindtec.org.in" }
  ],
  address: {
    line1: "Ground Floor-181, Pkt-D, Sec-3 Bawana Dsidc City",
    line2: "Opp. Delhi Jal Board Bawana",
    city: "New Delhi",
    pin: "110039",
    country: "India",
    full: "Ground Floor-181, Pkt-D, Sec-3 Bawana Dsidc City, Opp Delhi Jal Board Bawana, New Delhi - 110039, India"
  },
  regulatory: {
    msmeNo: "UDYAM-DL-06-0157900",
    policyNo: "2001/399757984/00/000",
    standards: ["ISO 9001:2015 Compliant", "GMP Certified Supply Chain", "COA & TDS Verified"]
  },
  websites: ["www.mindtechbiotech.com", "www.mindtechbiotechnology.com"]
};

// Rich Image-Driven Industry Application Segments (Yasham.in Style)
export const INDUSTRY_SEGMENTS: IndustrySegment[] = [
  {
    id: "skincare",
    title: "Skin Care & Anti-Pigmentation",
    subtitle: "Advanced Radiance, Barrier Repair & Melanin Regulation",
    description: "High-efficacy actives, skin brighteners, ceramides, and hydrators formulated for lightweight creams, targeted serums, and soothing emulsions.",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=80",
    badge: "Skin Science",
    keyProductsSummary: [
      "Alpha & Beta Arbutin",
      "Kojic Acid & Kojic Dipalmitate",
      "Ethyl Ascorbic Acid & Niacinamide",
      "Ceramides & Deep Hydrators"
    ]
  },
  {
    id: "haircare",
    title: "Hair Care & Conditioning",
    subtitle: "Fiber Strengthening, Cuticle Smoothing & Scalp Health",
    description: "High-performance conditioning polymers, hydrolyzed proteins, and bio-actives for frizz control, strand nourishment, and scalp revitalization.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80",
    badge: "Hair Therapy",
    keyProductsSummary: [
      "Polyquaternium-7, 10 & 39",
      "Hydrolyzed Keratin",
      "Silicone Conditioning Emulsions",
      "Scalp Microbiota Phyto-Actives"
    ]
  },
  {
    id: "suncare",
    title: "Sun Care & Photoprotection",
    subtitle: "Broad-Spectrum UVA/UVB Shields & Daily Defense",
    description: "Photostable organic and inorganic UV filters designed for comfortable everyday sunscreens, anti-photoageing lotions, and zero white-cast finishes.",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1200&q=80",
    badge: "Photoprotection",
    keyProductsSummary: [
      "Avobenzone & Octocrylene",
      "Micronized Surface-Treated TiO2",
      "Benzophenone-3 & Benzophenone-4",
      "Octyl Salicylate"
    ]
  },
  {
    id: "color-cosmetics",
    title: "Color Cosmetics & Make-up",
    subtitle: "Sensory Glides, Velvety Primers & Long-Wear Fixatives",
    description: "Silicone elastomer gels, resin film formers, and volatility modifiers for lipsticks, foundations, waterproof eyeliners, and velvety matte finishes.",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=80",
    badge: "Color & Finish",
    keyProductsSummary: [
      "Silicone Resins (Trimethylsiloxysilicate)",
      "Dimethicone Crosspolymers",
      "Silky Volatile Fluids",
      "Hydrophobic Film Formers"
    ]
  },
  {
    id: "cleansing",
    title: "Bath, Body & Mild Cleansing",
    subtitle: "Gentle Sulfate-Free Foams & Skin-Comfort Surfactants",
    description: "Plant-derived glucosides, isethionates, and betaines delivering rich, velvety lather while respecting delicate skin and scalp moisture barriers.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80",
    badge: "Clean Cleansing",
    keyProductsSummary: [
      "Coco, Decyl & Lauryl Glucosides",
      "Sodium Cocoyl Isethionate (SCI)",
      "Cocamidopropyl Betaine (CAPB)",
      "Mild Baby-Care Surfactants"
    ]
  },
  {
    id: "biotech-actives",
    title: "Active Bio-Technology & Greentech",
    subtitle: "Clinically Validated Cellular & Botanical Innovations",
    description: "Patented fermentation actives, marine polysaccharides, and standardized plant extracts providing targeted cellular rejuvenation and barrier defense.",
    image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=1200&q=80",
    badge: "Greentech Science",
    keyProductsSummary: [
      "HEBÉLYS®, EPICA® & NUCLEOLYS",
      "REVERSKIN® & QT40® Seaweed",
      "HOLOBIOSYS® & EXPOZEN®",
      "HAIRILINE® & ARCOLYS® Anti-Greying"
    ]
  }
];

// Global Principal Manufacturing Partners
export const GLOBAL_PARTNERS = [
  {
    id: "fine-organics",
    name: "FINE ORGANICS",
    tagline: "High Performance & Sustainable Specialty Ingredients",
    description: "Fine Organics is a leading manufacturer of specialty performance ingredients known for their high purity, consistent quality and green chemistry sustainability.",
    badge: "Sustainable Chemistry",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80",
    logoUrl: "/logos/fine-organics.svg",
    categories: ["Emollients", "Specialty Esters", "Functional Fluids", "Eco-friendly Ingredients"],
    keyStrengths: [
      "High performance specialty esters",
      "Global quality standards & compliance",
      "Sustainable & eco-conscious synthesis",
      "Reliable and prompt supply chain"
    ]
  },
  {
    id: "vvf-limited",
    name: "VVF LIMITED",
    tagline: "Global Leader in Oleochemicals & Personal Care Surfactants",
    description: "VVF Limited is a diversified global leader offering high-purity surfactants, fatty alcohols, and specialty oleochemical building blocks.",
    badge: "Oleochemicals & Cleansing",
    image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80",
    logoUrl: "/logos/vvf-limited.svg",
    categories: ["Surfactants", "Emollients", "Specialty Chemicals", "Oleochemicals"],
    keyStrengths: [
      "Wide portfolio of mild & sulfate-free surfactants",
      "Strong industrial R&D and scale",
      "Consistent batch quality & high purity",
      "Massive global manufacturing capacity"
    ]
  },
  {
    id: "sns-silcos",
    name: "SNS SILCOS",
    tagline: "Pioneering Solutions in Silicones & Sensory Specialties",
    description: "SNS Silcos is a trusted pioneer in specialty silicones, delivering advanced sensory modifiers, elastomer gels, and resin technologies.",
    badge: "Sensory & Silicones",
    image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=80",
    logoUrl: "/logos/sns-silcos.svg",
    categories: ["Silicones", "Silicone Emulsions", "Functional Elastomers", "Specialty Actives"],
    keyStrengths: [
      "Superior silicone synthesis technology",
      "Enhances cosmetic spreadability & skin feel",
      "Safe, skin-friendly volatile & linear fluids",
      "Tailored for luxury cosmetic innovation"
    ]
  },
  {
    id: "greentech",
    name: "GREENTECH BIOTECHNOLOGIES",
    tagline: "Natural, Science-Backed Actives for Skincare & Haircare",
    description: "Greentech specializes in natural, potent and research-backed bio-active ingredients derived from marine algae, plant ferments, and rare botanicals.",
    badge: "Bio-Actives & Nature",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=80",
    logoUrl: "/logos/greentech.svg",
    categories: ["Botanical Actives", "Bio-Ferments", "Anti-aging Peptides", "Haircare Phyto-Actives"],
    keyStrengths: [
      "Science of nature, backed by clinical research",
      "High cellular efficacy and safety",
      "Ethically and sustainably sourced",
      "Advanced solutions for modern clean beauty"
    ]
  }
];

// The 6 Strategic Pillars of Mindtech Advantage
export const WHY_CHOOSE_US_PILLARS = [
  {
    number: "01",
    title: "GLOBAL SOURCING, LOCAL SUPPORT",
    description: "We connect customers with quality ingredients sourced through trusted global supply channels, backed by responsive local support.",
    detail: "Direct partnerships with international manufacturers allow Indian formulators to access global ingredient innovations with prompt domestic technical and logistics assistance.",
    icon: "Globe"
  },
  {
    number: "02",
    title: "PREMIUM & DIVERSE INGREDIENT PORTFOLIO",
    description: "From specialty silicones and natural actives to conditioning ingredients, specialty esters and functional raw materials, our portfolio is curated for a wide range of personal care applications.",
    detail: "Comprehensive one-stop raw material portfolio covering skincare, haircare, color cosmetics, sun-care and bath & body formulations.",
    icon: "Boxes"
  },
  {
    number: "03",
    title: "QUALITY YOU CAN RELY ON",
    description: "We place strong emphasis on ingredient quality, consistency and dependable supply to support smooth formulation and production processes.",
    detail: "Every batch is verified with rigorous Certificate of Analysis (COA), Technical Data Sheets (TDS), and stringent quality verification protocols.",
    icon: "Award"
  },
  {
    number: "04",
    title: "APPLICATION-FOCUSED APPROACH",
    description: "We understand that every formulation has different requirements. Our team works with customers to identify suitable ingredient solutions for their specific applications.",
    detail: "Our experienced application specialists assist with sensory optimization, stability troubleshooting, compatibility testing, and dosage guidance.",
    icon: "FlaskConical"
  },
  {
    number: "05",
    title: "DEPENDABLE SUPPLY PARTNER",
    description: "Our import and distribution capabilities are focused on maintaining reliable availability and ensuring a smooth supply experience for our customers.",
    detail: "Strategically located warehousing in New Delhi with robust buffer inventory management to prevent production bottlenecks for our brand partners.",
    icon: "Truck"
  },
  {
    number: "06",
    title: "LONG-TERM PARTNERSHIPS",
    description: "We believe in building lasting relationships through transparent communication, professional service and a commitment to customer satisfaction.",
    detail: "We treat ingredient supply as a collaborative partnership, supporting our clients from initial bench-scale lab formulation to commercial batch manufacturing.",
    icon: "Handshake"
  }
];

// Rich Visual Gallery for Ingredients & Formulations
export const FORMULATION_GALLERY = [
  {
    id: "serum",
    title: "Bioactive Serums & Peptides",
    category: "Skin Care",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
    description: "High concentration water-soluble actives, niacinamide & hyaluronic complexes."
  },
  {
    id: "silicone",
    title: "Specialty Silicones & Elastomers",
    category: "Sensory Modifiers",
    image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80",
    description: "Silky glide, non-greasy cushion, and matte velvet textures for modern cosmetic bases."
  },
  {
    id: "lab",
    title: "Laboratory Analytical Rigor",
    category: "Quality Assurance",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80",
    description: "Batch-tested purity, physicochemical parameter validation & full COA compliance."
  },
  {
    id: "botanical",
    title: "Plant Stem Cells & Bio-Ferments",
    category: "Greentech Actives",
    image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80",
    description: "Eco-extracted marine peptides and standardized botanical compounds."
  },
  {
    id: "cleanser",
    title: "Sulfate-Free Foam & Micellar Surfactants",
    category: "Mild Cleansing",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    description: "Dense, creamy, non-irritating lather systems engineered for sensitive skin."
  },
  {
    id: "logistics",
    title: "Climate-Managed Inventory Hub",
    category: "Delhi Warehouse",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    description: "Dedicated Bawana facility ensuring safe storage and prompt nationwide dispatch."
  }
];
