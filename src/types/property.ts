/**
 * Property Data Models & TypeScript Interfaces
 * Al Rehman Garden Phase 2 Lahore Real Estate Authority Website
 */

export type PropertyType =
  | 'residential-plot'
  | 'commercial-plot'
  | 'house'
  | 'villa'
  | 'shop'
  | 'apartment'
  | 'portion-floor'
  | 'penthouse'
  | 'farm-house';

export type PropertyPurpose = 'sale' | 'rent' | 'lease';

export type SizeUnit = 'marla' | 'kanal' | 'sqft' | 'sqyd';

export type Currency = 'PKR' | 'USD';

export type PriceUnit = 'PKR' | 'Lakh' | 'Crore';

export type SourceType =
  | 'portal-extraction'   // Extracted from Zameen, etc.
  | 'official-developer'  // Direct from Al Rehman Developers
  | 'authorized-dealer'   // From verified local dealers
  | 'direct-allotment';   // Original society file/allotment

export type VerificationStatus =
  | 'verified'      // Legal & on-ground verified
  | 'unverified'    // Raw extracted / unconfirmed
  | 'under-review'  // Currently being audited by team
  | 'expired'       // Sold or delisted
  | 'disputed';     // Warning flag

export type PossessionStatus =
  | 'possession'
  | 'non-possession'
  | 'under-construction'
  | 'developed';

export interface PropertyImage {
  id?: string;
  url: string;
  alt: string;
  caption?: string;
  isFeatured?: boolean;
  order?: number;
  width?: number;
  height?: number;
}

export interface WatermarkedImage {
  url: string;
  rawUrl?: string;
  watermarkType: 'standard' | 'banner' | 'center-seal';
  processedDate?: string;
}

export interface PropertyContactInfo {
  agentName?: string;
  agencyName?: string;
  phone: string;
  whatsapp: string;
  email?: string;
  officeAddress?: string;
  verifiedDealer?: boolean;
}

export interface PropertyCoordinates {
  lat: number;
  lng: number;
}

export interface PropertyLocation {
  address: string;
  city?: string;
  province?: string;
  coordinates?: PropertyCoordinates;
}

export interface PropertyModel {
  id: string;
  title: string;
  slug: string;
  propertyType: PropertyType;
  purpose: PropertyPurpose;
  price: number;
  currency: Currency;
  priceUnit: PriceUnit;
  pricePrefix?: string; // e.g. "Starting from", "Demanded"
  size: string;         // e.g. "5", "10", "1"
  unit: SizeUnit;       // e.g. "marla", "kanal"
  bedrooms?: number;    // Applicable for houses / villas / apartments
  bathrooms?: number;
  location: PropertyLocation;
  block: string;        // e.g. "Block A (Executive)", "Mirabel Block"
  description: string;
  features: string[];   // e.g. ["Corner", "Park Facing", "150ft Boulevard", "Near Mosque"]
  possessionStatus?: PossessionStatus;
  images: PropertyImage[];
  watermarkedImages?: WatermarkedImage[];
  source: string;       // e.g. "Zameen.com", "Al Rehman Developers"
  sourceUrl?: string;   // Canonical original listing URL
  sourceType: SourceType;
  verificationStatus: VerificationStatus;
  publishedDate: Date | string;
  lastCheckedDate: Date | string;
  contactInformation: PropertyContactInfo;
  isFeatured?: boolean;
  legalNotice?: string;
}

export interface PropertyFilterOptions {
  propertyType?: PropertyType | '';
  purpose?: PropertyPurpose | '';
  block?: string;
  size?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  verificationStatus?: VerificationStatus | '';
  sortBy?: 'price-asc' | 'price-desc' | 'newest' | 'size-asc' | 'size-desc';
  page?: number;
  limit?: number;
}
