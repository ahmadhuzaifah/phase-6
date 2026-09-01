/**
 * Listing Freshness & Expiry Management Engine
 * Al Rehman Garden Phase 2 Lahore Authority Platform
 */

import type { CleanedProperty } from '../cleaners/cleaner';

export type FreshnessStatus = 'fresh' | 'needs-review' | 'expired';

export interface FreshnessReport {
  status: FreshnessStatus;
  daysSinceAudit: number;
  isActive: boolean;
  actionRequired?: string;
}

/**
 * Computes freshness status based on last audited timestamp
 */
export function evaluateFreshness(prop: CleanedProperty): FreshnessReport {
  const auditDate = new Date(prop.lastCheckedDate || prop.publishedDate);
  const now = new Date();
  const days = Math.max(0, Math.floor((now.getTime() - auditDate.getTime()) / (1000 * 3600 * 24)));

  if (days <= 30) {
    return {
      status: 'fresh',
      daysSinceAudit: days,
      isActive: true,
    };
  } else if (days <= 90) {
    return {
      status: 'needs-review',
      daysSinceAudit: days,
      isActive: true,
      actionRequired: 'Verify plot availability and update market price with on-site desk.',
    };
  } else {
    return {
      status: 'expired',
      daysSinceAudit: days,
      isActive: false,
      actionRequired: 'Delist from active directory or conduct complete physical re-audit.',
    };
  }
}

/**
 * Filters a collection to only active (non-expired) listings
 */
export function getActiveListings(properties: CleanedProperty[]): CleanedProperty[] {
  return properties.filter((p) => {
    const report = evaluateFreshness(p);
    return report.isActive;
  });
}
