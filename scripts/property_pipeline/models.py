"""Shared typed records used between pipeline stages."""

from __future__ import annotations

from dataclasses import asdict, dataclass, field
from typing import Any


@dataclass
class RawListing:
    source: str
    source_id: str
    source_url: str
    title: str
    purpose: str = ""
    property_type: str = ""
    location: str = ""
    price_text: str = ""
    size_text: str = ""
    bedrooms: int | None = None
    bathrooms: int | None = None
    floors: int | None = None
    condition: str = ""
    construction_status: str = ""
    description: str = ""
    listing_date: str = ""
    updated_date: str = ""
    image_urls: list[str] = field(default_factory=list)
    agent_name: str = ""
    agency_name: str = ""
    contact_details: str = ""
    scraped_at: str = ""

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


@dataclass
class ScrapeResult:
    source: str
    listings: list[dict[str, Any]] = field(default_factory=list)
    pages_visited: int = 0
    skipped_urls: list[dict[str, str]] = field(default_factory=list)
    errors: list[dict[str, str]] = field(default_factory=list)
    status: str = "completed"
    message: str = ""

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)
