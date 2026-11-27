"""Polish a voice-over to studio quality with ffmpeg.

Chain: rumble cut -> light denoise -> voice EQ (less mud, more presence/air)
-> de-esser -> gentle compression -> two-pass loudness normalization to
-16 LUFS / -1.5 dBTP (standard for YouTube/online courses) at 48 kHz.

Usage:
    python enhance_audio.py input.mp3                 # -> input_studio.mp3 (320 kbps)
    python enhance_audio.py input.mp3 -o out.wav      # WAV 24-bit for the video editor
Requires ffmpeg on PATH.
"""
import argparse
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

TARGET_I, TARGET_TP, TARGET_LRA = -16.0, -1.5, 11.0

VOICE_CHAIN = ",".join([
    "highpass=f=80",                                     # remove rumble / DC
    "afftdn=nr=10:nf=-40:tn=1",                          # light, adaptive denoise
    "equalizer=f=250:t=q:w=1.0:g=-2.5",                  # reduce boxiness/mud
    "equalizer=f=3500:t=q:w=1.2:g=2.0",                  # presence / clarity
    "highshelf=f=10000:g=2.0",                           # air
    "deesser=i=0.4:m=0.5:f=0.5",                          # tame harsh 's'
    "acompressor=threshold=-20dB:ratio=3:attack=5:release=80:makeup=2",
])


def run(cmd):
    return subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace")


def measure(src):
    r = run(["ffmpeg", "-hide_banner", "-nostats", "-i", str(src), "-af",
             f"{VOICE_CHAIN},loudnorm=I={TARGET_I}:TP={TARGET_TP}:LRA={TARGET_LRA}:print_format=json",
             "-f", "null", "-"])
    m = re.search(r"\{[^{}]*\"input_i\"[^{}]*\}", r.stderr, re.S)
    if not m:
        sys.exit("loudness measurement failed:\n" + r.stderr[-2000:])
    return json.loads(m.group(0))


def enhance(src, dst=None):
    if not shutil.which("ffmpeg"):
        sys.exit("ffmpeg not found on PATH")
    src = Path(src)
    dst = Path(dst) if dst else src.with_name(src.stem + "_studio.mp3")
    st = measure(src)
    loudnorm = (f"loudnorm=I={TARGET_I}:TP={TARGET_TP}:LRA={TARGET_LRA}"
                f":measured_I={st['input_i']}:measured_TP={st['input_tp']}"
                f":measured_LRA={st['input_lra']}:measured_thresh={st['input_thresh']}"
                f":offset={st['target_offset']}:linear=true")
    codec = (["-c:a", "pcm_s24le"] if dst.suffix.lower() == ".wav"
             else ["-c:a", "libmp3lame", "-b:a", "320k"])
    r = run(["ffmpeg", "-hide_banner", "-y", "-i", str(src), "-af",
             f"{VOICE_CHAIN},{loudnorm},aresample=48000", "-ar", "48000", *codec, str(dst)])
    if r.returncode:
        sys.exit("ffmpeg failed:\n" + r.stderr[-2000:])
    print(f"Saved {dst}  (normalized to {TARGET_I} LUFS, {TARGET_TP} dBTP, 48 kHz)")
    return dst


if __name__ == "__main__":
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("input")
    ap.add_argument("-o", "--out", help="Output path (.mp3 or .wav). Default: <input>_studio.mp3")
    a = ap.parse_args()
    enhance(a.input, a.out)
