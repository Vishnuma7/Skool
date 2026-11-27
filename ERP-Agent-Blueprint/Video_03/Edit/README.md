# Video 03 — edit package

## What's here
| File | What it is |
|---|---|
| `V03_REVIEW_1080p.mp4` | Full review cut (1080p) with the **temporary British voice (Ryan)** on the screen sections. Captions are burned in, and also a toggleable track. |
| `V03_Final_4K.mp4` | Final 4K master (rendered after the Fish Audio swap). |
| `V03_REVIEW_1080p.srt` / `.vtt` | Caption files for YouTube / Vimeo / Skool. |
| `VO_for_FishAudio.txt` | The 58 voice-over paragraphs, labelled `[S1_01]` … `[S5_09]`, already corrected to match the screens. |

The editing project lives in `ERP-Agent-Blueprint/_video_V03/` (Remotion; a copy of Video 1's `_video/` adapted for Video 3, so Video 1 is untouched). Raw footage stays in `Video_03/Recording/` (git-ignored).

## Swapping in your Fish Audio voice
1. In Fish Audio, generate **one file per block** in `VO_for_FishAudio.txt`, named exactly as the label (`S1_01.wav`, `S1_02.wav`, …). WAV or MP3 both work.
2. Put them in `ERP-Agent-Blueprint/_video_V03/vo/fish/`.
3. In `ERP-Agent-Blueprint/_video_V03/` run (Git Bash):
   ```
   python -I tools_vo_swap.py && python -I tools_align_vo.py && npx tsx tools_captions.ts work/captions_tmp
   rm -rf work/chunks_*
   bash tools_render.sh 2 16 out/V03_final_4k_raw.mp4 4 && bash tools_finalize.sh out/V03_final_4k_raw.mp4 ../Video_03/Edit/V03_Final_4K.mp4
   ```
   The swap loudness-matches each file, re-times every word with Whisper and updates the timeline, so highlights, cursor clicks, graphics and captions re-fit your real pacing. Paragraphs you don't swap keep Ryan's voice.

## Re-rendering
- Preview / tweak: `npx remotion studio` (each segment is its own composition, e.g. `seg-S2`, `seg-c18a`).
- Review cut: `bash tools_render.sh 1 23 out/V03_review_1080p_raw.mp4 6 && bash tools_finalize.sh out/V03_review_1080p_raw.mp4 ../Video_03/Edit/V03_REVIEW_1080p.mp4`
- Delete `work/chunks_*` before re-rendering after an edit (finished chunks are reused).

## How it was built (Windows)
- On-camera: `tools_process_oncam_v3.py` applies Video 1's grade (green wall → teal studio, `work/grade2/` from Video 1) and voice chain; AMD AMF encoder, one clip at a time (two at once runs out of memory). Clip `v3_13` was a discarded take.
- Captions / cues: `tools_words_v3.py` aligns Whisper (`whisper.cpp`, medium.en) to `V03_Full_Script_Updated_On_Camera.pdf`, fixes mishearings and snaps word starts to real speech onsets; `tools_keeps.py` makes the jump cuts.
- Screens: real captures from the capture Chrome (`bash tools_chrome.sh`): `capture/v03_api.ts` (Open-Meteo / Frankfurter, 22 Nov 2026) and `capture/v03_odoo.ts` (read-only; hides devices and existing keys, masks the account email). On Windows, `capture/snap.ts` swaps in Inter / a Menlo-style mono font and hides scrollbars so captures match Video 1's Mac look.
- Live data in the voice-over was updated to the capture-day screens (see `FIXES` in `vo/build_vo.py`).
