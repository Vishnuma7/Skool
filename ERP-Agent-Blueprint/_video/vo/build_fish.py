"""Generate the narration with the user's Fish Audio voice (model drama-3). Writes vo/fish/<KEY>.mp3 (skips existing)."""
import json, os, pathlib, ssl, time, urllib.request
ROOT = pathlib.Path(__file__).resolve().parents[1] / os.environ.get('VO_DIR', 'vo')
ENV = dict(l.split('=', 1) for l in (pathlib.Path(__file__).resolve().parents[1] / '.env').read_text().split() if '=' in l)
CTX = ssl.create_default_context(cafile='/etc/ssl/cert.pem')
OUT = ROOT / 'fish'; OUT.mkdir(exist_ok=True)
data = json.loads((ROOT / 'timings.json').read_text())
for key in sorted(data):
    dst = OUT / f'{key}.mp3'
    if dst.exists() and dst.stat().st_size > 5000: continue
    body = json.dumps({"text": data[key]['text'], "reference_id": ENV['FISH_REFERENCE_ID'], "format": "mp3", "mp3_bitrate": 192}).encode()
    for attempt in range(4):
        try:
            req = urllib.request.Request('https://api.fish.audio/v1/tts', data=body, method='POST', headers={
                'Authorization': 'Bearer ' + ENV['FISH_API_KEY'], 'Content-Type': 'application/json', 'model': 'drama-3'})
            with urllib.request.urlopen(req, context=CTX, timeout=300) as r:
                dst.write_bytes(r.read())
            print('ok', key, dst.stat().st_size, flush=True); break
        except Exception as e:
            print('retry', key, attempt, str(e)[:120], flush=True); time.sleep(5 * (attempt + 1))
    else:
        print('FAILED', key, flush=True)
