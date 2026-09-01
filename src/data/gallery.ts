/**
 * Society Gallery Dataset
 * Al Rehman Garden Phase 2 Lahore Authority Portal
 */

export interface GalleryItem {
  id: string;
  title: string;
  category: 'views' | 'roads' | 'parks' | 'houses' | 'commercial' | 'maps';
  categoryLabel: string;
  imageUrl: string;
  altText: string;
  caption: string;
  location: string;
}

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: 'gal-1',
    title: '150ft Wide Main Entrance Boulevard',
    category: 'roads',
    categoryLabel: 'Roads & Boulevards',
    imageUrl: '/images/og/homepage-og.jpg',
    altText: '150ft Wide Main Entrance Boulevard Al Rehman Garden Phase 2 Lahore',
    caption: 'Signal-free dual carriageway entrance flanked by lush palm landscaping and LED street illumination.',
    location: 'Main Sharaqpur Road Entrance',
  },
  {
    id: 'gal-2',
    title: 'Turkish Architecture Grand Jamia Mosque',
    category: 'views',
    categoryLabel: 'Society Views',
    imageUrl: '/images/placeholders/property-placeholder.webp',
    altText: 'Grand Jamia Mosque Turkish Architecture Al Rehman Garden Phase 2',
    caption: 'Majestic central mosque with climate-controlled prayer halls and landscaped fountain courtyards.',
    location: 'Central Boulevard, Block A',
  },
  {
    id: 'gal-3',
    title: 'Designer Spanish & Modern Luxury Villas',
    category: 'houses',
    categoryLabel: 'Houses & Architecture',
    imageUrl: '/images/og/property-og.jpg',
    altText: '5 Marla and 10 Marla Designer Luxury Houses in Sector A and B',
    caption: 'Contemporary architectural elevation designs featuring double-story custom family homes.',
    location: 'Block A Executive & Block B',
  },
  {
    id: 'gal-4',
    title: 'Rose Garden Central Theme Park',
    category: 'parks',
    categoryLabel: 'Parks & Greenery',
    imageUrl: '/images/placeholders/property-placeholder.webp',
    altText: 'Rose Garden Central Family Theme Park in Block D',
    caption: 'Expansive family leisure park equipped with walking tracks, outdoor gym, gazebos, and children play zones.',
    location: 'Block D (Rose Garden)',
  },
  {
    id: 'gal-5',
    title: 'Commercial Broadway Plaza Hub',
    category: 'commercial',
    categoryLabel: 'Commercial Areas',
    imageUrl: '/images/og/homepage-og.jpg',
    altText: 'Commercial Broadway and Banking Plaza Strip in Sector C',
    caption: 'Thriving multi-story commercial hub housing banks, cafes, corporate offices, and retail stores.',
    location: 'Block C Civic Broadway',
  },
  {
    id: 'gal-6',
    title: 'Official Sector Masterplan Vector Layout',
    category: 'maps',
    categoryLabel: 'Masterplan Maps',
    imageUrl: '/images/og/property-og.jpg',
    altText: 'Official Masterplan Map Al Rehman Garden Phase 2 Lahore',
    caption: 'Detailed sector layout map with street demarcations, civic utility zones, and road networks.',
    location: 'Society Master Development Area',
  },
  {
    id: 'gal-7',
    title: 'Mirabel Enclave Musical Fountain & Lake',
    category: 'views',
    categoryLabel: 'Society Views',
    imageUrl: '/images/placeholders/property-placeholder.webp',
    altText: 'Mirabel Enclave Central Water Body and Musical Fountain',
    caption: 'Scenic evening illumination along the luxury lake promenade in Mirabel sector.',
    location: 'Mirabel Block',
  },
  {
    id: 'gal-8',
    title: 'Underground Power & Clean Skyline Avenue',
    category: 'roads',
    categoryLabel: 'Roads & Boulevards',
    imageUrl: '/images/og/homepage-og.jpg',
    altText: 'Underground Electricity Grid and Clean Streetscape Block B',
    caption: 'Underground electrification infrastructure providing a wire-free, premium residential ambiance.',
    location: 'Block B Residential Sector',
  },
];
