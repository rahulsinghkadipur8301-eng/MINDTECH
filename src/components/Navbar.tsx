import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';
import { INDUSTRY_SEGMENTS } from '../data/companyData';
import { 
  ChevronDown, 
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
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileAboutExpanded, setMobileAboutExpanded] = useState(false);
  const [mobileBusinessExpanded, setMobileBusinessExpanded] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  // Monitor scroll position for sticky navbar adaptation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
    const elem = document.querySelector(hash);
    if (elem) {
      setTimeout(() => {
        elem.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <header className={`sticky top-0 z-50 w-full bg-white/98 backdrop-blur-md transition-all duration-300 border-b border-gray-100/90 ${
      scrolled 
        ? 'shadow-sm' 
        : 'shadow-[0_1px_3px_rgba(0,0,0,0.03)]'
    }`}>
      {/* Thin Emerald Corporate Accent Line */}
      <div className="h-[3px] w-full bg-gradient-to-r from-emerald-800 via-emerald-600 to-teal-700" />

      {/* Main Navigation Bar */}
      <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex items-center justify-between w-full transition-all duration-200 py-0.5 sm:py-1">
          
          {/* Logo container */}
          <div className="flex items-center shrink-0">
            <a 
              href="#hero" 
              className="flex items-center focus:outline-hidden" 
              id="mindtech-main-logo"
              aria-label="Mindtech Biotechnology Home"
              onClick={(e) => {
                setMobileMenuOpen(false);
                const hero = document.getElementById('hero');
                if (hero) {
                  hero.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <Logo 
                className="h-14 sm:h-16 md:h-[72px] lg:h-20 xl:h-[92px] 2xl:h-[102px] w-auto" 
              />
            </a>
          </div>

          {/* Navigation Menu (Evenly distributed across the space without empty gaps) */}
          <nav className="hidden lg:flex items-center justify-between flex-1 mx-3 lg:mx-4 xl:mx-7 2xl:mx-10">
            
            {/* 1. HOME */}
            <a
              href="#hero"
              className="inline-flex items-center justify-center py-2.5 px-3 lg:px-2.5 xl:px-4 2xl:px-5 text-[14.5px] xl:text-[16.5px] 2xl:text-[18px] font-extrabold tracking-wide text-gray-800 hover:text-emerald-800 hover:bg-emerald-50/80 rounded-full uppercase transform transition-all duration-200 ease-out hover:scale-105 active:scale-[0.97] whitespace-nowrap"
            >
              HOME
            </a>

            {/* 2. ABOUT US (Dropdown) */}
            <div 
              className="relative inline-flex items-center"
              onMouseEnter={() => setActiveDropdown('about')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a
                href="#about"
                className={`inline-flex items-center justify-center py-2.5 px-3 lg:px-2.5 xl:px-4 2xl:px-5 text-[14.5px] xl:text-[16.5px] 2xl:text-[18px] font-extrabold tracking-wide rounded-full uppercase transform transition-all duration-200 ease-out hover:scale-105 active:scale-[0.97] whitespace-nowrap space-x-1.5 ${
                  activeDropdown === 'about'
                    ? 'text-emerald-800 bg-emerald-50/80 scale-105'
                    : 'text-gray-800 hover:text-emerald-800 hover:bg-emerald-50/80'
                }`}
              >
                <span>ABOUT US</span>
                <ChevronDown className={`w-4.5 h-4.5 xl:w-5 xl:h-5 text-gray-500 transition-transform duration-200 ${activeDropdown === 'about' ? 'rotate-180 text-emerald-800' : ''}`} />
              </a>

              {/* Dropdown Menu */}
              {activeDropdown === 'about' && (
                <div className="absolute top-full left-0 pt-2 w-72 z-50 animate-in fade-in-50 zoom-in-95 duration-150">
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 py-2.5 overflow-hidden">
                    <a
                      href="#about"
                      onClick={() => setActiveDropdown(null)}
                      className="block px-4 py-2.5 text-[13.5px] text-gray-700 hover:bg-emerald-50 hover:text-emerald-950 font-semibold transition-all duration-150 hover:translate-x-1"
                    >
                      Corporate Profile & Overview
                    </a>
                    <a
                      href="#about"
                      onClick={() => setActiveDropdown(null)}
                      className="block px-4 py-2.5 text-[13.5px] text-gray-700 hover:bg-emerald-50 hover:text-emerald-950 font-semibold transition-all duration-150 hover:translate-x-1"
                    >
                      6 Value Pillars of Mindtech
                    </a>
                    <a
                      href="#contact"
                      onClick={() => setActiveDropdown(null)}
                      className="block px-4 py-2.5 text-[13.5px] text-gray-700 hover:bg-emerald-50 hover:text-emerald-950 font-semibold transition-all duration-150 hover:translate-x-1"
                    >
                      Bawana Logistics Hub & Warehouse
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* 3. BUSINESS LINES (Dropdown) */}
            <div 
              className="relative inline-flex items-center"
              onMouseEnter={() => setActiveDropdown('business')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a
                href="#industries"
                className={`inline-flex items-center justify-center py-2.5 px-3 lg:px-2.5 xl:px-4 2xl:px-5 text-[14.5px] xl:text-[16.5px] 2xl:text-[18px] font-extrabold tracking-wide rounded-full uppercase transform transition-all duration-200 ease-out hover:scale-105 active:scale-[0.97] whitespace-nowrap space-x-1.5 ${
                  activeDropdown === 'business'
                    ? 'text-emerald-800 bg-emerald-50/80 scale-105'
                    : 'text-gray-800 hover:text-emerald-800 hover:bg-emerald-50/80'
                }`}
              >
                <span>BUSINESS LINES</span>
                <ChevronDown className={`w-4.5 h-4.5 xl:w-5 xl:h-5 text-gray-500 transition-transform duration-200 ${activeDropdown === 'business' ? 'rotate-180 text-emerald-800' : ''}`} />
              </a>

              {/* Dropdown Menu */}
              {activeDropdown === 'business' && (
                <div className="absolute top-full left-0 pt-2 w-80 z-50 animate-in fade-in-50 zoom-in-95 duration-150">
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 py-2.5 max-h-[420px] overflow-y-auto">
                    {INDUSTRY_SEGMENTS.map((seg) => (
                      <a
                        key={seg.id}
                        href="#industries"
                        onClick={() => {
                          setActiveDropdown(null);
                          onOpenInquiry(seg.title);
                        }}
                        className="block px-4 py-2.5 text-[13.5px] text-gray-700 hover:bg-emerald-50 hover:text-emerald-950 font-semibold transition-all duration-150 hover:translate-x-1"
                      >
                        {seg.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 4. GLOBAL PARTNERS */}
            <a
              href="#partners"
              className="inline-flex items-center justify-center py-2.5 px-3 lg:px-2.5 xl:px-4 2xl:px-5 text-[14.5px] xl:text-[16.5px] 2xl:text-[18px] font-extrabold tracking-wide text-gray-800 hover:text-emerald-800 hover:bg-emerald-50/80 rounded-full uppercase transform transition-all duration-200 ease-out hover:scale-105 active:scale-[0.97] whitespace-nowrap"
            >
              GLOBAL PARTNERS
            </a>

            {/* 5. WHY CHOOSE US */}
            <a
              href="#why-us"
              className="inline-flex items-center justify-center py-2.5 px-3 lg:px-2.5 xl:px-4 2xl:px-5 text-[14.5px] xl:text-[16.5px] 2xl:text-[18px] font-extrabold tracking-wide text-gray-800 hover:text-emerald-800 hover:bg-emerald-50/80 rounded-full uppercase transform transition-all duration-200 ease-out hover:scale-105 active:scale-[0.97] whitespace-nowrap"
            >
              WHY CHOOSE US
            </a>

            {/* 6. CONTACT */}
            <a
              href="#contact"
              className="inline-flex items-center justify-center py-2.5 px-3 lg:px-2.5 xl:px-4 2xl:px-5 text-[14.5px] xl:text-[16.5px] 2xl:text-[18px] font-extrabold tracking-wide text-gray-800 hover:text-emerald-800 hover:bg-emerald-50/80 rounded-full uppercase transform transition-all duration-200 ease-out hover:scale-105 active:scale-[0.97] whitespace-nowrap"
            >
              CONTACT
            </a>

          </nav>

          {/* Request Sample CTA Button */}
          <div className="hidden lg:flex items-center shrink-0">
            <button
              onClick={() => onOpenInquiry('Commercial Sample & Formulation')}
              className="inline-flex items-center justify-center py-2.5 xl:py-3 2xl:py-3.5 px-5 xl:px-6.5 2xl:px-8 rounded-full bg-emerald-900 hover:bg-emerald-950 text-white font-extrabold text-[14px] xl:text-[15.5px] 2xl:text-[17px] tracking-wide uppercase transform transition-all duration-200 ease-out shadow-md hover:shadow-lg hover:scale-105 active:scale-[0.98] cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>REQUEST SAMPLE</span>
            </button>
          </div>

          {/* Mobile Actions: Hamburger Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-gray-800 hover:bg-emerald-50 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-7 h-7 text-emerald-900" />
              ) : (
                <Menu className="w-7 h-7 text-gray-900" />
              )}
            </button>
          </div>

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
              transition={{ duration: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 top-[67px] sm:top-[75px] bg-black/40 backdrop-blur-xs z-40 lg:hidden"
              aria-hidden="true"
            />

            {/* Drawer Container */}
            <motion.div
              initial={{ opacity: 0, y: -16, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -16, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed inset-x-0 top-[67px] sm:top-[75px] max-h-[calc(100vh-4.75rem)] overflow-y-auto bg-white border-b border-gray-200 shadow-2xl z-50 lg:hidden"
            >
              <div className="px-5 py-5 space-y-4">
                {/* Official Brand Logo in Mobile Drawer */}
                <div className="flex items-center justify-center py-2 relative">
                  <Logo className="h-12 sm:h-14 md:h-16 w-auto" />
                </div>
                
                {/* Direct Contact & MSME Banner for Mobile */}
                <div className="p-4 bg-gradient-to-r from-emerald-50 via-teal-50/70 to-emerald-50 rounded-2xl border border-emerald-200/70 space-y-2.5">
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-900 flex items-center justify-between">
                    <span>MINDTECH BIOTECHNOLOGY</span>
                    <span className="flex items-center space-x-1 text-emerald-700 font-bold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>MSME Reg.</span>
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                    <a 
                      href="tel:+918368947579" 
                      className="flex items-center space-x-2 text-emerald-950 font-bold hover:text-emerald-700 bg-white/80 p-2 rounded-xl border border-emerald-100 transition-colors"
                    >
                      <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>+91 8368947579</span>
                    </a>
                    <a 
                      href="mailto:Ajaypatel@mindtec.org.in" 
                      className="flex items-center space-x-2 text-emerald-900 font-semibold hover:text-emerald-700 bg-white/80 p-2 rounded-xl border border-emerald-100 transition-colors truncate"
                    >
                      <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span className="truncate">Ajaypatel@mindtec.org.in</span>
                    </a>
                  </div>
                </div>

                {/* Primary Navigation Links with Sub-Menu Accordions */}
                <nav className="divide-y divide-gray-100 text-sm font-bold text-gray-800">
                  
                  {/* Home */}
                  <button
                    onClick={() => handleMobileNavClick('#hero')}
                    className="w-full py-3.5 flex items-center justify-between text-left hover:text-emerald-800 transition-colors uppercase tracking-wide cursor-pointer"
                  >
                    <span>HOME</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </button>

                  {/* About Us (Accordion) */}
                  <div className="py-2">
                    <button
                      onClick={() => setMobileAboutExpanded(!mobileAboutExpanded)}
                      className="w-full py-2.5 flex items-center justify-between text-left hover:text-emerald-800 transition-colors uppercase tracking-wide cursor-pointer"
                    >
                      <span>ABOUT US</span>
                      <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${mobileAboutExpanded ? 'rotate-180 text-emerald-700' : ''}`} />
                    </button>
                    {mobileAboutExpanded && (
                      <div className="pl-4 pr-2 py-2 space-y-2 bg-gray-50/80 rounded-xl my-1 border border-gray-100 text-xs font-semibold text-gray-600">
                        <button
                          onClick={() => handleMobileNavClick('#about')}
                          className="block w-full text-left py-1.5 hover:text-emerald-800 cursor-pointer"
                        >
                          • Corporate Profile & Mission
                        </button>
                        <button
                          onClick={() => handleMobileNavClick('#about')}
                          className="block w-full text-left py-1.5 hover:text-emerald-800 cursor-pointer"
                        >
                          • 6 Pillars of Mindtech
                        </button>
                        <button
                          onClick={() => handleMobileNavClick('#contact')}
                          className="block w-full text-left py-1.5 hover:text-emerald-800 cursor-pointer"
                        >
                          • Bawana Central Logistics Hub
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Business Lines / Portfolio (Accordion) */}
                  <div className="py-2">
                    <button
                      onClick={() => setMobileBusinessExpanded(!mobileBusinessExpanded)}
                      className="w-full py-2.5 flex items-center justify-between text-left hover:text-emerald-800 transition-colors uppercase tracking-wide cursor-pointer"
                    >
                      <span>BUSINESS LINES & INGREDIENTS</span>
                      <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${mobileBusinessExpanded ? 'rotate-180 text-emerald-700' : ''}`} />
                    </button>
                    {mobileBusinessExpanded && (
                      <div className="pl-4 pr-2 py-2 space-y-1.5 bg-gray-50/80 rounded-xl my-1 border border-gray-100 text-xs font-semibold text-gray-600">
                        {INDUSTRY_SEGMENTS.map((seg) => (
                          <button
                            key={seg.id}
                            onClick={() => handleMobileNavClick('#industries', seg.title)}
                            className="block w-full text-left py-1.5 hover:text-emerald-800 truncate cursor-pointer"
                          >
                            • {seg.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Global Partners */}
                  <button
                    onClick={() => handleMobileNavClick('#partners')}
                    className="w-full py-3.5 flex items-center justify-between text-left hover:text-emerald-800 transition-colors uppercase tracking-wide cursor-pointer"
                  >
                    <span>GLOBAL PARTNERS</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </button>

                  {/* Why Choose Us */}
                  <button
                    onClick={() => handleMobileNavClick('#why-us')}
                    className="w-full py-3.5 flex items-center justify-between text-left hover:text-emerald-800 transition-colors uppercase tracking-wide cursor-pointer"
                  >
                    <span>WHY CHOOSE US</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </button>

                  {/* Contact Us */}
                  <button
                    onClick={() => handleMobileNavClick('#contact')}
                    className="w-full py-3.5 flex items-center justify-between text-left hover:text-emerald-800 transition-colors uppercase tracking-wide cursor-pointer text-emerald-800 font-extrabold"
                  >
                    <span>CONTACT</span>
                    <ArrowRight className="w-4 h-4 text-emerald-800" />
                  </button>

                </nav>

                {/* Mobile Request Sample CTA */}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenInquiry('Commercial Sample & Formulation');
                    }}
                    className="w-full py-3.5 px-4 rounded-xl bg-emerald-900 hover:bg-emerald-950 text-white font-bold text-sm tracking-wider uppercase transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>REQUEST SAMPLE</span>
                    <ArrowRight className="w-4 h-4 text-emerald-200" />
                  </button>
                </div>

                {/* Location / Direct Details Footer in Mobile Drawer */}
                <div className="pt-3 pb-2 text-[11px] text-gray-500 flex items-center justify-between border-t border-gray-100">
                  <span className="flex items-center space-x-1">
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
