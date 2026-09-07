interface QualityProperty {
  title?: unknown;
  propertyType?: unknown;
  purpose?: unknown;
  price?: unknown;
  size?: unknown;
  unit?: unknown;
  source?: unknown;
  sourceUrl?: unknown;
  description?: string | null;
  lastCheckedDate?: string | Date | null;
  lastSeenAt?: string | Date | null;
  imageStatus?: string | null;
  block?: unknown;
  location?: {
    coordinates?: unknown;
    sector?: unknown;
    commercialArea?: unknown;
    block?: unknown;
    address?: unknown;
  } | null;
  qualityScore?: number | null;
}

export interface PropertyQualityBreakdown {
  completeness: number;
  images: number;
  locationAccuracy: number;
  description: number;
  freshness: number;
}

export interface PropertyQualityResult {
  score: number;
  breakdown: PropertyQualityBreakdown;
  publishable: boolean;
}

const DAY_MS = 86_400_000;

export function generatePropertyQualityScore(
  property: QualityProperty,
  now = new Date(),
): PropertyQualityResult {
  const required = [
    property.title,
    property.propertyType,
    property.purpose,
    property.price,
    property.size,
    property.unit,
    property.source,
    property.sourceUrl,
    property.description,
    property.lastCheckedDate,
  ];
  const completeness = Math.round((required.filter(Boolean).length / required.length) * 30);

  const imageStatus = property.imageStatus ?? 'rejected';
  const images = imageStatus === 'approved' ? 20 : ['branded', 'watermarked'].includes(imageStatus) ? 10 : 0;

  const location = property.location;
  const locationAccuracy = location?.coordinates
    ? 20
    : location?.sector || location?.commercialArea
      ? 18
      : location?.block || property.block
        ? 10
        : location?.address
          ? 5
          : 0;

  const descriptionLength = property.description?.trim().length ?? 0;
  const description = descriptionLength >= 180 ? 15 : descriptionLength >= 120 ? 10 : descriptionLength >= 60 ? 5 : 0;

  const checkedAt = new Date(String(property.lastSeenAt ?? property.lastCheckedDate ?? ''));
  const ageDays = Number.isNaN(checkedAt.getTime()) ? Number.POSITIVE_INFINITY : Math.max(0, (now.getTime() - checkedAt.getTime()) / DAY_MS);
  const freshness = ageDays <= 30 ? 15 : ageDays <= 60 ? 8 : 0;

  const breakdown = { completeness, images, locationAccuracy, description, freshness };
  const score = Object.values(breakdown).reduce((total, value) => total + value, 0);
  return { score, breakdown, publishable: score >= 60 };
}

export function isPublishableProperty(property: QualityProperty): boolean {
  return (property.qualityScore ?? generatePropertyQualityScore(property).score) >= 60;
}
