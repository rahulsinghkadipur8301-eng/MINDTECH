import React, { useId } from 'react';

interface LogoProps {
  className?: string;
  variant?: 'horizontal' | 'stacked' | 'monogram' | 'full';
  theme?: 'light' | 'dark';
  height?: number | string;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'horizontal',
  theme = 'light',
  height
}) => {
  const uniqueId = useId().replace(/:/g, '_');
  const isDark = theme === 'dark';

  const gradPrimary = `mt_grad_pri_${uniqueId}`;
  const gradLeaf = `mt_grad_leaf_${uniqueId}`;
  const gradTech = `mt_grad_tech_${uniqueId}`;

  // Helper to format height for CSS / SVG style if explicitly provided
  const heightStyle = height ? (typeof height === 'number' ? `${height}px` : height) : undefined;

  if (variant === 'monogram') {
    return (
      <div 
        className={`inline-flex items-center justify-center shrink-0 ${className}`} 
        style={heightStyle ? { height: heightStyle } : undefined}
      >
        <svg
          viewBox="0 0 160 140"
          style={{ height: '100%', width: 'auto', aspectRatio: '160/140' }}
          className="block select-none max-h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={gradPrimary} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#072414" />
              <stop offset="50%" stopColor="#106b32" />
              <stop offset="100%" stopColor="#2ba03f" />
            </linearGradient>
            <linearGradient id={gradLeaf} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#107c41" />
              <stop offset="100%" stopColor="#48c056" />
            </linearGradient>
          </defs>

          {/* Crest Arc with Molecule Nodes */}
          <path
            d="M 50 15 C 85 -5, 125 15, 140 55 C 150 82, 135 110, 110 125"
            stroke={`url(#${gradPrimary})`}
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Molecule Nodes */}
          <circle cx="120" cy="40" r="5" fill="#1b8a3e" />
          <circle cx="140" cy="55" r="6" fill="#107c41" />
          <circle cx="125" cy="78" r="5" fill="#2ba03f" />
          <circle cx="138" cy="98" r="6" fill="#0c4f26" />
          <line x1="120" y1="40" x2="140" y2="55" stroke="#1b8a3e" strokeWidth="2.5" />
          <line x1="140" y1="55" x2="125" y2="78" stroke="#107c41" strokeWidth="2.5" />
          <line x1="125" y1="78" x2="138" y2="98" stroke="#2ba03f" strokeWidth="2.5" />

          {/* MT Monogram Letters */}
          <path
            d="M 14 110 L 14 25 L 37 70 L 60 25 L 60 110"
            stroke={`url(#${gradPrimary})`}
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M 50 25 L 105 25 M 78 25 L 78 110"
            stroke={`url(#${gradPrimary})`}
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Botanical Leaf */}
          <path
            d="M 50 112 C 50 112, 72 115, 94 88 C 98 82, 96 72, 87 70 C 74 68, 57 90, 50 112 Z"
            fill={`url(#${gradLeaf})`}
          />
          <path
            d="M 50 112 Q 74 90 87 70"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
          />
          <path
            d="M 32 115 Q 57 125 80 112"
            stroke={`url(#${gradLeaf})`}
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
    );
  }

  // Horizontal high-impact navbar & header logo (Crest on left, Mindtech typography on right)
  if (variant === 'horizontal') {
    return (
      <div 
        className={`inline-flex items-center shrink-0 select-none ${className}`} 
        style={heightStyle ? { height: heightStyle } : undefined}
      >
        <svg
          viewBox="0 0 470 94"
          style={{ height: '100%', width: 'auto', aspectRatio: '470/94' }}
          className="block select-none max-h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={gradPrimary} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#072414" />
              <stop offset="50%" stopColor="#106b32" />
              <stop offset="100%" stopColor="#2ba03f" />
            </linearGradient>
            <linearGradient id={gradLeaf} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#107c41" />
              <stop offset="100%" stopColor="#48c056" />
            </linearGradient>
            <linearGradient id={gradTech} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#107c41" />
              <stop offset="100%" stopColor="#3db34a" />
            </linearGradient>
          </defs>

          {/* Left Crest */}
          <g transform="translate(6, 4) scale(0.86)">
            <path
              d="M 42 12 C 70 -4, 102 12, 114 42 C 122 62, 110 84, 90 95"
              stroke={`url(#${gradPrimary})`}
              strokeWidth="3.8"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="98" cy="26" r="4.5" fill="#1b8a3e" />
            <circle cx="114" cy="42" r="5" fill="#107c41" />
            <circle cx="102" cy="62" r="4.5" fill="#2ba03f" />
            <circle cx="112" cy="78" r="5" fill="#0c4f26" />
            <line x1="98" y1="26" x2="114" y2="42" stroke="#1b8a3e" strokeWidth="2.4" />
            <line x1="114" y1="42" x2="102" y2="62" stroke="#107c41" strokeWidth="2.4" />
            <line x1="102" y1="62" x2="112" y2="78" stroke="#2ba03f" strokeWidth="2.4" />

            <path
              d="M 12 85 L 12 20 L 28 54 L 44 20 L 44 85"
              stroke={`url(#${gradPrimary})`}
              strokeWidth="8.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M 38 20 L 80 20 M 59 20 L 59 85"
              stroke={`url(#${gradPrimary})`}
              strokeWidth="8.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />

            <path
              d="M 38 86 C 38 86, 56 88, 74 67 C 78 62, 76 54, 69 52 C 58 50, 44 68, 38 86 Z"
              fill={`url(#${gradLeaf})`}
            />
            <path
              d="M 38 86 Q 57 70 69 52"
              stroke="#ffffff"
              strokeWidth="1.3"
              strokeLinecap="round"
              fill="none"
              opacity="0.85"
            />
            <path
              d="M 24 88 Q 44 96 62 86"
              stroke={`url(#${gradLeaf})`}
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* Right Typography Block */}
          {/* Subtitle: BIOTECHNOLOGY */}
          <text
            x="122"
            y="23"
            fill={isDark ? '#a7d7bc' : '#143323'}
            fontSize="15"
            fontWeight="800"
            letterSpacing="0.32em"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            BIOTECHNOLOGY
          </text>

          {/* Main Title: MINDTECH */}
          <text
            x="122"
            y="60"
            fill={isDark ? '#ffffff' : '#072414'}
            fontSize="41"
            fontWeight="900"
            letterSpacing="0.02em"
            fontFamily="'Outfit', 'Plus Jakarta Sans', sans-serif"
          >
            MIND
          </text>
          <text
            x="256"
            y="60"
            fill={`url(#${gradTech})`}
            fontSize="41"
            fontWeight="900"
            letterSpacing="0.02em"
            fontFamily="'Outfit', 'Plus Jakarta Sans', sans-serif"
          >
            TECH
          </text>

          {/* Tagline: NATURE BEYOND THE FUTURE */}
          <line
            x1="122"
            y1="79"
            x2="152"
            y2="79"
            stroke={isDark ? '#3d634c' : '#88a894'}
            strokeWidth="1.6"
          />
          <text
            x="160"
            y="82"
            fill={isDark ? '#c8ded1' : '#193a28'}
            fontSize="12"
            fontWeight="700"
            letterSpacing="0.22em"
            fontFamily="'Outfit', 'Plus Jakarta Sans', sans-serif"
          >
            NATURE BEYOND THE FUTURE
          </text>
          <line
            x1="406"
            y1="79"
            x2="442"
            y2="79"
            stroke={isDark ? '#3d634c' : '#88a894'}
            strokeWidth="1.6"
          />
        </svg>
      </div>
    );
  }

  // Stacked centered variant for Hero, Catalog cover, Footer
  return (
    <div 
      className={`inline-flex items-center shrink-0 select-none ${className}`} 
      style={heightStyle ? { height: heightStyle } : undefined}
    >
      <svg
        viewBox="0 0 540 180"
        style={{ height: '100%', width: 'auto', aspectRatio: '540/180' }}
        className="block select-none max-h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={gradPrimary} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#072414" />
            <stop offset="50%" stopColor="#106b32" />
            <stop offset="100%" stopColor="#2ba03f" />
          </linearGradient>
          <linearGradient id={gradLeaf} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#107c41" />
            <stop offset="100%" stopColor="#48c056" />
          </linearGradient>
          <linearGradient id={gradTech} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#107c41" />
            <stop offset="100%" stopColor="#3db34a" />
          </linearGradient>
        </defs>

        {/* LOGO ICON MARK */}
        <g transform="translate(205, 5)">
          <path
            d="M 25 10 C 55 -6, 92 8, 105 40 C 114 62, 100 86, 80 98"
            stroke={`url(#${gradPrimary})`}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          <circle cx="88" cy="28" r="4.5" fill="#1b8a3e" />
          <circle cx="104" cy="42" r="5" fill="#107c41" />
          <circle cx="92" cy="62" r="4.5" fill="#2ba03f" />
          <circle cx="102" cy="78" r="5" fill="#0c4f26" />
          <line x1="88" y1="28" x2="104" y2="42" stroke="#1b8a3e" strokeWidth="2.2" />
          <line x1="104" y1="42" x2="92" y2="62" stroke="#107c41" strokeWidth="2.2" />
          <line x1="92" y1="62" x2="102" y2="78" stroke="#2ba03f" strokeWidth="2.2" />

          {/* 'M' and 'T' Monogram */}
          <path
            d="M -4 82 L -4 18 L 14 54 L 32 18 L 32 82"
            stroke={`url(#${gradPrimary})`}
            strokeWidth="8.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M 24 18 L 70 18 M 47 18 L 47 82"
            stroke={`url(#${gradPrimary})`}
            strokeWidth="8.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          <path
            d="M 26 84 C 26 84, 44 86, 62 65 C 66 60, 64 52, 57 50 C 46 48, 32 66, 26 84 Z"
            fill={`url(#${gradLeaf})`}
          />
          <path
            d="M 26 84 Q 45 68 57 50"
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
          />
          <path
            d="M 12 87 Q 32 95 50 85"
            stroke={`url(#${gradLeaf})`}
            strokeWidth="2.8"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* SUBTITLE: BIOTECHNOLOGY */}
        <text
          x="270"
          y="108"
          textAnchor="middle"
          fill={isDark ? '#d4ece0' : '#143323'}
          fontSize="16.5"
          fontWeight="700"
          letterSpacing="0.42em"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          BIOTECHNOLOGY
        </text>

        {/* MAIN TITLE: MINDTECH */}
        <g transform="translate(270, 142)">
          <text
            x="-4"
            y="0"
            textAnchor="end"
            fill={isDark ? '#ffffff' : '#072414'}
            fontSize="37"
            fontWeight="900"
            letterSpacing="0.04em"
            fontFamily="'Outfit', 'Plus Jakarta Sans', sans-serif"
          >
            MIND
          </text>
          <text
            x="4"
            y="0"
            textAnchor="start"
            fill={`url(#${gradTech})`}
            fontSize="37"
            fontWeight="900"
            letterSpacing="0.04em"
            fontFamily="'Outfit', 'Plus Jakarta Sans', sans-serif"
          >
            TECH
          </text>
        </g>

        {/* BOTTOM TAGLINE WITH ACCENT LINES */}
        <g transform="translate(270, 166)">
          <line
            x1="-240"
            y1="-4"
            x2="-165"
            y2="-4"
            stroke={isDark ? '#436d52' : '#88a894'}
            strokeWidth="1.5"
          />
          <text
            x="0"
            y="0"
            textAnchor="middle"
            fill={isDark ? '#c8ded1' : '#142a1e'}
            fontSize="14"
            fontWeight="600"
            letterSpacing="0.25em"
            fontFamily="'Outfit', 'Plus Jakarta Sans', sans-serif"
          >
            NATURE BEYOND THE FUTURE
          </text>
          <line
            x1="165"
            y1="-4"
            x2="240"
            y2="-4"
            stroke={isDark ? '#436d52' : '#88a894'}
            strokeWidth="1.5"
          />
        </g>
      </svg>
    </div>
  );
};
