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

/**
 * Profiles are published only for people who control this portal or explicitly
 * authorize a profile. Values are conservative until documentary proof is added.
 */
export const DEALERS: DealerProfile[] = [
  {
    name: 'Ahmad Huzaifah',
    slug: 'ahmad-huzaifah',
    agencyName: 'Independent Property Desk',
    isVerified: false,
    phone: '+923257800001',
    whatsapp: '+923257800001',
    email: 'ahmadhuzaifah@dhaphase6lahore.pk',
    officeAddress: 'DHA Phase 6, Lahore',
    experienceYears: 0,
    rating: 0,
    totalDeals: 0,
    specializationBlocks: ['DHA Phase 6 Lahore'],
    description: 'Independent point of contact for property shortlisting, source comparison and arranging on-ground checks in DHA Phase 6 Lahore.',
  },
];
