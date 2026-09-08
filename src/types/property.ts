/**
 * Property Data Models & TypeScript Interfaces
 * DHA Phase 6 Lahore Real Estate Authority Website
 */

export type PropertyType =
  | 'residential-plot'
  | 'commercial-plot'
  | 'house'
  | 'villa'
  | 'shop'
  | 'apartment'
  | 'flat'
  | 'portion-floor'
  | 'penthouse'
  | 'farm-house'
  | 'other';

export type PropertyPurpose = 'sale' | 'rent' | 'lease';

export type SizeUnit = 'marla' | 'kanal' | 'sqft' | 'sqyd';

export type Currency = 'PKR' | 'USD';

export type PriceUnit = 'PKR' | 'Lakh' | 'Crore';

export type SourceType =
  | 'portal-extraction'   // Limited metadata from a linked public source
  | 'official-developer'  // Information published by the relevant developer
  | 'authorized-dealer'   // Submission with documented publishing permission
  | 'direct-allotment';   // Owner-supplied record requiring verification

export type InventorySourceType = 'zameen' | 'dealer-submission' | 'manual-entry' | 'developer-reference' | 'on-ground-audit';

export type VerificationStatus =
  | 'verified'      // Legal & on-ground verified
  | 'unverified'    // Raw extracted / unconfirmed
  | 'under-review'  // Currently being audited by team
  | 'expired'       // Sold or delisted
  | 'disputed';     // Warning flag

export type ListingStatus = 'ACTIVE' | 'PRICE_CHANGED' | 'NOT_FOUND' | 'EXPIRED';

export type AvailabilityStatus = 'available' | 'reserved' | 'sold' | 'removed';

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
  phase?: string;
  sector?: string;
  block?: string;
  commercialArea?: string;
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
  floors?: number;
  condition?: string;
  constructionStatus?: string;
  location: PropertyLocation;
  block: string;        // e.g. "Sector A", "CCA 2"
  description: string;
  features: string[];   // e.g. ["Corner", "Park Facing", "150ft Boulevard", "Near Mosque"]
  possessionStatus?: PossessionStatus;
  images: PropertyImage[];
  watermarkedImages?: WatermarkedImage[];
  source: string;       // e.g. "Zameen.com" or an owner/dealer submission
  sourceUrl?: string;   // Canonical original listing URL
  sourceLinkAllowed?: boolean;
  sourceName?: string;
  sourceURL?: string;
  sources?: string[];
  sourceUrls?: string[];
  sourceListingDate?: Date | string;
  sourceUpdatedDate?: Date | string;
  sourceType: SourceType;
  verificationStatus: VerificationStatus;
  availabilityStatus: AvailabilityStatus;
  listingStatus?: ListingStatus;
  createdAt?: Date | string;
  lastSeenAt?: Date | string;
  lastPrice?: number;
  priceChanged?: boolean;
  qualityScore?: number;
  qualityBreakdown?: {
    completeness: number;
    images: number;
    locationAccuracy: number;
    description: number;
    freshness: number;
  };
  verificationLabel?: 'Fresh Listing' | 'Recently Checked' | 'Needs Verification' | 'Verification Required';
  primaryImage?: string;
  primaryImageSourceUrl?: string;
  imageBackupSourceUrl?: string;
  imageStatus?: 'approved' | 'branded' | 'watermarked' | 'rejected' | 'pending-review';
  imageSource?: string;
  seo?: { title: string; description: string };
  lastVerifiedDate?: Date | string;
  verifiedBy?: string;
  expiryDate?: Date | string;
  views?: number;
  imageCount?: number;
  updatedAt?: Date | string;
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
