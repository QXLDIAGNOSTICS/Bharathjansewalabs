#!/usr/bin/env node
// Regenerates public/sitemap.xml and public/sitemap-locations.xml from pages
// that actually exist (static files under public/ plus SPA_ROUTES), so the
// sitemap never lists URLs that 404 or canonicalise elsewhere.
// Run after the page generators:  node scripts/generate-sitemaps.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SITE_URL, SPA_ROUTES } from './spa-routes.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pub = path.join(root, 'public');
const today = new Date().toISOString().slice(0, 10);

const subdirs = (dir) =>
  fs.existsSync(dir)
    ? fs.readdirSync(dir, { withFileTypes: true })
        .filter((d) => d.isDirectory() && fs.existsSync(path.join(dir, d.name, 'index.html')))
        .map((d) => d.name)
        .sort()
    : [];

// Use the page's own dateModified/article:modified_time when present.
function lastmodFor(file) {
  if (!file || !fs.existsSync(file)) return today;
  const html = fs.readFileSync(file, 'utf8');
  const m = html.match(/"dateModified"\s*:\s*"(\d{4}-\d{2}-\d{2})/) ||
            html.match(/article:modified_time"\s+content="(\d{4}-\d{2}-\d{2})/);
  return m ? m[1] : today;
}

const entry = (loc, file, changefreq, priority) =>
  `  <url>\n    <loc>${SITE_URL}${loc}</loc>\n    <lastmod>${lastmodFor(file)}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;

const wrap = (items) =>
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items.join('\n')}\n</urlset>\n`;

// Main sitemap
const main = [
  entry('/', null, 'daily', '1.0'),
  entry('/tests/', path.join(pub, 'tests/index.html'), 'daily', '0.95'),
  entry('/our-centres/', path.join(pub, 'our-centres/index.html'), 'weekly', '0.95'),
  entry('/locations/', path.join(pub, 'locations/index.html'), 'weekly', '0.9'),
  entry('/blog/', path.join(pub, 'blog/index.html'), 'daily', '0.95'),
  ...subdirs(path.join(pub, 'blog')).map((s) =>
    entry(`/blog/${s}/`, path.join(pub, 'blog', s, 'index.html'), 'monthly', '0.85')),
  ...SPA_ROUTES.map((r) => entry(`/${r.path}/`, null, r.changefreq, r.priority)),
];
fs.writeFileSync(path.join(pub, 'sitemap.xml'), wrap(main));

// Locations sitemap
const locs = [
  entry('/locations/', path.join(pub, 'locations/index.html'), 'weekly', '0.9'),
  ...subdirs(path.join(pub, 'locations')).map((s) =>
    entry(`/locations/${s}/`, path.join(pub, 'locations', s, 'index.html'), 'weekly', '0.8')),
];
fs.writeFileSync(path.join(pub, 'sitemap-locations.xml'), wrap(locs));

console.log(`sitemap.xml: ${main.length} URLs, sitemap-locations.xml: ${locs.length} URLs`);
