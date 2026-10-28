#!/usr/bin/env python3
"""Verify every local href/src referenced in index.html, apps/index.html and apps/*/index.html points to a real file.

Las rutas relativas se resuelven desde la carpeta de cada página. Las rutas que
empiezan con "/" se resuelven desde la raíz del repo, salvo las que inyecta la
plataforma (/_vercel/...) y los enlaces a páginas (terminan en "/" o apuntan a
un ancla, como "/" o "/#projects"), que se comprueban como carpetas con index.html.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PAGES = [ROOT / "index.html", ROOT / "404.html", ROOT / "apps" / "index.html", *sorted((ROOT / "apps").glob("*/index.html"))]

SKIP_PREFIXES = ("http://", "https://", "mailto:", "tel:", "#", "data:", "/_vercel/")

missing = []
total = 0

for page in PAGES:
    html = page.read_text(encoding="utf-8")
    refs = set(re.findall(r'(?<![-\w])(?:href|src)="([^"]+)"', html))
    for ref in sorted(refs):
        if ref.startswith(SKIP_PREFIXES):
            continue
        total += 1
        clean = ref.split("#")[0].split("?")[0]
        base = ROOT if clean.startswith("/") else page.parent
        path = base / clean.lstrip("/")
        if path.is_dir():
            path = path / "index.html"
        if not clean:  # "/#projects" -> raíz
            path = ROOT / "index.html"
        if not path.is_file():
            missing.append(f"{page.relative_to(ROOT)}: {ref}")

if missing:
    print("Missing local files referenced:")
    for m in missing:
        print(f"  - {m}")
    sys.exit(1)

print(f"OK: {total} local references checked in {len(PAGES)} page(s), all resolve.")
