import React, { useState, useMemo } from 'react';
import { 
  REPLICA_CATEGORIES, 
  REPLICA_PRODUCTS, 
  ReplicaProduct, 
  ReplicaCategory 
} from '../../data/greentechReplicaData';
import { 
  Search, 
  X, 
  Send, 
  FileCheck, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Sparkles,
  SlidersHorizontal,
  FlaskConical
} from 'lucide-react';

interface GreentechExactReplicaCatalogueProps {
  initialCategory?: string;
  onBackToHome?: () => void;
  onOpenInquiry?: (topic?: string) => void;
  className?: string;
}

export const GreentechExactReplicaCatalogue: React.FC<GreentechExactReplicaCatalogueProps> = ({
  initialCategory = 'anti-ageing',
  onBackToHome,
  onOpenInquiry,
  className = ''
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<ReplicaProduct | null>(null);
  const [isSampleModalOpen, setIsSampleModalOpen] = useState<boolean>(false);
  const [sampleTargetProduct, setSampleTargetProduct] = useState<ReplicaProduct | null>(null);

  // Active Category Object
  const activeCategory = useMemo<ReplicaCategory>(() => {
    return (
      REPLICA_CATEGORIES.find(c => c.id === selectedCategoryId) ||
      REPLICA_CATEGORIES[0]
    );
  }, [selectedCategoryId]);

  // Current Products for the active category (or search results)
  const displayedProducts = useMemo<ReplicaProduct[]>(() => {
    const categoryProducts = activeCategory.productIds
      .map(id => REPLICA_PRODUCTS[id])
      .filter((p): p is ReplicaProduct => Boolean(p));

    if (!searchQuery.trim()) {
      return categoryProducts;
    }

    const q = searchQuery.toLowerCase().trim();
    // Search across all products if searching
    const all = Object.values(REPLICA_PRODUCTS);
    return all.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.inci.toLowerCase().includes(q) ||
      p.shortBenefit.toLowerCase().includes(q) ||
      (p.botanicalOrigin && p.botanicalOrigin.toLowerCase().includes(q))
    );
  }, [activeCategory, searchQuery]);

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
      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 py-6 sm:py-8 space-y-6 sm:space-y-8">
        
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
            2. PAGE TITLE (EXACT REPLICA: ANTI-AGEING, Soothing Actives, Eye contour...)
           ========================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-3">
          <h1 className="text-3xl sm:text-4xl text-[#1a1a1a] font-light tracking-tight font-['Outfit']">
            {searchQuery ? `Search Results: "${searchQuery}"` : activeCategory.heading}
          </h1>

          {/* Quick Search Input */}
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
            aria-label="Greentech Benefit Categories"
            className="flex items-center justify-between gap-4 sm:gap-6 overflow-x-auto pb-4 pt-1 scrollbar-none snap-x"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {REPLICA_CATEGORIES.map((cat) => {
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
                    <img 
                      src={cat.icon} 
                      alt={cat.label} 
                      className="w-full h-full object-contain pointer-events-none" 
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
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </div>
                </div>

                {/* Centered Uppercase Product Title */}
                <h3 className="mt-2.5 text-center text-xs sm:text-[13px] font-bold text-gray-900 tracking-wide uppercase font-['Outfit'] leading-snug group-hover:text-[#70a83b] transition-colors max-w-full">
                  {product.name}
                </h3>

                {/* Hover Tooltip (Exact replica of "Anti-oxydant-PHYTOBIOACTIF-POMEGRANATE" from Screenshot 1) */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 z-30 bg-[#2d3748] text-white text-[11px] font-medium px-2.5 py-1 rounded shadow-lg whitespace-nowrap max-w-[260px] truncate">
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
              Try a different keyword or select another category from the top bar.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="px-4 py-1.5 rounded-full bg-[#072414] text-white text-xs font-bold hover:bg-emerald-900 transition-colors cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        )}

      </div>

      {/* =========================================================================
          5. TECHNICAL DETAIL MODAL (WHEN A PRODUCT IS CLICKED)
         ========================================================================= */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200 text-left"
          onClick={() => setSelectedProduct(null)}
        >
          <div 
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-gray-200 p-6 sm:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-4 border-b border-gray-100 pr-8">
              <div className="w-32 sm:w-40 aspect-[176/124] shrink-0 border border-gray-200 rounded-lg overflow-hidden bg-gray-50 p-1 shadow-xs">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover rounded-xs"
                />
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#70a83b] block">
                  Greentech Biotechnologies (France)
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-[#072414] font-['Outfit']">
                  {selectedProduct.name}
                </h2>
                <p className="text-xs text-gray-500 font-mono italic">
                  INCI: {selectedProduct.inci}
                </p>
                {selectedProduct.dosage && (
                  <div className="pt-1">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 text-xs font-mono font-bold">
                      Recommended Dosage: {selectedProduct.dosage}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="space-y-4 text-xs sm:text-sm text-gray-700">
              <div>
                <h4 className="font-bold text-[#072414] text-xs uppercase tracking-wider font-mono mb-1">
                  Biological &amp; Cosmetic Mechanism:
                </h4>
                <p className="leading-relaxed text-gray-600">
                  {selectedProduct.description}
                </p>
              </div>

              {selectedProduct.botanicalOrigin && (
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="font-bold text-gray-900">Botanical Provenance: </span>
                  <span className="text-gray-700">{selectedProduct.botanicalOrigin}</span>
                </div>
              )}

              {selectedProduct.applications && selectedProduct.applications.length > 0 && (
                <div>
                  <h4 className="font-bold text-[#072414] text-xs uppercase tracking-wider font-mono mb-1.5">
                    Recommended Formulations:
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProduct.applications.map((app, idx) => (
                      <span 
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 text-xs font-medium border border-emerald-200/60"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedProduct.sourceDoc && (
                <div className="flex items-center space-x-2 text-xs font-mono text-gray-500 pt-1">
                  <FileCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Verified Source: {selectedProduct.sourceDoc}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedProduct(null);
                  handleRequestSample(selectedProduct);
                }}
                className="flex-1 py-3 px-5 rounded-2xl bg-[#072414] hover:bg-emerald-900 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Send className="w-4 h-4 text-emerald-300" />
                <span>Request Certified Sample (100g)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const subject = `Pricing & COA Request: ${selectedProduct.name}`;
                  if (onOpenInquiry) {
                    onOpenInquiry(subject);
                  } else {
                    window.open(`https://wa.me/918368947579?text=${encodeURIComponent(`Hello Mr. Ajay Patel, I am inquiring about *${selectedProduct.name}*. Please share pricing & COA.`)}`, '_blank');
                  }
                  setSelectedProduct(null);
                }}
                className="py-3 px-5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-950 font-bold text-xs uppercase tracking-wider border border-emerald-300 transition-colors flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span>Inquire With Ajay Patel</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          6. SAMPLE ENQUIRY FORM MODAL
         ========================================================================= */}
      {isSampleModalOpen && sampleTargetProduct && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs text-left animate-in fade-in duration-200"
          onClick={() => setIsSampleModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-200 p-6 sm:p-8 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsSampleModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-[#70a83b] uppercase">
                Official Formulation Requisition
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#072414] font-['Outfit']">
                Request Lab Sample &amp; COA
              </h3>
              <p className="text-xs text-gray-600">
                Directly dispatched from the Central Bawana Hub to your laboratory with complete batch traceability.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs space-y-1">
              <div className="font-bold text-[#072414]">{sampleTargetProduct.name}</div>
              <div className="text-gray-600 font-mono text-[11px] truncate">INCI: {sampleTargetProduct.inci}</div>
              <div className="text-emerald-800 font-semibold text-[11px]">All samples include verified batch COA &amp; TDS.</div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const name = (form.elements.namedItem('chemistName') as HTMLInputElement).value;
                const company = (form.elements.namedItem('companyName') as HTMLInputElement).value;
                const phone = (form.elements.namedItem('phone') as HTMLInputElement).value;
                const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;

                const text = encodeURIComponent(
                  `*MINDTECH BIOTECHNOLOGY - SAMPLE REQUISITION*\n\nProduct: *${sampleTargetProduct.name}*\nINCI: ${sampleTargetProduct.inci}\n\nChemist / Contact: ${name}\nCompany: ${company}\nPhone: ${phone}\nNotes: ${message || 'Standard 100g bench pack'}\n\nPlease dispatch certified sample and COA.`
                );

                window.open(`https://wa.me/918368947579?text=${text}`, '_blank');
                setIsSampleModalOpen(false);
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="block text-gray-700 font-bold mb-1">Your Name *</label>
                <input 
                  name="chemistName"
                  type="text" 
                  required 
                  placeholder="e.g. Dr. Rajesh Sharma" 
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Company / Brand *</label>
                <input 
                  name="companyName"
                  type="text" 
                  required 
                  placeholder="e.g. Lotus Herbals / Formulations Lab" 
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">WhatsApp / Phone *</label>
                <input 
                  name="phone"
                  type="tel" 
                  required 
                  placeholder="+91 98765 43210" 
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Delivery City &amp; PIN Code</label>
                <textarea 
                  name="message"
                  rows={2} 
                  placeholder="e.g. Baddi (HP) - 173205 or Mumbai - 400001" 
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#072414] hover:bg-emerald-900 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center space-x-2 mt-2"
              >
                <Send className="w-4 h-4 text-emerald-300" />
                <span>Submit Sample Requisition to Ajay Patel</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
