/**
 * Property Dealer & Agency Data Models
 * Al Rehman Garden Phase 2 Lahore
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
