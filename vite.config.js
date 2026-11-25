import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { SITE_URL, SPA_ROUTES } from './scripts/spa-routes.mjs';

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// Writes dist/<route>/index.html for each SPA route so every indexable URL has
// its own <title>, description, canonical and og:url instead of inheriting the
// homepage canonical. Vercel serves these files before the SPA rewrite.
const spaRouteHtml = {
  name: 'spa-route-html',
  apply: 'build',
  closeBundle() {
    const dist = path.join(process.cwd(), 'dist');
    const base = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
    for (const r of SPA_ROUTES) {
      const url = `${SITE_URL}/${r.path}/`;
      const title = escapeAttr(r.title);
      const desc = escapeAttr(r.description);
      const html = base
        .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
        .replace(/(<meta name="title" content=")[^"]*"/, `$1${title}"`)
        .replace(/(<meta name="description" content=")[^"]*"/, `$1${desc}"`)
        .replace(/(<link rel="canonical" href=")[^"]*"/, `$1${url}"`)
        .replace(/(<meta property="og:url" content=")[^"]*"/, `$1${url}"`)
        .replace(/(<meta property="og:title" content=")[^"]*"/, `$1${title}"`)
        .replace(/(<meta property="og:description" content=")[^"]*"/, `$1${desc}"`)
        .replace(/(<meta name="twitter:title" content=")[^"]*"/, `$1${title}"`)
        .replace(/(<meta name="twitter:description" content=")[^"]*"/, `$1${desc}"`)
        .replace(/<main data-prerender="true"><h1>[\s\S]*?<\/h1><p>[\s\S]*?<\/p>/, `<main data-prerender="true"><h1>${escapeAttr(r.title.split(' | ')[0])}</h1><p>${desc} Diagnostic testing through collaboration with NABL-accredited medical laboratories.</p>`);
      const dir = path.join(dist, r.path);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, 'index.html'), html);
    }
  },
};

export default defineConfig({
  plugins: [
    react(),
    spaRouteHtml,
    {
      name: 'serve-static-html',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && (req.url.startsWith('/tests') || req.url.startsWith('/locations') || req.url.startsWith('/our-centres') || req.url.startsWith('/blog'))) {
            const urlPath = req.url.split('?')[0];
            let filePath = path.join(process.cwd(), 'public', urlPath);
            if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
              filePath = path.join(filePath, 'index.html');
            }
            if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
              const content = fs.readFileSync(filePath);
              const ext = path.extname(filePath);
              const contentType = ext === '.css' ? 'text/css' : ext === '.js' ? 'application/javascript' : 'text/html';
              res.setHeader('Content-Type', contentType);
              res.end(content);
              return;
            }
          }
          next();
        });
      }
    }
  ],
  server: {
    port: 4000,
    host: true
  }
});
