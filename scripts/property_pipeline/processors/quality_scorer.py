"""Score property records using the same 100-point model as the Astro UI."""

from __future__ import annotations

from datetime import datetime, timezone
from typing import Any


def _date(value: Any) -> datetime | None:
    try:
        return datetime.fromisoformat(str(value).replace("Z", "+00:00")).astimezone(timezone.utc)
    except (TypeError, ValueError):
        return None


def score_property(record: dict[str, Any], now: datetime | None = None) -> dict[str, Any]:
    required = (
        "title", "propertyType", "purpose", "price", "size", "unit",
        "source", "sourceUrl", "description", "lastCheckedDate",
    )
    completeness = round(sum(bool(record.get(field)) for field in required) / len(required) * 30)

    image_status = record.get("imageStatus", "rejected")
    images = 20 if image_status == "approved" else 10 if image_status in {"branded", "watermarked"} else 0

    location = record.get("location") or {}
    if location.get("coordinates"):
        location_accuracy = 20
    elif location.get("sector") or location.get("commercialArea"):
        location_accuracy = 18
    elif location.get("block") or record.get("block"):
        location_accuracy = 10
    elif location.get("address"):
        location_accuracy = 5
    else:
        location_accuracy = 0

    description_length = len(str(record.get("description", "")).strip())
    description = 15 if description_length >= 180 else 10 if description_length >= 120 else 5 if description_length >= 60 else 0

    current = now or datetime.now(timezone.utc)
    checked = _date(record.get("lastSeenAt") or record.get("lastCheckedDate"))
    age_days = max(0, (current - checked).days) if checked else 10_000
    freshness = 15 if age_days <= 30 else 8 if age_days <= 60 else 0

    breakdown = {
        "completeness": completeness,
        "images": images,
        "locationAccuracy": location_accuracy,
        "description": description,
        "freshness": freshness,
    }
    scored = dict(record)
    scored["qualityBreakdown"] = breakdown
    scored["qualityScore"] = sum(breakdown.values())
    return scored


def score_records(records: list[dict[str, Any]]) -> list[dict[str, Any]]:
    return [score_property(record) for record in records]
