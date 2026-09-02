export interface DevelopmentMilestone {
  year: string;
  quarter: string;
  title: string;
  category: 'Infrastructure' | 'Possession' | 'Commercial' | 'Civic';
  status: 'Completed' | 'In Progress' | 'Upcoming';
  summary: string;
  details: string[];
  image: string;
  imageAlt: string;
}

export const DEVELOPMENT_UPDATES: DevelopmentMilestone[] = [
  {
    year: '2026',
    quarter: 'September review',
    title: 'Phase VI sector plan checked against DHA Lahore source',
    category: 'Infrastructure',
    status: 'Completed',
    summary: 'The portal sector directory now follows the labels visible on the official DHA Lahore Phase VI map.',
    details: ['Sectors A-H and J-N are covered.', 'Shabbir Sharif Boulevard, Bedian Road and Barki Road are included as principal map references.', 'Users are directed to the official source for the latest file.'],
    image: '/images/og/homepage-og.svg',
    imageAlt: 'DHA Phase 6 Lahore independent map research graphic',
  },
  {
    year: '2026',
    quarter: 'September review',
    title: 'Healthcare reference updated',
    category: 'Civic',
    status: 'Completed',
    summary: 'The amenities guide links to DHA Lahore healthcare information listing a medical centre in Phase 6 Sector E.',
    details: ['Service details and hours must be confirmed directly.', 'The places directory distinguishes facilities inside the phase from nearby destinations.'],
    image: '/images/og/blog-og.svg',
    imageAlt: 'DHA Phase 6 Lahore amenities research graphic',
  },
  {
    year: '2026',
    quarter: 'September snapshot',
    title: 'Public asking-price sources reviewed',
    category: 'Commercial',
    status: 'Completed',
    summary: 'Public Zameen and Graana results were checked to create source-referenced market snapshots.',
    details: ['Published numbers are seller demands, not transaction evidence.', 'External images are not copied or rebranded.', 'Every snapshot requires a fresh availability check.'],
    image: '/images/og/property-og.svg',
    imageAlt: 'DHA Phase 6 Lahore property market research graphic',
  },
  {
    year: '2026',
    quarter: 'Ongoing',
    title: 'Owner-authorized listing intake',
    category: 'Possession',
    status: 'In Progress',
    summary: 'The property workflow is ready for owner or dealer submissions with clean images and clear publication rights.',
    details: ['Third-party watermarks, logos and phone overlays are rejected.', 'Documents and ownership are not published as verified without appropriate checks.', 'Each record stores a source and review date.'],
    image: '/images/placeholders/property-placeholder.svg',
    imageAlt: 'Property image rights and verification workflow graphic',
  },
];
