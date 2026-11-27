#!/bin/zsh
# Render one Video 04 screen section as a standalone 1080p review file, ready to merge with the on-camera footage later.
# usage: ./tools_render04.sh S1 "What_a_Database_Really_Is"
set -e
cd "$(dirname $0)"
SEG=$1; NAME=$2
OUTDIR=../Video_04/Screen_Recordings; mkdir -p $OUTDIR
DIR=work/chunks_v04_$SEG; mkdir -p $DIR
COMP=v04-$SEG
TOTAL=$(npx tsx -e "import {layout} from './src/v04/timeline'; console.log(layout().find(x => x.seg.id === '$SEG')!.dur)")
COMMON=(--scale=1 --concurrency=5 --offthreadvideo-cache-size-in-bytes=1500000000 --log=warn)
[ -s $DIR/audio.wav ] || npx remotion render $COMP $DIR/audio.wav --codec=wav --log=warn
CH=3600; i=0; : > $DIR/list.txt
for ((a=0; a<TOTAL; a+=CH)); do
  b=$(( a+CH-1 < TOTAL-1 ? a+CH-1 : TOTAL-1 )); f=$DIR/v_$(printf %03d $i).mp4
  if [ ! -s $f ]; then
    for try in 1 2 3; do
      echo "$SEG chunk $i frames $a-$b (try $try)"
      if npx remotion render $COMP $f --frames=$a-$b --muted --codec=h264 --crf=18 --x264-preset=medium "${COMMON[@]}"; then break; fi
      rm -f $f; [ $try = 3 ] && { echo "chunk failed"; exit 1; }
    done
  fi
  echo "file '$PWD/$f'" >> $DIR/list.txt; i=$((i+1))
done
RAW=$DIR/raw.mp4
bin/ffmpeg -v error -y -f concat -safe 0 -i $DIR/list.txt -i $DIR/audio.wav -map 0:v -map 1:a -c:v copy -ac 2 -c:a aac -b:a 320k $RAW
OUT="$OUTDIR/V04_${SEG}_${NAME}_1080p_TEMP-VO.mp4"; SRT=work/v04/captions/V04_${SEG}_captions.srt
M=$(bin/ffmpeg -hide_banner -i $RAW -vn -af loudnorm=I=-14:TP=-1:LRA=11:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p')
g() { echo "$M" | python3 -I -c "import json,sys;print(json.load(sys.stdin)['$1'])"; }
bin/ffmpeg -v error -y -i $RAW -i $SRT -map 0:v -map 0:a -map 1:0 -c:v copy \
  -af "loudnorm=I=-14:TP=-1:LRA=11:measured_I=$(g input_i):measured_TP=$(g input_tp):measured_LRA=$(g input_lra):measured_thresh=$(g input_thresh):offset=$(g target_offset):linear=true,aresample=48000,aformat=channel_layouts=stereo" -ac 2 \
  -c:a aac -b:a 256k -c:s mov_text -metadata:s:s:0 language=eng -metadata:s:s:0 title="English" -disposition:s:0 0 -movflags +faststart "$OUT"
cp $SRT "$OUTDIR/V04_${SEG}_${NAME}_captions.srt"; cp ${SRT%.srt}.vtt "$OUTDIR/V04_${SEG}_${NAME}_captions.vtt"
bin/ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT"
echo "done -> $OUT"
