"""Extract VO paragraphs from the V03 prompts markdown, synthesise
temp British VO with edge-tts and write vo/timings.json (durations + word timings).
Usage: python -I vo/build_vo.py [--only S1_04]"""
import asyncio, json, re, sys, pathlib, subprocess
import edge_tts

ROOT = pathlib.Path(__file__).resolve().parent
SRC = ROOT.parents[1] / "Video_03/source/V03_Screen_Recording_Prompts.md"
FFPROBE = str(ROOT.parent / "bin/ffprobe")
VOICE, RATE = "en-GB-RyanNeural", "+0%"

# Live-data corrections, read off the screens captured on 22 Nov 2026 (public/cap/api_capture_meta.json),
# plus this Odoo version's menu names (saas-19.5: "My Preferences" > "Security" > "Create API Key").
# Approved by the user 2026-11-22. Each is an exact (old, new) replacement inside one paragraph.
FIXES: list[tuple[str, str]] = [
    # S2_10–S2_13: Open-Meteo Shenzhen, 22–28 Nov: rain [0, 0.1, 48.4, 0, 0, 0.3, 0], wind [16.8, 20.9, 20.7, ...]
    ('On the day I tested this, it started with the 17th of November and went to the 23rd.',
     'On the day I recorded this, it started with the 22nd of November and went to the 28th.'),
    ('seven rainfall numbers: 0.1, 0.4, 1.4, then zeros.',
     'seven rainfall numbers: 0, 0.1, then 48.4, then mostly zeros.'),
    ('seven wind numbers: 16.3, 19.3, 13.7, and so on.',
     'seven wind numbers: 16.8, 20.9, 20.7, and so on.'),
    ('So the 17th: 0.1 millimetres of rain, wind up to 16.3 kilometres an hour. The 19th: 1.4 millimetres. '
     "That's a light drizzle, nothing to worry about. If you saw 50 or 80 millimetres, that's a seriously wet day, "
     "and if the wind went above 60 or 70, you'd want to ask your supplier whether the port is running.",
     'So the 22nd: no rain, wind up to 16.8 kilometres an hour. But look at the 24th: 48.4 millimetres of rain. '
     "That's a seriously wet day, exactly the kind of number that should make Sarah call Global Lift Parts and ask "
     "whether her pallet jack wheels are still on schedule. And if the wind went above 60 or 70, you'd also want to "
     'ask whether the port is running.'),
    # S3_04–S3_06: Frankfurter, dated 20 Nov 2026: CNY 6.6777, MXN 19.0673
    ('"Date": the 17th of November. Then "rates", with a smaller list inside it: CNY 6.67, MXN 18.46.',
     '"Date": the 20th of November. Then "rates", with a smaller list inside it: CNY 6.68, MXN 19.07.'),
    ('one dollar bought 6.67 yuan and 18.46 pesos.', 'one dollar bought 6.68 yuan and 19.07 pesos.'),
    ('which at 6.67 is an invoice', 'which at 6.68 is an invoice'),
    ('a dollar only buys about 6.47 yuan.', 'a dollar only buys about 6.48 yuan.'),
    # S5_06–S5_07: Odoo menu names in this version
    ('then "My Profile". In some versions it\'s called "Preferences". Then the tab called "Account Security".',
     'then "My Preferences". In some versions it\'s called "My Profile". Then the tab called "Security".'),
    ('with a button called "New API Key".', 'with a button called "Create API Key".'),
]

def paragraphs():
    md = SRC.read_text(encoding="utf-8")
    blocks = re.findall(r"<!-- VOICEOVER START -->.*?```text\n(.*?)```", md, re.S)
    out = {}
    for s, b in enumerate(blocks, 1):
        for p, para in enumerate([x.strip() for x in b.split("\n\n") if x.strip()], 1):
            for a, c in FIXES:
                para = para.replace(a, c)
            out[f"S{s}_{p:02d}"] = para
    return out

async def synth(key, text):
    com = edge_tts.Communicate(text, VOICE, rate=RATE, boundary="WordBoundary")
    words, audio = [], bytearray()
    async for ch in com.stream():
        if ch["type"] == "audio": audio += ch["data"]
        elif ch["type"] == "WordBoundary":
            words.append({"w": ch["text"], "t": ch["offset"]/1e7, "d": ch["duration"]/1e7})
    (ROOT / f"{key}.mp3").write_bytes(bytes(audio))
    (ROOT / f"{key}.txt").write_text(text, encoding="utf-8")
    dur = float(subprocess.check_output([FFPROBE, "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(ROOT / f"{key}.mp3")]))
    return {"text": text, "duration": round(dur, 3), "words": words}

async def main():
    only = sys.argv[2] if len(sys.argv) > 2 and sys.argv[1] == "--only" else None
    tj = ROOT / "timings.json"
    data = json.loads(tj.read_text(encoding="utf-8")) if tj.exists() else {}
    for k, t in paragraphs().items():
        if only and k != only: continue
        data[k] = await synth(k, t)
        print(k, data[k]["duration"])
    tj.write_text(json.dumps(data, indent=1), encoding="utf-8")
    fish = "\n\n".join(f"[{k}]\n{v['text']}" for k, v in sorted(data.items()))
    (ROOT.parents[1] / "Video_03/Edit").mkdir(exist_ok=True)
    (ROOT.parents[1] / "Video_03/Edit/VO_for_FishAudio.txt").write_text(encoding="utf-8", data=
        "Generate ONE audio file per block, named exactly as the [label] (e.g. S1_01.wav). Put them in _video_V03/vo/fish/.\n\n" + fish)
asyncio.run(main())
