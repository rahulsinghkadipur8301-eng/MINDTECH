import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BUSINESS_LINE_SLIDES, BusinessLineSlide } from '../data/businessLinesData';
import { ImageWithFallback } from './ImageWithFallback';
import { ImageLightbox, LightboxImageItem } from './ImageLightbox';
import { 
  FlaskConical, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Send, 
  Droplets,
  Layers,
  Sun,
  Palette,
  HeartPulse,
  Leaf,
  CheckCircle2,
  Search,
  Sparkles
} from 'lucide-react';

interface IndustriesSectionProps {
  onOpenInquiry: (categoryTitle?: string) => void;
  onOpenExplorer?: () => void;
  onExploreBusinessLine?: (route: string, businessLineName: string) => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ 
  onOpenInquiry, 
  onOpenExplorer,
  onExploreBusinessLine
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const totalSlides = BUSINESS_LINE_SLIDES.length;

  // 4.5 seconds auto-play interval for balanced reading time and predictable flow
  const AUTO_INTERVAL = 4500; 

  // Respect prefers-reduced-motion accessibility preference
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  // Helper icons for application categories
  const getCategoryIcon = (id: string, className = "w-3.5 h-3.5") => {
    switch (id) {
      case 'skin-care': return <Droplets className={className} />;
      case 'hair-care': return <Layers className={className} />;
      case 'sun-care': return <Sun className={className} />;
      case 'color-cosmetics': return <Palette className={className} />;
      case 'bath-body': return <HeartPulse className={className} />;
      case 'biotechnology': return <Leaf className={className} />;
      default: return <FlaskConical className={className} />;
    }
  };

  // Lightbox items transformed from slides
  const lightboxItems: LightboxImageItem[] = BUSINESS_LINE_SLIDES.map(s => ({
    id: s.id,
    src: s.image,
    title: s.headline,
    category: s.label,
    subtitle: s.supportingHeadline,
    description: s.description,
    details: s.featuredProducts,
    badge: s.railLabel
  }));

  const handlePrev = useCallback(() => {
    setActiveIndex(prev => (prev > 0 ? prev - 1 : totalSlides - 1));
    setProgress(0);
  }, [totalSlides]);

  const handleNext = useCallback(() => {
    setActiveIndex(prev => (prev < totalSlides - 1 ? prev + 1 : 0));
    setProgress(0);
  }, [totalSlides]);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < totalSlides) {
      setActiveIndex(index);
      setProgress(0);
    }
  }, [totalSlides]);

  // Automatic Rotation: 4.5s interval with smooth progress bar
  // Pauses automatically on hover or when keyboard focus is within slider, and resumes afterward
  useEffect(() => {
    if (reducedMotion || isFocused || isHovered) {
      return;
    }

    const TICK_INTERVAL = 40; // 25 fps smooth progress step
    const step = (TICK_INTERVAL / AUTO_INTERVAL) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + step;
      });
    }, TICK_INTERVAL);

    return () => clearInterval(timer);
  }, [reducedMotion, isFocused, isHovered, handleNext, AUTO_INTERVAL]);

  // Keyboard navigation when focused or in view
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const rect = sliderRef.current?.getBoundingClientRect();
      const inView = rect && rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  // Non-intrusive touch gestures that never interfere with vertical scrolling
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsHovered(true);
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchStartY(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) {
      setIsHovered(false);
      return;
    }
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const deltaX = endX - touchStartX;
    const deltaY = endY - touchStartY;

    // Only trigger slide navigation if gesture was intentionally horizontal
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 45) {
      if (deltaX > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
    setTouchStartX(null);
    setTouchStartY(null);
    // Smoothly resume playback after 2.5s touch settling
    setTimeout(() => {
      setIsHovered(false);
    }, 2500);
  };

  const handleExploreProducts = (slide: BusinessLineSlide) => {
    if (onExploreBusinessLine) {
      onExploreBusinessLine(slide.route, slide.businessLineName);
    } else {
      window.location.hash = `#business-lines/${slide.route}`;
    }
  };

  const handleRequestSample = (slide: BusinessLineSlide) => {
    onOpenInquiry(`Sample Request: ${slide.headline} Formulations (${slide.featuredProducts.join(', ')})`);
  };

  const openLightboxForSlide = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section 
      id="industries" 
      ref={sliderRef}
      onFocus={() => setIsFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsFocused(false);
        }
      }}
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="Cosmetic and Personal Care Formulations Automatic Slider"
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white via-[#f7faf7] to-white relative text-left overflow-hidden border-t border-gray-100 focus:outline-hidden"
    >
      {/* Lightbox Modal */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={lightboxItems}
        currentIndex={lightboxIndex}
        onNavigate={setLightboxIndex}
        onOpenInquiry={onOpenInquiry}
      />

      {/* Ambient botanical background glows contained within section */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-teal-100/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 space-y-6 sm:space-y-8">
        
        {/* =========================================================================
            1. COMPACT EDITORIAL HEADER (Focused on Content + Clean Navigation Arrows)
           ========================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 pb-3 border-b border-gray-200/70">
          
          {/* Left Title Block */}
          <div className="space-y-2 max-w-3xl text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100/90 text-emerald-950 text-xs font-mono font-bold uppercase tracking-wider border border-emerald-300/60 shadow-2xs">
              <FlaskConical className="w-3.5 h-3.5 text-emerald-800" />
              <span>COSMETIC &amp; PERSONAL CARE FORMULATIONS</span>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#072414] tracking-tight leading-tight font-['Outfit']">
              Explore Our Business Lines
            </h2>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
              Discover specialty products and formulation solutions across skin care, hair care, sun care, colour cosmetics, cleansing and biotechnology.
            </p>
          </div>

          {/* Right Controls Block: Previous & Next Arrow Controls */}
          <div className="flex items-center space-x-2 self-start sm:self-end shrink-0 pt-2 sm:pt-0">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Business Line slide"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-emerald-50 text-gray-700 hover:text-emerald-950 border border-gray-200 shadow-2xs hover:shadow-md flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Business Line slide"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#072414] hover:bg-emerald-900 text-white shadow-md hover:shadow-lg flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <ChevronRight className="w-5 h-5 text-emerald-300" />
            </button>
          </div>

        </div>

        {/* =========================================================================
            2. APPLICATION NAVIGATION RAIL (Category Tabs with Subtle Progress Line)
           ========================================================================= */}
        <div className="w-full overflow-x-auto scrollbar-none pb-1">
          <nav 
            aria-label="Business line categories"
            className="flex items-center space-x-1.5 sm:space-x-2 min-w-max"
          >
            {BUSINESS_LINE_SLIDES.map((slide, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  className={`relative px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center space-x-2 shrink-0 overflow-hidden ${
                    isActive
                      ? 'bg-[#072414] text-white shadow-md scale-102 ring-2 ring-emerald-500/50'
                      : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200/80 hover:border-gray-300'
                  }`}
                >
                  <span className={isActive ? 'text-emerald-400' : 'text-gray-400'}>
                    {getCategoryIcon(slide.id, "w-4 h-4")}
                  </span>
                  <span>{slide.railLabel}</span>

                  {/* Active rail progress line indicating time until next automatic transition */}
                  {isActive && !reducedMotion && (
                    <span 
                      style={{ width: `${progress}%` }}
                      className="absolute bottom-0 left-0 h-0.5 bg-emerald-400 transition-all duration-75 ease-linear pointer-events-none"
                    />
                  )}
                </button>
              );
            })}

            {/* Quick Link to Ingredient Explorer */}
            {onOpenExplorer && (
              <button
                type="button"
                onClick={onOpenExplorer}
                className="ml-auto px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-200/80 transition-all cursor-pointer flex items-center space-x-1.5 shrink-0"
              >
                <Search className="w-3.5 h-3.5 text-emerald-700" />
                <span>Ingredient Explorer</span>
              </button>
            )}
          </nav>
        </div>

        {/* =========================================================================
            3. MAIN CAROUSEL: LARGE HORIZONTAL SLIDING CARDS
               Desktop: Dominant featured card (~76%), with partial preview (~22%) of next card.
               Mobile: Clipped strictly within viewport, zero page overflow.
           ========================================================================= */}
        <div 
          id="industries-slider-viewport"
          className="relative w-full overflow-hidden rounded-3xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Scoped CSS for responsive card widths and spacing */}
          <style>{`
            #industries-slider-track {
              --card-width: 88%;
              --card-gap: 16px;
            }
            @media (min-width: 640px) {
              #industries-slider-track {
                --card-width: 82%;
                --card-gap: 20px;
              }
            }
            @media (min-width: 1024px) {
              #industries-slider-track {
                --card-width: 76%;
                --card-gap: 24px;
              }
            }
          `}</style>

          {/* Sliding Track with smooth 600ms transition */}
          <div 
            id="industries-slider-track"
            className="flex gap-4 sm:gap-6 will-change-transform"
            style={{
              transition: reducedMotion ? 'none' : 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1)',
              transform: `translateX(calc(-${activeIndex} * (var(--card-width) + var(--card-gap))))`,
            }}
          >
            {BUSINESS_LINE_SLIDES.map((slide, index) => {
              const isActive = index === activeIndex;
              const isNext = index === (activeIndex + 1) % totalSlides;

              return (
                <div
                  key={slide.id}
                  onClick={() => {
                    if (!isActive) goToSlide(index);
                  }}
                  className={`shrink-0 w-[var(--card-width)] min-w-0 relative rounded-3xl overflow-hidden transition-all duration-500 border text-left select-none ${
                    isActive
                      ? 'border-emerald-500/40 shadow-2xl scale-100 opacity-100'
                      : 'border-gray-200/80 shadow-md opacity-60 hover:opacity-85 scale-[0.985] cursor-pointer'
                  } h-[440px] sm:h-[480px] lg:h-[540px] max-h-[82vh]`}
                >
                  {/* Background High-Quality Photograph with Cinematic Slow Zoom */}
                  <div className="absolute inset-0 bg-[#072414] overflow-hidden">
                    <motion.div
                      key={`img-${slide.id}-${isActive}`}
                      initial={isActive && !reducedMotion ? { scale: 1.05 } : { scale: 1.0 }}
                      animate={isActive && !reducedMotion ? { scale: 1.00 } : { scale: 1.0 }}
                      transition={{ duration: 4.5, ease: 'easeOut' }}
                      className="w-full h-full"
                    >
                      <ImageWithFallback
                        src={slide.image}
                        alt={slide.imageAlt}
                        fallbackSrc={slide.fallbackImage}
                        className="w-full h-full object-cover"
                        containerClassName="w-full h-full"
                      />
                    </motion.div>

                    {/* Dark gradient overlay for guaranteed text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent pointer-events-none hidden sm:block" />
                  </div>

                  {/* Top Bar: Application Tag & Lightbox button */}
                  <div className="relative z-10 p-4 sm:p-6 lg:p-7 flex items-start justify-between">
                    {/* Application Tag */}
                    <motion.div 
                      key={`tag-${slide.id}-${isActive}`}
                      initial={isActive && !reducedMotion ? { opacity: 0, y: -8 } : { opacity: 1, y: 0 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.05 }}
                      className="flex items-center space-x-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider shadow-sm"
                    >
                      {getCategoryIcon(slide.id, "w-3.5 h-3.5 text-emerald-400")}
                      <span>{slide.label}</span>
                    </motion.div>

                    {/* Top Right: Lightbox expand button */}
                    <button
                      type="button"
                      onClick={(e) => openLightboxForSlide(index, e)}
                      className="w-9 h-9 rounded-full bg-black/50 hover:bg-emerald-600 backdrop-blur-md text-white border border-white/20 flex items-center justify-center transition-colors cursor-pointer"
                      title="View Full-Screen High-Res Photography"
                      aria-label={`View full-screen photograph for ${slide.headline}`}
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Bottom Content Panel with Coordinated Staggered Entrance Animation */}
                  <div className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-7 lg:p-9 space-y-3 sm:space-y-4 max-w-3xl">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`content-${slide.id}-${isActive}`}
                        initial={isActive && !reducedMotion ? { opacity: 0 } : { opacity: 1 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-3 sm:space-y-4"
                      >
                        {/* Titles */}
                        <div className="space-y-1">
                          <motion.h3 
                            initial={isActive && !reducedMotion ? { opacity: 0, y: 16 } : { opacity: 1, y: 0 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                            className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight drop-shadow-sm font-['Outfit']"
                          >
                            {slide.headline}
                          </motion.h3>
                          <motion.p 
                            initial={isActive && !reducedMotion ? { opacity: 0, y: 12 } : { opacity: 1, y: 0 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45, delay: 0.20, ease: [0.16, 1, 0.3, 1] }}
                            className="text-emerald-300 text-xs sm:text-sm lg:text-base font-semibold"
                          >
                            {slide.supportingHeadline}
                          </motion.p>
                        </div>

                        {/* Concise Description */}
                        <motion.p 
                          initial={isActive && !reducedMotion ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.45, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                          className="text-xs sm:text-sm lg:text-[14.5px] text-gray-200 leading-relaxed font-normal max-w-2xl line-clamp-3 sm:line-clamp-none"
                        >
                          {slide.description}
                        </motion.p>

                        {/* Verified featured products (max 3 items) */}
                        <motion.div 
                          initial={isActive && !reducedMotion ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.45, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
                          className="space-y-1.5 pt-0.5"
                        >
                          <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-300/90 block">
                            Verified Featured Ingredients:
                          </span>
                          <div className="flex flex-wrap items-center gap-1.5 text-xs">
                            {slide.featuredProducts.map((prod, pIdx) => (
                              <motion.span
                                key={pIdx}
                                initial={isActive && !reducedMotion ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.35, delay: 0.36 + pIdx * 0.05 }}
                                className="inline-flex items-center space-x-1.5 px-2.5 sm:px-3 py-1 rounded-lg bg-white/15 backdrop-blur-md text-white font-medium border border-white/20 text-[11px] sm:text-xs shadow-2xs"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                                <span className="truncate">{prod}</span>
                              </motion.span>
                            ))}
                          </div>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div 
                          initial={isActive && !reducedMotion ? { opacity: 0, y: 12 } : { opacity: 1, y: 0 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
                          className="pt-1.5 sm:pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3"
                        >
                          {/* Primary CTA: Explore Products */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleExploreProducts(slide);
                            }}
                            className="inline-flex items-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer group"
                          >
                            <span>Explore Products</span>
                            <ArrowRight className="w-4 h-4 text-emerald-950 group-hover:translate-x-1 transition-transform" />
                          </button>

                          {/* Secondary CTA: Request Sample */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRequestSample(slide);
                            }}
                            className="inline-flex items-center space-x-2 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white/15 hover:bg-white text-white hover:text-emerald-950 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 border border-white/30 backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Request Sample</span>
                          </button>
                        </motion.div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Next Card Preview Pill on non-active preview card */}
                  {!isActive && isNext && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
                      <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-full text-emerald-950 text-xs font-bold shadow-lg flex items-center space-x-1.5 hover:scale-105 transition-transform">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Next: {slide.railLabel}</span>
                        <ChevronRight className="w-4 h-4 text-emerald-700" />
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            4. SLIDER PAGINATION DOTS & TECHNICAL SOURCING BANNER
           ========================================================================= */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 font-mono">
          
          {/* Slide Pagination Dots (Clean interactive indicators, no numerical text) */}
          <div className="flex items-center space-x-2">
            {BUSINESS_LINE_SLIDES.map((slide, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => goToSlide(dotIdx)}
                aria-label={`Go to ${slide.railLabel}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  dotIdx === activeIndex
                    ? 'w-7 h-2 bg-emerald-600'
                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <span className="hidden md:inline-flex items-center space-x-1.5 text-gray-600">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Full Batch CoA &amp; TDS Traceability</span>
            </span>
            <span className="hidden sm:inline-block text-gray-400">|</span>
            <span className="text-gray-600">
              24–48h Dispatch from Bawana Hub, Delhi
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
