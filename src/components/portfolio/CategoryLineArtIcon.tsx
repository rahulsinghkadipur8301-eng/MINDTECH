import React from 'react';
import { 
  Atom, 
  Layers, 
  Wind, 
  Waves, 
  Droplet, 
  Droplets, 
  Sparkles, 
  Sparkle, 
  ShieldCheck, 
  Boxes, 
  Feather, 
  FlaskConical, 
  Leaf, 
  Palette, 
  Sun,
  Eye,
  Clock,
  Scale,
  Sparkle as SparkleIcon,
  HelpCircle
} from 'lucide-react';

interface CategoryLineArtIconProps {
  icon: string;
  label: string;
  isSelected: boolean;
  className?: string;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Atom,
  Layers,
  Wind,
  Waves,
  Droplet,
  Droplets,
  Sparkles,
  Sparkle,
  ShieldCheck,
  Boxes,
  Feather,
  FlaskConical,
  Leaf,
  Palette,
  Sun,
  Eye,
  Clock,
  Scale
};

export const CategoryLineArtIcon: React.FC<CategoryLineArtIconProps> = ({
  icon,
  label,
  isSelected,
  className = ''
}) => {
  // 1. If it's a file path image (like cropped Greentech icons /categories/anti-ageing.png)
  if (icon.startsWith('/') || icon.endsWith('.png') || icon.endsWith('.svg')) {
    return (
      <img 
        src={icon} 
        alt={label} 
        className={`w-full h-full object-contain pointer-events-none transition-transform duration-300 ${className}`} 
      />
    );
  }

  // 2. Otherwise render high-elegance line-art SVG with circular boundary matching screenshot
  const IconComponent = ICON_MAP[icon] || HelpCircle;

  return (
    <div className={`w-full h-full relative flex items-center justify-center ${className}`}>
      {/* Outer subtle circular boundary line */}
      <svg
        viewBox="0 0 80 80"
        className="absolute inset-0 w-full h-full pointer-events-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="40"
          cy="40"
          r="36"
          stroke={isSelected ? '#70a83b' : '#9ca3af'}
          strokeWidth="1.25"
          strokeDasharray="none"
          className="transition-colors duration-300"
        />
        {/* Subtle accent arc matching the Greentech line-art style */}
        <circle
          cx="40"
          cy="40"
          r="33"
          stroke={isSelected ? '#70a83b' : '#e5e7eb'}
          strokeWidth="0.75"
          strokeDasharray="2 6"
          className="transition-colors duration-300"
        />
      </svg>

      {/* Centered clean line-art icon glyph */}
      <div className={`relative z-10 transition-colors duration-300 ${isSelected ? 'text-[#70a83b]' : 'text-gray-700'}`}>
        <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.4]" />
      </div>
    </div>
  );
};
