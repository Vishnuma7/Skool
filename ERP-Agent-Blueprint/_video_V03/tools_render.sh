#!/usr/bin/env bash
# Robust chunked render (Video 3, Windows + macOS): video in chunks (muted, with retries) + one audio pass, then lossless concat + mux.
# usage: ./tools_render.sh <scale> <crf> <out_raw.mp4> [concurrency]
set -e
cd "$(dirname "$0")"
SCALE=$1; CRF=$2; OUT=$3; CONC=${4:-5}
COMP=V03
TOTAL=$(npx tsx -e "import {TOTAL_FRAMES} from './src/timeline'; console.log(TOTAL_FRAMES)")
CH=${CH:-4000}; DIR=work/chunks_$(basename "$OUT" .mp4); mkdir -p "$DIR" "$(dirname "$OUT")"
COMMON=(--scale=$SCALE --concurrency=$CONC --offthreadvideo-cache-size-in-bytes=${CACHE:-1500000000} --log=warn)
if [ ! -s "$DIR/audio.wav" ]; then npx remotion render $COMP "$DIR/audio.wav" --codec=wav --log=warn; fi
i=0; : > "$DIR/list.txt"
for ((a=0; a<TOTAL; a+=CH)); do
  b=$(( a+CH-1 < TOTAL-1 ? a+CH-1 : TOTAL-1 )); f=v_$(printf %03d $i).mp4
  if [ ! -s "$DIR/$f" ]; then
    for try in 1 2; do
      echo "chunk $i frames $a-$b (try $try)"
      if npx remotion render $COMP "$DIR/$f" --frames=$a-$b --muted --codec=h264 --crf=$CRF --x264-preset=medium "${COMMON[@]}"; then break; fi
      rm -f "$DIR/$f"
    done
    if [ ! -s "$DIR/$f" ]; then   # Remotion's frame extractor can fail deep into a long chunk; smaller pieces avoid it
      SUB=${SUB:-500}; : > "$DIR/sub_$i.txt"
      for ((c=a; c<=b; c+=SUB)); do
        d=$(( c+SUB-1 < b ? c+SUB-1 : b )); g=s_${i}_$c.mp4
        for try in 1 2 3; do
          [ -s "$DIR/$g" ] && break
          echo "chunk $i piece $c-$d (try $try)"
          npx remotion render $COMP "$DIR/$g" --frames=$c-$d --muted --codec=h264 --crf=$CRF --x264-preset=medium "${COMMON[@]}" && break
          rm -f "$DIR/$g"; [ $try = 3 ] && { echo "chunk $i piece $c failed"; exit 1; }
        done
        echo "file '$g'" >> "$DIR/sub_$i.txt"
      done
      bin/ffmpeg -v error -y -f concat -safe 0 -i "$DIR/sub_$i.txt" -c copy "$DIR/$f"
    fi
  fi
  echo "file '$f'" >> "$DIR/list.txt"; i=$((i+1))   # relative to list.txt (native ffmpeg can't read /d/... paths)
done
bin/ffmpeg -v error -y -f concat -safe 0 -i "$DIR/list.txt" -i "$DIR/audio.wav" -map 0:v -map 1:a -c:v copy -ac 2 -c:a aac -b:a 320k -movflags +faststart "$OUT"
bin/ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT"
echo "rendered -> $OUT"
