/**
 * Official Downloads Center Dataset
 * Al Rehman Garden Phase 2 Lahore Authority Portal
 */

export interface DownloadItem {
  id: string;
  title: string;
  category: 'Maps' | 'Payment Plans' | 'Rate Lists' | 'Brochures' | 'Legal';
  fileFormat: 'PDF' | 'JPG' | 'ZIP';
  fileSize: string;
  lastUpdated: string;
  description: string;
  downloadUrl: string;
  previewImage?: string;
  isPopular?: boolean;
}

export const DOWNLOADS_DATA: DownloadItem[] = [
  {
    id: 'masterplan-hd-map',
    title: 'Al Rehman Garden Phase 2 Official HD Masterplan Map (2026)',
    category: 'Maps',
    fileFormat: 'PDF',
    fileSize: '14.5 MB',
    lastUpdated: 'September 2026',
    description: 'High-resolution vectorized society masterplan showing all sectors (Blocks A to F, Mirabel, Royal, Beverly Hills), street numbering, parks, and 150ft main boulevard.',
    downloadUrl: '/images/og/homepage-og.jpg',
    isPopular: true,
  },
  {
    id: 'mirabel-payment-plan',
    title: 'Mirabel Luxury Sector Official 3-Year Payment Schedule',
    category: 'Payment Plans',
    fileFormat: 'PDF',
    fileSize: '3.8 MB',
    lastUpdated: 'September 2026',
    description: 'Complete breakdown of down payments, monthly installments, half-yearly balloting charges, and possession fee schedule for 3, 5, and 10 Marla plots.',
    downloadUrl: '/images/og/property-og.jpg',
    isPopular: true,
  },
  {
    id: 'rate-sheet-2026',
    title: 'Official Sector-Wise Property Rate Sheet & Price Index (2026)',
    category: 'Rate Lists',
    fileFormat: 'PDF',
    fileSize: '2.4 MB',
    lastUpdated: 'September 2026',
    description: 'Audited market rate benchmark guide covering residential and commercial per-Marla prices across all mature and upcoming sectors in Phase 2.',
    downloadUrl: '/images/og/property-og.jpg',
    isPopular: true,
  },
  {
    id: 'society-brochure',
    title: 'Al Rehman Garden Phase 2 Luxury Community Brochure',
    category: 'Brochures',
    fileFormat: 'PDF',
    fileSize: '18.2 MB',
    lastUpdated: 'August 2026',
    description: 'Comprehensive project overview detailing civic amenities, Turkish Grand Jamia Mosque, hospital facilities, schools, and location connectivity matrix.',
    downloadUrl: '/images/og/homepage-og.jpg',
    isPopular: false,
  },
  {
    id: 'noc-verification-guide',
    title: 'LDA Approval & Title Verification Buyer Check-List',
    category: 'Legal',
    fileFormat: 'PDF',
    fileSize: '1.9 MB',
    lastUpdated: 'August 2026',
    description: 'Step-by-step guidance for overseas and local buyers on NDC verification, biometric transfer documentation, and registry procedures.',
    downloadUrl: '/images/og/property-og.jpg',
    isPopular: false,
  },
  {
    id: 'commercial-broadway-layout',
    title: '150ft Commercial Broadway & Civic Center Plaza Master Layout',
    category: 'Maps',
    fileFormat: 'PDF',
    fileSize: '6.2 MB',
    lastUpdated: 'September 2026',
    description: 'Detailed commercial sector demarcation map for 2, 4, and 8 Marla commercial plots, parking bays, and multi-story plaza guidelines.',
    downloadUrl: '/images/og/homepage-og.jpg',
    isPopular: true,
  },
];
