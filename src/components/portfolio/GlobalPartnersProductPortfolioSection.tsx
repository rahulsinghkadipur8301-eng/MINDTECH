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
  ExternalLink, 
  Sparkles, 
  Layers, 
  ChevronRight,
  Package,
  Droplets,
  Globe,
  X
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
                1. GREENTECH BIOTECHNOLOGIES
               ----------------------------------------------------------------------- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4 }}
              onClick={() => onSelectSupplier('greentech')}
              className="group relative bg-white rounded-3xl border border-emerald-200/80 hover:border-emerald-500 shadow-2xs hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer text-left"
            >
              {/* Clean Company Logo Showcase Header (No photo image, enlarged company logo) */}
              <div className="relative h-48 sm:h-52 bg-gradient-to-b from-emerald-50/50 via-white to-emerald-50/20 border-b border-emerald-100/80 flex items-center justify-center p-6 overflow-hidden">
                <div className="relative z-10 flex items-center justify-center w-full max-w-[240px] transform group-hover:scale-110 transition-transform duration-300">
                  <PartnerLogoRenderer partnerId="greentech" height={70} className="drop-shadow-xs" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[11px] font-mono font-extrabold text-emerald-800 uppercase tracking-widest block mb-1">
                    Bio-Actives &amp; Botanicals
                  </span>
                  <h4 className="text-xl sm:text-[22px] font-black text-gray-950 leading-tight">
                    GREENTECH BIOTECHNOLOGIES
                  </h4>
                </div>

                <p className="text-xs sm:text-[13.5px] text-gray-600 leading-relaxed font-normal">
                  Biotechnology-inspired cosmetic actives and botanical solutions for skin-care, hair-care and related applications.
                </p>

                {/* Category Labels */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-wider block">
                    Product Families:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {[
                      'Skin Care Actives',
                      'Anti-ageing',
                      'Hydration',
                      'Hair Care',
                      'Botanicals'
                    ].map((label, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-950 border border-emerald-200/70"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features & Catalog Source */}
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Catalog Pages 12–22</span>
                  </span>
                  <span className="font-mono text-emerald-800 font-bold">{greentechCount} Documented Actives</span>
                </div>

                {/* Interactive Action Buttons */}
                <div className="pt-1 space-y-2">
                  <div className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 group-hover:bg-[#072414] text-emerald-950 group-hover:text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-between shadow-2xs group-hover:shadow-md">
                    <span>Explore Bio-Actives &amp; Botanicals Portfolio</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>

                  <a
                    href="https://www.greentech.fr/en/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#FFFDF5] hover:bg-[#F3EFE0] border-2 border-emerald-300 hover:border-emerald-600 text-[#072414] font-black text-xs sm:text-[13px] tracking-wide flex items-center justify-center space-x-2 transition-all duration-200 shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 group/web cursor-pointer"
                    title="Visit official Greentech website (greentech.fr)"
                  >
                    <Globe className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                    <span>Visit Official Website (greentech.fr)</span>
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-700 opacity-80 group-hover/web:opacity-100 group-hover/web:translate-x-0.5 group-hover/web:-translate-y-0.5 transition-all shrink-0" />
                  </a>
                </div>
              </div>
            </motion.div>


            {/* -----------------------------------------------------------------------
                2. SNS SILCOS
               ----------------------------------------------------------------------- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: 0.08 }}
              onClick={() => onSelectSupplier('sns-silcos')}
              className="group relative bg-white rounded-3xl border border-emerald-200/80 hover:border-emerald-500 shadow-2xs hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer text-left"
            >
              {/* Clean Company Logo Showcase Header (No photo image, enlarged company logo) */}
              <div className="relative h-48 sm:h-52 bg-gradient-to-b from-emerald-50/50 via-white to-emerald-50/20 border-b border-emerald-100/80 flex items-center justify-center p-6 overflow-hidden">
                <div className="relative z-10 flex items-center justify-center w-full max-w-[240px] transform group-hover:scale-110 transition-transform duration-300">
                  <PartnerLogoRenderer partnerId="sns-silcos" height={70} className="drop-shadow-xs" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[11px] font-mono font-extrabold text-emerald-800 uppercase tracking-widest block mb-1">
                    Sensory Silicones &amp; Fluids
                  </span>
                  <h4 className="text-xl sm:text-[22px] font-black text-gray-950 leading-tight">
                    SNS SILCOS
                  </h4>
                </div>

                <p className="text-xs sm:text-[13.5px] text-gray-600 leading-relaxed font-normal">
                  Specialty silicone materials and formulation-focused solutions for cosmetic applications.
                </p>

                {/* Category Labels */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-wider block">
                    Product Families:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {[
                      'Silicone Fluids',
                      'Functional Silicones',
                      'Emulsions',
                      'Elastomer Gels'
                    ].map((label, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-950 border border-emerald-200/70"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features & Catalog Source */}
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Atom className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Catalog Page 5</span>
                  </span>
                  <span className="font-mono text-emerald-800 font-bold">{snsCount} Verified Specialties</span>
                </div>

                {/* Interactive Action Buttons */}
                <div className="pt-1 space-y-2">
                  <div className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 group-hover:bg-[#072414] text-emerald-950 group-hover:text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-between shadow-2xs group-hover:shadow-md">
                    <span>Explore Silicone &amp; Sensory Fluids Portfolio</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectSupplier('sns-silcos');
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#FFFDF5] hover:bg-[#F3EFE0] border-2 border-emerald-300 hover:border-emerald-600 text-[#072414] font-black text-xs sm:text-[13px] tracking-wide flex items-center justify-center space-x-2 transition-all duration-200 shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 group/web cursor-pointer"
                    title="Open dedicated SNS Silcos Partner Microsite"
                  >
                    <Globe className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                    <span>Open SNS Silcos Microsite &rarr;</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-700 opacity-80 group-hover/web:opacity-100 group-hover/web:translate-x-0.5 transition-all shrink-0" />
                  </button>
                </div>
              </div>
            </motion.div>


            {/* -----------------------------------------------------------------------
                3. FINE ORGANICS
               ----------------------------------------------------------------------- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: 0.16 }}
              onClick={() => onSelectSupplier('fine-organics')}
              className="group relative bg-white rounded-3xl border border-emerald-200/80 hover:border-emerald-500 shadow-2xs hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer text-left"
            >
              {/* Clean Company Logo Showcase Header (No photo image, enlarged company logo) */}
              <div className="relative h-48 sm:h-52 bg-gradient-to-b from-emerald-50/50 via-white to-emerald-50/20 border-b border-emerald-100/80 flex items-center justify-center p-6 overflow-hidden">
                <div className="relative z-10 flex items-center justify-center w-full max-w-[240px] transform group-hover:scale-110 transition-transform duration-300">
                  <PartnerLogoRenderer partnerId="fine-organics" height={70} className="drop-shadow-xs" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[11px] font-mono font-extrabold text-emerald-800 uppercase tracking-widest block mb-1">
                    Specialty Esters &amp; Fluids
                  </span>
                  <h4 className="text-xl sm:text-[22px] font-black text-gray-950 leading-tight">
                    FINE ORGANICS
                  </h4>
                </div>

                <p className="text-xs sm:text-[13.5px] text-gray-600 leading-relaxed font-normal">
                  Specialty additives and oleochemical-derived ingredients for a range of industrial and personal-care applications.
                </p>

                {/* Category Labels */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-wider block">
                    Product Families:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {[
                      'Emollient Esters',
                      'Specialty Fluids',
                      'Functional Ingredients',
                      'Eco-friendly'
                    ].map((label, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-950 border border-emerald-200/70"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features & Catalog Source */}
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Catalog Page 23</span>
                  </span>
                  <span className="font-mono text-emerald-800 font-bold">4 Documented Families</span>
                </div>

                {/* Interactive Action Buttons */}
                <div className="pt-1 space-y-2">
                  <div className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 group-hover:bg-[#072414] text-emerald-950 group-hover:text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-between shadow-2xs group-hover:shadow-md">
                    <span>Explore Specialty Esters &amp; Additives Portfolio</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>

                  <a
                    href="https://www.fineorganics.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#FFFDF5] hover:bg-[#F3EFE0] border-2 border-emerald-300 hover:border-emerald-600 text-[#072414] font-black text-xs sm:text-[13px] tracking-wide flex items-center justify-center space-x-2 transition-all duration-200 shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 group/web cursor-pointer"
                    title="Visit official Fine Organics website (fineorganics.com)"
                  >
                    <Globe className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                    <span>Visit Official Website (fineorganics.com)</span>
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-700 opacity-80 group-hover/web:opacity-100 group-hover/web:translate-x-0.5 group-hover/web:-translate-y-0.5 transition-all shrink-0" />
                  </a>
                </div>
              </div>
            </motion.div>


            {/* -----------------------------------------------------------------------
                4. VVF LIMITED
               ----------------------------------------------------------------------- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: 0.24 }}
              onClick={() => onSelectSupplier('vvf-limited')}
              className="group relative bg-white rounded-3xl border border-teal-200/80 hover:border-teal-500 shadow-2xs hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer text-left"
            >
              {/* Clean Company Logo Showcase Header (No photo image, enlarged company logo) */}
              <div className="relative h-48 sm:h-52 bg-gradient-to-b from-teal-50/50 via-white to-teal-50/20 border-b border-teal-100/80 flex items-center justify-center p-6 overflow-hidden">
                <div className="relative z-10 flex items-center justify-center w-full max-w-[240px] transform group-hover:scale-110 transition-transform duration-300">
                  <PartnerLogoRenderer partnerId="vvf-limited" height={70} className="drop-shadow-xs" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[11px] font-mono font-extrabold text-teal-800 uppercase tracking-widest block mb-1">
                    Surfactants &amp; Oleochemicals
                  </span>
                  <h4 className="text-xl sm:text-[22px] font-black text-gray-950 leading-tight">
                    VVF LIMITED
                  </h4>
                </div>

                <p className="text-xs sm:text-[13.5px] text-gray-600 leading-relaxed font-normal">
                  Specialty oleochemicals and personal-care-related materials, including supported fatty acid, fatty alcohol and glycerine product families.
                </p>

                {/* Category Labels */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-wider block">
                    Product Families:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {[
                      'Surfactants',
                      'Emollients',
                      'Specialty Chemicals',
                      'Oleochemicals'
                    ].map((label, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-teal-50 text-teal-950 border border-teal-200/70"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features & Catalog Source */}
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                    <span>Catalog Page 23</span>
                  </span>
                  <span className="font-mono text-teal-800 font-bold">4 Documented Families</span>
                </div>

                {/* Interactive Action Buttons */}
                <div className="pt-1 space-y-2">
                  <div className="w-full py-2.5 px-4 rounded-xl bg-teal-50 group-hover:bg-[#072414] text-teal-950 group-hover:text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-between shadow-2xs group-hover:shadow-md">
                    <span>Explore Surfactants &amp; Oleochemicals Portfolio</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>

                  <a
                    href="https://vvfltd.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#FFFDF5] hover:bg-[#F3EFE0] border-2 border-teal-300 hover:border-teal-600 text-[#072414] font-black text-xs sm:text-[13px] tracking-wide flex items-center justify-center space-x-2 transition-all duration-200 shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 group/web cursor-pointer"
                    title="Visit official VVF Limited website (vvfltd.com)"
                  >
                    <Globe className="w-3.5 h-3.5 text-teal-800 shrink-0" />
                    <span>Visit Official Website (vvfltd.com)</span>
                    <ExternalLink className="w-3.5 h-3.5 text-teal-700 opacity-80 group-hover/web:opacity-100 group-hover/web:translate-x-0.5 group-hover/web:-translate-y-0.5 transition-all shrink-0" />
                  </a>
                </div>
              </div>
            </motion.div>

          </div>
        </div>


        {/* =========================================================================
            C. ICONIC CATALOGUE LAUNCHER (ICON & SHIFT TO NEXT PAGE)
               Instead of cluttering the homepage with a massive 90-card list,
               this high-impact portal uses icons for each category and shifts
               all product discovery onto the dedicated catalogue page.
           ========================================================================= */}
        <div className="pt-2">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#062916] via-[#0b4324] to-[#041a0d] p-6 sm:p-8 lg:p-10 shadow-xl border border-emerald-500/25 text-white">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              
              {/* Left Column: Icons & Explanatory Text */}
              <div className="space-y-4 max-w-3xl text-left">
                {/* Category Icon Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-emerald-200">
                    <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Bio-Actives ({greentechCount})</span>
                  </div>
                  <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-blue-200">
                    <Atom className="w-3.5 h-3.5 text-blue-400" />
                    <span>Silicones ({snsCount})</span>
                  </div>
                  <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-emerald-200">
                    <FlaskConical className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Specialty Esters (4 Fam.)</span>
                  </div>
                  <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-teal-200">
                    <Droplets className="w-3.5 h-3.5 text-teal-400" />
                    <span>Oleochemicals (4 Fam.)</span>
                  </div>
                  <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-amber-200">
                    <Layers className="w-3.5 h-3.5 text-amber-400" />
                    <span>General Range ({generalCount})</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-300">
                    INTERACTIVE TECHNICAL CATALOGUE &amp; SPECIFICATIONS
                  </span>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                    Explore All {totalVerifiedCount}+ Chemical &amp; Cosmetic Ingredients
                  </h3>
                  <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
                    Full technical datasheets, INCI names, product codes, recommended dosage ranges, formulation applications, and sample request workflows are organized in a dedicated full-screen catalogue interface.
                  </p>
                </div>

                {/* Verified Specs Bar */}
                <div className="pt-1 flex flex-wrap gap-4 text-xs font-mono text-emerald-300/90">
                  <span className="flex items-center space-x-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>100% CoA &amp; TDS Traceability</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>Real-Time Multi-Dimensional Filter</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Package className="w-4 h-4 text-emerald-400" />
                    <span>Fast Sample Dispatch</span>
                  </span>
                </div>
              </div>

              {/* Right Column: Prominent Launcher Button */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
                <button
                  onClick={() => onSelectSupplier('all-products')}
                  className="px-8 py-4 rounded-2xl bg-white hover:bg-emerald-50 text-[#072414] font-black text-sm uppercase tracking-wider transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 flex items-center justify-center space-x-3 cursor-pointer group"
                >
                  <Package className="w-5 h-5 text-emerald-800" />
                  <span>Launch Interactive Product Catalogue</span>
                  <ArrowRight className="w-5 h-5 text-emerald-800 group-hover:translate-x-1.5 transition-transform" />
                </button>

                <button
                  onClick={() => onSelectSupplier('general-range')}
                  className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/20 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Layers className="w-4 h-4 text-emerald-300" />
                  <span>Mindtech General Range ({generalCount} Items)</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
