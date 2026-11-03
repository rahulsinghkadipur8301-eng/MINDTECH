import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './ImageWithFallback';
import { ImageLightbox } from './ImageLightbox';
import { PillarVectorIconRenderer } from './PillarIcons';
import { 
  ShieldCheck, 
  ArrowRight, 
  Maximize2, 
  CheckCircle2, 
  FlaskConical, 
  Building2, 
  Boxes, 
  Users2, 
  Eye,
  Award,
  Clock,
  Sparkles
} from 'lucide-react';

interface FacilityItem {
  id: string;
  kicker: string;
  name: string;
  locationTag: string;
  headline: string;
  description: string;
  capabilities: string[];
  specs: string;
  image: string;
  fallbackImage: string;
  actionText: string;
}

const AUTHENTIC_FACILITIES: FacilityItem[] = [
  {
    id: 'laboratory',
    kicker: 'RESEARCH & ANALYTICAL RIGOR',
    name: 'Advanced Quality & Application Laboratory',
    locationTag: 'Bawana Hub · 100% CoA Verified',
    headline: 'In-house analytical testing, batch quality assurance, and prototype formulation support.',
    description: 'Equipped with precision testing instrumentation, analytical distillation apparatus, centrifuges, and stability chambers. Our dedicated cosmetic chemists conduct stringent physicochemical parameter testing, HPLC active assays, and heavy-metal screening.',
    capabilities: [
      'Batch-to-batch HPLC active assay & purity verification',
      'Solubility, HLB balancing & emulsion stability trials',
      'Microbial screening & heavy metal compliance',
      'Complimentary bench prototype kits for formulation teams'
    ],
    specs: 'HPLC Assaying · Physicochemical Screening · Stability Chambers',
    image: '/facilities/mindtech-laboratory.webp',
    fallbackImage: '/facilities/mindtech-laboratory.jpg',
    actionText: 'Inquire Laboratory Testing'
  },
  {
    id: 'office',
    kicker: 'CORPORATE GOVERNANCE & OPERATIONS',
    name: 'Professional Corporate Headquarters',
    locationTag: 'New Delhi · ISO 9001 & MSME Standards',
    headline: 'Modern administrative center coordinating international trade, regulatory compliance, and client service.',
    description: 'Our New Delhi corporate headquarters coordinates direct liaisons with manufacturing principals in France, South Korea, and Japan. Operating under strict ISO governance and MSME regulatory frameworks, every purchase order is tracked via ERP from placement to delivery.',
    capabilities: [
      'Dedicated client coordination & technical documentation desks',
      'Transparent GST invoicing & regulatory compliance filing',
      'Real-time purchase order allocation & inventory tracking',
      'Direct commercial liaison with international principals'
    ],
    specs: 'ISO 9001 Governance · Full ERP Tracking · Direct Technical Desks',
    image: '/facilities/mindtech-corporate-office.webp',
    fallbackImage: '/facilities/mindtech-corporate-office.jpg',
    actionText: 'Connect with Corporate Desk'
  },
  {
    id: 'warehouse',
    kicker: 'SUPPLY CHAIN & INVENTORY BUFFER',
    name: 'Central Warehouse & Stock Hub',
    locationTag: 'Bawana Industrial City · 24–48h Dispatch',
    headline: 'Extensive climate-managed facility maintaining continuous buffer inventory for Indian formulators.',
    description: 'Strategically located in the Bawana Industrial Area, New Delhi, our expansive warehousing hub features cleanroom epoxy flooring, high-bay LED lighting, UN-certified chemical drum racking, and dedicated loading bays to guarantee uninterrupted manufacturing runs.',
    capabilities: [
      '24–48 hour fast dispatch across major Indian cosmetics clusters',
      'Temperature-managed zones for sensitive bio-actives and ferments',
      'UN-certified spill-proof chemical drum palletization',
      'Deep buffer stock across 250+ specialty cosmetic ingredients'
    ],
    specs: 'Bawana Industrial Area · 24-48h Dispatch SLA · UN Drums',
    image: '/facilities/mindtech-warehouse-hub.webp',
    fallbackImage: '/facilities/mindtech-warehouse-hub.jpg',
    actionText: 'Inquire Stock Availability'
  },
  {
    id: 'meeting-room',
    kicker: 'STRATEGY & TECHNICAL ADVISORY',
    name: 'Executive Collaboration & Formulation Suite',
    locationTag: 'Boardroom · Nature Beyond The Future',
    headline: 'Confidential boardroom tailored for brand owners, formulation chemists, and technical directors.',
    description: 'Equipped with interactive digital presentation systems and formulation displays reflecting Mindtech’s philosophy: "NATURE BEYOND THE FUTURE". Designed for confidential technical consultations, ingredient evaluation under NDA, and joint development reviews.',
    capabilities: [
      'Confidential in-person & virtual formulation consultations',
      'Non-disclosure ingredient evaluations and prototype reviews',
      'Technical seminars on emerging bio-ferments and silicones',
      'Long-term supply agreements and strategic procurement planning'
    ],
    specs: 'Confidential NDA Advisory · Digital Dossiers · Partner Seminars',
    image: '/facilities/mindtech-meeting-collaboration.webp',
    fallbackImage: '/facilities/mindtech-meeting-collaboration.jpg',
    actionText: 'Schedule Consultation'
  }
];

interface CorePillar {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  highlight: string;
  metric: string;
}

const CORE_PILLARS: CorePillar[] = [
  {
    id: 'global-sourcing',
    number: '01',
    title: 'Direct International Alliances',
    tagline: 'Tier-1 Global Manufacturer Partnerships',
    description: 'Direct distribution alliances with Greentech France, SNS Silcos, Fine Organics, and VVF Limited ensure unadulterated cosmetic raw materials with zero intermediary markups.',
    highlight: '100% Factory Direct Supply',
    metric: 'Tier-1 Direct'
  },
  {
    id: 'quality-assurance',
    number: '02',
    title: 'Rigorous Analytical Quality',
    tagline: 'Batch Verification & HPLC Testing',
    description: 'Every consignment undergoes thorough physicochemical verification, active assay testing, and strict COA compliance inside our dedicated Bawana laboratory.',
    highlight: 'CoA & TDS provided with every batch',
    metric: 'Zero Defect Policy'
  },
  {
    id: 'bawana-inventory',
    number: '03',
    title: 'Centralized NCR Buffer Stock',
    tagline: 'Bawana Industrial City, New Delhi',
    description: 'Our primary warehouse maintains deep buffer inventory across 250+ active ingredients and specialty silicones for dependable 24–48 hour dispatch.',
    highlight: 'Readily available buffer inventory in NCR',
    metric: '24–48h Dispatch'
  },
  {
    id: 'formulation-support',
    number: '04',
    title: 'Cosmetic Chemist R&D Support',
    tagline: 'Bench Sampling & Solubility Guidance',
    description: 'Our cosmetic chemists assist clients with optimum phase incorporation, HLB balancing, sensory optimization, and complimentary bench prototype kits.',
    highlight: 'Free bench sample kit availability',
    metric: 'Chemist Support'
  },
  {
    id: 'regulatory-msme',
    number: '05',
    title: 'Government MSME Credibility',
    tagline: 'Full Regulatory Compliance & Invoicing',
    description: 'Registered MSME enterprise offering GST invoicing, REACH statements, cruelty-free certifications, and complete documentation compliance.',
    highlight: 'Transparent compliance and tax invoicing',
    metric: 'Govt. MSME Reg.'
  },
  {
    id: 'nationwide-reach',
    number: '06',
    title: 'Agile Nationwide Distribution',
    tagline: 'Climate-Safe Multi-Modal Freight',
    description: 'Reliable multi-carrier logistics network ensuring leak-proof, temperature-safe transit of liquid silicones, bio-actives, and specialty esters across India.',
    highlight: 'Spill-proof UN-certified packaging on every route',
    metric: 'Pan-India Reach'
  }
];

export const WhyChooseUsSection: React.FC<{ onOpenInquiry: (topic?: string) => void }> = ({ onOpenInquiry }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const lightboxImages = AUTHENTIC_FACILITIES.map(f => ({
    id: f.id,
    src: f.image,
    title: f.name,
    subtitle: f.kicker,
    badge: f.locationTag,
    description: f.description,
    details: f.capabilities
  }));

  return (
    <section id="why-us" className="py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-[#fbfdfc] to-white relative text-left overflow-hidden border-t border-gray-200/80">
      
      {/* Full-Screen High-Definition Lightbox Modal */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        onOpenInquiry={(title) => onOpenInquiry(`Facility Inquiry - ${title}`)}
      />

      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 space-y-14 sm:space-y-20">
        
        {/* =========================================================================
            1. REFINED EDITORIAL HEADER
           ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-gray-200/70">
          <div className="max-w-5xl space-y-3 min-w-0">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 text-emerald-950 text-xs font-mono font-bold uppercase tracking-wider border border-emerald-300/80">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-800" />
              <span>INFRASTRUCTURE &amp; OPERATIONAL RIGOR</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[48px] font-black text-[#072414] tracking-tight leading-tight font-['Outfit'] sm:whitespace-nowrap">
              Why Choose Mindtech Biotechnology
            </h2>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed font-normal max-w-3xl">
              Built on verified real-world infrastructure: an advanced analytical testing laboratory, centralized Bawana stockholding, professional corporate governance, and collaborative formulation advisory.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start lg:self-auto">
            <button
              type="button"
              onClick={() => handleOpenLightbox(0)}
              className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-emerald-950 bg-white hover:bg-emerald-50 px-4 py-2.5 rounded-full border border-gray-200/90 shadow-2xs transition-all cursor-pointer"
            >
              <Eye className="w-4 h-4 text-emerald-700" />
              <span>Inspect High-Res Gallery</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenInquiry('Mindtech Corporate Partnership')}
              className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-white bg-[#072414] hover:bg-[#0c4024] px-5 sm:px-6 py-2.5 rounded-full transition-all cursor-pointer shadow-md hover:shadow-lg"
            >
              <span>Partner With Mindtech</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            2. MASTER FACILITY INFRASTRUCTURE SHOWCASE (4 AUTHENTIC PHOTOGRAPHS)
           ========================================================================= */}
        <div className="space-y-8">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 block">
              AUTHENTIC PHYSICAL INFRASTRUCTURE
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#072414] tracking-tight mt-1 font-['Outfit']">
              Real Infrastructure. Uncompromising Scientific Quality.
            </h3>
          </div>

          {/* 4 Architectural Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {AUTHENTIC_FACILITIES.map((facility, index) => (
              <motion.article
                key={facility.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="rounded-3xl bg-white border border-gray-200/90 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group text-left"
              >
                {/* Cinematic Facility Photograph Container */}
                <div 
                  onClick={() => handleOpenLightbox(index)}
                  className="relative aspect-16/10 w-full overflow-hidden cursor-pointer bg-[#051e10]"
                  title="Click to view in full-screen 2048px high definition"
                >
                  <ImageWithFallback
                    src={facility.image}
                    fallbackSrc={facility.fallbackImage}
                    alt={facility.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    containerClassName="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Clean Top Status Tag & Enlarge Button */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-emerald-300 text-[11px] font-mono font-bold tracking-wider uppercase border border-emerald-400/30">
                      {facility.locationTag}
                    </span>

                    <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#072414] text-[11px] font-bold shadow-sm flex items-center space-x-1.5">
                      <Maximize2 className="w-3 h-3 text-emerald-700" />
                      <span>Inspect 2048px</span>
                    </span>
                  </div>
                </div>

                {/* Card Content Suite */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  
                  <div className="space-y-3.5">
                    {/* Category Eyebrow & Main Title */}
                    <div>
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700 block">
                        {facility.kicker}
                      </span>
                      <h4 className="text-xl sm:text-2xl font-black text-[#072414] tracking-tight leading-snug mt-0.5">
                        {facility.name}
                      </h4>
                    </div>

                    <p className="text-sm sm:text-[14.5px] text-gray-600 leading-relaxed font-normal">
                      {facility.description}
                    </p>

                    {/* Clean Key Capabilities Grid */}
                    <div className="pt-2 border-t border-gray-100 space-y-2">
                      <span className="text-[11px] font-mono font-bold text-gray-500 uppercase tracking-wider block">
                        Operational &amp; Technical Capabilities:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {facility.capabilities.map((cap, cIdx) => (
                          <div 
                            key={cIdx} 
                            className="flex items-start space-x-2 text-xs font-semibold text-gray-800 bg-gray-50/80 p-2.5 rounded-xl border border-gray-200/60"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                            <span className="leading-snug">{cap}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Meta Bar & Direct Action */}
                  <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <span className="font-mono text-gray-500 text-[11px] truncate">
                      {facility.specs}
                    </span>

                    <button
                      type="button"
                      onClick={() => onOpenInquiry(`Inquiry - ${facility.name}`)}
                      className="inline-flex items-center space-x-1.5 font-bold text-emerald-800 hover:text-emerald-950 transition-colors cursor-pointer self-start sm:self-auto shrink-0 group/btn"
                    >
                      <span>{facility.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-700 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>

                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* =========================================================================
            3. SIX PILLARS OF THE MINDTECH ADVANTAGE
           ========================================================================= */}
        <div className="space-y-8 pt-8 border-t border-gray-200/80">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 block">
              PARTNERSHIP ASSURANCE &amp; COMPETITIVE EDGE
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#072414] tracking-tight mt-1 font-['Outfit']">
              The Six Pillars of the Mindtech Advantage
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mt-1.5 max-w-3xl leading-relaxed">
              From raw material bench trial prototypes to full-scale commercial manufacturing runs, our operations are structured around scientific rigor, transparent supply lines, and rapid execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {CORE_PILLARS.map((pillar, index) => (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4 group text-left"
              >
                <div className="space-y-3">
                  {/* Top Bar with Custom Icon & Metric */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-50 via-teal-50 to-white border border-emerald-200 shadow-2xs flex items-center justify-center p-1.5 group-hover:scale-110 group-hover:border-emerald-500 transition-all duration-300">
                      <PillarVectorIconRenderer pillarId={pillar.id} size={36} />
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-md">
                        PILLAR {pillar.number}
                      </span>
                      <span className="text-[11px] font-bold text-gray-500 block mt-1">
                        {pillar.metric}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[17px] font-extrabold text-[#072414] leading-snug group-hover:text-emerald-800 transition-colors">
                      {pillar.title}
                    </h4>
                    <p className="text-[11.5px] font-semibold text-emerald-700 mt-0.5">
                      {pillar.tagline}
                    </p>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1.5 text-emerald-950 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span className="truncate text-[11.5px]">{pillar.highlight}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenInquiry(`Pillar Inquiry - ${pillar.title}`)}
                    className="font-bold text-emerald-800 hover:text-emerald-950 flex items-center space-x-1 cursor-pointer shrink-0 ml-2"
                  >
                    <span>Inquire</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
