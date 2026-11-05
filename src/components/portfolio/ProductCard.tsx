import React, { useState } from 'react';
import { ProductItem } from '../../data/supplierProductsData';
import { 
  FlaskConical, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck,
  Layers,
  Droplets,
  FileCheck,
  Play
} from 'lucide-react';

interface ProductCardProps {
  product: ProductItem;
  onSelectProduct: (product: ProductItem) => void;
  onRequestSample?: (product: ProductItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onRequestSample
}) => {
  const [imageError, setImageError] = useState(false);
  const isGreentech = product.supplierId === 'greentech';
  const isSilicone = product.supplierId === 'sns-silcos';

  const originBadge = product.catalogOrigin === 'Historical Greentech Dossier'
    ? { text: 'Historical Dossier', bg: 'bg-amber-500/90 text-white border-amber-400/40' }
    : product.catalogOrigin === 'Dual-Sourced / Verified'
      ? { text: 'Dual-Sourced & Verified', bg: 'bg-emerald-600/90 text-white border-emerald-400/40' }
      : { text: '2026 Mindtech Range', bg: 'bg-slate-900/80 text-emerald-200 border-white/20' };

  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="group relative bg-white rounded-2xl border border-gray-200/90 hover:border-emerald-500/70 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer text-left transform hover:-translate-y-1"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelectProduct(product);
        }
      }}
      aria-label={`View technical specifications for ${product.name}`}
    >
      {/* Top Media / Thumbnail with Unique High-Res Product Image */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[4/3] bg-gradient-to-br from-[#072414] via-[#0a351d] to-[#041c10] overflow-hidden">
        {product.image && !imageError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-emerald-400 p-4 text-center">
            {isSilicone ? (
              <Droplets className="w-10 h-10 mb-2 opacity-80" />
            ) : isGreentech ? (
              <Sparkles className="w-10 h-10 mb-2 opacity-80" />
            ) : (
              <FlaskConical className="w-10 h-10 mb-2 opacity-80" />
            )}
            <span className="text-xs font-mono tracking-wider uppercase text-emerald-300 font-bold">
              {product.category}
            </span>
          </div>
        )}

        {/* Ambient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges Overlay: Catalog Origin & PDF Page */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none gap-1.5">
          <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md border shadow-xs ${originBadge.bg}`}>
            {originBadge.text}
          </span>

          <span className="shrink-0 inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-[10px] font-mono bg-black/60 backdrop-blur-md text-emerald-300 border border-emerald-500/30">
            <FileCheck className="w-3 h-3 text-emerald-400" />
            <span>p.{product.pdfPage}</span>
          </span>
        </div>

        {/* Video Available Badge (e.g. HAIRILINE®) */}
        {product.videoUrl && (
          <div className="absolute top-9 left-2.5 z-10 pointer-events-none">
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500 text-emerald-950 shadow-md">
              <Play className="w-2.5 h-2.5 fill-current" />
              <span>Video</span>
            </span>
          </div>
        )}

        {/* Bottom image pill: Physical Form or Dosage */}
        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-white/95 drop-shadow-sm font-medium pointer-events-none">
          <span className="truncate max-w-[65%] font-mono text-[10px] text-emerald-200">
            {product.physicalForm || product.category}
          </span>
          {product.dosage && (
            <span className="px-1.5 py-0.5 rounded bg-emerald-700/80 text-white font-mono text-[10px] font-bold">
              {product.dosage}
            </span>
          )}
        </div>
      </div>

      {/* Card Body Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        
        {/* Top Badges: Category & Product Code */}
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold tracking-wide uppercase bg-emerald-50 text-emerald-900 border border-emerald-200/70 truncate max-w-[70%]">
              {product.category}
            </span>

            {product.code && (
              <span className="shrink-0 px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-gray-100 text-gray-700 border border-gray-200">
                {product.code}
              </span>
            )}
          </div>

          {/* Product Name */}
          <h4 className="text-lg sm:text-[19px] font-black text-[#072414] group-hover:text-emerald-800 transition-colors leading-snug">
            {product.name}
          </h4>

          {/* INCI Name / Active Molecule */}
          <p className="mt-1 text-xs text-gray-500 font-mono line-clamp-1 italic" title={product.inci}>
            INCI: {product.inci}
          </p>
        </div>

        {/* Main Benefit / Use */}
        <p className="text-[13px] text-gray-600 line-clamp-2 leading-relaxed">
          {product.mainUse}
        </p>

        {/* Technical Specification Bar: Solubility & Application */}
        <div className="pt-2 border-t border-gray-100/90 space-y-1.5">
          <div className="flex items-center text-xs text-gray-600">
            <span className="text-gray-400 font-medium mr-1.5 shrink-0">Phase:</span>
            <span className="font-semibold text-emerald-900 truncate" title={product.solubility}>
              {product.solubility || 'Formulation Phase'}
            </span>
          </div>

          <div className="flex items-center text-xs text-gray-600">
            <span className="text-gray-400 font-medium mr-1.5 shrink-0">App:</span>
            <span className="font-semibold text-gray-800 truncate" title={product.application}>
              {product.application}
            </span>
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="px-4 sm:px-5 py-3 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between text-xs">
        <span className="font-bold text-emerald-800 group-hover:text-emerald-950 flex items-center space-x-1">
          <span>View Dossier</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </span>

        {onRequestSample && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRequestSample(product);
            }}
            className="text-[11px] font-bold text-gray-700 hover:text-emerald-900 hover:bg-emerald-50 px-2 py-1 rounded cursor-pointer transition-colors border border-gray-200"
          >
            Sample Pack +
          </button>
        )}
      </div>
    </div>
  );
};
