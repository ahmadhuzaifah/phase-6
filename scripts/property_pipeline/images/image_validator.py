"""Validate image integrity, dimensions, format, and visible branding markers."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from property_pipeline.config import CONFIG, PipelineConfig


SUPPORTED_FORMATS = {"JPEG", "PNG", "WEBP"}
BRAND_MARKERS = ("zameen", "graana", "agency", "dealer")


def _load_pillow() -> Any:
    try:
        from PIL import Image
    except ImportError as exc:
        raise RuntimeError("Pillow is required for property image validation. Install scripts/property_pipeline/requirements.txt.") from exc
    return Image


def validate_image(record: dict[str, Any], config: PipelineConfig = CONFIG) -> dict[str, Any]:
    updated = dict(record)
    raw_path = record.get("rawImagePath")
    if not raw_path:
        return updated
    path = Path(str(raw_path))
    try:
        Image = _load_pillow()
        with Image.open(path) as image:
            image.verify()
        with Image.open(path) as image:
            width, height = image.size
            image_format = image.format or ""
    except (OSError, RuntimeError) as exc:
        updated["imageStatus"] = "rejected"
        updated["imageRejectionReason"] = f"Corrupt or unreadable image: {exc}"
        return updated

    updated["imageWidth"] = width
    updated["imageHeight"] = height
    if image_format not in SUPPORTED_FORMATS:
        updated["imageStatus"] = "rejected"
        updated["imageRejectionReason"] = f"Unsupported image format: {image_format or 'unknown'}."
        return updated
    if width < config.min_image_width or height < config.min_image_height:
        updated["imageStatus"] = "rejected"
        updated["imageRejectionReason"] = f"Image is below {config.min_image_width}x{config.min_image_height}."
        return updated

    source_text = " ".join(
        str(record.get(key, ""))
        for key in ("downloadedImageUrl", "imageSource", "rawImagePath")
    ).lower()
    if any(marker in source_text for marker in BRAND_MARKERS):
        updated["imageStatus"] = "branded"
        updated["imageRejectionReason"] = "Third-party portal or agency branding requires manual rights review."
        return updated

    updated["imageStatus"] = "approved"
    updated.pop("imageRejectionReason", None)
    return updated


def validate_images(records: list[dict[str, Any]], config: PipelineConfig = CONFIG) -> list[dict[str, Any]]:
    return [validate_image(record, config) for record in records]
