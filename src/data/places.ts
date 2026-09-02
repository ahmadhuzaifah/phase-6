export interface PlaceFAQ { question: string; answer: string }

export type PlaceCategory =
  | 'schools'
  | 'hospitals'
  | 'mosques'
  | 'restaurants'
  | 'shopping'
  | 'banks'
  | 'parks'
  | 'gyms'
  | 'services';

export interface PlaceItem {
  id: string;
  slug: string;
  name: string;
  category: PlaceCategory;
  categoryLabel: string;
  distance: string;
  travelTime: string;
  address: string;
  block?: string;
  description: string;
  longDescription?: string;
  features: string[];
  contact?: string;
  phone?: string;
  timings?: string;
  rating: number;
  reviewCount: number;
  lat: number;
  lng: number;
  images: string[];
  nearbyLandmarks: string[];
  faqs: PlaceFAQ[];
}

export interface PlaceCategoryMeta {
  key: PlaceCategory;
  label: string;
  icon: string;
  seoTitle: string;
  seoDesc: string;
  introText: string;
}

export const PLACE_CATEGORIES: PlaceCategoryMeta[] = [
  { key: 'schools', label: 'Schools & Education', icon: 'ED', seoTitle: 'Schools near DHA Phase 6 Lahore', seoDesc: 'Research schools and higher education around DHA Phase 6 Lahore.', introText: 'Check admissions, routes, timings and transport directly with each institution.' },
  { key: 'hospitals', label: 'Hospitals & Healthcare', icon: 'HC', seoTitle: 'Hospitals near DHA Phase 6 Lahore', seoDesc: 'Find healthcare references within and around DHA Phase 6 Lahore.', introText: 'Confirm current services, hours and emergency capability before relying on a facility.' },
  { key: 'mosques', label: 'Mosques', icon: 'MS', seoTitle: 'Mosques in DHA Phase 6 Lahore', seoDesc: 'Use the Phase VI map and local search to find sector mosques.', introText: 'Sector-level worship access should be checked from the exact property.' },
  { key: 'restaurants', label: 'Restaurants & Cafes', icon: 'FD', seoTitle: 'Restaurants in DHA Phase 6 Lahore', seoDesc: 'Explore dining areas around the CCA and Defence Raya corridor.', introText: 'Individual businesses and opening hours change, so confirm before travelling.' },
  { key: 'shopping', label: 'Shopping & Groceries', icon: 'SH', seoTitle: 'Shopping in DHA Phase 6 Lahore', seoDesc: 'Research commercial areas and everyday shopping in DHA Phase 6 Lahore.', introText: 'Compare parking, opening hours and travel time from the exact sector.' },
  { key: 'banks', label: 'Banks & ATMs', icon: 'BK', seoTitle: 'Banks and ATMs in DHA Phase 6 Lahore', seoDesc: 'Find banking services around DHA Phase 6 commercial areas.', introText: 'Branch locations and service hours should be confirmed with the bank.' },
  { key: 'parks', label: 'Parks & Recreation', icon: 'PK', seoTitle: 'Parks and recreation in DHA Phase 6 Lahore', seoDesc: 'Research sector parks, green areas and nearby recreation.', introText: 'Use the official map and a site visit to assess practical access.' },
  { key: 'gyms', label: 'Gyms & Sports', icon: 'SP', seoTitle: 'Gyms and sports near DHA Phase 6 Lahore', seoDesc: 'Research sports and fitness options around DHA Phase 6 Lahore.', introText: 'Membership, guest access and schedules can change.' },
  { key: 'services', label: 'Everyday Services', icon: 'SV', seoTitle: 'Services in DHA Phase 6 Lahore', seoDesc: 'Find fuel, pharmacy, maintenance and everyday service areas.', introText: 'Treat directory entries as location starting points and confirm providers directly.' },
];

export const PLACES_DATA: PlaceItem[] = [
  {
    id: 'lse-barki-road',
    slug: 'lahore-school-of-economics-barki-road',
    name: 'Lahore School of Economics',
    category: 'schools',
    categoryLabel: 'Higher education',
    distance: 'Near the Barki Road corridor',
    travelTime: 'Route-dependent',
    address: 'Barki Road, Lahore',
    description: 'A major higher-education reference point near the wider Phase 6 corridor.',
    longDescription: 'Use live navigation from the exact Phase 6 gate and confirm visitor, admissions and transport information directly with the institution.',
    features: ['Higher education', 'Barki Road reference', 'External institution'],
    timings: 'Confirm directly',
    rating: 0,
    reviewCount: 0,
    lat: 31.495,
    lng: 74.451,
    images: ['/images/og/blog-og.svg'],
    nearbyLandmarks: ['Barki Road', 'DHA Phase 6'],
    faqs: [{ question: 'Is travel time fixed from Phase 6?', answer: 'No. It depends on the sector, gate and traffic. Use the exact starting point.' }],
  },
  {
    id: 'dha-medical-centre-phase-6',
    slug: 'dha-medical-centre-phase-6-sector-e',
    name: 'DHA Medical Centre Phase 6',
    category: 'hospitals',
    categoryLabel: 'DHA healthcare facility',
    distance: 'Inside Phase 6',
    travelTime: 'Sector-dependent',
    address: 'Sector E, DHA Phase 6, Lahore',
    block: 'Sector E',
    description: 'DHA Lahore lists a medical centre in Phase 6 Sector E.',
    longDescription: 'The official DHA Lahore healthcare page identifies this facility. Confirm current departments, timings and emergency services directly.',
    features: ['Official DHA Lahore reference', 'Sector E', 'Medical centre'],
    timings: 'Confirm directly',
    rating: 0,
    reviewCount: 0,
    lat: 31.468,
    lng: 74.442,
    images: ['/images/og/blog-og.svg'],
    nearbyLandmarks: ['Sector E', 'Shabbir Sharif Boulevard'],
    faqs: [{ question: 'Does this directory confirm emergency services?', answer: 'No. Confirm current services and hours directly before travelling.' }],
  },
  {
    id: 'pkli-bedian-road',
    slug: 'pkli-bedian-road',
    name: 'Pakistan Kidney and Liver Institute',
    category: 'hospitals',
    categoryLabel: 'Specialist tertiary hospital',
    distance: 'Near the Bedian Road corridor',
    travelTime: 'Route-dependent',
    address: 'DHA Phase 6, Bedian Road, Lahore',
    description: 'A specialist hospital serving the wider western Lahore area.',
    longDescription: 'PKLI is a major healthcare landmark near the DHA Phase 6 corridor. Use its official channels for appointments, emergency guidance and visiting information.',
    features: ['Specialist hospital', 'Bedian Road corridor', 'External institution'],
    timings: 'Confirm directly',
    rating: 0,
    reviewCount: 0,
    lat: 31.447,
    lng: 74.438,
    images: ['/images/og/blog-og.svg'],
    nearbyLandmarks: ['Bedian Road', 'DHA Phase 6'],
    faqs: [{ question: 'Should I rely on a directory for medical emergencies?', answer: 'No. Use the hospital or emergency service official contact information.' }],
  },
  {
    id: 'phase-6-sector-mosques',
    slug: 'sector-mosques-phase-6',
    name: 'DHA Phase 6 Sector Mosques',
    category: 'mosques',
    categoryLabel: 'Worship',
    distance: 'Across residential sectors',
    travelTime: 'Street-dependent',
    address: 'DHA Phase 6, Lahore',
    description: 'Mosque and amenity plots are shown across the Phase VI plan.',
    longDescription: 'Use the official map and local navigation to identify the mosque serving a specific street. Confirm prayer and access arrangements locally.',
    features: ['Sector-level access', 'Official map reference'],
    timings: 'Confirm locally',
    rating: 0,
    reviewCount: 0,
    lat: 31.47,
    lng: 74.44,
    images: ['/images/og/homepage-og.svg'],
    nearbyLandmarks: ['Residential sectors', 'Sector parks'],
    faqs: [{ question: 'Is one mosque equally close to all properties?', answer: 'No. Check walking and driving access from the exact property.' }],
  },
  {
    id: 'raya-fairways-dining',
    slug: 'raya-fairways-commercial-dining',
    name: 'Raya Fairways Commercial Dining Area',
    category: 'restaurants',
    categoryLabel: 'Dining district',
    distance: 'Adjacent to the Phase 6 corridor',
    travelTime: 'Route-dependent',
    address: 'Defence Raya, DHA Lahore',
    description: 'A nearby commercial and dining destination with a changing mix of venues.',
    longDescription: 'Use current maps and venue pages to confirm individual restaurants, opening hours, reservations and parking.',
    features: ['Restaurants and cafes', 'Commercial district', 'Parking varies'],
    timings: 'Confirm with venue',
    rating: 0,
    reviewCount: 0,
    lat: 31.474,
    lng: 74.421,
    images: ['/images/og/homepage-og.svg'],
    nearbyLandmarks: ['Defence Raya', 'Sector A'],
    faqs: [{ question: 'Does this page list every current restaurant?', answer: 'No. Businesses change; use current local search before visiting.' }],
  },
  {
    id: 'phase-6-cca-shopping',
    slug: 'phase-6-cca-shopping',
    name: 'DHA Phase 6 CCA Shopping Areas',
    category: 'shopping',
    categoryLabel: 'Commercial areas',
    distance: 'Within Phase 6',
    travelTime: 'Sector-dependent',
    address: 'CCA areas, DHA Phase 6, Lahore',
    description: 'Designated commercial areas serving groceries, pharmacy, retail and professional services.',
    longDescription: 'The precise tenant mix changes. Inspect parking and access from the shortlisted sector and confirm individual stores before travelling.',
    features: ['Retail', 'Groceries', 'Pharmacy', 'Professional services'],
    timings: 'Varies by business',
    rating: 0,
    reviewCount: 0,
    lat: 31.47,
    lng: 74.435,
    images: ['/images/og/homepage-og.svg'],
    nearbyLandmarks: ['Shabbir Sharif Boulevard', 'Residential sectors'],
    faqs: [{ question: 'Are all shops open at the same hours?', answer: 'No. Confirm directly with the individual business.' }],
  },
  {
    id: 'phase-6-banking-cluster',
    slug: 'phase-6-banks-atms',
    name: 'DHA Phase 6 Banks and ATMs',
    category: 'banks',
    categoryLabel: 'Financial services',
    distance: 'Commercial areas',
    travelTime: 'Sector-dependent',
    address: 'CCA and Main Boulevard areas, DHA Phase 6, Lahore',
    description: 'Bank branches and ATMs are concentrated around commercial areas.',
    longDescription: 'Use each bank official locator for current branch status, services, accessibility and opening hours.',
    features: ['Bank branches', 'ATMs', 'Commercial-area access'],
    timings: 'Confirm with bank',
    rating: 0,
    reviewCount: 0,
    lat: 31.471,
    lng: 74.434,
    images: ['/images/og/property-og.svg'],
    nearbyLandmarks: ['CCA', 'Main Boulevard'],
    faqs: [{ question: 'Does the directory guarantee a branch is open?', answer: 'No. Check the bank official locator before visiting.' }],
  },
  {
    id: 'phase-6-sector-parks',
    slug: 'phase-6-sector-parks',
    name: 'DHA Phase 6 Sector Parks and Green Areas',
    category: 'parks',
    categoryLabel: 'Public open space',
    distance: 'Across residential sectors',
    travelTime: 'Street-dependent',
    address: 'DHA Phase 6, Lahore',
    description: 'Sector parks and green areas are visible across the Phase VI plan.',
    longDescription: 'A site visit is the best way to compare practical access, maintenance, activity and noise from a specific property.',
    features: ['Sector parks', 'Green areas', 'Walking access varies'],
    timings: 'Confirm locally',
    rating: 0,
    reviewCount: 0,
    lat: 31.469,
    lng: 74.439,
    images: ['/images/og/homepage-og.svg'],
    nearbyLandmarks: ['Residential sectors', 'Sector mosques'],
    faqs: [{ question: 'Does park-facing always mean the same thing?', answer: 'No. Verify the exact boundary, road and park condition on the ground.' }],
  },
  {
    id: 'defence-raya-sports',
    slug: 'defence-raya-golf-sports',
    name: 'Defence Raya Golf and Country Club',
    category: 'gyms',
    categoryLabel: 'Private recreation and sports',
    distance: 'Adjacent to Phase 6',
    travelTime: 'Route-dependent',
    address: 'Defence Raya, DHA Lahore',
    description: 'A private golf and recreation destination near the Phase 6 corridor.',
    longDescription: 'Access, membership, guest rules and facilities should be confirmed directly with the operator.',
    features: ['Golf', 'Private club', 'Membership conditions apply'],
    timings: 'Confirm directly',
    rating: 0,
    reviewCount: 0,
    lat: 31.475,
    lng: 74.419,
    images: ['/images/og/homepage-og.svg'],
    nearbyLandmarks: ['Defence Raya', 'Sector A'],
    faqs: [{ question: 'Is access public?', answer: 'Do not assume so. Confirm membership and guest rules directly.' }],
  },
  {
    id: 'phase-6-everyday-services',
    slug: 'phase-6-everyday-services',
    name: 'Phase 6 Everyday Services',
    category: 'services',
    categoryLabel: 'Fuel, pharmacy and maintenance',
    distance: 'Commercial and road corridors',
    travelTime: 'Sector-dependent',
    address: 'DHA Phase 6 and surrounding roads, Lahore',
    description: 'Everyday services are available around the commercial areas and principal road corridors.',
    longDescription: 'Provider details change frequently. Use current maps, official business pages and direct confirmation.',
    features: ['Fuel', 'Pharmacy', 'Vehicle services', 'Home maintenance'],
    timings: 'Varies by provider',
    rating: 0,
    reviewCount: 0,
    lat: 31.466,
    lng: 74.44,
    images: ['/images/og/property-og.svg'],
    nearbyLandmarks: ['Main Boulevard', 'Bedian Road', 'Barki Road'],
    faqs: [{ question: 'Are providers verified by this portal?', answer: 'No. Directory entries are research starting points, not endorsements.' }],
  },
];
