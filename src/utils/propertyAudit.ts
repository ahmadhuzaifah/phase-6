export type VerificationLifecycle = 'fresh' | 'needs-verification' | 'expired';

export interface AuditableProperty {
  id?: string;
  title?: string;
  propertyType?: string;
  purpose?: string;
  size?: string;
  unit?: string;
  block?: string;
  price?: number;
  location?: { address?: string };
  description?: string;
  availabilityStatus?: string;
  lastCheckedDate?: string | Date;
  source?: string;
  sourceUrl?: string;
  slug?: string;
}

export const PROPERTY_REQUIRED_FIELDS = [
  'id',
  'title',
  'propertyType',
  'purpose',
  'size',
  'unit',
  'block',
  'price',
  'location.address',
  'description',
  'availabilityStatus',
  'lastCheckedDate',
  'source',
  'sourceUrl',
] as const;

export function getMissingPropertyFields(property: AuditableProperty): string[] {
  return PROPERTY_REQUIRED_FIELDS.filter((field) => {
    const value = field === 'location.address' ? property.location?.address : property[field as keyof AuditableProperty];
    return value === undefined || value === null || value === '' || (field === 'price' && (typeof value !== 'number' || value <= 0));
  });
}

export function getVerificationLifecycle(date: string | Date, now = new Date()): VerificationLifecycle {
  const ageDays = Math.max(0, (now.getTime() - new Date(date).getTime()) / 86400000);
  if (ageDays <= 30) return 'fresh';
  if (ageDays <= 60) return 'needs-verification';
  return 'expired';
}

export function getVerificationLabel(date: string | Date, now = new Date()): string {
  const ageDays = Math.floor(Math.max(0, (now.getTime() - new Date(date).getTime()) / 86400000));
  const lifecycle = getVerificationLifecycle(date, now);
  if (lifecycle === 'needs-verification') return 'Needs Verification';
  if (lifecycle === 'expired') return 'Verification Expired';
  if (ageDays === 0) return 'Verified Today';
  if (ageDays === 1) return 'Verified Yesterday';
  return `Verified ${ageDays} Days Ago`;
}

export function isPublishableProperty(property: AuditableProperty): boolean {
  return getMissingPropertyFields(property).length === 0 && property.availabilityStatus !== 'removed' && property.availabilityStatus !== 'expired';
}

export interface SimilarProperty extends AuditableProperty {
  slug: string;
}

export function findSimilarProperties<T extends SimilarProperty>(current: T, properties: T[], limit = 3): T[] {
  return properties
    .filter((property) => property.slug !== current.slug && isPublishableProperty(property))
    .map((property) => {
      let score = 0;
      if (property.propertyType === current.propertyType) score += 5;
      if (property.purpose === current.purpose) score += 3;
      if (property.size === current.size && property.unit === current.unit) score += 5;
      if (property.block === current.block) score += 4;
      const priceRatio = current.price && property.price ? Math.abs(property.price - current.price) / current.price : 1;
      if (priceRatio <= 0.2) score += 3;
      return { property, score };
    })
    .sort((a, b) => b.score - a.score || (a.property.price ?? 0) - (b.property.price ?? 0))
    .slice(0, limit)
    .map(({ property }) => property);
}
