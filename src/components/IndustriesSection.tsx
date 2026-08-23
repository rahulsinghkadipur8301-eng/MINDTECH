import React, { useState } from 'react';
import { motion } from 'motion/react';
import { INDUSTRY_SEGMENTS } from '../data/companyData';
import { ImageWithFallback } from './ImageWithFallback';
import { ImageLightbox } from './ImageLightbox';
import { 
  Sparkles, 
  FlaskConical, 
  Layers, 
  ArrowRight, 
  Maximize2,
  CheckCircle2,
  Send,
  Droplets,
  Sun,
  Palette,
  HeartPulse,
  Leaf
} from 'lucide-react';

interface IndustriesSectionProps {
  onOpenInquiry: (categoryTitle?: string) => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ onOpenInquiry }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredSegments = selectedFilter === 'all'
    ? INDUSTRY_SEGMENTS
    : INDUSTRY_SEGMENTS.filter(s => s.id === selectedFilter);

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'skin-care': return <Droplets className="w-3.5 h-3.5" />;
      case 'hair-care': return <Layers className="w-3.5 h-3.5" />;
      case 'sun-care': return <Sun className="w-3.5 h-3.5" />;
      case 'color-cosmetics': return <Palette className="w-3.5 h-3.5" />;
      case 'bath-body': return <HeartPulse className="w-3.5 h-3.5" />;
      case 'greentech-actives': return <Leaf className="w-3.5 h-3.5" />;
      default: return <FlaskConical className="w-3.5 h-3.5" />;
    }
  };

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section id="industries" className="py-14 sm:py-20 bg-white relative text-left overflow-hidden border-t border-gray-100">
      
      {/* Full-Screen Image Lightbox */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={INDUSTRY_SEGMENTS.map(s => ({
          src: s.image,
          title: s.title,
          category: s.badge,
          description: s.description
        }))}
        initialIndex={lightboxIndex}
      />

      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-950 text-xs sm:text-sm font-bold uppercase tracking-wider mb-2">
              <FlaskConical className="w-4 h-4 text-emerald-800" />
              <span>Cosmetic & Personal Care Formulations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#072414] tracking-tight">
              Business Lines & Industry Sectors
            </h2>
            <p className="mt-2 text-base text-gray-600 max-w-3xl font-normal">
              High-purity specialty ingredients, bio-fermented actives, specialty emulsifiers, and sensory fluids tailored for distinct formulation matrices.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 max-w-full">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedFilter === 'all'
                  ? 'bg-[#072414] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Business Lines ({INDUSTRY_SEGMENTS.length})
            </button>
            {INDUSTRY_SEGMENTS.map(seg => (
              <button
                key={seg.id}
                onClick={() => setSelectedFilter(seg.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap flex items-center space-x-1.5 ${
                  selectedFilter === seg.id
                    ? 'bg-[#072414] text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {getCategoryIcon(seg.id)}
                <span>{seg.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 6-Card Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredSegments.map((segment, index) => {
            const originalIndex = INDUSTRY_SEGMENTS.findIndex(s => s.id === segment.id);
            return (
              <motion.div
                key={segment.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="bg-white rounded-3xl overflow-hidden border border-gray-200/90 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image Header with Lightbox Trigger */}
                <div 
                  onClick={() => handleOpenLightbox(originalIndex >= 0 ? originalIndex : 0)}
                  className="relative h-48 sm:h-52 overflow-hidden cursor-pointer bg-[#072414]"
                  title="Click to view full-screen high-res image"
                >
                  <ImageWithFallback
                    src={segment.image}
                    alt={segment.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    containerClassName="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

                  {/* Top Badge */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-emerald-950 uppercase tracking-wider shadow-sm flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      <span>{segment.badge}</span>
                    </span>
                  </div>

                  {/* Top Right Zoom Icon */}
                  <div className="absolute top-3.5 right-3.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center border border-white/20 hover:bg-emerald-600 transition-colors">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>

                  {/* Title on Image */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 text-left pointer-events-none">
                    <h3 className="text-lg font-bold text-white leading-snug drop-shadow">
                      {segment.title}
                    </h3>
                    <p className="text-xs text-emerald-200 font-medium">
                      {segment.subtitle}
                    </p>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4 text-left">
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                    {segment.description}
                  </p>

                  {/* Key Ingredients Pill Grid */}
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Featured Specialty Ingredients
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {segment.keyProductsSummary.slice(0, 3).map((prod, pIdx) => (
                        <span
                          key={pIdx}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 text-[11px] font-semibold text-emerald-900 border border-emerald-100"
                        >
                          {prod}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onOpenInquiry(segment.title)}
                      className="flex-1 inline-flex items-center justify-center space-x-1.5 text-xs font-bold text-[#072414] bg-emerald-50 hover:bg-emerald-100 py-2 px-3 rounded-xl border border-emerald-200 transition-all cursor-pointer"
                    >
                      <Send className="w-3 h-3 text-emerald-700" />
                      <span>Request Sample</span>
                    </button>
                    <button
                      onClick={() => handleOpenLightbox(originalIndex >= 0 ? originalIndex : 0)}
                      className="p-2 rounded-xl text-gray-500 hover:text-emerald-900 hover:bg-gray-100 transition-colors cursor-pointer"
                      title="Inspect Photo & Specs"
                      aria-label="Inspect Photo and Specs"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
