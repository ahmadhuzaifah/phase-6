/**
 * Al Rehman Garden Phase 2 Lahore — Block Definitions
 * Comprehensive sector and block master data for Al Rehman Garden Phase 2.
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
    name: 'Block A (Executive)',
    slug: 'block-a',
    category: 'executive',
    status: 'possession-ready',
    possessionPercentage: 100,
    plotTypes: ['Residential', 'Commercial'],
    plotSizes: ['5 Marla', '10 Marla', '1 Kanal'],
    features: ['100% Inhabited', 'Main Boulevard Access', 'Near Grand Mosque', 'Parks & Commercial Hub'],
    locationHighlight: 'Direct access from Main 150ft Boulevard Entrance',
    description: 'The flagship developed block of Al Rehman Garden Phase 2. 100% on-ground with hundreds of families residing. Features wide carpeted roads and instant possession.',
  },
  {
    name: 'Block B (Prime Residential)',
    slug: 'block-b',
    category: 'residential',
    status: 'possession-ready',
    possessionPercentage: 95,
    plotTypes: ['Residential', 'Commercial'],
    plotSizes: ['3 Marla', '5 Marla', '8 Marla', '10 Marla'],
    features: ['Fully Developed', 'Sector Parks', 'School Access', 'Commercial Markets'],
    locationHighlight: 'Adjacent to Block A and Central Society Park',
    description: 'A vibrant residential sector ideal for middle-class families seeking immediate home construction with all underground utilities operational.',
  },
  {
    name: 'Block C (Commercial & Civic Hub)',
    slug: 'block-c',
    category: 'commercial',
    status: 'possession-ready',
    possessionPercentage: 90,
    plotTypes: ['Commercial', 'Residential'],
    plotSizes: ['2 Marla Comm', '4 Marla Comm', '5 Marla', '10 Marla'],
    features: ['Main Commercial Broadway', 'Bank Square', 'Hospital Complex', 'Corporate Offices'],
    locationHighlight: 'Central commercial district on 100ft arterial road',
    description: 'The prime business and commercial center of Phase 2 housing major retail brands, financial institutions, and bustling shopping centers.',
  },
  {
    name: 'Block D (Rose Garden)',
    slug: 'block-d',
    category: 'residential',
    status: 'possession-ready',
    possessionPercentage: 85,
    plotTypes: ['Residential'],
    plotSizes: ['3 Marla', '5 Marla', '10 Marla'],
    features: ['Lush Theme Park', 'Jogging Tracks', 'Community Center', 'Underground Utilities'],
    locationHighlight: 'Walking distance from Al-Rehman Hospital',
    description: 'Peaceful living environment centered around family parks and recreational green belts with fast-paced residential construction.',
  },
  {
    name: 'Block E & F (Possession Ready)',
    slug: 'block-e-f',
    category: 'residential',
    status: 'possession-ready',
    possessionPercentage: 80,
    plotTypes: ['Residential', 'Commercial'],
    plotSizes: ['3.5 Marla', '5 Marla', '10 Marla'],
    features: ['Wide Streets', 'Mosque', 'High School Campus', 'Lush Green Belts'],
    locationHighlight: 'Quick connect to Sharaqpur Road bypass',
    description: 'High-demand investment and living zone offering affordable plot options with rapid capital appreciation and ready possession status.',
  },
  {
    name: 'Mirabel Block (Luxury Sector)',
    slug: 'mirabel-block',
    category: 'luxury-villas',
    status: 'under-development',
    possessionPercentage: 60,
    plotTypes: ['Residential', 'Luxury Villas', 'Commercial'],
    plotSizes: ['5 Marla', '10 Marla', '1 Kanal', '2 Kanal'],
    features: ['Gated Sub-Community', 'Smart Infrastructure', 'Mini Golf & Club', 'Underground Grid'],
    locationHighlight: 'Scenic landscaped corner overlooking green reserve',
    description: 'The premier luxury enclave of Al Rehman Garden Phase 2 featuring modern architecture guidelines, upscale villas, and exclusive lifestyle amenities.',
  },
  {
    name: 'Royal Block',
    slug: 'royal-block',
    category: 'luxury-villas',
    status: 'under-development',
    possessionPercentage: 55,
    plotTypes: ['Residential', 'Commercial'],
    plotSizes: ['3 Marla', '5 Marla', '10 Marla'],
    features: ['Affordable Installments', 'Modern Sewerage', 'Grand Entrance Arch', 'Security Checkpoint'],
    locationHighlight: 'Near upcoming Ring Road interchange link',
    description: 'A fast-growing investment block offering attractive flexible installment options with massive future return potential.',
  },
  {
    name: 'Beverly Hills Block',
    slug: 'beverly-hills-block',
    category: 'luxury-villas',
    status: 'under-development',
    possessionPercentage: 45,
    plotTypes: ['Residential', 'Commercial'],
    plotSizes: ['5 Marla', '10 Marla', '1 Kanal'],
    features: ['Modern Town Planning', 'Boulevard Facing', 'Dedicated Commercial Hub', 'Eco Parks'],
    locationHighlight: 'Prime western extension zone',
    description: 'Modern master-planned sector conceptualized with contemporary urban lifestyle standards and high ROI investment windows.',
  },
];

export const PLOT_TYPES = [
  'Residential Plots',
  'Commercial Plots',
  'Luxury Villas',
  'Farm Houses',
] as const;

export const PLOT_SIZES = [
  '3 Marla',
  '3.5 Marla',
  '5 Marla',
  '7 Marla',
  '8 Marla',
  '10 Marla',
  '1 Kanal',
  '2 Kanal',
] as const;

export type PlotType = (typeof PLOT_TYPES)[number];
export type PlotSize = (typeof PLOT_SIZES)[number];
