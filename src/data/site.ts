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
  { label: 'Sectors', href: '/sectors/' },
  { label: 'Properties', href: '/properties/' },
  { label: 'Places', href: '/places/' },
  { label: 'Plots', href: '/plots/' },
  { label: 'Jobs', href: '/jobs/' },
  { label: 'Dealers', href: '/dealers/' },
  { label: 'Map', href: '/dha-phase-6-lahore-map/' },
  { label: 'Map PDFs', href: '/dha-phase-6-lahore-map/#map-pdf-downloads' },
] as const;

export type NavItem = (typeof NAVIGATION)[number];
