"""V04 on-camera (1080p sources, 30/60 fps -> 30), Video 01 look: green wall regraded to the dark teal studio plate (work/grade2), same face grade + v2 voice chain.
No moving background. Output: work/v02/oncam/N.mp4 (same durations as source, so keeps/cues stay valid)."""
import subprocess, pathlib, concurrent.futures as cf
ROOT = pathlib.Path(__file__).resolve().parent
REC = ROOT.parent / 'Video_04/Recording'
FF, FP = str(ROOT / 'bin/ffmpeg'), str(ROOT / 'bin/ffprobe')
OUT = ROOT / 'work/v04/oncam'; OUT.mkdir(parents=True, exist_ok=True)
FX = (ROOT / 'work/grade2/fx_final.txt').read_text().replace('SHARPEN', 'unsharp=5:5:0.45')
PLATE = str(ROOT / 'work/grade2/plate_final.png')
MODEL = str(ROOT / 'work/models/sh.rnnn')
AUDIO = (f"highpass=f=75,arnndn=m={MODEL}:mix=0.85,afftdn=nf=-32:nr=8,"
         "agate=threshold=0.015:ratio=1.8:range=0.35:attack=4:release=180,"
         "equalizer=f=140:t=q:w=1.0:g=1.8,equalizer=f=320:t=q:w=1.3:g=-3,equalizer=f=3300:t=q:w=1.2:g=2.5,"
         "treble=g=2.0:f=9000,aexciter=amount=1.2:drive=4:blend=0:freq=6000:ceil=16000,deesser=i=0.4,"
         "acompressor=threshold=-24dB:ratio=2.2:attack=8:release=120:makeup=1.5,"
         "acompressor=threshold=-14dB:ratio=4:attack=3:release=60:makeup=1,"
         "alimiter=limit=0.89:attack=3:release=40,loudnorm=I=-16:TP=-1.5:LRA=8,afade=t=in:d=0.03,aresample=48000")
(OUT / 'fx.txt').write_text(FX)
def dur(p): return float(subprocess.check_output([FP, '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', str(p)]))
def job(i):
    src = REC / f'v4_{i}.mp4'; tmp = OUT / f'{i}.new.mp4'
    subprocess.run([FF, '-v', 'error', '-y', '-i', str(src), '-loop', '1', '-i', PLATE, '-filter_complex_script', str(OUT / 'fx.txt'),
                    '-map', '[v]', '-map', '0:a', '-t', str(dur(src)), '-af', AUDIO, '-c:v', 'h264_videotoolbox', '-b:v', '45M', '-profile:v', 'high',
                    '-tag:v', 'avc1', '-c:a', 'aac', '-b:a', '256k', '-movflags', '+faststart', str(tmp)], check=True)
    tmp.replace(OUT / f'{i}.mp4')
    return i, dur(OUT / f'{i}.mp4')
with cf.ThreadPoolExecutor(3) as ex:
    for i, d in ex.map(job, range(1, 27)): print('done', i, d, flush=True)
