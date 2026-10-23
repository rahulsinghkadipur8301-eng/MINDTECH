import React from 'react';
import { ProductItem } from '../../data/supplierProductsData';
import { 
  FlaskConical, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck,
  Layers,
  Droplets
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
  const isGreentech = product.supplierId === 'greentech';
  const isSilicone = product.supplierId === 'sns-silcos';

  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="group relative bg-white rounded-2xl border border-gray-200/90 hover:border-emerald-500/60 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer text-left transform hover:-translate-y-1"
    >
      {/* Top Accent Strip based on Supplier */}
      <div 
        className={`h-1.5 w-full ${
          isGreentech 
            ? 'bg-gradient-to-r from-emerald-500 to-green-600' 
            : isSilicone
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
              : 'bg-gradient-to-r from-teal-600 to-emerald-700'
        }`} 
      />

      {/* Card Content */}
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

        {/* Application Tag */}
        <div className="pt-2 border-t border-gray-100/90 space-y-1.5">
          <div className="flex items-center text-xs text-gray-600">
            <span className="text-gray-400 font-medium mr-1.5 shrink-0">App:</span>
            <span className="font-semibold text-gray-800 truncate" title={product.application}>
              {product.application}
            </span>
          </div>

          {/* Dosage Badge */}
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="inline-flex items-center text-[11px] font-semibold text-emerald-900 bg-emerald-100/70 px-2 py-0.5 rounded">
              Dose: <strong>{product.dosage}</strong>
            </span>

            <span className="text-[11px] text-gray-400 font-mono">
              PDF p.{product.pdfPage}
            </span>
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="px-4 sm:px-5 py-3 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between text-xs">
        <span className="font-bold text-emerald-800 group-hover:text-emerald-950 flex items-center space-x-1">
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </span>

        {onRequestSample && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRequestSample(product);
            }}
            className="text-[11px] font-bold text-gray-600 hover:text-emerald-900 hover:underline px-2 py-1 rounded cursor-pointer"
          >
            Sample Pack +
          </button>
        )}
      </div>
    </div>
  );
};
