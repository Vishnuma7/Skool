"""Extract VO paragraphs from the V01 prompts markdown (with corrections), synthesise
temp British VO with edge-tts and write vo/timings.json (durations + word timings).
Usage: python -I vo/build_vo.py [--only S1_04]"""
import asyncio, json, re, sys, pathlib, subprocess
import edge_tts

ROOT = pathlib.Path(__file__).resolve().parent
SRC = ROOT.parents[1] / "Video_01/source/V01_Screen_Recording_Prompts.md"
FFPROBE = str(ROOT.parent / "bin/ffprobe")
VOICE, RATE = "en-GB-RyanNeural", "+0%"

# Corrections (see production notes): make the China-holiday claim true.
FIXES = [(
    'it checked the weather there and saw heavy rain coming, it checked the calendar and saw a public holiday in China next week,',
    'it checked the weather there and saw heavy storms hit Shenzhen over the weekend, it checked the calendar and saw Thanksgiving next week, when freight bookings slow right down,'),
    # A lone "You." between sentences sounded like a glitch in review (4:33) -> removed.
    ('Not watch me build it. You. One piece per video.', 'Not watch me build it. One piece per video.')]

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
    data = json.loads(tj.read_text()) if tj.exists() else {}
    for k, t in paragraphs().items():
        if only and k != only: continue
        data[k] = await synth(k, t)
        print(k, data[k]["duration"])
    tj.write_text(json.dumps(data, indent=1))
    fish = "\n\n".join(f"[{k}]\n{v['text']}" for k, v in sorted(data.items()))
    (ROOT.parents[1] / "Video_01/Edit").mkdir(exist_ok=True)
    (ROOT.parents[1] / "Video_01/Edit/VO_for_FishAudio.txt").write_text(
        "Generate ONE audio file per block, named exactly as the [label] (e.g. S1_01.wav). Put them in _video/vo/fish/.\n\n" + fish)
asyncio.run(main())
