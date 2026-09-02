/**
 * DHA Phase 6 Lahore — Amenities & Infrastructure Data
 */

export interface Amenity {
  name: string;
  icon: string;
  category: AmenityCategory;
  highlight: string;
  description: string;
}

export type AmenityCategory =
  | 'education'
  | 'healthcare'
  | 'shopping'
  | 'transportation'
  | 'recreation'
  | 'worship'
  | 'infrastructure'
  | 'security';

export const AMENITY_CATEGORIES: Record<AmenityCategory, { label: string; icon: string }> = {
  infrastructure: { label: 'Master Infrastructure', icon: '🏗️' },
  security: { label: 'DHA Security & Safety', icon: '🔒' },
  healthcare: { label: 'Healthcare & Wellness', icon: '🏥' },
  education: { label: 'Top-Tier Education', icon: '🎓' },
  worship: { label: 'Grand Jamia Mosques', icon: '🕌' },
  recreation: { label: 'Golf, Parks & Sports', icon: '🌳' },
  shopping: { label: 'CCA Broadways & Retail', icon: '🛒' },
  transportation: { label: 'Ring Road Connectivity', icon: '🚗' },
};

export const AMENITIES: Amenity[] = [
  {
    name: 'Defence Raya Golf & Country Club',
    icon: '⛳',
    category: 'recreation',
    highlight: '18-Hole International Championship Golf Course & Resort',
    description: 'Premier golf lifestyle featuring an 18-hole championship course, luxury clubhouse, infinity pool, fitness center, fine dining, and tennis courts.',
  },
  {
    name: 'DHA Vigilance & 24/7 QRF Security',
    icon: '🛡️',
    category: 'security',
    highlight: 'Quick Response Force patrol units and 24/7 surveillance',
    description: 'DHA Lahore dedicated security apparatus with motorized Quick Response Force (QRF) patrols, barrier checkpoints, and perimeter CCTV monitoring.',
  },
  {
    name: '150ft Wide Main Boulevard & Signal-Free Corridors',
    icon: '🛣️',
    category: 'infrastructure',
    highlight: 'Seamless connectivity to Ring Road and Bedian Road',
    description: 'Master-planned arterial roadways with 150ft main boulevard, beautifully landscaped roundabouts, smart LED streetlights, and dedicated service lanes.',
  },
  {
    name: '100% Underground Electrification & Utilities',
    icon: '⚡',
    category: 'infrastructure',
    highlight: 'Zero overhead cables with dedicated grid stations',
    description: 'State-of-the-art underground electrical distribution network, uninterrupted Sui Gas connectivity, modern stormwater drainage, and fiber-optic telecom.',
  },
  {
    name: 'Sector Grand Mosques & Islamic Architecture',
    icon: '🕌',
    category: 'worship',
    highlight: 'Aesthetically designed Jamia Mosques in every sector',
    description: 'Air-conditioned architectural landmark mosques in Sectors A, C, D, H, J, K, and L, offering spacious prayer halls and dedicated ablution areas.',
  },
  {
    name: 'World-Class Healthcare & Proximity to PKLI',
    icon: '🏥',
    category: 'healthcare',
    highlight: 'Minutes away from Pakistan Kidney and Liver Institute (PKLI)',
    description: 'Immediate access to premier medical facilities including PKLI, DHA Phase 6 Medical Centers, 24/7 pharmacies, and emergency clinics.',
  },
  {
    name: 'Elite Academic Institutions & Colleges',
    icon: '🎓',
    category: 'education',
    highlight: 'Beaconhouse, Roots IVY, SICAS, and Lahore Grammar School',
    description: 'Home to prestigious national and international educational networks offering Cambridge curriculum from early years to A-Levels.',
  },
  {
    name: 'CCA-1 & CCA-2 Commercial Broadways',
    icon: '🏪',
    category: 'shopping',
    highlight: 'Financial squares, top dining brands & luxury retail',
    description: 'Vibrant commercial districts featuring national and international bank headquarters, fine-dining restaurants, Gloria Jean’s, supermarkets, and specialty boutiques.',
  },
  {
    name: 'Landscaped Sector Parks & Jogging Belts',
    icon: '🌳',
    category: 'recreation',
    highlight: 'Over 30+ thematic parks, green belts, and children zones',
    description: 'Abundant lush open spaces featuring jogging and cycling tracks, open gym equipment, children playgrounds, and botanical gardens.',
  },
  {
    name: 'Sports Complex & Multi-Purpose Arenas',
    icon: '⚽',
    category: 'recreation',
    highlight: 'Floodlit cricket, futsal pitches, and swimming centers',
    description: 'Modern community recreational sports facilities catering to youth and families with dedicated sports coaching and wellness centers.',
  },
];
