"""Validate every rendered property image and generate the image debug report."""

from __future__ import annotations

import json
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
DATA_FILE = ROOT / "src" / "data" / "properties-import.json"
REPORT_FILE = ROOT / "property-image-debug-report.md"
PLACEHOLDER_URL = "/images/placeholders/property-placeholder.webp"
PROPERTY_PREFIX = "/images/properties/dha-phase-6/"


def local_file(base: str, url: str) -> Path:
    return ROOT / base / url.lstrip("/")


def valid_image(path: Path) -> bool:
    if not path.is_file():
        return False
    try:
        with Image.open(path) as image:
            image.verify()
        return True
    except OSError:
        return False


def audit(records: list[dict[str, Any]]) -> dict[str, Any]:
    with_field = 0
    valid = 0
    broken: list[str] = []
    missing: list[str] = []
    placeholders = 0
    real = 0
    for record in records:
        images = record.get("images") or []
        image = images[0] if images else {}
        url = image.get("url") if isinstance(image, dict) else image
        if not url:
            missing.append(str(record.get("id", "unknown")))
            continue
        with_field += 1
        if url == PLACEHOLDER_URL:
            placeholders += 1
        elif str(url).startswith(PROPERTY_PREFIX):
            real += 1
        else:
            broken.append(f"{record.get('id')}: invalid path {url}")
            continue
        if valid_image(local_file("public", str(url))):
            valid += 1
        else:
            broken.append(f"{record.get('id')}: missing or invalid file {url}")
    dist_exists = (ROOT / "dist").is_dir()
    delivered_broken = [] if not dist_exists else [
        str(record.get("id", "unknown"))
        for record in records
        if not valid_image(local_file("dist", str((record.get("images") or [{}])[0].get("url", ""))))
    ]
    return {
        "total": len(records), "with_field": with_field, "valid": valid,
        "real": real, "broken": broken, "missing": missing, "placeholders": placeholders,
        "dist_checked": dist_exists, "delivered_broken": delivered_broken,
    }


def write_report(result: dict[str, Any]) -> None:
    lines = [
        "# Property Image Debug Report", "",
        f"Generated: {datetime.now(timezone.utc).isoformat().replace('+00:00', 'Z')}", "",
        "## Audit Summary", "",
        f"- Total properties: {result['total']}",
        f"- Properties with image field: {result['with_field']}",
        f"- Properties with valid local image: {result['valid']}",
        f"- Properties with real local property image: {result['real']}",
        f"- Properties with broken image: {len(result['broken'])}",
        f"- Properties with missing image: {len(result['missing'])}",
        f"- Properties using placeholder: {result['placeholders']}", "",
        f"- Build output checked: {'yes' if result['dist_checked'] else 'no'}",
        f"- Valid images in build output: {result['total'] - len(result['delivered_broken']) if result['dist_checked'] else 'not checked'}",
        f"- Broken images in build output: {len(result['delivered_broken']) if result['dist_checked'] else 'not checked'}", "",
        "## Broken Images", "",
        *([f"- {item}" for item in result["broken"]] or ["None detected."]), "",
        "## Missing Images", "",
        *([f"- {item}" for item in result["missing"]] or ["None detected."]), "",
    ]
    REPORT_FILE.write_text("\n".join(lines), encoding="utf-8")


def main() -> int:
    records = json.loads(DATA_FILE.read_text(encoding="utf-8"))
    result = audit(records)
    write_report(result)
    print(f"Total properties: {result['total']}")
    print(f"Valid images: {result['valid']}")
    print(f"Broken: {len(result['broken'])}")
    print(f"Missing: {len(result['missing'])}")
    return 1 if result["broken"] or result["missing"] or result["delivered_broken"] or result["valid"] != result["total"] else 0


if __name__ == "__main__":
    sys.exit(main())
