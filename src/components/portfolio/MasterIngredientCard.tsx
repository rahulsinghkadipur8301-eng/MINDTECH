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
      className="group relative bg-white rounded-2xl border border-gray-200 hover:border-emerald-500 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer text-left transform hover:-translate-y-1"
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
      {/* Top Media / Thumbnail (4:3 aspect ratio) */}
      <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-emerald-950 via-[#0a351d] to-[#072414] overflow-hidden">
        {ingredient.image && !imageError ? (
          <img
            src={ingredient.image}
            alt={ingredient.name}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-emerald-400 p-4 text-center">
            <TypeIcon className="w-10 h-10 mb-2 opacity-80" />
            <span className="text-xs font-mono tracking-wider uppercase text-emerald-300 font-bold">
              {ingredient.botanicalName || ingredient.productFamily || 'Specialty Cosmetic Active'}
            </span>
          </div>
        )}

        {/* Top Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-[#072414] shadow-xs">
            {ingredient.productType.replace('-', ' ')}
          </span>

          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-[10px] font-mono bg-black/60 backdrop-blur-md text-emerald-300 border border-emerald-500/30">
            <FileCheck className="w-3 h-3 text-emerald-400" />
            <span>{sourceLabel}</span>
          </span>
        </div>

        {/* Video Available Badge (e.g. HAIRILINE®) */}
        {ingredient.videoUrl && (
          <div className="absolute top-10 left-2.5 z-10">
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500 text-emerald-950 shadow-md">
              <Play className="w-2.5 h-2.5 fill-current" />
              <span>Video Available</span>
            </span>
          </div>
        )}

        {/* Sensory/Form Indicator Pill */}
        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-white/90 drop-shadow-sm font-medium">
          <span className="truncate max-w-[70%]">
            {ingredient.botanicalName || ingredient.origin || 'Biotechnology'}
          </span>
          {ingredient.useLevel && (
            <span className="px-1.5 py-0.5 rounded bg-emerald-700/80 text-white font-mono text-[10px] font-bold">
              {ingredient.useLevel}
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Product Name */}
          <h3 className="text-lg sm:text-xl font-bold text-[#072414] group-hover:text-emerald-800 transition-colors leading-snug">
            {ingredient.name}
          </h3>

          {/* INCI Specification */}
          <p className="mt-1 text-xs text-gray-500 font-mono line-clamp-1 italic" title={ingredient.inci}>
            INCI: {ingredient.inci}
          </p>

          {/* Sourced Benefit Claim */}
          <p className="mt-2.5 text-xs sm:text-[13px] text-gray-600 line-clamp-2 leading-relaxed">
            {ingredient.shortBenefit || ingredient.description}
          </p>
        </div>

        {/* Application Tags */}
        <div className="pt-2 border-t border-gray-100 space-y-1.5 text-xs">
          <div className="flex items-center text-gray-500 truncate">
            <span className="font-semibold text-gray-700 mr-1 shrink-0">Apps:</span>
            <span className="truncate text-gray-600">
              {ingredient.applications.slice(0, 2).join(' · ')}
            </span>
          </div>

          {/* Partner Provenance */}
          <div className="flex items-center justify-between text-[11px] text-gray-500 pt-0.5">
            <span className="font-mono text-emerald-800 font-bold">
              By Greentech France
            </span>
            <span className="text-gray-400">
              India Partner: Mindtech
            </span>
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-4 sm:px-5 py-3 bg-gray-50/90 border-t border-gray-100 flex items-center justify-between text-xs">
        <span className="font-bold text-emerald-800 group-hover:text-emerald-950 flex items-center space-x-1">
          <span>Datasheet &amp; Studies</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </span>

        {onRequestSample && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRequestSample(ingredient);
            }}
            className="px-2.5 py-1 rounded-md text-[11px] font-bold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 transition-colors flex items-center space-x-1 cursor-pointer"
          >
            <Send className="w-3 h-3" />
            <span>Sample</span>
          </button>
        )}
      </div>
    </div>
  );
};
