# Bharath Jan Sewa Labs — 66 SEO landing pages + 1,056 FAQs

**Target website:** https://bharathjansewalabs.com/  
**Price source:** Promotional price-list image provided in the chat (not a current independently verified rate card).  
**Build type:** Pre-rendered static HTML + CSS. No JavaScript framework, API key or Python needed on your hosting server. The optional generator (`generate_pages.py`) needs only Python 3 if prices or content change.

## Files delivered

- `site/tests/index.html` — search-enabled, publicly crawlable directory of 66 individual tests with prices.
- `site/tests/assets/site.css` — responsive page styling, consistent with the poster's red and white branding.
- `site/tests/{test-slug}/index.html` — **66 separate unique pages**, one per test.
- On every test page: ₹ offer price, leaflet comparison rate, specimen, fasting/preparation, medical limitations, **16 visible FAQs with shareable deep links** (`#faq-01` to `#faq-16`), related test links, telephone and WhatsApp bookings.
- `site/sitemap-tests.xml` — 67 URLs (the directory and 66 test pages).
- `TEST_LINKS_AND_PRICES.csv` — all 66 individual canonical URLs, offer prices, and WhatsApp links.
- `ALL_1056_FAQS.csv` — exactly 1,056 questions and answers, plus individual anchor URLs.
- `INTERNAL_LINKS_FOR_DEVELOPER.html` — paste these links into appropriate site areas.
- `test_catalog.psv` — single source of truth, 66 prices + medically relevant test content; regenerate after editing.
- `robots_append.txt` — sitemap statement to append to (not replace) the existing robots.txt.

## Implementation: standard WordPress / Apache / cPanel hosting

1. Take a backup and verify the domain's document root. If `/tests/` already exists, **do not overwrite it blindly**; merge routes first.
2. Upload the **whole `site/tests` folder** into the live website document root, normally `public_html/tests/`. The public URL should become `https://bharathjansewalabs.com/tests/`.
3. Upload `site/sitemap-tests.xml` to the document root. The sitemap must be accessible at `https://bharathjansewalabs.com/sitemap-tests.xml`.
4. Add `Sitemap: https://bharathjansewalabs.com/sitemap-tests.xml` to the existing robots.txt. Keep the existing sitemap and robots rules; do not overwrite them.
5. Add `Tests & Prices` menu/footer links to `/tests/`. Add a visible homepage section with at least 10 high-demand tests using the markup in `INTERNAL_LINKS_FOR_DEVELOPER.html`.
6. Update Google Search Console Sitemaps with `sitemap-tests.xml`; test URL Inspection, canonical and robots for 3 priority pages (HbA1c, glucose, CBC). Submit to Bing Webmaster Tools as well.
7. Test 66 direct links, click-to-call, WhatsApp, mobile, browser back navigation, FAQ deep links, and centre navigation. Clear any server cache.
8. If Apache/WordPress routing hides physical `index.html` files, ask hosting support for directory index configuration (`DirectoryIndex index.html`) and add a *targeted rewrite* for `/tests/`, not a broad rewrite that breaks WordPress.

## Implementation: Next.js App Router / Vercel

If the existing site uses Next.js, do **not** place `site/` directly under the `app/` directory. Instead:

1. Copy `site/tests/` into `public/tests/` and copy `site/sitemap-tests.xml` to `public/sitemap-tests.xml`.
2. Provide clean-URL rewrites in the project's existing `next.config.mjs`/`next.config.js`, merging with existing configuration:

```js
// Example only: merge these entries into the project's *existing* next config.
async rewrites() {
  return [
    { source: '/tests', destination: '/tests/index.html' },
    { source: '/tests/:slug', destination: '/tests/:slug/index.html' }
  ];
}
```

3. Check your `trailingSlash` configuration; some Next versions redirect slash URLs to non-slash URLs. **Canonical URLs must match the final 200 URL.** If your config removes slashes, update `BASE` canonical assembly in `generate_pages.py` and regenerate, or adjust the route config accordingly. Do not deploy duplicate canonical routes.
4. Test on preview first. If a route collides with an existing application route or framework handling makes rewrites unreliable, implement App Router pages with server-rendered data instead of deploying duplicate static routes.

For a purely static Vercel deployment, publish `site/` as output root and configure clean URL handling (e.g. `cleanUrls` and/or explicit rewrites). Verify production `/tests/hba1c-test/` returns HTTP 200 and source HTML, rather than relying on framework assumptions.

## Publishing controls — mandatory before going live

- **Confirm all 66 poster prices**, date ranges, taxes and any promotional conditions. Several entries are not 50–70% cheaper: do not apply a blanket percentage discount claim to every page.
- The leaflet's **"market price" is a supplied promotional comparison**, not verified city-wide data. Retain transparent wording or remove it unless your lab can substantiate the comparator and evidence.
- Verify that the same ₹20 glucose offer is applicable to each of fasting/PP/random as intended; confirm whether only **one** timed specimen is included.
- Confirm actual assay variants, sample type, included analytes, specimen handling, test availability and any differential centre/home-collection fees.
- **Medical safety check by a qualified laboratory physician:** all 66 descriptions and 1,056 answers should be reviewed, with an actual named reviewer and date on each live page only after approval. Do not fabricate a byline, accreditation certificate, results time, patient statistics or centre coverage.
- Verify the performing laboratory's **current NABL scope for each particular examination**. The company's site says testing is processed at NABL-accredited laboratories; this does not imply every individual centre or every test is accredited.
- Review privacy, consent and secure collection of patient information before replacing WhatsApp enquiry with an on-page form/payment flow. HIV and VDRL enquiry messages intentionally do not include the sensitive test name.
- For **troponin I, D-dimer and severe illness**, confirm urgent referral messaging and do not market home sample collection as a replacement for emergency care.
- Confirm the collection-centre list and reconcile any mismatched hours/addresses on the existing site's directory page.

## Structured data / SEO

All pages are server-readable HTML, with `<title>`, meta description, canonical URL, internal links and JSON-LD (`WebPage`, `MedicalTest`, `Service` + `Offer`, `BreadcrumbList`, `FAQPage`). Offer prices match visible leaflet prices. Avoid marking unverified inventory availability or star ratings.

**Important 2026 Google change:** FAQ rich results have been discontinued. These 16 FAQs still help patients and support semantic clarity; FAQPage markup is *not* a shortcut to a Google FAQ snippet. Google states no special schema or `llms.txt` is required to appear in AI Overviews/AI Mode, and visibility in Google, ChatGPT, Gemini, Claude or Perplexity cannot be guaranteed.

**Google Discover:** test-price pages are mainly transactional Search targets, not strong Discover stories. Publish genuinely helpful, medically reviewed, illustrated health education articles to support Discover: use original relevant 1200px+ wide images (not text-heavy posters), compelling factual headings and `max-image-preview:large`; link them contextually to the relevant test pages.

## Suggested analytics / growth QA

- Track: `test_page_view`, `test_search`, `test_whatsapp_click`, `test_call_click`, `faq_expand`, and successful confirmed bookings (with consent/privacy safeguards).
- Segments: search query (HbA1c test price in Bangalore, CBC test cost, TSH blood test near me), landing test URL, location, device and enquiry→confirmed booking conversion.
- Monitor Google Search Console weekly for impressions, clicks, CTR, index coverage, duplicate page warnings, and crawl errors. Only expand pages when you have real unique clinical or patient information.
- Homepage, `/tests/`, actual Bengaluru centre details and selected specialist articles should link back and forth. Do not auto-generate thin pseudo-local pages for hundreds of unserved localities.

## Regeneration

Edit the price and metadata rows in `test_catalog.psv`, then run:

```bash
python3 generate_pages.py
```

The generator overwrites the pages, links CSV, FAQ CSV, and sitemap. It validates **66 unique slugs** and exactly **16 FAQs per page**.

## Clinical and SEO reference docs

- https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- https://developers.google.com/search/docs/appearance/google-discover
- https://developers.google.com/search/updates

This package is generated code, **not yet published on the user's website**. Production publishing requires developer/website owner access.
