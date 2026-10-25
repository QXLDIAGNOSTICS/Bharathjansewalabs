#!/usr/bin/env python3
"""Build 66 crawlable test pages, 1,056 linkable FAQs and a static price directory.
No external Python packages required. Upload site/tests/ and site/sitemap-tests.xml.
"""
from pathlib import Path
from html import escape as h
import csv, json, re, urllib.parse, xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parent
SITE = ROOT / 'site'
BASE = 'https://bharathjansewalabs.com'
PHONE = '919805543143'
DISPLAY_PHONE = '+91 98055 43143'
CENTRES_URL = BASE + '/our-centres/'
CONFIRM_PRICE = 'Offer from supplied price leaflet; please confirm availability and the final payable amount before booking.'

CATS = [ 'Haematology', 'Diabetes', 'Heart health', 'Kidney health', 'Liver health', 'Thyroid', 'Vitamins', 'Iron and anaemia', 'Inflammation', 'Bone and minerals', 'Allergy', 'Infection screening', 'Fever and infection', 'Coagulation', 'Pancreas', 'Enzymes', 'Muscle', 'Autoimmune', 'Infection and immunology', 'Hormones', 'Pregnancy and hormones', 'Tumour markers', 'Men\'s health', 'Urine and kidney', 'Cardiac markers', 'Liver and nutrition', 'Blood typing' ]

rows=[]
for lineno, line in enumerate((ROOT/'test_catalog.psv').read_text(encoding='utf-8').splitlines(), 1):
    fields=line.split('|')
    if len(fields)!=13:
        raise ValueError(f'Catalog line {lineno}: expected 13 fields, got {len(fields)}')
    num,title,slug,market,price,category,measure,why,fasting,sample,limitation,special,related=fields
    assert slug == re.sub('-+', '-', re.sub(r'[^a-z0-9-]+', '-', slug))
    rows.append(dict(num=int(num),name=title,slug=slug,market=int(market),price=int(price),category=category,measure=measure,why=why,fasting=fasting,sample=sample,limitation=limitation,special=special,related=related))
assert len(rows)==66 and len({x['slug'] for x in rows}) == 66
assert [x['num'] for x in rows] == list(range(1, 67))

centres = ['Sanjaynagar', 'Ittamadu (Banashankari)', 'Peenya', 'KR Market', 'Srirampura', 'Subramanyapura', 'Kengeri', 'Jaraganahalli (JP Nagar)', 'VV Puram']


def faqs(t):
    n=t['name']; cost=t['price']; market=t['market']
    sensitive=t['slug'] in {'hiv-fourth-generation-test','vdrl-test'}
    sample_sentence = f"The listed sample is {t['sample'].lower()}. The collection team will explain the method, required container and identification checks."
    return [
        (f'What is the {n} test?', f'{t["measure"]} This is general patient information; your clinician determines how the result applies to you.'),
        (f'Why would a doctor order a {n} test?', t['why'] + ' The decision depends on your symptoms, history and examination.'),
        (f'How much does the {n} test cost in Bengaluru?', f'The supplied Bharath Jan Sewa Labs leaflet lists an offer price of ₹{cost:,} for {n}. {CONFIRM_PRICE}'),
        (f'How does the ₹{cost:,} offer compare with the leaflet reference price?', f'The leaflet shows ₹{market:,} as a comparison/reference price, alongside the ₹{cost:,} offer. That reference is from the promotional leaflet, not an independently verified current city-wide market average; other laboratory prices and inclusions vary.'),
        (f'What type of sample is collected for {n}?', sample_sentence),
        (f'Do I need to fast before {n}?', t['fasting'] + ' When booking multiple tests, follow instructions for the test with the strictest preparation requirements.'),
        (f'How should I prepare or time my {n} test?', f'{t["special"]} Do not stop prescribed medicines on your own. Tell your clinician or the laboratory about medicines and relevant supplements.'),
        (f'What do the {n} results tell me?', f'{t["measure"]} Results need to be assessed using the laboratory method-specific reference interval, your history and the reason for testing.'),
        (f'What could make a {n} result misleading?', t['limitation'] + ' Please inform your clinician of recent illness, medicines or unusual sample circumstances.'),
        (f'What is an important limitation of the {n} test?', t['special'] + ' A result should not be interpreted as a complete health assessment in isolation.'),
        (f'Which other investigations can complement {n}?', t['related'] + ' Additional testing should be selected by a qualified clinician rather than ordered only from a price list.'),
        (f'Can the {n} test alone confirm or rule out a condition?', f'Not necessarily. {t["limitation"]} A clinician may use other tests, repeat measurements or examination depending on the situation.'),
        (f'When will my {n} report be ready?', 'Turnaround depends on collection time, processing laboratory, and whether verification or repeat testing is needed. Ask Bharath Jan Sewa Labs for the current estimated reporting time when booking; no fixed turnaround is promised here.'),
        (f'Can I request home sample collection for {n} in Bengaluru?', 'Ask the booking team whether home collection is suitable for this particular test and available at your pincode. Some tests require careful timing or rapid transport, so centre collection or urgent hospital testing may be more appropriate.'),
        (f'Where can I book {n} and which laboratory processes it?', f'Bharath Jan Sewa Labs lists collection centres in Bengaluru, including {", ".join(centres[:4])} and other locations. Its website says samples are processed at NABL-accredited laboratories; ask for the performing laboratory and the specific test\'s current accredited scope. Collection centres are not automatically individually NABL-accredited.'),
        (f'How can I book the {n} test at ₹{cost:,}?', 'Call ' + DISPLAY_PHONE + ' or use the booking link on this page. Tell the team the required test, preferred Bengaluru centre or home collection area, and your preferred date. Confirm the currently payable rate, test method, any collection charges and reporting time before proceeding.'),
    ]


def js(obj):
    # Escape angle brackets to prevent untrusted names from breaking out of JSON script tags.
    return json.dumps(obj, ensure_ascii=False, separators=(',', ':')).replace('<','\\u003c')


def wa_link(t):
    if t and t['slug'] in {'hiv-fourth-generation-test','vdrl-test'}:
        msg='Hello Bharath Jan Sewa Labs, I want to enquire privately about booking a laboratory test in Bengaluru. Please contact me.'
    elif t:
        msg=f'Hello Bharath Jan Sewa Labs, I would like to book {t["name"]} (leaflet offer ₹{t["price"]}) in Bengaluru. Please confirm final price, preparation and collection availability.'
    else:
        msg='Hello Bharath Jan Sewa Labs, please help me book an affordable diagnostic test in Bengaluru.'
    return f'https://wa.me/{PHONE}?text={urllib.parse.quote(msg)}'


def head(title, description, canonical, graph=None):
    title=h(title); desc=h(description, quote=True); url=h(canonical, quote=True)
    structured = f'<script type="application/ld+json">{js(graph)}</script>' if graph else ''
    return f'''<!doctype html><html lang="en-IN"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<meta name="robots" content="index,follow,max-image-preview:large"/>
<title>{title}</title><meta name="description" content="{desc}"/>
<link rel="canonical" href="{url}"/><meta property="og:type" content="website"/>
<meta property="og:title" content="{title}"/><meta property="og:description" content="{desc}"/>
<meta property="og:url" content="{url}"/><meta name="theme-color" content="#bb1827"/>
<link rel="stylesheet" href="/tests/assets/site.css"/>{structured}</head><body>
<a class="skip" href="#main">Skip to content</a>
<header class="sitehead"><div class="wrap nav"><a class="brand" href="/" aria-label="Bharath Jan Sewa Labs home"><span class="drop">●</span><span><strong>BHARATH JAN SEWA LABS</strong><small>Affordable • Accessible • Accurate</small></span></a><nav aria-label="Main navigation"><a href="/tests/">Test prices</a><a href="/our-centres/">Our centres</a><a href="tel:+{PHONE}">{DISPLAY_PHONE}</a></nav></div></header>'''


def footer():
    return f'''<footer class="footer"><div class="wrap"><div class="footergrid"><div><strong>Bharath Jan Sewa Labs</strong><p>Affordable diagnostic services in Bengaluru.</p><p>Medical information is educational, not personal medical advice.</p></div><div><strong>Contact</strong><p><a href="tel:+{PHONE}">{DISPLAY_PHONE}</a></p><p><a href="{CENTRES_URL}">Collection centres &amp; directions</a></p></div><div><strong>Important</strong><p>Promotional leaflet prices require confirmation. Verify the performing lab and the relevant NABL scope where applicable.</p></div></div><small>© Bharath Jan Sewa Labs. Page content should be reviewed by the lab medical team before production publication.</small></div></footer></body></html>'''


def schema(t, faq):
    url=f'{BASE}/tests/{t["slug"]}/'
    title=t['name']; desc=f'{title} in Bengaluru. Leaflet offer ₹{t["price"]}. {t["measure"]} Confirm price and availability before booking.'
    return {'@context':'https://schema.org','@graph':[
        {'@type':'WebPage','@id':url+'#webpage','url':url,'name':f'{title} Test Price in Bengaluru','description':desc,'about':{'@id':url+'#medicaltest'},'inLanguage':'en-IN'},
        {'@type':'MedicalTest','@id':url+'#medicaltest','name':title,'description':t['measure']},
        {'@type':'Service','@id':url+'#service','name':f'{title} sample collection and testing','serviceType':'Medical laboratory testing','description':desc,
         'provider':{'@type':'Organization','name':'Bharath Jan Sewa Labs','url':BASE,'telephone':'+'+PHONE},
         'areaServed':{'@type':'City','name':'Bengaluru'},'offers':{'@type':'Offer','price':str(t['price']),'priceCurrency':'INR','url':url,'description':'Advertised price from supplied promotional leaflet; final rate and eligibility subject to confirmation.'}},
        {'@type':'BreadcrumbList','itemListElement':[
          {'@type':'ListItem','position':1,'name':'Home','item':BASE+'/'},
          {'@type':'ListItem','position':2,'name':'Test Prices','item':BASE+'/tests/'},
          {'@type':'ListItem','position':3,'name':title,'item':url}]},
        {'@type':'FAQPage','mainEntity':[{'@type':'Question','name':q,'acceptedAnswer':{'@type':'Answer','text':a}} for q,a in faq]}
    ]}


def render_test(t):
    url=f'{BASE}/tests/{t["slug"]}/'; name=t['name']; fq=faqs(t)
    title=f'{name} Test ₹{t["price"]} in Bengaluru | Bharath Jan Sewa Labs'
    descr=f'Find {name} test offer price ₹{t["price"]} in Bengaluru. See sample, fasting guidance, 16 FAQs and book by phone or WhatsApp. Confirm final price.'
    text=head(title,descr,url,schema(t,fq))
    text += '<main id="main" class="wrap">'
    text += f'<div class="crumb"><a href="/">Home</a> / <a href="/tests/">Tests &amp; prices</a> / {h(name)}</div>'
    text += '<div class="hero-grid"><section class="hero">'
    text += f'<span class="eyebrow">{h(t["category"])} · Bengaluru</span><h1>{h(name)} Test in Bengaluru</h1><p class="lead">{h(t["measure"])} {h(t["why"])}</p>'
    text += f'<p><span class="pill">Affordable laboratory testing</span> <span class="pill">16 patient FAQs</span></p></section>'
    text += f'<aside class="pricecard" aria-label="Price and booking"><div class="muted">Leaflet offer price</div><div class="price">₹{t["price"]:,}</div><div class="compare">Leaflet comparison price: <s>₹{t["market"]:,}</s></div><p class="small">{h(CONFIRM_PRICE)}</p><a class="btn mainbtn" href="{h(wa_link(t),quote=True)}" target="_blank" rel="noopener noreferrer">Enquire / Book on WhatsApp</a><a class="btn ghost" href="tel:+{PHONE}">Call {DISPLAY_PHONE}</a><small>No online payment is collected on this page.</small></aside></div>'
    text += '<section class="info-grid" aria-label="Quick facts">'
    items=[('Price',f'₹{t["price"]:,} (leaflet offer)'),('Specimen',t['sample']),('Fasting',t['fasting']),('Result time','Confirm when booking')]
    for k,v in items:
        text += f'<div class="infobox"><div class="muted">{h(k)}</div><strong>{h(v)}</strong></div>'
    text += '</section>'
    text += f'<section class="content"><h2>About the {h(name)} test</h2><p>{h(t["measure"])} {h(t["why"])}</p><h3>Before your sample</h3><p>{h(t["fasting"])} {h(t["special"])}</p><h3>Understanding the result</h3><p>{h(t["limitation"])} {h(t["related"])}</p><p class="disclaimer"><strong>Clinical safety:</strong> A laboratory test is one part of clinical assessment. Do not delay urgent medical attention for chest pain, breathing difficulty, severe bleeding or serious illness.</p></section>'
    text += f'<section class="faqarea"><h2>16 FAQs about {h(name)}</h2><p class="muted">Choose a question to jump directly to its answer. These links can also be shared individually.</p>'
    text += '<nav class="faqnav" aria-label="Questions on this page"><ol>'
    for i,(q,a) in enumerate(fq,1):
        text+=f'<li><a href="#faq-{i:02}">{h(q)}</a></li>'
    text+='</ol></nav><div class="faqbody">'
    for i,(q,a) in enumerate(fq,1):
        text+=f'<details class="faq" id="faq-{i:02}"><summary>{h(q)}</summary><p>{h(a)}</p><a class="anchor" href="#faq-{i:02}" aria-label="Share question {i}">Link to this question ↗</a></details>'
    text+='</div></section>'
    text += '''<script>(function(){function showLinkedFaq(){var id=decodeURIComponent(location.hash.slice(1));if(/^faq-[0-9]{2}$/.test(id)){var item=document.getElementById(id);if(item&&item.tagName==='DETAILS'){item.open=true;}}}window.addEventListener('hashchange',showLinkedFaq);showLinkedFaq();})();</script>'''
    neighbours=[x for x in rows if x['category']==t['category'] and x['slug'] !=t['slug']][:4]
    if len(neighbours)<3: neighbours += [x for x in rows if x['slug']!=t['slug'] and x not in neighbours][:4-len(neighbours)]
    text+='<section class="related"><h2>Related affordable diagnostic tests</h2><div class="testcards">'
    for r in neighbours:
        text+=f'<a class="testcard" href="/tests/{h(r["slug"])}/"><strong>{h(r["name"])}</strong><span>₹{r["price"]:,} →</span></a>'
    text+='</div></section>'
    text+=f'<section class="closing"><h2>Book {h(name)} in Bengaluru</h2><p>Request a centre appointment or ask whether home sample collection is suitable for this test. Please confirm the current leaflet offer, sample instructions and reporting time.</p><div class="actions"><a class="btn mainbtn" href="{h(wa_link(t),quote=True)}" target="_blank" rel="noopener noreferrer">Request booking</a><a class="btn ghost" href="{CENTRES_URL}">Choose a collection centre</a></div></section>'
    text+='</main>'+footer()
    folder=SITE/'tests'/t['slug'];folder.mkdir(parents=True,exist_ok=True)
    (folder/'index.html').write_text(text,encoding='utf-8')
    return fq


def render_directory():
    url=BASE+'/tests/'
    graph={'@context':'https://schema.org','@graph':[
        {'@type':'CollectionPage','name':'Affordable blood test prices in Bengaluru','url':url,'description':'See 66 advertised laboratory test prices and book in Bengaluru.'},
        {'@type':'ItemList','itemListElement':[{'@type':'ListItem','position':t['num'],'name':t['name'],'url':f'{url}{t["slug"]}/'} for t in rows]},
    ]}
    text=head('66 Affordable Blood Test Prices in Bengaluru | Bharath Jan Sewa Labs','Compare 66 leaflet offer prices in Bengaluru. Search HbA1c ₹260, blood glucose ₹20, TSH ₹100 and more, read 16 FAQs per test and enquire to book.',url,graph)
    text+='<main id="main" class="wrap"><div class="crumb"><a href="/">Home</a> / Tests &amp; prices</div><section class="hero dirhero"><span class="eyebrow">Affordable, accessible diagnostic services</span><h1>66 diagnostic test prices in Bengaluru</h1><p class="lead">Search test names, view offer prices from our leaflet, learn how to prepare, and book at a convenient collection centre or ask about home collection.</p><div class="searchwrap"><label for="search">Search tests or conditions</label><input type="search" id="search" placeholder="Search HbA1c, thyroid, CBC, kidney, vitamin D…" autocomplete="off"/></div><p class="small">Prices are from the supplied promotional leaflet and require confirmation before booking. Comparison prices are from the leaflet, not a verified Bengaluru-wide survey.</p></section>'
    text+='<div class="catalogmeta"><strong id="count">Showing all 66 tests</strong><a class="btn ghost" href="'+h(wa_link(None),quote=True)+'" target="_blank" rel="noopener noreferrer">Ask about booking</a></div><section class="catalog" id="catalog" aria-label="All tests">'
    for t in rows:
        text+=f'<article class="catalogcard" data-search="{h((t["name"]+" "+t["category"]+" "+t["slug"]).lower(),quote=True)}"><span class="tag">{h(t["category"])}</span><h2><a href="/tests/{h(t["slug"])}/">{h(t["name"])}</a></h2><p class="small">{h(t["measure"])}</p><div class="catalogfoot"><div><strong>₹{t["price"]:,}</strong><span class="muted">Leaflet ref. ₹{t["market"]:,}</span></div><a href="/tests/{h(t["slug"])}/" aria-label="View price and FAQs for {h(t["name"],quote=True)}">Details &amp; 16 FAQs →</a></div></article>'
    text+='</section><section class="content"><h2>Where are the Bengaluru collection centres?</h2><p>See verified centre addresses and directions on the <a href="/our-centres/">Bharath Jan Sewa Labs centres page</a>. Confirm test availability, performing laboratory and any home collection charge before travelling.</p><h2>Before using this price list</h2><p>Each test page explains why the investigation may be requested and what preparation or limitations matter. These descriptions support informed discussions with your healthcare professional; they do not replace individual medical advice.</p></section></main>'
    text += '''<script>const input=document.querySelector('#search'), cards=[...document.querySelectorAll('.catalogcard')], count=document.querySelector('#count'); input.addEventListener('input',()=>{ const q=input.value.trim().toLowerCase(); let shown=0; for(const c of cards){ const yes=c.dataset.search.includes(q); c.hidden=!yes;if(yes)shown++;} count.textContent=`Showing ${shown} of ${cards.length} tests`;});</script>'''+footer()
    folder=SITE/'tests';folder.mkdir(parents=True,exist_ok=True)
    (folder/'index.html').write_text(text,encoding='utf-8')


def save_css():
    css=r'''*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#f8fafc;color:#1d2734;font:16px/1.6 system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif}a{color:#a91a2b;text-decoration:none}a:hover{text-decoration:underline}a:focus-visible,button:focus-visible,input:focus-visible,summary:focus-visible{outline:3px solid #ffc94d;outline-offset:3px}h1,h2,h3{color:#162232;line-height:1.22}h1{font-size:clamp(2rem,4vw,3.1rem);margin:.6rem 0 1rem}h2{font-size:clamp(1.35rem,2.4vw,1.85rem);margin:0 0 1rem}h3{font-size:1.16rem}.wrap{width:min(1130px,calc(100% - 32px));margin:auto}.sitehead{background:#fff;border-bottom:1px solid #e7edf2}.nav{min-height:76px;display:flex;align-items:center;justify-content:space-between;gap:20px}.brand{display:flex;align-items:center;gap:12px;color:#182332}.brand:hover{text-decoration:none}.brand span:last-child{display:flex;flex-direction:column;line-height:1.3;letter-spacing:.4px}.brand small{font-size:11px;color:#687482;font-weight:600}.drop{font-size:28px;color:#d32832}nav{display:flex;flex-wrap:wrap;gap:20px;align-items:center}nav a{font-size:14px;font-weight:700}.skip{position:absolute;transform:translateY(-180%);background:#fff;z-index:4;padding:8px}.skip:focus{transform:none}.crumb{font-size:13px;color:#667889;padding:24px 0}.hero-grid{display:grid;grid-template-columns:1.5fr .85fr;gap:22px}.hero,.pricecard,.content,.faqarea,.related,.closing,.infobox,.catalogcard{background:#fff;border:1px solid #e3e9f0;border-radius:17px}.hero{padding:clamp(20px,3vw,42px);background:linear-gradient(120deg,#fff 55%,#fff6f7)}.eyebrow{color:#b0192d;text-transform:uppercase;letter-spacing:.07em;font-weight:800;font-size:12px}.lead{color:#526173;font-size:18px;max-width:760px}.pill,.tag{display:inline-block;border-radius:100px;padding:4px 10px;background:#fff0f2;color:#a91a2b;font-weight:700;font-size:12px;margin-right:4px}.pricecard{padding:28px;box-shadow:0 8px 34px #132c4510}.price{font-weight:850;font-size:54px;color:#a3182e;line-height:1.2;margin:6px 0}.compare{font-size:14px;color:#626e7d}.small{font-size:13px;color:#687584}.muted{color:#697987;font-size:13px}.btn{display:inline-block;padding:12px 18px;border-radius:11px;font-weight:800;font-size:14px;text-align:center;border:1px solid #b21b2a;cursor:pointer}.mainbtn{background:#ba192d;color:#fff}.mainbtn:hover{background:#931326;text-decoration:none}.ghost{color:#ad172a;background:#fff}.ghost:hover{background:#fff4f4;text-decoration:none}.pricecard .btn{display:block;margin:11px 0}.pricecard small{color:#697987}.info-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin:22px 0}.infobox{padding:18px}.infobox strong{display:block;margin-top:5px;font-size:14px}.content,.faqarea,.related,.closing{padding:clamp(22px,3vw,34px);margin-bottom:22px}.content p{max-width:850px}.disclaimer{background:#fff9ed;border-left:4px solid #dfa527;padding:12px 16px}.faqnav{display:block;border-radius:12px;padding:4px 20px 4px 6px;background:#f3f7fb}.faqnav ol{display:grid;grid-template-columns:1fr 1fr;gap:8px 24px;padding-left:35px;font-size:14px}.faqnav a{text-decoration:underline;text-decoration-color:#e8bac1;text-underline-offset:3px}.faqbody{margin-top:16px}.faq{background:#fff;border-bottom:1px solid #e5eaf0;padding:2px 0;scroll-margin-top:20px}.faq:target{background:#fff8ea;border-radius:8px;padding-inline:14px}.faq summary{list-style-position:outside;cursor:pointer;padding:14px 5px;font-weight:750}.faq p{color:#3f4f61;margin:0 14px 8px}.anchor{display:inline-block;font-size:12px;margin:0 14px 18px}.testcards{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}.testcard{display:flex;justify-content:space-between;align-items:center;gap:12px;border:1px solid #e2e8ee;border-radius:12px;padding:14px}.testcard strong{color:#243141;font-size:14px}.testcard span{white-space:nowrap;font-weight:800}.closing{background:#fff7f8}.actions{display:flex;gap:10px;flex-wrap:wrap}.dirhero{background:linear-gradient(110deg,#fff,#ffedef);margin-bottom:24px}.searchwrap{max-width:600px;margin-top:18px}.searchwrap label{display:block;font-weight:800;font-size:14px;margin-bottom:7px}.searchwrap input{width:100%;border:1px solid #cbd5e0;padding:15px;border-radius:11px;font-size:16px;background:#fff}.catalogmeta{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:16px}.catalog{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:15px;margin-bottom:25px}.catalogcard{padding:20px;display:flex;flex-direction:column}.catalogcard[hidden]{display:none}.catalogcard .tag{align-self:flex-start}.catalogcard h2{font-size:17px;margin:14px 0 7px}.catalogcard h2 a{color:#1d2c3a}.catalogcard p{flex:1;margin-bottom:22px}.catalogfoot{display:flex;justify-content:space-between;gap:10px;align-items:flex-end}.catalogfoot strong{font-size:25px;color:#b11c2c}.catalogfoot span{display:block;font-size:11px}.catalogfoot>a{font-size:12px;font-weight:800;text-align:right}.footer{background:#1c2531;color:#e5eaf0;margin-top:45px;padding:32px 0}.footer a{color:#fff}.footergrid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}.footer p,.footer small{color:#c4cbd4;font-size:13px}.footer small{display:block;border-top:1px solid #405066;padding-top:15px;margin-top:16px}@media(max-width:850px){.hero-grid{grid-template-columns:1fr}.info-grid{grid-template-columns:repeat(2,1fr)}.catalog{grid-template-columns:repeat(2,minmax(0,1fr))}.faqnav ol{grid-template-columns:1fr}}@media(max-width:540px){.nav{align-items:flex-start;padding:15px 0;flex-direction:column}.nav nav{gap:15px}.brand strong{font-size:13px}.hero,.pricecard,.content,.faqarea,.related,.closing{padding:20px}.info-grid,.catalog,.testcards,.footergrid{grid-template-columns:1fr}.price{font-size:46px}.catalogmeta{align-items:flex-start;flex-direction:column}.catalogfoot strong{font-size:24px}}'''
    folder=SITE/'tests'/'assets';folder.mkdir(parents=True,exist_ok=True)
    (folder/'site.css').write_text(css,encoding='utf-8')


def export():
    with (ROOT/'TEST_LINKS_AND_PRICES.csv').open('w',newline='',encoding='utf-8-sig') as f:
        w=csv.writer(f);w.writerow(['S.No.','Test name','Category','Leaflet offer INR','Leaflet comparison INR','Canonical URL','WhatsApp enquiry URL'])
        for t in rows:w.writerow([t['num'],t['name'],t['category'],t['price'],t['market'],f'{BASE}/tests/{t["slug"]}/',wa_link(t)])
    with (ROOT/'ALL_1056_FAQS.csv').open('w',newline='',encoding='utf-8-sig') as f:
        w=csv.writer(f);w.writerow(['Test number','Test name','Offer price INR','Question number','Question','Answer','Deep link'])
        for t in rows:
            for i,(q,a) in enumerate(faqs(t),1):w.writerow([t['num'],t['name'],t['price'],i,q,a,f'{BASE}/tests/{t["slug"]}/#faq-{i:02}'])
    (ROOT/'test_catalog.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2),encoding='utf-8')
    urls=[BASE+'/tests/']+[f'{BASE}/tests/{t["slug"]}/' for t in rows]
    ns='http://www.sitemaps.org/schemas/sitemap/0.9'
    ET.register_namespace('',ns);root=ET.Element('{'+ns+'}urlset')
    for u in urls:ET.SubElement(ET.SubElement(root,'{'+ns+'}url'),'{'+ns+'}loc').text=u
    ET.ElementTree(root).write(SITE/'sitemap-tests.xml',encoding='utf-8',xml_declaration=True)
    (ROOT/'robots_append.txt').write_text('# ADD THIS LINE TO YOUR EXISTING robots.txt; do not overwrite the existing file.\nSitemap: '+BASE+'/sitemap-tests.xml\n',encoding='utf-8')
    (ROOT/'INTERNAL_LINKS_FOR_DEVELOPER.html').write_text('<section aria-label="Affordable lab tests"><h2>Affordable diagnostic tests in Bengaluru</h2><p><a href="/tests/">View all 66 test prices</a></p><ul>\n'+''.join(f'<li><a href="/tests/{h(t["slug"])}/">{h(t["name"])} — ₹{t["price"]:,}</a></li>\n' for t in rows)+'</ul></section>\n',encoding='utf-8')
    print('Generated:',len(rows),'separate pages,',sum(len(faqs(t)) for t in rows),'FAQ Q/A entries')


if __name__ == '__main__':
    save_css(); render_directory()
    for t in rows:
        assert len(faqs(t)) == 16
        render_test(t)
    export()
