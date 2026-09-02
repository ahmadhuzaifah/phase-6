/**
 * DHA Phase 6 Lahore — Site Configuration
 * Global constants used across the entire site.
 */

export const SITE = {
  name: 'DHA Phase 6 Lahore',
  shortName: 'DHA Phase 6',
  description:
    'DHA Phase 6 Lahore — Premier luxury real estate community featuring residential & commercial plots, Defence Raya Golf Resort, modern amenities, and world-class infrastructure.',
  url: import.meta.env.PUBLIC_SITE_URL || 'https://dhaphase6lahore.pk',
  locale: 'en_PK',
  language: 'en',
  author: 'DHA Phase 6 Specialist & Information Portal',
  themeColor: '#c8960c',
} as const;

export const SOCIAL = {
  facebook: '',
  instagram: '',
  youtube: '',
  twitter: '',
  linkedin: '',
} as const;

export const NAVIGATION = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Sectors', href: '/blocks' },
  { label: 'Properties', href: '/properties' },
  { label: 'Places', href: '/places' },
  { label: 'Map', href: '/dha-phase-6-lahore-map' },
  { label: 'Prices', href: '/property-prices' },
  { label: 'Guides', href: '/dha-phase-6-investment-guide' },
  { label: 'Contact', href: '/contact' },
] as const;

export type NavItem = (typeof NAVIGATION)[number];
