#!/usr/bin/env python3
"""AI visibility report from real, human-verified engine observations.
This script never invents answers, citations or trends and does not scrape gated chat products.
"""
import argparse,csv,datetime as dt,json,re,collections
from pathlib import Path
from urllib.parse import urlparse
OWN=('bharathjansewalabs.com','www.bharathjansewalabs.com')
ENGINES=['chatgpt','gemini','google_ai_overview','google_ai_mode','copilot','perplexity','claude',
         'grok','meta_ai','deepseek']

def boolval(s):
    if str(s).strip().lower() in ('1','true','yes','y'):return True
    if str(s).strip().lower() in ('0','false','no','n'):return False
    raise ValueError(f'Expected explicit yes/no boolean, got {s!r}')

def week(date):
    # ISO calendar week (weeks begin Monday) for comparable runs.
    d=dt.datetime.fromisoformat(date.replace('Z','+00:00')).date()
    y,w,_=d.isocalendar();return f'{y}-W{w:02d}'

def read_observations(path, prompts_path=None):
    prompt_brand={}
    if prompts_path and Path(prompts_path).exists():
        with open(prompts_path, encoding='utf-8', newline='') as prompt_file:
            for prompt in csv.DictReader(prompt_file):
                prompt_brand[prompt['prompt_id']]=boolval(prompt['branded'])
    rows=[]
    with open(path,encoding='utf-8',newline='') as f:
        for i,row in enumerate(csv.DictReader(f),start=2):
            if not row.get('observed_at_utc'):continue
            status=row.get('status','').strip().lower()
            if status not in ('answered','no_answer','failed'):
                raise ValueError(f'Line {i}: invalid status')
            if status=='answered':
                mentioned=boolval(row.get('brand_mentioned',''))
                cited=boolval(row.get('owned_site_cited',''))
                if cited and not row.get('citation_urls',''):
                    raise ValueError(f'Line {i}: owned citation must include an evidence citation URL')
                if cited and not any(urlparse(u.strip()).hostname in OWN
                                     for u in row.get('citation_urls','').split('|') if u.strip()):
                    raise ValueError(f'Line {i}: claimed owned citation not found in citation_urls')
            else:mentioned=cited=None
            rows.append({**row,'week':week(row['observed_at_utc']),
                         'branded':prompt_brand.get(row.get('prompt_id',''),False),
                         'mentioned':mentioned,'cited':cited,'status':status})
    return rows

def summarize(rows):
    per=collections.defaultdict(list)
    for x in rows:per[(x['week'],x['engine'])].append(x)
    out=[]
    for (wk,eng),xs in sorted(per.items()):
        neutral=[x for x in xs if not x.get('branded',False)]
        branded=[x for x in xs if x.get('branded',False)]
        answered=[x for x in neutral if x['status']=='answered']
        m=sum(x['mentioned'] is True for x in answered)
        c=sum(x['cited'] is True for x in answered)
        out.append({'week':wk,'engine':eng,'attempted':len(neutral),'answered':len(answered),
                    'no_answer':sum(x['status']=='no_answer' for x in neutral),
                    'failed':sum(x['status']=='failed' for x in neutral),
                    'branded_attempted':len(branded),
                    'branded_answered':sum(x['status']=='answered' for x in branded),
                    'mentions':m,'own_site_citations':c,
                    'mention_pct':round(100*m/len(answered),1) if answered else None,
                    'citation_pct':round(100*c/len(answered),1) if answered else None})
    return out

def matched_weekly_trend(rows):
    # Per prompt+engine+market+variant, compare only matched answers in two most recent ISO weeks.
    weeks=sorted({r['week'] for r in rows})
    if len(weeks)<2:return {'comparison':'no_previous','matched_cells':0}
    prev,now=weeks[-2:]
    def latest(w):
        ret={}
        for r in sorted((r for r in rows if r['week']==w and r['status']=='answered' and not r.get('branded',False)),
                        key=lambda x:x['observed_at_utc']):
            key=(r['prompt_id'],r['engine'],r['market'],r['variant'])
            ret[key]=r
        return ret
    a,b=latest(prev),latest(now)
    keys=set(a)&set(b)
    if len(keys)<10:return {'comparison':'insufficient_matched_scope',
                           'previous_week':prev,'current_week':now,'matched_cells':len(keys)}
    # coverage should be comparable; report only matched prompt/engine/market cells.
    rate=lambda d,k:100*sum(d[z][k] is True for z in keys)/len(keys)
    return {'comparison':'matched_scope_only','previous_week':prev,'current_week':now,
            'matched_cells':len(keys),'brand_mention_pct_previous':round(rate(a,'mentioned'),1),
            'brand_mention_pct_current':round(rate(b,'mentioned'),1),
            'own_site_citation_pct_previous':round(rate(a,'cited'),1),
            'own_site_citation_pct_current':round(rate(b,'cited'),1)}

def main():
    ap=argparse.ArgumentParser();ap.add_argument('--input',default='data/ai_observations.csv')
    ap.add_argument('--out',default='reports');ap.add_argument('--prompts',default='data/ai_prompts.csv');args=ap.parse_args();p=Path(args.out);p.mkdir(parents=True,exist_ok=True)
    rows=read_observations(args.input,args.prompts)
    if not rows:
        report={'status':'NO_OBSERVATIONS','weekly':[],'comparison':'NO_BASELINE',
             'instructions':'Collect actual dated answers for fixed, neutral prompts. Do not substitute unobserved outcomes with zero.'}
    else:
        report={'status':'OBSERVED_DATA','observations':len(rows),
            'weekly':summarize(rows),'trend':matched_weekly_trend(rows),
            'method':'Only answered observations enter mention and citation rates; failed and no-answer outcomes are separate.'}
    (p/'ai_visibility_summary.json').write_text(json.dumps(report,indent=2))
    with open(p/'ai_visibility_weekly.csv','w',newline='',encoding='utf-8') as f:
        fields=['week','engine','attempted','answered','no_answer','failed','branded_attempted','branded_answered','mentions','own_site_citations','mention_pct','citation_pct']
        w=csv.DictWriter(f,fieldnames=fields);w.writeheader();w.writerows(report.get('weekly',[]))
    print(json.dumps(report,indent=2))
if __name__=='__main__':main()
