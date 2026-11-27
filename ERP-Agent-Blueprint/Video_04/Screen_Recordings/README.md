# Video 04: screen-recording sections (review)

These are the four screen sections of Video 4, *Databases Without Fear*. They were edited before the on-camera footage was shot, so each section is its own file. Once the footage is recorded, the sections are slotted into the timeline between the on-camera parts.

| File | Script section | Length |
|---|---|---|
| `V04_S1_What_a_Database_Really_Is_1080p_TEMP-VO.mp4` | 1. What a Database Really Is | 2:38 |
| `V04_S2_Building_the_Suppliers_Table_1080p_TEMP-VO.mp4` | 2. Building the Suppliers Table | 3:49 |
| `V04_S3_Building_the_Stock_Log_1080p_TEMP-VO.mp4` | 3. Building the Stock Log | 4:08 |
| `V04_S4_The_Messy_Data_Makeover_1080p_TEMP-VO.mp4` | 4. The Messy Data Makeover | 4:06 |

Each MP4 has:

- burned-in captions (same style as Videos 1 and 2);
- a separate English caption track that is off by default;
- a matching `.srt` / `.vtt` file.

Audio is mastered to −14 LUFS.

## How it was made
- **Real systems.**
  - Section 1 is the real BrightLeaf Odoo.
  - Sections 2–4 are real Google Sheets, built step by step in two spreadsheets: **BrightLeaf Stocky Database** (tabs *Suppliers* and *Stock_Log*) and **BrightLeaf Messy Export**.
  - Every menu, dialog and message is what Sheets actually shows, for example:
    - "Replaced one instance of BL with BL-"
    - "1 duplicate row found and removed. 12 unique rows remain."
    - the "18 sets" example really does make the IF formula say OK.
- **Edit style matches Video 2.**
  - Unlabelled yellow highlight boxes and no zooms.
  - When a callout appears, the browser slides left and the card gets its own panel, so nothing covers the app.
- **Voice-over is a temporary British voice** (edge-tts Ryan). The paragraphs to record in Fish Audio are in `Video_04/Edit/VO_for_FishAudio.txt`. When the Fish Audio files arrive, the timing re-fits automatically and the sections are re-rendered.

## Changes from the screen-recording prompts
1. **Record ID is /45, not /5.** In the real Odoo, Pallet Jack Wheels has internal ID 45. The voice-over only says "there's a number", so nothing else changed.
2. **No stage zooms.** This follows the instruction from Video 1. Small details get a highlight box instead.
3. **Pause & Think hold (Section 2).** The question card stays on screen for 5 seconds with no voice-over before the answer ("Because they're different companies…").
4. **One remark per row (Section 4).** The prompt gives two rows a second remark ("urgent", then "urgent per Tom"). Each row now has a single combined remark:
   - Pallet jack wheels: "3 jacks waiting; urgent per Tom"
   - Packing tape: "estimate, recount; urgent per Tom"
5. **The red fill was also cleared from the Unit column (Section 4).** When the Unit column is inserted, Sheets copies the red fill into it, so the reset covers both columns.
6. **Sheets screens are captured at a larger zoom** than a normal laptop screen so the cells stay readable in the video. Only the size differs; the content is the same.

## Next steps
- Team review of these four files.
- Shoot the on-camera parts with the same setup as Video 2 (green wall, same framing), so the Video 1 grade applies as-is.
- Combine everything into the full Video 4. The 4K render waits until after that review.
