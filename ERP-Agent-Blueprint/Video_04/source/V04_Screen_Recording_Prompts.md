# Video 4: Databases Without Fear: Your Data's Home: Screen-Recording Prompts

**How to use:** 1. Open claude.ai, start a new chat, and paste ONE prompt. 2. Claude builds an animated demo you can preview. If anything looks wrong, reply in the same chat ("make the cursor slower", "the table is cut off"). 3. Open the demo full-screen in Chrome (press F11 / Ctrl+Cmd+F), start your screen recorder (QuickTime: File → New Screen Recording), then click **Start**. 4. Stop recording when the "END" card appears, trim the start and end, and add your voice-over from the script. Each demo runs for the same length as its script section, so the voice-over lines up.

<!-- VO NOTE START -->
**Voice-over (Fish Audio):** Under every prompt you'll find a grey **"Voice-over text for Fish Audio"** box. Copy that text into Fish Audio and download the audio. Best order: make the audio FIRST, check its length, and if it's longer or shorter than the section length, add one line to the prompt before sending it to Claude: *"Make the total duration exactly M:SS"* (your audio length). Claude's demo has no sound, so you join the audio and video in a video editor (CapCut, iMovie, Descript): put both on the timeline starting at 0:00.
<!-- VO NOTE END -->

**Sections in this video:**

| # | Section | Time | Length | Prompt |
|---|---|---|---|---|
| 1 | What a Database Really Is | 02:00–05:00 | 3 min 0 s | Prompt 1 |
| 2 | Building the Suppliers Table | 06:30–10:30 | 4 min 0 s | Prompt 2 |
| 3 | Building the Stock Log | 10:30–14:00 | 3 min 30 s | Prompt 3 |
| 4 | The Messy Data Makeover | 15:30–19:30 | 4 min 0 s | Prompt 4 |

---

## Prompt 1 of 4: What a Database Really Is (02:00–05:00, 3 min 0 s)

**What this demo shows:** The BrightLeaf products in an Odoo-style list view explained as a database (table, row/record, column/field), the internal record ID in the address bar, and creating a new Google Sheet with sheets.new.

### Copy this prompt into Claude:

```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. It will be screen-recorded and used in a beginner course for supply-chain managers ("The ERP Agent Blueprint"). This section shows that a database is just a super-organised Excel workbook (table = sheet, row = record, column = field), points out the unique record ID an ERP keeps for every product, and then creates a new Google Sheet that will become the AI agent's database.

SECTION LENGTH: 3 min 0 s (180 seconds). The master timeline runs from 00:00 to 03:00 exactly.

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

APP LOOK
- Odoo-style ERP inside a Chrome-style browser: purple-ish top bar (#714B67) with "Inventory" on the left and menu items "Overview, Operations, Products, Reporting, Configuration"; breadcrumb "Products"; a "New" button top-left; search bar in the middle; top-right two view-switch icons: a kanban (four squares) icon (active) and a list (lines) icon.
  - Kanban view: 10 product cards (grey placeholder square image, name, "[BL-100x]", price).
  - List view: checkbox column, then columns "Internal Reference", "Name", "Sales Price", "Cost", "On Hand Quantity".
  - Product form: status-style header with the product name large, fields "Internal Reference", "Sales Price", "Cost", and a smart button "18.00 Units On Hand".
- Google Sheets-style spreadsheet: green accent, document title "Untitled spreadsheet" at top-left, menu (File, Edit, View, Insert, Format, Data, Tools), toolbar, formula bar, column letters A-J, row numbers 1-30, a sheet tab "Sheet1" at the bottom with a "+" button.
- A translucent "workbook" illustration (stacked sheets with tabs) used as an overlay.

DATA TO SHOW (exact; BrightLeaf Supplies, Columbus, Ohio; USD)
List view rows (Internal Reference | Name | Sales Price | Cost | On Hand Quantity):
- BL-1001 | Steel Hex Bolts M10 (box of 100) | $16.88 | $12.50 | 145
- BL-1002 | Corrugated Shipping Box 18x12x10 | $1.15 | $0.85 | 1,180
- BL-1003 | Stretch Wrap Film 500mm | $12.42 | $9.20 | 260
- BL-1004 | Industrial Safety Gloves (pair) | $3.24 | $2.40 | 420
- BL-1005 | Pallet Jack Wheels (set) | $51.30 | $38.00 | 18
- BL-1006 | Packing Tape 48mm (roll) | $1.49 | $1.10 | 1,850
- BL-1007 | Hydraulic Oil 20L | $72.90 | $54.00 | 31
- BL-1008 | LED Warehouse Light 150W | $97.20 | $72.00 | 34
- BL-1009 | Nylon Cable Ties (pack of 500) | $8.51 | $6.30 | 410
- BL-1010 | Forklift Battery Water Kit | $26.66 | $19.75 | 26
Browser URLs (illustrative paths): list https://brightleaf-demo.odoo.com/odoo/inventory/products ; BL-1005 form https://brightleaf-demo.odoo.com/odoo/inventory/products/5 (the final "5" is the record ID to circle).
Workbook overlay tabs: "Products", "Suppliers", "Purchase Orders".
Google Sheets URL after typing: sheets.new -> https://docs.google.com/spreadsheets/d/1Bl...xyz/edit (abbreviated)
Rename to: "BrightLeaf Stocky Database"
Reason cards: "1 Free, and you already know it" / "2 Lives online: n8n can reach it from anywhere (a laptop Excel file can't)" / "3 You can see exactly what Stocky wrote. No black box."
Alternative note: "Airtable does the same job with a few more features. For learning: Google Sheets."
PRO TIP: "sheets.new creates a new Google Sheet in one step"
ON-SCREEN TEXT: "Database = a super-organised workbook · Table = a sheet · Row = a record · Column = a field"

TIMELINE (scene by scene; times relative to the start of this demo)
1. 00:00-00:08 | Browser on the Odoo Inventory > Products kanban view with the 10 product cards. | Small breadcrumb callout: "Inventory > Products > Products".
2. 00:08-00:16 | Cursor glides to the list (lines) icon top-right; zoom 1.5 on the two icons; click; zoom out as the cards fold into the list view. | Callout on the icon: "List view".
3. 00:16-00:30 | A blue horizontal band sweeps across the BL-1005 row ("one row = one product"), then each column header lights up in turn: Internal Reference, Name, Sales Price, Cost, On Hand Quantity. | Callouts: "Row = one product", then "Column = one piece of information".
4. 00:30-00:44 | The list gently tilts back and a translucent stacked-workbook illustration appears behind it. | Callout: "Underneath: a database = a super-organised Excel workbook".
5. 00:44-00:49 | Hold. | ON-SCREEN TEXT lower-third 00:44-00:49: "Database = a super-organised workbook · Table = a sheet · Row = a record · Column = a field"
6. 00:49-01:00 | The workbook overlay fans out its tabs "Products", "Suppliers", "Purchase Orders"; the "Products" tab glows. | Callout: "Table = one sheet".
7. 01:00-01:08 | On the list, the BL-1003 row glows. | Callout: "Row = one record (one product)".
8. 01:08-01:16 | The "Cost" column glows top to bottom. | Callout: "Column = one field (every record has it)".
9. 01:16-01:22 | A dashed outline wraps the whole workbook overlay. Overlay fades. | Callout: "Database = the whole workbook".
10. 01:22-01:28 | Cursor clicks the row "BL-1005 Pallet Jack Wheels (set)"; the product form opens (Sales Price $51.30, Cost $38.00, 18.00 Units On Hand). | No callout.
11. 01:28-01:42 | Zoom 1.6 onto the end of the address bar; the final "/5" gets a yellow circle that draws itself. | Callout: "Odoo's internal ID for this product. It never changes."
12. 01:42-01:56 | Zoom out. Demo (labelled with a small grey "example" tag): the name field briefly retypes to "PJ Wheels Set" and Cost flips to $39.00 while the "/5" in the URL stays highlighted with a small padlock; then both values revert to the originals. | Callout: "Rename it, reprice it: the ID stays the same".
13. 01:56-02:03 | Click the second browser tab (empty "New Tab"). Click the address bar, type "sheets.new" (~14 chars/s), Enter keycap. | No callout.
14. 02:03-02:10 | A blank Google Sheets-style spreadsheet "Untitled spreadsheet" loads (grid fades in). | No callout.
15. 02:10-02:35 | Three reason cards slide in on the right, one every ~8 s: "1 Free, and you already know it", "2 Lives online: n8n can reach it from anywhere (a laptop Excel file can't)" (cloud icon vs laptop with padlock), "3 You can see exactly what Stocky wrote. No black box." | Cards.
16. 02:35-02:43 | A small grey note card under them: "Airtable does the same job with a few more features. For learning: Google Sheets." Cards fade. | Note.
17. 02:43-02:59 | Cursor clicks the title "Untitled spreadsheet"; the text selects; types "BrightLeaf Stocky Database"; Enter; the browser tab title updates too. A PRO TIP chip appears top-right: "sheets.new creates a new Google Sheet in one step". Hold. | Callout on the title: "Name it".
18. 02:59-03:00 | END card. | "END"

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
[00:00-00:44] Let's start somewhere familiar, your BrightLeaf Odoo from Video 2. I'm in Inventory, Products, and I'm switching from the picture cards to the list view, the icon with the little lines on the top right. Look at this. Rows and columns. Each row is one product. Each column is one piece of information about that product: the reference, the name, the sales price, the cost, the quantity on hand. Guess what? Underneath, Odoo stores this in a database. And a database, at the level we need, is simply a super-organised Excel workbook.
[00:44-01:22] Four words, and you know all of them already. A table is like one sheet in a workbook. Odoo has a table for products, a table for suppliers, a table for purchase orders. A row is one record, one thing. One product. One supplier. One stock count. A column is one field, one type of information that every record has. Product name. Cost. Lead time. And the database is the whole workbook holding all of those tables together.
[01:22-01:56] Now here's something most people never notice. I'll open the pallet jack wheels. Look at the very end of the web address. There's a number. That number is Odoo's own internal ID for this product. It never changes. You can rename the product, change the price, change the supplier, and that number stays the same. Hold on to that idea, because unique IDs are going to save us in a few minutes.
[01:56-02:59] So why are we using Google Sheets as Stocky's database instead of something fancy? Three reasons. One, it's free and you already know how to use it. Two, it lives online, so our automation tool, n8n, can reach it from anywhere, whereas an Excel file sitting on your laptop is locked inside your laptop. And three, you can open it and see exactly what Stocky wrote. Nothing is hidden in a black box. There's an app called Airtable that does the same job with a few more features, and it's a fine alternative. But for learning, Google Sheets is perfect. My shortcut: I just typed "sheets dot new" in the address bar, and a blank sheet opened instantly. I'll click the title "Untitled spreadsheet" and rename it "BrightLeaf Stocky Database".

CHECKLIST
- Total duration exactly 3:00 (180 s), END card in the last second.
- All 10 product rows, prices, costs and on-hand quantities match the DATA block.
- The record ID "/5" at the end of the URL is circled while zoomed.
- The sheet is renamed exactly "BrightLeaf Stocky Database".
- Start button, END card, watermark present; nothing overflows the stage.
```

**After Claude builds it:** Check that the list view shows all 10 rows without scrolling; if not, ask Claude to reduce the row height. Record full-screen and trim the first second.

<!-- VOICEOVER START -->
### Voice-over text for Fish Audio (paste this)
*372 words, about 2 min 29 s at a natural pace (150 words/min). Paste it as is; each paragraph is a natural pause.*

```text
Let's start somewhere familiar, your BrightLeaf Odoo from Video 2. I'm in Inventory, Products, and I'm switching from the picture cards to the list view, the icon with the little lines on the top right.

Look at this. Rows and columns. Each row is one product. Each column is one piece of information about that product: the reference, the name, the sales price, the cost, the quantity on hand.

Guess what? Underneath, Odoo stores this in a database. And a database, at the level we need, is simply a super-organised Excel workbook.

Four words, and you know all of them already.

A table is like one sheet in a workbook. Odoo has a table for products, a table for suppliers, a table for purchase orders.

A row is one record, one thing. One product. One supplier. One stock count.

A column is one field, one type of information that every record has. Product name. Cost. Lead time.

And the database is the whole workbook holding all of those tables together.

Now here's something most people never notice. I'll open the pallet jack wheels. Look at the very end of the web address. There's a number. That number is Odoo's own internal ID for this product. It never changes. You can rename the product, change the price, change the supplier, and that number stays the same. Hold on to that idea, because unique IDs are going to save us in a few minutes.

So why are we using Google Sheets as Stocky's database instead of something fancy? Three reasons.

One, it's free and you already know how to use it. Two, it lives online, so our automation tool, n8n, can reach it from anywhere, whereas an Excel file sitting on your laptop is locked inside your laptop. And three, you can open it and see exactly what Stocky wrote. Nothing is hidden in a black box.

There's an app called Airtable that does the same job with a few more features, and it's a fine alternative. But for learning, Google Sheets is perfect.

My shortcut: I just typed "sheets dot new" in the address bar, and a blank sheet opened instantly. I'll click the title "Untitled spreadsheet" and rename it "BrightLeaf Stocky Database".
```
<!-- VOICEOVER END -->

---

## Prompt 2 of 4: Building the Suppliers Table (06:30–10:30, 4 min 0 s)

**What this demo shows:** Building the Suppliers table in Google Sheets: renaming the tab, typing headers, bold + freeze, entering the six BrightLeaf suppliers, adding dropdown validation for country and currency, and converting Active to checkboxes.

### Copy this prompt into Claude:

```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. It will be screen-recorded and used in a beginner course for supply-chain managers ("The ERP Agent Blueprint"). This section builds the AI agent's first database table, "Suppliers", in a Google Sheets-style spreadsheet, and teaches: one table per thing, exactly one header row, underscores instead of spaces in headers, unique IDs (SUP-001...), dropdowns that keep data clean, and checkboxes instead of deleting rows.

SECTION LENGTH: 4 min 0 s (240 seconds). The master timeline runs from 00:00 to 04:00 exactly.

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

APP LOOK
- Google Sheets-style spreadsheet in a Chrome-style browser (URL https://docs.google.com/spreadsheets/d/1Bl...xyz/edit, tab title "BrightLeaf Stocky Database - Google Sheets"): green accent, document title "BrightLeaf Stocky Database" top-left, menus File, Edit, View, Insert, Format, Data, Tools, toolbar (with a bold "B" button), formula bar showing the active cell reference (e.g. "A1"), column letters A-I, row numbers 1-30, sheet tab at the bottom left with a "+" button.
- The active cell has a blue 2px border; typing appears in the cell and the formula bar at the same time.
- Menus drop down as white panels with soft shadow; submenus open to the right.
- Data validation opens as a right-side sidebar titled "Data validation rules" with a button "+ Add rule", fields "Apply to range", "Criteria" (dropdown), option inputs "Option 1", "Option 2"..., and a blue "Done" button.
- Columns are wide enough to show every value without truncation (column B ~300px, column H ~360px).

DATA TO SHOW (exact)
- Tab rename: "Sheet1" -> "Suppliers"
- Headers A1:I1: Supplier_ID | Supplier_Name | City | Country_Code | Currency | Latitude | Longitude | Contact_Email | Active
- Rows 2-7:
  SUP-001 | Apex Fasteners | Columbus | US | USD | 39.96 | -83.00 | orders@apexfasteners.example | TRUE
  SUP-002 | PackRight Industries | Chicago | US | USD | 41.88 | -87.63 | sales@packright.example | TRUE
  SUP-003 | SafeHands Co. | Monterrey | MX | MXN | 25.69 | -100.32 | supply@safehands.example | TRUE
  SUP-004 | Global Lift Parts | Shenzhen | CN | CNY | 22.54 | 114.06 | export@globallift.example | TRUE
  SUP-005 | Gulf Lubricants | Dubai | AE | AED | 25.20 | 55.27 | trade@gulflube.example | TRUE
  SUP-006 | Shenzhen BrightTech | Shenzhen | CN | CNY | 22.54 | 114.06 | b2b@brighttech.example | TRUE
- Ghost "bad" banner (shown then crossed out): "BrightLeaf supplier list, updated by Sarah"
- Header comparison: "Supplier ID" (amber: "small annoyances in automation tools later") vs "Supplier_ID" (green: "never a problem")
- ID breakdown: "SUP" = what kind of thing | "-" | "004" = number with leading zeros; next table will use "LOG".
- Link-back ghosts from Video 3: weather URL fragment "latitude=22.54&longitude=114.06"; currency URL fragment "from=USD&to=CNY,MXN".
- Country dropdown options: US, MX, CN, AE. Currency dropdown options: USD, MXN, CNY, AED.
- Crossed-out ghost entries: "Mexico", "MEX", "mx".
- BEGINNER MISTAKE banner: "Deleting old suppliers or products breaks the history that still points to their IDs. Mark them inactive instead."

TIMELINE (scene by scene; times relative to the start of this demo)
1. 00:00-00:06 | Spreadsheet "BrightLeaf Stocky Database", empty grid. Cursor glides to the bottom tab "Sheet1" and double-clicks; the tab name becomes editable (selected text). | No callout.
2. 00:06-00:16 | Types "Suppliers", Enter; the tab shows "Suppliers". | Callout: "One table for one kind of thing".
3. 00:16-00:30 | Cursor clicks A1. The 9 headers type in one after another, the active cell jumping right with each Tab: Supplier_ID, Supplier_Name, City, Country_Code, Currency, Latitude, Longitude, Contact_Email, Active. | No callout.
4. 00:30-00:46 | Row 1 gets a light-blue band. A ghost merged banner "BrightLeaf supplier list, updated by Sarah" drops in above row 1, then gets a red strike and slides away. | Callout: "Exactly one header row. Data starts in row 2."
5. 00:46-01:11 | Zoom 1.6 onto "Supplier_ID", the underscore pulses. A comparison card: "Supplier ID" (amber, "small annoyances in automation tools later") vs "Supplier_ID" (green, "never a problem"). Zoom out at 01:09. | Callout: "Underscores, not spaces: a two-second habit".
6. 01:11-01:22 | Cursor clicks row header "1" (row selects), clicks the Bold "B" button (headers turn bold), then View menu > Freeze > "1 row" (menus open visibly). The grid scrolls down to row 40 and back up; row 1 stays pinned with a thicker bottom border. | Callout: "Headers stay on screen".
7. 01:22-01:40 | Rows 2 and 3 type in cell by cell at normal typing speed (SUP-001 ... TRUE, SUP-002 ... TRUE). | Callout on A2: "Supplier ID first".
8. 01:40-02:00 | A small "Fast-forward x4" badge appears; rows 4-7 fill in quickly. Badge disappears; the full table holds for 2 s. | No callout.
9. 02:00-02:12 | Column A (A2:A7) highlights. A breakdown label pops over SUP-004: "SUP" (what kind of thing) | "-" | "004" (number with leading zeros). A small grey tag: "Next table: LOG-0001". | Callout: "See the ID pattern?"
10. 02:12-02:37 | F5 and G5 (22.54, 114.06) glow; a dotted line leads to a small ghost URL card "api.open-meteo.com ... latitude=22.54&longitude=114.06" labelled "Video 3 weather call". Then the Currency column glows with a line to a ghost card "api.frankfurter.dev ... from=USD&to=CNY,MXN". | Callout: "Your database becomes the agent's to-do list".
11. 02:37-02:44 | Rows 5 and 7 (Global Lift Parts, Shenzhen BrightTech) highlight in amber. A PAUSE & THINK card: "Same city and coordinates, different Supplier_IDs. Why?" | Card.
12. 02:44-02:50 | Answer card replaces it: "Different companies: different contracts, products and people to call. The ID identifies the supplier, not the city." | Card.
13. 02:50-03:02 | Cursor drags to select D2:D100 (blue selection); Data menu > "Data validation"; the right sidebar opens; cursor clicks "+ Add rule". | Callout: "Prevent mess before it happens".
14. 03:02-03:14 | In "Criteria", the dropdown opens and "Dropdown" is chosen; option fields fill: US, MX, CN, AE (typed). Cursor clicks "Done". | No callout.
15. 03:14-03:22 | Cursor clicks D2: a small dropdown chip with an arrow appears; the list opens showing US, MX, CN, AE. Beside it, ghost entries "Mexico", "MEX", "mx" appear and get crossed out. | Callout: "A tiny guard dog for your data".
16. 03:22-03:32 | Fast repeat (badge "Same for Currency"): select E2:E100, add a Dropdown rule with USD, MXN, CNY, AED; dropdown chips appear in E2:E7. | No callout.
17. 03:32-03:40 | Cursor selects I2:I100; Insert menu > "Checkbox"; the six TRUE values morph into ticked green checkboxes. | Callout: "TRUE = ticked".
18. 03:40-03:59 | Cursor unticks I6 (Gulf Lubricants) as an example, row text turns grey; a callout explains; then the box is re-ticked and the row returns to normal. The BEGINNER MISTAKE banner slides up from the bottom. | Callout: "Don't delete. Mark inactive; old POs still point to the ID. Stocky skips inactive rows."
19. 03:59-04:00 | END card. | "END"

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
[00:00-00:16] Let's build Stocky's first table. One table for one kind of thing. This table is about suppliers, and only suppliers. I double-click the tab at the bottom and rename it "Suppliers".
[00:16-01:11] Now the headers, the column names, in row 1. Supplier ID, supplier name, city, country code, currency, latitude, longitude, contact email, and active. Notice two things about how I'm writing them. First, there's exactly one header row. No title above it, no "BrightLeaf supplier list, updated by Sarah" in a merged banner. Row 1 is headers, and data starts in row 2. Agents and automation tools expect that. Second, I'm using underscores instead of spaces, like "Supplier underscore ID". Spaces in headers work in Sheets, but they cause small annoyances in automation tools later. Underscores never do. It's a two-second habit that saves real headaches.
[01:11-01:22] I'll make the headers bold, then View, Freeze, one row. Now when the list gets long, the headers stay on screen.
[01:22-02:37] Now the data. Supplier ID first, SUP dash 001. Apex Fasteners, Columbus. SUP-002, PackRight Industries, Chicago. All the way to SUP-006, Shenzhen BrightTech. See the ID pattern? Three letters that tell you what kind of thing it is, a dash, and a number with leading zeros. SUP for suppliers, and in a minute LOG for stock log entries. When you see "SUP-004" in an email, you instantly know it's a supplier, not a product. Now look at the latitude and longitude columns. Recognise those numbers? 22.54 and 114.06. That's Shenzhen, the exact numbers we sent to the weather API in the last video. This is where it all connects. Later, Stocky will read this table, take each supplier's latitude and longitude, and build its own weather request. Same with the currency column: it feeds the currency API. Your database becomes the agent's to-do list.
[02:37-02:50] Because they're different companies. Same city, same weather, but different contracts, different products, different people to call. The ID identifies the supplier, not the city.
[02:50-03:32] Here's a trick that prevents mess before it happens. I select the country code column, then Data, Data validation, Add rule. For criteria, I choose "Dropdown", and I type the allowed values: US, MX, CN, AE. Done. Now nobody can type "Mexico" in one row, "MEX" in another and "mx" in a third. They pick from the list. A dropdown is a tiny guard dog for your data. I'll do the same for the currency column: USD, MXN, CNY, AED.
[03:32-03:59] Last one. The "Active" column. I select it and click Insert, Checkbox. TRUE becomes a ticked box. If BrightLeaf stops buying from a supplier, Sarah unticks it. We don't delete the row, because old purchase orders still point to that ID. We just mark it inactive, and Stocky will skip it.

CHECKLIST
- Total duration exactly 4:00 (240 s), END card in the last second.
- Headers and all six supplier rows match the DATA block exactly (including negative longitudes and .example emails).
- Country dropdown = US, MX, CN, AE; currency dropdown = USD, MXN, CNY, AED; Active becomes checkboxes.
- Row 1 is bold and frozen; no merged banner remains.
- Start button, END card, watermark present; the 9 columns fit the stage width.
```

**After Claude builds it:** This is a dense table; make sure all 9 columns fit at full screen (ask Claude to narrow columns or reduce cell font to 22px if needed). Record full-screen and trim the first second.

<!-- VOICEOVER START -->
### Voice-over text for Fish Audio (paste this)
*457 words, about 3 min 03 s at a natural pace (150 words/min). Paste it as is; each paragraph is a natural pause.*

```text
Let's build Stocky's first table. One table for one kind of thing. This table is about suppliers, and only suppliers. I double-click the tab at the bottom and rename it "Suppliers".

Now the headers, the column names, in row 1. Supplier ID, supplier name, city, country code, currency, latitude, longitude, contact email, and active.

Notice two things about how I'm writing them. First, there's exactly one header row. No title above it, no "BrightLeaf supplier list, updated by Sarah" in a merged banner. Row 1 is headers, and data starts in row 2. Agents and automation tools expect that.

Second, I'm using underscores instead of spaces, like "Supplier underscore ID". Spaces in headers work in Sheets, but they cause small annoyances in automation tools later. Underscores never do. It's a two-second habit that saves real headaches.

I'll make the headers bold, then View, Freeze, one row. Now when the list gets long, the headers stay on screen.

Now the data. Supplier ID first, SUP dash 001. Apex Fasteners, Columbus. SUP-002, PackRight Industries, Chicago. All the way to SUP-006, Shenzhen BrightTech.

See the ID pattern? Three letters that tell you what kind of thing it is, a dash, and a number with leading zeros. SUP for suppliers, and in a minute LOG for stock log entries. When you see "SUP-004" in an email, you instantly know it's a supplier, not a product.

Now look at the latitude and longitude columns. Recognise those numbers? 22.54 and 114.06. That's Shenzhen, the exact numbers we sent to the weather API in the last video. This is where it all connects. Later, Stocky will read this table, take each supplier's latitude and longitude, and build its own weather request. Same with the currency column: it feeds the currency API. Your database becomes the agent's to-do list.

Because they're different companies. Same city, same weather, but different contracts, different products, different people to call. The ID identifies the supplier, not the city.

Here's a trick that prevents mess before it happens. I select the country code column, then Data, Data validation, Add rule. For criteria, I choose "Dropdown", and I type the allowed values: US, MX, CN, AE. Done.

Now nobody can type "Mexico" in one row, "MEX" in another and "mx" in a third. They pick from the list. A dropdown is a tiny guard dog for your data. I'll do the same for the currency column: USD, MXN, CNY, AED.

Last one. The "Active" column. I select it and click Insert, Checkbox. TRUE becomes a ticked box. If BrightLeaf stops buying from a supplier, Sarah unticks it. We don't delete the row, because old purchase orders still point to that ID. We just mark it inactive, and Stocky will skip it.
```
<!-- VOICEOVER END -->

---

## Prompt 3 of 4: Building the Stock Log (10:30–14:00, 3 min 30 s)

**What this demo shows:** Creating the Stock_Log tab, typing three log rows with one fact per cell, formatting dates as year-month-day, a REORDER/OK IF formula, and an XLOOKUP that pulls supplier names from the Suppliers table.

### Copy this prompt into Claude:

```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. It will be screen-recorded and used in a beginner course for supply-chain managers ("The ERP Agent Blueprint"). This section builds the AI agent's second table, "Stock_Log", in a Google Sheets-style spreadsheet, and teaches: a log never overwrites old rows, one fact per cell, consistent data types (real dates as YYYY-MM-DD), a simple IF formula for reorder status, and an XLOOKUP that connects two tables through an ID (a relationship).

SECTION LENGTH: 3 min 30 s (210 seconds). The master timeline runs from 00:00 to 03:30 exactly.

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

APP LOOK
- Google Sheets-style spreadsheet in a Chrome-style browser (URL https://docs.google.com/spreadsheets/d/1Bl...xyz/edit), document title "BrightLeaf Stocky Database": green accent, menus File, Edit, View, Insert, Format, Data, Tools, toolbar with Bold, formula bar with the cell reference box, column letters A-K, row numbers.
- Bottom sheet tabs: "Suppliers" (existing) and a "+" button; the new tab becomes "Stock_Log".
- The Suppliers tab, when glimpsed, shows: A = Supplier_ID (SUP-001...SUP-006), B = Supplier_Name.
- Format dialog: "Custom date and time formats" modal with a list of example patterns; one row shows "2026-11-16"; blue "Apply" button.
- Formula typing shows coloured range references (D2 blue, F2 orange) like real spreadsheets; the formula bar shows the formula; a fill handle (small blue square) at the bottom-right of the active cell.

DATA TO SHOW (exact)
- Headers A1:J1: Log_ID | Log_Date | SKU | Qty_On_Hand | Unit | Reorder_Point | Status | Supplier_ID | Logged_By | Note
- Rows 2-4:
  LOG-0001 | 2026-11-16 | BL-1005 | 18 | set | 25 | (blank) | SUP-004 | Sarah | 3 pallet jacks waiting for wheels
  LOG-0002 | 2026-11-16 | BL-1002 | 1180 | each | 1500 | (blank) | SUP-002 | Sarah | (blank)
  LOG-0003 | 2026-11-16 | BL-1001 | 145 | box | 80 | (blank) | SUP-001 | Sarah | (blank)
- Logbook card: "Never rub out yesterday's entry. Every check gets a new row." Question bubble: "How fast were we burning through safety gloves in October?"
- Comparison chips: "18" (green: "a number: add it, compare it, is it below 25?") vs "18 sets - urgent!" (red: "just text: formulas can't do maths with it").
- Type badges: "Qty = number", "Name = text", "Active = true/false", "Date = a real date".
- Date card: "03/04 = 3 April in Mexico (SafeHands)" vs "03/04 = March 4 in the US" vs "2026-11-16: can't be misread, sorts correctly".
- G2 formula: =IF(D2<=F2,"REORDER","OK")   plain-English tooltip: "If on hand is at or below the reorder point, say REORDER, otherwise OK"
- Results G2:G4: REORDER, REORDER, OK with row notes "18 vs 25", "1,180 vs 1,500", "145 vs 80".
- K1: Supplier_Name ; K2 formula: =XLOOKUP(H2,Suppliers!A:A,Suppliers!B:B)
- Results K2:K4: Global Lift Parts, PackRight Industries, Apex Fasteners
- Relationship label: "Stock_Log.Supplier_ID -> Suppliers.Supplier_ID = a relationship"

TIMELINE (scene by scene; times relative to the start of this demo)
1. 00:00-00:06 | The Suppliers tab is visible. Cursor clicks "+" bottom-left; a new tab "Sheet2" appears and opens; double-click; type "Stock_Log"; Enter. | No callout.
2. 00:06-00:22 | Headers A1:J1 type in quickly (active cell jumping right). Then row 1 select, Bold, View > Freeze > 1 row (menus flash open briefly). | Callout: "Bold and freeze".
3. 00:22-00:42 | A ship's-logbook illustration card slides in on the right (open book, handwritten-style lines in Inter italic): "Never rub out yesterday's entry. Every check gets a new row." A speech bubble from a small "Sarah" avatar: "How fast were we burning through safety gloves in October?" | Callout: "A log = a diary".
4. 00:42-01:00 | Card slides away. Row 2 types in cell by cell: LOG-0001, 2026-11-16, BL-1005, 18, set, 25, (skip G), SUP-004, Sarah, "3 pallet jacks waiting for wheels". | Callout on J2: "Comments get their own column".
5. 01:00-01:08 | Rows 3 and 4 type in fast (badge "Fast-forward x3"). | No callout.
6. 01:08-01:22 | Zoom 1.6 on D2 "18". Two chips appear above: green "18" with tick ("a number: add it, compare it, is it below 25?") and red "18 sets - urgent!" with cross ("just text"). | Callout: "Just the number".
7. 01:22-01:33 | Zoom out. Lines connect D2 (18), E2 (set) and J2 (note), each in its own cell. Big navy banner across the top for 4 s: "ONE FACT PER CELL". | Banner.
8. 01:33-01:40 | Small type badges pop above columns: "Qty = number", "Name = text", "Active = true/false", "Date = a real date". | No callout.
9. 01:40-01:52 | Cursor clicks column header B (column selects); Format menu > Number > "Custom date and time"; the modal opens; cursor clicks the pattern row showing "2026-11-16"; clicks "Apply". Dates right-align as real dates. | Callout: "Year-month-day".
10. 01:52-02:07 | Date card in the centre with three lines: "03/04 = 3 April in Mexico (SafeHands)" (amber), "03/04 = March 4 in the US" (amber), "2026-11-16: can't be misread, sorts correctly" (green tick). | Card.
11. 02:07-02:18 | Cursor clicks G2 and types =IF(D2<=F2,"REORDER","OK") with coloured references (D2 blue, F2 orange highlighted in the grid). A plain-English tooltip appears beneath: "If on hand is at or below the reorder point, say REORDER, otherwise OK". | Tooltip.
12. 02:18-02:24 | Enter: G2 shows "REORDER". | Callout: "18 vs 25".
13. 02:24-02:40 | Cursor grabs the fill handle on G2 and drags to G4; G3 "REORDER", G4 "OK" appear. Row notes pop: "1,180 vs 1,500" and "145 vs 80". | Callouts as listed.
14. 02:40-02:50 | Ghost demo (grey "example" tag): D2 changes to "18 sets"; G2 flips to "OK" with a red flashing border and a red callout "Wrong answer: the formula can't read text". Then D2 reverts to 18 and G2 returns to REORDER. | Callout: "Clean data makes the smart stuff possible".
15. 02:50-03:02 | Cursor clicks K1, types "Supplier_Name"; clicks K2, types =XLOOKUP(H2,Suppliers!A:A,Suppliers!B:B); Enter: "Global Lift Parts". | No callout.
16. 03:02-03:12 | Fill handle drag K2 to K4: "PackRight Industries", "Apex Fasteners". Thin arrows animate from H2:H4 (SUP-004, SUP-002, SUP-001) to a small inset preview of the Suppliers tab rows. | Callout: "Looked up by ID".
17. 03:12-03:29 | A relationship diagram overlays: two small table cards "Stock_Log" and "Suppliers" joined by a line labelled "Supplier_ID". Example (grey "example" tag): in the inset, "PackRight Industries" is renamed to "PackRight Industries Inc." and K3 updates instantly; then it reverts. | Callout: "The name lives in one place. This ID link is a relationship."
18. 03:29-03:30 | END card. | "END"

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
[00:00-00:42] Second table: the Stock Log. This is where Stocky will write down every stock check it does. I click the plus sign at the bottom, rename the tab "Stock underscore Log", and add the headers: log ID, log date, SKU, quantity on hand, unit, reorder point, status, supplier ID, logged by, and note. Bold and freeze. A log is like a ship's logbook or a diary. You never rub out yesterday's entry. Every check gets a brand-new row. That way, three months from now, Sarah can ask, "How fast were we burning through safety gloves in October?" and the answer is sitting right there.
[00:42-01:33] Let me add three entries. LOG-0001, today's date, BL-1005, the pallet jack wheels. Quantity: 18. Unit: set. Reorder point: 25. Supplier: SUP-004. Logged by Sarah. And in the note column: "3 pallet jacks waiting for wheels." Now pay close attention to the quantity cell. I typed "18". Just the number. Not "18 sets". Not "18 - urgent!". The unit has its own column. The comment has its own column. This is the most important rule in this whole video: one fact per cell. Why? Because "18" is a number. You can add it, compare it, and ask "is it below 25?". But "18 sets - urgent!" is just text. A formula can't do maths with it, and an agent has to guess what you meant.
[01:33-02:07] That brings us to data types. Every column holds one type of thing. Quantity holds numbers. Names hold text. Active holds true or false. And dates hold real dates, not text that looks like a date. I select the date column, then Format, Number, Custom date and time, and pick year-month-day. Why? Because "03/04" means the 3rd of April in Mexico, where SafeHands is, and March the 4th here in the US. 2026-11-16 can't be misread by anyone, human or machine, and it sorts correctly.
[02:07-02:50] Now let's make the table do some work. In the status column I type: equals IF, open bracket, D2 less than or equal to F2, comma, "REORDER" in quotes, comma, "OK" in quotes, close bracket. In English: if quantity on hand is at or below the reorder point, say REORDER, otherwise say OK. I drag it down. Pallet jack wheels, 18 against 25: REORDER. Corrugated boxes, 1,180 against 1,500: REORDER. Hex bolts, 145 against 80: OK. That formula only works because quantity and reorder point are clean numbers. If D2 said "18 sets", this would break. Clean data is what makes the smart stuff possible.
[02:50-03:29] One last bit of magic, for my fellow Excel lovers. The stock log only stores the supplier ID, not the name. But I can look up the name from the Suppliers table. In K2: equals XLOOKUP, H2, then the Suppliers ID column, then the Suppliers name column. Drag down. There they are. This is what makes it a real database. The name lives in one place only. If PackRight renames itself tomorrow, Sarah changes it once, and every stock log row updates instantly. In database language, this ID connection is called a relationship. You've just built one.

CHECKLIST
- Total duration exactly 3:30 (210 s), END card in the last second.
- Headers and the three log rows match the DATA block exactly; quantities are plain numbers.
- Formulas are exactly =IF(D2<=F2,"REORDER","OK") and =XLOOKUP(H2,Suppliers!A:A,Suppliers!B:B).
- Results: REORDER, REORDER, OK and Global Lift Parts, PackRight Industries, Apex Fasteners.
- Start button, END card, watermark present; columns A-K fit on the stage.
```

**After Claude builds it:** Check that the formula text is readable in the formula bar while it types; ask for a short zoom on the formula bar if needed. Record full-screen and trim the first second.

<!-- VOICEOVER START -->
### Voice-over text for Fish Audio (paste this)
*516 words, about 3 min 26 s at a natural pace (150 words/min). Paste it as is; each paragraph is a natural pause.*

```text
Second table: the Stock Log. This is where Stocky will write down every stock check it does. I click the plus sign at the bottom, rename the tab "Stock underscore Log", and add the headers: log ID, log date, SKU, quantity on hand, unit, reorder point, status, supplier ID, logged by, and note. Bold and freeze.

A log is like a ship's logbook or a diary. You never rub out yesterday's entry. Every check gets a brand-new row. That way, three months from now, Sarah can ask, "How fast were we burning through safety gloves in October?" and the answer is sitting right there.

Let me add three entries. LOG-0001, today's date, BL-1005, the pallet jack wheels. Quantity: 18. Unit: set. Reorder point: 25. Supplier: SUP-004. Logged by Sarah. And in the note column: "3 pallet jacks waiting for wheels."

Now pay close attention to the quantity cell. I typed "18". Just the number. Not "18 sets". Not "18 - urgent!". The unit has its own column. The comment has its own column. This is the most important rule in this whole video: one fact per cell.

Why? Because "18" is a number. You can add it, compare it, and ask "is it below 25?". But "18 sets - urgent!" is just text. A formula can't do maths with it, and an agent has to guess what you meant.

That brings us to data types. Every column holds one type of thing. Quantity holds numbers. Names hold text. Active holds true or false. And dates hold real dates, not text that looks like a date.

I select the date column, then Format, Number, Custom date and time, and pick year-month-day. Why? Because "03/04" means the 3rd of April in Mexico, where SafeHands is, and March the 4th here in the US. 2026-11-16 can't be misread by anyone, human or machine, and it sorts correctly.

Now let's make the table do some work. In the status column I type: equals IF, open bracket, D2 less than or equal to F2, comma, "REORDER" in quotes, comma, "OK" in quotes, close bracket. In English: if quantity on hand is at or below the reorder point, say REORDER, otherwise say OK.

I drag it down. Pallet jack wheels, 18 against 25: REORDER. Corrugated boxes, 1,180 against 1,500: REORDER. Hex bolts, 145 against 80: OK.

That formula only works because quantity and reorder point are clean numbers. If D2 said "18 sets", this would break. Clean data is what makes the smart stuff possible.

One last bit of magic, for my fellow Excel lovers. The stock log only stores the supplier ID, not the name. But I can look up the name from the Suppliers table. In K2: equals XLOOKUP, H2, then the Suppliers ID column, then the Suppliers name column. Drag down. There they are.

This is what makes it a real database. The name lives in one place only. If PackRight renames itself tomorrow, Sarah changes it once, and every stock log row updates instantly. In database language, this ID connection is called a relationship. You've just built one.
```
<!-- VOICEOVER END -->

---

## Prompt 4 of 4: The Messy Data Makeover (15:30–19:30, 4 min 0 s)

**What this demo shows:** A messy BrightLeaf stock export cleaned in seven fixes (title rows, merged cells, inconsistent IDs, duplicates, mixed quantities and units, a blank SKU, colour-coded meaning and a TOTAL row), ending with a before-and-after comparison.

### Copy this prompt into Claude:

```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. It will be screen-recorded and used in a beginner course for supply-chain managers ("The ERP Agent Blueprint"). This section shows a realistic messy stock spreadsheet being cleaned step by step in a Google Sheets-style app, so beginners see seven common "data crimes" and how each is fixed. It ends with a before/after comparison that reveals a hidden emergency (hydraulic oil). Because this section is 4 minutes long, organise the code by scene (one function or object per scene) so it is easy to tweak.

SECTION LENGTH: 4 min 0 s (240 seconds). The master timeline runs from 00:00 to 04:00 exactly.

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

APP LOOK
- Google Sheets-style spreadsheet in a Chrome-style browser, document title "BrightLeaf Messy Export", green accent, menus File, Edit, View, Insert, Format, Data, Tools, toolbar with a "Fill color" paint-bucket button, formula bar, column letters A-I, row numbers, a right-click context menu (white panel) and modal dialogs (white, rounded, blue primary button).
- Merged cells render as one tall/wide cell with centred text; red-filled cells use light red (#F8D7DA) fill.
- "Crime" stickers: small red circles with a number, popping onto problem cells.
- A fix counter badge in the top-right of the stage: "Fix 1/7" ... "Fix 7/7".
- Final scene: a full-stage before/after slide (two tables side by side).

DATA TO SHOW (exact)
Messy sheet, before any fix (row: contents):
- Row 1 (merged A1:H1, bold 14pt, centred): "BRIGHTLEAF SUPPLIES – STOCK REPORT (Nov) – DO NOT EDIT!!"
- Row 2 (merged A2:H2, centred): "Prepared by Tom / updated by Sarah / numbers as of last count"
- Row 3: blank
- Row 4 headers (grey fill): Item Code | Product | Supplier | Qty | Reorder Lvl | Last Count Date | Cost | Remarks
- Row 5: BL-1001 | Steel Hex Bolts M10 (box of 100) | [merged C5:C7 "Apex Fasteners"] | 145 boxes | 80 | 16/11/2026 | $12.50 |
- Row 6: BL-1009 | Nylon Cable Ties 500pk | (merged) | 410 | 150 | Nov 16 | 6.3 |
- Row 7: BL-1001 | Steel Hex Bolts M10 | (merged) | 145 boxes | 80 | 16/11/2026 | $12.50 |
- Row 8: BL-1002 | Corrugated Box 18x12x10 | [merged C8:C11 "PackRight Industries"] | 1,180 pcs | 1500 | 2026-11-16 | 0.85 |
- Row 9: "BL 1002 " | Corrugated Shipping Box 18x12x10 | (merged) | 1180 | 1,500 | 16-Nov-26 | 0.85 |
- Row 10: BL-1003 | Stretch Wrap Film 500mm | (merged) | 21 cartons (12 rolls each) + 8 loose | 200 | 15/11/2026 | 9.2 |
- Row 11: BL-1006 | Packing Tape 48mm | (merged) | approx 1,850 [RED FILL] | 1000 | 14/11/2026 | 1.1 |
- Row 12: (blank) | Industrial Safety Gloves (pair) | Safe Hands Co | 420 pairs | 600 | 16/11/2026 | 2.4 |
- Row 13: BL-1005 | Pallet Jack Wheels (set) | [merged C13:C14 "Global Lift Parts, Shenzhen"] | 18 - urgent!! [RED FILL] | 25 | 16.11.2026 | USD 38 | 3 jacks waiting
- Row 14: BL-1010 | Forklift Battery Water Kit | (merged) | 26 | 20 | 16/11/2026 | 19.75 |
- Row 15: BL-1007 | Hydraulic Oil 20L | Gulf Lubricants | 31 (check w/ Tom) | 40 | 16/11/2026 | 54 |
- Row 16: BL-1008 | LED Warehouse Light 150W | Shenzhen BrightTech | 34 nos | 30 | 13/11/2026 | 72 |
- Row 17 (bold): TOTAL | | | lots | | | | see Tom's email
After Fix 1 everything shifts up 3 rows (headers in row 1, data rows 2-14).
Fix details:
- Fix 1: delete rows 1-3 (context menu item "Delete rows 1 - 3").
- Fix 2: Format > Merge cells > Unmerge on column C; blanks appear below each name; copy down "Apex Fasteners" (2 rows), "PackRight Industries" (3 rows), "Global Lift Parts, Shenzhen" (1 row).
- Fix 3: Edit > Find and replace: Find "BL " (show the space as a visible light-grey dot), Replace with "BL-", Replace all (toast: "Replaced 1 instance of BL  with BL-"); then Data > Data cleanup > Trim whitespace (toast: "1 cell trimmed").
- Fix 4: Data > Data cleanup > Remove duplicates; dialog: tick "Data has header row"; columns: only "Item Code" and "Last Count Date" ticked; button "Remove duplicates"; toast "1 duplicate row found and removed. 12 unique rows remain." Then the two BL-1002 rows (2026-11-16 vs 16-Nov-26) are compared and the second is deleted by hand. Warning chip: "Before: 1,180 + 1,180 = 2,360 boxes. Above the reorder point of 1,500, so the reorder alert would never have fired."
- Fix 5: insert a "Unit" column right of Qty, then rewrite each quantity (old value strikes through, new number + unit slide in):
  145 boxes -> 145 | box
  410 -> 410 | pack
  1,180 pcs -> 1180 | each
  21 cartons (12 rolls each) + 8 loose -> 260 | roll
  approx 1,850 -> 1850 | roll   (Remarks: "estimate, recount")
  420 pairs -> 420 | pair
  18 - urgent!! -> 18 | set   (Remarks: "urgent")
  26 -> 26 | kit
  31 (check w/ Tom) -> 31 | drum   (Remarks: "check w/ Tom")
  34 nos -> 34 | each
  Stretch wrap chip: "21 x 12 + 8 = 260 rolls. Reorder point is in rolls (200). Not a stock-out."
- Fix 6: blank SKU in the gloves row -> type "BL-1004" (a small popover of the product list shows "BL-1004 Industrial Safety Gloves (pair)").
- Fix 7: red cells -> Remarks gets "urgent per Tom" on both rows, Fill color > Reset; delete the TOTAL row.
Before/after slide:
- Left "Messy": 17 rows, 2 red "urgent" cells.
- Right "Clean" (10 rows; columns Item Code | Qty | Unit | Reorder Lvl | Status):
  BL-1001 | 145 | box | 80 | OK
  BL-1009 | 410 | pack | 150 | OK
  BL-1002 | 1180 | each | 1500 | REORDER
  BL-1003 | 260 | roll | 200 | OK
  BL-1006 | 1850 | roll | 1000 | OK
  BL-1004 | 420 | pair | 600 | REORDER
  BL-1005 | 18 | set | 25 | REORDER
  BL-1010 | 26 | kit | 20 | OK
  BL-1007 | 31 | drum | 40 | REORDER
  BL-1008 | 34 | each | 30 | OK
  Counter chips: "4 REORDER" (red), "6 OK" (green).
- Surprise 1: "Packing tape (coloured 'urgent'): 1,850 rolls vs reorder point 1,000. Fine."
- Surprise 2: "Hydraulic oil (nobody flagged it): 31 drums vs 40, 14-day lead time from Dubai. A real emergency."

TIMELINE (scene by scene; times relative to the start of this demo)
1. 00:00-00:08 | Browser switches to the "BrightLeaf Messy Export" sheet showing rows 1-17 as in DATA. | No callout.
2. 00:08-00:30 | Slow horizontal pan/zoom (1.2) across the sheet. Red numbered crime stickers pop in sync with the narration: (1) merged title rows, (2) merged supplier cells, (3) "145 boxes", (4) "approx 1,850", (5) "18 - urgent!!", (6) "BL 1002 " next to "BL-1002". | Each sticker has a 3-word label, e.g. "merged title", "number + word".
3. 00:30-00:47 | More stickers: (7) the blank SKU, (8) five different date formats (16/11/2026, Nov 16, 2026-11-16, 16-Nov-26, 16.11.2026 each circled), (9) red cells, (10) the TOTAL row "lots". Zoom back to 1.0. | Callout: "A human can muddle through. An agent will stumble on every one."
4. 00:47-00:59 | Fix 1 (badge "Fix 1/7"). Cursor drags row headers 1-3, right-clicks; context menu shows "Delete rows 1 - 3"; click; rows collapse upward; headers are now row 1. | Callout: "Row 1 = headers".
5. 00:59-01:07 | Fix 2. Cursor clicks column C header; Format > Merge cells > Unmerge. Merged blocks split; empty cells below each name glow amber. | Callout: "Only the top cell of a merge holds the name".
6. 01:07-01:25 | Cursor copies "Apex Fasteners" down into its 2 blanks, "PackRight Industries" into 3 blanks, "Global Lift Parts, Shenzhen" into 1 blank (each paste with a small flash). | Callout: "Every row knows its own supplier".
7. 01:25-01:40 | Fix 3. Select column A; Edit > Find and replace; the dialog fills: Find "BL " (visible space dot), Replace with "BL-"; click "Replace all"; toast appears; "BL 1002 " becomes "BL-1002 ". | Callout: "To a computer, BL 1002 and BL-1002 are apple and banana".
8. 01:40-01:52 | Data > Data cleanup > Trim whitespace; toast "1 cell trimmed"; the invisible trailing space (shown as a dot) disappears. | Callout: "Invisible spaces: the #1 reason a VLOOKUP says 'not found'".
9. 01:52-02:04 | Fix 4. Select all data; Data > Data cleanup > Remove duplicates; dialog with "Data has header row" ticked and only "Item Code" + "Last Count Date" ticked; click; the duplicate BL-1001 row fades out; toast "1 duplicate row found and removed. 12 unique rows remain." | No callout.
10. 02:04-02:21 | The two BL-1002 rows highlight side by side (dates 2026-11-16 vs 16-Nov-26). Cursor right-clicks the second row > "Delete row". Warning chip appears and holds: "Before: 1,180 + 1,180 = 2,360 boxes. Above the reorder point of 1,500, so the reorder alert would never have fired." | Chip.
11. 02:21-02:27 | Fix 5. Right-click column D header > "Insert 1 column right"; type header "Unit". | No callout.
12. 02:27-02:51 | Each messy quantity rewrites in turn (~2.3 s each): old text strikes through, the clean number slides into Qty and the unit into Unit; remarks appear where listed. The stretch-wrap row gets a green chip: "21 x 12 + 8 = 260 rolls. Not a stock-out." | Callout: "One fact per cell".
13. 02:51-03:03 | Fix 6. Cursor clicks the blank Item Code in the gloves row; a small popover of the product list highlights "BL-1004 Industrial Safety Gloves (pair)"; types "BL-1004". | Callout: "A row without an ID is a parcel without a label".
14. 03:03-03:15 | Fix 7. For the two red rows, cursor types "urgent per Tom" into Remarks, then selects the red cells > Fill color > Reset; red disappears. | Callout: "Agents read values, not colours".
15. 03:15-03:22 | Cursor selects the TOTAL row > right-click > Delete row. Badge shows "Fix 7/7" with a green tick. | Callout: "Totals belong in reports, not data tables".
16. 03:22-03:36 | Full-stage before/after slide: left "Messy" thumbnail with counters "17 rows", "2 red cells"; right "Clean" table (10 rows, Status column). Counters animate; chips "4 REORDER" and "6 OK" pop. | No callout.
17. 03:36-03:47 | The BL-1006 row (1850 | roll | 1000 | OK) highlights green. | Callout: Surprise 1 text.
18. 03:47-03:59 | The BL-1007 row (31 | drum | 40 | REORDER) pulses red. | Callout: Surprise 2 text.
19. 03:59-04:00 | END card. | "END"

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
[00:00-00:47] Now the fun part. This is BrightLeaf's real-world stock sheet. It started as an Odoo export three years ago and has been passed between five people since. You might recognise some of these crimes. Merged title rows. Supplier names merged across several rows. Quantities like "145 boxes", "approx 1,850" and "18 - urgent!!". "BL 1002" with a space next to "BL-1002" with a dash. A blank SKU. Dates in five different formats. Red cells only Tom understands. And a TOTAL row that just says "lots". A human can muddle through. An agent will stumble on every one. Let's fix them.
[00:47-00:59] Fix one: I delete the top three rows: the merged title, the "prepared by" line and the blank row. Now row 1 is the headers.
[00:59-01:25] Fix two: merged cells. The supplier column looks tidy, but only the top cell of a merge actually holds the name. The rows underneath are empty, so if you sort or filter, products lose their supplier. Format, Merge cells, Unmerge. See the blanks? I copy each name down. Every row now knows its own supplier.
[01:25-01:52] Fix three: inconsistent IDs. To a computer, "BL 1002" and "BL-1002" are as different as "apple" and "banana". Edit, Find and replace, "BL space" with "BL dash", Replace all. Then Data, Data cleanup, Trim whitespace, to remove invisible spaces, the number one reason a VLOOKUP says "not found" when you can see the value right there.
[01:52-02:21] Fix four: duplicates. Data, Data cleanup, Remove duplicates, data has a header row. The duplicate hex bolts disappear. The two corrugated box rows had different date formats, so I delete one by hand. Before this, a stock total would have counted 2,360 boxes instead of 1,180, which is above the reorder point of 1,500, so the reorder alert would never have fired.
[02:21-02:51] Fix five: one fact per cell. I insert a Unit column and split every quantity. "145 boxes" becomes 145 and "box". "approx 1,850" becomes 1,850, with "estimate, recount" in the remarks. And our stretch wrap: "21 cartons, 12 rolls each, plus 8 loose" becomes 260 rolls, because the reorder point is in rolls. Not a stock-out. The eighteen-hundred-dollar cell, fixed in five seconds.
[02:51-03:22] Fix six: the blank ID. The safety gloves have no SKU. The product list says BL-1004. A row without an ID is a parcel without a label. Fix seven: the red cells meant "urgent", so I write that in the remarks and reset the colour. And the TOTAL row goes. Totals belong in reports, not data tables, or the agent counts them as a product.
[03:22-03:59] Before and after. Messy: seventeen rows and two red "urgent" cells. Clean: ten rows, one per product, and four need reordering: boxes, gloves, wheels and hydraulic oil. Two surprises. The packing tape coloured red for "urgent"? 1,850 rolls against a reorder point of 1,000. Fine. And the hydraulic oil nobody flagged is at 31 drums against 40, with a 14-day lead time from Dubai. That's a real emergency, and the messy sheet was hiding it under "check with Tom".

CHECKLIST
- Total duration exactly 4:00 (240 s), END card in the last second; code organised by scene.
- Messy sheet matches the DATA block exactly (merges, red cells, five date formats, TOTAL row).
- All seven fixes happen in order with the correct menu paths and toasts.
- Final clean table has 10 rows with exactly 4 REORDER (BL-1002, BL-1004, BL-1005, BL-1007) and 6 OK.
- Start button, END card, watermark present; nothing overflows the stage.
```

**After Claude builds it:** This is the longest demo; preview it once from start to finish before recording, and if a scene feels rushed, ask Claude to adjust only that scene's internal pacing (keep the scene start/end times). Record full-screen and trim the first second.

<!-- VOICEOVER START -->
### Voice-over text for Fish Audio (paste this)
*505 words, about 3 min 22 s at a natural pace (150 words/min). Paste it as is; each paragraph is a natural pause.*

```text
Now the fun part. This is BrightLeaf's real-world stock sheet. It started as an Odoo export three years ago and has been passed between five people since. You might recognise some of these crimes.

Merged title rows. Supplier names merged across several rows. Quantities like "145 boxes", "approx 1,850" and "18 - urgent!!". "BL 1002" with a space next to "BL-1002" with a dash. A blank SKU. Dates in five different formats. Red cells only Tom understands. And a TOTAL row that just says "lots". A human can muddle through. An agent will stumble on every one. Let's fix them.

Fix one: I delete the top three rows: the merged title, the "prepared by" line and the blank row. Now row 1 is the headers.

Fix two: merged cells. The supplier column looks tidy, but only the top cell of a merge actually holds the name. The rows underneath are empty, so if you sort or filter, products lose their supplier. Format, Merge cells, Unmerge. See the blanks? I copy each name down. Every row now knows its own supplier.

Fix three: inconsistent IDs. To a computer, "BL 1002" and "BL-1002" are as different as "apple" and "banana". Edit, Find and replace, "BL space" with "BL dash", Replace all. Then Data, Data cleanup, Trim whitespace, to remove invisible spaces, the number one reason a VLOOKUP says "not found" when you can see the value right there.

Fix four: duplicates. Data, Data cleanup, Remove duplicates, data has a header row. The duplicate hex bolts disappear. The two corrugated box rows had different date formats, so I delete one by hand. Before this, a stock total would have counted 2,360 boxes instead of 1,180, which is above the reorder point of 1,500, so the reorder alert would never have fired.

Fix five: one fact per cell. I insert a Unit column and split every quantity. "145 boxes" becomes 145 and "box". "approx 1,850" becomes 1,850, with "estimate, recount" in the remarks. And our stretch wrap: "21 cartons, 12 rolls each, plus 8 loose" becomes 260 rolls, because the reorder point is in rolls. Not a stock-out. The eighteen-hundred-dollar cell, fixed in five seconds.

Fix six: the blank ID. The safety gloves have no SKU. The product list says BL-1004. A row without an ID is a parcel without a label.

Fix seven: the red cells meant "urgent", so I write that in the remarks and reset the colour. And the TOTAL row goes. Totals belong in reports, not data tables, or the agent counts them as a product.

Before and after. Messy: seventeen rows and two red "urgent" cells. Clean: ten rows, one per product, and four need reordering: boxes, gloves, wheels and hydraulic oil. Two surprises. The packing tape coloured red for "urgent"? 1,850 rolls against a reorder point of 1,000. Fine. And the hydraulic oil nobody flagged is at 31 drums against 40, with a 14-day lead time from Dubai. That's a real emergency, and the messy sheet was hiding it under "check with Tom".
```
<!-- VOICEOVER END -->

---
