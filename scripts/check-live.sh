#!/usr/bin/env bash
# Bharath Jan Sewa Labs - Production & Preview Health/SEO Audit Script
# Usage: bash scripts/check-live.sh [URL]
set -e

TARGET_URL="${1:-https://bharathjansewalabs.com}"
TARGET_URL="${TARGET_URL%/}"

echo "========================================================"
echo "BJSL SEO & Production Audit Checker"
echo "Target: $TARGET_URL"
echo "Date: $(date)"
echo "========================================================"

# 1. Check Homepage HTTP Response
echo -n "1. Checking Homepage HTTP Response... "
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -L "$TARGET_URL")
if [ "$HTTP_CODE" -eq 200 ]; then
  echo "PASS ($HTTP_CODE)"
else
  echo "FAIL ($HTTP_CODE)"
fi

# 2. Check X-Robots-Tag header
echo -n "2. Checking X-Robots-Tag Headers... "
ROBOTS_HEADER=$(curl -sI -L "$TARGET_URL" | grep -i "x-robots-tag" || true)
if [[ "$ROBOTS_HEADER" == *"noindex"* ]]; then
  echo "WARNING: noindex header detected! ($ROBOTS_HEADER)"
else
  echo "PASS (No blocking noindex header)"
fi

# 3. Check robots.txt
echo -n "3. Checking robots.txt... "
ROBOTS_CODE=$(curl -s -o /dev/null -w "%{http_code}" -L "$TARGET_URL/robots.txt")
if [ "$ROBOTS_CODE" -eq 200 ]; then
  echo "PASS (HTTP 200)"
  # Check for AI crawlers
  ROBOTS_TXT=$(curl -s -L "$TARGET_URL/robots.txt")
  for CRAWLER in "OAI-SearchBot" "ChatGPT-User" "GPTBot" "PerplexityBot" "Googlebot"; do
    if echo "$ROBOTS_TXT" | grep -q "$CRAWLER"; then
      echo "   ✓ Detected crawler rule: $CRAWLER"
    fi
  done
else
  echo "FAIL (HTTP $ROBOTS_CODE)"
fi

# 4. Check sitemap.xml
echo -n "4. Checking sitemap.xml... "
SITEMAP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -L "$TARGET_URL/sitemap.xml")
if [ "$SITEMAP_CODE" -eq 200 ]; then
  echo "PASS (HTTP 200)"
else
  echo "FAIL (HTTP $SITEMAP_CODE)"
fi

# 5. Check llms.txt (AI Search / GEO)
echo -n "5. Checking llms.txt... "
LLMS_CODE=$(curl -s -o /dev/null -w "%{http_code}" -L "$TARGET_URL/llms.txt")
if [ "$LLMS_CODE" -eq 200 ]; then
  echo "PASS (HTTP 200)"
else
  echo "FAIL (HTTP $LLMS_CODE)"
fi

# 6. Check rendered HTML body content length
echo -n "6. Inspecting HTML body content... "
BODY_CONTENT=$(curl -s -L "$TARGET_URL")
BODY_LEN=$(echo "$BODY_CONTENT" | wc -c | tr -d ' ')
if [ "$BODY_LEN" -gt 3000 ]; then
  echo "PASS ($BODY_LEN bytes of crawlable content)"
else
  echo "WARNING: Thin body content detected ($BODY_LEN bytes)"
fi

# 7. Check for essential title & heading tags in raw HTML
echo -n "7. Inspecting Page Title in HTML... "
if echo "$BODY_CONTENT" | grep -qi "<title>"; then
  TITLE_TEXT=$(echo "$BODY_CONTENT" | sed -n 's/.*<title>\(.*\)<\/title>.*/\1/p' | head -n 1)
  echo "PASS: $TITLE_TEXT"
else
  echo "FAIL: Missing <title> tag"
fi

echo -n "8. Inspecting Canonical Link in HTML... "
if echo "$BODY_CONTENT" | grep -qi 'rel="canonical"'; then
  CANONICAL=$(echo "$BODY_CONTENT" | grep -i 'rel="canonical"' | head -n 1)
  echo "PASS: $CANONICAL"
else
  echo "FAIL: Missing canonical link"
fi

echo "========================================================"
echo "Audit check complete."
