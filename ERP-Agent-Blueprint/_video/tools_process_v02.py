"""V02 on-camera: key green wall -> grid loop (297869.mp4), skin grade, 4K30, RNNoise audio chain -> work/v02/oncam/N.mp4"""
import json, subprocess, pathlib, concurrent.futures as cf
ROOT = pathlib.Path(__file__).resolve().parent
REC = ROOT.parent / "Video_02/Recording"; BG = ROOT.parent / "297869.mp4"
FF, FP = str(ROOT/"bin/ffmpeg"), str(ROOT/"bin/ffprobe")
OUT = ROOT/"work/v02/oncam"; OUT.mkdir(parents=True, exist_ok=True)
PG = "curves=master='0/0.02 0.25/0.22 0.5/0.5 0.75/0.79 1/0.98',vibrance=intensity=0.06"
AF = ("highpass=f=80,arnndn=m=work/models/sh.rnnn:mix=0.85,afftdn=nf=-30:nr=8,equalizer=f=250:t=q:w=1.2:g=-2.5,equalizer=f=3200:t=q:w=1.0:g=2.5,"
      "deesser=i=0.3,acompressor=threshold=-18dB:ratio=2.5:attack=6:release=90:makeup=1,agate=threshold=0.012:ratio=2:range=0.3:attack=5:release=150,"
      "loudnorm=I=-16:TP=-1.5:LRA=11,afade=t=in:d=0.03,aresample=48000")
def dur(p): return float(subprocess.check_output([FP,"-v","error","-show_entries","format=duration","-of","csv=p=0",str(p)]))
def job(i):
    src = REC/f"v2_{i}.mp4"; d = dur(src)
    fc = (f"[0:v]fps=30,format=yuv444p,split[a][b];"
          f"[a]chromakey=0x57B64D:0.08:0.03,format=rgba,alphaextract,erosion,gblur=sigma=1.2[m];"
          f"[b]format=rgb24,despill=type=green:mix=0.3:expand=0.1,{PG},format=rgba[fg];[fg][m]alphamerge[fga];"
          f"[1:v]fps=30,scale=1920:1080,gblur=sigma=1.4,eq=brightness=0.02:saturation=1.1[bg];"
          f"[bg][fga]overlay=format=auto:shortest=1,vignette=angle=PI/5,scale=3840:2160:flags=lanczos,unsharp=5:5:0.4,format=yuv420p[v]")
    subprocess.run([FF,"-v","error","-y","-i",str(src),"-stream_loop","-1","-i",str(BG),"-filter_complex",fc,"-map","[v]","-map","0:a",
        "-t",str(d),"-af",AF,"-c:v","h264_videotoolbox","-b:v","45M","-profile:v","high","-tag:v","avc1","-c:a","aac","-b:a","256k",
        "-movflags","+faststart",str(OUT/f"{i}.mp4")],check=True, cwd=ROOT)
    return i, dur(OUT/f"{i}.mp4")
res = {}
with cf.ThreadPoolExecutor(3) as ex:
    for i, dd in ex.map(job, range(1,18)): res[str(i)] = {"duration": dd}; print(i, dd, flush=True)
(ROOT/"work/v02/clips.json").write_text(json.dumps(res, indent=1))
