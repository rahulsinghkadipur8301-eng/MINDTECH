import React, { useState, useMemo, useEffect } from 'react';
import { MasterIngredient } from '../../types/ingredient';
import { MASTER_INGREDIENTS, CONCERN_CATEGORIES } from '../../data/masterIngredientsData';
import { ConcernRail } from './ConcernRail';
import { ProductTypeTabs } from './ProductTypeTabs';
import { MasterIngredientCard } from './MasterIngredientCard';
import { MasterIngredientDetailModal } from './MasterIngredientDetailModal';
import { SampleEnquiryModal } from './SampleEnquiryModal';
import { SourceMappingModal } from './SourceMappingModal';
import { GreentechVideoSpotlight } from './GreentechVideoSpotlight';
import { 
  Search, 
  X, 
  SlidersHorizontal, 
  ArrowUpDown, 
  BookOpen, 
  Send, 
  Filter, 
  Sparkles, 
  Leaf, 
  Droplets, 
  Layers, 
  ShieldCheck, 
  FileCheck,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface GreentechMasterCatalogueProps {
  onBackToOverview?: () => void;
  onOpenInquiry?: (topic?: string) => void;
}

export const GreentechMasterCatalogue: React.FC<GreentechMasterCatalogueProps> = ({
  onBackToOverview,
  onOpenInquiry
}) => {
  // Navigation & Filtering States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConcern, setSelectedConcern] = useState('all');
  const [selectedProductType, setSelectedProductType] = useState('all');
  const [selectedForm, setSelectedForm] = useState('All');
  const [selectedSolubility, setSelectedSolubility] = useState('All');
  const [selectedSort, setSelectedSort] = useState<'a-z' | 'z-a'>('a-z');

  // Modal States
  const [selectedIngredient, setSelectedIngredient] = useState<MasterIngredient | null>(null);
  const [sampleTargetIngredient, setSampleTargetIngredient] = useState<MasterIngredient | null>(null);
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);
  const [isSourceMappingOpen, setIsSourceMappingOpen] = useState(false);

  // Hairiline ingredient instance for video spotlight linkage
  const hairilineIngredient = useMemo(() => {
    return MASTER_INGREDIENTS.find(i => i.id === 'hairiline' || i.slug === 'hairiline') || null;
  }, []);

  // Sync with URL hash if present
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#ingredient/')) {
      const slug = hash.replace('#ingredient/', '');
      const found = MASTER_INGREDIENTS.find(item => item.slug === slug || item.id === slug);
      if (found) {
        setSelectedIngredient(found);
      }
    }
  }, []);

  // Compute live counts for concern categories
  const concernCounts = useMemo(() => {
    const counts: Record<string, number> = { all: MASTER_INGREDIENTS.length };
    CONCERN_CATEGORIES.forEach(cat => {
      if (cat.id !== 'all') {
        counts[cat.id] = MASTER_INGREDIENTS.filter(item => item.benefitTags.includes(cat.id)).length;
      }
    });
    return counts;
  }, []);

  // Compute live counts for product types
  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = { all: MASTER_INGREDIENTS.length };
    ['bioactive', 'botanical-extract', 'pure-oil', 'plant-butter', 'oily-active', 'formulation-functional'].forEach(type => {
      counts[type] = MASTER_INGREDIENTS.filter(item => item.productType === type).length;
    });
    return counts;
  }, []);

  // Filtered and sorted ingredients list
  const filteredIngredients = useMemo(() => {
    return MASTER_INGREDIENTS.filter(item => {
      // 1. Concern filter
      if (selectedConcern !== 'all' && !item.benefitTags.includes(selectedConcern)) {
        return false;
      }

      // 2. Product type filter
      if (selectedProductType !== 'all' && item.productType !== selectedProductType) {
        return false;
      }

      // 3. Physical Form filter
      if (selectedForm !== 'All') {
        if (!item.physicalForm?.toLowerCase().includes(selectedForm.toLowerCase())) {
          return false;
        }
      }

      // 4. Solubility filter
      if (selectedSolubility !== 'All') {
        if (!item.solubility?.toLowerCase().includes(selectedSolubility.toLowerCase())) {
          return false;
        }
      }

      // 5. Search query (debounced/real-time full-text search)
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchInci = item.inci.toLowerCase().includes(q);
      const matchBotanical = item.botanicalName?.toLowerCase().includes(q) ?? false;
      const matchBenefit = (item.shortBenefit || '').toLowerCase().includes(q) || (item.description || '').toLowerCase().includes(q);
      const matchOrigin = (item.origin || '').toLowerCase().includes(q) || (item.originCountries?.join(' ') || '').toLowerCase().includes(q);
      const matchCode = (item.supplierCode || '').toLowerCase().includes(q);

      return matchName || matchInci || matchBotanical || matchBenefit || matchOrigin || matchCode;
    }).sort((a, b) => {
      if (selectedSort === 'z-a') {
        return b.name.localeCompare(a.name);
      }
      return a.name.localeCompare(b.name);
    });
  }, [selectedConcern, selectedProductType, selectedForm, selectedSolubility, searchQuery, selectedSort]);

  const handleOpenSampleModal = (ingredient: MasterIngredient) => {
    setSampleTargetIngredient(ingredient);
    setIsSampleModalOpen(true);
  };

  const handleSelectFromMapping = (ingredientId: string) => {
    const found = MASTER_INGREDIENTS.find(i => i.id === ingredientId);
    if (found) {
      setSelectedIngredient(found);
    }
  };

  const handleResetFilters = () => {
    setSelectedConcern('all');
    setSelectedProductType('all');
    setSelectedForm('All');
    setSelectedSolubility('All');
    setSearchQuery('');
    setSelectedSort('a-z');
  };

  const hasActiveFilters = 
    selectedConcern !== 'all' || 
    selectedProductType !== 'all' || 
    selectedForm !== 'All' || 
    selectedSolubility !== 'All' || 
    searchQuery.trim() !== '';

  return (
    <div className="w-full space-y-8 text-left">
      {/* =========================================================================
          1. COMPACT PORTFOLIO HERO & SCIENTIFIC REASSURANCE
         ========================================================================= */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#062916] via-[#093a20] to-[#041c10] text-white p-6 sm:p-8 lg:p-10 shadow-xl border border-emerald-500/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold tracking-wider uppercase border border-emerald-400/30">
                GREENTECH BIOTECHNOLOGIES · FRANCE
              </span>

              <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-mono border border-white/20">
                Indian Partner: Mindtech Biotechnology
              </span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight font-['Outfit']">
                Science-Backed Ingredients.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-green-400">
                  Solutions For What’s Next.
                </span>
              </h1>
              <p className="text-emerald-200 text-sm sm:text-base font-semibold mt-1">
                Active bio-technologies, skin/scalp microbiota science, pure vegetable oils, and fair-trade botanicals.
              </p>
            </div>

            <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed max-w-3xl">
              Integrating <strong>all 5 client-provided Greentech technical brochures (136 total pages)</strong>: Catalogue India 2023, Hair Care 2021/2023, Microbiote 2023, Actifs Greentech 2024, and Vegetable Oils &amp; Butters 2022. All items are verified with exact source page citations and batch traceability from the Bawana Hub.
            </p>

            <div className="pt-1 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setIsSourceMappingOpen(true)}
                className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-mono font-bold border border-emerald-400/30 transition-colors cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Source PDF Traceability (136 Pages)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSampleTargetIngredient(MASTER_INGREDIENTS[0]);
                  setIsSampleModalOpen(true);
                }}
                className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white hover:bg-emerald-50 text-emerald-950 text-xs font-bold transition-colors cursor-pointer shadow-xs"
              >
                <Send className="w-3.5 h-3.5 text-emerald-700" />
                <span>Request Formulation Samples</span>
              </button>
            </div>
          </div>

          {/* Right Snapshot Stat Box */}
          <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-300 font-bold block">
              Brochure Dataset Traceability
            </span>

            <div className="space-y-2 text-xs sm:text-sm text-emerald-50">
              <div className="flex justify-between py-1 border-b border-white/10">
                <span className="text-emerald-200/80">Total Documented Items</span>
                <strong className="font-mono text-white text-base">
                  {MASTER_INGREDIENTS.length} Verified Records
                </strong>
              </div>
              <div className="flex justify-between py-1 border-b border-white/10">
                <span className="text-emerald-200/80">Source Brochures</span>
                <strong className="text-white">5 Technical Guides (136 pp.)</strong>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-emerald-200/80">Indian Distribution</span>
                <strong className="text-white">Mindtech Central Bawana Hub</strong>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenInquiry && onOpenInquiry('Greentech Master Catalogue Technical Consultation')}
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-md cursor-pointer flex items-center justify-center space-x-2"
            >
              <span>Speak to Formulation Specialist</span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          FEATURED SCIENTIFIC INNOVATION VIDEO (HAIRILINE® SCALP SCIENCE SPOTLIGHT)
         ========================================================================= */}
      <GreentechVideoSpotlight
        onSelectIngredient={setSelectedIngredient}
        onRequestSample={handleOpenSampleModal}
        hairilineIngredient={hairilineIngredient}
      />

      {/* =========================================================================
          2. CONCERN ICON RAIL (GREENTECH-INSPIRED 10+ CATEGORY CAROUSEL)
         ========================================================================= */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>Filter by Target Cosmetic &amp; Biological Concern:</span>
          </span>
          <span className="text-xs text-gray-400 font-mono hidden sm:inline-block">
            Swipe or use arrows to scroll concerns
          </span>
        </div>

        <ConcernRail
          selectedConcern={selectedConcern}
          onSelectConcern={setSelectedConcern}
          ingredientCounts={concernCounts}
        />
      </div>

      {/* =========================================================================
          3. PRODUCT TYPE SWITCHER TABS
         ========================================================================= */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 block">
          Product Type &amp; Chemical Family:
        </span>
        <ProductTypeTabs
          selectedType={selectedProductType}
          onSelectType={setSelectedProductType}
          typeCounts={typeCounts}
        />
      </div>

      {/* =========================================================================
          4. UTILITY & MULTI-DIMENSIONAL FILTER BAR
         ========================================================================= */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Full-text search */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, INCI, botanical Latin, or benefit..."
              className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
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

          {/* Secondary Filter Dropdowns & Sorting */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-between md:justify-end text-xs">
            {/* Physical Form Filter */}
            <select
              value={selectedForm}
              onChange={(e) => setSelectedForm(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
            >
              <option value="All">All Physical Forms</option>
              <option value="Liquid">Liquid Solution</option>
              <option value="Oil">Liquid Oil</option>
              <option value="Butter">Solid Plant Butter</option>
              <option value="Powder">Fine Powder</option>
            </select>

            {/* Solubility Filter */}
            <select
              value={selectedSolubility}
              onChange={(e) => setSelectedSolubility(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
            >
              <option value="All">All Solubilities</option>
              <option value="Water">Water-soluble</option>
              <option value="Oil">Oil-soluble / Lipophilic</option>
              <option value="Dispersible">Dispersible</option>
            </select>

            {/* Sort A-Z / Z-A */}
            <button
              onClick={() => setSelectedSort(selectedSort === 'a-z' ? 'z-a' : 'a-z')}
              className="px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 flex items-center space-x-1 cursor-pointer transition-colors"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-gray-500" />
              <span>{selectedSort === 'a-z' ? 'A to Z' : 'Z to A'}</span>
            </button>
          </div>
        </div>

        {/* Results Counter & Active Filter Chips */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gray-100 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-gray-700">
              Showing <span className="text-emerald-800 font-extrabold">{filteredIngredients.length}</span> of {MASTER_INGREDIENTS.length} Ingredients
            </span>

            {/* Active Chips */}
            {selectedConcern !== 'all' && (
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-medium text-[11px]">
                <span>Concern: {CONCERN_CATEGORIES.find(c => c.id === selectedConcern)?.label}</span>
                <button onClick={() => setSelectedConcern('all')} className="hover:text-emerald-950 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedProductType !== 'all' && (
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-900 font-medium text-[11px]">
                <span>Type: {selectedProductType.replace('-', ' ')}</span>
                <button onClick={() => setSelectedProductType('all')} className="hover:text-teal-950 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {searchQuery && (
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 font-medium text-[11px]">
                <span>Query: "{searchQuery}"</span>
                <button onClick={() => setSearchQuery('')} className="hover:text-blue-950 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 hover:underline cursor-pointer"
            >
              Clear All Filters
            </button>
          )}
        </div>
      </div>

      {/* =========================================================================
          5. IMAGE-LED PRODUCT GRID (RESPONSIVE 4 / 3 / 2 / 1 COLUMNS)
         ========================================================================= */}
      {filteredIngredients.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredIngredients.map((ingredient) => (
            <MasterIngredientCard
              key={ingredient.id}
              ingredient={ingredient}
              onSelectIngredient={setSelectedIngredient}
              onRequestSample={handleOpenSampleModal}
            />
          ))}
        </div>
      ) : (
        /* Zero Results Empty State */
        <div className="py-16 text-center bg-white rounded-3xl border border-gray-200 p-8 space-y-4">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-800">
            <Search className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-[#072414]">No Matching Ingredients Found</h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              We couldn't find any products matching your specific combination of filters. Try clearing your search term or adjusting category selections.
            </p>
          </div>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 rounded-full bg-[#072414] hover:bg-emerald-900 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* =========================================================================
          6. B2B ENQUIRY REASSURANCE STRIP
         ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50/50 to-emerald-50 border border-emerald-200/80 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center md:text-left">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
            R&amp;D FORMULATION &amp; PILOT SUPPORT
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#072414]">
            Looking for the right active or plant butter for your formulation?
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 max-w-2xl">
            Our technical support desk in Delhi provides formulating guidelines, stability data, frame formulations, and batch-tested samples for cosmetic chemists and brand founders across India.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              setSampleTargetIngredient(MASTER_INGREDIENTS[0]);
              setIsSampleModalOpen(true);
            }}
            className="px-5 py-2.5 rounded-full bg-[#072414] hover:bg-emerald-900 text-white font-bold text-xs transition-colors shadow-sm cursor-pointer"
          >
            Request a Sample
          </button>

          <button
            type="button"
            onClick={() => onOpenInquiry && onOpenInquiry('General Technical Consultation')}
            className="px-5 py-2.5 rounded-full bg-white hover:bg-emerald-50 text-emerald-950 font-bold text-xs border border-emerald-300 transition-colors shadow-2xs cursor-pointer"
          >
            Speak to Technical Team
          </button>
        </div>
      </div>

      {/* =========================================================================
          7. MODALS
         ========================================================================= */}
      {/* Individual Ingredient Technical Fact Dossier Modal */}
      {selectedIngredient && (
        <MasterIngredientDetailModal
          ingredient={selectedIngredient}
          onClose={() => setSelectedIngredient(null)}
          onRequestSample={(ing) => {
            setSelectedIngredient(null);
            handleOpenSampleModal(ing);
          }}
          onSelectRelated={(ing) => setSelectedIngredient(ing)}
          allIngredients={MASTER_INGREDIENTS}
        />
      )}

      {/* B2B Sample Request Form Modal */}
      <SampleEnquiryModal
        isOpen={isSampleModalOpen}
        onClose={() => {
          setIsSampleModalOpen(false);
          setSampleTargetIngredient(null);
        }}
        productName={sampleTargetIngredient?.name}
        productCode={sampleTargetIngredient?.supplierCode}
        supplierName="Greentech Biotechnologies"
      />

      {/* Source PDF Traceability Modal (136 Pages) */}
      <SourceMappingModal
        isOpen={isSourceMappingOpen}
        onClose={() => setIsSourceMappingOpen(false)}
        onSelectIngredient={handleSelectFromMapping}
      />
    </div>
  );
};
