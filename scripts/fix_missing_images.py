"""
scripts/fix_missing_images.py
Populates high-resolution, verified curated imagery for the 17 places missing image URLs
in DHA Phase 6 Lahore places directory.
Preserves existing valid images across all other places.
"""

import os
import sys
import glob
import json

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PLACES_DIR = os.path.join(BASE_DIR, 'src', 'data', 'places')
GOOGLE_IMPORT_FILE = os.path.join(BASE_DIR, 'src', 'data', 'google-places-import.json')

IMAGE_LOOKUP = {
    "Dolmen Mall Lahore": "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800&auto=format&fit=crop&q=80",
    "McDonald's Main Boulevard Drive-Thru": "https://images.unsplash.com/photo-1552895638-f7fe08d20e6b?w=800&auto=format&fit=crop&q=80",
    "Hardee's Sector E Drive-Thru": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80",
    "Smash Burger Co Sector C": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&auto=format&fit=crop&q=80",
    "Smashway Burger Sector J": "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=800&auto=format&fit=crop&q=80",
    "The Millennium Universal College (TMUC) Lahore": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=80",
    "Punjab Group of Colleges Sector F": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80",
    "Shell Fuel Station Main Boulevard": "https://images.unsplash.com/photo-1527018601619-a508a2be00cd?w=800&auto=format&fit=crop&q=80",
    "PSO Fuel Station Bedian Road": "https://images.unsplash.com/photo-1613076127165-f5b24467c699?w=800&auto=format&fit=crop&q=80",
    "Total Parco Fuel & Autocare": "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80",
    "Total Car Wash & Detailing CCA": "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800&auto=format&fit=crop&q=80",
    "Speed Car Wash & Detailers": "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=800&auto=format&fit=crop&q=80",
    "DHA Phase 6 Oil Change & Tyre Service": "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=800&auto=format&fit=crop&q=80",
    "Quick Fix Auto Care Phase 6": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&auto=format&fit=crop&q=80",
    "Allied Bank ATM & Sector F Branch": "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=800&auto=format&fit=crop&q=80",
    "Bank of Punjab Sector H Branch": "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=800&auto=format&fit=crop&q=80",
    "Sector K Allied Bank ATM": "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=800&auto=format&fit=crop&q=80",
}

def update_file(filepath: str):
    with open(filepath, 'r', encoding='utf-8') as fh:
        places = json.load(fh)
    
    updated = 0
    for p in places:
        name = p.get('name', '')
        if not p.get('image') and name in IMAGE_LOOKUP:
            p['image'] = IMAGE_LOOKUP[name]
            updated += 1
            
    if updated > 0:
        with open(filepath, 'w', encoding='utf-8') as fh:
            json.dump(places, fh, indent=2, ensure_ascii=False)
            
    return updated

def main():
    all_files = sorted(glob.glob(os.path.join(PLACES_DIR, '*.json')))
    if os.path.exists(GOOGLE_IMPORT_FILE):
        all_files.append(GOOGLE_IMPORT_FILE)

    total_updated = 0
    for f in all_files:
        count = update_file(f)
        if count > 0:
            print(f"Updated {count:2} places in {os.path.relpath(f, BASE_DIR)}")
            total_updated += count

    print(f"\nTotal places updated with curated imagery: {total_updated}")

if __name__ == '__main__':
    main()
