"""V2 on-camera processing: dark teal 'studio' wall grade (green wall keyed as a mask, regraded), brighter/warmer face,
pro voice chain. Output replaces work/oncam/N.mp4 (full-length; trims/jump cuts happen in the timeline)."""
import pathlib, subprocess, concurrent.futures as cf
ROOT = pathlib.Path(__file__).resolve().parent
REC = ROOT.parent / 'Video_01/Recording'
FF = str(ROOT / 'bin/ffmpeg')
OUT = ROOT / 'work/oncam_v2'; OUT.mkdir(parents=True, exist_ok=True)
FX = (ROOT / 'work/grade2/fx_final.txt').read_text()
PLATE = str(ROOT / 'work/grade2/plate_final.png')
MODEL = str(ROOT / 'work/models/sh.rnnn')
AUDIO = (f"highpass=f=75,arnndn=m={MODEL}:mix=0.85,afftdn=nf=-32:nr=8,"
         "agate=threshold=0.015:ratio=1.8:range=0.35:attack=4:release=180,"
         "equalizer=f=140:t=q:w=1.0:g=1.8,equalizer=f=320:t=q:w=1.3:g=-3,equalizer=f=3300:t=q:w=1.2:g=2.5,"
         "treble=g=2.0:f=9000,aexciter=amount=1.2:drive=4:blend=0:freq=6000:ceil=16000,deesser=i=0.4,"
         "acompressor=threshold=-24dB:ratio=2.2:attack=8:release=120:makeup=1.5,"
         "acompressor=threshold=-14dB:ratio=4:attack=3:release=60:makeup=1,"
         "alimiter=limit=0.89:attack=3:release=40,loudnorm=I=-16:TP=-1.5:LRA=8,afade=t=in:d=0.03,aresample=48000")
def job(i):
    fx = FX.replace('SHARPEN', 'null' if i <= 8 else 'unsharp=5:5:0.45')
    (OUT / f'fx_{i}.txt').write_text(fx)
    dst = OUT / f'{i}.mp4'
    subprocess.run([FF, '-v', 'error', '-y', '-i', str(REC / f'{i}.mp4'), '-loop', '1', '-i', PLATE, '-filter_complex_script', str(OUT / f'fx_{i}.txt'),
                    '-map', '[v]', '-map', '0:a', '-shortest', '-af', AUDIO, '-c:v', 'h264_videotoolbox', '-b:v', '45M', '-profile:v', 'high', '-tag:v', 'avc1',
                    '-c:a', 'aac', '-b:a', '256k', '-movflags', '+faststart', str(dst)], check=True)
    return i
with cf.ThreadPoolExecutor(3) as ex:
    for i in ex.map(job, range(1, 22)): print('done', i, flush=True)
