import React, { useState, useEffect } from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  widthSize?: number; // Target width in pixels for Google content optimization
  priority?: boolean;  // Set true to disable lazy loading (e.g., for Hero background/LCP image)
}

/**
 * Helper to append dynamic width parameters to Google User Content URLs.
 * Example: https://lh3.googleusercontent.com/aida-public/XYZ = https://lh3.googleusercontent.com/aida-public/XYZ=w800
 */
export const getOptimizedImageUrl = (url: string, width: number): string => {
  if (!url) return '';
  if (url.includes('lh3.googleusercontent.com')) {
    // Strip any existing width or size parameters and apply the new width
    const baseUrl = url.split('=')[0];
    return `${baseUrl}=w${width}`;
  }
  return url;
};

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  widthSize = 800,
  priority = false,
  className = '',
  alt = '',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(() => src ? getOptimizedImageUrl(src, widthSize) : '');

  useEffect(() => {
    if (src) {
      const optimized = getOptimizedImageUrl(src, widthSize);
      setCurrentSrc(optimized);
    } else {
      setCurrentSrc('');
    }
  }, [src, widthSize]);

  return (
    <div className={`relative overflow-hidden bg-slate-100/50 ${className}`}>
      {/* Skeleton / Shimmer background while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 animate-pulse" />
      )}
      
      <img
        src={currentSrc || undefined}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
};
