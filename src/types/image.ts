/**
 * Image Database System Types
 * Storage, optimization, and watermarking metadata
 */

export interface PropertyImageRecord {
  imageId: string;
  propertyId: string;
  source: 'zameen' | 'developer' | 'dealer' | 'on-ground-photographer';
  sourceUrl?: string;
  copyrightStatus: 'public-domain' | 'licensed' | 'authorized-dealer' | 'fair-use-informational';
  watermarkApplied: boolean;
  watermarkOpacity: number; // e.g. 0.35 (35%)
  watermarkPosition: 'bottom-right' | 'center' | 'top-right';
  processingDate: string;
  rawPath: string;           // public/images/properties/raw/...
  processedPath: string;     // public/images/properties/processed/...
  watermarkedPath: string;   // public/images/properties/watermarked/...
  format: 'webp' | 'avif' | 'jpeg' | 'png';
  width: number;
  height: number;
  fileSizeBytes?: number;
  altText: string;
  isPrimaryFeatured?: boolean;
}
