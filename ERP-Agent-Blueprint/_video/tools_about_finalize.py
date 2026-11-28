"""About video: final master. Two-pass loudness to -14 LUFS / -1 dBTP (social/web), H.264 High + AAC, fast start.

Usage: ..\\..\\.venv\\Scripts\\python -I tools_about_finalize.py out/about_raw.mp4 ../../Intro-Video-Launch/exports/Agentic_SCM_About_1080p.mp4
"""
import json, re, subprocess, sys

src, dst = sys.argv[1], sys.argv[2]
TARGET = "I=-14:TP=-1.0:LRA=11"
r = subprocess.run(["ffmpeg", "-hide_banner", "-nostats", "-i", src, "-af", f"loudnorm={TARGET}:print_format=json", "-f", "null", "-"],
                   capture_output=True, text=True)
m = json.loads(re.findall(r"\{[^{}]+\}", r.stderr)[-1])
af = (f"loudnorm={TARGET}:measured_I={m['input_i']}:measured_TP={m['input_tp']}:measured_LRA={m['input_lra']}"
      f":measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true,aresample=48000")
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", src, "-af", af, "-c:v", "libx264", "-profile:v", "high", "-preset", "medium", "-crf", "18",
                "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-movflags", "+faststart", dst], check=True)
print(f"in: {m['input_i']} LUFS / {m['input_tp']} dBTP  ->  {dst}")
