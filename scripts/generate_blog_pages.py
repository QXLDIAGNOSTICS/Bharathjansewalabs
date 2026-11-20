#!/usr/bin/env python3
"""
Generate Static SEO-Optimized Medical Blog Pages & Knowledge Hub Index for Bharath Jan Sewa Labs.
Supports crawlability for Googlebot, Bingbot, OAI-SearchBot, PerplexityBot, and Claude-SearchBot.
Includes BreadcrumbList, MedicalWebPage, BlogPosting, and FAQPage Schema.org structured data.
"""

import os
import re
import json
import urllib.parse

BASE_URL = "https://bharathjansewalabs.com"
DISPLAY_PHONE = "+91 98055 43143"
WHATSAPP_LINK = "https://wa.me/919805543143"

# Extract BLOG_POSTS from src/data/mockData.js
mock_data_path = os.path.join(os.path.dirname(__file__), "..", "src", "data", "mockData.js")
with open(mock_data_path, "r", encoding="utf-8") as f:
    mock_content = f.read()

# Parse the posts using regex
start_idx = mock_content.find("export const BLOG_POSTS = [")
end_idx = mock_content.find("export const SEO_METADATA =")
blog_raw = mock_content[start_idx:end_idx]

# Pattern for extracting each blog object, accounting for escaped quotes in categories
pattern = re.compile(
    r"id:\s*'([^']+)',\s*"
    r"slug:\s*'([^']+)',\s*"
    r"title:\s*'([^']+)',\s*"
    r"category:\s*'((?:\\\'|[^'])+)',\s*"
    r"author:\s*'([^']+)',\s*"
    r"date:\s*TODAY_FORMATTED,\s*"
    r"readTime:\s*'([^']+)',\s*"
    r"excerpt:\s*'([^']+)',\s*"
    r"content:\s*`([^`]+)`,\s*"
    r"image:\s*'([^']+)'",
    re.DOTALL
)

posts = []
for m in pattern.finditer(blog_raw):
    slug = m.group(2)
    # Publication date: 18 November 2026 for the new guide, 12 November 2026 for earlier articles
    pub_date_display = "18 November 2026" if slug == "affordable-blood-tests-india-delayed-diagnosis" else "12 November 2026"
    pub_date_iso = "2026-11-18" if slug == "affordable-blood-tests-india-delayed-diagnosis" else "2026-11-12"

    posts.append({
        "id": m.group(1),
        "slug": slug,
        "title": m.group(3),
        "category": m.group(4).replace("\\'", "'"),
        "author": m.group(5),
        "date": pub_date_display,
        "dateISO": pub_date_iso,
        "readTime": m.group(6),
        "excerpt": m.group(7),
        "content": m.group(8).strip(),
        "image": m.group(9)
    })

print(f"Loaded {len(posts)} blog posts from mockData.js")

out_dir = os.path.join(os.path.dirname(__file__), "..", "public", "blog")
os.makedirs(out_dir, exist_ok=True)

# Specific FAQs for the Affordable Blood Tests Guide
AFFORDABLE_TESTS_FAQS = [
    {
        "question": "Where can I find affordable blood tests in Bangalore?",
        "answer": "Bharath Jan Sewa Labs publishes an online catalogue of routine diagnostic test prices and lists collection locations across Bengaluru. Patients can review the catalogue and confirm current charges, test availability and collection arrangements before booking."
    },
    {
        "question": "How much does a blood sugar test cost at Bharath Jan Sewa Labs?",
        "answer": "BJSL's online promotional catalogue lists a blood glucose test at ₹20. This is an advertised leaflet price and must be reconfirmed, together with any collection charges, before booking."
    },
    {
        "question": "What is the price of a CBC blood test in Bengaluru?",
        "answer": "BJSL currently advertises a CBC with ESR at ₹160 in its promotional catalogue. Patients should confirm the exact investigation, included parameters and final payable price. CBC alone and CBC with ESR are not identical orders."
    },
    {
        "question": "Are low-cost blood tests reliable?",
        "answer": "Low cost does not automatically mean poor quality. Reliability depends on laboratory competence, validated methods, quality control, sample handling and medical oversight. Patients should check the performing laboratory and relevant accreditation information."
    },
    {
        "question": "Can delayed blood tests affect diagnosis and treatment?",
        "answer": "They can. When an investigation is clinically necessary, postponing it may delay information needed for diagnosis, monitoring or treatment decisions. However, not every medical condition requires immediate testing, and the appropriate timing should be determined by a healthcare professional."
    },
    {
        "question": "Does Bharath Jan Sewa Labs offer home blood sample collection?",
        "answer": "BJSL advertises home sample collection in specified Bengaluru service areas. Patients should confirm address eligibility, collection fees, availability and appointment timing directly before booking."
    },
    {
        "question": "What should I do if I cannot afford prescribed laboratory tests?",
        "answer": "Speak with your healthcare provider about medically necessary tests and lower-cost or government-supported diagnostic options. You can also enquire with BJSL about currently available economical services and the final payable amount."
    }
]

# Hero images (>=1200px wide, required for Google Discover large previews).
# Replace with original, topic-specific photography when available.
DEFAULT_HERO = ("/images/banners/precision_lab.jpg", 1376, 768, "Automated diagnostic laboratory analyser and microscope")
HERO_IMAGES = {
    "affordable-blood-tests-india-delayed-diagnosis": ("/images/banners/bridging-divide.webp", 1256, 960, "Phlebotomist collecting a blood sample from a patient"),
    "how-home-sample-collection-works": ("/images/banners/bridging-divide.webp", 1256, 960, "Phlebotomist collecting a blood sample from a patient"),
}

# Generate Individual Blog HTML Pages
for p in posts:
    hero_src, hero_w, hero_h, hero_alt = HERO_IMAGES.get(p["slug"], DEFAULT_HERO)
    hero_url = f"{BASE_URL}{hero_src}"
    post_dir = os.path.join(out_dir, p["slug"])
    os.makedirs(post_dir, exist_ok=True)
    post_file = os.path.join(post_dir, "index.html")
    
    canonical_url = f"{BASE_URL}/blog/{p['slug']}/"
    wa_msg = f"Namaste BJSL, I would like to book a blood test after reading your article: '{p['title']}' in Bengaluru."
    wa_url = f"{WHATSAPP_LINK}?text={urllib.parse.quote(wa_msg)}"

    # Schema Graph Construction
    graph_items = [
        {
            "@type": ["BlogPosting", "MedicalWebPage"],
            "@id": f"{canonical_url}#article",
            "isPartOf": {
                "@type": "WebSite",
                "@id": f"{BASE_URL}/#website",
                "name": "Bharath Jan Sewa Labs",
                "url": BASE_URL
            },
            "headline": p["title"],
            "description": p["excerpt"],
            "url": canonical_url,
            "mainEntityOfPage": canonical_url,
            "inLanguage": "en-IN",
            "image": {
                "@type": "ImageObject",
                "url": hero_url,
                "width": hero_w,
                "height": hero_h
            },
            "datePublished": f"{p['dateISO']}T09:00:00+05:30",
            "dateModified": f"{p['dateISO']}T09:00:00+05:30",
            "author": {
                "@type": "Person",
                "name": p["author"].split(",")[0],
                "jobTitle": p["author"],
                "description": (
                    "Dr Shantakumar Muruda is an MD in Biochemistry and certified NABL Lead Assessor. "
                    "NABL credentials reflect individual assessor qualifications and do not represent NABL endorsement of this article or BJSL."
                    if "Shantakumar" in p["author"] else
                    f"Consultant Medical Specialist at Bharath Jan Sewa Labs, {p['author']}."
                )
            },
            "publisher": {
                "@type": "MedicalOrganization",
                "@id": f"{BASE_URL}/#organization",
                "name": "Bharath Jan Sewa Labs",
                "url": BASE_URL,
                "logo": {
                    "@type": "ImageObject",
                    "url": f"{BASE_URL}/logo.webp"
                }
            },
            "about": {
                "@type": "MedicalCondition",
                "name": p["category"]
            }
        },
        {
            "@type": "BreadcrumbList",
            "@id": f"{canonical_url}#breadcrumb",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": f"{BASE_URL}/"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Health Guides",
                    "item": f"{BASE_URL}/blog/"
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": p["title"],
                    "item": canonical_url
                }
            ]
        }
    ]

    # Add FAQPage schema if this is the affordable diagnostics guide
    if p["slug"] == "affordable-blood-tests-india-delayed-diagnosis":
        faq_entities = []
        for faq in AFFORDABLE_TESTS_FAQS:
            faq_entities.append({
                "@type": "Question",
                "name": faq["question"],
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq["answer"]
                }
            })
        graph_items.append({
            "@type": "FAQPage",
            "@id": f"{canonical_url}#faq",
            "mainEntity": faq_entities
        })

    schema_json = json.dumps({
        "@context": "https://schema.org",
        "@graph": graph_items
    }, indent=2)

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{p['title']} | Bharath Jan Sewa Labs</title>
  <meta name="description" content="{p['excerpt']}" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
  <link rel="canonical" href="{canonical_url}" />
  
  <meta property="og:type" content="article" />
  <meta property="og:title" content="{p['title']} | Bharath Jan Sewa Labs" />
  <meta property="og:description" content="{p['excerpt']}" />
  <meta property="og:url" content="{canonical_url}" />
  <meta property="og:site_name" content="Bharath Jan Sewa Labs" />
  <meta property="og:locale" content="en_IN" />
  <meta property="og:image" content="{hero_url}" />
  <meta property="og:image:width" content="{hero_w}" />
  <meta property="og:image:height" content="{hero_h}" />
  <meta property="og:image:alt" content="{hero_alt}" />
  <meta property="article:published_time" content="{p['dateISO']}T09:00:00+05:30" />
  <meta property="article:modified_time" content="{p['dateISO']}T09:00:00+05:30" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="{hero_url}" />

  <!-- Preconnect for performance -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  
  <script type="application/ld+json">
{schema_json}
  </script>

  <style>
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      background: #FAF9F8;
      color: #0F172A;
      line-height: 1.7;
    }}
    .wrap {{
      max-width: 880px;
      margin: 0 auto;
      padding: 0 1.25rem;
    }}
    header.sitehead {{
      background: #0F172A;
      color: white;
      padding: 1rem 0;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      position: sticky;
      top: 0;
      z-index: 100;
    }}
    .header-nav {{
      display: flex;
      justifyContent: space-between;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.25rem;
    }}
    .header-brand {{
      display: flex;
      align-items: center;
      gap: 10px;
      color: white;
      text-decoration: none;
      font-weight: 800;
      font-size: 1.1rem;
    }}
    .header-links a {{
      color: #E2E8F0;
      text-decoration: none;
      margin-left: 1.25rem;
      font-size: 0.9rem;
      font-weight: 600;
      transition: color 0.15s ease;
    }}
    .header-links a:hover {{ color: #EF4444; }}
    
    .article-hero {{
      padding: 2.5rem 0 2rem;
    }}
    .crumb {{
      font-size: 0.85rem;
      color: #64748B;
      margin-bottom: 1.25rem;
    }}
    .crumb a {{ color: #0284C7; text-decoration: none; font-weight: 600; }}
    .badge-tag {{
      display: inline-block;
      padding: 4px 14px;
      border-radius: 99px;
      background: #EFF6FF;
      color: #1E40AF;
      font-weight: 800;
      font-size: 0.8rem;
      margin-bottom: 1rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }}
    h1 {{
      font-size: clamp(1.85rem, 3.8vw, 2.65rem);
      font-weight: 900;
      line-height: 1.2;
      color: #0F172A;
      margin-bottom: 1.25rem;
      letter-spacing: -0.02em;
    }}
    .meta-row {{
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 1.25rem;
      font-size: 0.875rem;
      color: #64748B;
      border-bottom: 1px solid #E2E8F0;
      padding-bottom: 1.25rem;
      margin-bottom: 2rem;
    }}
    .meta-row span {{
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }}
    .article-body {{
      font-size: 1.05rem;
      line-height: 1.8;
      color: #334155;
    }}
    .article-body h3 {{
      font-size: 1.4rem;
      font-weight: 800;
      color: #0F172A;
      margin: 2.25rem 0 0.85rem;
      letter-spacing: -0.01em;
    }}
    .article-body h4 {{
      font-size: 1.15rem;
      font-weight: 800;
      color: #0F172A;
      margin: 1.5rem 0 0.5rem;
    }}
    .article-body p {{
      margin-bottom: 1.25rem;
    }}
    .article-body ul, .article-body ol {{
      margin: 0 0 1.25rem 1.5rem;
    }}
    .article-body li {{
      margin-bottom: 0.5rem;
    }}
    .cta-card {{
      background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
      color: white;
      padding: 2rem;
      border-radius: 20px;
      margin: 3rem 0;
      display: flex;
      flex-wrap: wrap;
      justifyContent: space-between;
      align-items: center;
      gap: 1.5rem;
      box-shadow: 0 10px 30px rgba(15,23,42,0.15);
    }}
    .btn-wa {{
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #25D366;
      color: white;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 12px;
      font-weight: 800;
      font-size: 0.95rem;
      box-shadow: 0 4px 15px rgba(37,211,102,0.3);
      transition: transform 0.15s ease;
    }}
    .btn-wa:hover {{
      transform: translateY(-2px);
    }}
    footer {{
      background: #F1F5F9;
      border-top: 1px solid #E2E8F0;
      padding: 2.5rem 0;
      text-align: center;
      font-size: 0.875rem;
      color: #64748B;
      margin-top: 4rem;
    }}
  </style>
</head>
<body>
  <header class="sitehead">
    <div class="header-nav">
      <a href="/" class="header-brand">
        <span>🩸 BHARATH JAN SEWA LABS</span>
      </a>
      <nav class="header-links" aria-label="Navigation">
        <a href="/">Home</a>
        <a href="/tests/">Test Prices</a>
        <a href="/our-centres/">Our Centres</a>
        <a href="/blog/">Health Guides</a>
        <a href="/affordable-testing-assistance/">Assistance</a>
        <a href="tel:{DISPLAY_PHONE}">{DISPLAY_PHONE}</a>
      </nav>
    </div>
  </header>

  <main class="wrap article-hero">
    <div class="crumb">
      <a href="/">Home</a> &rsaquo; <a href="/blog/">Health Guides</a> &rsaquo; <span>{p['title']}</span>
    </div>

    <span class="badge-tag">{p['category']}</span>
    <h1>{p['title']}</h1>

    <div class="meta-row">
      <span>👨‍⚕️ <strong>{p['author']}</strong></span>
      <span>📅 {p['date']}</span>
      <span>⏱️ {p['readTime']}</span>
      <span style="color:#059669; font-weight:700;">✓ Verified Clinical Article</span>
    </div>

    <figure style="margin:1.5rem 0 2rem;">
      <img src="{hero_src}" alt="{hero_alt}" width="{hero_w}" height="{hero_h}" fetchpriority="high" style="width:100%; height:auto; border-radius:16px; display:block;" />
    </figure>

    <article class="article-body">
      {p['content']}
    </article>

    <div class="cta-card">
      <div>
        <h3 style="color:white; margin:0 0 6px; font-size:1.3rem;">Need this test or full body checkup in Bengaluru?</h3>
        <p style="color:#CBD5E1; margin:0; font-size:0.95rem;">Partner-lab processing • Same-day 4–8 hr reporting • Free home collection for ₹499+</p>
      </div>
      <a href="{wa_url}" class="btn-wa" target="_blank" rel="noopener noreferrer">
        Book on WhatsApp &rarr;
      </a>
    </div>

  </main>

  <footer>
    <div class="wrap">
      <p style="margin-bottom:0.5rem;"><strong>Bharath Jan Sewa Labs</strong> &bull; Bengaluru's Affordable Diagnostic Laboratory Network</p>
      <p style="font-size:0.8rem; color:#94A3B8;">Partner laboratory testing &bull; Verified specimen cold-chain &bull; Non-profit public healthcare</p>
      <p style="margin-top:1rem; font-size:0.8rem;">&copy; 2026 Bharath Jan Sewa Labs. All rights reserved.</p>
    </div>
  </footer>
</body>
</html>"""

    with open(post_file, "w", encoding="utf-8") as out:
        out.write(html)

print("Generated individual blog pages successfully!")

# Generate Blog Hub Directory Index Page
blog_index_file = os.path.join(out_dir, "index.html")
blog_cards_html = ""
for idx, p in enumerate(posts):
    is_featured = (p["slug"] == "affordable-blood-tests-india-delayed-diagnosis")
    featured_badge = '<span style="background:#DC2626; color:white; padding:3px 10px; border-radius:99px; font-weight:800; font-size:0.75rem; text-transform:uppercase; margin-right:6px;">⭐ Featured Guide</span>' if is_featured else ''

    blog_cards_html += f"""
    <article style="background:white; border-radius:16px; border:{'2px solid #EF4444' if is_featured else '1px solid #E2E8F0'}; padding:1.75rem; display:flex; flex-direction:column; justify-content:space-between; box-shadow:{'0 10px 25px rgba(239,68,68,0.1)' if is_featured else '0 4px 16px -4px rgba(15,23,42,0.05)'};">
      <div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem; flex-wrap:wrap; gap:6px;">
          <div>
            {featured_badge}
            <span style="background:#EFF6FF; color:#1E40AF; padding:3px 10px; border-radius:99px; font-weight:800; font-size:0.75rem; text-transform:uppercase;">{p['category']}</span>
          </div>
          <span style="color:#64748B; font-size:0.8rem;">⏱️ {p['readTime']}</span>
        </div>
        <div style="font-size:2rem; margin-bottom:0.5rem;">{p['image']}</div>
        <h2 style="font-size:1.25rem; font-weight:800; color:#0F172A; margin-bottom:0.6rem; line-height:1.35;">
          <a href="/blog/{p['slug']}/" style="color:#0F172A; text-decoration:none;">{p['title']}</a>
        </h2>
        <p style="color:#64748B; font-size:0.875rem; line-height:1.6; margin-bottom:1.25rem;">
          {p['excerpt']}
        </p>
      </div>
      <div style="border-top:1px solid #F1F5F9; padding-top:1rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
        <span style="font-size:0.8rem; color:#0F172A; font-weight:700;">👨‍⚕️ {p['author'].split(',')[0]}</span>
        <a href="/blog/{p['slug']}/" style="color:#EF4444; font-weight:800; text-decoration:none; font-size:0.85rem;">Read Guide &rarr;</a>
      </div>
    </article>
    """

blog_index_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Health Insights & Medical Diagnostic Guides | Bharath Jan Sewa Labs</title>
  <meta name="description" content="Explore evidence-based health articles and diagnostic blood test guides authored by certified medical biochemists and pathologists in Bengaluru. Understand affordable pricing, HbA1c, CBC, Thyroid, Dengue, LFT, and preventive checkups." />
  <link rel="canonical" href="{BASE_URL}/blog/" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      background: #FAF9F8;
      color: #0F172A;
      line-height: 1.65;
    }}
    .wrap {{
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.25rem;
    }}
    header.sitehead {{
      background: #0F172A;
      color: white;
      padding: 1rem 0;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      position: sticky;
      top: 0;
      z-index: 100;
    }}
    .header-nav {{
      display: flex;
      justifyContent: space-between;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.25rem;
    }}
    .header-brand {{
      display: flex;
      align-items: center;
      gap: 10px;
      color: white;
      text-decoration: none;
      font-weight: 800;
      font-size: 1.1rem;
    }}
    .header-links a {{
      color: #E2E8F0;
      text-decoration: none;
      margin-left: 1.25rem;
      font-size: 0.9rem;
      font-weight: 600;
      transition: color 0.15s ease;
    }}
    .header-links a:hover {{ color: #EF4444; }}
    .grid {{
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 1.5rem;
      margin: 2.5rem 0 4rem;
    }}
    footer {{
      background: #F1F5F9;
      border-top: 1px solid #E2E8F0;
      padding: 2.5rem 0;
      text-align: center;
      font-size: 0.875rem;
      color: #64748B;
    }}
  </style>
</head>
<body>
  <header class="sitehead">
    <div class="header-nav">
      <a href="/" class="header-brand">
        <span>🩸 BHARATH JAN SEWA LABS</span>
      </a>
      <nav class="header-links" aria-label="Navigation">
        <a href="/">Home</a>
        <a href="/tests/">Test Prices</a>
        <a href="/our-centres/">Our Centres</a>
        <a href="/blog/">Health Guides</a>
        <a href="/affordable-testing-assistance/">Assistance</a>
        <a href="tel:{DISPLAY_PHONE}">{DISPLAY_PHONE}</a>
      </nav>
    </div>
  </header>

  <main class="wrap" style="padding-top:3.5rem;">
    <div style="text-align:center; max-width:820px; margin:0 auto 2.5rem;">
      <span style="background:#EFF6FF; color:#1E40AF; padding:4px 14px; border-radius:99px; font-weight:800; font-size:0.8rem; text-transform:uppercase; display:inline-block; margin-bottom:1rem; letter-spacing:0.04em;">
        EVIDENCE-BASED CLINICAL INSIGHTS &amp; DIAGNOSTIC GUIDES
      </span>
      <h1 style="font-size:clamp(2rem, 4vw, 2.85rem); font-weight:900; line-height:1.2; margin-bottom:1rem; letter-spacing:-0.02em;">
        Health Insights &amp; Laboratory Diagnostics Hub
      </h1>
      <p style="font-size:1.05rem; color:#64748B; line-height:1.6;">
        Explore evidence-based diagnostic articles authored by certified Medical Biochemists and Pathologists in Bengaluru. Understand preparation protocols, normal reference ranges, and transparent pricing.
      </p>
    </div>

    <div class="grid">
      {blog_cards_html}
    </div>
  </main>

  <footer>
    <div class="wrap">
      <p style="margin-bottom:0.5rem;"><strong>Bharath Jan Sewa Labs</strong> &bull; Bengaluru's Affordable Diagnostic Laboratory Network</p>
      <p style="font-size:0.8rem; color:#94A3B8;">Partner laboratory testing &bull; Verified specimen cold-chain &bull; Non-profit public healthcare</p>
      <p style="margin-top:1rem; font-size:0.8rem;">&copy; 2026 Bharath Jan Sewa Labs. All rights reserved.</p>
    </div>
  </footer>
</body>
</html>"""

with open(blog_index_file, "w", encoding="utf-8") as out:
    out.write(blog_index_html)

print("Generated public/blog/index.html hub successfully!")
