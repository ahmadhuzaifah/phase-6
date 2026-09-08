# Image Pipeline

## Sources

Static assets are stored under `public/images/`, grouped by purpose: `properties`, `places`, `maps`, `amenities`, `dealers`, `logo`, `favicon`, and `og`. Published property records use local public paths only.

Property images are normalized by `scripts/fix_property_images.py`. The script attempts only the first available candidate, converts it to WebP, and saves it under `public/images/properties/dha-phase-6/`. Remote acquisition URLs are removed from the published JSON after processing.

## Validation and processing

Image-related checks and maintenance scripts are kept in `src/utils/imageCompliance.ts` and `scripts/`. Property presentation uses `PropertyWatermark.astro` where a branded overlay is required; source records may retain raw and processed image references separately.

The Python pipeline verifies that source files decode correctly before converting them to RGB WebP. `scripts/validate_property_images.py` checks every JSON reference against both `public` and the generated `dist` directory and fails when a file is missing, corrupt, remote, or outside the approved path contract.

## Placeholders

Cards and detail templates fall back to `/images/placeholders/property-placeholder.webp` when a record has no usable image or a browser load fails. Every property has either one local property WebP or this placeholder, with dimensions and meaningful alt text.

## Optimization and loading

Hero and above-the-fold images use explicit dimensions and eager loading. Gallery, directory, map, and card images use explicit dimensions where the component knows the aspect ratio and lazy loading for below-the-fold content. CSS reserves image space to reduce layout shift.

## Naming conventions

- Use lowercase kebab-case for descriptive raster filenames.
- Property images use `{property-id}-{sector}-{size}-{unit}.webp`.
- Keep category folders stable because public paths are part of the deployed asset contract.
- Use `-preview` for map preview images and `-og` for social images.
- Use descriptive alt text based on the page entity, not the filename.
