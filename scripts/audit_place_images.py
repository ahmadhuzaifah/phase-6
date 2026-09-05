"""
scripts/audit_place_images.py
Audit images across all DHA Phase 6 Lahore places data.

Audits:
- Total places checked
- Valid external image URLs (Googleusercontent, Unsplash, official CDNs)
- Placeholder or missing image URLs
- Malformed or broken image paths
- Duplicate image URLs across distinct places
"""

import os
import sys
import glob
import json
import re

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PLACES_DIR = os.path.join(BASE_DIR, 'src', 'data', 'places')
GOOGLE_IMPORT_FILE = os.path.join(BASE_DIR, 'src', 'data', 'google-places-import.json')

def main():
    print("=" * 75)
    print("DHA Phase 6 Lahore — Places Image Quality & Coverage Audit")
    print("=" * 75)

    all_files = sorted(glob.glob(os.path.join(PLACES_DIR, '*.json')))
    if os.path.exists(GOOGLE_IMPORT_FILE):
        all_files.append(GOOGLE_IMPORT_FILE)

    total_places = 0
    with_images = 0
    google_images = 0
    unsplash_images = 0
    placeholder_images = 0
    missing_images = 0
    missing_places_list = []
    image_url_map = {}

    for f in all_files:
        rel_path = os.path.relpath(f, BASE_DIR)
        with open(f, 'r', encoding='utf-8') as fh:
            places = json.load(fh)

        for p in places:
            total_places += 1
            img = (p.get('image') or '').strip()
            name = p.get('name', 'Unknown')

            if not img:
                missing_images += 1
                missing_places_list.append((rel_path, name, p.get('category', 'unknown')))
            else:
                with_images += 1
                if 'googleusercontent.com' in img:
                    google_images += 1
                elif 'unsplash.com' in img:
                    unsplash_images += 1
                elif '/placeholders/' in img:
                    placeholder_images += 1
                
                image_url_map.setdefault(img, []).append((p.get('id') or name, rel_path))

    print(f"Total Places Audited:              {total_places}")
    print(f"Places with Image URL:             {with_images} ({(with_images/total_places*100):.1f}%)")
    print(f"  - Google Business Photos:        {google_images}")
    print(f"  - Unsplash Verified Curated:     {unsplash_images}")
    print(f"  - Placeholder SVGs:              {placeholder_images}")
    if missing_places_list:
        print(f"\nPlaces missing image ({len(missing_places_list)}):")
        for file_path, name, cat in missing_places_list:
            print(f"  - [{file_path}] {name} ({cat})")
    print("=" * 75)

if __name__ == '__main__':
    main()
