/**
 * Data Cleaning & Normalization Engine
 * Al Rehman Garden Phase 2 Lahore Real Estate Automation Pipeline
 */

import type { PropertyType, PropertyPurpose } from '../../src/types/property';

export interface RawPropertyInput {
  id?: string;
  title: string;
  propertyType?: string;
  purpose?: string;
  price: string | number;
  size: string | number;
  unit?: string;
  block?: string;
  location?: string | { address: string; city?: string; province?: string; coordinates?: { lat: number; lng: number } };
  description?: string;
  features?: string[] | string;
  images?: Array<{ url: string; alt?: string; caption?: string }>;
  source?: string;
  sourceUrl?: string;
  sourceType?: string;
  contact?: { name?: string; phone?: string; whatsapp?: string; agency?: string };
  publishedDate?: string;
  lastCheckedDate?: string;
  bedrooms?: number | string;
  bathrooms?: number | string;
}

export interface CleanedProperty {
  id: string;
  title: string;
  slug: string;
  propertyType: PropertyType;
  purpose: PropertyPurpose;
  price: number;
  priceUnit: 'PKR' | 'Lakh' | 'Crore';
  size: string;
  unit: 'marla' | 'kanal' | 'sqft' | 'sqyd';
  block: string;
  location: {
    address: string;
    city: string;
    province: string;
    coordinates?: { lat: number; lng: number };
  };
  description: string;
  features: string[];
  bedrooms?: number;
  bathrooms?: number;
  possessionStatus: 'possession' | 'under-construction' | 'file-only' | 'developed';
  images: Array<{ url: string; alt: string; caption?: string; isFeatured: boolean; order: number }>;
  source: string;
  sourceUrl: string;
  sourceType: 'official-developer' | 'portal-extraction' | 'dealer-listing' | 'manual-verified';
  verificationStatus: 'verified' | 'pending' | 'unverified';
  publishedDate: string;
  lastCheckedDate: string;
  contactInformation: {
    agentName: string;
    agencyName?: string;
    phone: string;
    whatsapp: string;
    email?: string;
    verifiedDealer: boolean;
  };
  isFeatured?: boolean;
}

/**
 * Normalizes text price to numeric PKR value
 */
export function cleanPrice(val: string | number): { price: number; priceUnit: 'PKR' | 'Lakh' | 'Crore' } {
  if (typeof val === 'number') {
    if (val >= 10000000) return { price: val, priceUnit: 'Crore' };
    if (val >= 100000) return { price: val, priceUnit: 'Lakh' };
    return { price: val, priceUnit: 'PKR' };
  }

  const clean = val.toLowerCase().replace(/,/g, '').trim();
  const numMatch = clean.match(/[\d.]+/);
  const num = numMatch ? parseFloat(numMatch[0]) : 0;

  if (clean.includes('crore') || clean.includes('cr')) {
    return { price: Math.round(num * 10000000), priceUnit: 'Crore' };
  }
  if (clean.includes('lakh') || clean.includes('lac')) {
    return { price: Math.round(num * 100000), priceUnit: 'Lakh' };
  }
  if (num < 100) {
    // If entered like "45" meaning 45 Lakh
    return { price: Math.round(num * 100000), priceUnit: 'Lakh' };
  }
  return { price: Math.round(num), priceUnit: num >= 10000000 ? 'Crore' : num >= 100000 ? 'Lakh' : 'PKR' };
}

/**
 * Normalizes property size and unit
 */
export function cleanSize(val: string | number, defaultUnit: 'marla' | 'kanal' = 'marla'): { size: string; unit: 'marla' | 'kanal' | 'sqft' | 'sqyd' } {
  if (typeof val === 'number') {
    return { size: val.toString(), unit: defaultUnit };
  }
  const clean = val.toLowerCase().replace(/,/g, '').trim();
  const numMatch = clean.match(/[\d.]+/);
  const sizeNum = numMatch ? numMatch[0] : '5';

  if (clean.includes('kanal')) return { size: sizeNum, unit: 'kanal' };
  if (clean.includes('sqft')) return { size: sizeNum, unit: 'sqft' };
  if (clean.includes('sqyd')) return { size: sizeNum, unit: 'sqyd' };
  return { size: sizeNum, unit: 'marla' };
}

/**
 * Normalizes society block name
 */
export function cleanBlock(raw: string = ''): string {
  const s = raw.toLowerCase().trim();
  if (s.includes('mirabel')) return 'Mirabel Block (Luxury Sector)';
  if (s.includes('royal')) return 'Royal Block';
  if (s.includes('beverly')) return 'Beverly Hills Block';
  if (s.includes('rose') || s.includes('block d') || s.includes('block-d')) return 'Block D (Rose Garden)';
  if (s.includes('block a') || s.includes('block-a') || s.includes('executive')) return 'Block A (Executive)';
  if (s.includes('block b') || s.includes('block-b')) return 'Block B (Prime Residential)';
  if (s.includes('block c') || s.includes('block-c') || s.includes('broadway')) return 'Block C (Commercial & Civic)';
  if (s.includes('block e') || s.includes('block-e') || s.includes('block f') || s.includes('block-f')) return 'Block E & F (Possession Ready)';
  return raw.trim() || 'Block A (Executive)';
}

/**
 * Normalizes property type enum
 */
export function cleanPropertyType(raw: string = '', title: string = ''): PropertyType {
  const combined = `${raw} ${title}`.toLowerCase();
  if (combined.includes('commercial plot')) return 'commercial-plot';
  if (combined.includes('shop') || combined.includes('store') || combined.includes('showroom')) return 'shop';
  if (combined.includes('villa') || combined.includes('triplex')) return 'villa';
  if (combined.includes('portion') || combined.includes('upper portion') || combined.includes('lower portion')) return 'portion-floor';
  if (combined.includes('house') || combined.includes('home')) return 'house';
  if (combined.includes('commercial')) return 'commercial-plot';
  return 'residential-plot';
}
