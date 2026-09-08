# Property Acquisition Pipeline

## Purpose

The Python pipeline under `scripts/property_pipeline/` collects public DHA Phase 6 Lahore property references, converts them to one stable data model, detects duplicates, controls image handling, tracks availability, and atomically exports `src/data/properties-import.json` for Astro.

It never invents listings. A record is rejected unless it has a real source ID, HTTPS source URL, title, price, size, property type, and source-check date.

## Workflow

```text
Zameen adapter -----\
                     -> raw staging -> clean -> normalize -> deduplicate
Graana adapter -----/                                      |
                                                            v
                    report <- Astro JSON <- validate <- image/lifecycle gates
```

Run the full workflow:

```bash
python -m pip install -r scripts/property_pipeline/requirements.txt
npm run properties:update
```

Run stages independently:

```bash
python scripts/property_pipeline/scrapers/zameen_scraper.py
python scripts/property_pipeline/scrapers/graana_scraper.py
python scripts/property_pipeline/exporters/astro_importer.py
```

Raw JSON and original images are stored below ignored `staging/` paths. The final report is written to `property-import-report.md`.

## Crawl behavior

- The HTTP client fetches and evaluates each origin's current `robots.txt` before every allowed path family.
- Requests use an identifiable user agent, retries with backoff, and a five-second per-origin delay by default.
- Pagination stops when no next page exists, no new source IDs are found, or `PROPERTY_PIPELINE_MAX_PAGES` is reached.
- Source IDs and URLs are deterministic, so interrupted runs can be repeated safely.
- No login, CAPTCHA bypass, proxy rotation, hidden API, or access-control bypass is implemented.

## Rights and compliance

Graana's published terms currently prohibit copying and republishing its content. Its adapter is therefore complete but disabled unless `GRAANA_REPUBLICATION_AUTHORIZED=1` confirms written permission. The same rule applies to full descriptions and third-party images through `PROPERTY_CONTENT_REPUBLICATION_AUTHORIZED` and `PROPERTY_IMAGE_REUSE_AUTHORIZED`.

Without those permissions, the system imports factual source references, generates an original neutral summary, links to permitted sources, and uses the local placeholder. Permission flags must not be enabled merely to bypass the gate.

## Images

Only the first image is attempted; the second is a fallback if the first cannot be downloaded. Originals remain under `staging/raw-property-images/`. Validation checks decoding, format, and minimum dimensions. Portal, dealer, or agency-marked files are classified as `branded` or `watermarked` and are never altered. Only an `approved` rights-cleared image receives an optimized WebP derivative and the site's small 35%-opacity bottom-right watermark.

## Availability

New records start as `available`. Source checks retain `available`, while two consecutive unavailable checks mark a listing `removed`. The verification label is derived from `lastCheckedDate`:

- 0-7 days: `Fresh Listing`
- 8-30 days: `Recently Checked`
- 31-59 days: `Needs Verification`
- 60+ days: `Verification Required`

`reserved` and `sold` remain supported for authorized owner or agent updates. Reserved records stay in active results with a warning; sold records retain their SEO detail route but leave active results; removed records do not generate a detail route.

## Environment variables

See `.env.example` for all settings. Shell environment variables are used directly; Python does not load `.env` automatically, which prevents accidental authorization changes from an unreviewed local file.
