#!/usr/bin/env bash
# Turn a raw generated clip into a web loop: crossfade the tail into the head for a
# seamless loop, then export mp4 (h264) + webm (vp9) at <=1920w, no audio, + poster jpg.
# Usage: scripts/gen/video.sh <name> <raw.mp4> [xfade_seconds=0.75] [crf_mp4=21] [crf_webm=30]
#
# Loop construction (each step is a separate pass; a single combined filtergraph
# misaligned the trims in testing):
#   norm  = raw scaled to <=1920w, 24fps, yuv420p
#   body  = norm[XF .. DUR-XF]
#   seam  = blend(tail = norm[DUR-XF .. DUR], head = norm[0 .. XF]) with weight ramping 0 -> 1
#   loop  = body + seam   -> the last seam frame == head's last frame, which flows into body[0]
# Verify with: node scripts/gen/loopcheck.mjs public/media/video/<name>.mp4
set -euo pipefail
NAME="$1"; RAW="$2"; XF="${3:-0.75}"; CRF="${4:-21}"; WCRF="${5:-30}"
OUT=public/media/video; TMP=_gen/vid/tmp/$NAME; mkdir -p "$OUT" "$TMP"
# Homebrew ffmpeg may be broken (dylib mismatch); default to the static build in _gen.
FF="${FFMPEG:-_gen/node_modules/ffmpeg-static/ffmpeg}"
[ -x "$FF" ] || FF=ffmpeg
ENC=(-an -c:v libx264 -crf 10 -preset fast -pix_fmt yuv420p)

"$FF" -y -v error -i "$RAW" -vf "scale='min(1920,iw)':-2:flags=lanczos,fps=24,format=yuv420p" "${ENC[@]}" "$TMP/norm.mp4"
DUR=$( { "$FF" -i "$TMP/norm.mp4" 2>&1 || true; } | sed -n 's/.*Duration: \([0-9:.]*\).*/\1/p' | awk -F: '{print $1*3600+$2*60+$3}')
TS=$(echo "$DUR - $XF" | bc -l)
NF=$(printf "%.0f" "$(echo "$XF * 24 - 1" | bc -l)")   # seam frames - 1, so the last seam frame is 100% head

"$FF" -y -v error -i "$TMP/norm.mp4" -vf "trim=start=$XF:end=$TS,setpts=PTS-STARTPTS" "${ENC[@]}" "$TMP/body.mp4"
"$FF" -y -v error -i "$TMP/norm.mp4" -vf "trim=start=$TS,setpts=PTS-STARTPTS" "${ENC[@]}" "$TMP/tail.mp4"
"$FF" -y -v error -i "$TMP/norm.mp4" -vf "trim=end=$XF,setpts=PTS-STARTPTS" "${ENC[@]}" "$TMP/head.mp4"
"$FF" -y -v error -i "$TMP/tail.mp4" -i "$TMP/head.mp4" -filter_complex \
  "[0:v][1:v]blend=all_expr='A*(1-min(N/$NF\,1))+B*min(N/$NF\,1)':shortest=1" "${ENC[@]}" "$TMP/seam.mp4"
"$FF" -y -v error -i "$TMP/body.mp4" -i "$TMP/seam.mp4" -filter_complex "[0:v][1:v]concat=n=2:v=1:a=0" "${ENC[@]}" "$TMP/loop.mp4"

"$FF" -y -v error -i "$TMP/loop.mp4" -an -c:v libx264 -profile:v high -preset veryslow -crf "$CRF" \
  -pix_fmt yuv420p -movflags +faststart "$OUT/$NAME.mp4"
"$FF" -y -v error -i "$TMP/loop.mp4" -an -c:v libvpx-vp9 -b:v 0 -crf "$WCRF" -row-mt 1 -deadline good -cpu-used 2 \
  -pix_fmt yuv420p "$OUT/$NAME.webm"
"$FF" -y -v error -i "$TMP/loop.mp4" -frames:v 1 -q:v 2 "$OUT/$NAME.jpg"
ls -l "$OUT/$NAME".* | awk '{print $5, $9}'
