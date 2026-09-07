# Data Architecture

## Decision

The project uses Option B: direct TypeScript and JSON data modules remain the source of truth, and the unused Astro Content Collections configuration has been removed. No page imported `astro:content`, so introducing collections would add a second publishing path without improving the current static build.

This keeps the existing routes, generated HTML, and build behavior unchanged. A collection can be introduced later for editorial Markdown content when there is a real content workflow to support it.

## Main data flows

### Properties

`src/data/properties-import.json` is imported by property indexes, search pages, SEO landing pages, and property detail routes. Shared presentation and audit logic lives in `src/components/property/` and `src/utils/propertyAudit.ts`. Property slugs are used by `src/pages/properties/[slug].astro` and must remain stable.

### Places

Sector JSON files under `src/data/places/` are assembled by `src/data/places/index.ts`. The index provides typed records, sector/category lookups, and datasets consumed by directory and sector pages. Google Maps imports remain separate in `src/data/google-places-import.json` for pages that use that source.

### Articles

Editorial records live in `src/data/articles.ts`. The blog index and `src/pages/blog/[slug].astro` use the article slug as the stable URL key. Dates, author information, images, and structured data are generated from the same record.

### SEO page generation

Astro page files under `src/pages/` generate static routes. Shared metadata is rendered through `src/components/seo/Meta.astro`, while reusable schema builders are in `src/utils/seo/`. Route files remain the authority for URL shape.

## Guidelines

- Use camelCase for TypeScript data modules and PascalCase for component files.
- Keep imported JSON at the data boundary and validate it in the owning data module.
- Prefer exported interfaces for records used by more than one page.
- Keep display labels separate from URL slugs.
