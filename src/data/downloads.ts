export interface DownloadItem {
  id: string;
  title: string;
  category: 'Maps' | 'Construction' | 'Verification' | 'Market research';
  fileFormat: 'PDF' | 'Web page';
  lastUpdated: string;
  description: string;
  downloadUrl: string;
  publisher: string;
  isOfficial: boolean;
}

export const DOWNLOADS_DATA: DownloadItem[] = [
  {
    id: 'official-phase-vi-map',
    title: 'DHA Lahore Phase VI Map',
    category: 'Maps',
    fileFormat: 'PDF',
    lastUpdated: 'Official file accessed September 2026',
    description: 'Official DHA Lahore Phase VI sector plan showing sectors A-H and J-N, main corridors and surrounding roads.',
    downloadUrl: 'https://dhalahore.org/wp-content/uploads/2025/09/PHASE-VI.pdf',
    publisher: 'DHA Lahore',
    isOfficial: true,
  },
  {
    id: 'official-phase-maps-index',
    title: 'DHA Lahore Phase Maps Index',
    category: 'Maps',
    fileFormat: 'Web page',
    lastUpdated: 'Accessed September 2026',
    description: 'Official index for phase maps. Use this page to check whether DHA Lahore has published a newer Phase VI file.',
    downloadUrl: 'https://dhalahore.org/dha-phases-maps/',
    publisher: 'DHA Lahore',
    isOfficial: true,
  },
  {
    id: 'construction-regulations',
    title: 'DHA Lahore Construction Regulations',
    category: 'Construction',
    fileFormat: 'PDF',
    lastUpdated: 'Official file accessed September 2026',
    description: 'Official construction and development regulations. Confirm later amendments and current forms directly with DHA Lahore.',
    downloadUrl: 'https://dhalahore.org/wp-content/uploads/2026/04/DHA-Construction-Regulaiton-2014-Updated-1.pdf',
    publisher: 'DHA Lahore',
    isOfficial: true,
  },
  {
    id: 'official-faqs',
    title: 'DHA Lahore Official FAQs',
    category: 'Verification',
    fileFormat: 'Web page',
    lastUpdated: 'Accessed September 2026',
    description: 'Official FAQ starting point for procedures and construction questions. Confirm case-specific requirements before a transaction.',
    downloadUrl: 'https://dhalahore.org/faqs/',
    publisher: 'DHA Lahore',
    isOfficial: true,
  },
  {
    id: 'portal-price-research',
    title: 'DHA Phase 6 Asking-Price Snapshot',
    category: 'Market research',
    fileFormat: 'Web page',
    lastUpdated: '2 September 2026',
    description: 'Independent summary of observed third-party asking prices with source links and clear limitations.',
    downloadUrl: '/dha-phase-6-lahore-prices',
    publisher: 'DHA Phase 6 Lahore Information Portal',
    isOfficial: false,
  },
];
