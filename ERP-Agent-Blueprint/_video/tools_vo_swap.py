"""Swap the temporary edge-tts VO for Fish Audio files.
Put files named exactly like the labels in Video_01/Edit/VO_for_FishAudio.txt (S1_01.wav / .mp3 …) in _video/vo/fish/,
then run:  npm run vo:swap   (then npm run render:final)
Each file is loudness-matched, re-timed with whisper (DTW word timings) and timings.json is updated, so every highlight,
cursor move and caption re-fits the new voice automatically."""
import json, pathlib, shutil, subprocess, sys
ROOT = pathlib.Path(__file__).resolve().parent
FISH = ROOT / 'vo/fish'; BAK = ROOT / 'vo/edge_backup'; BAK.mkdir(exist_ok=True)
FF, FP = str(ROOT / 'bin/ffmpeg'), str(ROOT / 'bin/ffprobe')
WH = ROOT / 'whisper.cpp'
data = json.loads((ROOT / 'vo/timings.json').read_text())
done = []
for key in sorted(data):
    src = next((p for p in FISH.glob(f'{key}.*') if p.suffix.lower() in ('.wav', '.mp3', '.m4a', '.flac')), None)
    if not src: continue
    mp3 = ROOT / f'vo/{key}.mp3'
    if not (BAK / f'{key}.mp3').exists() and mp3.exists(): shutil.copy(mp3, BAK / f'{key}.mp3')
    subprocess.run([FF, '-v', 'error', '-y', '-i', str(src), '-af', 'silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse,highpass=f=70,loudnorm=I=-16:TP=-1.5:LRA=9,aresample=48000',
                    '-c:a', 'libmp3lame', '-q:a', '2', str(mp3)], check=True)
    wav = ROOT / f'work/fish_{key}.wav'
    subprocess.run([FF, '-v', 'error', '-y', '-i', str(mp3), '-ac', '1', '-ar', '16000', str(wav)], check=True)
    subprocess.run([str(WH / 'main'), '-m', str(WH / 'ggml-medium.en.bin'), '-f', str(wav), '-ojf', '-of', str(wav.with_suffix('')), '-dtw', 'medium.en', '-np', '-t', '8'],
                   check=True, capture_output=True)
    j = json.loads(wav.with_suffix('.json').read_text())
    words = []
    for s in j['transcription']:
        for t in s['tokens']:
            txt = t['text']
            if txt.startswith('[_') or t.get('t_dtw', -1) < 0: continue
            ts = max(0.0, t['t_dtw'] / 100 - 0.06)
            if words and not txt.startswith(' '): words[-1]['w'] += txt; continue
            words.append({'w': txt.strip(), 't': round(ts, 3), 'd': 0.2})
    for a, b in zip(words, words[1:]): a['d'] = round(max(0.05, b['t'] - a['t']), 3)
    dur = float(subprocess.check_output([FP, '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', str(mp3)]))
    data[key]['words'] = [w for w in words if w['w']]
    data[key]['duration'] = round(dur, 3)
    done.append(key)
(ROOT / 'vo/timings.json').write_text(json.dumps(data, indent=1))
missing = [k for k in sorted(data) if k not in done]
print('swapped', len(done), 'paragraphs;', 'still temp voice:', missing if missing else 'none')
