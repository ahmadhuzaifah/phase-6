# DHA Phase 6 Lahore Guide

Independent property, neighbourhood, and market information portal for DHA Phase 6 Lahore. The site is a static Astro application with sector guides, property listings, places, market content, calculators, and buyer resources.

## Stack

- Astro 7 with static output
- Tailwind CSS 4 through Vite
- TypeScript, Zod, Day.js, slugify, and schema-dts
- `@astrojs/sitemap` for XML sitemap generation

## Architecture

```text
src/
  components/       Shared global, property, place, SEO, and homepage components
  data/             Typed TypeScript modules and imported JSON datasets
  layouts/          BaseLayout and PageLayout document shells
  pages/            Static and dynamic route files; URL shape lives here
  styles/           Global variables, typography, and base styles
  types/            Shared TypeScript interfaces
  utils/            Auditing, image compliance, analytics, and SEO helpers
public/             Public images, maps, robots.txt, and web manifest
scripts/            Audits, imports, and maintenance tooling
```

## Content and data

Properties are sourced from `src/data/properties-import.json`. Places are assembled from sector datasets under `src/data/places/`. Editorial articles, FAQs, dealers, jobs, amenities, and development updates are maintained as typed data modules. See [DATA_ARCHITECTURE.md](DATA_ARCHITECTURE.md) for the complete flow.

The automated Python property pipeline lives in `scripts/property_pipeline/`. It performs robots-aware acquisition, cleaning, normalization, duplicate detection, one-image processing, availability tracking, report generation, and atomic Astro export. See [PROPERTY_PIPELINE.md](PROPERTY_PIPELINE.md).

The project intentionally does not use Astro Content Collections. The previous configuration had empty loaders and no page consumer, so direct data modules remain the single source of truth.

## SEO strategy

Every page supplies title, description, canonical, Open Graph, and robots metadata through `Meta.astro`. Page templates add relevant JSON-LD for organizations, places, properties, articles, breadcrumbs, FAQs, and lists. Stable route files and slugs protect existing SEO URLs. Sitemap priorities are configured in `astro.config.mjs`.

## Image management

Images are grouped under `public/images/` by domain. Components use descriptive alt text, intrinsic dimensions, lazy loading for below-the-fold content, and stable placeholders when records do not have an image. See [IMAGE_PIPELINE.md](IMAGE_PIPELINE.md).

## Commands

```bash
npm install
npm run dev        # Start the local development server
npm run check      # Run Astro and TypeScript diagnostics
npm run build      # Check and generate the production site in dist/
npm run preview    # Preview the generated site
npm run lint       # Run ESLint
npm run seo:audit  # Audit generated metadata and internal links
npm run link:audit # Generate internal-link-report.md
npm run properties:update # Run the complete property acquisition pipeline
npm run properties:test   # Run pipeline unit tests
npm run properties:quality:audit # Audit required fields and duplicates
```

## Environment

`PUBLIC_SITE_URL` optionally overrides the canonical site URL. If omitted, the production default is `https://dhaphase6lahore.pk`. Property crawler limits and explicit third-party republication authorization flags are documented in `.env.example`; all authorization flags default to off.

## Deployment

Run `npm run build` and deploy the generated `dist/` directory to any static host. Vercel configuration is included in `vercel.json`; the site also works with Netlify, Cloudflare Pages, or a conventional CDN. Ensure the deployed domain matches `PUBLIC_SITE_URL` and that `/sitemap-index.xml` and `/robots.txt` remain publicly accessible.

## Sitemap

The Astro sitemap integration generates the sitemap during `astro build`. Routes under `/admin/` and `/private/` are excluded by configuration. Submit the deployed sitemap to Google Search Console after deployment.
