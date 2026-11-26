"""Video 3: whisper (-dtw) JSON per clip -> src/data/words.json {clip: [[word, start, end], ...]}, with the words
replaced by the on-camera script's spelling (V03_Full_Script_Updated_On_Camera.pdf: 'Stocky', 'Sarah', 'BL-1002',
'PackRight') while keeping the real timing. Also writes work/clips.json {clip: {duration, from, to}}.

Alignment per clip (difflib opcodes, script tokens vs whisper tokens):
  equal   -> script token, whisper time
  replace -> script tokens spread across the misheard whisper span (whisper mis-spelt what was said)
  delete  -> script words the presenter skipped: dropped (never caption words that weren't said)
  insert  -> extra spoken words not in the script: kept as whisper heard them, except whisper's trailing
             hallucinations after the last matched word ('Thank you.')
usage: python -I tools_words_v3.py"""
import json, re, difflib, pathlib, subprocess
ROOT = pathlib.Path(__file__).resolve().parent
PDF = ROOT.parent / 'Video_03/V03_Full_Script_Updated_On_Camera.pdf'
CLIPS = [n for n in range(1, 35) if n != 13]
NUM = {'one': '1', 'two': '2', 'three': '3', 'four': '4', 'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9',
       'ten': '10', 'thirty': '30', 'sixty': '60', 'thirtyone': '31', 'twentyone': '21', 'thirtyeight': '38',
       'eighteenhundredandtwenty': '1820', 'twohundred': '200', 'fourohone': '401', 'fourohfour': '404', 'fourtwentynine': '429',
       'stokey': 'stocky', 'stokke': 'stocky', 'stoky': 'stocky', 'stokri': 'stocky', 'sara': 'sarah', 'sarah': 'sarah',
       'saras': 'sarahs', 'odo': 'odoo', 'durham': 'dirham', 'practise': 'practice', 'millimetres': 'millimeters',
       'recognise': 'recognize', 'apis': 'api'}

def norm(w: str) -> str:
    w = re.sub(r'[^a-z0-9]', '', w.lower().replace('’', "'"))
    w = NUM.get(w, w)
    return w[:-1] if len(w) > 3 and w.endswith('s') else w

def script_tokens() -> list[str]:
    txt = subprocess.run(['pdftotext', '-enc', 'UTF-8', '-layout', str(PDF), '-'], capture_output=True, text=True, encoding='utf-8').stdout
    txt = txt.replace('’', "'").replace('‘', "'").replace('“', '"').replace('”', '"')
    lines, on, out = txt.splitlines(), False, []
    for ln in lines:
        s = ln.strip()
        if s.startswith('ON CAMERA |'): on = True; continue
        if s.startswith('SCREEN RECORDING |') or s.startswith('------'): on = False; continue
        if not on or not s or s.startswith('The ERP Agent Blueprint |') or re.fullmatch(r'Page \d+', s): continue
        if s.startswith('PAUSE & THINK:'):
            # read aloud in clip 17 as "First, ... Second, ... Third, ... And fourth, ..."
            out.append("First, checking a supplier's lead time. Second, updating the reorder point for BL-1004 to 700. "
                       "Third, sending a delivery reminder email to SafeHands Co. And fourth, reading this week's sales orders.")
            on = 'skip-pt'; continue
        if on == 'skip-pt':
            if s.startswith('SAY:'): on = True
            else: continue
        out.append(re.sub(r'^SAY:\s*', '', s))
    return ' '.join(out).split()

def whisper_words(n: int) -> list[list]:
    d = json.loads((ROOT / f'work/tx/{n}.json').read_text(encoding='utf-8')); ws = []
    for seg in d['transcription']:
        if '[BLANK_AUDIO]' in seg['text'] and len(seg['text'].strip()) <= len('[BLANK_AUDIO]') + 2: continue
        inside = False   # skip bracketed markers like [BLANK_AUDIO], which whisper splits over several tokens
        for t in seg['tokens']:
            txt = t['text']
            if '[' in txt: inside = True
            if inside:
                if ']' in txt: inside = False
                continue
            if '�' in txt or t.get('t_dtw', -1) < 0: continue
            ts = max(0.0, t['t_dtw'] / 100 - 0.06)
            if ws and not txt.startswith(' ') and re.match(r"[\w'.,%-]", txt[:1]):
                ws[-1][0] += txt; ws[-1][2] = ts + 0.15
            else:
                ws.append([txt.strip(), ts, ts + 0.2])
    for i in range(len(ws) - 1): ws[i][2] = min(max(ws[i][2], ws[i][1] + 0.12), ws[i + 1][1])
    return [w for w in ws if w[0] and w[0] not in ('-',)]

# Remaining whisper mishearings of ordinary words (clip, heard, said) — checked against the script.
HALLU = {'thank', 'you', 'thanks', 'bye'}
FIXES: list[tuple[int, str, str]] = [
    (3, 'that holds in.', 'that holds it.'),
    (4, 'for a exchange rates', 'for exchange rates'),
    (9, 'pilot jacks in shadow 5.', 'pallet jacks instead of five.'),
    (10, 'with Dome.', 'with Tom.'),
    (14, 'exist in order.', 'exist in Odoo.'),
    (21, 'use hinges.', 'use inches.'),
    (23, '4. be', 'Fourth, be'),
    (23, 'share documents.', 'shared documents.'),
    (24, 'and work through', 'and worked through'),
    (26, 'involves the details', 'includes the details'),
    (27, 'the label shopping list:', 'the labelled shopping list:'),
    (32, '10 question quiz.', 'ten-question quiz.'),
    (33, "Data's is Home\",", "Data's Home\","),
    (34, 'merge cells,', 'merged cells,'),
    (14, 'handling over', 'handing over'),
    (17, 'checking his', 'checking a'),
    (17, "remainder's email", 'reminder email'),
    (18, 'Post here', 'Pause here'),
    (22, 'he asked for three', 'we asked for three'),
    (22, 'check to', 'check too.'),
    (31, 'stormy, weaky', 'stormy-week'),
    (31, 'codes their', 'codes to their'),
]
def apply_fixes(n: int, ws: list[list]) -> list[list]:
    for c, bad, good in FIXES:
        if c != n: continue
        b = bad.split()
        for i in range(len(ws) - len(b) + 1):
            if all(norm(ws[i + j][0]) == norm(x) for j, x in enumerate(b)):
                g = good.split(); t0, t1 = ws[i][1], ws[i + len(b) - 1][2]
                ws[i:i + len(b)] = [[w, t0 + (t1 - t0) * j / len(g), t0 + (t1 - t0) * (j + 1) / len(g)] for j, w in enumerate(g)]
                break
        else:
            print(f'  ! fix not applied in clip {n}: {bad!r}')
    return ws

def snap_to_speech(n: int, ws: list[list]) -> list[list]:
    """Whisper's DTW times drift late after long pauses (clip 18: 'Alright' at 6.08 s, speech resumes at 5.24 s).
    Snap the first word after each detected pause to the real speech onset; words timed inside a pause move out of it."""
    log = subprocess.run([str(ROOT / 'bin/ffmpeg'), '-hide_banner', '-i', str(ROOT.parent / f'Video_03/Recording/v3_{n}.mp4'), '-vn',
                          '-af', 'silencedetect=noise=-38dB:d=0.25', '-f', 'null', '-'], capture_output=True, text=True).stderr
    st = [float(x) for x in re.findall(r'silence_start: ([0-9.]+)', log)]
    en = [float(x) for x in re.findall(r'silence_end: ([0-9.]+)', log)]
    for s, e in zip(st, en):
        after = [w for w in ws if w[1] >= s - 0.05]
        if not after: continue
        w = after[0]
        if w[1] > e + 0.12 or s - 0.05 <= w[1] < e:
            shift = (e + 0.02) - w[1]
            w[1] = round(e + 0.02, 3); w[2] = round(max(w[2] + min(shift, 0), w[1] + 0.12), 3)
    for i in range(len(ws) - 1): ws[i][2] = min(ws[i][2], ws[i + 1][1])
    return ws

def main():
    S = script_tokens(); Sn = [norm(t) for t in S]
    out, clips, cursor = {}, {}, 0
    for n in CLIPS:
        W = whisper_words(n); Wn = [norm(w[0]) for w in W]
        # locate this clip in the script: best-matching window starting near the cursor
        best = None
        for start in range(max(0, cursor - 40), min(len(S), cursor + 120)):
            sm = difflib.SequenceMatcher(None, Wn, Sn[start:start + len(Wn) + 25], autojunk=False)
            m = sum(b.size for b in sm.get_matching_blocks())
            if best is None or m > best[0]: best = (m, start)
        start = best[1]
        # trim the script window to exactly the span this clip covers (first..last matched script word)
        sm0 = difflib.SequenceMatcher(None, Sn[start:start + len(Wn) + 25], Wn, autojunk=False)
        b0 = [b for b in sm0.get_matching_blocks() if b.size]
        s0, s1 = start + b0[0].a, start + b0[-1].a + b0[-1].size
        sm = difflib.SequenceMatcher(None, Sn[s0:s1], Wn, autojunk=False)
        blocks = [b for b in sm.get_matching_blocks() if b.size]
        last_w = blocks[-1].b + blocks[-1].size
        # Whisper's words are the base (its formatting suits captions: "$38", "60 sets"); the script only supplies
        # punctuation on matched words and fixes short mishearings that involve a name or code (Stokey -> Stocky).
        res = []
        for op, i1, i2, j1, j2 in sm.get_opcodes():
            if op == 'equal':
                # keep whisper's digits ("401", "$38", "60") over the script's spelled-out numbers: easier to read in captions
                pick = lambda s, w: w if re.search(r'\d', w) and not re.search(r'\d', s) else s
                res += [[pick(S[s0 + i1 + k], W[j1 + k][0]), W[j1 + k][1], W[j1 + k][2]] for k in range(i2 - i1)]
            elif op == 'replace':
                sc = S[s0 + i1:s0 + i2]
                # a proper name / code in the script span = capitalised word that doesn't just start a sentence, or a BL code
                sent_start = lambda k: (s0 + i1 + k == 0) or S[s0 + i1 + k - 1][-1:] in '.?!:"'
                name_fix = (i2 - i1) <= 3 and (j2 - j1) <= 3 and any(
                    re.search(r'BL-\d', t) or (t[:1].isupper() and not sent_start(k)) for k, t in enumerate(sc))
                if name_fix:
                    t0, t1 = W[j1][1], W[j2 - 1][2]; cnt = len(sc)
                    res += [[sc[k], t0 + (t1 - t0) * k / cnt, t0 + (t1 - t0) * (k + 1) / cnt] for k in range(cnt)]
                else:
                    res += [list(W[k]) for k in range(j1, j2)]
            elif op == 'insert':
                # after the last matched word: keep a misheard last word ("Dome." = Tom), drop whisper's sign-offs
                if j1 >= last_w and all(norm(W[k][0]) in HALLU for k in range(j1, j2)): continue
                res += [list(W[k]) for k in range(j1, j2)]
            # 'delete': script words not spoken -> skip
        cursor = s1
        res = apply_fixes(n, res)
        res = snap_to_speech(n, res)
        res = [w for w in res if re.search(r'[A-Za-z0-9]', w[0])]          # stray punctuation tokens ('".')
        while len(res) > 2 and norm(res[-1][0]) in HALLU and norm(res[-2][0]) in HALLU: res = res[:-2]   # "...decision. Thank you"
        for i in range(1, len(res)):                                           # capital after a full stop
            if res[i - 1][0][-1:] in '.?!' and res[i][0][:1].islower(): res[i][0] = res[i][0][:1].upper() + res[i][0][1:]
        out[str(n)] = [[w, round(t, 3), round(e, 3)] for w, t, e in res]
        dur = float(subprocess.check_output([str(ROOT / 'bin/ffprobe'), '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0',
                                             str(ROOT.parent / f'Video_03/Recording/v3_{n}.mp4')]))
        frm = round(max(0.0, res[0][1] - 0.3), 3) if res else 0.0
        to = round(min(dur, res[-1][2] + 0.35), 3) if res else dur
        clips[str(n)] = {'duration': round(dur, 3), 'from': frm, 'to': to}
        matched = sum(b.size for b in blocks)
        print(f'{n:>2}: {matched:>3}/{len(W):<3} matched  [{frm:5.2f}-{to:5.2f} of {dur:5.2f}]  {" ".join(w[0] for w in res[:7])} ... {" ".join(w[0] for w in res[-4:])}')
    (ROOT / 'src/data/words.json').write_text(json.dumps(out), encoding='utf-8')
    (ROOT / 'work/clips.json').write_text(json.dumps(clips, indent=1), encoding='utf-8')

if __name__ == '__main__':
    main()
