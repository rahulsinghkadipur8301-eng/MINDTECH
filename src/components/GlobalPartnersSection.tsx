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
  Layers,
  ExternalLink
} from 'lucide-react';

interface GlobalPartnersProps {
  onOpenInquiry: (partnerName?: string) => void;
}

export const GlobalPartnersSection: React.FC<GlobalPartnersProps> = ({ onOpenInquiry }) => {
  return (
    <section id="partners" className="py-6 sm:py-8 bg-gradient-to-b from-gray-50/70 via-white to-gray-50/50 relative text-left overflow-hidden border-t border-gray-100">
      <div className="max-w-[1720px] mx-auto px-3.5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 sm:mb-4.5 gap-3 sm:gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-emerald-100/80 text-emerald-950 text-[13px] sm:text-[14px] font-bold uppercase tracking-wider mb-2">
              <Globe2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-800" />
              <span>Direct Manufacturing Alliances</span>
            </div>
            <h2 className="text-[26px] sm:text-[42px] md:text-[44px] font-extrabold text-[#072414] tracking-tight leading-tight">
              Global Manufacturing Partners
            </h2>
            <p className="mt-1.5 text-[16px] sm:text-[17.5px] text-gray-600 max-w-3xl font-normal leading-relaxed">
              Mindtech connects formulators across India directly to world-leading specialty chemical, oleochemical, silicone, and bio-ferment producers. Click any partner to visit their official global website.
            </p>
          </div>

          <div className="inline-flex items-center space-x-2 text-[13px] sm:text-[14.5px] font-semibold text-emerald-900 bg-emerald-50 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full border border-emerald-200/60 self-start md:self-auto shadow-2xs">
            <Award className="w-4 h-4 text-emerald-700" />
            <span>Direct Authorized Indian Distributor</span>
          </div>
        </div>

        {/* 4-Card Bento Grid for Principals with Clean Logo Presentation */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3.5 sm:gap-4">
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
              <div className="p-4.5 sm:p-5.5 border-b border-gray-100 bg-gradient-to-br from-gray-50/80 via-white to-emerald-50/20">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  
                  {/* Brand Logo Presentation Box - Clickable if websiteUrl exists */}
                  {partner.websiteUrl ? (
                    <a
                      href={partner.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white px-4 py-2.5 rounded-2xl border border-gray-200/80 shadow-2xs inline-flex items-center justify-center min-h-[58px] hover:border-emerald-500/70 hover:shadow-md transition-all group/logo relative cursor-pointer"
                      title={`Visit official ${partner.name} website (${partner.websiteUrl})`}
                    >
                      <PartnerLogoRenderer partnerId={partner.id} height={40} className="group-hover/logo:scale-105 transition-transform duration-300" />
                      <span className="absolute top-2 right-2 text-emerald-600 opacity-60 group-hover/logo:opacity-100 transition-opacity">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </span>
                    </a>
                  ) : (
                    <div className="bg-white px-4 py-2.5 rounded-2xl border border-gray-200/80 shadow-2xs inline-flex items-center justify-center min-h-[58px] group-hover:border-emerald-500/40 transition-colors">
                      <PartnerLogoRenderer partnerId={partner.id} height={40} className="group-hover:scale-105 transition-transform duration-300" />
                    </div>
                  )}

                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100/80 text-emerald-950 text-[11.5px] font-bold uppercase tracking-wider border border-emerald-200/60">
                      {partner.badge}
                    </span>
                    <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-[10.5px] font-semibold flex items-center space-x-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>Official Principal</span>
                    </span>
                  </div>
                </div>

                {/* Partner Name & Tagline */}
                <div className="mt-3">
                  <div className="flex items-center justify-between gap-2">
                    {partner.websiteUrl ? (
                      <a
                        href={partner.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1.5 text-xl font-extrabold text-[#072414] tracking-tight hover:text-emerald-700 transition-colors group/title"
                        title={`Visit ${partner.name} website`}
                      >
                        <span>{partner.name}</span>
                        <ExternalLink className="w-4 h-4 text-emerald-600 opacity-70 group-hover/title:opacity-100 group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 transition-all" />
                      </a>
                    ) : (
                      <h3 className="text-xl font-extrabold text-[#072414] tracking-tight">
                        {partner.name}
                      </h3>
                    )}

                    {partner.websiteLabel && (
                      <a
                        href={partner.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-mono text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200/80 transition-colors hidden sm:inline-flex items-center space-x-1"
                      >
                        <span>{partner.websiteLabel}</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                  <p className="text-[13px] text-emerald-700 font-semibold mt-0.5">
                    {partner.tagline}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-4.5 flex-1 flex flex-col justify-between space-y-3.5 text-left">
                
                <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed">
                  {partner.description}
                </p>

                {/* Product Portfolio Pills */}
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-1.5 text-[12px] font-bold text-gray-500 uppercase tracking-wider">
                    <Layers className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Product Portfolio</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {partner.categories.map((cat, cIdx) => (
                      <span
                        key={cIdx}
                        className="px-2.5 py-1 rounded-lg bg-gray-100/90 text-[12.5px] font-semibold text-gray-700 border border-gray-200/50"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Strengths */}
                <div className="space-y-1.5 pt-1 border-t border-gray-100">
                  <div className="flex items-center space-x-1.5 text-[12px] font-bold text-gray-500 uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Key Strengths</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {partner.keyStrengths.map((str, sIdx) => (
                      <div key={sIdx} className="flex items-center space-x-2 text-[13.5px] text-gray-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="font-medium leading-tight">{str}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Area with Website Redirect */}
                <div className="pt-2.5 border-t border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
                  {partner.websiteUrl ? (
                    <a
                      href={partner.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center space-x-2 text-[13.5px] font-bold text-white bg-emerald-800 hover:bg-emerald-900 px-4 py-2 rounded-xl shadow-xs hover:shadow-md transition-all group/btn cursor-pointer"
                      title={`Visit ${partner.name} website`}
                    >
                      <span>Visit Website</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>
                  ) : (
                    <span className="text-[12px] text-gray-400 font-medium py-1">
                      Direct Principal Network
                    </span>
                  )}

                  <button
                    onClick={() => onOpenInquiry(`${partner.name} - Sourcing Portfolio`)}
                    className="inline-flex items-center justify-center space-x-1.5 text-[13px] font-bold text-emerald-900 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 px-3.5 py-2 rounded-xl border border-emerald-200/70 transition-all cursor-pointer shadow-2xs"
                  >
                    <span>Inquire Portfolio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
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
