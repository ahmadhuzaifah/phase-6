import os
import re
from html.parser import HTMLParser
from collections import defaultdict

class MetaParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = None
        self.in_title = False
        self.meta_desc = None
        self.h1_count = 0
        self.has_schema = False
        self.in_script = False
        self.script_type = None

    def handle_starttag(self, tag, attrs):
        attrs_dict = {k.lower(): v for k, v in attrs if v is not None}
        if tag == "title":
            self.in_title = True
        elif tag == "meta":
            name = attrs_dict.get("name", "").lower()
            if name == "description":
                self.meta_desc = attrs_dict.get("content", "")
        elif tag == "h1":
            self.h1_count += 1
        elif tag == "script":
            stype = attrs_dict.get("type", "").lower()
            if stype == "application/ld+json":
                self.has_schema = True

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False

    def handle_data(self, data):
        if self.in_title and self.title is None:
            self.title = data.strip()

def audit_html_pages(dist_dir):
    report = {
        "total_pages": 0,
        "missing_title": [],
        "missing_desc": [],
        "missing_h1": [],
        "multiple_h1": [],
        "missing_schema": [],
        "titles": defaultdict(list),
        "descriptions": defaultdict(list),
    }

    if not os.path.exists(dist_dir):
        print(f"Dist dir {dist_dir} does not exist yet. Run build first.")
        return report

    for root, _, files in os.walk(dist_dir):
        for f in files:
            if f == "index.html":
                report["total_pages"] += 1
                full_path = os.path.join(root, f)
                rel_path = os.path.relpath(full_path, dist_dir)
                url_path = "/" + rel_path.replace("\\", "/").replace("/index.html", "").replace("index.html", "")

                try:
                    with open(full_path, "r", encoding="utf-8") as html_file:
                        content = html_file.read()
                        parser = MetaParser()
                        parser.feed(content)

                        if not parser.title:
                            report["missing_title"].append(url_path)
                        else:
                            report["titles"][parser.title].append(url_path)

                        if not parser.meta_desc:
                            report["missing_desc"].append(url_path)
                        else:
                            report["descriptions"][parser.meta_desc].append(url_path)

                        if parser.h1_count == 0:
                            report["missing_h1"].append(url_path)
                        elif parser.h1_count > 1:
                            report["multiple_h1"].append(url_path)

                        if not parser.has_schema:
                            report["missing_schema"].append(url_path)

                except Exception as e:
                    print(f"Error reading {full_path}: {e}")

    print("=" * 60)
    print("DHA Phase 6 Lahore — Technical SEO Audit Report")
    print("=" * 60)
    print(f"Total HTML pages audited:        {report['total_pages']}")
    print(f"Pages with Missing Title:        {len(report['missing_title'])}")
    print(f"Pages with Missing Description:  {len(report['missing_desc'])}")
    print(f"Pages with Missing H1:           {len(report['missing_h1'])}")
    print(f"Pages with Multiple H1:          {len(report['multiple_h1'])}")
    print(f"Pages with Missing JSON-LD:      {len(report['missing_schema'])}")
    print("=" * 60)

    # Check duplicates
    duplicate_titles = {k: v for k, v in report["titles"].items() if len(v) > 1}
    print(f"Duplicate title clusters:        {len(duplicate_titles)}")

    return report

if __name__ == "__main__":
    audit_html_pages("dist")
