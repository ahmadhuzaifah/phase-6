/**
 * Al Rehman Garden Phase 2 Lahore — Amenities & Infrastructure Data
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
  security: { label: 'Security & Safety', icon: '🔒' },
  healthcare: { label: 'Healthcare & Wellness', icon: '🏥' },
  education: { label: 'Education & Schools', icon: '🎓' },
  worship: { label: 'Grand Mosques', icon: '🕌' },
  recreation: { label: 'Parks & Sports', icon: '🌳' },
  shopping: { label: 'Shopping & Dining', icon: '🛒' },
  transportation: { label: 'Prime Connectivity', icon: '🚗' },
};

export const AMENITIES: Amenity[] = [
  {
    name: '24/7 Gated Security & Smart CCTV',
    icon: '🛡️',
    category: 'security',
    highlight: 'Full perimeter surveillance with trained patrol units',
    description: 'Round-the-clock gated checkpoints with biometric vehicle access and high-definition CCTV monitoring across all blocks and intersections.',
  },
  {
    name: '150ft Wide Main Boulevard & Carpeted Roads',
    icon: '🛣️',
    category: 'infrastructure',
    highlight: 'Signal-free boulevards with LED street lighting',
    description: 'Extensive road network with 150ft main entrance boulevard, 80ft sector connectors, and minimum 40ft residential paved streets.',
  },
  {
    name: 'Uninterrupted Underground Electricity & Sui Gas',
    icon: '⚡',
    category: 'infrastructure',
    highlight: '100% concealed utility grid with backup supply',
    description: 'Clean modern aesthetic with zero overhead wires. Dedicated grid station integration, Sui gas connections, and underground drainage.',
  },
  {
    name: 'Grand Jamia Mosque & Sector Mosques',
    icon: '🕌',
    category: 'worship',
    highlight: 'Central mosque with capacity for 5,000+ worshippers',
    description: 'Magnificent architectural Jamia Mosque equipped with central air conditioning, dedicated Quran academy, and sector prayer halls in every block.',
  },
  {
    name: 'Al-Rehman Hospital & 24/7 Emergency Care',
    icon: '🏥',
    category: 'healthcare',
    highlight: 'State-of-the-art medical complex and trauma center',
    description: 'Fully functional multi-specialty hospital featuring emergency wards, ICU, pharmacy, diagnostic lab, and consultant specialist clinics.',
  },
  {
    name: 'Premier Grammar School & College Campuses',
    icon: '🎓',
    category: 'education',
    highlight: 'Top-tier academic institutions inside society',
    description: 'Established branches of leading school networks offering preschool to higher secondary education within secure walking distance.',
  },
  {
    name: 'Theme Parks, Green Belts & Jogging Tracks',
    icon: '🌳',
    category: 'recreation',
    highlight: 'Over 25+ landscaped parks and family play zones',
    description: 'Dedicated sector parks with children playground equipment, paved jogging tracks, ornamental fountains, and shaded family gazebos.',
  },
  {
    name: 'Commercial Broadway & Financial Square',
    icon: '🏪',
    category: 'shopping',
    highlight: 'Commercial banks, retail marts & food brands',
    description: 'Bustling commercial centers hosting retail supermarkets, national bank branches, corporate offices, and family dining restaurants.',
  },
  {
    name: 'Modern Water Filtration Plants',
    icon: '💧',
    category: 'infrastructure',
    highlight: 'Pure reverse-osmosis drinking water for residents',
    description: 'Multiple automated RO water filtration plants installed across blocks ensuring clean, certified mineral drinking water for every household.',
  },
  {
    name: 'Sports Complex & Community Center',
    icon: '⚽',
    category: 'recreation',
    highlight: 'Cricket ground, futsal arena & indoor games',
    description: 'Modern sports facility featuring synthetic futsal turf, floodlit cricket grounds, badminton courts, gymnasium, and event banquet hall.',
  },
];
