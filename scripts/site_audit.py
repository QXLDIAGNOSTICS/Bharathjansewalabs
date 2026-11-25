#!/usr/bin/env python3
"""Inspect canonical/indexability/HTML errors for all published BJSL sitemaps.
Run from network-enabled developer CI. Robots-aware use requires permission on target domain.
"""
import argparse,csv,json,concurrent.futures,requests,re,sys
from pathlib import Path
from urllib.parse import urljoin,urlparse
from bs4 import BeautifulSoup
from xml.etree import ElementTree
try:
    import lxml  # noqa: F401
    PARSER='lxml'
except ImportError:  # fall back to the stdlib parser when lxml is not installed
    PARSER='html.parser'

SITEMAPS=['/sitemap.xml','/sitemap-tests.xml','/sitemap-locations.xml']
ERR_TXT=['Something went wrong','We encountered an issue rendering this section']

def extract_sitemap(xml):
    root=ElementTree.fromstring(xml)
    locs=[e.text.strip() for e in root.iter() if e.tag.endswith('loc') and e.text]
    sitemaps=[u for u in locs if u.endswith('.xml')]
    return locs, sitemaps

def check(url):
    try:
        resp=requests.get(url,timeout=16,headers={'User-Agent':'BJSL-Owner-SEO-QA/1.0 (+technical audit)'})
        soup=BeautifulSoup(resp.text,PARSER);c=soup.select_one('link[rel="canonical"]')
        actual=(c.get('href','') if c else '').strip()
        title=soup.title.get_text(' ',strip=True) if soup.title else ''
        h1=[a.get_text(' ',strip=True) for a in soup.find_all('h1')]
        robots=','.join(x.get('content','') for x in soup.select('meta[name="robots"]'))
        body=soup.get_text(' ',strip=True)
        problems=[]
        if resp.status_code!=200:problems.append('HTTP_'+str(resp.status_code))
        if actual!=resp.url:problems.append('CANONICAL_NOT_FINAL_URL')
        if not title:problems.append('MISSING_TITLE')
        if not h1:problems.append('MISSING_H1')
        if re.search('noindex',robots,re.I):problems.append('NOINDEX')
        if any(s in body for s in ERR_TXT):problems.append('RENDER_ERROR')
        if len(body)<220:problems.append('SHORT_OR_MISSING_TEXT')
        return {'url':url,'final_url':resp.url,'status':resp.status_code,
                'canonical':actual,'title':title,'h1_count':len(h1),'body_chars':len(body),
                'robots':robots,'issues':';'.join(problems)}
    except Exception as e:
        return {'url':url,'final_url':'','status':'ERROR','canonical':'','title':'',
                'h1_count':'','body_chars':'','robots':'','issues':type(e).__name__+': '+str(e)[:160]}

def main():
    ap=argparse.ArgumentParser();ap.add_argument('--origin',default='https://bharathjansewalabs.com')
    ap.add_argument('--out',default='reports/live_audit.csv');ap.add_argument('--workers',type=int,default=6)
    args=ap.parse_args();origin=args.origin.rstrip('/');u=urlparse(origin)
    if u.scheme!='https' or u.hostname not in {'bharathjansewalabs.com','www.bharathjansewalabs.com'}:
        raise SystemExit('Audit restricted to the approved BJSL HTTPS domains.')
    urls=set([origin+'/',origin+'/packages/',origin+'/quality/',origin+'/affordable-testing-assistance/'])
    errors=[]
    for path in SITEMAPS:
        address=origin+path
        try:
            r=requests.get(address,timeout=16);r.raise_for_status()
            locs,_=extract_sitemap(r.content)
            urls.update(x for x in locs if urlparse(x).hostname in {u.hostname,'bharathjansewalabs.com'})
        except Exception as e:errors.append(f'{path}: {e}')
    with concurrent.futures.ThreadPoolExecutor(max_workers=max(1,min(args.workers,8))) as pool:
        rows=list(pool.map(check,sorted(urls)))
    path=Path(args.out);path.parent.mkdir(parents=True,exist_ok=True)
    keys=['url','final_url','status','canonical','title','h1_count','body_chars','robots','issues']
    with open(path,'w',newline='',encoding='utf-8') as f:
        w=csv.DictWriter(f,fieldnames=keys);w.writeheader();w.writerows(rows)
    summary={'checked':len(rows),'issue_pages':sum(bool(x['issues']) for x in rows),
             'sitemap_errors':errors,'output':str(path),'note':'This is page HTML validation; GSC is required to verify Google-selected canonicals/index status.'}
    (path.parent/'live_audit_summary.json').write_text(json.dumps(summary,indent=2))
    print(json.dumps(summary,indent=2));return 1 if errors else 0
if __name__=='__main__':sys.exit(main())
