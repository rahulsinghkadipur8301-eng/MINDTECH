/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { GlobalPartnersProductPortfolioSection } from './components/portfolio/GlobalPartnersProductPortfolioSection';
import { IndustriesSection } from './components/IndustriesSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FadeInSection } from './components/FadeInSection';
import { ScrollToTop } from './components/ScrollToTop';
import { ProductItem, ALL_PRODUCTS } from './data/supplierProductsData';

// Code-split sub-pages and on-demand modals to minimize initial bundle size and maximize load speed
const SupplierCataloguePage = React.lazy(() =>
  import('./components/portfolio/SupplierCataloguePage').then(m => ({ default: m.SupplierCataloguePage }))
);
const SnsSilcosMicrosite = React.lazy(() =>
  import('./components/portfolio/SnsSilcosMicrosite').then(m => ({ default: m.SnsSilcosMicrosite }))
);
const ProductDetailModal = React.lazy(() =>
  import('./components/portfolio/ProductDetailModal').then(m => ({ default: m.ProductDetailModal }))
);
const IngredientExplorerModal = React.lazy(() =>
  import('./components/IngredientExplorerModal').then(m => ({ default: m.IngredientExplorerModal }))
);

export default function App() {
  const [inquiryCategory, setInquiryCategory] = useState<string | undefined>(undefined);
  const [isExplorerOpen, setIsExplorerOpen] = useState(false);

  // Supplier & Product view routing states
  const [selectedSupplierId, setSelectedSupplierId] = useState<'greentech' | 'sns-silcos' | 'fine-organics' | 'vvf-limited' | 'vvf-fine-organics' | 'general-range' | 'all-products' | null>(null);
  const [selectedBusinessLine, setSelectedBusinessLine] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [isPartnersSectionVisible, setIsPartnersSectionVisible] = useState(true);

  // Synchronize URL hash and path with view state for browser back/forward and direct linking
  useEffect(() => {
    const handleNavigationChange = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;

      const lineMap: Record<string, string> = {
        'skin-care': 'Skin Care & Anti-Pigmentation',
        'hair-care': 'Hair Care & Conditioning',
        'sun-care': 'Sun Care & Photoprotection',
        'color-cosmetics': 'Color Cosmetics & Make-up',
        'bath-body': 'Bath, Body & Mild Cleansing',
        'biotechnology': 'Active Bio-Technology & Greentech'
      };

      if (hash.startsWith('#business-lines/')) {
        const lineSlug = hash.replace('#business-lines/', '');
        if (lineMap[lineSlug]) {
          setSelectedSupplierId('all-products');
          setSelectedBusinessLine(lineMap[lineSlug]);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      } else if (path.startsWith('/business-lines/')) {
        const lineSlug = path.replace('/business-lines/', '').replace('/', '');
        if (lineMap[lineSlug]) {
          setSelectedSupplierId('all-products');
          setSelectedBusinessLine(lineMap[lineSlug]);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }

      // Dedicated SNS Silcos Partner Microsite internal route handling
      if (
        hash === '#partners/sns-silcos' ||
        hash === '#/partners/sns-silcos' ||
        hash === '#supplier/sns-silcos' ||
        path === '/partners/sns-silcos' ||
        path.startsWith('/partners/sns-silcos')
      ) {
        setSelectedSupplierId('sns-silcos');
        setSelectedBusinessLine(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (hash.startsWith('#supplier/')) {
        const id = hash.replace('#supplier/', '') as 'greentech' | 'sns-silcos' | 'fine-organics' | 'vvf-limited' | 'vvf-fine-organics' | 'general-range' | 'all-products';
        if (['greentech', 'sns-silcos', 'fine-organics', 'vvf-limited', 'vvf-fine-organics', 'general-range', 'all-products'].includes(id)) {
          setSelectedSupplierId(id);
          setSelectedBusinessLine(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else if (hash === '#catalogue' || hash === '#products') {
        setSelectedSupplierId('all-products');
        setSelectedBusinessLine(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (path.startsWith('/suppliers/')) {
        const id = path.replace('/suppliers/', '') as any;
        if (['greentech', 'sns-silcos', 'fine-organics', 'vvf-limited', 'vvf-fine-organics', 'general-range', 'all-products'].includes(id)) {
          setSelectedSupplierId(id);
          setSelectedBusinessLine(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else if (hash.startsWith('#product/')) {
        const slug = hash.replace('#product/', '');
        const found = ALL_PRODUCTS.find(p => p.slug === slug || p.id === slug);
        if (found) {
          setSelectedProduct(found);
        }
      } else if (!hash || hash === '#' || hash === '#hero' || hash === '#portfolio' || hash === '#partners' || hash === '#about' || hash === '#contact' || hash === '#vision-mission' || hash === '#industries' || hash === '#why-us') {
        setSelectedSupplierId(null);
        setSelectedBusinessLine(null);
      }
    };

    handleNavigationChange();
    window.addEventListener('hashchange', handleNavigationChange);
    window.addEventListener('popstate', handleNavigationChange);
    return () => {
      window.removeEventListener('hashchange', handleNavigationChange);
      window.removeEventListener('popstate', handleNavigationChange);
    };
  }, []);

  const handleSelectSupplier = (supplierId: 'greentech' | 'sns-silcos' | 'fine-organics' | 'vvf-limited' | 'vvf-fine-organics' | 'general-range' | 'all-products') => {
    setSelectedSupplierId(supplierId);
    if (supplierId === 'sns-silcos') {
      window.location.hash = '#partners/sns-silcos';
      if (window.history && window.history.pushState) {
        try {
          window.history.pushState(null, '', '/partners/sns-silcos');
        } catch {
          // ignore if history pushState is restricted
        }
      }
    } else {
      window.location.hash = `#supplier/${supplierId}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToOverview = (targetSection?: string) => {
    const returnTarget = targetSection || (selectedBusinessLine ? 'industries' : 'portfolio');
    setSelectedSupplierId(null);
    setSelectedBusinessLine(null);
    if (window.history && window.history.pushState && window.location.pathname !== '/') {
      try {
        window.history.pushState(null, '', `/#${returnTarget}`);
      } catch {
        // fallback
      }
    }
    window.location.hash = `#${returnTarget}`;
    setTimeout(() => {
      const el = document.getElementById(returnTarget);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleExploreBusinessLine = (route: string, businessLineName: string) => {
    setSelectedSupplierId('all-products');
    setSelectedBusinessLine(businessLineName);
    window.location.hash = `#business-lines/${route}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: ProductItem) => {
    setSelectedProduct(product);
    window.location.hash = `#product/${product.slug}`;
  };

  const handleCloseProductModal = () => {
    setSelectedProduct(null);
    if (selectedSupplierId) {
      window.location.hash = `#supplier/${selectedSupplierId}`;
    } else {
      window.location.hash = '#portfolio';
    }
  };

  const handleOpenInquiry = (categoryOrPartner?: string) => {
    if (categoryOrPartner) {
      setInquiryCategory(categoryOrPartner);
    }
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRequestSample = (product: ProductItem) => {
    setSelectedProduct(null);
    setSelectedSupplierId(null);
    setInquiryCategory(`Sample Request: ${product.name} (Code: ${product.code || 'N/A'}, Category: ${product.category}) [Supplier: ${product.supplierId}]`);
    window.location.hash = '#contact';
    setTimeout(() => {
      const contactElement = document.getElementById('contact');
      if (contactElement) {
        contactElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleRequestQuote = (product: ProductItem) => {
    setSelectedProduct(null);
    setSelectedSupplierId(null);
    setInquiryCategory(`Quotation & TDS: ${product.name} (Code: ${product.code || 'N/A'}) [Supplier: ${product.supplierId}]`);
    window.location.hash = '#contact';
    setTimeout(() => {
      const contactElement = document.getElementById('contact');
      if (contactElement) {
        contactElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-white text-gray-900 selection:bg-emerald-100 selection:text-emerald-950 relative">
      {/* 1. Dynamic Biotech Molecular Network, Floating Benzene Rings, Chemical Shapes & Green Dots Animation throughout scroll */}
      <AnimatedBackground />

      {/* 2. Slim Top Viewport Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* 3. Top Header Bar with Pure White Logo Section, Desktop Links & Responsive Mobile Hamburger Drawer */}
      <Navbar onOpenInquiry={handleOpenInquiry} />

      {/* Main Page Content - Conditional between Dedicated Supplier Listing Page vs Full Corporate Showcase */}
      <main className="flex-grow w-full min-w-0 relative z-10">
        <React.Suspense
          fallback={
            <div className="w-full min-h-[60vh] flex flex-col items-center justify-center py-20 text-emerald-800">
              <div className="w-9 h-9 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mb-3" />
              <span className="text-sm font-semibold tracking-wide">Loading Catalogue &amp; Products...</span>
            </div>
          }
        >
          {selectedSupplierId === 'sns-silcos' ? (
            /* Level 2A: Dedicated Premium SNS Silcos Partner Microsite */
            <SnsSilcosMicrosite
              onBackToOverview={handleBackToOverview}
              onSelectProduct={handleSelectProduct}
              onRequestSample={handleRequestSample}
              onRequestQuote={handleRequestQuote}
              onOpenInquiry={handleOpenInquiry}
            />
          ) : selectedSupplierId ? (
            /* Level 2B: Dedicated Supplier Product Listing Page */
            <SupplierCataloguePage
              supplierId={selectedSupplierId}
              initialBusinessLine={selectedBusinessLine || undefined}
              onBackToOverview={handleBackToOverview}
              onSelectProduct={handleSelectProduct}
              onRequestSample={handleRequestSample}
              onOpenInquiry={handleOpenInquiry}
            />
          ) : (
            /* Level 1 & Complete Website Showcase */
            <>
            {/* 1. Automated & Animated Showcase Hero */}
            <Hero 
              onOpenInquiry={handleOpenInquiry} 
              onOpenExplorer={() => setIsExplorerOpen(true)}
            />

            {/* 2. Corporate Profile, Vision & Mission, 6 Pillars with Automated Animation */}
            <FadeInSection direction="up" delay={50} threshold={0.08}>
              <AboutSection onOpenInquiry={handleOpenInquiry} />
            </FadeInSection>

            {/* 3. OUR GLOBAL PARTNERS & PRODUCT PORTFOLIO - Unified Showcase */}
            {isPartnersSectionVisible ? (
              <FadeInSection direction="up" delay={50} threshold={0.08}>
                <GlobalPartnersProductPortfolioSection
                  onSelectSupplier={handleSelectSupplier}
                  onSelectProduct={handleSelectProduct}
                  onRequestSample={handleRequestSample}
                  onRequestQuote={handleRequestQuote}
                  onOpenInquiry={handleOpenInquiry}
                  onRemoveSection={() => setIsPartnersSectionVisible(false)}
                />
              </FadeInSection>
            ) : (
              <div className="py-6 sm:py-8 bg-emerald-50/70 border-y border-emerald-200/80 px-4 text-center">
                <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
                  <div className="flex items-center space-x-2 text-[#072414] font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
                    <span>Global Partners &amp; Product Portfolio section is currently removed from homepage view.</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <button
                      onClick={() => setIsPartnersSectionVisible(true)}
                      className="px-4 py-1.5 rounded-full bg-white hover:bg-emerald-50 text-emerald-950 font-bold border border-emerald-300 transition-colors shadow-2xs cursor-pointer text-xs"
                    >
                      Restore Section
                    </button>
                    <button
                      onClick={() => handleSelectSupplier('all-products')}
                      className="px-4 py-1.5 rounded-full bg-[#072414] hover:bg-emerald-900 text-white font-bold transition-colors shadow-2xs cursor-pointer text-xs"
                    >
                      Open Catalogue on Next Page →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Application Sectors & Specialty Ingredients - Horizontal Slider */}
            <FadeInSection direction="up" delay={50} threshold={0.08}>
              <IndustriesSection 
                onOpenInquiry={handleOpenInquiry} 
                onOpenExplorer={() => setIsExplorerOpen(true)}
                onExploreBusinessLine={handleExploreBusinessLine}
              />
            </FadeInSection>

            {/* 6. The Mindtech Edge - 6 Pillars in an Ultra-Sleek Bento Card Grid */}
            <FadeInSection direction="up" delay={50} threshold={0.08}>
              <WhyChooseUsSection onOpenInquiry={handleOpenInquiry} />
            </FadeInSection>

            {/* 7. Central Facility Desk, Bawana Warehouse Hub & Sample Request Form */}
            <FadeInSection direction="up" delay={50} threshold={0.08}>
              <ContactSection initialSubject={inquiryCategory} />
            </FadeInSection>
          </>
        )}
        </React.Suspense>
      </main>

      {/* Corporate Multi-Column Molecular Footer */}
      <FadeInSection direction="none" delay={0} threshold={0.05}>
        <Footer onOpenInquiry={handleOpenInquiry} />
      </FadeInSection>

      {/* Floating ScrollToTop Button with Smooth Header Return & Emerald Branding */}
      <ScrollToTop />

      {/* Interactive Ingredient & Formulation Explorer Modal & Product Detail Datasheet Modal */}
      <React.Suspense fallback={null}>
        {isExplorerOpen && (
          <IngredientExplorerModal
            isOpen={isExplorerOpen}
            onClose={() => setIsExplorerOpen(false)}
            onRequestSample={handleOpenInquiry}
          />
        )}

        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            onClose={handleCloseProductModal}
            onRequestSample={handleRequestSample}
            onRequestQuote={handleRequestQuote}
          />
        )}
      </React.Suspense>
    </div>
  );
}
