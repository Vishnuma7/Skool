# Video 9: Memory & Reports: Logging to a Database and the Monday Report: Screen-Recording Prompts

**How to use:** 1. Open claude.ai, start a new chat, and paste ONE prompt. 2. Claude builds an animated demo you can preview. If anything looks wrong, reply in the same chat ("make the cursor slower", "the table is cut off"). 3. Open the demo full-screen in Chrome (press F11 / Ctrl+Cmd+F), start your screen recorder (QuickTime: File → New Screen Recording), then click **Start**. 4. Stop recording when the "END" card appears, trim the start and end, and add your voice-over from the script. Each demo runs for the same length as its script section, so the voice-over lines up.

**Sections in this video:**

| # | Section | Time | Length | Prompt |
|---|---|---|---|---|
| 1 | Build the Decision Log Tab in Google Sheets | 03:30–06:30 | 3 min 0 s | Prompt 1 |
| 2 | Teach Stocky to Write: The Append Row Node | 06:30–10:30 | 4 min 0 s | Prompt 2 |
| 3 | The Monday Report, Part 1: Schedule + Gather the Data | 12:00–15:30 | 3 min 30 s | Prompt 3 |
| 4 | The Monday Report, Part 2: The Report Prompt | 15:30–19:00 | 3 min 30 s | Prompt 4 |
| 5 | Send It: Gmail + a Simple Dashboard | 19:00–21:30 | 2 min 30 s | Prompt 5 |

---

## Prompt 1 of 5: Build the Decision Log Tab in Google Sheets (03:30–06:30, 3 min 0 s)

**What this demo shows:** Adding a "Decision Log" tab to the BrightLeaf Google Sheet, with nine headers, a frozen header row, clean number formats and one hand-typed test row.

### Copy this prompt into Claude:

```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. This section teaches beginners how to create the agent's notebook: a Decision Log tab in Google Sheets with nine clear columns, a frozen header, proper date/number formats and one example row written for a human reader.

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

SECTION LENGTH: exactly 3 min 0 s (180 seconds). The master timeline runs from 00:00 to 03:00; the END card fills 02:59–03:00.

APP LOOK
- Google Sheets-style spreadsheet (simplified look-alike, no real logos): green accent, menu bar (File, Edit, View, Insert, Format, Data...), formula bar, column letters A, B, C..., row numbers, sheet tabs at the bottom with a "+" (Add Sheet) button at the bottom-left. Browser tab title "BrightLeaf – Stocky Database - Google Sheets", URL bar "docs.google.com/spreadsheets/d/brightleaf-stocky-database".
- Right-click context menu on a tab: Delete, Duplicate, Copy to, Rename, Change colour... ; the View menu has Freeze -> "1 row"; the Format menu has Number -> "Number", "Date time".

DATA TO SHOW (copy exactly; do not change any number, name, URL or wording)
Existing tabs: "Stock Log", "Suppliers". New tab: "Decision Log" (capital D, capital L, one space).
Stock Log tab (shown briefly at the start; columns SKU | Product | Stock On Hand | Reorder Point): BL-1001 Steel Hex Bolts M10 (box of 100) 145 80 | BL-1002 Corrugated Shipping Box 18x12x10 1180 1500 | BL-1003 Stretch Wrap Film 500mm 260 200 | BL-1004 Industrial Safety Gloves (pair) 420 600 | BL-1005 Pallet Jack Wheels (set) 18 25
Analogy labels: "Tab = table", "Row = record", "Column = field"
Headers A1 to I1: Log ID | Timestamp | SKU | Product | Stock On Hand | Action | Approved By | Risk Score | Notes
Header question tooltips (one per header as it is typed): Log ID "a unique number for each row" | Timestamp "when did it happen?" | SKU / Product "what item?" | Stock On Hand "stock at that moment" | Action "RFQ created / Hold / Rejected / Alert sent" | Approved By "which human signed off, or Auto" | Risk Score "supplier risk out of 10 (Video 8)" | Notes "why, in plain English"
ON-SCREEN TEXT: Decision Log columns: Log ID | Timestamp | SKU | Product | Stock On Hand | Action | Approved By | Risk Score | Notes
Formatting: row 1 frozen, bold, light green fill (#D9F2E3). Column B -> Format -> Number -> Date time. Column H -> Format -> Number -> Number.
Test row 2: LOG-0001 | 2026-11-09 10:14 | BL-1003 | Stretch Wrap Film 500mm | 150 | RFQ created | Sarah Mitchell | 3.1 | Below reorder point 200. Ordered 250 rolls from PackRight.
Pro tip caption: "PRO TIP: Never put two pieces of information in one cell."

TIMELINE (scene by scene; times are relative to the section start; format: time | what appears / cursor action | callout or caption text)
1. 00:00–00:10 | The Google Sheet fades in on the "Stock Log" tab with five product rows. The two tabs "Stock Log" and "Suppliers" at the bottom glow. | Callout: "Our database from Video 4"
2. 00:10–00:26 | Three labels pop on the sheet: one over the tab bar, one along a row, one down a column. | Labels: "Tab = table" / "Row = record" / "Column = field"
3. 00:26–00:32 | Cursor clicks the "+" at the bottom-left; a new tab "Sheet3" appears and becomes active (empty grid). | Callout: "Add Sheet"
4. 00:32–00:40 | Cursor right-clicks the new tab; the context menu opens; click "Rename"; the tab text becomes editable and "Decision Log" is typed. | No callout while typing
5. 00:40–00:46 | Zoom 1.6 on the tab name. | Callout: "Exact spelling: capital D, capital L, one space. n8n looks for this name."
6. 00:46–01:30 | Zoom out. Cursor clicks A1 and types the nine headers across A1 to I1, tabbing between cells. As each header is finished, a small yellow tooltip with its question pops above it and fades after about 3 s. | Tooltips as listed in DATA (Log ID, Timestamp, SKU/Product, Stock On Hand, Action, Approved By, Risk Score, Notes)
7. 01:30–01:35 | Hold on the finished header row. | Caption (ON-SCREEN TEXT): "Decision Log columns: Log ID | Timestamp | SKU | Product | Stock On Hand | Action | Approved By | Risk Score | Notes"
8. 01:35–01:45 | Cursor clicks row number 1 (row selected), opens View -> Freeze -> "1 row"; a thick grey freeze line appears under row 1. | Callout: "View > Freeze > 1 row"
9. 01:45–01:52 | With row 1 still selected, cursor clicks Bold (B) and the fill-colour bucket -> light green; the header turns bold and green. | No callout
10. 01:52–02:00 | A quick demo scroll: grey placeholder rows fly up underneath while the header stays fixed; then scroll back. | Callout: "5-15 decisions a day = a few thousand rows a year. Easy for Sheets."
11. 02:00–02:10 | Cursor clicks the column B header, opens Format -> Number -> "Date time". | Callout: "Column B: Date time"
12. 02:10–02:21 | Cursor clicks the column H header, opens Format -> Number -> "Number". | Callout: "Column H: Number. Otherwise '7.8' may be text and charts quietly break."
13. 02:21–02:46 | Cursor clicks A2 and types the test row cell by cell (Tab between cells): LOG-0001, 2026-11-09 10:14, BL-1003, Stretch Wrap Film 500mm, 150, RFQ created, Sarah Mitchell, 3.1, then the Notes sentence. Column I widens to fit. | Callout (appears at 02:30): "Type one test row by hand: it shows what 'good' looks like"
14. 02:46–02:54 | Zoom 1.5 on the Notes cell I2. | Callout: "Written for a human: Mr. Harrison should get the story from this column alone"
15. 02:54–02:59 | Zoom out; hold on the finished tab. | Caption: "PRO TIP: Never put two pieces of information in one cell."
16. 02:59–03:00 | END card | END

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
(00:00) Here's the Google Sheet we built back in Video 4. Remember, a database is just a super-organised Excel workbook. Each tab is a table, each row is a record, each column is a field. We already have "Stock Log" and "Suppliers". Now we add the most important tab of all.
(00:26) I click the little plus at the bottom left, right-click the new tab, choose Rename, and call it "Decision Log". Spelling matters here, because n8n will look for this exact name. Capital D, capital L, one space.
(00:46) Now the column headers. Think of these as the questions Mr. Harrison or an auditor might ask. Log ID, a unique number for each row. Timestamp, when did it happen. SKU and Product, what item. Stock On Hand, what was the stock at that moment. Action, what did Stocky do: things like "RFQ created", "Hold", "Rejected", or "Alert sent". Approved By, which human signed off, or "Auto" if no approval was needed. Risk Score, the supplier risk out of ten from Video 8. And Notes, a short sentence in plain English explaining why.
(01:35) I freeze the header row with View, Freeze, one row, so it stays visible when the log gets long. And it will get long. Stocky makes maybe five to fifteen decisions a day. That's a few thousand rows a year, and Google Sheets handles that easily.
(02:00) One small but important habit from Video 4: clean data. I set column B to "Date time" and column H to "Number". If you skip this, Google Sheets may treat "7.8" as text and your charts later will quietly break.
(02:21) I always type one test row by hand first. It shows me what "good" looks like before the robot starts writing. Stretch wrap, stock 150, reorder point 200, RFQ created, approved by Sarah, risk score 3.1, and a note. Notice the note is written for a human, not a computer. If Mr. Harrison reads only this column, he should understand the story.
(02:54) That's our notebook. Now let's teach Stocky to write in it.

CHECKLIST
- Total duration exactly 3 min 0 s (180 s), with every scene at the times listed above.
- Tab name is exactly "Decision Log"; the nine headers are in the exact order A1 to I1.
- The test row values match the DATA block exactly (LOG-0001 ... 3.1 ... the Notes sentence).
- The ON-SCREEN TEXT caption is shown for about 5 seconds.
- Start button, hover Pause/Restart controls, progress bar and the 1-second END card are present.
- Nothing overflows the 1920x1080 stage, and every callout sits beside (not on top of) what it explains.
```

**After Claude builds it:**

- The header typing is long (about 45 s); if it feels slow, keep it: it matches the voice-over describing each column.
- If the nine columns don't fit, ask Claude to "narrow columns A-H so A to I fit on screen, and widen I only when the note is typed".

---

## Prompt 2 of 5: Teach Stocky to Write: The Append Row Node (06:30–10:30, 4 min 0 s)

**What this demo shows:** Adding a Google Sheets "Append Row in Sheet" node after Create RFQ (and on the Rejected branch), seeing Stocky's first log row appear, then letting the chat agent read the log to answer "who approved that?".

### Copy this prompt into Claude:

```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. This section teaches how an n8n workflow writes every decision into the Decision Log with the Google Sheets Append Row node (on both the approved and rejected branches), and how a chat agent with a Get Row(s) tool uses that log as memory.

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

SECTION LENGTH: exactly 4 min 0 s (240 seconds). The master timeline runs from 00:00 to 04:00; the END card fills 03:59–04:00.

APP LOOK
- n8n-style workflow canvas (simplified look-alike): dark grey dotted canvas, rounded square nodes with an icon and label, grey connector lines with animated dots when data flows, a right-side panel for node settings, an orange "Test workflow" button, an Executions tab. Browser URL bar "brightleaf.app.n8n.cloud/workflow/...", tab title "<workflow name> - n8n".
- Node settings panel: three columns when open: INPUT (left, shows earlier nodes' data as a schema of green draggable labels), PARAMETERS (centre, labelled fields and dropdowns), OUTPUT (right). Orange "Test step" button top-right.
- Workflow "Stocky – Daily Reorder Check" (left to right): "Schedule Trigger" -> "Find Low Stock" (Odoo) -> "Supplier Risk Check" -> "Ask Sarah" (Gmail, Send and Wait for Response) -> an If-style split with two outputs labelled "Approved" and "Rejected"; Approved -> "Create RFQ" (Odoo).
- Workflow "Stocky – Chat": "When chat message received" -> "AI Agent" with "Anthropic Chat Model", "Simple Memory", "Odoo" underneath, and a Tool port "+".
- Chat panel: user bubbles right (blue), Stocky's answer left (white card).
- Google Sheets-style spreadsheet (simplified look-alike, no real logos): green accent, menu bar (File, Edit, View, Insert, Format, Data...), formula bar, column letters A, B, C..., row numbers, sheet tabs at the bottom with a "+" (Add Sheet) button at the bottom-left. Browser tab title "BrightLeaf – Stocky Database - Google Sheets", URL bar "docs.google.com/spreadsheets/d/brightleaf-stocky-database".

DATA TO SHOW (copy exactly; do not change any number, name, URL or wording)
Append node settings:
  Credential to connect with: Google Sheets – BrightLeaf
  Resource: Sheet Within Document | Operation: Append Row
  Document: From list -> BrightLeaf – Stocky Database | Sheet: From list -> Decision Log
  Mapping Column Mode: Map Each Column Manually (nine fields appear: Log ID, Timestamp, SKU, Product, Stock On Hand, Action, Approved By, Risk Score, Notes)
Field values:
  Log ID:        LOG-{{ $now.toFormat('yyyyMMddHHmmss') }}
  Timestamp:     {{ $now.toFormat('yyyy-MM-dd HH:mm') }}
  SKU:           drag default_code (from "Find Low Stock")
  Product:       drag name
  Stock On Hand: drag qty_available
  Action:        RFQ created
  Approved By:   Sarah Mitchell
  Risk Score:    drag risk_score (from "Supplier Risk Check")
  Notes:         Below reorder point {{ $json.reorder_point }}. RFQ {{ $('Create RFQ').item.json.name }} for {{ $json.suggested_qty }} units.
  Notes preview under the field: Below reorder point 40. RFQ P00030 for 49 units.
INPUT panel values (green labels): default_code: BL-1007 | name: Hydraulic Oil 20L | qty_available: 31 | reorder_point: 40 | suggested_qty: 49 | risk_score: 5.1 | Create RFQ name: P00030
ON-SCREEN TEXT: Copy-paste expressions are in the activity file, sheet "Instructions".
New sheet row after Test step (row 3, under the LOG-0001 test row):
  LOG-20261116071503 | 2026-11-16 07:15 | BL-1007 | Hydraulic Oil 20L | 31 | RFQ created | Sarah Mitchell | 5.1 | Below reorder point 40. RFQ P00030 for 49 units.
  (row 2 stays: LOG-0001 | 2026-11-09 10:14 | BL-1003 | Stretch Wrap Film 500mm | 150 | RFQ created | Sarah Mitchell | 3.1 | Below reorder point 200. Ordered 250 rolls from PackRight.)
Maths callout: 49 = 40 x 2 - 31
Rejected-branch copy: Action = Rejected ; Notes = Sarah rejected. Reason: {{ $json.data.text }}
Beginner mistake caption: "BEGINNER MISTAKE: Logging only the happy path. Log every branch: approved, rejected, held, alerts."
Chat tool: Google Sheets Tool | Operation: Get Row(s) | Sheet: Decision Log | Description: Use this to look up past Stocky decisions (orders, rejections, holds) by SKU or date.
Chat question (typed): Did we order stretch wrap recently? Who approved it and why?
Stocky's reply: "Yes. On 9 November at 10:14, an RFQ was created for 250 rolls of Stretch Wrap Film 500mm (BL-1003) from PackRight Industries. Stock was 150 against a reorder point of 200. It was approved by Sarah Mitchell. Supplier risk score was 3.1 out of 10, which is low."

TIMELINE (scene by scene; times are relative to the section start; format: time | what appears / cursor action | callout or caption text)
1. 00:00–00:08 | n8n opens "Stocky – Daily Reorder Check"; the whole flow is visible. | Callout on the workflow name: "From Video 7"
2. 00:08–00:22 | A glowing data dot travels through the flow while labels pop above each node in turn. | Labels: "Doorbell" / "Read stock" / "Below reorder point?" / "Email Sarah" / "Create RFQ"
3. 00:22–00:29 | Zoom 1.4 on the end of the flow: Approved -> Create RFQ, and Rejected. A small notebook icon above Create RFQ fades away. | Callout: "Right now: forgotten the moment it happens"
4. 00:29–00:37 | Cursor hovers the output of "Create RFQ"; a "+" appears; click; the node picker opens; "Google Sheets" is typed. | Callout: "Plus after Create RFQ"
5. 00:37–00:49 | The Google Sheets actions list appears; "Append Row in Sheet" is clicked; the node is added and its panel opens. | Callout: "Append = add to the bottom. It never overwrites."
6. 00:49–01:07 | Cursor sets each field from its dropdown (about 3 s each): Credential, Resource, Operation, Document, Sheet. Then it hovers the little refresh icon next to Sheet. | Callout on Sheet: "Not in the list? Check the tab spelling, then click refresh"
7. 01:07–01:16 | Mapping Column Mode set to "Map Each Column Manually"; nine empty fields cascade in, labelled with the sheet's headers. | Callout: "n8n read our 9 headers"
8. 01:16–01:32 | The INPUT column on the left glows: its green labels (default_code, name, qty_available, ...) wiggle gently. | Callout: "JSON = a labelled shopping list: we pick items off it"
9. 01:32–01:44 | Log ID and Timestamp expressions are typed into their fields. | Callout on Timestamp: "$now = the time right now"
10. 01:44–01:56 | Three drags: default_code -> SKU, name -> Product, qty_available -> Stock On Hand (a ghost pill follows the cursor and drops into each field). | No callout
11. 01:56–02:04 | Action typed "RFQ created"; Approved By typed "Sarah Mitchell". | No callout
12. 02:04–02:08 | risk_score dragged from the "Supplier Risk Check" section into Risk Score. | Callout: "Risk score from Video 8"
13. 02:08–02:19 | The Notes expression appears in the Notes field; a grey live preview fades in under it: "Below reorder point 40. RFQ P00030 for 49 units." | Caption (ON-SCREEN TEXT, 02:14–02:19): "Copy-paste expressions are in the activity file, sheet 'Instructions'."
14. 02:19–02:25 | Cursor clicks "Test step"; spinner; green "Node executed successfully". | No callout
15. 02:25–02:43 | Switch to the Google Sheet (Decision Log tab). Row 3 slides in under LOG-0001 with a green flash. Zoom 1.4 on it. | Callouts: "49 = 40 x 2 - 31" / "Stocky's first diary entry"
16. 02:43–02:52 | Back to n8n. The Sheets node is selected; keycaps "Cmd/Ctrl + C" then "Cmd/Ctrl + V" appear; the copy is dragged and connected to the Rejected output. | Callout: "A 'no' is a decision too"
17. 02:52–03:03 | In the copy, Action is changed to "Rejected" and Notes to "Sarah rejected. Reason: {{ $json.data.text }}". | Callout: "Her reason goes in the notes"
18. 03:03–03:10 | Zoom out: both branches now end in a Sheets node. | Caption: "BEGINNER MISTAKE: Logging only the happy path. Log every branch."
19. 03:10–03:20 | Open "Stocky – Chat". Cursor clicks "+" on the AI Agent's Tool port, picks "Google Sheets Tool". | Callout: "Now let's use the memory"
20. 03:20–03:37 | Panel: Operation "Get Row(s)", Sheet "Decision Log"; the tool description is typed. | Callout: "Plain-English description = when to use it"
21. 03:37–03:45 | Chat panel opens; the question is typed and sent. | Callout: "Mr. Harrison's question from the intro"
22. 03:45–03:56 | Stocky's reply streams in; yellow boxes land in turn on "9 November at 10:14", "250 rolls", "150 against a reorder point of 200", "Sarah Mitchell", "3.1 out of 10". | No extra callout
23. 03:56–03:59 | Hold on the answer. | Callout: "Answered in 10 seconds"
24. 03:59–04:00 | END card | END

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
(00:00) Here is the daily reorder check from Video 7. Quick reminder of the recipe card: every morning the trigger, our doorbell, rings. Stocky reads stock from Odoo, finds items below their reorder point, emails Sarah for approval, and if she says yes, it creates an RFQ in Odoo. Right now, though, the moment that happens, it's forgotten. Let's fix that.
(00:29) I click the plus after the "Create RFQ" node, search for Google Sheets, and pick "Append Row in Sheet". Append simply means "add to the bottom". It never overwrites anything.
(00:49) Credential: the Google Sheets connection we already saved. Document: "BrightLeaf – Stocky Database". Sheet: "Decision Log". If "Decision Log" doesn't appear in the list, check the spelling of the tab, then click the little refresh icon.
(01:07) Now the fun part. n8n has read our headers and is showing me nine empty boxes, one per column. I'll fill each one by dragging data from the left side... Remember JSON? It's just a labelled shopping list. I'm picking items off that list.
(01:32) For Timestamp, I type this short expression, dollar sign "now", which simply means "the time right now"... It's in the activity file to copy and paste. For SKU, product and stock, I just drag the green labels across. Action, I type "RFQ created". Approved By, "Sarah Mitchell". Risk score, I drag in the score from Video 8. And Notes ... "Below reorder point 40, RFQ P00030 for 49 units."
(02:19) I click "Test step", flip to the Sheet, and there it is. A brand new row, written by Stocky. Hydraulic oil, stock 31, RFQ created for 49 drums, which is the reorder point times two minus what's on hand, approved by Sarah, risk 5.1. That's Stocky's first diary entry.
(02:43) But here's something beginners miss. A "no" is a decision too. ... So I copy the node, paste it on the rejected branch, and change Action to "Rejected" with her reason in the notes.
(03:10) Now let's use the memory. In the chat agent from Video 6, I add one more tool: Google Sheets, "Get Rows", pointing at the Decision Log. And I write a plain English description...: "Use this to look up past Stocky decisions by SKU or date."
(03:37) And now, the exact question Mr. Harrison asked in the intro. "Did we order stretch wrap recently? Who approved it and why?" Look at that answer. Date, quantity, stock level, reorder point, who approved, and the risk score. Ten seconds. That's the power of memory.

CHECKLIST
- Total duration exactly 4 min 0 s (240 s), with every scene at the times listed above.
- All nine field values and expressions match the DATA block exactly.
- The new sheet row reads exactly: LOG-20261116071503 | 2026-11-16 07:15 | BL-1007 | Hydraulic Oil 20L | 31 | RFQ created | Sarah Mitchell | 5.1 | Below reorder point 40. RFQ P00030 for 49 units.
- The Rejected branch gets its own Sheets node with Action = Rejected.
- Stocky's chat reply matches the DATA block word for word.
- Start button, hover Pause/Restart controls, progress bar and the 1-second END card are present.
- Nothing overflows the 1920x1080 stage, and every callout sits beside (not on top of) what it explains.
```

**After Claude builds it:**

- The ON-SCREEN TEXT caption appears at 02:14; check it doesn't hide the Notes field (ask Claude to move the panel up if it does).
- If the drags look too fast, reply "make each drag 1.2 seconds with a visible ghost label".

---

## Prompt 3 of 5: The Monday Report, Part 1: Schedule + Gather the Data (12:00–15:30, 3 min 30 s)

**What this demo shows:** Building the start of "Stocky – Monday Report": a Monday 7 am Schedule Trigger in the Columbus time zone, three data branches (Odoo, Decision Log last 7 days, Suppliers), Aggregate nodes and a Merge into one item.

### Copy this prompt into Claude:

```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. This section teaches how to set up a weekly scheduled workflow in n8n (with the correct time zone) and gather three sources of data, then use Aggregate and Merge so the AI later writes ONE report instead of ten.

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

SECTION LENGTH: exactly 3 min 30 s (210 seconds). The master timeline runs from 00:00 to 03:30; the END card fills 03:29–03:30.

APP LOOK
- n8n-style workflow canvas (simplified look-alike): dark grey dotted canvas, rounded square nodes with an icon and label, grey connector lines with animated dots when data flows, a right-side panel for node settings, an orange "Test workflow" button, an Executions tab. Browser URL bar "brightleaf.app.n8n.cloud/workflow/...", tab title "<workflow name> - n8n".
- Node settings panel: three columns when open: INPUT (left, shows earlier nodes' data as a schema of green draggable labels), PARAMETERS (centre, labelled fields and dropdowns), OUTPUT (right). Orange "Test step" button top-right.
- n8n Overview page: a list of workflows and a "Create Workflow" button top-right.
- Workflow Settings dialog (from the "..." menu top-right): fields including "Timezone" (searchable dropdown) and a "Save" button.
- Schedule Trigger panel: Trigger Interval (dropdown), Weeks Between Triggers, Trigger on Weekdays (multi-select chips), Trigger at Hour, Trigger at Minute.
- Filter node panel: Conditions row "value 1 | operator | value 2".
- OUTPUT tables: clean grey-striped tables with an item count badge ("10 items", "7 items", "6 items", "1 item").

DATA TO SHOW (copy exactly; do not change any number, name, URL or wording)
Workflow name: Stocky – Monday Report
ON-SCREEN TEXT: Schedule (Mon 7:00) -> Odoo stock -> Decision Log (last 7 days) -> Suppliers + risk -> AI writes -> Gmail
Schedule Trigger: Trigger Interval = Weeks | Weeks Between Triggers = 1 | Trigger on Weekdays = Monday | Trigger at Hour = 7am | Trigger at Minute = 0
Workflow Settings: Timezone = America/New_York (Columbus time)
Time-zone illustration: "7 am London = 2 am Columbus"
Odoo node: Resource = Custom Resource | Custom Resource Name = product.product | Operation = Get Many | Return All = on | Fields: default_code, name, qty_available, standard_price, reorder_point
Odoo products (10 items: default_code | name | qty_available | standard_price USD | reorder_point):
BL-1001 | Steel Hex Bolts M10 (box of 100) | 145 | 12.50 | 80
BL-1002 | Corrugated Shipping Box 18x12x10 | 1180 | 0.85 | 1500
BL-1003 | Stretch Wrap Film 500mm | 260 | 9.20 | 200
BL-1004 | Industrial Safety Gloves (pair) | 420 | 2.40 | 600
BL-1005 | Pallet Jack Wheels (set) | 18 | 38.00 | 25
BL-1006 | Packing Tape 48mm (roll) | 1850 | 1.10 | 1000
BL-1007 | Hydraulic Oil 20L | 31 | 54.00 | 40
BL-1008 | LED Warehouse Light 150W | 34 | 72.00 | 30
BL-1009 | Nylon Cable Ties (pack of 500) | 410 | 6.30 | 150
BL-1010 | Forklift Battery Water Kit | 26 | 19.75 | 20
(Below reorder point, shown with red stock numbers: BL-1002, BL-1004, BL-1005, BL-1007.)
Google Sheets node: Operation = Get Row(s) in Sheet | Sheet = Decision Log
Filter node condition: {{ $json.Timestamp }}  is after  {{ $now.minus({ days: 7 }).toFormat('yyyy-MM-dd') }}
Decision Log rows from the last 7 days (7 rows; columns Log ID | Timestamp | SKU | Product | Stock On Hand | Action | Approved By | Risk Score):
2026-11-09 07:30 | BL-1008 | LED Warehouse Light 150W | 36 | Risk alert | Auto | 7.8
2026-11-09 10:14 | BL-1003 | Stretch Wrap Film 500mm | 150 | RFQ created | Sarah Mitchell | 3.1
2026-11-10 07:05 | BL-1008 | LED Warehouse Light 150W | 35 | Hold | Sarah Mitchell | 7.8
2026-11-11 07:05 | BL-1005 | Pallet Jack Wheels (set) | 18 | RFQ created | Sarah Mitchell | 7.2
2026-11-12 07:05 | BL-1002 | Corrugated Shipping Box 18x12x10 | 1180 | RFQ created | Sarah Mitchell | 2.3
2026-11-13 07:05 | BL-1004 | Industrial Safety Gloves (pair) | 420 | RFQ created | Sarah Mitchell | 4.6
2026-11-13 07:05 | BL-1007 | Hydraulic Oil 20L | 31 | Hold | Sarah Mitchell | 5.1
Suppliers node: Get Row(s), Sheet = Suppliers. Rows (Supplier | City | Risk Score):
Shenzhen BrightTech | Shenzhen | 7.8   (callout: "heavy rain in Shenzhen + stronger yuan vs dollar")
Global Lift Parts | Shenzhen | 7.2
Gulf Lubricants | Dubai | 5.1
SafeHands Co. | Monterrey | 4.6
PackRight Industries | Chicago | 2.3
Apex Fasteners | Columbus | (row partly scrolled out of view at the bottom; do not show a number)
Aggregate nodes: Aggregate = All Item Data (Into a Single List); Put Output in Field = products / decisions / suppliers
Merge node: Mode = Combine | Combine By = Position | Number of inputs = 3
Merge output: 1 item -> { products: [10 items], decisions: [7 items], suppliers: [6 items] }

TIMELINE (scene by scene; times are relative to the section start; format: time | what appears / cursor action | callout or caption text)
1. 00:00–00:08 | n8n Overview; cursor clicks "Create Workflow"; the empty canvas opens; cursor clicks the name "My workflow" and types "Stocky – Monday Report". | No callout
2. 00:08–00:14 | A dashed "ghost" plan draws itself across the canvas: six faint outlined boxes joined by dashed arrows (doorbell, three data steps, AI, email). | Callout: "The recipe card"
3. 00:14–00:19 | Hold the ghost plan. | Caption (ON-SCREEN TEXT): "Schedule (Mon 7:00) -> Odoo stock -> Decision Log (last 7 days) -> Suppliers + risk -> AI writes -> Gmail"
4. 00:19–00:27 | Ghost plan fades to 15%. Cursor clicks "Add first step", types "Schedule", picks "Schedule Trigger". | No callout
5. 00:27–00:45 | In the panel the fields are set one by one: Weeks, 1, Monday chip, 7am, 0. | Callout: "Every Monday, 7:00 am: our doorbell"
6. 00:45–00:55 | Panel closes. Cursor clicks the "..." menu top-right -> Settings; the Settings dialog opens; the Timezone field is highlighted. | Callout: "One trap: the time zone"
7. 00:55–01:07 | A small two-clock illustration slides in beside the dialog: London 7:00 vs Columbus 2:00, the Columbus clock in red. | Callout: "Skip this and '7 am' could mean 2 am in Columbus"
8. 01:07–01:15 | Cursor opens the Timezone dropdown, types "New_York", picks "America/New_York", clicks Save (green toast "Saved"). | Callout: "Columbus time. You set yours."
9. 01:15–01:30 | An Odoo node is added after the trigger; fields are set: Custom Resource, product.product, Get Many, Return All on; the five field names appear as chips. | Callout: "Same Odoo node as Video 6"
10. 01:30–01:43 | Cursor clicks "Test step"; OUTPUT shows the 10-product table with a "10 items" badge; the four below-reorder stock numbers are red. | Callout: "Ten products come back"
11. 01:43–01:55 | A Google Sheets node (Get Row(s), Decision Log) is added on a second branch, then a Filter node; the condition expression is typed. | Callout: "Only the last 7 days"
12. 01:55–02:13 | Test: the Filter OUTPUT shows the 7 decision rows with a "7 items" badge; Action cells coloured (RFQ created blue, Hold amber, Risk alert red). | Callout: "Last week's decisions"; caption: "The expression is in your activity file"
13. 02:13–02:36 | A third branch: Google Sheets Get Row(s), Sheet = Suppliers. OUTPUT shows the suppliers table; the Risk Score column glows; 7.8 and 7.2 get yellow boxes. | Callouts: "7.8: heavy rain in Shenzhen + stronger yuan" / "7.2: Global Lift Parts"
14. 02:36–02:56 | An Aggregate node is added after each branch and named; fields set to products / decisions / suppliers. Animation over the Odoo branch: ten small receipt cards fly into one envelope labelled "products" (then the same quickly for decisions and suppliers). | Callout: "10 loose receipts -> 1 envelope. Otherwise the AI runs 10 times."
15. 02:56–03:14 | A Merge node is added with three inputs (Mode Combine, Combine By Position); three envelopes slide into one parcel icon labelled "products + decisions + suppliers". | Callout: "Three envelopes, one parcel"
16. 03:14–03:26 | Cursor clicks the orange "Test workflow" button; data dots flow down all three branches into Merge; cursor clicks the Merge OUTPUT: "1 item" with three expandable lists [10] [7] [6]. | Callout: "One single item, three neat lists"
17. 03:26–03:29 | Hold on the finished canvas. | Caption: "Everything Stocky needs to write the report"
18. 03:29–03:30 | END card | END

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
(00:00) Time for the Monday Report. I create a new workflow and call it "Stocky – Monday Report". Here's the plan on our recipe card: a doorbell that rings every Monday at 7, three steps that collect information, one step where the AI writes, and one step that sends the email.
(00:27) The first step is a Schedule Trigger. In Video 7 we used it daily. Now I set the interval to Weeks, every one week, on Monday, at 7 am, minute zero. That's our doorbell.
(00:45) One trap. n8n Cloud might run on a different time zone than you. If you skip this, "7 am" could mean 7 am in London, which is 2 in the morning here in Columbus. So I open the workflow Settings and set the time zone to America/New_York, which is Columbus time. You set yours.
(01:15) Step two: read Odoo. This is exactly the Odoo node you built in Video 6... It asks the waiter, our API, for every product with its SKU, name, stock on hand, unit cost and reorder point. Test step, and ten products come back.
(01:43) Step three: read Stocky's diary, but only the last seven days. I add Google Sheets, "Get Rows", Decision Log. Then a Filter node that keeps only rows where the timestamp is after "now minus seven days"... Test it, and we get seven rows: the decisions from last week.
(02:13) Step four: the Suppliers tab, which since Video 8 also holds each supplier's latest risk score. Shenzhen BrightTech is at 7.8 this week because of heavy rain in Shenzhen and a stronger yuan against the dollar. Global Lift Parts at 7.2.
(02:36) Now, a small but important step. The Odoo node gave us ten separate items. If we sent them straight to the AI, n8n would run the AI ten times and write ten reports. We want one report. So I add an Aggregate node after each branch. Think of it as putting ten loose receipts into one envelope. Then a Merge node puts the three envelopes into one parcel: products, decisions, suppliers.
(03:14) Test workflow, and look: one single item, with three neat lists inside. That's everything Stocky needs to write the report.

CHECKLIST
- Total duration exactly 3 min 30 s (210 s), with every scene at the times listed above.
- Schedule settings, time zone (America/New_York) and the Filter expression match the DATA block exactly.
- Odoo output shows exactly the 10 products with the stock numbers in DATA; the Filter output shows exactly 7 rows.
- Supplier risk scores 7.8, 7.2, 5.1, 4.6, 2.3 are correct; Apex Fasteners' score is not shown.
- The Merge output is ONE item with lists of 10, 7 and 6.
- Start button, hover Pause/Restart controls, progress bar and the 1-second END card are present.
- Nothing overflows the 1920x1080 stage, and every callout sits beside (not on top of) what it explains.
```

**After Claude builds it:**

- The ON-SCREEN TEXT caption is long; if it wraps badly, ask for "two-line caption, 30px".
- Record in one take; the envelope animation is the moment that explains Aggregate, so keep it slow.

---

## Prompt 4 of 5: The Monday Report, Part 2: The Report Prompt (15:30–19:00, 3 min 30 s)

**What this demo shows:** The AI Agent node with the full report prompt (system message, data, formulas, format), the rendered Monday Stock Report it produces, and a check of the numbers against the activity file's Dashboard.

### Copy this prompt into Claude:

```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. This section teaches that a great report comes from a precise prompt: give the AI the data, spell out the formulas and fix the format (in simple HTML). Then it shows the resulting report and how to verify its numbers against a spreadsheet.

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

SECTION LENGTH: exactly 3 min 30 s (210 seconds). The master timeline runs from 00:00 to 03:30; the END card fills 03:29–03:30.

APP LOOK
- n8n-style workflow canvas (simplified look-alike): dark grey dotted canvas, rounded square nodes with an icon and label, grey connector lines with animated dots when data flows, a right-side panel for node settings, an orange "Test workflow" button, an Executions tab. Browser URL bar "brightleaf.app.n8n.cloud/workflow/...", tab title "<workflow name> - n8n".
- Node settings panel: three columns when open: INPUT (left, shows earlier nodes' data as a schema of green draggable labels), PARAMETERS (centre, labelled fields and dropdowns), OUTPUT (right). Orange "Test step" button top-right.
- AI Agent panel: "Source for Prompt" dropdown, a tall "Prompt (User Message)" box, and under Options a "System Message" box. For readability, show the whole prompt in an expanded editor overlay (white, monospace 20px, line numbers), which scrolls.
- Rendered report: OUTPUT panel switched to a rendered HTML view (white page, h2 headings in navy, bullets, a small table).
- Excel-style spreadsheet for the activity file (browser tab "V09_Activity_Decision_Log_Dashboard.xlsx"), sheet tab "Dashboard" active: labelled KPI cells with green fill.

DATA TO SHOW (copy exactly; do not change any number, name, URL or wording)
AI Agent: Chat Model = Anthropic Claude (credential from Video 5) | Source for Prompt = Define below | Add Option -> System Message
FULL PROMPT (show exactly, including line breaks):
SYSTEM MESSAGE:
You are Stocky, the inventory and procurement agent of BrightLeaf Supplies
(Columbus, Ohio). You write the weekly stock report for Mr. Harrison, Operations
Director. He reads it on his phone in 2 minutes. Be clear, calm and factual.
Never invent numbers. Use only the data provided. If data is missing, say so.

USER PROMPT:
Write this week's Monday Stock Report using the data below.

DATA
- Products from Odoo (SKU, name, stock on hand, unit cost USD, reorder point):
  {{ JSON.stringify($json.products) }}
- Stocky's decisions in the last 7 days (Decision Log):
  {{ JSON.stringify($json.decisions) }}
- Suppliers with their latest risk score out of 10:
  {{ JSON.stringify($json.suppliers) }}

CALCULATE
1. Stock health % = SKUs at or above their reorder point / total SKUs x 100.
2. Money tied up in stock = sum of (stock on hand x unit cost), in USD,
   rounded to the nearest dollar.
3. Items reordered = rows in the Decision Log where Action = "RFQ created".

FORMAT (use simple HTML: <h2>, <p>, <ul>, <li>, <b>, <table>)
1. One-line headline: the single most important thing this week.
2. Key numbers: stock health %, money tied up in stock, number of SKUs
   below reorder point, number of RFQs created.
3. Top 5 risks, ranked. For each: SKU, product, why it is a risk
   (stock vs reorder point, lead time, supplier risk score), and one
   recommended action.
4. Items reordered this week: a table with SKU, qty, supplier, approved by.
5. Decisions rejected or on hold, with the reason.
6. "Needs your decision": maximum 2 items for Mr. Harrison.
Keep it under 350 words. No jargon. End with: "Full dashboard: [link]".

RENDERED REPORT (show in the OUTPUT panel; headings as bold headings, lists as bullets, the reordered items as a 4-column table):
HEADLINE: Pallet jack wheels and hydraulic oil are our two biggest risks
this week: both are below reorder point with long lead times, and the
hydraulic oil order is still on hold.

KEY NUMBERS
- Stock health: 60% (6 of 10 SKUs at or above reorder point)
- Money tied up in stock: $16,153
- SKUs below reorder point: 4 (BL-1002, BL-1004, BL-1005, BL-1007)
- RFQs created this week: 4 (total value $6,935)

TOP 5 RISKS
1. BL-1005 Pallet Jack Wheels: stock 18 vs reorder point 25.
   21-day lead time, Global Lift Parts risk 7.2/10 (rain in Shenzhen,
   CNY up 1.9%). RFQ P00027 for 32 sets raised. Action: get a ship date.
2. BL-1007 Hydraulic Oil 20L: stock 31 vs 40. 14-day lead time,
   Gulf Lubricants risk 5.1/10. Order ON HOLD (volume quote requested).
   Action: decide by Wednesday (see below).
3. BL-1008 LED Warehouse Light 150W: stock 34, only 4 above reorder
   point 30. 28-day lead time, Shenzhen BrightTech risk 7.8/10.
   Action: consider ordering early.
4. BL-1004 Industrial Safety Gloves: stock 420 vs 600. RFQ P00029 for
   780 pairs raised with SafeHands (risk 4.6, heavy rain in Monterrey).
5. BL-1002 Corrugated Shipping Box: stock 1,180 vs 1,500. RFQ P00028
   for 1,820 boxes raised with PackRight (risk 2.3). Low risk.

ITEMS REORDERED THIS WEEK
BL-1003 | 250 rolls | PackRight Industries | Sarah Mitchell
BL-1005 | 32 sets | Global Lift Parts | Sarah Mitchell
BL-1002 | 1,820 boxes | PackRight Industries | Sarah Mitchell
BL-1004 | 780 pairs | SafeHands Co. | Sarah Mitchell

REJECTED / ON HOLD
BL-1007: on hold by Sarah, asking Gulf Lubricants for an 80-drum price.
BL-1008: on hold, waiting for a revised quote ($72 to $68 per unit).

NEEDS YOUR DECISION
1. Hydraulic oil: standard order of 49 drums (~$2,646) now, or wait
   2 days for the 80-drum volume price?
2. LED lights: approve ordering 26 units early (~$1,872) given the
   28-day lead time?

Full dashboard: [link]

HTML explainer card: "<h2> = a heading", "<b> = bold", "<li> = a bullet"; left: one long grey paragraph; right: the same text as a neat email.
Pro tip caption: "PRO TIP: Spell out your formulas in the prompt."
Timer chip: "Sarah: 3 hours -> Stocky: ~12 seconds"
Activity file, sheet "Dashboard": Money tied up in stock = $16,153 | Stock health = 60%  (each gets a green tick "matches")
Final caption: "If the numbers disagree, the spreadsheet wins: tighten the prompt."

TIMELINE (scene by scene; times are relative to the section start; format: time | what appears / cursor action | callout or caption text)
1. 00:00–00:08 | Canvas from Part 1. Cursor adds an "AI Agent" node after Merge and connects "Anthropic Chat Model" to its Chat Model port. | Callout: "Same brain as Video 5"
2. 00:08–00:16 | In the panel: Source for Prompt -> "Define below"; the user prompt is pasted into Prompt (User Message); Add Option -> System Message; the system message is pasted. | No callout
3. 00:16–00:38 | The expanded prompt editor slides over the canvas showing the full prompt from the top; it scrolls slowly to the bottom and back. | Callout: "Vague prompt = vague report. Precise prompt = the same clean report every week."
4. 00:38–00:55 | SYSTEM MESSAGE block outlined; zoom 1.5 on "Never invent numbers. Use only the data provided." | Callout: "Who you are, who you write for, and the golden rule"
5. 00:55–01:10 | DATA block outlined with a blue bracket. | Label: "1 DATA: the three lists we collected"
6. 01:10–01:25 | CALCULATE block outlined with a green bracket; formula lines glow one by one. | Label: "2 CALCULATE: exact formulas, so the AI doesn't guess"
7. 01:25–01:36 | FORMAT block outlined with an amber bracket; zoom on "maximum 2 items for Mr. Harrison". | Label: "3 FORMAT: the exact structure"; callout: "Directors want 2 decisions, not 20"
8. 01:36–02:03 | The HTML line in FORMAT glows; an explainer card slides in: left a grey wall of text, right the same text morphing into a neat email with a heading, bold and bullets; tag chips <h2>, <b>, <li> fly to the parts they create. | Callout: "You don't learn HTML. You just ask for it."
9. 02:03–02:08 | Card fades. | Caption: "PRO TIP: Spell out your formulas in the prompt."
10. 02:08–02:14 | Editor closes. Cursor clicks "Test step"; a spinner and a small timer chip count up quickly to "12 s". | No callout
11. 02:14–02:24 | The OUTPUT panel shows the rendered report; the headline gets a yellow box. | Callout: "What a director wants in line one"
12. 02:24–02:36 | KEY NUMBERS: "60%" and "$16,153" get yellow boxes. | Callouts: "6 of 10 SKUs healthy" / "Money tied up in stock"
13. 02:36–02:50 | Panel scrolls slowly through TOP 5 RISKS, the reordered table and REJECTED / ON HOLD; each section heading pulses as it passes. | Callout: "Each risk: a reason and an action"
14. 02:50–03:02 | NEEDS YOUR DECISION box outlined; the timer chip grows into "Sarah: 3 hours -> Stocky: ~12 seconds". | Callout: "Just two decisions for Mr. Harrison"
15. 03:02–03:10 | Switch to the activity file, sheet "Dashboard". Cursor points at the Money tied up and Stock health cells. | Callout: "Never trust, always verify"
16. 03:10–03:22 | Green ticks pop next to $16,153 and 60%, each with the word "matches". | Callouts: "$16,153 matches" / "60% matches"
17. 03:22–03:29 | Hold. | Caption: "If the numbers disagree, the spreadsheet wins: tighten the prompt."
18. 03:29–03:30 | END card | END

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
(00:00) I add the AI Agent node, connect the same Claude or OpenAI model from Video 5, and choose "Define below" for the prompt. Here's the prompt. I'm going to read it with you, because this is where the quality of your report is decided. A vague prompt gives you a vague report. A precise prompt gives you the same clean report every single week.
(00:38) Let's walk through it. The system message tells the intern who they are, who they're writing for, and the golden rule: never invent numbers. Use only the data provided. Then the user prompt gives three things. Data: the three lists we just collected. Calculate: exactly how to work out stock health and money tied up, so the AI doesn't guess its own formula. And Format: the exact structure, in order. Headline, key numbers, top five risks, items reordered, rejections, and a "needs your decision" section, because directors love being asked for at most two decisions, not twenty.
(01:36) Notice I ask for simple HTML tags. HTML is just the formatting language of emails and web pages. H2 means "a heading", "b" means bold, "li" means bullet. You don't need to learn it. You just ask the AI to use it, and your email arrives looking neat instead of like one big grey paragraph.
(02:08) And here's the report. Read the headline: "Pallet jack wheels and hydraulic oil are our two biggest risks this week." ... Stock health 60 percent, because six of our ten SKUs are healthy. Money tied up in stock, 16,153 dollars. Top five risks, each with a reason and an action. The items reordered, who approved them, the two on hold and why. And just two decisions for Mr. Harrison. Sarah used to spend three hours on this. Stocky took about twelve seconds.
(03:02) Now, never trust, always verify, especially in the first few weeks. I check the numbers against my own spreadsheet. Money tied up, 16,153, matches. Stock health, 60 percent, matches. If the AI's numbers ever disagree with your spreadsheet, the spreadsheet wins and you tighten the prompt.

CHECKLIST
- Total duration exactly 3 min 30 s (210 s), with every scene at the times listed above.
- The prompt and the rendered report match the DATA block word for word (including $16,153, 60%, $6,935, $2,646, $1,872).
- Brackets for DATA, CALCULATE and FORMAT appear in that order, synced to the voice-over.
- The Dashboard check shows $16,153 and 60% with green ticks.
- Start button, hover Pause/Restart controls, progress bar and the 1-second END card are present.
- Nothing overflows the 1920x1080 stage, and every callout sits beside (not on top of) what it explains.
```

**After Claude builds it:**

- The report is long: if it doesn't fit, ask Claude to "scroll the OUTPUT panel smoothly instead of shrinking the text".
- Pause on the Dashboard ticks in your edit if you want an extra beat for "never trust, always verify".

---

## Prompt 5 of 5: Send It: Gmail + a Simple Dashboard (19:00–21:30, 2 min 30 s)

**What this demo shows:** Building a small COUNTIFS dashboard with a column chart, sharing it view-only with Mr. Harrison, adding the Gmail node, receiving the Monday Stock Report email and switching the workflow to Active.

### Copy this prompt into Claude:

```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. This section teaches how to finish the Monday Report: a simple self-updating chart in Google Sheets, a view-only share link, a Gmail node that sends the AI's HTML report with a clickable dashboard link, and activating the workflow.

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

SECTION LENGTH: exactly 2 min 30 s (150 seconds). The master timeline runs from 00:00 to 02:30; the END card fills 02:29–02:30.

APP LOOK
- Google Sheets-style spreadsheet (simplified look-alike, no real logos): green accent, menu bar (File, Edit, View, Insert, Format, Data...), formula bar, column letters A, B, C..., row numbers, sheet tabs at the bottom with a "+" (Add Sheet) button at the bottom-left. Browser tab title "BrightLeaf – Stocky Database - Google Sheets", URL bar "docs.google.com/spreadsheets/d/brightleaf-stocky-database".
- Google Sheets chart editor: a right-side panel "Chart editor" with tabs "Setup | Customise" and a "Chart type" dropdown; a Share dialog with "Add people" field, a role dropdown (Viewer/Commenter/Editor), "General access: Restricted" and a "Copy link" button.
- n8n-style workflow canvas (simplified look-alike): dark grey dotted canvas, rounded square nodes with an icon and label, grey connector lines with animated dots when data flows, a right-side panel for node settings, an orange "Test workflow" button, an Executions tab. Browser URL bar "brightleaf.app.n8n.cloud/workflow/...", tab title "<workflow name> - n8n".
- Node settings panel: three columns when open: INPUT (left, shows earlier nodes' data as a schema of green draggable labels), PARAMETERS (centre, labelled fields and dropdowns), OUTPUT (right). Orange "Test step" button top-right.
- Gmail-style inbox for "Mr. Harrison" (harrison@brightleaf.example): email list on the left, open email on the right. No real logos.

DATA TO SHOW (copy exactly; do not change any number, name, URL or wording)
New tab: Dashboard
A1 = Week starting | B1 = RFQs created | C1 = Rejected / Hold
A2:A5 = 2026-10-19 | 2026-10-26 | 2026-11-02 | 2026-11-09
B2 formula (typed): =COUNTIFS('Decision Log'!F:F,"RFQ created",'Decision Log'!B:B,">="&A2,'Decision Log'!B:B,"<"&A2+7)   (then dragged down to B5)
C2 formula (same idea, shown already filled): =COUNTIFS('Decision Log'!F:F,"Rejected",'Decision Log'!B:B,">="&A2,'Decision Log'!B:B,"<"&A2+7)+COUNTIFS('Decision Log'!F:F,"Hold",'Decision Log'!B:B,">="&A2,'Decision Log'!B:B,"<"&A2+7)
Results: B2:B5 = 3, 2, 0, 4 ; C2:C5 = 3, 3, 3, 2
Chart: Insert -> Chart -> Chart editor Setup -> Chart type = Column chart (four weeks, two series: RFQs created blue, Rejected / Hold amber)
Share: General access = Restricted | add harrison@brightleaf.example as Viewer | Copy link -> toast "Link copied"
Gmail node: Resource = Message | Operation = Send
  To: harrison@brightleaf.example | CC: sarah@brightleaf.example
  Subject: Monday Stock Report – Week of {{ $now.toFormat('d LLL yyyy') }}
  Email Type: HTML
  Message: {{ $json.output.replace('[link]', '<a href="PASTE-SHEET-LINK">Open dashboard</a>') }}
  Options -> Append n8n Attribution = off
Inbox email: From "Stocky (BrightLeaf)", subject "Monday Stock Report – Week of 16 Nov 2026", body starts with the bold headline "Pallet jack wheels and hydraulic oil are our two biggest risks this week: both are below reorder point with long lead times, and the hydraulic oil order is still on hold.", then KEY NUMBERS bullets (Stock health: 60% / Money tied up in stock: $16,153 / SKUs below reorder point: 4 / RFQs created this week: 4 (total value $6,935)), a small reorder table, and at the end "Full dashboard: Open dashboard" (blue link).
Active toggle top-right: "Inactive" -> "Active" (label note: "newer n8n: Publish")

TIMELINE (scene by scene; times are relative to the section start; format: time | what appears / cursor action | callout or caption text)
1. 00:00–00:05 | Google Sheet. Cursor clicks "+" at the bottom-left, right-clicks the new tab, Rename, types "Dashboard". | No callout
2. 00:05–00:15 | Cursor types the three headers in A1:C1 and the four Monday dates in A2:A5. | Callout: "One row per week"
3. 00:15–00:25 | Cursor clicks B2 and types the COUNTIFS formula (the formula bar shows it; typing effect). | Callout: "COUNTIFS: count 'RFQ created' rows in that week"
4. 00:25–00:31 | Cursor drags the fill handle from B2 down to B5; values 3, 2, 0, 4 appear. Column C fills with 3, 3, 3, 2. | Callout: "Same idea for Rejected / Hold"
5. 00:31–00:42 | Cursor selects A1:C5, Insert -> Chart; the Chart editor opens; Chart type dropdown -> "Column chart"; four pairs of bars grow up from zero. | Callout: "Updates itself as the log grows"
6. 00:42–00:50 | Cursor clicks "Share" (top-right); the dialog opens; types harrison@brightleaf.example; role dropdown set to "Viewer"; General access shows "Restricted". | Callout: "Viewer, not Editor"
7. 00:50–00:57 | Cursor clicks "Copy link"; a toast "Link copied" appears. | Callout: "He can look; he can't delete the log"
8. 00:57–01:12 | Switch to n8n (Monday Report workflow). Cursor adds a Gmail node after the AI Agent: Resource Message, Operation Send; To and CC typed. | Callout: "CC Sarah: she sees what her boss sees"
9. 01:12–01:22 | Subject typed; a small grey preview under it shows "Monday Stock Report – Week of 16 Nov 2026". Email Type set to HTML. | Callout: "The date fills itself in" / "HTML: headings and bullets show nicely"
10. 01:22–01:33 | The Message expression is pasted; the [link] part and the <a ...>Open dashboard</a> part are highlighted. | Callout: "Swap '[link]' for a real clickable link"
11. 01:33–01:40 | Options -> "Append n8n Attribution" toggled off. | Callout: "No advert at the bottom"
12. 01:40–01:48 | Cursor clicks "Test workflow"; green ticks run across every node. | No callout
13. 01:48–02:05 | Switch to Mr. Harrison's inbox; the new email slides in at the top (bold, unread); cursor opens it; the headline, key numbers and table are visible. | Callout: "Monday Stock Report, week of 16 November"
14. 02:05–02:12 | Cursor clicks "Open dashboard"; a new tab opens on the Dashboard tab with the column chart. | Callout: "One click to the chart"
15. 02:12–02:29 | Back in n8n, cursor clicks the Inactive toggle top-right; it slides green to "Active". A small chip "Runs every Monday 7:00 am (America/New_York)" appears. | Callout: "Newer n8n: this button is called Publish"
16. 02:29–02:30 | END card | END

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
(00:00) Before the email, a quick dashboard, so Mr. Harrison can click through to the detail. I add a "Dashboard" tab to the same Google Sheet. A couple of formulas you already know from Excel, COUNTIF and COUNTIFS, count how many RFQs were created each week. Then I select that little table, click Insert, Chart, and in the Chart editor pick "Column chart". Four bars, one per week. Simple, honest, and it updates itself because the Decision Log keeps growing.
(00:42) Then I share the sheet with Mr. Harrison as a Viewer only. Viewer, not Editor. He can look, he can't accidentally delete the log. I copy the link.
(00:57) Now the Gmail node. Send a message to Mr. Harrison, CC Sarah so she always sees what her boss sees. Subject: "Monday Stock Report, Week of", and the date fills itself in. Email type: HTML, so our headings and bullets show nicely. In the message, I take the AI's output and swap the word "link" for a real clickable link to the dashboard. And I turn off "Append n8n Attribution", so the email doesn't end with an advert.
(01:40) Test the whole workflow, and switch to Mr. Harrison's inbox. There it is. "Monday Stock Report, week of 16 November." Clean headline, key numbers, risks, the reorder table, and a link that opens the dashboard.
(02:05) Last step: I switch the workflow to Active. In newer versions of n8n the button is called Publish. Either way, from now on it runs every Monday at 7 am, whether Sarah is in the office, on leave, or stuck in traffic on the I-270 outerbelt.

CHECKLIST
- Total duration exactly 2 min 30 s (150 s), with every scene at the times listed above.
- The COUNTIFS formula, email addresses, subject and message expression match the DATA block exactly.
- Dashboard values are 3, 2, 0, 4 (RFQs) and 3, 3, 3, 2 (Rejected / Hold), drawn as a column chart.
- The received email subject reads "Monday Stock Report – Week of 16 Nov 2026".
- Start button, hover Pause/Restart controls, progress bar and the 1-second END card are present.
- Nothing overflows the 1920x1080 stage, and every callout sits beside (not on top of) what it explains.
```

**After Claude builds it:**

- The first 42 seconds are spreadsheet work; keep the formula visible in the formula bar so viewers can pause and copy it.
- If you want a longer look at the email, freeze the frame at 02:05 in your editor rather than changing the demo timing.
