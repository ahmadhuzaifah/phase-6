/**
 * Image Processing & SEO Asset Automation Engine
 * Al Rehman Garden Phase 2 Lahore Real Estate Pipeline
 */

import type { CleanedProperty } from '../cleaners/cleaner';

export interface AutomatedImageRecord {
  url: string;
  rawUrl?: string;
  watermarkedUrl: string;
  seoFilename: string;
  alt: string;
  caption: string;
  isFeatured: boolean;
  order: number;
  watermarkSettings: {
    opacity: number;
    position: 'bottom-right' | 'center-seal';
  };
}

/**
 * Generates an SEO-optimized filename for a property image
 */
export function generateImageSeoFilename(
  prop: { size: string; unit: string; propertyType: string; block: string; id: string },
  imageIndex: number = 1
): string {
  const normType = prop.propertyType.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const normBlock = prop.block.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
  const normSize = `${prop.size}-${prop.unit}`.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const normId = prop.id.toLowerCase().replace(/[^a-z0-9]/g, '-');

  return `al-rehman-garden-phase-2-${normSize}-${normType}-${normBlock}-${normId}-${imageIndex}.webp`;
}

/**
 * Generates descriptive high-CTR Alt Text
 */
export function generateImageAltText(
  prop: { size: string; unit: string; propertyType: string; purpose: string; block: string }
): string {
  const purposeText = prop.purpose === 'sale' ? 'for sale' : 'for rent';
  const typeText = prop.propertyType.replace('-', ' ');
  return `${prop.size} ${prop.unit} ${typeText} ${purposeText} in ${prop.block}, Al Rehman Garden Phase 2 Lahore`;
}

/**
 * Enriches property image records with automated filenames, alt text, and watermark config
 */
export function processPropertyImages(prop: CleanedProperty): AutomatedImageRecord[] {
  if (!prop.images || prop.images.length === 0) {
    const filename = generateImageSeoFilename(prop, 1);
    const alt = generateImageAltText(prop);
    return [
      {
        url: '/images/og/property-og.jpg',
        watermarkedUrl: '/images/og/property-og.jpg',
        seoFilename: filename,
        alt,
        caption: `${prop.title} — Al Rehman Garden Phase 2`,
        isFeatured: true,
        order: 1,
        watermarkSettings: {
          opacity: 0.35,
          position: 'bottom-right',
        },
      },
    ];
  }

  return prop.images.map((img, idx) => {
    const filename = generateImageSeoFilename(prop, idx + 1);
    const alt = img.alt || generateImageAltText(prop);
    return {
      url: img.url,
      watermarkedUrl: img.url,
      seoFilename: filename,
      alt,
      caption: img.caption || `${prop.title} — View ${idx + 1}`,
      isFeatured: img.isFeatured || idx === 0,
      order: img.order || idx + 1,
      watermarkSettings: {
        opacity: 0.35,
        position: 'bottom-right',
      },
    };
  });
}
