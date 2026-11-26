#!/usr/bin/env bash
# Loudness-match VO paragraphs to the on-camera audio (-16 LUFS, -1.5 dBTP). Keeps duration identical.
cd "$(dirname $0)"
for f in vo/S*_*.mp3; do
  bin/ffmpeg -v error -y -i "$f" -af "highpass=f=70,loudnorm=I=-16:TP=-1.5:LRA=9,aresample=48000" -c:a libmp3lame -q:a 2 "${f%.mp3}.tmp.mp3" && mv "${f%.mp3}.tmp.mp3" "$f"
done
echo normalized $(ls vo/S*_*.mp3 | wc -l)
