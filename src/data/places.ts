/**
 * Places & Local Amenities Directory Master Dataset
 * DHA Phase 6 Lahore Authority Portal
 */

export interface PlaceFAQ {
  question: string;
  answer: string;
}

export interface PlaceItem {
  id: string;
  slug: string;
  name: string;
  category:
    | 'schools'
    | 'hospitals'
    | 'mosques'
    | 'restaurants'
    | 'shopping'
    | 'banks'
    | 'petrol-stations'
    | 'parks'
    | 'gyms'
    | 'hotels';
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
  key: PlaceItem['category'];
  label: string;
  icon: string;
  seoTitle: string;
  seoDesc: string;
  introText: string;
}

export const PLACE_CATEGORIES: PlaceCategoryMeta[] = [
  {
    key: 'schools',
    label: 'Schools & Academies',
    icon: '🏫',
    seoTitle: 'Top Schools in DHA Phase 6 Lahore | International Campuses & Academies',
    seoDesc: 'Explore premier Cambridge O/A Levels, IB, and top private schools located inside and adjacent to DHA Phase 6 Lahore.',
    introText: 'DHA Phase 6 features world-class educational institutions within its sectors, including Beaconhouse, Roots IVY, SICAS, and leading Cambridge networks.',
  },
  {
    key: 'hospitals',
    label: 'Hospitals & Healthcare',
    icon: '🏥',
    seoTitle: 'Hospitals near DHA Phase 6 Lahore (24/7 Emergency & Specialty Care)',
    seoDesc: 'Find 24/7 emergency care, PKLI, DHA Phase 6 Medical Center, specialized clinics, and diagnostic labs in and around DHA Phase 6 Lahore.',
    introText: 'Residents enjoy unmatched healthcare access anchored by the prestigious PKLI medical complex, dedicated DHA health centers, and 24/7 trauma care.',
  },
  {
    key: 'mosques',
    label: 'Grand Jamia Mosques',
    icon: '🕌',
    seoTitle: 'Mosques in DHA Phase 6 Lahore | Architectural Grand Jamia Mosques',
    seoDesc: 'Discover magnificent air-conditioned Jamia mosques with stunning Islamic architecture across every sector of DHA Phase 6 Lahore.',
    introText: 'Every sector in DHA Phase 6 is planned around landmark architectural Jamia mosques equipped with central climate control and Quran academies.',
  },
  {
    key: 'restaurants',
    label: 'Restaurants & Dining',
    icon: '🍽️',
    seoTitle: 'Restaurants in DHA Phase 6 Lahore | CCA-1, CCA-2 & Defence Raya Dining',
    seoDesc: 'Explore fine dining, artisan cafes, continental steakhouses, and global food chains across CCA-1, CCA-2, and Defence Raya in DHA Phase 6.',
    introText: 'From luxury fairway dining at Defence Raya to bustling culinary strips in CCA-1 and CCA-2, Phase 6 is Lahore’s premier upscale gastronomic destination.',
  },
  {
    key: 'shopping',
    label: 'Shopping & Supermarkets',
    icon: '🛒',
    seoTitle: 'Shopping Centers & Supermarkets in DHA Phase 6 Lahore | Jalal Sons & Al-Fatah',
    seoDesc: 'Complete guide to luxury grocery supermarkets, fashion boutiques, electronics malls, and commercial plazas in DHA Phase 6.',
    introText: 'Flagship departmental superstores, international designer brands, and specialty markets are situated along the commercial boulevards and CCAs.',
  },
  {
    key: 'banks',
    label: 'Banks & Financial Centers',
    icon: '💳',
    seoTitle: 'Banks & 24/7 Financial Centers in DHA Phase 6 Lahore',
    seoDesc: 'Locate premier commercial banks, Islamic banking headquarters, and 24/7 ATMs across CCA-1 and CCA-2 in DHA Phase 6 Lahore.',
    introText: 'Leading financial institutions maintain flagship regional branches, priority banking lounges, and automated deposit kiosks in Phase 6.',
  },
  {
    key: 'petrol-stations',
    label: 'Petrol & EV Stations',
    icon: '⛽',
    seoTitle: 'Petrol Pumps & EV Charging Stations in DHA Phase 6 Lahore',
    seoDesc: 'Find 24/7 fuel pumps, Hi-Octane stations, express car service centers, and EV chargers along Main Boulevard DHA Phase 6.',
    introText: 'Convenient fuel and EV service stations line the Main Boulevard, Bedian Road, and Lahore Ring Road interchanges.',
  },
  {
    key: 'parks',
    label: 'Parks & Golf Recreation',
    icon: '🌳',
    seoTitle: 'Parks & Golf Recreation in DHA Phase 6 Lahore | Defence Raya & Sector Parks',
    seoDesc: 'Explore the 18-hole championship Defence Raya Golf Course, jogging trails, sector theme parks, and landscaped green zones in DHA Phase 6.',
    introText: 'Phase 6 offers Lahore’s most expansive green footprint, headlined by the 18-hole Defence Raya Golf Course and over 30 landscaped sector parks.',
  },
  {
    key: 'gyms',
    label: 'Gyms & Wellness Spas',
    icon: '🏋️',
    seoTitle: 'Gyms & Wellness Spas in DHA Phase 6 Lahore',
    seoDesc: 'Discover luxury fitness clubs, swimming facilities, CrossFit centers, and wellness spas in DHA Phase 6 Lahore.',
    introText: 'State-of-the-art wellness clubs featuring Olympic swimming pools, certified trainers, and world-class gym apparatus serve Phase 6 residents.',
  },
  {
    key: 'hotels',
    label: 'Hotels & Executive Suites',
    icon: '🏨',
    seoTitle: 'Hotels & Executive Guest Suites near DHA Phase 6 Lahore',
    seoDesc: 'Find luxury golf suites, executive serviced residences, and boutique corporate accommodations in and near DHA Phase 6 Lahore.',
    introText: 'High-end hospitality venues and resort suites cater to visiting overseas property investors, golf club members, and executive travelers.',
  },
];

export const PLACES_DATA: PlaceItem[] = [
  // ══════════════════════════════════════════════════════════════════════════
  // 1. SCHOOLS
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'school-beaconhouse-p6',
    slug: 'beaconhouse-dha-phase-6-campus',
    name: 'Beaconhouse School System (Phase 6 Campus)',
    category: 'schools',
    categoryLabel: 'International & Cambridge School',
    distance: 'Inside Sector J',
    travelTime: '2 Mins',
    address: 'Sector J, Main Boulevard, DHA Phase 6, Lahore',
    block: 'Sector J',
    description: 'Premier campus offering Cambridge IGCSE, O/A Levels with modern science labs, swimming facility, and digital learning suites.',
    longDescription: 'Beaconhouse Phase 6 Campus is an elite educational institution located directly within Sector J. Equipped with international standard laboratories, sports fields, music academies, and an extensive library, it offers unmatched holistic learning.',
    features: ['Cambridge O/A Levels', 'Digital Classrooms', 'Swimming Complex', 'Robotics & STEAM Lab', 'Stringent DHA Security'],
    contact: '+92 42 111 232 266',
    phone: '042-111-232-266',
    timings: '07:30 AM – 02:30 PM (Monday to Friday)',
    rating: 4.9,
    reviewCount: 184,
    lat: 31.4682,
    lng: 74.4395,
    images: ['/images/og/homepage-og.jpg', '/images/og/property-og.jpg'],
    nearbyLandmarks: ['Sector J Central Park', 'CCA-2 Commercial Broadway', 'DHA Phase 6 Main Boulevard'],
    faqs: [
      {
        question: 'Does Beaconhouse Phase 6 offer Cambridge A-Levels?',
        answer: 'Yes, the campus provides comprehensive Cambridge Assessment International Education (CAIE) O-Level and A-Level streams.',
      },
      {
        question: 'Where is the campus located in DHA Phase 6?',
        answer: 'It is situated conveniently in Sector J, just a 2-minute drive from the CCA-2 commercial area.',
      },
    ],
  },
  {
    id: 'school-roots-ivy-p6',
    slug: 'roots-ivy-international-phase-6',
    name: 'Roots IVY International School (DHA Phase 6)',
    category: 'schools',
    categoryLabel: 'International Baccalaureate & Cambridge',
    distance: 'Inside Sector A',
    travelTime: '2 Mins',
    address: 'Sector A Boulevard, DHA Phase 6, Lahore',
    block: 'Sector A',
    description: 'World-recognized international school offering Cambridge and global university preparatory pathways in an executive setting.',
    longDescription: 'Roots IVY Phase 6 delivers an internationally benchmarked academic journey in an executive custom-built facility in Sector A near Defence Raya.',
    features: ['International Baccalaureate Pathways', 'CAIE O/A Levels', 'Indoor Sports Complex', 'Leadership Incubation Center'],
    contact: '+92 42 37180000',
    phone: '042-37180000',
    timings: '07:45 AM – 02:15 PM (Monday to Friday)',
    rating: 4.8,
    reviewCount: 142,
    lat: 31.4725,
    lng: 74.4278,
    images: ['/images/og/property-og.jpg', '/images/og/homepage-og.jpg'],
    nearbyLandmarks: ['Defence Raya Golf Resort', 'Sector A Grand Mosque', 'Main Boulevard'],
    faqs: [
      {
        question: 'Is Roots IVY close to Defence Raya?',
        answer: 'Yes, it is located within Sector A, only 2 minutes from the Defence Raya Golf & Country Club entrance.',
      },
    ],
  },
  {
    id: 'school-lgs-phase-6',
    slug: 'lahore-grammar-school-phase-6',
    name: 'Lahore Grammar School (LGS Phase 6)',
    category: 'schools',
    categoryLabel: 'Prestigious Grammar School',
    distance: 'Sector C Connectivity',
    travelTime: '3 Mins',
    address: 'Sector C, DHA Phase 6, Lahore',
    block: 'Sector C',
    description: 'Renowned academic network fostering intellectual rigor, public speaking, debating excellence, and Cambridge qualification success.',
    longDescription: 'LGS Phase 6 provides dedicated preschool through high-school education, offering state-of-the-art arts, science, and athletic facilities.',
    features: ['Cambridge Curriculum', 'Public Speaking & MUN', 'Modern Art Studio', 'Dedicated Basketball & Football Turf'],
    contact: '+92 42 35741234',
    phone: '042-35741234',
    timings: '07:30 AM – 02:00 PM (Monday to Friday)',
    rating: 4.8,
    reviewCount: 165,
    lat: 31.465,
    lng: 74.432,
    images: ['/images/og/homepage-og.jpg', '/images/og/property-og.jpg'],
    nearbyLandmarks: ['CCA-1 Commercial', 'Sector C Jamia Mosque', 'Sector D Green Belt'],
    faqs: [
      {
        question: 'What curriculums are taught at LGS Phase 6?',
        answer: 'LGS Phase 6 prepares students for Cambridge O-Level examinations and provides strong academic foundations in science and humanities.',
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 2. HOSPITALS & HEALTHCARE
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'hospital-pkli',
    slug: 'pkli-pakistan-kidney-liver-institute',
    name: 'PKLI (Pakistan Kidney and Liver Institute)',
    category: 'hospitals',
    categoryLabel: 'Premier Tertiary Care & Transplant Hospital',
    distance: '2 Mins from Sector L / Bedian Road',
    travelTime: '2 Mins',
    address: 'Opposite DHA Phase 6, DHA Bedian Link, Lahore',
    description: 'One of South Asia’s most modern tertiary healthcare and organ transplant complexes, equipped with JCI-grade medical technology.',
    longDescription: 'The Pakistan Kidney and Liver Institute and Research Center (PKLI) represents a landmark in healthcare infrastructure. Located adjacent to DHA Phase 6, it features 24/7 emergency, advanced ICUs, multi-organ transplants, and international consultant physicians.',
    features: ['24/7 Trauma Emergency', 'Organ Transplant Center', 'State-of-the-Art Radiology (MRI/CT)', 'International Specialists', 'On-Site Helipad'],
    contact: '+92 42 111 504 504',
    phone: '042-111-504-504',
    timings: '24/7 Emergency & Inpatient Services',
    rating: 4.9,
    reviewCount: 890,
    lat: 31.4589,
    lng: 74.4485,
    images: ['/images/og/homepage-og.jpg', '/images/og/property-og.jpg'],
    nearbyLandmarks: ['DHA Phase 6 Bedian Road Gate', 'Sector L Boulevard', 'Lahore Ring Road'],
    faqs: [
      {
        question: 'How close is PKLI to DHA Phase 6?',
        answer: 'PKLI is located right next to DHA Phase 6, reachable in 2 minutes via Bedian Road or Sector L arterial roads.',
      },
    ],
  },
  {
    id: 'hospital-dha-medical-center',
    slug: 'dha-phase-6-medical-center',
    name: 'DHA Phase 6 Medical & Diagnostic Center',
    category: 'hospitals',
    categoryLabel: 'DHA Community Medical Center',
    distance: 'Inside CCA-1',
    travelTime: '1 Min',
    address: 'CCA-1 Commercial Broadway, DHA Phase 6, Lahore',
    block: 'CCA-1',
    description: 'Dedicated DHA healthcare center with multi-specialist OPD clinics, diagnostic laboratory, ambulance fleet, and 24/7 pharmacy.',
    longDescription: 'Providing immediate outpatient and urgent medical care for DHA Phase 6 residents, including specialist consultations, dental care, vaccination center, and diagnostic imaging.',
    features: ['24/7 Emergency & Ambulance', 'Consultant OPD Clinics', 'Full Diagnostic Lab', 'Dental & Eye Care'],
    contact: '+92 42 37181111',
    phone: '042-37181111',
    timings: '24/7 Emergency Services',
    rating: 4.7,
    reviewCount: 310,
    lat: 31.467,
    lng: 74.431,
    images: ['/images/og/property-og.jpg', '/images/og/homepage-og.jpg'],
    nearbyLandmarks: ['CCA-1 Bank Square', 'Jalal Sons Supermarket', 'Sector D Grand Mosque'],
    faqs: [
      {
        question: 'Are ambulance services available 24/7?',
        answer: 'Yes, DHA Vigilance and Medical Services operate dedicated 24/7 emergency response ambulances.',
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 3. MOSQUES
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'mosque-sector-d-jamia',
    slug: 'grand-jamia-mosque-sector-d-phase-6',
    name: 'Grand Jamia Mosque Sector D (Phase 6)',
    category: 'mosques',
    categoryLabel: 'Landmark Grand Jamia Mosque',
    distance: 'Sector D / Near CCA-1',
    travelTime: '1 Min',
    address: 'Sector D Central Square, DHA Phase 6, Lahore',
    block: 'Sector D',
    description: 'Iconic architectural Jamia Mosque accommodating thousands of worshippers with Turkish blue calligraphy and centralized air conditioning.',
    longDescription: 'The Sector D Grand Jamia Mosque is the architectural crown of central Phase 6. Featuring intricate geometric tilework, high domes, expansive courtyards, subterranean car parking, and a dedicated Quran learning institute.',
    features: ['Capacity for 6,000+ Worshippers', 'Central Air Conditioning', 'Quranic Hifz Academy', 'Dedicated Ladies Prayer Section', 'Underground Parking'],
    timings: 'Open for all 5 daily prayers and Jumu’ah',
    rating: 5.0,
    reviewCount: 420,
    lat: 31.466,
    lng: 74.4335,
    images: ['/images/og/homepage-og.jpg', '/images/og/property-og.jpg'],
    nearbyLandmarks: ['CCA-1 Commercial Area', 'Sector D Park', 'Sector C Roundabout'],
    faqs: [
      {
        question: 'Is there a ladies prayer area in Sector D Grand Mosque?',
        answer: 'Yes, an exclusive, sound-equipped, and air-conditioned ladies prayer gallery is provided with private access.',
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 4. RESTAURANTS & DINING
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'dining-defence-raya-fairways',
    slug: 'the-fairways-restaurant-defence-raya',
    name: 'The Fairways Restaurant & Terrace (Defence Raya)',
    category: 'restaurants',
    categoryLabel: 'Luxury Golf Resort Fine Dining',
    distance: 'Inside Defence Raya Golf Club',
    travelTime: '2 Mins',
    address: 'Defence Raya Golf & Country Club, Sector A, DHA Phase 6, Lahore',
    block: 'Defence Raya',
    description: 'Exquisite fine dining offering panoramic views of the 18-hole championship golf course, serving continental, Mediterranean, and Asian fusion.',
    longDescription: 'Set overlooking lush golf greens, The Fairways provides an elite culinary atmosphere. Featuring open-air terrace seating, live teppanyaki grills, and high-tea spreads.',
    features: ['Panoramic Golf Fairway Views', 'Live Teppanyaki & Steakhouse', 'Outdoor Terrace Seating', 'Executive Private Dining Rooms'],
    contact: '+92 42 37338500',
    phone: '042-37338500',
    timings: '12:00 PM – 11:30 PM (Daily)',
    rating: 4.9,
    reviewCount: 530,
    lat: 31.474,
    lng: 74.429,
    images: ['/images/og/property-og.jpg', '/images/og/homepage-og.jpg'],
    nearbyLandmarks: ['Defence Raya Country Club', 'Sector A Mansions', 'Raya Fairways Commercial'],
    faqs: [
      {
        question: 'Can non-members dine at The Fairways Restaurant?',
        answer: 'Selected dining areas and reservation packages are open to guests and visitors upon prior booking.',
      },
    ],
  },
  {
    id: 'dining-jade-cafe-cca1',
    slug: 'jade-cafe-cca1-phase-6',
    name: 'Jade Cafe & Chinatown (CCA-1 Phase 6)',
    category: 'restaurants',
    categoryLabel: 'Artisan Cafe & Chinese Cuisine',
    distance: 'Inside CCA-1 Commercial',
    travelTime: '1 Min',
    address: 'Main Broadway, CCA-1, DHA Phase 6, Lahore',
    block: 'CCA-1',
    description: 'Popular dining hotspot serving artisan breakfasts, gourmet coffees, sourdough pizzas, and authentic Szechuan Chinese dishes.',
    longDescription: 'Jade Cafe CCA-1 is a staple for DHA Phase 6 food enthusiasts, boasting vibrant interior design, specialty coffee roasts, and an expansive menu.',
    features: ['Specialty Coffee Roasts', 'Artisan Breakfast & Bakery', 'Szechuan Chinese Specialties', 'Valet Parking'],
    contact: '+92 42 111 446 644',
    phone: '042-111-446-644',
    timings: '08:00 AM – 01:00 AM (Daily)',
    rating: 4.8,
    reviewCount: 680,
    lat: 31.4675,
    lng: 74.4312,
    images: ['/images/og/homepage-og.jpg', '/images/og/property-og.jpg'],
    nearbyLandmarks: ['Jalal Sons Superstore', 'Meezan Bank Broadway', 'Sector C Ring'],
    faqs: [
      {
        question: 'Does Jade Cafe offer outdoor seating in Phase 6?',
        answer: 'Yes, it features both modern indoor seating and an open patio area.',
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 5. SHOPPING & SUPERMARKETS
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'shop-jalal-sons-p6',
    slug: 'jalal-sons-superstore-phase-6',
    name: 'Jalal Sons Superstore (CCA-1 Phase 6)',
    category: 'shopping',
    categoryLabel: 'Flagship Gourmet Supermarket & Bakery',
    distance: 'Inside CCA-1 Commercial Broadway',
    travelTime: '1 Min',
    address: 'Broadway Commercial, CCA-1, DHA Phase 6, Lahore',
    block: 'CCA-1',
    description: 'Premier department store and bakery offering imported groceries, fresh organic produce, gourmet bakery, meats, and household essentials.',
    longDescription: 'Spanning multiple levels in CCA-1, Jalal Sons Phase 6 is the prime shopping destination for residents, offering high-end groceries, live bakery counters, and deli items.',
    features: ['Live Gourmet Bakery', 'Imported Organic Food Section', 'Fresh Meat & Seafood Counter', 'Ample Basement & Plaza Parking'],
    contact: '+92 42 111 525 257',
    phone: '042-111-525-257',
    timings: '09:00 AM – 12:00 AM (Daily)',
    rating: 4.9,
    reviewCount: 920,
    lat: 31.468,
    lng: 74.4315,
    images: ['/images/og/property-og.jpg', '/images/og/homepage-og.jpg'],
    nearbyLandmarks: ['CCA-1 Bank Square', 'Gloria Jean’s Coffee', 'Sector D Main Avenue'],
    faqs: [
      {
        question: 'Does Jalal Sons Phase 6 provide home delivery?',
        answer: 'Yes, direct home delivery is provided to all sectors in DHA Phase 6 and surrounding phases.',
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 6. BANKS & FINANCIAL CENTERS
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'bank-meezan-cca1',
    slug: 'meezan-bank-premium-branch-cca1',
    name: 'Meezan Bank (CCA-1 Commercial Broadway)',
    category: 'banks',
    categoryLabel: 'Premier Islamic Bank & Priority Lounge',
    distance: 'Inside CCA-1',
    travelTime: '1 Min',
    address: 'Plot 45-Commercial, CCA-1, DHA Phase 6, Lahore',
    block: 'CCA-1',
    description: 'Flagship Islamic bank branch providing corporate finance, priority premier lounge, locker facilities, and 24/7 Cash Deposit Machines (CDM).',
    longDescription: 'Meezan Bank’s flagship branch in Phase 6 provides dedicated banking for high-net-worth individuals, real estate developers, and residents.',
    features: ['Premier Priority Banking Lounge', '24/7 Biometric ATM & Cash Deposit', 'Safe Deposit Lockers', 'Real Estate Escrow Services'],
    contact: '+92 42 37182222',
    phone: '042-37182222',
    timings: '09:00 AM – 05:00 PM (Monday to Friday)',
    rating: 4.8,
    reviewCount: 210,
    lat: 31.4678,
    lng: 74.4308,
    images: ['/images/og/homepage-og.jpg', '/images/og/property-og.jpg'],
    nearbyLandmarks: ['Jalal Sons', 'HBL Broadway', 'CCA-1 Central Plaza'],
    faqs: [
      {
        question: 'Is there a 24/7 Cash Deposit Machine (CDM)?',
        answer: 'Yes, the branch has multiple 24/7 automated CDMs for instant cash and cheque deposit.',
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 7. PETROL & EV STATIONS
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'petrol-total-parco-p6',
    slug: 'total-parco-main-boulevard-phase-6',
    name: 'Total Parco & Excellium Hub (Main Boulevard Phase 6)',
    category: 'petrol-stations',
    categoryLabel: '24/7 Fuel & EV Express Station',
    distance: 'On Main Boulevard',
    travelTime: '1 Min',
    address: 'Main Boulevard, Near Sector A & Entrance, DHA Phase 6, Lahore',
    block: 'Sector A',
    description: 'Full-service modern fuel station with Excellium fuels, Bonjour mart, automated tunnel car wash, and fast EV charging docks.',
    longDescription: 'Strategically located on the Phase 6 Main Boulevard, offering 24/7 premium fuel, air inspection, tyre care, express lube changes, and retail refreshments.',
    features: ['Hi-Octane Excellium Fuel', 'Automated Express Car Wash', 'Bonjour 24/7 Convenience Store', 'High-Speed EV Charging Port'],
    timings: '24 Hours Open (7 Days a Week)',
    rating: 4.7,
    reviewCount: 390,
    lat: 31.475,
    lng: 74.426,
    images: ['/images/og/property-og.jpg', '/images/og/homepage-og.jpg'],
    nearbyLandmarks: ['Phase 6 Main Entrance Arch', 'Sector A Commercial', 'Defence Raya Link'],
    faqs: [
      {
        question: 'Is EV fast charging available at this station?',
        answer: 'Yes, dedicated high-voltage EV fast chargers are available on-site 24/7.',
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 8. PARKS & GOLF RECREATION
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'park-defence-raya-golf-course',
    slug: 'defence-raya-championship-golf-course',
    name: 'Defence Raya 18-Hole Championship Golf Course',
    category: 'parks',
    categoryLabel: '18-Hole Championship Golf Course & Parklands',
    distance: 'Sectors A & B',
    travelTime: '2 Mins',
    address: 'Defence Raya Golf Resort, DHA Phase 6, Lahore',
    block: 'Defence Raya',
    description: 'International PGA-standard 18-hole championship golf course designed by Nelson & Haworth, featuring manicured greens, lakes, and fairways.',
    longDescription: 'Spanning over 400 acres, Defence Raya Golf Course provides an unmatched scenic sanctuary in Lahore. Surrounded by fairways villas, walking belts, and natural bird sanctuaries.',
    features: ['18-Hole PGA Standard Golf Course', 'Floodlit Driving Range', 'PGA Pro Coaching Academy', 'Clubhouse & Heated Pools'],
    contact: '+92 42 37338500',
    phone: '042-37338500',
    timings: '06:00 AM – 10:00 PM (Daily)',
    rating: 5.0,
    reviewCount: 750,
    lat: 31.4735,
    lng: 74.4285,
    images: ['/images/og/homepage-og.jpg', '/images/og/property-og.jpg'],
    nearbyLandmarks: ['Sector A Mansions', 'Raya Fairways Commercial', 'Clubhouse'],
    faqs: [
      {
        question: 'Are golf lessons available for beginners?',
        answer: 'Yes, certified golf professionals offer private and group coaching sessions at the driving range.',
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 9. GYMS & WELLNESS
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'gym-shapes-phase-6',
    slug: 'shapes-fitness-center-phase-6',
    name: 'Shapes Active Health Club & Spa (Phase 6)',
    category: 'gyms',
    categoryLabel: 'Luxury Fitness Club & Spa',
    distance: 'Inside CCA-1',
    travelTime: '1 Min',
    address: 'CCA-1 Commercial Broadway, DHA Phase 6, Lahore',
    block: 'CCA-1',
    description: 'Elite fitness facility equipped with imported cardiovascular lines, Olympic free weights, swimming pool, sauna, and steam rooms.',
    longDescription: 'Shapes Phase 6 offers an unrivaled workout and wellness environment, including cross-training zones, functional fitness, dedicated ladies shifts, and certified personal trainers.',
    features: ['Olympic Free Weights Area', 'Indoor Heated Swimming Pool', 'Steam, Sauna & Jacuzzi', 'Separate Ladies Shifts', 'Certified Nutritionists'],
    contact: '+92 42 111 742 737',
    phone: '042-111-742-737',
    timings: '06:00 AM – 11:00 PM (Daily)',
    rating: 4.9,
    reviewCount: 380,
    lat: 31.4682,
    lng: 74.4318,
    images: ['/images/og/property-og.jpg', '/images/og/homepage-og.jpg'],
    nearbyLandmarks: ['Jalal Sons CCA-1', 'Sector D Central Park', 'Broadway Plaza'],
    faqs: [
      {
        question: 'Does Shapes Phase 6 offer ladies-only timings?',
        answer: 'Yes, dedicated ladies timings are scheduled with female certified trainers and instructors.',
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 10. HOTELS & GUEST RESIDENCES
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'hotel-defence-raya-suites',
    slug: 'defence-raya-luxury-resort-suites',
    name: 'Defence Raya Luxury Resort Suites',
    category: 'hotels',
    categoryLabel: 'Luxury Golf Resort & Executive Suites',
    distance: 'Inside Defence Raya Golf Club',
    travelTime: '2 Mins',
    address: 'Defence Raya Golf & Country Club, Sector A, DHA Phase 6, Lahore',
    block: 'Defence Raya',
    description: 'Ultra-exclusive golf-facing hospitality suites with 5-star concierge amenities, private balconies, fine dining access, and spa privileges.',
    longDescription: 'Designed for VIP guests, business executives, and visiting overseas investors, Defence Raya Suites combine high luxury with the tranquil scenery of the fairways.',
    features: ['Golf Course Balcony Views', '24/7 Executive Room Service', 'Complimentary Golf Club Access', 'Airport Chauffeur Service', 'High-Speed Wi-Fi'],
    contact: '+92 42 37338500',
    phone: '042-37338500',
    timings: '24/7 Front Desk & Concierge',
    rating: 4.9,
    reviewCount: 290,
    lat: 31.4742,
    lng: 74.4295,
    images: ['/images/og/homepage-og.jpg', '/images/og/property-og.jpg'],
    nearbyLandmarks: ['Defence Raya Clubhouse', 'Sector A Boulevard', 'Allama Iqbal Airport (10 mins)'],
    faqs: [
      {
        question: 'How far is the resort from Allama Iqbal International Airport?',
        answer: 'It is approximately a 10-minute drive via the signal-free Lahore Ring Road corridor.',
      },
    ],
  },
];
