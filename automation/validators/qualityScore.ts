/**
 * Property Quality Score Engine
 * Al Rehman Garden Phase 2 Lahore Quality Audit System
 */

import type { CleanedProperty } from '../cleaners/cleaner';

export interface QualityScoreReport {
  score: number;
  maxScore: 100;
  isPublishable: boolean;
  breakdown: {
    specsCompleteness: number; // Max 25
    imageQuality: number;      // Max 20
    sourceVerification: number;// Max 20
    descriptionQuality: number;// Max 15
    contactValidity: number;   // Max 10
    freshness: number;         // Max 10
  };
  recommendations: string[];
}

export const MINIMUM_PUBLISHABLE_SCORE = 60;

/**
 * Calculates a comprehensive 100-point quality score for a listing
 */
export function calculateQualityScore(prop: CleanedProperty): QualityScoreReport {
  const recommendations: string[] = [];
  let specs = 0;
  let images = 0;
  let source = 0;
  let description = 0;
  let contact = 0;
  let freshness = 0;

  // 1. Specifications Completeness (Max 25 pts)
  if (prop.title && prop.title.length >= 10) specs += 5;
  if (prop.size && parseFloat(prop.size) > 0) specs += 5;
  if (prop.price && prop.price > 0) specs += 5;
  if (prop.block && prop.block.length > 3) specs += 5;
  if (prop.location && prop.location.address && prop.location.address.length > 5) specs += 5;
  if (specs < 25) recommendations.push('Add missing plot dimensions, exact street address or price unit.');

  // 2. Image Quality (Max 20 pts)
  if (prop.images && prop.images.length > 0) {
    images += 10;
    if (prop.images[0].alt && prop.images[0].alt.length >= 10) images += 5;
    if (prop.images.length >= 2 || prop.images[0].caption) images += 5;
  } else {
    recommendations.push('Attach at least 1 high-resolution watermarked property photo with descriptive alt text.');
  }

  // 3. Source Verification (Max 20 pts)
  if (prop.verificationStatus === 'verified') {
    source += 15;
    if (prop.sourceUrl && prop.sourceUrl.startsWith('http')) source += 5;
  } else if (prop.verificationStatus === 'pending') {
    source += 8;
    recommendations.push('Conduct on-ground verification audit before marking as verified.');
  } else {
    recommendations.push('Unverified listing requires source attribution and title check.');
  }

  // 4. Description & Features (Max 15 pts)
  if (prop.description && prop.description.length >= 80) {
    description += 8;
  } else {
    recommendations.push('Expand property description with detailed orientation and location benefits.');
  }
  if (prop.features && prop.features.length >= 4) {
    description += 7;
  } else if (prop.features && prop.features.length > 0) {
    description += 3;
    recommendations.push('Add at least 4 society feature tags (e.g. underground power, park facing).');
  }

  // 5. Contact Validity (Max 10 pts)
  if (prop.contactInformation) {
    if (prop.contactInformation.phone && prop.contactInformation.phone.length >= 10) contact += 5;
    if (prop.contactInformation.whatsapp && prop.contactInformation.whatsapp.length >= 10) contact += 3;
    if (prop.contactInformation.verifiedDealer) contact += 2;
  } else {
    recommendations.push('Provide authorized dealer name, phone, and direct WhatsApp number.');
  }

  // 6. Freshness (Max 10 pts)
  const auditDate = new Date(prop.lastCheckedDate || prop.publishedDate);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - auditDate.getTime()) / (1000 * 3600 * 24));

  if (diffDays <= 30) {
    freshness = 10;
  } else if (diffDays <= 60) {
    freshness = 6;
  } else if (diffDays <= 90) {
    freshness = 3;
  } else {
    freshness = 0;
    recommendations.push('Listing audit date is older than 90 days. Refresh price and availability.');
  }

  const totalScore = specs + images + source + description + contact + freshness;

  return {
    score: totalScore,
    maxScore: 100,
    isPublishable: totalScore >= MINIMUM_PUBLISHABLE_SCORE,
    breakdown: {
      specsCompleteness: specs,
      imageQuality: images,
      sourceVerification: source,
      descriptionQuality: description,
      contactValidity: contact,
      freshness,
    },
    recommendations,
  };
}
