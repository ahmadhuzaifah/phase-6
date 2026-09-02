/**
 * Authorized Real Estate Dealers & Agencies Master Data
 * DHA Phase 6 Lahore
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
    name: 'Ahmad Huzaifah',
    slug: 'ahmad-huzaifah',
    agencyName: 'DHA Phase 6 Property Specialist',
    isVerified: true,
    phone: '+923257800001',
    whatsapp: '+923257800001',
    email: 'ahmadhuzaifah@dhaphase6lahore.pk',
    officeAddress: 'Main Boulevard, Sector A Commercial, DHA Phase 6, Lahore',
    experienceYears: 10,
    rating: 5.0,
    totalDeals: 850,
    specializationBlocks: ['Sector A', 'Sector B', 'Sector C', 'Sector D', 'Defence Raya', 'CCA 1', 'CCA 2'],
    description: 'Providing elite advisory for luxury residential plots, ready designer villas, commercial plazas, and Defence Raya golf properties in DHA Phase 6 Lahore.',
  },
  {
    name: 'DHA Phase 6 Advisory Desk',
    slug: 'dha-phase-6-advisory',
    agencyName: 'DHA Advisory & Client Services',
    isVerified: true,
    phone: '+923257800001',
    whatsapp: '+923257800001',
    email: 'advisory@dhaphase6lahore.pk',
    officeAddress: 'Commercial Broadway, CCA-1, DHA Phase 6, Lahore',
    experienceYears: 14,
    rating: 5.0,
    totalDeals: 1900,
    specializationBlocks: ['Sector A', 'Sector B', 'Sector E', 'Sector F', 'Sector H', 'Sector J'],
    description: 'Independent DHA real estate advisory desk for verified inventory, NDC clearance guidance, transfer procedures, and plot valuation.',
  },
  {
    name: 'Muhammad Asif Butt',
    slug: 'asif-butt-prime-estates',
    agencyName: 'Defence Prime Real Estate',
    isVerified: true,
    phone: '+923257800001',
    whatsapp: '+923257800001',
    email: 'prime.estates@dhaphase6lahore.pk',
    officeAddress: 'CCA-2 Commercial Broadway, DHA Phase 6, Lahore',
    experienceYears: 11,
    rating: 4.9,
    totalDeals: 520,
    specializationBlocks: ['Sector C', 'Sector D', 'CCA 1', 'CCA 2', 'Sector K'],
    description: 'Specialist in 1 Kanal and 2 Kanal luxury bungalows, corner plots, and high-yield commercial Broadway investments.',
  },
  {
    name: 'Chaudhry Kamran Gujjar',
    slug: 'kamran-gujjar-executive-properties',
    agencyName: 'Phase 6 Executive Properties',
    isVerified: true,
    phone: '+923257800001',
    whatsapp: '+923257800001',
    email: 'executive.properties@dhaphase6lahore.pk',
    officeAddress: 'Sector H Commercial, Near Bedian Road, DHA Phase 6, Lahore',
    experienceYears: 9,
    rating: 4.8,
    totalDeals: 410,
    specializationBlocks: ['Sector G', 'Sector H', 'Sector J', 'Sector L'],
    description: 'Focusing on 5 Marla and 10 Marla residential plots, park-facing locations, and rapid transfer deals.',
  },
  {
    name: 'Malik Zeeshan Awan',
    slug: 'zeeshan-awan-royal-realtors',
    agencyName: 'Raya & Phase 6 Consultants',
    isVerified: true,
    phone: '+923257800001',
    whatsapp: '+923257800001',
    email: 'raya.consultants@dhaphase6lahore.pk',
    officeAddress: 'Defence Raya Golf Resort Arcade, DHA Phase 6, Lahore',
    experienceYears: 8,
    rating: 4.9,
    totalDeals: 360,
    specializationBlocks: ['Defence Raya', 'Sector A', 'Sector B', 'Sector N'],
    description: 'Specializing in Defence Raya fairways villas, 18-hole golf course residences, luxury penthouses, and high-net-worth portfolios.',
  },
];
