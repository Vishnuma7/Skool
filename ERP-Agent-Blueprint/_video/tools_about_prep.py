"""About video prep: key out the green wall, despill, grade, and level the audio of each raw take.

Usage (from ERP-Agent-Blueprint/_video, with the repo .venv):
  ..\\..\\.venv\\Scripts\\python -I tools_about_prep.py <raw_dir> [take ...]

<raw_dir> holds ab_1.mp4 ... ab_8.mp4. Writes, per take:
  public/about/ab_N.webm  VP9 with alpha (wall removed; you, desk and monitors kept)
  public/about/ab_N.wav   48 kHz voice, gain-matched to -16 LUFS
  work/about/ab_N_check.png  one keyed frame over a checkerboard, for a quick look
"""
import json, pathlib, re, subprocess, sys
from concurrent.futures import ThreadPoolExecutor
import numpy as np

ROOT = pathlib.Path(__file__).resolve().parent
OUT = ROOT / "public" / "about"
WORK = ROOT / "work" / "about"
W, H = 1920, 1080

# Key: how much green exceeds the stronger of red/blue (0-1 scale). Wall measures ~0.19-0.33.
K0, K1 = 0.05, 0.14


def blur3(a: np.ndarray) -> np.ndarray:
    """3x3 box blur (edge-padded)."""
    p = np.pad(a, 1, mode="edge")
    s = p[:-2, :-2] + p[:-2, 1:-1] + p[:-2, 2:] + p[1:-1, :-2] + p[1:-1, 1:-1] + p[1:-1, 2:] + p[2:, :-2] + p[2:, 1:-1] + p[2:, 2:]
    return s / 9.0


def erode3(a: np.ndarray) -> np.ndarray:
    p = np.pad(a, 1, mode="edge")
    return np.minimum.reduce([p[:-2, 1:-1], p[2:, 1:-1], p[1:-1, :-2], p[1:-1, 2:], p[1:-1, 1:-1]])


def process(rgb: np.ndarray) -> np.ndarray:
    f = rgb.astype(np.float32) / 255.0
    r, g, b = f[..., 0], f[..., 1], f[..., 2]
    mx = np.maximum(r, b)
    spill = g - mx
    alpha = 1.0 - np.clip((spill - K0) / (K1 - K0), 0.0, 1.0)
    alpha = blur3(erode3(alpha))  # pull the edge in 1 px, then soften it
    alpha = blur3(alpha)
    # despill: green never brighter than the stronger of red/blue
    g = np.minimum(g, mx + 0.01)
    # tone down the pink/magenta monitor wallpapers (red and blue both above green; skin has blue below green)
    mag = np.clip(np.minimum(r - g, b - g) * 5.0, 0.0, 1.0)
    lum = 0.2126 * r + 0.7152 * g + 0.0722 * b
    k = 0.6 * mag
    r = r + (lum - r) * k
    g = g + (lum - g) * k
    b = b + (lum - b) * k
    darken = 1.0 - 0.18 * mag
    r, g, b = r * darken, g * darken, b * darken
    # grade: gentle S-curve, slight warmth, tiny saturation lift
    out = np.stack([r * 1.025, g, b * 0.975], axis=-1)
    out = np.clip(out, 0.0, 1.0)
    out = out + 0.24 * (out - out * out) * (2 * out - 1)  # soft S-curve (keeps 0, 0.5 and 1 fixed)
    lum = (0.2126 * out[..., 0] + 0.7152 * out[..., 1] + 0.0722 * out[..., 2])[..., None]
    out = lum + (out - lum) * 1.06
    rgba = np.concatenate([np.clip(out, 0, 1), alpha[..., None]], axis=-1)
    return (rgba * 255.0 + 0.5).astype(np.uint8)


def loudness(path: pathlib.Path) -> float:
    r = subprocess.run(["ffmpeg", "-hide_banner", "-nostats", "-i", str(path), "-af", "ebur128", "-f", "null", "-"],
                       capture_output=True, text=True)
    return float(re.findall(r"I:\s+(-?[\d.]+) LUFS", r.stderr)[-1])


# Voice EQ (the raw mic sounds muffled/boomy): cut rumble, boom (~150 Hz) and boxiness (~350 Hz),
# lift presence (~3.5 kHz) and air, then tame the 's' sounds the lift brings out.
VOICE_EQ = ("highpass=f=85,equalizer=f=150:t=q:w=1.0:g=-2.5,equalizer=f=350:t=q:w=1.2:g=-3,"
            "equalizer=f=3500:t=q:w=1.4:g=3,highshelf=f=9000:g=2.5,deesser=i=0.35:m=0.5:f=0.5")
# Picture: light denoise, then contrast-adaptive sharpening (the 4K render upscales this).
VIDEO_FX = "hqdn3d=1.2:1.2:3:3,cas=strength=0.55"


def take(raw: pathlib.Path) -> str:
    n = raw.stem
    # audio: EQ, then gain-match to -16 LUFS (takes are already compressed by the mic; no extra dynamics here)
    eq = OUT / f"{n}_eq.wav"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(raw), "-vn", "-af", VOICE_EQ, "-ar", "48000", "-ac", "2", str(eq)], check=True)
    gain = -16.0 - loudness(eq)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(eq), "-af", f"volume={gain:.2f}dB", str(OUT / f"{n}.wav")], check=True)
    eq.unlink()
    # video
    dec = subprocess.Popen(["ffmpeg", "-v", "error", "-i", str(raw), "-vf", VIDEO_FX, "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], stdout=subprocess.PIPE)
    enc = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgba", "-s", f"{W}x{H}", "-r", "30", "-i", "-",
                            "-c:v", "libvpx-vp9", "-pix_fmt", "yuva420p", "-b:v", "0", "-crf", "16", "-row-mt", "1",
                            "-deadline", "good", "-cpu-used", "4", "-auto-alt-ref", "0", str(OUT / f"{n}.webm")], stdin=subprocess.PIPE)
    size = W * H * 3
    i = 0
    while True:
        buf = dec.stdout.read(size)
        if len(buf) < size:
            break
        rgba = process(np.frombuffer(buf, np.uint8).reshape(H, W, 3))
        if i == 45:
            yy, xx = np.mgrid[0:H, 0:W]
            chk = np.where(((yy // 40 + xx // 40) % 2)[..., None] == 0, 200, 140).astype(np.float32)
            a = rgba[..., 3:4] / 255.0
            comp = (rgba[..., :3] * a + chk * (1 - a)).astype(np.uint8)
            subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-i", "-",
                            "-frames:v", "1", str(WORK / f"{n}_check.png")], input=comp.tobytes(), check=True)
        enc.stdin.write(rgba.tobytes())
        i += 1
    enc.stdin.close()
    enc.wait()
    dec.wait()
    return f"{n}: {i} frames, audio gain {gain:+.1f} dB"


if __name__ == "__main__":
    raw_dir = pathlib.Path(sys.argv[1])
    names = sys.argv[2:] or [f"ab_{i}" for i in range(1, 9)]
    OUT.mkdir(parents=True, exist_ok=True)
    WORK.mkdir(parents=True, exist_ok=True)
    # music bed under the voice: thin out its lows and dip its 3 kHz so the voice owns those ranges
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-t", "75", "-i", str(ROOT / "public" / "music" / "bed_edu.mp3"),
                    "-af", "highpass=f=140,equalizer=f=3000:t=q:w=1.5:g=-3", "-ar", "48000", str(OUT / "bed.wav")], check=True)
    with ThreadPoolExecutor(max_workers=4) as ex:
        for line in ex.map(take, [raw_dir / f"{n}.mp4" for n in names]):
            print(line, flush=True)
