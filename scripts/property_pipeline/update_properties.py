"""Run the complete acquisition, normalization, image, and export workflow."""

from __future__ import annotations

import sys
from pathlib import Path

if __package__ in {None, ""}:
    sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from property_pipeline.config import CONFIG
from property_pipeline.exporters.astro_importer import export
from property_pipeline.processors.availability_checker import check_records
from property_pipeline.scrapers.common import write_json
from property_pipeline.scrapers.graana_scraper import scrape as scrape_graana
from property_pipeline.scrapers.zameen_scraper import scrape as scrape_zameen


def main() -> int:
    CONFIG.ensure_directories()
    zameen = scrape_zameen(CONFIG)
    graana = scrape_graana(CONFIG)
    write_json(CONFIG.staging_dir / "raw-zameen.json", zameen.to_dict())
    write_json(CONFIG.staging_dir / "raw-graana.json", graana.to_dict())
    records, metrics = export(CONFIG)
    refreshed = check_records(records, CONFIG)
    write_json(CONFIG.data_file, refreshed)
    print(
        f"Property update complete: {metrics['total_scraped']} scraped, "
        f"{metrics['duplicates_removed']} duplicates removed, {len(refreshed)} published records."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
