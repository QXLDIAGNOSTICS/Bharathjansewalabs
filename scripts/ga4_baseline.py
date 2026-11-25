#!/usr/bin/env python3
"""GA4 organic acquisition: read-only sample with no PHI, not a substitute for GSC.
Requires connected GA4 property and authorised credentials; use same periods as GSC.
"""
import os,csv,argparse,datetime as dt,json
from pathlib import Path
from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import (RunReportRequest,DateRange,Dimension,Metric,Filter,FilterExpression)
from gsc_baseline import get_dates

def collect(client, prop_id, start, end):
    req=RunReportRequest(property=f'properties/{prop_id}',
        date_ranges=[DateRange(start_date=start.isoformat(),end_date=end.isoformat())],
        dimensions=[Dimension(name='landingPage')],
        metrics=[Metric(name='sessions'),Metric(name='activeUsers'),Metric(name='engagedSessions'),
                 Metric(name='keyEvents')],
        dimension_filter=FilterExpression(filter=Filter(field_name='sessionDefaultChannelGroup',
             string_filter=Filter.StringFilter(value='Organic Search',match_type=Filter.StringFilter.MatchType.EXACT))),
        limit=100000)
    result=client.run_report(req)
    return {r.dimension_values[0].value: [int(float(v.value)) for v in r.metric_values]
            for r in result.rows}

def main():
    ap=argparse.ArgumentParser();ap.add_argument('--out',default='reports');args=ap.parse_args()
    prop=os.environ.get('GA4_PROPERTY_ID')
    if not prop or not prop.isdigit():
        raise SystemExit('GA4_PROPERTY_ID must be the confirmed numeric GA4 property ID.')
    client=BetaAnalyticsDataClient(); cur,prev=get_dates()
    a,b=collect(client,prop,*cur),collect(client,prop,*prev)
    p=Path(args.out);p.mkdir(parents=True,exist_ok=True)
    with open(p/'ga4_organic_landing_pages.csv','w',newline='',encoding='utf-8') as file:
        w=csv.writer(file);w.writerow(['landing_page','sessions','sessions_previous','sessions_delta',
           'active_users','engaged_sessions','key_events'])
        for page in sorted(set(a)|set(b),key=lambda k:-a.get(k,[0])[0]):
            x=a.get(page,[0,0,0,0]);y=b.get(page,[0,0,0,0]);w.writerow([page,x[0],y[0],x[0]-y[0],*x[1:]])
    totals=lambda x: [sum(v[i] for v in x.values()) for i in range(4)]
    (p/'ga4_summary.json').write_text(json.dumps({'current':totals(a),'previous':totals(b),
        'metrics':['sessions','activeUsers','engagedSessions','keyEvents'],
        'note':'GA4 data is first-party; events must be properly configured and consented.'},indent=2))
    print('Exported GA4 organic landing-page report. No patient data included.')
if __name__=='__main__':main()
