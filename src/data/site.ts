/**
 * DHA Phase 6 Lahore — Site Configuration
 * Global constants used across the entire site.
 */

export const SITE = {
  name: 'DHA Phase 6 Lahore',
  shortName: 'DHA Phase 6',
  description:
    'Independent DHA Phase 6 Lahore guide to sectors, properties, maps, prices, places, construction and buyer due diligence.',
  url: import.meta.env.PUBLIC_SITE_URL || 'https://dhaphase6lahore.pk',
  locale: 'en_PK',
  language: 'en',
  author: 'DHA Phase 6 Lahore Information Portal',
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
  { label: 'Guide', href: '/dha-phase-6-lahore-guide/' },
  { label: 'Properties', href: '/properties/' },
  { label: 'Houses', href: '/houses/' },
  { label: 'Plots', href: '/plots/' },
  { label: 'Commercial', href: '/commercial/' },
  { label: 'Sectors', href: '/sectors/' },
  { label: 'Places', href: '/places/' },
  { label: 'Prices', href: '/dha-phase-6-lahore-prices/' },
  { label: 'Investment', href: '/best-investment-area-in-dha-phase-6-lahore/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Contact', href: '/contact/' },
] as const;

export type NavItem = (typeof NAVIGATION)[number];
