export type PropertyFreshnessKey =
  | 'fresh'
  | 'recent'
  | 'needs-verification'
  | 'verification-required';

export interface PropertyFreshness {
  key: PropertyFreshnessKey;
  label: 'Fresh Listing' | 'Recently Checked' | 'Needs Verification' | 'Verification Required';
  ageDays: number | null;
}

const DAY_MS = 86_400_000;

export function getPropertyFreshness(
  checkedAt?: string | Date | null,
  now = new Date(),
): PropertyFreshness {
  const checkedDate = checkedAt ? new Date(checkedAt) : null;
  if (!checkedDate || Number.isNaN(checkedDate.getTime())) {
    return { key: 'verification-required', label: 'Verification Required', ageDays: null };
  }

  const ageDays = Math.max(0, Math.floor((now.getTime() - checkedDate.getTime()) / DAY_MS));
  if (ageDays <= 7) return { key: 'fresh', label: 'Fresh Listing', ageDays };
  if (ageDays <= 30) return { key: 'recent', label: 'Recently Checked', ageDays };
  if (ageDays < 60) return { key: 'needs-verification', label: 'Needs Verification', ageDays };
  return { key: 'verification-required', label: 'Verification Required', ageDays };
}
