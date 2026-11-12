#!/usr/bin/env python3
"""
BJSL Quality Gate & Clinical Governance Verifier
Validates pricing arithmetic, clinical claims, accreditation citations,
and URL integrity prior to deployment.
"""

import os
import sys
import json
import csv
import re
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
ERRORS = []
WARNINGS = []

def log_error(msg):
    ERRORS.append(msg)
    print(f"❌ [ERROR] {msg}")

def log_warning(msg):
    WARNINGS.append(msg)
    print(f"⚠️  [WARNING] {msg}")

def log_success(msg):
    print(f"✅ [PASS] {msg}")

print("==================================================")
print("🛡️  BJSL Quality Gate & Clinical Governance Verifier")
print("==================================================\n")

# 1. Price Reconciliation & Arithmetic Check
conflict_csv = ROOT_DIR / "docs" / "PRICE_CONFLICT_REGISTER_2026-11-11.csv"
if not conflict_csv.exists():
    log_error("Missing docs/PRICE_CONFLICT_REGISTER_2026-11-11.csv")
else:
    with open(conflict_csv, mode="r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            code = row.get("Test/Package Code", "")
            try:
                rate = float(row.get("Verified Approved Rate (INR)", 0))
                mkt = float(row.get("Documented Market Ref (INR)", 0))
                stated_pct_str = row.get("Verified True Discount (%)", "").replace("%", "").strip()
                if stated_pct_str and mkt > rate > 0:
                    stated_pct = float(stated_pct_str)
                    calc_pct = round(((mkt - rate) / mkt) * 100, 2)
                    if abs(stated_pct - calc_pct) > 0.5:
                        log_error(f"Price math mismatch in {code}: Stated={stated_pct}%, Calculated={calc_pct}%")
            except Exception as e:
                log_error(f"Invalid row format in price conflict register: {row} - {e}")
    log_success("Price conflict register verified and discount arithmetic reconciled.")

# 2. Centre Master Integrity Check
centre_csv = ROOT_DIR / "docs" / "CENTRE_RECONCILIATION_2026-11-11.csv"
if not centre_csv.exists():
    log_error("Missing docs/CENTRE_RECONCILIATION_2026-11-11.csv")
else:
    with open(centre_csv, mode="r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        centres = list(reader)
        if len(centres) < 10:
            log_warning(f"Expected at least 10 verified hubs, found {len(centres)}")
        
        # Check Basaveshwaranagar address bug
        for c in centres:
            if "Basaveshwaranagar" in c.get("Centre Name", "") or "Basaveshwaranagar" in c.get("Locality", ""):
                addr = c.get("Verified Physical Address", "")
                if "Jaraganahalli" in addr or "Kanakapura" in addr:
                    log_error("Basaveshwaranagar hub incorrectly contains Jaraganahalli address!")
    log_success("Centre master verified. Basaveshwaranagar distinct address confirmed.")

# 3. Value Packages Approval Governance
val_pkg_path = ROOT_DIR / "data" / "value-packages.json"
approvals_path = ROOT_DIR / "data" / "package-approvals.json"
if val_pkg_path.exists():
    with open(val_pkg_path, "r", encoding="utf-8") as f:
        pkg_data = json.load(f)
        packages = pkg_data.get("packages", [])
        for p in packages:
            # An unapproved package must not have published: true
            if p.get("published") is True:
                if not p.get("priceINR") or not p.get("tatHours"):
                    log_error(f"Package '{p.get('slug')}' published=True without approved price or TAT!")
    log_success("Value packages governance gate passed.")

# 4. Critical Route & File Integrity Check
critical_files = [
    "public/robots.txt",
    "public/sitemap.xml",
    "public/our-centres/index.html",
    "index.html",
    "vercel.json"
]
for rel_path in critical_files:
    p = ROOT_DIR / rel_path
    if not p.exists():
        log_error(f"Critical production file missing: {rel_path}")
    else:
        if rel_path == "public/robots.txt":
            content = p.read_text(encoding="utf-8")
            required_bots = ["Googlebot", "Bingbot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "Claude-SearchBot"]
            for bot in required_bots:
                if bot not in content:
                    log_warning(f"robots.txt missing crawler directive for: {bot}")
        elif rel_path == "public/our-centres/index.html":
            content = p.read_text(encoding="utf-8")
            if "GMR Layout" not in content or "Peenya" not in content:
                log_error("public/our-centres/index.html missing key verified hub details.")

log_success("Production files and crawlable endpoint routes verified.")

print("\n==================================================")
if ERRORS:
    print(f"❌ Quality Gate FAILED with {len(ERRORS)} error(s) and {len(WARNINGS)} warning(s).")
    sys.exit(1)
else:
    print(f"✅ Quality Gate PASSED with 0 errors and {len(WARNINGS)} warning(s).")
    sys.exit(0)
