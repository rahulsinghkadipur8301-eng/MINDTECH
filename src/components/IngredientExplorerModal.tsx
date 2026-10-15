import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Search, 
  FlaskConical, 
  Sparkles, 
  Check, 
  Copy, 
  ExternalLink, 
  Calculator, 
  Building2, 
  Award, 
  Leaf, 
  ShieldCheck, 
  Layers, 
  Droplets, 
  Sun, 
  Palette, 
  HeartPulse,
  Send,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { INGREDIENT_CATALOG, RawMaterialItem } from '../data/ingredientsData';

interface IngredientExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestSample: (ingredientName: string) => void;
}

export const IngredientExplorerModal: React.FC<IngredientExplorerModalProps> = ({
  isOpen,
  onClose,
  onRequestSample
}) => {
  const [activeTab, setActiveTab] = useState<'catalog' | 'calculator'>('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPrincipal, setSelectedPrincipal] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<RawMaterialItem | null>(INGREDIENT_CATALOG[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Batch Calculator State
  const [batchSizeKg, setBatchSizeKg] = useState<number>(100);
  const [activePercentage, setActivePercentage] = useState<number>(2.0);
  const [selectedCalcIngredient, setSelectedCalcIngredient] = useState<string>(INGREDIENT_CATALOG[0].name);

  // Filtered ingredients
  const filteredIngredients = useMemo(() => {
    return INGREDIENT_CATALOG.filter(item => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.inci.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.function.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.casNo && item.casNo.includes(searchQuery)) ||
        item.principal.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesPrin = selectedPrincipal === 'All' || item.principal.includes(selectedPrincipal);

      return matchesSearch && matchesCat && matchesPrin;
    });
  }, [searchQuery, selectedCategory, selectedPrincipal]);

  const categories = ['All', 'Bio-Actives', 'Skin Care', 'Hair Care', 'Sun Care', 'Color Cosmetics', 'Mild Cleansing'];
  const principals = ['All', 'Greentech', 'Fine Organics', 'VVF Limited', 'SNS Silcos', 'Mindtech'];

  const handleCopySpec = (item: RawMaterialItem) => {
    const text = `Mindtech Biotechnology Raw Material Spec:\nProduct: ${item.name}\nINCI: ${item.inci}\nPrincipal: ${item.principal}\nDosage: ${item.recommendedDosage}\nFunction: ${item.function}\nWarehouse Hub: Bawana Industrial City, Delhi`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4 md:p-6 bg-emerald-950/70 backdrop-blur-md">
        
        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-3xl shadow-2xl border border-emerald-100 w-full max-w-6xl max-h-[92vh] flex flex-col overflow-hidden text-left"
        >
          {/* Top Bar Header */}
          <div className="px-5 sm:px-7 py-4.5 bg-gradient-to-r from-[#072414] via-[#0b3820] to-[#072414] text-white flex items-center justify-between border-b border-emerald-800/40">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
                <FlaskConical className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white font-['Outfit']">
                    Interactive Ingredients & Formulation Spec Explorer
                  </h3>
                  <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    MSME Reg Verified
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-200/80">
                  Direct Principal Portfolio • COA Specifications • 1-Click Lab Sample Dispatch
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* Tab Selector */}
              <div className="hidden md:flex items-center bg-black/30 p-1 rounded-xl border border-emerald-700/50 mr-2">
                <button
                  onClick={() => setActiveTab('catalog')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'catalog' ? 'bg-emerald-600 text-white shadow-xs' : 'text-emerald-200 hover:text-white'
                  }`}
                >
                  Raw Material Specs
                </button>
                <button
                  onClick={() => setActiveTab('calculator')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 ${
                    activeTab === 'calculator' ? 'bg-emerald-600 text-white shadow-xs' : 'text-emerald-200 hover:text-white'
                  }`}
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Batch Calculator</span>
                </button>
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer focus:outline-hidden"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Sub Navigation Bar for Mobile Tabs */}
          <div className="md:hidden flex border-b border-gray-200 bg-gray-50 px-4 py-2">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg text-center ${
                activeTab === 'catalog' ? 'bg-[#072414] text-white' : 'text-gray-700'
              }`}
            >
              Raw Material Specs
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg text-center flex items-center justify-center space-x-1 ${
                activeTab === 'calculator' ? 'bg-[#072414] text-white' : 'text-gray-700'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Batch Calculator</span>
            </button>
          </div>

          {/* Main Body */}
          {activeTab === 'catalog' ? (
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-[480px]">
              
              {/* Left Column: Search & Material List */}
              <div className="w-full md:w-5/12 lg:w-4/12 border-r border-gray-200 flex flex-col bg-gray-50/60 overflow-hidden">
                
                {/* Search Bar */}
                <div className="p-3.5 border-b border-gray-200/80 bg-white space-y-2">
                  <div className="relative">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search ingredient, INCI, CAS or benefit..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-hidden transition-all"
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2.5 top-2.5 text-xs text-gray-400 hover:text-gray-600 bg-gray-200 rounded-full w-4 h-4 flex items-center justify-center"
                      >
                        ×
                      </button>
                    )}
                  </div>

                  {/* Category Filter Chips */}
                  <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all shrink-0 cursor-pointer ${
                          selectedCategory === cat 
                            ? 'bg-[#072414] text-white shadow-2xs' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
                  {filteredIngredients.length === 0 ? (
                    <div className="p-8 text-center text-gray-500 space-y-2">
                      <FlaskConical className="w-8 h-8 text-gray-300 mx-auto" />
                      <p className="text-sm font-medium">No ingredients match your criteria.</p>
                      <button 
                        onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                        className="text-xs text-emerald-700 font-bold hover:underline"
                      >
                        Reset filters
                      </button>
                    </div>
                  ) : (
                    filteredIngredients.map((item) => {
                      const isSelected = selectedItem?.id === item.id;
                      return (
                        <div
                          key={item.id}
                          onClick={() => setSelectedItem(item)}
                          className={`p-3.5 transition-all cursor-pointer flex items-start justify-between gap-2.5 ${
                            isSelected 
                              ? 'bg-emerald-50/90 border-l-4 border-emerald-600' 
                              : 'hover:bg-white hover:border-l-4 hover:border-emerald-300'
                          }`}
                        >
                          <div className="min-w-0">
                            <div className="flex items-center space-x-1.5">
                              <span className="text-xs font-mono font-semibold text-emerald-800 bg-emerald-100/70 px-1.5 py-0.5 rounded">
                                {item.principal.split(' ')[0]}
                              </span>
                              <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">
                                {item.category}
                              </span>
                            </div>
                            <h4 className="text-sm font-bold text-gray-900 mt-1 truncate">
                              {item.name}
                            </h4>
                            <p className="text-xs text-gray-500 font-mono truncate">
                              {item.inci}
                            </p>
                            <p className="text-[11.5px] text-gray-600 line-clamp-1 mt-0.5">
                              {item.function}
                            </p>
                          </div>

                          <ChevronRight className={`w-4 h-4 shrink-0 mt-2 transition-transform ${isSelected ? 'text-emerald-700 translate-x-0.5' : 'text-gray-300'}`} />
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Footer Count */}
                <div className="p-2.5 bg-gray-100/80 border-t border-gray-200 text-xs text-gray-500 flex justify-between items-center px-4">
                  <span>Showing {filteredIngredients.length} of {INGREDIENT_CATALOG.length} raw materials</span>
                  <span className="font-mono font-bold text-emerald-800">Bawana Hub</span>
                </div>
              </div>

              {/* Right Column: Detailed Specification Dossier */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-7 bg-white flex flex-col justify-between">
                {selectedItem ? (
                  <div className="space-y-5">
                    {/* Header Info */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-gray-100">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className="px-3 py-0.5 text-xs font-bold rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200">
                            {selectedItem.principal}
                          </span>
                          <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">
                            {selectedItem.category}
                          </span>
                          {selectedItem.casNo && (
                            <span className="text-xs font-mono text-gray-500">
                              CAS: {selectedItem.casNo}
                            </span>
                          )}
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#072414] tracking-tight font-['Outfit']">
                          {selectedItem.name}
                        </h2>
                        <p className="text-sm font-mono text-emerald-800 font-semibold mt-1">
                          INCI: {selectedItem.inci}
                        </p>
                      </div>

                      {/* Quick Action Buttons */}
                      <div className="flex items-center space-x-2 shrink-0">
                        <button
                          onClick={() => handleCopySpec(selectedItem)}
                          className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center space-x-1.5 transition-all cursor-pointer"
                          title="Copy specs to clipboard"
                        >
                          {copiedId === selectedItem.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-gray-500" />
                              <span>Copy Spec</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => {
                            onRequestSample(selectedItem.name);
                            onClose();
                          }}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-800 hover:to-teal-900 text-white text-xs font-black uppercase tracking-wider flex items-center space-x-1.5 shadow-md hover:shadow-lg transition-all cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Request Sample</span>
                        </button>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100/80">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-950 mb-1 flex items-center space-x-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Technical Overview</span>
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {selectedItem.description}
                      </p>
                    </div>

                    {/* Specification Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                        <span className="text-xs text-gray-500 font-medium">Recommended Dosage</span>
                        <p className="text-base font-bold text-emerald-950 font-mono mt-0.5">
                          {selectedItem.recommendedDosage}
                        </p>
                      </div>

                      <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                        <span className="text-xs text-gray-500 font-medium">Primary Function</span>
                        <p className="text-sm font-bold text-gray-900 mt-0.5">
                          {selectedItem.function}
                        </p>
                      </div>

                      <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                        <span className="text-xs text-gray-500 font-medium">Physical Appearance</span>
                        <p className="text-sm font-medium text-gray-800 mt-0.5">
                          {selectedItem.appearance}
                        </p>
                      </div>

                      <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                        <span className="text-xs text-gray-500 font-medium">Origin & Supply Chain</span>
                        <p className="text-sm font-bold text-gray-900 mt-0.5 flex items-center space-x-1.5">
                          <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{selectedItem.principal} (Mindtech Direct Hub)</span>
                        </p>
                      </div>
                    </div>

                    {/* Key Benefits */}
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-gray-900 mb-2">
                        Formulation Advantages & Performance
                      </h4>
                      <ul className="space-y-2">
                        {selectedItem.keyBenefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm text-gray-700">
                            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                              ✓
                            </span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Certifications Badges */}
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-gray-900 mb-2 flex items-center space-x-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-700" />
                        <span>Compliance & Regulatory Documentation</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.certifications.map((cert, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-emerald-50 border border-emerald-200/90 text-emerald-950 text-xs font-semibold rounded-xl flex items-center space-x-1"
                          >
                            <Award className="w-3 h-3 text-emerald-600" />
                            <span>{cert}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-20 text-gray-400">
                    Select an ingredient from the list to view its complete technical specifications.
                  </div>
                )}

                {/* Bottom Call to Action strip */}
                {selectedItem && (
                  <div className="mt-6 pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 bg-gray-50 p-3.5 rounded-2xl">
                    <div className="text-xs text-gray-600">
                      Need Certificate of Analysis (COA) or formulation compatibility guide?
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedCalcIngredient(selectedItem.name);
                          const dosageNum = parseFloat(selectedItem.recommendedDosage) || 2.0;
                          setActivePercentage(dosageNum);
                          setActiveTab('calculator');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 transition-all cursor-pointer flex items-center space-x-1"
                      >
                        <Calculator className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Test in Calculator</span>
                      </button>
                      <button
                        onClick={() => {
                          onRequestSample(`${selectedItem.name} - COA & Lab Sample`);
                          onClose();
                        }}
                        className="px-4 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
                      >
                        Request Sample
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Tab 2: Interactive Cosmetic Batch Dosage Calculator */
            <div className="flex-1 overflow-y-auto p-5 sm:p-8 bg-gray-50/70">
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="bg-white p-6 rounded-3xl border border-gray-200/90 shadow-xs space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                      <Calculator className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#072414]">
                        Cosmetic Batch Quantity & Dosage Calculator
                      </h3>
                      <p className="text-sm text-gray-600">
                        Compute raw material mass requirement, batch yield, and inventory buffer for pilot bench or commercial production runs.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Target Ingredient
                      </label>
                      <select
                        value={selectedCalcIngredient}
                        onChange={(e) => {
                          setSelectedCalcIngredient(e.target.value);
                          const found = INGREDIENT_CATALOG.find(i => i.name === e.target.value);
                          if (found) {
                            const val = parseFloat(found.recommendedDosage) || 2.0;
                            setActivePercentage(val);
                          }
                        }}
                        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium focus:bg-white focus:outline-hidden focus:border-emerald-600"
                      >
                        {INGREDIENT_CATALOG.map(i => (
                          <option key={i.id} value={i.name}>{i.name} ({i.principal.split(' ')[0]})</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Total Batch Size (Kilograms)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="50000"
                        value={batchSizeKg}
                        onChange={(e) => setBatchSizeKg(Math.max(1, parseFloat(e.target.value) || 1))}
                        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-bold font-mono focus:bg-white focus:outline-hidden focus:border-emerald-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Dosage Percentage (%)
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          step="0.05"
                          min="0.01"
                          max="100"
                          value={activePercentage}
                          onChange={(e) => setActivePercentage(Math.max(0.01, parseFloat(e.target.value) || 0.01))}
                          className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-bold font-mono focus:bg-white focus:outline-hidden focus:border-emerald-600"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Calculated Output Card */}
                  <div className="mt-4 p-5 rounded-2xl bg-gradient-to-br from-[#072414] to-[#0e4425] text-white">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
                      <div>
                        <span className="text-xs text-emerald-300 font-medium">Required Raw Material Mass</span>
                        <div className="text-3xl font-black text-white font-mono mt-1">
                          {((batchSizeKg * activePercentage) / 100).toFixed(2)} kg
                        </div>
                        <span className="text-[11px] text-emerald-200">
                          ({(((batchSizeKg * activePercentage) / 100) * 1000).toLocaleString()} grams)
                        </span>
                      </div>

                      <div className="sm:border-l sm:border-emerald-800/60 sm:pl-4">
                        <span className="text-xs text-emerald-300 font-medium">Standard Pack Size Suggestion</span>
                        <div className="text-xl font-bold text-white mt-1">
                          {((batchSizeKg * activePercentage) / 100) <= 5 ? '5 kg Lab / Pilot Carboy' : ((batchSizeKg * activePercentage) / 100) <= 25 ? '25 kg Drum / Canister' : '200 kg Commercial Drum'}
                        </div>
                        <span className="text-[11px] text-emerald-200">
                          Bawana Central Depot Stock
                        </span>
                      </div>

                      <div className="sm:border-l sm:border-emerald-800/60 sm:pl-4 flex flex-col justify-center">
                        <button
                          onClick={() => {
                            const massKg = ((batchSizeKg * activePercentage) / 100).toFixed(2);
                            onRequestSample(`${selectedCalcIngredient} (Batch Requirement: ${massKg} kg for ${batchSizeKg} kg Batch)`);
                            onClose();
                          }}
                          className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#072414] font-black text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer"
                        >
                          Request Quotation for {((batchSizeKg * activePercentage) / 100).toFixed(2)} kg
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Practical Formulation Tips */}
                <div className="bg-white p-5 rounded-2xl border border-gray-200 text-xs text-gray-700 space-y-2">
                  <h4 className="font-bold text-gray-900 uppercase tracking-wider flex items-center space-x-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>Mindtech Formulation Quality Assurance</span>
                  </h4>
                  <p>
                    All active ingredients are supplied with batch-specific Certificates of Analysis (COA) confirming assay percentage, microbial purity, heavy metal limits, and physicochemical indices.
                  </p>
                  <p className="text-emerald-800 font-medium">
                    Technical documentation including Material Safety Data Sheets (MSDS/SDS), Regulatory Compliance statements, and COSMOS/Halal certifications are readily available upon request.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Modal Bottom Footer */}
          <div className="px-5 py-3 bg-gray-100 border-t border-gray-200 text-xs text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-gray-800">Mindtech Biotechnology</span>
              <span>•</span>
              <span>MSME Reg: UDYAM-DL-06-0157900</span>
              <span>•</span>
              <span>Bawana Industrial Area, New Delhi</span>
            </div>
            <div className="text-emerald-800 font-semibold">
              Direct Formulation Hotline: +91-8707403441
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
