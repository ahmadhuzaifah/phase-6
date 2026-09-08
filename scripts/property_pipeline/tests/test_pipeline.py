from __future__ import annotations

import sys
import unittest
from datetime import datetime, timezone
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from property_pipeline.processors.availability_checker import update_lifecycle, verification_label
from property_pipeline.processors.cleaner import clean_raw_listing
from property_pipeline.processors.duplicate_detector import deduplicate
from property_pipeline.processors.normalizer import normalize_block, normalize_price, normalize_record, normalize_size
from property_pipeline.processors.quality_scorer import score_property


RAW = {
    "source": "Zameen",
    "source_id": "zameen-123456",
    "source_url": "https://www.zameen.com/Property/example-123456.html",
    "title": "10 Marla House For Sale in DHA Phase 6 Block C Lahore",
    "purpose": "sale",
    "property_type": "house",
    "location": "DHA Phase 6 Block C Lahore",
    "price_text": "PKR 8.75 Crore",
    "size_text": "10 Marla",
    "bedrooms": 5,
    "bathrooms": 6,
    "description": "A real source description that is not republished without permission.",
    "image_urls": ["https://media.zameen.com/example.jpg"],
    "scraped_at": "2026-09-07T00:00:00Z",
}


class PipelineTests(unittest.TestCase):
    def test_price_and_size_normalization(self) -> None:
        self.assertEqual(normalize_price("PKR 8.75 Crore"), 87_500_000)
        self.assertEqual(normalize_size("10 Marla house"), ("10", "marla"))

    def test_size_after_cca_is_not_parsed_as_area_number(self) -> None:
        sector, block, commercial = normalize_block("8 Marla plaza in CCA DHA Phase 6")
        self.assertEqual((sector, block, commercial), ("", "DHA Phase 6", "CCA"))

    def test_invalid_source_host_is_rejected(self) -> None:
        invalid = {**RAW, "source_url": "https://example.com/fake"}
        self.assertIsNone(clean_raw_listing(invalid))

    def test_record_has_source_tracking_and_original_summary(self) -> None:
        cleaned = clean_raw_listing(RAW)
        self.assertIsNotNone(cleaned)
        normalized = normalize_record(cleaned or {})
        self.assertIsNotNone(normalized)
        assert normalized is not None
        self.assertEqual(normalized["price"], 87_500_000)
        self.assertEqual(normalized["block"], "Sector C")
        self.assertNotIn("real source description", normalized["description"].lower())
        self.assertEqual(normalized["sources"], ["Zameen"])

    def test_cross_source_duplicate_merges_sources(self) -> None:
        left = normalize_record(clean_raw_listing(RAW) or {})
        right_raw = {
            **RAW,
            "source": "Graana",
            "source_id": "graana-987654",
            "source_url": "https://www.graana.com/property/example-987654",
        }
        right = normalize_record(clean_raw_listing(right_raw) or {})
        unique, duplicates = deduplicate([left or {}, right or {}])
        self.assertEqual(len(unique), 1)
        self.assertEqual(len(duplicates), 1)
        self.assertEqual(set(unique[0]["sources"]), {"Zameen", "Graana"})

    def test_availability_requires_two_failed_checks(self) -> None:
        first = update_lifecycle({"availabilityStatus": "available", "lastCheckedDate": "2026-09-07T00:00:00Z"}, False)
        second = update_lifecycle(first, False)
        self.assertEqual(first["listingStatus"], "NOT_FOUND")
        self.assertEqual(second["availabilityStatus"], "removed")
        self.assertEqual(second["listingStatus"], "EXPIRED")

    def test_quality_score_is_deterministic_and_publishable(self) -> None:
        normalized = normalize_record(clean_raw_listing(RAW) or {})
        scored = score_property(normalized or {}, datetime(2026, 9, 7, tzinfo=timezone.utc))
        self.assertEqual(scored["qualityScore"], 78)
        self.assertGreaterEqual(scored["qualityScore"], 60)

    def test_verification_windows(self) -> None:
        now = datetime(2026, 9, 7, tzinfo=timezone.utc)
        self.assertEqual(verification_label("2026-09-03T00:00:00Z", now), "Fresh Listing")
        self.assertEqual(verification_label("2026-08-20T00:00:00Z", now), "Recently Checked")
        self.assertEqual(verification_label("2026-07-20T00:00:00Z", now), "Needs Verification")
        self.assertEqual(verification_label("2026-06-01T00:00:00Z", now), "Verification Required")

    def test_available_check_preserves_manual_reservation(self) -> None:
        reserved = update_lifecycle({"availabilityStatus": "reserved"}, True)
        self.assertEqual(reserved["availabilityStatus"], "reserved")


if __name__ == "__main__":
    unittest.main()
