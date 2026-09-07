"""Download at most one authorized source image per property."""

from __future__ import annotations

import hashlib
from pathlib import Path
from typing import Any

from property_pipeline.config import CONFIG, PipelineConfig
from property_pipeline.scrapers.common import ComplianceError, RobotsAwareClient


EXTENSIONS = {"image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp"}


def download_primary_image(record: dict[str, Any], config: PipelineConfig = CONFIG) -> dict[str, Any]:
    updated = dict(record)
    candidates = [record.get("primaryImageSourceUrl"), record.get("imageBackupSourceUrl")]
    candidates = [str(item) for item in candidates if item]
    if not candidates:
        updated["imageStatus"] = "rejected"
        updated["imageRejectionReason"] = "No source image supplied."
        return updated
    if not config.image_reuse_authorized:
        updated["imageStatus"] = "rejected"
        updated["imageRejectionReason"] = "Image reuse rights are not configured."
        return updated

    client = RobotsAwareClient(config)
    config.raw_image_dir.mkdir(parents=True, exist_ok=True)
    for url in candidates[:2]:
        try:
            body, content_type = client.fetch(url)
        except (ComplianceError, RuntimeError):
            continue
        extension = EXTENSIONS.get(content_type)
        if not extension:
            continue
        digest = hashlib.sha1(url.encode()).hexdigest()[:10]
        destination = config.raw_image_dir / f"{record['id']}-{digest}{extension}"
        destination.write_bytes(body)
        updated["rawImagePath"] = str(destination)
        updated["downloadedImageUrl"] = url
        updated["imageStatus"] = "pending-review"
        return updated

    updated["imageStatus"] = "rejected"
    updated["imageRejectionReason"] = "Primary and backup image downloads failed validation."
    return updated


def download_images(records: list[dict[str, Any]], config: PipelineConfig = CONFIG) -> list[dict[str, Any]]:
    return [download_primary_image(record, config) for record in records]
