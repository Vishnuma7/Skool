"""Video 04 extras: (1) Mr. Harrison's quote in his own voice (third person, not part of the Fish Audio swap),
(2) the spoken Pause & Think question S2_08q (temp narrator voice; included in the Fish Audio list)."""
import asyncio, json, pathlib, subprocess, edge_tts
ROOT = pathlib.Path(__file__).resolve().parents[1]
VO = ROOT / 'vo04'; FF = str(ROOT / 'bin/ffmpeg'); FP = str(ROOT / 'bin/ffprobe')
HARRISON = "How much are we spending with PackRight Industries? I want to see if we can negotiate a volume discount."
QUESTION = "Pause and think. Same city and coordinates, but different supplier IDs. Why?"
async def synth(text, voice, out, rate='+0%', pitch='+0Hz'):
    com = edge_tts.Communicate(text, voice, rate=rate, pitch=pitch, boundary='WordBoundary')
    audio, words = bytearray(), []
    async for ch in com.stream():
        if ch['type'] == 'audio': audio += ch['data']
        elif ch['type'] == 'WordBoundary': words.append({'w': ch['text'], 't': ch['offset'] / 1e7, 'd': ch['duration'] / 1e7})
    raw = out.with_suffix('.raw.mp3'); raw.write_bytes(bytes(audio))
    subprocess.run([FF, '-v', 'error', '-y', '-i', str(raw), '-af', 'highpass=f=70,loudnorm=I=-16:TP=-1.5:LRA=9,aresample=48000', '-c:a', 'libmp3lame', '-q:a', '2', str(out)], check=True)
    raw.unlink()
    dur = float(subprocess.check_output([FP, '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', str(out)]))
    return {'text': text, 'duration': round(dur, 3), 'words': words}
async def main():
    h = await synth(HARRISON, 'en-US-ChristopherNeural', VO / 'HARRISON.mp3', rate='-4%', pitch='-4Hz')
    (VO / 'harrison.json').write_text(json.dumps(h, indent=1)); print('HARRISON', h['duration'])
    q = await synth(QUESTION, 'en-GB-RyanNeural', VO / 'S2_08q.mp3')
    (VO / 'S2_08q.txt').write_text(QUESTION)
    tj = VO / 'timings.json'; data = json.loads(tj.read_text()); data['S2_08q'] = q; tj.write_text(json.dumps(data, indent=1))
    print('S2_08q', q['duration'])
asyncio.run(main())
