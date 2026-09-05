"""
DHA Phase 6 Lahore — Places Directory Audit Report (Phase 10.11)
Audits the complete places database, image validity, category coverage,
sector coverage, and generated route pages.
"""
import json
import glob
import os
import sys

def main():
    places_dir = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'places')
    sector_files = sorted(glob.glob(os.path.join(places_dir, 'sector-*.json')) +
                          glob.glob(os.path.join(places_dir, 'cca.json')) +
                          glob.glob(os.path.join(places_dir, 'main-boulevard-commercial.json')) +
                          glob.glob(os.path.join(places_dir, 'raya-commercial.json')) +
                          glob.glob(os.path.join(places_dir, 'defence-raya.json')))

    all_places = []
    seen_ids = set()

    for sf in sector_files:
        with open(sf, 'r', encoding='utf-8') as f:
            data = json.load(f)
            for p in data:
                if p['id'] not in seen_ids:
                    seen_ids.add(p['id'])
                    all_places.append(p)

    total_places = len(all_places)

    # Image stats
    places_with_original_img = 0
    places_with_placeholder = 0
    broken_images = 0

    for p in all_places:
        img = p.get('image')
        images = p.get('images', [])
        first_img = images[0] if (images and len(images) > 0) else None
        active_img = first_img or img

        if active_img and isinstance(active_img, str) and active_img.startswith('http'):
            places_with_original_img += 1
        elif active_img and isinstance(active_img, str) and active_img.startswith('/images/amenities/'):
            places_with_placeholder += 1
        elif not active_img:
            places_with_placeholder += 1
        else:
            broken_images += 1

    # Sector breakdown
    sector_counts = {}
    for p in all_places:
        s = p.get('sectorLabel', p.get('sector', 'Unknown'))
        sector_counts[s] = sector_counts.get(s, 0) + 1

    # Category breakdown
    category_counts = {}
    for p in all_places:
        c = p.get('categoryLabel', p.get('category', 'Unknown'))
        category_counts[c] = category_counts.get(c, 0) + 1

    # Core categories target check (minimum 6)
    core_categories_map = {
        'Parks': ['park', 'parks'],
        'Banks': ['bank', 'banks'],
        'Pharmacies': ['pharmacy', 'pharmacies'],
        'Restaurants': ['restaurant', 'restaurants'],
        'Mosques': ['mosque', 'mosques'],
        'Clinics': ['clinic', 'clinics'],
        'Supermarkets': ['supermarket', 'supermarkets'],
        'Cafes': ['cafe', 'cafes'],
        'Fast Food': ['fast food'],
        'Bakeries': ['bakery', 'bakeries'],
        'Gyms': ['gym', 'gyms'],
        'Beauty Salons': ['beauty salon', 'beauty salons', 'salon', 'salons'],
        'Schools': ['school', 'schools'],
        'Shopping': ['shopping'],
        'Services': ['services', 'service'],
        'Hospitals': ['hospital', 'hospitals'],
        'Clubs': ['club', 'clubs'],
        'Colleges': ['college', 'colleges'],
    }

    print("=" * 70)
    print(" DHA PHASE 6 LAHORE - PLACES DIRECTORY AUDIT REPORT (PHASE 10.11)")
    print("=" * 70)
    print(f"Total Verified Places:           {total_places}")
    print(f"Places with Original Images:      {places_with_original_img} ({places_with_original_img/total_places*100:.1f}%)")
    print(f"Places with SVG Placeholders:     {places_with_placeholder} ({places_with_placeholder/total_places*100:.1f}%)")
    print(f"Broken Images:                    {broken_images} (MUST BE 0: {'PASSED' if broken_images == 0 else 'FAILED'})")
    print("-" * 70)

    print("\nPLACES PER SECTOR / ZONE:")
    print(f"{'Sector / Zone':<35} {'Place Count':>12}")
    print("-" * 50)
    for sec, count in sorted(sector_counts.items(), key=lambda x: -x[1]):
        print(f"{sec:<35} {count:>12}")
    print(f"{'TOTAL':<35} {total_places:>12}")

    print("\nPLACES PER CATEGORY:")
    print(f"{'Category':<30} {'Count':>8} {'Target >= 6':>15} {'Status':>10}")
    print("-" * 65)
    for cat, count in sorted(category_counts.items(), key=lambda x: -x[1]):
        target = "Yes (>=6)" if count >= 6 else "Thin (<6)"
        status = "[PASS]" if count >= 6 else "[THIN-OK]"
        print(f"{cat:<30} {count:>8} {target:>15} {status:>10}")

    print("\nCORE CATEGORY VERIFICATION (Target: Minimum 6 real places each):")
    all_core_passed = True
    for cat_label, aliases in core_categories_map.items():
        match_count = 0
        for c_name, c_cnt in category_counts.items():
            if any(alias in c_name.lower() for alias in aliases):
                match_count += c_cnt
        passed = match_count >= 6
        if not passed:
            all_core_passed = False
        status_str = "[OK]" if passed else "[FAIL]"
        print(f"  {cat_label:<25} Count: {match_count:>3}   {status_str}")

    print(f"\nAll Core Categories >= 6 places: {'PASSED' if all_core_passed else 'FAILED'}")

    # Estimate page counts
    # 17 sector pages
    sector_pages_count = len(sector_files)
    # Populated categories (>= 6)
    populated_categories = [k for k, v in category_counts.items() if v >= 6]
    # Populated sector-category pairs (>= 6)
    sector_cat_pairs = 0
    for s_label in sector_counts:
        s_places = [p for p in all_places if p.get('sectorLabel') == s_label]
        s_cat_map = {}
        for p in s_places:
            s_cat_map[p.get('category')] = s_cat_map.get(p.get('category'), 0) + 1
        for cat_key, c_count in s_cat_map.items():
            if c_count >= 6:
                sector_cat_pairs += 1

    print("\nPAGE ROUTE GENERATION SUMMARY:")
    print(f"  - Sector Directory Pages (/places/[sector]/):              {sector_pages_count}")
    print(f"  - Category Directory Pages (/places/[category]/):          {len(populated_categories)}")
    print(f"  - Sector+Category Pages (/places/[sector]/[category]/):    {sector_cat_pairs} (only high-density >=6)")
    print(f"  - Individual Place Detail Pages (/places/[cat]/[slug]/):   {total_places}")
    print("=" * 70)

if __name__ == '__main__':
    main()
