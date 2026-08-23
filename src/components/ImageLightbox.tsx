import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Download, 
  Send, 
  Sparkles,
  Layers,
  CheckCircle2,
  Info
} from 'lucide-react';

export interface LightboxImageItem {
  id: string;
  src: string;
  title: string;
  category?: string;
  subtitle?: string;
  description?: string;
  details?: string[];
  badge?: string;
}

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: LightboxImageItem[];
  currentIndex: number;
  onNavigate: (newIndex: number) => void;
  onOpenInquiry?: (categoryOrTitle?: string) => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNavigate,
  onOpenInquiry
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showThumbnails, setShowThumbnails] = useState<boolean>(true);

  const currentItem = images[currentIndex] || images[0];

  // Reset zoom on image change
  useEffect(() => {
    setZoomLevel(1);
  }, [currentIndex, isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onNavigate((currentIndex + 1) % images.length);
      } else if (e.key === 'ArrowLeft') {
        onNavigate((currentIndex - 1 + images.length) % images.length);
      } else if (e.key === '+' || e.key === '=') {
        setZoomLevel((prev) => Math.min(prev + 0.3, 2.5));
      } else if (e.key === '-') {
        setZoomLevel((prev) => Math.max(prev - 0.3, 1));
      } else if (e.key === '0') {
        setZoomLevel(1);
      }
    },
    [isOpen, currentIndex, images.length, onNavigate, onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [handleKeyDown, isOpen]);

  if (!isOpen || !currentItem) return null;

  const handleNext = () => {
    onNavigate((currentIndex + 1) % images.length);
  };

  const handlePrev = () => {
    onNavigate((currentIndex - 1 + images.length) % images.length);
  };

  const toggleZoom = () => {
    setZoomLevel((prev) => (prev > 1 ? 1 : 1.8));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-xl text-white select-none overflow-hidden"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        {/* Top Control Header */}
        <div className="relative z-20 flex items-center justify-between px-4 sm:px-6 py-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent border-b border-white/10">
          
          {/* Left: Info Title and Count */}
          <div className="flex items-center space-x-3">
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                {currentItem.badge && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[11px] font-semibold text-emerald-300">
                    {currentItem.badge}
                  </span>
                )}
                <span className="text-xs text-gray-400 font-mono">
                  {currentIndex + 1} / {images.length}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight truncate max-w-xs sm:max-w-md md:max-w-lg mt-0.5">
                {currentItem.title}
              </h3>
            </div>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Zoom Controls */}
            <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/15">
              <button
                onClick={() => setZoomLevel((prev) => Math.max(prev - 0.3, 1))}
                disabled={zoomLevel <= 1}
                className="p-1.5 rounded-full hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                title="Zoom Out (-)"
              >
                <ZoomOut className="w-4 h-4 text-gray-200" />
              </button>
              
              <button
                onClick={toggleZoom}
                className="px-2 py-1 text-xs font-mono font-medium text-emerald-300 hover:text-white"
                title="Reset Zoom (0)"
              >
                {Math.round(zoomLevel * 100)}%
              </button>

              <button
                onClick={() => setZoomLevel((prev) => Math.min(prev + 0.3, 2.5))}
                disabled={zoomLevel >= 2.5}
                className="p-1.5 rounded-full hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                title="Zoom In (+)"
              >
                <ZoomIn className="w-4 h-4 text-gray-200" />
              </button>
            </div>

            {/* Inquire for this item */}
            {onOpenInquiry && (
              <button
                onClick={() => {
                  onClose();
                  onOpenInquiry(currentItem.title);
                }}
                className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-lg cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Inquire Spec</span>
              </button>
            )}

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white transition-colors cursor-pointer border border-white/15"
              title="Close (Esc)"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Center Stage with Image & Floating Navigation Controls */}
        <div className="relative flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden">
          
          {/* Previous Arrow Button */}
          {images.length > 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-3 sm:left-6 z-30 p-3 rounded-full bg-black/60 hover:bg-emerald-600 text-white border border-white/20 hover:border-emerald-400 transition-all active:scale-95 shadow-2xl cursor-pointer"
              title="Previous (Left Arrow)"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Next Arrow Button */}
          {images.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-3 sm:right-6 z-30 p-3 rounded-full bg-black/60 hover:bg-emerald-600 text-white border border-white/20 hover:border-emerald-400 transition-all active:scale-95 shadow-2xl cursor-pointer"
              title="Next (Right Arrow)"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* High Resolution Image */}
          <div className="relative max-w-full max-h-[75vh] flex items-center justify-center overflow-auto p-2">
            <motion.img
              key={currentItem.id}
              src={currentItem.src}
              alt={currentItem.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: zoomLevel }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="max-h-[70vh] w-auto max-w-[90vw] object-contain rounded-2xl shadow-2xl border border-white/10 transition-transform duration-300"
              style={{ cursor: zoomLevel > 1 ? 'zoom-out' : 'zoom-in' }}
              onClick={toggleZoom}
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Bottom Details & Thumbnail Ribbon */}
        <div className="relative z-20 bg-gradient-to-t from-black/95 via-black/80 to-transparent border-t border-white/10 pt-3 pb-4 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
            
            {/* Image Description Summary */}
            <div className="text-left max-w-2xl">
              {currentItem.subtitle && (
                <div className="text-xs font-bold text-emerald-400 tracking-wide">
                  {currentItem.subtitle}
                </div>
              )}
              {currentItem.description && (
                <p className="text-xs text-gray-300 leading-relaxed mt-0.5 line-clamp-2">
                  {currentItem.description}
                </p>
              )}
            </div>

            {/* Thumbnail Navigation Bar */}
            {images.length > 1 && (
              <div className="flex items-center space-x-2 overflow-x-auto py-1 max-w-full no-scrollbar">
                {images.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => onNavigate(idx)}
                    className={`relative w-14 h-11 sm:w-16 sm:h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      currentIndex === idx
                        ? 'border-emerald-400 ring-2 ring-emerald-400/50 scale-105 opacity-100'
                        : 'border-white/20 opacity-50 hover:opacity-90'
                    }`}
                  >
                    <img
                      src={img.src}
                      alt={img.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}

          </div>
        </div>

      </motion.div>
    </AnimatePresence>
  );
};
