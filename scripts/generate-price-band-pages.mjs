#!/usr/bin/env node
// Generates dedicated, crawlable price-band pages (e.g. /tests-under-100/)
// from src/data/testDirectory.json — the same data the homepage price slider
// uses. Each page is a genuinely filtered list of real test pages, not
// repeated keyword copy.  Run:  node scripts/generate-price-band-pages.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SITE_URL } from './spa-routes.mjs';
import { PRICE_BANDS } from '../src/data/priceBands.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const tests = JSON.parse(fs.readFileSync(path.join(root, 'src/data/testDirectory.json'), 'utf8'));
const today = new Date().toISOString().slice(0, 10);

const h = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const inr = (n) => `₹${n.toLocaleString('en-IN')}`;
const ACCREDITATION = 'Diagnostic testing through collaboration with NABL-accredited medical laboratories.';

for (const band of PRICE_BANDS) {
  const list = tests
    .filter((t) => t.price >= band.pageMin && t.price <= band.pageMax)
    .sort((a, b) => a.price - b.price || a.name.localeCompare(b.name));
  const url = `${SITE_URL}/${band.slug}/`;
  const title = `${band.pageTitle} in Bengaluru (${list.length} Tests) | Bharath Jan Sewa Labs`;
  const desc = `${list.length} blood tests ${band.pageLabel.toLowerCase()} at Bharath Jan Sewa Labs, Bengaluru — from ${inr(list[0].price)} (${list[0].name}). Published prices, preparation and sample details for each test.`;

  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'CollectionPage', name: band.pageTitle, url, description: desc, dateModified: today,
        isPartOf: { '@id': `${SITE_URL}/#website` }, about: { '@id': `${SITE_URL}/#organization` } },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Tests & prices', item: `${SITE_URL}/tests/` },
        { '@type': 'ListItem', position: 3, name: band.pageTitle, item: url } ] },
      { '@type': 'ItemList', numberOfItems: list.length, itemListElement: list.map((t, i) => ({
        '@type': 'ListItem', position: i + 1, name: t.name, url: `${SITE_URL}/tests/${t.slug}/` })) },
    ],
  };

  const cards = list.map((t) => `<article class="catalogcard"><span class="tag">${h(t.category)}</span><h2><a href="/tests/${h(t.slug)}/">${h(t.name)}</a></h2><p class="small">${h(t.summary)}</p><div class="catalogfoot"><div><strong>${inr(t.price)}</strong></div><a href="/tests/${h(t.slug)}/" aria-label="Price, preparation and FAQs for ${h(t.name)}">Details →</a></div></article>`).join('');

  const otherBands = PRICE_BANDS.map((b) => b.slug === band.slug
    ? `<strong>${h(b.pageTitle)}</strong>`
    : `<a href="/${b.slug}/">${h(b.pageTitle)}</a>`).join(' · ');

  const html = `<!doctype html><html lang="en-IN"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<meta name="robots" content="index,follow,max-image-preview:large"/>
<title>${h(title)}</title><meta name="description" content="${h(desc)}"/>
<link rel="canonical" href="${url}"/><meta property="og:type" content="website"/>
<meta property="og:title" content="${h(title)}"/><meta property="og:description" content="${h(desc)}"/>
<meta property="og:url" content="${url}"/><meta property="og:site_name" content="Bharath Jan Sewa Labs"/><meta name="theme-color" content="#bb1827"/>
<meta property="article:modified_time" content="${today}"/>
<link rel="stylesheet" href="/tests/assets/site.css"/><script type="application/ld+json">${JSON.stringify(jsonld)}</script></head><body>
<a class="skip" href="#main">Skip to content</a>
<header class="sitehead"><div class="wrap nav"><a class="brand" href="/" aria-label="Bharath Jan Sewa Labs home"><span class="drop">●</span><span><strong>BHARATH JAN SEWA LABS</strong><small>Affordable • Accessible • Accurate</small></span></a><nav aria-label="Main navigation"><a href="/tests/">Test prices</a><a href="/our-centres/">Our centres</a><a href="tel:+919805543143">+91 98055 43143</a></nav></div></header>
<main id="main" class="wrap"><div class="crumb"><a href="/">Home</a> / <a href="/tests/">Tests &amp; prices</a> / ${h(band.pageTitle)}</div>
<section class="hero dirhero"><span class="eyebrow">${h(band.eyebrow)}</span><h1>${h(band.pageTitle)} in Bengaluru</h1>
<p class="lead">${h(band.intro)} ${list.length} tests are currently listed ${h(band.pageLabel.toLowerCase())}, starting at ${inr(list[0].price)}.</p>
<p class="small">Published BJSL test prices. Any home collection charge is shown separately before you confirm. ${ACCREDITATION} Accreditation applies to the performing laboratory and the tests within its approved scope.</p></section>
<div class="catalogmeta"><strong>${list.length} tests ${h(band.pageLabel.toLowerCase())}</strong><a class="btn ghost" href="https://wa.me/919805543143?text=${encodeURIComponent(`Hello Bharath Jan Sewa Labs, I would like to enquire about tests ${band.pageLabel.toLowerCase()}.`)}" target="_blank" rel="noopener noreferrer">Enquire on WhatsApp</a></div>
<section class="catalog" aria-label="${h(band.pageTitle)}">${cards}</section>
<section class="content"><h2>Browse by price</h2><p>${otherBands} · <a href="/tests/">All 66 tests</a></p></section></main>
<footer class="footer"><div class="wrap"><div class="footergrid"><div><strong>Bharath Jan Sewa Labs</strong><p>Affordable diagnostic services in Bengaluru.</p><p>Medical information is educational, not personal medical advice.</p></div><div><strong>Contact</strong><p><a href="tel:+919805543143">+91 98055 43143</a></p><p><a href="${SITE_URL}/our-centres/">Collection centres &amp; directions</a></p></div><div><strong>Quality</strong><p>${ACCREDITATION} <a href="/quality/">Quality &amp; partner laboratories</a></p></div></div><small>© Bharath Jan Sewa Labs. Prices require confirmation before booking.</small></div></footer></body></html>
`;
  const dir = path.join(root, 'public', band.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log(`${band.slug}: ${list.length} tests`);
}
