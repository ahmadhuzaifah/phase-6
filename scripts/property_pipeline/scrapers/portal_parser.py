"""Conservative parser for public listing pages and JSON-LD records."""

from __future__ import annotations

import json
import re
from typing import Any
from urllib.parse import urljoin, urlparse

from property_pipeline.models import RawListing
from property_pipeline.scrapers.common import (
    clean_html,
    extract_json_ld,
    first_value,
    is_phase_six_lahore,
    meta_content,
    utc_now,
    walk_json,
)


LISTING_TYPES = {"product", "offer", "residence", "house", "apartment", "accommodation", "realestatelisting"}


def _type_matches(value: Any) -> bool:
    values = value if isinstance(value, list) else [value]
    return any(str(item).lower() in LISTING_TYPES for item in values)


def _image_urls(value: Any) -> list[str]:
    if isinstance(value, str):
        return [value]
    if isinstance(value, dict):
        url = first_value(value, "url", "contentUrl")
        return [str(url)] if url else []
    if isinstance(value, list):
        result: list[str] = []
        for item in value:
            result.extend(_image_urls(item))
        return result
    return []


def _address(value: Any) -> str:
    if isinstance(value, str):
        return clean_html(value)
    if isinstance(value, dict):
        return ", ".join(
            str(value[key])
            for key in ("streetAddress", "addressLocality", "addressRegion")
            if value.get(key)
        )
    return ""


def _source_id(source: str, url: str, record: dict[str, Any]) -> str:
    candidate = first_value(record, "sku", "productID", "identifier", "id")
    if isinstance(candidate, dict):
        candidate = first_value(candidate, "value", "name")
    if candidate:
        return f"{source.lower()}-{re.sub(r'[^a-zA-Z0-9-]+', '-', str(candidate)).strip('-')}"
    numbers = re.findall(r"(?<!\d)(\d{5,})(?!\d)", url)
    if numbers:
        return f"{source.lower()}-{numbers[-1]}"
    return ""


def listing_from_record(source: str, record: dict[str, Any], base_url: str) -> RawListing | None:
    if not _type_matches(record.get("@type", "")):
        return None
    offers = record.get("offers") if isinstance(record.get("offers"), dict) else {}
    title = clean_html(str(first_value(record, "name", "headline")))
    url = urljoin(base_url, str(first_value(record, "url", "mainEntityOfPage") or base_url))
    location = _address(first_value(record, "address", "location"))
    description = clean_html(str(first_value(record, "description", "disambiguatingDescription")))
    if not title or not is_phase_six_lahore(title, location, description, url):
        return None
    source_id = _source_id(source, url, record)
    if not source_id:
        return None
    price = first_value(offers, "price", "lowPrice") or first_value(record, "price")
    image_urls = [urljoin(base_url, item) for item in _image_urls(first_value(record, "image", "photo"))]
    return RawListing(
        source=source,
        source_id=source_id,
        source_url=url,
        title=title,
        location=location,
        price_text=str(price),
        description=description,
        listing_date=str(first_value(record, "datePosted", "datePublished")),
        updated_date=str(first_value(record, "dateModified")),
        image_urls=image_urls[:2],
        scraped_at=utc_now(),
    )


def parse_listing_page(source: str, url: str, html: str) -> RawListing | None:
    for payload in extract_json_ld(html):
        for record in walk_json(payload):
            listing = listing_from_record(source, record, url)
            if listing and urlparse(listing.source_url).netloc == urlparse(url).netloc:
                return listing

    title = meta_content(html, "og:title")
    description = meta_content(html, "description") or meta_content(html, "og:description")
    canonical_match = re.search(r'<link[^>]+rel=["\']canonical["\'][^>]+href=["\']([^"\']+)', html, flags=re.I)
    source_url = urljoin(url, canonical_match.group(1)) if canonical_match else url
    if not title or not is_phase_six_lahore(title, description, source_url):
        return None
    source_id = _source_id(source, source_url, {})
    if not source_id:
        return None
    embedded_title = re.search(r'"listing_title"\s*:\s*("(?:\\.|[^"\\])*")', html)
    if embedded_title:
        try:
            title = json.loads(embedded_title.group(1))
        except json.JSONDecodeError:
            pass
    price_match = re.search(r'"property_price"\s*:\s*(\d+)', html)
    type_match = re.search(r'"category_2_name"\s*:\s*"([^"]+)"', html)
    beds_match = re.search(r'"property_beds"\s*:\s*(\d+)', html)
    baths_match = re.search(r'Bathrooms(?:<!-- -->)?\s*:\s*(\d+)', html, flags=re.I)
    location_match = re.search(r'"location_name"\s*:\s*"([^"]+)"', html)
    images = [meta_content(html, "og:image")]
    return RawListing(
        source=source,
        source_id=source_id,
        source_url=source_url,
        title=title,
        purpose="rent" if "rent" in url.lower() or re.search(r"\bfor rent\b", title, flags=re.I) else "sale",
        property_type=type_match.group(1).replace("_", " ") if type_match else "",
        location=clean_html(location_match.group(1)) if location_match else title,
        price_text=price_match.group(1) if price_match else "",
        size_text=title,
        bedrooms=int(beds_match.group(1)) if beds_match else None,
        bathrooms=int(baths_match.group(1)) if baths_match else None,
        description=description,
        image_urls=[item for item in images if item],
        scraped_at=utc_now(),
    )


def discover_links(html: str, base_url: str, link_pattern: re.Pattern[str]) -> list[str]:
    links: list[str] = []
    base_host = urlparse(base_url).netloc.lower()
    for match in re.finditer(r'<a\b[^>]+href=["\']([^"\']+)', html, flags=re.I):
        url = urljoin(base_url, match.group(1)).split("#", 1)[0]
        if urlparse(url).netloc.lower() == base_host and link_pattern.search(url) and url not in links:
            links.append(url)
    return links


def discover_next_page(html: str, base_url: str) -> str:
    patterns = (
        r'<link[^>]+rel=["\']next["\'][^>]+href=["\']([^"\']+)',
        r'<a[^>]+href=["\']([^"\']+)["\'][^>]+(?:rel=["\']next["\']|aria-label=["\']Next)',
    )
    for pattern in patterns:
        match = re.search(pattern, html, flags=re.I)
        if match:
            return urljoin(base_url, match.group(1))
    return ""
