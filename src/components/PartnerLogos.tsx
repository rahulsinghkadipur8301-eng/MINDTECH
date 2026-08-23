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
    <svg 
      viewBox="0 0 220 120" 
      style={{ height, width: 'auto' }}
      className={`inline-block select-none ${className}`}
      aria-label="VVF Limited Logo"
    >
      <defs>
        <linearGradient id="vvf-teal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00A8B5" />
          <stop offset="50%" stopColor="#0097A7" />
          <stop offset="100%" stopColor="#00838F" />
        </linearGradient>
      </defs>

      {/* Outer Cyan/Teal Oval Badge */}
      <ellipse cx="110" cy="44" rx="88" ry="38" fill="url(#vvf-teal-grad)" />
      
      {/* Oval Ring Stroke */}
      <ellipse cx="110" cy="44" rx="83" ry="34" fill="none" stroke="#ffffff" strokeWidth="2.5" />
      <ellipse cx="110" cy="44" rx="86" ry="36.5" fill="none" stroke="#0097A7" strokeWidth="1.5" />

      {/* Upper Organic Wave */}
      <path 
        d="M 46 34 C 65 24, 85 40, 110 32 C 135 24, 155 36, 174 30 C 158 38, 138 28, 110 36 C 82 44, 62 30, 46 34 Z" 
        fill="#ffffff" 
        opacity="0.95" 
      />

      {/* Center 'vvf' Typography */}
      <g fill="#ffffff" fontWeight="900" fontStyle="italic" fontFamily="system-ui, -apple-system, sans-serif">
        {/* 'v' letter 1 */}
        <path d="M 52 26 L 68 56 L 82 56 L 94 26 L 82 26 L 75 46 L 64 26 Z" />
        {/* 'v' letter 2 */}
        <path d="M 88 26 L 104 56 L 118 56 L 130 26 L 118 26 L 111 46 L 100 26 Z" />
        {/* 'f' letter */}
        <path d="M 124 26 L 124 56 L 136 56 L 136 43 L 148 43 L 148 35 L 136 35 L 136 32 C 136 29, 138 27, 143 27 L 149 27 L 149 20 C 145 19, 139 19, 133 21 C 127 23, 124 26, 124 26 Z" />
      </g>

      {/* Lower Organic Wave */}
      <path 
        d="M 46 54 C 65 62, 85 46, 110 54 C 135 62, 155 50, 174 56 C 158 48, 138 58, 110 50 C 82 42, 62 56, 46 54 Z" 
        fill="#ffffff" 
        opacity="0.95" 
      />

      {/* Bottom Sub-text: VVF Limited */}
      <text 
        x="110" 
        y="108" 
        textAnchor="middle" 
        fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" 
        fontSize="23" 
        fontWeight="800" 
        fill="#111827"
        letterSpacing="0.3"
      >
        VVF Limited
      </text>
    </svg>
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
    <svg 
      viewBox="0 0 250 115" 
      style={{ height, width: 'auto' }}
      className={`inline-block select-none ${className}`}
      aria-label="Greentech Biotechnologies Logo"
    >
      {/* Left Circular Gray Background */}
      <circle cx="48" cy="40" r="32" fill="#E5E7EB" />

      {/* Overlapping Geometric Diamond / Leaf Pyramid */}
      {/* Top green pyramid segment */}
      <polygon points="90,8 60,42 120,42" fill="#7CB342" />
      
      {/* White chevron vein lines inside green segment */}
      <line x1="90" y1="8" x2="90" y2="42" stroke="#ffffff" strokeWidth="1.8" />
      <line x1="90" y1="18" x2="72" y2="34" stroke="#ffffff" strokeWidth="1.5" />
      <line x1="90" y1="18" x2="108" y2="34" stroke="#ffffff" strokeWidth="1.5" />
      <line x1="90" y1="28" x2="66" y2="40" stroke="#ffffff" strokeWidth="1.5" />
      <line x1="90" y1="28" x2="114" y2="40" stroke="#ffffff" strokeWidth="1.5" />

      {/* Bottom Left Light Gray Triangle */}
      <polygon points="60,42 90,42 90,74" fill="#D1D5DB" />
      
      {/* Bottom Right Dark Slate / Black Triangle */}
      <polygon points="90,42 120,42 90,74" fill="#27272A" />

      {/* Right Side Header: BIOTECHNOLOGIES */}
      <text 
        x="108" 
        y="58" 
        fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" 
        fontSize="16" 
        fontWeight="400" 
        letterSpacing="0.8" 
        fill="#374151"
      >
        BIOTECHNOLOGIES
      </text>

      {/* Main Bold Text: GREENTECH */}
      <text 
        x="18" 
        y="98" 
        fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" 
        fontSize="34" 
        fontWeight="900" 
        letterSpacing="-0.5"
      >
        <tspan fill="#7CB342">GREEN</tspan>
        <tspan fill="#1F2937">TECH</tspan>
      </text>
    </svg>
  );
};

// Unified Helper to render partner logo by ID
export const PartnerLogoRenderer: React.FC<{ partnerId: string; height?: number | string; className?: string }> = ({
  partnerId,
  height = 42,
  className = ''
}) => {
  switch (partnerId) {
    case 'fine-organics':
      return <FineOrganicsLogo height={height} className={className} />;
    case 'vvf-limited':
      return <VvfLimitedLogo height={height} className={className} />;
    case 'sns-silcos':
      return <SnsSilcosLogo height={height} className={className} />;
    case 'greentech':
      return <GreentechLogo height={height} className={className} />;
    default:
      return null;
  }
};
