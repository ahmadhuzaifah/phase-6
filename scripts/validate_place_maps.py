"""
scripts/validate_place_maps.py
Validation script for DHA Phase 6 Lahore Places Directory Google Maps URLs.

Audits:
- Total places checked across all JSON data files
- Valid Google Maps URLs (universal search with place name, CID, or place_id)
- Coordinate-only / Unnamed URLs (must be 0)
- Missing required fields (name, category, sector, address, lat, lng, googleMapsUrl)
- Missing address data
- Tests 10 sample places across diverse categories (School, Mosque, Restaurant, Hospital, Bakery, Bank, etc.)
"""

import os
import sys
import glob
import json
import re
import urllib.parse

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PLACES_DIR = os.path.join(BASE_DIR, 'src', 'data', 'places')
GOOGLE_IMPORT_FILE = os.path.join(BASE_DIR, 'src', 'data', 'google-places-import.json')

def check_place(place: dict, filename: str):
    """Validates an individual place record."""
    issues = []
    
    name = place.get('name')
    category = place.get('category')
    sector = place.get('sector') or place.get('sectorLabel')
    address = place.get('address')
    lat = place.get('lat')
    lng = place.get('lng')
    url = place.get('googleMapsUrl')

    if not name:
        issues.append("Missing 'name'")
    if not category:
        issues.append("Missing 'category'")
    if not sector:
        issues.append("Missing 'sector'")
    if not address or not address.strip():
        issues.append("Missing address data")
    if lat is None or not isinstance(lat, (int, float)):
        issues.append("Missing or invalid latitude")
    if lng is None or not isinstance(lng, (int, float)):
        issues.append("Missing or invalid longitude")
    
    if not url:
        issues.append("Missing 'googleMapsUrl'")
    else:
        # Check if URL is coordinate-only (e.g. query=31.47,74.43 or maps.google.com/?q=31.47,74.43)
        coord_pattern = r'[?&](?:query|q)=-?\d+\.\d+,-?\d+\.\d+$'
        if re.search(coord_pattern, url.strip()):
            issues.append(f"Coordinate-only URL (unnamed place): {url}")
        
        # Verify it has Google Maps domain
        if not ('google.com/maps' in url or 'maps.google.com' in url or 'goo.gl/maps' in url):
            issues.append(f"Invalid Google Maps domain: {url}")
            
        # Verify it includes place information or search query
        parsed = urllib.parse.urlparse(url)
        query_params = urllib.parse.parse_qs(parsed.query)
        if 'query' in query_params:
            query_val = query_params['query'][0]
            # Ensure query isn't just coordinates
            if re.match(r'^-?\d+\.\d+,-?\d+\.\d+$', query_val.strip()):
                issues.append(f"Query parameter contains only coordinates: {query_val}")
        elif 'cid' not in query_params and 'place_id' not in query_params and '/place/' not in parsed.path:
            issues.append(f"Google Maps URL missing search query, CID, or place_id: {url}")

    return issues

def main():
    print("=" * 75)
    print("DHA Phase 6 Lahore — Places Google Maps Audit & Validation")
    print("=" * 75)

    all_files = sorted(glob.glob(os.path.join(PLACES_DIR, '*.json')))
    if os.path.exists(GOOGLE_IMPORT_FILE):
        all_files.append(GOOGLE_IMPORT_FILE)

    total_places = 0
    total_valid_urls = 0
    coordinate_only_urls = 0
    missing_address_count = 0
    missing_fields_count = 0
    all_issues = []
    
    places_by_category = {}
    collected_places = []

    for f in all_files:
        rel_path = os.path.relpath(f, BASE_DIR)
        with open(f, 'r', encoding='utf-8') as fh:
            places = json.load(fh)

        file_valid = 0
        file_issues = 0

        for p in places:
            total_places += 1
            issues = check_place(p, rel_path)
            
            cat = p.get('category', 'unknown')
            places_by_category.setdefault(cat, []).append(p)
            collected_places.append(p)

            if issues:
                file_issues += 1
                for issue in issues:
                    if "Coordinate-only" in issue:
                        coordinate_only_urls += 1
                    elif "Missing address" in issue:
                        missing_address_count += 1
                    else:
                        missing_fields_count += 1
                    all_issues.append((rel_path, p.get('name', 'UNKNOWN'), issue))
            else:
                file_valid += 1
                total_valid_urls += 1

        status_tag = "[PASS]" if file_issues == 0 else f"[FAIL: {file_issues}]"
        print(f"{status_tag:8} {rel_path:45} | Places: {len(places):3} | Valid: {file_valid:3}")

    print("=" * 75)
    print("AUDIT RESULTS SUMMARY:")
    print(f"  Total Places Checked:            {total_places}")
    print(f"  Valid Google Maps URLs:          {total_valid_urls}")
    print(f"  Coordinate-Only (Unnamed) URLs:  {coordinate_only_urls}")
    print(f"  Missing Address Data:            {missing_address_count}")
    print(f"  Other Missing Fields:            {missing_fields_count}")
    print("=" * 75)

    if all_issues:
        print("\nISSUES FOUND:")
        for file_path, name, issue in all_issues[:20]:
            print(f"  - [{file_path}] '{name}': {issue}")
        if len(all_issues) > 20:
            print(f"  ... and {len(all_issues) - 20} more issues.")
        print("=" * 75)
    else:
        print("\nSUCCESS: 100% of places have verified, non-coordinate Google Maps search links!")

    # Sample 10 diverse categories
    print("\nSAMPLE 10 VERIFIED PLACES ACROSS DIVERSE CATEGORIES:")
    sample_categories = [
        ('school', 'School'),
        ('mosque', 'Mosque'),
        ('restaurant', 'Restaurant'),
        ('hospital', 'Hospital'),
        ('bakery', 'Bakery'),
        ('bank', 'Bank'),
        ('cafe', 'Cafe'),
        ('supermarket', 'Supermarket'),
        ('park', 'Park'),
        ('clinic', 'Clinic'),
    ]

    sample_count = 0
    seen_ids = set()
    for cat_key, cat_label in sample_categories:
        candidates = places_by_category.get(cat_key, []) or places_by_category.get(cat_key + 's', [])
        for c in candidates:
            c_id = c.get('id') or c.get('name')
            if c_id not in seen_ids:
                seen_ids.add(c_id)
                sample_count += 1
                print(f"\n{sample_count}. [{cat_label}] {c.get('name')}")
                print(f"   Sector:  {c.get('sectorLabel') or c.get('sector')}")
                print(f"   Address: {c.get('address')}")
                print(f"   Phone:   {c.get('phone') or 'N/A'}")
                print(f"   Maps:    {c.get('googleMapsUrl')}")
                break

    print("\n" + "=" * 75)
    
    if coordinate_only_urls > 0 or missing_address_count > 0 or missing_fields_count > 0:
        sys.exit(1)
    else:
        sys.exit(0)

if __name__ == '__main__':
    main()
