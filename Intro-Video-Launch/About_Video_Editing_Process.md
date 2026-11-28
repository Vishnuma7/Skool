# How the About Video Was Edited

This note covers how the 49-second About video went from 8 raw green-screen takes to the final 4K file, and how to repeat it for the next on-camera video (for example the long intro or free lesson). Nothing was edited by hand in an editing app: the whole edit is code (Python + ffmpeg for the footage, Remotion for the edit), so it can be re-run and changed at any time.

**Final output:** `Intro-Video-Launch/exports/Agentic_SCM_About_4K.mp4` (3840×2160, 49.4 s, −14 LUFS)

---

## 1. Style, in one line

Minimal and fast: tight jump cuts, punch-ins, a light branded background behind the presenter (green wall keyed out), word-by-word captions, a few clean graphics that appear exactly on the words they illustrate, soft pops and whooshes, and quiet music under the voice.

The look is taken from the course thumbnail: light blue-white background with a dot grid, a blue diagonal on the right, navy and blue Inter type, green for "approved" moments.

---

## 2. Where everything lives

All paths are inside `ERP-Agent-Blueprint/_video/`.

| What | Where |
|---|---|
| Raw takes (local only, not in git) | `Intro-Video-Launch/recording/About/ab_1.mp4 … ab_8.mp4` |
| Step 1: key, grade, sharpen, clean audio | `tools_about_prep.py` |
| Step 2: word timings (for captions and graphic timing) | `tools_about_words.py` → `src/about/words.json` |
| Step 3: jump cuts | `tools_about_keeps.py` → `src/about/keeps.json` |
| Step 4: the edit itself (Remotion) | `src/about/About.tsx`, `src/about/timeline.ts` |
| Step 5: loudness and final encode | `tools_about_finalize.py` |
| Thumbnail | `src/about/Thumb.tsx` (Still `AboutThumb`) |
| Images used in the video | `public/about_assets/` (course banner, presenter cut-out) |
| Processed footage (generated, not in git) | `public/about/ab_N.webm`, `ab_N.wav`, `bed.wav` |
| Music and sound effects | `public/music/bed_edu.mp3`, `public/sfx/{pop,whoosh,click,ding}.wav` |

---

## 3. The steps

### Step 1: Clean up each take (`tools_about_prep.py`)

```
..\..\.venv\Scripts\python -I tools_about_prep.py <folder with ab_1..ab_8.mp4>
```

For every take it writes a transparent video and a clean voice track.

**Picture**
- **Green key (custom, not ffmpeg's `chromakey`).** ffmpeg's keyer also ate the black T-shirt and dark hair, so the key is written in numpy: transparency comes from *how much green is stronger than red/blue* (`g − max(r, b)`), ramped between 0.05 and 0.14. The edge is pulled in 1 px and softened, so there is no green outline.
- **Despill:** green is never allowed to be brighter than the stronger of red/blue, which removes the green glow on skin and the cap.
- **Monitor wallpapers:** the pink/magenta screens behind were distracting, so magenta is desaturated and slightly darkened (skin is not touched).
- **Colour grade:** a gentle S-curve for contrast, a little warmth (+2.5 % red, −2.5 % blue) and +6 % saturation.
- **Clarity:** light denoise (`hqdn3d=1.2:1.2:3:3`) then contrast-adaptive sharpening (`cas=strength=0.55`), so the footage holds up on a 27" monitor once it is upscaled to 4K.
- Saved as VP9 with an alpha channel (`.webm`), so Remotion can place the presenter on any background.

**Voice** (the raw mic sounded muffled and boomy)
```
highpass 85 Hz  →  −2.5 dB at 150 Hz (boom)  →  −3 dB at 350 Hz (boxiness)
→  +3 dB at 3.5 kHz (presence)  →  +2.5 dB shelf from 9 kHz (air)  →  de-esser
```
Then each take is gain-matched to −16 LUFS so every take is the same loudness.

**Music bed:** `bed_edu.mp3` with the lows cut below 140 Hz and a −3 dB dip at 3 kHz, so the music leaves room for the voice.

### Step 2: Word timings (`tools_about_words.py`)

faster-whisper (`medium.en`) gives every spoken word with its start and end time. This drives two things:
1. the word-by-word captions;
2. the timing of every graphic and sound effect. Graphics are pinned to words (for example "pop the chip in when he says *Excel*"), not to fixed seconds, so they stay in sync when the cuts change.

Names that Whisper gets wrong are fixed in code (Adithyan, Agentic SCM, ERP…). The script's wording is ignored: what is actually said on camera wins.

### Step 3: Jump cuts (`tools_about_keeps.py`)

The voice loudness is measured every 10 ms to find where speech is.
- Pauses **longer than 0.3 s are cut out**; shorter ones stay, so the delivery still breathes.
- 0.10 s is kept before each phrase and 0.16 s after, so no word is clipped.
- A cut that would save less than 0.2 s is skipped (it would just look like a jump).
- **Take 1 gets a 0.6 s lead-in before "Check".** Monitors and HDMI speakers often wake up late and swallow the first syllable; this fixed the "…ck stock in your ERP" problem.

Result: about 46 s of speech kept out of the raw takes.

### Step 4: The edit (`src/about/About.tsx`)

Layers, bottom to top:

1. **Background:** the light brand background with a slowly drifting dot grid and a soft blue glow, plus the blue diagonal.
2. **Presenter (the jump cuts):**
   - every cut changes the framing (punch-ins between 1.0× and 1.22×), so each cut looks intentional;
   - a slow 3 % push-in during each piece;
   - a **"whip" zoom** (quick scale overshoot plus motion blur, about 7 frames) at the start of a new section;
   - in the course part, the presenter **shrinks into a rounded side frame** so the graphics get the main space, then returns to full screen;
   - audio crossfades of 3 frames at each cut, so there are no clicks.
3. **Brand bug:** a small "Agentic SCM" mark in the corner.
4. **Graphics, each timed to a word:**
   - **Hook:** chips "Check the ERP → Copy to Excel → Email the team → Repeat" plus a day counter, on the pain line.
   - **Name bar:** "Adithyan / Co-founder, Experidium".
   - **Talking vs building:** "talking about AI" is struck through, then "build" appears.
   - **Side card, part 1:** "Create AI agents", tool logos, Procurement / Inventory / Planning tiles.
   - **Side card, part 2:** the **ERP Agent Blueprint banner** appears big on "ERP", then docks top-left, followed by the four agent steps (checks stock → finds low items → prepares order → **APPROVED** in green, with a ding).
   - **NO CODE** stamp.
   - **Kinetic full-screen line:** "STOP JUST LEARNING ABOUT AI."
   - "Start building" and a "Join" tag, then an **end card** with a Join button and an animated cursor click.
5. **Captions:**
   - up to 3 words at a time, bold uppercase Inter;
   - the **word being spoken sits on a blue pill** and the others have a dark outline;
   - a soft dark gradient at the bottom keeps them readable;
   - captions hide during the full-screen kinetic line and the end card.
6. **Sound:**
   - **pop** when a chip or card appears, **click** for list items, **whoosh** on section changes and the kinetic line, **ding** on APPROVED;
   - volumes 0.22–0.35, so they never compete with the voice.
7. **Music:**
   - about 8.5 % volume under speech, a little louder during the kinetic line, rising to 30 % on the end card;
   - fades in over 0.6 s and out over the last 1.2 s.

### Step 5: Render and finish

```
npx remotion render src/about/index.ts About out/about_raw_4k.mp4 --scale=2 --concurrency=6 --crf=16
..\..\.venv\Scripts\python -I tools_about_finalize.py out/about_raw_4k.mp4 ../../Intro-Video-Launch/exports/Agentic_SCM_About_4K.mp4
```
- `--scale=2` renders the 1920×1080 composition at 3840×2160. The text and graphics are drawn natively sharp at 4K; the footage is upscaled from the sharpened source.
- The finalize step runs **two-pass loudness normalisation to −14 LUFS, −1 dBTP** (the YouTube/social standard), then encodes H.264 High at CRF 18 with AAC 192k and fast start for the web.
- On a laptop with integrated graphics the 4K render takes a while, so it was started in the background with `work/about/render4k.cmd` and watched through its log.

**Preview while editing:** `npx remotion studio src/about/index.ts`
**Thumbnail:** `npx remotion still src/about/index.ts AboutThumb out.png`

---

## 4. Rules followed for this video

- Under 60 seconds.
- No price or membership wording, so the video stays valid if the offer changes.
- No Stocky (kept for the course and the free lesson).
- What is said on camera overrides the script.

---

## 5. Reusing this for the next video

1. Copy the raw takes in, named in order (`lo_1.mp4`, `lo_2.mp4`, …).
2. Copy the three `tools_about_*` scripts and change the take names (`ab_` → your prefix, and the take count). The key and EQ settings will work as they are **if it is the same green wall, lights and mic**. Check the `*_check.png` frames that step 1 writes.
3. Run steps 1–3, then build a new composition modelled on `About.tsx`: keep the presenter, captions, SFX and music parts, and replace the graphics with the new video's own.
4. For screen-recorded sections, put the recording on its own layer and keep the same captions, SFX and music rules, so the whole video feels like one piece.
5. Render at `--scale=2` and run the finalize step.
