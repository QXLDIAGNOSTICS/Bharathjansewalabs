#!/usr/bin/env python3
"""GA4 AI referral baseline. This measures *visits*, not AI brand mention/citation rates.
Referrer blocking and search engines blending AI mean the report is a LOWER BOUND, not all AI referrals.
"""
import os,csv,argparse,json
from pathlib import Path
from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import RunReportRequest,DateRange,Dimension,Metric
from gsc_baseline import get_dates

SOURCE_HINTS = {
  'ChatGPT':['chatgpt.com','chat.openai.com'],
  'Perplexity':['perplexity.ai'],
  'Claude':['claude.ai'],
  'Gemini':['gemini.google.com'],
  'Copilot':['copilot.microsoft.com'],
  'Grok':['grok.com'],
  'Meta AI':['meta.ai'],
  'DeepSeek':['chat.deepseek.com','deepseek.com']
}

def label_source(source):
    s=source.lower().strip()
    for label,domains in SOURCE_HINTS.items():
        if any(s==d or s.endswith('.'+d) for d in domains):return label
    return None

def query(client,property_id,start,end):
    q=RunReportRequest(property=f'properties/{property_id}',
      date_ranges=[DateRange(start_date=start.isoformat(),end_date=end.isoformat())],
      dimensions=[Dimension(name='sessionSource'),Dimension(name='sessionMedium')],
      metrics=[Metric(name='sessions'),Metric(name='engagedSessions'),Metric(name='keyEvents')],
      limit=100000)
    result=client.run_report(q)
    out={}
    for r in result.rows:
        source,medium=[x.value for x in r.dimension_values]
        label=label_source(source)
        if label:
            k=(label,source,medium)
            values=tuple(int(float(x.value)) for x in r.metric_values)
            old=out.get(k,(0,0,0));out[k]=tuple(a+b for a,b in zip(old,values))
    return out

def main():
    parser=argparse.ArgumentParser();parser.add_argument('--out',default='reports');args=parser.parse_args()
    pid=os.environ.get('GA4_PROPERTY_ID','')
    if not pid.isdigit():raise SystemExit('GA4_PROPERTY_ID is not configured.')
    current,prev=get_dates();client=BetaAnalyticsDataClient()
    a=query(client,pid,*current);b=query(client,pid,*prev)
    folder=Path(args.out);folder.mkdir(exist_ok=True,parents=True)
    with open(folder/'ga4_ai_referrals.csv','w',newline='',encoding='utf-8') as f:
        w=csv.writer(f);w.writerow(['engine_hint','source','medium','sessions','sessions_previous','session_delta','engaged_sessions','key_events'])
        for k in sorted(set(a)|set(b)):
            x=a.get(k,(0,0,0));y=b.get(k,(0,0,0));w.writerow([*k,x[0],y[0],x[0]-y[0],*x[1:]])
    (folder/'ga4_ai_referrals_note.json').write_text(json.dumps({
      'status':'observed_referrals_only',
      'caveat':'Chat apps and Google/Bing AI answers can suppress or share referrers. Zero recorded referrals does not prove zero AI citations.',
      'current':[str(x) for x in current], 'previous':[str(x) for x in prev]},indent=2))
    print('Exported observed AI referrals. Missing sources are not evidence of zero AI answers.')
if __name__=='__main__':main()
