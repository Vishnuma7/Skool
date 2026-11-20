"""Tom's line (third-person voice for the 5:28 quote). Separate US male voice; not part of the Fish Audio swap."""
import asyncio, json, pathlib, subprocess, edge_tts
ROOT = pathlib.Path(__file__).resolve().parent
TEXT = "Sarah, we're out of stretch wrap. The Dubai order can't ship."
async def main():
    com = edge_tts.Communicate(TEXT, "en-GB-RyanNeural", rate="+4%", boundary="WordBoundary")
    audio, words = bytearray(), []
    async for ch in com.stream():
        if ch["type"] == "audio": audio += ch["data"]
        elif ch["type"] == "WordBoundary": words.append({"w": ch["text"], "t": ch["offset"] / 1e7, "d": ch["duration"] / 1e7})
    raw = ROOT / "TOM_raw.mp3"; raw.write_bytes(bytes(audio))
    # slight "phone-in-the-warehouse" presence: band-limit a touch so it reads as another person, then match loudness
    subprocess.run([str(ROOT.parent / "bin/ffmpeg"), "-v", "error", "-y", "-i", str(raw), "-af",
                    "highpass=f=80,loudnorm=I=-16:TP=-1.5,aresample=48000",
                    "-c:a", "libmp3lame", "-q:a", "2", str(ROOT / "TOM.mp3")], check=True)
    raw.unlink()
    dur = float(subprocess.check_output([str(ROOT.parent / "bin/ffprobe"), "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(ROOT / "TOM.mp3")]))
    (ROOT / "tom.json").write_text(json.dumps({"text": TEXT, "duration": round(dur, 3), "words": words}, indent=1))
    print("TOM", dur)
asyncio.run(main())
