import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { PartnerLogoRenderer } from '../PartnerLogos';
import { 
  SupplierId, 
  ProductItem, 
  ALL_PRODUCTS, 
  SUPPLIER_PROFILES
} from '../../data/supplierProductsData';
import { 
  ArrowRight, 
  FlaskConical, 
  Leaf, 
  Atom, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  ChevronRight,
  Package,
  Droplets,
  X,
  Play
} from 'lucide-react';

interface GlobalPartnersProductPortfolioSectionProps {
  onSelectSupplier: (supplierId: SupplierId) => void;
  onSelectProduct: (product: ProductItem) => void;
  onRequestSample: (product: ProductItem) => void;
  onRequestQuote: (product: ProductItem) => void;
  onOpenInquiry: (topic?: string) => void;
  onRemoveSection?: () => void;
}

export const GlobalPartnersProductPortfolioSection: React.FC<GlobalPartnersProductPortfolioSectionProps> = ({
  onSelectSupplier,
  onOpenInquiry,
  onRemoveSection
}) => {
  // Supplier product counts calculated strictly from verified dataset
  const greentechCount = useMemo(() => ALL_PRODUCTS.filter(p => p.supplierId === 'greentech').length, []);
  const snsCount = useMemo(() => ALL_PRODUCTS.filter(p => p.supplierId === 'sns-silcos').length, []);
  const fineCount = useMemo(() => ALL_PRODUCTS.filter(p => p.supplierId === 'fine-organics').length, []);
  const vvfCount = useMemo(() => ALL_PRODUCTS.filter(p => p.supplierId === 'vvf-limited').length, []);
  const generalCount = useMemo(() => ALL_PRODUCTS.filter(p => p.supplierId === 'general-range').length, []);
  const totalVerifiedCount = ALL_PRODUCTS.length;

  return (
    <section 
      id="portfolio" 
      className="py-12 sm:py-16 bg-gradient-to-b from-[#f7fbf8] via-white to-[#f7fbf8] relative text-left overflow-hidden border-t border-gray-100"
    >
      {/* Anchor for any legacy #partners links */}
      <span id="partners" className="absolute -top-24" />

      {/* Subtle scientific ambient glowing aura */}
      <div className="absolute top-1/6 left-8 w-96 h-96 bg-emerald-100/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-8 w-[450px] h-[450px] bg-teal-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10 space-y-10 sm:space-y-12">
        
        {/* =========================================================================
            A. CINEMATIC SECTION INTRODUCTION WITH ACTION & HIDE CONTROLS
           ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-4 border-b border-gray-200/70">
          <div className="space-y-3 max-w-4xl">
            {/* Eyebrow Label */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 text-emerald-950 text-xs sm:text-sm font-black uppercase tracking-wider border border-emerald-300/60 shadow-2xs">
              <FlaskConical className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-800" />
              <span>GLOBAL NETWORK · SPECIALTY INGREDIENTS</span>
            </div>

            {/* Parent Section Title & Main Heading */}
            <div>
              <span className="text-xs sm:text-sm font-mono font-extrabold uppercase tracking-widest text-emerald-800 block mb-1">
                OUR GLOBAL PARTNERS &amp; PRODUCT PORTFOLIO
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#072414] tracking-tight leading-tight font-['Outfit']">
                Global Expertise.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-600">
                  Curated Product Solutions.
                </span>
              </h2>
            </div>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal max-w-3xl">
              Discover specialty ingredients, silicone technologies, oleochemicals and biotechnology-based cosmetic actives through Mindtech’s supplier network.
            </p>
          </div>

          {/* Action CTAs & Section Controls */}
          <div className="flex flex-wrap items-center gap-3 self-start lg:self-auto shrink-0">
            {/* Primary Action: Shift detailed catalogue info to next page */}
            <button
              onClick={() => onSelectSupplier('all-products')}
              className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-white bg-[#072414] hover:bg-emerald-900 px-5 py-3 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer group"
            >
              <Package className="w-4 h-4 text-emerald-300" />
              <span>Explore Full Ingredient Catalogue</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onOpenInquiry('Sample Request - Global Portfolio')}
              className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-emerald-950 bg-white hover:bg-emerald-50 px-5 py-3 rounded-full border border-gray-200/90 shadow-2xs transition-all cursor-pointer"
            >
              <span>Request a Sample</span>
              <ChevronRight className="w-4 h-4 text-emerald-700" />
            </button>

            {/* Quick Remove / Hide Section Button */}
            {onRemoveSection && (
              <button
                onClick={onRemoveSection}
                title="Remove this section from homepage"
                aria-label="Remove this section from homepage"
                className="inline-flex items-center space-x-1.5 text-xs text-gray-400 hover:text-red-700 hover:bg-red-50 px-3 py-2.5 rounded-full border border-transparent hover:border-red-200 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Remove Section</span>
              </button>
            )}
          </div>
        </div>

        {/* =========================================================================
            B. FOUR DISTINCT SUPPLIER CARDS (Grid: Greentech, SNS Silcos, Fine Organics, VVF Limited)
               Each card features authentic logos, high-res visual, and directly navigates
               to its dedicated supplier page on the next page.
           ========================================================================= */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500">
                Direct Supplier Network
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#072414]">
                Global Manufacturing &amp; Product Partners
              </h3>
            </div>
            <span className="text-xs font-mono text-gray-500 hidden sm:inline-block">
              Click any card to explore dedicated supplier portfolio &amp; technical specs
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6">
            
            {/* -----------------------------------------------------------------------
                1. GREENTECH BIOTECHNOLOGIES (France)
               ----------------------------------------------------------------------- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4 }}
              onClick={() => onSelectSupplier('greentech')}
              className="group relative bg-white rounded-3xl border border-emerald-200/90 hover:border-emerald-500 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer text-left"
            >
              {/* Clean Company Logo Showcase Header */}
              <div className="relative h-44 sm:h-48 bg-gradient-to-b from-emerald-50/70 via-white to-emerald-50/30 border-b border-emerald-100 flex items-center justify-center p-5 overflow-hidden">
                <div className="relative z-10 flex items-center justify-center w-full max-w-[220px] transform group-hover:scale-105 transition-transform duration-300">
                  <PartnerLogoRenderer partnerId="greentech" height={68} className="drop-shadow-xs" />
                </div>
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-100/90 text-emerald-900 border border-emerald-300/80">
                    <Leaf className="w-3 h-3 text-emerald-700" />
                    <span>France · Biotech</span>
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[11px] font-mono font-extrabold text-emerald-800 uppercase tracking-widest block mb-1">
                    Bio-Actives, Microbiota &amp; Botanical Oils
                  </span>
                  <h4 className="text-xl sm:text-[22px] font-black text-gray-950 leading-tight">
                    GREENTECH BIOTECHNOLOGIES
                  </h4>
                  <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed font-normal mt-2">
                    French biotechnology-inspired cosmetic actives, cellular longevity modulators, and pure botanical oils.
                  </p>
                </div>

                {/* Sourced Metrics Badge */}
                <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200/80 flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-emerald-950 flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                    <span>92 Actives · 47 Oils &amp; Butters</span>
                  </span>
                  <span className="text-[11px] text-emerald-800 font-semibold">136 Pages / 5 Guides</span>
                </div>

                {/* Features & Catalog Source */}
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                    <span>COSMOS &amp; Ecocert Verified</span>
                  </span>
                  <span className="inline-flex items-center space-x-1 font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full font-bold text-[11px] border border-emerald-200/70">
                    <Play className="w-2.5 h-2.5 fill-current text-emerald-600" />
                    <span>HAIRILINE® Video</span>
                  </span>
                </div>

                {/* Interactive Action Button */}
                <div className="pt-1">
                  <div className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 group-hover:bg-[#072414] text-emerald-950 group-hover:text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-between shadow-2xs group-hover:shadow-md">
                    <span>Explore Greentech Portfolio</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>


            {/* -----------------------------------------------------------------------
                2. SNS SILCOS (Silicones & Sensory Technologies)
               ----------------------------------------------------------------------- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: 0.08 }}
              onClick={() => onSelectSupplier('sns-silcos')}
              className="group relative bg-white rounded-3xl border border-emerald-200/90 hover:border-emerald-500 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer text-left"
            >
              {/* Clean Company Logo Showcase Header */}
              <div className="relative h-44 sm:h-48 bg-gradient-to-b from-blue-50/60 via-white to-blue-50/20 border-b border-blue-100 flex items-center justify-center p-5 overflow-hidden">
                <div className="relative z-10 flex items-center justify-center w-full max-w-[220px] transform group-hover:scale-105 transition-transform duration-300">
                  <PartnerLogoRenderer partnerId="sns-silcos" height={68} className="drop-shadow-xs" />
                </div>
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-blue-100/90 text-blue-900 border border-blue-300/80">
                    <Atom className="w-3 h-3 text-blue-700" />
                    <span>Specialty Silicones</span>
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[11px] font-mono font-extrabold text-blue-800 uppercase tracking-widest block mb-1">
                    Silicone Fluids, Gels &amp; Film Formers
                  </span>
                  <h4 className="text-xl sm:text-[22px] font-black text-gray-950 leading-tight">
                    SNS SILCOS
                  </h4>
                  <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed font-normal mt-2">
                    Advanced silicone elastomer gels, volatile carrier fluids, MQ resins, and micro-emulsions for hair and cosmetics.
                  </p>
                </div>

                {/* Sourced Metrics Badge */}
                <div className="p-2.5 rounded-xl bg-blue-50/80 border border-blue-200/80 flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-blue-950 flex items-center space-x-1.5">
                    <Atom className="w-3.5 h-3.5 text-blue-700" />
                    <span>14 Catalogued Specialties</span>
                  </span>
                  <span className="text-[11px] text-blue-800 font-semibold">Mindtech 2026 Page 5</span>
                </div>

                {/* Features & Catalog Source */}
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span>Volatiles &amp; Crosspolymers</span>
                  </span>
                  <span className="font-mono text-blue-800 font-bold">{snsCount} Verified Grades</span>
                </div>

                {/* Interactive Action Button */}
                <div className="pt-1">
                  <div className="w-full py-2.5 px-4 rounded-xl bg-blue-50 group-hover:bg-[#072414] text-blue-950 group-hover:text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-between shadow-2xs group-hover:shadow-md">
                    <span>Explore SNS Silcos Portfolio</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>


            {/* -----------------------------------------------------------------------
                3. FINE ORGANICS (Specialty Esters & Natural Ingredients)
               ----------------------------------------------------------------------- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: 0.16 }}
              onClick={() => onSelectSupplier('fine-organics')}
              className="group relative bg-white rounded-3xl border border-emerald-200/90 hover:border-emerald-500 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer text-left"
            >
              {/* Clean Company Logo Showcase Header */}
              <div className="relative h-44 sm:h-48 bg-gradient-to-b from-emerald-50/70 via-white to-emerald-50/30 border-b border-emerald-100 flex items-center justify-center p-5 overflow-hidden">
                <div className="relative z-10 flex items-center justify-center w-full max-w-[220px] transform group-hover:scale-105 transition-transform duration-300">
                  <PartnerLogoRenderer partnerId="fine-organics" height={68} className="drop-shadow-xs" />
                </div>
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-100/90 text-emerald-900 border border-emerald-300/80">
                    <FlaskConical className="w-3 h-3 text-emerald-700" />
                    <span>Specialty Esters</span>
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[11px] font-mono font-extrabold text-emerald-800 uppercase tracking-widest block mb-1">
                    Specialty Esters, Emulsifiers &amp; Waxes
                  </span>
                  <h4 className="text-xl sm:text-[22px] font-black text-gray-950 leading-tight">
                    FINE ORGANICS
                  </h4>
                  <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed font-normal mt-2">
                    High-performance FinaGreen bio-solubilizers, Finester glyceryl and sorbitan esters, and VBrass structuring waxes.
                  </p>
                </div>

                {/* Sourced Metrics Badge */}
                <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200/80 flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-emerald-950 flex items-center space-x-1.5">
                    <FlaskConical className="w-3.5 h-3.5 text-emerald-700" />
                    <span>48 Sourced Products · 4 Families</span>
                  </span>
                  <span className="text-[11px] text-emerald-800 font-semibold">Mindtech 2026 Page 23</span>
                </div>

                {/* Features & Catalog Source */}
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Vegetable Oleochemical Esters</span>
                  </span>
                  <span className="font-mono text-emerald-800 font-bold">{fineCount} Verified Products</span>
                </div>

                {/* Interactive Action Button */}
                <div className="pt-1">
                  <div className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 group-hover:bg-[#072414] text-emerald-950 group-hover:text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-between shadow-2xs group-hover:shadow-md">
                    <span>Explore Fine Organics Portfolio</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>


            {/* -----------------------------------------------------------------------
                4. VVF LIMITED (Conditioning Agents & Syndet Formulations)
               ----------------------------------------------------------------------- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: 0.24 }}
              onClick={() => onSelectSupplier('vvf-limited')}
              className="group relative bg-white rounded-3xl border border-teal-200/90 hover:border-teal-500 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer text-left"
            >
              {/* Clean Company Logo Showcase Header */}
              <div className="relative h-44 sm:h-48 bg-gradient-to-b from-teal-50/70 via-white to-teal-50/30 border-b border-teal-100 flex items-center justify-center p-5 overflow-hidden">
                <div className="relative z-10 flex items-center justify-center w-full max-w-[220px] transform group-hover:scale-105 transition-transform duration-300">
                  <PartnerLogoRenderer partnerId="vvf-limited" height={68} className="drop-shadow-xs" />
                </div>
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-teal-100/90 text-teal-900 border border-teal-300/80">
                    <Droplets className="w-3 h-3 text-teal-700" />
                    <span>Surfactants &amp; Syndets</span>
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[11px] font-mono font-extrabold text-teal-800 uppercase tracking-widest block mb-1">
                    Conditioning Agents &amp; Syndet Cleansers
                  </span>
                  <h4 className="text-xl sm:text-[22px] font-black text-gray-950 leading-tight">
                    VVF LIMITED
                  </h4>
                  <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed font-normal mt-2">
                    Industry-leading VEGAROL cationic quats, Promisoft BTMS conditioning emulsifiers, and SCI syndet bases.
                  </p>
                </div>

                {/* Sourced Metrics Badge */}
                <div className="p-2.5 rounded-xl bg-teal-50/80 border border-teal-200/80 flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-teal-950 flex items-center space-x-1.5">
                    <Droplets className="w-3.5 h-3.5 text-teal-700" />
                    <span>7 Sourced Products · 100% Verified</span>
                  </span>
                  <span className="text-[11px] text-teal-800 font-semibold">Mindtech 2026 Page 14</span>
                </div>

                {/* Features & Catalog Source */}
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                    <span>Cationic Conditioning &amp; Syndets</span>
                  </span>
                  <span className="font-mono text-teal-800 font-bold">{vvfCount} Verified Grades</span>
                </div>

                {/* Interactive Action Button */}
                <div className="pt-1">
                  <div className="w-full py-2.5 px-4 rounded-xl bg-teal-50 group-hover:bg-[#072414] text-teal-950 group-hover:text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-between shadow-2xs group-hover:shadow-md">
                    <span>Explore VVF Limited Portfolio</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>



        {/* =========================================================================
            D. COMPLETE MULTI-SUPPLIER TECHNICAL PORTFOLIO LAUNCHPAD
           ========================================================================= */}
        <div className="pt-6 sm:pt-8" id="complete-multi-supplier-portfolio">
          
          {/* Header Card with Category Badges & Direct Launch Action */}
          <div className="bg-gradient-to-br from-white via-emerald-50/20 to-white rounded-3xl border border-gray-200/90 shadow-md p-6 sm:p-8 space-y-6 text-left">
            
            {/* Category Badges Row */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold font-mono">
                <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                <span>Bio-Actives ({greentechCount})</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-900 border border-blue-200 text-xs font-bold font-mono">
                <Atom className="w-3.5 h-3.5 text-blue-600" />
                <span>Silicones ({snsCount})</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-teal-50 text-teal-900 border border-teal-200 text-xs font-bold font-mono">
                <FlaskConical className="w-3.5 h-3.5 text-teal-600" />
                <span>Specialty Esters ({fineCount})</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold font-mono">
                <Droplets className="w-3.5 h-3.5 text-amber-600" />
                <span>Surfactants &amp; Syndets ({vvfCount})</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-gray-100 text-gray-800 border border-gray-200 text-xs font-bold font-mono">
                <Layers className="w-3.5 h-3.5 text-gray-600" />
                <span>General Range ({generalCount})</span>
              </span>
            </div>

            {/* Title, Description & Action Button Row */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-3xl">
                <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-emerald-800 block">
                  COMPLETE MULTI-SUPPLIER TECHNICAL PORTFOLIO
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#072414] tracking-tight">
                  Explore All {totalVerifiedCount}+ Verified Cosmetic &amp; Specialty Ingredients
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Access technical datasheets, INCI names, product codes, recommended dosage ranges, formulation applications, and instant bench sample requisitions across all international manufacturing partners.
                </p>
              </div>

              {/* Primary Interactive CTA Buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => onSelectSupplier('all-products')}
                  className="px-6 py-3.5 rounded-xl bg-[#072414] hover:bg-emerald-900 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg cursor-pointer"
                >
                  <span>Launch Full Technical Dossiers</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onOpenInquiry('Multi-Supplier Ingredient Requisition')}
                  className="px-6 py-3 rounded-xl bg-white hover:bg-gray-50 text-emerald-950 font-bold text-xs uppercase tracking-wider border border-emerald-300 transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Request Bench Samples</span>
                </button>
              </div>
            </div>

            {/* Quality & Traceability Trust Highlights */}
            <div className="pt-3 border-t border-gray-100 flex flex-wrap gap-4 sm:gap-6 text-xs font-mono text-emerald-900">
              <span className="flex items-center space-x-1.5 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>100% CoA &amp; TDS Traceability</span>
              </span>
              <span className="flex items-center space-x-1.5 font-bold">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span>Multi-Dimensional Search &amp; Filter</span>
              </span>
              <span className="flex items-center space-x-1.5 font-bold">
                <Package className="w-4 h-4 text-emerald-700" />
                <span>Direct WhatsApp Requisition to Ajay Patel</span>
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
