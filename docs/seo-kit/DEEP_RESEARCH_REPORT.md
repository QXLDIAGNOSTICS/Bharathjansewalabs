# BJSL — Deep Research Audit and Search/AI Growth Blueprint
**Date:** 20 November 2026 (India/Bengaluru)
**Public site checked:** https://bharathjansewalabs.com and https://www.bharathjansewalabs.com
**Measurement status:** Publicly accessible technical and competitor evidence verified. First-party BJSL Search Console, GA4, live AI-answer and Maps-grid measurements NOT accessible. They must not be invented.

## Executive findings
1. **Technical:** Sitemap infrastructure exists (main 20 URLs, 67 test URLs incl. tests index, 26 locality URLs incl. locality index); robots file is accessible. Therefore the priority is *correct indexing signals and accurate content*, not adding more bulk pages.
2. **P0 broken commercial page:** `/packages/` shows "Something went wrong" in rendered inspection.
3. **P0 canonical errors:** `/quality/` and `/affordable-testing-assistance/` declare homepage as canonical, risking suppression as independent entities.
4. **P0 quality risk:** Homepage contains invalid/unsupported "ICMR accredited" alongside NABL references; quality page cites MC-2849 and MC-3104. Confirm identity, validity and actual laboratory scope before publication; do not transfer NABL accreditation automatically to collection locations.
5. **P0 price-data trust:** CBC with ESR headline price ₹160 and FBS ₹20 are publicly advertised as leaflet prices subject to confirmation. Reference/strike-through prices vary across homepage vs catalogue (e.g. CBC ₹400, ₹410, ₹450; HbA1c ₹650, ₹720; lipid ₹600, ₹750). Suppress unsupported discount claims and disclose genuine checkout total including collection fees.
6. **P1 content:** The site's 66 existing test URLs should be medically strengthened; repeated generic FAQ volume is not a substitute for original, useful explanations. Prioritize blood glucose, CBC+ESR, TSH, HbA1c, creatinine, urine, lipid and LFT.
7. **P1 location:** Verify actual physical centres, local phone and hours; do not treat every door-to-door collection service area as a separate physical laboratory or Google Business Profile.
8. **P1 visibility data:** No BJSL GSC/GA4 account was connected in the OpenSEO workspace as of the check. Thus actual 28-day clicks, impressions, position changes and organic leads cannot be quantified. AI baseline currently has NO_OBSERVATIONS. This does not mean BJSL has zero traffic or citations.

## Competitive public search presence
The following competitor pages were found in public retrieval (this is not a controlled Google rank list):
- Tata 1mg: https://tata1mglabs.com/diagnostic-centre-in-bangalore/ — appointment and home collection.
- Orange Health: https://www.orangehealth.in/lab-test-bangalore — Bengaluru-focused tests and collection; site also exposes laboratory accreditation material.
- PharmEasy: https://labfare.in/labs/pharmeasy — externally tracked test price listings.
- Nihashri: https://www.nihashriclinic.com/ — neighbourhood diagnostic brand and detailed tests.
- LabFare: https://labfare.in/bangalore — date-stamped comparison across seven listed providers.
- Redcliffe: https://redcliffelabs.com/bangalore/tests/cbc-test — dedicated city test page.
- Max Lab: https://www.maxlab.co.in/lab-test/profile/bengaluru/complete-blood-count-cbc-test — test-specific Bengaluru page.

The differentiator BJSL can substantiate is *accurate, transparent low selling prices + verified quality + near-home collection + confirmed bookability*. Avoid 'cheapest in India' unless same constituents, service mode, fees, verification date and geographic coverage have been independently compared.

## Four-search-engine plan
**Google:** Keep current canonical (non-www) unless authorised to migrate; complete self-canonicals, fix 404/errors, submit clean sitemaps, add medically approved `MedicalTest` + `Service`/`Offer` and verified local entity data. Use GSC Search Performance and separate generative AI report.
**Bing:** Submit site to Bing Webmaster and sitemaps, use IndexNow only for actually changed published canonical URLs. Monitor Bing Search Performance and AI Performance for supported AI citations.
**Yahoo:** Bing provides Yahoo's conventional organic ranking infrastructure; measure Yahoo referrals separately rather than assuming Bing position equals Yahoo position.
**DuckDuckGo:** Web links are sourced largely from Bing but also DDG's own crawler/sources. Improve Bing indexing and check DuckDuckBot permissions; track DDG organic referrals and controlled query samples.

## Eight AI-assistant plan
**ChatGPT Search:** Allow OAI-SearchBot, verify actual CDN access; publish short factual answers, transparent price/fee conditions, official lab/cert references and booking steps. GPTBot is training crawler, not same as SearchBot.
**Gemini:** Strong Google Search and verified entity/GBP data; test grounded chat answers; direct Gemini citations are not necessarily GSC search clicks.
**Microsoft Copilot:** Bing index and Bing AI Performance + stable prompt samples; Bing citation reporting may cover some Copilot grounding surfaces.
**Perplexity:** PerplexityBot access and short sourceable factual passages; record cited BJSL URLs in repeatable responses.
**Claude:** Claude-SearchBot access; source citations and web-search mode matter. ClaudeBot training crawler is separate.
**Grok:** Verify active web search mode and output citations; align accurate company/centre identity across public sites and social presence. No invented proprietary ranking checklist.
**Meta AI:** Test active region/platform retrieval; improve authentic sources/entity information, not generated keyword spam.
**DeepSeek:** Web retrieval is deployment/product-dependent; when no browsing is available, record the result as not a live-web observation rather than a failed ranking.

## Verified data / measurements to collect
### Search Console
Current 28 complete days as of 20 Nov: **21 October–17 November 2026**. Previous: **23 September–20 October 2026**. Segment India, mobile/desktop, query, landing page and query+page. Track impressions, clicks, CTR and average position. Candidate striking-distance priority queries: non-branded positions 4–10 and 11–20 with significant impressions. GSC suppresses some rare/anonymised searches and average position is not a fixed rank at each centre.

### GA4
Organic sessions, engaged sessions, booking attempts, verified confirmed bookings, paid transactions and revenue; strictly separate enquiry/lead from paid purchase. Separate AI referrer sources as observable traffic, not all AI recommendations. Never send patient details, medical tests/diagnoses, results, phone or report IDs to advertising analytics.

### AI citation evidence
Freeze 12 neutral + 3 branded prompts (`data/ai_prompts.csv`) in the kit. Record exact prompt, platform, country and mode, timestamp, completed/no-answer/failed status, BJSL mention yes/no, owned site URL cited yes/no, competitor mentions and the source URL/screenshot. Compute mention/citation rate only over answered neutral prompts. Compare only matched prompt×platform×country cells. No observation is **unknown**, not 0%.

### Paid tracker estimate
OpenSEO cost estimate for 14 fixed prompts × 6 engines × India on 20 Nov: **US$4.298 for one immediate check** or **US$4.074 per weekly run (~US$16.296 for four/month)**. No paid tracker was activated. Approval required before spending. The workspace project was created at: https://app.openseo.so/p/4a40dbb5-fa9c-4ca7-bad5-1b1f3e99b8c1

## Practical first 30 days
- **Day 1–3:** Fix package route, invalid claims, wrong canonicals, obvious sitemap 404s.
- **Day 4–7:** Finance/medical test data signoff, verified lab scopes, verified real centre pages and accurate fee/TAT policies.
- **Day 8–14:** Merge internal links, schema and approved price widgets into existing pages, improve mobile speed and checkout/enquiry clarity.
- **Day 15–21:** Connect Search Console, GA4 and Bing. Publish a verified organic and AI baseline; remove blind optimisation goals.
- **Day 22–30:** Refine titles/content only for nonbranded GSC queries with impressions and rank potential, encourage authentic reviews, verify GBP location data, monitor baseline and bookings.

## Developer deliverables
See `BJSL_Search_AI_Visibility_Deep_Research_Developer_Kit_20Nov2026.zip` for source and scripts. The application patch is additive and should be merged into the live Vercel/GitHub repository after branch QA. It includes:
- `scripts/site_audit.py` full sitemap crawl/canonical error report.
- `scripts/gsc_baseline.py` genuine 28-day GSC compare by query/page/query-page/device/date.
- `scripts/ga4_baseline.py` organic landing pages and conversion counts.
- `scripts/ga4_ai_referrals.py` AI-sourced sessions visible to GA4.
- `scripts/ai_citation_report.py` AI evidence aggregation with honest denominators.
- `scripts/indexnow_changed_urls.py` optional Bing/IndexNow for updated canonical URLs.
- Safe, approved data-bound schema helpers and React components under `src/`.
- Source-verified keyword map, 8 clinical-content *drafts requiring approval*, Maps grid template and release checklists.
- `.github/workflows/seo_weekly.yml` weekly reports once connected in actual GitHub; no paid AI collection.

## Official and research sources
- Google generative AI guide: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Google AI performance announcement: https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports
- Google canonicalisation: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Search Console: https://search.google.com/search-console
- Google LocalBusiness: https://developers.google.com/search/docs/appearance/structured-data/local-business
- Bing AI Performance: https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c
- Bing IndexNow: https://www.bing.com/webmasters/help/indexnow-0z209wby
- DuckDuckGo sources: https://duckduckgo.com/duckduckgo-help-pages/results/sources
- Yahoo organic search algorithm: https://en-maktoob.help.yahoo.com/kb/SLN35619.html
- OpenAI crawler information: https://platform.openai.com/docs/bots
- Anthropic crawler information: https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler
- Comparable Bengaluru prices: https://labfare.in/bangalore
- BJSL live: https://bharathjansewalabs.com/tests/ ; https://bharathjansewalabs.com/quality/ ; https://bharathjansewalabs.com/packages/ .
