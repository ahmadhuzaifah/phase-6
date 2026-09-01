/**
 * Society Development Updates & Timeline Dataset
 * Al Rehman Garden Phase 2 Lahore Authority Portal
 */

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
    quarter: 'Q3 - Q4',
    title: 'Mirabel & Beverly Hills Possession Rollout & Smart Grid',
    category: 'Possession',
    status: 'In Progress',
    summary: 'Execution of final asphalt carpeting, smart solar street lighting, and initial on-ground possession handovers in luxury sectors.',
    details: [
      'Completion of 120ft wide connecting avenue to Faizpur Motorway bypass.',
      'Underground fiber-optic grid installation across all newly demarcated residential plots.',
      'Grand inauguration of the Mirabel Central Musical Fountain Park and Sports Arena.',
      'Possession allotment letters issued for over 450 residential plot owners.',
    ],
    image: '/images/og/homepage-og.jpg',
    imageAlt: 'Mirabel Block Possession & Infrastructure Progress 2026',
  },
  {
    year: '2026',
    quarter: 'Q1 - Q2',
    title: 'Commercial Broadway Extension & RO Water Plant Upgrade',
    category: 'Commercial',
    status: 'Completed',
    summary: 'Commercial plaza construction approvals and commissioning of 3 high-capacity commercial Reverse Osmosis filtration plants.',
    details: [
      'Over 25 new multi-story commercial plazas ground-breaking along 150ft Boulevard.',
      'Installation of automated pure drinking water RO filtration plant in Sector C & D.',
      'Upgraded 24/7 CCTV surveillance network with 200+ PTZ security cameras at key junctions.',
      'Opening of second branch banking ATM center and medical emergency center.',
    ],
    image: '/images/og/property-og.jpg',
    imageAlt: 'Commercial Broadway Expansion Al Rehman Garden Phase 2',
  },
  {
    year: '2025',
    quarter: 'Q3 - Q4',
    title: 'Sector E & F Infrastructure Completion & Ready Possession',
    category: 'Infrastructure',
    status: 'Completed',
    summary: '100% completion of civic underground grid, Sui gas main pipelines, and carpeted roads in Sectors E & F.',
    details: [
      'Underground power substation energized, ensuring zero dangling overhead cables.',
      'Sui Northern Gas Pipelines Limited (SNGPL) home connection line distribution complete.',
      'Over 600 residential homes commenced construction within 6 months of handover.',
      'Inauguration of community sector park with jogging tracks and kids play zones.',
    ],
    image: '/images/placeholders/property-placeholder.webp',
    imageAlt: 'Block E and F Infrastructure Development Milestone 2025',
  },
  {
    year: '2025',
    quarter: 'Q1 - Q2',
    title: 'Grand Jamia Mosque Turkish Architecture Unveiling',
    category: 'Civic',
    status: 'Completed',
    summary: 'Grand opening of the central society mosque with 3,000+ worshipper capacity and Turkish aesthetic calligraphy.',
    details: [
      'Fully air-conditioned multi-level prayer halls with central acoustic sound engineering.',
      'Landscaped courtyard with reflective fountain pools and expansive car parking.',
      'Establishment of on-site Islamic Research Library and Quran memorization academy.',
    ],
    image: '/images/og/homepage-og.jpg',
    imageAlt: 'Grand Jamia Mosque Al Rehman Garden Phase 2',
  },
  {
    year: '2024',
    quarter: 'Full Year',
    title: 'Main Boulevard 150ft Widening & Sector A-D Maturity',
    category: 'Infrastructure',
    status: 'Completed',
    summary: 'Full maturation of Sectors A, B, C, and D with over 4,000 residing families and complete civic ecosystem.',
    details: [
      'Direct dual-carriageway connection linking entrance gate to M-2 Motorway Interchange.',
      'Establishment of The City School, departmental superstores, and hospital facilities.',
      '100% LDA masterplan compliance certification and legal title clear demarcations.',
    ],
    image: '/images/og/property-og.jpg',
    imageAlt: 'Main 150ft Boulevard Al Rehman Garden Phase 2',
  },
];
