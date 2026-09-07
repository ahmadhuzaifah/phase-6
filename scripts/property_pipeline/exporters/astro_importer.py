"""Validate, merge, deduplicate, and export property data consumed by Astro."""

from __future__ import annotations

import json
import sys
from pathlib import Path
from typing import Any

if __package__ in {None, ""}:
    sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from property_pipeline.config import CONFIG, PipelineConfig
from property_pipeline.exporters.report_generator import generate_report
from property_pipeline.images.image_downloader import download_images
from property_pipeline.images.image_processor import process_images
from property_pipeline.images.image_validator import validate_images
from property_pipeline.processors.cleaner import clean_records
from property_pipeline.processors.duplicate_detector import deduplicate
from property_pipeline.processors.normalizer import normalize_records
from property_pipeline.processors.quality_scorer import score_records
from property_pipeline.scrapers.common import write_json


REQUIRED_FIELDS = ("id", "title", "slug", "source", "sourceUrl", "purpose", "propertyType", "size", "unit", "price", "description", "lastCheckedDate")


def _read_json(path: Path, default: Any) -> Any:
    if not path.exists():
        return default
    return json.loads(path.read_text(encoding="utf-8"))


def _raw_result(path: Path) -> dict[str, Any]:
    value = _read_json(path, {})
    return value if isinstance(value, dict) else {}


def validate_record(record: dict[str, Any]) -> list[str]:
    errors = [field for field in REQUIRED_FIELDS if record.get(field) in (None, "", [], {})]
    if not str(record.get("sourceUrl", "")).startswith("https://"):
        errors.append("sourceUrl:https")
    if not isinstance(record.get("price"), int) or record.get("price", 0) <= 0:
        errors.append("price:positive-integer")
    if record.get("availabilityStatus") not in {"AVAILABLE", "RESERVED", "SOLD", "EXPIRED"}:
        errors.append("availabilityStatus:invalid")
    if record.get("listingStatus") not in {"ACTIVE", "PRICE_CHANGED", "NOT_FOUND", "EXPIRED"}:
        errors.append("listingStatus:invalid")
    if int(record.get("qualityScore", 0)) < CONFIG.minimum_quality_score:
        errors.append("qualityScore:below-publication-threshold")
    return errors


def _upgrade_existing(record: dict[str, Any]) -> dict[str, Any]:
    upgraded = dict(record)
    source_url = upgraded.get("sourceUrl") or upgraded.pop("sourceURL", None)
    upgraded.pop("sourceURL", None)
    upgraded["sourceUrl"] = source_url
    source_label = str(upgraded.get("source", "Public source")).removesuffix(".com")
    upgraded.setdefault("sourceLinkAllowed", source_label.lower() != "graana")
    upgraded.setdefault("sources", [source_label])
    upgraded.setdefault("sourceUrls", [source_url] if source_url else [])
    status = str(upgraded.get("availabilityStatus", "AVAILABLE")).lower()
    upgraded["availabilityStatus"] = {
        "reserved": "RESERVED",
        "sold": "SOLD",
        "expired": "EXPIRED",
        "removed": "EXPIRED",
    }.get(status, "AVAILABLE")
    first_image = (upgraded.get("images") or [{}])[0]
    image_url = first_image.get("url", "/images/placeholders/property-placeholder.webp")
    upgraded.setdefault("primaryImage", image_url)
    upgraded.setdefault("imageStatus", "rejected" if "/placeholders/" in image_url else "branded")
    upgraded.setdefault("imageSource", source_label)
    upgraded.setdefault("verificationLabel", "Verified Recently")
    checked = upgraded.get("lastCheckedDate") or upgraded.get("updatedAt") or upgraded.get("publishedDate")
    upgraded.setdefault("createdAt", upgraded.get("publishedDate") or checked)
    upgraded.setdefault("lastSeenAt", checked)
    upgraded.setdefault("lastPrice", upgraded.get("price"))
    upgraded.setdefault("priceChanged", False)
    upgraded.setdefault("listingStatus", "EXPIRED" if upgraded["availabilityStatus"] == "EXPIRED" else "ACTIVE")
    location = dict(upgraded.get("location") or {})
    location.setdefault("sector", upgraded.get("block", "") if str(upgraded.get("block", "")).startswith("Sector ") else "")
    location.setdefault("block", upgraded.get("block", "DHA Phase 6"))
    location.setdefault("commercialArea", upgraded.get("block", "") if "CCA" in str(upgraded.get("block", "")) or "Commercial" in str(upgraded.get("block", "")) else "")
    upgraded["location"] = location
    upgraded.setdefault(
        "legalNotice",
        "Property information is collected from publicly available sources. Buyers should independently verify availability, ownership, and pricing before any transaction.",
    )
    upgraded.setdefault("seo", {
        "title": f"{upgraded.get('title', 'Property')} | DHA Phase 6 Lahore"[:60],
        "description": "Find verified DHA Phase 6 Lahore houses, plots and commercial properties with updated prices and availability.",
    })
    return upgraded


def _merge_existing(existing: list[dict[str, Any]], incoming: list[dict[str, Any]]) -> list[dict[str, Any]]:
    upgraded_existing = [_upgrade_existing(record) for record in existing]
    merged = {str(record.get("sourceUrl") or record.get("id")): record for record in upgraded_existing}
    for record in incoming:
        key = str(record.get("sourceUrl") or record.get("id"))
        previous = merged.get(key, {})
        stable_slug = previous.get("slug") or record["slug"]
        old_price = previous.get("price")
        new_price = record.get("price")
        changed = bool(old_price and new_price and old_price != new_price)
        merged[key] = {
            **previous,
            **record,
            "slug": stable_slug,
            "createdAt": previous.get("createdAt") or previous.get("publishedDate") or record.get("createdAt"),
            "lastSeenAt": record.get("lastCheckedDate"),
            "lastPrice": old_price if changed else previous.get("lastPrice", new_price),
            "priceChanged": changed,
            "listingStatus": "PRICE_CHANGED" if changed else "ACTIVE",
        }
    return list(merged.values())


def _update_price_history(
    records: list[dict[str, Any]], previous_records: list[dict[str, Any]], config: PipelineConfig
) -> dict[str, list[dict[str, Any]]]:
    value = _read_json(config.price_history_file, {})
    history: dict[str, list[dict[str, Any]]] = value if isinstance(value, dict) else {}
    previous_by_id = {str(item.get("id")): item for item in previous_records}
    for record in records:
        record_id = str(record["id"])
        entries = history.setdefault(record_id, [])
        if not entries:
            entries.append({
                "date": record.get("createdAt") or record.get("publishedDate"),
                "price": record["price"],
                "previousPrice": None,
                "newPrice": record["price"],
            })
        previous = previous_by_id.get(record_id)
        if previous and previous.get("price") != record.get("price"):
            entry = {
                "date": record.get("lastSeenAt") or record.get("lastCheckedDate"),
                "price": record["price"],
                "previousPrice": previous.get("price"),
                "newPrice": record["price"],
            }
            if not entries or (entries[-1].get("date"), entries[-1].get("newPrice")) != (entry["date"], entry["newPrice"]):
                entries.append(entry)
    retained_history = {str(record["id"]): history[str(record["id"])] for record in records}
    write_json(config.price_history_file, retained_history)
    return retained_history


def export(config: PipelineConfig = CONFIG) -> tuple[list[dict[str, Any]], dict[str, Any]]:
    config.ensure_directories()
    raw_zameen = _raw_result(config.staging_dir / "raw-zameen.json")
    raw_graana = _raw_result(config.staging_dir / "raw-graana.json")
    raw_records = [*raw_zameen.get("listings", []), *raw_graana.get("listings", [])]
    normalized = normalize_records(clean_records(raw_records), config)
    unique_incoming, duplicates = deduplicate(normalized)
    with_images = process_images(validate_images(download_images(unique_incoming, config), config), config)
    existing = _read_json(config.data_file, [])
    if not isinstance(existing, list):
        raise ValueError(f"Expected a JSON array in {config.data_file}")
    combined, combined_duplicates = deduplicate(_merge_existing(existing, with_images))
    scored = score_records(combined)
    rejected_for_quality = [record for record in scored if record["qualityScore"] < config.minimum_quality_score]
    combined = [record for record in scored if record["qualityScore"] >= config.minimum_quality_score]
    invalid = [(record.get("id", "unknown"), validate_record(record)) for record in combined]
    invalid = [(record_id, errors) for record_id, errors in invalid if errors]
    if invalid:
        details = "; ".join(f"{record_id}: {', '.join(errors)}" for record_id, errors in invalid)
        raise ValueError(f"Property export validation failed: {details}")
    slugs = [record["slug"] for record in combined]
    if len(slugs) != len(set(slugs)):
        raise ValueError("Property export aborted because duplicate slugs remain.")
    combined.sort(key=lambda item: (item.get("lastCheckedDate", ""), item.get("id", "")), reverse=True)
    _update_price_history(combined, existing, config)
    write_json(config.data_file, combined)
    metrics = {
        "before_count": len(existing),
        "total_scraped": len(raw_records),
        "zameen_scraped": len(raw_zameen.get("listings", [])),
        "graana_scraped": len(raw_graana.get("listings", [])),
        "zameen_status": raw_zameen.get("status", "not-run"),
        "graana_status": raw_graana.get("status", "not-run"),
        "duplicates_removed": len(duplicates) + len(combined_duplicates),
        "quality_rejected": len(rejected_for_quality),
    }
    generate_report(metrics, combined, config)
    write_json(config.staging_dir / "last-import-metrics.json", metrics)
    return combined, metrics


def main() -> int:
    records, metrics = export()
    print(f"Astro import complete: {len(records)} valid listings; {metrics['duplicates_removed']} duplicates removed.")
    print(f"Data file: {CONFIG.data_file}")
    print(f"Report: {CONFIG.report_file}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
