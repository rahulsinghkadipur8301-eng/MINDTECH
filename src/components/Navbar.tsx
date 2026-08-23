import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';
import { INDUSTRY_SEGMENTS } from '../data/companyData';
import { generateAndDownloadCatalogPdf } from '../utils/generateCatalogPdf';
import { 
  ChevronDown, 
  Menu, 
  X, 
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  FileText,
  Download,
  Loader2
} from 'lucide-react';

interface NavbarProps {
  onOpenInquiry: (category?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInquiry }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileAboutExpanded, setMobileAboutExpanded] = useState(false);
  const [mobileBusinessExpanded, setMobileBusinessExpanded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPdf = () => {
    setIsDownloading(true);
    setTimeout(() => {
      try {
        generateAndDownloadCatalogPdf();
        setIsDownloading(false);
      } catch (err) {
        console.error("PDF download error:", err);
        setIsDownloading(false);
      }
    }, 250);
  };

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
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-xs border-b border-gray-200 transition-all duration-300">
      {/* Main Navigation Bar */}
      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex items-center justify-between h-20 sm:h-22">
          
          {/* Left: Brand Logo with Official Tagline */}
          <a 
            href="#hero" 
            className="flex items-center group shrink-0 py-1" 
            id="mindtech-main-logo"
            aria-label="Mindtech Biotechnology Home"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Logo height={72} variant="horizontal" className="transition-transform duration-300 group-hover:scale-[1.02]" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-2 xl:space-x-4">
            
            {/* Home */}
            <a
              href="#hero"
              className="px-3.5 py-2 text-xs xl:text-sm font-extrabold tracking-wider text-gray-800 hover:text-emerald-800 hover:bg-emerald-50/60 rounded-full uppercase transition-all"
            >
              HOME
            </a>

            {/* About Us (Dropdown) */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('about')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a
                href="#about"
                className="px-3.5 py-2 text-xs xl:text-sm font-extrabold tracking-wider text-gray-800 hover:text-emerald-800 hover:bg-emerald-50/60 rounded-full uppercase transition-all flex items-center space-x-1"
              >
                <span>ABOUT US</span>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${activeDropdown === 'about' ? 'rotate-180 text-emerald-800' : ''}`} />
              </a>

              {/* Dropdown Menu */}
              {activeDropdown === 'about' && (
                <div className="absolute top-full left-0 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 py-2.5 z-50 animate-in fade-in-50 zoom-in-95 duration-150">
                  <a
                    href="#about"
                    className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-emerald-50 hover:text-emerald-950 font-semibold transition-colors"
                  >
                    Corporate Profile & Overview
                  </a>
                  <a
                    href="#about"
                    className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-emerald-50 hover:text-emerald-950 font-semibold transition-colors"
                  >
                    6 Value Pillars of Mindtech
                  </a>
                  <a
                    href="#contact"
                    className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-emerald-50 hover:text-emerald-950 font-semibold transition-colors"
                  >
                    Bawana Logistics Hub & Warehouse
                  </a>
                </div>
              )}
            </div>

            {/* Business Lines / Industries (Dropdown) */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('business')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a
                href="#industries"
                className="px-3.5 py-2 text-xs xl:text-sm font-extrabold tracking-wider text-gray-800 hover:text-emerald-800 hover:bg-emerald-50/60 rounded-full uppercase transition-all flex items-center space-x-1"
              >
                <span>BUSINESS LINES</span>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${activeDropdown === 'business' ? 'rotate-180 text-emerald-800' : ''}`} />
              </a>

              {/* Dropdown Menu */}
              {activeDropdown === 'business' && (
                <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 py-2.5 z-50 animate-in fade-in-50 zoom-in-95 duration-150">
                  {INDUSTRY_SEGMENTS.map((seg) => (
                    <a
                      key={seg.id}
                      href="#industries"
                      onClick={() => onOpenInquiry(seg.title)}
                      className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-emerald-50 hover:text-emerald-950 font-semibold transition-colors"
                    >
                      {seg.title}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Global Partners */}
            <a
              href="#partners"
              className="px-3.5 py-2 text-xs xl:text-sm font-extrabold tracking-wider text-gray-800 hover:text-emerald-800 hover:bg-emerald-50/60 rounded-full uppercase transition-all"
            >
              GLOBAL PARTNERS
            </a>

            {/* Why Choose Us */}
            <a
              href="#why-us"
              className="px-3.5 py-2 text-xs xl:text-sm font-extrabold tracking-wider text-gray-800 hover:text-emerald-800 hover:bg-emerald-50/60 rounded-full uppercase transition-all"
            >
              WHY CHOOSE US
            </a>

            {/* Contact Us */}
            <a
              href="#contact"
              className="px-3.5 py-2 text-xs xl:text-sm font-extrabold tracking-wider text-gray-800 hover:text-emerald-800 hover:bg-emerald-50/60 rounded-full uppercase transition-all"
            >
              CONTACT
            </a>

            {/* Quick Phone Desk Badge on Wide Screens */}
            <a
              href="tel:+918368947579"
              className="hidden 2xl:inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold hover:bg-emerald-100 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-700" />
              <span>+91 8368947579</span>
            </a>

            {/* Prominent Navbar Download Catalog Action */}
            <button
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="ml-2 inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-emerald-900 hover:bg-emerald-950 text-white font-extrabold text-xs xl:text-sm tracking-wider uppercase transition-all shadow-xs hover:shadow cursor-pointer disabled:opacity-75"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-300" />
                  <span>Preparing PDF...</span>
                </>
              ) : (
                <>
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  <span>CATALOG PDF</span>
                </>
              )}
            </button>

          </nav>

          {/* Mobile Actions: Download PDF Icon & Hamburger Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              aria-label="Download 24-page PDF Catalog"
              className="p-2.5 rounded-xl bg-emerald-900 text-white hover:bg-emerald-950 transition-colors cursor-pointer flex items-center space-x-1 text-xs font-bold"
            >
              {isDownloading ? (
                <Loader2 className="w-4 h-4 animate-spin text-emerald-300" />
              ) : (
                <>
                  <Download className="w-4 h-4 text-emerald-300" />
                  <span className="text-[11px]">PDF</span>
                </>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-2xl text-gray-800 hover:bg-emerald-50 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 transition-colors cursor-pointer"
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
              className="fixed inset-0 top-[80px] sm:top-[88px] bg-black/40 backdrop-blur-xs z-40 lg:hidden"
              aria-hidden="true"
            />

            {/* Drawer Container */}
            <motion.div
              initial={{ opacity: 0, y: -16, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -16, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed inset-x-0 top-[80px] sm:top-[88px] max-h-[calc(100vh-6rem)] overflow-y-auto bg-white border-b border-gray-200 shadow-2xl z-50 lg:hidden"
            >
              <div className="px-5 py-5 space-y-4">
                
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

                  {/* Download Catalog Shortcut */}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleDownloadPdf();
                    }}
                    className="w-full py-3.5 flex items-center justify-between text-left bg-emerald-50 px-3 rounded-xl hover:bg-emerald-100 transition-colors uppercase tracking-wide cursor-pointer text-emerald-950 font-black"
                  >
                    <span className="flex items-center space-x-2">
                      <Download className="w-4 h-4 text-emerald-700" />
                      <span>DOWNLOAD 24-PAGE CATALOG (PDF)</span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-emerald-700" />
                  </button>

                  {/* Contact Us */}
                  <button
                    onClick={() => handleMobileNavClick('#contact')}
                    className="w-full py-3.5 flex items-center justify-between text-left hover:text-emerald-800 transition-colors uppercase tracking-wide cursor-pointer text-emerald-800 font-extrabold"
                  >
                    <span>CONTACT & INQUIRIES</span>
                    <ArrowRight className="w-4 h-4 text-emerald-800" />
                  </button>

                </nav>

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
