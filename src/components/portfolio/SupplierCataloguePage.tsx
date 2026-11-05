import React, { useState, useMemo } from 'react';
import { 
  SupplierId,
  ProductItem, 
  ALL_PRODUCTS, 
  SUPPLIER_PROFILES,
  BUSINESS_LINES,
  getProductBusinessLines,
  VVF_PORTFOLIO_CATEGORIES,
  FINE_ORGANICS_PORTFOLIO_CATEGORIES
} from '../../data/supplierProductsData';
import { ProductCard } from './ProductCard';
import { PartnerLogoRenderer } from '../PartnerLogos';
import { GreentechMasterCatalogue } from './GreentechMasterCatalogue';
import { GreentechExactReplicaCatalogue } from './GreentechExactReplicaCatalogue';
import { UniversalPartnerReplicaCatalogue } from './UniversalPartnerReplicaCatalogue';
import { 
  Search, 
  X, 
  ChevronRight, 
  ArrowLeft, 
  FlaskConical, 
  CheckCircle2, 
  SlidersHorizontal, 
  Send, 
  ShieldCheck,
  Building2,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

interface SupplierCataloguePageProps {
  supplierId: SupplierId;
  initialBusinessLine?: string;
  onBackToOverview: () => void;
  onSelectProduct: (product: ProductItem) => void;
  onRequestSample: (product: ProductItem) => void;
  onOpenInquiry: (topic?: string) => void;
}

export const SupplierCataloguePage: React.FC<SupplierCataloguePageProps> = ({
  supplierId,
  initialBusinessLine,
  onBackToOverview,
  onSelectProduct,
  onRequestSample,
  onOpenInquiry
}) => {
  const supplier = SUPPLIER_PROFILES[supplierId];
  const isAllProducts = supplierId === 'all-products';
  const isFineOrganics = supplierId === 'fine-organics';
  const isVvfLimited = supplierId === 'vvf-limited';
  const isVvfFineOrganics = supplierId === 'vvf-fine-organics';
  const isFamilyBasedSupplier = isFineOrganics || isVvfLimited || isVvfFineOrganics;

  // Sub-supplier tab state for legacy dual view if accessed
  const [activeSubSupplier, setActiveSubSupplier] = useState<'VVF Limited' | 'Fine Organics'>(
    isFineOrganics ? 'Fine Organics' : 'VVF Limited'
  );

  // Search and Multi-Dimensional Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSupplierFilter, setSelectedSupplierFilter] = useState<string>('All');
  const [selectedCatalogOrigin, setSelectedCatalogOrigin] = useState<string>('All');
  const [selectedBusinessLine, setSelectedBusinessLine] = useState<string>(initialBusinessLine || 'All Business Lines');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Keep selectedBusinessLine in sync if initialBusinessLine changes
  React.useEffect(() => {
    if (initialBusinessLine) {
      setSelectedBusinessLine(initialBusinessLine);
    }
  }, [initialBusinessLine]);

  // Supplier Products Pool
  const supplierProducts = useMemo(() => {
    if (isAllProducts) {
      return ALL_PRODUCTS;
    }
    return ALL_PRODUCTS.filter(p => p.supplierId === supplierId);
  }, [supplierId, isAllProducts]);

  // Extract unique categories for this supplier / pool
  const categories = useMemo(() => {
    let pool = supplierProducts;
    if (isAllProducts && selectedSupplierFilter !== 'All') {
      pool = pool.filter(p => p.supplierId === selectedSupplierFilter);
    }
    const cats = Array.from(new Set(pool.map(p => p.category)));
    return ['All', ...cats.sort()];
  }, [supplierProducts, isAllProducts, selectedSupplierFilter]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return supplierProducts.filter(product => {
      // 1. Supplier filter (when in all-products mode)
      if (isAllProducts && selectedSupplierFilter !== 'All') {
        if (product.supplierId !== selectedSupplierFilter) {
          return false;
        }
      }

      // 2. Catalog Origin filter (Blended view)
      if (selectedCatalogOrigin !== 'All') {
        if (product.catalogOrigin !== selectedCatalogOrigin) {
          return false;
        }
      }

      // 3. Business Line filter
      if (selectedBusinessLine !== 'All Business Lines') {
        const lines = getProductBusinessLines(product);
        if (!lines.includes(selectedBusinessLine)) {
          return false;
        }
      }

      // 4. Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }

      // 5. Search query
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const nameMatch = product.name.toLowerCase().includes(q);
      const codeMatch = product.code?.toLowerCase().includes(q) ?? false;
      const inciMatch = product.inci.toLowerCase().includes(q);
      const categoryMatch = product.category.toLowerCase().includes(q);
      const applicationMatch = product.application.toLowerCase().includes(q);
      const useMatch = product.mainUse.toLowerCase().includes(q);
      const supplierMatch = product.supplierId.toLowerCase().includes(q);
      const formMatch = product.physicalForm?.toLowerCase().includes(q) ?? false;
      const originMatch = product.catalogOrigin?.toLowerCase().includes(q) ?? false;

      return nameMatch || codeMatch || inciMatch || categoryMatch || applicationMatch || useMatch || supplierMatch || formMatch || originMatch;
    });
  }, [supplierProducts, isAllProducts, selectedSupplierFilter, selectedCatalogOrigin, selectedBusinessLine, selectedCategory, searchQuery]);

  // Dedicated Greentech 5-Brochure (136 pp.) Catalogue View
  if (supplierId === 'greentech') {
    return (
      <div className="w-full max-w-full overflow-x-hidden bg-[#fbfdfc] min-h-screen py-6 sm:py-8 text-left">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 space-y-6">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-xs sm:text-sm font-semibold text-gray-500 overflow-x-auto whitespace-nowrap pb-1">
            <button
              onClick={onBackToOverview}
              className="hover:text-emerald-800 transition-colors flex items-center space-x-1 cursor-pointer"
            >
              <span>Home</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <button
              onClick={onBackToOverview}
              className="hover:text-emerald-800 transition-colors cursor-pointer"
            >
              Global Product Portfolio
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span className="text-emerald-950 font-bold">
              Greentech Biotechnologies (France)
            </span>
          </nav>

          {/* Back Button Banner */}
          <div className="flex items-center justify-between">
            <button
              onClick={onBackToOverview}
              className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-emerald-900 bg-white hover:bg-emerald-50 px-4 py-2 rounded-full border border-gray-200/90 shadow-2xs transition-all cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 text-emerald-700 group-hover:-translate-x-1 transition-transform" />
              <span>Back to All Suppliers</span>
            </button>

            <span className="text-xs font-mono text-gray-500 hidden sm:inline-block">
              136 Pages / 5 Technical Brochures Indexed
            </span>
          </div>

          <GreentechMasterCatalogue
            onBackToOverview={onBackToOverview}
            onOpenInquiry={onOpenInquiry}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full overflow-x-hidden bg-[#fbfdfc] min-h-screen py-6 sm:py-8 text-left">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 space-y-6">
        
        {/* 1. Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs sm:text-sm font-semibold text-gray-500 overflow-x-auto whitespace-nowrap pb-1">
          <button
            onClick={onBackToOverview}
            className="hover:text-emerald-800 transition-colors flex items-center space-x-1 cursor-pointer"
          >
            <span>Home</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <button
            onClick={onBackToOverview}
            className="hover:text-emerald-800 transition-colors cursor-pointer"
          >
            Global Product Portfolio
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <span className="text-emerald-950 font-bold">
            {supplier?.name || 'Catalogue'}
          </span>
        </nav>

        {/* Back Button Banner */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBackToOverview}
            className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-emerald-900 bg-white hover:bg-emerald-50 px-4 py-2 rounded-full border border-gray-200/90 shadow-2xs transition-all cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-700 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Suppliers</span>
          </button>

          <span className="text-xs font-mono text-gray-500 hidden sm:inline-block">
            Verified Mindtech Catalog 2026/27
          </span>
        </div>

        {/* 2. Supplier Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#062916] via-[#093a20] to-[#041c10] text-white p-6 sm:p-8 lg:p-10 shadow-xl border border-emerald-500/20">
          
          {/* Subtle Ambient Decorative Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Content (8 cols) */}
            <div className="lg:col-span-8 space-y-3.5">
              
              {/* Partner Logo & Origin Badge */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-md border border-white/40 flex items-center">
                  <PartnerLogoRenderer partnerId={supplierId} height={38} />
                </div>

                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold tracking-wider uppercase border border-emerald-400/30">
                  {supplier.country}
                </span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  {supplier.name}
                </h1>
                <p className="text-emerald-300 text-base sm:text-lg font-semibold mt-1">
                  {supplier.tagline}
                </p>
              </div>

              <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed max-w-3xl">
                {supplier.description}
              </p>

              {/* Key Strengths Pills */}
              <div className="pt-2 flex flex-wrap gap-2">
                {supplier.keyStrengths.map((strength, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-emerald-200 text-xs font-medium border border-emerald-400/20"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{strength}</span>
                  </span>
                ))}
              </div>

            </div>

            {/* Right Quick Summary Card (4 cols) */}
            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-300 font-bold block">
                Portfolio Snapshot
              </span>

              <div className="space-y-2 text-xs sm:text-sm text-emerald-50">
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-emerald-200/80">Verified Catalogue Entries</span>
                  <strong className="font-mono text-white text-base">
                    {isFineOrganics || isVvfLimited
                      ? '4 Documented Families'
                      : isVvfFineOrganics
                        ? '8 Documented Families'
                        : `${supplierProducts.length} Verified Products`}
                  </strong>
                </div>

                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-emerald-200/80">Batch Traceability</span>
                  <strong className="text-white">100% CoA / TDS</strong>
                </div>

                <div className="flex justify-between py-1">
                  <span className="text-emerald-200/80">Distribution Hub</span>
                  <strong className="text-white">Bawana, Delhi</strong>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onOpenInquiry(`Supplier Portfolio Inquiry: ${supplier.name}`)}
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-md cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Inquire Full Portfolio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>



        {/* 4. GREENTECH, SNS SILCOS, FINE ORGANICS, VVF LIMITED & GENERAL RANGE PRODUCT LISTING */}
        <div className="space-y-6 pt-2">
            
            {/* Search and Category Filter Bar */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/90 shadow-2xs space-y-4">
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                
                {/* Search Input */}
                <div className="relative w-full md:w-96">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, code, INCI, or benefit..."
                    className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Result Count and Clear Filters */}
                <div className="flex items-center space-x-3 text-xs w-full md:w-auto justify-between md:justify-end">
                  <span className="font-bold text-gray-700">
                    Showing <span className="text-emerald-800 font-extrabold">{filteredProducts.length}</span> of {supplierProducts.length} Products
                  </span>

                  {(selectedCategory !== 'All' || searchQuery) && (
                    <button
                      onClick={() => {
                        setSelectedCategory('All');
                        setSearchQuery('');
                      }}
                      className="text-xs font-bold text-emerald-800 hover:underline cursor-pointer"
                    >
                      Reset Filters
                    </button>
                  )}
                </div>

              </div>

              {/* Multi-Dimensional Selectors in All-Products Mode */}
              {isAllProducts && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-gray-100">
                  <div className="space-y-1 text-left">
                    <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-gray-500 block">
                      Filter by Supplier:
                    </label>
                    <select
                      value={selectedSupplierFilter}
                      onChange={(e) => {
                        setSelectedSupplierFilter(e.target.value);
                        setSelectedCategory('All');
                      }}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-semibold text-gray-800 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                    >
                      <option value="All">All Principals (180 Products)</option>
                      <option value="greentech">Greentech France (87 Bio-Actives &amp; Oils)</option>
                      <option value="sns-silcos">SNS Silcos (14 Silicones)</option>
                      <option value="fine-organics">Fine Organics (48 Specialty Esters)</option>
                      <option value="vvf-limited">VVF Limited (7 Conditioning &amp; Syndets)</option>
                      <option value="general-range">Mindtech General Catalog (24 Actives)</option>
                    </select>
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-gray-500 block">
                      Catalog Source:
                    </label>
                    <select
                      value={selectedCatalogOrigin}
                      onChange={(e) => setSelectedCatalogOrigin(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-semibold text-gray-800 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                    >
                      <option value="All">All Sources (180 Total)</option>
                      <option value="2026 Mindtech Catalogue">2026 Mindtech Catalogue (121)</option>
                      <option value="Dual-Sourced / Verified">Dual-Sourced &amp; Cross-Verified (25)</option>
                      <option value="Historical Greentech Dossier">Historical Greentech Dossiers (34)</option>
                    </select>
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-gray-500 block">
                      Filter by Business Line:
                    </label>
                    <select
                      value={selectedBusinessLine}
                      onChange={(e) => setSelectedBusinessLine(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-semibold text-gray-800 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                    >
                      {BUSINESS_LINES.map((line) => (
                        <option key={line} value={line}>{line}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-gray-500 block">
                      Quick Reset:
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSupplierFilter('All');
                        setSelectedCatalogOrigin('All');
                        setSelectedBusinessLine('All Business Lines');
                        setSelectedCategory('All');
                        setSearchQuery('');
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-colors cursor-pointer text-center"
                    >
                      Reset All Filters
                    </button>
                  </div>
                </div>
              )}

              {/* Category Filter Pills */}
              {selectedSupplierFilter !== 'greentech' && (
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-[#072414] text-white shadow-xs'
                          : 'bg-gray-100 text-gray-700 hover:bg-emerald-50 hover:text-emerald-950'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}

            </div>

            {/* Product Cards Grid: Use Universal Partner Replica Catalogue */}
            {['greentech', 'sns-silcos', 'fine-organics', 'vvf-limited'].includes(selectedSupplierFilter !== 'All' ? selectedSupplierFilter : supplierId) ? (
              <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm p-4 sm:p-6 lg:p-8">
                <UniversalPartnerReplicaCatalogue
                  initialPartnerId={
                    (['greentech', 'sns-silcos', 'fine-organics', 'vvf-limited'].includes(selectedSupplierFilter !== 'All' ? selectedSupplierFilter : supplierId)
                      ? (selectedSupplierFilter !== 'All' ? selectedSupplierFilter : supplierId)
                      : 'greentech') as any
                  }
                  showPartnerTabs={isAllProducts}
                  onBackToHome={onBackToOverview}
                  onOpenInquiry={onOpenInquiry}
                />
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelectProduct={onSelectProduct}
                    onRequestSample={onRequestSample}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-3xl border border-gray-200 p-10 text-center space-y-3">
                <FlaskConical className="w-10 h-10 text-gray-300 mx-auto" />
                <h3 className="text-lg font-bold text-gray-800">
                  No matching products found
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
                  No items matched "{searchQuery}" in category "{selectedCategory}". Try clearing your search query or selecting "All" categories.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-emerald-800 text-white rounded-full text-xs font-bold hover:bg-emerald-900 transition-colors cursor-pointer mt-2"
                >
                  Clear All Filters
                </button>
              </div>
            )}

          </div>

        {/* 5. Bottom Call to Action for Bulk Inquiries */}
        <div className="bg-gradient-to-r from-emerald-950 via-[#072414] to-teal-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-5 shadow-lg">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Need a Custom Batch, Formulation Guidance or Certificate of Analysis?
            </h3>
            <p className="text-emerald-200/90 text-xs sm:text-sm max-w-2xl">
              Our central Bawana logistics warehouse maintains buffer stocks for dependable nationwide dispatch across India. Request a personalized technical consultation with our formulation chemists.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenInquiry(`Technical Data Sheet & Bench Samples: ${supplier.name}`)}
              className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-emerald-950 text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              Request Bench Samples
            </button>
            <button
              onClick={onBackToOverview}
              className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold border border-white/20 transition-all cursor-pointer"
            >
              Browse Other Suppliers
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SupplierCataloguePage;
