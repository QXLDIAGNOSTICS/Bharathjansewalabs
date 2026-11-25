# BJSL P0–P2 Remediation and Acceptance Contract (20 Nov 2026)

## P0: Must fix before ranking expansion

### P0-01 Broken package route
**Evidence:** https://bharathjansewalabs.com/packages/ rendered application error during audit, while homepage promotes Chirayu packages.
**Action:** inspect production browser console/server logs, resolve component data exception, add runtime error monitoring, fix each package card destination, and test checkout/enquiry fallback.
**Pass:** HTTP 200 server-rendered H1 + substantive package cards; no 'Something went wrong'; each approved package link loads; no false 'booked' response when enquiry-only.

### P0-02 Medical and accreditation claims
**Evidence:** homepage said 'NABL, ICMR accredited'; quality page cites MC-2849 / MC-3104, not independently verified for individual scope.
**Action:** remove ICMR-accredited wording (NEDL is test list, not certifier), identify actual performer(s), verify certificates, in-scope test methods and validity; make verifiable quality page, avoid claiming each collection point independently accredited.
**Pass:** every visible schema accreditation node maps to real certificate+verified scope; clinical team signs off; unsupported stats/claims removed (200k patients, 4.9 rating, 6 labs/4 cities, 60-minute collection, blanket 6h TAT).

### P0-03 Duplicate/incorrect canonicals
**Evidence:** quality and assistance pages canonical to homepage. Both www and non-www serve content; canonical currently non-www.
**Action:** fix correct self-canonicals on important routes; add 301 www→non-www **after** testing deployment. Preserve old page slugs and redirect only true migrations.
**Pass:** source URL 301 only when alias, final 200 and self-canonical; no duplicate/incorrect canonical in all sitemap URLs. Verify Google-selected canonical in GSC URL inspection.

### P0-04 Finance-approved tariff and disclosure
**Evidence:** basic selling rates often consistent but different MRP/reference price across homepage and test list, and most pages say leaflet rates pending confirmation.
**Action:** unify Finance-approved test rates and comparison-price evidence; separate visit/home fees and verified area, report TAT, price expiry, collection mode. Once reliable booking backend is implemented, lock final payable total at quote time.
**Pass:** all rendered price references (home, test, package, locality, schema, checkout) match approved source. Reference prices hidden until approved; no 'cheapest' without documented methodology. Automated price-regression tests pass.

## P1: Next 2 weeks

### P1-05 Repair sitemap index and locality inventory
**Evidence:** main sitemap 20 URLs; 67 test; 26 locality; `/locations/electronic-city/` returned not found on a rendered attempt.
**Action:** crawl all sitemap URLs with `scripts/site_audit.py`; remove any verified 404, redirect, noindex or duplicate URL. Do not create duplicate landing pages for unsupported service zones.
**Pass:** zero sitemap URLs with 4xx, 5xx, error body, wrong canonical; all centre details verified; submitted to Google/Bing with accepted sitemap formats.

### P1-06 First eight basic tests: quality upgrade, not page proliferation
**Action:** keep URLs and existing useful content; add approved medical summary, sample, preparation, limitations, exact current total price, centre eligibility and reviewed date; use RelatedBasicTests to link neighbouring test pages and the price index. Remove duplicate generic 16 FAQs.
**Pass:** each page has one accurate title/H1, stable URL, medically reviewed content, valid schema with no invented credentials or offers, a functional quote/enquiry route and unique helpful answer above the fold.

### P1-07 Maps and trust
**Action:** verify physical centre master and eligible Google Business Profiles (KR Market, Kengeri, Peenya, Ittamadu/Jaraganahalli, Srirampura). Reconcile conflicting KR Market hours/phone, Peenya postal code and all appointment links; add live photos; request genuine unbiased reviews after service.
**Pass:** address and phone match source records; Map direction links correct; each GBP reaches an appropriate local landing page with `utm_source=google&utm_medium=organic&utm_campaign=gbp_centre_slug` tracked without exposing patient info.

### P1-08 Site speed and UX
**Action:** Playwright responsive tests, device field Core Web Vitals, JS error tracking, actual mobile CTA and checkout test. Avoid sending prescription/report content to third party analytics; signed, expiring authenticated report links.
**Pass:** LCP <= 2.5s, INP <= 200ms, CLS <= 0.1 at 75th percentile where enough field data; no UI blocking defects; consent compliance and secure booking confirmation.

## P2: Growth after P0/P1 complete

### P2-09 Third-party validation and entity consistency
**Action:** eligible hospital/community partnerships, legitimate news citations and community diagnostics educational content. Only publish verified organisation/lab/centre data to business listings. Avoid link schemes, fabricated reviews, duplicate city doorway pages.
**Pass:** documented sourced mentions and citations that accurately identify the company and real locations.

### P2-10 First-party + AI measurement
**Action:** Connect BJSL Search Console domain property, GA4, Bing Webmaster; export recent vs previous 28 complete days. For AI results, capture neutral prompts with market, model/search mode, exact answer and cited URLs. Report answer coverage, mention rate and owned citation rate with denominators, and only claim change when prompt/model/market cells match.
**Pass:** a verifiable dated evidence archive; page/query/delta report; Bing AI Performance report where available; platform-level AI observations (no made-up counts).

## Sign-off matrix
- **Engineering Lead:** deployment commit ID, redirect tests, sitemap crawler CSV, JSON-LD validation, app error-free routes.
- **Medical/Quality:** approved review notes, specimen/sample and TAT, accredited performing lab scope mapping.
- **Finance:** tariff version, effective window, home collection fees, price comparison evidence.
- **Operations:** physical centres and service regions, hours, scheduling, phlebotomist coverage.
- **Marketing/Analytics:** connected GSC/GA4/Bing accounts, consent and event validation, 28-day and AI weekly baseline.

## Halt condition
Do not launch new mass-generated locality/test pages while P0 defects remain. Publishing extra URLs will not resolve wrong canonicals, broken package pages, unsupported clinical statements, or unknown booking fees.
