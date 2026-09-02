export interface PlaceFAQ {
  question: string;
  answer: string;
}

export type PlaceCategory =
  | 'bakery'
  | 'banks'
  | 'beauty-salons'
  | 'cafes'
  | 'central-park'
  | 'cinema'
  | 'clinic'
  | 'club'
  | 'colleges'
  | 'courier-services'
  | 'dispensary'
  | 'fast-food'
  | 'flower-shop'
  | 'food-delivery'
  | 'guest-house'
  | 'gym'
  | 'gyms'
  | 'hospital'
  | 'hospitals'
  | 'hostels'
  | 'hot-n-spicy'
  | 'hotel'
  | 'hyperstar'
  | 'idc'
  | 'imtiaz'
  | 'internet-providers'
  | 'jamil-sweets'
  | 'japan-electronics'
  | 'kfc'
  | 'laundry'
  | 'mcdonalds'
  | 'mosque'
  | 'mosques'
  | 'optp'
  | 'park'
  | 'parks'
  | 'pharmacy'
  | 'pizza-hut'
  | 'police-station'
  | 'post-office'
  | 'restaurants'
  | 'schools'
  | 'services'
  | 'shopping'
  | 'subway'
  | 'supermarkets'
  | 'union-council';

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
  { key: 'bakery', label: 'Bakery', icon: 'BK', seoTitle: 'Bakery in DHA Phase 6 Lahore', seoDesc: 'Explore bakeries, cake shops, desserts, and fresh bread in DHA Phase 6 Lahore.', introText: 'Find fresh baked goods, cakes, pastries, and artisanal breads across Phase 6 commercial zones.' },
  { key: 'banks', label: 'Banks', icon: 'BN', seoTitle: 'Banks in DHA Phase 6 Lahore', seoDesc: 'Explore bank branches, ATMs, HBL, UBL, MCB, Allied Bank, Askari Bank, Bank Alfalah, and Meezan Bank in DHA Phase 6 Lahore.', introText: 'Comprehensive guide to commercial bank branches, digital ATMs, and financial services in DHA Phase 6.' },
  { key: 'beauty-salons', label: 'Beauty Salons', icon: 'BS', seoTitle: 'Beauty Salons in DHA Phase 6 Lahore', seoDesc: 'Explore beauty salons, hair studios, spas, and grooming services in DHA Phase 6 Lahore.', introText: 'Find premium hair styling, facial care, bridal makeup, and grooming salons in CCA 1 & CCA 2.' },
  { key: 'cafes', label: 'Cafes', icon: 'CF', seoTitle: 'Cafes in DHA Phase 6 Lahore', seoDesc: 'Explore coffee shops, tea spots, bakeries, and casual meeting places in DHA Phase 6 Lahore.', introText: 'Discover specialty coffee, artisan teas, snacks, and outdoor seating cafes in Phase 6.' },
  { key: 'central-park', label: 'Central Park', icon: 'CP', seoTitle: 'Central Park in DHA Phase 6 Lahore', seoDesc: 'Explore Central Park access, recreation, walking, and family activities in DHA Phase 6 Lahore.', introText: 'Guide to Phase 6 Central Park jogging tracks, children play grounds, and green spaces.' },
  { key: 'cinema', label: 'Cinema', icon: 'CN', seoTitle: 'Cinema in DHA Phase 6 Lahore', seoDesc: 'Explore cinemas, movie schedules, and nearby entertainment options in DHA Phase 6 Lahore.', introText: 'Movie theaters, IMAX screens, and multiplex entertainment options around DHA Phase 6.' },
  { key: 'clinic', label: 'Clinic', icon: 'CL', seoTitle: 'Clinic in DHA Phase 6 Lahore', seoDesc: 'Explore local clinics, specialist practices, and outpatient care options in DHA Phase 6 Lahore.', introText: 'Find general physicians, dental clinics, pediatric specialists, and diagnostic centers.' },
  { key: 'club', label: 'Club', icon: 'CB', seoTitle: 'Club in DHA Phase 6 Lahore', seoDesc: 'Explore Defence Raya Golf & Country Club, social clubs, and membership-based recreation options in DHA Phase 6 Lahore.', introText: 'Explore premier 18-hole golf, swimming, dining, and resort facilities at Defence Raya.' },
  { key: 'colleges', label: 'Colleges', icon: 'CG', seoTitle: 'Colleges in DHA Phase 6 Lahore', seoDesc: 'Explore colleges, universities, higher education, Army Public School, APSACS, and degree programs in DHA Phase 6 Lahore.', introText: 'Intermediate, undergraduate, and professional higher education institutions in and around Phase 6.' },
  { key: 'courier-services', label: 'Courier Services', icon: 'CS', seoTitle: 'Courier Services in DHA Phase 6 Lahore', seoDesc: 'Explore TCS, Leopard, M&P courier branches, parcel booking, tracking, and delivery services in DHA Phase 6 Lahore.', introText: 'Domestic and international parcel dispatch, express mail, and freight booking offices.' },
  { key: 'dispensary', label: 'Dispensary', icon: 'DP', seoTitle: 'Dispensary in DHA Phase 6 Lahore', seoDesc: 'Explore dispensaries and primary healthcare services in DHA Phase 6 Lahore.', introText: 'Primary healthcare dispensaries and emergency basic medical consultation.' },
  { key: 'fast-food', label: 'Fast Food', icon: 'FF', seoTitle: 'Fast Food in DHA Phase 6 Lahore', seoDesc: 'Explore fast-food restaurants, takeaways, and quick delivery options in DHA Phase 6 Lahore.', introText: 'Burgers, fried chicken, wraps, and quick meal outlets across commercial sectors.' },
  { key: 'flower-shop', label: 'Flower Shop', icon: 'FS', seoTitle: 'Flower Shop in DHA Phase 6 Lahore', seoDesc: 'Explore florists offering bouquets, gifts, and event arrangements in DHA Phase 6 Lahore.', introText: 'Fresh flower arrangements, wedding decor, and gift delivery in Phase 6.' },
  { key: 'food-delivery', label: 'Food Delivery', icon: 'FD', seoTitle: 'Food Delivery in DHA Phase 6 Lahore', seoDesc: 'Explore restaurants and services delivering food to the area in DHA Phase 6 Lahore.', introText: 'Foodpanda, direct restaurant takeaway, and home delivery services.' },
  { key: 'guest-house', label: 'Guest House', icon: 'GH', seoTitle: 'Guest House in DHA Phase 6 Lahore', seoDesc: 'Explore short-stay guest houses and furnished accommodation in DHA Phase 6 Lahore.', introText: 'Executive guest rooms, boutique lodges, and short-term stay options.' },
  { key: 'gym', label: 'Gym', icon: 'GM', seoTitle: 'Gym in DHA Phase 6 Lahore', seoDesc: 'Explore fitness centres, gyms, trainers, and workout facilities in DHA Phase 6 Lahore.', introText: 'Modern fitness centers, weight training, cardio, and personal fitness coaching.' },
  { key: 'gyms', label: 'Gyms', icon: 'GM', seoTitle: 'Gyms in DHA Phase 6 Lahore', seoDesc: 'Explore gyms and sports facilities in DHA Phase 6 Lahore.', introText: 'Health clubs, personal training studios, and sports complexes.' },
  { key: 'hospital', label: 'Hospital', icon: 'HP', seoTitle: 'Hospital in DHA Phase 6 Lahore', seoDesc: 'Explore hospitals, emergency care, PKLI, and specialist medical facilities in DHA Phase 6 Lahore.', introText: 'Multi-specialty hospitals, emergency medical centers, and surgical facilities.' },
  { key: 'hospitals', label: 'Hospitals', icon: 'HP', seoTitle: 'Hospitals in DHA Phase 6 Lahore', seoDesc: 'Explore hospitals and healthcare facilities near DHA Phase 6 Lahore.', introText: 'Comprehensive healthcare directory including PKLI and DHA Medical Centre.' },
  { key: 'hostels', label: 'Hostels', icon: 'HT', seoTitle: 'Hostels in DHA Phase 6 Lahore', seoDesc: 'Explore hostels and budget long-stay accommodation in DHA Phase 6 Lahore.', introText: 'Student and executive hostel facilities near main boulevards.' },
  { key: 'hot-n-spicy', label: 'Hot N Spicy', icon: 'HS', seoTitle: 'Hot N Spicy in DHA Phase 6 Lahore', seoDesc: 'Explore Hot N Spicy branches, menus, takeaway, and food delivery options in DHA Phase 6 Lahore.', introText: 'Barbecue, paratha rolls, and fast food dining options.' },
  { key: 'hotel', label: 'Hotel', icon: 'HL', seoTitle: 'Hotel in DHA Phase 6 Lahore', seoDesc: 'Explore hotels and serviced accommodation for short stays in DHA Phase 6 Lahore.', introText: 'Luxury suite hotels, executive rooms, and corporate lodging.' },
  { key: 'hyperstar', label: 'Hyperstar & Carrefour', icon: 'HS', seoTitle: 'Hyperstar & Carrefour in DHA Phase 6 Lahore', seoDesc: 'Explore Carrefour, hypermarket access, bulk grocery shopping, and retail stores in DHA Phase 6 Lahore.', introText: 'Hypermarket grocery, household electronics, and department store shopping.' },
  { key: 'idc', label: 'IDC & Diagnostic Labs', icon: 'ID', seoTitle: 'IDC & Diagnostic Labs in DHA Phase 6 Lahore', seoDesc: 'Explore Chughtai Lab, IDC branches, and diagnostic services in DHA Phase 6 Lahore.', introText: 'Blood tests, MRI, CT Scan, X-ray, and pathology laboratory services.' },
  { key: 'imtiaz', label: 'Imtiaz Super Market', icon: 'IZ', seoTitle: 'Imtiaz Super Market in DHA Phase 6 Lahore', seoDesc: 'Explore Imtiaz Mega Store access, groceries, and household shopping in DHA Phase 6 Lahore.', introText: 'Discount grocery shopping, wholesale household goods, and fresh produce.' },
  { key: 'internet-providers', label: 'Internet Providers', icon: 'IP', seoTitle: 'Internet Providers in DHA Phase 6 Lahore', seoDesc: 'Explore internet service providers, fiber optic connections, exchanges, and customer support locations in DHA Phase 6 Lahore.', introText: 'FTTH fiber broadband, StormFiber, Transworld, PTCL Flash Fiber, and Nayatel offices.' },
  { key: 'jamil-sweets', label: 'Jamil Sweets', icon: 'JS', seoTitle: 'Jamil Sweets in DHA Phase 6 Lahore', seoDesc: 'Explore Jamil Sweets access, bakery products, and traditional sweets in DHA Phase 6 Lahore.', introText: 'Traditional Pakistani mithai, halwa puri breakfast, and fresh bakery items.' },
  { key: 'japan-electronics', label: 'Japan Electronics', icon: 'JE', seoTitle: 'Japan Electronics in DHA Phase 6 Lahore', seoDesc: 'Explore Japan Electronics access and nearby electronics shopping in DHA Phase 6 Lahore.', introText: 'Home appliances, smart TVs, refrigerators, and air conditioning showrooms.' },
  { key: 'kfc', label: 'KFC', icon: 'KC', seoTitle: 'KFC in DHA Phase 6 Lahore', seoDesc: 'Explore KFC branches, menus, takeaway, and food delivery options in DHA Phase 6 Lahore.', introText: 'Crispy fried chicken, burgers, family buckets, and drive-thru service.' },
  { key: 'laundry', label: 'Laundry', icon: 'LD', seoTitle: 'Laundry in DHA Phase 6 Lahore', seoDesc: 'Explore laundry services, dry cleaning, ironing, and garment care in DHA Phase 6 Lahore.', introText: 'Dry cleaning, steam pressing, and express laundry services.' },
  { key: 'mcdonalds', label: "McDonald's", icon: 'MD', seoTitle: "McDonald's in DHA Phase 6 Lahore", seoDesc: "Explore McDonald's branches, menus, takeaway, and food delivery options in DHA Phase 6 Lahore.", introText: "Burgers, fries, McCafé coffee, drive-thru, and 24/7 delivery." },
  { key: 'mosque', label: 'Mosque', icon: 'MQ', seoTitle: 'Mosque in DHA Phase 6 Lahore', seoDesc: 'Explore mosques, prayer facilities, and community worship spaces in DHA Phase 6 Lahore.', introText: 'Grand Jamia mosques and sector prayer halls with parking and ablution areas.' },
  { key: 'mosques', label: 'Mosques', icon: 'MQ', seoTitle: 'Mosques in DHA Phase 6 Lahore', seoDesc: 'Explore mosques across all sectors of DHA Phase 6 Lahore.', introText: 'Detailed directory of sector mosques and central Jamia mosques.' },
  { key: 'optp', label: 'OPTP', icon: 'OP', seoTitle: 'OPTP in DHA Phase 6 Lahore', seoDesc: 'Explore OPTP access, takeaway, and food delivery options in DHA Phase 6 Lahore.', introText: 'Belgian fries, gourmet burgers, and southern fried chicken.' },
  { key: 'park', label: 'Park', icon: 'PK', seoTitle: 'Park in DHA Phase 6 Lahore', seoDesc: 'Explore parks, playgrounds, walking areas, and green spaces in DHA Phase 6 Lahore.', introText: 'Neighborhood sector parks, children play areas, and landscaped gardens.' },
  { key: 'parks', label: 'Parks', icon: 'PK', seoTitle: 'Parks in DHA Phase 6 Lahore', seoDesc: 'Explore sector parks and recreational green areas in DHA Phase 6 Lahore.', introText: 'Green open spaces, walking tracks, and family parks.' },
  { key: 'pharmacy', label: 'Pharmacy', icon: 'PH', seoTitle: 'Pharmacy in DHA Phase 6 Lahore', seoDesc: "Explore pharmacies, medicine delivery, Fazal Din's, and health supplies in DHA Phase 6 Lahore.", introText: "24/7 pharmacies, prescription medicines, surgical items, and baby care products." },
  { key: 'pizza-hut', label: 'Pizza Hut', icon: 'PH', seoTitle: 'Pizza Hut in DHA Phase 6 Lahore', seoDesc: 'Explore Pizza Hut branches, menus, pizza delivery, Pizza Inn, and pizza restaurants in DHA Phase 6 Lahore.', introText: 'Pan pizzas, pasta, garlic bread, and family deals.' },
  { key: 'police-station', label: 'Police Station', icon: 'PS', seoTitle: 'Police Station in DHA Phase 6 Lahore', seoDesc: 'Explore police stations, public safety contacts, and reporting guidance in DHA Phase 6 Lahore.', introText: 'DHA Police Station, Punjab Police Khidmat Markaz, and security checkposts.' },
  { key: 'post-office', label: 'Post Office', icon: 'PO', seoTitle: 'Post Office in DHA Phase 6 Lahore', seoDesc: 'Explore post offices, mail, parcel, and courier services in DHA Phase 6 Lahore.', introText: 'Pakistan Post office branches, postal code inquiries, and registered mail.' },
  { key: 'restaurants', label: 'Restaurants', icon: 'RT', seoTitle: 'Restaurants in DHA Phase 6 Lahore', seoDesc: 'Explore restaurants, fine dining, cafes, takeaways, and local cuisine in DHA Phase 6 Lahore.', introText: 'Fine dining, Desi BBQ, Continental, Asian fusion, and fast food dining.' },
  { key: 'schools', label: 'Schools', icon: 'SC', seoTitle: 'Schools in DHA Phase 6 Lahore', seoDesc: 'Explore schools, colleges, academies, and education services in DHA Phase 6 Lahore.', introText: 'Beaconhouse, City School, Roots International, LGS, and preschools.' },
  { key: 'services', label: 'Services', icon: 'SV', seoTitle: 'Services in DHA Phase 6 Lahore', seoDesc: 'Find fuel, pharmacy, maintenance and everyday service areas in DHA Phase 6 Lahore.', introText: 'Car wash, electric repairs, plumbing, keys, and home maintenance.' },
  { key: 'shopping', label: 'Shopping', icon: 'SP', seoTitle: 'Shopping in DHA Phase 6 Lahore', seoDesc: 'Research commercial areas and everyday shopping in DHA Phase 6 Lahore.', introText: 'Clothing boutiques, footwear, electronics, and commercial plazas in CCA 1 & 2.' },
  { key: 'subway', label: 'Subway', icon: 'SW', seoTitle: 'Subway in DHA Phase 6 Lahore', seoDesc: 'Explore Subway branches, menus, takeaway, and food delivery options in DHA Phase 6 Lahore.', introText: 'Fresh submarine sandwiches, salads, cookies, and catering.' },
  { key: 'supermarkets', label: 'Supermarkets', icon: 'SM', seoTitle: 'Supermarkets in DHA Phase 6 Lahore', seoDesc: 'Explore supermarkets, grocery stores, and household shopping in DHA Phase 6 Lahore.', introText: 'Imtiaz, Al-Fatah, Jalal Sons, and neighborhood grocery stores.' },
  { key: 'union-council', label: 'Union Council', icon: 'UC', seoTitle: 'Union Council in DHA Phase 6 Lahore', seoDesc: 'Explore Union Council information and local civic services in DHA Phase 6 Lahore.', introText: 'Municipal birth/death certificates, domicile assistance, and civic registration.' }
];

export const PLACES_DATA: PlaceItem[] = [
  {
    id: 'defence-raya-golf-club',
    slug: 'defence-raya-golf-and-country-club',
    name: 'Defence Raya Golf & Country Club',
    category: 'club',
    categoryLabel: 'Golf & Country Club',
    distance: 'Sector N, Phase 6',
    travelTime: '3 mins from Main Boulevard',
    address: 'Sector N, DHA Phase 6, Lahore',
    block: 'Sector N',
    description: 'Premier 18-hole championship golf course, luxury resort club, fine dining restaurants, swimming pool, and banquet facilities.',
    longDescription: 'Defence Raya Golf & Country Club is an exclusive international-standard 18-hole golf resort developed jointly by DHA Lahore and BRDB. It features fine dining restaurants, heated indoor pools, squash courts, luxury guest suites, and conference halls.',
    features: ['18-Hole Championship Golf Course', 'Luxury Guest Suites', 'Heated Indoor Swimming Pool', 'Fine Dining Restaurants', 'Banquet & Event Halls'],
    contact: '+92-42-37338500',
    phone: '+92-42-37338500',
    timings: '6:00 AM - 11:00 PM',
    rating: 4.8,
    reviewCount: 1420,
    lat: 31.468,
    lng: 74.456,
    images: ['/images/og/blog-og.svg'],
    nearbyLandmarks: ['Main Boulevard Phase 6', 'Sector N Commercial'],
    faqs: [
      { question: 'Where is Defence Raya located?', answer: 'Defence Raya is located in Sector N, DHA Phase 6, Lahore along the main boulevard.' },
      { question: 'Is membership required for golf access?', answer: 'Yes, golf course and club facilities require membership or member guest affiliation.' }
    ]
  },
  {
    id: 'pkli-lahore',
    slug: 'pkli-pakistan-kidney-and-liver-institute',
    name: 'Pakistan Kidney and Liver Institute (PKLI)',
    category: 'hospital',
    categoryLabel: 'Specialty Hospital',
    distance: 'Knowledge Park / Phase 6 Corridor',
    travelTime: '5 mins from Phase 6 Gate',
    address: 'Knowledge Park, Bedian Road near Phase 6, Lahore',
    description: 'State-of-the-art tertiary care hospital specializing in nephrology, urology, hepatology, and liver transplant surgery.',
    longDescription: 'PKLI is Pakistan’s leading specialized center for organ transplantation, kidney care, liver surgery, and advanced diagnostic healthcare.',
    features: ['24/7 Emergency Care', 'Liver & Kidney Transplantation', 'Advanced ICU & Dialysis Center', 'Outpatient Clinics'],
    contact: '+92-42-111-117-554',
    phone: '+92-42-111-117-554',
    timings: '24/7 Emergency & Inpatient',
    rating: 4.7,
    reviewCount: 980,
    lat: 31.478,
    lng: 74.462,
    images: ['/images/og/blog-og.svg'],
    nearbyLandmarks: ['Bedian Road', 'Phase 6 Sector A'],
    faqs: [
      { question: 'Is PKLI accessible from DHA Phase 6?', answer: 'Yes, PKLI is located directly off the Bedian Road / Phase 6 entrance corridor.' }
    ]
  },
  {
    id: 'meezan-bank-cca1',
    slug: 'meezan-bank-cca-1-phase-6',
    name: 'Meezan Bank - Main Commercial Branch',
    category: 'banks',
    categoryLabel: 'Islamic Banking',
    distance: 'CCA 1, Sector C',
    travelTime: 'Central location',
    address: 'CCA 1, Sector C, DHA Phase 6, Lahore',
    block: 'Sector C',
    description: 'Full-service Islamic banking branch with 24/7 ATM, priority banking, lockers, and commercial finance counter.',
    features: ['24/7 Cash Deposit & ATM', 'Islamic Banking Services', 'Safety Deposit Lockers', 'Drive-Thru ATM'],
    timings: '9:00 AM - 5:00 PM (Mon-Fri)',
    rating: 4.5,
    reviewCount: 310,
    lat: 31.472,
    lng: 74.451,
    images: ['/images/og/blog-og.svg'],
    nearbyLandmarks: ['CCA 1 Main Commercial Plaza'],
    faqs: [
      { question: 'Are ATMs available 24/7?', answer: 'Yes, Meezan Bank CCA 1 has 24/7 dual cash withdrawal and cash deposit ATMs.' }
    ]
  },
  {
    id: 'jalal-sons-cca2',
    slug: 'jalal-sons-cca-2-phase-6',
    name: 'Jalal Sons Supermarket & Bakery',
    category: 'bakery',
    categoryLabel: 'Bakery & Supermarket',
    distance: 'CCA 2, Sector J',
    travelTime: '2 mins from Ring Road Interchange',
    address: 'CCA 2, Sector J, DHA Phase 6, Lahore',
    block: 'Sector J',
    description: 'Premier grocery store, artisan bakery, live pizza counter, fresh deli, and coffee bar in Phase 6 CCA 2.',
    features: ['Fresh Bakery & Cakes', 'Live Pizza & Burger Bar', 'Imported Groceries & Meat', 'Coffee & Desserts'],
    timings: '8:00 AM - 1:00 AM Daily',
    rating: 4.6,
    reviewCount: 1850,
    lat: 31.471,
    lng: 74.448,
    images: ['/images/og/blog-og.svg'],
    nearbyLandmarks: ['Sector J CCA 2'],
    faqs: [
      { question: 'Does Jalal Sons offer fresh cakes and pizza?', answer: 'Yes, Jalal Sons CCA 2 features a full live bakery, dessert display, and fresh pizza counter.' }
    ]
  },
  {
    id: 'beaconhouse-phase-6',
    slug: 'beaconhouse-school-system-phase-6',
    name: 'Beaconhouse School System',
    category: 'schools',
    categoryLabel: 'Private School',
    distance: 'Sector Primary Campus',
    travelTime: 'Convenient sector access',
    address: 'Sector A, DHA Phase 6, Lahore',
    block: 'Sector A',
    description: 'Leading international standard educational institution offering Cambridge O & A Levels and primary schooling.',
    features: ['Cambridge O & A Levels', 'Science & Robotics Labs', 'Sports Ground & Basketball Court', 'Air-Conditioned Classrooms'],
    timings: '7:30 AM - 2:00 PM (Mon-Fri)',
    rating: 4.6,
    reviewCount: 420,
    lat: 31.475,
    lng: 74.45,
    images: ['/images/og/blog-og.svg'],
    nearbyLandmarks: ['Main Boulevard Phase 6'],
    faqs: [
      { question: 'What levels are taught at Beaconhouse Phase 6?', answer: 'The campus offers primary, middle, and Cambridge O/A level curriculum.' }
    ]
  },
  {
    id: 'jamia-mosque-sector-c',
    slug: 'jamia-mosque-sector-c-phase-6',
    name: 'Sector C Grand Jamia Mosque',
    category: 'mosque',
    categoryLabel: 'Grand Mosque',
    distance: 'Sector C Central',
    travelTime: 'Central location',
    address: 'Sector C Central Park Avenue, DHA Phase 6, Lahore',
    block: 'Sector C',
    description: 'Beautifully designed grand mosque featuring central air conditioning, dedicated ladies prayer section, spacious courtyard, and parking.',
    features: ['Air-Conditioned Prayer Halls', 'Dedicated Ladies Prayer Space', 'Spacious Wudu Facilities', 'Jumma & Eid Congregations'],
    timings: 'Open for all 5 daily prayers',
    rating: 4.9,
    reviewCount: 650,
    lat: 31.473,
    lng: 74.452,
    images: ['/images/og/blog-og.svg'],
    nearbyLandmarks: ['Sector C Park'],
    faqs: [
      { question: 'Is there a ladies prayer facility available?', answer: 'Yes, Sector C Jamia Mosque provides a dedicated, air-conditioned entrance and prayer room for women.' }
    ]
  }
];
