/**
 * Pre-publish image gate for property media.
 * Detection is intentionally explicit: OCR or visual review supplies the flags,
 * while this utility keeps the accept/reject decision consistent.
 */

export type ImageReviewDecision = 'approved' | 'rejected' | 'needs-watermark-processing';

export interface ImageReviewInput {
  filename: string;
  width: number;
  height: number;
  hasZameenWatermark?: boolean;
  hasThirdPartyWatermark?: boolean;
  hasDealerBranding?: boolean;
  detectedBrandNames?: string[];
  detectedText?: string[];
}

export interface ImageReviewResult {
  decision: ImageReviewDecision;
  destination: 'staging/verified-images' | 'staging/rejected-images' | 'public/images/properties/watermarked';
  reasons: string[];
}

const MIN_WIDTH = 1000;
const MIN_HEIGHT = 650;

export function validatePropertyImage(input: ImageReviewInput): ImageReviewResult {
  const reasons: string[] = [];
  const detectedBrands = input.detectedBrandNames ?? [];
  const detectedText = input.detectedText ?? [];
  const hasPhoneNumber = detectedText.some((text) => /(?:\+?92|0)3\d{2}[-\s]?\d{7}/.test(text));
  const hasThirdPartyBranding = input.hasDealerBranding || input.hasThirdPartyWatermark || detectedBrands.length > 0 || hasPhoneNumber;

  if (input.width < MIN_WIDTH || input.height < MIN_HEIGHT) {
    reasons.push(`Resolution is below ${MIN_WIDTH}x${MIN_HEIGHT}.`);
  }

  if (hasThirdPartyBranding) {
    reasons.push(`Third-party branding or contact mark detected: ${detectedBrands.join(', ') || (hasPhoneNumber ? 'phone number' : 'third-party watermark')}.`);
  }

  if (reasons.length > 0) {
    return {
      decision: 'rejected',
      destination: 'staging/rejected-images',
      reasons,
    };
  }

  if (input.hasZameenWatermark) {
    return {
      decision: 'needs-watermark-processing',
      destination: 'staging/verified-images',
      reasons: ['Remove the source watermark, then apply the portal watermark before publishing.'],
    };
  }

  return {
    decision: 'approved',
    destination: 'public/images/properties/watermarked',
    reasons: ['Image passed quality and branding review; apply the portal watermark before publishing.'],
  };
}
