import React from 'react';

interface PartnerLogoProps {
  className?: string;
  height?: number | string;
}

// 1. FINE ORGANICS LOGO - Using User-Uploaded Official PNG Image
export const FineOrganicsLogo: React.FC<PartnerLogoProps> = ({ className = '', height = 48 }) => {
  const [imageError, setImageError] = React.useState(false);

  if (imageError) {
    return (
      <svg 
        viewBox="0 0 290 75" 
        style={{ height, width: 'auto' }}
        className={`inline-block select-none ${className}`}
        aria-label="Fine Organics Logo"
      >
        <defs>
          <linearGradient id="fo-leaf-grad1" x1="0%" y1="100%" x2="80%" y2="0%">
            <stop offset="0%" stopColor="#005A2B" />
            <stop offset="60%" stopColor="#0A8748" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
          <linearGradient id="fo-leaf-grad2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0A783E" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
          <linearGradient id="fo-sub-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>
        <g transform="translate(6, 6)">
          <path 
            d="M 12 58 C 16 38, 28 18, 54 8 C 50 24, 40 40, 24 52 C 19 55, 15 57, 12 58 Z" 
            fill="url(#fo-leaf-grad1)" 
          />
          <path 
            d="M 22 54 C 29 42, 41 33, 56 26 C 46 39, 36 49, 22 54 Z" 
            fill="url(#fo-leaf-grad2)" 
          />
          <circle cx="53" cy="8" r="3" fill="#10B981" />
          <path 
            d="M 8 62 C 14 62, 18 59, 22 55" 
            stroke="#005A2B" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            fill="none" 
          />
        </g>
        <text 
          x="74" 
          y="42" 
          fontFamily="system-ui, -apple-system, 'Inter', 'Segoe UI', Roboto, sans-serif" 
          fontSize="25" 
          fontWeight="900" 
          letterSpacing="1.2" 
          fill="#044E28"
        >
          FINE ORGANICS
        </text>
        <text 
          x="75" 
          y="58" 
          fontFamily="system-ui, -apple-system, 'Inter', 'Segoe UI', Roboto, sans-serif" 
          fontSize="8.5" 
          fontWeight="800" 
          letterSpacing="2.4" 
          fill="#059669"
        >
          FINE ORGANIC INDUSTRIES LTD.
        </text>
        <line 
          x1="75" 
          y1="64" 
          x2="280" 
          y2="64" 
          stroke="url(#fo-sub-grad)" 
          strokeWidth="1.2" 
          strokeOpacity="0.4"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <img
      src="/logos/fine-organics.png"
      alt="Fine Organics"
      style={{ height, width: 'auto' }}
      className={`inline-block object-contain mix-blend-multiply select-none transition-transform duration-300 ${className}`}
      loading="eager"
      onError={(e) => {
        const target = e.currentTarget as HTMLImageElement;
        if (!target.src.endsWith('/FINE%20ORGANICS.png') && !target.src.endsWith('/FINE ORGANICS.png')) {
          target.src = '/FINE ORGANICS.png';
        } else {
          setImageError(true);
        }
      }}
    />
  );
};

// 2. VVF LIMITED LOGO
export const VvfLimitedLogo: React.FC<PartnerLogoProps> = ({ className = '', height = 48 }) => {
  return (
    <img
      src="/logo.gif"
      alt="VVF Limited - A Partner of Choice"
      style={{ height, width: 'auto' }}
      className={`inline-block object-contain mix-blend-multiply select-none transition-transform duration-300 ${className}`}
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

// 3. SNS SILCOS LOGO - Using User-Uploaded Official PNG Image
export const SnsSilcosLogo: React.FC<PartnerLogoProps> = ({ className = '', height = 48 }) => {
  const [imageError, setImageError] = React.useState(false);

  if (imageError) {
    return (
      <svg 
        viewBox="0 0 290 75" 
        style={{ height, width: 'auto' }}
        className={`inline-block select-none ${className}`}
        aria-label="SNS Silcos Logo"
      >
        <defs>
          <linearGradient id="sns-fluid-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="40%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>
          <linearGradient id="sns-orbit-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <linearGradient id="sns-sub-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
        </defs>
        <g transform="translate(6, 6)">
          <path 
            d="M 14 36 C 14 20, 26 10, 42 10 C 52 10, 59 15, 62 23 C 58 20, 52 17, 42 17 C 30 17, 21 25, 21 36 C 21 47, 30 55, 42 55 C 50 55, 56 52, 60 47 C 57 55, 49 62, 40 62 C 24 62, 14 52, 14 36 Z" 
            fill="url(#sns-orbit-grad)" 
          />
          <path 
            d="M 42 16 C 42 16, 56 34, 56 42 C 56 50, 50 56, 42 56 C 34 56, 28 50, 28 42 C 28 34, 42 16, 42 16 Z" 
            fill="url(#sns-fluid-grad)" 
          />
          <ellipse cx="37" cy="38" rx="3.5" ry="6" fill="#ffffff" opacity="0.65" transform="rotate(-25 37 38)" />
          <circle cx="62" cy="22" r="3" fill="#38BDF8" />
          <circle cx="60" cy="48" r="2.5" fill="#0284C7" />
        </g>
        <text 
          x="74" 
          y="42" 
          fontFamily="system-ui, -apple-system, 'Inter', 'Segoe UI', Roboto, sans-serif" 
          fontSize="25" 
          fontWeight="900" 
          letterSpacing="2.2" 
          fill="#0B2545"
        >
          SNS <tspan fill="#0284C7">SILCOS</tspan>
        </text>
        <text 
          x="75" 
          y="58" 
          fontFamily="system-ui, -apple-system, 'Inter', 'Segoe UI', Roboto, sans-serif" 
          fontSize="8" 
          fontWeight="800" 
          letterSpacing="2.2" 
          fill="#0284C7"
        >
          SPECIALTY SILICONES &amp; SENSORY FLUIDS
        </text>
        <line 
          x1="75" 
          y1="64" 
          x2="280" 
          y2="64" 
          stroke="url(#sns-sub-grad)" 
          strokeWidth="1.2" 
          strokeOpacity="0.4"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <img
      src="/logos/sns-silcos.png"
      alt="SNS Silcos"
      style={{ height, width: 'auto' }}
      className={`inline-block object-contain mix-blend-multiply select-none transition-transform duration-300 ${className}`}
      loading="eager"
      onError={(e) => {
        const target = e.currentTarget as HTMLImageElement;
        if (!target.src.endsWith('/SNS.png')) {
          target.src = '/SNS.png';
        } else {
          setImageError(true);
        }
      }}
    />
  );
};

// 4. GREENTECH BIOTECHNOLOGIES LOGO
export const GreentechLogo: React.FC<PartnerLogoProps> = ({ className = '', height = 48 }) => {
  return (
    <img
      src="/logo-greentech1.png"
      alt="Greentech Biotechnologies"
      style={{ height, width: 'auto' }}
      className={`inline-block object-contain mix-blend-multiply select-none transition-transform duration-300 ${className}`}
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
