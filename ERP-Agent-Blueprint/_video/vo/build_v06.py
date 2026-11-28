"""Video 06 temp VO: screen-section paragraphs (from V06_Screen_Recording_Prompts.md, matched to the REAL Stocky answers),
spoken Pause & Think questions, and the two third-party voices in the Confident Intern story (Mr. Harrison, Jake).
Usage: <venv>/python -I vo/build_v06.py [--only KEY]"""
import asyncio, json, re, sys, pathlib, subprocess
import edge_tts
ROOT = pathlib.Path(__file__).resolve().parents[1]
VO = ROOT / 'vo06'; VO.mkdir(exist_ok=True)
SRC = ROOT.parent / 'Video_06/source/V06_Screen_Recording_Prompts.md'
FF = str(ROOT / 'bin/ffmpeg'); FP = str(ROOT / 'bin/ffprobe')
NARR = 'en-GB-RyanNeural'

# Wording matched to what Stocky really answered on screen (real n8n runs, 27 Nov).
FIXES = [
    # S4_01: real first line is "Four products are running low, and one more is on the watch list."
    ('And here\'s the answer. Four products at or below the reorder point.', 'And here\'s the answer. Four products running low, and one more on the watch list.'),
    # S4_04: Stocky used only get_supplier_info (stock came from memory) and phrased the "connected dots" differently.
    ('And without being asked, it connected the dots: we\'re seven below the reorder point, and an order today arrives in about three weeks.',
     'And without being asked, it connected the dots: eighteen on hand against a reorder point of twenty-five, and a new order takes twenty-one days, so stock could run short before it arrives.'),
    # S5_02: the logged run (question 2) only asked for the supplier info tool.
    ('"To answer this, I need the product list and the supplier info."', '"To answer this, I need the supplier info."'),
    # S6_04: the real answer lists the standard lead times in a small table and points to Purchase, Orders.
    ('gives the one useful fact it has, the twenty-one day lead time, clearly labelled as a standard lead time, not a delivery date.',
     'gives the useful facts it has, the standard lead times, clearly labelled as defaults, not a promised date.'),
]
EXTRA = {
    'S3_06q': "Pause and think. What is your company's definition of running low? Write it down as one sentence a new intern could follow without asking you a single question.",
    'S4_06q': "Pause and think. If you were Sarah, which product would you order first, and why? Hint: compare the gap with the lead time.",
}
CHAR = {  # third-party voices (not part of the Fish Audio swap)
    'HARRISON06': ('When are the LED warehouse lights from Shenzhen arriving?', 'en-US-ChristopherNeural', '-4%', '-4Hz'),
    'JAKE': ('Tuesday, sir.', 'en-US-AndrewNeural', '+4%', '+2Hz'),
}

def paragraphs():
    md = SRC.read_text(encoding='utf-8')
    blocks = re.findall(r'<!-- VOICEOVER START -->.*?```text\n(.*?)```', md, re.S)
    out = {}
    for s, b in enumerate(blocks, 1):
        for p, para in enumerate([x.strip() for x in b.split('\n\n') if x.strip()], 1):
            for a, c in FIXES: para = para.replace(a, c)
            out[f'S{s}_{p:02d}'] = para
    out.update(EXTRA)
    return out

async def synth(key, text, voice=NARR, rate='+0%', pitch='+0Hz'):
    com = edge_tts.Communicate(text, voice, rate=rate, pitch=pitch, boundary='WordBoundary')
    audio, words = bytearray(), []
    async for ch in com.stream():
        if ch['type'] == 'audio': audio += ch['data']
        elif ch['type'] == 'WordBoundary': words.append({'w': ch['text'], 't': ch['offset'] / 1e7, 'd': ch['duration'] / 1e7})
    out = VO / f'{key}.mp3'; raw = VO / f'{key}.raw.mp3'; raw.write_bytes(bytes(audio))
    subprocess.run([FF, '-v', 'error', '-y', '-i', str(raw), '-af', 'highpass=f=70,loudnorm=I=-16:TP=-1.5:LRA=9,aresample=48000', '-c:a', 'libmp3lame', '-q:a', '2', str(out)], check=True)
    raw.unlink()
    (VO / f'{key}.txt').write_text(text, encoding='utf-8')
    dur = float(subprocess.check_output([FP, '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', str(out)]))
    return {'text': text, 'duration': round(dur, 3), 'words': words}

async def main():
    only = sys.argv[sys.argv.index('--only') + 1] if '--only' in sys.argv else None
    tj = VO / 'timings.json'
    data = json.loads(tj.read_text()) if tj.exists() else {}
    for k, t in paragraphs().items():
        if only and k != only: continue
        data[k] = await synth(k, t); print(k, data[k]['duration'])
    for k, (t, v, r, p) in CHAR.items():
        if only and k != only: continue
        (VO / f'{k.lower()}.json').write_text(json.dumps(await synth(k, t, v, r, p), indent=1)); print(k)
    tj.write_text(json.dumps(data, indent=1))
    keys = sorted(data, key=lambda k: (k[:2], k))
    edit = ROOT.parent / 'Video_06/Edit'; edit.mkdir(exist_ok=True)
    (edit / 'VO_for_FishAudio.txt').write_text(
        'Generate ONE audio file per block, named exactly as the [label] (e.g. S1_01.wav). Put them in _video/vo06/fish/.\n'
        'Mr. Harrison and Jake (third-party voices) are NOT in this list.\n\n' + '\n\n'.join(f'[{k}]\n{data[k]["text"]}' for k in keys))
asyncio.run(main())
