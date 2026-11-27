# Production Plan: Intro Video (Long + Short)

**One recording session, two videos.** Record the long free lesson first, then the short teaser's two on-camera parts in the same setup. The short's demo reuses footage from the long recording, so the demo is recorded only once.

| | Long: Full free lesson | Short: Teaser |
|---|---|---|
| Script | `script/Intro_Long_Script` (.md / .docx / .pdf) | `script/Intro_Short_Script` (.md / .docx / .pdf) |
| Length | ~10–10.5 min | Under 1 min (~120 spoken words) |
| Job | Teach, build desire, sell the paid tier | Stop the scroll, show Stocky, send people to the lesson and the upgrade |
| Where | Skool Classroom (first, open lesson) + the launch post | Skool feed, LinkedIn, Reels/Shorts, DMs to free members |
| Frame | 16:9, 4K master + 1080p | 9:16 (1080×1920), plus a 16:9 copy for Skool |
| Audio | −16 LUFS, −1.5 dBTP | −14 LUFS, −1 dBTP (social platforms) |
| Captions | Separate .srt/.vtt file (not burned in) | Burned in, large, 2–4 words at a time (most people watch muted) |

---

## Step 1: Before recording

**Scripts**
- [ ] In Skool, put The ERP Agent Blueprint in the Classroom right next to the free lesson, locked to the paid tier. Each member's upgrade link is personal, so both videos send people there instead of to a link.
- [ ] Log in as a free member (or a test account) and note the exact button name shown on the locked course. The scripts say "unlock"; change the word if Skool uses a different one.
- [ ] Read both scripts out loud once and mark the spots where you stumble.

**Slides** (save in `recording/slides/`)
- [ ] "3 doors" diagram: Stocky in the middle, doors labelled ERP, API, DATABASE.
- [ ] "Journey" slide: 4 milestones (Videos 1–3: your own ERP + live API · Video 5: your first workflow · Video 7: Stocky reads & drafts POs · Video 10: risk scores, reports, live).
- [ ] "What's in the paid tier" slide: The ERP Agent Blueprint · weekly live sessions · implementation support · templates & prompts · every new course included.
- [ ] End cards: long ("Upgrade to the Agentic SCM paid tier and build Stocky yourself → Classroom → The ERP Agent Blueprint") and short ("Build Stocky yourself → Agentic SCM on Skool → The ERP Agent Blueprint").

**Demo** (reuse the Video 01 setup; see `ERP-Agent-Blueprint/Video_01/Edit/README.md`)
- [ ] Odoo `brightleaf-supplies` has 4 products below their reorder point (BL-1002, BL-1004, BL-1005, BL-1007).
- [ ] n8n Stocky workflow tested end to end: chat question → reply → "Draft the PO for the gloves" → approval email → Approve → Odoo RFQ + Sheet row.
- [ ] Reset the demo afterwards (delete test RFQs) so it can be recorded again.
- [ ] Check first: Video 01 already has a Stocky demo. Its captures in `ERP-Agent-Blueprint/_video/` may be reusable for the "Meet Stocky, Live" section, which would save a recording.

**Camera, sound and disk**
- [ ] Frame yourself in the centre with space above your head, so on-camera footage also crops to vertical.
- [ ] Use an external mic, a quiet room, and soft light from the front.
- [ ] Record a 10-second test and play it back before starting.
- [ ] Free up disk space first. 4K video needs several GB per take.

## Step 2: Recording (in this order)

| Take | What | Notes |
|---|---|---|
| A | Long script: all **[ON CAMERA]** sections | Top to bottom. If you stumble, restart the whole sentence. |
| B | Short script: **Hook** and **Call to action** | Same framing and light, straight after take A. Record each part twice. Higher energy than the long version: it has 2 seconds to grab attention. |
| C | Long script: all **[SCREEN RECORDING]** sections | Follow `ERP-Agent-Blueprint/00_Free_Lesson/source/Free_Screen_Recording_Prompts.md`. On the Stocky demo, zoom in on the chat reply, the Approve email and the Odoo draft: the short reuses these clips in vertical. |

> The screen-recording prompts still describe the old course tour (10 titles one by one). Update the "What's inside" prompt to the new journey and paid-tier slides before take C.

Save raw files in `recording/` (video files are git-ignored, so they stay on your machine only).

## Step 3: Voice-over

Use your Fish Audio voice (same method as Video 01) or record the SAY lines yourself.

- **Long:** put the screen-section SAY text into the prompts file, then generate each paragraph:
  `python ERP-Agent-Blueprint/_tools/add_voiceover.py Intro-Video-Launch/script/Intro_Long_Script.md ERP-Agent-Blueprint/00_Free_Lesson/source/Free_Screen_Recording_Prompts.md`
- **Short:** the 4 demo lines are in the "Voice-over text for Fish Audio" box at the end of the short script.
- Generate with the studio polish, one file per paragraph (`L_S1_01`, `SH_01`, …):
  `python ERP-Agent-Blueprint/_tools/fish_tts.py "<paragraph>" -o Intro-Video-Launch/audio/SH_01.mp3 --enhance`
- Listen to every file and regenerate any that sound off (names, numbers, "Odoo", "n8n").

## Step 4: Edit the long version

1. Put the takes together in script order: on camera (A) and screen (C + voice-over).
2. Add the **ON-SCREEN TEXT** lines from the script as clean lower-thirds.
3. Add the two upgrade moments, always with the same words, "Upgrade to the Agentic SCM paid tier and build Stocky yourself → Classroom → The ERP Agent Blueprint":
   - about 6:30, straight after the demo: on-screen text;
   - outro: the end card for the last 10 seconds.
4. Light background music, very low under on-camera parts (optional), none under the demo.
5. Audio: master to −16 LUFS (`enhance_audio.py` does this for voice files).
6. Captions: export `.srt`/`.vtt`. If you use the Remotion pipeline, clone `ERP-Agent-Blueprint/_video/` into `_video_Intro/` and reuse `npm run captions`.
7. Export a 4K master and 1080p to `exports/Intro_Long_4K.mp4` and `exports/Intro_Long_1080p.mp4`.

> The Remotion scripts in `_video/` are written for a Mac (`.sh` scripts, `python3`, `/Users/...` paths). On Windows they need small changes, or run them on the Mac.

## Step 5: Edit the short version

1. **Hook (0:00–0:13):** take B. Put the big text hook on screen from the first frame: *"She loses 12 hours a week to copy-paste."*
2. **Demo (0:13–0:43):** 4 clips from take C's Stocky section, cropped to 9:16 and zoomed on the important part, with the 4 new voice-over lines. Keep each clip to 6–8 seconds.
3. **Call to action (0:43–0:58):** take B, then the end card for the last 3 seconds.
4. Burned-in captions: large, high contrast, 2–4 words at a time, key words highlighted (12 hours, a day and a half, Approve, no code).
5. Audio: −14 LUFS. Optional light music under the whole short.
6. **Hard limit: 60 seconds.** If it runs over, shorten the pauses between demo clips first, not the spoken lines.
7. Export `exports/Intro_Short_9x16.mp4` and `exports/Intro_Short_16x9.mp4`.

## Step 6: Quality check before publishing

- [ ] As a free member: the Classroom shows The ERP Agent Blueprint next to the free lesson, it's locked, and the upgrade checkout works.
- [ ] The button name in the video matches what Skool shows.
- [ ] Numbers match in both videos: 12 hours, $18,000+, 4 products, 780 pairs, 10 videos / ~4 hours.
- [ ] The demo shows no real customer data, passwords or API keys.
- [ ] Captions are checked for names: Odoo, n8n, BrightLeaf, SafeHands Co., Adithyan.
- [ ] The short is 60 seconds or less and makes sense with the sound off.
- [ ] Watch both videos once on a phone.

## Step 7: Publishing (matches the launch plan)

| When | Long | Short |
|---|---|---|
| Day 0 (launch) | Classroom: first, open lesson. Feed: launch post **with "email all members" ticked**, pinned. | Posted on LinkedIn the same day, pointing to the community. |
| Days 1–3 | Reply to every homework comment. | Skool feed teaser for members who missed the email; send in personal DMs to the most active free members. |
| Day 6 | Shown in the live "Build Stocky" workshop. | Used to promote the workshop. |
| Days 7–13 | Re-shared in reminder posts that show what members are building (no invented deadlines). | Reels/Shorts on social media. |

## Folder map

```
Intro-Video-Launch/
├── README.md               ← start here
├── Production_Plan.md/.docx/.pdf
├── script/
│   ├── Intro_Long_Script.md/.docx/.pdf   ← full free lesson (~10 min), the master
│   └── Intro_Short_Script.md/.docx/.pdf  ← teaser (under 1 min)
├── recording/              ← raw takes and slides (video files stay local)
├── audio/                  ← Fish Audio voice-over files
└── exports/                ← finished long and short videos
```
