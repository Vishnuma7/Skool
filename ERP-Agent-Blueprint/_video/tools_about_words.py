"""About video: word-level transcript of each raw take -> src/about/words.json  {"ab_N": [[word, start, end], ...]}

Usage: ..\\..\\.venv\\Scripts\\python -I tools_about_words.py <raw_dir>
"""
import json, pathlib, subprocess, sys
import numpy as np
from faster_whisper import WhisperModel

ROOT = pathlib.Path(__file__).resolve().parent
FIX = {"adityan": "Adithyan", "aditya": "Adithyan", "adithya": "Adithyan", "agentic": "Agentic", "scm": "SCM", "erp": "ERP"}

if __name__ == "__main__":
    raw = pathlib.Path(sys.argv[1])
    model = WhisperModel("medium.en", device="cpu", compute_type="int8")
    out = {}
    for i in range(1, 9):
        pcm = subprocess.run(["ffmpeg", "-v", "error", "-i", str(raw / f"ab_{i}.mp4"), "-ac", "1", "-ar", "16000", "-f", "f32le", "-"],
                             capture_output=True, check=True).stdout
        audio = np.frombuffer(pcm, np.float32)
        segs, _ = model.transcribe(audio, word_timestamps=True, beam_size=5,
                                   initial_prompt="Adithyan, Agentic SCM, ERP, Excel, the ERP Agent Blueprint, procurement, inventory, planning.")
        ws = []
        for s in segs:
            for w in s.words:
                t = w.word.strip()
                core = "".join(ch for ch in t if ch.isalnum()).lower()
                if core in FIX:
                    t = t.replace(t.strip(".,?!"), FIX[core]) if t.strip(".,?!") else t
                ws.append([t, round(w.start, 3), round(w.end, 3)])
        out[f"ab_{i}"] = ws
        print(f"ab_{i}:", " ".join(f"{w[0]}[{w[1]:.2f}]" for w in ws), flush=True)
    dst = ROOT / "src" / "about" / "words.json"
    dst.parent.mkdir(parents=True, exist_ok=True)
    dst.write_text(json.dumps(out, indent=0))
