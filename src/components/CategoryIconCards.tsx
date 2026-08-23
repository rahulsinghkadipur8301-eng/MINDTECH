import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  ChevronRight, 
  FlaskConical, 
  Leaf, 
  Globe2, 
  Layers, 
  ShieldCheck, 
  Beaker 
} from 'lucide-react';

interface CategoryIconCardsProps {
  onOpenInquiry: (categoryTitle?: string) => void;
}

interface CardItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  svgType: 'makeup' | 'pharma' | 'silicone' | 'industrial' | 'natural' | 'global';
  badge: string;
}

const CATEGORY_CARDS: CardItem[] = [
  {
    id: 'color-cosmetics',
    title: 'Color Cosmetics & Make-Up',
    subtitle: 'Elastomer Gels, Film Formers & Resins',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80',
    svgType: 'makeup',
    badge: 'Cosmetic Innovation'
  },
  {
    id: 'pharma-actives',
    title: 'Active Bio-Technology & Pharma',
    subtitle: 'Arbutin, Kojic Dipalmitate & Vitamin C',
    image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=600&q=80',
    svgType: 'pharma',
    badge: 'Cellular Actives'
  },
  {
    id: 'polymers-silicones',
    title: 'Specialty Polymers & Silicones',
    subtitle: 'Volatile Fluids, Crosspolymers & Polyquats',
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=600&q=80',
    svgType: 'silicone',
    badge: 'Sensory Specialties'
  },
  {
    id: 'industrial-care',
    title: 'Personal Care & Surfactants',
    subtitle: 'Sulfate-Free Glucosides, Betaines & SCI',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    svgType: 'industrial',
    badge: 'Clean Cleansing'
  },
  {
    id: 'natural-extracts',
    title: 'Natural Extracts & Greentech',
    subtitle: 'Marine Algae, Bio-Ferments & Phyto-Actives',
    image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=600&q=80',
    svgType: 'natural',
    badge: 'Botanical Science'
  },
  {
    id: 'global-logistics',
    title: 'Global Sourcing & Supply',
    subtitle: 'Bawana Central Hub & Prompt Dispatch',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
    svgType: 'global',
    badge: 'Direct Supply'
  }
];

// Clean line-art SVG icons matching the exact style in user screenshot
const renderCustomSvgIcon = (type: CardItem['svgType']) => {
  switch (type) {
    case 'makeup':
      return (
        <svg viewBox="0 0 100 100" className="w-14 h-14 stroke-[#004b87] fill-none stroke-[2.5] stroke-linecap-round stroke-linejoin-round">
          {/* Mirror */}
          <circle cx="58" cy="46" r="24" strokeWidth="2.5" />
          <path d="M 58 70 L 58 88 M 46 88 L 70 88" strokeWidth="2.8" />
          {/* Lipstick */}
          <rect x="18" y="44" width="16" height="42" rx="3" strokeWidth="2.5" />
          <path d="M 22 44 L 22 28 L 30 22 L 30 44 Z" strokeWidth="2.5" />
          {/* Mascara Wand */}
          <path d="M 12 18 L 12 36" strokeWidth="3" />
          <line x1="8" y1="22" x2="16" y2="22" />
          <line x1="8" y1="26" x2="16" y2="26" />
          <line x1="8" y1="30" x2="16" y2="30" />
        </svg>
      );
    case 'pharma':
      return (
        <svg viewBox="0 0 100 100" className="w-14 h-14 stroke-[#004b87] fill-none stroke-[2.5] stroke-linecap-round stroke-linejoin-round">
          {/* Bottle */}
          <rect x="18" y="28" width="34" height="48" rx="6" strokeWidth="2.5" />
          <path d="M 26 28 L 26 18 L 44 18 L 44 28" strokeWidth="2.5" />
          {/* Cross */}
          <path d="M 35 44 L 35 60 M 27 52 L 43 52" strokeWidth="2.8" />
          {/* Syringe */}
          <path d="M 68 20 L 78 30 L 62 58 L 52 48 Z" strokeWidth="2.5" />
          <line x1="73" y1="15" x2="83" y2="25" strokeWidth="2.5" />
          <line x1="52" y1="58" x2="44" y2="66" strokeWidth="2.5" />
          {/* Capsule */}
          <rect x="24" y="80" width="32" height="12" rx="6" strokeWidth="2.2" transform="rotate(-15 40 86)" />
        </svg>
      );
    case 'silicone':
      return (
        <svg viewBox="0 0 100 100" className="w-14 h-14 stroke-[#004b87] fill-none stroke-[2.5] stroke-linecap-round stroke-linejoin-round">
          {/* Paint Roller / Applicator */}
          <rect x="30" y="16" width="44" height="22" rx="5" strokeWidth="2.5" transform="rotate(-28 52 27)" />
          <path d="M 40 38 L 58 65 L 72 85" strokeWidth="3" />
          {/* Tube */}
          <path d="M 20 62 L 35 48 L 48 62 L 34 76 Z" strokeWidth="2.5" />
          <path d="M 14 68 L 20 62" strokeWidth="3" />
          <circle cx="28" cy="85" r="4" fill="#004b87" />
          <circle cx="42" cy="88" r="3" fill="#004b87" />
        </svg>
      );
    case 'industrial':
      return (
        <svg viewBox="0 0 100 100" className="w-14 h-14 stroke-[#004b87] fill-none stroke-[2.5] stroke-linecap-round stroke-linejoin-round">
          {/* Skyscrapers / City Facilities */}
          <path d="M 18 86 L 18 42 L 36 30 L 36 86 Z" strokeWidth="2.5" />
          <path d="M 36 86 L 36 22 L 56 12 L 56 86 Z" strokeWidth="2.5" />
          {/* Molecular Ring */}
          <path d="M 72 32 L 84 38 L 84 52 L 72 58 L 60 52 L 60 38 Z" strokeWidth="2.2" />
          <circle cx="72" cy="32" r="3" fill="#004b87" />
          <circle cx="84" cy="38" r="3" fill="#004b87" />
          <circle cx="84" cy="52" r="3" fill="#004b87" />
          <circle cx="72" cy="58" r="3" fill="#004b87" />
          <circle cx="60" cy="52" r="3" fill="#004b87" />
          <circle cx="60" cy="38" r="3" fill="#004b87" />
          <circle cx="94" cy="45" r="2.5" fill="#004b87" />
          <line x1="84" y1="45" x2="94" y2="45" strokeWidth="2" />
        </svg>
      );
    case 'natural':
      return (
        <svg viewBox="0 0 100 100" className="w-14 h-14 stroke-[#004b87] fill-none stroke-[2.5] stroke-linecap-round stroke-linejoin-round">
          {/* Two Cupped Hands */}
          <path d="M 22 84 C 22 62, 38 48, 48 54" strokeWidth="2.5" />
          <path d="M 78 84 C 78 62, 62 48, 52 54" strokeWidth="2.5" />
          {/* Botanical Leaf */}
          <path d="M 50 16 C 66 22, 66 38, 50 46 C 34 38, 34 22, 50 16 Z" strokeWidth="2.5" />
          <line x1="50" y1="18" x2="50" y2="44" strokeWidth="2" />
          {/* Citrus Slice */}
          <path d="M 62 40 A 12 12 0 0 1 76 52 L 62 52 Z" strokeWidth="2.2" />
          <circle cx="72" cy="24" r="5" strokeWidth="2" />
        </svg>
      );
    case 'global':
      return (
        <svg viewBox="0 0 100 100" className="w-14 h-14 stroke-[#004b87] fill-none stroke-[2.5] stroke-linecap-round stroke-linejoin-round">
          {/* Globe */}
          <circle cx="50" cy="52" r="32" strokeWidth="2.5" />
          <ellipse cx="50" cy="52" rx="14" ry="32" strokeWidth="2" />
          <line x1="18" y1="52" x2="82" y2="52" strokeWidth="2" />
          {/* Airplane */}
          <path d="M 22 24 L 32 20 L 40 28 L 34 30 L 30 36 L 26 34 L 27 30 L 22 28 Z" strokeWidth="2" fill="#004b87" />
          {/* Cargo Ship Base */}
          <path d="M 62 82 L 86 82 L 92 74 L 56 74 Z" strokeWidth="2.2" />
          <rect x="66" y="66" width="14" height="8" strokeWidth="2" />
        </svg>
      );
    default:
      return null;
  }
};

export const CategoryIconCards: React.FC<CategoryIconCardsProps> = ({ onOpenInquiry }) => {
  return (
    <section className="bg-white py-6 border-b border-gray-200/90 relative z-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* 6 High-Impact Line-Art + Photographic Cards Matching Screenshot */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {CATEGORY_CARDS.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              onClick={() => onOpenInquiry(card.title)}
              className="bg-white rounded-2xl border-2 border-gray-200 hover:border-[#004b87] hover:shadow-xl transition-all duration-300 p-3 sm:p-4 flex flex-col items-center justify-between text-center group cursor-pointer relative overflow-hidden"
            >
              {/* Soft background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-50/0 via-blue-50/40 to-blue-50/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Icon Container matching Screenshot */}
              <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                {renderCustomSvgIcon(card.svgType)}
              </div>

              {/* Card Title */}
              <div className="relative z-10 w-full">
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#004b87] leading-tight line-clamp-2 transition-colors">
                  {card.title}
                </h3>
                <p className="text-[10px] text-gray-500 line-clamp-1 mt-1 font-medium">
                  {card.subtitle}
                </p>
              </div>

              {/* Hover Indicator Chevron */}
              <div className="relative z-10 mt-2.5 pt-2 border-t border-gray-100 w-full flex items-center justify-center text-[10px] font-bold text-[#004b87] opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0">
                <span>View Products</span>
                <ChevronRight className="w-3 h-3 ml-0.5" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
