"""Video 3 on-camera processing — same look as Video 1 (tools_process_oncam_v2.py):
green wall keyed to the dark-teal studio plate (work/grade2, from Video 1), brighter/warmer face, same pro voice chain.
Differences for Windows / this footage:
  * raw clips are 1080p HEVC (Video_03/Recording/v3_N.mp4, N = 1..34 without 13); the grade upscales to 3840x2160,
    so every clip gets the mild sharpen Video 1 used on its softer clips.
  * encoder: AMD AMF (h264_amf) instead of macOS VideoToolbox; ffmpeg 9 uses -/filter_complex instead of -filter_complex_script.
  * the RNNoise model path is relative (a Windows drive colon would break the filter syntax), so we run with cwd = ROOT.
Output: work/oncam/N.mp4 (full length; trims / jump cuts happen in the timeline). Usage: python -I tools_process_oncam_v3.py [N ...]"""
import pathlib, subprocess, sys, concurrent.futures as cf
ROOT = pathlib.Path(__file__).resolve().parent
REC = ROOT.parent / 'Video_03/Recording'
FF = str(ROOT / 'bin/ffmpeg')
OUT = ROOT / 'work/oncam'; OUT.mkdir(parents=True, exist_ok=True)
FX = (ROOT / 'work/grade2/fx_final.txt').read_text()
PLATE = 'work/grade2/plate_final.png'
MODEL = 'work/models/sh.rnnn'
AUDIO = (f"highpass=f=75,arnndn=m={MODEL}:mix=0.85,afftdn=nf=-32:nr=8,"
         "agate=threshold=0.015:ratio=1.8:range=0.35:attack=4:release=180,"
         "equalizer=f=140:t=q:w=1.0:g=1.8,equalizer=f=320:t=q:w=1.3:g=-3,equalizer=f=3300:t=q:w=1.2:g=2.5,"
         "treble=g=2.0:f=9000,aexciter=amount=1.2:drive=4:blend=0:freq=6000:ceil=16000,deesser=i=0.4,"
         "acompressor=threshold=-24dB:ratio=2.2:attack=8:release=120:makeup=1.5,"
         "acompressor=threshold=-14dB:ratio=4:attack=3:release=60:makeup=1,"
         "alimiter=limit=0.89:attack=3:release=40,loudnorm=I=-16:TP=-1.5:LRA=8,afade=t=in:d=0.03,aresample=48000")
CLIPS = [n for n in range(1, 35) if n != 13]

def job(i: int) -> int:
    fx = FX.replace('SHARPEN', 'unsharp=5:5:0.45')
    (OUT / f'fx_{i}.txt').write_text(fx)
    subprocess.run([FF, '-v', 'error', '-y', '-i', str(REC / f'v3_{i}.mp4'), '-loop', '1', '-i', PLATE,
                    '-/filter_complex', f'work/oncam/fx_{i}.txt', '-map', '[v]', '-map', '0:a', '-shortest', '-af', AUDIO,
                    '-c:v', 'h264_amf', '-quality', 'quality', '-rc', 'cbr', '-b:v', '45M', '-profile:v', 'high',
                    '-c:a', 'aac', '-b:a', '256k', '-movflags', '+faststart', f'work/oncam/{i}.mp4'], check=True, cwd=ROOT)
    return i

if __name__ == '__main__':
    todo = [int(a) for a in sys.argv[1:]] or CLIPS
    with cf.ThreadPoolExecutor(1) as ex:
        for i in ex.map(job, todo): print('done', i, flush=True)
