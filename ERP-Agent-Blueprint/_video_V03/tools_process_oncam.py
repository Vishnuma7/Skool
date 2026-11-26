"""Trim + grade + audio-enhance on-camera clips -> work/oncam/N.mp4 (3840x2160@30, H.264) and clips.json"""
import json, re, subprocess, pathlib, concurrent.futures as cf
ROOT = pathlib.Path(__file__).resolve().parent
REC = ROOT.parent / "Video_01/Recording"
FF, FP = str(ROOT/"bin/ffmpeg"), str(ROOT/"bin/ffprobe")
OUT = ROOT/"work/oncam"; OUT.mkdir(parents=True, exist_ok=True)
GA, GB = (ROOT/"work/grade/A.txt").read_text().strip(), (ROOT/"work/grade/B.txt").read_text().strip()
AUDIO = ("highpass=f=80,afftdn=nf=-28:tn=1,equalizer=f=250:t=q:w=1.2:g=-2.5,equalizer=f=3200:t=q:w=1.0:g=2.5,"
         "deesser=i=0.35,acompressor=threshold=-20dB:ratio=3:attack=6:release=90:makeup=2")
def dur(p): return float(subprocess.check_output([FP,"-v","error","-show_entries","format=duration","-of","csv=p=0",str(p)]))
def tail_cut(i, d):
    log = subprocess.run([FF,"-hide_banner","-i",str(ROOT/f"work/wav16/{i}.wav"),"-af","silencedetect=noise=-38dB:d=0.45","-f","null","-"],capture_output=True,text=True).stderr
    st = [float(x) for x in re.findall(r"silence_start: ([0-9.]+)", log)]
    en = [float(x) for x in re.findall(r"silence_end: ([0-9.]+)", log)]
    if st and (len(en) < len(st) or en[-1] > d - 0.3): return min(st[-1] + 0.35, d)
    return d
def job(i):
    src = REC/f"{i}.mp4"; d = dur(src); out = tail_cut(i, d); t = round(out, 3)
    grade = GA if i <= 8 else GB
    sharpen = "" if i <= 8 else ",unsharp=5:5:0.45"
    vf = f"fps=30,scale=3840:2160:flags=lanczos{sharpen},{grade},format=yuv420p"
    af = f"{AUDIO},afade=t=in:d=0.03,afade=t=out:st={max(t-0.06,0)}:d=0.06,aresample=48000"
    subprocess.run([FF,"-v","error","-y","-i",str(src),"-t",str(t),"-vf",vf,"-af",af,
        "-c:v","h264_videotoolbox","-b:v","45M","-profile:v","high","-tag:v","avc1",
        "-c:a","aac","-b:a","256k","-movflags","+faststart",str(OUT/f"{i}.mp4")],check=True)
    return i, {"src": str(src), "trimOut": t, "duration": dur(OUT/f"{i}.mp4")}
res = {}
with cf.ThreadPoolExecutor(3) as ex:
    for i, r in ex.map(job, range(1,22)): res[i] = r; print(i, r["trimOut"], r["duration"], flush=True)
(ROOT/"work/clips.json").write_text(json.dumps(res, indent=1))
