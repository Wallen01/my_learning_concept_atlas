#!/usr/bin/env python3
import os
import json
import re

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VAULT_DIR = os.path.join(REPO_ROOT, "vault")
OUTPUT_PATH = os.path.join(REPO_ROOT, "website", "manifest.json")

def parse_title_line(md):
    m = re.search(r"^#\s+(.+)$", md, re.MULTILINE)
    if not m:
        return {"en": "(untitled)", "zh": ""}
    full = m.group(1).strip()
    parts = re.match(r"^(.+?)（(.+?)）$", full)
    if parts:
        return {"en": parts.group(1).strip(), "zh": parts.group(2).strip()}
    return {"en": full, "zh": ""}

def parse_quick_explain(md):
    m = re.search(r"## 中文速解\s*\n([^\n]+)", md)
    return m.group(1).strip() if m else ""

def parse_frontmatter(md):
    m = re.match(r"^---\n([\s\S]*?)\n---", md)
    if not m:
        return {}
    obj = {}
    for line in m.group(1).split("\n"):
        kv = re.match(r"^(\w[\w_]*):\s*(.+)", line)
        if kv:
            obj[kv.group(1)] = kv.group(2).strip("\"'")
    return obj

def parse_source_kind(fm):
    raw = fm.get("source_kind", "")
    mapping = {
        "lecture_slides": "lecture slides",
        "article": "article",
        "paper": "paper",
        "book": "book",
        "note": "note"
    }
    return mapping.get(raw, raw or "source")

def generate():
    manifest = {
        "topics": [],
        "concepts": [],
        "sources": []
    }

    # 1. Topics
    topics_dir = os.path.join(VAULT_DIR, "topics")
    if os.path.exists(topics_dir):
        for fname in sorted(os.listdir(topics_dir)):
            if fname.endswith(".md"):
                fpath = os.path.join(topics_dir, fname)
                with open(fpath, "r", encoding="utf-8") as f:
                    content = f.read()
                titles = parse_title_line(content)
                # description is first line after heading
                body = re.sub(r"^---[\s\S]*?---\s*", "", content)
                body = re.sub(r"^#.+\n*", "", body).strip()
                desc = body.split("\n")[0] if body else ""
                manifest["topics"].append({
                    "name": fname,
                    "path": f"vault/topics/{fname}",
                    "en": titles["en"],
                    "zh": titles["zh"],
                    "desc": desc
                })

    # 2. Concepts
    concepts_dir = os.path.join(VAULT_DIR, "concepts")
    if os.path.exists(concepts_dir):
        for fname in sorted(os.listdir(concepts_dir)):
            if fname.endswith(".md"):
                fpath = os.path.join(concepts_dir, fname)
                with open(fpath, "r", encoding="utf-8") as f:
                    content = f.read()
                titles = parse_title_line(content)
                quick = parse_quick_explain(content)
                manifest["concepts"].append({
                    "name": fname,
                    "path": f"vault/concepts/{fname}",
                    "en": titles["en"],
                    "zh": titles["zh"],
                    "quick": quick
                })

    # 3. Sources
    sources_dir = os.path.join(VAULT_DIR, "sources")
    if os.path.exists(sources_dir):
        for fname in sorted(os.listdir(sources_dir)):
            if fname.endswith(".md"):
                fpath = os.path.join(sources_dir, fname)
                with open(fpath, "r", encoding="utf-8") as f:
                    content = f.read()
                titles = parse_title_line(content)
                fm = parse_frontmatter(content)
                kind = parse_source_kind(fm)
                manifest["sources"].append({
                    "name": fname,
                    "path": f"vault/sources/{fname}",
                    "en": titles["en"],
                    "zh": titles["zh"],
                    "kind": kind
                })

    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)

    print(f"Generated {OUTPUT_PATH}:")
    print(f"  Topics: {len(manifest['topics'])}")
    print(f"  Concepts: {len(manifest['concepts'])}")
    print(f"  Sources: {len(manifest['sources'])}")

if __name__ == "__main__":
    generate()
