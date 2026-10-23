import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Atom, 
  FlaskConical, 
  Layers, 
  Droplets, 
  ShieldCheck, 
  CheckCircle2, 
  Search, 
  X, 
  FileText, 
  SlidersHorizontal, 
  Eye, 
  Send, 
  HelpCircle, 
  Award, 
  Package, 
  Sun, 
  Zap, 
  ChevronRight, 
  Download,
  Info,
  Check,
  Building2,
  Table,
  LayoutGrid
} from 'lucide-react';
import { PartnerLogoRenderer, SnsSilcosLogo } from '../PartnerLogos';
import { ALL_PRODUCTS, ProductItem } from '../../data/supplierProductsData';

interface SnsSilcosMicrositeProps {
  onBackToOverview: (targetSection?: string) => void;
  onSelectProduct: (product: ProductItem) => void;
  onRequestSample: (product: ProductItem) => void;
  onRequestQuote: (product: ProductItem) => void;
  onOpenInquiry: (topic?: string) => void;
}

// Formulation blueprint recipe
interface FormulationBlueprint {
  id: string;
  title: string;
  category: string;
  tagline: string;
  heroProduct: string;
  benefits: string[];
  sensoryDescription: string;
  suggestedPhase: {
    phase: string;
    ingredient: string;
    pct: string;
    function: string;
  }[];
}

const FORMULATION_BLUEPRINTS: FormulationBlueprint[] = [
  {
    id: 'velvet-matte-primer',
    title: 'Instant Velvet Blur Primer Gel',
    category: 'Color Cosmetics / Primer',
    tagline: 'Flawless line-blurring and all-day sebum control with silky dry-down',
    heroProduct: 'SNS SEB 45 + SNS SAF 701',
    benefits: ['Optical pore blurring', 'Cushioned matte velvet glide', 'Sebum control & anti-shine', 'Locks down foundation'],
    sensoryDescription: 'Silky, powdery gel that instantly transforms on skin contact into a weightless cushion with an imperceptible soft-focus finish.',
    suggestedPhase: [
      { phase: 'Phase A', ingredient: 'SNS SEB 45 (Dimethicone Crosspolymer Gel)', pct: '35.0%', function: 'Matte cushioning elastomer base' },
      { phase: 'Phase A', ingredient: 'SNS SFL 45 (Cyclopentasiloxane)', pct: '48.0%', function: 'Volatile carrier & slip modifier' },
      { phase: 'Phase B', ingredient: 'SNS SAF 701 (Silica-Coated Elastomer Powder)', pct: '3.0%', function: 'Optical blurring & oil absorption' },
      { phase: 'Phase B', ingredient: 'SNS SPF 56 (Phenyl Trimethicone)', pct: '4.0%', function: 'Subtle refractive luminescence' },
      { phase: 'Phase C', ingredient: 'Preservative & Botanical Extracts', pct: '10.0%', function: 'Active delivery & stabilization' }
    ]
  },
  {
    id: 'transfer-proof-lipstick',
    title: '24-Hour Transfer-Proof Liquid Lip Fluid',
    category: 'Color Cosmetics / Lip Care',
    tagline: 'Smudge-proof flexible resin barrier that locks vibrant pigment without flaking',
    heroProduct: 'SNS SCB 79 + SNS SMR 16',
    benefits: ['Zero-transfer on cups and clothing', 'Breathable flexible matrix', 'Non-sticky dry-down', 'Water and sweat resistant'],
    sensoryDescription: 'Fluid application that dries within 90 seconds into a continuous, flexible polymer shield with vibrant color fidelity.',
    suggestedPhase: [
      { phase: 'Phase A', ingredient: 'SNS SCB 79 (MQ Resin in Volatile Carrier)', pct: '18.0%', function: 'Transfer-resistant film former' },
      { phase: 'Phase A', ingredient: 'SNS SMR 16 (Pure MQ Resin Powder)', pct: '4.0%', function: 'Durability & waterproof reinforcement' },
      { phase: 'Phase A', ingredient: 'SNS SFL 45 (Cyclopentasiloxane)', pct: '32.0%', function: 'Evaporative application solvent' },
      { phase: 'Phase B', ingredient: 'Treated Pigments & Mica', pct: '12.0%', function: 'Color intensity & dispersion' },
      { phase: 'Phase C', ingredient: 'SNS SPF 56 (Phenyl Trimethicone)', pct: '5.0%', function: 'Deep color brilliance & comfort' }
    ]
  },
  {
    id: 'split-end-repair-serum',
    title: 'Keratin Seal & Mirror Gloss Hair Elixir',
    category: 'Hair Care & Conditioning',
    tagline: 'Substantive cuticle reconstruction with glass-like hair light reflection',
    heroProduct: 'SNS SGB 15 + SNS SPF 56 + SNS SCB 21',
    benefits: ['Seals damaged cuticles & split ends', 'Mirror-like shine (n > 1.46)', 'Thermal defense against hot styling', 'Anti-frizz humidity shield'],
    sensoryDescription: 'Rich, honey-like viscous fluid that glides across strands without dripping, immediately leaving tresses weightless and radiant.',
    suggestedPhase: [
      { phase: 'Phase A', ingredient: 'SNS SGB 15 (Dimethiconol Gum Blend)', pct: '42.0%', function: 'Cuticle adhesion & split-end seal' },
      { phase: 'Phase A', ingredient: 'SNS SFL 45 (Cyclopentasiloxane)', pct: '43.0%', function: 'Volatile dry-down carrier' },
      { phase: 'Phase B', ingredient: 'SNS SPF 56 (Phenyl Trimethicone)', pct: '8.0%', function: 'High refractive index glass gloss' },
      { phase: 'Phase B', ingredient: 'SNS SCB 21 (Specialty Silicone Complex)', pct: '6.0%', function: 'Anti-humidity conditioning shield' },
      { phase: 'Phase C', ingredient: 'Vitamin E Acetate & Fragrance', pct: '1.0%', function: 'Antioxidant & signature scent' }
    ]
  },
  {
    id: 'silky-cleansing-shampoo',
    title: 'Weightless Micellar Silk Shampoo (2-in-1)',
    category: 'Bath & Cleansing / Hair Care',
    tagline: 'Dense creamy lather with targeted damaged-fiber conditioning in water systems',
    heroProduct: 'SNS SEP 93 + SNS SAE 49 + SNS SEP 85',
    benefits: ['Clear aqueous compatibility', 'Cationic micro-emulsion selectivity', 'No silicone build-up over repeated washes', 'Effortless wet and dry combability'],
    sensoryDescription: 'Luxurious lather that rinses completely clean while leaving fiber cuticles smoothed, silky, and static-free.',
    suggestedPhase: [
      { phase: 'Phase A', ingredient: 'Water & Gentle Surfactants (SLES/CAPB/Glucoside)', pct: '88.0%', function: 'Cleansing aqueous matrix' },
      { phase: 'Phase B', ingredient: 'SNS SEP 93 (PEG-12 Dimethicone)', pct: '2.0%', function: 'Foam densifier & water-soluble slip' },
      { phase: 'Phase B', ingredient: 'SNS SAE 49 (Cationic Amodimethicone Micro-emulsion)', pct: '2.5%', function: 'Selective cuticle conditioning' },
      { phase: 'Phase B', ingredient: 'SNS SEP 85 (Anionic Dimethicone Emulsion)', pct: '1.5%', function: 'Luster & combability boost' },
      { phase: 'Phase C', ingredient: 'Conditioning Polymers & pH Buffers', pct: '6.0%', function: 'Viscosity & stability balance' }
    ]
  }
];

// Chemical family classification
const CHEMICAL_FAMILIES = [
  {
    id: 'volatiles',
    name: 'Volatile Siloxanes & Carriers',
    badge: 'Fast Evaporation',
    icon: Droplets,
    description: 'Ultra-low surface tension cyclic fluids engineered for transient slip, zero-tack dry-down, and uniform pigment deposition.',
    keyGrades: ['SNS SFL 45', 'SNS STC 44'],
    highlight: 'Surface tension 18–20 mN/m enables instant wetting of minerals and organic waxes without occlusive greasiness.'
  },
  {
    id: 'gums',
    name: 'High-MW Gum Blends',
    badge: 'Velvet Cushion',
    icon: Layers,
    description: 'Ultra-high molecular weight dimethiconol gums dispersed in volatile cyclopentasiloxane for deep sensory cushion and hair cuticle sealing.',
    keyGrades: ['SNS SGB 15'],
    highlight: 'Provides exceptional substantivity, sealing split ends and forming a wash-off resistant protective mantle on skin.'
  },
  {
    id: 'linear',
    name: 'Linear Dimethicones',
    badge: 'Frictionless Glide',
    icon: Sparkles,
    description: 'Pure poly(dimethylsiloxane) linear polymers tailored for barrier formation, anti-soaping, and smooth skin glide.',
    keyGrades: ['SNS SF 350 M'],
    highlight: 'Eliminates the whitening/soaping effect in emulsions and sunscreen lotions while offering water-repellent protection.'
  },
  {
    id: 'phenyl',
    name: 'Phenyl-Modified Silicones',
    badge: 'High Optical Gloss',
    icon: Sun,
    description: 'Aromatic phenyl ring substitution elevated refractive index (n > 1.46) to generate intense gloss and expand organic compatibility.',
    keyGrades: ['SNS SPF 56'],
    highlight: 'Easily miscible with fatty esters, UV filters, and cosmetic oils; transforms lip lacquers and hair serums into luminous mirrors.'
  },
  {
    id: 'elastomers',
    name: 'Crosslinked Elastomer Gels & Powders',
    badge: 'Matte Soft-Focus',
    icon: Eye,
    description: '3D cross-linked silicone networks swollen in volatile fluids or coated with silica for instant pore blurring and sebum absorption.',
    keyGrades: ['SNS SEB 45', 'SNS SAF 701'],
    highlight: 'Imparts a powdery, cashmere-matte finish that physically blurs micro-wrinkles and absorbs facial sebum throughout the day.'
  },
  {
    id: 'resins',
    name: 'MQ Resins & Film Formers',
    badge: 'Transfer Resistance',
    icon: ShieldCheck,
    description: 'Three-dimensional trimethylsiloxysilicate silicate cage polymers creating tough, flexible, waterproof films.',
    keyGrades: ['SNS SCB 79', 'SNS SMR 16'],
    highlight: 'The gold standard for smudge-proof liquid lipsticks, waterproof sun gels, and 24-hour long-wear make-up formulations.'
  },
  {
    id: 'aqueous',
    name: 'Water-Soluble Polyethers & Emulsions',
    badge: 'Aqueous Systems',
    icon: FlaskConical,
    description: 'Hydrophilic ethylene oxide modifications and micro-emulsions engineered to dissolve or disperse cleanly in water-based systems.',
    keyGrades: ['SNS SEP 93', 'SNS SEP 85', 'SNS SAE 49'],
    highlight: 'Improves lather creaminess, reduces surfactant irritation, and provides selective cationic cuticle repair in clear shampoos.'
  },
  {
    id: 'complexes',
    name: 'Synergistic Multi-Functional Complexes',
    badge: 'Luxury Synergy',
    icon: Atom,
    description: 'Proprietary multi-silicone polymer complexes combining gloss, cushioning, and velvety spread in single, stable liquid solutions.',
    keyGrades: ['SNS SCB 31', 'SNS SCB 21'],
    highlight: 'Replaces multiple formulation additions with a single pre-balanced active for high-tier hair serums and cosmetic treatments.'
  }
];

export const SnsSilcosMicrosite: React.FC<SnsSilcosMicrositeProps> = ({
  onBackToOverview,
  onSelectProduct,
  onRequestSample,
  onRequestQuote,
  onOpenInquiry
}) => {
  // All 14 SNS Silcos products
  const silcosProducts = useMemo(() => {
    return ALL_PRODUCTS.filter(p => p.supplierId === 'sns-silcos');
  }, []);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [activeBlueprint, setActiveBlueprint] = useState<string>('velvet-matte-primer');
  const [quickSampleList, setQuickSampleList] = useState<string[]>([]);
  const [sampleRequestedSuccess, setSampleRequestedSuccess] = useState(false);

  // Categories list
  const categories = useMemo(() => {
    const cats = Array.from(new Set(silcosProducts.map(p => p.category)));
    return ['All', ...cats.sort()];
  }, [silcosProducts]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return silcosProducts.filter(product => {
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(q) ||
        (product.code && product.code.toLowerCase().includes(q)) ||
        product.inci.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.mainUse.toLowerCase().includes(q) ||
        product.application.toLowerCase().includes(q)
      );
    });
  }, [silcosProducts, selectedCategory, searchQuery]);

  // Handle toggling sample checklist
  const toggleSampleGrade = (productCodeOrName: string) => {
    setQuickSampleList(prev => 
      prev.includes(productCodeOrName) 
        ? prev.filter(c => c !== productCodeOrName) 
        : [...prev, productCodeOrName]
    );
  };

  const handleBulkSampleRequest = () => {
    if (quickSampleList.length === 0) {
      onOpenInquiry('SNS Silcos Sample & Technical Dossier Request');
      return;
    }
    const grades = quickSampleList.join(', ');
    onOpenInquiry(`Sample Request for SNS Silcos Specialties: [${grades}]`);
    setSampleRequestedSuccess(true);
    setTimeout(() => setSampleRequestedSuccess(false), 5000);
  };

  const currentBlueprint = FORMULATION_BLUEPRINTS.find(b => b.id === activeBlueprint) || FORMULATION_BLUEPRINTS[0];

  return (
    <div className="w-full max-w-full overflow-x-hidden bg-[#fcfdfd] text-[#072414] min-h-screen relative font-sans text-left">
      
      {/* =========================================================================
          1. HEADER UTILITY, BREADCRUMBS & BACK NAV (Matching SupplierCataloguePage)
          ========================================================================= */}
      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 pt-6 pb-4 space-y-4 text-left">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs sm:text-sm font-semibold text-gray-500 overflow-x-auto whitespace-nowrap pb-1">
          <button
            onClick={() => onBackToOverview('hero')}
            className="hover:text-emerald-800 transition-colors flex items-center space-x-1 cursor-pointer"
          >
            <span>Home</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <button
            onClick={() => onBackToOverview('portfolio')}
            className="hover:text-emerald-800 transition-colors cursor-pointer"
          >
            Global Product Portfolio
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <span className="text-emerald-950 font-bold">
            SNS Silcos
          </span>
        </nav>

        {/* Back Button Banner */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onBackToOverview('portfolio')}
            className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-emerald-900 bg-white hover:bg-emerald-50 px-4 py-2 rounded-full border border-gray-200/90 shadow-2xs transition-all cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-700 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Suppliers</span>
          </button>

          <span className="text-xs font-mono text-gray-500 hidden sm:inline-block">
            Verified Mindtech Catalog 2026/27
          </span>
        </div>

        {/* =========================================================================
            2. SUPPLIER HERO BANNER (Harmonized Rounded-3xl Card)
            ========================================================================= */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#062916] via-[#093a20] to-[#041c10] text-white p-6 sm:p-8 lg:p-10 shadow-xl border border-emerald-500/20">
          
          {/* Subtle Ambient Decorative Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Partner Logo, Origin Badge & Jump Links */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-md border border-white/40 flex items-center">
                  <PartnerLogoRenderer partnerId="sns-silcos" height={38} />
                </div>

                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold tracking-wider uppercase border border-emerald-400/30">
                  International Supply Alliance
                </span>

                <div className="hidden sm:flex items-center space-x-2 text-xs">
                  <a
                    href="#silicone-products"
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-emerald-200 border border-white/15 transition-colors cursor-pointer"
                  >
                    <Atom className="w-3.5 h-3.5 text-emerald-300" />
                    <span>14 Specialties</span>
                  </a>
                  <a
                    href="#sensory-matrix"
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-emerald-200 border border-white/15 transition-colors cursor-pointer"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Sensory Matrix</span>
                  </a>
                  <a
                    href="#formulations"
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-emerald-200 border border-white/15 transition-colors cursor-pointer"
                  >
                    <FlaskConical className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Formulation Lab</span>
                  </a>
                </div>
              </div>

              {/* Title & Tagline */}
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  SNS SILCOS
                </h1>
                <p className="text-emerald-300 text-base sm:text-lg font-semibold mt-1">
                  Specialty Silicone Materials &amp; Sensory Modifiers
                </p>
              </div>

              {/* Description */}
              <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed max-w-3xl">
                Dedicated partner showcase for <strong className="text-white font-bold">SNS Silcos</strong> within Mindtech Biotechnology. Explore an elite spectrum of volatile siloxanes, cross-linked elastomer gels, mirror-gloss phenyl trimethicones, and transfer-resistant MQ resins engineered for luxury skincare, hair serums, sun protection, and color cosmetics.
              </p>

              {/* Key Strengths Pills */}
              <div className="pt-1 flex flex-wrap gap-2">
                {[
                  'Silicone synthesis & material purity',
                  'Enhances texture, slip & sensorial performance',
                  'Volatile & linear silicone technologies',
                  'Tailored for cosmetic formulation & wear'
                ].map((strength, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-emerald-200 text-xs font-medium border border-emerald-400/20"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{strength}</span>
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="#silicone-products"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-emerald-950 font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-emerald-500/20 flex items-center space-x-2 cursor-pointer"
                >
                  <span>Explore 14 Silicone Specialties</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  onClick={() => onOpenInquiry('Request Technical Data Sheets (TDS) and COA for SNS Silcos')}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-emerald-300" />
                  <span>Request TDS &amp; Formulator Dossier</span>
                </button>
              </div>

            </div>

            {/* Right Quick Summary Card (4 cols) */}
            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-300 font-bold block">
                Portfolio Snapshot
              </span>

              <div className="space-y-2 text-xs sm:text-sm text-emerald-50">
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-emerald-200/80">Verified Catalogue Entries</span>
                  <strong className="font-mono text-white text-base">
                    14 Verified Products
                  </strong>
                </div>

                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-emerald-200/80">Batch Traceability</span>
                  <strong className="text-white">100% CoA / TDS</strong>
                </div>

                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-emerald-200/80">Functional Classes</span>
                  <strong className="text-white">8 Polymer Families</strong>
                </div>

                <div className="flex justify-between py-1">
                  <span className="text-emerald-200/80">Distribution Hub</span>
                  <strong className="text-white">Bawana Industrial Hub, Delhi</strong>
                </div>
              </div>

              {/* Sample / Inquiry Action in Snapshot */}
              <div className="pt-2 border-t border-white/10">
                <button
                  onClick={() => onOpenInquiry('SNS Silcos Technical Support & Sample Request')}
                  className="w-full py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black text-xs uppercase tracking-wider transition-colors flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Request Samples &amp; Quotes</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* =========================================================================
          3. SILICONE SCIENCE & MOLECULAR ARCHITECTURE
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white border-b border-gray-100">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 space-y-12">
          
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <Atom className="w-3.5 h-3.5 text-emerald-700" />
              <span>Fundamental Silicone Chemistry</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#072414] tracking-tight">
              Why Specialty Silicones Define Modern Cosmetic Sensory Experience
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Unlike plant oils or heavy hydrocarbons, silicones are based on alternating silicon-oxygen backbones (Si-O-Si). The high bond strength (445 kJ/mol) and flexible bond angles unlock a rare paradox: complete chemical inertness with unprecedented fluid slip.
            </p>
          </div>

          {/* 4 Scientific Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-2xl bg-gradient-to-b from-emerald-50/50 to-white border border-emerald-100 hover:border-emerald-300 transition-all shadow-2xs">
              <div className="w-12 h-12 rounded-xl bg-emerald-100/80 text-emerald-800 flex items-center justify-center font-bold text-lg mb-4">
                <Droplets className="w-6 h-6 text-emerald-700" />
              </div>
              <h3 className="text-base font-extrabold text-[#072414] mb-2">Ultra-Low Surface Tension</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Operating between 18–22 mN/m (vs water at 72.8 mN/m and mineral oil at 32 mN/m). Enables instantaneous spreading, pigment wetting, and zero drag on skin.
              </p>
              <div className="mt-4 pt-3 border-t border-emerald-100/60 text-[11px] font-mono font-bold text-emerald-800">
                Key Grades: SFL 45, STC 44
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-blue-50/50 to-white border border-blue-100 hover:border-blue-300 transition-all shadow-2xs">
              <div className="w-12 h-12 rounded-xl bg-blue-100/80 text-blue-800 flex items-center justify-center font-bold text-lg mb-4">
                <Layers className="w-6 h-6 text-blue-700" />
              </div>
              <h3 className="text-base font-extrabold text-[#072414] mb-2">Breathable Barrier Mantle</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Silicone elastomer lattices form flexible, permeable films that allow trans-epidermal oxygen and water vapor exchange without suffocating pores or trapping sweat.
              </p>
              <div className="mt-4 pt-3 border-t border-blue-100/60 text-[11px] font-mono font-bold text-blue-800">
                Key Grades: SGB 15, SEB 45
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-amber-50/50 to-white border border-amber-100 hover:border-amber-300 transition-all shadow-2xs">
              <div className="w-12 h-12 rounded-xl bg-amber-100/80 text-amber-800 flex items-center justify-center font-bold text-lg mb-4">
                <Sun className="w-6 h-6 text-amber-700" />
              </div>
              <h3 className="text-base font-extrabold text-[#072414] mb-2">Optical Soft-Focus &amp; Gloss</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                From micro-wrinkle light diffusion using crosslinked elastomer powders to mirror-like shine via high refractive index phenyl trimethicone (n &gt; 1.46).
              </p>
              <div className="mt-4 pt-3 border-t border-amber-100/60 text-[11px] font-mono font-bold text-amber-800">
                Key Grades: SPF 56, SAF 701
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-purple-50/50 to-white border border-purple-100 hover:border-purple-300 transition-all shadow-2xs">
              <div className="w-12 h-12 rounded-xl bg-purple-100/80 text-purple-800 flex items-center justify-center font-bold text-lg mb-4">
                <ShieldCheck className="w-6 h-6 text-purple-700" />
              </div>
              <h3 className="text-base font-extrabold text-[#072414] mb-2">Transfer-Proof Film Integrity</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Three-dimensional silicate cage resins (MQ networks) dry into persistent, water-repellent shields that lock pigments onto lips and skin for 16–24 hours.
              </p>
              <div className="mt-4 pt-3 border-t border-purple-100/60 text-[11px] font-mono font-bold text-purple-800">
                Key Grades: SCB 79, SMR 16
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          4. THE 8 FUNCTIONAL CHEMICAL FAMILIES OVERVIEW
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-[#f7faf8] border-b border-gray-200/80">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center space-x-2 text-xs font-mono font-extrabold uppercase tracking-widest text-emerald-800">
                <span>Polymer Architecture</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-[#072414] tracking-tight">
                8 Specialty Silicone Functional Families
              </h2>
              <p className="text-sm text-gray-600">
                Each family is precisely modified to answer distinct personal care formulating challenges.
              </p>
            </div>

            <button
              onClick={() => onOpenInquiry('SNS Silcos Chemical Family Guide & Formulating Dossier')}
              className="text-xs font-bold text-emerald-900 bg-white border border-emerald-300 hover:bg-emerald-50 px-4 py-2 rounded-xl transition-colors shadow-2xs self-start md:self-auto flex items-center space-x-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-emerald-700" />
              <span>Download Formulator Matrix</span>
            </button>
          </div>

          {/* Families Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {CHEMICAL_FAMILIES.map((fam) => {
              const IconComp = fam.icon;
              return (
                <div
                  key={fam.id}
                  className="bg-white p-5 rounded-2xl border border-gray-200/90 hover:border-emerald-500 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 group-hover:bg-emerald-950 text-emerald-800 group-hover:text-emerald-300 flex items-center justify-center transition-colors">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-950 uppercase tracking-wider">
                        {fam.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-[#072414] group-hover:text-emerald-900 transition-colors">
                      {fam.name}
                    </h3>

                    <p className="text-xs text-gray-600 leading-relaxed font-normal">
                      {fam.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-100 space-y-2">
                    <div className="text-[11px] text-gray-500 font-medium leading-normal italic">
                      "{fam.highlight}"
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Grades:</span>
                      {fam.keyGrades.map((g, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-gray-100 font-mono text-[10px] font-bold text-emerald-950">
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          5. INTERACTIVE SENSORY MATRIX & FORMULATOR DECISION GUIDE
          ========================================================================= */}
      <section id="sensory-matrix" className="py-16 sm:py-20 bg-white border-b border-gray-200/80">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 space-y-10">
          
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-700" />
              <span>Sensory Engineering</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#072414] tracking-tight">
              Interactive Formulator Sensory Matrix
            </h2>
            <p className="text-sm text-gray-600">
              Select your desired sensory objective to inspect how SNS Silcos grades compare on key formulation metrics: Spreadability, Cushion, Dry-Down Speed, Optical Gloss, and Wash-Off Resistance.
            </p>
          </div>

          {/* Matrix Comparison Table */}
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-2xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#072414] text-white font-mono uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">Grade &amp; INCI</th>
                  <th className="py-3.5 px-3">Primary Role</th>
                  <th className="py-3.5 px-3">Spreadability</th>
                  <th className="py-3.5 px-3">Cushion / Feel</th>
                  <th className="py-3.5 px-3">Dry-Down Rate</th>
                  <th className="py-3.5 px-3">Gloss Index</th>
                  <th className="py-3.5 px-3">Film Substantivity</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {[
                  {
                    code: 'SNS SFL 45',
                    inci: 'Cyclopentasiloxane',
                    role: 'Volatile Dry Carrier',
                    spread: 'Maximum (5/5)',
                    cushion: 'Featherlight (1/5)',
                    dryDown: 'Rapid Evaporation',
                    gloss: 'Natural Matte',
                    film: 'Transient (Zero Residue)',
                    highlight: 'The essential volatile carrier for serums, primers & sunscreens.'
                  },
                  {
                    code: 'SNS STC 44',
                    inci: 'Cyclotetrasiloxane',
                    role: 'Ultra-Light Carrier',
                    spread: 'Instant (5/5)',
                    cushion: 'Weightless (1/5)',
                    dryDown: 'Ultra-Fast Dry-Down',
                    gloss: 'Zero Gloss',
                    film: 'Non-detectable',
                    highlight: 'Ideal for mists and fast-absorbing dry-finish serums.'
                  },
                  {
                    code: 'SNS SGB 15',
                    inci: 'Cyclopentasiloxane & Dimethiconol',
                    role: 'Velvet Hair & Skin Gum',
                    spread: 'Smooth (4/5)',
                    cushion: 'Rich Velvet (5/5)',
                    dryDown: 'Sustained Cushion',
                    gloss: 'Silky Glow',
                    film: 'Water-Repellent Barrier',
                    highlight: 'Essential for luxury split-end hair serums and protective creams.'
                  },
                  {
                    code: 'SNS SF 350 M',
                    inci: 'Dimethicone (350 cSt)',
                    role: 'Linear Fluid & Anti-soaping',
                    spread: 'Balanced (3.5/5)',
                    cushion: 'Moderate Glide (3/5)',
                    dryDown: 'Non-volatile (Persistent)',
                    gloss: 'Soft Satin',
                    film: 'Protective Barrier',
                    highlight: 'Eliminates emulsifier soaping/whitening in body lotions & sunscreens.'
                  },
                  {
                    code: 'SNS SPF 56',
                    inci: 'Phenyl Trimethicone',
                    role: 'High-Refractive Gloss',
                    spread: 'Excellent (4.5/5)',
                    cushion: 'Silky Slip (3.5/5)',
                    dryDown: 'Non-volatile Glow',
                    gloss: 'Ultra High (5/5 - n>1.46)',
                    film: 'Lip & Hair Luster',
                    highlight: 'Unrivaled gloss booster for lipsticks, glosses & shine sprays.'
                  },
                  {
                    code: 'SNS SEB 45',
                    inci: 'Cyclopentasiloxane & Dimethicone Crosspolymer',
                    role: 'Pore Blurring Elastomer',
                    spread: 'Cushioned (4/5)',
                    cushion: 'Velvet Mousse (5/5)',
                    dryDown: 'Matte Powdery Set',
                    gloss: 'Total Matte Blur',
                    film: 'Silicone Elastomer Gel',
                    highlight: 'Benchmark soft-focus elastomer for primers and matte sunscreens.'
                  },
                  {
                    code: 'SNS SEP 93',
                    inci: 'PEG-12 Dimethicone',
                    role: 'Water-Soluble Polyether',
                    spread: 'Aqueous Slip (4/5)',
                    cushion: 'Creamy Foam (4/5)',
                    dryDown: 'Clean Rinse / Leave-on',
                    gloss: 'Natural Wet Luster',
                    film: 'Hydrophilic Slip',
                    highlight: '100% water soluble for clear face washes, micellar systems & shampoos.'
                  },
                  {
                    code: 'SNS SCB 79',
                    inci: 'Cyclopentasiloxane & Trimethylsiloxysilicate',
                    role: 'Transfer-Proof MQ Resin',
                    spread: 'Easy Glide (4/5)',
                    cushion: 'Flexible Film (3/5)',
                    dryDown: '90-sec Fast Set',
                    gloss: 'Adjustable',
                    film: 'Extreme Transfer-Proof (5/5)',
                    highlight: 'The industry benchmark for smudge-proof liquid lipsticks & long-wear liners.'
                  },
                  {
                    code: 'SNS SMR 16',
                    inci: 'Trimethylsiloxysilicate (100% Powder)',
                    role: 'Pure MQ Resin Powder',
                    spread: 'Tailored by solvent',
                    cushion: 'Rigid Barrier (4/5)',
                    dryDown: 'Solvent Dependent',
                    gloss: 'Crystal Clear',
                    film: 'Maximum Waterproof (5/5)',
                    highlight: 'Allows custom solvent blending for customized drying kinetics.'
                  },
                  {
                    code: 'SNS SAF 701',
                    inci: 'Dimethicone/Vinyl Dimethicone Crosspolymer & Silica',
                    role: 'Silica Coated Elastomer',
                    spread: 'Velvet Slip (4/5)',
                    cushion: 'Powdery Soft (4.5/5)',
                    dryDown: 'Sebum Absorbing',
                    gloss: 'Ultra Matte Soft Focus',
                    film: 'Anti-Caking Matrix',
                    highlight: 'Absorbs oil while optically concealing fine lines and pores.'
                  }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-emerald-50/40 transition-colors">
                    <td className="py-3 px-4 font-bold text-gray-950">
                      <div className="font-mono text-emerald-950">{row.code}</div>
                      <div className="text-[11px] text-gray-500 font-normal">{row.inci}</div>
                    </td>
                    <td className="py-3 px-3 font-semibold text-emerald-900">{row.role}</td>
                    <td className="py-3 px-3">
                      <span className="inline-block px-2 py-0.5 rounded bg-gray-100 font-mono text-[11px] font-bold text-gray-800">
                        {row.spread}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-gray-700">{row.cushion}</td>
                    <td className="py-3 px-3 font-medium text-emerald-950">{row.dryDown}</td>
                    <td className="py-3 px-3 font-bold text-amber-900">{row.gloss}</td>
                    <td className="py-3 px-3 font-medium text-blue-900">{row.film}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => {
                          const p = silcosProducts.find(x => x.code === row.code || x.name === row.code);
                          if (p) onSelectProduct(p);
                        }}
                        className="px-3 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-900 text-emerald-950 hover:text-white font-bold text-[11px] transition-colors cursor-pointer"
                      >
                        Specs &rarr;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* =========================================================================
          6. THE 14 VERIFIED SNS SILCOS PRODUCTS (INTERACTIVE EXPLORER)
          ========================================================================= */}
      <section id="silicone-products" className="py-16 sm:py-24 bg-[#f9fbf9] border-b border-gray-200/80">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 space-y-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 text-xs font-mono font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-100/60 px-3 py-1 rounded-full border border-emerald-300">
                <Package className="w-3.5 h-3.5 text-emerald-700" />
                <span>Verified Product Portfolio (Page 5)</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-[#072414] tracking-tight">
                Complete SNS Silcos Specialties Catalog
              </h2>
              <p className="text-sm text-gray-600">
                Showing all 14 formulation-tested grades. Filter by chemical family, search INCI names, or request samples.
              </p>
            </div>

            {/* View Mode Toggle & Counter */}
            <div className="flex items-center space-x-3">
              <span className="text-xs font-mono font-bold text-emerald-900 bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-300">
                {filteredProducts.length} of {silcosProducts.length} Grades
              </span>
              <div className="flex items-center bg-white p-1 rounded-xl border border-gray-200 shadow-2xs">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-[#072414] text-white' : 'text-gray-500 hover:text-gray-900'}`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-[#072414] text-white' : 'text-gray-500 hover:text-gray-900'}`}
                  title="Table View"
                >
                  <Table className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Search & Filter Controls */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              
              {/* Search Bar */}
              <div className="md:col-span-6 relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by grade (e.g. SFL 45, SEB 45), INCI, or target use..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-xs sm:text-sm font-medium text-gray-900 placeholder-gray-400 outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Category Dropdown on small screens or pills on large */}
              <div className="md:col-span-6 flex items-center overflow-x-auto space-x-1.5 pb-1 md:pb-0">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#072414] text-white shadow-xs'
                        : 'bg-gray-50 hover:bg-emerald-50 text-gray-700 hover:text-emerald-950 border border-gray-200/80'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

            </div>
          </div>

          {/* VIEW: GRID MODE */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => {
                const isInSampleList = quickSampleList.includes(product.code || product.name);
                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white rounded-3xl border border-gray-200/90 hover:border-emerald-500 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                  >
                    {/* Header */}
                    <div className="p-5 pb-3 border-b border-gray-100 bg-gradient-to-b from-gray-50/50 to-white">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-mono font-extrabold px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-950 uppercase tracking-wider">
                          {product.category}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-gray-400">
                          Dosage: {product.dosage}
                        </span>
                      </div>

                      <h3 className="text-xl font-black text-[#072414] group-hover:text-emerald-900 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs font-mono font-medium text-emerald-800 line-clamp-1 mt-0.5">
                        {product.inci}
                      </p>
                    </div>

                    {/* Body */}
                    <div className="p-5 pt-3 space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-3">
                        <p className="text-xs text-gray-600 leading-relaxed font-normal">
                          {product.mainUse}
                        </p>

                        {/* Application tags */}
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider block">
                            Key Applications:
                          </span>
                          <div className="text-[11px] text-gray-700 font-medium line-clamp-2">
                            {product.application}
                          </div>
                        </div>

                        {/* Benefits list */}
                        {product.keyBenefits && product.keyBenefits.length > 0 && (
                          <div className="space-y-1 pt-1 border-t border-gray-100">
                            <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider block">
                              Sensory Advantages:
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {product.keyBenefits.slice(0, 3).map((b, i) => (
                                <span key={i} className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-950 text-[10px] font-semibold border border-emerald-200/60">
                                  {b}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Card Action Footer */}
                      <div className="pt-3 border-t border-gray-100 space-y-2">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => onSelectProduct(product)}
                            className="flex-1 py-2 px-3 rounded-xl bg-gray-100 hover:bg-[#072414] text-gray-900 hover:text-white font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                          >
                            <span>Inspect Specs</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => toggleSampleGrade(product.code || product.name)}
                            className={`p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                              isInSampleList
                                ? 'bg-emerald-600 text-white border-emerald-600'
                                : 'bg-white hover:bg-emerald-50 text-emerald-950 border-gray-300'
                            }`}
                            title={isInSampleList ? 'Remove from sample basket' : 'Add to sample basket'}
                          >
                            {isInSampleList ? <Check className="w-4 h-4" /> : <Package className="w-4 h-4 text-emerald-800" />}
                          </button>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1">
                          <span className="font-mono text-[10px]">Catalog Page {product.pdfPage}</span>
                          <button
                            onClick={() => onRequestSample(product)}
                            className="text-emerald-800 hover:text-emerald-950 font-bold underline cursor-pointer"
                          >
                            Order Single Sample &rarr;
                          </button>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* VIEW: TABLE MODE */}
          {viewMode === 'table' && (
            <div className="overflow-x-auto rounded-3xl border border-gray-200 bg-white shadow-2xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#072414] text-white font-mono uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3.5 px-4">Grade Code</th>
                    <th className="py-3.5 px-4">INCI Nomenclature</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-3">Dosage</th>
                    <th className="py-3.5 px-4">Primary Application Focus</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {filteredProducts.map((p) => {
                    const isInSampleList = quickSampleList.includes(p.code || p.name);
                    return (
                      <tr key={p.id} className="hover:bg-emerald-50/40 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-gray-950">
                          <div className="text-sm font-extrabold text-emerald-950">{p.name}</div>
                          <div className="text-[10px] text-gray-400">Page {p.pdfPage}</div>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-[11.5px] text-gray-800 font-medium max-w-xs">
                          {p.inci}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-950 font-mono text-[10.5px] font-bold border border-emerald-200">
                            {p.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 font-mono font-bold text-gray-900">{p.dosage}</td>
                        <td className="py-3.5 px-4 text-gray-600 max-w-sm line-clamp-2">
                          {p.application}
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-2 whitespace-nowrap">
                          <button
                            onClick={() => onSelectProduct(p)}
                            className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-[#072414] text-gray-900 hover:text-white font-bold text-[11px] transition-colors cursor-pointer"
                          >
                            Details
                          </button>
                          <button
                            onClick={() => toggleSampleGrade(p.code || p.name)}
                            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                              isInSampleList
                                ? 'bg-emerald-600 text-white'
                                : 'bg-emerald-100 text-emerald-950 hover:bg-emerald-200'
                            }`}
                          >
                            {isInSampleList ? 'Added' : '+ Sample'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* QUICK SAMPLE BASKET DOCK BAR */}
          {quickSampleList.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="sticky bottom-6 z-30 p-4 sm:p-5 rounded-2xl bg-[#072414] text-white shadow-2xl border border-emerald-500/50 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center space-x-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">
                  <Package className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-white">
                    Sample Basket ({quickSampleList.length} Grades Selected)
                  </h4>
                  <p className="text-xs text-emerald-200/80 line-clamp-1">
                    {quickSampleList.join(', ')}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setQuickSampleList([])}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  Clear All
                </button>
                <button
                  onClick={handleBulkSampleRequest}
                  className="px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Request All {quickSampleList.length} Samples</span>
                </button>
              </div>
            </motion.div>
          )}

        </div>
      </section>

      {/* =========================================================================
          7. FORMULATION LABORATORY: 4 TESTED COSMETIC RECIPES
          ========================================================================= */}
      <section id="formulations" className="py-16 sm:py-24 bg-white border-b border-gray-200/80">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 space-y-12">
          
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <FlaskConical className="w-3.5 h-3.5 text-emerald-700" />
              <span>Compounding Lab</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#072414] tracking-tight">
              Tested Formulation Blueprints
            </h2>
            <p className="text-sm text-gray-600">
              Real-world formulation frameworks demonstrating optimal compounding phases, incorporation temperatures, and synergy between SNS Silcos polymers.
            </p>
          </div>

          {/* Blueprint Navigation Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {FORMULATION_BLUEPRINTS.map((bp) => (
              <button
                key={bp.id}
                onClick={() => setActiveBlueprint(bp.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  activeBlueprint === bp.id
                    ? 'bg-[#072414] text-white border-[#072414] shadow-lg scale-[1.02]'
                    : 'bg-white hover:bg-emerald-50/50 text-gray-800 border-gray-200 hover:border-emerald-300'
                }`}
              >
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider block mb-1 ${activeBlueprint === bp.id ? 'text-emerald-300' : 'text-emerald-800'}`}>
                  {bp.category}
                </span>
                <h4 className="font-extrabold text-sm leading-snug">{bp.title}</h4>
                <div className={`text-[11px] mt-2 font-mono ${activeBlueprint === bp.id ? 'text-emerald-200/80' : 'text-gray-500'}`}>
                  Key: {bp.heroProduct}
                </div>
              </button>
            ))}
          </div>

          {/* Active Blueprint Deep Dive Card */}
          <div className="bg-[#fcfdfd] rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Concept & Sensory Profile */}
              <div className="lg:col-span-5 space-y-5">
                <div>
                  <span className="text-xs font-mono font-extrabold text-emerald-800 uppercase tracking-widest block mb-1">
                    {currentBlueprint.category}
                  </span>
                  <h3 className="text-2xl font-black text-[#072414]">
                    {currentBlueprint.title}
                  </h3>
                  <p className="text-xs text-gray-600 mt-2 italic font-medium">
                    "{currentBlueprint.tagline}"
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 space-y-2">
                  <h5 className="text-xs font-mono font-extrabold uppercase tracking-wider text-emerald-950 flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Sensory Transformation</span>
                  </h5>
                  <p className="text-xs text-emerald-900 leading-relaxed font-normal">
                    {currentBlueprint.sensoryDescription}
                  </p>
                </div>

                {/* Key Benefits */}
                <div className="space-y-2">
                  <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500">
                    Formulation Benchmarks:
                  </h5>
                  <div className="space-y-1.5">
                    {currentBlueprint.benefits.map((b, i) => (
                      <div key={i} className="flex items-center space-x-2 text-xs text-gray-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onOpenInquiry(`Formulation Support Request for: ${currentBlueprint.title}`)}
                  className="w-full py-3 px-4 rounded-xl bg-[#072414] hover:bg-[#0c4f26] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-xs flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <FlaskConical className="w-4 h-4 text-emerald-400" />
                  <span>Request Full Bench Method &amp; Samples</span>
                </button>
              </div>

              {/* Right Column: Compounding Phase Breakdown Table */}
              <div className="lg:col-span-7 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-gray-500">
                  <span>Compounding Architecture</span>
                  <span className="text-emerald-800">Total: 100.0% w/w</span>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-2xs">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-100/90 text-gray-700 font-mono uppercase text-[11px]">
                      <tr>
                        <th className="py-2.5 px-3">Phase</th>
                        <th className="py-2.5 px-4">Raw Material Grade</th>
                        <th className="py-2.5 px-3 font-mono">Weight %</th>
                        <th className="py-2.5 px-4">Functional Contribution</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {currentBlueprint.suggestedPhase.map((row, i) => (
                        <tr key={i} className="hover:bg-emerald-50/30 transition-colors">
                          <td className="py-2.5 px-3 font-mono font-bold text-emerald-950">{row.phase}</td>
                          <td className="py-2.5 px-4 font-bold text-gray-900">{row.ingredient}</td>
                          <td className="py-2.5 px-3 font-mono font-bold text-emerald-800">{row.pct}</td>
                          <td className="py-2.5 px-4 text-gray-600">{row.function}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="text-[11px] text-gray-400 italic">
                  *Formulation suggestions are starting guidelines. R&amp;D formulators should conduct stability and compatibility validation in their laboratory environment.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          8. QUALITY STANDARDS, WAREHOUSING & THE MINDTECH ALLIANCE
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-[#072414] to-[#04160c] text-white">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center space-x-2 text-xs font-mono font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-900/60 px-3 py-1 rounded-full border border-emerald-500/40">
                <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Mindtech Supply Chain Advantage</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Global Quality Standards, Warehoused at Bawana Hub
              </h2>
              <p className="text-sm text-emerald-100/80 leading-relaxed">
                As the authorized distribution partner for SNS Silcos, Mindtech Biotechnology provides formulators across India with direct access to certified specialty silicones, complete with batch-to-batch analytical traceability.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  { title: 'Full Certificate of Analysis (COA)', desc: 'Every drum shipment is backed by verified kinematic viscosity, refractive index, and volatile non-residue testing.' },
                  { title: 'Bawana Hub Ready Stocks', desc: 'Warehousing at Bawana Industrial Area, Delhi ensures immediate stock availability and rapid dispatch without import lead-time delays.' },
                  { title: 'Dedicated Technical Application Support', desc: 'Our cosmetic chemists assist with emulsification strategies, phase inversion guidance, and silicone-organic compatibility testing.' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-3 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block text-sm">{item.title}</strong>
                      <span className="text-emerald-100/70">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Card: Quick Technical Inquiry Form */}
            <div className="lg:col-span-6">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md space-y-5">
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-white">
                    Request Technical Dossier or Working Sample
                  </h3>
                  <p className="text-xs text-emerald-200/80">
                    Connect directly with Mindtech technical consultants for SNS Silcos specifications.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-mono font-bold text-emerald-200 block mb-1">
                      Target Silicone Grades (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. SNS SFL 45, SNS SEB 45, SNS SMR 16"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-xs focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono font-bold text-emerald-200 block mb-1">
                      Cosmetic Application / Project Scope
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Matte sunscreen primer, 2-in-1 shampoo, lip lacquer"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-xs focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <button
                    onClick={() => onOpenInquiry('SNS Silcos Comprehensive Dossier & Sample Request')}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 text-emerald-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Proceed to Technical Inquiry &rarr;</span>
                  </button>

                  <p className="text-[11px] text-emerald-200/60 text-center">
                    Sample requests are fulfilled through Mindtech Biotechnology Bawana hub.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          9. FOOTER BACK LINK
          ========================================================================= */}
      <div className="py-8 bg-[#031109] text-center border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200/60">
          <div>
            SNS Silcos is represented in India by <strong className="text-white">Mindtech Biotechnology</strong>.
          </div>
          <button
            onClick={() => onBackToOverview('portfolio')}
            className="text-emerald-400 hover:text-white font-bold flex items-center space-x-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Mindtech Biotechnology Global Partners</span>
          </button>
        </div>
      </div>

    </div>
  );
};
