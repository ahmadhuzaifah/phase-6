"""Availability lifecycle updates with conservative source checks."""

from __future__ import annotations

from datetime import datetime, timezone
from typing import Any

from property_pipeline.config import CONFIG, PipelineConfig
from property_pipeline.scrapers.common import ComplianceError, RobotsAwareClient, utc_now


def verification_label(last_checked: str, now: datetime | None = None) -> str:
    current = now or datetime.now(timezone.utc)
    try:
        checked = datetime.fromisoformat(last_checked.replace("Z", "+00:00"))
    except (ValueError, AttributeError):
        return "Expired Review"
    age = max(0, (current - checked).days)
    if age <= 30:
        return "Verified Recently"
    if age <= 60:
        return "Needs Verification"
    return "Expired Review"


def update_lifecycle(record: dict[str, Any], source_available: bool | None = None) -> dict[str, Any]:
    updated = dict(record)
    if source_available is True:
        updated["availabilityStatus"] = "AVAILABLE"
        updated["lastCheckedDate"] = utc_now()
        updated["consecutiveCheckFailures"] = 0
    elif source_available is False:
        failures = int(record.get("consecutiveCheckFailures", 0)) + 1
        updated["consecutiveCheckFailures"] = failures
        if failures >= 2:
            updated["availabilityStatus"] = "EXPIRED"
    updated["verificationLabel"] = verification_label(updated.get("lastCheckedDate", ""))
    return updated


def check_records(records: list[dict[str, Any]], config: PipelineConfig = CONFIG) -> list[dict[str, Any]]:
    client = RobotsAwareClient(config)
    checked: list[dict[str, Any]] = []
    for record in records:
        url = record.get("sourceUrl", "")
        if not url or ("graana.com" in url and not config.graana_authorized):
            checked.append(update_lifecycle(record, None))
            continue
        try:
            html = client.fetch_text(url)
            unavailable = any(marker in html.lower() for marker in ("property is no longer available", "listing has expired", "property not found"))
            checked.append(update_lifecycle(record, not unavailable))
        except ComplianceError:
            checked.append(update_lifecycle(record, None))
        except RuntimeError:
            checked.append(update_lifecycle(record, False))
    return checked
