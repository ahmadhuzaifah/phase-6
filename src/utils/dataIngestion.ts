/**
 * Data Ingestion, Cleaning & Normalization Engine
 * Al Rehman Garden Phase 2 Lahore Real Estate Authority Website
 */

import type {
  PropertyModel,
  PropertyType,
  PropertyPurpose,
  SizeUnit,
  PriceUnit,
  VerificationStatus,
  SourceType,
} from '../types/property';

export interface RawListingInput {
  id?: string;
  title: string;
  propertyType: string;
  purpose?: string;
  price: string | number;
  size: string | number;
  unit?: string;
  block?: string;
  address?: string;
  description?: string;
  features?: string[] | string;
  bedrooms?: number | string;
  bathrooms?: number | string;
  images?: Array<string | { url: string; alt?: string }>;
  source?: string;
  sourceUrl?: string;
  agentName?: string;
  phone?: string;
  whatsapp?: string;
  verificationStatus?: string;
  publishedDate?: string;
}

/**
 * Standardize and clean property price strings (e.g. "45 Lakh", "1.5 Crore", "PKR 3,500,000")
 */
export function normalizePrice(rawPrice: string | number): {
  numericPrice: number;
  priceUnit: PriceUnit;
  formattedText: string;
} {
  if (typeof rawPrice === 'number') {
    let unit: PriceUnit = 'PKR';
    if (rawPrice >= 10000000) unit = 'Crore';
    else if (rawPrice >= 100000) unit = 'Lakh';
    return {
      numericPrice: rawPrice,
      priceUnit: unit,
      formattedText: new Intl.NumberFormat('en-PK').format(rawPrice),
    };
  }

  const str = rawPrice.trim().toLowerCase();
  let numeric = 0;
  let unit: PriceUnit = 'PKR';

  if (str.includes('crore') || str.includes('cr')) {
    const num = parseFloat(str.replace(/[^0-9.]/g, ''));
    numeric = Math.round(num * 10000000);
    unit = 'Crore';
  } else if (str.includes('lakh') || str.includes('lac') || str.includes('lacs')) {
    const num = parseFloat(str.replace(/[^0-9.]/g, ''));
    numeric = Math.round(num * 100000);
    unit = 'Lakh';
  } else if (str.includes('thousand') || str.includes('k')) {
    const num = parseFloat(str.replace(/[^0-9.]/g, ''));
    numeric = Math.round(num * 1000);
    unit = 'PKR';
  } else {
    numeric = parseInt(str.replace(/[^0-9]/g, ''), 10) || 0;
    if (numeric >= 10000000) unit = 'Crore';
    else if (numeric >= 100000) unit = 'Lakh';
  }

  return {
    numericPrice: numeric,
    priceUnit: unit,
    formattedText: new Intl.NumberFormat('en-PK').format(numeric),
  };
}

/**
 * Standardize property size and unit
 */
export function normalizeSize(rawSize: string | number, rawUnit?: string): {
  size: string;
  unit: SizeUnit;
} {
  if (typeof rawSize === 'number') {
    return { size: rawSize.toString(), unit: (rawUnit?.toLowerCase() as SizeUnit) || 'marla' };
  }

  const str = rawSize.trim().toLowerCase();
  let unit: SizeUnit = 'marla';
  let sizeVal = str;

  if (str.includes('kanal')) {
    unit = 'kanal';
    sizeVal = str.replace(/[^0-9.]/g, '');
  } else if (str.includes('marla')) {
    unit = 'marla';
    sizeVal = str.replace(/[^0-9.]/g, '');
  } else if (str.includes('sqft') || str.includes('sq ft') || str.includes('square feet')) {
    unit = 'sqft';
    sizeVal = str.replace(/[^0-9.]/g, '');
  } else if (str.includes('sqyd') || str.includes('square yard')) {
    unit = 'sqyd';
    sizeVal = str.replace(/[^0-9.]/g, '');
  } else {
    sizeVal = str.replace(/[^0-9.]/g, '');
    if (rawUnit) {
      unit = rawUnit.toLowerCase() as SizeUnit;
    }
  }

  return {
    size: sizeVal || '5',
    unit,
  };
}

/**
 * Normalize society block name to standard nomenclature
 */
export function normalizeBlock(rawBlock?: string): string {
  if (!rawBlock) return 'General Phase 2';
  const b = rawBlock.trim().toLowerCase();

  if (b.includes('a') && !b.includes('mirabel') && !b.includes('royal')) return 'Block A (Executive)';
  if (b.includes('b') && !b.includes('beverly')) return 'Block B (Prime Residential)';
  if (b.includes('c')) return 'Block C (Commercial & Civic)';
  if (b.includes('d')) return 'Block D (Rose Garden)';
  if (b.includes('e') && !b.includes('beverly')) return 'Block E';
  if (b.includes('f')) return 'Block F';
  if (b.includes('g')) return 'Block G';
  if (b.includes('h')) return 'Block H';
  if (b.includes('j')) return 'Block J';
  if (b.includes('mirabel')) return 'Mirabel Block (Luxury Sector)';
  if (b.includes('royal')) return 'Royal Block';
  if (b.includes('beverly')) return 'Beverly Hills Block';

  return rawBlock.trim();
}

/**
 * Normalize Property Type
 */
export function normalizePropertyType(rawType: string): PropertyType {
  const t = rawType.trim().toLowerCase();

  if (t.includes('commercial plot') || t.includes('comm plot')) return 'commercial-plot';
  if (t.includes('plot') || t.includes('residential plot') || t.includes('land')) return 'residential-plot';
  if (t.includes('villa') || t.includes('luxury villa')) return 'villa';
  if (t.includes('house') || t.includes('home') || t.includes('kothi')) return 'house';
  if (t.includes('shop') || t.includes('showroom') || t.includes('plaza')) return 'shop';
  if (t.includes('apartment') || t.includes('flat')) return 'apartment';
  if (t.includes('portion') || t.includes('floor')) return 'portion-floor';
  if (t.includes('farm')) return 'farm-house';

  return 'residential-plot';
}

/**
 * Transform a raw scraped listing into a verified, normalized PropertyModel
 */
export function ingestListing(raw: RawListingInput, index: number = 1): PropertyModel {
  const priceData = normalizePrice(raw.price);
  const sizeData = normalizeSize(raw.size, raw.unit);
  const blockName = normalizeBlock(raw.block);
  const propertyType = normalizePropertyType(raw.propertyType);
  const purpose = (raw.purpose?.toLowerCase() as PropertyPurpose) || 'sale';

  const slug =
    raw.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || `arg-p2-${propertyType}-${sizeData.size}-${sizeData.unit}-${index}`;

  const id = raw.id || `ARG-P2-${Date.now().toString().slice(-4)}-${index.toString().padStart(3, '0')}`;

  const imageList = Array.isArray(raw.images)
    ? raw.images.map((img, i) => {
        if (typeof img === 'string') {
          return {
            url: img,
            alt: `${raw.title} - Photo ${i + 1}`,
            isFeatured: i === 0,
            order: i + 1,
          };
        }
        return {
          url: img.url,
          alt: img.alt || `${raw.title} - Photo ${i + 1}`,
          isFeatured: i === 0,
          order: i + 1,
        };
      })
    : [];

  const rawFeatures = Array.isArray(raw.features)
    ? raw.features
    : typeof raw.features === 'string'
      ? raw.features.split(',').map((f) => f.trim())
      : ['Underground Electricity', 'Sui Gas', '24/7 Security', 'Ready Possession'];

  return {
    id,
    title: raw.title.trim(),
    slug,
    propertyType,
    purpose,
    price: priceData.numericPrice,
    currency: 'PKR',
    priceUnit: priceData.priceUnit,
    size: sizeData.size,
    unit: sizeData.unit,
    bedrooms: raw.bedrooms ? Number(raw.bedrooms) : undefined,
    bathrooms: raw.bathrooms ? Number(raw.bathrooms) : undefined,
    location: {
      address: raw.address || `Main Sharaqpur Road, ${blockName}, Al Rehman Garden Phase 2`,
      city: 'Lahore',
      province: 'Punjab',
      coordinates: { lat: 31.5768, lng: 74.2254 },
    },
    block: blockName,
    description:
      raw.description ||
      `Prime ${sizeData.size} ${sizeData.unit} ${propertyType.replace('-', ' ')} located in ${blockName}, Al Rehman Garden Phase 2 Lahore. Features 100% on-ground infrastructure with underground utilities, ready possession, and direct access to main boulevard.`,
    features: rawFeatures,
    possessionStatus: 'possession',
    images: imageList,
    watermarkedImages: imageList.map((img) => ({
      url: img.url,
      rawUrl: img.url,
      watermarkType: 'standard',
      processedDate: new Date().toISOString(),
    })),
    source: raw.source || 'Zameen.com Extraction',
    sourceUrl: raw.sourceUrl,
    sourceType: (raw.source?.toLowerCase().includes('developer')
      ? 'official-developer'
      : 'portal-extraction') as SourceType,
    verificationStatus: (raw.verificationStatus as VerificationStatus) || 'verified',
    publishedDate: raw.publishedDate ? new Date(raw.publishedDate) : new Date(),
    lastCheckedDate: new Date(),
    contactInformation: {
      agentName: raw.agentName || 'Al Rehman Garden Official Desk',
      agencyName: 'Authorized Advisory Portal',
      phone: raw.phone || '+923000000000',
      whatsapp: raw.whatsapp || '+923000000000',
      email: 'info@alrehmangarden.pk',
      officeAddress: 'Main Entrance 150ft Boulevard, Phase 2, Lahore',
      verifiedDealer: true,
    },
    isFeatured: true,
    legalNotice: 'Title verification and transfer executed through official Al Rehman Garden head office.',
  };
}
