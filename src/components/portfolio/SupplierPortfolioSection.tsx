import React from 'react';
import { motion } from 'motion/react';
import { PartnerLogoRenderer } from '../PartnerLogos';
import { SupplierId } from '../../data/supplierProductsData';
import { 
  ArrowRight, 
  FlaskConical, 
  ShieldCheck, 
  Leaf, 
  Atom, 
  Sparkles, 
  Droplets,
  Layers,
  ChevronRight,
  ExternalLink,
  Globe
} from 'lucide-react';

interface SupplierPortfolioSectionProps {
  onSelectSupplier: (supplierId: SupplierId) => void;
  onOpenInquiry: (topic?: string) => void;
}

export const SupplierPortfolioSection: React.FC<SupplierPortfolioSectionProps> = ({
  onSelectSupplier,
  onOpenInquiry
}) => {
  return (
    <section 
      id="portfolio" 
      className="py-10 sm:py-16 bg-gradient-to-b from-[#f7fbf8] via-white to-[#f7fbf8] relative text-left overflow-hidden border-t border-gray-100"
    >
      {/* Restrained Scientific Visual Accents: Soft ambient glows and molecular aura */}
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-emerald-100/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10 space-y-8 sm:space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-4xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 text-emerald-950 text-xs sm:text-sm font-black uppercase tracking-wider border border-emerald-300/60 shadow-2xs">
              <FlaskConical className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-800" />
              <span>OUR GLOBAL PRODUCT PORTFOLIO</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#072414] tracking-tight leading-tight font-['Outfit']">
              Specialty Ingredients. Trusted Technology. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-600">
                Innovative Formulations.
              </span>
            </h2>

            <p className="mt-2 text-base sm:text-lg text-gray-700 leading-relaxed font-normal">
              Explore our portfolio of specialty ingredients and formulation solutions from our global partners, serving the personal care, cosmetic, and related industries.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start md:self-auto shrink-0">
            <button
              onClick={() => onSelectSupplier('general-range')}
              className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-emerald-950 bg-white hover:bg-emerald-50 px-4 py-2.5 rounded-full border border-gray-200/90 shadow-2xs transition-all cursor-pointer"
            >
              <Layers className="w-4 h-4 text-emerald-700" />
              <span>General Mindtech Range (p. 6–11)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3 Distinct Supplier Cards Grid - Balanced 3-Column Layout on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* =========================================================================
              CARD 1: GREENTECH BIOTECHNOLOGIES
             ========================================================================= */}
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
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[11px] font-mono font-extrabold text-emerald-800 uppercase tracking-widest block mb-1">
                  Bio-Actives &amp; Botanicals
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-gray-950 leading-tight">
                  GREENTECH BIOTECHNOLOGIES
                </h3>
              </div>
              <p className="text-xs sm:text-[13.5px] text-gray-600 leading-relaxed font-normal">
                Discover a diverse portfolio of biotechnology-inspired cosmetic actives, botanical extracts, skin-care solutions, and hair-care technologies.
              </p>

              {/* Category Labels */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-wider block">
                  Portfolio Categories:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Skin Care Actives',
                    'Anti-ageing',
                    'Hydration',
                    'Hair Care',
                    'Botanical & Natural Products'
                  ].map((label, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-950 border border-emerald-200/70"
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
                  <span>24 Categories (p. 12–22)</span>
                </span>
                <span className="font-mono text-emerald-800 font-bold">90+ Actives</span>
              </div>

              {/* Interactive Action Buttons */}
              <div className="pt-1 space-y-2">
                <div className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 group-hover:bg-[#072414] text-emerald-950 group-hover:text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-between shadow-2xs group-hover:shadow-md">
                  <span>Explore Greentech Products</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>

                <a
                  href="https://www.greentech.fr/en/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#FFFDF5] hover:bg-[#F3EFE0] border-2 border-emerald-300 hover:border-emerald-600 text-[#072414] font-black text-xs sm:text-[13px] tracking-wide flex items-center justify-center space-x-2 transition-all duration-200 shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 group/web cursor-pointer"
                  title="Visit official Greentech website (https://www.greentech.fr/en/)"
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                  <span>Visit Official Website (greentech.fr)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-700 opacity-80 group-hover/web:opacity-100 group-hover/web:translate-x-0.5 group-hover/web:-translate-y-0.5 transition-all shrink-0" />
                </a>
              </div>

            </div>
          </motion.div>


          {/* =========================================================================
              CARD 2: SNS SILCOS
             ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: 0.08 }}
            onClick={() => onSelectSupplier('sns-silcos')}
            className="group relative bg-white rounded-3xl border border-blue-200/80 hover:border-blue-500 shadow-2xs hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer text-left"
          >
            {/* Clean Company Logo Showcase Header (No photo image, enlarged company logo) */}
            <div className="relative h-48 sm:h-52 bg-gradient-to-b from-blue-50/50 via-white to-blue-50/20 border-b border-blue-100/80 flex items-center justify-center p-6 overflow-hidden">
              <div className="relative z-10 flex items-center justify-center w-full max-w-[240px] transform group-hover:scale-110 transition-transform duration-300">
                <PartnerLogoRenderer partnerId="sns-silcos" height={70} className="drop-shadow-xs" />
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[11px] font-mono font-extrabold text-blue-800 uppercase tracking-widest block mb-1">
                  Specialty Fluids &amp; Elastomers
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-gray-950 leading-tight">
                  SNS SILCOS
                </h3>
              </div>
              <p className="text-xs sm:text-[13.5px] text-gray-600 leading-relaxed font-normal">
                Explore silicone-based specialty materials and formulation solutions for skin care, hair care, sun care, and colour cosmetics.
              </p>

              {/* Category Labels */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-wider block">
                  Portfolio Categories:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Silicone Fluids',
                    'Functional Silicones',
                    'Hair Care',
                    'Skin Care',
                    'Colour Cosmetics'
                  ].map((label, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-950 border border-blue-200/70"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features & Catalog Source */}
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center space-x-1">
                  <Atom className="w-3.5 h-3.5 text-blue-600" />
                  <span>Codes SFL 45 to SCB 21 (p. 5)</span>
                </span>
                <span className="font-mono text-blue-800 font-bold">14 Specialties</span>
              </div>

              {/* Interactive Action Button */}
              <div className="pt-1">
                <div className="w-full py-2.5 px-4 rounded-xl bg-blue-50 group-hover:bg-blue-950 text-blue-950 group-hover:text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-between shadow-2xs group-hover:shadow-md">
                  <span>Explore SNS Silcos Products</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

            </div>
          </motion.div>


          {/* =========================================================================
              CARD 3: VVF LIMITED & FINE ORGANICS
             ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: 0.16 }}
            onClick={() => onSelectSupplier('vvf-fine-organics')}
            className="group relative bg-white rounded-3xl border border-teal-200/80 hover:border-teal-500 shadow-2xs hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer text-left md:col-span-2 lg:col-span-1"
          >
            {/* Clean Company Logo Showcase Header (No photo image, enlarged company logos) */}
            <div className="relative h-48 sm:h-52 bg-gradient-to-b from-teal-50/50 via-white to-teal-50/20 border-b border-teal-100/80 flex items-center justify-center p-6 overflow-hidden">
              <div className="relative z-10 flex items-center justify-center space-x-4 w-full max-w-[280px] transform group-hover:scale-110 transition-transform duration-300">
                <PartnerLogoRenderer partnerId="vvf-limited" height={54} className="drop-shadow-xs" />
                <span className="text-gray-300 font-bold text-lg">|</span>
                <PartnerLogoRenderer partnerId="fine-organics" height={54} className="drop-shadow-xs" />
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[11px] font-mono font-extrabold text-teal-800 uppercase tracking-widest block mb-1">
                  Oleochemicals &amp; Specialty Esters
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-gray-950 leading-tight">
                  VVF LIMITED &amp; FINE ORGANICS
                </h3>
              </div>
              <p className="text-xs sm:text-[13.5px] text-gray-600 leading-relaxed font-normal">
                Explore specialty chemical and functional ingredient portfolios across emollients, surfactants, specialty fluids, and related formulation applications.
              </p>

              {/* Category Labels */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-wider block">
                  Portfolio Categories:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Surfactants',
                    'Emollients',
                    'Specialty Chemicals',
                    'Oleochemicals',
                    'Functional Ingredients',
                    'Eco-friendly Ingredients'
                  ].map((label, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-teal-50 text-teal-950 border border-teal-200/70"
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
                  <span>Documented Portfolio (p. 23)</span>
                </span>
                <span className="font-mono text-teal-800 font-bold">Dual Leaders</span>
              </div>

              {/* Interactive Action Button */}
              <div className="pt-1">
                <div className="w-full py-2.5 px-4 rounded-xl bg-teal-50 group-hover:bg-[#072414] text-teal-950 group-hover:text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-between shadow-2xs group-hover:shadow-md">
                  <span>Explore VVF & Fine Organics</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

            </div>
          </motion.div>

        </div>

        {/* 5. General Mindtech Range Full-Width Discovery Banner */}
        <div 
          onClick={() => onSelectSupplier('general-range')}
          className="relative rounded-3xl bg-gradient-to-r from-[#072414] via-[#0b3820] to-[#041c10] text-white p-6 sm:p-8 shadow-lg border border-emerald-500/25 overflow-hidden cursor-pointer group transition-all hover:shadow-2xl hover:border-emerald-400"
        >
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-emerald-500/10 to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 font-mono text-xs font-bold uppercase tracking-wider border border-emerald-400/30">
                  MINDTECH CENTRAL CATALOGUE • PAGES 6–11
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                General Mindtech Product Range
              </h3>

              <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
                Essential cosmetic raw materials including high-potency skin lighteners (Alpha/Beta Arbutin, Kojic Acid, EAA), ceramides, carbomers, glucosides, SCI, polyquaterniums, UV filters, and preservatives.
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  'Skin Lighteners',
                  'Ceramides & Actives',
                  'Moisturizers & Soothing',
                  'Rheology Modifiers',
                  'Sulfate-Free Cleansers',
                  'Conditioning Agents',
                  'UV Filters',
                  'Preservatives'
                ].map((item, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-white/10 text-emerald-200 border border-white/10"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="shrink-0 flex items-center">
              <div className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-emerald-500 group-hover:bg-emerald-400 text-emerald-950 font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md group-hover:scale-105">
                <span>Browse General Range (24 Verified Items)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
