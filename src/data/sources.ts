/**
 * Al Rehman Garden Phase 2 — Data Sources
 * Tracking data origins for transparency and attribution.
 */

export interface DataSource {
  id: string;
  name: string;
  type: 'official' | 'agent' | 'community' | 'public-record';
  url?: string;
  description: string;
  reliability: 'high' | 'medium' | 'low';
  lastVerified?: string;
}

export const SOURCES: DataSource[] = [
  // Data sources will be populated as content is added
];

export const VERIFICATION_STATUSES = [
  'verified',
  'unverified',
  'pending',
  'disputed',
] as const;

export type VerificationStatus = (typeof VERIFICATION_STATUSES)[number];
