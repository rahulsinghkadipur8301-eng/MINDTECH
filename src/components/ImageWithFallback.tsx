import React, { useState } from 'react';
import { FlaskConical, ImageOff } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  containerClassName?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackSrc,
  className = '',
  containerClassName = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Reliable backup image if primary fails
  const defaultFallback = 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80';

  return (
    <div className={`relative overflow-hidden bg-emerald-950/30 ${containerClassName}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/40 via-emerald-900/30 to-emerald-950/40 animate-pulse flex items-center justify-center">
          <FlaskConical className="w-6 h-6 text-emerald-500/40 animate-spin" />
        </div>
      )}

      {hasError ? (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#072414] to-[#0d4025] text-emerald-300 p-4 text-center">
          <FlaskConical className="w-8 h-8 text-emerald-400 mb-2 opacity-80" />
          <span className="text-xs font-semibold tracking-wide text-emerald-200">{alt}</span>
          <span className="text-[10px] text-emerald-400/70 mt-1 uppercase font-mono">Mindtech Raw Materials</span>
        </div>
      ) : (
        <img
          src={src || defaultFallback}
          alt={alt}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            if (!hasError) {
              setHasError(true);
              setIsLoading(false);
            }
          }}
          className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          referrerPolicy="no-referrer"
          {...props}
        />
      )}
    </div>
  );
};
