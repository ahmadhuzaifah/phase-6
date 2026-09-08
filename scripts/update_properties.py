"""Daily entry point for the complete property acquisition and refresh workflow."""

from fix_property_images import main as fix_images
from property_pipeline.update_properties import main as update_properties


def main() -> int:
    result = update_properties()
    return result if result else fix_images()


if __name__ == "__main__":
    raise SystemExit(main())
