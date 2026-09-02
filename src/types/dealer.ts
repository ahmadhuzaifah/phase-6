/**
 * Property Dealer & Agency Data Models
 * DHA Phase 6 Lahore
 */

export interface PropertyDealerModel {
  id: string;
  name: string;
  agencyName: string;
  slug: string;
  rating?: number;
  isVerified: boolean;
  phone: string;
  whatsapp: string;
  email?: string;
  officeAddress: string;
  experienceYears?: number;
  specializationBlocks: string[];
  activeListingsCount?: number;
  logo?: string;
  photo?: string;
  description: string;
  licenseNumber?: string;
}
