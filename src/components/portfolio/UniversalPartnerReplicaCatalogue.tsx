import React, { useState, useMemo, useEffect } from 'react';
import { 
  ALL_PARTNERS_CONFIG, 
  PartnerReplicaConfig 
} from '../../data/allPartnersReplicaData';
import { ReplicaProduct, ReplicaCategory } from '../../data/greentechReplicaData';
import { CategoryLineArtIcon } from './CategoryLineArtIcon';
import { 
  Search, 
  X, 
  Send, 
  ShieldCheck, 
  FileCheck, 
  CheckCircle2, 
  ArrowRight,
  ExternalLink,
  ChevronRight,
  FlaskConical,
  Package,
  Layers,
  Atom,
  Droplets,
  Leaf
} from 'lucide-react';

interface UniversalPartnerReplicaCatalogueProps {
  initialPartnerId?: 'greentech' | 'sns-silcos' | 'fine-organics' | 'vvf-limited';
  initialCategoryId?: string;
  onBackToHome?: () => void;
  onOpenInquiry?: (topic?: string) => void;
  className?: string;
  showPartnerTabs?: boolean;
}

export const UniversalPartnerReplicaCatalogue: React.FC<UniversalPartnerReplicaCatalogueProps> = ({
  initialPartnerId = 'greentech',
  initialCategoryId,
  onBackToHome,
  onOpenInquiry,
  className = '',
  showPartnerTabs = true
}) => {
  // Active Partner State
  const [activePartnerId, setActivePartnerId] = useState<'greentech' | 'sns-silcos' | 'fine-organics' | 'vvf-limited'>(initialPartnerId);

  // Sync if initialPartnerId prop updates
  useEffect(() => {
    if (initialPartnerId) {
      setActivePartnerId(initialPartnerId);
    }
  }, [initialPartnerId]);

  const activePartner: PartnerReplicaConfig = useMemo(() => {
    return ALL_PARTNERS_CONFIG[activePartnerId] || ALL_PARTNERS_CONFIG.greentech;
  }, [activePartnerId]);

  // Active Category State
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(() => {
    return initialCategoryId || activePartner.defaultCategoryId;
  });

  // Reset category when partner changes
  useEffect(() => {
    setSelectedCategoryId(activePartner.defaultCategoryId);
    setSearchQuery('');
  }, [activePartnerId, activePartner.defaultCategoryId]);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<ReplicaProduct | null>(null);
  const [isSampleModalOpen, setIsSampleModalOpen] = useState<boolean>(false);
  const [sampleTargetProduct, setSampleTargetProduct] = useState<ReplicaProduct | null>(null);

  // Active Category Object
  const activeCategory = useMemo<ReplicaCategory>(() => {
    return (
      activePartner.categories.find(c => c.id === selectedCategoryId) ||
      activePartner.categories[0]
    );
  }, [activePartner, selectedCategoryId]);

  // Current Products for the active partner & category (or search results)
  const displayedProducts = useMemo<ReplicaProduct[]>(() => {
    const partnerProducts = activePartner.products;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const all = Object.values(partnerProducts);
      return all.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.inci.toLowerCase().includes(q) ||
        p.shortBenefit.toLowerCase().includes(q) ||
        (p.botanicalOrigin && p.botanicalOrigin.toLowerCase().includes(q))
      );
    }

    // Filter by active category
    return activeCategory.productIds
      .map(id => partnerProducts[id])
      .filter((p): p is ReplicaProduct => Boolean(p));
  }, [activePartner, activeCategory, searchQuery]);

  const handleSelectCategory = (catId: string) => {
    setSelectedCategoryId(catId);
    setSearchQuery('');
  };

  const handleRequestSample = (product: ReplicaProduct, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSampleTargetProduct(product);
    setIsSampleModalOpen(true);
  };

  return (
    <div className={`w-full bg-white text-left text-gray-900 ${className}`}>
      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 py-4 sm:py-6 space-y-6 sm:space-y-7">
        
        {/* =========================================================================
            0. GLOBAL PARTNER SELECTOR TABS (GREENTECH · SNS · FINE · VVF)
           ========================================================================= */}
        {showPartnerTabs && (
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-100">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 mr-1 hidden sm:inline-block">
                Principal Catalogue:
              </span>

              {/* Greentech France */}
              <button
                type="button"
                onClick={() => setActivePartnerId('greentech')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center space-x-2 transition-all cursor-pointer ${
                  activePartnerId === 'greentech'
                    ? 'bg-[#072414] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Leaf className="w-4 h-4 text-emerald-400" />
                <span>Greentech France (43 Actives)</span>
              </button>

              {/* SNS Silcos */}
              <button
                type="button"
                onClick={() => setActivePartnerId('sns-silcos')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center space-x-2 transition-all cursor-pointer ${
                  activePartnerId === 'sns-silcos'
                    ? 'bg-[#072414] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Atom className="w-4 h-4 text-blue-400" />
                <span>SNS Silcos (14 Silicones)</span>
              </button>

              {/* Fine Organics */}
              <button
                type="button"
                onClick={() => setActivePartnerId('fine-organics')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center space-x-2 transition-all cursor-pointer ${
                  activePartnerId === 'fine-organics'
                    ? 'bg-[#072414] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FlaskConical className="w-4 h-4 text-emerald-400" />
                <span>Fine Organics (48 Esters)</span>
              </button>

              {/* VVF Limited */}
              <button
                type="button"
                onClick={() => setActivePartnerId('vvf-limited')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center space-x-2 transition-all cursor-pointer ${
                  activePartnerId === 'vvf-limited'
                    ? 'bg-[#072414] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Droplets className="w-4 h-4 text-teal-400" />
                <span>VVF Limited (7 Grades)</span>
              </button>
            </div>

            <div className="text-xs font-mono text-gray-500 hidden lg:flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>{activePartner.country}</span>
            </div>
          </div>
        )}

        {/* =========================================================================
            1. BREADCRUMB NAVIGATION (EXACT REPLICA: home > category)
           ========================================================================= */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-1.5 text-xs sm:text-sm text-gray-500 font-sans">
          <button 
            type="button"
            onClick={onBackToHome}
            className="hover:text-gray-900 transition-colors cursor-pointer"
          >
            home
          </button>
          <span className="text-gray-400">&gt;</span>
          <span className="text-[#70a83b] font-medium">
            {activeCategory.slug}
          </span>
          {searchQuery && (
            <>
              <span className="text-gray-400">&gt;</span>
              <span className="text-gray-700 italic">search: "{searchQuery}"</span>
            </>
          )}
        </nav>

        {/* =========================================================================
            2. PAGE TITLE & LIVE SEARCH (EXACT REPLICA)
           ========================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-3">
          <h1 className="text-3xl sm:text-4xl text-[#1a1a1a] font-light tracking-tight font-['Outfit']">
            {searchQuery ? `Search Results: "${searchQuery}"` : activeCategory.heading}
          </h1>

          {/* Quick Search Input (matching screenshot) */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter active ingredients..."
              className="w-full pl-9 pr-8 py-2 bg-gray-50 hover:bg-gray-100/80 focus:bg-white border border-gray-200 rounded-full text-xs transition-all focus:outline-hidden focus:ring-2 focus:ring-[#70a83b]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* =========================================================================
            3. TOP 10 CIRCULAR CATEGORY ICONS BAR (EXACT REPLICA)
           ========================================================================= */}
        <div className="w-full relative py-1">
          <div 
            role="tablist"
            aria-label={`${activePartner.name} Categories`}
            className="flex items-center justify-between gap-4 sm:gap-6 overflow-x-auto pb-4 pt-1 scrollbar-none snap-x"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {activePartner.categories.map((cat) => {
              const isSelected = selectedCategoryId === cat.id && !searchQuery;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleSelectCategory(cat.id)}
                  className="flex flex-col items-center group cursor-pointer shrink-0 transition-transform focus:outline-hidden"
                >
                  {/* Circular Line-Art Icon Frame */}
                  <div 
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center p-1 transition-all duration-300 ${
                      isSelected 
                        ? 'ring-2 ring-[#70a83b] ring-offset-2 shadow-md bg-white scale-105' 
                        : 'hover:ring-1 hover:ring-gray-300 hover:scale-105 bg-white'
                    }`}
                  >
                    <CategoryLineArtIcon
                      icon={cat.icon}
                      label={cat.label}
                      isSelected={isSelected}
                    />
                  </div>

                  {/* Category Label */}
                  <span 
                    className={`mt-2.5 text-xs sm:text-[13px] font-semibold tracking-tight transition-colors text-center whitespace-nowrap ${
                      isSelected 
                        ? 'text-[#70a83b] font-bold' 
                        : 'text-gray-700 group-hover:text-gray-950'
                    }`}
                  >
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            4. 6-COLUMN IMAGE-LED PRODUCT GRID (EXACT REPLICA)
           ========================================================================= */}
        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 sm:gap-x-6 gap-y-7 sm:gap-y-9 pt-2">
            {displayedProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="group relative flex flex-col items-center cursor-pointer text-center"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedProduct(product);
                  }
                }}
                aria-label={`View details for ${product.name}`}
              >
                {/* Framed Card Box (matching screenshot: white border matting + thin gray line) */}
                <div className="relative w-full aspect-[176/124] bg-white border border-gray-200/90 rounded-xs sm:rounded-sm p-1 shadow-2xs group-hover:shadow-md transition-all duration-300 transform group-hover:-translate-y-1 overflow-hidden">
                  <div className="w-full h-full overflow-hidden relative bg-gray-50">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        if (product.id.startsWith('sns-')) {
                          e.currentTarget.src = `/products/sns/${product.id}.svg`;
                        } else if (product.id.startsWith('vegarol-') || product.id.startsWith('promisoft-')) {
                          e.currentTarget.src = `/products/vvf/${product.id}.svg`;
                        } else if (product.id.startsWith('finagreen-') || product.id.startsWith('finamide-') || product.id.startsWith('vbrass-') || product.id.startsWith('finester-')) {
                          e.currentTarget.src = `/products/fine-organics/${product.id}.svg`;
                        } else {
                          e.currentTarget.src = '/products/greentech/timelys.png';
                        }
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </div>
                </div>

                {/* Centered Uppercase Product Title */}
                <h3 className="mt-2.5 text-center text-xs sm:text-[13px] font-bold text-gray-900 tracking-wide uppercase font-['Outfit'] leading-snug group-hover:text-[#70a83b] transition-colors max-w-full">
                  {product.name}
                </h3>

                {/* Hover Tooltip (Exact replica from Screenshot) */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 z-30 bg-[#2d3748] text-white text-[11px] font-medium px-2.5 py-1 rounded shadow-lg whitespace-nowrap max-w-[280px] truncate">
                  {product.tooltip || product.shortBenefit}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="py-16 text-center bg-gray-50 rounded-2xl border border-gray-200 p-8 space-y-3">
            <Search className="w-8 h-8 text-gray-400 mx-auto" />
            <h3 className="text-lg font-bold text-gray-800">No matching ingredients found</h3>
            <p className="text-xs text-gray-500">
              No products found matching "{searchQuery}" in {activePartner.shortName}. Try clearing your search.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 bg-[#072414] text-white rounded-full text-xs font-bold hover:bg-emerald-900 transition-colors cursor-pointer mt-2"
            >
              Clear Search
            </button>
          </div>
        )}

      </div>

      {/* =========================================================================
          5. TECHNICAL SPECIFICATION MODAL (ON-CLICK DOSSIER)
         ========================================================================= */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedProduct(null)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 p-6 sm:p-8 space-y-6 text-left relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-start space-x-4 pr-8">
              <div className="w-20 h-16 sm:w-28 sm:h-20 shrink-0 bg-white border border-gray-200 rounded-lg p-1 shadow-xs overflow-hidden">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    if (selectedProduct.id.startsWith('sns-')) {
                      e.currentTarget.src = `/products/sns/${selectedProduct.id}.svg`;
                    } else if (selectedProduct.id.startsWith('vegarol-') || selectedProduct.id.startsWith('promisoft-')) {
                      e.currentTarget.src = `/products/vvf/${selectedProduct.id}.svg`;
                    } else if (selectedProduct.id.startsWith('finagreen-') || selectedProduct.id.startsWith('finamide-') || selectedProduct.id.startsWith('vbrass-') || selectedProduct.id.startsWith('finester-')) {
                      e.currentTarget.src = `/products/fine-organics/${selectedProduct.id}.svg`;
                    } else {
                      e.currentTarget.src = '/products/greentech/timelys.png';
                    }
                  }}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold">
                    {activePartner.shortName}
                  </span>
                  {selectedProduct.sourceDoc && (
                    <span className="text-[11px] font-mono text-gray-400">
                      {selectedProduct.sourceDoc}
                    </span>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight font-['Outfit'] uppercase">
                  {selectedProduct.name}
                </h2>

                <p className="text-xs sm:text-sm font-mono text-emerald-800 font-semibold">
                  INCI: {selectedProduct.inci}
                </p>
              </div>
            </div>

            {/* Key Specifications Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 border-t border-gray-100 text-xs">
              <div className="bg-gray-50 p-3 rounded-xl space-y-1">
                <span className="font-mono text-gray-400 uppercase text-[10px] block font-bold">
                  Recommended Dosage:
                </span>
                <span className="font-bold text-gray-900 text-sm">
                  {selectedProduct.dosage}
                </span>
              </div>

              <div className="bg-gray-50 p-3 rounded-xl space-y-1">
                <span className="font-mono text-gray-400 uppercase text-[10px] block font-bold">
                  Origin &amp; Chemistry:
                </span>
                <span className="font-bold text-gray-900 text-xs">
                  {selectedProduct.botanicalOrigin || activePartner.tagline}
                </span>
              </div>
            </div>

            {/* Description & Action */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500">
                Biological Activity &amp; Formulation Benefits:
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed bg-emerald-50/40 p-3.5 rounded-xl border border-emerald-100">
                {selectedProduct.description || selectedProduct.shortBenefit}
              </p>
            </div>

            {/* Applications */}
            {selectedProduct.applications && selectedProduct.applications.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500">
                  Target Cosmetic Applications:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProduct.applications.map((app, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 font-medium"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Requisition CTAs */}
            <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% CoA &amp; TDS Traceability from Bawana Hub</span>
              </div>

              <div className="flex items-center space-x-2.5 w-full sm:w-auto">
                <a
                  href={`https://wa.me/918368947579?text=${encodeURIComponent(
                    `Hello Ajay Patel, I would like to request technical specifications, CoA, and a 100g bench formulation sample for: ${selectedProduct.name} (INCI: ${selectedProduct.inci}) from ${activePartner.name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center space-x-2 transition-colors shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>WhatsApp Sample Request</span>
                </a>

                <button
                  type="button"
                  onClick={() => handleRequestSample(selectedProduct)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#072414] hover:bg-emerald-900 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors shadow-xs cursor-pointer"
                >
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>Submit Inquiry</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Sample Inquiry Modal */}
      {isSampleModalOpen && sampleTargetProduct && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          onClick={() => setIsSampleModalOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 text-left shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsSampleModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider">
                Official Sample Requisition
              </span>
              <h3 className="text-xl font-black text-gray-900">
                Request Bench Sample: {sampleTargetProduct.name}
              </h3>
              <p className="text-xs text-gray-500">
                Directly sent to Mr. Ajay Patel (Sales Head). All laboratory packs include certified batch COA &amp; TDS from the Bawana central warehouse.
              </p>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl text-xs space-y-1">
              <span className="font-bold text-emerald-950 block">Selected Active Ingredient:</span>
              <p className="text-gray-700 font-mono">{sampleTargetProduct.name} — {sampleTargetProduct.inci}</p>
              <p className="text-gray-500">Recommended Dosage: {sampleTargetProduct.dosage}</p>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <a
                href={`https://wa.me/918368947579?text=${encodeURIComponent(
                  `Hi Ajay Patel, please dispatch a formulation sample and technical dossier for ${sampleTargetProduct.name} (INCI: ${sampleTargetProduct.inci}) to our formulation lab.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>Instant WhatsApp Dispatch Request</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setIsSampleModalOpen(false);
                  if (onOpenInquiry) {
                    onOpenInquiry(`Sample Request: ${sampleTargetProduct.name} (${sampleTargetProduct.inci})`);
                  }
                }}
                className="w-full py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs transition-colors"
              >
                Continue via Email / Contact Form
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
