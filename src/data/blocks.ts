/**
 * DHA Phase 6 Lahore — Sector & Block Definitions
 * Comprehensive sector and block master data for DHA Phase 6 Lahore.
 */

export interface Block {
  name: string;
  slug: string;
  category: 'executive' | 'residential' | 'luxury-villas' | 'commercial';
  status: 'developed' | 'under-development' | 'possession-ready';
  possessionPercentage: number;
  plotTypes: string[];
  plotSizes: string[];
  features: string[];
  locationHighlight: string;
  description: string;
}

export const BLOCKS: Block[] = [
  {
    name: 'Sector A',
    slug: 'sector-a',
    category: 'executive',
    status: 'possession-ready',
    possessionPercentage: 100,
    plotTypes: ['Residential', 'Commercial'],
    plotSizes: ['1 Kanal', '2 Kanal'],
    features: ['100% Inhabited', 'Main Boulevard Access', 'Near Defence Raya Golf Resort', 'Underground Utilities'],
    locationHighlight: 'Prime entrance location directly on Phase 6 Main Boulevard',
    description: 'One of the most prestigious sectors of DHA Phase 6 Lahore. Features wide avenues, luxury designer houses, proximity to Defence Raya Golf Resort, and instant possession.',
  },
  {
    name: 'Sector B',
    slug: 'sector-b',
    category: 'executive',
    status: 'possession-ready',
    possessionPercentage: 100,
    plotTypes: ['Residential'],
    plotSizes: ['1 Kanal', '2 Kanal'],
    features: ['Direct Golf Course Views', 'Defence Raya Neighbor', 'Elite Mansions', 'Lush Green Parks'],
    locationHighlight: 'Facing the 18-Hole Championship Golf Course of Defence Raya',
    description: 'An elite residential enclave famous for golf-facing luxury residences, serene wide streets, and top-tier community living.',
  },
  {
    name: 'Sector C',
    slug: 'sector-c',
    category: 'residential',
    status: 'possession-ready',
    possessionPercentage: 100,
    plotTypes: ['Residential', 'Commercial'],
    plotSizes: ['1 Kanal', '2 Kanal'],
    features: ['Sector Park', 'Sector Mosque', 'Near CCA-1 Broadway', 'Fully Developed Infrastructure'],
    locationHighlight: 'Central connectivity between Main Boulevard and Sector D',
    description: 'A fully developed, highly sought-after 1 Kanal residential sector boasting grand villas, peaceful avenues, and rapid access to CCA-1 commercial market.',
  },
  {
    name: 'Sector D',
    slug: 'sector-d',
    category: 'residential',
    status: 'possession-ready',
    possessionPercentage: 100,
    plotTypes: ['Residential', 'Commercial'],
    plotSizes: ['1 Kanal'],
    features: ['Adjacent to CCA-1 Commercial', 'Grand Jamia Mosque', 'Community Sports Grounds', 'High Occupancy'],
    locationHighlight: 'Direct walking distance from CCA-1 Commercial Area',
    description: 'A thriving residential community situated right beside CCA-1, offering unrivaled daily convenience with banks, gourmet dining, and premier retail just steps away.',
  },
  {
    name: 'Sector E',
    slug: 'sector-e',
    category: 'residential',
    status: 'possession-ready',
    possessionPercentage: 100,
    plotTypes: ['Residential'],
    plotSizes: ['1 Kanal'],
    features: ['Quiet Residential Enclave', 'Multiple Family Parks', 'Wide 50ft & 60ft Roads', '24/7 DHA Security'],
    locationHighlight: 'Peaceful sector between Sector D and Sector F',
    description: 'Favored by families seeking tranquil residential surroundings combined with standard DHA infrastructure, underground electrification, and excellent security.',
  },
  {
    name: 'Sector F',
    slug: 'sector-f',
    category: 'residential',
    status: 'possession-ready',
    possessionPercentage: 100,
    plotTypes: ['Residential'],
    plotSizes: ['1 Kanal', '2 Kanal'],
    features: ['Central Park', 'Modern Jamia Mosque', 'Spacious Plot Layouts', 'Established Living'],
    locationHighlight: 'Direct arterial link to Main Boulevard',
    description: 'Premium sector offering 1 Kanal and selected 2 Kanal plots with lush community parks and architect-designed private residences.',
  },
  {
    name: 'Sector G',
    slug: 'sector-g',
    category: 'residential',
    status: 'possession-ready',
    possessionPercentage: 100,
    plotTypes: ['Residential'],
    plotSizes: ['1 Kanal'],
    features: ['Bedian Road Connectivity', 'Family Playgrounds', 'Underground Utilities', 'High Resale Liquidity'],
    locationHighlight: 'Bordering Bedian Road with quick Ring Road access',
    description: 'A well-developed sector providing seamless connectivity to Bedian Road, Lahore Ring Road, and surrounding educational institutions.',
  },
  {
    name: 'Sector H',
    slug: 'sector-h',
    category: 'residential',
    status: 'possession-ready',
    possessionPercentage: 100,
    plotTypes: ['Residential', 'Commercial'],
    plotSizes: ['10 Marla', '1 Kanal'],
    features: ['Adjacent to CCA-2 Commercial', '10 Marla & 1 Kanal Options', 'High Demand Area', 'Sports Complexes'],
    locationHighlight: 'Next to CCA-2 Commercial Broadway',
    description: 'One of the most active sectors in DHA Phase 6, offering both 10 Marla and 1 Kanal plots with direct proximity to CCA-2 commercial district.',
  },
  {
    name: 'Sector J',
    slug: 'sector-j',
    category: 'residential',
    status: 'possession-ready',
    possessionPercentage: 100,
    plotTypes: ['Residential'],
    plotSizes: ['10 Marla', '1 Kanal'],
    features: ['Prime 10 Marla Hotspot', 'Fast Construction Activity', 'Modern Parks', 'Sector Mosque'],
    locationHighlight: 'Central Phase 6 location linking Sector H and Sector K',
    description: 'The preferred choice for 10 Marla buyers and investors looking for affordable entry points into DHA Phase 6 with premium lifestyle dividends.',
  },
  {
    name: 'Sector K',
    slug: 'sector-k',
    category: 'residential',
    status: 'possession-ready',
    possessionPercentage: 100,
    plotTypes: ['Residential'],
    plotSizes: ['1 Kanal', '2 Kanal'],
    features: ['Spacious Boulevards', 'Lush Landscaping', 'Peaceful Atmosphere', 'High Capital Value'],
    locationHighlight: 'Inner loop sector with minimal through traffic',
    description: 'An exclusive residential sector characterized by calm tree-lined streets, generous plot frontages, and high-end modern houses.',
  },
  {
    name: 'Sector L & M',
    slug: 'sector-l-m',
    category: 'residential',
    status: 'possession-ready',
    possessionPercentage: 100,
    plotTypes: ['Residential', 'Commercial'],
    plotSizes: ['1 Kanal', '2 Kanal'],
    features: ['Quick Ring Road Access', 'Barki Road Linkage', 'Large Plot Dimensions', 'Lush Sector Parks'],
    locationHighlight: 'Eastern boundary facing Barki Road and Lahore Ring Road',
    description: 'Spacious residential sectors offering prime 1 Kanal and 2 Kanal residential inventory with outstanding regional highway accessibility.',
  },
  {
    name: 'Defence Raya Golf Resort',
    slug: 'defence-raya',
    category: 'luxury-villas',
    status: 'possession-ready',
    possessionPercentage: 100,
    plotTypes: ['Luxury Villas', 'Condominiums', 'Commercial'],
    plotSizes: ['1 Kanal', '2 Kanal', 'Golf View Condos'],
    features: ['18-Hole International Golf Course', 'Country Club & Spa', 'Gated Luxury Security', 'Raya Fairways Commercial'],
    locationHighlight: 'Integrated into DHA Phase 6 Sector A & B',
    description: 'Pakistan’s foremost luxury golf resort community, developed in partnership with BRDB Malaysia. Features golf-facing 1 & 2 Kanal designer villas and high-end commercial plazas.',
  },
  {
    name: 'CCA 1 Commercial Broadway',
    slug: 'cca-1',
    category: 'commercial',
    status: 'possession-ready',
    possessionPercentage: 100,
    plotTypes: ['Commercial'],
    plotSizes: ['4 Marla Comm', '8 Marla Comm'],
    features: ['Bank Square', 'Top Restaurant Chains', 'Corporate Headquarters', 'Ample Parking Bays'],
    locationHighlight: 'Serving Sectors A, B, C, D, and E',
    description: 'The primary commercial hub of DHA Phase 6 Lahore, housing leading financial institutions, premium brand outlets, supermarkets, and culinary destinations.',
  },
  {
    name: 'CCA 2 Commercial Broadway',
    slug: 'cca-2',
    category: 'commercial',
    status: 'possession-ready',
    possessionPercentage: 100,
    plotTypes: ['Commercial'],
    plotSizes: ['4 Marla Comm', '8 Marla Comm'],
    features: ['Bustling Retail District', 'Clinics & Pharmacies', 'Cafes & Dining', 'High Rental Yields'],
    locationHighlight: 'Serving Sectors G, H, J, K, and L',
    description: 'The energetic commercial center for eastern Phase 6, commanding strong tenant demand and high commercial rental yields.',
  },
];

export const PLOT_TYPES = [
  'Residential Plots',
  'Commercial Plots',
  'Luxury Villas',
  'Golf View Condos',
] as const;

export const PLOT_SIZES = [
  '5 Marla',
  '10 Marla',
  '1 Kanal',
  '2 Kanal',
  '4 Marla Commercial',
  '8 Marla Commercial',
] as const;

export type PlotType = (typeof PLOT_TYPES)[number];
export type PlotSize = (typeof PLOT_SIZES)[number];
