"""Convert portal-specific records into the project's canonical property shape."""

from __future__ import annotations

import hashlib
import re
from datetime import datetime, timezone
from decimal import Decimal, InvalidOperation
from typing import Any

from property_pipeline.config import CONFIG, PipelineConfig


TYPE_PATTERNS = (
    (r"commercial\s+plot", "commercial-plot"),
    (r"residential\s+plot|\bplot\b", "residential-plot"),
    (r"farm\s*house", "farm-house"),
    (r"penthouse", "penthouse"),
    (r"apartment|\bflat\b", "apartment"),
    (r"portion|upper\s+floor|lower\s+floor", "portion-floor"),
    (r"\bshop\b|office|building|warehouse|commercial", "shop"),
    (r"\bvilla\b", "villa"),
    (r"\bhouse\b|home", "house"),
)


def slugify(value: str) -> str:
    value = value.lower().replace("&", " and ")
    return re.sub(r"[^a-z0-9]+", "-", value).strip("-")[:120]


def normalize_purpose(*values: str) -> str:
    text = " ".join(values).lower()
    return "rent" if re.search(r"\brent(?:al)?\b|for-rent", text) else "sale"


def normalize_type(*values: str) -> str:
    text = " ".join(values).lower()
    for pattern, label in TYPE_PATTERNS:
        if re.search(pattern, text):
            return label
    return "other"


def normalize_price(value: str) -> int:
    text = value.lower().replace(",", "").replace("pkr", "").replace("rs.", "").replace("rs", "").strip()
    match = re.search(r"(\d+(?:\.\d+)?)\s*(crore|cr|lakh|lac|million|thousand|k)?", text)
    if not match:
        return 0
    try:
        amount = Decimal(match.group(1))
    except InvalidOperation:
        return 0
    multiplier = {
        "crore": 10_000_000,
        "cr": 10_000_000,
        "lakh": 100_000,
        "lac": 100_000,
        "million": 1_000_000,
        "thousand": 1_000,
        "k": 1_000,
    }.get(match.group(2) or "", 1)
    return int(amount * multiplier)


def normalize_size(*values: str) -> tuple[str, str]:
    text = " ".join(values).lower().replace(",", "")
    match = re.search(r"(\d+(?:\.\d+)?)\s*(kanal|marla|sq\.?\s*ft|square\s*feet|sq\.?\s*yd|square\s*yard)", text)
    if not match:
        return "", ""
    number = match.group(1).rstrip("0").rstrip(".") if "." in match.group(1) else match.group(1)
    unit_text = match.group(2)
    if "kanal" in unit_text:
        unit = "kanal"
    elif "marla" in unit_text:
        unit = "marla"
    elif "yd" in unit_text or "yard" in unit_text:
        unit = "sqyd"
    else:
        unit = "sqft"
    return number, unit


def normalize_block(*values: str) -> tuple[str, str, str]:
    text = " ".join(values)
    sector = ""
    block = ""
    commercial_area = ""
    sector_match = re.search(r"\b(?:sector|block)\s*[-:]?\s*([A-HJ-N])\b", text, flags=re.I)
    if sector_match:
        sector = f"Sector {sector_match.group(1).upper()}"
        block = sector
    cca_match = re.search(r"\bCCA\s*[-:]?\s*([12])\b", text, flags=re.I)
    if cca_match:
        commercial_area = f"CCA {cca_match.group(1)}"
        block = commercial_area
    elif re.search(r"\bCCA\b", text, flags=re.I):
        commercial_area = "CCA"
        block = block or "DHA Phase 6"
    elif re.search(r"main\s+boulevard", text, flags=re.I):
        commercial_area = "Main Boulevard Commercial"
        block = commercial_area
    return sector, block or "DHA Phase 6", commercial_area


def _safe_date(value: str, fallback: str) -> str:
    if not value:
        return fallback
    normalized = value.strip().replace("Z", "+00:00")
    try:
        return datetime.fromisoformat(normalized).astimezone(timezone.utc).isoformat().replace("+00:00", "Z")
    except ValueError:
        return fallback


def _summary(record: dict[str, Any], property_type: str, purpose: str, size: str, unit: str, block: str) -> str:
    type_label = property_type.replace("-", " ")
    size_label = f"{size} {unit}" if size and unit else ""
    details = " ".join(part for part in (size_label, type_label) if part)
    return (
        f"Publicly referenced {details} advertised for {purpose} in {block}, DHA Phase 6 Lahore. "
        "Open the original source and independently verify current availability, ownership, condition, and price."
    )


def normalize_record(record: dict[str, Any], config: PipelineConfig = CONFIG) -> dict[str, Any] | None:
    purpose = normalize_purpose(record.get("purpose", ""), record["title"], record["source_url"])
    property_type = normalize_type(record.get("property_type", ""), record["title"], record.get("description", ""))
    price = normalize_price(record.get("price_text", ""))
    size, unit = normalize_size(record.get("size_text", ""), record["title"], record.get("description", ""))
    sector, block, commercial_area = normalize_block(record.get("location", ""), record["title"], record.get("description", ""))
    if property_type == "other" or price <= 0 or not size or not unit:
        return None

    checked = _safe_date(record.get("scraped_at", ""), datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"))
    source_name = f"{record['source']}.com"
    source_id = record["source_id"]
    unique_suffix = hashlib.sha1(f"{record['source']}:{source_id}".encode()).hexdigest()[:8]
    slug = f"{slugify(record['title'])[:100].rstrip('-')}-{unique_suffix}"
    source_description = record.get("description", "")
    description = (
        source_description
        if config.content_republication_authorized and source_description
        else _summary(record, property_type, purpose, size, unit, block)
    )
    image_candidates = record.get("image_urls", [])[:2]
    title = record["title"]
    seo_suffix = f" | {source_id}"
    seo_base = f"{size} {unit.title()} {property_type.replace('-', ' ').title()} For {purpose.title()} in {block}, DHA Phase 6 Lahore"
    seo_title = f"{seo_base[:60 - len(seo_suffix)].rstrip()}{seo_suffix}"
    meta_description = (
        f"Find verified DHA Phase 6 Lahore houses, plots and commercial properties with updated prices and availability. "
        f"Review {source_id}: this {size} {unit} {property_type.replace('-', ' ')} in {block}."
    )[:160]
    normalized = {
        "id": source_id,
        "title": title,
        "slug": slug,
        "source": source_name,
        "sources": [record["source"]],
        "sourceUrl": record["source_url"],
        "sourceLinkAllowed": record["source"] != "Graana" or config.graana_authorized,
        "sourceType": "portal-extraction",
        "sourceListingDate": record.get("listing_date") or None,
        "sourceUpdatedDate": record.get("updated_date") or None,
        "purpose": purpose,
        "propertyType": property_type,
        "location": {
            "phase": "DHA Phase 6 Lahore",
            "sector": sector,
            "block": block,
            "commercialArea": commercial_area,
            "address": record.get("location") or f"{block}, DHA Phase 6 Lahore",
            "city": "Lahore",
            "province": "Punjab",
        },
        "block": block,
        "size": size,
        "unit": unit,
        "price": price,
        "rent": price if purpose == "rent" else None,
        "currency": "PKR",
        "priceUnit": "PKR",
        "bedrooms": record.get("bedrooms"),
        "bathrooms": record.get("bathrooms"),
        "floors": record.get("floors"),
        "condition": record.get("condition") or None,
        "constructionStatus": record.get("construction_status") or None,
        "description": description,
        "features": [item for item in (block, f"{size} {unit.title()}", f"For {purpose.title()}") if item],
        "primaryImageSourceUrl": image_candidates[0] if image_candidates else None,
        "imageBackupSourceUrl": image_candidates[1] if len(image_candidates) > 1 else None,
        "primaryImage": "/images/placeholders/property-placeholder.webp",
        "imageStatus": "rejected" if image_candidates else "rejected",
        "imageSource": record["source"],
        "images": [{
            "url": "/images/placeholders/property-placeholder.webp",
            "alt": f"No verified image available for {title}",
            "caption": "No verified image available",
            "isFeatured": True,
            "order": 1,
            "width": 1200,
            "height": 800,
        }],
        "availabilityStatus": "AVAILABLE",
        "listingStatus": "ACTIVE",
        "createdAt": checked,
        "lastSeenAt": checked,
        "lastPrice": price,
        "priceChanged": False,
        "verificationLabel": "Verified Recently",
        "verificationStatus": "unverified",
        "lastCheckedDate": checked,
        "lastVerifiedDate": checked,
        "publishedDate": _safe_date(record.get("listing_date", ""), checked),
        "updatedAt": _safe_date(record.get("updated_date", ""), checked),
        "agent": {
            "name": record.get("agent_name") or None,
            "agency": record.get("agency_name") or None,
            "contact": record.get("contact_details") or None,
        },
        "seo": {"title": seo_title[:60], "description": meta_description},
        "legalNotice": "Property information is collected from publicly available sources. Buyers should independently verify availability, ownership, and pricing before any transaction.",
    }
    return normalized


def normalize_records(records: list[dict[str, Any]], config: PipelineConfig = CONFIG) -> list[dict[str, Any]]:
    return [item for record in records if (item := normalize_record(record, config))]
