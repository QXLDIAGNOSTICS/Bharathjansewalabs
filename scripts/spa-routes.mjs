// Client-rendered (SPA) routes that should be indexable as their own URLs.
// Used by vite.config.js (writes dist/<path>/index.html with route-specific
// title, description and canonical) and scripts/generate-sitemaps.mjs.
export const SITE_URL = 'https://bharathjansewalabs.com';

export const SPA_ROUTES = [
  {
    path: 'packages',
    title: 'Health Checkup Packages in Bengaluru | Bharath Jan Sewa Labs',
    description: 'Compare Chirayu full body checkup packages with transparent prices and free home sample collection across Bengaluru.',
    priority: '0.9',
    changefreq: 'weekly',
  },
  {
    path: 'quality',
    title: 'Quality Standards & Partner Laboratories | Bharath Jan Sewa Labs',
    description: 'Bharath Jan Sewa Labs collaborates with NABL-accredited medical testing laboratories. How samples are collected, transported and processed, and how to request performing-laboratory details.',
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: 'affordable-testing-assistance',
    title: 'Affordable Testing Assistance | Bharath Jan Sewa Labs',
    description: 'Ways to access essential blood tests at lower cost in Bengaluru, with transparent prices and help choosing the right test.',
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: 'about',
    title: 'About Bharath Jan Sewa Labs | Affordable Diagnostics in Bengaluru',
    description: 'Bharath Jan Sewa Labs runs affordable blood test collection centres and home sample collection across Bengaluru, with testing through collaboration with NABL-accredited medical laboratories.',
    priority: '0.7',
    changefreq: 'monthly',
  },
  {
    path: 'doctors',
    title: 'For Doctors & Clinics | Bharath Jan Sewa Labs',
    description: 'Diagnostic sample collection and reporting support for general practitioners, clinics and nursing homes in Bengaluru.',
    priority: '0.6',
    changefreq: 'monthly',
  },
  {
    path: 'franchise',
    title: 'Open a Collection Centre Franchise | Bharath Jan Sewa Labs',
    description: 'Partner with Bharath Jan Sewa Labs to open a diagnostic sample collection centre in your locality.',
    priority: '0.5',
    changefreq: 'monthly',
  },
  {
    path: 'legal',
    title: 'Legal, Privacy & Terms | Bharath Jan Sewa Labs',
    description: 'Privacy policy, terms of service, pricing and medical disclaimers for Bharath Jan Sewa Labs.',
    priority: '0.3',
    changefreq: 'yearly',
  },
];
