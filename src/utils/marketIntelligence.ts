export interface MarketProperty {
  id: string;
  slug: string;
  title: string;
  propertyType: string;
  purpose: string;
  price: number;
  size: string;
  unit: string;
  block: string;
  bedrooms?: number | null;
  bathrooms?: number | null;
  constructionStatus?: string | null;
  lastSeenAt?: string;
  lastCheckedDate?: string;
  lastVerifiedDate?: string;
  availabilityStatus?: string;
  location: { address: string; sector?: string };
  images?: Array<{ url: string; alt?: string }>;
}

export const formatMarketPrice = (price: number) => {
  if (!price) return 'Insufficient data';
  if (price >= 10_000_000) return `PKR ${(price / 10_000_000).toFixed(2)} Crore`;
  return `PKR ${(price / 100_000).toFixed(2)} Lakh`;
};

export const averagePrice = (records: MarketProperty[]) => records.length
  ? Math.round(records.reduce((total, property) => total + property.price, 0) / records.length)
  : 0;

export const summarizeMarket = (records: MarketProperty[]) => ({
  total: records.length,
  houses: records.filter((property) => ['house', 'villa'].includes(property.propertyType)).length,
  plots: records.filter((property) => property.propertyType === 'residential-plot').length,
  commercial: records.filter((property) => property.propertyType.includes('commercial') || property.propertyType === 'shop').length,
  rentals: records.filter((property) => property.purpose === 'rent').length,
  average: averagePrice(records),
});

export const createPriceRows = (records: MarketProperty[]) => {
  const definitions = [
    { label: '5 Marla House', size: '5', unit: 'marla', types: ['house', 'villa'] },
    { label: '10 Marla House', size: '10', unit: 'marla', types: ['house', 'villa'] },
    { label: '1 Kanal House', size: '1', unit: 'kanal', types: ['house', 'villa'] },
    { label: '5 Marla Plot', size: '5', unit: 'marla', types: ['residential-plot'] },
    { label: '10 Marla Plot', size: '10', unit: 'marla', types: ['residential-plot'] },
    { label: '1 Kanal Plot', size: '1', unit: 'kanal', types: ['residential-plot'] },
  ];

  return definitions.map((definition) => {
    const matches = records.filter((property) => definition.types.includes(property.propertyType) && property.size === definition.size && property.unit.toLowerCase() === definition.unit);
    const prices = matches.map((property) => property.price).filter(Boolean).sort((a, b) => a - b);
    return {
      label: definition.label,
      count: matches.length,
      average: averagePrice(matches),
      minimum: prices[0] || 0,
      maximum: prices.at(-1) || 0,
      demand: matches.length >= 50 ? 'High' : matches.length >= 20 ? 'Moderate' : matches.length ? 'Selective' : 'Data gap',
    };
  });
};

const SECTOR_FACTORS: Record<string, { location: number; amenities: number; investment: number; trend: string }> = {
  'Sector A': { location: 91, amenities: 92, investment: 89, trend: 'Stable-positive' },
  'Sector B': { location: 88, amenities: 90, investment: 87, trend: 'Stable-positive' },
  'Sector C': { location: 86, amenities: 88, investment: 86, trend: 'Stable' },
  'Sector D': { location: 84, amenities: 84, investment: 83, trend: 'Stable' },
  'Sector E': { location: 82, amenities: 81, investment: 82, trend: 'Selective-positive' },
  'Sector F': { location: 80, amenities: 80, investment: 80, trend: 'Selective' },
  'Sector G': { location: 78, amenities: 77, investment: 79, trend: 'Selective' },
  'Sector H': { location: 81, amenities: 82, investment: 81, trend: 'Stable' },
  'Sector J': { location: 77, amenities: 78, investment: 78, trend: 'Selective' },
  'Sector K': { location: 76, amenities: 76, investment: 77, trend: 'Selective' },
  'Sector L': { location: 75, amenities: 75, investment: 76, trend: 'Emerging' },
  'Sector M': { location: 78, amenities: 76, investment: 79, trend: 'Emerging' },
  'Sector N': { location: 80, amenities: 79, investment: 82, trend: 'Emerging-positive' },
  CCA: { location: 93, amenities: 94, investment: 90, trend: 'Commercial-positive' },
  'Defence Raya': { location: 95, amenities: 95, investment: 91, trend: 'Premium-stable' },
};

export const createSectorRankings = (records: MarketProperty[]) => {
  const highestCount = Math.max(1, ...Object.keys(SECTOR_FACTORS).map((sector) => records.filter((property) => property.block.includes(sector) || property.location.sector?.includes(sector)).length));
  return Object.entries(SECTOR_FACTORS).map(([sector, factors]) => {
    const matches = records.filter((property) => property.block.includes(sector) || property.location.sector?.includes(sector));
    const demand = Math.round((matches.length / highestCount) * 100);
    const score = Math.round((factors.location + factors.amenities + factors.investment + demand) / 4);
    return { sector, ...factors, demand, score, listings: matches.length, average: averagePrice(matches) };
  }).sort((a, b) => b.score - a.score);
};
