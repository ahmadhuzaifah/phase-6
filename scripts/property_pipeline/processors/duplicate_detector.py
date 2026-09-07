"""Cross-source duplicate matching and deterministic record merging."""

from __future__ import annotations

import hashlib
from difflib import SequenceMatcher
from pathlib import Path
from typing import Any


def _normalized_title(value: str) -> str:
    words = [word for word in value.lower().replace("-", " ").split() if word not in {"for", "sale", "rent", "in"}]
    return " ".join(sorted(words))


def _image_digest(record: dict[str, Any]) -> str:
    path_value = record.get("primaryImage")
    if not path_value or str(path_value).startswith("/images/placeholders/"):
        return ""
    path = Path(str(path_value))
    if not path.exists() or not path.is_file():
        return ""
    return hashlib.sha256(path.read_bytes()).hexdigest()


def duplicate_score(left: dict[str, Any], right: dict[str, Any]) -> float:
    if left.get("sourceUrl") == right.get("sourceUrl"):
        return 1.0
    score = SequenceMatcher(None, _normalized_title(left.get("title", "")), _normalized_title(right.get("title", ""))).ratio() * 0.35
    for key, weight in (("block", 0.15), ("size", 0.10), ("unit", 0.05), ("price", 0.15), ("bedrooms", 0.05), ("bathrooms", 0.05), ("propertyType", 0.05), ("purpose", 0.05)):
        if left.get(key) not in (None, "") and left.get(key) == right.get(key):
            score += weight
    left_hash, right_hash = _image_digest(left), _image_digest(right)
    if left_hash and left_hash == right_hash:
        score += 0.20
    return min(score, 1.0)


def merge_duplicate(primary: dict[str, Any], duplicate: dict[str, Any]) -> dict[str, Any]:
    merged = dict(primary)
    sources = list(dict.fromkeys([*primary.get("sources", []), *duplicate.get("sources", [])]))
    source_urls = list(dict.fromkeys([primary.get("sourceUrl"), *primary.get("sourceUrls", []), duplicate.get("sourceUrl"), *duplicate.get("sourceUrls", [])]))
    merged["sources"] = [item for item in sources if item]
    merged["sourceUrls"] = [item for item in source_urls if item]
    for field in ("bedrooms", "bathrooms", "floors", "condition", "constructionStatus"):
        if merged.get(field) in (None, "") and duplicate.get(field) not in (None, ""):
            merged[field] = duplicate[field]
    if duplicate.get("lastCheckedDate", "") > primary.get("lastCheckedDate", ""):
        merged["lastCheckedDate"] = duplicate["lastCheckedDate"]
    return merged


def deduplicate(records: list[dict[str, Any]], threshold: float = 0.82) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    unique: list[dict[str, Any]] = []
    duplicates: list[dict[str, Any]] = []
    url_index: dict[str, int] = {}
    bucket_index: dict[tuple[Any, ...], list[int]] = {}
    for record in sorted(records, key=lambda item: (item.get("source", ""), item.get("id", ""))):
        source_url = str(record.get("sourceUrl", ""))
        bucket = tuple(record.get(key) for key in ("propertyType", "purpose", "size", "unit"))
        match_index = url_index.get(source_url) if source_url else None
        if match_index is None:
            match_index = next(
                (index for index in bucket_index.get(bucket, []) if duplicate_score(unique[index], record) >= threshold),
                None,
            )
        if match_index is None:
            unique.append(record)
            index = len(unique) - 1
            if source_url:
                url_index[source_url] = index
            bucket_index.setdefault(bucket, []).append(index)
            continue
        duplicate_of = unique[match_index].get("id", "")
        duplicates.append({"id": record.get("id"), "duplicateOf": duplicate_of, "score": round(duplicate_score(unique[match_index], record), 3)})
        unique[match_index] = merge_duplicate(unique[match_index], record)
    return unique, duplicates
