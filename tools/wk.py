import json, sys, time, urllib.parse, urllib.request
UA = "HlubinaQuizBuilder/1.0 (offline quiz data)"
def api(lang, **p):
    p.update(format='json', formatversion='2')
    url = f"https://{lang}.wikipedia.org/w/api.php?" + urllib.parse.urlencode(p)
    time.sleep(0.25)
    for i in range(25):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': UA}), timeout=30) as r:
                return json.load(r)
        except Exception as e:
            ra = getattr(e, 'headers', None) and e.headers.get('Retry-After')
            time.sleep(min(int(ra), 20) if ra and ra.isdigit() else min(2 + 2 * i, 15)); err = e
    raise err
def members(lang, cat, depth=0, seen=None):
    seen = seen if seen is not None else set()
    if cat in seen: return {}
    seen.add(cat)
    out = {}; cont = {}
    while True:
        d = api(lang, action='query', list='categorymembers', cmtitle=cat, cmlimit='max', cmtype='page|subcat', **cont)
        for m in d['query']['categorymembers']:
            if m['ns'] == 0: out[m['title']] = 0
            elif m['ns'] == 14 and depth > 0: out.update(members(lang, m['title'], depth - 1, seen))
        if 'continue' in d: cont = {'cmcontinue': d['continue']['cmcontinue']}
        else: break
    return out
def views(lang, titles):
    res = {}
    titles = list(titles)
    for i in range(0, len(titles), 50):
        chunk = titles[i:i+50]
        d = api(lang, action='query', prop='pageviews', pvipdays='60', titles='|'.join(chunk), redirects='1')
        for pg in d['query'].get('pages', []):
            pv = pg.get('pageviews') or {}
            res[pg['title']] = sum(v or 0 for v in pv.values())
    return res
if __name__ == '__main__':
    lang, cat, depth = sys.argv[1], sys.argv[2], int(sys.argv[3])
    m = members(lang, cat, depth)
    print(len(m))
    v = views(lang, list(m)[:100])
    print(sorted(v.items(), key=lambda x: -x[1])[:15])
