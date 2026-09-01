/**
 * SEO & Schema Automation Engine
 * Al Rehman Garden Phase 2 Lahore Authority Platform
 */

import type { CleanedProperty } from '../cleaners/cleaner';

export interface AutomatedSeoBundle {
  title: string;
  description: string;
  slug: string;
  canonicalUrl: string;
  schemaProduct: Record<string, unknown>;
  schemaBreadcrumbs: Record<string, unknown>;
}

/**
 * Formats PKR numbers into Lakh / Crore strings
 */
function formatPKR(val: number): string {
  if (val >= 10000000) return `${(val / 10000000).toFixed(2)} Crore`;
  if (val >= 100000) return `${(val / 100000).toFixed(2)} Lakh`;
  return new Intl.NumberFormat('en-PK').format(val);
}

/**
 * Generates SEO meta and Schema.org structured data for a property listing
 */
export function generatePropertySeo(prop: CleanedProperty, siteUrl: string = 'https://alrehmangarden.pk'): AutomatedSeoBundle {
  const formattedPrice = formatPKR(prop.price);
  const purposeText = prop.purpose === 'sale' ? 'For Sale' : 'For Rent';
  const typeText = prop.propertyType.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  // Template: "[Size] [Property Type] for [Purpose] in [Block], Al Rehman Garden Phase 2 Lahore"
  const title = `${prop.size} ${prop.unit.toUpperCase()} ${typeText} ${purposeText} in ${prop.block} — Al Rehman Garden Phase 2`;
  const description = `${prop.size} ${prop.unit} ${prop.propertyType.replace('-', ' ')} for ${prop.purpose} in ${prop.block}, Al Rehman Garden Phase 2 Lahore. Price: PKR ${formattedPrice}. Verified on-ground listing with direct advisory support.`;

  const canonicalUrl = `${siteUrl}/properties/${prop.slug}`;

  // Schema: Product / RealEstateListing
  const schemaProduct = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: prop.title,
    description: prop.description,
    offers: {
      '@type': 'Offer',
      price: prop.price,
      priceCurrency: 'PKR',
      availability: 'https://schema.org/InStock',
      url: canonicalUrl,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: prop.location.address,
      addressLocality: prop.location.city,
      addressRegion: prop.location.province,
      addressCountry: 'PK',
    },
  };

  // Schema: BreadcrumbList
  const schemaBreadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Properties',
        item: `${siteUrl}/properties`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: prop.title,
        item: canonicalUrl,
      },
    ],
  };

  return {
    title,
    description,
    slug: prop.slug,
    canonicalUrl,
    schemaProduct,
    schemaBreadcrumbs,
  };
}
