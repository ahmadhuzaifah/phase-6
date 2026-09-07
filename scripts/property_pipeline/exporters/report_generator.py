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
    sectors = Counter((record.get("location") or {}).get("sector") or record.get("block", "Unclassified") for record in records)
    coverage_targets = (
        ("Houses", {"house", "villa"}, (("5", "marla"), ("8", "marla"), ("10", "marla"), ("1", "kanal"), ("2", "kanal"))),
        ("Residential plots", {"residential-plot"}, (("5", "marla"), ("10", "marla"), ("1", "kanal"), ("2", "kanal"))),
        ("Commercial", {"commercial-plot", "shop"}, (("4", "marla"), ("8", "marla"), ("1", "kanal"))),
    )
    coverage_lines: list[str] = []
    missing: list[str] = []
    for label, property_types, sizes in coverage_targets:
        for size, unit in sizes:
            count = sum(
                record.get("propertyType") in property_types
                and str(record.get("size")) == size
                and record.get("unit") == unit
                for record in records
            )
            name = f"{label} - {size} {unit.title()}"
            coverage_lines.append(f"- {name}: {count}")
            if count == 0:
                missing.append(name)

    expansion_lines = [
        "# Property Expansion Report",
        "",
        f"Generated: {datetime.now(timezone.utc).isoformat().replace('+00:00', 'Z')}",
        "",
        "## Expansion Summary",
        "",
        "- Before: 72 published records (initial Phase 10.21 baseline)",
        f"- After: {len(records)} published records",
        f"- Newly scraped in this run: {metrics.get('total_scraped', 0)}",
        f"- Sale: {purposes.get('sale', 0)}",
        f"- Rent: {purposes.get('rent', 0)}",
        f"- Commercial: {types.get('commercial-plot', 0) + types.get('shop', 0)}",
        f"- Duplicates removed: {metrics.get('duplicates_removed', 0)}",
        f"- Records rejected below quality score {config.minimum_quality_score}: {metrics.get('quality_rejected', 0)}",
        "",
        "## Intent And Size Coverage",
        "",
        *coverage_lines,
        "",
        "## Sector Distribution",
        "",
        *(f"- {sector}: {count}" for sector, count in sorted(sectors.items())),
        "",
        "## Image Status",
        "",
        *(f"- {status}: {count}" for status, count in sorted(images.items())),
        "",
        "## Missing Coverage",
        "",
        *(f"- {item}" for item in missing),
        *([] if missing else ["- None across the requested type/size matrix."]),
        "",
        "## Publication Controls",
        "",
        "- Every public record scores at least 60/100 for completeness, image handling, location, description, and freshness.",
        "- Duplicate source URLs and duplicate slugs are rejected before publication.",
        "- Zameen coverage uses intent, size, sector, commercial, rental, and Defence Raya discovery URLs.",
        "- Graana remains disabled unless written reuse authorization is configured.",
        "",
    ]
    config.expansion_report_file.write_text("\n".join(expansion_lines), encoding="utf-8")
    return config.report_file
