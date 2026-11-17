/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { GlobalPartnersProductPortfolioSection } from './components/portfolio/GlobalPartnersProductPortfolioSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FadeInSection } from './components/FadeInSection';
import { ScrollToTop } from './components/ScrollToTop';
import { ProductItem, ALL_PRODUCTS } from './data/supplierProductsData';
import { ErrorBoundary } from './components/ErrorBoundary';

// Code-split heavy partner microsites, catalogues, PDF generators & modals
const SupplierCataloguePage = lazy(() =>
  import('./components/portfolio/SupplierCataloguePage').then((m) => ({ default: m.SupplierCataloguePage }))
);
const SnsSilcosMicrosite = lazy(() =>
  import('./components/portfolio/SnsSilcosMicrosite').then((m) => ({ default: m.SnsSilcosMicrosite }))
);
const ProductDetailModal = lazy(() =>
  import('./components/portfolio/ProductDetailModal').then((m) => ({ default: m.ProductDetailModal }))
);
const IngredientExplorerModal = lazy(() =>
  import('./components/IngredientExplorerModal').then((m) => ({ default: m.IngredientExplorerModal }))
);

const PageChunkFallback = () => (
  <div className="min-h-[45vh] flex items-center justify-center py-16">
    <div className="w-8 h-8 rounded-full border-2 border-emerald-600 border-t-transparent animate-spin" />
  </div>
);

export default function App() {
  const [inquiryCategory, setInquiryCategory] = useState<string | undefined>(undefined);
  const [isExplorerOpen, setIsExplorerOpen] = useState(false);
  const [mapsQuotaExceeded, setMapsQuotaExceeded] = useState(false);

  // Supplier & Product view routing states
  const [selectedSupplierId, setSelectedSupplierId] = useState<'greentech' | 'sns-silcos' | 'fine-organics' | 'vvf-limited' | 'vvf-fine-organics' | 'general-range' | 'all-products' | null>(null);
  const [selectedBusinessLine, setSelectedBusinessLine] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  useEffect(() => {
    const handleQuotaExceeded = () => setMapsQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuotaExceeded);
  }, []);

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

      // Dedicated Greentech Master Catalogue Route
      if (
        hash === '#portfolio/greentech' ||
        hash === '#/portfolio/greentech' ||
        hash === '#greentech' ||
        path === '/portfolio/greentech' ||
        path.startsWith('/portfolio/greentech') ||
        hash.startsWith('#ingredient/')
      ) {
        setSelectedSupplierId('greentech');
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

  const handleSelectSupplier = useCallback((supplierId: 'greentech' | 'sns-silcos' | 'fine-organics' | 'vvf-limited' | 'vvf-fine-organics' | 'general-range' | 'all-products') => {
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
  }, []);

  const handleNavigateHome = useCallback((targetSection?: string) => {
    setSelectedProduct(null);
    setSelectedSupplierId(null);
    setSelectedBusinessLine(null);
    const nextUrl = targetSection && targetSection !== 'hero' ? `/#${targetSection}` : '/';
    if (window.history && window.history.pushState) {
      try {
        window.history.pushState(null, '', nextUrl);
      } catch {
        window.location.hash = targetSection && targetSection !== 'hero' ? `#${targetSection}` : '';
      }
    }
    if (!targetSection || targetSection === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setTimeout(() => {
      const el = document.getElementById(targetSection);
      if (el) {
        const headerOffset = window.innerWidth >= 1536 ? 120 : window.innerWidth >= 1280 ? 108 : 92;
        const offsetPosition = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }, 80);
  }, []);

  const handleBackToOverview = useCallback((targetSection?: string) => {
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
  }, [selectedBusinessLine]);

  const handleSelectProduct = useCallback((product: ProductItem) => {
    setSelectedProduct(product);
    window.location.hash = `#product/${product.slug}`;
  }, []);

  const handleCloseProductModal = useCallback(() => {
    setSelectedProduct(null);
    if (selectedSupplierId) {
      window.location.hash = `#supplier/${selectedSupplierId}`;
    } else {
      window.location.hash = '#portfolio';
    }
  }, [selectedSupplierId]);

  const handleOpenInquiry = useCallback((categoryOrPartner?: string) => {
    if (categoryOrPartner) {
      setInquiryCategory(categoryOrPartner);
    }
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      handleNavigateHome('contact');
    }
  }, [handleNavigateHome]);

  const handleRequestSample = useCallback((product: ProductItem) => {
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
  }, []);

  const handleRequestQuote = useCallback((product: ProductItem) => {
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
  }, []);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-white text-gray-900 selection:bg-emerald-100 selection:text-emerald-950 relative">
      {mapsQuotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      {/* 1. Dynamic Biotech Molecular Network, Floating Benzene Rings, Chemical Shapes & Green Dots Animation throughout scroll */}
      <AnimatedBackground />

      {/* 2. Slim Top Viewport Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* 3. Top Header Bar with Pure White Logo Section, Desktop Links & Responsive Mobile Hamburger Drawer */}
      <Navbar onOpenInquiry={handleOpenInquiry} onNavigateHome={handleNavigateHome} />

      {/* Main Page Content - Conditional between Dedicated Supplier Listing Page vs Full Corporate Showcase */}
      <main className="flex-grow w-full min-w-0 relative z-10">
        <ErrorBoundary>
          {selectedSupplierId === 'sns-silcos' ? (
            /* Level 2A: Dedicated Premium SNS Silcos Partner Microsite */
            <Suspense fallback={<PageChunkFallback />}>
              <SnsSilcosMicrosite
                onBackToOverview={handleBackToOverview}
                onSelectProduct={handleSelectProduct}
                onRequestSample={handleRequestSample}
                onRequestQuote={handleRequestQuote}
                onOpenInquiry={handleOpenInquiry}
              />
            </Suspense>
          ) : selectedSupplierId ? (
            /* Level 2B: Dedicated Supplier Product Listing Page */
            <Suspense fallback={<PageChunkFallback />}>
              <SupplierCataloguePage
                supplierId={selectedSupplierId}
                initialBusinessLine={selectedBusinessLine || undefined}
                onBackToOverview={handleBackToOverview}
                onSelectProduct={handleSelectProduct}
                onRequestSample={handleRequestSample}
                onRequestQuote={handleRequestQuote}
                onOpenInquiry={handleOpenInquiry}
              />
            </Suspense>
          ) : (
            /* Level 1 & Complete Website Showcase */
            <>
              {/* 1. Automated & Animated Showcase Hero */}
              <Hero 
                onOpenInquiry={handleOpenInquiry} 
                onOpenExplorer={() => setIsExplorerOpen(true)}
              />

              {/* 2. Corporate Profile, Vision & Mission, Operational Pillars with Automated Animation */}
              <FadeInSection direction="up" delay={50} threshold={0.08}>
                <AboutSection onOpenInquiry={handleOpenInquiry} />
              </FadeInSection>

              {/* 3. OUR GLOBAL PARTNERS & PRODUCT PORTFOLIO - Unified Showcase */}
              <FadeInSection direction="up" delay={50} threshold={0.08}>
                <GlobalPartnersProductPortfolioSection
                  onSelectSupplier={handleSelectSupplier}
                  onSelectProduct={handleSelectProduct}
                  onRequestSample={handleRequestSample}
                  onRequestQuote={handleRequestQuote}
                  onOpenInquiry={handleOpenInquiry}
                />
              </FadeInSection>

              {/* 5. The Mindtech Edge - Authentic Facilities & Core Operational Pillars */}
              <FadeInSection direction="up" delay={50} threshold={0.08}>
                <WhyChooseUsSection onOpenInquiry={handleOpenInquiry} />
              </FadeInSection>

              {/* 6. Central Facility Desk, Bawana Warehouse Hub & Sample Request Form */}
              <FadeInSection direction="up" delay={50} threshold={0.08}>
                <ContactSection initialSubject={inquiryCategory} />
              </FadeInSection>
            </>
          )}
        </ErrorBoundary>
      </main>

      {/* Corporate Multi-Column Molecular Footer */}
      <FadeInSection direction="none" delay={0} threshold={0.05}>
        <Footer onOpenInquiry={handleOpenInquiry} />
      </FadeInSection>

      {/* Floating ScrollToTop Button with Smooth Header Return & Emerald Branding */}
      <ScrollToTop />

      {/* Interactive Ingredient & Formulation Explorer Modal & Product Detail Datasheet Modal */}
      <ErrorBoundary>
        {isExplorerOpen && (
          <Suspense fallback={null}>
            <IngredientExplorerModal
              isOpen={isExplorerOpen}
              onClose={() => setIsExplorerOpen(false)}
              onRequestSample={handleOpenInquiry}
            />
          </Suspense>
        )}

        {selectedProduct && (
          <Suspense fallback={null}>
            <ProductDetailModal
              product={selectedProduct}
              onClose={handleCloseProductModal}
              onRequestSample={handleRequestSample}
              onRequestQuote={handleRequestQuote}
            />
          </Suspense>
        )}
      </ErrorBoundary>
    </div>
  );
}
