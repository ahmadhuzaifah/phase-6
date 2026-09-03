"""Import public Google Maps search results for the local places directory.

This script uses the installed Chrome browser through Selenium, captures only
fields displayed on search result cards, and writes a deterministic JSON file.
Run a focused import with:

    python scripts/import_google_maps_places.py --sector sector-a --category banks

Google can change its public UI at any time, so imported records retain their
source URL and retrieval date for later verification.
"""

from __future__ import annotations

import argparse
import json
import re
import time
from dataclasses import asdict, dataclass
from datetime import date
from pathlib import Path
from urllib.parse import quote_plus

from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait


SECTORS = {
    "sector-a": {"label": "Sector A", "lat": 31.4740, "lng": 74.4370, "radius": 800},
    "sector-b": {"label": "Sector B", "lat": 31.4795, "lng": 74.4390, "radius": 800},
    "sector-c": {"label": "Sector C", "lat": 31.4760, "lng": 74.4460, "radius": 800},
    "sector-d": {"label": "Sector D", "lat": 31.4720, "lng": 74.4520, "radius": 800},
    "sector-e": {"label": "Sector E", "lat": 31.4670, "lng": 74.4500, "radius": 800},
    "sector-f": {"label": "Sector F", "lat": 31.4630, "lng": 74.4560, "radius": 800},
    "sector-g": {"label": "Sector G", "lat": 31.4600, "lng": 74.4640, "radius": 800},
    "sector-h": {"label": "Sector H", "lat": 31.4690, "lng": 74.4650, "radius": 800},
    "sector-j": {"label": "Sector J", "lat": 31.4735, "lng": 74.4710, "radius": 800},
    "sector-k": {"label": "Sector K", "lat": 31.4650, "lng": 74.4740, "radius": 800},
    "sector-l": {"label": "Sector L", "lat": 31.4680, "lng": 74.4820, "radius": 800},
    "sector-m": {"label": "Sector M", "lat": 31.4780, "lng": 74.4840, "radius": 800},
    "sector-n": {"label": "Sector N", "lat": 31.4870, "lng": 74.4810, "radius": 800},
    "cca": {"label": "CCA (Commercial Broadway)", "lat": 31.4715, "lng": 74.4600, "radius": 1000},
    "main-boulevard-commercial": {"label": "Main Boulevard Commercial", "lat": 31.4730, "lng": 74.4510, "radius": 1200},
    "raya-commercial": {"label": "Raya Commercial", "lat": 31.4900, "lng": 74.4760, "radius": 600},
    "defence-raya": {"label": "Defence Raya", "lat": 31.4925, "lng": 74.4780, "radius": 800},
}

CATEGORY_QUERIES = {
    "bakery": "bakery",
    "banks": "bank ATM",
    "beauty-salons": "beauty salon",
    "cafes": "cafe coffee",
    "central-park": "park",
    "cinema": "cinema",
    "clinic": "medical clinic",
    "club": "club",
    "colleges": "college",
    "courier-services": "courier service",
    "dispensary": "dispensary",
    "fast-food": "fast food",
    "flower-shop": "flower shop",
    "food-delivery": "food delivery",
    "guest-house": "guest house",
    "gym": "gym fitness centre",
    "hospital": "hospital",
    "hostels": "hostel",
    "hotel": "hotel",
    "idc": "diagnostic laboratory",
    "internet-providers": "internet provider",
    "laundry": "laundry dry cleaner",
    "mosque": "mosque",
    "park": "park",
    "pharmacy": "pharmacy medical store",
    "police-station": "police station",
    "post-office": "post office",
    "restaurants": "restaurant",
    "schools": "school",
    "services": "home services",
    "shopping": "shopping centre",
    "supermarkets": "supermarket grocery store",
}


@dataclass
class ImportedPlace:
    id: str
    name: str
    sector: str
    sectorLabel: str
    category: str
    categoryLabel: str
    rating: float | None
    reviewCount: int
    address: str
    phone: str | None
    status: str
    image: str | None
    googleMapsUrl: str
    sourceQuery: str
    retrievedAt: str
    lat: float | None = None
    lng: float | None = None
    website: str | None = None


def slugify(value: str) -> str:
    value = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return value or "place"


def parse_number(value: str) -> int:
    digits = re.sub(r"[^0-9]", "", value)
    return int(digits) if digits else 0


def make_driver() -> webdriver.Chrome:
    options = webdriver.ChromeOptions()
    options.add_argument("--headless=new")
    options.add_argument("--window-size=1440,1200")
    options.add_argument("--lang=en-PK")
    options.add_argument("--disable-gpu")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--no-sandbox")
    options.add_argument("--log-level=3")
    options.add_experimental_option("excludeSwitches", ["enable-logging"])
    return webdriver.Chrome(options=options)


def card_text(card) -> list[str]:
    return [line.strip() for line in card.text.splitlines() if line.strip()]


def extract_address(lines: list[str], name: str) -> str:
    ignored = {
        name.lower(),
        "directions",
        "website",
        "share",
        "save",
        "call",
    }
    candidates = []
    for line in lines:
        normalized = line.lower()
        if normalized in ignored or re.fullmatch(r"[0-5](?:\.[0-9])?", line):
            continue
        if "review" in normalized or normalized.startswith(("open", "closed")):
            continue
        if any(token in normalized for token in ("sector", "phase", "lahore", "dha", "road", "commercial", "plaza", "block")):
            candidates.append(line.replace("·", " ").strip())
    return candidates[-1] if candidates else "DHA Phase 6, Lahore"


def first_aria_value(driver: webdriver.Chrome, selector: str, prefix: str) -> str | None:
    for node in driver.find_elements(By.CSS_SELECTOR, selector):
        label = (node.get_attribute("aria-label") or "").strip()
        if label.lower().startswith(prefix.lower()):
            return label.split(":", 1)[-1].strip()
    return None


def hydrate_place_details(driver: webdriver.Chrome, place: ImportedPlace) -> None:
    original_tab = driver.current_window_handle
    driver.switch_to.new_window("tab")
    try:
        driver.get(place.googleMapsUrl)
        WebDriverWait(driver, 15).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "h1, button[data-item-id='address']"))
        )
        address = first_aria_value(driver, "button[data-item-id='address']", "Address:")
        phone = first_aria_value(driver, "button[data-item-id^='phone:tel']", "Phone:")
        website = first_aria_value(driver, "a[data-item-id='authority']", "Website:")
        if address:
            place.address = address
        if phone:
            place.phone = phone
        if website:
            place.website = website

        # Extract coordinates from current URL if present (@lat,lng)
        current_url = driver.current_url
        coords_match = re.search(r"@([0-9\.\-]+),([0-9\.\-]+)", current_url)
        if coords_match:
            place.lat = float(coords_match.group(1))
            place.lng = float(coords_match.group(2))

        rating_panel = driver.find_elements(By.CSS_SELECTOR, "div.F7nice")
        for node in driver.find_elements(By.CSS_SELECTOR, "div.F7nice [aria-label]"):
            label = (node.get_attribute("aria-label") or "").strip()
            rating_match = re.search(r"([0-5](?:\.[0-9])?)\s+stars?", label, re.IGNORECASE)
            review_match = re.search(r"([\d,]+)\s+reviews?", label, re.IGNORECASE)
            if rating_match:
                place.rating = float(rating_match.group(1))
            if review_match:
                place.reviewCount = parse_number(review_match.group(1))
        if rating_panel and not place.reviewCount:
            review_match = re.search(r"\(([\d,]+)\)", rating_panel[0].text)
            if review_match:
                place.reviewCount = parse_number(review_match.group(1))

        image_candidates = driver.find_elements(
            By.CSS_SELECTOR,
            "button[jsaction*='heroHeaderImage'] img, img[src*='googleusercontent.com']",
        )
        place.image = next(
            (
                image.get_attribute("src")
                for image in image_candidates
                if (image.get_attribute("src") or "").startswith("http")
                and (image.get_attribute("naturalWidth") or "0").isdigit()
                and int(image.get_attribute("naturalWidth") or 0) >= 200
            ),
            place.image,
        )
    except TimeoutException:
        pass
    finally:
        driver.close()
        driver.switch_to.window(original_tab)


def scrape_query(
    driver: webdriver.Chrome,
    sector: str,
    category: str,
    limit: int,
    debug: bool = False,
) -> list[ImportedPlace]:
    sector_meta = SECTORS[sector]
    sector_label = sector_meta["label"]
    query_label = CATEGORY_QUERIES[category]
    query = f"{query_label} in {sector_label} DHA Phase 6 Lahore"
    search_url = f"https://www.google.com/maps/search/{quote_plus(query)}?hl=en"
    driver.get(search_url)

    try:
        WebDriverWait(driver, 20).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "a.hfpxzc, div[role='feed']"))
        )
    except TimeoutException:
        return []

    feed = driver.find_elements(By.CSS_SELECTOR, "div[role='feed']")
    if feed:
        for _ in range(3):
            driver.execute_script("arguments[0].scrollTop = arguments[0].scrollHeight", feed[0])
            time.sleep(0.8)

    imported: list[ImportedPlace] = []
    seen: set[str] = set()
    for card in driver.find_elements(By.CSS_SELECTOR, "div.Nv2PK"):
        links = card.find_elements(By.CSS_SELECTOR, "a.hfpxzc")
        if not links:
            continue
        link = links[0]
        name = (link.get_attribute("aria-label") or "").strip()
        maps_url = (link.get_attribute("href") or "").strip()
        if not name or not maps_url or name.lower() in seen:
            continue

        lines = card_text(card)
        aria_labels = [
            node.get_attribute("aria-label")
            for node in card.find_elements(By.CSS_SELECTOR, "[aria-label]")
            if node.get_attribute("aria-label")
        ]
        if debug:
            styled_images = [
                node.get_attribute("style")
                for node in card.find_elements(By.CSS_SELECTOR, "[style*='background-image']")
            ]
            print(
                json.dumps(
                    {"name": name, "lines": lines, "ariaLabels": aria_labels, "imageStyles": styled_images},
                    ensure_ascii=True,
                ),
                flush=True,
            )
        ratings = card.find_elements(By.CSS_SELECTOR, ".MW4etd")
        reviews = card.find_elements(By.CSS_SELECTOR, ".UY7F9")
        images = card.find_elements(By.CSS_SELECTOR, "img")
        status = next(
            (line for line in lines if line.lower().startswith(("open", "closed"))),
            "Check current hours",
        )
        image = next(
            (img.get_attribute("src") for img in images if (img.get_attribute("src") or "").startswith("http")),
            None,
        )
        rating = None
        if ratings:
            try:
                rating = float(ratings[0].text.strip())
            except ValueError:
                rating = None

        review_count = parse_number(reviews[0].text) if reviews else 0
        if not review_count:
            rating_label = next((label for label in aria_labels if "review" in label.lower()), "")
            review_match = re.search(r"([\d,]+)\s+reviews?", rating_label, re.IGNORECASE)
            review_count = parse_number(review_match.group(1)) if review_match else 0
        if not review_count:
            rating_line = next((line for line in lines if re.match(r"^[0-5](?:\.[0-9])?\s*\(", line)), "")
            review_match = re.search(r"\(([\d,]+)\)", rating_line)
            review_count = parse_number(review_match.group(1)) if review_match else 0

        # Derive approximate coordinates from sector anchor if not available yet
        place_lat = sector_meta["lat"]
        place_lng = sector_meta["lng"]

        imported.append(
            ImportedPlace(
                id=f"{slugify(name)}-{sector}-{category}",
                name=name,
                sector=sector,
                sectorLabel=sector_label,
                category=category,
                categoryLabel=query_label.title(),
                rating=rating,
                reviewCount=review_count,
                address=extract_address(lines, name),
                phone=None,
                status=status,
                image=image,
                googleMapsUrl=maps_url,
                sourceQuery=query,
                retrievedAt=date.today().isoformat(),
                lat=place_lat,
                lng=place_lng,
                website=None,
            )
        )
        seen.add(name.lower())
        if len(imported) >= limit:
            break

    for place in imported:
        hydrate_place_details(driver, place)
    return imported


def main() -> None:
    parser = argparse.ArgumentParser(description="Import DHA Phase 6 Lahore Google Maps places.")
    parser.add_argument("--sector", choices=[*SECTORS, "all"], default="sector-a")
    parser.add_argument("--category", choices=[*CATEGORY_QUERIES, "all"], default="all")
    parser.add_argument("--radius", type=int, default=800, help="Search radius in meters")
    parser.add_argument("--coordinates", type=str, default=None, help="Custom lat,lng coordinates")
    parser.add_argument("--limit", type=int, default=6)
    parser.add_argument("--debug", action="store_true")
    parser.add_argument("--rehydrate", action="store_true", help="Refresh details for records already in --output")
    parser.add_argument("--output-dir", type=Path, default=Path("src/data/places"), help="Directory for sector JSON databases")
    parser.add_argument("--output", type=Path, default=Path("src/data/google-places-import.json"), help="Unified output file")
    args = parser.parse_args()

    sectors = list(SECTORS) if args.sector == "all" else [args.sector]
    categories = list(CATEGORY_QUERIES) if args.category == "all" else [args.category]
    records: list[ImportedPlace] = []

    if args.rehydrate:
        records = [
            ImportedPlace(**record)
            for record in json.loads(args.output.read_text(encoding="utf-8"))
        ]
        driver = make_driver()
        try:
            for index, record in enumerate(records, start=1):
                hydrate_place_details(driver, record)
                print(f"Refreshed {index}/{len(records)}: {record.name}", flush=True)
        finally:
            driver.quit()
        args.output.write_text(
            json.dumps([asdict(record) for record in records], ensure_ascii=True, indent=2) + "\n",
            encoding="utf-8",
        )
        print(f"Wrote {len(records)} records to {args.output}")
        return

    driver = make_driver()
    try:
        for sector in sectors:
            sector_records: list[ImportedPlace] = []
            for category in categories:
                batch = scrape_query(driver, sector, category, args.limit, args.debug)
                sector_records.extend(batch)
                records.extend(batch)
                print(f"{sector}/{category}: {len(batch)} places (total: {len(records)})", flush=True)
            
            # Save individual sector file if output-dir is specified
            if args.output_dir:
                args.output_dir.mkdir(parents=True, exist_ok=True)
                sector_file = args.output_dir / f"{sector}.json"
                sector_file.write_text(
                    json.dumps([asdict(r) for r in sector_records], ensure_ascii=True, indent=2) + "\n",
                    encoding="utf-8",
                )
                print(f"Saved sector database to {sector_file}")
    finally:
        driver.quit()

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(
        json.dumps([asdict(record) for record in records], ensure_ascii=True, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Wrote {len(records)} records to {args.output}")


if __name__ == "__main__":
    main()
