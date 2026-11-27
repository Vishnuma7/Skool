"""V04: whisper JSON -> src/data/words04.json {clip: [[word, start, end]]} + work/v04/clips.json (duration, from, to)."""
import json, re, subprocess, pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
from tools_words import words_of
ROOT = pathlib.Path(__file__).resolve().parent
FP = str(ROOT / 'bin/ffprobe')
DROP_TAIL = {18: {'cheers.', 'cheers'}}   # stray word at the end of a take
out, clips = {}, {}
for i in range(1, 27):
    ws = [w for w in words_of(ROOT / f'work/v04/tx/{i}.json') if not w[0].startswith('[')]
    while ws and re.sub(r'[^\w.]', '', ws[-1][0]).lower() in DROP_TAIL.get(i, set()): ws.pop()
    out[str(i)] = ws
    dur = float(subprocess.check_output([FP, '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', str(ROOT.parent / f'Video_04/Recording/v4_{i}.mp4')]))
    clips[str(i)] = {'duration': round(dur, 3), 'from': round(max(0.0, ws[0][1] - 0.3), 3), 'to': round(min(dur, ws[-1][2] + 0.4), 3)}
    print(i, clips[str(i)], '|', ' '.join(w[0] for w in ws[:5]), '...', ' '.join(w[0] for w in ws[-4:]))
(ROOT / 'src/data/words04.json').write_text(json.dumps(out))
(ROOT / 'work/v04/clips.json').write_text(json.dumps(clips, indent=1))
