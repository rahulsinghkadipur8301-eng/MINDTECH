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
  BookOpen,
  Play
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
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);

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
                  {supplier?.shortName || product.subSupplier || product.supplierId}
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
            
            {/* Product Image & Quick Specification Showcase */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
              {/* Product Photo */}
              <div className="md:col-span-5 relative rounded-2xl overflow-hidden aspect-[4/3] md:aspect-auto min-h-[180px] bg-gradient-to-br from-[#072414] to-[#041c10] shadow-md border border-emerald-100 flex items-center justify-center">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <FlaskConical className="w-12 h-12 text-emerald-400 opacity-60" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-xs font-mono pointer-events-none">
                  <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/20 text-[10px] text-emerald-300">
                    {product.physicalForm || product.category}
                  </span>
                  {product.dosage && (
                    <span className="px-2 py-0.5 rounded bg-emerald-600/90 text-white font-mono text-[10px] font-bold">
                      {product.dosage}
                    </span>
                  )}
                </div>
              </div>

              {/* Quick Specs Grid */}
              <div className="md:col-span-7 flex flex-col justify-between space-y-3 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100/90 text-xs">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-900 font-bold block mb-0.5">
                    INCI Name / Chemical Identity
                  </span>
                  <p className="text-sm font-bold text-gray-900 font-mono">
                    {product.inci}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-emerald-200/50">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500 font-semibold block">
                      Catalog Source
                    </span>
                    <span className="font-bold text-emerald-950">
                      {product.catalogOrigin || '2026 Mindtech Catalogue'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500 font-semibold block">
                      Recommended Dosage
                    </span>
                    <span className="font-bold text-emerald-900 font-mono">
                      {product.dosage || '1 - 5%'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-emerald-200/50">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500 font-semibold block">
                      Formulation Phase
                    </span>
                    <span className="font-semibold text-gray-800">
                      {product.solubility || 'Water soluble'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500 font-semibold block">
                      Physical Appearance
                    </span>
                    <span className="font-semibold text-gray-800">
                      {product.physicalForm || 'Cosmetic Grade Liquid'}
                    </span>
                  </div>
                </div>

                {product.sourceDoc && (
                  <div className="pt-2 border-t border-emerald-200/50 font-mono text-[11px] text-emerald-900/80">
                    <span className="text-gray-500 font-sans">Verified Citation: </span>
                    <strong>{product.sourceDoc}</strong>
                  </div>
                )}
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

            {/* Official Scientific Video (if available, e.g. HAIRILINE®) */}
            {product.videoUrl && (
              <div className="bg-gradient-to-br from-[#041c10] to-[#072c18] p-4 sm:p-5 rounded-2xl border border-emerald-500/30 text-white space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-emerald-300 uppercase tracking-wider">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Official Scientific Video Presentation</span>
                  </div>
                  <a
                    href={product.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-mono text-emerald-300 hover:text-white flex items-center space-x-1 transition-colors"
                  >
                    <span>Open YouTube</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-lg border border-emerald-500/20">
                  {isVideoPlaying ? (
                    <div className="relative w-full h-full">
                      <iframe
                        src="https://www.youtube-nocookie.com/embed/3aa3iMw0ahU?autoplay=1&rel=0&modestbranding=1"
                        title={`${product.name} Scientific Video`}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                      <button
                        type="button"
                        onClick={() => setIsVideoPlaying(false)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/80 hover:bg-black text-white text-xs font-mono flex items-center space-x-1 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Close</span>
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => setIsVideoPlaying(true)}
                      className="relative w-full h-full cursor-pointer group/modalvideo"
                      role="button"
                      tabIndex={0}
                    >
                      <img
                        src="/videos/greentech-hairiline-video-cover.jpg"
                        alt={product.name}
                        className="w-full h-full object-cover group-hover/modalvideo:scale-105 transition-transform duration-500"
                        loading="eager"
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          if (!target.src.includes('sddefault.jpg')) {
                            target.src = 'https://img.youtube.com/vi/3aa3iMw0ahU/sddefault.jpg';
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover/modalvideo:bg-black/25 transition-colors flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-emerald-500 text-emerald-950 flex items-center justify-center shadow-lg group-hover/modalvideo:scale-110 transition-transform">
                          <Play className="w-6 h-6 fill-current ml-0.5" />
                        </div>
                      </div>
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs text-white drop-shadow-md">
                        <span className="font-bold">Greentech France R&amp;D Scientific Presentation</span>
                        <span className="text-emerald-300 font-mono text-[11px] bg-black/60 px-2 py-0.5 rounded">Ready to Play</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

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

export default ProductDetailModal;
