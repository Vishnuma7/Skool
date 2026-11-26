"""Generate speech with the Fish Audio TTS API (model: drama-3).

Reads FISH_API_KEY from the environment or from a .env file in the repo root.

Usage:
    python fish_tts.py "Text to speak" -o out.mp3
    python fish_tts.py -f voiceover.txt -o out.mp3 --enhance   # + out_studio.mp3
Options:
    --voice   Fish Audio reference_id (voice model). Default: course voice.
    --model   TTS model header. Default: drama-3.
"""
import argparse
import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path

API_URL = "https://api.fish.audio/v1/tts"
DEFAULT_VOICE = "6d11afc7494f48fcac22c708c73ba6a6"
DEFAULT_MODEL = "drama-3"


def load_api_key():
    key = os.environ.get("FISH_API_KEY")
    if key:
        return key
    for parent in Path(__file__).resolve().parents:
        env = parent / ".env"
        if env.is_file():
            for line in env.read_text(encoding="utf-8").splitlines():
                name, _, value = line.partition("=")
                if name.strip() == "FISH_API_KEY" and value.strip():
                    return value.strip().strip('"').strip("'")
    sys.exit("FISH_API_KEY not found in environment or .env")


def tts(text, out_path, voice=DEFAULT_VOICE, model=DEFAULT_MODEL, bitrate=192):
    body = json.dumps({
        "text": text,
        "reference_id": voice,
        "format": "mp3",
        "mp3_bitrate": bitrate,
    }).encode("utf-8")
    req = urllib.request.Request(API_URL, data=body, method="POST", headers={
        "Authorization": f"Bearer {load_api_key()}",
        "Content-Type": "application/json",
        "model": model,
    })
    try:
        with urllib.request.urlopen(req, timeout=300) as resp:
            audio = resp.read()
    except urllib.error.HTTPError as e:
        sys.exit(f"Fish Audio error {e.code}: {e.read().decode('utf-8', 'replace')}")
    out = Path(out_path)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_bytes(audio)
    print(f"Saved {out} ({len(audio):,} bytes)")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("text", nargs="?", help="Text to speak")
    ap.add_argument("-f", "--file", help="Read text from this file instead")
    ap.add_argument("-o", "--out", required=True, help="Output .mp3 path")
    ap.add_argument("--voice", default=DEFAULT_VOICE)
    ap.add_argument("--model", default=DEFAULT_MODEL)
    ap.add_argument("--enhance", action="store_true",
                    help="Also write a studio-polished <out>_studio.mp3 (needs ffmpeg)")
    args = ap.parse_args()
    if args.file:
        text = Path(args.file).read_text(encoding="utf-8")
    elif args.text:
        text = args.text
    else:
        ap.error("give text or --file")
    tts(text.strip(), args.out, args.voice, args.model)
    if args.enhance:
        sys.path.insert(0, str(Path(__file__).parent))
        from enhance_audio import enhance
        enhance(args.out)


if __name__ == "__main__":
    main()
