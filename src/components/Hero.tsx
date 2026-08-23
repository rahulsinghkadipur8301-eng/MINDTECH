import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './ImageWithFallback';
import { ImageLightbox } from './ImageLightbox';
import { COMPANY_DETAILS } from '../data/companyData';
import { generateAndDownloadCatalogPdf } from '../utils/generateCatalogPdf';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Maximize2,
  Download,
  Loader2,
  ShieldCheck,
  Layers,
  Globe,
  Building2,
  FlaskConical
} from 'lucide-react';

interface HeroProps {
  onOpenInquiry: (category?: string) => void;
}

type ShowcaseCategory = 'company' | 'products' | 'partners' | 'highlights';

interface ShowcaseSlide {
  id: ShowcaseCategory;
  tabLabel: string;
  badge: string;
  title: string;
  shortIntro: string;
  keyPoints: string[];
  ctaLabel: string;
  ctaAction: 'inquiry' | 'catalog' | 'scroll';
  image: string;
  fallbackImage: string;
  imageCaption: string;
  secondaryInfo?: {
    label: string;
    value: string;
  }[];
}

const SHOWCASE_SLIDES: ShowcaseSlide[] = [
  {
    id: 'company',
    tabLabel: 'Company',
    badge: 'MINDTECH BIOTECHNOLOGY',
    title: 'Trusted Importer & Distributor of Cosmetic Raw Materials',
    shortIntro: 'Mindtech Biotechnology India Pvt. Ltd. delivers high-quality raw material solutions, specialty silicones, and active bio-tech ingredients to personal care manufacturers and formulators.',
    keyPoints: [
      'Direct factory imports & verified global sourcing channels',
      'Full batch documentation with certified COA & TDS',
      'Prompt pan-India distribution from Bawana, Delhi'
    ],
    ctaLabel: 'Request Product Catalog',
    ctaAction: 'catalog',
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1400&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1400&q=85',
    imageCaption: 'Specialty cosmetic ingredients & formulation solutions',
    secondaryInfo: [
      { label: 'Central Hub', value: 'Bawana Industrial Area, Delhi' },
      { label: 'Corporate Motto', value: '"Nature Beyond The Future"' }
    ]
  },
  {
    id: 'products',
    tabLabel: 'Products',
    badge: 'INGREDIENT PORTFOLIO',
    title: 'Curated Ingredients for Modern Personal Care',
    shortIntro: 'Comprehensive portfolio spanning specialty silicones, natural actives, skin-lightening ingredients, specialty esters, surfactants, and conditioning polymers.',
    keyPoints: [
      'Specialty Silicones, Elastomers & MQ Resin Film Formers',
      'High-Purity Skin Actives (Alpha Arbutin, Kojic Dipalmitate, EAA)',
      'Bio-Ferments, Botanical Extracts & Mild Surfactants'
    ],
    ctaLabel: 'Explore Business Lines',
    ctaAction: 'scroll',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1400&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1400&q=85',
    imageCaption: 'High-performance cosmetic & personal care actives',
    secondaryInfo: [
      { label: 'Core Segments', value: 'Skin, Hair, Sun, Color' },
      { label: 'Application', value: 'Formulation-Ready' }
    ]
  },
  {
    id: 'partners',
    tabLabel: 'Global Partners',
    badge: 'DOCUMENTED PRINCIPALS',
    title: 'Direct Strategic Alliances with Global Manufacturers',
    shortIntro: 'Authorized distribution partnerships connecting Indian cosmetic brands with world-class ingredient innovators and sustainable chemistry pioneers.',
    keyPoints: [
      'Fine Organics: Sustainable specialty esters & emollients',
      'VVF Limited: High-purity surfactants & oleochemicals',
      'SNS Silcos: Specialty silicone elastomers & sensory fluids',
      'Greentech France: Research-backed botanical & marine actives'
    ],
    ctaLabel: 'View Partner Alliances',
    ctaAction: 'scroll',
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1400&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=1400&q=85',
    imageCaption: 'Global manufacturing partners: Fine Organics, VVF, SNS Silcos, Greentech',
    secondaryInfo: [
      { label: 'Sourcing Model', value: 'Direct Factory Sourcing' },
      { label: 'Compliance', value: 'Standardized COA / TDS' }
    ]
  },
  {
    id: 'highlights',
    tabLabel: 'Highlights',
    badge: 'COMPANY HIGHLIGHTS',
    title: 'Reliable Sourcing, Quality & Formulation Support',
    shortIntro: 'We combine international sourcing capabilities with responsive local support to deliver dependable ingredients for your formulation success.',
    keyPoints: [
      'Global Ingredient Sourcing & Dependable Supply',
      'Premium & Diverse Raw Material Portfolio',
      'Quality & Compliance with Batch-Specific COA',
      'Application & Formulation Guidance for Formulators'
    ],
    ctaLabel: 'Request Formulation Samples',
    ctaAction: 'inquiry',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1400&q=85',
    imageCaption: 'Climate-controlled warehouse & prompt pan-India logistics',
    secondaryInfo: [
      { label: 'Dispatch TAT', value: '24-48 Hours' },
      { label: 'Support', value: 'Technical & Dosage Assistance' }
    ]
  }
];

export const Hero: React.FC<HeroProps> = ({ onOpenInquiry }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const SLIDE_DURATION = 6000; // 6 seconds per slide
  const activeSlide = SHOWCASE_SLIDES[currentSlideIndex];

  // Smooth automatic background slide rotation (0 -> 1 -> 2 -> 3 -> 0)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % SHOWCASE_SLIDES.length);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, []);

  const handleSelectSlide = (idx: number) => {
    setCurrentSlideIndex(idx);
  };

  const handleDownloadPdf = () => {
    setIsDownloading(true);
    setTimeout(() => {
      try {
        generateAndDownloadCatalogPdf();
      } catch (err) {
        console.error('PDF error:', err);
      } finally {
        setIsDownloading(false);
      }
    }, 200);
  };

  const handleCtaClick = (action: 'inquiry' | 'catalog' | 'scroll', label: string) => {
    if (action === 'catalog') {
      handleDownloadPdf();
    } else if (action === 'inquiry') {
      onOpenInquiry(label);
    } else {
      const target = document.getElementById('industries') || document.getElementById('partners');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[85vh] lg:min-h-[88vh] bg-transparent text-gray-900 overflow-hidden flex items-center py-10 lg:py-16"
    >
      {/* Lightbox for Fullscreen Inspection */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={SHOWCASE_SLIDES.map((s) => ({
          src: s.image,
          title: s.title,
          category: s.badge,
          description: s.shortIntro
        }))}
        initialIndex={currentSlideIndex}
      />

      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 w-full relative z-10">
        
        {/* Automatic Showcase Category Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 sm:pb-5 mb-6 sm:mb-8 border-b border-gray-200/80 gap-3">
          
          {/* Automated Slide Category Badges */}
          <div className="flex items-center space-x-1.5 sm:space-x-3 overflow-x-auto pb-2 sm:pb-0 scrollbar-none w-full sm:w-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            {SHOWCASE_SLIDES.map((slide, idx) => {
              const isActive = currentSlideIndex === idx;
              return (
                <button
                  key={slide.id}
                  onClick={() => handleSelectSlide(idx)}
                  className={`relative px-3 sm:px-6 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs xl:text-sm font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap flex items-center space-x-1.5 sm:space-x-2.5 overflow-hidden shrink-0 ${
                    isActive
                      ? 'bg-[#072414] text-white shadow-md shadow-emerald-950/20 ring-2 ring-emerald-500/50'
                      : 'bg-white/90 backdrop-blur-xs text-gray-700 hover:bg-emerald-50 hover:text-emerald-950 border border-gray-200 shadow-2xs'
                  }`}
                >
                  <span className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full ${isActive ? 'bg-emerald-400 animate-pulse' : 'bg-gray-400'}`} />
                  <span>{slide.tabLabel}</span>

                  {/* Smooth Animated Mini-Progress line inside active tab */}
                  {isActive && (
                    <motion.div 
                      key={`hero-tab-${idx}`}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Sourcing & Verification Status Pill */}
          <div className="flex items-center space-x-2 text-[11px] sm:text-sm">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-100/90 text-emerald-950 font-bold border border-emerald-300/80 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Direct Factory Sourcing • 100% Verified COA</span>
            </span>
          </div>

        </div>

        {/* 2-Column Split: Clean High-Contrast Narrative (Left) + Large Visual Stage (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
          
          {/* Left Column: Focused Narrative with Smooth Animated Transition (7 cols on large displays) */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-6 text-left">
            
            {/* Badge & Tagline */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-300/80 text-emerald-950 text-xs sm:text-sm font-black tracking-wider uppercase shadow-2xs">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span>{activeSlide.badge}</span>
              </span>

              <span className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-xs border border-gray-200 text-emerald-900 text-xs sm:text-sm font-bold shadow-2xs">
                "NATURE BEYOND THE FUTURE"
              </span>

              <span className="hidden xl:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-950 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
                <span>MSME Reg: {COMPANY_DETAILS.regulatory.msmeNo}</span>
              </span>
            </div>

            {/* Headline with Smooth Animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="space-y-5"
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black text-[#072414] tracking-tight leading-[1.12]">
                  {activeSlide.title}
                </h1>

                <p className="text-base sm:text-lg xl:text-xl text-gray-700 leading-relaxed font-normal max-w-3xl">
                  {activeSlide.shortIntro}
                </p>

                {/* Key Points in 2-Column Responsive Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {activeSlide.keyPoints.map((pt, i) => (
                    <div key={i} className="flex items-start space-x-2.5 text-sm sm:text-base text-gray-800 font-medium bg-emerald-50/40 p-2.5 rounded-xl border border-emerald-100/60">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2 w-full">
              <button
                onClick={() => handleCtaClick(activeSlide.ctaAction, activeSlide.tabLabel)}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl sm:rounded-full bg-[#072414] hover:bg-[#0c3c22] text-white font-black text-xs sm:text-sm xl:text-base uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer text-center"
              >
                <span>{activeSlide.ctaLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleDownloadPdf}
                disabled={isDownloading}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl sm:rounded-full bg-white hover:bg-emerald-50 border border-gray-300 text-gray-800 font-bold text-xs sm:text-sm xl:text-base tracking-wider uppercase transition-colors cursor-pointer shadow-2xs disabled:opacity-75 text-center"
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-emerald-700" />
                    <span>Downloading PDF...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-emerald-700" />
                    <span>Download 2026 Catalog (PDF)</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Sourcing & Logistics Meta (4-item grid) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-gray-200/80 text-xs">
              <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-3.5 border border-gray-200 shadow-2xs">
                <span className="text-[10px] text-emerald-800 font-extrabold uppercase tracking-wider block">
                  Central Hub
                </span>
                <span className="font-bold text-[#072414] text-xs sm:text-sm">Bawana, Delhi</span>
              </div>
              <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-3.5 border border-gray-200 shadow-2xs">
                <span className="text-[10px] text-emerald-800 font-extrabold uppercase tracking-wider block">
                  Dispatch TAT
                </span>
                <span className="font-bold text-[#072414] text-xs sm:text-sm">24-48 Hours</span>
              </div>
              <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-3.5 border border-gray-200 shadow-2xs">
                <span className="text-[10px] text-emerald-800 font-extrabold uppercase tracking-wider block">
                  Global Alliance
                </span>
                <span className="font-bold text-[#072414] text-xs sm:text-sm">Fine, VVF, SNS, GT</span>
              </div>
              <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-3.5 border border-gray-200 shadow-2xs">
                <span className="text-[10px] text-emerald-800 font-extrabold uppercase tracking-wider block">
                  Documentation
                </span>
                <span className="font-bold text-[#072414] text-xs sm:text-sm">COA, TDS & SDS</span>
              </div>
            </div>

          </div>

          {/* Right Column: Large Automated Visual Showcase with Lightbox (5 cols on large displays) */}
          <div className="lg:col-span-5 xl:col-span-5 space-y-3">
            <div className="relative rounded-3xl overflow-hidden aspect-4/3 sm:aspect-16/11 lg:aspect-4/3 xl:aspect-16/11 bg-white border border-gray-200 shadow-xl group">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide.id}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="w-full h-full"
                >
                  <ImageWithFallback
                    src={activeSlide.image}
                    fallbackSrc={activeSlide.fallbackImage}
                    alt={activeSlide.title}
                    className="w-full h-full object-cover"
                    containerClassName="w-full h-full"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Dark Vignette Overlay for Image Caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Top Zoom Inspection Button */}
              <button
                onClick={() => setLightboxOpen(true)}
                aria-label="Zoom visual"
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 hover:bg-emerald-600 flex items-center justify-center transition-colors cursor-pointer"
                title="Fullscreen inspection"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/75 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex items-center justify-between text-white">
                  <div className="text-xs sm:text-sm text-left">
                    <span className="text-emerald-300 font-mono font-bold block text-[10px] uppercase">
                      {activeSlide.badge}
                    </span>
                    <span className="font-medium text-white">{activeSlide.imageCaption}</span>
                  </div>
                  <span className="text-emerald-400 font-extrabold text-xs bg-emerald-950/90 px-3 py-1.5 rounded-full border border-emerald-700/60 shrink-0 ml-2">
                    Verified
                  </span>
                </div>
              </div>

            </div>

            {/* Quick Sourcing Tags Under Image */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-white/80 backdrop-blur-xs rounded-2xl border border-gray-200 text-xs text-gray-700">
              <span className="font-bold text-emerald-950 flex items-center space-x-1">
                <Layers className="w-3.5 h-3.5 text-emerald-700" />
                <span>Featured Lines:</span>
              </span>
              <span className="bg-emerald-50 px-2.5 py-1 rounded-lg text-emerald-900 font-semibold">Specialty Silicones</span>
              <span className="bg-emerald-50 px-2.5 py-1 rounded-lg text-emerald-900 font-semibold">Active Actives</span>
              <span className="bg-emerald-50 px-2.5 py-1 rounded-lg text-emerald-900 font-semibold">Sun Filters</span>
              <span className="bg-emerald-50 px-2.5 py-1 rounded-lg text-emerald-900 font-semibold">Eco Emulsifiers</span>
            </div>

          </div>

        </div>

        {/* Full-Width Bottom Highlights & Operational Credentials Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 pt-8 border-t border-gray-200/80">
          <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-5 border border-gray-200 shadow-2xs hover:border-emerald-500/40 hover:shadow-md transition-all flex items-start space-x-3.5 text-left">
            <div className="p-2.5 bg-emerald-100/70 text-emerald-900 rounded-xl shrink-0 mt-0.5">
              <Globe className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-[#072414]">Direct Factory Imports</h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Direct partnerships with Fine Organics, VVF Limited, SNS Silcos & Greentech France.
              </p>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-5 border border-gray-200 shadow-2xs hover:border-emerald-500/40 hover:shadow-md transition-all flex items-start space-x-3.5 text-left">
            <div className="p-2.5 bg-emerald-100/70 text-emerald-900 rounded-xl shrink-0 mt-0.5">
              <Building2 className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-[#072414]">Bawana Logistics Hub</h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Central climate-managed Delhi warehouse maintaining deep buffer stock for instant dispatch.
              </p>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-5 border border-gray-200 shadow-2xs hover:border-emerald-500/40 hover:shadow-md transition-all flex items-start space-x-3.5 text-left">
            <div className="p-2.5 bg-emerald-100/70 text-emerald-900 rounded-xl shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-[#072414]">Certified COA & TDS</h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                100% batch-specific analytical certificates, purity assays, SDS and regulatory documentation.
              </p>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-5 border border-gray-200 shadow-2xs hover:border-emerald-500/40 hover:shadow-md transition-all flex items-start space-x-3.5 text-left">
            <div className="p-2.5 bg-emerald-100/70 text-emerald-900 rounded-xl shrink-0 mt-0.5">
              <FlaskConical className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-[#072414]">Formulation Support</h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Technical guidance on ingredient compatibility, sensory benchmarks and bench sample requests.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
