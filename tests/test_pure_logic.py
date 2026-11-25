import sys,unittest,datetime as dt,csv,tempfile
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parents[1]/'scripts'))
from gsc_baseline import get_dates,save_comparison
from ai_citation_report import summarize,matched_weekly_trend
from indexnow_changed_urls import validate_url
class TestReporting(unittest.TestCase):
    def test_dates(self):
        cur,prev=get_dates(dt.date(2026,11,20))
        self.assertEqual((str(cur[0]),str(cur[1])),('2026-10-21','2026-11-17'))
        self.assertEqual((str(prev[0]),str(prev[1])),('2026-09-23','2026-10-20'))
    def test_no_invented_position(self):
        a=[{'keys':['cbc test price bangalore'],'clicks':5,'impressions':100,'ctr':.05,'position':12.2}]
        with tempfile.TemporaryDirectory() as d:
            rows=save_comparison(Path(d)/'report.csv',a,[],['query'])
            self.assertEqual(rows[0][-2],'')  # no historical position to compare
            self.assertEqual(rows[0][-1],'nonbrand_priority')
    def test_branded_prompts_excluded_from_discovery(self):
        sample=[
          {'week':'2026-W47','engine':'chatgpt','status':'answered','branded':False,'mentioned':False,'cited':False},
          {'week':'2026-W47','engine':'chatgpt','status':'answered','branded':True,'mentioned':True,'cited':True}]
        result=summarize(sample)[0]
        self.assertEqual(result['answered'],1)
        self.assertEqual(result['mentions'],0)
        self.assertEqual(result['branded_answered'],1)
    def test_empty_ai(self):
        self.assertEqual(summarize([]),[])
        self.assertEqual(matched_weekly_trend([])['comparison'],'no_previous')
    def test_indexnow_rejects_tracking(self):
        with self.assertRaises(ValueError):validate_url('https://bharathjansewalabs.com/tests/?gclid=123')
        self.assertEqual(validate_url('https://bharathjansewalabs.com/tests/'),
                         'https://bharathjansewalabs.com/tests/')
if __name__=='__main__':unittest.main()
