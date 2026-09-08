export type PropertyLifecycleRecord = { availabilityStatus?: string | null };

export function isActiveProperty(property: PropertyLifecycleRecord): boolean {
  const status = (property.availabilityStatus || 'available').toLowerCase();
  return status === 'available' || status === 'reserved';
}

export function isRoutableProperty(property: PropertyLifecycleRecord): boolean {
  return (property.availabilityStatus || 'available').toLowerCase() !== 'removed';
}
