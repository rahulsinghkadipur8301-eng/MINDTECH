import React from 'react';
import { HeroVideoPlayer } from './HeroVideoPlayer';
import { COMPANY_DETAILS } from '../data/companyData';
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  FlaskConical,
  Building2,
  Clock,
  FileCheck
} from 'lucide-react';

interface HeroProps {
  onOpenInquiry: (category?: string) => void;
  onOpenExplorer?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenInquiry, onOpenExplorer }) => {
  const [copiedMsme, setCopiedMsme] = React.useState(false);

  const handleCopyMsme = () => {
    navigator.clipboard.writeText(COMPANY_DETAILS.regulatory.msmeNo);
    setCopiedMsme(true);
    setTimeout(() => setCopiedMsme(false), 2000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative bg-transparent text-gray-900 overflow-hidden flex items-center py-2 sm:py-3.5 lg:py-4"
    >
      <div className="max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 w-full relative z-10">
        
        {/* 2-Column Split: Core Narrative (Left) + Expanded Large Video Showcase Stage (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 xl:gap-8 items-center">
          
          {/* Left Column: Core Brand Narrative (5 cols) */}
          <div className="lg:col-span-5 xl:col-span-5 space-y-3.5 text-left">
            
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={handleCopyMsme}
                className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-teal-50/90 hover:bg-teal-100/90 border border-teal-200/90 text-teal-950 text-[13px] sm:text-[14px] font-semibold shadow-2xs transition-all cursor-pointer group"
                title="Click to copy MSME registration number"
              >
                <ShieldCheck className="w-4 h-4 text-teal-700 group-hover:scale-110 transition-transform" />
                <span>MSME Reg: {COMPANY_DETAILS.regulatory.msmeNo}</span>
                {copiedMsme && (
                  <span className="text-[11px] font-mono text-emerald-800 bg-emerald-200/90 px-2 py-0.5 rounded ml-1 transition-all">
                    Copied ✓
                  </span>
                )}
              </button>
            </div>

            {/* Main Headline */}
            <div className="space-y-2.5">
              <h1 className="text-[34px] sm:text-[42px] md:text-[48px] lg:text-[42px] xl:text-[50px] font-black text-[#072414] tracking-tight leading-[1.14] font-['Outfit']">
                Reliable Sourcing, Quality & <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-600">
                  Formulation Support
                </span>
              </h1>

              <p className="text-[18px] sm:text-[19.5px] text-gray-700 leading-relaxed font-normal">
                We combine international sourcing capabilities with responsive local support to deliver dependable ingredients for your formulation success.
              </p>

              {/* The 4 Core Capabilities */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <div className="flex items-start space-x-2.5 text-[14px] sm:text-[14.5px] text-gray-800 bg-emerald-50/70 p-3 rounded-2xl border border-emerald-200/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-[#072414] font-bold leading-snug">Global Ingredient Sourcing & Dependable Supply</span>
                </div>

                <div className="flex items-start space-x-2.5 text-[14px] sm:text-[14.5px] text-gray-800 bg-emerald-50/70 p-3 rounded-2xl border border-emerald-200/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-[#072414] font-bold leading-snug">Premium & Diverse Raw Material Portfolio</span>
                </div>

                <div className="flex items-start space-x-2.5 text-[14px] sm:text-[14.5px] text-gray-800 bg-emerald-50/70 p-3 rounded-2xl border border-emerald-200/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-[#072414] font-bold leading-snug">Quality & Compliance with Batch-Specific COA</span>
                </div>

                <div className="flex items-start space-x-2.5 text-[14px] sm:text-[14.5px] text-gray-800 bg-emerald-50/70 p-3 rounded-2xl border border-emerald-200/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-[#072414] font-bold leading-snug">Application & Formulation Guidance for Formulators</span>
                </div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1 w-full">
              {/* Explore Portfolio */}
              <button
                onClick={onOpenExplorer || (() => scrollToSection('industries'))}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-6 sm:px-8 py-3.5 rounded-2xl sm:rounded-full bg-[#072414] hover:bg-[#0c3c22] text-white font-black text-[13px] sm:text-[15px] xl:text-[16px] uppercase tracking-wider transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-[0.98] cursor-pointer text-center"
              >
                <span>Explore Ingredients & Specs</span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </button>

              {/* Request Sample / Sourcing */}
              <button
                onClick={() => onOpenInquiry('Commercial Sample & Formulation Inquiry')}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 sm:px-8 py-3.5 rounded-2xl sm:rounded-full bg-emerald-100/90 hover:bg-emerald-200 text-emerald-950 font-bold text-[13px] sm:text-[15px] xl:text-[16px] tracking-wider uppercase transition-all hover:scale-105 active:scale-[0.98] cursor-pointer border border-emerald-300 shadow-2xs"
              >
                <FlaskConical className="w-4 h-4 text-emerald-700" />
                <span>Request Sample</span>
              </button>
            </div>

            {/* Operational Meta Grid */}
            <div className="pt-2.5 border-t border-gray-200/80 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-[14px]">
              <div className="flex items-center space-x-2 text-gray-700">
                <Building2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <div>
                  <span className="font-bold text-[#072414] block">Bawana Hub</span>
                  <span className="text-[13px] text-gray-500">Central Logistics</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-gray-700">
                <Clock className="w-4 h-4 text-emerald-700 shrink-0" />
                <div>
                  <span className="font-bold text-[#072414] block">24-48 Hours</span>
                  <span className="text-[13px] text-gray-500">Dispatch TAT</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-gray-700">
                <FileCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <div>
                  <span className="font-bold text-[#072414] block">COA, TDS & MSDS</span>
                  <span className="text-[13px] text-gray-500">Full Compliance</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-gray-700">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <div>
                  <span className="font-bold text-[#072414] block">Direct Alliances</span>
                  <span className="text-[13px] text-gray-500">Global Principals</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Autoplaying Brand Video Stage Expanded (7 cols) */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-2.5">
            {/* The Expanded Autoplaying Video Player Component */}
            <HeroVideoPlayer />

            {/* Quick Operational Metrics Row under Video Stage */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-white rounded-2xl p-2.5 border border-gray-200 shadow-2xs">
                <span className="text-[12px] text-emerald-800 font-bold uppercase block">Bawana Hub</span>
                <span className="font-bold text-[#072414] text-[14px]">New Delhi</span>
              </div>
              <div className="bg-white rounded-2xl p-2.5 border border-gray-200 shadow-2xs">
                <span className="text-[12px] text-emerald-800 font-bold uppercase block">Testing Rigor</span>
                <span className="font-bold text-[#072414] text-[14px]">COA & TDS</span>
              </div>
              <div className="bg-white rounded-2xl p-2.5 border border-gray-200 shadow-2xs">
                <span className="text-[12px] text-emerald-800 font-bold uppercase block">Dispatch</span>
                <span className="font-bold text-[#072414] text-[14px]">24-48 Hours</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
