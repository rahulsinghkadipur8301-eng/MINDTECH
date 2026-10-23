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
import { 
  Search, 
  X, 
  ChevronRight, 
  ArrowLeft, 
  FlaskConical, 
  CheckCircle2, 
  SlidersHorizontal, 
  Send, 
  ExternalLink,
  ShieldCheck,
  Building2,
  Sparkles,
  Layers,
  ArrowRight,
  Globe
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

      // 2. Business Line filter
      if (selectedBusinessLine !== 'All Business Lines') {
        const lines = getProductBusinessLines(product);
        if (!lines.includes(selectedBusinessLine)) {
          return false;
        }
      }

      // 3. Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }

      // 4. Search query
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const nameMatch = product.name.toLowerCase().includes(q);
      const codeMatch = product.code?.toLowerCase().includes(q) ?? false;
      const inciMatch = product.inci.toLowerCase().includes(q);
      const categoryMatch = product.category.toLowerCase().includes(q);
      const applicationMatch = product.application.toLowerCase().includes(q);
      const useMatch = product.mainUse.toLowerCase().includes(q);
      const supplierMatch = product.supplierId.toLowerCase().includes(q);

      return nameMatch || codeMatch || inciMatch || categoryMatch || applicationMatch || useMatch || supplierMatch;
    });
  }, [supplierProducts, isAllProducts, selectedSupplierFilter, selectedBusinessLine, selectedCategory, searchQuery]);

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

                {supplier.websiteUrl && (
                  <a
                    href={supplier.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-[#FFFDF5] hover:bg-[#F3EFE0] text-[#072414] text-xs sm:text-sm font-black tracking-wide transition-all duration-200 border-2 border-emerald-300 hover:border-emerald-500 shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 group/web cursor-pointer"
                    title={`Visit official ${supplier.name} website (${supplier.websiteUrl})`}
                  >
                    <Globe className="w-4 h-4 text-emerald-800 shrink-0" />
                    <span>Visit Official Website</span>
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-700 opacity-80 group-hover/web:opacity-100 group-hover/web:translate-x-0.5 group-hover/web:-translate-y-0.5 transition-all shrink-0" />
                  </a>
                )}
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

        {/* 3. Conditional: VVF LIMITED / FINE ORGANICS DEDICATED DOCUMENTED FAMILIES VIEW */}
        {isFamilyBasedSupplier ? (
          <div className="space-y-6 pt-4">
            
            {/* If legacy combined view is accessed, show sub-supplier tab selector */}
            {isVvfFineOrganics && (
              <div className="bg-white p-2 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setActiveSubSupplier('VVF Limited')}
                    className={`flex-1 sm:flex-initial px-6 py-3 rounded-xl font-extrabold text-sm transition-all cursor-pointer flex items-center justify-center space-x-2.5 ${
                      activeSubSupplier === 'VVF Limited'
                        ? 'bg-blue-900 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <PartnerLogoRenderer partnerId="vvf-limited" height={24} />
                    <span>VVF LIMITED PORTFOLIO</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveSubSupplier('Fine Organics')}
                    className={`flex-1 sm:flex-initial px-6 py-3 rounded-xl font-extrabold text-sm transition-all cursor-pointer flex items-center justify-center space-x-2.5 ${
                      activeSubSupplier === 'Fine Organics'
                        ? 'bg-emerald-900 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <PartnerLogoRenderer partnerId="fine-organics" height={24} />
                    <span>FINE ORGANICS PORTFOLIO</span>
                  </button>
                </div>

                <span className="text-xs text-gray-500 font-medium px-2">
                  Showing documented categories from Page 23 of Mindtech Catalog
                </span>
              </div>
            )}

            {/* Documented Categories for Selected Supplier */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {(isFineOrganics
                ? FINE_ORGANICS_PORTFOLIO_CATEGORIES
                : isVvfLimited
                  ? VVF_PORTFOLIO_CATEGORIES
                  : activeSubSupplier === 'Fine Organics'
                    ? FINE_ORGANICS_PORTFOLIO_CATEGORIES
                    : VVF_PORTFOLIO_CATEGORIES
              ).map((cat, idx) => (
                <div
                  key={cat.name}
                  className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-6 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between space-y-4 text-left"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-900 border border-emerald-200">
                        {activeSubSupplier} Category 0{idx + 1}
                      </span>
                      <span className="text-xs text-gray-400 font-mono">Verified Page 23</span>
                    </div>

                    <h3 className="text-xl font-extrabold text-[#072414]">
                      {cat.name}
                    </h3>

                    <p className="text-sm text-gray-600 leading-relaxed">
                      {cat.description}
                    </p>

                    {/* Key Attributes */}
                    <div className="pt-2 space-y-1.5">
                      <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider block">
                        Key Performance Attributes:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-gray-700">
                        {cat.keyAttributes.map((attr, aIdx) => (
                          <div key={aIdx} className="flex items-center space-x-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{attr}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Target Applications */}
                    <div className="p-3 bg-gray-50 rounded-xl text-xs text-gray-700 border border-gray-100">
                      <strong className="text-gray-900">Typical Formulations: </strong>
                      {cat.applications}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-medium text-emerald-800">
                      Standardized Specification Sheets Available
                    </span>

                    <button
                      type="button"
                      onClick={() => onOpenInquiry(`Inquiry - ${activeSubSupplier} (${cat.name})`)}
                      className="inline-flex items-center space-x-1.5 text-xs font-bold text-white bg-[#072414] hover:bg-emerald-900 px-4 py-2 rounded-full transition-colors cursor-pointer"
                    >
                      <span>Request Category TDS & Samples</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Note on Verification Integrity */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-amber-950 text-xs flex items-start space-x-3">
              <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">Catalog Transparency & Compliance: </strong>
                In strict accordance with the Mindtech Biotechnology verified catalog, product families for VVF Limited and Fine Organics are represented by their documented categories. To request individual product grades, specification sheets, or bulk pricing, contact our commercial sales desk.
              </div>
            </div>

          </div>
        ) : (
          /* 4. GREENTECH & SNS SILCOS & GENERAL RANGE PRODUCT LISTING */
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2 border-t border-gray-100">
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
                      <option value="All">All Suppliers (Full Range)</option>
                      <option value="greentech">Greentech France (53 Actives)</option>
                      <option value="sns-silcos">SNS Silcos (14 Specialties)</option>
                      <option value="fine-organics">Fine Organics (4 Families)</option>
                      <option value="vvf-limited">VVF Limited (4 Families)</option>
                      <option value="general-range">Mindtech General Catalog (24 Items)</option>
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

            </div>

            {/* Product Cards Grid */}
            {filteredProducts.length > 0 ? (
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
        )}

        {/* 5. Bottom Call to Action for Bulk Inquiries */}
        <div className="bg-gradient-to-r from-emerald-950 via-[#072414] to-teal-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-5 shadow-lg">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Need a Custom Batch, Formulation Guidance or Certificate of Analysis?
            </h3>
            <p className="text-emerald-200/90 text-xs sm:text-sm max-w-2xl">
              Our central Bawana logistics warehouse maintains buffer stocks for rapid 24–48h dispatch across India. Request a personalized technical consultation with our formulation chemists.
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
