# Screen-Recording Prompt Template (internal guide for writers)

Goal: for every `## [SCREEN RECORDING]` section of a video script, write ONE copy-paste prompt the creator gives to Claude (claude.ai). Claude then builds an **animated HTML demo** that recreates the screens for that section. The creator plays it full-screen, records it with QuickTime / OBS, and lays the voice-over on top.

## File layout (one file per video)
`<Video folder>/source/VNN_Screen_Recording_Prompts.md` (the free lesson: `00_Free_Lesson/source/Free_Screen_Recording_Prompts.md`)

```
# Video N: <Title>: Screen-Recording Prompts
**How to use:** (short paragraph, same in every file; see below)
**Sections in this video:** a table with # | Section | Time | Length | Prompt

---
## Prompt 1 of K: <Section name> (mm:ss–mm:ss, X min Y s)
**What this demo shows:** one sentence
### Copy this prompt into Claude:
```text
<THE PROMPT>
```
**After Claude builds it:** 2–3 short tips specific to this section (e.g. "press Start, then record; trim the first second")
---
```

"How to use" paragraph (use it verbatim):
> 1. Open claude.ai, start a new chat, and paste ONE prompt. 2. Claude builds an animated demo you can preview. If anything looks wrong, reply in the same chat ("make the cursor slower", "the table is cut off"). 3. Open the demo full-screen in Chrome (press F11 / Ctrl+Cmd+F), start your screen recorder (QuickTime: File → New Screen Recording), then click **Start**. 4. Stop recording when the "END" card appears, trim the start and end, and add your voice-over from the script. Each demo runs for the same length as its script section, so the voice-over lines up.

## Every prompt must contain these blocks, in this order
1. **ROLE & GOAL**: "You are a motion designer building an animated product-demo video as a single self-contained HTML file…" and what this section teaches (1–2 sentences).
2. **GLOBAL STYLE** (identical in every prompt; paste verbatim):
```
GLOBAL STYLE (follow exactly):
- One self-contained HTML file (inline CSS + JS, no external libraries except Google Fonts "Inter"). It must work as a claude.ai artifact preview.
- Fixed 16:9 stage of 1920x1080 px, scaled to fit the browser window (letterbox with #0F172A background). All positions are relative to the stage.
- A big "Start" button covers the stage before playing; clicking it starts the timeline. Also add small Pause/Restart controls that appear only on mouse hover at the bottom-right, plus a thin progress bar. Keyboard: Space = pause/play, R = restart.
- The total duration MUST equal the section length given below. Drive everything from one master timeline (requestAnimationFrame with elapsed time), with each scene at the exact start/end times listed. Show an "END" card for the final 1 second.
- The look is clean, modern and simplified: a browser window frame (rounded corners, grey tab bar with the page title, URL bar showing the URL given), white app content, soft shadows. These are simplified look-alike recreations for teaching, NOT pixel copies of any product's real interface; no real logos.
- Animated mouse cursor (a white arrow with a dark outline) that glides smoothly (ease-in-out, ~0.6 s) to each target, shows a click ripple, and makes the element react (pressed state, dropdown opens, field focuses).
- Typing effect for any text the user types (~14 characters/second) with a blinking caret.
- Callouts: yellow (#FFD84D) rounded highlight boxes or arrows with a short label appear on the important element, using a gentle pop-in. Never cover the thing being explained.
- Zoom: for small details, smoothly zoom the stage (scale 1.0 to 1.6, centred on the element) and back out.
- Captions: an ON-SCREEN TEXT lower-third (dark navy #1F2A44 pill, white Inter 34px) whenever the script gives ON-SCREEN TEXT, held for 3-5 s.
- Fonts: Inter. Colours: navy #1F2A44, blue #2563EB, green #16A34A (success), red #DC2626 (errors/low stock), amber #F59E0B (warnings).
- Brand: a small "The ERP Agent Blueprint" watermark at the bottom-left, 40% opacity.
- No sound. Keep motion calm and readable for beginners: hold each important state at least 2 seconds.
```
3. **APP LOOK** (only the apps this section shows), e.g.:
   - *Odoo-style ERP*: purple-ish top bar (#714B67) with the app name, a left breadcrumb, list views with checkbox column, form views with a status bar at the top-right, "New" button top-left.
   - *n8n-style workflow canvas*: dark grey dotted canvas, rounded square nodes with an icon and label, grey connector lines with animated dots when data flows, a right-side panel for node settings, an orange "Test workflow" button, an Executions tab.
   - *Google Sheets-style spreadsheet*: green accent, formula bar, column letters A, B, C, row numbers, tabs at the bottom.
   - *Gmail-style inbox*: email list and an open email with Approve (green) / Reject (red) buttons when needed.
   - *Browser JSON view*: the raw JSON response, pretty-printed in Chrome's "pretty print" style.
   - *Claude/ChatGPT-style chat*: a chat panel with user bubbles on the right and assistant answers on the left.
   - *Anthropic Console style*: a simple developer console page with API Keys / Limits pages.
4. **DATA TO SHOW**: the exact values from the script (SKUs, product names, quantities, suppliers, URLs, JSON, prompts, emails, formulas). Copy them exactly from the script, never invent different numbers. Use the BrightLeaf data (Columbus, Ohio; USD) from the course bible.
5. **TIMELINE (scene by scene)**: a numbered list, with every step as `mm:ss–mm:ss (relative to section start, starting 00:00) | What appears / cursor action | Callout or caption text`. Derive it from the script's SHOW / SAY / ON-SCREEN TEXT lines and split the section duration proportionally to the length of each SAY paragraph (≈ 110 words per minute), so the visuals line up with the voice-over. Include short "hold" beats.
6. **VOICE-OVER REFERENCE**: the SAY text for this section, in compact form (it may be lightly trimmed but keep every sentence that refers to something on screen), labelled "for timing reference only; do not render as text".
7. **CHECKLIST**: 4–6 bullets, e.g. "Total duration exactly 3:30", "All numbers match the DATA block", "Start button and END card present", "Nothing overflows the 1920x1080 stage".

## Rules
- One prompt per `[SCREEN RECORDING]` section, in script order; no prompts for [ON CAMERA] sections.
- Prompts are fully self-contained: Claude in a fresh chat knows nothing about the course.
- If a section is longer than 4 minutes, still one prompt, but tell Claude to organise the code by scene so it's easy to tweak.
- Use the CURRENT script content (US setting: Columbus, Ohio; characters Sarah Mitchell, Tom, Mr. Harrison; USD).
- Plain ASCII-friendly text inside the prompt where possible (straight quotes OK).
- When the script shows sensitive things (API keys), show fake masked values like `sk-ant-••••••••••3f9a`.
