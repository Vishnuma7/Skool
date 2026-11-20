# Video 01 — edit package

## What's here
| File | What it is |
|---|---|
| `V01_REVIEW_1080p_TEMP-VO.mp4` | Full review cut (1080p) with the **temporary British voice** on the screen sections. Captions are a toggleable track (off by default). |
| `V01_Final_4K.mp4` | Final 4K master (rendered after your Fish Audio swap). |
| `V01_captions.srt` / `.vtt` | Caption files for YouTube / Vimeo (upload as subtitles; nothing is burned in). |
| `VO_for_FishAudio.txt` | The 35 voice-over paragraphs, labelled `[S1_01]` … `[S4_05]`. |

The editing project lives in `ERP-Agent-Blueprint/_video/` (Remotion). Raw footage is untouched in `Video_01/Recording/`.

## Swapping in your Fish Audio voice (one command)
1. In Fish Audio, generate **one file per block** in `VO_for_FishAudio.txt`, named exactly as the label (`S1_01.wav`, `S1_02.wav`, …). WAV or MP3 both work.
2. Put them in `ERP-Agent-Blueprint/_video/vo/fish/`.
3. In `ERP-Agent-Blueprint/_video/` run:
   ```
   npm run vo:swap
   npm run render:final
   ```
   `vo:swap` loudness-matches each file, re-times every word with Whisper and updates the timeline, so all highlights, cursor clicks, graphics and captions re-fit your real pacing. You can swap only some paragraphs; the rest keep the temp voice (the script lists which).

## Re-rendering
- Preview / tweak: `npm run studio` (opens Remotion Studio; each segment is its own composition, e.g. `seg-S1`, `seg-c7`).
- Review cut: `npm run render:review`  ·  4K master: `npm run render:final`
- Real-system captures (Odoo / n8n) can be re-taken with the scripts in `_video/capture/` (Chrome profile: `_video/tools_chrome.sh`).

## Accounts used (demo)
- Odoo: `brightleaf-supplies.odoo.com` (company switched to USD / Columbus, OH; BrightLeaf vendors, 10 products, reorder rules and starting stock loaded; RFQs P00001–P00004 exist).
- n8n: `brightleaf.app.n8n.cloud` — workflows **Stocky** and **Old-style alert**; credentials *BrightLeaf Odoo*, *OpenRouter* (real) and placeholder Gmail / Google Sheets credentials (Google is simulated in the video).
- API keys are stored only in `_video/.env` (git-ignored).
