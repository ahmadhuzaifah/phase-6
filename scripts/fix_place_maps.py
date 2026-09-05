"""
Script: fix_place_maps.py
Purpose: Regenerate Google Maps URLs for all places in DHA Phase 6 Lahore Places Directory.
Converts coordinate-only links (https://www.google.com/maps/search/?api=1&query=31.xx,74.yy)
into proper Google Maps search URLs:
https://www.google.com/maps/search/?api=1&query=Place+Name+Address+DHA+Phase+6+Lahore
Preserves existing official Google Maps links (with CID, place_id, or direct /place/ paths).
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

def is_valid_custom_maps_url(url: str) -> bool:
    """Checks if the URL already has a specific CID, place_id, or custom Google Maps link."""
    if not url:
        return False
    # If URL contains CID, place_id, or goo.gl shortlink, preserve it
    if any(k in url for k in ('cid=', 'place_id=', 'query_place_id=', 'maps.app.goo.gl', 'goo.gl/maps')):
        return True
    if '/place/' in url and not re.search(r'/place/-?\d+\.\d+,-?\d+\.\d+', url):
        return True
    # If it is a coordinate-only query (e.g. query=31.472,74.4602), it is NOT a valid custom URL
    if re.search(r'[?&](?:query|q)=-?\d+\.\d+,-?\d+\.\d+$', url.strip()):
        return False
    # If query is not coordinates, it might already be a text query
    return False

def build_proper_maps_url(place: dict) -> str:
    """
    Builds a proper Google Maps Universal Search URL:
    https://www.google.com/maps/search/?api=1&query=Place+Name+Address+DHA+Phase+6+Lahore
    """
    name = (place.get('name') or '').strip()
    address = (place.get('address') or '').strip()
    sector_label = (place.get('sectorLabel') or place.get('sector') or '').strip()

    parts = [name]

    if address:
        # Extract specific street/building/sector part from address
        # Strip trailing "DHA Phase 6, Lahore" to avoid duplicate phrasing
        addr_clean = re.sub(r'(?:,?\s*DHA\s*Phase\s*6)?,?\s*Lahore.*$', '', address, flags=re.I).strip(' ,')
        addr_clean = re.sub(r'(?:,?\s*DHA\s*Phase\s*6).*$', '', addr_clean, flags=re.I).strip(' ,')
        
        # Don't repeat "CCA 1" or "CCA 2" or sector name if already in name
        if addr_clean and addr_clean.lower() not in name.lower():
            # If CCA 1 is in name and addr_clean is "CCA 1, Commercial Broadway", extract "Commercial Broadway"
            if re.search(r'CCA\s*1', name, re.I):
                addr_clean = re.sub(r'CCA\s*1,?\s*', '', addr_clean, flags=re.I).strip(' ,')
            elif re.search(r'CCA\s*2', name, re.I):
                addr_clean = re.sub(r'CCA\s*2,?\s*', '', addr_clean, flags=re.I).strip(' ,')
            if addr_clean and addr_clean.lower() not in name.lower():
                parts.append(addr_clean)
    elif sector_label and sector_label.lower() not in name.lower():
        parts.append(sector_label)

    # Ensure "DHA Phase 6" and "Lahore" are included for unambiguous geographic resolution
    combined = ' '.join(parts)
    if not re.search(r'DHA\s*Phase\s*6', combined, re.I):
        parts.append('DHA Phase 6')
    if not re.search(r'Lahore', combined, re.I):
        parts.append('Lahore')

    # Clean punctuation and normalize spacing
    raw = ' '.join(parts)
    raw = re.sub(r'[,;]+', ' ', raw)
    # Remove duplicate consecutive words
    tokens = raw.split()
    deduped = []
    for token in tokens:
        if not deduped or token.lower() != deduped[-1].lower():
            deduped.append(token)
    clean_query = ' '.join(deduped)

    # Encode with quote_plus to use '+' as in the Google Maps Search URL standard
    encoded_query = urllib.parse.quote_plus(clean_query)
    return f"https://www.google.com/maps/search/?api=1&query={encoded_query}"

def process_file(filepath: str):
    with open(filepath, 'r', encoding='utf-8') as fh:
        places = json.load(fh)

    fixed_count = 0
    preserved_count = 0

    for p in places:
        current_url = p.get('googleMapsUrl', '')
        if is_valid_custom_maps_url(current_url):
            preserved_count += 1
        else:
            new_url = build_proper_maps_url(p)
            p['googleMapsUrl'] = new_url
            fixed_count += 1

    with open(filepath, 'w', encoding='utf-8') as fh:
        json.dump(places, fh, indent=2, ensure_ascii=False)

    return len(places), fixed_count, preserved_count

def main():
    print("=" * 65)
    print("DHA Phase 6 Lahore — Google Maps Links Fixer")
    print("=" * 65)

    all_files = sorted(glob.glob(os.path.join(PLACES_DIR, '*.json')))
    if os.path.exists(GOOGLE_IMPORT_FILE):
        all_files.append(GOOGLE_IMPORT_FILE)

    total_places = 0
    total_fixed = 0
    total_preserved = 0

    for f in all_files:
        rel_path = os.path.relpath(f, BASE_DIR)
        count, fixed, preserved = process_file(f)
        total_places += count
        total_fixed += fixed
        total_preserved += preserved
        print(f"✓ {rel_path:45} | Places: {count:3} | Fixed: {fixed:3} | Preserved: {preserved:2}")

    print("=" * 65)
    print(f"Summary:")
    print(f"  Total Places Audited:     {total_places}")
    print(f"  Google Maps URLs Fixed:   {total_fixed}")
    print(f"  Preserved Existing URLs:  {total_preserved}")
    print("=" * 65)

if __name__ == '__main__':
    main()
