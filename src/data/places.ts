/**
 * Places & Local Amenities Directory Dataset
 * Al Rehman Garden Phase 2 Lahore Authority Portal
 */

export interface PlaceItem {
  id: string;
  name: string;
  category:
    | 'schools'
    | 'colleges'
    | 'hospitals'
    | 'clinics'
    | 'restaurants'
    | 'cafes'
    | 'mosques'
    | 'markets'
    | 'banks'
    | 'petrol-stations'
    | 'gyms';
  categoryLabel: string;
  distance: string;
  travelTime: string;
  address: string;
  description: string;
  features: string[];
  contact?: string;
  rating?: number;
  reviewCount?: number;
}

export const PLACES_DATA: PlaceItem[] = [
  // Education — Schools & Colleges
  {
    id: 'school-1',
    name: 'The City School (Al Rehman Garden Campus)',
    category: 'schools',
    categoryLabel: 'Primary & Secondary School',
    distance: 'Inside Society (Block B)',
    travelTime: '1 Min',
    address: 'Main Civic Zone, Block B, Al Rehman Garden Phase 2',
    description: 'Premier national curriculum institution offering Cambridge O/A Level and Matriculation systems with state-of-the-art sports facilities.',
    features: ['O/A Levels', 'Air Conditioned Classrooms', 'Science Labs', 'Dedicated Playgrounds'],
    rating: 4.8,
    reviewCount: 94,
  },
  {
    id: 'school-2',
    name: 'Beaconhouse School System',
    category: 'schools',
    categoryLabel: 'International School',
    distance: '1.2 km',
    travelTime: '3 Mins',
    address: 'Near Faizpur Interchange, Main Sharaqpur Road',
    description: 'World-class international educational institution providing holistic development, science robotics labs, and comprehensive extracurricular activities.',
    features: ['Robotics Lab', 'Swimming Pool', 'Cambridge Assessment', 'Transport Network'],
    rating: 4.9,
    reviewCount: 142,
  },
  {
    id: 'college-1',
    name: 'Punjab Group of Colleges (Campus)',
    category: 'colleges',
    categoryLabel: 'Intermediate & Degree College',
    distance: '2.5 km',
    travelTime: '5 Mins',
    address: 'Main Sharaqpur Road, Adjacent M2 Motorway',
    description: 'Renowned higher secondary college offering FSc Pre-Medical, Pre-Engineering, ICS, and I.Com programs with top academic merit records.',
    features: ['FSc Pre-Medical & Eng', 'ICS Computer Labs', 'Scholarships', 'Auditorium'],
    rating: 4.7,
    reviewCount: 88,
  },
  {
    id: 'college-2',
    name: 'Superior College Campus',
    category: 'colleges',
    categoryLabel: 'Higher Education College',
    distance: '3.0 km',
    travelTime: '6 Mins',
    address: 'Sharaqpur Road Junction, Lahore West',
    description: 'Modern higher secondary institute focused on practical technical education, commerce, and computer science degrees.',
    features: ['FSc / ICS / I.Com', 'Digital Library', 'Hostel Facility', 'Career Counseling'],
    rating: 4.6,
    reviewCount: 65,
  },

  // Healthcare — Hospitals & Clinics
  {
    id: 'hospital-1',
    name: 'Al Rehman Garden Trust Hospital',
    category: 'hospitals',
    categoryLabel: '24/7 Emergency Hospital',
    distance: 'Inside Society (Block C)',
    travelTime: '2 Mins',
    address: 'Block C Medical Enclave, Main 150ft Boulevard',
    description: 'State-of-the-art multi-specialty healthcare facility equipped with 24/7 trauma emergency, modern ICU, diagnostic radiology, and consultant OPDs.',
    features: ['24/7 Trauma Emergency', 'Modular Operation Theaters', 'Dialysis Unit', 'Digital Pharmacy'],
    rating: 4.9,
    reviewCount: 215,
  },
  {
    id: 'hospital-2',
    name: 'Farooq Hospital West Lahore',
    category: 'hospitals',
    categoryLabel: 'Tertiary Care Hospital',
    distance: '4.8 km',
    travelTime: '8 Mins',
    address: 'Near Sagian Ring Road Interchange, Lahore',
    description: 'Major private tertiary medical center featuring cardiac care, laparoscopic surgery, pediatric wing, and advanced MRI/CT diagnostic centers.',
    features: ['Cardiac CCU', 'CT Scan & MRI', 'Pediatric ICU', 'Emergency Ambulance'],
    rating: 4.7,
    reviewCount: 310,
  },
  {
    id: 'clinic-1',
    name: 'Chughtai Healthcare Medical Center & Lab',
    category: 'clinics',
    categoryLabel: 'Diagnostic & Specialist Clinic',
    distance: 'Inside Society (Block A)',
    travelTime: '1 Min',
    address: 'Commercial Broadway, Block A Executive',
    description: 'ISO-certified pathology lab and polyclinic offering home sampling, general physician consults, dental care, and ultrasound diagnostics.',
    features: ['24/7 Blood Sampling', 'Ultrasound & ECG', 'Home Sampling', 'Specialist OPD'],
    rating: 4.8,
    reviewCount: 160,
  },
  {
    id: 'clinic-2',
    name: 'Al-Shifa Dental & Family Clinic',
    category: 'clinics',
    categoryLabel: 'Family Clinic',
    distance: 'Inside Society (Block B)',
    travelTime: '1 Min',
    address: 'Street 4, Sector B Civic Hub',
    description: 'Comprehensive dental implants, orthodontic dentistry, and daily general medical consultancy for society residents.',
    features: ['Dental Implants', 'Pediatric Care', 'Vaccination Desk'],
    rating: 4.7,
    reviewCount: 75,
  },

  // Food & Dining — Restaurants & Cafes
  {
    id: 'dining-1',
    name: 'Broadway Grill & Continental Restaurant',
    category: 'restaurants',
    categoryLabel: 'Fine Dining & BBQ',
    distance: 'Inside Society (Block C Commercial)',
    travelTime: '2 Mins',
    address: '150ft Main Boulevard, Block C',
    description: 'Upscale family restaurant serving authentic Pakistani BBQ, Shinwari karahi, handi specialties, and Chinese cuisine with VIP family halls.',
    features: ['Outdoor Terrace', 'Family Hall', 'Live Shinwari BBQ', 'Home Delivery'],
    rating: 4.8,
    reviewCount: 340,
  },
  {
    id: 'dining-2',
    name: 'McDonald\'s & KFC Drive-Thru',
    category: 'restaurants',
    categoryLabel: 'Fast Food Chain',
    distance: '1.8 km',
    travelTime: '3 Mins',
    address: 'Motorway Interchange Commercial Zone, Sharaqpur Rd',
    description: 'Global fast-food outlets featuring 24/7 drive-thru, indoor playland, and fast delivery coverage across all Phase 2 sectors.',
    features: ['24/7 Drive-Thru', 'Kids Play Area', 'Party Hall', 'Fast Delivery'],
    rating: 4.7,
    reviewCount: 820,
  },
  {
    id: 'cafe-1',
    name: 'Gloria Jean\'s Coffees & Artisan Bakery',
    category: 'cafes',
    categoryLabel: 'Gourmet Coffee & Lounge',
    distance: 'Inside Society (Mirabel Broadway)',
    travelTime: '2 Mins',
    address: 'Mirabel Commercial Square',
    description: 'Premium coffee lounge featuring artisan espresso blends, cold brew, gourmet pastries, and high-speed Wi-Fi workspace.',
    features: ['Artisan Coffee', 'Free High-Speed Wi-Fi', 'Outdoor Seating', 'Breakfast Menu'],
    rating: 4.9,
    reviewCount: 185,
  },
  {
    id: 'cafe-2',
    name: 'Chai Shai & Snacks Lounge',
    category: 'cafes',
    categoryLabel: 'Tea Lounge',
    distance: 'Inside Society (Block A)',
    travelTime: '1 Min',
    address: 'Central Park Strip, Block A',
    description: 'Traditional Karak Chai, paratha rolls, fries, and casual late-night outdoor sitting garden.',
    features: ['Karak Chai', 'Paratha Rolls', 'Outdoor Lawn'],
    rating: 4.6,
    reviewCount: 220,
  },

  // Religious — Mosques
  {
    id: 'mosque-1',
    name: 'Grand Jamia Mosque (Turkish Architecture)',
    category: 'mosques',
    categoryLabel: 'Central Grand Mosque',
    distance: 'Inside Society (Block A)',
    travelTime: '1 Min',
    address: 'Central Boulevard, Sector A',
    description: 'Magnificent architectural centerpiece featuring hand-crafted Turkish mosaic tiles, climate-controlled prayer halls for 3,000+ worshippers, and Islamic library.',
    features: ['3,000+ Capacity', 'Central Air Conditioning', 'Quran Academy', 'Spacious Ablution Hall'],
    rating: 5.0,
    reviewCount: 450,
  },
  {
    id: 'mosque-2',
    name: 'Sector D Rose Garden Mosque',
    category: 'mosques',
    categoryLabel: 'Sector Jamia Mosque',
    distance: 'Inside Society (Block D)',
    travelTime: '1 Min',
    address: 'Rose Garden Park, Block D',
    description: 'Serene neighborhood mosque with landscaped fountains, carpeted halls, and daily Dars-e-Quran sessions.',
    features: ['1,000 Capacity', 'Generous Parking', 'Lawn Surrounding'],
    rating: 4.9,
    reviewCount: 120,
  },

  // Shopping & Markets
  {
    id: 'market-1',
    name: 'Al Rehman Super Mart & Grocery Express',
    category: 'markets',
    categoryLabel: 'Departmental Superstore',
    distance: 'Inside Society (Block B)',
    travelTime: '1 Min',
    address: 'Civic Commercial Center, Block B',
    description: 'Complete multi-story departmental mart stocking fresh dairy, organic produce, imported pantry foods, household goods, and bakery.',
    features: ['Fresh Vegetables & Meat', 'Imported Products', 'Credit Card POS', 'Home Delivery'],
    rating: 4.7,
    reviewCount: 290,
  },
  {
    id: 'market-2',
    name: 'Metro Cash & Carry / Hyperstar Wholesale',
    category: 'markets',
    categoryLabel: 'Wholesale Hypermarket',
    distance: '6.5 km',
    travelTime: '10 Mins',
    address: 'Via Sagian Bridge / Ring Road Entry',
    description: 'Massive wholesale and retail shopping center catering to family groceries, electronics, furniture, and apparel.',
    features: ['Wholesale Rates', 'Huge Parking Lot', 'Food Court'],
    rating: 4.8,
    reviewCount: 1200,
  },

  // Services — Banks, Petrol Stations, Gyms
  {
    id: 'bank-1',
    name: 'Meezan Bank & HBL Commercial Branches',
    category: 'banks',
    categoryLabel: 'Banking & 24/7 ATM',
    distance: 'Inside Society (Block C Broadway)',
    travelTime: '2 Mins',
    address: 'Financial Broadway Plaza, Block C',
    description: 'Full-service Islamic and commercial branch banking with 24/7 cash deposit machines, biometrically verified ATMs, and locker facilities.',
    features: ['24/7 ATM & CDM', 'Islamic Banking', 'Locker Vaults', 'Remittance Counter'],
    rating: 4.8,
    reviewCount: 175,
  },
  {
    id: 'fuel-1',
    name: 'Total Parco & Shell Filling Stations',
    category: 'petrol-stations',
    categoryLabel: 'Fuel & EV Charging Station',
    distance: '0.8 km',
    travelTime: '2 Mins',
    address: 'Main Entrance Gate, Sharaqpur Road',
    description: 'Modern fuel station providing premium Hi-Octane, CNG, tyre care, express car wash, and electric vehicle (EV) fast-charging ports.',
    features: ['Hi-Octane Fuel', '24/7 Car Wash', 'EV Fast Charging', 'Mart & ATM'],
    rating: 4.7,
    reviewCount: 380,
  },
  {
    id: 'gym-1',
    name: 'Titanium Fitness & CrossFit Club',
    category: 'gyms',
    categoryLabel: 'Fitness Center & Spa',
    distance: 'Inside Society (Mirabel Block)',
    travelTime: '2 Mins',
    address: 'Mirabel Sports Complex',
    description: 'Luxury fitness club equipped with imported TechnoGym equipment, certified personal trainers, sauna, steam room, and separate ladies fitness shifts.',
    features: ['Imported Machines', 'Ladies Specific Timings', 'Sauna & Steam', 'CrossFit Arena'],
    rating: 4.9,
    reviewCount: 195,
  },
];
