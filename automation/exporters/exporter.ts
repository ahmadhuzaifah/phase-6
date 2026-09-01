/**
 * Verified Data Exporter & Publishing Engine
 * Al Rehman Garden Phase 2 Lahore Automation Pipeline
 */

import type { CleanedProperty } from '../cleaners/cleaner';

export interface ExportManifest {
  exportedAt: string;
  totalListings: number;
  averagePrice: number;
  breakdownByType: Record<string, number>;
  breakdownByBlock: Record<string, number>;
}

/**
 * Generates an export summary manifest
 */
export function generateExportManifest(properties: CleanedProperty[]): ExportManifest {
  const typeCount: Record<string, number> = {};
  const blockCount: Record<string, number> = {};
  let totalPrice = 0;

  properties.forEach((p) => {
    typeCount[p.propertyType] = (typeCount[p.propertyType] || 0) + 1;
    blockCount[p.block] = (blockCount[p.block] || 0) + 1;
    totalPrice += p.price;
  });

  return {
    exportedAt: new Date().toISOString(),
    totalListings: properties.length,
    averagePrice: properties.length > 0 ? Math.round(totalPrice / properties.length) : 0,
    breakdownByType: typeCount,
    breakdownByBlock: blockCount,
  };
}
