import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  INDUSTRY_SEGMENTS, 
  GLOBAL_PARTNERS, 
  COMPANY_DETAILS, 
  WHY_CHOOSE_US_PILLARS,
  FORMULATION_GALLERY 
} from '../data/companyData';
import { ImageWithFallback } from './ImageWithFallback';
import { ImageLightbox } from './ImageLightbox';
import { 
  Sparkles, 
  FlaskConical, 
  ShieldCheck, 
  Globe2, 
  Boxes, 
  Truck, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Maximize2, 
  Send, 
  FileText,
  Building2,
  Leaf,
  Layers,
  Search,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface ExecutiveHubProps {
  onOpenInquiry: (categoryOrPartner?: string) => void;
}

type TabType = 'sectors' | 'partners' | 'about' | 'advantage';

export const ExecutiveHub: React.FC<ExecutiveHubProps> = ({ onOpenInquiry }) => {
  const [activeTab, setActiveTab] = useState<TabType>('sectors');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<Array<{ src: string; title: string; category?: string; description?: string }>>([]);

  const openLightboxFor = (images: Array<{ src: string; title: string; category?: string; description?: string }>, index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const filteredSegments = selectedCategory === 'all' 
    ? INDUSTRY_SEGMENTS 
    : INDUSTRY_SEGMENTS.filter(s => s.id === selectedCategory);

  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe2 className="w-5 h-5 text-emerald-600" />;
      case 'Boxes': return <Boxes className="w-5 h-5 text-emerald-600" />;
      case 'Award': return <Award className="w-5 h-5 text-emerald-600" />;
      case 'FlaskConical': return <FlaskConical className="w-5 h-5 text-emerald-600" />;
      case 'Truck': return <Truck className="w-5 h-5 text-emerald-600" />;
      default: return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <section id="explore-hub" className="py-14 sm:py-18 bg-gray-50/60 relative text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-gray-200/80 pb-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-950 text-xs font-bold uppercase tracking-wider mb-2">
              <FlaskConical className="w-3.5 h-3.5 text-emerald-800" />
              <span>Interactive Ingredient & Corporate Portfolio</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#072414] tracking-tight">
              Explore Mindtech Capabilities
            </h2>
            <p className="mt-1 text-sm text-gray-600 max-w-2xl">
              High-purity raw materials, Tier-1 manufacturing principals, quality assurance protocols, and the Mindtech supply edge.
            </p>
          </div>

          {/* Tab Selection Navigation Bar */}
          <div className="flex items-center p-1.5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs self-start md:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab('sectors')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center space-x-1.5 ${
                activeTab === 'sectors'
                  ? 'bg-[#072414] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Application Sectors (6)</span>
            </button>

            <button
              onClick={() => setActiveTab('partners')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center space-x-1.5 ${
                activeTab === 'partners'
                  ? 'bg-[#072414] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/60'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>Global Principals (4)</span>
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center space-x-1.5 ${
                activeTab === 'about'
                  ? 'bg-[#072414] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/60'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Company & Lab</span>
            </button>

            <button
              onClick={() => setActiveTab('advantage')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center space-x-1.5 ${
                activeTab === 'advantage'
                  ? 'bg-[#072414] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/60'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>The Mindtech Edge (6)</span>
            </button>
          </div>
        </div>

        {/* Dynamic Tab Content Area */}
        <AnimatePresence mode="wait">
          
          {/* 1. Application Sectors & Ingredients Tab */}
          {activeTab === 'sectors' && (
            <motion.div
              key="sectors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Category Quick Filter Pills */}
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs font-bold text-gray-500 mr-1 uppercase">Filter Sector:</span>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-emerald-800 text-white'
                      : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  All Sectors (6)
                </button>
                {INDUSTRY_SEGMENTS.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedCategory(s.id)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                      selectedCategory === s.id
                        ? 'bg-emerald-800 text-white'
                        : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {s.badge}
                  </button>
                ))}
              </div>

              {/* 3-Column Responsive Sector Grid with Lightbox & Inquiries */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSegments.map((segment, idx) => (
                  <div
                    key={segment.id}
                    className="rounded-2xl bg-white border border-gray-200/90 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image Thumbnail with Lightbox Trigger */}
                      <div className="relative aspect-16/10 overflow-hidden bg-gray-100">
                        <ImageWithFallback
                          src={segment.image}
                          alt={segment.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          containerClassName="w-full h-full"
                        />
                        
                        <div className="absolute top-3 left-3 z-10">
                          <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-emerald-300 border border-emerald-400/30 uppercase">
                            {segment.badge}
                          </span>
                        </div>

                        {/* Lightbox Zoom Icon Button */}
                        <button
                          onClick={() => openLightboxFor(
                            filteredSegments.map(s => ({ src: s.image, title: s.title, category: s.badge, description: s.description })),
                            idx
                          )}
                          aria-label={`View ${segment.title} full size`}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-emerald-600 cursor-pointer shadow-md"
                        >
                          <Maximize2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Content Card Body */}
                      <div className="p-5 space-y-3 text-left">
                        <div>
                          <h3 className="text-base font-extrabold text-gray-900 leading-snug group-hover:text-emerald-800 transition-colors">
                            {segment.title}
                          </h3>
                          <p className="text-xs font-medium text-emerald-800 mt-0.5">
                            {segment.subtitle}
                          </p>
                        </div>

                        <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                          {segment.description}
                        </p>

                        {/* Ingredient Pills */}
                        <div className="space-y-1.5 pt-1">
                          <div className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                            Key Active Products:
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {segment.keyProductsSummary.map((prod, pIdx) => (
                              <span
                                key={pIdx}
                                className="px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200/70 text-[11px] text-emerald-950 font-medium"
                              >
                                {prod}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Card Action */}
                    <div className="p-5 pt-0 border-t border-gray-100 mt-3">
                      <div className="flex items-center justify-between pt-3">
                        <span className="text-[11px] text-gray-500 font-mono">COA & TDS Ready</span>
                        
                        <button
                          onClick={() => onOpenInquiry(segment.title)}
                          className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-800 hover:text-emerald-950 cursor-pointer group-hover:translate-x-0.5 transition-transform"
                        >
                          <span>Request Spec</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* 2. Global Principals Tab */}
          {activeTab === 'partners' && (
            <motion.div
              key="partners"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {GLOBAL_PARTNERS.map((partner, pIdx) => (
                <div
                  key={partner.id}
                  className="rounded-3xl bg-white border border-gray-200/90 overflow-hidden shadow-2xs hover:shadow-md transition-all p-6 sm:p-7 flex flex-col justify-between text-left space-y-4"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-900 uppercase mb-1.5">
                          {partner.badge}
                        </span>
                        <h3 className="text-xl font-extrabold text-[#072414] tracking-tight">
                          {partner.name}
                        </h3>
                        <p className="text-xs font-semibold text-emerald-800">
                          {partner.tagline}
                        </p>
                      </div>

                      <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-gray-200 bg-gray-50">
                        <ImageWithFallback
                          src={partner.image}
                          alt={partner.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {partner.description}
                    </p>

                    {/* Product Categories */}
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-bold text-gray-700 uppercase">Core Sourcing Portfolio:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {partner.categories.map((cat, cIdx) => (
                          <span
                            key={cIdx}
                            className="px-2.5 py-1 rounded-lg bg-gray-100 text-xs font-semibold text-gray-800"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Strengths */}
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[11px] font-bold text-gray-700 uppercase">Principal Strengths:</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {partner.keyStrengths.map((str, sIdx) => (
                          <div key={sIdx} className="flex items-center space-x-1.5 text-xs text-gray-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span className="truncate">{str}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-mono">Direct Sourcing Partner</span>
                    <button
                      onClick={() => onOpenInquiry(`Principal: ${partner.name}`)}
                      className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-emerald-800 text-white hover:bg-emerald-900 text-xs font-bold cursor-pointer transition-colors shadow-xs"
                    >
                      <span>Inquire {partner.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* 3. Company Profile & Laboratory Tab */}
          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              {/* Left Column: Corporate Narrative & Regulatory Credentials (7 cols) */}
              <div className="lg:col-span-7 rounded-3xl bg-white border border-gray-200/90 p-6 sm:p-8 shadow-2xs space-y-5 text-left flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase">
                    <Building2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Corporate Identity & Philosophy</span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-[#072414] tracking-tight">
                    {COMPANY_DETAILS.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
                    {COMPANY_DETAILS.overview}
                  </p>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {COMPANY_DETAILS.extendedOverview}
                  </p>

                  {/* Mission & Vision Bento Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/70 space-y-1.5">
                      <div className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center space-x-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Corporate Mission</span>
                      </div>
                      <p className="text-xs text-emerald-950/80 leading-relaxed">
                        {COMPANY_DETAILS.mission}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-cyan-50/70 border border-cyan-200/70 space-y-1.5">
                      <div className="text-xs font-bold text-cyan-900 uppercase tracking-wider flex items-center space-x-1.5">
                        <Globe2 className="w-3.5 h-3.5 text-cyan-700" />
                        <span>Corporate Vision</span>
                      </div>
                      <p className="text-xs text-cyan-950/80 leading-relaxed">
                        {COMPANY_DETAILS.vision}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Regulatory Verified Box */}
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-gray-500 font-semibold">Government MSME Reg: </span>
                    <strong className="text-gray-900 font-mono">{COMPANY_DETAILS.regulatory.msmeNo}</strong>
                  </div>
                  <div>
                    <span className="text-gray-500 font-semibold">Policy No: </span>
                    <strong className="text-gray-900 font-mono">{COMPANY_DETAILS.regulatory.policyNo}</strong>
                  </div>
                </div>
              </div>

              {/* Right Column: Formulation Laboratory & QC Rigor (5 cols) */}
              <div className="lg:col-span-5 rounded-3xl bg-[#072414] text-white p-6 sm:p-8 shadow-xl border border-emerald-900/60 flex flex-col justify-between space-y-5 text-left">
                <div className="space-y-4">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase">
                    <FlaskConical className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Analytical Rigor</span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-white tracking-tight">
                    Technical Support & QC Bench Testing
                  </h3>

                  <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                    Our technical support team assists cosmetic formulators with sensory optimization, stability testing, dosage guidelines, and ingredient compatibility.
                  </p>

                  <div className="space-y-2.5 pt-2">
                    {[
                      'Batch-to-batch COA validation & HPLC assay tests',
                      'Specific gravity, refractive index & viscosity profiling',
                      'Sensory glide & slip optimization for cosmetics',
                      'Microbial limit testing & heavy metal screening',
                      'Preservative efficacy & emulsion stability trials'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-xs text-emerald-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-emerald-900/80 flex items-center justify-between">
                  <span className="text-xs text-emerald-300 font-mono">Bawana QC Facility</span>
                  <button
                    onClick={() => onOpenInquiry('Technical Formulation Support')}
                    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-emerald-400 text-[#072414] hover:bg-emerald-300 text-xs font-bold cursor-pointer transition-colors shadow-md"
                  >
                    <span>Request Lab Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* 4. The Mindtech Advantage (6 Pillars) Tab */}
          {activeTab === 'advantage' && (
            <motion.div
              key="advantage"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {WHY_CHOOSE_US_PILLARS.map((pillar) => (
                <div
                  key={pillar.number}
                  className="rounded-3xl bg-white border border-gray-200/90 p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 text-left group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                        {getPillarIcon(pillar.icon)}
                      </div>
                      <span className="text-xl font-black text-gray-300 font-mono group-hover:text-emerald-600 transition-colors">
                        {pillar.number}
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-gray-900 leading-snug">
                      {pillar.title}
                    </h3>

                    <p className="text-xs text-gray-600 leading-relaxed font-medium">
                      {pillar.description}
                    </p>

                    <p className="text-xs text-gray-500 leading-relaxed border-t border-gray-100 pt-2">
                      {pillar.detail}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs text-emerald-800 font-bold">
                    <span>The Mindtech Standard</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                </div>
              ))}
            </motion.div>
          )}

        </AnimatePresence>

      </div>

      {/* Full-Screen Lightbox Modal */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={lightboxImages}
        initialIndex={lightboxIndex}
      />
    </section>
  );
};
