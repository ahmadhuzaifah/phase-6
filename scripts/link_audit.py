"""
Internal Link Audit Script for DHA Phase 6 Lahore Portal.
Scans all .astro pages for internal href links and checks against known valid routes.
"""
import os
import re
import sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_PAGES_DIR = os.path.join(BASE_DIR, 'src', 'pages')

# Known route prefixes and patterns
STATIC_ROUTES = {
    '/',
    '/sectors/',
    '/properties/',
    '/plots/',
    '/places/',
    '/jobs/',
    '/faq/',
    '/sitemap/',
    '/dha-phase-6-lahore-map/',
    '/helplines/',
    '/postal-code/',
    '/weather/',
    '/contact/',
    '/privacy-policy/',
    '/disclaimer/',
    '/verification-and-transfer/',
    '/investment-guide/',
    '/houses-near-schools-dha-phase-6-lahore/',
    '/houses-near-hospitals-dha-phase-6-lahore/',
    '/houses-near-mosques-dha-phase-6-lahore/',
    '/houses-near-parks-dha-phase-6-lahore/',
    '/plots-near-schools-dha-phase-6-lahore/',
    '/plots-near-commercial-dha-phase-6-lahore/',
}

DYNAMIC_PREFIXES = (
    '/sectors/',     # /sectors/[sector]/, /sectors/[sector]/places/, /sectors/[sector]/properties/
    '/places/',      # /places/[first]/[second]/
    '/properties/',  # /properties/[slug]/
    '#',             # anchors
    'tel:',          # phone links
    'mailto:',       # email links
    'http://',       # external
    'https://',      # external
)

def audit_links():
    print("=" * 60)
    print("DHA Phase 6 Lahore — Internal Link Audit")
    print("=" * 60)

    found_links = set()
    total_files = 0
    issues = []

    for root, dirs, files in os.walk(SRC_PAGES_DIR):
        for f in files:
            if f.endswith('.astro'):
                total_files += 1
                filepath = os.path.join(root, f)
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as fh:
                    content = fh.read()

                # Extract href="..."
                hrefs = re.findall(r'href=["\']([^"\']+)["\']', content)
                for href in hrefs:
                    # Ignore template strings like href={`...`}
                    if '{' in href or '}' in href:
                        continue
                    found_links.add((href, f))

                    # Validate static links
                    if href.startswith('/') and not href.startswith(DYNAMIC_PREFIXES):
                        # Normalize trailing slash
                        normalized = href if href.endswith('/') else href + '/'
                        if normalized not in STATIC_ROUTES and href not in STATIC_ROUTES:
                            issues.append((f, href))

    print(f"Scanned {total_files} .astro files.")
    print(f"Found {len(found_links)} static href links.")

    if issues:
        print(f"\nPotential broken links ({len(issues)}):")
        for file, href in issues:
            print(f"  - {file}: {href}")
    else:
        print("\nAll scanned static links matched valid routes!")

    return len(issues)

if __name__ == '__main__':
    err_count = audit_links()
    sys.exit(0 if err_count == 0 else 1)
