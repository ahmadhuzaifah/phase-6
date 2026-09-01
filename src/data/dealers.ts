/**
 * Authorized Real Estate Dealers & Agencies Master Data
 * Al Rehman Garden Phase 2 Lahore
 */

export interface DealerProfile {
  name: string;
  slug: string;
  agencyName: string;
  isVerified: boolean;
  phone: string;
  whatsapp: string;
  email: string;
  officeAddress: string;
  experienceYears: number;
  rating: number;
  totalDeals: number;
  specializationBlocks: string[];
  description: string;
}

export const DEALERS: DealerProfile[] = [
  {
    name: 'Muhammad Rashid Nawaz',
    slug: 'muhammad-rashid-nawaz',
    agencyName: 'Al Rehman Property Consultant',
    isVerified: true,
    phone: '+923257800001',
    whatsapp: '+923257800001',
    email: 'rashid.nawaz@alrehmangarden.pk',
    officeAddress: 'Main 150ft Broadway Boulevard, Al Rehman Garden Phase 2, Lahore',
    experienceYears: 10,
    rating: 5.0,
    totalDeals: 680,
    specializationBlocks: ['Block A (Executive)', 'Block B', 'Block C', 'Block D', 'Mirabel Block', 'Royal Block', 'Beverly Hills'],
    description: 'Helping buyers find residential plots, houses, and investment opportunities in Al Rehman Garden Phase 2 Lahore with transparent guidance and verified property information.',
  },
  {
    name: 'Al Rehman Garden Official Advisory Desk',
    slug: 'al-rehman-official-advisory',
    agencyName: 'Direct Society Management Office',
    isVerified: true,
    phone: '+923000000000',
    whatsapp: '+923000000000',
    email: 'advisory@alrehmangarden.pk',
    officeAddress: 'Main Entrance Gate, 150ft Boulevard, Phase 2, Sharaqpur Road, Lahore',
    experienceYears: 12,
    rating: 5.0,
    totalDeals: 1500,
    specializationBlocks: ['Block A (Executive)', 'Block B', 'Block C', 'Mirabel Block', 'Royal Block'],
    description: 'The official real estate advisory and customer care desk for direct plot allotments, file verifications, map clearances, and ownership transfers.',
  },
  {
    name: 'Muhammad Asif Butt',
    slug: 'asif-butt-prime-estates',
    agencyName: 'Prime Estate & Builders',
    isVerified: true,
    phone: '+923000000000',
    whatsapp: '+923000000000',
    email: 'prime.estates@alrehmangarden.pk',
    officeAddress: 'Civic Commercial Center, Block C, Al Rehman Garden Phase 2',
    experienceYears: 9,
    rating: 4.9,
    totalDeals: 420,
    specializationBlocks: ['Block A (Executive)', 'Block B', 'Block C (Commercial & Civic)'],
    description: 'Specialist in 5 Marla & 10 Marla ready possession plots, brand new double-story luxury houses, and commercial Broadway plazas.',
  },
  {
    name: 'Chaudhry Kamran Gujjar',
    slug: 'kamran-gujjar-executive-properties',
    agencyName: 'Executive Real Estate Network',
    isVerified: true,
    phone: '+923000000000',
    whatsapp: '+923000000000',
    email: 'executive.properties@alrehmangarden.pk',
    officeAddress: 'Rose Commercial Complex, Block D, Al Rehman Garden Phase 2',
    experienceYears: 7,
    rating: 4.8,
    totalDeals: 310,
    specializationBlocks: ['Block D (Rose Garden)', 'Block E & F', 'Mirabel Block'],
    description: 'Focusing on family residential homes, corner park-facing plots, and flexible installment files in Phase 2 extensions.',
  },
  {
    name: 'Malik Zeeshan Awan',
    slug: 'zeeshan-awan-royal-realtors',
    agencyName: 'Royal City Consultants',
    isVerified: true,
    phone: '+923000000000',
    whatsapp: '+923000000000',
    email: 'royal.consultants@alrehmangarden.pk',
    officeAddress: 'Main Sharaqpur Road Office 4, Near Faizpur Interchange, Lahore',
    experienceYears: 6,
    rating: 4.8,
    totalDeals: 280,
    specializationBlocks: ['Royal Block', 'Beverly Hills Block', 'Mirabel Block'],
    description: 'Specializing in newly launched sectors, flexible 3 to 5-year installment plans, and high capital growth investment portfolios.',
  },
];
