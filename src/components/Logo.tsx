import React from 'react';
import { motion } from 'motion/react';

export interface LogoProps {
  className?: string;
  variant?: 'horizontal' | 'stacked' | 'monogram' | 'full';
  theme?: 'light' | 'dark';
  height?: number | string;
  width?: number | string;
  alt?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  /**
   * Horizontal stretch ratio. Default: 1.0 (exact original proportions).
   */
  stretchX?: number;
  /**
   * Subtle hover scale effect to provide a premium interactive feel.
   * Default: true.
   */
  hoverScale?: boolean;
  /**
   * Enable lively biotech ambient floating and interactive animations.
   * Default: true.
   */
  animated?: boolean;
}

/**
 * Official Mindtech Biotechnology Company Logo
 * Centralized, authoritative brand asset component used throughout the entire website.
 * References the exact official company logo at public asset URL: /mindtech_logo_transparent-1.svg.
 * Strictly preserves original vector paths, colors, proportions, and transparent background.
 */
export const Logo: React.FC<LogoProps> = ({
  className = 'h-14 sm:h-16 md:h-[72px] lg:h-20 xl:h-[92px] 2xl:h-[102px] w-auto',
  height,
  width,
  alt = 'Mindtech Biotechnology',
  onClick,
  style,
  stretchX = 1.0,
  hoverScale = true,
  animated = true
}) => {
  const heightStyle = height ? (typeof height === 'number' ? `${height}px` : height) : undefined;
  const widthStyle = width ? (typeof width === 'number' ? `${width}px` : width) : undefined;

  // The official and authoritative logo asset path
  const officialLogoPath = '/mindtech_logo_transparent-1.svg';

  // Natural logo aspect ratio: 2048 x 1134 (approx 1.806)
  const effectiveAspectRatio = stretchX === 1.0 ? '2048 / 1134' : `${(2048 * stretchX).toFixed(1)} / 1134`;

  // Determine if a custom height class was provided; if not and no height prop given, apply enlarged responsive default
  const hasHeightClass = className && /\bh-\S+/.test(className);
  const responsiveClass = (!height && !hasHeightClass) ? 'h-18 sm:h-20 md:h-24 lg:h-26 xl:h-[108px] 2xl:h-[120px]' : '';

  return (
    <motion.div 
      className={`relative flex items-center justify-center shrink-0 select-none ${responsiveClass} ${className}`.trim()} 
      style={{
        aspectRatio: effectiveAspectRatio,
        ...(heightStyle ? { height: heightStyle } : {}),
        ...(widthStyle ? { width: widthStyle } : {}),
        margin: 0,
        padding: 0,
        ...style
      }}
      onClick={onClick}
      initial={animated ? { opacity: 0 } : false}
      animate={animated ? {
        opacity: 1,
        transition: {
          opacity: { duration: 0.3, ease: 'easeOut' }
        }
      } : undefined}
      whileHover={hoverScale ? {
        scale: 1.05,
        y: -1.5,
        filter: 'drop-shadow(0 6px 14px rgba(16, 185, 129, 0.22))',
        transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] }
      } : undefined}
      whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
    >
      <img
        src={officialLogoPath}
        alt={alt}
        width={2048}
        height={1134}
        className="w-auto h-full max-w-full max-h-full object-contain block m-0 p-0"
        style={{
          width: 'auto',
          height: '100%',
          aspectRatio: effectiveAspectRatio,
          objectFit: 'contain',
          margin: 0,
          padding: 0,
          transform: stretchX !== 1.0 ? `scaleX(${stretchX})` : undefined,
          transformOrigin: 'center center',
          display: 'block'
        }}
        loading="eager"
        decoding="sync"
      />
    </motion.div>
  );
};

export const CompanyLogo: React.FC<LogoProps> = Logo;
export default Logo;
