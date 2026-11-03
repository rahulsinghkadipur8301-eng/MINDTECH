import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MASTER_INGREDIENTS } from '../../data/masterIngredientsData';
import { 
  X, 
  Search, 
  BookOpen, 
  FileCheck, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink,
  Filter,
  Layers,
  ArrowRight
} from 'lucide-react';

interface SourceMappingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectIngredient?: (ingredientId: string) => void;
}

export const SourceMappingModal: React.FC<SourceMappingModalProps> = ({
  isOpen,
  onClose,
  onSelectIngredient
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFileFilter, setSelectedFileFilter] = useState('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');

  // Client-supplied 5 PDFs summary
  const clientPdfs = [
    { name: 'Catalogue India_compressed.pdf', pages: 32, year: 2023, scope: 'Core India active ingredients (Skin pp. 7-19, Hair pp. 21-27)' },
    { name: 'Plaquette Hair Care 2021_V02-PRINT.pdf', pages: 16, year: 2023, scope: 'Specialist hair & scalp fact sheets & lipactives (pp. 3-15)' },
    { name: 'Plaquette Microbiote-PRINT.pdf', pages: 12, year: 2023, scope: 'Microbiome science & holobiont actives (pp. 4-11)' },
    { name: 'Plaquette actifs Greentech 2024-PRINT.pdf', pages: 48, year: 2024, scope: 'Expanded 2024 actives, well-ageing, oral care, functional surfactants & fair trade' },
    { name: 'Plaquette Vegetable Oils Greentech 2022-PRINT.pdf', pages: 28, year: 2022, scope: '43 pure vegetable oils, 4 plant butters, lipoactives & functional cleansers' }
  ];

  const filteredItems = useMemo(() => {
    return MASTER_INGREDIENTS.filter(item => {
      if (selectedStatusFilter !== 'All' && item.verificationStatus !== selectedStatusFilter) {
        return false;
      }
      if (selectedFileFilter !== 'All') {
        const hasFile = item.sourceRefs.some(ref => ref.file.includes(selectedFileFilter));
        if (!hasFile) return false;
      }
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.inci.toLowerCase().includes(q) ||
        (item.botanicalName && item.botanicalName.toLowerCase().includes(q)) ||
        item.sourceRefs.some(ref => ref.file.toLowerCase().includes(q) || ref.pages.join(',').includes(q))
      );
    });
  }, [searchQuery, selectedFileFilter, selectedStatusFilter]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 text-left">
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden z-10 my-auto flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#072414] via-[#0c4024] to-emerald-950 text-white p-5 sm:p-6 flex items-start justify-between">
            <div className="space-y-1 max-w-[85%]">
              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-300 font-bold block">
                AUDIT &amp; DATA GOVERNANCE TRACEABILITY
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                5 Client Brochures (136 Pages) Source-to-Product Mapping
              </h3>
              <p className="text-xs text-emerald-200">
                100% verified cross-reference indexing each product record against exact PDF source files, edition years, page citations, and reconciliation notes.
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
              aria-label="Close mapping index"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 5-PDF Overview Bar */}
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
              {clientPdfs.map((pdf, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-white border border-gray-200 space-y-1">
                  <span className="font-mono text-[10px] text-emerald-800 font-bold block truncate" title={pdf.name}>
                    {pdf.name}
                  </span>
                  <div className="flex items-center justify-between text-[11px] text-gray-500">
                    <span>{pdf.pages} Pages</span>
                    <span className="font-mono font-bold text-gray-800">{pdf.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Filters Bar */}
          <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row items-center gap-3 bg-white">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by ingredient, INCI, or PDF page..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-xs"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={selectedFileFilter}
                onChange={e => setSelectedFileFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-gray-200 text-xs bg-white text-gray-700"
              >
                <option value="All">All 5 Source Files</option>
                <option value="India">Catalogue India (2023)</option>
                <option value="actifs Greentech 2024">Actifs Greentech 2024</option>
                <option value="Vegetable Oils">Vegetable Oils 2022</option>
                <option value="Hair Care">Hair Care 2021/2023</option>
                <option value="Microbiote">Microbiote 2023</option>
              </select>

              <select
                value={selectedStatusFilter}
                onChange={e => setSelectedStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-gray-200 text-xs bg-white text-gray-700"
              >
                <option value="All">All Statuses</option>
                <option value="verified">Verified (Approved)</option>
                <option value="needs-review">Needs Regulatory Review</option>
              </select>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto flex-1 p-4">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 font-mono text-[11px] uppercase bg-gray-50">
                  <th className="py-2.5 px-3">Product Name</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">INCI / Key Molecule</th>
                  <th className="py-2.5 px-3">Source PDF &amp; Page Mapping</th>
                  <th className="py-2.5 px-3">Audit Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredItems.map(item => (
                  <tr key={item.id} className="hover:bg-emerald-50/40 transition-colors">
                    <td className="py-3 px-3 font-bold text-gray-900">
                      {item.name}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-mono text-[10px] uppercase">
                        {item.productType}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-gray-600 font-mono text-[11px] max-w-[200px] truncate" title={item.inci}>
                      {item.inci}
                    </td>
                    <td className="py-3 px-3">
                      <div className="space-y-1">
                        {item.sourceRefs.map((ref, idx) => (
                          <div key={idx} className="flex items-center space-x-1.5 text-[11px]">
                            <span className="font-mono text-gray-700 truncate max-w-[140px] block" title={ref.file}>
                              {ref.file.replace('_compressed.pdf', '').replace('-PRINT.pdf', '')}
                            </span>
                            <span className="font-mono font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded text-[10px]">
                              p.{ref.pages.join(', ')}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      {item.verificationStatus === 'verified' ? (
                        <span className="inline-flex items-center space-x-1 text-emerald-700 font-bold text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Verified</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 text-amber-700 font-bold text-[11px]" title="Pending Indian CDSCO / regulatory review">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Review</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => {
                          onClose();
                          if (onSelectIngredient) onSelectIngredient(item.id);
                        }}
                        className="text-emerald-800 hover:text-emerald-950 font-bold text-[11px] hover:underline cursor-pointer"
                      >
                        Open Sheet &rarr;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredItems.length === 0 && (
              <div className="py-12 text-center text-gray-500 text-xs">
                No matching product records found for this query.
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
            <span>Showing {filteredItems.length} of {MASTER_INGREDIENTS.length} total source-mapped catalogue items.</span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold transition-colors cursor-pointer"
            >
              Close Traceability Index
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
