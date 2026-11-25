# First-party metrics: connection and weekly baseline SOP

## A. Google Search Console — first-party data
**Connected workspace project created:** https://app.openseo.so/p/4a40dbb5-fa9c-4ca7-bad5-1b1f3e99b8c1
**GSC connection page:** https://app.openseo.so/p/4a40dbb5-fa9c-4ca7-bad5-1b1f3e99b8c1/search-performance
**As of audit:** zero Google accounts connected to this BJSL OpenSEO project. Thus verified query clicks, impressions, CTR, ranks and AI feature traffic are **unknown**. Do not display 0 as an audit figure.

### Required one-time administrator actions
1. Verify the domain property `sc-domain:bharathjansewalabs.com` in GSC for the registered owner; if choosing non-www as canonical, do not delete the www property or history.
2. Grant a restricted read-only project service account to Search Console (domain property), or connect the site through OpenSEO's Google sign-in in the link above. Never share account passwords or API keys in chat or GitHub.
3. Ensure that GA4 is installed on the live domain and link the exact BJSL GA4 property to the dedicated OpenSEO project; other companies' metrics must not be mixed in.
4. Inspect URL statuses of `/`, `/tests/`, the 8 priority test pages, `/quality/`, `/our-centres/`, `/packages/`, the published affordability blog, and verified centre pages. Record Google-selected canonical, index state, last crawl and any excluded reason.
5. Use GSC Performance for **latest complete 28 days** versus previous 28; exclude 3 recent incomplete days. Segment Country=India, Device=Mobile/Desktop, queries, pages, and query-page. Look separately at branded/nonbranded and positions 4–10 / 11–20 with meaningful impressions.
6. Review the **Search Generative AI performance** report and the Google Search **generative AI inclusion setting** in GSC when available; record totals and queries as shown in UI, without assuming the normal Search Analytics API exposes the AI-specific dimension.

### Initial date windows on 20 Nov 2026
- Current complete: **21 Oct–17 Nov 2026** (28 days inclusive)
- Previous complete: **23 Sep–20 Oct 2026** (28 days inclusive)
- Google Search Console may apply platform-local dates and later data revisions; scripts use a consistent safe cutoff.

### KPI formulas
- CTR = clicks / impressions × 100.
- Average position = Search Console's *impression-weighted average* for the selected dimension. Not a geographically fixed Google rank.
- Organic conversion rate = consented confirmed bookings from Organic Search / organic sessions, with clearly disclosed attribution method.
- Revenue per organic session = paid value attributed to Organic Search / organic sessions; exclude unpaid, refunded and cancelled transactions as appropriate.
- Ranking opportunity = nonbranded GSC queries with impressions and average positions 4–20; optimize already-indexed correct landing pages before adding new URLs.

## B. Bing Webmaster & Yahoo/DDG
- Verify the same site with https://www.bing.com/webmasters/; submit the non-www sitemaps.
- Use IndexNow for changed URLs only, AFTER verifying its key file at the canonical host. Google does not use IndexNow.
- Review Bing Search Performance and AI Performance reports where available. They concern Bing ecosystem citations; not every Copilot answer.
- Yahoo conventional organic results are Bing-powered in official help documents, and DuckDuckGo largely uses Bing along with its own sources. Measure actual Yahoo/DDG organic referrals separately where GA4 correctly attributes them.

## C. AI monitoring baseline (repeatable and vendor-neutral)
- Use the 15 frozen prompts in `data/ai_prompts.csv`. 12 neutral diagnostic prompts count toward discoverability; 3 branded prompts assess factual accuracy, NOT discovery share.
- Engines: ChatGPT Search, Gemini grounded/web mode, Google AI Overviews, Google AI Mode, Microsoft Copilot, Perplexity, Claude web search, Grok web search, Meta AI, DeepSeek only where that product has live retrieval.
- Standardize India/Bengaluru; stable logged-in/anonymous status, language English and date. No patient personal data in prompts.
- Per observation collect: timestamp UTC, exact prompt id, engine, mode/variant, answer/no_answer/failed, BJSL mentioned (yes/no), owned website URL cited (yes/no), competitor names, exact citation URLs, and archived evidence URL or screenshot filename.
- Run the same prompt-engine-market cells weekly (even after no-answer). Exclude failed/no_answer from denominators. Report sample size. Trends require matched cells, same market and enough coverage.
- Do NOT claim a public query sample proves actual user-level recommendation share, automated rankings, or how often people ask a question.
- `scripts/ai_citation_report.py` reads reviewed rows from `data/ai_observations.csv` and outputs a baseline; an empty file reports NO_OBSERVATIONS, as intended.

### Optional paid OpenSEO AI tracking cost estimate — no charge authorised
A 14-prompt × 6-engine (ChatGPT, Gemini, Google AI Overviews, Google AI Mode, Perplexity, Claude) India pilot was quoted on 20 Nov 2026 at approximately **US$4.298 per immediate manual run** and **US$4.074 per scheduled weekly run** (~US$16.296 for four checks/month), before any later provider price changes. This is a **cost estimate, not a run**. User approval is necessary before saving an auto-billed schedule or collecting paid answers.
- AI tracker page: https://app.openseo.so/p/4a40dbb5-fa9c-4ca7-bad5-1b1f3e99b8c1/ai-visibility
- Rank tracker page: https://app.openseo.so/p/4a40dbb5-fa9c-4ca7-bad5-1b1f3e99b8c1/rank-tracking
- Other engines (Copilot, Grok, Meta, DeepSeek) remain manual or must be separately approved with documented compliant access methods; do not impersonate API access.

## D. GA4 and conversion reporting
- Configure `view_item` only for consented public page analytics and generic service category (not individual test name / medical facts).
- `begin_checkout` only when an actual checkout is opened, not when a user opens a WhatsApp enquiry link.
- `generate_lead` on validated interest/confirmed pay-on-collection booking, deduplicated.
- `purchase` only after payment success is verified on the server; set INR, validated value and non-medical transaction ID.
- Add key events for `booking_confirmed` and `payment_received` in GA4 where appropriate; ensure no patient identifiers or medical information sent to ad-tech.
- Cross-check front-end events against actual CRM receipts and booking statuses. Internal transfers do not count as lab revenue.
