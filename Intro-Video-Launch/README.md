# Intro Video Launch

Everything for the Agentic SCM intro video: the free lesson that turns free members into paid members, as a long lesson and a short teaser made in one recording session.

**New here? Read [CONTEXT.md](CONTEXT.md) first**: the situation, every decision made so far, and what's still open.

| File | What it is |
|---|---|
| `script/Intro_Long_Script` (.md / .docx / .pdf) | The full free lesson, ~10–10.5 min. |
| `script/Intro_Short_Script` (.md / .docx / .pdf) | The teaser, under 1 minute. Its own on-camera lines; the demo clips are reused from the long recording. |
| `script/About_Video_FINAL_Read_To_Camera.pdf` | **Final** About page video (~50–55 s): only the lines to say on camera. |
| `script/About_Video_Script` (.md / .docx / .pdf) | Same About video words, plus timings and on-screen text for the editor. |
| `script/About_Video_ChatGPT_Prompt.md` | The prompt used to refine the About script with ChatGPT. |
| `script/About_Video_Paced_Script.pdf` | The paced About script used on the shoot day. |
| `Production_Plan` (.md / .docx / .pdf) | Step by step: prep, recording order, voice-over, editing both versions, export specs, quality check, publishing schedule. |
| `About_Video_Editing_Process.md` | **How the About video was edited** (key, grade, voice EQ, jump cuts, graphics, captions, sound, 4K render). Reuse it for the next videos. |
| `assets/ERP_Agent_Blueprint_Banner.png` | Course banner (used in the About video's Blueprint scene). |
| `notes/About_Video_Feedback.docx` | Review notes on the first About cut (all fixed in the 4K version). |
| `exports/` | Finished videos and thumbnails. Thumbnails are in git; videos stay local. |
| `recording/About/`, `recording/Long_Intro/`, `recording/Short_Intro/` | Raw camera takes (`ab_*`, `lo_*`, `so_*`). Local only: video files are git-ignored. |
| `audio/` | Voice-over files. |

The About video's edit lives in `ERP-Agent-Blueprint/_video/` (`src/about/`, `tools_about_*.py`, `public/about_assets/`).

## Before you record
There's no single upgrade link (each member's is personal), so both videos send people to **The ERP Agent Blueprint in the Classroom**. Make sure it sits next to the free lesson, is locked to the paid tier, and that the button name matches the word "unlock" used in the scripts.

## Quick commands (run from the repo root)

Rebuild the Word and PDF files after editing a `.md`:
```
.venv\Scripts\python ERP-Agent-Blueprint/_tools/md2docx.py Intro-Video-Launch/script/Intro_Short_Script.md Intro-Video-Launch/script/Intro_Short_Script.docx
.venv\Scripts\python ERP-Agent-Blueprint/_tools/md2pdf.py  Intro-Video-Launch/script/Intro_Short_Script.md Intro-Video-Launch/script/Intro_Short_Script.pdf
```

Generate a voice-over line with Fish Audio (plus a studio-polished copy):
```
python ERP-Agent-Blueprint/_tools/fish_tts.py "Your text" -o Intro-Video-Launch/audio/SH_01.mp3 --enhance
```

## Note on the course copy
The long script also lives in the course folder at `ERP-Agent-Blueprint/00_Free_Lesson/source/Free_Video_Script.md`. **This folder is the master.** After editing here, copy it back so the two don't drift:
```
cp Intro-Video-Launch/script/Intro_Long_Script.md ERP-Agent-Blueprint/00_Free_Lesson/source/Free_Video_Script.md
```
