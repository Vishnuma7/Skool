#!/bin/zsh
# Robust chunked render: video in chunks (muted, with retries) + one audio pass, then lossless concat + mux.
# usage: ./tools_render.sh <scale> <crf> <out_raw.mp4> [concurrency]
set -e
cd "$(dirname $0)"
SCALE=$1; CRF=$2; OUT=$3; CONC=${4:-5}
TOTAL=$(npx tsx -e "import {FULL_TOTAL} from './src/v06/timeline'; console.log(FULL_TOTAL)")
CH=4000; DIR=work/chunks_$(basename $OUT .mp4); mkdir -p $DIR
COMMON=(--scale=$SCALE --concurrency=$CONC --offthreadvideo-cache-size-in-bytes=1500000000 --log=warn)
if [ ! -s $DIR/audio.wav ]; then
  j=0; : > $DIR/alist.txt
  for ((a=0; a<TOTAL; a+=8000)); do
    b=$(( a+7999 < TOTAL-1 ? a+7999 : TOTAL-1 )); w=$DIR/a_$(printf %03d $j).wav
    if [ ! -s $w ]; then
      for try in 1 2 3; do
        echo "audio $j frames $a-$b (try $try)"
        if npx remotion render V06 $w --frames=$a-$b --codec=wav --concurrency=4 --log=warn; then break; fi
        rm -f $w; [ $try = 3 ] && { echo "audio $j failed"; exit 1; }
      done
    fi
    echo "file '$PWD/$w'" >> $DIR/alist.txt; j=$((j+1))
  done
  bin/ffmpeg -v error -y -f concat -safe 0 -i $DIR/alist.txt -c copy $DIR/audio.wav
fi
i=0; : > $DIR/list.txt
for ((a=0; a<TOTAL; a+=CH)); do
  b=$(( a+CH-1 < TOTAL-1 ? a+CH-1 : TOTAL-1 )); f=$DIR/v_$(printf %03d $i).mp4
  if [ ! -s $f ]; then
    for try in 1 2 3; do
      echo "chunk $i frames $a-$b (try $try)"
      if npx remotion render V06 $f --frames=$a-$b --muted --codec=h264 --crf=$CRF --x264-preset=medium "${COMMON[@]}"; then break; fi
      rm -f $f; [ $try = 3 ] && { echo "chunk $i failed"; exit 1; }
    done
  fi
  echo "file '$PWD/$f'" >> $DIR/list.txt; i=$((i+1))
done
bin/ffmpeg -v error -y -f concat -safe 0 -i $DIR/list.txt -i $DIR/audio.wav -map 0:v -map 1:a -c:v copy -ac 2 -c:a aac -b:a 320k -movflags +faststart $OUT
bin/ffprobe -v error -show_entries format=duration -of csv=p=0 $OUT
echo "rendered -> $OUT"
