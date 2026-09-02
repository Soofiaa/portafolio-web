#!/usr/bin/env python3
"""Verify that hardcoded ES text in index.html matches i18n/i18n.json["es"].

index.html carries the default Spanish copy so the page has real content
before i18n.js fetches i18n/i18n.json and replaces it. If the two drift
apart, users on slow connections, JS-disabled clients, and crawlers that
don't execute JS see stale/weaker copy than what i18n.json actually serves.
This script fails the build when they disagree.
"""
import html
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
HTML = (ROOT / "index.html").read_text(encoding="utf-8")
DATA = json.loads((ROOT / "i18n" / "i18n.json").read_text(encoding="utf-8"))
ES = DATA["es"]

PATTERN = re.compile(
    r'<(\w+)([^>]*\bdata-i18n(-html)?="([\w.\-0-9]+)"[^>]*)>(.*?)</\1>', re.S
)


def get_nested(d, path):
    cur = d
    for key in path.split("."):
        if isinstance(cur, list):
            cur = cur[int(key)]
        elif isinstance(cur, dict):
            cur = cur.get(key)
        else:
            return None
    return cur


def normalize(text):
    return re.sub(r"\s+", " ", html.unescape(text)).strip()


def main():
    mismatches = []
    seen = set()
    for match in PATTERN.finditer(HTML):
        _tag, _attrs, _is_html, key, inner = match.groups()
        if key in seen:
            continue
        seen.add(key)
        expected = get_nested(ES, key)
        if expected is None:
            mismatches.append((key, "CLAVE NO ENCONTRADA EN i18n.json", inner))
            continue
        if normalize(inner) != normalize(str(expected)):
            mismatches.append((key, normalize(str(expected)), normalize(inner)))

    if mismatches:
        print(f"Desincronización detectada en {len(mismatches)} campo(s):\n")
        for key, expected, actual in mismatches:
            print(f"  clave: {key}")
            print(f"    i18n.json: {expected}")
            print(f"    index.html: {actual}\n")
        sys.exit(1)

    print(f"OK: {len(seen)} claves data-i18n verificadas, todas sincronizadas.")


if __name__ == "__main__":
    main()
