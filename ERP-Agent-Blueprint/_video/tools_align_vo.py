"""Align whisper word timings onto the exact script text of each VO paragraph (difflib), so cues/captions use the
script's words ('Stocky', 'Claude or ChatGPT', 'twenty-one') with the real voice timing."""
import os, json, re, difflib, pathlib
ROOT = pathlib.Path(__file__).resolve().parent
VO = os.environ.get('VO_DIR', 'vo')
NUM = {'one': '1', 'two': '2', 'three': '3', 'four': '4', 'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9', 'ten': '10',
       'ninety': '90', 'twentyone': '21', 'sixfiftyfive': '655', 'stokke': 'stocky', 'stoky': 'stocky', 'cloud': 'claude', 'arp': 'erp'}
def norm(w):
    w = re.sub(r'[^a-z0-9]', '', w.lower())
    w = NUM.get(w, w)
    return w[:-1] if len(w) > 3 and w.endswith('s') else w
data = json.loads((ROOT / VO / 'timings.json').read_text())
for key, v in data.items():
    toks = v['text'].split()
    # whisper words, split on '/' and hyphen-joined numbers
    ww = []
    for w in v['words']:
        for part in re.split(r'[/]', w['w']):
            if part: ww.append({'w': part, 't': w['t'], 'd': w.get('d', 0.2)})
    a = [norm(t) for t in toks]; b = [norm(w['w']) for w in ww]
    times = [None] * len(toks)
    for blk in difflib.SequenceMatcher(None, a, b, autojunk=False).get_matching_blocks():
        for k in range(blk.size): times[blk.a + k] = (ww[blk.b + k]['t'], ww[blk.b + k]['d'])
    # interpolate unmatched tokens between known neighbours
    known = [i for i, x in enumerate(times) if x]
    for i in range(len(toks)):
        if times[i]: continue
        prev = max([k for k in known if k < i], default=None); nxt = min([k for k in known if k > i], default=None)
        t0 = times[prev][0] + times[prev][1] if prev is not None else 0.0
        t1 = times[nxt][0] if nxt is not None else v['duration']
        span = (nxt if nxt is not None else len(toks)) - (prev if prev is not None else -1)
        pos = i - (prev if prev is not None else -1)
        times[i] = (t0 + (t1 - t0) * (pos - 1) / max(1, span - 1), max(0.12, (t1 - t0) / max(1, span - 1)))
    matched = len(known)
    v['words'] = [{'w': t, 't': round(times[i][0], 3), 'd': round(times[i][1], 3)} for i, t in enumerate(toks)]
    print(f'{key}: {matched}/{len(toks)} words matched')
(ROOT / VO / 'timings.json').write_text(json.dumps(data, indent=1))
