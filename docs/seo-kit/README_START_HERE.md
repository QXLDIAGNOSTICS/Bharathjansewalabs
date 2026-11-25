# Bharath Jan Sewa Labs — Search & AI Visibility Engineering Kit
**Audit date: 20 November 2026 | Market: Bengaluru, Karnataka, India**
**Existing canonical:** `https://bharathjansewalabs.com` (the live site currently declares this). `www` also serves content; do not switch it without an approved migration.

## IMPORTANT: INTEGRATION PATCH, NOT A REPLACEMENT WEBSITE
This is a set of tested/inspectable scripts and integration examples, not a drop-in complete Next.js application. The website already has 66 individual test pages. **Do not remove, rename, or replace these working pages.** Match route conventions of the actual Vercel/GitHub repository. An authenticated connected Google Search Console property, GA4 and live AI collection were NOT available in the current audit, so no real click/rank/citation deltas can be claimed. No production changes were made. The OpenSEO BJSL project has been created but is not connected to Google.

## Site findings (live HTTP/rendered-page inspection, 20 Nov 2026)
- Main sitemap: 20 URLs; test sitemap: 67 URLs (index + 66 tests); locality sitemap: 26 URLs (index + 25 service areas). `robots.txt` retrievable on both hosts.
- `/packages/` renders "Something went wrong" in the inspection. `/quality/` and `/affordable-testing-assistance/` each report a *homepage* canonical instead of self-canonical.
- `www` and apex both serve HTML, but homepage canonical is non-www. Keep non-www unless management authorises migration; redirect www to apex when engineering confirms both work.
- Homepage includes the invalid/unsupported wording "NABL, ICMR accredited". ICMR NEDL is a national essential test list, not lab accreditation. Homepage refers to MC-2849 and MC-3104: verify the actual laboratory, validity and scope in official NABL records before displaying.
- Homepage vs catalog has inconsistent reference/MRP examples: CBC ₹400/₹450 vs catalogue ₹410; HbA1c ₹650 vs ₹720; lipid ₹750 vs ₹600. Stop showing reference pricing/discounts until independently approved.
- Test pages describe leaflet/indicative pricing and ask patients to confirm; do not advertise as an instantly locked final price before server-side quotes exist. CBC page advertises ₹160; blood sugar ₹20, subject to confirmation.
- `/locations/electronic-city/` was reported not found in one rendered fetch despite appearing in the sitemap. Recheck with a real HTTP status and remove from sitemap if confirmed 404.
- Live affordability article is published with the author's stated professional byline.
- Current GSC/GA4/AI tracker: no BJSL connected property or stored observations. Reported non-brand rankings, conversions and AI mentions are unknown, not zero.

## Merge order (P0 first)
1. Run `python scripts/site_audit.py` from a networked computer to validate all 3 sitemaps, canonical, indexability, 404 and error pages. **First fix packages, wrong canonicals and invalid location routes**.
2. Validate and correct accreditation, comparative prices, TAT claims, centre address/phone/hours and home collection charges. Medical and finance approval mandatory.
3. Copy `src/lib/bjsl-seo.ts`, `src/components/TestOffer.tsx`, `src/components/RelatedBasicTests.tsx` and `src/components/JsonLd.tsx` into the EXISTING Next.js repository and adapt imports. These use a single approved-source tariff record, with prices gated by approval, no invented certificates.
4. Adapt `src/proxy.ts` only AFTER confirming actual hosting. `src/app/robots.ts` and `src/app/sitemap.ts` are **reference snippets**; merge with existing split sitemaps instead of replacing the production routes.
5. Run Search Console export (`scripts/gsc_baseline.py`) after verified read-only service-account access is granted to `sc-domain:bharathjansewalabs.com`. Start with query/page/date/device and India-only data, 28 current complete days versus previous 28.
6. Run GA4 organic baseline (`scripts/ga4_baseline.py`) if a verified property and credentials are connected.
7. `scripts/ai_citation_report.py` builds a transparent per-platform baseline from **actual recorded answers** in `data/ai_observations.csv`. Blank input yields *no data*, not fabricated zeros. Keep 12-20 unbranded prompts fixed weekly, India/Bengaluru, and record answers + citation URLs and competitors. Tracked paid API collection is not started.
8. Only after QA, enable privacy-conscious booking conversion events (`src/lib/analytics.ts`); do not send patient names, phone, diagnoses, test names, or test IDs to ad networks.

## Setup
```bash
python3 -m pip install -r requirements.txt
python3 scripts/site_audit.py --origin https://bharathjansewalabs.com --out reports/live_audit.csv
# Place the service account JSON in a SECURE secret path outside source control
export GOOGLE_APPLICATION_CREDENTIALS=/secure/keys/bjsl-gsc.json
export GSC_SITE_URL='sc-domain:bharathjansewalabs.com'
python3 scripts/gsc_baseline.py --out reports
# optional when GA4 connected
export GA4_PROPERTY_ID='YOUR_OWN_VERIFIED_PROPERTY_ID'
python3 scripts/ga4_baseline.py --out reports
python3 scripts/ai_citation_report.py --input data/ai_observations.csv --out reports
python3 -m unittest discover -s tests -v
```
GSC service account must be invited to Search Console as a user; granting API scopes alone is insufficient. GSC is delayed and anonymises rare queries; use complete dates ending at least 3 days before today. Generative AI performance is separately available in the Search Console UI but may not be exposed by the standard Search Analytics API.

## Safe publication rules
- Prices must be **finance-approved and currently valid** before being rendered in offers or JSON-LD. Do not state 'lowest Bangalore' unless an independently documented methodology proves it.
- Never assert that BJSL collection centres themselves are NABL-accredited without certificate evidence; present the correctly identified performing laboratory and only covered test scope.
- Only verified active centres may receive LocalBusiness schema. Service areas are not fake business addresses or new Google Business Profiles.
- Only mark a booking `purchase` on confirmed payment; a confirmed pay-on-collection reservation is not a paid transaction.
- Medical test reference ranges, conditions, and reviewer details must be approved by a responsible clinician; test pages should not encourage unnecessary testing.
- `llms.txt` is optional documentation and does not guarantee Google/AI inclusion; do not block user-facing crawlers or hide page body behind client-side-only rendering.

## Relevant authoritative sources
- Google AI guidance: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Google canonical guidance: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Google Search Console: https://search.google.com/search-console
- Google Search Analytics API: https://developers.google.com/webmaster-tools/v1/searchanalytics/query
- Google Search generative AI report: https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports
- Bing Webmaster: https://www.bing.com/webmasters/
- Bing IndexNow: https://www.bing.com/webmasters/help/indexnow-0z209wby
- Bing AI Performance: https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c
- DuckDuckGo search sources: https://duckduckgo.com/duckduckgo-help-pages/results/sources
- OpenAI crawler docs: https://platform.openai.com/docs/bots
- Anthropic crawler docs: https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler

## Local schema and AI referral add-ons
- `src/lib/centre-schema.ts`: generates a genuine `LocalBusiness` node **only** from a verified, operational physical centre. Does not manufacture Business Profiles for service zones. Centre addresses/phones must be verified before use.
- `scripts/ga4_ai_referrals.py`: optional GA4 report for observable visits from chatgpt.com, perplexity.ai, claude.ai, etc. This is not AI citation/recommendation measurement, and may undercount sources that suppress referrers or appear under google.com/bing.com. Configure numeric GA4_PROPERTY_ID and credentials first.
