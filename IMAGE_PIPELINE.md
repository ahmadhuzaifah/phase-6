# Image Pipeline

## Sources

Static assets are stored under `public/images/`, grouped by purpose: `property`, `places`, `maps`, `amenities`, `dealers`, `logo`, `favicon`, and `og`. Imported place and property records reference public paths or source URLs at the data boundary.

## Validation and processing

Image-related checks and maintenance scripts are kept in `src/utils/imageCompliance.ts` and `scripts/`. Property presentation uses `PropertyWatermark.astro` where a branded overlay is required; source records may retain raw and processed image references separately.

## Placeholders

Cards and directory templates fall back to `/images/placeholders/property-placeholder.svg` when a record has no usable image. This preserves layout dimensions and meaningful alt text.

## Optimization and loading

Hero and above-the-fold images use explicit dimensions and eager loading. Gallery, directory, map, and card images use explicit dimensions where the component knows the aspect ratio and lazy loading for below-the-fold content. CSS reserves image space to reduce layout shift.

## Naming conventions

- Use lowercase kebab-case for descriptive raster filenames.
- Keep category folders stable because public paths are part of the deployed asset contract.
- Use `-preview` for map preview images and `-og` for social images.
- Use descriptive alt text based on the page entity, not the filename.
