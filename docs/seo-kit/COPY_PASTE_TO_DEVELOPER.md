# BJSL — Developer implementation order (20 November 2026)

**Live production origin:** https://bharathjansewalabs.com (canonical currently selected by website). User-facing site is also reachable on www. Do not change hostname or replace existing 66 test routes blindly.

The archive contains reference Next.js components, scripts and exactly what to fix. In the existing GitHub/Vercel application:

1. **P0 /packages/**: Inspect deployed errors. Restore usable package listing and verify all links from homepage. Current production render says "Something went wrong".
2. **P0 wrong canonicals**: For `/quality/`, use `<link rel="canonical" href="https://bharathjansewalabs.com/quality/">`; for `/affordable-testing-assistance/`, use `<link rel="canonical" href="https://bharathjansewalabs.com/affordable-testing-assistance/">`. In Next.js App Router, merge `src/reference/metadata.ts` into their existing page metadata. Keep home page self-canonical.
3. **P0 remove unverified medical/consumer claims**: Replace “NABL, ICMR accredited” with a factual statement after signoff: “Tests processed at named partner laboratories; accreditation and test-specific scope information available on our quality page,” only where documented. Verify MC-2849 and MC-3104 (names, validity, scope) in official records. Do not claim all BJSL centres are accredited. Remove/qualify unsubstantiated total patients, ratings, universal 60-min collection and universal 6-hour TAT.
4. **P0 tariff**: Approve individual tests and real package constituents in a single tariff master; remove contradictory MRP comparisons (CBC ₹400/₹410/₹450; HbA1c ₹650/₹720; lipid ₹600/₹750). Use `TestOffer` and `bjsl-seo.ts` as examples: Finance-approved current prices alone may appear as binding `Offer` schema. Always show checkout total including collection fees. Do NOT automatically advertise old leaflet rates as binding.
5. **P1 first 8 high-demand test pages**: Improve existing pages (see `data/CLINICAL_TEST_PAGE_COPY_FOR_REVIEW.csv`) with clinically reviewed concise answers, unique prep, specimen, test differentiation, fee policy, real centre/service eligibility, TAT, relevant links. Replace repetitive 16 FAQs with a small relevant selection. Keep current slugs and internal links.
6. **P1 hostname/crawl**: Approve non-www as canonical unless migration decision. If confirmed, redirect www → non-www with `src/proxy.ts`, check `robots.txt`, `sitemap.xml`, `sitemap-tests.xml`, `sitemap-locations.xml` and run `scripts/site_audit.py` (all sitemap URLs). Remove any confirmed sitemap 404 including Electronic City. Do not redirect error pages to homepage.
7. **P1 local SEO**: Reconcile real KR Market phone and hours, Peenya PIN, Kengeri and Jaraganahalli centres; link individual GBPs to centre pages, not duplicate fake place pages. Record actual Maps rank by fixed geographic grid.
8. **P1 customer journey**: Maintain enquiry language until a real slot/price-lock/OTP/payment confirmation backend is tested. Only label "Book now" when confirmation is operational. Do not leak health/patient data to Google/Meta analytics.
9. **MEASUREMENT**: Verify BJSL GSC + GA4 in the new dedicated OpenSEO project or provide a secure read-only GSC service account to developer CI. Run scripts for current and previous complete 28d, and capture Search Console's separate Generative AI performance report. Verify Bing Webmaster and its AI Performance report, then optionally submit changed URLs using IndexNow after verified key setup.
10. **AI visibility**: Keep 15 fixed prompts (3 branded tests for factual accuracy) in `data/ai_prompts.csv`. For each answered prompt across ChatGPT, Gemini, Google AI Overviews/Mode, Copilot, Perplexity, Claude, Grok, Meta AI and DeepSeek (if web search present), record real source links/competitor mentions in `data/ai_observations.csv`, then run `scripts/ai_citation_report.py`. Never manufacture results, count failed checks as missing brand, or infer chat traffic from prompt samples.

## Developer commands
```bash
python3 -m pip install -r requirements.txt
python3 -m unittest discover -s tests -v
python3 scripts/site_audit.py --out reports/site_audit.csv
# Only once BJSL ownership gives GSC read access
export GSC_SITE_URL='sc-domain:bharathjansewalabs.com'
export GOOGLE_APPLICATION_CREDENTIALS='/secure/path/to/credentials.json'
python3 scripts/gsc_baseline.py --out reports
# After actual manual/platform collection
python3 scripts/ai_citation_report.py --input data/ai_observations.csv --out reports
```

## Release gates
- `/packages/` error gone and checkout/enquiry functional.
- `/quality/` and `/affordable-testing-assistance/` self-canonical on actual host; URL Inspection verified.
- 66 test page routes preserved and no 4xx/5xx sitemap entries.
- No fake ICMR accreditation, unverified NABL certificates, unsupported discount/turnaround claims.
- No contradictory final payable test/collection charges; server-generated confirmed quote, not an enquiry mislabelled a booking.
- 28-day GSC baseline and sampled AI citation report only from observed, connected data; report coverage and dates.

**Hand back to management:** deployed commit, release date, fixed URLs, technical crawl CSV, Finance/Medical approvals, verified centre records, GSC query/page report, GA4 conversion proof, Bing & AI evidence, and unresolved risks.
