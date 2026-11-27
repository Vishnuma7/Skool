#!/bin/zsh
# usage: ./tools_finalize.sh <raw render.mp4> <final.mp4>
# Masters audio to -14 LUFS / -1 dBTP (two-pass loudnorm), regenerates captions, muxes a toggleable
# English subtitle track (off by default) and writes .srt/.vtt beside the video.
set -e
cd "$(dirname $0)"
RAW=$1; OUT=$2; BASE=${OUT%.mp4}
FF=bin/ffmpeg
npx tsx tools_captions02.ts "$BASE"
M=$($FF -hide_banner -i "$RAW" -vn -af loudnorm=I=-14:TP=-1:LRA=11:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p')
g() { echo "$M" | python3 -I -c "import json,sys;print(json.load(sys.stdin)['$1'])"; }
$FF -v error -y -i "$RAW" -i "$BASE.srt" -map 0:v -map 0:a -map 1:0 -c:v copy \
  -af "loudnorm=I=-14:TP=-1:LRA=11:measured_I=$(g input_i):measured_TP=$(g input_tp):measured_LRA=$(g input_lra):measured_thresh=$(g input_thresh):offset=$(g target_offset):linear=true,aresample=48000,aformat=channel_layouts=stereo" -ac 2 \
  -c:a aac -b:a 256k -c:s mov_text -metadata:s:s:0 language=eng -metadata:s:s:0 title="English" -disposition:s:0 0 -movflags +faststart "$OUT"
$FF -hide_banner -i "$OUT" -map 0:a -af ebur128=peak=true -f null - 2>&1 | grep -E "^\s+(I|Peak):" | tail -2
echo "done -> $OUT"
