/**
 * Real Estate Dashboard & Inventory Metrics Engine
 * Al Rehman Garden Phase 2 Lahore
 */

import type { PropertyModel } from '../types/property';

export interface DashboardMetrics {
  totalProperties: number;
  activeProperties: number;
  expiredProperties: number;
  averagePrice: number;
  averagePriceFormatted: string;
  countByType: Record<string, number>;
  countByBlock: Record<string, number>;
  verifiedCount: number;
  featuredCount: number;
  lastUpdated: string;
}

export function computeDashboardMetrics(properties: PropertyModel[]): DashboardMetrics {
  const countByType: Record<string, number> = {};
  const countByBlock: Record<string, number> = {};
  let totalPrice = 0;
  let verifiedCount = 0;
  let featuredCount = 0;

  const now = new Date();
  let activeCount = 0;
  let expiredCount = 0;

  properties.forEach((p) => {
    countByType[p.propertyType] = (countByType[p.propertyType] || 0) + 1;
    countByBlock[p.block] = (countByBlock[p.block] || 0) + 1;
    totalPrice += p.price;

    if (p.verificationStatus === 'verified') verifiedCount++;
    if (p.isFeatured) featuredCount++;

    const auditDate = new Date(p.lastCheckedDate || p.publishedDate);
    const diffDays = Math.floor((now.getTime() - auditDate.getTime()) / (1000 * 3600 * 24));
    if (diffDays <= 90) {
      activeCount++;
    } else {
      expiredCount++;
    }
  });

  const avg = properties.length > 0 ? Math.round(totalPrice / properties.length) : 0;
  const avgFormatted =
    avg >= 10000000
      ? `${(avg / 10000000).toFixed(2)} Crore`
      : avg >= 100000
        ? `${(avg / 100000).toFixed(2)} Lakh`
        : new Intl.NumberFormat('en-PK').format(avg);

  return {
    totalProperties: properties.length,
    activeProperties: activeCount,
    expiredProperties: expiredCount,
    averagePrice: avg,
    averagePriceFormatted: avgFormatted,
    countByType,
    countByBlock,
    verifiedCount,
    featuredCount,
    lastUpdated: new Date().toISOString(),
  };
}
