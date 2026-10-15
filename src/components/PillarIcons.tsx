import React from 'react';

interface PillarIconProps {
  className?: string;
  size?: number;
}

/**
 * Pillar 01: Global Direct Sourcing Vector Icon
 * Depicts a high-tech planetary globe with coordinate longitude/latitude arcs,
 * international trading routes, continental nodes, and direct manufacturer link.
 */
export const GlobalSourcingVectorIcon: React.FC<PillarIconProps> = ({ className = '', size = 52 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
      aria-label="Global Direct Sourcing Vector Icon"
    >
      <defs>
        <linearGradient id="gs-grad-base" x1="4" y1="4" x2="60" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="50%" stopColor="#0d9488" />
          <stop offset="100%" stopColor="#0f766e" />
        </linearGradient>
        <linearGradient id="gs-grad-ring" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <filter id="gs-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#059669" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Outer Orbital Glow Ring */}
      <circle cx="32" cy="32" r="28" fill="url(#gs-grad-base)" fillOpacity="0.1" />
      <circle cx="32" cy="32" r="28" stroke="url(#gs-grad-ring)" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />

      {/* Planetary Sphere Body */}
      <circle cx="32" cy="32" r="21" fill="url(#gs-grad-base)" filter="url(#gs-glow)" />

      {/* Grid Latitude / Longitude Lines */}
      {/* Horizontal Equator */}
      <ellipse cx="32" cy="32" rx="21" ry="7" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.5" fill="none" />
      {/* Vertical Meridian */}
      <ellipse cx="32" cy="32" rx="8" ry="21" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.5" fill="none" />
      {/* Central Axis */}
      <line x1="32" y1="11" x2="32" y2="53" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.7" />

      {/* Continental Stylized Shapes */}
      <path 
        d="M 23 23 Q 26 20 30 22 Q 33 25 35 23 Q 37 20 40 22 Q 42 27 38 29 Q 34 30 30 28 Z" 
        fill="#a7f3d0" 
        fillOpacity="0.85" 
      />
      <path 
        d="M 26 35 Q 30 33 34 36 Q 37 41 33 44 Q 28 45 27 39 Z" 
        fill="#a7f3d0" 
        fillOpacity="0.85" 
      />

      {/* International Transit Orbital Wave */}
      <path 
        d="M 10 40 C 14 20, 50 14, 54 34" 
        stroke="#fef08a" 
        strokeWidth="2.2" 
        strokeLinecap="round" 
        fill="none" 
      />
      <polygon points="56,36 50,33 52,40" fill="#fef08a" />

      {/* Sourcing Origin Pin Node */}
      <circle cx="21" cy="23" r="3.2" fill="#ffffff" stroke="#047857" strokeWidth="1.5" />
      <circle cx="43" cy="34" r="3.2" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
    </svg>
  );
};

/**
 * Pillar 02: Rigorous Analytical Quality Vector Icon
 * Depicts a scientific laboratory microscope, analytical spectrometry crystal,
 * quality shield, and certified checkmark seal.
 */
export const QualityAssuranceVectorIcon: React.FC<PillarIconProps> = ({ className = '', size = 52 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
      aria-label="Rigorous Analytical Quality Vector Icon"
    >
      <defs>
        <linearGradient id="qa-grad-base" x1="4" y1="4" x2="60" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#047857" />
          <stop offset="100%" stopColor="#065f46" />
        </linearGradient>
        <linearGradient id="qa-grad-accent" x1="12" y1="12" x2="52" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#14b8a6" />
        </linearGradient>
        <linearGradient id="qa-gold" x1="36" y1="36" x2="58" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>

      {/* Background Rounded Octagonal Plaque */}
      <rect x="6" y="6" width="52" height="52" rx="16" fill="url(#qa-grad-base)" />
      <rect x="7.5" y="7.5" width="49" height="49" rx="14.5" stroke="#34d399" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />

      {/* Microscope Optical Head */}
      <path 
        d="M 22 14 L 32 24 L 28 28 L 18 18 Z" 
        fill="#ffffff" 
        stroke="#a7f3d0" 
        strokeWidth="1.2" 
      />
      {/* Eyepiece Tube */}
      <line x1="20" y1="12" x2="16" y2="8" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
      {/* Objective Lens */}
      <path d="M 31 23 L 36 28 L 33 31 L 28 26 Z" fill="#6ee7b7" />
      <line x1="34" y1="29" x2="36" y2="33" stroke="#a7f3d0" strokeWidth="2.5" strokeLinecap="round" />

      {/* Microscope Arm Arch */}
      <path 
        d="M 23 25 C 13 32, 13 46, 24 50 L 38 50" 
        stroke="#ffffff" 
        strokeWidth="3.5" 
        strokeLinecap="round" 
        fill="none" 
      />

      {/* Specimen Stage Plate */}
      <rect x="26" y="36" width="16" height="3" rx="1.5" fill="#fef08a" />
      {/* Light Source / Reflector */}
      <circle cx="28" cy="45" r="3" fill="#6ee7b7" />

      {/* Quality Certified Verified Shield in Bottom Right */}
      <path 
        d="M 46 32 L 56 36 L 56 46 C 56 52, 46 56, 46 56 C 46 56, 36 52, 36 46 L 36 36 Z" 
        fill="url(#qa-gold)" 
        stroke="#ffffff" 
        strokeWidth="1.5" 
      />
      {/* Checkmark inside Shield */}
      <path 
        d="M 41 44 L 44 47 L 51 39" 
        stroke="#072414" 
        strokeWidth="2.2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
};

/**
 * Pillar 03: Central Logistics & Stock Hub (Bawana Warehouse) Vector Icon
 * Depicts a climate-controlled high-bay warehouse depot with inventory pallets,
 * climate snowflake/cool seal, and 24-48 hr fast dispatch signal.
 */
export const BawanaLogisticsVectorIcon: React.FC<PillarIconProps> = ({ className = '', size = 52 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
      aria-label="Central Logistics & Stock Hub Vector Icon"
    >
      <defs>
        <linearGradient id="bl-grad-base" x1="4" y1="4" x2="60" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0f766e" />
          <stop offset="100%" stopColor="#115e59" />
        </linearGradient>
        <linearGradient id="bl-roof" x1="10" y1="12" x2="54" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2dd4bf" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
      </defs>

      {/* Outer Rounded Container */}
      <rect x="6" y="6" width="52" height="52" rx="16" fill="url(#bl-grad-base)" />
      <rect x="7.5" y="7.5" width="49" height="49" rx="14.5" stroke="#5eead4" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />

      {/* Modern High-Bay Facility Roofline */}
      <path 
        d="M 12 28 L 32 14 L 52 28 L 48 30 L 32 18 L 16 30 Z" 
        fill="url(#bl-roof)" 
      />

      {/* Main Warehouse Wall Frame */}
      <rect x="15" y="27" width="34" height="25" rx="3" fill="#ffffff" fillOpacity="0.12" stroke="#ffffff" strokeWidth="1.5" />

      {/* Automated Bay Loading Roll-up Door */}
      <rect x="24" y="36" width="16" height="16" rx="2" fill="#042f2e" stroke="#2dd4bf" strokeWidth="1.2" />
      {/* Horizontal door slats */}
      <line x1="26" y1="40" x2="38" y2="40" stroke="#5eead4" strokeWidth="1" strokeOpacity="0.7" />
      <line x1="26" y1="44" x2="38" y2="44" stroke="#5eead4" strokeWidth="1" strokeOpacity="0.7" />
      <line x1="26" y1="48" x2="38" y2="48" stroke="#5eead4" strokeWidth="1" strokeOpacity="0.7" />

      {/* Pallet Stacks on Sides */}
      {/* Left Pallet Box */}
      <rect x="18" y="42" width="5" height="4" rx="1" fill="#fef08a" />
      <rect x="18" y="47" width="5" height="4" rx="1" fill="#fde047" />

      {/* Right Pallet Drum */}
      <rect x="41" y="42" width="5" height="9" rx="1.5" fill="#38bdf8" />

      {/* Climate-Managed Snowflake Badge Top Right */}
      <circle cx="47" cy="17" r="7" fill="#0284c7" stroke="#ffffff" strokeWidth="1.2" />
      {/* Snowflake arms */}
      <line x1="47" y1="12" x2="47" y2="22" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="42" y1="17" x2="52" y2="17" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="43.5" y1="13.5" x2="50.5" y2="20.5" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="43.5" y1="20.5" x2="50.5" y2="13.5" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
};

/**
 * Pillar 04: Technical R&D & Formulation Support Vector Icon
 * Depicts a scientific Erlenmeyer laboratory flask with bubbling cosmetic formulation,
 * active molecular ring bond, and precision chemist pipette.
 */
export const FormulationSupportVectorIcon: React.FC<PillarIconProps> = ({ className = '', size = 52 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
      aria-label="Technical R&D & Formulation Support Vector Icon"
    >
      <defs>
        <linearGradient id="fs-grad-base" x1="4" y1="4" x2="60" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#065f46" />
          <stop offset="100%" stopColor="#064e3b" />
        </linearGradient>
        <linearGradient id="fs-fluid" x1="18" y1="34" x2="46" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="50%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>

      {/* Background Rounded Shield */}
      <rect x="6" y="6" width="52" height="52" rx="16" fill="url(#fs-grad-base)" />
      <rect x="7.5" y="7.5" width="49" height="49" rx="14.5" stroke="#6ee7b7" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />

      {/* Erlenmeyer Laboratory Flask Body */}
      {/* Flask Glass Outline */}
      <path 
        d="M 28 14 L 36 14 L 36 24 L 48 45 C 50 49, 47 53, 42 53 L 22 53 C 17 53, 14 49, 16 45 L 28 24 Z" 
        stroke="#ffffff" 
        strokeWidth="2.2" 
        strokeLinejoin="round" 
        fill="#ffffff" 
        fillOpacity="0.08" 
      />

      {/* Flask Lip Rim */}
      <rect x="26" y="12" width="12" height="3" rx="1.5" fill="#ffffff" />

      {/* Bioactive Formulation Fluid Layer */}
      <path 
        d="M 22 36 Q 32 33 42 36 L 47 46 C 48.5 49 46.5 52 42 52 L 22 52 C 17.5 52 15.5 49 17 46 Z" 
        fill="url(#fs-fluid)" 
      />

      {/* Active Bubbles rising inside fluid */}
      <circle cx="27" cy="44" r="2.5" fill="#ffffff" fillOpacity="0.8" />
      <circle cx="37" cy="42" r="3.2" fill="#ffffff" fillOpacity="0.8" />
      <circle cx="32" cy="47" r="1.8" fill="#ffffff" fillOpacity="0.8" />
      <circle cx="33" cy="38" r="1.5" fill="#ffffff" fillOpacity="0.8" />

      {/* Molecular Hexagonal Ring Hovering Top Right */}
      <polygon 
        points="48,15 54,18.5 54,25.5 48,29 42,25.5 42,18.5" 
        stroke="#fde047" 
        strokeWidth="1.8" 
        fill="#042f2e" 
      />
      <circle cx="48" cy="15" r="1.8" fill="#fde047" />
      <circle cx="54" cy="18.5" r="1.8" fill="#fde047" />
      <circle cx="54" cy="25.5" r="1.8" fill="#fde047" />
      <circle cx="48" cy="29" r="1.8" fill="#fde047" />
      <circle cx="42" cy="25.5" r="1.8" fill="#fde047" />
      <circle cx="42" cy="18.5" r="1.8" fill="#fde047" />

      {/* Catalyst Sparkle */}
      <path d="M 18 22 Q 18 27 23 27 Q 18 27 18 32 Q 18 27 13 27 Q 18 27 18 22 Z" fill="#67e8f9" />
    </svg>
  );
};

/**
 * Pillar 05: Regulatory & MSME Credibility Vector Icon
 * Depicts the official Government MSME registration seal, legal compliance ribbon,
 * certified security lock, and document verification star.
 */
export const RegulatoryMsmeVectorIcon: React.FC<PillarIconProps> = ({ className = '', size = 52 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
      aria-label="Regulatory & MSME Credibility Vector Icon"
    >
      <defs>
        <linearGradient id="reg-grad-base" x1="4" y1="4" x2="60" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="50%" stopColor="#0f766e" />
          <stop offset="100%" stopColor="#065f46" />
        </linearGradient>
        <linearGradient id="reg-seal-grad" x1="16" y1="12" x2="48" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>

      {/* Outer Rounded Container */}
      <rect x="6" y="6" width="52" height="52" rx="16" fill="url(#reg-grad-base)" />
      <rect x="7.5" y="7.5" width="49" height="49" rx="14.5" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />

      {/* Official Certificate Parchment Scroll */}
      <rect x="14" y="11" width="36" height="42" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />

      {/* Document Text Line Placeholders */}
      <line x1="20" y1="18" x2="34" y2="18" stroke="#047857" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="20" y1="24" x2="44" y2="24" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="20" y1="29" x2="44" y2="29" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="20" y1="34" x2="38" y2="34" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />

      {/* Official MSME Gold Seal Medallion */}
      <circle cx="36" cy="41" r="9" fill="url(#reg-seal-grad)" stroke="#ffffff" strokeWidth="1.5" />
      <circle cx="36" cy="41" r="7" stroke="#78350f" strokeWidth="0.8" strokeDasharray="1.5 1.5" fill="none" />

      {/* Government MSME Star / Emblem Inside Seal */}
      <polygon 
        points="36,35 37.5,39 41.5,39 38.5,41.5 39.5,45.5 36,43 32.5,45.5 33.5,41.5 30.5,39 34.5,39" 
        fill="#78350f" 
      />

      {/* Two Hanging Ribbon Tails */}
      <polygon points="32,49 32,57 35,54 36,57 36,49" fill="#dc2626" />
      <polygon points="36,49 36,57 39,54 42,57 42,49" fill="#b91c1c" />

      {/* Green Checkmark Badge Top Left of Document */}
      <circle cx="44" cy="15" r="4.5" fill="#10b981" stroke="#ffffff" strokeWidth="1.2" />
      <path d="M 42 15 L 43.5 16.5 L 46.5 13.5" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

/**
 * Pillar 06: Agile Nationwide Delivery Vector Icon
 * Depicts an aerodynamic heavy logistics transit truck with velocity speed lines,
 * pan-India route radar signal, and UN-certified protective cargo container.
 */
export const NationwideLogisticsVectorIcon: React.FC<PillarIconProps> = ({ className = '', size = 52 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
      aria-label="Agile Nationwide Delivery Vector Icon"
    >
      <defs>
        <linearGradient id="nl-grad-base" x1="4" y1="4" x2="60" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#065f46" />
          <stop offset="100%" stopColor="#042f2e" />
        </linearGradient>
        <linearGradient id="nl-truck-body" x1="12" y1="20" x2="48" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>

      {/* Outer Rounded Container */}
      <rect x="6" y="6" width="52" height="52" rx="16" fill="url(#nl-grad-base)" />
      <rect x="7.5" y="7.5" width="49" height="49" rx="14.5" stroke="#34d399" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />

      {/* Speed & Transit Motion Streamlines */}
      <line x1="8" y1="22" x2="16" y2="22" stroke="#6ee7b7" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.8" />
      <line x1="6" y1="28" x2="13" y2="28" stroke="#6ee7b7" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.6" />
      <line x1="10" y1="34" x2="15" y2="34" stroke="#6ee7b7" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.7" />

      {/* Truck Main Cargo Box */}
      <rect x="15" y="21" width="23" height="20" rx="2" fill="url(#nl-truck-body)" stroke="#ffffff" strokeWidth="1.2" />
      {/* Cargo Security Stripe */}
      <line x1="15" y1="31" x2="38" y2="31" stroke="#ffffff" strokeWidth="1.2" strokeDasharray="2 2" strokeOpacity="0.8" />
      {/* UN Hazmat / Fragile Shield Symbol */}
      <path d="M 26 25 L 29 27 L 29 33 L 26 35 L 23 33 L 23 27 Z" fill="#ffffff" fillOpacity="0.4" />

      {/* Driver Cabin Front */}
      <path 
        d="M 38 28 L 47 28 C 49 28 51 30 52 32 L 53 37 L 53 41 L 38 41 Z" 
        fill="#ffffff" 
        stroke="#a7f3d0" 
        strokeWidth="1.2" 
      />
      {/* Windshield */}
      <path d="M 40 30 L 46 30 L 48 35 L 40 35 Z" fill="#0284c7" />

      {/* Headlight Beam */}
      <polygon points="53,38 60,35 60,42" fill="#fef08a" fillOpacity="0.6" />

      {/* Truck Wheels */}
      {/* Front Wheel */}
      <circle cx="46" cy="44" r="5" fill="#18181b" stroke="#ffffff" strokeWidth="1.5" />
      <circle cx="46" cy="44" r="2" fill="#a1a1aa" />
      {/* Rear Tandem Wheels */}
      <circle cx="21" cy="44" r="5" fill="#18181b" stroke="#ffffff" strokeWidth="1.5" />
      <circle cx="21" cy="44" r="2" fill="#a1a1aa" />
      <circle cx="31" cy="44" r="5" fill="#18181b" stroke="#ffffff" strokeWidth="1.5" />
      <circle cx="31" cy="44" r="2" fill="#a1a1aa" />

      {/* Road / Expressway Baseline */}
      <line x1="10" y1="49" x2="56" y2="49" stroke="#52525b" strokeWidth="2" strokeLinecap="round" />

      {/* GPS Location Pin Top Right */}
      <path 
        d="M 46 11 C 43.5 11 41.5 13 41.5 15.5 C 41.5 19 46 23 46 23 C 46 23 50.5 19 50.5 15.5 C 50.5 13 48.5 11 46 11 Z" 
        fill="#ef4444" 
        stroke="#ffffff" 
        strokeWidth="1" 
      />
      <circle cx="46" cy="15.5" r="1.5" fill="#ffffff" />
    </svg>
  );
};

/**
 * Unified Component mapping pillar ID to corresponding custom vector icon
 */
export const PillarVectorIconRenderer: React.FC<{ pillarId: string; size?: number; className?: string }> = ({
  pillarId,
  size = 52,
  className = ''
}) => {
  switch (pillarId) {
    case 'global-sourcing':
      return <GlobalSourcingVectorIcon size={size} className={className} />;
    case 'quality-assurance':
      return <QualityAssuranceVectorIcon size={size} className={className} />;
    case 'bawana-inventory':
      return <BawanaLogisticsVectorIcon size={size} className={className} />;
    case 'formulation-support':
      return <FormulationSupportVectorIcon size={size} className={className} />;
    case 'regulatory-msme':
      return <RegulatoryMsmeVectorIcon size={size} className={className} />;
    case 'nationwide-reach':
      return <NationwideLogisticsVectorIcon size={size} className={className} />;
    default:
      return <GlobalSourcingVectorIcon size={size} className={className} />;
  }
};
