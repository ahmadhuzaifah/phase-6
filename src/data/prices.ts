/**
 * Property Price Index & Market Trends Dataset (2026)
 * DHA Phase 6 Lahore Real Estate Authority Portal
 */

export interface PriceItem {
  id: string;
  category: 'residential-plot' | 'house' | 'commercial-plot' | 'shop';
  size: string;
  unit: string;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
  trend: 'up' | 'stable' | 'down';
  growthYoY: string;
  possessionMinPrice?: number;
  nonPossessionMinPrice?: number;
  rentalYield?: string;
  popularBlocks: string[];
  lastUpdated: string;
}

export const PROPERTY_PRICES: PriceItem[] = [
  // Residential Plots
  {
    id: 'res-5-marla',
    category: 'residential-plot',
    size: '5',
    unit: 'Marla',
    minPrice: 11000000,
    maxPrice: 16500000,
    avgPrice: 13500000,
    trend: 'up',
    growthYoY: '+12.5%',
    possessionMinPrice: 11500000,
    nonPossessionMinPrice: 11000000,
    popularBlocks: ['Sector J', 'Sector H Extensions'],
    lastUpdated: 'September 2026',
  },
  {
    id: 'res-10-marla',
    category: 'residential-plot',
    size: '10',
    unit: 'Marla',
    minPrice: 22000000,
    maxPrice: 38000000,
    avgPrice: 29500000,
    trend: 'up',
    growthYoY: '+14.2%',
    possessionMinPrice: 22500000,
    nonPossessionMinPrice: 22000000,
    popularBlocks: ['Sector H', 'Sector J', 'Sector G'],
    lastUpdated: 'September 2026',
  },
  {
    id: 'res-1-kanal',
    category: 'residential-plot',
    size: '1',
    unit: 'Kanal',
    minPrice: 42000000,
    maxPrice: 85000000,
    avgPrice: 58000000,
    trend: 'up',
    growthYoY: '+15.8%',
    possessionMinPrice: 45000000,
    nonPossessionMinPrice: 42000000,
    popularBlocks: ['Sector A', 'Sector B (Golf Facing)', 'Sector C', 'Sector D', 'Sector E', 'Sector F'],
    lastUpdated: 'September 2026',
  },
  {
    id: 'res-2-kanal',
    category: 'residential-plot',
    size: '2',
    unit: 'Kanal',
    minPrice: 95000000,
    maxPrice: 185000000,
    avgPrice: 135000000,
    trend: 'up',
    growthYoY: '+16.5%',
    possessionMinPrice: 98000000,
    nonPossessionMinPrice: 95000000,
    popularBlocks: ['Sector A', 'Sector B', 'Sector K', 'Sector M', 'Defence Raya Enclave'],
    lastUpdated: 'September 2026',
  },

  // Houses / Ready Designer Villas
  {
    id: 'house-10-marla',
    category: 'house',
    size: '10',
    unit: 'Marla',
    minPrice: 55000000,
    maxPrice: 75000000,
    avgPrice: 64000000,
    trend: 'up',
    growthYoY: '+13.5%',
    rentalYield: 'PKR 180,000 - 260,000 / mo',
    popularBlocks: ['Sector H', 'Sector J'],
    lastUpdated: 'September 2026',
  },
  {
    id: 'house-1-kanal',
    category: 'house',
    size: '1',
    unit: 'Kanal',
    minPrice: 95000000,
    maxPrice: 160000000,
    avgPrice: 125000000,
    trend: 'up',
    growthYoY: '+16.0%',
    rentalYield: 'PKR 350,000 - 550,000 / mo',
    popularBlocks: ['Sector A', 'Sector B', 'Sector C', 'Sector D'],
    lastUpdated: 'September 2026',
  },
  {
    id: 'house-2-kanal',
    category: 'house',
    size: '2',
    unit: 'Kanal',
    minPrice: 220000000,
    maxPrice: 420000000,
    avgPrice: 300000000,
    trend: 'up',
    growthYoY: '+15.2%',
    rentalYield: 'PKR 750,000 - 1,200,000 / mo',
    popularBlocks: ['Sector A', 'Defence Raya Golf Fairways', 'Sector B'],
    lastUpdated: 'September 2026',
  },

  // Commercial Plots & Broadway Properties
  {
    id: 'comm-shop-plaza',
    category: 'shop',
    size: '1',
    unit: 'Floor / Plaza Unit',
    minPrice: 22000000,
    maxPrice: 45000000,
    avgPrice: 32000000,
    trend: 'up',
    growthYoY: '+19.5%',
    rentalYield: 'PKR 120,000 - 240,000 / mo',
    popularBlocks: ['CCA-1 Commercial Broadway', 'CCA-2 Commercial'],
    lastUpdated: 'September 2026',
  },
  {
    id: 'comm-plot-4-marla',
    category: 'commercial-plot',
    size: '4',
    unit: 'Marla',
    minPrice: 135000000,
    maxPrice: 220000000,
    avgPrice: 175000000,
    trend: 'up',
    growthYoY: '+21.0%',
    popularBlocks: ['CCA-1 Commercial Broadway', 'CCA-2 Commercial Center'],
    lastUpdated: 'September 2026',
  },
  {
    id: 'comm-plot-8-marla',
    category: 'commercial-plot',
    size: '8',
    unit: 'Marla',
    minPrice: 280000000,
    maxPrice: 480000000,
    avgPrice: 360000000,
    trend: 'up',
    growthYoY: '+23.5%',
    popularBlocks: ['Phase 6 Main Boulevard Commercial Strip', 'CCA-1 Prime Frontage'],
    lastUpdated: 'September 2026',
  },
];
