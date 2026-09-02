/**
 * Al Rehman Garden Phase 2 Lahore — Content Collections Configuration
 * Strict Zod validation schemas for Properties, Blocks, Places, Dealers, and News.
 * Rejects publishing if essential legal, pricing, or location fields are missing.
 */

import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

/* ── Properties Collection ──────────────────────────────────────────────────── */
const properties = defineCollection({
  loader: { name: 'properties', async load() {} },
  schema: z.object({
    id: z.string().min(1, 'Property ID is required for verification tracking'),
    title: z.string().min(5, 'Title must be descriptive (min 5 chars)'),
    slug: z.string().min(3),
    propertyType: z.enum([
      'residential-plot',
      'commercial-plot',
      'house',
      'villa',
      'shop',
      'apartment',
      'portion-floor',
      'penthouse',
      'farm-house',
    ]),
    purpose: z.enum(['sale', 'rent', 'lease']),
    price: z.number().positive('Price must be a positive number'),
    currency: z.enum(['PKR', 'USD']).default('PKR'),
    priceUnit: z.enum(['PKR', 'Lakh', 'Crore']).default('PKR'),
    pricePrefix: z.string().optional(),
    size: z.string().min(1, 'Property size is required'),
    unit: z.enum(['marla', 'kanal', 'sqft', 'sqyd']).default('marla'),
    bedrooms: z.number().int().nonnegative().optional(),
    bathrooms: z.number().int().nonnegative().optional(),
    location: z.object({
      address: z.string().min(3, 'Address or street name is required'),
      city: z.string().default('Lahore'),
      province: z.string().default('Punjab'),
      coordinates: z
        .object({
          lat: z.number(),
          lng: z.number(),
        })
        .optional(),
    }),
    block: z.string().min(1, 'Block / Sector name is required'),
    description: z.string().min(10, 'Detailed property description is required'),
    features: z.array(z.string()).default([]),
    possessionStatus: z
      .enum(['possession', 'non-possession', 'under-construction', 'developed'])
      .default('possession'),
    images: z
      .array(
        z.object({
          url: z.string(),
          alt: z.string(),
          caption: z.string().optional(),
          isFeatured: z.boolean().default(false),
          order: z.number().optional(),
        }),
      )
      .default([]),
    watermarkedImages: z
      .array(
        z.object({
          url: z.string(),
          rawUrl: z.string().optional(),
          watermarkType: z.enum(['standard', 'banner', 'center-seal']).default('standard'),
          processedDate: z.string().optional(),
        }),
      )
      .optional(),
    source: z.string().min(1, 'Source name is required for legal transparency'),
    sourceUrl: z.url().optional(),
    sourceName: z.string().optional(),
    sourceURL: z.url().optional(),
    sourceType: z
      .enum(['portal-extraction', 'official-developer', 'authorized-dealer', 'direct-allotment'])
      .default('portal-extraction'),
    verificationStatus: z
      .enum(['verified', 'unverified', 'under-review', 'expired', 'disputed'])
      .default('unverified'),
    publishedDate: z.coerce.date(),
    lastCheckedDate: z.coerce.date(),
    contactInformation: z.object({
      agentName: z.string().optional(),
      agencyName: z.string().optional(),
      phone: z.string().min(7, 'Valid contact phone is required'),
      whatsapp: z.string().min(7, 'Valid WhatsApp number is required'),
      email: z.email().optional(),
      officeAddress: z.string().optional(),
      verifiedDealer: z.boolean().default(false),
    }),
    isFeatured: z.boolean().default(false),
    legalNotice: z.string().optional(),
  }),
});

/* ── Blocks Collection ──────────────────────────────────────────────────────── */
const blocks = defineCollection({
  loader: { name: 'blocks', async load() {} },
  schema: z.object({
    name: z.string().min(1),
    slug: z.string().min(1),
    category: z.enum(['executive', 'residential', 'luxury-villas', 'commercial']).default('residential'),
    status: z.enum(['developed', 'under-development', 'possession-ready', 'planned']).default('possession-ready'),
    possessionPercentage: z.number().min(0).max(100).default(100),
    description: z.string(),
    locationHighlight: z.string().optional(),
    map: z.string().optional(),
    plotTypes: z.array(z.string()).default([]),
    plotSizes: z.array(z.string()).default([]),
    features: z.array(z.string()).default([]),
    publishedDate: z.coerce.date().default(() => new Date()),
    updatedDate: z.coerce.date().optional(),
  }),
});

/* ── Places & Nearby Amenities Collection ───────────────────────────────────── */
const places = defineCollection({
  loader: { name: 'places', async load() {} },
  schema: z.object({
    name: z.string().min(1),
    slug: z.string().min(1),
    category: z.enum([
      'education',
      'healthcare',
      'shopping',
      'transportation',
      'recreation',
      'worship',
      'dining',
    ]),
    description: z.string(),
    address: z.string().optional(),
    distance: z.string().optional(),
    coordinates: z
      .object({
        lat: z.number(),
        lng: z.number(),
      })
      .optional(),
    images: z
      .array(
        z.object({
          url: z.string(),
          alt: z.string(),
        }),
      )
      .default([]),
    publishedDate: z.coerce.date().default(() => new Date()),
  }),
});

/* ── Property Dealers & Agencies Collection ─────────────────────────────────── */
const dealers = defineCollection({
  loader: { name: 'dealers', async load() {} },
  schema: z.object({
    name: z.string().min(2, 'Dealer name is required'),
    agencyName: z.string().min(2, 'Agency name is required'),
    slug: z.string().min(2),
    rating: z.number().min(1).max(5).default(5),
    isVerified: z.boolean().default(true),
    phone: z.string().min(7),
    whatsapp: z.string().min(7),
    email: z.email().optional(),
    officeAddress: z.string().min(5),
    experienceYears: z.number().nonnegative().default(5),
    specializationBlocks: z.array(z.string()).default([]),
    activeListingsCount: z.number().nonnegative().default(0),
    logo: z.string().optional(),
    photo: z.string().optional(),
    description: z.string().default('Authorized Property Dealer in Al Rehman Garden Phase 2 Lahore.'),
    licenseNumber: z.string().optional(),
  }),
});

/* ── News & Market Updates Collection ───────────────────────────────────────── */
const news = defineCollection({
  loader: { name: 'news', async load() {} },
  schema: z.object({
    title: z.string().min(5),
    slug: z.string().min(2),
    date: z.coerce.date(),
    excerpt: z.string().min(10),
    author: z.string().default('Al Rehman Garden Editorial'),
    category: z.enum(['update', 'development', 'market', 'announcement', 'rates']).default('update'),
    image: z
      .object({
        url: z.string(),
        alt: z.string(),
      })
      .optional(),
    tags: z.array(z.string()).default([]),
    publishedDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
  }),
});

/* ── Export Collections ─────────────────────────────────────────────────────── */
export const collections = {
  properties,
  blocks,
  places,
  dealers,
  news,
};
