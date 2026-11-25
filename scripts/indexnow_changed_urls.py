#!/usr/bin/env python3
"""Bing/IndexNow push for CHANGED public canonical URLs only; dry-run by default.
Google does not use IndexNow. Publish and verify https://bharathjansewalabs.com/{key}.txt before --send.
"""
import argparse,json,os,re,requests
from pathlib import Path
from urllib.parse import urlparse
HOST='bharathjansewalabs.com'
def validate_url(x):
    u=urlparse(x.strip())
    if u.scheme!='https' or u.hostname!=HOST or u.query or u.fragment:
        raise ValueError(f'Invalid canonical URL for IndexNow: {x}')
    return x.strip()
def main():
    p=argparse.ArgumentParser();p.add_argument('file',help='One URL per line');p.add_argument('--send',action='store_true');a=p.parse_args()
    key=os.getenv('INDEXNOW_KEY','')
    if not re.fullmatch('[a-zA-Z0-9-]{8,128}',key):
        raise SystemExit('Set INDEXNOW_KEY to a valid site-owned key. Keep private where possible.')
    urls=sorted({validate_url(line) for line in Path(a.file).read_text().splitlines()
                 if line.strip() and not line.startswith('#')})
    if not urls:raise SystemExit('No changed URLs provided.')
    payload={'host':HOST,'key':key,'keyLocation':f'https://{HOST}/{key}.txt','urlList':urls}
    if not a.send:
        print(f'DRY RUN only: would notify IndexNow of {len(urls)} changed public canonical URLs')
        print(json.dumps({**payload,'key':'[REDACTED]','keyLocation':'[REDACTED]'},indent=2))
        return
    verify=requests.get(payload['keyLocation'],timeout=15)
    verify.raise_for_status()
    if verify.text.strip()!=key:raise SystemExit('Key file verification did not match; not sending.')
    r=requests.post('https://api.indexnow.org/indexnow',json=payload,timeout=30)
    print('IndexNow response:',r.status_code,r.text[:500]);r.raise_for_status()
if __name__=='__main__':main()
