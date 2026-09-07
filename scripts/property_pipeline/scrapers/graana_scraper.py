"""Permission-gated Graana public listing adapter."""

from __future__ import annotations

import re
import sys
from pathlib import Path

if __package__ in {None, ""}:
    sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from property_pipeline.config import CONFIG, PipelineConfig
from property_pipeline.models import ScrapeResult
from property_pipeline.scrapers.common import ComplianceError, RobotsAwareClient, write_json
from property_pipeline.scrapers.portal_parser import discover_links, discover_next_page, parse_listing_page


PROPERTY_LINK = re.compile(r"graana\.com/(?:property|buy|rent|sale)/", re.I)


def scrape(config: PipelineConfig = CONFIG) -> ScrapeResult:
    config.ensure_directories()
    result = ScrapeResult(source="Graana")
    if not config.graana_authorized:
        result.status = "authorization-required"
        result.message = (
            "Graana collection is disabled because its current terms prohibit copying and "
            "republishing content. Set GRAANA_REPUBLICATION_AUTHORIZED=1 only after written permission."
        )
        return result

    client = RobotsAwareClient(config)
    seen_ids: set[str] = set()
    seen_pages: set[str] = set()
    queue = list(config.graana_seeds)
    search_pages_visited = 0

    while queue and search_pages_visited < config.max_pages:
        page_url = queue.pop(0)
        if page_url in seen_pages:
            continue
        seen_pages.add(page_url)
        try:
            html = client.fetch_text(page_url)
            result.pages_visited += 1
            search_pages_visited += 1
        except ComplianceError as exc:
            result.skipped_urls.append({"url": page_url, "reason": str(exc)})
            continue
        except RuntimeError as exc:
            result.errors.append({"url": page_url, "error": str(exc)})
            continue

        new_ids = 0
        detail_urls = discover_links(html, page_url, PROPERTY_LINK)
        for listing_url in detail_urls:
            try:
                detail_html = client.fetch_text(listing_url)
                result.pages_visited += 1
                listing = parse_listing_page("Graana", listing_url, detail_html)
            except ComplianceError as exc:
                result.skipped_urls.append({"url": listing_url, "reason": str(exc)})
                continue
            except RuntimeError as exc:
                result.errors.append({"url": listing_url, "error": str(exc)})
                continue
            if listing and listing.source_id not in seen_ids:
                seen_ids.add(listing.source_id)
                result.listings.append(listing.to_dict())
                new_ids += 1
        next_page = discover_next_page(html, page_url)
        if next_page and next_page not in seen_pages and (new_ids > 0 or not result.listings):
            queue.append(next_page)

    result.message = f"Collected {len(result.listings)} unique authorized records."
    return result


def main() -> int:
    result = scrape()
    destination = CONFIG.staging_dir / "raw-graana.json"
    write_json(destination, result.to_dict())
    print(f"Graana: {result.status}; {len(result.listings)} listings; {result.pages_visited} pages visited.")
    if result.message:
        print(result.message)
    print(f"Raw snapshot: {destination}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
