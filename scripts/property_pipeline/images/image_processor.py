"""Create optimized, watermarked WebP derivatives without altering raw files."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from property_pipeline.config import CONFIG, PipelineConfig
from property_pipeline.processors.normalizer import slugify


def _pillow() -> tuple[Any, Any, Any]:
    try:
        from PIL import Image, ImageDraw, ImageFont
    except ImportError as exc:
        raise RuntimeError("Pillow is required for property image processing.") from exc
    return Image, ImageDraw, ImageFont


def ensure_placeholder(config: PipelineConfig = CONFIG) -> Path:
    Image, ImageDraw, ImageFont = _pillow()
    destination = config.project_root / "public" / "images" / "placeholders" / "property-placeholder.webp"
    if destination.exists():
        return destination
    destination.parent.mkdir(parents=True, exist_ok=True)
    canvas = Image.new("RGB", (1200, 800), "#111827")
    draw = ImageDraw.Draw(canvas, "RGBA")
    draw.rectangle((80, 80, 1120, 720), outline=(52, 211, 153, 100), width=3)
    font = ImageFont.load_default(size=28)
    text = "No verified image available"
    box = draw.textbbox((0, 0), text, font=font)
    draw.text(((1200 - (box[2] - box[0])) / 2, 385), text, fill=(226, 232, 240, 220), font=font)
    canvas.save(destination, "WEBP", quality=82, method=6)
    return destination


def process_image(record: dict[str, Any], config: PipelineConfig = CONFIG) -> dict[str, Any]:
    updated = dict(record)
    if record.get("imageStatus") != "approved" or not record.get("rawImagePath"):
        return updated
    Image, ImageDraw, ImageFont = _pillow()
    source = Path(str(record["rawImagePath"]))
    filename = slugify(
        f"dha-phase-6-lahore-{record.get('size', '')}-{record.get('unit', '')}-{record.get('propertyType', '')}-{record.get('block', '')}-{record.get('id', '')}"
    ) + ".webp"
    destination = config.processed_image_dir / filename
    destination.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as original:
        image = original.convert("RGB")
        if image.width > 1600:
            height = round(image.height * (1600 / image.width))
            image = image.resize((1600, height), Image.Resampling.LANCZOS)
        overlay = Image.new("RGBA", image.size, (0, 0, 0, 0))
        draw = ImageDraw.Draw(overlay)
        font = ImageFont.load_default(size=max(14, image.width // 65))
        label = "dhaphase6lahore.pk"
        box = draw.textbbox((0, 0), label, font=font)
        padding = max(12, image.width // 80)
        x = image.width - (box[2] - box[0]) - padding * 2
        y = image.height - (box[3] - box[1]) - padding * 2
        draw.rounded_rectangle((x - padding, y - padding, image.width - padding, image.height - padding), radius=8, fill=(0, 0, 0, 89))
        draw.text((x, y), label, font=font, fill=(255, 255, 255, 89))
        image = Image.alpha_composite(image.convert("RGBA"), overlay).convert("RGB")
        image.save(destination, "WEBP", quality=82, method=6)
    public_url = f"/images/properties/{filename}"
    updated["primaryImage"] = public_url
    updated["images"] = [{
        "url": public_url,
        "alt": f"{record['title']} in DHA Phase 6 Lahore",
        "caption": "Authorized property image",
        "isFeatured": True,
        "order": 1,
        "width": image.width,
        "height": image.height,
    }]
    return updated


def process_images(records: list[dict[str, Any]], config: PipelineConfig = CONFIG) -> list[dict[str, Any]]:
    ensure_placeholder(config)
    return [process_image(record, config) for record in records]
