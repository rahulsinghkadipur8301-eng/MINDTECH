import React, { useRef } from 'react';
import { CONCERN_CATEGORIES } from '../../data/masterIngredientsData';
import { 
  Sparkles, 
  Hourglass, 
  HeartHandshake, 
  Eye, 
  Sliders, 
  Droplets, 
  Shield, 
  Sun, 
  Layers, 
  User, 
  Scissors, 
  Dna, 
  Activity, 
  ShieldAlert, 
  Smile, 
  FlaskRound,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface ConcernRailProps {
  selectedConcern: string;
  onSelectConcern: (concernId: string) => void;
  ingredientCounts?: Record<string, number>;
}

// Icon mapping dictionary
const ICON_MAP: Record<string, React.ElementType> = {
  Sparkles,
  Hourglass,
  HeartHandshake,
  Eye,
  Sliders,
  Droplets,
  Shield,
  Sun,
  Layers,
  User,
  Scissors,
  Dna,
  Activity,
  ShieldAlert,
  Smile,
  FlaskRound
};

export const ConcernRail: React.FC<ConcernRailProps> = ({
  selectedConcern,
  onSelectConcern,
  ingredientCounts = {}
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full relative py-2">
      {/* Scroll Left Button */}
      <button
        onClick={() => handleScroll('left')}
        aria-label="Scroll categories left"
        className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 items-center justify-center text-gray-700 hover:text-emerald-900 hover:bg-emerald-50 transition-colors cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Scroll Right Button */}
      <button
        onClick={() => handleScroll('right')}
        aria-label="Scroll categories right"
        className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 items-center justify-center text-gray-700 hover:text-emerald-900 hover:bg-emerald-50 transition-colors cursor-pointer"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Rail Container */}
      <div
        ref={scrollContainerRef}
        role="tablist"
        aria-label="Cosmetic & Technical Concerns"
        className="flex items-center gap-2.5 sm:gap-3.5 overflow-x-auto scrollbar-none py-2 px-1 snap-x scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {CONCERN_CATEGORIES.map((concern) => {
          const isSelected = selectedConcern === concern.id;
          const IconComponent = ICON_MAP[concern.iconName] || Sparkles;
          const count = ingredientCounts[concern.id];

          return (
            <button
              key={concern.id}
              role="tab"
              aria-selected={isSelected}
              onClick={() => onSelectConcern(concern.id)}
              className={`shrink-0 flex items-center space-x-2.5 px-3.5 py-2 rounded-full border transition-all duration-200 cursor-pointer snap-start ${
                isSelected
                  ? 'bg-[#072414] text-white border-[#072414] shadow-md shadow-emerald-950/20'
                  : 'bg-white text-gray-700 hover:text-emerald-950 border-gray-200/90 hover:border-emerald-300 hover:bg-emerald-50/50'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-100 text-emerald-800'
                }`}
              >
                <IconComponent className="w-3.5 h-3.5" />
              </div>

              <span className="text-xs sm:text-[13px] font-semibold whitespace-nowrap">
                {concern.label}
              </span>

              {count !== undefined && count > 0 && (
                <span
                  className={`text-[11px] font-mono font-bold px-1.5 py-0.2 rounded-full ${
                    isSelected
                      ? 'bg-emerald-900/80 text-emerald-200'
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
    </div>
  );
};
