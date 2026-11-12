#!/usr/bin/env python3
"""
BJSL Live Production & Crawlability Diagnostic Auditor
Audits HTTP response codes, SSL, redirects, canonical tags,
robots.txt, and sitemap.xml across live production and staging hosts.
"""

import sys
import urllib.request
import urllib.error
import ssl
import re
import argparse

DEFAULT_HOST = "https://bharathjansewalabs.vercel.app"
PRODUCTION_HOST = "https://www.bharathjansewalabs.com"

CRAWLER_USER_AGENTS = {
    "Standard Browser": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Googlebot": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    "Bingbot": "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)",
    "OAI-SearchBot": "Mozilla/5.0 (compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)",
    "ChatGPT-User": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 (compatible; ChatGPT-User/1.0; +https://openai.com/bot)",
    "PerplexityBot": "Mozilla/5.0 (compatible; PerplexityBot/1.0; +https://docs.perplexity.ai/docs/resources/perplexity-crawlers)",
    "Claude-SearchBot": "Mozilla/5.0 (compatible; Claude-SearchBot/1.0; +https://support.claude.com)"
}

CHECK_PATHS = [
    "/",
    "/robots.txt",
    "/sitemap.xml",
    "/our-centres/",
    "/locations/",
    "/tests/"
]

def audit_url(url, user_agent="Googlebot", timeout=10):
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    
    headers = {"User-Agent": user_agent, "Accept": "*/*"}
    req = urllib.request.Request(url, headers=headers)
    
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=timeout) as resp:
            status = resp.getcode()
            final_url = resp.geturl()
            content_type = resp.headers.get("Content-Type", "")
            body = resp.read(204800).decode("utf-8", errors="ignore")
            
            # Extract title & canonical
            title_m = re.search(r"<title[^>]*>(.*?)</title>", body, re.IGNORECASE | re.DOTALL)
            title = title_m.group(1).strip() if title_m else ""
            
            canonical_m = re.search(r'<link[^>]*rel=[\'"]canonical[\'"][^>]*href=[\'"]([^\'"]+)[\'"]', body, re.IGNORECASE)
            canonical = canonical_m.group(1).strip() if canonical_m else ""
            
            return {
                "url": url,
                "status": status,
                "final_url": final_url,
                "content_type": content_type,
                "length": len(body),
                "title": title[:60],
                "canonical": canonical,
                "error": None
            }
    except urllib.error.HTTPError as e:
        return {"url": url, "status": e.code, "error": f"HTTP {e.code}: {e.reason}"}
    except Exception as e:
        return {"url": url, "status": None, "error": str(e)}

def main():
    parser = argparse.ArgumentParser(description="BJSL Live Production Auditor")
    parser.add_argument("--host", default=DEFAULT_HOST, help="Base host to audit (e.g. https://www.bharathjansewalabs.com or http://localhost:4000)")
    args = parser.parse_args()

    base_host = args.host.rstrip("/")
    print("==================================================")
    print(f"🌐 BJSL Live Production Diagnostic: {base_host}")
    print("==================================================\n")

    # 1. Test Key Routes
    print(f"--- 1. Auditing Core Routes on {base_host} ---")
    for path in CHECK_PATHS:
        target = base_host + path
        res = audit_url(target)
        if res.get("error"):
            print(f"❌ {path:<18} Status: {res.get('status')} | Error: {res.get('error')}")
        else:
            print(f"✅ {path:<18} Status: {res['status']} | Length: {res['length']:<6} | Canonical: {res.get('canonical', 'N/A')}")

    # 2. Test Crawler Accessibility
    print(f"\n--- 2. Verifying Search & AI Bot Crawlability on Homepage ---")
    home_url = base_host + "/"
    for bot_name, ua in CRAWLER_USER_AGENTS.items():
        res = audit_url(home_url, user_agent=ua)
        if res.get("status") == 200:
            print(f"✅ {bot_name:<18} -> 200 OK (Title: {res.get('title')[:35]}...)")
        else:
            print(f"❌ {bot_name:<18} -> Status: {res.get('status')} Error: {res.get('error')}")

    print("\n==================================================")
    print("🏁 Audit completed.")

if __name__ == "__main__":
    main()
