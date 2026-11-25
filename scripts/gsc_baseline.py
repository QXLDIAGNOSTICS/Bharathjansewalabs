#!/usr/bin/env python3
"""First-party GSC 28-day comparison for BJSL. Never estimates missing rankings.
Requirements: google-auth, requests; service account added as Search Console property user.
Credentials outside repo. End date deliberately excludes last 3 UTC calendar days.
"""
import os, csv, json, argparse, datetime as dt, re
from pathlib import Path
from urllib.parse import quote
import requests

API = 'https://www.googleapis.com/webmasters/v3/sites/{}/searchAnalytics/query'
BRAND = re.compile(r'\b(bharath\s*jan\s*sewa|bjsl)\b', re.I)
TARGET = re.compile(r'\b(cbc|blood sugar|glucose|fasting|hba1c|a1c|tsh|thyroid|creatinine|urine|lipid|lft|blood test|lab test|diagnostic)\b', re.I)

def get_dates(today=None):
    today = today or dt.date.today()
    end = today - dt.timedelta(days=3)
    start = end - dt.timedelta(days=27)
    previous_end = start - dt.timedelta(days=1)
    previous_start = previous_end - dt.timedelta(days=27)
    return (start, end), (previous_start, previous_end)

def fetch(session, property_url, start, end, dimensions, country='ind', max_rows=50000):
    url = API.format(quote(property_url, safe=''))
    offset, out = 0, []
    while offset < max_rows:
        size = min(25000, max_rows-offset)
        req = {'startDate':start.isoformat(),'endDate':end.isoformat(),
               'dimensions':dimensions, 'rowLimit':size,'startRow':offset,
               'type':'web','dataState':'final'}
        if country:
            req['dimensionFilterGroups'] = [{'groupType':'and','filters':[
                {'dimension':'country','operator':'equals','expression':country}]}]
        response = session.post(url, json=req, timeout=45)
        response.raise_for_status()
        batch = response.json().get('rows', [])
        out.extend(batch)
        if len(batch)<size: break
        offset += len(batch)
    return out

def as_map(rows):
    return {tuple(x['keys']):x for x in rows}

def weighted_position(row):
    return row.get('position', '')

def save_comparison(path, current, previous, dims):
    now, old = as_map(current), as_map(previous)
    headers = dims + ['clicks','previous_clicks','click_delta','impressions','previous_impressions',
                      'impression_delta','ctr_percent','previous_ctr_percent','position','previous_position',
                      'position_improvement','segment']
    records = []
    for key in sorted(set(now)|set(old)):
        n, p = now.get(key, {}), old.get(key, {})
        nc, pc = n.get('clicks',0),p.get('clicks',0)
        ni, pi = n.get('impressions',0),p.get('impressions',0)
        np, pp = n.get('position'),p.get('position')
        query = key[0].lower() if dims and dims[0] == 'query' else ''
        group = ('branded' if BRAND.search(query) else
                 'nonbrand_priority' if TARGET.search(query) else 'nonbrand_other')
        records.append(list(key)+[nc,pc,nc-pc,ni,pi,ni-pi,
                        round(100*n.get('ctr',0),2),round(100*p.get('ctr',0),2),
                        round(np,2) if np is not None else '',
                        round(pp,2) if pp is not None else '',
                        round(pp-np,2) if np is not None and pp is not None else '',group])
    records.sort(key=lambda x:(-x[len(dims)+3],str(x[0])))
    with open(path,'w',newline='',encoding='utf-8') as f:
        writer=csv.writer(f);writer.writerow(headers);writer.writerows(records)
    return records

def main():
    ap = argparse.ArgumentParser();ap.add_argument('--out',default='reports');ap.add_argument('--country',default='ind')
    ap.add_argument('--today',default=None,help='Override system date YYYY-MM-DD (tests only)')
    args=ap.parse_args();site=os.environ.get('GSC_SITE_URL')
    if not site:
        raise SystemExit('Missing GSC_SITE_URL. Add actual verified property, e.g. sc-domain:bharathjansewalabs.com')
    from google.auth import default
    from google.auth.transport.requests import AuthorizedSession
    credentials,_=default(scopes=['https://www.googleapis.com/auth/webmasters.readonly'])
    session=AuthorizedSession(credentials)
    out=Path(args.out);out.mkdir(parents=True,exist_ok=True)
    windows = get_dates(dt.date.fromisoformat(args.today) if args.today else None)
    dims_sets={'query':['query'],'page':['page'],'query_page':['query','page'],
               'device':['device'],'date':['date']}
    summary={'site':site,'country':args.country,'requested_on':dt.datetime.now(dt.timezone.utc).isoformat(),
             'current_period':[str(d) for d in windows[0]],'previous_period':[str(d) for d in windows[1]],
             'warnings':['GSC is sampled/anonymises rare queries; missing query does not mean 0 rank.',
             'Position is average of impressions, not a fixed Bengaluru geo rank.',
             'Generative AI feature reporting may require separate Search Console UI export.']}
    for name,dims in dims_sets.items():
        a=fetch(session,site,*windows[0],dims,country=args.country)
        b=fetch(session,site,*windows[1],dims,country=args.country)
        save_comparison(out/f'gsc_{name}_compare.csv',a,b,dims)
        summary[name]={'current_rows':len(a),'previous_rows':len(b)}
    for label,dates in zip(('current','previous'),windows):
        rows=fetch(session,site,*dates,['query'],country=args.country)
        # Aggregate across returned rows weighted by impression count; still subject to anonymisation.
        total_clicks=sum(int(r.get('clicks',0)) for r in rows)
        total_impressions=sum(int(r.get('impressions',0)) for r in rows)
        summary[label+'_visible_query_subset']={'clicks':total_clicks,'impressions':total_impressions,
          'weighted_position':round(sum(r.get('position',0)*r.get('impressions',0) for r in rows)/total_impressions,2)
             if total_impressions else None}
    (out/'gsc_summary.json').write_text(json.dumps(summary,indent=2),encoding='utf-8')
    print(json.dumps(summary,indent=2))

if __name__=='__main__': main()
