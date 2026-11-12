#!/usr/bin/env python3
"""
Generate Static SEO-Optimized Medical Blog Pages & Knowledge Hub Index for Bharath Jan Sewa Labs.
Supports crawlability for Googlebot, Bingbot, OAI-SearchBot, PerplexityBot, and Claude-SearchBot.
"""

import os
import re
import json

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

# Pattern for extracting each blog object
pattern = re.compile(
    r"id:\s*'([^']+)',\s*"
    r"slug:\s*'([^']+)',\s*"
    r"title:\s*'([^']+)',\s*"
    r"category:\s*'([^']+)',\s*"
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
    posts.append({
        "id": m.group(1),
        "slug": m.group(2),
        "title": m.group(3),
        "category": m.group(4),
        "author": m.group(5),
        "date": "12 November 2026",
        "readTime": m.group(6),
        "excerpt": m.group(7),
        "content": m.group(8).strip(),
        "image": m.group(9)
    })

print(f"Loaded {len(posts)} blog posts from mockData.js")

out_dir = os.path.join(os.path.dirname(__file__), "..", "public", "blog")
os.makedirs(out_dir, exist_ok=True)

# Generate Individual Blog HTML Pages
for p in posts:
    post_dir = os.path.join(out_dir, p["slug"])
    os.makedirs(post_dir, exist_ok=True)
    post_file = os.path.join(post_dir, "index.html")
    
    canonical_url = f"{BASE_URL}/blog/{p['slug']}/"
    wa_msg = f"Namaste BJSL, I would like to book a blood test after reading your article: '{p['title']}' in Bengaluru."
    wa_url = f"{WHATSAPP_LINK}?text={urllib_parse_quote(wa_msg)}" if 'urllib_parse_quote' in globals() else f"{WHATSAPP_LINK}?text={p['slug']}"

    schema_json = json.dumps({
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        "headline": p["title"],
        "description": p["excerpt"],
        "url": canonical_url,
        "author": {
            "@type": "Person",
            "name": p["author"]
        },
        "publisher": {
            "@type": "MedicalOrganization",
            "name": "Bharath Jan Sewa Labs",
            "url": BASE_URL,
            "logo": f"{BASE_URL}/logo.webp"
        },
        "datePublished": "2026-11-12",
        "dateModified": "2026-11-12",
        "mainEntityOfPage": canonical_url,
        "about": {
            "@type": "MedicalCondition",
            "name": p["category"]
        }
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
      line-height: 1.65;
    }}
    .wrap {{
      max-width: 860px;
      margin: 0 auto;
      padding: 0 1.25rem;
    }}
    header.sitehead {{
      background: #0F172A;
      color: white;
      padding: 1rem 0;
      border-bottom: 1px solid rgba(255,255,255,0.1);
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
    }}
    .header-links a:hover {{ color: #38BDF8; }}
    
    .article-hero {{
      padding: 3rem 0 2rem;
    }}
    .crumb {{
      font-size: 0.85rem;
      color: #64748B;
      margin-bottom: 1.25rem;
    }}
    .crumb a {{ color: #0284C7; text-decoration: none; }}
    .badge-tag {{
      display: inline-block;
      padding: 4px 12px;
      border-radius: 99px;
      background: #EFF6FF;
      color: #1E40AF;
      font-weight: 800;
      font-size: 0.8rem;
      margin-bottom: 1rem;
      text-transform: uppercase;
    }}
    h1 {{
      font-size: clamp(1.8rem, 3.5vw, 2.5rem);
      font-weight: 900;
      line-height: 1.2;
      color: #0F172A;
      margin-bottom: 1rem;
    }}
    .meta-row {{
      display: flex;
      flex-wrap: wrap;
      gap: 1.25rem;
      font-size: 0.875rem;
      color: #64748B;
      border-bottom: 1px solid #E2E8F0;
      padding-bottom: 1.25rem;
      margin-bottom: 2rem;
    }}
    .article-body {{
      font-size: 1.05rem;
      line-height: 1.8;
      color: #334155;
    }}
    .article-body h3 {{
      font-size: 1.35rem;
      font-weight: 800;
      color: #0F172A;
      margin: 1.75rem 0 0.75rem;
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
        <a href="tel:{DISPLAY_PHONE}">{DISPLAY_PHONE}</a>
      </nav>
    </div>
  </header>

  <main class="wrap article-hero">
    <div class="crumb">
      <a href="/">Home</a> &gt; <a href="/blog/">Health Guides</a> &gt; <span>{p['title']}</span>
    </div>

    <span class="badge-tag">{p['category']}</span>
    <h1>{p['title']}</h1>

    <div class="meta-row">
      <span>👨‍⚕️ <strong>{p['author']}</strong></span>
      <span>📅 {p['date']}</span>
      <span>⏱️ {p['readTime']}</span>
      <span style="color:#059669; font-weight:700;">✓ Clinically Reviewed</span>
    </div>

    <article class="article-body">
      {p['content']}
    </article>

    <div class="cta-card">
      <div>
        <h3 style="color:white; margin:0 0 6px; font-size:1.3rem;">Need this test in Bengaluru?</h3>
        <p style="color:#CBD5E1; margin:0; font-size:0.95rem;">NABL-accredited processing • Fast 4–8 hr report • Free home collection for ₹499+</p>
      </div>
      <a href="https://wa.me/919805543143" class="btn-wa" target="_blank" rel="noopener noreferrer">
        Book on WhatsApp &rarr;
      </a>
    </div>

  </main>

  <footer>
    <div class="wrap">
      <p style="margin-bottom:0.5rem;"><strong>Bharath Jan Sewa Labs</strong> &bull; Bengaluru's Affordable Diagnostic Laboratory Network</p>
      <p style="font-size:0.8rem; color:#94A3B8;">Accredited partner laboratory testing &bull; Verified specimen cold-chain &bull; Non-profit public healthcare</p>
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
for p in posts:
    blog_cards_html += f"""
    <article style="background:white; border-radius:16px; border:1px solid #E2E8F0; padding:1.75rem; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 4px 16px -4px rgba(15,23,42,0.05);">
      <div>
        <div style="display:flex; justify-content:space-between; margin-bottom:0.75rem;">
          <span style="background:#EFF6FF; color:#1E40AF; padding:3px 10px; border-radius:99px; font-weight:800; font-size:0.75rem; text-transform:uppercase;">{p['category']}</span>
          <span style="color:#64748B; font-size:0.8rem;">⏱️ {p['readTime']}</span>
        </div>
        <div style="font-size:2rem; margin-bottom:0.5rem;">{p['image']}</div>
        <h2 style="font-size:1.2rem; font-weight:800; color:#0F172A; margin-bottom:0.6rem; line-height:1.35;">
          <a href="/blog/{p['slug']}/" style="color:#0F172A; text-decoration:none;">{p['title']}</a>
        </h2>
        <p style="color:#64748B; font-size:0.875rem; line-height:1.6; margin-bottom:1.25rem;">
          {p['excerpt']}
        </p>
      </div>
      <div style="border-top:1px solid #F1F5F9; padding-top:1rem; display:flex; justify-content:space-between; align-items:center;">
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
  <meta name="description" content="Explore evidence-based health articles and diagnostic blood test guides authored by certified pathologists in Bengaluru. Understand HbA1c, CBC, Thyroid, Dengue, LFT, and preventive checkups." />
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
    }}
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
        <a href="tel:{DISPLAY_PHONE}">{DISPLAY_PHONE}</a>
      </nav>
    </div>
  </header>

  <main class="wrap" style="padding-top:3.5rem;">
    <div style="text-align:center; max-width:800px; margin:0 auto 2.5rem;">
      <span style="background:#EFF6FF; color:#1E40AF; padding:4px 14px; border-radius:99px; font-weight:800; font-size:0.8rem; text-transform:uppercase; display:inline-block; margin-bottom:1rem;">
        KNOWLEDGE & CLINICAL INSIGHTS
      </span>
      <h1 style="font-size:clamp(2rem, 4vw, 2.8rem); font-weight:900; line-height:1.2; margin-bottom:1rem;">
        Health Insights & Laboratory Diagnostics Hub
      </h1>
      <p style="font-size:1.05rem; color:#64748B;">
        Explore evidence-based diagnostic articles authored by certified pathologists to help you understand your blood reports, preparation protocols, and preventive health in Bengaluru.
      </p>
    </div>

    <div class="grid">
      {blog_cards_html}
    </div>
  </main>

  <footer>
    <div class="wrap">
      <p style="margin-bottom:0.5rem;"><strong>Bharath Jan Sewa Labs</strong> &bull; Bengaluru's Affordable Diagnostic Laboratory Network</p>
      <p style="font-size:0.8rem; color:#94A3B8;">Accredited partner laboratory testing &bull; Verified specimen cold-chain &bull; Non-profit public healthcare</p>
      <p style="margin-top:1rem; font-size:0.8rem;">&copy; 2026 Bharath Jan Sewa Labs. All rights reserved.</p>
    </div>
  </footer>
</body>
</html>"""

with open(blog_index_file, "w", encoding="utf-8") as out:
    out.write(blog_index_html)

print("Generated public/blog/index.html hub successfully!")
