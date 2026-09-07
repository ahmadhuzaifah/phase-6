"""Generate a concise, reproducible property import report."""

from __future__ import annotations

from collections import Counter
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from property_pipeline.config import CONFIG, PipelineConfig


def generate_report(metrics: dict[str, Any], records: list[dict[str, Any]], config: PipelineConfig = CONFIG) -> Path:
    purposes = Counter(record.get("purpose", "unknown") for record in records)
    types = Counter(record.get("propertyType", "unknown") for record in records)
    images = Counter(record.get("imageStatus", "rejected") for record in records)
    lines = [
        "# Property Import Report",
        "",
        f"Generated: {datetime.now(timezone.utc).isoformat().replace('+00:00', 'Z')}",
        "",
        "## Import Summary",
        "",
        f"- Total scraped: {metrics.get('total_scraped', 0)}",
        f"- Zameen: {metrics.get('zameen_scraped', 0)}",
        f"- Graana: {metrics.get('graana_scraped', 0)}",
        f"- Sale: {purposes.get('sale', 0)}",
        f"- Rent: {purposes.get('rent', 0)}",
        f"- Commercial: {types.get('commercial-plot', 0) + types.get('shop', 0)}",
        f"- Duplicates removed: {metrics.get('duplicates_removed', 0)}",
        f"- Images accepted: {images.get('approved', 0)}",
        f"- Images branded/watermarked: {images.get('branded', 0) + images.get('watermarked', 0)}",
        f"- Images rejected or unavailable: {images.get('rejected', 0)}",
        f"- Final imported listings: {len(records)}",
        "",
        "## Compliance",
        "",
        f"- Zameen run status: {metrics.get('zameen_status', 'not-run')}",
        f"- Graana run status: {metrics.get('graana_status', 'not-run')}",
        "- Every request is checked against robots.txt and rate limited.",
        "- Full third-party descriptions and images are published only when written reuse authorization is configured.",
        "- Original downloaded images remain in ignored staging storage; processed derivatives are separate.",
        "",
    ]
    config.report_file.write_text("\n".join(lines), encoding="utf-8")
    return config.report_file
