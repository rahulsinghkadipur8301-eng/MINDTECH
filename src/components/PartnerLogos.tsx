import React from 'react';

interface PartnerLogoProps {
  className?: string;
  height?: number | string;
}

// 1. FINE ORGANICS LOGO
export const FineOrganicsLogo: React.FC<PartnerLogoProps> = ({ className = '', height = 48 }) => {
  return (
    <svg 
      viewBox="0 0 240 110" 
      style={{ height, width: 'auto' }}
      className={`inline-block select-none ${className}`}
      aria-label="Fine Organics Logo"
    >
      <defs>
        <linearGradient id="fo-leaf-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#43A047" />
          <stop offset="50%" stopColor="#4CAF50" />
          <stop offset="100%" stopColor="#7CB342" />
        </linearGradient>
      </defs>

      {/* Stylized Upper Leaf */}
      <path 
        d="M 18 72 C 32 44, 52 20, 84 8 C 80 24, 70 42, 48 56 C 36 64, 26 69, 18 72 Z" 
        fill="url(#fo-leaf-grad)" 
      />
      
      {/* Lower Leaf Wing */}
      <path 
        d="M 28 62 C 40 50, 56 46, 68 44 C 58 58, 44 68, 28 72 Z" 
        fill="#388E3C" 
      />
      
      {/* Leaf Vein Accents */}
      <path 
        d="M 22 68 Q 50 36 80 12" 
        stroke="#ffffff" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        fill="none" 
        opacity="0.6" 
      />

      {/* Brand Text: FINE ORGANICS */}
      <text 
        x="28" 
        y="96" 
        fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" 
        fontSize="29" 
        fontWeight="800" 
        letterSpacing="0.5" 
        fill="#1E40AF"
      >
        FINE ORGANICS
      </text>
    </svg>
  );
};

// 2. VVF LIMITED LOGO
export const VvfLimitedLogo: React.FC<PartnerLogoProps> = ({ className = '', height = 48 }) => {
  return (
    <img
      src="/logo.gif"
      alt="VVF Limited - A Partner of Choice"
      style={{ height, width: 'auto' }}
      className={`inline-block object-contain select-none transition-transform duration-300 ${className}`}
      loading="eager"
      onError={(e) => {
        // Fallback to svg in public/logos if needed
        const target = e.currentTarget as HTMLImageElement;
        if (!target.src.endsWith('/logos/vvf-limited.svg')) {
          target.src = '/logos/vvf-limited.svg';
        }
      }}
    />
  );
};

// 3. SNS SILCOS LOGO
export const SnsSilcosLogo: React.FC<PartnerLogoProps> = ({ className = '', height = 48 }) => {
  return (
    <svg 
      viewBox="0 0 240 115" 
      style={{ height, width: 'auto' }}
      className={`inline-block select-none ${className}`}
      aria-label="SNS Silcos Logo"
    >
      <defs>
        <linearGradient id="sns-blue-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0288D1" />
          <stop offset="100%" stopColor="#0D47A1" />
        </linearGradient>
        <linearGradient id="sns-green-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#689F38" />
          <stop offset="100%" stopColor="#8BC34A" />
        </linearGradient>
      </defs>

      {/* Multi-Petal Lotus / Flower Emblem */}
      {/* Left green petals */}
      <path d="M 85 48 C 65 38, 70 24, 95 22 C 105 32, 100 45, 85 48 Z" fill="url(#sns-green-grad)" />
      <path d="M 70 42 C 55 35, 62 26, 82 28 C 88 35, 82 42, 70 42 Z" fill="#9CCC65" />
      
      {/* Center & Right blue petals */}
      <path d="M 115 48 C 105 25, 120 10, 128 8 C 135 15, 132 35, 115 48 Z" fill="#0D47A1" />
      <path d="M 125 48 C 125 28, 142 16, 155 18 C 158 28, 148 42, 125 48 Z" fill="#0288D1" />
      <path d="M 138 50 C 145 35, 162 28, 172 32 C 172 42, 158 50, 138 50 Z" fill="#03A9F4" />
      <path d="M 148 52 C 158 44, 172 40, 180 44 C 178 50, 168 54, 148 52 Z" fill="#4FC3F7" />

      {/* Bottom Wave Lines */}
      <path 
        d="M 60 50 C 95 62, 145 38, 180 50 C 150 56, 105 48, 60 50 Z" 
        fill="#0288D1" 
      />
      <path 
        d="M 75 58 C 105 66, 145 52, 172 58 C 145 64, 110 56, 75 58 Z" 
        fill="#8BC34A" 
      />

      {/* Brand Text: SNS SILCOS */}
      <text 
        x="120" 
        y="98" 
        textAnchor="middle" 
        fontFamily="'Times New Roman', Times, 'Cinzel', serif" 
        fontSize="28" 
        fontWeight="800" 
        letterSpacing="2.5" 
        fill="#0D47A1"
      >
        SNS SILCOS
      </text>
    </svg>
  );
};

// 4. GREENTECH BIOTECHNOLOGIES LOGO
export const GreentechLogo: React.FC<PartnerLogoProps> = ({ className = '', height = 48 }) => {
  return (
    <img
      src="/logo-greentech1.png"
      alt="Greentech Biotechnologies"
      style={{ height, width: 'auto' }}
      className={`inline-block object-contain select-none transition-transform duration-300 ${className}`}
      loading="eager"
      onError={(e) => {
        // Fallback to svg in public/logos if needed
        const target = e.currentTarget as HTMLImageElement;
        if (!target.src.endsWith('/logos/greentech.svg')) {
          target.src = '/logos/greentech.svg';
        }
      }}
    />
  );
};

// Unified Helper to render partner logo by ID
export const PartnerLogoRenderer: React.FC<{ partnerId: string; height?: number | string; className?: string }> = ({
  partnerId,
  height = 42,
  className = ''
}) => {
  const hoverClass = 'transition-all duration-300 ease-out transform hover:scale-105 active:scale-[0.98]';
  const mergedClass = `${hoverClass} ${className}`.trim();
  switch (partnerId) {
    case 'fine-organics':
      return <FineOrganicsLogo height={height} className={mergedClass} />;
    case 'vvf-limited':
      return <VvfLimitedLogo height={height} className={mergedClass} />;
    case 'sns-silcos':
      return <SnsSilcosLogo height={height} className={mergedClass} />;
    case 'greentech':
      return <GreentechLogo height={height} className={mergedClass} />;
    default:
      return null;
  }
};
