/**
 * Listing Duplicate Detection Engine
 * Al Rehman Garden Phase 2 Lahore Real Estate Scale System
 */

import type { CleanedProperty } from '../cleaners/cleaner';

export interface DuplicateCheckResult {
  isDuplicate: boolean;
  duplicateOfId?: string;
  similarityScore: number;
  reasons: string[];
}

/**
 * Generates a unique comparison fingerprint for a property
 */
export function generatePropertyFingerprint(prop: CleanedProperty): string {
  const normBlock = prop.block.toLowerCase().replace(/[^a-z0-9]/g, '');
  const normSize = prop.size.replace(/[^0-9.]/g, '');
  const normPrice = Math.round(prop.price / 50000); // 50k tolerance bucket
  const normType = prop.propertyType.toLowerCase();
  const normPhone = prop.contactInformation.phone.replace(/[^0-9]/g, '').slice(-7);

  return `${normBlock}_${normSize}${prop.unit}_${normType}_${normPrice}_${normPhone}`;
}

/**
 * Detects duplicates across a collection of properties
 */
export function detectDuplicates(
  candidate: CleanedProperty,
  existingListings: CleanedProperty[]
): DuplicateCheckResult {
  const candidateFingerprint = generatePropertyFingerprint(candidate);
  const reasons: string[] = [];

  for (const existing of existingListings) {
    if (existing.id === candidate.id) continue;

    const existingFingerprint = generatePropertyFingerprint(existing);
    if (candidateFingerprint === existingFingerprint) {
      return {
        isDuplicate: true,
        duplicateOfId: existing.id,
        similarityScore: 98,
        reasons: ['Exact match on property specifications fingerprint'],
      };
    }

    let matchCount = 0;
    const totalChecks = 6;

    // 1. Exact Source URL match
    if (
      candidate.sourceUrl &&
      existing.sourceUrl &&
      candidate.sourceUrl === existing.sourceUrl &&
      candidate.sourceUrl !== 'https://www.zameen.com/' &&
      candidate.sourceUrl !== 'https://alrehmandevelopers.com/al-rehman-garden-phase-2-lahore/'
    ) {
      return {
        isDuplicate: true,
        duplicateOfId: existing.id,
        similarityScore: 100,
        reasons: ['Exact match on unique source URL'],
      };
    }

    // 2. Exact Slug Match
    if (candidate.slug && existing.slug && candidate.slug === existing.slug) {
      matchCount += 2;
      reasons.push('Identical URL slug');
    }

    // 3. Same Block + Same Size + Same Type
    if (
      candidate.block.toLowerCase() === existing.block.toLowerCase() &&
      candidate.size === existing.size &&
      candidate.unit === existing.unit &&
      candidate.propertyType === existing.propertyType
    ) {
      matchCount += 2;
      reasons.push('Identical sector, plot size and property type');
    }

    // 4. Exact or near Price (within 2%)
    const priceDiff = Math.abs(candidate.price - existing.price) / existing.price;
    if (priceDiff <= 0.02) {
      matchCount += 1;
      reasons.push('Price match within 2%');
    }

    // 5. Same Dealer Phone
    const phone1 = candidate.contactInformation.phone.replace(/[^0-9]/g, '').slice(-7);
    const phone2 = existing.contactInformation.phone.replace(/[^0-9]/g, '').slice(-7);
    if (phone1 && phone2 && phone1 === phone2) {
      matchCount += 1;
      reasons.push('Identical dealer phone contact');
    }

    const similarity = Math.round((matchCount / totalChecks) * 100);

    if (similarity >= 80) {
      return {
        isDuplicate: true,
        duplicateOfId: existing.id,
        similarityScore: similarity,
        reasons,
      };
    }
  }

  return {
    isDuplicate: false,
    similarityScore: 0,
    reasons: [],
  };
}
