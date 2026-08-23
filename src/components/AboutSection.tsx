import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './ImageWithFallback';
import { ImageLightbox } from './ImageLightbox';
import { COMPANY_DETAILS } from '../data/companyData';
import { 
  Building2, 
  Globe2, 
  Boxes, 
  Award, 
  FlaskConical, 
  Truck, 
  Handshake,
  CheckCircle2,
  Maximize2,
  ArrowRight,
  Sparkles,
  MapPin
} from 'lucide-react';

interface AboutPillar {
  number: string;
  id: string;
  title: string;
  subtitle: string;
  description: string;
  keyPoints: string[];
  tags: string[];
  image: string;
  fallbackImage: string;
  imageCaption: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ABOUT_PILLARS: AboutPillar[] = [
  {
    number: '01',
    id: 'global-sourcing',
    title: 'Global Sourcing, Local Support',
    subtitle: 'Connecting Global Innovation with Domestic Technical Reach',
    description: 'We connect customers with quality ingredients sourced through trusted global supply channels, backed by responsive local support. Direct partnerships with international manufacturers allow Indian formulators to access global ingredient innovations with prompt domestic technical and logistics assistance.',
    keyPoints: [
      'Direct partnerships with leading international chemical manufacturers',
      'Prompt domestic technical and formulation assistance in India',
      'Streamlined customs clearance and regulatory import documentation'
    ],
    tags: ['Direct Factory Imports', 'Local Technical Desk', 'Pan-India Support'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1400&q=85',
    imageCaption: 'Global supply channels & centralized Bawana distribution hub',
    icon: Globe2
  },
  {
    number: '02',
    id: 'diverse-portfolio',
    title: 'Premium & Diverse Ingredient Portfolio',
    subtitle: 'Comprehensive Raw Materials for Skincare, Haircare, Sun & Color',
    description: 'From specialty silicones and natural actives to conditioning ingredients, specialty esters and functional raw materials, our portfolio is curated for a wide range of personal care applications across skincare, haircare, color cosmetics, sun-care and bath & body formulations.',
    keyPoints: [
      'Specialty silicones, crosslinked elastomer gels & MQ resin film formers',
      'High-potency skin brighteners (Alpha Arbutin, Kojic Dipalmitate, EAA)',
      'Clinically validated bio-ferments, plant extracts & mild surfactants'
    ],
    tags: ['Specialty Silicones', 'Bio-Actives & Ferments', 'Specialty Esters'],
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1400&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1400&q=85',
    imageCaption: 'Curated high-performance cosmetic ingredients & formulation actives',
    icon: Boxes
  },
  {
    number: '03',
    id: 'quality-compliance',
    title: 'Quality You Can Rely On',
    subtitle: 'Rigorous Verification, Certificate of Analysis & Batch Consistency',
    description: 'We place strong emphasis on ingredient quality, consistency and dependable supply to support smooth formulation and production processes. Every batch is verified with rigorous Certificate of Analysis (COA), Technical Data Sheets (TDS), and stringent quality verification protocols.',
    keyPoints: [
      '100% batch traceability with verified COA & Technical Data Sheets',
      'Strict quality screening and consistent specifications across lots',
      'MSME registered enterprise with standardized supply chain controls'
    ],
    tags: ['COA & TDS Verified', '100% Batch Traceable', 'Stringent Quality Standards'],
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1400&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1400&q=85',
    imageCaption: 'Rigorous quality verification, purity testing & batch compliance',
    icon: Award
  },
  {
    number: '04',
    id: 'formulation-support',
    title: 'Application-Focused Approach',
    subtitle: 'Formulation Guidance, Sensory Tuning & Stability Troubleshooting',
    description: 'We understand that every formulation has different requirements. Our team works with customers to identify suitable ingredient solutions for their specific applications, assisting with sensory optimization, stability troubleshooting, compatibility testing, and dosage guidance.',
    keyPoints: [
      'Tailored ingredient selection matching target viscosity and skin-feel',
      'Troubleshooting emulsion stability, phase separation and pH balancing',
      'Practical starting formulation prototypes and dosage guidelines'
    ],
    tags: ['Formulation Guidance', 'Sensory Tuning', 'Dosage Matrix'],
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1400&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1400&q=85',
    imageCaption: 'Application testing, sensory profiling & prototype evaluation',
    icon: FlaskConical
  },
  {
    number: '05',
    id: 'dependable-supply',
    title: 'Dependable Supply Partner',
    subtitle: 'Climate-Managed Warehousing & 24-48h Pan-India Dispatch',
    description: 'Our import and distribution capabilities are focused on maintaining reliable availability and ensuring a smooth supply experience for our customers. Strategically located warehousing in Bawana, Delhi with ready buffer stock helps prevent production bottlenecks.',
    keyPoints: [
      'Centralized warehouse infrastructure in Bawana Industrial Area, Delhi',
      'Buffer inventory management ensuring uninterrupted manufacturing supply',
      'Rapid 24 to 48 hour dispatch turnaround across major Indian cosmetics clusters'
    ],
    tags: ['Bawana Hub, Delhi', 'Buffer Stock', '24-48h Fast Dispatch'],
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1400&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&w=1400&q=85',
    imageCaption: 'Ready buffer inventory & temperature-managed storage in Delhi',
    icon: Truck
  },
  {
    number: '06',
    id: 'long-term-partnerships',
    title: 'Long-Term Partnerships',
    subtitle: 'Transparent Collaboration from Lab Bench to Commercial Scale',
    description: 'We believe in building lasting relationships through transparent communication, professional service and a commitment to customer satisfaction from initial bench-scale formulation to commercial batch manufacturing.',
    keyPoints: [
      'Collaborative support tailored to indie brands, formulators and large manufacturers',
      'Transparent lead times, proactive market updates and consistent pricing',
      'Dedicated commercial and technical representatives for every partner'
    ],
    tags: ['Transparent Service', 'Lab-to-Plant Scale', 'Dedicated Commercial Desk'],
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1400&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1400&q=85',
    imageCaption: 'Enduring client relationships & collaborative cosmetic formulation',
    icon: Handshake
  }
];

export const AboutSection: React.FC<{ onOpenInquiry: (topic?: string) => void }> = ({ onOpenInquiry }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const activePillar = ABOUT_PILLARS[activeIndex];
  const SLIDE_DURATION = 6000; // 6 seconds per pillar

  // Smooth automatic continuous background slideshow loop (0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 0)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % ABOUT_PILLARS.length);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, []);

  const handleSelectCard = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section 
      id="about" 
      className="py-16 sm:py-24 bg-gradient-to-b from-white/90 via-emerald-50/25 to-white/90 relative text-left overflow-hidden border-t border-gray-100"
    >
      {/* Fullscreen Lightbox Modal */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={ABOUT_PILLARS.map(p => ({ 
          src: p.image, 
          title: `${p.number}. ${p.title}`, 
          category: `Mindtech Biotechnology • Pillar ${p.number}`, 
          description: p.description 
        }))}
        initialIndex={activeIndex}
      />

      <div className="max-w-[1720px] mx-auto px-3.5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        
        {/* Section Header: Mindtech Corporate Identity & Theme */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4 sm:gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-emerald-100/90 text-emerald-950 text-[11px] sm:text-xs md:text-sm font-black uppercase tracking-wider mb-2.5 sm:mb-3 border border-emerald-300/60 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-800" />
              <span>NATURE BEYOND THE FUTURE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#072414] tracking-tight leading-tight">
              About Mindtech Biotechnology
            </h2>
            <p className="mt-2 text-sm sm:text-base md:text-lg text-gray-700 max-w-4xl font-normal leading-relaxed">
              A trusted importer and distributor of specialty personal care raw materials, combining direct global manufacturing channels with responsive domestic technical and logistics support.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 self-start md:self-auto">
            <div className="flex items-center space-x-1.5 sm:space-x-2 text-[11px] sm:text-xs md:text-sm font-bold text-emerald-950 bg-emerald-50 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border border-emerald-200 shadow-2xs">
              <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-700" />
              <span>MSME: {COMPANY_DETAILS.regulatory.msmeNo}</span>
            </div>
            <div className="flex items-center space-x-1.5 sm:space-x-2 text-[11px] sm:text-xs md:text-sm font-semibold text-gray-700 bg-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border border-gray-200 shadow-2xs">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-700" />
              <span>Bawana Hub, Delhi</span>
            </div>
          </div>
        </div>

        {/* Major Showcase Box: Large Image (Left) + Active Card Narrative & Progress (Right) */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-emerald-200/80 shadow-md p-4 sm:p-8 lg:p-10 mb-6 sm:mb-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Large High-Resolution Visual Stage with Automated Animation (6 cols) */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden aspect-4/3 sm:aspect-16/11 bg-[#072414] border border-emerald-950/20 shadow-xl group">
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePillar.id}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="w-full h-full"
                  >
                    <ImageWithFallback
                      src={activePillar.image}
                      fallbackSrc={activePillar.fallbackImage}
                      alt={activePillar.title}
                      className="w-full h-full object-cover"
                      containerClassName="w-full h-full"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                {/* Top Number & Tag Badge */}
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <span className="px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md text-emerald-300 border border-emerald-400/40 text-xs font-black font-mono">
                    PILLAR {activePillar.number}
                  </span>
                  <span className="hidden sm:inline-block px-3 py-1.5 rounded-full bg-emerald-950/80 backdrop-blur-md text-white border border-emerald-600/40 text-xs font-bold">
                    Mindtech Advantage
                  </span>
                </div>

                {/* Lightbox Zoom Trigger */}
                <button
                  onClick={() => setLightboxOpen(true)}
                  aria-label="View fullscreen photo"
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 backdrop-blur-md text-white flex items-center justify-center border border-white/20 hover:bg-emerald-600 transition-colors cursor-pointer"
                  title="Click for full-screen inspection"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                {/* Bottom Image Caption */}
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-xs sm:text-sm text-emerald-100 font-medium drop-shadow">
                    {activePillar.imageCaption}
                  </p>
                </div>

              </div>
            </div>

            {/* Right: Active Card Detailed Narrative & Progress Timeline (6 cols) */}
            <div className="lg:col-span-6 space-y-6 text-left">
              
              {/* Pillar Number & Category Header */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-800">
                    {activePillar.number}
                  </span>
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-900 block">
                      Core Company Value
                    </span>
                    <span className="text-xs text-gray-500 font-medium">
                      Mindtech Core Capability
                    </span>
                  </div>
                </div>

                {/* Continuous Automated Progress Indicator Bar */}
                <div className="w-28 sm:w-36 h-1.5 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                  <motion.div 
                    key={`about-prog-${activeIndex}`}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
                    className="h-full bg-gradient-to-r from-emerald-600 to-teal-500"
                  />
                </div>
              </div>

              {/* Pillar Title & Content with Smooth Animated Entry */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePillar.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl sm:text-3xl font-black text-[#072414] leading-tight">
                    {activePillar.title}
                  </h3>

                  <p className="text-sm font-semibold text-emerald-800">
                    {activePillar.subtitle}
                  </p>

                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                    {activePillar.description}
                  </p>

                  {/* Bullet Points */}
                  <div className="space-y-2.5 pt-1">
                    {activePillar.keyPoints.map((point, idx) => (
                      <div key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-gray-800 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  {/* Feature Badges */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {activePillar.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-950 text-xs font-bold border border-emerald-200/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                </motion.div>
              </AnimatePresence>

              {/* Inquiry Action */}
              <div className="pt-2 flex items-center justify-between border-t border-gray-100">
                <button
                  onClick={() => onOpenInquiry(`Inquiry: ${activePillar.title}`)}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-emerald-900 hover:bg-emerald-950 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
                >
                  <span>Inquire About {activePillar.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <span className="text-xs text-emerald-800 font-semibold hidden sm:flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Auto-cycling presentation</span>
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* 6 Interactive Cards Grid (ALL 6 INFORMATION ITEMS from Catalogue Reference) */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm sm:text-base font-black text-[#072414] uppercase tracking-wider">
              All 6 Pillars of Mindtech Biotechnology
            </h4>
            <span className="text-xs text-gray-500 font-medium">
              Synchronized automated rotation
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-5">
            {ABOUT_PILLARS.map((pillar, idx) => {
              const isActive = activeIndex === idx;
              const Icon = pillar.icon;
              return (
                <button
                  key={pillar.id}
                  onClick={() => handleSelectCard(idx)}
                  className={`text-left p-5 rounded-2xl transition-all cursor-pointer border flex flex-col justify-between space-y-3 relative overflow-hidden ${
                    isActive
                      ? 'bg-emerald-900 text-white border-emerald-950 shadow-lg ring-2 ring-emerald-500/40 scale-[1.02]'
                      : 'bg-white text-gray-900 hover:bg-emerald-50/70 border-gray-200/90 shadow-2xs hover:shadow-sm'
                  }`}
                >
                  {/* Card Header: Number + Icon */}
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-2">
                      <span className={`text-base font-black font-mono ${isActive ? 'text-emerald-300' : 'text-emerald-800'}`}>
                        {pillar.number}
                      </span>
                      <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-emerald-800 text-emerald-200' : 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                      }`}>
                        Pillar
                      </span>
                    </div>

                    <div className={`p-2 rounded-xl ${isActive ? 'bg-emerald-800/80 text-emerald-300' : 'bg-emerald-50 text-emerald-700'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Card Title & Content */}
                  <div>
                    <h5 className={`text-sm sm:text-base font-black leading-snug mb-1.5 ${isActive ? 'text-white' : 'text-[#072414]'}`}>
                      {pillar.title}
                    </h5>
                    <p className={`text-xs leading-relaxed line-clamp-3 ${isActive ? 'text-emerald-100/90 font-normal' : 'text-gray-600 font-normal'}`}>
                      {pillar.description}
                    </p>
                  </div>

                  {/* Active Indicator Bar at bottom of card */}
                  {isActive && (
                    <motion.div 
                      key={`card-prog-${idx}`}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
                      className="w-full h-1 bg-emerald-400 rounded-full mt-2" 
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
