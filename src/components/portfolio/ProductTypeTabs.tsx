import React from 'react';
import { ProductType } from '../../types/ingredient';
import { 
  Sparkles, 
  Leaf, 
  Droplet, 
  ShieldCheck, 
  FlaskConical, 
  Layers, 
  Package
} from 'lucide-react';

export interface ProductTypeOption {
  id: string;
  label: string;
  type?: ProductType;
  icon: React.ElementType;
}

export const PRODUCT_TYPE_OPTIONS: ProductTypeOption[] = [
  { id: 'all', label: 'All Products', icon: Package },
  { id: 'bioactive', label: 'Bioactive Actives', type: 'bioactive', icon: Sparkles },
  { id: 'botanical-extract', label: 'Botanical Extracts', type: 'botanical-extract', icon: Leaf },
  { id: 'pure-oil', label: 'Pure Vegetable Oils', type: 'pure-oil', icon: Droplet },
  { id: 'plant-butter', label: 'Plant Butters', type: 'plant-butter', icon: Layers },
  { id: 'oily-active', label: 'Specialty Lipactives', type: 'oily-active', icon: ShieldCheck },
  { id: 'formulation-functional', label: 'Functional Cleansers', type: 'formulation-functional', icon: FlaskConical }
];

interface ProductTypeTabsProps {
  selectedType: string;
  onSelectType: (typeId: string) => void;
  typeCounts?: Record<string, number>;
}

export const ProductTypeTabs: React.FC<ProductTypeTabsProps> = ({
  selectedType,
  onSelectType,
  typeCounts = {}
}) => {
  return (
    <div className="w-full flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none py-1">
      {PRODUCT_TYPE_OPTIONS.map((option) => {
        const isSelected = selectedType === option.id;
        const IconComponent = option.icon;
        const count = typeCounts[option.id];

        return (
          <button
            key={option.id}
            onClick={() => onSelectType(option.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1.5 cursor-pointer border ${
              isSelected
                ? 'bg-emerald-800 text-white border-emerald-900 shadow-2xs'
                : 'bg-white text-gray-700 hover:text-emerald-900 border-gray-200 hover:bg-emerald-50/50'
            }`}
          >
            <IconComponent className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-300' : 'text-emerald-700'}`} />
            <span>{option.label}</span>
            {count !== undefined && count > 0 && (
              <span
                className={`ml-1 text-[11px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
                  isSelected
                    ? 'bg-emerald-950 text-emerald-200'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
