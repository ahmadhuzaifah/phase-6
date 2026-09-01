/**
 * Places & Local Amenities Directory Master Dataset
 * Al Rehman Garden Phase 2 Lahore Authority Portal
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
    seoTitle: 'Schools near Al Rehman Garden Phase 2 Lahore | Top Academies & Campuses',
    seoDesc: 'Explore premier Cambridge O/A Levels, Matriculation, and primary schools located inside and near Al Rehman Garden Phase 2 Lahore.',
    introText: 'Al Rehman Garden Phase 2 boasts top-ranked educational institutions directly within society gates as well as prestigious international schools within 5 to 10 minutes drive.',
  },
  {
    key: 'hospitals',
    label: 'Hospitals & Healthcare',
    icon: '🏥',
    seoTitle: 'Hospitals near Al Rehman Garden Phase 2 Lahore (24/7 Emergency Care)',
    seoDesc: 'Find 24/7 trauma emergency hospitals, multi-specialty clinics, diagnostic labs, and pharmacies in and near Al Rehman Garden Phase 2 Lahore.',
    introText: 'Residents have immediate access to on-site 24/7 emergency hospitals, diagnostic labs, and renowned tertiary healthcare centers across Western Lahore.',
  },
  {
    key: 'mosques',
    label: 'Grand Jamia Mosques',
    icon: '🕌',
    seoTitle: 'Mosques in Al Rehman Garden Phase 2 Lahore | Grand Jamia & Sector Mosques',
    seoDesc: 'Discover the iconic Grand Turkish Jamia Mosque and air-conditioned sector prayer halls located throughout Al Rehman Garden Phase 2 Lahore.',
    introText: 'Every sector in Phase 2 is thoughtfully planned with dedicated air-conditioned Jamia mosques, anchored by the central Grand Turkish Architecture Mosque in Block A.',
  },
  {
    key: 'restaurants',
    label: 'Restaurants & Dining',
    icon: '🍽️',
    seoTitle: 'Restaurants near Al Rehman Garden Phase 2 Lahore | Best Dining & Fast Food',
    seoDesc: 'Explore top family restaurants, BBQ, Shinwari karahi, continental cafes, and global fast food chains in Al Rehman Garden Phase 2 Lahore.',
    introText: 'From upscale family dining halls and live BBQ to 24/7 international drive-thrus, Phase 2 features a vibrant culinary ecosystem along its 150ft Commercial Broadway.',
  },
  {
    key: 'shopping',
    label: 'Shopping & Supermarkets',
    icon: '🛒',
    seoTitle: 'Shopping Centers & Supermarkets in Al Rehman Garden Phase 2 Lahore',
    seoDesc: 'Complete guide to departmental superstores, commercial shopping plazas, fashion boutiques, and grocery marts in Al Rehman Garden Phase 2.',
    introText: 'Everything from daily fresh groceries and departmental stores to multi-story commercial malls is readily accessible within society boundaries.',
  },
  {
    key: 'banks',
    label: 'Banks & 24/7 ATMs',
    icon: '💳',
    seoTitle: 'Banks & 24/7 ATMs in Al Rehman Garden Phase 2 Lahore',
    seoDesc: 'Locate Islamic and commercial bank branches, cash deposit machines (CDM), and 24/7 ATMs in Al Rehman Garden Phase 2 commercial hubs.',
    introText: 'Major commercial and Islamic banks operate branch offices and 24/7 cash deposit/ATM kiosks along the main boulevard financial corridor.',
  },
  {
    key: 'petrol-stations',
    label: 'Petrol & Fuel Stations',
    icon: '⛽',
    seoTitle: 'Petrol Pumps & EV Charging near Al Rehman Garden Phase 2 Lahore',
    seoDesc: 'Find 24/7 petrol pumps, CNG stations, express car wash centers, and EV fast-charging stations near Al Rehman Garden Phase 2 Lahore.',
    introText: 'Conveniently situated fuel filling stations equipped with Hi-Octane, express car wash facilities, and EV charging points line the entrance highway.',
  },
  {
    key: 'parks',
    label: 'Parks & Recreational Areas',
    icon: '🌳',
    seoTitle: 'Parks & Recreation in Al Rehman Garden Phase 2 Lahore | Family & Theme Parks',
    seoDesc: 'Explore lush green family parks, Rose Garden theme park, jogging tracks, children play areas, and musical fountains in Al Rehman Garden Phase 2.',
    introText: 'Phase 2 prioritizes green open spaces with themed family parks, illuminated musical fountains, botanical flora, and secure walking tracks in each sector.',
  },
  {
    key: 'gyms',
    label: 'Gyms & Fitness Clubs',
    icon: '🏋️',
    seoTitle: 'Gyms & Fitness Clubs in Al Rehman Garden Phase 2 Lahore',
    seoDesc: 'Discover modern gyms, CrossFit arenas, aerobics studios, and separate ladies fitness shifts in Al Rehman Garden Phase 2 Lahore.',
    introText: 'State-of-the-art fitness centers with imported equipment, certified trainers, and dedicated ladies timings support an active lifestyle.',
  },
  {
    key: 'hotels',
    label: 'Hotels & Executive Guest Houses',
    icon: '🏨',
    seoTitle: 'Hotels & Executive Guest Houses near Al Rehman Garden Phase 2 Lahore',
    seoDesc: 'Find luxury guest houses, executive suites, and corporate hotel accommodations near Al Rehman Garden Phase 2 and M-2 Motorway Interchange.',
    introText: 'Comfortable executive suites and modern serviced residences cater to overseas property buyers, business visitors, and out-of-city guests.',
  },
];

export const PLACES_DATA: PlaceItem[] = [
  // ══════════════════════════════════════════════════════════════════════════
  // 1. SCHOOLS
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'school-city',
    slug: 'the-city-school-al-rehman-campus',
    name: 'The City School (Al Rehman Garden Campus)',
    category: 'schools',
    categoryLabel: 'Primary & Secondary School',
    distance: 'Inside Society (Block B)',
    travelTime: '1 Min',
    address: 'Main Civic Zone, Block B, Al Rehman Garden Phase 2, Lahore',
    block: 'Block B',
    description: 'Premier national curriculum institution offering Cambridge O/A Level and Matriculation systems with state-of-the-art science labs and sports fields.',
    longDescription: 'The City School Al Rehman Garden Campus is one of the flagship educational institutions situated right inside Block B. Catering to students from Playgroup up to O-Levels and Matriculation, the campus features air-conditioned digital smart classrooms, modern biology and computer laboratories, a spacious sports turf, and an extensive school library. With trained faculty and stringent security protocols, it remains the top choice for society families.',
    features: ['Cambridge O/A Levels', 'Digital Smart Classrooms', 'Science & Robotics Labs', 'Dedicated Sports Turf', 'Secure Pick & Drop'],
    contact: '+92 42 111 444 123',
    phone: '042-111-444-123',
    timings: '07:30 AM – 02:00 PM (Monday to Friday)',
    rating: 4.8,
    reviewCount: 112,
    lat: 31.5772,
    lng: 74.2265,
    images: ['/images/og/homepage-og.jpg', '/images/og/property-og.jpg'],
    nearbyLandmarks: ['Block B Central Park', 'The City School Gate 2', 'Civic Commercial Mart'],
    faqs: [
      {
        question: 'Does The City School Al Rehman Campus offer Cambridge O-Levels?',
        answer: 'Yes, the campus provides complete Cambridge Assessment International Education (CAIE) O-Level streams alongside the Federal/Punjab Matriculation curriculum.',
      },
      {
        question: 'Is transportation provided for society residents?',
        answer: 'Yes, safe dedicated air-conditioned school van networks cover all sectors from Block A to Beverly Hills within Phase 2.',
      },
    ],
  },
  {
    id: 'school-beaconhouse',
    slug: 'beaconhouse-school-system-faizpur-campus',
    name: 'Beaconhouse School System (Faizpur Campus)',
    category: 'schools',
    categoryLabel: 'International School',
    distance: '1.2 km from Society Gate',
    travelTime: '3 Mins',
    address: 'Near Faizpur Interchange, Main Sharaqpur Road, Lahore',
    description: 'World-class international educational institution providing holistic development, STEAM robotics labs, and comprehensive extracurricular activities.',
    longDescription: 'Beaconhouse School System Faizpur Campus serves families across Al Rehman Garden Phase 2 with world-standard education standards. Offering rigorous academic preparation, swimming facilities, indoor badminton courts, and competitive debating societies, it delivers exceptional student leadership training.',
    features: ['STEAM Robotics Lab', 'Swimming Pool & Gym', 'Cambridge Assessment', 'Transport Network Across Society'],
    contact: '+92 42 111 232 266',
    phone: '042-111-232-266',
    timings: '07:45 AM – 02:15 PM (Monday to Friday)',
    rating: 4.9,
    reviewCount: 156,
    lat: 31.581,
    lng: 74.232,
    images: ['/images/og/property-og.jpg', '/images/og/homepage-og.jpg'],
    nearbyLandmarks: ['M-2 Faizpur Toll Plaza', 'Total Parco Station', 'Phase 2 Entrance Gate'],
    faqs: [
      {
        question: 'How far is Beaconhouse from Al Rehman Garden Phase 2?',
        answer: 'It is located just 1.2 kilometers (approximately 3 minutes drive) from the main Phase 2 entrance gate on Sharaqpur Road.',
      },
    ],
  },
  {
    id: 'school-dar-e-arqam',
    slug: 'dar-e-arqam-school-phase-2',
    name: 'Dar-e-Arqam School (Phase 2 Campus)',
    category: 'schools',
    categoryLabel: 'Islamic & Modern Education School',
    distance: 'Inside Society (Block A)',
    travelTime: '1 Min',
    address: 'Sector A Boulevard, Al Rehman Garden Phase 2, Lahore',
    block: 'Block A',
    description: 'Blended modern curriculum school integrating academic excellence with Islamic studies, Hifz-ul-Quran programs, and character building.',
    longDescription: 'Dar-e-Arqam School in Block A offers an optimal blend of modern sciences, English-medium curriculum, and foundational Islamic values. Featuring qualified Hifz instructors, science laboratories, and interactive learning environments, it is highly regarded by residents seeking moral and academic growth.',
    features: ['Hifz-ul-Quran Department', 'Computer Science Lab', 'Character Grooming Seminars', 'Activity-Based Kindergarten'],
    contact: '+92 300 8472910',
    phone: '0300-8472910',
    timings: '07:30 AM – 01:30 PM (Monday to Friday)',
    rating: 4.7,
    reviewCount: 84,
    lat: 31.5755,
    lng: 74.2238,
    images: ['/images/placeholders/property-placeholder.webp', '/images/og/homepage-og.jpg'],
    nearbyLandmarks: ['Grand Turkish Mosque', 'Block A Commercial Strip'],
    faqs: [
      {
        question: 'Does Dar-e-Arqam offer Hifz alongside regular academics?',
        answer: 'Yes, specialized parallel tracks allow students to complete Hifz-e-Quran while continuing their standard school grade progression.',
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 2. HOSPITALS
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'hospital-trust',
    slug: 'al-rehman-hospital-trust',
    name: 'Al Rehman Garden Trust Hospital',
    category: 'hospitals',
    categoryLabel: '24/7 Multi-Specialty Hospital',
    distance: 'Inside Society (Block C)',
    travelTime: '2 Mins',
    address: 'Block C Medical Enclave, Main 150ft Boulevard, Phase 2, Lahore',
    block: 'Block C',
    description: 'State-of-the-art multi-specialty healthcare facility equipped with 24/7 trauma emergency, modern ICU, diagnostic radiology, and consultant OPDs.',
    longDescription: 'Al Rehman Garden Trust Hospital is the primary medical center serving the entire Phase 2 community and surrounding areas. The hospital boasts 24/7 emergency and trauma care, specialized coronary care units (CCU), high-tech pediatric incubators, diagnostic ultrasound and digital X-ray services, dialysis suites, and round-the-clock pharmacy and ambulance support.',
    features: ['24/7 Trauma Emergency', 'Intensive Care Unit (ICU)', 'Dialysis Unit', 'Digital Pharmacy & Radiology', 'Emergency Ambulance Fleet'],
    contact: '+92 42 37920000',
    phone: '042-37920000',
    timings: 'Open 24 Hours / 7 Days a Week',
    rating: 4.9,
    reviewCount: 260,
    lat: 31.5785,
    lng: 74.224,
    images: ['/images/og/homepage-og.jpg', '/images/og/property-og.jpg'],
    nearbyLandmarks: ['Block C Civic Broadway', 'Meezan Bank Branch', 'Central Commercial Plaza'],
    faqs: [
      {
        question: 'Is the emergency ward open 24/7 at Al Rehman Hospital?',
        answer: 'Yes, the emergency trauma center, pharmacy, and ambulance service operate 24 hours a day, 365 days a year.',
      },
      {
        question: 'Which specialist doctors are available for OPD consultation?',
        answer: 'Consultants in Cardiology, Gynecology, Pediatrics, General Surgery, Orthopedics, and Internal Medicine are available daily.',
      },
    ],
  },
  {
    id: 'hospital-farooq',
    slug: 'farooq-hospital-west-lahore',
    name: 'Farooq Hospital West Lahore',
    category: 'hospitals',
    categoryLabel: 'Tertiary Care Hospital',
    distance: '4.8 km',
    travelTime: '7 Mins',
    address: 'Near Sagian Ring Road Interchange, Lahore',
    description: 'Major private tertiary medical center featuring cardiac care, laparoscopic surgery, pediatric wing, and advanced MRI/CT diagnostic centers.',
    longDescription: 'Farooq Hospital is a leading private tertiary healthcare institute situated within a 7-minute signal-free drive from Phase 2 via Sagian bypass. It offers comprehensive inpatient care, state-of-the-art MRI and 128-slice CT scans, advanced neonatal ICU, and executive patient suites.',
    features: ['Cardiac CCU & Angiography', '128-Slice CT Scan & 1.5T MRI', 'Neonatal ICU (NICU)', 'Laparoscopic Surgery Wing'],
    contact: '+92 42 111 327 667',
    phone: '042-111-327-667',
    timings: 'Open 24 Hours',
    rating: 4.7,
    reviewCount: 340,
    lat: 31.59,
    lng: 74.255,
    images: ['/images/og/property-og.jpg', '/images/placeholders/property-placeholder.webp'],
    nearbyLandmarks: ['Sagian Ring Road Interchange', 'Ravi Toll Plaza'],
    faqs: [
      {
        question: 'What is the fastest route from Phase 2 to Farooq Hospital?',
        answer: 'Take the Sharaqpur Road eastbound over the Sagian Bypass connector; average travel time is 7 to 8 minutes.',
      },
    ],
  },
  {
    id: 'hospital-chughtai',
    slug: 'chughtai-medical-center-lab-phase-2',
    name: 'Chughtai Medical Center & Diagnostic Lab',
    category: 'hospitals',
    categoryLabel: 'Diagnostic Lab & Polyclinic',
    distance: 'Inside Society (Block A)',
    travelTime: '1 Min',
    address: 'Commercial Broadway, Block A Executive, Al Rehman Garden Phase 2',
    block: 'Block A',
    description: 'ISO-certified pathology diagnostic center and polyclinic providing 24/7 blood sampling, ultrasound diagnostics, home collection, and consultant clinics.',
    longDescription: 'Chughtai Medical Center brings Pakistan’s most trusted diagnostic accuracy to the doorstep of Phase 2 residents. Offering automated pathology analyzers, digital ECG, color Doppler ultrasound, and home sample collection across all sectors.',
    features: ['24/7 Automated Blood Tests', 'Home Sample Collection', 'Color Doppler Ultrasound', 'General Physician OPD'],
    contact: '+92 311 1456789',
    phone: '0311-1456789',
    timings: '24 Hours Open (Labs & Urgent Sampling)',
    rating: 4.8,
    reviewCount: 190,
    lat: 31.576,
    lng: 74.2245,
    images: ['/images/placeholders/property-placeholder.webp', '/images/og/homepage-og.jpg'],
    nearbyLandmarks: ['Main 150ft Boulevard', 'Grand Turkish Mosque'],
    faqs: [
      {
        question: 'Can I book a home blood sample collection in Phase 2?',
        answer: 'Yes, Chughtai Lab provides complimentary home sampling throughout Al Rehman Garden Phase 2 via phone or WhatsApp.',
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 3. MOSQUES
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'mosque-turkish',
    slug: 'grand-jamia-mosque-turkish-architecture',
    name: 'Grand Jamia Mosque (Turkish Architecture)',
    category: 'mosques',
    categoryLabel: 'Central Grand Jamia Mosque',
    distance: 'Inside Society (Block A Central)',
    travelTime: '1 Min',
    address: 'Central Boulevard, Block A Executive, Al Rehman Garden Phase 2',
    block: 'Block A',
    description: 'Magnificent architectural landmark featuring Turkish mosaic craftsmanship, climate-controlled prayer halls for 3,500+ worshippers, and an Islamic research library.',
    longDescription: 'The Grand Turkish Jamia Mosque in Block A stands as the spiritual and architectural crown jewel of Al Rehman Garden Phase 2. Inspired by Istanbul’s classical Ottoman architecture, the mosque features soaring minarets, hand-painted ceramic calligraphic tiles, Turkish marble flooring, centralized air conditioning, separate ladies prayer halls, and an extensive Islamic library.',
    features: ['3,500+ Capacity', 'Centralized Air Conditioning', 'Dedicated Ladies Prayer Section', 'Islamic Research Library', 'Spacious Wudu & Ablution Hall'],
    contact: 'Direct Society Religious Directorate',
    timings: 'Open Daily for all 5 Prayers & Friday Congregation',
    rating: 5.0,
    reviewCount: 480,
    lat: 31.5762,
    lng: 74.225,
    images: ['/images/og/homepage-og.jpg', '/images/og/property-og.jpg'],
    nearbyLandmarks: ['Block A Central Park', 'Executive Society Office'],
    faqs: [
      {
        question: 'Is there a dedicated prayer area for women?',
        answer: 'Yes, the Grand Jamia Mosque features a dedicated, soundproofed second-floor gallery with private entrance and separate ablution facilities for female worshippers.',
      },
      {
        question: 'Are daily Dars and Quran classes organized here?',
        answer: 'Yes, qualified scholars conduct daily post-Fajr Quranic recitation and evening Dars-e-Hadith sessions for children and adults.',
      },
    ],
  },
  {
    id: 'mosque-rose-garden',
    slug: 'sector-d-rose-garden-jamia-mosque',
    name: 'Sector D Rose Garden Jamia Mosque',
    category: 'mosques',
    categoryLabel: 'Sector Jamia Mosque',
    distance: 'Inside Society (Block D)',
    travelTime: '1 Min',
    address: 'Rose Garden Park Road, Sector D, Al Rehman Garden Phase 2',
    block: 'Block D',
    description: 'Peaceful sector mosque surrounded by landscaped floral gardens, climate control, and daily prayer services for 1,200 worshippers.',
    longDescription: 'Situated adjacent to the Rose Garden theme park in Block D, this serene mosque offers convenient spiritual access for residents of Sectors D, E, and F. Featuring carpeted prayer halls, backup solar power, and clean wudu facilities.',
    features: ['1,200 Capacity', 'Solar Power Backup', 'Surrounding Rose Gardens', 'Children Quran Academy'],
    rating: 4.9,
    reviewCount: 145,
    lat: 31.579,
    lng: 74.227,
    images: ['/images/placeholders/property-placeholder.webp', '/images/og/homepage-og.jpg'],
    nearbyLandmarks: ['Rose Garden Family Park', 'Sector D Commercial Market'],
    faqs: [
      {
        question: 'Is Juma prayer offered at the Sector D mosque?',
        answer: 'Yes, full Friday congregational prayers (Juma Khutbah) are held every week with ample parking space in the park perimeter.',
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 4. RESTAURANTS
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'rest-broadway-grill',
    slug: 'broadway-grill-continental-restaurant',
    name: 'Broadway Grill & Continental Restaurant',
    category: 'restaurants',
    categoryLabel: 'Fine Dining & BBQ',
    distance: 'Inside Society (Block C Broadway)',
    travelTime: '2 Mins',
    address: '150ft Main Broadway Boulevard, Block C, Al Rehman Garden Phase 2',
    block: 'Block C',
    description: 'Upscale family restaurant serving authentic Pakistani BBQ, Shinwari karahi, handi specialties, and Chinese cuisine with VIP family halls.',
    longDescription: 'Broadway Grill is the premier fine-dining hub in Phase 2, renowned for sizzling charcoal BBQ platters, freshly prepared Shinwari mutton karahi, handi dishes, and authentic Chinese noodles. Offering spacious family dining halls, open-air terrace seating, and fast doorstep home delivery throughout all blocks.',
    features: ['VIP Family Dining Halls', 'Open-Air Rooftop Terrace', 'Live Charcoal BBQ', 'Doorstep Home Delivery', 'Valet Parking'],
    contact: '+92 301 9884567',
    phone: '0301-9884567',
    timings: '12:00 PM – 01:00 AM (Daily)',
    rating: 4.8,
    reviewCount: 395,
    lat: 31.5775,
    lng: 74.2255,
    images: ['/images/og/property-og.jpg', '/images/og/homepage-og.jpg'],
    nearbyLandmarks: ['Al Rehman Trust Hospital', 'Block C Civic Square'],
    faqs: [
      {
        question: 'Does Broadway Grill offer home delivery inside Phase 2?',
        answer: 'Yes, complimentary delivery is provided to all blocks (A to Beverly Hills) with average delivery time under 30 minutes.',
      },
    ],
  },
  {
    id: 'rest-mcdonalds-kfc',
    slug: 'mcdonalds-kfc-motorway-drive-thru',
    name: 'McDonald\'s & KFC Drive-Thru',
    category: 'restaurants',
    categoryLabel: 'Fast Food Chain & Drive-Thru',
    distance: '1.8 km',
    travelTime: '3 Mins',
    address: 'Faizpur Motorway Interchange Commercial Zone, Sharaqpur Rd, Lahore',
    description: 'Global fast-food outlets featuring 24/7 drive-thru, indoor playland, and fast delivery coverage across all Phase 2 sectors.',
    longDescription: 'Located right by the Faizpur M-2 Motorway Interchange, this multi-brand fast-food hub features standard 24/7 drive-thru lanes for McDonald\'s and KFC, a supervised indoor children’s playland, birthday party halls, and full app-based home delivery coverage for Al Rehman Garden Phase 2.',
    features: ['24/7 Drive-Thru', 'Kids Indoor Playland', 'Late-Night Dining', 'Mobile App Delivery Coverage'],
    contact: '+92 42 111 244 622',
    phone: '042-111-244-622',
    timings: 'Open 24 Hours Daily',
    rating: 4.7,
    reviewCount: 920,
    lat: 31.582,
    lng: 74.234,
    images: ['/images/og/homepage-og.jpg', '/images/placeholders/property-placeholder.webp'],
    nearbyLandmarks: ['M-2 Faizpur Toll Plaza', 'Total Parco Service Station'],
    faqs: [
      {
        question: 'Is the drive-thru open 24 hours at Faizpur interchange?',
        answer: 'Yes, both McDonald\'s and KFC operate their drive-thru counters 24 hours a day, 7 days a week.',
      },
    ],
  },
  {
    id: 'rest-gloria-jeans',
    slug: 'gloria-jeans-coffees-artisan-bakery',
    name: 'Gloria Jean\'s Coffees & Artisan Bakery',
    category: 'restaurants',
    categoryLabel: 'Gourmet Coffee Lounge & Bistro',
    distance: 'Inside Society (Mirabel Broadway)',
    travelTime: '2 Mins',
    address: 'Mirabel Commercial Square, Al Rehman Garden Phase 2',
    block: 'Mirabel Block',
    description: 'Luxury coffee lounge featuring artisan espresso blends, cold brew, gourmet pastries, pasta, and high-speed Wi-Fi co-working seating.',
    longDescription: 'Gloria Jean\'s Coffees in Mirabel Block provides an upscale ambiance for casual meetings, remote work, and evening family socializing. Enjoy signature caramel chillers, specialty espresso, artisan cheesecake, and breakfast sandwiches in a beautifully air-conditioned lounge.',
    features: ['Artisan Coffee & Smoothies', 'High-Speed Wi-Fi Workspaces', 'Outdoor Garden Seating', 'Breakfast & Bakery Menu'],
    contact: '+92 42 35912345',
    phone: '042-35912345',
    timings: '08:00 AM – 12:00 AM (Midnight)',
    rating: 4.9,
    reviewCount: 210,
    lat: 31.58,
    lng: 74.228,
    images: ['/images/og/property-og.jpg', '/images/placeholders/property-placeholder.webp'],
    nearbyLandmarks: ['Mirabel Musical Fountains', 'Mirabel Sports Arena'],
    faqs: [
      {
        question: 'Is high-speed Wi-Fi available for working at Gloria Jean’s?',
        answer: 'Yes, complimentary fiber Wi-Fi and power outlets are available for guests at work tables.',
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 5. SHOPPING & SUPERMARKETS
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'shop-super-mart',
    slug: 'al-rehman-super-mart-grocery-express',
    name: 'Al Rehman Super Mart & Grocery Express',
    category: 'shopping',
    categoryLabel: 'Departmental Superstore',
    distance: 'Inside Society (Block B Civic)',
    travelTime: '1 Min',
    address: 'Civic Commercial Center, Block B, Al Rehman Garden Phase 2',
    block: 'Block B',
    description: 'Complete multi-story departmental mart stocking fresh dairy, organic produce, imported pantry foods, household goods, meat, and in-house bakery.',
    longDescription: 'Al Rehman Super Mart is the one-stop shopping destination for everyday household essentials in Phase 2. Offering butcher services, organic vegetables, dairy, household appliances, cosmetics, baby care, and credit card / mobile wallet checkout.',
    features: ['Fresh Butchery & Vegetables', 'Imported Grocery Section', 'Bakery & Confectionery', 'Home Delivery Service', 'Credit Card POS & ATMs'],
    contact: '+92 321 4455667',
    phone: '0321-4455667',
    timings: '08:00 AM – 11:30 PM (Daily)',
    rating: 4.8,
    reviewCount: 315,
    lat: 31.577,
    lng: 74.226,
    images: ['/images/og/homepage-og.jpg', '/images/placeholders/property-placeholder.webp'],
    nearbyLandmarks: ['The City School', 'Block B Central Park'],
    faqs: [
      {
        question: 'Do they accept credit and debit cards?',
        answer: 'Yes, all major credit cards, debit cards, JazzCash, and Nayapay are accepted without additional charges.',
      },
    ],
  },
  {
    id: 'shop-metro-wholesale',
    slug: 'metro-cash-carry-hypermarket-access',
    name: 'Metro Cash & Carry / Wholesale Hypermarket',
    category: 'shopping',
    categoryLabel: 'Wholesale Hypermarket & Mall',
    distance: '6.5 km via Sagian Bypass',
    travelTime: '10 Mins',
    address: 'Via Sagian Bridge / Ring Road Interchange, West Lahore',
    description: 'Massive wholesale and retail shopping center catering to family bulk groceries, electronics, furniture, apparel, and commercial supplies.',
    longDescription: 'Located 10 minutes drive from Phase 2, Metro Cash & Carry provides hypermarket shopping on wholesale prices. From bulk grocery supplies and imported kitchenware to home electronics and clothing lines, it offers massive shopping variety with extensive parking.',
    features: ['Wholesale Pricing', 'Massive Covered Parking', 'Electronics & Appliances Center', 'Live Butchery & Seafood'],
    contact: '+92 42 111 786 387',
    phone: '042-111-786-387',
    timings: '09:00 AM – 11:00 PM (Daily)',
    rating: 4.7,
    reviewCount: 1450,
    lat: 31.595,
    lng: 74.26,
    images: ['/images/og/property-og.jpg', '/images/placeholders/property-placeholder.webp'],
    nearbyLandmarks: ['Sagian Ring Road Junction', 'Ravi Toll Plaza'],
    faqs: [
      {
        question: 'How long does it take to reach Metro from Al Rehman Garden Phase 2?',
        answer: 'It takes approximately 9 to 11 minutes via the direct dual-carriageway Sharaqpur Road and Sagian bypass.',
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 6. BANKS & ATMS
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'bank-meezan-hbl',
    slug: 'meezan-bank-hbl-commercial-branches',
    name: 'Meezan Bank & HBL Commercial Branches',
    category: 'banks',
    categoryLabel: 'Branch Banking & 24/7 ATMs',
    distance: 'Inside Society (Block C Broadway)',
    travelTime: '2 Mins',
    address: 'Financial Broadway Plaza, Block C, Al Rehman Garden Phase 2',
    block: 'Block C',
    description: 'Full-service Islamic and commercial branch banking with 24/7 cash deposit machines, biometrically verified ATMs, and locker facilities.',
    longDescription: 'The Financial Hub in Block C houses full branches of Meezan Bank, Habib Bank Limited (HBL), and Allied Bank. Providing comprehensive corporate and retail banking, utility bill collections, international remittances, biometric KYC, and 24/7 Cash Deposit Machines (CDM).',
    features: ['24/7 Biometric ATM & CDM', 'Islamic Banking Counters', 'Safety Locker Vaults', 'Home Remittance Counter', 'Account Opening Desk'],
    contact: '+92 42 37921111',
    phone: '042-37921111',
    timings: '09:00 AM – 05:00 PM (Monday to Friday); ATMs 24/7',
    rating: 4.8,
    reviewCount: 195,
    lat: 31.578,
    lng: 74.225,
    images: ['/images/og/homepage-og.jpg', '/images/placeholders/property-placeholder.webp'],
    nearbyLandmarks: ['Al Rehman Trust Hospital', 'Broadway Commercial Square'],
    faqs: [
      {
        question: 'Can I deposit cash after banking hours?',
        answer: 'Yes, 24/7 Cash Deposit Machines (CDM) accept instant real-time cash deposits into your account at any hour.',
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 7. PETROL & FUEL STATIONS
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'fuel-total-shell',
    slug: 'total-parco-shell-service-station',
    name: 'Total Parco & Shell Filling Stations',
    category: 'petrol-stations',
    categoryLabel: 'Fuel, CNG & EV Charging Hub',
    distance: '0.8 km from Main Gate',
    travelTime: '2 Mins',
    address: 'Main Entrance Gate, Sharaqpur Road, Lahore',
    description: 'Modern fuel station providing premium Hi-Octane, CNG, tyre care, express car wash, convenience store, and EV fast-charging ports.',
    longDescription: 'Situated right outside the main society entrance, this state-of-the-art fuel station complex provides high-purity Super, Hi-Octane 97, CNG, engine lubricants, computerized wheel balancing, automated car washing, and a 24-hour Bonjour mart.',
    features: ['97 Hi-Octane Fuel', '24/7 Automated Car Wash', 'EV Fast Charging Terminal', '24/7 Convenience Mart & ATM'],
    contact: '+92 300 1234567',
    phone: '0300-1234567',
    timings: 'Open 24 Hours / 7 Days a Week',
    rating: 4.7,
    reviewCount: 420,
    lat: 31.5805,
    lng: 74.23,
    images: ['/images/og/property-og.jpg', '/images/placeholders/property-placeholder.webp'],
    nearbyLandmarks: ['Phase 2 Main Gate', 'M-2 Interchange Link'],
    faqs: [
      {
        question: 'Is EV electric car charging available here?',
        answer: 'Yes, standard European-compliant DC fast chargers (CCS2) are installed for electric vehicles.',
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 8. PARKS & RECREATION
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'park-central-theme',
    slug: 'central-family-theme-park-mirabel',
    name: 'Central Family Theme Park & Musical Fountains',
    category: 'parks',
    categoryLabel: 'Family Theme Park & Sports Arena',
    distance: 'Inside Society (Mirabel & Block B)',
    travelTime: '2 Mins',
    address: 'Central Green Belt, Mirabel Block, Al Rehman Garden Phase 2',
    block: 'Mirabel Block',
    description: 'Expansive family leisure park featuring choreographed musical fountains, illuminated jogging tracks, children’s amusement rides, and open sports lawns.',
    longDescription: 'The Central Theme Park is Phase 2’s premier recreational asset. Spanning acres of lush landscaped flora, it includes dancing musical light fountains, 1.5 km rubberized jogging tracks, outdoor fitness equipment, children’s swings and slides, and a serene lake pavilion.',
    features: ['Choreographed Musical Fountains', '1.5 km Jogging & Cycling Track', 'Children Rides & Play Zone', 'Outdoor Gym Equipment', 'Lush Botanical Gardens'],
    contact: 'Society Horticulture Directorate',
    timings: '05:00 AM – 11:00 PM (Daily)',
    rating: 4.9,
    reviewCount: 520,
    lat: 31.5795,
    lng: 74.2275,
    images: ['/images/og/homepage-og.jpg', '/images/og/property-og.jpg'],
    nearbyLandmarks: ['Mirabel Broadway', 'Gloria Jean\'s Cafe'],
    faqs: [
      {
        question: 'Is entry free for Al Rehman Garden Phase 2 residents?',
        answer: 'Yes, entry to all society family parks, jogging tracks, and musical fountain shows is completely free for residents and families.',
      },
      {
        question: 'When do the musical fountain shows take place?',
        answer: 'Illuminated musical water shows run every evening between 07:30 PM and 10:00 PM.',
      },
    ],
  },
  {
    id: 'park-rose-garden',
    slug: 'rose-garden-park-sector-d',
    name: 'Rose Garden Park & Botanical Walk',
    category: 'parks',
    categoryLabel: 'Botanical Family Park',
    distance: 'Inside Society (Block D)',
    travelTime: '1 Min',
    address: 'Sector D Avenue, Al Rehman Garden Phase 2',
    block: 'Block D',
    description: 'Serene neighborhood botanical park boasting over 50 varieties of roses, shady gazebos, walking paths, and peaceful seating pavilions.',
    longDescription: 'Rose Garden Park in Block D is designed as a tranquil botanical sanctuary. Filled with exotic rose varieties, seasonal flower beds, paved walking corridors, and peaceful benches, it is the ideal morning walk retreat for senior citizens and families.',
    features: ['50+ Rose Varieties', 'Shaded Gazebos & Benches', 'Paved Walking Trails', 'Children Play Corner'],
    timings: '05:00 AM – 10:30 PM (Daily)',
    rating: 4.8,
    reviewCount: 180,
    lat: 31.5788,
    lng: 74.2268,
    images: ['/images/placeholders/property-placeholder.webp', '/images/og/homepage-og.jpg'],
    nearbyLandmarks: ['Sector D Jamia Mosque', 'Block D Residential Rows'],
    faqs: [
      {
        question: 'Are pets allowed in Rose Garden Park?',
        answer: 'Leashed pets are permitted on perimeter paved tracks during early morning hours.',
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 9. GYMS & FITNESS
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'gym-titanium',
    slug: 'titanium-fitness-crossfit-club',
    name: 'Titanium Fitness & CrossFit Club',
    category: 'gyms',
    categoryLabel: 'Luxury Gym & Spa',
    distance: 'Inside Society (Mirabel Sports Complex)',
    travelTime: '2 Mins',
    address: 'Mirabel Sports Complex, Al Rehman Garden Phase 2, Lahore',
    block: 'Mirabel Block',
    description: 'Luxury fitness club equipped with imported TechnoGym equipment, certified personal trainers, sauna, steam room, and separate ladies fitness shifts.',
    longDescription: 'Titanium Fitness is the gold-standard health and fitness destination in Phase 2. Featuring heavy-duty American/Italian weight machines, cardiovascular training theater, dedicated CrossFit arena, dry sauna, steam bath, and certified nutritionists to guide your transformation goals.',
    features: ['Imported TechnoGym Equipment', 'Certified Male & Female Trainers', 'Separate Ladies Shifts', 'Sauna, Steam & Locker Rooms', 'CrossFit & Aerobics Studio'],
    contact: '+92 322 8899001',
    phone: '0322-8899001',
    timings: '06:00 AM – 11:00 PM (Separate Ladies Shift: 11:00 AM – 03:00 PM)',
    rating: 4.9,
    reviewCount: 230,
    lat: 31.5802,
    lng: 74.2285,
    images: ['/images/og/property-og.jpg', '/images/og/homepage-og.jpg'],
    nearbyLandmarks: ['Mirabel Broadway', 'Central Theme Park'],
    faqs: [
      {
        question: 'Are there separate workout timings for women?',
        answer: 'Yes, exclusive ladies-only shifts with certified female fitness instructors run daily from 11:00 AM to 03:00 PM.',
      },
      {
        question: 'Do they offer customized diet and nutrition plans?',
        answer: 'Yes, in-house sports nutritionists provide personalized meal and workout plans tailored to fat loss or muscle gain goals.',
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 10. HOTELS & SUITES
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'hotel-executive-suites',
    slug: 'executive-residence-suites-guest-house',
    name: 'Executive Residence Suites & Serviced Apartments',
    category: 'hotels',
    categoryLabel: 'Executive Serviced Suites',
    distance: 'Inside Society (Block C Broadway)',
    travelTime: '2 Mins',
    address: 'Broadway Heights Plaza, Block C, Al Rehman Garden Phase 2',
    block: 'Block C',
    description: 'Luxury boutique serviced suites offering furnished 1-bed and 2-bed executive accommodations, high-speed Wi-Fi, 24/7 room service, and secure parking.',
    longDescription: 'Executive Residence Suites offers premium hospitality for overseas visitors, property investors, and wedding guests visiting Al Rehman Garden Phase 2. Featuring climate-controlled suites with modern kitchenettes, smart LED TVs, 24/7 concierge, power backup, and complimentary breakfast.',
    features: ['Furnished Executive Suites', '24/7 Concierge & Security', 'Complimentary High-Speed Wi-Fi', 'Solar & Generator Power Backup', 'Daily Housekeeping & Laundry'],
    contact: '+92 325 7800001',
    phone: '0325-7800001',
    timings: '24/7 Front Desk & Check-In',
    rating: 4.8,
    reviewCount: 95,
    lat: 31.5778,
    lng: 74.2252,
    images: ['/images/og/homepage-og.jpg', '/images/placeholders/property-placeholder.webp'],
    nearbyLandmarks: ['Broadway Commercial Center', 'Al Rehman Trust Hospital'],
    faqs: [
      {
        question: 'Is advance booking available for overseas visitors?',
        answer: 'Yes, you can reserve executive suites directly via WhatsApp or phone with flexible check-in and airport transfer options.',
      },
      {
        question: 'Are bachelor or family guests accommodated?',
        answer: 'Accommodations are primarily reserved for families, corporate professionals, and verified property investors.',
      },
    ],
  },
];
