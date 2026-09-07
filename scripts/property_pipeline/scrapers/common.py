"""Robots-aware HTTP and structured-data helpers shared by portal adapters."""

from __future__ import annotations

import json
import re
import time
from datetime import datetime, timezone
from html import unescape
from pathlib import Path
from typing import Any, Iterable
from urllib.error import HTTPError, URLError
from urllib.parse import urljoin, urlparse
from urllib.request import Request, build_opener
from urllib.robotparser import RobotFileParser

from property_pipeline.config import PipelineConfig


class ComplianceError(RuntimeError):
    """Raised when a URL is outside a portal's published crawl rules."""


class RobotsAwareClient:
    def __init__(self, config: PipelineConfig) -> None:
        self.config = config
        self._robots: dict[str, RobotFileParser] = {}
        self._last_request: dict[str, float] = {}
        self._opener = build_opener()

    def _robot_parser(self, url: str) -> RobotFileParser:
        parsed = urlparse(url)
        origin = f"{parsed.scheme}://{parsed.netloc}"
        if origin not in self._robots:
            robots_url = urljoin(origin, "/robots.txt")
            parser = RobotFileParser(robots_url)
            try:
                request = Request(
                    robots_url,
                    headers={"User-Agent": self.config.user_agent, "Accept": "text/plain,*/*;q=0.8"},
                )
                with self._opener.open(request, timeout=self.config.timeout_seconds) as response:
                    robots_text = response.read().decode("utf-8", errors="replace")
                parser.parse(robots_text.splitlines())
            except (HTTPError, URLError, OSError) as exc:
                raise ComplianceError(f"Unable to verify robots.txt for {origin}: {exc}") from exc
            self._robots[origin] = parser
        return self._robots[origin]

    def allowed(self, url: str) -> bool:
        return self._robot_parser(url).can_fetch(self.config.user_agent, url)

    def fetch(self, url: str) -> tuple[bytes, str]:
        if not self.allowed(url):
            raise ComplianceError(f"robots.txt does not permit this client to fetch {url}")
        parsed = urlparse(url)
        origin = f"{parsed.scheme}://{parsed.netloc}"
        elapsed = time.monotonic() - self._last_request.get(origin, 0.0)
        if elapsed < self.config.request_delay_seconds:
            time.sleep(self.config.request_delay_seconds - elapsed)
        request = Request(
            url,
            headers={
                "User-Agent": self.config.user_agent,
                "Accept": "text/html,application/xhtml+xml,application/json;q=0.9,image/*;q=0.8",
                "Accept-Language": "en-PK,en;q=0.8",
            },
        )
        last_error: Exception | None = None
        for attempt in range(self.config.max_retries + 1):
            try:
                with self._opener.open(request, timeout=self.config.timeout_seconds) as response:
                    self._last_request[origin] = time.monotonic()
                    return response.read(), response.headers.get_content_type()
            except (HTTPError, URLError, TimeoutError, OSError) as exc:
                last_error = exc
                if attempt < self.config.max_retries:
                    time.sleep(self.config.request_delay_seconds * (attempt + 1))
        raise RuntimeError(f"Failed to fetch {url}: {last_error}")

    def fetch_text(self, url: str) -> str:
        body, _ = self.fetch(url)
        return body.decode("utf-8", errors="replace")


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


def clean_html(value: str) -> str:
    value = re.sub(r"<script\b[^>]*>.*?</script>", " ", value, flags=re.I | re.S)
    value = re.sub(r"<style\b[^>]*>.*?</style>", " ", value, flags=re.I | re.S)
    value = re.sub(r"<[^>]+>", " ", value)
    return re.sub(r"\s+", " ", unescape(value)).strip()


def meta_content(html: str, key: str) -> str:
    patterns = (
        rf'<meta[^>]+(?:property|name)=["\']{re.escape(key)}["\'][^>]+content=["\']([^"\']+)',
        rf'<meta[^>]+content=["\']([^"\']+)["\'][^>]+(?:property|name)=["\']{re.escape(key)}["\']',
    )
    for pattern in patterns:
        match = re.search(pattern, html, flags=re.I)
        if match:
            return clean_html(match.group(1))
    return ""


def extract_json_ld(html: str) -> list[Any]:
    records: list[Any] = []
    pattern = r'<script[^>]+type=["\']application/ld\+json["\'][^>]*>(.*?)</script>'
    for match in re.finditer(pattern, html, flags=re.I | re.S):
        payload = unescape(match.group(1)).strip()
        try:
            records.append(json.loads(payload))
        except json.JSONDecodeError:
            continue
    return records


def walk_json(value: Any) -> Iterable[dict[str, Any]]:
    if isinstance(value, dict):
        yield value
        for child in value.values():
            yield from walk_json(child)
    elif isinstance(value, list):
        for child in value:
            yield from walk_json(child)


def write_json(path: Path, payload: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix(path.suffix + ".tmp")
    temporary.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    temporary.replace(path)


def is_phase_six_lahore(*values: str) -> bool:
    haystack = " ".join(values).lower()
    return "lahore" in haystack and bool(re.search(r"(?:dha|defence).{0,30}phase\s*6|phase\s*6.{0,30}(?:dha|defence)", haystack))


def first_value(record: dict[str, Any], *keys: str) -> Any:
    for key in keys:
        value = record.get(key)
        if value not in (None, "", [], {}):
            return value
    return ""
