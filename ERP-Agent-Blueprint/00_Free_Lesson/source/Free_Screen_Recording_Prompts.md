# Free Lesson: How AI Agents Connect to Your ERP: Screen-Recording Prompts
**How to use:** 1. Open claude.ai, start a new chat, and paste ONE prompt. 2. Claude builds an animated demo you can preview. If anything looks wrong, reply in the same chat ("make the cursor slower", "the table is cut off"). 3. Open the demo full-screen in Chrome (press F11 / Ctrl+Cmd+F), start your screen recorder (QuickTime: File → New Screen Recording), then click **Start**. 4. Stop recording when the "END" card appears, trim the start and end, and add your voice-over from the script. Each demo runs for the same length as its script section, so the voice-over lines up.

<!-- VO NOTE START -->
**Voice-over (Fish Audio):** Under every prompt you'll find a grey **"Voice-over text for Fish Audio"** box. Copy that text into Fish Audio and download the audio. Best order: make the audio FIRST, check its length, and if it's longer or shorter than the section length, add one line to the prompt before sending it to Claude: *"Make the total duration exactly M:SS"* (your audio length). Claude's demo has no sound, so you join the audio and video in a video editor (CapCut, iMovie, Descript): put both on the timeline starting at 0:00.
<!-- VO NOTE END -->

**Sections in this video:**

| # | Section | Time | Length | Prompt |
|---|---|---|---|---|
| 1 | The 3 Doors: ERP, API, Database | 02:15–03:45 | 1 min 30 s | Prompt 1 |
| 2 | Sneak Peek: Meet Stocky | 05:00–06:30 | 1 min 30 s | Prompt 2 |
| 3 | What's Inside The ERP Agent Blueprint | 06:30–08:15 | 1 min 45 s | Prompt 3 |

---

## Prompt 1 of 3: The 3 Doors: ERP, API, Database (02:15–03:45, 1 min 30 s)
**What this demo shows:** Stocky the robot in front of three doors, then a look behind each one: the Odoo product list (ERP), a live weather API link for Shenzhen (API) and the Google Sheet decision log (database).

### Copy this prompt into Claude:
```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. I will play it full-screen and screen-record it, then add my own voice-over. This section teaches complete beginners (supply chain people, not techies) that an AI agent reaches business data through three "doors": the ERP (a filing cabinet + rulebook), an API (a waiter in a restaurant) and a database (a super-organised Excel workbook).

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

SECTION LENGTH: exactly 1:30 (90 seconds). The END card shows from 01:29 to 01:30.

APP LOOK (only these screens appear)
- Doors diagram (full stage, no browser frame): soft off-white background (#F8FAFC). In the centre a friendly round robot mascot named "Stocky" (simple flat shapes: rounded navy body, blue screen face with two white dot eyes and a smile, small antenna). Around it, three tall rounded doors spaced evenly on an arc: left door "ERP" (navy), middle door "API" (blue #2563EB), right door "DATABASE" (green #16A34A). Each door has a small icon above it: filing cabinet, waiter with a tray, spreadsheet grid. A door "opens" by swinging (CSS 3D rotateY) and a soft light spills out, then the stage zooms through the doorway into the next screen.
- Odoo-style ERP inside a browser frame: tab title "Products - Odoo", URL bar "brightleaf-supplies.odoo.com/odoo/inventory". Purple-ish top bar (#714B67) with the app name "Inventory" and menu items Overview, Operations, Products, Reporting, Configuration. Breadcrumb "Products". A "New" button top-left. List view with a checkbox column and columns: Internal Reference | Product Name | Sales Price | Cost | On Hand.
- Browser JSON view: browser frame with tab title "api.open-meteo.com", URL bar showing the full URL below, white page with pretty-printed JSON in a monospace font, keys in dark purple, numbers in blue, strings in green, with a small "Pretty-print" checkbox ticked at the top-left like Chrome's.
- Google Sheets-style spreadsheet: browser frame, tab title "Stocky Decision Log - Google Sheets", URL bar "docs.google.com/spreadsheets/d/stocky-decision-log". Green accent, file name "Stocky Decision Log" at top-left, a formula bar, column letters A-D, row numbers, one tab at the bottom named "Log". Header row bold with a light green fill.

DATA TO SHOW
- Company: BrightLeaf Supplies, Columbus, Ohio, USA. All prices in USD.
- Odoo product list (10 rows, exactly these values):
  BL-1001 | Steel Hex Bolts M10 (box of 100) | $16.88 | $12.50 | 145
  BL-1002 | Corrugated Shipping Box 18x12x10 | $1.15 | $0.85 | 1,180
  BL-1003 | Stretch Wrap Film 500mm | $12.42 | $9.20 | 260
  BL-1004 | Industrial Safety Gloves (pair) | $3.24 | $2.40 | 420
  BL-1005 | Pallet Jack Wheels (set) | $51.30 | $38.00 | 18
  BL-1006 | Packing Tape 48mm (roll) | $1.49 | $1.10 | 1,850
  BL-1007 | Hydraulic Oil 20L | $72.90 | $54.00 | 31
  BL-1008 | LED Warehouse Light 150W | $97.20 | $72.00 | 34
  BL-1009 | Nylon Cable Ties (pack of 500) | $8.51 | $6.30 | 410
  BL-1010 | Forklift Battery Water Kit | $26.66 | $19.75 | 26
- API URL (show exactly in the URL bar): https://api.open-meteo.com/v1/forecast?latitude=22.54&longitude=114.06&current=temperature_2m,precipitation
- JSON response (illustrative values; keep this structure):
  {
    "latitude": 22.5,
    "longitude": 114.0625,
    "timezone": "GMT",
    "current_units": { "time": "iso8601", "temperature_2m": "°C", "precipitation": "mm" },
    "current": { "time": "2026-11-17T08:00", "temperature_2m": 24.6, "precipitation": 0.0 }
  }
- Google Sheet "Stocky Decision Log", columns A-D: Date | SKU | Action | Approved By. Rows:
  11/09/2026 | BL-1005 | Drafted RFQ: 32 sets from Global Lift Parts | Sarah Mitchell
  11/09/2026 | BL-1002 | Drafted RFQ: 1,820 boxes from PackRight Industries | Sarah Mitchell
  11/10/2026 | BL-1007 | Flagged low stock: 31 drums, reorder point 40 | Sarah Mitchell
  11/12/2026 | BL-1004 | Drafted RFQ: 780 pairs from SafeHands Co. | Sarah Mitchell
  11/16/2026 | BL-1008 | Checked stock: OK (34 on hand) | -
  New row that animates in during scene 12: 11/17/2026 | BL-1005 | Checked weather in Shenzhen: no risk today | -
- ON-SCREEN TEXT (lower-third caption): "API = a waiter. You order, it brings back exactly what you asked for."

TIMELINE (scene by scene; times are relative to the start of this section)
1. 00:00–00:04 | Off-white stage. Stocky the robot pops in at the centre (scale 0 to 1, slight bounce), blinks once. | No callout.
2. 00:04–00:09 | The three doors slide up from below one after another (0.3 s apart): ERP, API, DATABASE. Their labels fade in. A dashed line draws from Stocky to each door. Hold. | Callout above the doors: "Every agent uses one of 3 doors".
3. 00:09–00:13 | The cursor glides to the ERP door and clicks it (ripple). The door swings open, light spills out, and the stage zooms smoothly through the doorway; cross-fade into the browser showing the Odoo product list. | No callout.
4. 00:13–00:24 | Odoo product list is fully visible with all 10 rows. The cursor glides down the On Hand column; a soft yellow highlight box outlines the whole On Hand column. Rows BL-1002, BL-1004, BL-1005 and BL-1007 get a faint red tint on their On Hand cell. | Callout pointing at the On Hand column: "Live stock levels". Second callout near the top bar: "ERP = the company's filing cabinet + rulebook".
5. 00:24–00:32 | The cursor hovers the "Inventory" menu, then the "Purchase" app name in a small app switcher that slides down (Inventory, Purchase, Sales, Contacts). Three small grey chips fade in at the top-right of the stage: "SAP", "Oracle", "NetSuite", with a label "Same idea". | Callout: "Stock, purchase orders, suppliers: all in one place".
6. 00:32–00:36 | Zoom back out through the doorway to the doors diagram. The ERP door closes. The cursor clicks the API door; it opens and the stage zooms through into a browser. | No callout.
7. 00:36–00:42 | Browser JSON view. The URL bar shows the Open-Meteo URL (it types in quickly at ~40 characters/second, as if pasted, then Enter). The page "loads" with a 0.5 s blank, then the pretty-printed JSON appears line by line. | Callout on the URL bar: "Just a link. No code."
8. 00:42–00:52 | Small illustration slides in at the bottom-right corner (not covering the JSON): a simple waiter icon carrying a tray from a "Kitchen" box to a "You" box, with a dotted path animating. The lower-third caption appears and is held for 5 seconds. | ON-SCREEN TEXT: "API = a waiter. You order, it brings back exactly what you asked for."
9. 00:52–01:05 | The waiter illustration fades out. Zoom to 1.6x centred on the "current" block of the JSON. Yellow highlight boxes pop around "temperature_2m": 24.6 and "precipitation": 0.0. Hold, then zoom back out at 01:03. | Callouts: "Temperature in Shenzhen right now" and "Rain right now". A small map-pin badge at the top: "Shenzhen, China: home of 2 BrightLeaf suppliers".
10. 01:05–01:09 | Zoom out to the doors diagram. The API door closes, the cursor clicks the DATABASE door, it opens and the stage zooms through into the Google Sheet. | No callout.
11. 01:09–01:20 | Google Sheet with the 5 rows. Animated labels appear one after another, each with a yellow outline: the bottom tab "Log" gets the label "Table = a sheet"; row 3 gets a full-row outline labelled "Row = one record"; column C gets a full-column outline labelled "Column = a field". | Callout at the top: "Database = a super-organised Excel workbook".
12. 01:20–01:29 | A new row 7 slides in and types itself (the new row from the DATA block), with a small Stocky robot icon appearing at the row's left edge as if it wrote it. The new row flashes green once, then holds. | Callouts: "The agent writes down what it did: a paper trail" and, near the file name, "A Google Sheet works as your first database".
13. 01:29–01:30 | END card: navy background, white text "END". | -

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
[00:00] Every agent that does real supply chain work walks through one of three doors.
[00:09] Door number one is your ERP. Think of it as the company's central filing cabinet plus the rulebook. Stock levels, purchase orders, suppliers: it all lives here. This is Odoo, a free ERP we use in the course, but SAP, Oracle and NetSuite are the same idea.
[00:32] Door number two is an API. An API is like a waiter in a restaurant. You don't walk into the kitchen. You give your order to the waiter, and the waiter brings back exactly what you asked for. Here, I just asked a free weather service, "What's the weather in Shenzhen right now?" That's where two of BrightLeaf's suppliers are. No code. I just opened a link.
[01:05] Door number three is a database. Think of it as a super-organised Excel workbook. Tables are sheets, rows are records, columns are fields. This is where the agent writes down what it did, so there's always a paper trail. And yes, for beginners, a Google Sheet works perfectly as your first database.

CHECKLIST
- Total duration exactly 1:30, END card visible only from 01:29 to 01:30.
- All 10 products, prices and On Hand numbers match the DATA block exactly; the Open-Meteo URL is shown in full.
- Start button, hover-only Pause/Restart controls, progress bar, Space and R keys all work.
- Callouts never cover the value they point at; the waiter illustration does not hide the JSON.
- Nothing overflows the 1920x1080 stage; no real logos anywhere.
```
**After Claude builds it:**

<!-- VOICEOVER START -->
### Voice-over text for Fish Audio (paste this)
*180 words, about 1 min 12 s at a natural pace (150 words/min). Paste it as is; each paragraph is a natural pause.*

```text
Every agent that does real supply chain work walks through one of three doors.

Door number one is your ERP. Think of it as the company's central filing cabinet plus the rulebook. Stock levels, purchase orders, suppliers: it all lives here. This is Odoo, a free ERP we use in the course, but SAP, Oracle and NetSuite are the same idea.

Door number two is an API. An API is like a waiter in a restaurant. You don't walk into the kitchen. You give your order to the waiter, and the waiter brings back exactly what you asked for. Here, I just asked a free weather service, "What's the weather in Shenzhen right now?" That's where two of BrightLeaf's suppliers are. No code. I just opened a link.

Door number three is a database. Think of it as a super-organised Excel workbook. Tables are sheets, rows are records, columns are fields. This is where the agent writes down what it did, so there's always a paper trail. And yes, for beginners, a Google Sheet works perfectly as your first database.
```
<!-- VOICEOVER END -->

- The JSON temperature and rain values are illustrative. If you want the real numbers, open the Open-Meteo link on the day you record and ask Claude to swap in those two values.
- Click Start about one second after you begin recording, then trim that second off.
- If the door zoom feels too fast, reply "make each door transition 1 second slower but keep the total at 1:30".

---

## Prompt 2 of 3: Sneak Peek: Meet Stocky (05:00–06:30, 1 min 30 s)
**What this demo shows:** The finished Stocky workflow in n8n answers "What's running low?" from live Odoo data, drafts a glove order, asks for approval by email, and on Approve creates the RFQ in Odoo and logs it in the Google Sheet.

### Copy this prompt into Claude:
```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. I will play it full-screen and screen-record it, then add my own voice-over. This section is a sneak peek of a finished no-code AI agent called "Stocky" for a distributor called BrightLeaf Supplies: it reads stock from the ERP, answers in plain English, drafts a purchase order and only acts after a human clicks Approve.

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

SECTION LENGTH: exactly 1:30 (90 seconds). The END card shows from 01:29 to 01:30.

APP LOOK (only these screens appear)
- n8n-style workflow canvas inside a browser frame: tab title "Stocky - n8n", URL bar "brightleaf.app.n8n.cloud/workflow/stocky". Dark grey dotted canvas. Five rounded-square nodes left to right with icons and labels: "When chat message received" (chat bubble icon), "AI Agent" (robot icon, larger, with a small "Anthropic Chat Model" sub-node hanging below it), "Odoo" (purple box icon), "Gmail" (envelope icon), "Google Sheets" (green grid icon). Odoo, Gmail and Google Sheets are connected to the AI Agent as its tools (lines from the bottom of the AI Agent to each). Grey connector lines; animated dots run along a line when data flows. A running node gets a spinning ring; a finished node turns green with a white check badge. An orange "Test workflow" button at the bottom centre. A chat panel slides in from the right side of the canvas when "Open chat" is clicked (a small button next to "Test workflow").
- Chat panel (inside n8n): title "Chat", user messages as blue bubbles on the right, Stocky's answers as white cards on the left, a text input at the bottom with a send arrow.
- Gmail-style inbox (browser frame, tab title "Inbox - Gmail", URL bar "mail.google.com/mail/u/0/#inbox"): an email list and an open email view. The approval email has two big buttons: "Approve" (green) and "Reject" (red).
- Odoo-style ERP (browser frame, tab title "Requests for Quotation - Odoo", URL bar "brightleaf-supplies.odoo.com/odoo/purchase"): purple-ish top bar (#714B67) with "Purchase", menu Orders, Products, Reporting, Configuration; breadcrumb "Requests for Quotation"; "New" button; list view with checkbox column: Reference | Vendor | Order Deadline | Total | Status.
- Google Sheets-style spreadsheet (browser frame, tab title "Stocky Decision Log - Google Sheets"): green accent, formula bar, columns A-D, row numbers, one tab "Log".

DATA TO SHOW
- Company: BrightLeaf Supplies, Columbus, Ohio. Manager: Sarah Mitchell. Money in USD.
- Chat message 1 (typed by the user): What's running low and who should I order from?
- Stocky's reply (appears as a card, streaming in line by line):
  "I checked live stock in Odoo. 4 products are below their reorder point:
  1. Corrugated Shipping Boxes (BL-1002): 1,180 on hand, reorder point 1,500. Supplier: PackRight Industries (Chicago, IL). Suggest 1,820 boxes.
  2. Industrial Safety Gloves (BL-1004): 420 pairs on hand, reorder point 600. Supplier: SafeHands Co. (Monterrey, Mexico). Suggest 780 pairs.
  3. Pallet Jack Wheels (BL-1005): 18 sets on hand, reorder point 25. Supplier: Global Lift Parts (Shenzhen, China). Suggest 32 sets.
  4. Hydraulic Oil 20L (BL-1007): 31 drums on hand, reorder point 40. Supplier: Gulf Lubricants (Dubai, UAE). Suggest 49 drums.
  Want me to draft any of these purchase orders?"
- Chat message 2 (typed by the user): Draft the PO for the gloves.
- Stocky's short reply: "Done. I've drafted it and emailed Sarah for approval. Nothing is sent to SafeHands Co. until she clicks Approve."
- Approval email: From "Stocky (BrightLeaf agent)", To "Sarah Mitchell", subject "Stocky: approve PO for 780 pairs of Industrial Safety Gloves from SafeHands Co.?" Body: "Hi Sarah, Industrial Safety Gloves (BL-1004) are at 420 pairs, below the reorder point of 600. Draft PO: 780 pairs from SafeHands Co. (Monterrey, Mexico) at $2.40 per pair = $1,872.00. Approve to create the draft in Odoo." Buttons: Approve (green), Reject (red).
- After Approve, the Odoo RFQ list shows a new top row: P00001 | SafeHands Co. | today | $1,872.00 | RFQ (status badge, grey-blue).
- Google Sheet "Stocky Decision Log", columns Date | SKU | Action | Approved By. Existing rows:
  11/12/2026 | BL-1002 | Drafted RFQ: 1,820 boxes from PackRight Industries | Sarah Mitchell
  11/13/2026 | BL-1005 | Drafted RFQ: 32 sets from Global Lift Parts | Sarah Mitchell
  11/16/2026 | BL-1007 | Flagged low stock: 31 drums, reorder point 40 | Sarah Mitchell
  New row that slides in: 11/17/2026 | BL-1004 | Drafted PO: 780 pairs Industrial Safety Gloves from SafeHands Co. | Sarah Mitchell
- ON-SCREEN TEXT (lower-third caption): "You build this in The ERP Agent Blueprint. No code."

TIMELINE (scene by scene; times are relative to the start of this section)
1. 00:00–00:06 | Browser with the n8n canvas fades in. The five nodes appear one at a time left to right (0.4 s apart) with a gentle pop, and the connector lines draw themselves. | Callout above the AI Agent node: "Stocky: BrightLeaf's inventory agent".
2. 00:06–00:17 | The cursor glides slowly over each node in turn; each node lifts slightly (hover shadow) as the cursor passes. Small yellow labels pop under them: "Chat", "Brain", "ERP", "Email", "Log". | Callouts: "Each box = one step, like a Lego block" and, at 00:12, "No code anywhere".
3. 00:17–00:25 | The cursor clicks "Open chat"; the chat panel slides in from the right. The input focuses (blue outline) and the user message types in at 14 characters/second with a blinking caret: What's running low and who should I order from? The cursor clicks the send arrow at 00:24. | Callout near the input: "Sarah's daily question".
4. 00:25–00:33 | The user bubble appears. The Odoo node gets a spinning ring, animated dots flow from the AI Agent to Odoo and back, then Odoo turns green with a check (00:28). Then the AI Agent node spins and turns green (00:31). | Callout next to the Odoo node: "Reading live stock from Odoo".
5. 00:33–00:47 | Stocky's reply card streams in line by line (the 4 numbered items). Each item, as it appears, gets a small red "LOW" pill next to the on-hand number. | Callout: "4 products below their reorder point".
6. 00:47–00:55 | Zoom to 1.5x on items 2 and 3. Yellow highlight boxes around "SafeHands Co. (Monterrey, Mexico)" and "Global Lift Parts (Shenzhen, China)", then around "Suggest 780 pairs". Zoom back out at 00:54. | Callouts: "Supplier for each item" and "Suggested order quantity".
7. 00:55–01:02 | The input focuses again and the user types: Draft the PO for the gloves. Send at 01:00. The Gmail node spins and turns green; Stocky's short reply appears. | Callout: "It drafts. It does not buy."
8. 01:02–01:06 | Browser switches tabs (tab strip highlight slides) to the Gmail inbox. The new unread email from Stocky drops in at the top of the list with a soft bounce; the cursor clicks it. | No callout.
9. 01:06–01:12 | The approval email is open. Zoom gently to 1.3x on the subject line and the Approve / Reject buttons, hold, then zoom out. | Callout on the buttons: "Nothing happens until Sarah clicks Approve".
10. 01:12–01:16 | The cursor glides to "Approve" and clicks (ripple, button depresses). The button turns into a green pill "Approved by Sarah Mitchell" with a check. | No callout.
11. 01:16–01:21 | Switch to the Odoo tab, Purchase > Requests for Quotation. The new row P00001 | SafeHands Co. | $1,872.00 | RFQ slides in at the top of the list and flashes light green. | Callout: "Draft RFQ created in Odoo".
12. 01:21–01:29 | Switch to the Google Sheet tab. The new row for BL-1004 slides in at the bottom and flashes green. The lower-third caption appears for 5 seconds (01:23–01:28). A small timer badge in the top-right shows "about 30 seconds". | ON-SCREEN TEXT: "You build this in The ERP Agent Blueprint. No code." Callout on the new row: "Decision logged".
13. 01:29–01:30 | END card: navy background, white text "END". | -

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
[00:00] This is Stocky, BrightLeaf's inventory and procurement agent. It's the exact agent you build in the paid course. Each box is one step, like a Lego block. No code anywhere.
[00:17] Let me ask it the question Sarah asks every single morning.
[00:25] Watch. It went into Odoo, read the live stock, compared it with the reorder points, and came back in plain English. Four products are low. Safety gloves from SafeHands Co. in Monterrey, Mexico, pallet jack wheels from Global Lift Parts in Shenzhen, and so on. It even suggests how many to order.
[00:55] Now the important bit. It doesn't just go and buy things. It drafts the purchase order and sends Sarah an email asking for approval. Nothing happens until she clicks Approve.
[01:12] One click, and the draft is in Odoo, and the decision is logged in the database. That whole thing took about thirty seconds. It used to take Sarah half her morning.

CHECKLIST
- Total duration exactly 1:30, END card visible only from 01:29 to 01:30.
- The 4 low products, on-hand numbers, reorder points, suppliers and suggested quantities match the DATA block exactly; the glove order is 780 pairs and $1,872.00 everywhere.
- Node states animate in the right order: Odoo green before AI Agent green; Gmail green after the second message.
- Start button, hover-only Pause/Restart controls, progress bar, Space and R keys all work.
- Nothing overflows the 1920x1080 stage; no real logos (n8n, Odoo, Gmail and Google look-alikes only).
```
**After Claude builds it:**

<!-- VOICEOVER START -->
### Voice-over text for Fish Audio (paste this)
*154 words, about 1 min 02 s at a natural pace (150 words/min). Paste it as is; each paragraph is a natural pause.*

```text
This is Stocky, BrightLeaf's inventory and procurement agent. It's the exact agent you build in the paid course. Each box is one step, like a Lego block. No code anywhere.

Let me ask it the question Sarah asks every single morning.

Watch. It went into Odoo, read the live stock, compared it with the reorder points, and came back in plain English. Four products are low. Safety gloves from SafeHands Co. in Monterrey, Mexico, pallet jack wheels from Global Lift Parts in Shenzhen, and so on. It even suggests how many to order.

Now the important bit. It doesn't just go and buy things. It drafts the purchase order and sends Sarah an email asking for approval. Nothing happens until she clicks Approve.

One click, and the draft is in Odoo, and the decision is logged in the database. That whole thing took about thirty seconds. It used to take Sarah half her morning.
```
<!-- VOICEOVER END -->

- Stocky's long reply has to fit the chat panel: if it is cut off, reply "make the chat panel 760 px wide and the reply font 22 px".
- The voice-over line "Watch." starts as the nodes light up at 00:25, so begin speaking that paragraph exactly when the Odoo node starts spinning.
- Trim the first second (before you click Start) and the last frame after END.

---

## Prompt 3 of 3: What's Inside The ERP Agent Blueprint (06:30–08:15, 1 min 45 s)
**What this demo shows:** A course title slide, then the 10 video titles appearing one by one as they are mentioned, then a "what you get" slide with Quiz, Activity file and Guide icons.

### Copy this prompt into Claude:
```text
ROLE & GOAL
You are a motion designer building an animated slide-style video as a single self-contained HTML file. I will play it full-screen and screen-record it, then add my own voice-over. This section walks a beginner audience through the 10-video path of an online course called "The ERP Agent Blueprint" and what comes with each video.

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

SECTION LENGTH: exactly 1:45 (105 seconds). The END card shows from 01:44 to 01:45.

APP LOOK (only these screens appear)
- This section uses presentation slides, not a browser window: skip the browser frame and the mouse cursor for this one. Slides are full-stage, white background (#FFFFFF) with a navy (#1F2A44) title area, generous margins (120 px), Inter font.
- Title slide: big navy headline, a blue (#2563EB) subtitle, and a small friendly robot mascot "Stocky" (flat shapes: rounded navy body, blue screen face with two white dot eyes and a smile, small antenna) at the right.
- Course path slide: a vertical list of 10 cards in two columns (Videos 1-5 left, 6-10 right), each card 780x120 px with a round number badge (blue), the bold video title, and a one-line outcome in grey underneath. Cards start hidden (20% opacity outline only) and pop in fully when mentioned; the current card gets a yellow (#FFD84D) left border and a soft glow, which moves to the next card when the next one appears.
- What-you-get slide: three big icon tiles in a row: "Quiz" (checklist icon), "Activity file" (spreadsheet/document icon), "Guide" (open book icon), each with a short label underneath; a green "Free tier or free trial" badge at the bottom.

DATA TO SHOW
- Title slide text: "The ERP Agent Blueprint" / subtitle: "10 videos, 4 hours, no code".
- The 10 cards (title, then outcome line), exactly:
  1. Why Your ERP Needs an AI Agent - See the full Stocky demo and map your journey
  2. ERP Demystified - Set up your own free Odoo and load BrightLeaf's products
  3. APIs Explained Like You're Ordering at a Restaurant - Call a live API from your browser in minutes
  4. Databases Without Fear - Turn a messy spreadsheet into a clean home for your agent's data
  5. Your No-Code Toolkit - Set up n8n and your AI brain, and build your first workflow
  6. Your First Agent - Stocky reads the ERP and answers "What's running low?"
  7. Agents That Take Action - Stocky drafts purchase orders, but only with your approval
  8. Seeing Beyond the ERP - Weather, currency and holiday data become a supplier risk score
  9. Memory and Reports - Stocky logs every decision and sends the Monday report on its own
  10. Going Live Safely - Security, testing, costs, and your capstone project
- What-you-get tiles: "Quiz" - "Lock in what you learned"; "Activity file" - "Hands-on, in Excel or Word"; "Guide" - "Step-by-step". Badge: "Every tool has a free tier or free trial".
- ON-SCREEN TEXT (lower-third caption): "10 videos · 10 quizzes · hands-on activity files · step-by-step guides · zero code"

TIMELINE (scene by scene; times are relative to the start of this section)
1. 00:00–00:06 | Title slide builds: the headline "The ERP Agent Blueprint" slides up and fades in, then the subtitle "10 videos, 4 hours, no code" appears word by word, then Stocky waves in from the right. | No callout.
2. 00:06–00:15 | Hold on the title slide. The three facts in the subtitle get a gentle yellow underline one after another ("10 videos", "4 hours", "no code"). At 00:13 the slide slides left and the course path slide slides in with all 10 cards as faint outlines. | Callout at the top: "Here's the path".
3. 00:15–00:24 | Card 1 pops in (scale 0.95 to 1, fade) and gets the yellow highlight. | No callout.
4. 00:24–00:31 | Card 2 pops in and takes the highlight. | No callout.
5. 00:31–00:40 | Card 3 pops in and takes the highlight. A tiny waiter-with-tray icon appears at the card's right edge. | No callout.
6. 00:40–00:48 | Card 4 pops in and takes the highlight. A tiny spreadsheet icon appears at the card's right edge. | No callout.
7. 00:48–00:56 | Card 5 pops in and takes the highlight. A small banner slides in between the two columns: "Now the building starts" (it stays until scene 12). | No callout.
8. 00:56–01:02 | Card 6 pops in (right column, top) and takes the highlight. | No callout.
9. 01:02–01:09 | Card 7 pops in and takes the highlight. Tiny green "Approve" button icon at the card's right edge. | No callout.
10. 01:09–01:16 | Card 8 pops in and takes the highlight. Tiny cloud, $ and calendar icons at the right edge. | No callout.
11. 01:16–01:24 | Card 9 pops in and takes the highlight. Tiny envelope icon at the right edge. | No callout.
12. 01:24–01:29 | Card 10 pops in and takes the highlight. Then all 10 cards glow together for 1 second. | Callout: "10 videos, about 4 hours".
13. 01:29–01:36 | Transition (slide left) to the what-you-get slide. The three tiles pop in one after another (0.5 s apart): Quiz, Activity file, Guide, each label fading in under its icon. | No callout.
14. 01:36–01:44 | The green badge "Every tool has a free tier or free trial" pops in at the bottom. The lower-third caption appears and is held for 5 seconds (01:38–01:43). | ON-SCREEN TEXT: "10 videos · 10 quizzes · hands-on activity files · step-by-step guides · zero code"
15. 01:44–01:45 | END card: navy background, white text "END". | -

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
[00:00] So, how do you go from where you are today to building Stocky yourself? That's exactly what The ERP Agent Blueprint is. Ten videos, about four hours, step by step. Here's the path.
[00:15] Video 1, Why Your ERP Needs an AI Agent: you'll see the full Stocky demo and map your journey.
[00:24] Video 2, ERP Demystified: you set up your own free Odoo and load BrightLeaf's products.
[00:31] Video 3, APIs Explained Like You're Ordering at a Restaurant: you call a live API from your browser in minutes.
[00:40] Video 4, Databases Without Fear: you turn a messy spreadsheet into a clean home for your agent's data.
[00:48] Video 5, Your No-Code Toolkit: you set up n8n and your AI brain, and build your first workflow.
[00:56] Video 6, Your First Agent: Stocky reads the ERP and answers "What's running low?"
[01:02] Video 7, Agents That Take Action: Stocky drafts purchase orders, but only with your approval.
[01:09] Video 8, Seeing Beyond the ERP: weather, currency and holiday data become a supplier risk score.
[01:16] Video 9, Memory and Reports: Stocky logs every decision and sends the Monday report on its own.
[01:24] Video 10, Going Live Safely: security, testing, costs, and your capstone project.
[01:29] Every video comes with a short quiz to lock in what you learned, a hands-on activity file in Excel or Word, and step-by-step guides. And every tool we use has a free tier or free trial.

CHECKLIST
- Total duration exactly 1:45, END card visible only from 01:44 to 01:45.
- All 10 titles and outcome lines match the DATA block word for word, in order 1 to 10.
- Each card appears at its exact start time so it lines up with the voice-over.
- Start button, hover-only Pause/Restart controls, progress bar, Space and R keys all work.
- All 10 cards fit on one slide without overflowing the 1920x1080 stage; no real logos.
```
**After Claude builds it:**

<!-- VOICEOVER START -->
### Voice-over text for Fish Audio (paste this)
*233 words, about 1 min 33 s at a natural pace (150 words/min). Paste it as is; each paragraph is a natural pause.*

```text
So, how do you go from where you are today to building Stocky yourself? That's exactly what The ERP Agent Blueprint is. Ten videos, about four hours, step by step. Here's the path.

Video 1, Why Your ERP Needs an AI Agent: you'll see the full Stocky demo and map your journey. Video 2, ERP Demystified: you set up your own free Odoo and load BrightLeaf's products. Video 3, APIs Explained Like You're Ordering at a Restaurant: you call a live API from your browser in minutes. Video 4, Databases Without Fear: you turn a messy spreadsheet into a clean home for your agent's data. Video 5, Your No-Code Toolkit: you set up n8n and your AI brain, and build your first workflow. Video 6, Your First Agent: Stocky reads the ERP and answers "What's running low?" Video 7, Agents That Take Action: Stocky drafts purchase orders, but only with your approval. Video 8, Seeing Beyond the ERP: weather, currency and holiday data become a supplier risk score. Video 9, Memory and Reports: Stocky logs every decision and sends the Monday report on its own. Video 10, Going Live Safely: security, testing, costs, and your capstone project.

Every video comes with a short quiz to lock in what you learned, a hands-on activity file in Excel or Word, and step-by-step guides. And every tool we use has a free tier or free trial.
```
<!-- VOICEOVER END -->

- Read the titles at a steady pace; if you speak faster than the cards appear, ask Claude to "shift every card 1 second earlier and hold the last slide longer, keeping the total at 1:45".
- If two-line titles (Video 3) wrap awkwardly, reply "allow the Video 3 card to be taller".
- Trim the first second before Start and the frames after END.

---
