import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProductItem, SUPPLIER_PROFILES } from '../../data/supplierProductsData';
import { PartnerLogoRenderer } from '../PartnerLogos';
import { 
  X, 
  FlaskConical, 
  CheckCircle2, 
  ArrowRight, 
  FileCheck, 
  ShieldCheck, 
  ExternalLink, 
  Copy, 
  Check, 
  Share2,
  Building2,
  Tag,
  Percent,
  Droplets,
  BookOpen
} from 'lucide-react';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onRequestSample: (product: ProductItem) => void;
  onRequestQuote: (product: ProductItem) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onRequestSample,
  onRequestQuote
}) => {
  const [copiedLink, setCopiedLink] = React.useState(false);

  if (!product) return null;

  const supplier = SUPPLIER_PROFILES[product.supplierId];

  const handleCopyLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#product/${product.slug}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
        
        {/* Backdrop click to close */}
        <div className="fixed inset-0" onClick={onClose} />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden text-left z-10 my-auto flex flex-col max-h-[92vh]"
        >
          {/* Header Bar */}
          <div className="relative bg-gradient-to-r from-[#072414] via-[#0c4024] to-emerald-950 text-white p-5 sm:p-7 flex items-start justify-between">
            <div className="space-y-1.5 max-w-[85%]">
              
              {/* Badges: Supplier & Verified Catalog */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider border border-emerald-400/30">
                  {supplier?.shortName || product.supplierName}
                </span>

                <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-white/10 text-white text-[11px] font-mono border border-white/20">
                  <FileCheck className="w-3 h-3 text-emerald-400" />
                  <span>PDF Catalog Page {product.pdfPage}</span>
                </span>
              </div>

              {/* Product Title */}
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight pt-1">
                {product.name}
              </h2>

              {/* Product Code */}
              {product.code && (
                <div className="text-xs font-mono text-emerald-300">
                  Item Code: <strong>{product.code}</strong>
                </div>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
              aria-label="Close detail modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body - Scrollable */}
          <div className="p-5 sm:p-7 space-y-6 overflow-y-auto">
            
            {/* INCI and Category Highlight Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-900 font-bold block mb-0.5">
                  INCI Name / Chemical Identity
                </span>
                <p className="text-sm font-semibold text-gray-900 font-mono">
                  {product.inci}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-900 font-bold block mb-0.5">
                  Portfolio Category
                </span>
                <p className="text-sm font-bold text-emerald-950">
                  {product.category}
                </p>
              </div>
            </div>

            {/* Main Use & Benefit */}
            <div className="space-y-1.5">
              <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
                Efficacy & Main Benefits
              </h3>
              <p className="text-base text-gray-800 leading-relaxed font-medium">
                {product.mainUse}
              </p>
            </div>

            {/* Two-Column Grid: Applications & Dosage */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Application */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-1.5">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-gray-700 uppercase tracking-wider">
                  <Tag className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Target Applications</span>
                </div>
                <p className="text-sm font-semibold text-gray-800 leading-snug">
                  {product.application}
                </p>
              </div>

              {/* Dosage */}
              <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200/70 space-y-1.5">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-teal-900 uppercase tracking-wider">
                  <Percent className="w-3.5 h-3.5 text-teal-700" />
                  <span>Recommended Dosage</span>
                </div>
                <p className="text-base font-extrabold text-teal-950">
                  {product.dosage}
                </p>
              </div>

            </div>

            {/* Key Benefits List */}
            {product.keyBenefits && product.keyBenefits.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
                  Formulation Highlights & Technical Advantages
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.keyBenefits.map((benefit, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs sm:text-[13px] text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Formulator Benefits from PDF */}
            {product.formulatorBenefits && product.formulatorBenefits.length > 0 && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50/50 to-white border border-emerald-200/90 space-y-2">
                <div className="flex items-center space-x-2 text-xs font-bold text-emerald-950 uppercase tracking-wider">
                  <FlaskConical className="w-4 h-4 text-emerald-700" />
                  <span>Chemist & Formulator Guidelines</span>
                </div>
                <ul className="space-y-1 text-xs sm:text-[13px] text-emerald-950/90 pl-1">
                  {product.formulatorBenefits.map((note, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-emerald-700 font-bold">•</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Verified Sourcing & MSME Credibility Note */}
            <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
              <span className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Direct Distribution by Mindtech Biotechnology</span>
              </span>

              <button
                type="button"
                onClick={handleCopyLink}
                className="flex items-center space-x-1 text-emerald-800 hover:text-emerald-950 font-semibold cursor-pointer"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-600" />
                    <span>Link Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share Product</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Modal Footer with Actions */}
          <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
            >
              Back to Catalog
            </button>

            <div className="w-full sm:w-auto flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onRequestQuote(product);
                }}
                className="flex-1 sm:flex-initial px-4 sm:px-5 py-2.5 rounded-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
              >
                Request TDS / Quote
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onRequestSample(product);
                }}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-2 px-5 sm:px-6 py-2.5 rounded-full bg-emerald-900 hover:bg-emerald-950 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span>Request Sample Pack</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
};
