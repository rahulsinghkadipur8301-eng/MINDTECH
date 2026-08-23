import React from 'react';
import { motion } from 'motion/react';
import { GLOBAL_PARTNERS } from '../data/companyData';
import { PartnerLogoRenderer } from './PartnerLogos';
import { 
  Globe2, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Award,
  Sparkles,
  Layers
} from 'lucide-react';

interface GlobalPartnersProps {
  onOpenInquiry: (partnerName?: string) => void;
}

export const GlobalPartnersSection: React.FC<GlobalPartnersProps> = ({ onOpenInquiry }) => {
  return (
    <section id="partners" className="py-14 sm:py-20 bg-gradient-to-b from-gray-50/70 via-white to-gray-50/50 relative text-left overflow-hidden border-t border-gray-100">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-950 text-xs sm:text-sm font-bold uppercase tracking-wider mb-2.5">
              <Globe2 className="w-4 h-4 text-emerald-800" />
              <span>Direct Manufacturing Alliances</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#072414] tracking-tight">
              Global Manufacturing Partners
            </h2>
            <p className="mt-2 text-base text-gray-600 max-w-3xl font-normal">
              Mindtech connects formulators across India directly to world-leading specialty chemical, oleochemical, silicone, and bio-ferment producers.
            </p>
          </div>

          <div className="inline-flex items-center space-x-2 text-xs sm:text-sm font-semibold text-emerald-900 bg-emerald-50 px-4 py-2.5 rounded-full border border-emerald-200/60 self-start md:self-auto shadow-2xs">
            <Award className="w-4 h-4 text-emerald-700" />
            <span>Direct Authorized Indian Distributor</span>
          </div>
        </div>

        {/* 4-Card Bento Grid for Principals with Clean Logo Presentation */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {GLOBAL_PARTNERS.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-3xl border border-gray-200 shadow-2xs hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300 overflow-hidden flex flex-col group"
            >
              {/* Partner Official Logo Header Area (Clean, Image-Free Corporate Plaque) */}
              <div className="p-6 sm:p-7 border-b border-gray-100 bg-gradient-to-br from-gray-50/80 via-white to-emerald-50/20">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  
                  {/* Brand Logo Presentation Box */}
                  <div className="bg-white px-5 py-3 rounded-2xl border border-gray-200/80 shadow-2xs inline-flex items-center justify-center min-h-[64px] group-hover:border-emerald-500/40 transition-colors">
                    <PartnerLogoRenderer partnerId={partner.id} height={44} className="group-hover:scale-105 transition-transform duration-300" />
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-950 text-[11px] font-bold uppercase tracking-wider border border-emerald-200/60">
                      {partner.badge}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-[10px] font-semibold flex items-center space-x-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>Official Principal</span>
                    </span>
                  </div>
                </div>

                {/* Partner Name & Tagline */}
                <div className="mt-4">
                  <h3 className="text-xl font-extrabold text-[#072414] tracking-tight group-hover:text-emerald-800 transition-colors">
                    {partner.name}
                  </h3>
                  <p className="text-xs text-emerald-700 font-semibold mt-0.5">
                    {partner.tagline}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5 text-left">
                
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {partner.description}
                </p>

                {/* Product Portfolio Pills */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-1.5 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    <Layers className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Product Portfolio</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {partner.categories.map((cat, cIdx) => (
                      <span
                        key={cIdx}
                        className="px-3 py-1 rounded-lg bg-gray-100/90 text-[11px] font-semibold text-gray-700 border border-gray-200/50"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Strengths */}
                <div className="space-y-2 pt-1 border-t border-gray-100">
                  <div className="flex items-center space-x-1.5 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Key Strengths</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {partner.keyStrengths.map((str, sIdx) => (
                      <div key={sIdx} className="flex items-center space-x-2 text-xs text-gray-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="font-medium leading-tight">{str}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <button
                    onClick={() => onOpenInquiry(`${partner.name} - Sourcing Portfolio`)}
                    className="inline-flex items-center space-x-2 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-xl border border-emerald-200/70 transition-all cursor-pointer shadow-2xs"
                  >
                    <span>Inquire {partner.name} Portfolio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <span className="text-[11px] text-gray-400 font-medium">Direct Sourced</span>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Alliance Banner */}
        <div className="mt-10 p-6 rounded-3xl bg-[#072414] text-white flex flex-col md:flex-row items-center justify-between gap-4 border border-emerald-900/50 shadow-md">
          <div className="text-center md:text-left">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
              ONE VISION. MULTIPLE STRENGTHS.
            </div>
            <div className="text-sm font-semibold text-emerald-100 mt-1">
              Empowering Your Formulations with Direct Global Principal Backing
            </div>
          </div>
          <button
            onClick={() => onOpenInquiry("Direct Global Manufacturing Sourcing")}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-[#072414] text-xs font-extrabold shadow-md transition-all whitespace-nowrap cursor-pointer"
          >
            Request Principal Sourcing List
          </button>
        </div>

      </div>
    </section>
  );
};
