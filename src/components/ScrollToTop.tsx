import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export interface ScrollToTopProps {
  threshold?: number;
  className?: string;
}

/**
 * ScrollToTop Component
 * Floats smoothly on the bottom right after the user scrolls down.
 * Matches Mindtech Biotechnology emerald corporate branding, with a subtle circular
 * scroll depth indicator, ambient aura glow, and smooth return-to-top interaction.
 */
export const ScrollToTop: React.FC<ScrollToTopProps> = ({
  threshold = 320,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (scrollY > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial scroll state
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Circular progress calculations for 48px/52px button
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 ${className}`}
        >
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Return to top of page"
            title="Scroll to top"
            className="group relative flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-gradient-to-br from-emerald-800 via-emerald-900 to-[#072414] text-white shadow-xl shadow-emerald-950/35 border border-emerald-500/30 hover:border-emerald-400/60 hover:shadow-2xl hover:shadow-emerald-900/40 hover:-translate-y-1 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-white transition-all duration-300 cursor-pointer"
          >
            {/* SVG Circular Scroll Progress Track */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5"
              viewBox="0 0 52 52"
              aria-hidden="true"
            >
              <circle
                cx="26"
                cy="26"
                r={radius}
                className="text-emerald-950/50 stroke-current"
                strokeWidth="2.5"
                fill="transparent"
              />
              <circle
                cx="26"
                cy="26"
                r={radius}
                className="text-emerald-400 stroke-current transition-all duration-150"
                strokeWidth="2.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Ambient emerald back-glow on hover */}
            <div className="absolute -inset-1 rounded-full bg-emerald-500/25 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Centered Arrow Icon with subtle lift on hover */}
            <ArrowUp className="w-5 h-5 text-emerald-100 group-hover:text-white transition-all duration-300 group-hover:-translate-y-0.5 relative z-10" />

            {/* Micro Tooltip */}
            <span className="absolute -top-9 right-1/2 translate-x-1/2 px-2.5 py-1 bg-gray-900/90 text-white text-[10.5px] font-bold tracking-wider uppercase rounded-md shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 whitespace-nowrap backdrop-blur-xs scale-90 group-hover:scale-100">
              Top
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
