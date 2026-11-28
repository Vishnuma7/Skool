"""About video: find the speech in each levelled take and write the jump-cut keeps.

Reads public/about/ab_N.wav, writes src/about/keeps.json  {"ab_N": [[start, end], ...]} in take seconds.
Silences longer than GAP are cut out (fast-cut style); shorter pauses stay so the delivery breathes.
"""
import json, pathlib, subprocess
import numpy as np

ROOT = pathlib.Path(__file__).resolve().parent
WIN = 0.01   # analysis window (s)
PRE, POST = 0.10, 0.16  # padding kept before/after speech
GAP = 0.30   # pauses longer than this are cut
MIN_SPEECH = 0.08
MIN_CUT = 0.20
HEAD = {"ab_1": 0.15}  # take start override (s): video opens ~0.6 s before "Check"


def envelope(path: pathlib.Path) -> np.ndarray:
    pcm = subprocess.run(["ffmpeg", "-v", "error", "-i", str(path), "-ac", "1", "-ar", "16000", "-f", "f32le", "-"],
                         capture_output=True, check=True).stdout
    x = np.frombuffer(pcm, np.float32)
    n = int(16000 * WIN)
    x = x[: len(x) // n * n].reshape(-1, n)
    return 20 * np.log10(np.sqrt((x ** 2).mean(axis=1)) + 1e-9)


def keeps(db: np.ndarray, dur: float):
    floor = np.percentile(db, 10)
    thr = max(floor + 14, -45)
    on = db > thr
    runs, i = [], 0
    while i < len(on):
        if on[i]:
            j = i
            while j < len(on) and on[j]:
                j += 1
            if (j - i) * WIN >= MIN_SPEECH:
                runs.append([i * WIN, j * WIN])
            i = j
        else:
            i += 1
    merged = []
    for a, b in runs:
        if merged and a - merged[-1][1] < GAP:
            merged[-1][1] = b
        else:
            merged.append([a, b])
    out = [[round(max(0.0, a - PRE), 3), round(min(dur, b + POST), 3)] for a, b in merged]
    # padding can make neighbours overlap, and a cut that saves < MIN_CUT s only jumps: join them
    res = []
    for a, b in out:
        if res and a <= res[-1][1] + MIN_CUT:
            res[-1][1] = b
        else:
            res.append([a, b])
    return res, thr


if __name__ == "__main__":
    out = {}
    for i in range(1, 9):
        p = ROOT / "public" / "about" / f"ab_{i}.wav"
        db = envelope(p)
        dur = len(db) * WIN
        k, thr = keeps(db, dur)
        if f"ab_{i}" in HEAD:  # lead-in so the first word survives players/HDMI speakers that wake up late
            k[0][0] = min(k[0][0], HEAD[f"ab_{i}"])
        out[f"ab_{i}"] = k
        kept = sum(b - a for a, b in k)
        print(f"ab_{i}: {dur:.2f}s -> {kept:.2f}s kept  (thr {thr:.0f} dB)  {k}")
    print("total kept:", round(sum(b - a for v in out.values() for a, b in v), 2), "s")
    (ROOT / "src" / "about" / "keeps.json").write_text(json.dumps(out))
