import type { PlaceCategory, PlaceCategoryMeta } from '../places';
import { PLACE_CATEGORIES } from '../places';

import sectorA from './sector-a.json';
import sectorB from './sector-b.json';
import sectorC from './sector-c.json';
import sectorD from './sector-d.json';
import sectorE from './sector-e.json';
import sectorF from './sector-f.json';
import sectorG from './sector-g.json';
import sectorH from './sector-h.json';
import sectorJ from './sector-j.json';
import sectorK from './sector-k.json';
import sectorL from './sector-l.json';
import sectorM from './sector-m.json';
import sectorN from './sector-n.json';
import cca from './cca.json';
import mainBlvd from './main-boulevard-commercial.json';
import rayaComm from './raya-commercial.json';
import defRaya from './defence-raya.json';

export interface PlaceRecord {
  id: string;
  slug: string;
  name: string;
  sector: string;
  sectorLabel: string;
  category: PlaceCategory | string;
  categoryLabel: string;
  rating: number | null;
  reviewCount: number;
  address: string;
  phone: string | null;
  status: string;
  image: string | null;
  googleMapsUrl: string;
  sourceQuery: string;
  retrievedAt: string;
  lat: number;
  lng: number;
  description: string;
  features: string[];
  website: string | null;
}

export interface SectorMeta {
  key: string;
  label: string;
  type: 'residential' | 'commercial';
  description: string;
  lat: number;
  lng: number;
}

export const SECTORS_DIRECTORY: SectorMeta[] = [
  { key: 'sector-a', label: 'Sector A', type: 'residential', description: 'Located on the western entrance of DHA Phase 6 Lahore, Sector A offers prime residential plots, grand sector mosques, and quick access to Bedian Road and Dolmen Mall.', lat: 31.4740, lng: 74.4370 },
  { key: 'sector-b', label: 'Sector B', type: 'residential', description: 'North-western sector of Phase 6 featuring luxury 1 and 2 Kanal residential properties, prestigious private schools, and bustling commercial plazas on Shabbir Sharif Road.', lat: 31.4795, lng: 74.4390 },
  { key: 'sector-c', label: 'Sector C', type: 'residential', description: 'Central-western sector renowned for its Grand Jamia Masjid, popular artisan cafes, family recreation parks, and community markets.', lat: 31.4760, lng: 74.4460 },
  { key: 'sector-d', label: 'Sector D', type: 'residential', description: 'Highly sought-after central sector home to Beaconhouse School System, Defence C Police Station, sports gyms, and manicured green parks.', lat: 31.4720, lng: 74.4520 },
  { key: 'sector-e', label: 'Sector E', type: 'residential', description: 'Southern sector hosting the primary DHA Phase 6 Medical Centre, primary care dispensaries, family parks, and residential boulevards.', lat: 31.4670, lng: 74.4500 },
  { key: 'sector-f', label: 'Sector F', type: 'residential', description: 'Distinguished 1 and 2 Kanal sector featuring Captain Fasih Babar Amin Shaheed Sports Complex, green parks, and food lounges.', lat: 31.4630, lng: 74.4560 },
  { key: 'sector-g', label: 'Sector G', type: 'residential', description: 'South-eastern sector linking toward Bedian Road, featuring grand mosques, diagnostic labs, community marts, and sports grounds.', lat: 31.4600, lng: 74.4640 },
  { key: 'sector-h', label: 'Sector H', type: 'residential', description: 'Vibrant sector boasting one of Phase 6’s largest central parks (800m jogging track), commercial banking hubs, and fast food dining.', lat: 31.4690, lng: 74.4650 },
  { key: 'sector-j', label: 'Sector J', type: 'residential', description: 'Eastern residential sector with higher education campuses (LGU, TMUC), Pakistan Post Office, Bank of Punjab, and fiber internet infrastructure.', lat: 31.4735, lng: 74.4710 },
  { key: 'sector-k', label: 'Sector K', type: 'residential', description: 'Tranquil luxury residential zone characterized by wide roads, serene neighbourhood parks, fitness clubs, and pharmacies.', lat: 31.4650, lng: 74.4740 },
  { key: 'sector-l', label: 'Sector L', type: 'residential', description: 'Eastern sector positioned near regional access routes, featuring Army Public School (APS), linear jogging parks, and Askari Bank.', lat: 31.4680, lng: 74.4820 },
  { key: 'sector-m', label: 'Sector M', type: 'residential', description: 'North-eastern sector close to Barki Road, featuring Future World School & College, green spaces, and courier hubs.', lat: 31.4780, lng: 74.4840 },
  { key: 'sector-n', label: 'Sector N', type: 'residential', description: 'Northern sector home to the landmark PKLI Hospital research complex, luxury hotels, and immediate walking proximity to Defence Raya.', lat: 31.4870, lng: 74.4810 },
  { key: 'cca', label: 'CCA Commercial Area', type: 'commercial', description: 'The central commercial heart of DHA Phase 6 (CCA 1 & CCA 2) with major bank branches, 24/7 pharmacies, Jalal Sons, and international restaurants.', lat: 31.4715, lng: 74.4600 },
  { key: 'main-boulevard-commercial', label: 'Main Boulevard Commercial', type: 'commercial', description: 'High-traffic commercial boulevard featuring Dolmen Mall Lahore, Carrefour, DHA Lahore Head Office, fuel stations, and drive-thrus.', lat: 31.4730, lng: 74.4510 },
  { key: 'raya-commercial', label: 'Raya Commercial', type: 'commercial', description: 'Fairways Commercial promenade at Defence Raya overlooking the golf course, featuring upscale cafes, designer boutiques, and fine dining.', lat: 31.4900, lng: 74.4760 },
  { key: 'defence-raya', label: 'Defence Raya', type: 'commercial', description: 'Premier 18-hole championship golf course and resort club with Olympic swimming, wellness spa, banquet facilities, and golf academy.', lat: 31.4925, lng: 74.4780 },
];

const SECTOR_DATA_MAP: Record<string, PlaceRecord[]> = {
  'sector-a': sectorA as PlaceRecord[],
  'sector-b': sectorB as PlaceRecord[],
  'sector-c': sectorC as PlaceRecord[],
  'sector-d': sectorD as PlaceRecord[],
  'sector-e': sectorE as PlaceRecord[],
  'sector-f': sectorF as PlaceRecord[],
  'sector-g': sectorG as PlaceRecord[],
  'sector-h': sectorH as PlaceRecord[],
  'sector-j': sectorJ as PlaceRecord[],
  'sector-k': sectorK as PlaceRecord[],
  'sector-l': sectorL as PlaceRecord[],
  'sector-m': sectorM as PlaceRecord[],
  'sector-n': sectorN as PlaceRecord[],
  'cca': cca as PlaceRecord[],
  'main-boulevard-commercial': mainBlvd as PlaceRecord[],
  'raya-commercial': rayaComm as PlaceRecord[],
  'defence-raya': defRaya as PlaceRecord[],
};

export const ALL_SECTOR_PLACES: PlaceRecord[] = Object.values(SECTOR_DATA_MAP).flat();

export function getAllPlaces(): PlaceRecord[] {
  return ALL_SECTOR_PLACES;
}

export function getSectorPlaces(sectorKey: string): PlaceRecord[] {
  return SECTOR_DATA_MAP[sectorKey] || [];
}

export function getCategoryPlaces(categoryKey: string): PlaceRecord[] {
  return ALL_SECTOR_PLACES.filter((p) => p.category === categoryKey);
}

export function getSectorCategoryPlaces(sectorKey: string, categoryKey: string): PlaceRecord[] {
  const sectorPlaces = getSectorPlaces(sectorKey);
  return sectorPlaces.filter((p) => p.category === categoryKey);
}

export function getPlaceBySlug(categoryKey: string, slug: string): PlaceRecord | undefined {
  return ALL_SECTOR_PLACES.find((p) => p.category === categoryKey && p.slug === slug);
}

export function getSectorMeta(sectorKey: string): SectorMeta | undefined {
  return SECTORS_DIRECTORY.find((s) => s.key === sectorKey);
}

export function getCategoryMeta(categoryKey: string): PlaceCategoryMeta | undefined {
  return PLACE_CATEGORIES.find((c) => c.key === categoryKey);
}

export { PLACE_CATEGORIES };
