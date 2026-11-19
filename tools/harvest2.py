import json, os, re, sys
from wk import api
def gather(lang, cat, depth, seen, out):
    if cat in seen: return
    seen.add(cat); cont = {}; subs = []
    while True:
        d = api(lang, action='query', generator='categorymembers', gcmtitle=cat, gcmlimit='max', gcmtype='page|subcat', prop='info', **cont)
        for pg in d.get('query', {}).get('pages', []):
            if pg['ns'] == 0: out[pg['title']] = pg.get('length', 0)
            elif pg['ns'] == 14: subs.append(pg['title'])
        if 'continue' in d: cont = {k: v for k, v in d['continue'].items()}
        else: break
    if depth > 0:
        for s in subs: gather(lang, s, depth - 1, seen, out)
def links(lang, page):
    out = {}; cont = {}
    while True:
        d = api(lang, action='query', generator='links', titles=page, gplnamespace='0', gpllimit='max', prop='info', **cont)
        for pg in d.get('query', {}).get('pages', []):
            if 'missing' not in pg: out[pg['title']] = pg.get('length', 0)
        if 'continue' in d: cont = {k: v for k, v in d['continue'].items()}
        else: break
    return out
SPECS = json.load(open('specs.json'))
for sp in SPECS:
    fn = f"out/{sp['id']}.json"
    if os.path.exists(fn): continue
    allv = {}
    for src in sp['src']:
        lang = src['lang']
        got = {}
        if 'cat' in src: gather(lang, src['cat'], src.get('depth', 0), set(), got)
        else: got = links(lang, src['list'])
        for t, n in got.items(): allv[f"{lang}|{t}"] = n
        print(sp['id'], len(got), flush=True)
    json.dump(allv, open(fn, 'w'), ensure_ascii=False)
print('ALL DONE', flush=True)
