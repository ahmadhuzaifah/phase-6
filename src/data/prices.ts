/**
 * Property Price Index & Market Trends Dataset (2026)
 * Al Rehman Garden Phase 2 Lahore Real Estate Authority Portal
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
    id: 'res-3-marla',
    category: 'residential-plot',
    size: '3',
    unit: 'Marla',
    minPrice: 2400000,
    maxPrice: 3200000,
    avgPrice: 2800000,
    trend: 'up',
    growthYoY: '+14.5%',
    possessionMinPrice: 2700000,
    nonPossessionMinPrice: 2400000,
    popularBlocks: ['Block A', 'Block C', 'Block D', 'Block E'],
    lastUpdated: 'September 2026',
  },
  {
    id: 'res-5-marla',
    category: 'residential-plot',
    size: '5',
    unit: 'Marla',
    minPrice: 4200000,
    maxPrice: 5800000,
    avgPrice: 4800000,
    trend: 'up',
    growthYoY: '+18.2%',
    possessionMinPrice: 4600000,
    nonPossessionMinPrice: 4200000,
    popularBlocks: ['Block A (Executive)', 'Block B', 'Mirabel Block', 'Block D'],
    lastUpdated: 'September 2026',
  },
  {
    id: 'res-7-marla',
    category: 'residential-plot',
    size: '7',
    unit: 'Marla',
    minPrice: 5800000,
    maxPrice: 7500000,
    avgPrice: 6600000,
    trend: 'up',
    growthYoY: '+12.8%',
    possessionMinPrice: 6200000,
    nonPossessionMinPrice: 5800000,
    popularBlocks: ['Block B', 'Block C', 'Royal Block'],
    lastUpdated: 'September 2026',
  },
  {
    id: 'res-10-marla',
    category: 'residential-plot',
    size: '10',
    unit: 'Marla',
    minPrice: 8200000,
    maxPrice: 11500000,
    avgPrice: 9500000,
    trend: 'up',
    growthYoY: '+16.4%',
    possessionMinPrice: 9000000,
    nonPossessionMinPrice: 8200000,
    popularBlocks: ['Block A', 'Block B', 'Mirabel Block', 'Beverly Hills Block'],
    lastUpdated: 'September 2026',
  },
  {
    id: 'res-1-kanal',
    category: 'residential-plot',
    size: '1',
    unit: 'Kanal',
    minPrice: 16500000,
    maxPrice: 24000000,
    avgPrice: 19500000,
    trend: 'up',
    growthYoY: '+15.0%',
    possessionMinPrice: 18500000,
    nonPossessionMinPrice: 16500000,
    popularBlocks: ['Mirabel Block (Luxury Sector)', 'Block A', 'Beverly Hills Block'],
    lastUpdated: 'September 2026',
  },

  // Houses / Ready Villas
  {
    id: 'house-3-marla',
    category: 'house',
    size: '3',
    unit: 'Marla',
    minPrice: 7800000,
    maxPrice: 9800000,
    avgPrice: 8600000,
    trend: 'up',
    growthYoY: '+13.0%',
    rentalYield: 'PKR 35,000 - 45,000 / mo',
    popularBlocks: ['Block A', 'Block B', 'Block C'],
    lastUpdated: 'September 2026',
  },
  {
    id: 'house-5-marla',
    category: 'house',
    size: '5',
    unit: 'Marla',
    minPrice: 13500000,
    maxPrice: 17500000,
    avgPrice: 15000000,
    trend: 'up',
    growthYoY: '+17.5%',
    rentalYield: 'PKR 65,000 - 85,000 / mo',
    popularBlocks: ['Block A (Executive)', 'Block B', 'Block D'],
    lastUpdated: 'September 2026',
  },
  {
    id: 'house-10-marla',
    category: 'house',
    size: '10',
    unit: 'Marla',
    minPrice: 24500000,
    maxPrice: 32000000,
    avgPrice: 28000000,
    trend: 'up',
    growthYoY: '+16.0%',
    rentalYield: 'PKR 120,000 - 160,000 / mo',
    popularBlocks: ['Block A', 'Block B', 'Mirabel Block'],
    lastUpdated: 'September 2026',
  },
  {
    id: 'house-1-kanal',
    category: 'house',
    size: '1',
    unit: 'Kanal',
    minPrice: 45000000,
    maxPrice: 65000000,
    avgPrice: 52000000,
    trend: 'up',
    growthYoY: '+14.0%',
    rentalYield: 'PKR 220,000 - 300,000 / mo',
    popularBlocks: ['Mirabel Luxury Enclave', 'Block A'],
    lastUpdated: 'September 2026',
  },

  // Commercial Plots & Shops
  {
    id: 'comm-shop-2-marla',
    category: 'shop',
    size: '2',
    unit: 'Marla',
    minPrice: 6500000,
    maxPrice: 9500000,
    avgPrice: 7800000,
    trend: 'up',
    growthYoY: '+21.0%',
    rentalYield: 'PKR 40,000 - 65,000 / mo',
    popularBlocks: ['Block C Commercial Civic Center', 'Main Boulevard'],
    lastUpdated: 'September 2026',
  },
  {
    id: 'comm-plot-4-marla',
    category: 'commercial-plot',
    size: '4',
    unit: 'Marla',
    minPrice: 15000000,
    maxPrice: 22000000,
    avgPrice: 18000000,
    trend: 'up',
    growthYoY: '+24.5%',
    popularBlocks: ['Main 150ft Broadway Boulevard', 'Block C Civic Zone'],
    lastUpdated: 'September 2026',
  },
  {
    id: 'comm-plot-8-marla',
    category: 'commercial-plot',
    size: '8',
    unit: 'Marla',
    minPrice: 29000000,
    maxPrice: 42000000,
    avgPrice: 34500000,
    trend: 'up',
    growthYoY: '+22.0%',
    popularBlocks: ['Main Entrance Commercial Strip', 'Mirabel Broadway'],
    lastUpdated: 'September 2026',
  },
];
