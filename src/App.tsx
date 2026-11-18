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
import { ProductItem, ALL_PRODUCTS, SUPPLIER_PROFILES } from './data/supplierProductsData';
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
const SampleEnquiryModal = lazy(() =>
  import('./components/portfolio/SampleEnquiryModal').then((m) => ({ default: m.SampleEnquiryModal }))
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
  const [enquiryModalState, setEnquiryModalState] = useState<{
    isOpen: boolean;
    mode: 'sample' | 'quotation';
    productName?: string;
    productCode?: string;
    productInci?: string;
    dosage?: string;
    supplierName?: string;
  }>({ isOpen: false, mode: 'sample' });

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
      } else if (path.startsWith('/portfolio/fine-organics')) {
        setSelectedSupplierId('fine-organics');
        setSelectedBusinessLine(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      } else if (path.startsWith('/portfolio/vvf-limited')) {
        setSelectedSupplierId('vvf-limited');
        setSelectedBusinessLine(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      } else if (path.startsWith('/suppliers/')) {
        const id = path.replace('/suppliers/', '').replace(/\/$/, '') as any;
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

  // Synchronize per-page SEO metadata (<title>, description, canonical, robots, OpenGraph, Twitter, BreadcrumbList JSON-LD)
  useEffect(() => {
    const baseDomain = 'https://mindtech-bio.com';
    const rawPath = (window.location.pathname || '/').replace(/\/+$/, '') || '/';
    const currentPath = rawPath === '/index.html' ? '/' : rawPath;
    const knownPaths = new Set([
      '/',
      '/partners/sns-silcos',
      '/portfolio/greentech',
      '/portfolio/fine-organics',
      '/portfolio/vvf-limited',
      '/suppliers/fine-organics',
      '/suppliers/vvf-limited',
      '/suppliers/general-range',
      '/suppliers/all-products',
      '/business-lines/skin-care',
      '/business-lines/hair-care',
      '/business-lines/sun-care',
      '/business-lines/color-cosmetics',
      '/business-lines/bath-body',
      '/business-lines/biotechnology',
    ]);
    const isUnknownRoute = !knownPaths.has(currentPath);

    const businessLineSlugMap: Record<string, string> = {
      'Skin Care & Anti-Pigmentation': 'skin-care',
      'Hair Care & Conditioning': 'hair-care',
      'Sun Care & Photoprotection': 'sun-care',
      'Color Cosmetics & Make-up': 'color-cosmetics',
      'Bath, Body & Mild Cleansing': 'bath-body',
      'Active Bio-Technology & Greentech': 'biotechnology',
    };

    const routeSeoMap: Record<string, { title: string; description: string; path: string; label: string }> = {
      greentech: {
        title: 'Greentech Cosmetic Ingredients India | Mindtech Biotechnology',
        description: 'Explore Greentech cosmetic bio-actives, botanical oils, biotechnology ingredients and skin and hair care formulation ingredients through Mindtech Biotechnology India.',
        path: '/portfolio/greentech',
        label: 'Greentech Biotechnologies',
      },
      'sns-silcos': {
        title: 'SNS Silcos Silicone Ingredients India | Mindtech Biotechnology',
        description: 'Explore SNS Silcos specialty silicone fluids, elastomer gels, MQ resins and micro-emulsions for skin care and hair care formulations in India at Mindtech Biotechnology.',
        path: '/partners/sns-silcos',
        label: 'SNS Silcos',
      },
      'fine-organics': {
        title: 'Fine Organics Esters & Emulsifiers | Mindtech Biotechnology',
        description: 'Browse Fine Organics specialty esters, bio-solubilizers, glyceryl esters and structuring waxes supplied across India by Mindtech Biotechnology.',
        path: '/suppliers/fine-organics',
        label: 'Fine Organics',
      },
      'vvf-limited': {
        title: 'VVF Limited Surfactants & Conditioning | Mindtech Biotechnology',
        description: 'Discover VVF Limited VEGAROL cationic conditioning quats, Promisoft BTMS emulsifiers and SCI syndet bases supplied in India by Mindtech Biotechnology.',
        path: '/suppliers/vvf-limited',
        label: 'VVF Limited',
      },
      'general-range': {
        title: 'General Cosmetic Ingredients Range | Mindtech Biotechnology India',
        description: 'Cosmetic actives, UV filters, niacinamide, arbutin and mild surfactants available from Mindtech Biotechnology India Bawana warehouse.',
        path: '/suppliers/general-range',
        label: 'General Ingredient Range',
      },
      'all-products': {
        title: 'Cosmetic Ingredient Portfolio India | Mindtech Biotechnology',
        description: 'Complete multi-supplier portfolio of cosmetic raw materials from Greentech, SNS Silcos, Fine Organics and VVF Limited at Mindtech Biotechnology.',
        path: '/suppliers/all-products',
        label: 'Product Portfolio',
      },
    };

    let seo = {
      title: 'Mindtech Biotechnology | Cosmetic Raw Material Supplier India',
      description: 'Mindtech Biotechnology supplies cosmetic and personal care ingredients in India, including bio-actives, specialty silicones, emulsifiers, esters and surfactants.',
      path: '/',
      label: 'Home',
    };

    if (selectedBusinessLine && businessLineSlugMap[selectedBusinessLine]) {
      const slug = businessLineSlugMap[selectedBusinessLine];
      seo = {
        title: `${selectedBusinessLine} Ingredients | Mindtech Biotechnology`,
        description: `Browse verified raw materials and cosmetic actives for ${selectedBusinessLine} formulations supplied across India by Mindtech Biotechnology.`,
        path: `/business-lines/${slug}`,
        label: selectedBusinessLine,
      };
    } else if (selectedSupplierId && routeSeoMap[selectedSupplierId]) {
      seo = routeSeoMap[selectedSupplierId];
    }

    if (selectedProduct) {
      seo = {
        title: `${selectedProduct.name} | Mindtech Biotechnology`,
        description: `${selectedProduct.name} (${selectedProduct.inci || selectedProduct.category}) — request technical datasheet (TDS), COA or certified 100g bench sample from Mindtech Biotechnology India.`,
        path: seo.path,
        label: selectedProduct.name,
      };
    }

    const canonicalUrl = `${baseDomain}${seo.path}`;
    document.title = isUnknownRoute ? 'Page Not Found | Mindtech Biotechnology' : seo.title;

    const setMeta = (selector: string, content: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute('content', content);
    };

    setMeta('meta[name="robots"]', isUnknownRoute ? 'noindex, nofollow' : 'index, follow');
    setMeta('meta[name="description"]', seo.description);
    setMeta('meta[property="og:title"]', seo.title);
    setMeta('meta[property="og:description"]', seo.description);
    setMeta('meta[property="og:url"]', canonicalUrl);
    setMeta('meta[name="twitter:title"]', seo.title);
    setMeta('meta[name="twitter:description"]', seo.description);

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', canonicalUrl);
    }

    // Maintain BreadcrumbList Schema.org JSON-LD for sub-routes
    let breadcrumbScript = document.getElementById('dynamic-breadcrumb-jsonld') as HTMLScriptElement | null;
    if (seo.path !== '/' && !isUnknownRoute) {
      if (!breadcrumbScript) {
        breadcrumbScript = document.createElement('script');
        breadcrumbScript.id = 'dynamic-breadcrumb-jsonld';
        breadcrumbScript.type = 'application/ld+json';
        document.head.appendChild(breadcrumbScript);
      }
      const items: Array<{ '@type': string; position: number; name: string; item: string }> = [
        { '@type': 'ListItem', position: 1, name: 'Mindtech Biotechnology', item: `${baseDomain}/` },
        { '@type': 'ListItem', position: 2, name: seo.label, item: canonicalUrl },
      ];
      breadcrumbScript.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items,
      });
    } else if (breadcrumbScript) {
      breadcrumbScript.remove();
    }
  }, [selectedSupplierId, selectedBusinessLine, selectedProduct]);

  const handleSelectSupplier = useCallback((supplierId: 'greentech' | 'sns-silcos' | 'fine-organics' | 'vvf-limited' | 'vvf-fine-organics' | 'general-range' | 'all-products') => {
    setSelectedSupplierId(supplierId);
    setSelectedBusinessLine(null);
    const cleanPathMap: Record<string, string> = {
      greentech: '/portfolio/greentech',
      'sns-silcos': '/partners/sns-silcos',
      'fine-organics': '/suppliers/fine-organics',
      'vvf-limited': '/suppliers/vvf-limited',
      'general-range': '/suppliers/general-range',
      'all-products': '/suppliers/all-products',
    };
    const nextPath = cleanPathMap[supplierId];
    if (nextPath && window.history && window.history.pushState) {
      try {
        window.history.pushState(null, '', nextPath);
      } catch {
        window.location.hash = `#supplier/${supplierId}`;
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

  const resolveSupplierLabel = useCallback((product: ProductItem) => {
    if (product.subSupplier) return product.subSupplier;
    return SUPPLIER_PROFILES[product.supplierId]?.name || product.supplierId;
  }, []);

  const handleRequestSample = useCallback((product: ProductItem) => {
    setSelectedProduct(null);
    setEnquiryModalState({
      isOpen: true,
      mode: 'sample',
      productName: product.name,
      productCode: product.code,
      productInci: product.inci,
      dosage: product.dosage,
      supplierName: resolveSupplierLabel(product),
    });
  }, [resolveSupplierLabel]);

  const handleRequestQuote = useCallback((product: ProductItem) => {
    setSelectedProduct(null);
    setEnquiryModalState({
      isOpen: true,
      mode: 'quotation',
      productName: product.name,
      productCode: product.code,
      productInci: product.inci,
      dosage: product.dosage,
      supplierName: resolveSupplierLabel(product),
    });
  }, [resolveSupplierLabel]);

  const handleOpenSampleQuoteModal = useCallback(
    (opts: { mode: 'sample' | 'quotation'; productName?: string; supplierName?: string }) => {
      setEnquiryModalState({
        isOpen: true,
        mode: opts.mode,
        productName: opts.productName,
        supplierName: opts.supplierName || 'Mindtech Multi-Principal Portfolio',
      });
    },
    []
  );

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
                onOpenSampleQuoteModal={handleOpenSampleQuoteModal}
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
                onOpenSampleQuoteModal={handleOpenSampleQuoteModal}
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
                  onOpenSampleQuoteModal={handleOpenSampleQuoteModal}
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

        {enquiryModalState.isOpen && (
          <Suspense fallback={null}>
            <SampleEnquiryModal
              isOpen={enquiryModalState.isOpen}
              onClose={() => setEnquiryModalState((prev) => ({ ...prev, isOpen: false }))}
              productName={enquiryModalState.productName}
              productCode={enquiryModalState.productCode}
              productInci={enquiryModalState.productInci}
              dosage={enquiryModalState.dosage}
              supplierName={enquiryModalState.supplierName}
              initialMode={enquiryModalState.mode}
              onOpenEmailDesk={(customMsg) => handleOpenInquiry(customMsg)}
            />
          </Suspense>
        )}
      </ErrorBoundary>
    </div>
  );
}
