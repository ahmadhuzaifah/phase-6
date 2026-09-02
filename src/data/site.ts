/**
 * Al Rehman Garden Phase 2 — Site Configuration
 * Global constants used across the entire site.
 */

export const SITE = {
  name: 'Al Rehman Garden Phase 2',
  shortName: 'ARG Phase 2',
  description:
    'Al Rehman Garden Phase 2 Lahore — Premium real estate community offering residential and commercial plots with modern amenities, parks, and excellent infrastructure.',
  url: import.meta.env.PUBLIC_SITE_URL || 'https://alrehmangarden.pk',
  locale: 'en_PK',
  language: 'en',
  author: 'Al Rehman Garden',
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
  { label: 'Properties', href: '/properties' },
  { label: 'Plots', href: '/plots' },
  { label: 'Houses', href: '/houses-for-sale-in-al-rehman-garden-phase-2-lahore' },
  { label: 'Blocks', href: '/blocks' },
  { label: 'Places', href: '/places' },
  { label: 'Map', href: '/al-rehman-garden-phase-2-map' },
  { label: 'Prices', href: '/property-prices' },
  { label: 'Property Dealer', href: '/property-dealer' },
  { label: 'Contact', href: '/contact' },
] as const;

export type NavItem = (typeof NAVIGATION)[number];
