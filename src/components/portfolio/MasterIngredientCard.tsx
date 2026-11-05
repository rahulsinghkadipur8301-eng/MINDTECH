import React, { useState } from 'react';
import { MasterIngredient } from '../../types/ingredient';
import { 
  ArrowRight, 
  FlaskConical, 
  Leaf, 
  Droplet, 
  Layers, 
  Sparkles, 
  ShieldCheck, 
  FileCheck,
  Send,
  Play
} from 'lucide-react';

interface MasterIngredientCardProps {
  ingredient: MasterIngredient;
  onSelectIngredient: (ingredient: MasterIngredient) => void;
  onRequestSample?: (ingredient: MasterIngredient) => void;
}

export const MasterIngredientCard: React.FC<MasterIngredientCardProps> = ({
  ingredient,
  onSelectIngredient,
  onRequestSample
}) => {
  const [imageError, setImageError] = useState(false);

  // Type icon selector
  const getTypeIcon = () => {
    switch (ingredient.productType) {
      case 'pure-oil':
        return Droplet;
      case 'plant-butter':
        return Layers;
      case 'botanical-extract':
        return Leaf;
      case 'formulation-functional':
        return FlaskConical;
      default:
        return Sparkles;
    }
  };

  const TypeIcon = getTypeIcon();

  // Primary source reference citation
  const primarySource = ingredient.sourceRefs[0];
  const sourceLabel = primarySource 
    ? `${primarySource.file.includes('India') ? 'India Cat.' : primarySource.file.includes('2024') ? '2024 Cat.' : primarySource.file.includes('Oils') ? 'Oils Cat.' : primarySource.file.includes('Microbiote') ? 'Microbiote' : 'Hair Care'} p.${primarySource.pages.join(', ')}`
    : 'Verified Catalog';

  return (
    <div
      onClick={() => onSelectIngredient(ingredient)}
      className="group relative flex flex-col items-center cursor-pointer text-center"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelectIngredient(ingredient);
        }
      }}
      aria-label={`View technical datasheet for ${ingredient.name}`}
    >
      {/* Authentic Framed Card Box (matching screenshot: white border matting + thin gray outline) */}
      <div className="relative w-full aspect-[176/124] bg-white border border-gray-200/90 rounded-xs sm:rounded-sm p-1 shadow-2xs group-hover:shadow-md transition-all duration-300 transform group-hover:-translate-y-1 overflow-hidden">
        <div className="w-full h-full overflow-hidden relative bg-gray-50 rounded-2xs">
          {ingredient.image && !imageError ? (
            <img
              src={ingredient.image}
              alt={ingredient.name}
              onError={() => setImageError(true)}
              referrerPolicy="no-referrer"
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-emerald-800 p-2 text-center bg-emerald-50/50">
              <TypeIcon className="w-8 h-8 mb-1 opacity-70" />
              <span className="text-[10px] font-mono tracking-wider uppercase text-emerald-900 font-bold truncate max-w-full">
                {ingredient.botanicalName || 'Cosmetic Active'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Centered Uppercase Product Title */}
      <h3 className="mt-2.5 text-center text-xs sm:text-[13px] font-bold text-gray-900 tracking-wide uppercase font-['Outfit'] leading-snug group-hover:text-[#70a83b] transition-colors max-w-full">
        {ingredient.name}
      </h3>

      {/* Hover Tooltip (Exact replica of "Anti-oxydant-PHYTOBIOACTIF-POMEGRANATE" from Screenshot 1) */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 z-30 bg-[#2d3748] text-white text-[11px] font-medium px-2.5 py-1 rounded shadow-lg whitespace-nowrap max-w-[260px] truncate">
        {ingredient.shortBenefit || ingredient.description}
      </div>
    </div>
  );
};
