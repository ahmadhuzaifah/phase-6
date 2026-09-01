/**
 * Image Processing Pipeline & Watermark Generator
 * Al Rehman Garden Phase 2 Lahore Real Estate Authority Website
 */

import type { PropertyImageRecord } from '../types/image';

export interface WatermarkOptions {
  opacity?: number; // default 0.35 (35% per specification)
  position?: 'bottom-right' | 'center' | 'top-right';
  brandText?: string;
  subText?: string;
  logoUrl?: string;
}

export const DEFAULT_WATERMARK_OPTIONS: Required<WatermarkOptions> = {
  opacity: 0.35,
  position: 'bottom-right',
  brandText: 'AL REHMAN GARDEN',
  subText: 'PHASE 2 • LAHORE',
  logoUrl: '/images/logo/logo-icon.svg',
};

/**
 * Generates an SVG watermark overlay markup suitable for canvas/sharp compositing
 */
export function generateWatermarkSvgOverlay(width: number, height: number, options: WatermarkOptions = {}): string {
  const opt = { ...DEFAULT_WATERMARK_OPTIONS, ...options };
  const badgeWidth = 240;
  const badgeHeight = 54;
  const padding = 24;

  let x = width - badgeWidth - padding;
  let y = height - badgeHeight - padding;

  if (opt.position === 'center') {
    x = (width - badgeWidth) / 2;
    y = (height - badgeHeight) / 2;
  } else if (opt.position === 'top-right') {
    x = width - badgeWidth - padding;
    y = padding;
  }

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(${x}, ${y})" opacity="${opt.opacity}">
        <!-- Glassmorphism Background Pill -->
        <rect width="${badgeWidth}" height="${badgeHeight}" rx="10" fill="#0A1128" fill-opacity="0.85" stroke="#D4AF37" stroke-width="1.5"/>
        
        <!-- Logo Emblem -->
        <g transform="translate(12, 10)">
          <path d="M16 2 C24 2 30 7 30 15 C30 25 16 32 16 32 C16 32 2 25 2 15 C2 7 8 2 16 2 Z" fill="#0A1128" stroke="#D4AF37" stroke-width="2"/>
          <path d="M11 23 L11 13 C11 9 21 9 21 13 L21 23" stroke="#D4AF37" stroke-width="1.5" fill="none"/>
          <circle cx="16" cy="17" r="2" fill="#D4AF37"/>
        </g>
        
        <!-- Brand Typography -->
        <text x="52" y="24" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" font-weight="800" fill="#FFFFFF" letter-spacing="1.2">
          ${opt.brandText}
        </text>
        <text x="52" y="40" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="10" font-weight="700" fill="#E5C158" letter-spacing="1.5">
          ${opt.subText}
        </text>
      </g>
    </svg>
  `.trim();
}

/**
 * Creates a verified image database record
 */
export function createImageRecord(
  propertyId: string,
  imageFilename: string,
  sourceUrl?: string,
  altText?: string
): PropertyImageRecord {
  const baseName = imageFilename.replace(/\.[^/.]+$/, '');
  const imageId = `IMG-${propertyId}-${baseName}`;

  return {
    imageId,
    propertyId,
    source: sourceUrl?.includes('zameen') ? 'zameen' : 'developer',
    sourceUrl,
    copyrightStatus: 'fair-use-informational',
    watermarkApplied: true,
    watermarkOpacity: 0.35,
    watermarkPosition: 'bottom-right',
    processingDate: new Date().toISOString(),
    rawPath: `/images/properties/raw/${imageFilename}`,
    processedPath: `/images/properties/processed/${baseName}.webp`,
    watermarkedPath: `/images/properties/watermarked/${baseName}.webp`,
    format: 'webp',
    width: 1200,
    height: 800,
    altText: altText || `Al Rehman Garden Phase 2 Property ${propertyId}`,
  };
}
