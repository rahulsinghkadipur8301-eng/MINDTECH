import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  ShieldCheck
} from 'lucide-react';

interface NavbarProps {
  onOpenInquiry: (category?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInquiry }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Monitor scroll position for sticky navbar adaptation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleMobileNavClick = (hash: string, category?: string) => {
    setMobileMenuOpen(false);
    if (category) {
      onOpenInquiry(category);
    }
    const targetId = hash.replace('#', '');
    const elem = document.getElementById(targetId) || document.querySelector(hash);
    if (elem) {
      setTimeout(() => {
        const headerOffset = 80;
        const elementPosition = elem.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        window.history.pushState(null, '', hash);
      }, 120);
    }
  };

  const handleNavLinkClick = (hash: string, e?: React.MouseEvent) => {
    if (hash === '#contact') {
      onOpenInquiry();
    }
    if (e) e.preventDefault();

    const targetId = hash.replace('#', '');
    const elem = document.getElementById(targetId) || document.querySelector(hash);
    if (elem) {
      const headerOffset = window.innerWidth >= 1536 ? 120 : window.innerWidth >= 1280 ? 108 : 92;
      const elementPosition = elem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', hash);
    }
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full bg-white/98 backdrop-blur-md border-b border-[#EAECEF] transition-shadow duration-300 relative overflow-hidden ${
        scrolled ? 'shadow-[0_4px_24px_rgba(0,0,0,0.06)]' : 'shadow-[0_2px_12px_rgba(0,0,0,0.03)]'
      }`}
    >
      {/* =========================================================================
          LIVE AESTHETIC BIOTECH ANIMATIONS:
          1. Continuous smooth GPU-accelerated laser slide beam along the bottom edge
          2. Ultra-subtle ambient living gradient aura & drifting molecular lattice
         ========================================================================= */}
      {/* Live Bio-Energy Flowing Laser Border Stream — Ultra-Smooth GPU Slide Beam */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden pointer-events-none z-20">
        <div className="w-[50%] h-full bg-gradient-to-r from-transparent via-[#107c41] via-teal-400 to-transparent animate-slide-beam opacity-90" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[5px] overflow-hidden pointer-events-none z-10 blur-[2px]">
        <div className="w-[50%] h-full bg-gradient-to-r from-transparent via-[#107c41]/50 via-teal-400/60 to-transparent animate-slide-beam opacity-70" />
      </div>

      {/* Living Ambient Biotech Watermark Mesh (Subtle 3-4% Opacity) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Ambient Living Gradient Aura */}
        <div className="absolute -top-10 left-1/4 w-[480px] h-[160px] bg-gradient-to-r from-emerald-100/40 via-teal-50/50 to-transparent rounded-full blur-3xl animate-ambient-glow pointer-events-none" />
        <div className="absolute -bottom-8 right-1/4 w-[380px] h-[140px] bg-gradient-to-l from-emerald-100/30 via-teal-50/40 to-transparent rounded-full blur-2xl animate-ambient-glow [animation-delay:2.5s] pointer-events-none" />
        
        {/* Drifting Micro Chemical Lattice Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.035] animate-micro-drift" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="navbar-hex-grid" width="48" height="83.138" patternUnits="userSpaceOnUse">
              <path d="M48 0l-24 13.856L0 0v27.713l24 13.856 24-13.856V0zm-24 55.426L0 41.57v27.713l24 13.856 24-13.856V41.57L24 55.426z" fill="none" stroke="#072414" strokeWidth="1.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#navbar-hex-grid)" />
        </svg>
      </div>

      {/* 
        Main Top Navigation Bar with Smooth Scroll Compaction:
        - At Top: 78px sm / 86px md / 100px lg / 116px xl / 132px 2xl
        - When Scrolled: 68px sm / 76px md / 84px lg / 96px xl / 108px 2xl
      */}
      <div className={`relative z-10 w-full px-4 sm:px-6 lg:pl-[28px] lg:pr-[28px] xl:pl-[42px] xl:pr-[42px] 2xl:pl-[56px] 2xl:pr-[56px] flex items-center justify-between transition-all duration-300 ease-out ${
        scrolled 
          ? 'h-[68px] sm:h-[76px] lg:h-[84px] xl:h-[96px] 2xl:h-[108px]' 
          : 'h-[78px] sm:h-[86px] lg:h-[100px] xl:h-[116px] 2xl:h-[132px]'
      }`}>
        
        {/* =========================================================================
            COMPANY LOGO — EXACT OFFICIAL VECTOR PRESERVATION (ENLARGED)
            Preserves official artwork, proportions, transparent background, and tagline
           ========================================================================= */}
        <div className="flex items-center shrink-0">
          <a 
            href="#hero" 
            className="flex items-center focus:outline-hidden group/logo" 
            id="mindtech-main-logo"
            aria-label="Mindtech Biotechnology Home"
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              const hero = document.getElementById('hero');
              if (hero) {
                hero.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <img 
              src="/mindtech_logo_transparent-1.svg"
              alt="Mindtech Biotechnology - Nature Beyond the Future"
              width={2048}
              height={1134}
              className={`w-auto object-contain block transition-all duration-300 group-hover/logo:scale-[1.015] ${
                scrolled
                  ? 'h-[48px] sm:h-[56px] lg:h-[68px] xl:h-[80px] 2xl:h-[94px] max-w-[190px] sm:max-w-[230px] lg:max-w-[280px] xl:max-w-[340px] 2xl:max-w-[400px]'
                  : 'h-[58px] sm:h-[66px] lg:h-[80px] xl:h-[96px] 2xl:h-[112px] max-w-[220px] sm:max-w-[260px] lg:max-w-[320px] xl:max-w-[390px] 2xl:max-w-[450px]'
              }`}
              loading="eager"
              decoding="sync"
            />
          </a>
        </div>

        {/* =========================================================================
            EXACT 7 NAVIGATION BUTTONS IN STRICT ORDER WITH PROMINENT BALANCED SIZING:
            1. HOME
            2. ABOUT US
            3. PORTFOLIO
            4. BUSINESS LINES
            5. GLOBAL PARTNERS
            6. WHY CHOOSE US
            7. CONTACT US
           ========================================================================= */}
        <nav 
          className="hidden lg:flex items-center h-full ml-auto gap-1 lg:gap-1.5 xl:gap-2.5 2xl:gap-3.5 shrink-0" 
          aria-label="Main Navigation"
        >
          
          {/* 1. HOME */}
          <motion.a
            href="#hero"
            onClick={(e) => handleNavLinkClick('#hero', e)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="group/btn relative px-2.5 py-1.5 lg:px-3 lg:py-2 xl:px-3.5 xl:py-2 2xl:px-4.5 2xl:py-2.5 rounded-lg text-[#202A3A] hover:text-[#107c41] hover:bg-emerald-50/70 text-[13.5px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] font-bold uppercase tracking-[0.015em] transition-colors duration-200 whitespace-nowrap cursor-pointer select-none inline-flex items-center"
          >
            <span>HOME</span>
            <span className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-[#107c41] rounded-full scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-200 ease-out origin-center shadow-[0_1px_6px_rgba(16,124,65,0.35)]" />
          </motion.a>

          {/* 2. ABOUT US */}
          <motion.a
            href="#about"
            onClick={(e) => handleNavLinkClick('#about', e)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="group/btn relative px-2.5 py-1.5 lg:px-3 lg:py-2 xl:px-3.5 xl:py-2 2xl:px-4.5 2xl:py-2.5 rounded-lg text-[#202A3A] hover:text-[#107c41] hover:bg-emerald-50/70 text-[13.5px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] font-bold uppercase tracking-[0.015em] transition-colors duration-200 whitespace-nowrap cursor-pointer select-none inline-flex items-center"
          >
            <span>ABOUT US</span>
            <span className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-[#107c41] rounded-full scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-200 ease-out origin-center shadow-[0_1px_6px_rgba(16,124,65,0.35)]" />
          </motion.a>

          {/* 3. PORTFOLIO */}
          <motion.a
            href="#portfolio"
            onClick={(e) => handleNavLinkClick('#portfolio', e)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="group/btn relative px-2.5 py-1.5 lg:px-3 lg:py-2 xl:px-3.5 xl:py-2 2xl:px-4.5 2xl:py-2.5 rounded-lg text-[#202A3A] hover:text-[#107c41] hover:bg-emerald-50/70 text-[13.5px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] font-bold uppercase tracking-[0.015em] transition-colors duration-200 whitespace-nowrap cursor-pointer select-none inline-flex items-center"
          >
            <span>PORTFOLIO</span>
            <span className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-[#107c41] rounded-full scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-200 ease-out origin-center shadow-[0_1px_6px_rgba(16,124,65,0.35)]" />
          </motion.a>

          {/* 4. BUSINESS LINES */}
          <motion.a
            href="#industries"
            onClick={(e) => handleNavLinkClick('#industries', e)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="group/btn relative px-2.5 py-1.5 lg:px-3 lg:py-2 xl:px-3.5 xl:py-2 2xl:px-4.5 2xl:py-2.5 rounded-lg text-[#202A3A] hover:text-[#107c41] hover:bg-emerald-50/70 text-[13.5px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] font-bold uppercase tracking-[0.015em] transition-colors duration-200 whitespace-nowrap cursor-pointer select-none inline-flex items-center"
          >
            <span>BUSINESS LINES</span>
            <span className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-[#107c41] rounded-full scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-200 ease-out origin-center shadow-[0_1px_6px_rgba(16,124,65,0.35)]" />
          </motion.a>

          {/* 5. GLOBAL PARTNERS */}
          <motion.a
            href="#partners"
            onClick={(e) => handleNavLinkClick('#partners', e)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="group/btn relative px-2.5 py-1.5 lg:px-3 lg:py-2 xl:px-3.5 xl:py-2 2xl:px-4.5 2xl:py-2.5 rounded-lg text-[#202A3A] hover:text-[#107c41] hover:bg-emerald-50/70 text-[13.5px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] font-bold uppercase tracking-[0.015em] transition-colors duration-200 whitespace-nowrap cursor-pointer select-none inline-flex items-center"
          >
            <span>GLOBAL PARTNERS</span>
            <span className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-[#107c41] rounded-full scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-200 ease-out origin-center shadow-[0_1px_6px_rgba(16,124,65,0.35)]" />
          </motion.a>

          {/* 6. WHY CHOOSE US */}
          <motion.a
            href="#why-us"
            onClick={(e) => handleNavLinkClick('#why-us', e)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="group/btn relative px-2.5 py-1.5 lg:px-3 lg:py-2 xl:px-3.5 xl:py-2 2xl:px-4.5 2xl:py-2.5 rounded-lg text-[#202A3A] hover:text-[#107c41] hover:bg-emerald-50/70 text-[13.5px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] font-bold uppercase tracking-[0.015em] transition-colors duration-200 whitespace-nowrap cursor-pointer select-none inline-flex items-center"
          >
            <span>WHY CHOOSE US</span>
            <span className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-[#107c41] rounded-full scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-200 ease-out origin-center shadow-[0_1px_6px_rgba(16,124,65,0.35)]" />
          </motion.a>

          {/* 7. CONTACT US with Live Glass Shimmer & Pulsing Beacon */}
          <motion.a
            href="#contact"
            onClick={(e) => handleNavLinkClick('#contact', e)}
            whileHover={{ y: -2, scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="group/contact relative ml-1.5 xl:ml-2.5 px-3.5 py-1.5 lg:px-4 lg:py-2 xl:px-5 xl:py-2.5 2xl:px-6 2xl:py-2.5 rounded-lg bg-gradient-to-r from-[#107c41] via-[#0c6636] to-[#107c41] bg-[length:200%_auto] hover:bg-right text-white text-[13px] lg:text-[13.5px] xl:text-[15.5px] 2xl:text-[17.5px] font-extrabold uppercase tracking-[0.02em] shadow-[0_4px_16px_rgba(16,124,65,0.22)] hover:shadow-[0_6px_22px_rgba(16,124,65,0.38)] transition-all duration-300 whitespace-nowrap cursor-pointer select-none inline-flex items-center gap-2 overflow-hidden"
          >
            {/* Living Aesthetic Shimmer Light Sweep */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer-sweep pointer-events-none" />

            {/* Live Pulsing Beacon Dot */}
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
            </span>

            <span className="relative z-10 flex items-center gap-1.5">
              <span>CONTACT US</span>
              <ArrowRight className="w-3.5 h-3.5 xl:w-4 xl:h-4 2xl:w-[18px] 2xl:h-[18px] text-white/90 group-hover/contact:translate-x-0.5 transition-transform" />
            </span>
          </motion.a>

        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center lg:hidden ml-auto">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-gray-800 hover:bg-emerald-50 focus:outline-hidden focus:ring-2 focus:ring-[#107c41] transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-7 h-7 text-[#107c41]" />
            ) : (
              <Menu className="w-7 h-7 text-gray-900" />
            )}
          </button>
        </div>

      </div>

      {/* Responsive Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 top-[78px] sm:top-[86px] bg-black/40 backdrop-blur-xs z-40 lg:hidden"
              aria-hidden="true"
            />

            {/* Mobile Drawer Panel */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed inset-x-0 top-[78px] sm:top-[86px] max-h-[calc(100vh-6rem)] overflow-y-auto bg-white border-b border-gray-200 shadow-2xl z-50 lg:hidden"
            >
              <div className="px-5 py-4 space-y-4">
                
                {/* Official Logo in Drawer */}
                <div className="flex items-center justify-center py-2">
                  <img 
                    src="/mindtech_logo_transparent-1.svg"
                    alt="Mindtech Biotechnology Logo"
                    className="h-16 sm:h-20 w-auto max-w-[280px] object-contain"
                  />
                </div>

                {/* Direct Contact Banner */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-gray-200/80 space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-800 flex items-center justify-between">
                    <span>MINDTECH BIOTECHNOLOGY</span>
                    <span className="flex items-center gap-1 text-[#107c41] font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>MSME Reg.</span>
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                    <a 
                      href="tel:+918368947579" 
                      className="flex items-center gap-2 text-[#202A3A] font-semibold hover:text-[#107c41] bg-white p-2 rounded-lg border border-gray-200 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#107c41] shrink-0" />
                      <span>+91 8368947579</span>
                    </a>
                    <a 
                      href="mailto:Ajaypatel@mindtec.org.in" 
                      className="flex items-center gap-2 text-[#202A3A] font-medium hover:text-[#107c41] bg-white p-2 rounded-lg border border-gray-200 transition-colors truncate"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#107c41] shrink-0" />
                      <span className="truncate">Ajaypatel@mindtec.org.in</span>
                    </a>
                  </div>
                </div>

                {/* 7 Primary Mobile Navigation Links */}
                <nav className="divide-y divide-gray-100 text-[16px] font-bold text-[#202A3A]">
                  
                  {/* 1. HOME */}
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleMobileNavClick('#hero')}
                    className="w-full py-3 flex items-center justify-between text-left hover:text-[#107c41] transition-colors uppercase cursor-pointer"
                  >
                    <span>HOME</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </motion.button>

                  {/* 2. ABOUT US */}
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleMobileNavClick('#about')}
                    className="w-full py-3 flex items-center justify-between text-left hover:text-[#107c41] transition-colors uppercase cursor-pointer"
                  >
                    <span>ABOUT US</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </motion.button>

                  {/* 3. PORTFOLIO */}
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleMobileNavClick('#portfolio')}
                    className="w-full py-3 flex items-center justify-between text-left hover:text-[#107c41] transition-colors uppercase cursor-pointer"
                  >
                    <span>PORTFOLIO</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </motion.button>

                  {/* 4. BUSINESS LINES */}
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleMobileNavClick('#industries')}
                    className="w-full py-3 flex items-center justify-between text-left hover:text-[#107c41] transition-colors uppercase cursor-pointer"
                  >
                    <span>BUSINESS LINES</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </motion.button>

                  {/* 5. GLOBAL PARTNERS */}
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleMobileNavClick('#partners')}
                    className="w-full py-3 flex items-center justify-between text-left hover:text-[#107c41] transition-colors uppercase cursor-pointer"
                  >
                    <span>GLOBAL PARTNERS</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </motion.button>

                  {/* 6. WHY CHOOSE US */}
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleMobileNavClick('#why-us')}
                    className="w-full py-3 flex items-center justify-between text-left hover:text-[#107c41] transition-colors uppercase cursor-pointer"
                  >
                    <span>WHY CHOOSE US</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </motion.button>

                  {/* 7. CONTACT US */}
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleMobileNavClick('#contact')}
                    className="w-full py-3 flex items-center justify-between text-left text-[#107c41] font-bold transition-colors uppercase cursor-pointer"
                  >
                    <span>CONTACT US</span>
                    <ArrowRight className="w-4 h-4 text-[#107c41]" />
                  </motion.button>

                </nav>

                {/* Location Footer in Mobile Drawer */}
                <div className="pt-2 pb-1 text-[11px] text-gray-500 flex items-center justify-between border-t border-gray-100">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span>Bawana Industrial Area, Delhi</span>
                  </span>
                  <span>100% Quality Assured</span>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </header>
  );
};

export default Navbar;
