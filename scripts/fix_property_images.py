"""Download the first available property image and store a local WebP reference."""

from __future__ import annotations

import io
import json
import re
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.parse import urlparse
from urllib.request import Request, urlopen

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
DATA_FILE = ROOT / "src" / "data" / "properties-import.json"
IMAGE_DIR = ROOT / "public" / "images" / "properties" / "dha-phase-6"
PLACEHOLDER_URL = "/images/placeholders/property-placeholder.webp"
USER_AGENT = "DHA6PropertyResearch/1.0 (+https://dhaphase6lahore.pk/how-we-collect-property-data/)"
ALLOWED_IMAGE_HOSTS = {"media.zameen.com"}


def slug(value: Any, fallback: str) -> str:
    cleaned = re.sub(r"[^a-z0-9]+", "-", str(value or "").lower()).strip("-")
    return cleaned or fallback


def image_alt(record: dict[str, Any]) -> str:
    property_type = str(record.get("propertyType", "property")).replace("-", " ")
    purpose = str(record.get("purpose", "sale"))
    sector = (record.get("location") or {}).get("sector") or record.get("block") or "DHA Phase 6"
    return f"DHA Phase 6 Lahore {property_type} for {purpose} {sector}"


def filename_for(record: dict[str, Any]) -> str:
    sector = (record.get("location") or {}).get("sector") or record.get("block")
    size = f"{record.get('size', '')}-{record.get('unit', '')}"
    return f"{slug(record.get('id'), 'property')}-{slug(sector, 'phase-6')}-{slug(size, 'size')}.webp"


def download_image(url: str) -> tuple[bytes, int, int]:
    parsed = urlparse(url)
    if parsed.scheme != "https" or parsed.hostname not in ALLOWED_IMAGE_HOSTS:
        raise ValueError(f"Unsupported image host: {parsed.hostname or 'missing'}")
    request = Request(url, headers={"User-Agent": USER_AGENT, "Accept": "image/avif,image/webp,image/*"})
    last_error: Exception | None = None
    for _ in range(3):
        try:
            with urlopen(request, timeout=25) as response:
                payload = response.read()
            with Image.open(io.BytesIO(payload)) as source:
                source.load()
                image = source.convert("RGB")
                width, height = image.size
                output = io.BytesIO()
                image.save(output, "WEBP", quality=82, method=6)
                return output.getvalue(), width, height
        except (HTTPError, URLError, TimeoutError, OSError) as exc:
            last_error = exc
    raise RuntimeError(str(last_error))


def acquire(record: dict[str, Any]) -> tuple[str, bytes | None, int, int, str | None]:
    destination = IMAGE_DIR / filename_for(record)
    if destination.exists():
        try:
            with Image.open(destination) as image:
                image.verify()
            with Image.open(destination) as image:
                return str(record["id"]), None, image.width, image.height, None
        except OSError:
            destination.unlink(missing_ok=True)

    candidates = [record.get("primaryImageSourceUrl"), record.get("imageBackupSourceUrl")]
    error = "No source image supplied"
    for candidate in (str(item) for item in candidates if item):
        try:
            payload, width, height = download_image(candidate)
            return str(record["id"]), payload, width, height, None
        except (RuntimeError, ValueError) as exc:
            error = str(exc)
    return str(record["id"]), None, 1200, 800, error


def update_record(record: dict[str, Any], result: tuple[str, bytes | None, int, int, str | None]) -> dict[str, Any]:
    _, payload, width, height, error = result
    destination = IMAGE_DIR / filename_for(record)
    if payload is not None:
        temporary = destination.with_suffix(".webp.tmp")
        temporary.write_bytes(payload)
        temporary.replace(destination)
    has_local_image = destination.exists() and error is None
    public_url = f"/images/properties/dha-phase-6/{destination.name}" if has_local_image else PLACEHOLDER_URL
    updated = dict(record)
    updated["primaryImage"] = public_url
    updated["imageStatus"] = "approved" if has_local_image else "rejected"
    updated["imageRejectionReason"] = None if has_local_image else error
    updated["images"] = [{
        "url": public_url,
        "alt": image_alt(record),
        "caption": "DHA Phase 6 Lahore property",
        "isFeatured": True,
        "order": 1,
        "width": width if has_local_image else 1200,
        "height": height if has_local_image else 800,
    }]
    for remote_field in ("primaryImageSourceUrl", "imageBackupSourceUrl", "downloadedImageUrl", "rawImagePath"):
        updated.pop(remote_field, None)
    return updated


def main() -> int:
    records = json.loads(DATA_FILE.read_text(encoding="utf-8"))
    IMAGE_DIR.mkdir(parents=True, exist_ok=True)
    results: dict[str, tuple[str, bytes | None, int, int, str | None]] = {}
    with ThreadPoolExecutor(max_workers=6) as executor:
        futures = {executor.submit(acquire, record): record for record in records}
        for index, future in enumerate(as_completed(futures), start=1):
            result = future.result()
            results[result[0]] = result
            if index % 50 == 0:
                print(f"Processed {index}/{len(records)} image candidates", flush=True)

    updated = [update_record(record, results[str(record["id"])]) for record in records]
    temporary = DATA_FILE.with_suffix(".json.tmp")
    temporary.write_text(json.dumps(updated, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    temporary.replace(DATA_FILE)
    real = sum(record["primaryImage"].startswith("/images/properties/dha-phase-6/") for record in updated)
    print(f"Property image repair complete: {real} local images, {len(updated) - real} placeholders.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
