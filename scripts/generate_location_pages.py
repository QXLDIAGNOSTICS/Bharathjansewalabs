#!/usr/bin/env python3
"""
Generate 15 Hyperlocal Locality Landing Pages + Directory Index for Bharath Jan Sewa Labs.
Aligns with GEO, SEO & Hyperlocal Growth Implementation audit (30 October 2026).
"""

import os
import json

BASE_URL = "https://bharathjansewalabs.com"
PHONE = "+919805543143"
DISPLAY_PHONE = "+91 98055 43143"

LOCALITIES = [
    {
        "id": "banashankari",
        "slug": "banashankari",
        "name": "Banashankari",
        "region": "South",
        "pincodes": ["560085", "560070"],
        "nearestHub": "Ittamadu / Banashankari Hub",
        "hubSlug": "ittamadu",
        "landmarks": "Near BDA Complex, 3rd Stage, Katriguppe, Girinagar",
        "hasPhysicalCentre": True,
        "centreAddress": "House 36, 23rd Cross Road, Manjunath Nagar, Ittamadu, Banashankari 3rd Stage, Bengaluru - 560085",
        "turnaround": "4-6 Hours",
        "metaDesc": "Book affordable blood tests in Banashankari, Bengaluru (PIN: 560085, 560070). CBC ₹160, Sugar ₹20, HbA1c ₹260, Thyroid ₹190. Doorstep collection & NABL partner lab testing."
    },
    {
        "id": "ittamadu",
        "slug": "ittamadu",
        "name": "Ittamadu",
        "region": "South",
        "pincodes": ["560085"],
        "nearestHub": "Ittamadu Collection Centre (Manjunath Nagar)",
        "hubSlug": "ittamadu",
        "landmarks": "Near Valentine Model School, 23rd Cross Road, BSK 3rd Stage",
        "hasPhysicalCentre": True,
        "centreAddress": "House 36, 23rd Cross Road, Manjunath Nagar, Ittamadu, Bengaluru - 560085",
        "turnaround": "2-4 Hours",
        "metaDesc": "Affordable diagnostic blood tests in Ittamadu, South Bangalore (560085). Walk-in collection centre & home sample pickup. CBC ₹160, Blood Sugar ₹20, HbA1c ₹260."
    },
    {
        "id": "jp-nagar",
        "slug": "jp-nagar",
        "name": "JP Nagar",
        "region": "South",
        "pincodes": ["560078", "560069"],
        "nearestHub": "Jaraganahalli / JP Nagar 6th Phase Hub",
        "hubSlug": "jaraganahalli",
        "landmarks": "Phases 1-6, Sarakki Lake, Kanakapura Road, Jaraganahalli",
        "hasPhysicalCentre": True,
        "centreAddress": "No. 41, 17th D Cross, Basavaraj Layout, JP Nagar 6th Phase, Jaraganahalli, Bengaluru - 560078",
        "turnaround": "4-6 Hours",
        "metaDesc": "Reliable, budget blood tests in JP Nagar, Bengaluru (PIN: 560078, 560069). Home blood collection & walk-in desk. Fasting sugar ₹20, CBC ₹160, Lipid Profile ₹260."
    },
    {
        "id": "jayanagar",
        "slug": "jayanagar",
        "name": "Jayanagar",
        "region": "South",
        "pincodes": ["560011", "560041"],
        "nearestHub": "VV Puram Hub & Jaraganahalli Hub",
        "hubSlug": "vv-puram",
        "landmarks": "4th Block Complex, South End Circle, Madhavan Park, 9th Block",
        "hasPhysicalCentre": False,
        "centreAddress": "Prompt Doorstep Phlebotomy Dispatch from South Bengaluru Hubs",
        "turnaround": "4-6 Hours",
        "metaDesc": "Affordable blood test home collection in Jayanagar, Bengaluru (PIN: 560011, 560041). Senior citizen health checkups, HbA1c, Thyroid & CBC tests at honest prices."
    },
    {
        "id": "padmanabhanagar",
        "slug": "padmanabhanagar",
        "name": "Padmanabhanagar",
        "region": "South",
        "pincodes": ["560070"],
        "nearestHub": "Ittamadu Hub & Subramanyapura Hub",
        "hubSlug": "ittamadu",
        "landmarks": "Near Devegowda Petrol Bunk, Kadirenahalli, Chikkalasandra",
        "hasPhysicalCentre": False,
        "centreAddress": "Covered via Ittamadu Centre (2 km) & Certified Home Sample Collection",
        "turnaround": "4-6 Hours",
        "metaDesc": "Affordable diagnostic blood tests in Padmanabhanagar, Bangalore (560070). Fast home sample pickup. Complete blood count ₹160, Blood glucose ₹20, Kidney KFT ₹360."
    },
    {
        "id": "subramanyapura",
        "slug": "subramanyapura",
        "name": "Subramanyapura / Uttarahalli",
        "region": "South",
        "pincodes": ["560061"],
        "nearestHub": "Subramanyapura Collection Centre",
        "hubSlug": "subramanyapura",
        "landmarks": "Jayanagar Housing Society Layout, Uttarahalli Main Road",
        "hasPhysicalCentre": True,
        "centreAddress": "Park View Diagnostic Center, 11, 1st Street, Jayanagar Housing Society Layout, Subramanyapura, Bengaluru - 560061",
        "turnaround": "4-6 Hours",
        "metaDesc": "Diagnostic lab tests in Subramanyapura & Uttarahalli, Bengaluru (560061). Walk-in collection centre & home visits. CBC ₹160, HbA1c ₹260, Thyroid Panel ₹190."
    },
    {
        "id": "kengeri",
        "slug": "kengeri",
        "name": "Kengeri Satellite Town",
        "region": "West",
        "pincodes": ["560059", "560060"],
        "nearestHub": "Kengeri BDA Commercial Complex Hub",
        "hubSlug": "kengeri",
        "landmarks": "BDA Complex, Mysore Road, Harsha Layout, Kengeri Metro",
        "hasPhysicalCentre": True,
        "centreAddress": "Shop 32, BDA Commercial Complex, Mysore Road, Kengeri Satellite Town, Bengaluru - 560059",
        "turnaround": "4-6 Hours",
        "metaDesc": "Affordable blood testing in Kengeri Satellite Town, Bangalore (560059). Walk-in centre at BDA Complex & home blood collection. Routine tests starting from ₹20."
    },
    {
        "id": "rr-nagar",
        "slug": "rr-nagar",
        "name": "Rajarajeshwari Nagar (RR Nagar)",
        "region": "West",
        "pincodes": ["560098"],
        "nearestHub": "Kengeri Hub (3 km)",
        "hubSlug": "kengeri",
        "landmarks": "Ideal Homes Township, BEML Layout, Mysore Road Arch, Remco Layout",
        "hasPhysicalCentre": False,
        "centreAddress": "Served by Kengeri BDA Hub & Doorstep Phlebotomy Teams",
        "turnaround": "4-6 Hours",
        "metaDesc": "Home blood collection in RR Nagar (Rajarajeshwari Nagar), Bengaluru (560098). NABL partner lab testing, same day PDF reports. Full body checkup packages from ₹796."
    },
    {
        "id": "peenya",
        "slug": "peenya",
        "name": "Peenya Industrial Area",
        "region": "West",
        "pincodes": ["560058", "560091"],
        "nearestHub": "Peenya 2nd Stage Collection Centre",
        "hubSlug": "peenya",
        "landmarks": "Peenya 2nd Stage, Srigandha Nagar, Hegganahalli Cross",
        "hasPhysicalCentre": True,
        "centreAddress": "No. 113, 77, 14th Cross Road, Peenya 2nd Stage, Srigandha Nagar, Bengaluru - 560091",
        "turnaround": "4-6 Hours",
        "metaDesc": "Affordable lab tests in Peenya Industrial Area, Bengaluru (560091, 560058). Walk-in collection centre & corporate health screening. CBC ₹160, Sugar ₹20, LFT ₹360."
    },
    {
        "id": "rajajinagar",
        "slug": "rajajinagar",
        "name": "Rajajinagar",
        "region": "West",
        "pincodes": ["560010"],
        "nearestHub": "Basaveshwaranagar Hub & Srirampura Hub",
        "hubSlug": "basaveshwaranagar",
        "landmarks": "Dr Rajkumar Road, 1st Block to 6th Block, Navrang Theatre",
        "hasPhysicalCentre": False,
        "centreAddress": "Convenient home sample collection & Basaveshwaranagar collection desk",
        "turnaround": "4-6 Hours",
        "metaDesc": "Affordable blood test home collection in Rajajinagar, Bengaluru (560010). Fasting sugar ₹20, HbA1c ₹260, Thyroid TFT ₹190, Lipid Profile ₹260. Same day reports."
    },
    {
        "id": "basaveshwaranagar",
        "slug": "basaveshwaranagar",
        "name": "Basaveshwaranagar",
        "region": "West",
        "pincodes": ["560079"],
        "nearestHub": "Basaveshwaranagar Netaji Clinic Desk",
        "hubSlug": "basaveshwaranagar",
        "landmarks": "3rd Main Road, Shankar Mutt, Kurubarahalli, Kamalanagar",
        "hasPhysicalCentre": True,
        "centreAddress": "Netaji Clinic, 86, 3rd Main Road, Basaveshwaranagar, Bengaluru - 560079",
        "turnaround": "4-6 Hours",
        "metaDesc": "Affordable diagnostic blood tests in Basaveshwaranagar, Bengaluru (560079). Walk-in centre at Netaji Clinic & home collection. Fasting blood sugar ₹20, CBC ₹160."
    },
    {
        "id": "vijayanagar",
        "slug": "vijayanagar",
        "name": "Vijayanagar / Nagarabhavi",
        "region": "West",
        "pincodes": ["560040", "560072"],
        "nearestHub": "Basaveshwaranagar Hub & Kengeri Hub",
        "hubSlug": "basaveshwaranagar",
        "landmarks": "Vijayanagar Metro, MC Layout, Chandra Layout, Nagarabhavi BDA",
        "hasPhysicalCentre": False,
        "centreAddress": "Covered via certified doorstep phlebotomy and nearby West Bengaluru centres",
        "turnaround": "4-6 Hours",
        "metaDesc": "Affordable blood tests in Vijayanagar & Nagarabhavi, Bengaluru (560040, 560072). Prompt home sample collection. CBC ₹160, HbA1c ₹260, Lipid Profile ₹260."
    },
    {
        "id": "btm-layout",
        "slug": "btm-layout",
        "name": "BTM Layout / Bommanahalli",
        "region": "Southeast",
        "pincodes": ["560068", "560076"],
        "nearestHub": "Doorstep Phlebotomy Dispatch Network",
        "hubSlug": "jaraganahalli",
        "landmarks": "BTM 1st & 2nd Stage, Silk Board, Bannerghatta Road Junction",
        "hasPhysicalCentre": False,
        "centreAddress": "Doorstep Sample Collection Service across BTM & Bommanahalli",
        "turnaround": "4-6 Hours",
        "metaDesc": "Home blood collection in BTM Layout & Bommanahalli, Bengaluru (560068, 560076). Reliable routine tests & health checkups processed via verified NABL partner labs."
    },
    {
        "id": "hsr-layout",
        "slug": "hsr-layout",
        "name": "HSR Layout / Koramangala",
        "region": "Southeast",
        "pincodes": ["560102", "560034"],
        "nearestHub": "Doorstep Phlebotomy Express Network",
        "hubSlug": "jaraganahalli",
        "landmarks": "Sectors 1-7, 27th Main Road, Agara Lake, Koramangala 1st-8th Block",
        "hasPhysicalCentre": False,
        "centreAddress": "Doorstep Phlebotomy Express Service covering HSR Sectors 1-7 & Koramangala",
        "turnaround": "4-6 Hours",
        "metaDesc": "Blood test home collection in HSR Layout & Koramangala, Bengaluru (560102, 560034). Full body checkups, diabetes HbA1c, thyroid & vitamin tests with digital reports."
    },
    {
        "id": "kr-market",
        "slug": "kr-market",
        "name": "KR Market / Kalasipalya",
        "region": "Central",
        "pincodes": ["560002"],
        "nearestHub": "KR Market Collection Centre (Opp. Victoria Hospital)",
        "hubSlug": "kr-market",
        "landmarks": "KR Road, City Market Metro Station, Victoria Hospital Hub",
        "hasPhysicalCentre": True,
        "centreAddress": "102/A, K R Road, Kalasipalya, Bengaluru - 560002 (Opp. Victoria Hospital)",
        "turnaround": "2-4 Hours",
        "metaDesc": "Ultra-affordable blood tests in KR Market & Kalasipalya, Central Bengaluru (560002). Walk-in centre opp. Victoria Hospital. Blood sugar ₹20, CBC ₹160, Urine ₹50."
    }
]

FEATURED_TESTS = [
    {"name": "Complete Blood Count with ESR (CBC)", "price": 160, "ref": 410, "slug": "cbc-esr-test", "fasting": "No fasting needed"},
    {"name": "Blood Glucose (Fasting / PP / Random)", "price": 20, "ref": 70, "slug": "blood-sugar-test", "fasting": "8-10 hrs fasting for FBS"},
    {"name": "Glycated Haemoglobin (HbA1c)", "price": 260, "ref": 720, "slug": "hba1c-test", "fasting": "No fasting needed"},
    {"name": "Thyroid Function Test (Total T3, T4, TSH)", "price": 190, "ref": 550, "slug": "thyroid-function-test-total", "fasting": "Morning sample preferred"},
    {"name": "Lipid Profile (Complete Cholesterol)", "price": 260, "ref": 600, "slug": "lipid-profile-test", "fasting": "10-12 hrs fasting"},
    {"name": "Liver Function Test (LFT)", "price": 360, "ref": 780, "slug": "liver-function-test", "fasting": "8-10 hrs fasting"},
    {"name": "Kidney Function Test (KFT / RFT)", "price": 320, "ref": 1150, "slug": "renal-profile-test", "fasting": "Normal hydration"},
    {"name": "Serum Creatinine", "price": 50, "ref": 150, "slug": "serum-creatinine-test", "fasting": "No fasting needed"},
    {"name": "Urine Routine & Microscopy", "price": 50, "ref": 300, "slug": "urine-routine-microscopy-test", "fasting": "First morning sample preferred"},
    {"name": "Vitamin D 25-Hydroxy", "price": 660, "ref": 1300, "slug": "vitamin-d-test", "fasting": "No fasting needed"},
    {"name": "Vitamin B12 (Cobalamin)", "price": 440, "ref": 1600, "slug": "vitamin-b12-test", "fasting": "No fasting needed"},
    {"name": "Serum Electrolytes (Na, K, Cl)", "price": 190, "ref": 450, "slug": "serum-electrolytes-test", "fasting": "No fasting needed"}
]

def generate_locality_page(loc):
    slug = loc["slug"]
    name = loc["name"]
    region = loc["region"]
    pincodes_str = ", ".join(loc["pincodes"])
    primary_pin = loc["pincodes"][0]
    canonical_url = f"{BASE_URL}/locations/{slug}/"
    wa_link = f"https://wa.me/919805543143?text=Hello%20Bharath%20Jan%20Sewa%20Labs%2C%20I%20would%20like%20to%20enquire%20about%20blood%20tests%20in%20{name}%20(PIN%3A%20{primary_pin})."

    schema_entity_type = "MedicalBusiness" if loc["hasPhysicalCentre"] else "Service"
    schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": schema_entity_type,
                "@id": f"{canonical_url}#{schema_entity_type.lower()}",
                "name": f"Bharath Jan Sewa Labs - {name}",
                "url": canonical_url,
                "telephone": PHONE,
                "email": "contact@bharathjansewalabs.com",
                "parentOrganization": {
                    "@id": f"{BASE_URL}/#organization"
                },
                "areaServed": {
                    "@type": "City",
                    "name": "Bengaluru",
                    "containedInPlace": {
                        "@type": "AdministrativeArea",
                        "name": f"{name}, Bengaluru"
                    }
                },
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": loc["centreAddress"],
                    "addressLocality": "Bengaluru",
                    "addressRegion": "Karnataka",
                    "postalCode": primary_pin,
                    "addressCountry": "IN"
                }
            },
            {
                "@type": "BreadcrumbList",
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
                        "name": "Bengaluru Locations",
                        "item": f"{BASE_URL}/locations/"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": name,
                        "item": canonical_url
                    }
                ]
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": f"Is home sample collection available in {name}, Bengaluru?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": f"Yes, Bharath Jan Sewa Labs provides door-to-door home sample collection across {name} (PIN: {pincodes_str}). Certified phlebotomists collect blood samples following strict sterile protocols and maintain cold-chain storage."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": f"Where is the nearest Bharath Jan Sewa Labs collection point for {name} residents?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": f"For {name}, the primary service anchor is {loc['nearestHub']}. Address/Service desk: {loc['centreAddress']}. You can also schedule convenient home collection via WhatsApp or phone."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": f"Are blood test prices in {name} the same as the advertised leaflet tariff?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": f"Yes. All published routine test prices (e.g. CBC ₹160, Fasting Sugar ₹20, HbA1c ₹260, Thyroid TFT ₹190) apply uniformly across Bengaluru. Collection charges, if any for remote home visits, are disclosed transparently before confirmation."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Which laboratory processes samples collected from patients?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Samples collected by Bharath Jan Sewa Labs are transported via validated temperature-controlled cold-chain boxes and processed through verified NABL-accredited partner laboratories where applicable to ensure clinical precision."
                        }
                    }
                ]
            }
        ]
    }

    test_cards_html = ""
    for t in FEATURED_TESTS:
        test_cards_html += f"""
        <article class="testcard-geo">
          <div class="testcard-geo-body">
            <h3><a href="/tests/{t['slug']}/">{t['name']}</a></h3>
            <span class="testcard-prep">{t['fasting']}</span>
          </div>
          <div class="testcard-geo-price">
            <strong>₹{t['price']}</strong>
            <small>Leaflet Ref. ₹{t['ref']}</small>
            <a href="/tests/{t['slug']}/" class="btn ghost btn-sm">Details &rarr;</a>
          </div>
        </article>
        """

    other_locs_html = ""
    for ol in LOCALITIES:
        if ol["slug"] != slug:
            other_locs_html += f'<a class="pill" href="/locations/{ol["slug"]}/">{ol["name"]} ({ol["pincodes"][0]})</a>'

    physical_centre_badge = '<span class="status-badge verified">Verified Physical Centre</span>' if loc["hasPhysicalCentre"] else '<span class="status-badge express">Doorstep Phlebotomy Express Area</span>'

    html = f"""<!doctype html>
<html lang="en-IN">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <meta name="robots" content="index,follow,max-image-preview:large"/>
  <title>Affordable Blood Tests in {name}, Bengaluru | Bharath Jan Sewa Labs</title>
  <meta name="description" content="{loc['metaDesc']}"/>
  <link rel="canonical" href="{canonical_url}"/>
  <meta property="og:type" content="website"/>
  <meta property="og:title" content="Affordable Blood Tests in {name}, Bengaluru | Bharath Jan Sewa Labs"/>
  <meta property="og:description" content="{loc['metaDesc']}"/>
  <meta property="og:url" content="{canonical_url}"/>
  <meta name="theme-color" content="#143b70"/>
  <link rel="stylesheet" href="/tests/assets/site.css"/>
  <style>
    :root {{ --navy: #143b70; --blue: #2367a5; --light-blue: #f0f7ff; --green: #15803d; --border: #dbe4ee; }}
    .loc-hero {{ background: linear-gradient(135deg, #ffffff 60%, #eaf4ff); border: 1px solid var(--border); border-radius: 18px; padding: clamp(24px, 4vw, 44px); margin-bottom: 24px; }}
    .region-tag {{ display: inline-block; background: #eaf4ff; color: var(--navy); font-weight: 800; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; padding: 4px 12px; border-radius: 100px; margin-bottom: 12px; }}
    .status-badge {{ display: inline-block; font-size: 12px; font-weight: 750; padding: 5px 12px; border-radius: 6px; margin: 8px 0; }}
    .status-badge.verified {{ background: #e6f4ea; color: #137333; border: 1px solid #b7e1cd; }}
    .status-badge.express {{ background: #fef7e0; color: #b06000; border: 1px solid #fce8b2; }}
    .hub-box {{ background: #fff; border: 1px solid var(--border); border-radius: 14px; padding: 22px; margin: 18px 0; box-shadow: 0 4px 18px rgba(20,59,112,0.06); }}
    .hub-box h3 {{ margin-top: 0; color: var(--navy); }}
    .hub-box address {{ font-style: normal; color: #374151; line-height: 1.6; margin: 8px 0 16px; }}
    .geo-grid {{ display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; margin: 20px 0; }}
    .testcard-geo {{ background: #fff; border: 1px solid var(--border); border-radius: 12px; padding: 16px; display: flex; justify-content: space-between; align-items: center; gap: 16px; }}
    .testcard-geo-body h3 {{ font-size: 15px; margin: 0 0 6px; }}
    .testcard-geo-body h3 a {{ color: #162232; text-decoration: none; }}
    .testcard-geo-body h3 a:hover {{ text-decoration: underline; }}
    .testcard-prep {{ font-size: 12px; color: #6b7280; display: block; }}
    .testcard-geo-price {{ text-align: right; flex-shrink: 0; }}
    .testcard-geo-price strong {{ display: block; font-size: 22px; color: #bb1827; }}
    .testcard-geo-price small {{ display: block; font-size: 11px; color: #9ca3af; margin-bottom: 6px; }}
    .btn-sm {{ padding: 6px 12px; font-size: 12px; border-radius: 8px; }}
    .loc-actions {{ display: flex; gap: 12px; flex-wrap: wrap; margin-top: 18px; }}
    .pill-cloud {{ display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }}
    .pin-badge {{ background: #e2e8f0; color: #1e293b; padding: 2px 8px; border-radius: 4px; font-weight: 700; font-size: 12px; }}
    @media(max-width: 768px) {{
      .geo-grid {{ grid-template-columns: 1fr; }}
      .testcard-geo {{ flex-direction: column; align-items: flex-start; }}
      .testcard-geo-price {{ text-align: left; margin-top: 10px; }}
    }}
  </style>
  <script type="application/ld+json">
{json.dumps(schema, indent=2)}
  </script>
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>

  <header class="sitehead">
    <div class="wrap nav">
      <a class="brand" href="/" aria-label="Bharath Jan Sewa Labs home">
        <span class="drop">&#9679;</span>
        <span>
          <strong>BHARATH JAN SEWA LABS</strong>
          <small>Diagnostics with Dignity &bull; Affordable Diagnostic Testing</small>
        </span>
      </a>
      <nav aria-label="Main navigation">
        <a href="/">Home</a>
        <a href="/tests/">Test Prices</a>
        <a href="/locations/">Locations</a>
        <a href="/our-centres/">Centres</a>
        <a href="tel:{PHONE}">{DISPLAY_PHONE}</a>
      </nav>
    </div>
  </header>

  <main id="main" class="wrap">
    <div class="crumb">
      <a href="/">Home</a> / <a href="/locations/">Bengaluru Locations</a> / {name}
    </div>

    <section class="loc-hero">
      <span class="region-tag">{region} Bengaluru Regional Priority</span>
      <h1>Affordable Blood Tests in {name}, Bengaluru</h1>
      <p class="lead">
        Transparent test prices, convenient doorstep phlebotomy, and quality-focused diagnostic testing across <strong>{name}</strong> (Target PIN Codes: <span class="pin-badge">{pincodes_str}</span>).
      </p>

      {physical_centre_badge}

      <div class="hub-box">
        <h3>Primary Collection Hub &amp; Service Desk</h3>
        <p><strong>Anchor Location:</strong> {loc['nearestHub']}</p>
        <address>{loc['centreAddress']}</address>
        <p><strong>Key Landmarks Served:</strong> {loc['landmarks']}</p>
        <p><strong>Report Turnaround:</strong> Typically {loc['turnaround']} (WhatsApp PDF &amp; Secure Email)</p>
        <div class="loc-actions">
          <a class="btn mainbtn" href="tel:{PHONE}">Call {DISPLAY_PHONE}</a>
          <a class="btn ghost" href="{wa_link}" target="_blank" rel="noopener noreferrer">Book via WhatsApp</a>
          <a class="btn ghost" href="/tests/">View All 66 Test Prices</a>
        </div>
      </div>
    </section>

    <section class="content">
      <h2>Approved Blood Test Prices for {name} Patients</h2>
      <p>
        All tests are provided at approved, transparent tariffs without hidden collection markups. Samples are processed through verified NABL-accredited partner laboratories where applicable.
      </p>

      <div class="geo-grid">
        {test_cards_html}
      </div>

      <p style="text-align: center; margin-top: 20px;">
        <a class="btn mainbtn" href="/tests/">Browse Full 66 Blood Test Price Catalogue &rarr;</a>
      </p>
    </section>

    <section class="content">
      <h2>Quality and Accreditation Assurance</h2>
      <p>
        At Bharath Jan Sewa Labs, we believe diagnostic affordability should never compromise clinical precision:
      </p>
      <ul>
        <li><strong>Certified Phlebotomy:</strong> Trained and vaccinated healthcare professionals collect samples using sterile single-use vacuum collection tubes.</li>
        <li><strong>Temperature-Controlled Cold Chain:</strong> Samples are immediately placed into calibrated cold-chain containers to prevent analyte degradation during transit.</li>
        <li><strong>NABL Partner Laboratories:</strong> Routine and specialized testing panels are processed through verified NABL-accredited partner facilities with automated robotic analyzers and strict quality controls.</li>
        <li><strong>Same-Day Digital Delivery:</strong> Verified diagnostic reports are delivered directly to your WhatsApp and Email within hours of laboratory processing.</li>
      </ul>
      <div class="disclaimer">
        <strong>Medical Note:</strong> Laboratory results must be interpreted by a registered medical practitioner in conjunction with your clinical symptoms and medical history.
      </div>
    </section>

    <section class="faqarea">
      <h2>Frequently Asked Questions in {name}</h2>
      <div class="faqbody">
        <details class="faq" open>
          <summary>Can I schedule a home blood sample collection in {name}?</summary>
          <p>
            Yes! Bharath Jan Sewa Labs provides home sample collection across {name} and nearby neighborhoods in {region} Bengaluru. Simply call <strong>{DISPLAY_PHONE}</strong> or WhatsApp us your test prescription to arrange a morning collection slot.
          </p>
        </details>
        <details class="faq">
          <summary>Are test prices higher for home collection compared to visiting a centre?</summary>
          <p>
            No, our core test tariffs (e.g. CBC ₹160, Glucose ₹20, HbA1c ₹260) are completely standardized. If any nominal phlebotomist travel charge applies based on distance, it will be clearly disclosed prior to confirming your booking.
          </p>
        </details>
        <details class="faq">
          <summary>How quickly will I receive my test reports in {name}?</summary>
          <p>
            Routine investigations such as Complete Blood Count, Blood Sugar, HbA1c, Thyroid TFT, and Urine Routine are reported on the same day within 4 to 8 hours via WhatsApp PDF and email.
          </p>
        </details>
        <details class="faq">
          <summary>What preparation is needed before a fasting blood test?</summary>
          <p>
            For tests requiring fasting (such as Fasting Blood Sugar or Lipid Profile), maintain an overnight fast of 8 to 12 hours. Plain water is permitted, but avoid tea, coffee, milk, breakfast, or strenuous exercise until the sample is drawn.
          </p>
        </details>
      </div>
    </section>

    <section class="closing">
      <h2>Other Bengaluru Localities Covered by BJSL</h2>
      <p class="small">Explore our verified collection centres and doorstep phlebotomy coverage across Bengaluru:</p>
      <div class="pill-cloud">
        {other_locs_html}
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="wrap footergrid">
      <div>
        <strong>BHARATH JAN SEWA LABS</strong>
        <p>Affordable Blood Tests &amp; Routine Diagnostics in Bengaluru.</p>
        <p>Central Enquiries: <a href="tel:{PHONE}">{DISPLAY_PHONE}</a></p>
        <p>Email: <a href="mailto:contact@bharathjansewalabs.com">contact@bharathjansewalabs.com</a></p>
      </div>
      <div>
        <strong>Hyperlocal Coverage</strong>
        <p>South Bengaluru: Banashankari, Ittamadu, JP Nagar, Jayanagar, Subramanyapura</p>
        <p>West Bengaluru: Kengeri, Peenya, Rajajinagar, Basaveshwaranagar, RR Nagar</p>
        <p>Southeast &amp; Central: BTM Layout, HSR Layout, KR Market</p>
      </div>
      <div>
        <strong>Accreditation Notice</strong>
        <p>High-quality diagnostic testing at transparent, budget-friendly prices, with samples processed through verified NABL-accredited partner laboratories where applicable.</p>
        <small>&copy; 2026 Bharath Jan Sewa Labs. All rights reserved.</small>
      </div>
    </div>
  </footer>
</body>
</html>
"""
    return html

def generate_directory_index():
    canonical_url = f"{BASE_URL}/locations/"
    schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                "name": "Bengaluru Localities & Diagnostic Collection Coverage | Bharath Jan Sewa Labs",
                "url": canonical_url,
                "description": "Directory of 15 Bengaluru localities with verified collection centres and doorstep phlebotomy coverage for affordable blood tests."
            },
            {
                "@type": "ItemList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": i + 1,
                        "name": loc["name"],
                        "url": f"{BASE_URL}/locations/{loc['slug']}/"
                    }
                    for i, loc in enumerate(LOCALITIES)
                ]
            }
        ]
    }

    by_region = {}
    for loc in LOCALITIES:
        reg = loc["region"]
        if reg not in by_region:
            by_region[reg] = []
        by_region[reg].append(loc)

    sections_html = ""
    for reg, locs in by_region.items():
        cards_html = ""
        for loc in locs:
            pincodes_str = ", ".join(loc["pincodes"])
            type_text = "Verified Collection Centre" if loc["hasPhysicalCentre"] else "Doorstep Express Phlebotomy"
            badge_class = "verified" if loc["hasPhysicalCentre"] else "express"
            cards_html += f"""
            <article class="catalogcard">
              <span class="tag">{reg} Bengaluru</span>
              <h2><a href="/locations/{loc['slug']}/">{loc['name']}</a></h2>
              <span class="status-badge {badge_class}">{type_text}</span>
              <p class="small"><strong>Target PIN Codes:</strong> {pincodes_str}<br/>
              <strong>Anchor Hub:</strong> {loc['nearestHub']}<br/>
              <strong>Key Areas:</strong> {loc['landmarks']}</p>
              <div class="catalogfoot">
                <a class="btn ghost btn-sm" href="/locations/{loc['slug']}/">View Area Details &rarr;</a>
              </div>
            </article>
            """
        sections_html += f"""
        <section style="margin: 32px 0;">
          <h2>{reg} Bengaluru Localities</h2>
          <div class="catalog">
            {cards_html}
          </div>
        </section>
        """

    html = f"""<!doctype html>
<html lang="en-IN">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <meta name="robots" content="index,follow,max-image-preview:large"/>
  <title>Bengaluru Localities & Diagnostic Collection Directory | Bharath Jan Sewa Labs</title>
  <meta name="description" content="Find affordable blood tests and diagnostic collection near you across 15 Bengaluru localities. Banashankari, Kengeri, Peenya, JP Nagar, BTM, HSR & Central Bengaluru."/>
  <link rel="canonical" href="{canonical_url}"/>
  <meta property="og:type" content="website"/>
  <meta property="og:title" content="Bengaluru Localities & Diagnostic Collection Directory | Bharath Jan Sewa Labs"/>
  <meta property="og:description" content="Find affordable blood tests and diagnostic collection near you across 15 Bengaluru localities."/>
  <meta property="og:url" content="{canonical_url}"/>
  <meta name="theme-color" content="#143b70"/>
  <link rel="stylesheet" href="/tests/assets/site.css"/>
  <style>
    .status-badge {{ display: inline-block; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 4px; margin: 6px 0; }}
    .status-badge.verified {{ background: #e6f4ea; color: #137333; border: 1px solid #b7e1cd; }}
    .status-badge.express {{ background: #fef7e0; color: #b06000; border: 1px solid #fce8b2; }}
    .btn-sm {{ padding: 6px 12px; font-size: 12px; border-radius: 8px; }}
  </style>
  <script type="application/ld+json">
{json.dumps(schema, indent=2)}
  </script>
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>

  <header class="sitehead">
    <div class="wrap nav">
      <a class="brand" href="/" aria-label="Bharath Jan Sewa Labs home">
        <span class="drop">&#9679;</span>
        <span>
          <strong>BHARATH JAN SEWA LABS</strong>
          <small>Diagnostics with Dignity &bull; Affordable Diagnostic Testing</small>
        </span>
      </a>
      <nav aria-label="Main navigation">
        <a href="/">Home</a>
        <a href="/tests/">Test Prices</a>
        <a href="/locations/">Locations</a>
        <a href="/our-centres/">Centres</a>
        <a href="tel:{PHONE}">{DISPLAY_PHONE}</a>
      </nav>
    </div>
  </header>

  <main id="main" class="wrap">
    <div class="crumb"><a href="/">Home</a> / Bengaluru Locations Directory</div>

    <section class="hero dirhero">
      <span class="eyebrow">Hyperlocal Healthcare Access</span>
      <h1>Bengaluru Neighbourhood Collection Directory</h1>
      <p class="lead">
        Find transparent test prices and certified phlebotomy coverage across 15 key Bengaluru neighbourhoods. Check verified collection hubs, target PIN codes, and doorstep blood collection options.
      </p>
    </section>

    {sections_html}

    <section class="closing">
      <h2>Need a Test Anywhere in Bengaluru?</h2>
      <p>
        Even if your specific neighbourhood is not listed, our central phlebotomy coordination team serves all major Bengaluru zones. Call or WhatsApp our clinical support team to check doorstep sample collection availability today.
      </p>
      <div class="actions">
        <a class="btn mainbtn" href="tel:{PHONE}">Call {DISPLAY_PHONE}</a>
        <a class="btn ghost" href="https://wa.me/919805543143?text=Hello%20Bharath%20Jan%20Sewa%20Labs%2C%20please%20check%20home%20collection%20availability%20for%20my%20location." target="_blank" rel="noopener noreferrer">Check on WhatsApp</a>
        <a class="btn ghost" href="/tests/">View 66 Test Prices</a>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="wrap footergrid">
      <div>
        <strong>BHARATH JAN SEWA LABS</strong>
        <p>Affordable Blood Tests &amp; Routine Diagnostics in Bengaluru.</p>
        <p>Central Enquiries: <a href="tel:{PHONE}">{DISPLAY_PHONE}</a></p>
      </div>
      <div>
        <strong>Hyperlocal Coverage</strong>
        <p>South: Banashankari, Ittamadu, JP Nagar, Jayanagar, Subramanyapura</p>
        <p>West: Kengeri, Peenya, Rajajinagar, Basaveshwaranagar, RR Nagar</p>
        <p>Southeast &amp; Central: BTM Layout, HSR Layout, KR Market</p>
      </div>
      <div>
        <strong>Accreditation Notice</strong>
        <p>High-quality diagnostic testing at transparent, budget-friendly prices, with samples processed through verified NABL-accredited partner laboratories where applicable.</p>
        <small>&copy; 2026 Bharath Jan Sewa Labs. All rights reserved.</small>
      </div>
    </div>
  </footer>
</body>
</html>
"""
    return html

def main():
    base_loc_dir = os.path.join(os.getcwd(), "public", "locations")
    os.makedirs(base_loc_dir, exist_ok=True)

    # 1. Generate directory index
    index_html = generate_directory_index()
    index_path = os.path.join(base_loc_dir, "index.html")
    with open(index_path, "w", encoding="utf-8") as f:
        f.write(index_html)
    print(f"Generated: {index_path}")

    # 2. Generate 15 locality pages
    for loc in LOCALITIES:
        loc_dir = os.path.join(base_loc_dir, loc["slug"])
        os.makedirs(loc_dir, exist_ok=True)
        loc_html = generate_locality_page(loc)
        loc_path = os.path.join(loc_dir, "index.html")
        with open(loc_path, "w", encoding="utf-8") as f:
            f.write(loc_html)
        print(f"Generated: {loc_path}")

    print(f"Successfully generated directory index and {len(LOCALITIES)} locality pages.")

if __name__ == "__main__":
    main()
