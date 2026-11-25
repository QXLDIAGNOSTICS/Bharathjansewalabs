/** REFERENCE ONLY: merge rules into existing public robots.txt; do not replace production if unchanged. */
import type { MetadataRoute } from 'next';
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: '*', allow: '/',
    disallow: ['/api/', '/admin/', '/checkout/', '/patient/', '/reports/'] }],
    sitemap: [
      'https://bharathjansewalabs.com/sitemap.xml',
      'https://bharathjansewalabs.com/sitemap-tests.xml',
      'https://bharathjansewalabs.com/sitemap-locations.xml'
    ] };
}
