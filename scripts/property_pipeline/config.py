"""Runtime configuration for the property acquisition pipeline."""

from __future__ import annotations

import os
from dataclasses import dataclass, field
from pathlib import Path


PIPELINE_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = PIPELINE_DIR.parents[1]


def env_flag(name: str, default: bool = False) -> bool:
    value = os.getenv(name)
    if value is None:
        return default
    return value.strip().lower() in {"1", "true", "yes", "on"}


def env_list(name: str, defaults: tuple[str, ...]) -> tuple[str, ...]:
    value = os.getenv(name, "").strip()
    return tuple(item.strip() for item in value.split(",") if item.strip()) or defaults


BASE_ZAMEEN_SEEDS = (
    "https://www.zameen.com/Houses_Property/Lahore_Defence__DHA__Phase_6-1448-1.html",
    "https://www.zameen.com/Plots/Lahore_Defence__DHA__Phase_6-1448-1.html",
    "https://www.zameen.com/Flats_Apartments/Lahore_Defence__DHA__Phase_6-1448-1.html",
    "https://www.zameen.com/Commercial/Lahore_Defence__DHA__Phase_6-1448-1.html",
    "https://www.zameen.com/Rentals/Lahore_Defence__DHA__Phase_6-1448-1.html",
)

SECTOR_LOCATION_IDS = {
    "A": 1610,
    "B": 1611,
    "C": 1612,
    "D": 1613,
    "E": 1614,
    "F": 1615,
    "G": 1616,
    "H": 1617,
    "J": 1618,
    "K": 1619,
    "L": 1620,
    "M": 1621,
    "N": 1622,
}


def build_zameen_seeds() -> tuple[str, ...]:
    phase = "Lahore_Defence__DHA__Phase_6-1448-1.html"
    seeds = list(BASE_ZAMEEN_SEEDS)
    seeds.extend(
        f"https://www.zameen.com/{category}/{size}-sale/{phase}"
        for category, sizes in (
            ("Houses_Property", ("5marla", "8marla", "10marla", "1kanal", "2kanal")),
            ("Plots", ("5marla", "10marla", "1kanal", "2kanal")),
            ("Commercial", ("4marla", "8marla", "1kanal")),
        )
        for size in sizes
    )
    seeds.extend(
        f"https://www.zameen.com/{category}/Lahore_Defence__DHA__Phase_6-1448-1.html"
        for category in ("Villas", "Rentals_Houses_Property", "Rentals_Flats_Apartments", "Rentals_Commercial")
    )
    seeds.extend(
        f"https://www.zameen.com/{category}/Lahore_Defence__DHA__Phase_6_Block_{sector}-{location_id}-1.html"
        for sector, location_id in SECTOR_LOCATION_IDS.items()
        for category in ("Houses_Property", "Plots")
    )
    seeds.extend(
        (
            "https://www.zameen.com/Commercial_Plots/Lahore_DHA_Defence_DHA_Phase_6_DHA_Phase_6___CCA_1_Block-11471-1.html",
            "https://www.zameen.com/Commercial_Plots/Lahore_DHA_Defence_DHA_Phase_6_DHA_Phase_6___CCA_2_Block-11604-1.html",
            "https://www.zameen.com/Commercial/Lahore_Defence__DHA__Phase_6-1448-1.html",
            "https://www.zameen.com/Rentals_Commercial/Lahore_Defence__DHA__Phase_6-1448-1.html",
            "https://www.zameen.com/Property/Lahore_Defence_Raya-8172-1.html",
        )
    )
    return tuple(dict.fromkeys(seeds))


ZAMEEN_SEEDS = build_zameen_seeds()

GRAANA_SEEDS = (
    "https://www.graana.com/sale/plot-sale-dha-phase-6-lahore-2-829/",
    "https://www.graana.com/sale/house-sale-dha-phase-6-lahore-2-829/",
    "https://www.graana.com/rent/house-rent-dha-phase-6-lahore-2-829/",
)


@dataclass(frozen=True)
class PipelineConfig:
    project_root: Path = PROJECT_ROOT
    staging_dir: Path = PROJECT_ROOT / "staging" / "property-pipeline"
    raw_image_dir: Path = PROJECT_ROOT / "staging" / "raw-property-images"
    processed_image_dir: Path = PROJECT_ROOT / "public" / "images" / "properties"
    data_file: Path = PROJECT_ROOT / "src" / "data" / "properties-import.json"
    report_file: Path = PROJECT_ROOT / "property-import-report.md"
    expansion_report_file: Path = PROJECT_ROOT / "property-expansion-report.md"
    price_history_file: Path = PROJECT_ROOT / "src" / "data" / "property-price-history.json"
    log_dir: Path = PIPELINE_DIR / "logs"
    timeout_seconds: float = float(os.getenv("PROPERTY_PIPELINE_TIMEOUT", "25"))
    request_delay_seconds: float = float(os.getenv("PROPERTY_PIPELINE_DELAY", "5"))
    max_pages: int = int(os.getenv("PROPERTY_PIPELINE_MAX_PAGES", "100"))
    minimum_quality_score: int = int(os.getenv("PROPERTY_MINIMUM_QUALITY_SCORE", "60"))
    max_retries: int = int(os.getenv("PROPERTY_PIPELINE_RETRIES", "2"))
    min_image_width: int = int(os.getenv("PROPERTY_IMAGE_MIN_WIDTH", "800"))
    min_image_height: int = int(os.getenv("PROPERTY_IMAGE_MIN_HEIGHT", "500"))
    user_agent: str = os.getenv(
        "PROPERTY_PIPELINE_USER_AGENT",
        "DHA6PropertyResearch/1.0 (+https://dhaphase6lahore.pk/how-we-collect-property-data/)",
    )
    zameen_enabled: bool = env_flag("ZAMEEN_SCRAPER_ENABLED", True)
    graana_authorized: bool = env_flag("GRAANA_REPUBLICATION_AUTHORIZED", False)
    content_republication_authorized: bool = env_flag(
        "PROPERTY_CONTENT_REPUBLICATION_AUTHORIZED", False
    )
    image_reuse_authorized: bool = env_flag("PROPERTY_IMAGE_REUSE_AUTHORIZED", False)
    zameen_seeds: tuple[str, ...] = field(
        default_factory=lambda: env_list("ZAMEEN_SEED_URLS", ZAMEEN_SEEDS)
    )
    graana_seeds: tuple[str, ...] = field(
        default_factory=lambda: env_list("GRAANA_SEED_URLS", GRAANA_SEEDS)
    )

    def ensure_directories(self) -> None:
        for directory in (
            self.staging_dir,
            self.raw_image_dir,
            self.processed_image_dir,
            self.log_dir,
        ):
            directory.mkdir(parents=True, exist_ok=True)


CONFIG = PipelineConfig()
