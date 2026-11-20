"""Jump cuts: find pauses/breaths in each processed clip and store speech 'keep' ranges in work/clips.json.
A pause is any stretch quieter than THRESH for >= MIN_GAP s; we keep PRE s before and POST s after speech."""
import json, re, subprocess, pathlib
ROOT = pathlib.Path(__file__).resolve().parent
THRESH, MIN_GAP, PRE, POST = '-42dB', 0.33, 0.07, 0.12
clips = json.loads((ROOT / 'work/clips.json').read_text())
tot_before = tot_after = 0
for k, c in clips.items():
    log = subprocess.run([str(ROOT / 'bin/ffmpeg'), '-hide_banner', '-i', str(ROOT / f'work/oncam/{k}.mp4'), '-vn', '-af',
                          f'silencedetect=noise={THRESH}:d={MIN_GAP}', '-f', 'null', '-'], capture_output=True, text=True).stderr
    st = [float(x) for x in re.findall(r'silence_start: ([0-9.]+)', log)]
    en = [float(x) for x in re.findall(r'silence_end: ([0-9.]+)', log)]
    if len(en) < len(st): en.append(c['duration'])
    a, b = c['from'], c['to']
    keeps, cur = [], a
    for s, e in zip(st, en):
        cs, ce = s + POST, e - PRE          # the part of the silence we cut
        if ce <= a or cs >= b or ce - cs < 0.12: continue
        cs, ce = max(cs, a), min(ce, b)
        if cs > cur: keeps.append([round(cur, 3), round(cs, 3)])
        cur = ce
    if cur < b: keeps.append([round(cur, 3), round(b, 3)])
    keeps = [x for x in keeps if x[1] - x[0] > 0.08]
    c['keeps'] = keeps
    before, after = b - a, sum(y - x for x, y in keeps)
    tot_before += before; tot_after += after
    print(f'clip {k:>2}: {before:5.1f}s -> {after:5.1f}s  ({len(keeps)} pieces)')
(ROOT / 'work/clips.json').write_text(json.dumps(clips, indent=1))
print(f'TOTAL on-camera {tot_before:.1f}s -> {tot_after:.1f}s (saved {tot_before - tot_after:.1f}s)')
