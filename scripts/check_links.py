#!/usr/bin/env python3
"""Verify every local href/src referenced in index.html points to a real file.

Root-absolute paths (starting with "/") are skipped since they're resolved
by the hosting platform (e.g. Vercel's injected analytics script), not by
files in this repo.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
HTML = (ROOT / "index.html").read_text(encoding="utf-8")

SKIP_PREFIXES = ("http://", "https://", "mailto:", "tel:", "#", "data:", "/")

refs = set(re.findall(r'(?:href|src)="([^"]+)"', HTML))
missing = []

for ref in sorted(refs):
    if ref.startswith(SKIP_PREFIXES):
        continue
    path = ROOT / ref.split("#")[0].split("?")[0]
    if not path.is_file():
        missing.append(ref)

if missing:
    print("Missing local files referenced in index.html:")
    for m in missing:
        print(f"  - {m}")
    sys.exit(1)

print(f"OK: {len(refs)} local references checked, all resolve.")
