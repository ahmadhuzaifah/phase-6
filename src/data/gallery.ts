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
    id: 'research-overview',
    title: 'DHA Phase 6 Lahore Guide',
    category: 'views',
    categoryLabel: 'Portal Graphics',
    imageUrl: '/images/og/homepage-og.svg',
    altText: 'DHA Phase 6 Lahore independent information portal graphic',
    caption: 'Original editorial graphic used by this independent information portal.',
    location: 'DHA Phase 6 Lahore',
  },
  {
    id: 'market-snapshot',
    title: 'Property Market Snapshots',
    category: 'houses',
    categoryLabel: 'Property Research',
    imageUrl: '/images/og/property-og.svg',
    altText: 'DHA Phase 6 Lahore property market snapshot graphic',
    caption: 'Third-party listing photography is not copied, stripped of watermarks or rebranded.',
    location: 'Source-referenced records',
  },
  {
    id: 'buyer-guides',
    title: 'Buyer and Construction Guides',
    category: 'maps',
    categoryLabel: 'Research Library',
    imageUrl: '/images/og/blog-og.svg',
    altText: 'DHA Phase 6 Lahore buyer guide graphic',
    caption: 'Original portal graphic for due diligence, map and construction content.',
    location: 'Independent guide library',
  },
];
