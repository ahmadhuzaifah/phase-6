"""Sanitize raw portal fields before normalization."""

from __future__ import annotations

import re
from html import unescape
from typing import Any
from urllib.parse import urlparse


ALLOWED_SOURCE_HOSTS = {
    "Zameen": {"zameen.com", "www.zameen.com"},
    "Graana": {"graana.com", "www.graana.com"},
}


def clean_text(value: Any, max_length: int = 10000) -> str:
    text = unescape(str(value or ""))
    text = re.sub(r"<[^>]+>", " ", text)
    text = re.sub(r"[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]", "", text)
    return re.sub(r"\s+", " ", text).strip()[:max_length]


def clean_url(value: Any, source: str) -> str:
    url = clean_text(value, 2048)
    parsed = urlparse(url)
    if parsed.scheme != "https" or parsed.netloc.lower() not in ALLOWED_SOURCE_HOSTS.get(source, set()):
        return ""
    return parsed._replace(fragment="").geturl()


def clean_image_url(value: Any) -> str:
    url = clean_text(value, 2048)
    parsed = urlparse(url)
    if parsed.scheme != "https" or not parsed.netloc or parsed.username or parsed.password:
        return ""
    return parsed._replace(fragment="").geturl()


def clean_raw_listing(record: dict[str, Any]) -> dict[str, Any] | None:
    source = clean_text(record.get("source"), 50)
    source_url = clean_url(record.get("source_url"), source)
    title = clean_text(record.get("title"), 240)
    source_id = clean_text(record.get("source_id"), 120)
    if not source or not source_url or not title or not source_id:
        return None

    cleaned: dict[str, Any] = {
        "source": source,
        "source_id": source_id,
        "source_url": source_url,
        "title": title,
    }
    text_fields = (
        "purpose",
        "property_type",
        "location",
        "price_text",
        "size_text",
        "condition",
        "construction_status",
        "description",
        "listing_date",
        "updated_date",
        "agent_name",
        "agency_name",
        "contact_details",
        "scraped_at",
    )
    for field in text_fields:
        cleaned[field] = clean_text(record.get(field), 10000 if field == "description" else 500)
    for field in ("bedrooms", "bathrooms", "floors"):
        value = record.get(field)
        cleaned[field] = int(value) if isinstance(value, (int, float)) and value >= 0 else None
    cleaned["image_urls"] = [
        url
        for item in record.get("image_urls", [])[:2]
        if (url := clean_image_url(item))
    ]
    return cleaned


def clean_records(records: list[dict[str, Any]]) -> list[dict[str, Any]]:
    return [cleaned for record in records if (cleaned := clean_raw_listing(record))]
