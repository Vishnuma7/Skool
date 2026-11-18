# Video 7: Agents That Take Action: Draft Purchase Orders with Human Approval: Screen-Recording Prompts

**How to use:** 1. Open claude.ai, start a new chat, and paste ONE prompt. 2. Claude builds an animated demo you can preview. If anything looks wrong, reply in the same chat ("make the cursor slower", "the table is cut off"). 3. Open the demo full-screen in Chrome (press F11 / Ctrl+Cmd+F), start your screen recorder (QuickTime: File → New Screen Recording), then click **Start**. 4. Stop recording when the "END" card appears, trim the start and end, and add your voice-over from the script. Each demo runs for the same length as its script section, so the voice-over lines up.

**Sections in this video:**

| # | Section | Time | Length | Prompt |
|---|---|---|---|---|
| 1 | Tour of the Finished Workflow | 03:45–05:00 | 1 min 15 s | Prompt 1 of 6 |
| 2 | Step 1: The 8am Doorbell and Reading Stock from Odoo | 05:00–08:30 | 3 min 30 s | Prompt 2 of 6 |
| 3 | Step 2: Who's Low, and How Much Should We Order? | 08:30–12:30 | 4 min 0 s | Prompt 3 of 6 |
| 4 | Step 3: Finding the Supplier and Letting Stocky Write the Request | 14:30–17:30 | 3 min 0 s | Prompt 4 of 6 |
| 5 | Step 4: Mr. Harrison's Rule and the Approval Email | 17:30–20:15 | 2 min 45 s | Prompt 5 of 6 |
| 6 | Step 5: Creating the Draft RFQ in Odoo and Confirming Back | 20:15–23:15 | 3 min 0 s | Prompt 6 of 6 |

---

## Prompt 1 of 6: Tour of the Finished Workflow (03:45–05:00, 1 min 15 s)

**What this demo shows:** the finished "Stocky – Morning Reorder" workflow, zoomed out, with the cursor hovering each block in story order from the 8am trigger to the confirmation email.

### Copy this prompt into Claude:

```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. The demo recreates, in a simplified look-alike style, a finished workflow on an n8n-style canvas. It gives beginners the big picture before they build: a clock wakes the workflow at 8am, it reads stock from the ERP, keeps only low items, calculates the order, finds the supplier, lets an AI agent write an approval request, routes big orders to the director, waits for a human click, and only then creates a DRAFT order.

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

SECTION LENGTH: exactly 1:15 (75 seconds), including the 1-second END card.

APP LOOK
- Browser frame: tab title "Stocky – Morning Reorder - n8n", URL "https://brightleaf.app.n8n.cloud/workflow/stocky-morning-reorder".
- n8n-style workflow canvas: dark grey dotted canvas (#2B2D31), top bar with the workflow name "Stocky – Morning Reorder" at the top-left, "Editor | Executions" switch in the centre, an "Inactive/Active" toggle at the top-right (off).
- Nodes: rounded squares (90x90 px) with a simple white line icon and a light-grey label underneath; IF nodes are drawn as diamonds (rotated squares) with two labelled exits "true" (top) and "false" (bottom); grey bezier connections. Hover = node lifts slightly, gets a white outline and a small tooltip with its type ("Schedule Trigger", "Odoo", "Filter", "Edit Fields", "Google Sheets", "AI Agent", "If", "Gmail").
- Layout (snake, two rows, all visible at once, generous spacing):
  Row 1 (y ~ 330, left to right): Every Morning 8am (clock icon, trigger shape) -> Get Stock from Odoo (database icon) -> Below Reorder Point (funnel icon) -> Calculate Order (calculator icon) -> Find Supplier (sheet/table icon) -> Stocky Writes Request (robot icon, wider rectangle) with a small circular sub-node "Anthropic Chat Model" below it on a dashed line.
  Row 2 (y ~ 700, the connection curves down from Stocky Writes Request at the right and continues left to right): Over $2,000? (diamond) -> true: Ask Mr. Harrison (envelope icon with a small hourglass badge) / false: Ask Sarah (envelope + hourglass) -> both join into Approved? (diamond) -> true: Create Draft RFQ (database icon) -> Add Product Line (database icon) -> Confirm to Sarah (envelope icon).
- Traffic-light colour bands (soft, 15% opacity, rounded) appear behind groups of nodes when called out: green behind "Get Stock from Odoo", amber behind "Create Draft RFQ" and "Add Product Line".

DATA TO SHOW (use exactly)
- Workflow name: Stocky – Morning Reorder
- Node names (exactly): Every Morning 8am; Get Stock from Odoo; Below Reorder Point; Calculate Order; Find Supplier; Stocky Writes Request (with sub-node Anthropic Chat Model); Over $2,000?; Ask Mr. Harrison; Ask Sarah; Approved?; Create Draft RFQ; Add Product Line; Confirm to Sarah.
- ON-SCREEN TEXT: Read (green) → Decide → Ask a human → Draft (amber) → Confirm

TIMELINE (scene by scene; times relative to section start)
1. 00:00-00:06 | The finished canvas fades in, fully zoomed out, all nodes grey. A soft light sweep travels along the connections from left to right and down to row 2. | -
2. 00:06-00:14 | Hold. A thin dashed arrow traces the story path once over the canvas. | Callout at the top: "Don't worry about details - follow the story left to right"
3. 00:14-00:23 | Cursor hovers "Every Morning 8am"; it lifts and shows the tooltip "Schedule Trigger"; its clock icon wiggles like an alarm. | Callout: "The doorbell: a clock rings at 8am every day"
4. 00:23-00:28 | Cursor hovers "Get Stock from Odoo"; a soft green band appears behind it with a small "GREEN = read" tag. | -
5. 00:28-00:32 | Cursor hovers "Below Reorder Point"; a few tiny row-dots fall through the funnel icon, some are dropped. | Small callout: "Keep only the low ones"
6. 00:32-00:36 | Cursor hovers "Calculate Order"; a tiny "$" appears over the calculator. | Small callout: "How much + what it costs"
7. 00:36-00:40 | Cursor hovers "Find Supplier". | Small callout: "Who do we buy it from?"
8. 00:40-00:45 | Cursor hovers "Stocky Writes Request"; the Anthropic Chat Model sub-node pulses. | Small callout: "Stocky writes the approval request in plain English"
9. 00:45-00:52 | Cursor hovers the diamond "Over $2,000?"; the "true" exit lights toward "Ask Mr. Harrison" and the "false" exit toward "Ask Sarah", each with a small label. | Callout: "Mr. Harrison's rule: over $2,000 goes to him"
10. 00:52-01:00 | Cursor hovers "Ask Mr. Harrison" then "Ask Sarah"; their hourglass badges flip and a small "Paused - waiting for a click" tag appears. | Callout: "The workflow waits for a human"
11. 01:00-01:06 | Cursor hovers "Approved?", then "Create Draft RFQ" and "Add Product Line"; an amber band appears behind the two Odoo nodes with an "AMBER = draft" tag. | Callout: "Only after Approve: a DRAFT RFQ"
12. 01:06-01:09 | Cursor hovers "Confirm to Sarah"; a small envelope flies back toward the left. | -
13. 01:09-01:14 | Cursor moves away; all nodes light up briefly in sequence. | ON-SCREEN TEXT lower-third from 01:09 to 01:14: "Read (green) → Decide → Ask a human → Draft (amber) → Confirm"
14. 01:14-01:15 | END card. | END

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
00:00 Before we build, let me show you where we're going. This is the finished recipe card. Don't worry about the details yet, just follow the story from left to right.
00:14 Step one is the doorbell. Instead of Sarah typing a question, a clock rings the doorbell at 8am every day.
00:23 Then we read every product from Odoo. That's green. We keep only the ones below their reorder point, and we calculate how much to order and what it would cost.
00:36 We look up the right supplier, and Stocky, our AI agent, writes a short, friendly approval request in plain English.
00:45 This diamond is Mr. Harrison's rule. Anything over two thousand dollars goes to him. Everything else goes to Sarah. Then the workflow literally pauses and waits for a human to click a button.
01:00 Only if someone clicks Approve do we create a draft RFQ in Odoo. That's amber. And then Stocky confirms back by email. About a dozen blocks. No code. Let's build it from scratch.

CHECKLIST
- Total duration exactly 1:15 (75 s); END card in the final second.
- Every node name matches the DATA block exactly (including "Over $2,000?" and "Stocky Writes Request").
- All nodes are visible at once, labels readable, nothing overlapping or overflowing the 1920x1080 stage.
- Hovers happen in the order of the TIMELINE, in sync with the voice-over.
- ON-SCREEN TEXT appears for 5 s; Start button, Pause/Restart, progress bar and keyboard shortcuts work.
```

**After Claude builds it:** This demo is short and fast, so check that each hover holds long enough to read the callout; if not, ask Claude to shorten the callout text rather than change the timing. Trim the Start click.

---

## Prompt 2 of 6: Step 1: The 8am Doorbell and Reading Stock from Odoo (05:00–08:30, 3 min 30 s)

**What this demo shows:** creating the workflow, setting a Schedule Trigger for 8am with the America/New_York timezone, and an Odoo node that reads five fields for all 10 products into a table.

### Copy this prompt into Claude:

```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. The demo recreates, in a simplified look-alike style, an n8n-style workflow builder. It teaches beginners the first two blocks of a morning reorder workflow: a Schedule Trigger that runs every day at 8am (with the correct timezone), and an Odoo node that reads every product with only the five fields we need, shown as a table.

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

SECTION LENGTH: exactly 3:30 (210 seconds), including the 1-second END card.

APP LOOK
- Browser frame: tab title "n8n - Overview" then "Stocky – Morning Reorder - n8n"; URL "https://brightleaf.app.n8n.cloud/home/workflows" then "https://brightleaf.app.n8n.cloud/workflow/new".
- n8n-style Overview page: thin dark left sidebar; a list of existing workflows (one row reads "Stocky v1 – Reads the ERP", Last updated 2 days ago); an orange "Create Workflow" button at the top-right.
- Editor: workflow name at the top-left (click to rename); "Editor | Executions" switch centre; a "..." menu button at the top-right (opens a menu: Download, Import, Settings, Delete). Dark grey dotted canvas (#2B2D31). Empty canvas shows a dashed "Add first step" square.
- Node creator: right-side panel with a search box and a list of results with icons and one-line descriptions; choosing an app shows a list of "Actions".
- Nodes: rounded squares (100x100 px), white line icons, label below. Trigger nodes have a rounded left edge and a lightning badge.
- Node settings: a large centred modal, split in three columns like a real data editor: left "INPUT" panel (narrow, grey), middle "Parameters" form, right "OUTPUT" panel with an orange "Execute step" button and a "Table | JSON | Schema" switch. Form controls: dropdowns with chevrons, number inputs, toggle switches (orange when on), an "Add option" button.
- Workflow Settings dialog: a centred white dialog titled "Workflow settings" with rows (Error workflow, Timezone, Save failed executions...) and a "Save" button.
- Table output: zebra rows, a sticky header, numbers right-aligned; rows below the reorder point get a soft red background and their On Hand number in red.

DATA TO SHOW (use exactly)
- Workflow name typed: Stocky – Morning Reorder
- Search "schedule" -> "Schedule Trigger". Settings: Trigger Interval: Days; Days Between Triggers: 1; Trigger at Hour: 8am; Trigger at Minute: 0. Node renamed: Every Morning 8am
- Workflow Settings -> Timezone: search "New_York" -> "America/New_York" (the default value before the change reads "Default - UTC"). Save.
- Illustration for the timezone mistake: "8am UTC = 3am in Columbus" (red X) vs "8am America/New_York = 8am in Columbus" (green tick).
- "+" -> search "Odoo" -> "Odoo" -> action "Get many custom resources". Credential (pre-selected): Odoo – BrightLeaf (from Video 5).
- Resource: Custom Resource. Custom Resource Name: search "product.product" -> option "Product Variant (product.product)". Operation: Get Many. Return All: on.
- Options -> Add option -> Fields to Include, tick: Internal Reference (default_code), Name, Quantity On Hand (qty_available), Min (reordering_min_qty), Cost (standard_price).
- Execute step -> "10 items". Table view columns: default_code | name | qty_available | reordering_min_qty | standard_price
  BL-1001 | Steel Hex Bolts M10 (box of 100) | 145 | 80 | 12.50
  BL-1002 | Corrugated Shipping Box 18x12x10 | 1,180 | 1,500 | 0.85 (red row)
  BL-1003 | Stretch Wrap Film 500mm | 260 | 200 | 9.20
  BL-1004 | Industrial Safety Gloves (pair) | 420 | 600 | 2.40 (red row)
  BL-1005 | Pallet Jack Wheels (set) | 18 | 25 | 38.00 (red row)
  BL-1006 | Packing Tape 48mm (roll) | 1,850 | 1,000 | 1.10
  BL-1007 | Hydraulic Oil 20L | 31 | 40 | 54.00 (red row)
  BL-1008 | LED Warehouse Light 150W | 34 | 30 | 72.00
  BL-1009 | Nylon Cable Ties (pack of 500) | 410 | 150 | 6.30
  BL-1010 | Forklift Battery Water Kit | 26 | 20 | 19.75
- Mini JSON card for one row (BL-1005): { "default_code": "BL-1005", "name": "Pallet Jack Wheels (set)", "qty_available": 18, "reordering_min_qty": 25, "standard_price": 38.0 }
- Node renamed: Get Stock from Odoo
- ON-SCREEN TEXT: Each row = one "labelled shopping list" (JSON) for one product

TIMELINE (scene by scene; times relative to section start)
1. 00:00-00:05 | Overview page. Cursor clicks "Create Workflow"; the empty editor opens. | -
2. 00:05-00:15 | Cursor clicks the name "My workflow"; typing "Stocky – Morning Reorder"; Enter; the tab title updates. | Callout: "Clear names now = no headache when you have fifteen workflows"
3. 00:15-00:25 | Cursor clicks "Add first step"; types "schedule"; clicks "Schedule Trigger". The trigger node (clock icon) pops onto the canvas and its settings modal opens. | Callout: "An alarm clock for your recipe card"
4. 00:25-00:41 | Fields are set in sequence, each with a click and dropdown: Trigger Interval "Days"; Days Between Triggers "1"; Trigger at Hour "8am"; Trigger at Minute "0". Then cursor clicks the modal title and types "Every Morning 8am". | -
5. 00:41-00:47 | Modal closes; the node shows "Every Morning 8am". Cursor clicks the "..." menu at the top-right; clicks "Settings". | -
6. 00:47-00:57 | The "Workflow settings" dialog opens. Zoom 1.4x on Timezone ("Default - UTC"); cursor opens it, types "New_York", picks "America/New_York"; clicks "Save". | Callout: "Columbus runs on Eastern Time"
7. 00:57-01:07 | Dialog closes. A two-clock illustration card slides in at the top-right of the canvas: left clock "8am UTC = 3am in Columbus" with a red X; right clock "8am America/New_York = 8am in Columbus" with a green tick. | Amber callout: "Beginner mistake: forgetting the timezone"
8. 01:07-01:14 | Card fades. Cursor clicks "+" on the trigger's right edge; types "Odoo"; clicks "Odoo"; the Actions list shows; cursor clicks "Get many custom resources". | -
9. 01:14-01:27 | The Odoo settings modal opens with "Credential to connect with: Odoo – BrightLeaf" already filled; a small key-card icon appears beside it. | Callout: "Our hotel key card: it opens only the doors we gave it"
10. 01:27-01:40 | Resource -> "Custom Resource". Custom Resource Name: typing "product.product"; option "Product Variant (product.product)" highlights; click. | Callout: "May be labelled 'Product' or 'Product Variant'"
11. 01:40-01:57 | Operation -> "Get Many". Cursor clicks the "Return All" toggle; it slides to ON (orange). | Callout on the toggle: "So we don't stop at the first 50 products"
12. 01:57-02:05 | Cursor clicks "Add option" -> "Fields to Include"; a long checklist opens with a scrollbar and a faint "100+ fields" counter. | -
13. 02:05-02:25 | Five fields get ticked one by one, ~4 s apart, each becoming a chip: Internal Reference (default_code), Name, Quantity On Hand (qty_available), Min (reordering_min_qty), Cost (standard_price). | Small callouts appear with chips: "= SKU" on Internal Reference, "= reorder point" on Min, "= unit cost" on Cost
14. 02:25-02:37 | Zoom 1.4x on the five chips. | Callout: "Only what we need: faster, and less confusing for the agent"
15. 02:37-02:42 | Zoom out. Cursor clicks the orange "Execute step"; a spinner, then the OUTPUT panel shows "10 items" in JSON-ish list. | -
16. 02:42-02:46 | Cursor clicks "Table"; the table with all 10 rows appears. | -
17. 02:46-03:08 | Rows highlight in turn, each with a red band and the On Hand vs Min cells bold: BL-1002 (02:46-02:52), BL-1004 (02:52-02:57), BL-1005 (02:57-03:02), BL-1007 (03:02-03:06); then the other six rows get a quick soft green tint (03:06-03:08). | Callout on BL-1005: "18 on hand, Min 25"
18. 03:08-03:14 | The BL-1005 row lifts out and flips into the mini JSON card beside the table. | ON-SCREEN TEXT lower-third from 03:09 to 03:14: Each row = one "labelled shopping list" (JSON) for one product
19. 03:14-03:22 | Card flips back; modal closes; cursor clicks the Odoo node title and renames it "Get Stock from Odoo". Canvas: Every Morning 8am -> Get Stock from Odoo. | -
20. 03:22-03:29 | A soft green band appears behind both nodes with a "GREEN = read only" tag. | Callout: "Everything so far is green: we're only looking"
21. 03:29-03:30 | END card. | END

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
00:00 Create a new workflow and call it "Stocky – Morning Reorder". Naming things clearly now saves you a headache in three months when you have fifteen workflows.
00:15 Our doorbell this time is the Schedule Trigger. Think of it as an alarm clock for your recipe card.
00:25 Trigger interval: Days. Days between triggers: one. Trigger at hour: 8am. Minute: zero. I'll rename it "Every Morning 8am" so anyone can read the canvas like a sentence.
00:41 Here's a mistake I see all the time. The alarm clock needs to know which time zone it lives in. Click the three dots, Settings, and set Timezone to America/New_York, because Columbus runs on Eastern Time, or whatever your warehouse uses. Otherwise 8am might be 8am in London.
01:07 Next, we read from Odoo. Click plus, search Odoo, and pick the Odoo node. You'll see your credential from Video 5 is already selected. That's our hotel key card. It opens only the doors we gave it.
01:27 For Resource, choose Custom Resource. Then in the name box, search for "product dot product". Depending on your Odoo version it may be labelled "Product" or "Product Variant". It's the list of every item you stock. Operation: Get Many. And switch on Return All, so we don't accidentally stop at the first 50 products.
01:57 Now, a product in Odoo has more than a hundred fields. We only want five, so click Add option, Fields to Include, and tick these: Internal Reference, which is our SKU. Name. Quantity On Hand. Min, which is the reorder point from the reordering rule we set up in Video 2. And Cost, which is the unit cost. Asking only for what you need keeps things fast and keeps the agent from getting confused.
02:37 Let's test it. Execute step. And there they are, ten products, in a nice table. Look at BL-1002, Corrugated Shipping Boxes: on hand 1,180, Min 1,500. BL-1004, Safety Gloves: 420 on hand, Min 600. BL-1005, Pallet Jack Wheels: 18 on hand, Min 25. And BL-1007, Hydraulic Oil: 31 on hand, Min 40. Everything else is healthy.
03:08 Each row is one labelled shopping list. Product name, quantity, reorder point. Exactly like the JSON we saw in Video 3. Rename this node "Get Stock from Odoo". Notice that everything so far is green. We're only looking.

CHECKLIST
- Total duration exactly 3:30 (210 s); END card in the final second.
- Schedule settings (Days, 1, 8am, 0) and Timezone "America/New_York" are shown exactly.
- The table shows all 10 products with values matching the DATA block; exactly four red rows (BL-1002, BL-1004, BL-1005, BL-1007).
- Field chips use the exact labels and technical names in brackets.
- ON-SCREEN TEXT appears for 5 s; Start button, Pause/Restart, progress bar work; nothing overflows the 1920x1080 stage.
```

**After Claude builds it:** Check that the 10-row table fits inside the OUTPUT panel without a scrollbar hiding rows; if it doesn't, ask Claude to widen the panel or reduce row height. The timezone illustration (00:57) should be large enough to read in one glance. Trim the Start click.

---

## Prompt 3 of 6: Step 2: Who's Low, and How Much Should We Order? (08:30–12:30, 4 min 0 s)

**What this demo shows:** a Filter node that keeps the 4 low products, an Edit Fields node that calculates suggested_qty and order_value, the ordering-rule explainer slide, and the final four order values.

### Copy this prompt into Claude:

```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. The demo recreates, in a simplified look-alike style, an n8n-style workflow builder. It teaches beginners how to keep only the products below their reorder point (a Filter node, "a sieve"), and how to calculate how much to order and what it costs with simple formulas (an Edit Fields node), using the rule: suggested order = reorder point x 2 - on hand.
This section is 4 minutes long: organise the JavaScript by scene (one function or object per scene, with its start/end time) so each scene is easy to tweak.

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

SECTION LENGTH: exactly 4:00 (240 seconds), including the 1-second END card.

APP LOOK
- Browser frame: tab title "Stocky – Morning Reorder - n8n", URL "https://brightleaf.app.n8n.cloud/workflow/stocky-morning-reorder".
- n8n-style canvas (dark grey dotted #2B2D31) that starts with: Every Morning 8am (clock) -> Get Stock from Odoo (database). New nodes are added to the right: Below Reorder Point (funnel icon), Calculate Order (pencil/calculator icon).
- Node settings: a large centred modal with three columns: left "INPUT" panel listing the incoming fields as small draggable pills (default_code, name, qty_available, reordering_min_qty, standard_price, id) with a "Get Stock from Odoo" header; middle "Parameters"; right "OUTPUT" with an orange "Execute step" button and a "Table | JSON" switch.
- Dragging: when the cursor drags a field, a blue pill follows the cursor from the INPUT panel into the target box, which then shows an expression chip like {{ $json.qty_available }} in a light green box.
- Filter parameters: a "Conditions" block with rows "[value 1] [operator dropdown] [value 2]", an "Add condition" link, and an "AND" label between rows. Operator dropdown has groups (String, Number, Date, Boolean); Number expands to "is equal to, is not equal to, is greater than, is less than...".
- Filter output: two tabs at the top of OUTPUT: "Kept (4 items)" and "Discarded (6 items)".
- Edit Fields parameters: "Mode" dropdown, a "Fields to Set" list with "Add Field" button (each field row: Name input, Type dropdown, Value input with an expression editor that shows a small "Result:" preview underneath), and an "Include Other Input Fields" toggle with a "Fields: All" dropdown.
- Explainer slide: a full-stage navy (#1F2A44) card with large white text, used once.

DATA TO SHOW (use exactly)
Filter node "Below Reorder Point":
- Condition 1: {{ $json.qty_available }}  Number -> is less than  {{ $json.reordering_min_qty }}
- Condition 2 (AND): {{ $json.reordering_min_qty }}  Number -> is greater than  0
- Kept (4 items): BL-1002 Corrugated Shipping Box 18x12x10; BL-1004 Industrial Safety Gloves (pair); BL-1005 Pallet Jack Wheels (set); BL-1007 Hydraulic Oil 20L
- Discarded (6 items): BL-1001, BL-1003, BL-1006, BL-1008, BL-1009, BL-1010
Spreadsheet comparison text: =OnHand < ReorderPoint
IF vs Filter mini card: "IF: two exits (true / false)" vs "Filter: one exit, drops the rest".
Edit Fields node "Calculate Order": Mode: Manual Mapping; Include Other Input Fields: ON, Fields: All.
Slide: "Suggested order = Reorder point × 2 − On hand"; example "Pallet Jack Wheels: 25 × 2 = 50; 50 − 18 = 32"; note "Ignores: pack sizes, minimum order quantities, seasonal demand"; "In week one, predictable beats clever."
Field 1: Name suggested_qty, Type Number, Value {{ $json.reordering_min_qty * 2 - $json.qty_available }} (Result preview for the first item: 1820)
Field 2: Name order_value, Type Number, Value {{ ($json.reordering_min_qty * 2 - $json.qty_available) * $json.standard_price }} (Result preview: 1547)
Output table (4 rows) columns: default_code | name | qty_available | reordering_min_qty | standard_price | suggested_qty | order_value
  BL-1002 | Corrugated Shipping Box 18x12x10 | 1180 | 1500 | 0.85 | 1820 | 1547
  BL-1004 | Industrial Safety Gloves (pair) | 420 | 600 | 2.4 | 780 | 1872
  BL-1005 | Pallet Jack Wheels (set) | 18 | 25 | 38 | 32 | 1216
  BL-1007 | Hydraulic Oil 20L | 31 | 40 | 54 | 49 | 2646
ON-SCREEN TEXT (four lines, built up line by line):
BL-1002 Corrugated Shipping Box → 1,820 × $0.85 = $1,547.00
BL-1004 Industrial Safety Gloves → 780 × $2.40 = $1,872.00
BL-1005 Pallet Jack Wheels → 32 × $38.00 = $1,216.00
BL-1007 Hydraulic Oil 20L → 49 × $54.00 = $2,646.00

TIMELINE (scene by scene; times relative to section start)
1. 00:00-00:08 | Canvas with the two existing nodes. Cursor clicks "+" after "Get Stock from Odoo"; types "Filter"; clicks "Filter". The node appears and its modal opens. | -
2. 00:08-00:19 | Cursor renames it "Below Reorder Point". A small sieve illustration appears in the modal's top-right corner: 10 little row-chips drop in, 4 red ones fall through, 6 green ones stay on top. | Callout: "A sieve: only rows that match your rule fall through"
3. 00:19-00:33 | Cursor drags "qty_available" from INPUT into value 1; opens the operator dropdown -> Number -> "is less than". | -
4. 00:33-00:47 | Cursor drags "reordering_min_qty" into value 2. Under the row, a plain-English line types itself: "Keep the product if on hand is less than the reorder point", and a small spreadsheet-style chip "=OnHand < ReorderPoint" appears. | Callout: "Same idea as an Excel formula"
5. 00:47-01:02 | Cursor clicks "Add condition"; drags "reordering_min_qty" into value 1; operator Number -> "is greater than"; types 0 in value 2. An "AND" label sits between the rows. | Callout: "Reorder point > 0: never order products with no rule yet"
6. 01:02-01:10 | Cursor clicks "Execute step"; spinner; OUTPUT shows the "Kept (4 items)" tab with the four products. | -
7. 01:10-01:18 | Cursor clicks "Discarded (6 items)"; the six SKUs appear; then back to "Kept". | Callout: "4 kept, 6 discarded - exactly as expected"
8. 01:18-01:25 | A small comparison card appears over the canvas area (not the output): "IF: two exits (true / false)" vs "Filter: one exit, drops the rest". | Callout: "We don't need the healthy ones, so Filter is simpler"
9. 01:25-01:32 | Modal closes. Cursor clicks "+"; types "Edit Fields"; clicks "Edit Fields (Set)"; renames it "Calculate Order". | -
10. 01:32-01:46 | Mode -> "Manual Mapping". Cursor clicks the "Include Other Input Fields" toggle (ON) and picks "All". A faint spreadsheet illustration shows two new empty columns being added to a table. | Callout: "Like adding new columns to a spreadsheet"
11. 01:46-02:32 | The explainer slide fades in over the whole stage. Build-up: title "Suggested order = Reorder point × 2 − On hand" (01:46); a shelf illustration with a red line at 25 and stock at 18 (01:52); "25 × 2 = 50" appears and the shelf's target line rises to 50 (01:58); "50 − 18 = 32" appears and the shelf fills from 18 to 50 with 32 new boxes in blue (02:04-02:16); a grey line "Ignores: pack sizes, minimum order quantities, seasonal demand" (02:16); a green line "In week one, predictable beats clever." (02:24). | Callout on the shelf: "Fill the shelf back up to twice the reorder point"
12. 02:32-02:40 | Slide fades out to the Calculate Order modal. Cursor clicks "Add Field"; types the name "suggested_qty"; Type -> "Number". | -
13. 02:40-02:52 | Cursor clicks the Value box; types {{ $json.reordering_min_qty * 2 - $json.qty_available }}; the "Result: 1820" preview appears below. | Callout: "Read it out loud: reorder point, times two, minus on hand"
14. 02:52-03:03 | Zoom 1.5x on the curly brackets {{ }}, which glow. | Callout: "{{ }} = 'this is a formula', like = in Excel. Copy it from the activity file."
15. 03:03-03:11 | Zoom out. "Add Field": name "order_value", Type "Number", value pasted: {{ ($json.reordering_min_qty * 2 - $json.qty_available) * $json.standard_price }}; preview "Result: 1547". | Small callout: "The money"
16. 03:11-03:15 | Cursor clicks "Execute step"; OUTPUT Table view shows the four rows with the two new columns highlighted in blue. | -
17. 03:15-03:59 | The ON-SCREEN TEXT appears as a tall navy panel at the right of the stage (not a single-line pill, because it has four lines), built line by line in sync with the voice-over: BL-1002 line (03:15), BL-1004 line (03:27), BL-1005 line (03:35), BL-1007 line (03:40, its $2,646.00 turns amber). At 03:51 a small calculator icon pops in under the panel. The matching table row highlights as each line appears. | Callout at 03:51: "Always check an agent's maths with a calculator"
18. 03:59-04:00 | END card. | END

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
00:00 Now we need to throw away the healthy products and keep only the low ones. For that we use a Filter node. Think of it as a sieve: only the rows that match your rule fall through.
00:19 I drag "quantity on hand" from the left into the first box. Operator: Number, is less than. And I drag the reorder point into the second box. In plain English: keep this product if what we have is less than the reorder point. That's the same as an Excel formula, equals on-hand less-than reorder-point.
00:47 And one more condition: the reorder point must be greater than zero. That stops Stocky from ordering products that have no rule yet. Small safety habits like this add up.
01:02 Execute. Four items kept, six discarded. Exactly the four we expected. Now, you could also use an IF node here, which has a true and a false exit. But we don't need to do anything with the healthy products, so a Filter is simpler.
01:25 Next, the maths. We use an Edit Fields node and call it "Calculate Order". It's like adding new columns to a spreadsheet. And switch on "Include Other Input Fields" so we keep the product name and SKU alongside our new columns.
01:46 Let me explain our ordering rule, because it's deliberately simple. Suggested order equals reorder point times two, minus what's on hand. Think of it as "fill the shelf back up to twice the reorder point." For Pallet Jack Wheels, the reorder point is 25. Twice that is 50. We have 18. So we order 32. That's it. Is it perfect? No. It ignores pack sizes, minimum order quantities and seasonal demand. But it's predictable, and in week one, predictable beats clever.
02:32 Add a field. Name it suggested underscore qty, type Number. In the value box I'm typing a formula. It looks technical, but read it out loud: reorder point, times two, minus quantity on hand. The curly brackets just tell n8n "this is a formula, not plain text", like the equals sign in Excel. You can copy it from the activity file.
03:03 Second field: order underscore value. That's the suggested quantity times the unit cost. The money.
03:11 Execute. Shipping boxes: 1,500 times two is 3,000, minus 1,180, so 1,820 boxes at 85 cents, one thousand five hundred and forty-seven dollars. Safety gloves: 1,200 minus 420 is 780 pairs, one thousand eight hundred and seventy-two dollars. Pallet Jack Wheels: 32 sets, one thousand two hundred and sixteen dollars. And Hydraulic Oil: 40 times two is 80, minus 31, so 49 drums at 54 dollars, that's two thousand six hundred and forty-six dollars. Check my maths with a calculator.

CHECKLIST
- Total duration exactly 4:00 (240 s); END card in the final second; code organised by scene.
- Filter conditions, both formulas and all four results (1,820 / 780 / 32 / 49 and $1,547.00 / $1,872.00 / $1,216.00 / $2,646.00) match the DATA block exactly.
- The explainer slide shows 25 × 2 = 50 and 50 − 18 = 32 with the shelf animation.
- The four-line ON-SCREEN TEXT panel builds line by line and stays readable until 03:59.
- Start button, Pause/Restart, progress bar work; callouts never cover the values; nothing overflows the 1920x1080 stage.
```

**After Claude builds it:** Preview the explainer slide (01:46–02:32) and the final four-line panel (03:15–03:59), as they carry the maths; ask Claude to enlarge the numbers if needed. If one scene feels slow, ask Claude to change only that scene's function and keep the total at 4:00. Trim the Start click.

---

## Prompt 4 of 6: Step 3: Finding the Supplier and Letting Stocky Write the Request (14:30–17:30, 3 min 0 s)

**What this demo shows:** finding a vendor ID in Odoo Contacts, the Supplier Map tab in Google Sheets, a Google Sheets lookup node, and an AI Agent ("Stocky Writes Request") whose system message includes the sanity-check guardrail.

### Copy this prompt into Claude:

```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. The demo recreates, in a simplified look-alike style, an Odoo-style ERP (Contacts), a Google Sheets-style spreadsheet and an n8n-style workflow builder. It teaches beginners how to find the supplier's ID in the ERP, look up the supplier for each low product (like a VLOOKUP), and let an AI agent write a short approval request with a built-in sanity check.

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

SECTION LENGTH: exactly 3:00 (180 seconds), including the 1-second END card.

APP LOOK
- Browser frame with three tabs: "Contacts - Odoo" (URL "https://brightleaf.odoo.com/odoo/contacts", which becomes "https://brightleaf.odoo.com/odoo/contacts/14" when Global Lift Parts is open), "BrightLeaf - Google Sheets" (URL "https://docs.google.com/spreadsheets/d/brightleaf"), and "Stocky – Morning Reorder - n8n" (URL "https://brightleaf.app.n8n.cloud/workflow/stocky-morning-reorder").
- Odoo-style ERP: purple-ish top bar (#714B67) with "Contacts"; kanban cards for contacts (company icon, name, city/country); a contact form with the company name as a big title, address fields and tabs "Contacts & Addresses | Sales & Purchase | Accounting".
- Google Sheets-style spreadsheet: green accent, a formula bar, column letters A, B, C, row numbers, bold header row, and sheet tabs at the bottom ("Products", "Suppliers", "Supplier Map"); the active tab is white with a green underline.
- n8n-style canvas (dark grey dotted #2B2D31) that starts with: Every Morning 8am -> Get Stock from Odoo -> Below Reorder Point -> Calculate Order. New nodes are added to the right: Find Supplier (green table icon) and Stocky Writes Request (wide rounded rectangle with a robot icon, sub-ports "Chat Model*", "Memory", "Tool" on its bottom edge; the "Anthropic Chat Model" circle attaches under Chat Model with a dashed line).
- Node settings modal with three columns: INPUT (left, with collapsible headers per earlier node: "Calculate Order", "Find Supplier", each listing draggable field pills), Parameters (middle), OUTPUT (right, orange "Execute step" button, Table/JSON switch). Expression fields show dragged values as green chips like {{ $json.name }}.

DATA TO SHOW (use exactly)
Odoo Contacts kanban (6 supplier cards): Apex Fasteners - Columbus, OH, USA; PackRight Industries - Chicago, IL, USA; SafeHands Co. - Monterrey, Mexico; Global Lift Parts - Shenzhen, China; Shenzhen BrightTech - Shenzhen, China; Gulf Lubricants - Dubai, UAE.
Contact form: Global Lift Parts, Shenzhen, China. Address bar ends in /odoo/contacts/14.
Google Sheet "BrightLeaf", tab "Supplier Map", columns A: SKU | B: Supplier | C: Odoo Vendor ID:
  BL-1001 | Apex Fasteners | 11
  BL-1002 | PackRight Industries | 12
  BL-1003 | PackRight Industries | 12
  BL-1004 | SafeHands Co. | 13
  BL-1005 | Global Lift Parts | 14
  BL-1006 | PackRight Industries | 12
  BL-1007 | Gulf Lubricants | 15
  BL-1008 | Shenzhen BrightTech | 16
  BL-1009 | Apex Fasteners | 11
  BL-1010 | Global Lift Parts | 14
(The IDs 12, 13, 14, 15 come from the script; 11 and 16 are example IDs for the two suppliers not used today.)
Google Sheets node: action "Get row(s) in sheet"; Document: BrightLeaf; Sheet: Supplier Map; Filters -> Column: SKU, Value: {{ $json.default_code }} (dragged). Renamed: Find Supplier. Output after Execute step, 4 rows:
  BL-1002 | PackRight Industries | 12
  BL-1004 | SafeHands Co. | 13
  BL-1005 | Global Lift Parts | 14
  BL-1007 | Gulf Lubricants | 15
AI Agent renamed: Stocky Writes Request. Chat Model: Anthropic Chat Model, credential "Anthropic – BrightLeaf". Source for Prompt (User Message): Define below.
Prompt (User Message), with the {{ }} parts appearing as green dragged chips:
Write an approval request for Sarah about this reorder.
Product: {{ name }} ({{ SKU }})
On hand: {{ qty_available }} | Reorder point: {{ reordering_min_qty }}
Suggested order: {{ suggested_qty }} units at ${{ standard_price }} = ${{ order_value }}
Supplier: {{ Supplier }}
Options -> System Message:
You are Stocky, BrightLeaf Supplies' procurement assistant.
Write a short approval email body (max 5 sentences).
Line 1: "Approval needed: [qty] x [product] from [supplier] ($[value])."
Then explain in plain English why: on hand vs reorder point.
SANITY CHECK: if the suggested quantity is more than 3 times the
reorder point, or the order value is over $5,000, start with
"CHECK THIS FIRST:" and say what looks unusual.
Never say the order is placed. It is only a draft request.
Execute step -> OUTPUT "4 items"; the item shown (BL-1007), field "output":
"Approval needed: 49 x Hydraulic Oil 20L from Gulf Lubricants ($2,646.00). We have 31 drums on hand against a reorder point of 40, so we're below our safety line. With a 14-day lead time from Dubai, ordering today keeps the forklifts running into next month. This creates a draft RFQ only; nothing is sent to the supplier until you confirm it in Odoo."

TIMELINE (scene by scene; times relative to section start)
1. 00:00-00:05 | Odoo Contacts kanban with the six supplier cards. Cursor clicks "Global Lift Parts". | -
2. 00:05-00:12 | The contact form opens (Global Lift Parts, Shenzhen, China). | Callout: "Odoo identifies suppliers by a number - like a badge number"
3. 00:12-00:22 | Zoom 1.6x on the URL bar; the "14" at the end of "/odoo/contacts/14" gets a yellow circle. | Callout: "Vendor ID = 14"
4. 00:22-00:30 | Zoom out; hold. | Small callout: "Yours will be different - that's fine"
5. 00:30-00:36 | Cursor clicks the Google Sheets tab; then clicks the "Supplier Map" sheet tab at the bottom. | -
6. 00:36-00:53 | The Supplier Map sheet with 10 rows; the header row highlights, then column C highlights. A small "5 minutes, typed once" tag appears. | Callout: "Our 'who do we buy this from' lookup table"
7. 00:53-01:00 | Cursor clicks the n8n tab; clicks "+" after "Calculate Order"; types "Google Sheets"; picks the action "Get row(s) in sheet". | -
8. 01:00-01:12 | Modal: Document -> "BrightLeaf"; Sheet -> "Supplier Map"; Filters -> Column "SKU"; cursor drags "default_code" from INPUT into Value (green chip). | -
9. 01:12-01:19 | Cursor renames the node "Find Supplier". A tiny spreadsheet formula chip "=VLOOKUP(SKU, Supplier Map, ...)" floats beside the filter. | Callout: "For each low product: look up its row, like a VLOOKUP"
10. 01:19-01:24 | Cursor clicks "Execute step"; OUTPUT shows the 4 rows. | Green callout: "4 suppliers found"
11. 01:24-01:32 | Modal closes. Cursor clicks "+"; types "AI Agent"; clicks it; the node appears; cursor renames it "Stocky Writes Request". | -
12. 01:32-01:39 | Cursor clicks "+" under "Chat Model*" -> "Anthropic Chat Model"; credential "Anthropic – BrightLeaf"; the brain sub-node attaches. | Callout: "The intern's brain, just like Video 6"
13. 01:39-01:44 | Agent modal: "Source for Prompt (User Message)" dropdown -> "Define below". | Callout: "No chat box this time"
14. 01:44-02:08 | Prompt field: the first line types in; then for each fact the cursor scrolls the INPUT panel to "Calculate Order" or "Find Supplier" and drags a pill into place (name, SKU, qty_available, reordering_min_qty, suggested_qty, standard_price, order_value, Supplier), ~2.5 s per drag, with the static text between the chips typing in. | Callout on the INPUT headers: "Scroll up to earlier steps and drag the values in"
15. 02:08-02:16 | Cursor clicks "Add Option" -> "System Message"; an editor appears. | -
16. 02:16-02:30 | The system message appears line by line (fast typing, ~2 s per line for the first four lines). "max 5 sentences" and "Approval needed" get light highlights. | -
17. 02:30-02:40 | The three SANITY CHECK lines appear with an amber band. A small side card: a glove icon with "600 pairs -> 6,000 pairs?" and an amber "CHECK THIS FIRST" stamp. | Amber callout: "Guardrail 3: the sanity check - would have caught the glove disaster"
18. 02:40-02:44 | The last line "Never say the order is placed. It is only a draft request." appears and gets a highlight. | -
19. 02:44-02:50 | Cursor clicks "Execute step"; the agent spinner turns; OUTPUT shows "4 items" with the BL-1007 item open and its "output" text. | -
20. 02:50-02:59 | Zoom 1.4x on the output; "14-day lead time from Dubai" gets a yellow highlight. | Callout: "The formula did the maths, the brain did the explaining"
21. 02:59-03:00 | END card. | END

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
00:00 To create an RFQ, Odoo needs to know which supplier, and it identifies suppliers by a number, like an employee badge number. Here's how to find it, no tech needed. Open Contacts, click Global Lift Parts, and look at the address bar. The number at the end, 14 in my case, is the vendor ID. Yours will be different, and that's fine.
00:30 I've added a small tab to our Google Sheet database from Video 4. It's called Supplier Map. Three columns: SKU, Supplier, and the Odoo Vendor ID. Ten rows, typed once. It took me five minutes. This is our "who do we buy this from" lookup table.
00:53 In n8n, add a Google Sheets node, and choose "Get rows in sheet". Pick our BrightLeaf document and the Supplier Map tab. Under Filters, choose the column SKU, and for the value, drag in the SKU from the left. So for each low product, n8n looks up its row, exactly like a VLOOKUP.
01:19 Execute. Four suppliers found. Lovely.
01:24 Now Stocky joins the party. Add an AI Agent node, call it "Stocky Writes Request", and plug in the Claude chat model, the intern's brain, just like in Video 6. This time there's no chat box, so set "Source for Prompt" to "Define below".
01:44 In the prompt, I write a short brief and drag in the facts: product, SKU, on hand, reorder point, suggested quantity, unit cost, order value and supplier. To grab values from earlier steps, scroll up in the left panel to "Calculate Order" or "Find Supplier" and just drag them in.
02:08 And in the system message, the rulebook. You are Stocky. Keep it to five sentences. Start with "Approval needed". Explain why. And here's guardrail three, the sanity check. If the quantity is more than three times the reorder point, or the value is over five thousand dollars, start with "CHECK THIS FIRST" and say what looks odd. That alone would have caught the glove disaster. Last line: never say the order is placed.
02:44 Look at that. Clear, polite, and it even mentioned the 14-day lead time on its own. That's the agent part: the formula did the maths, and the brain did the explaining.

CHECKLIST
- Total duration exactly 3:00 (180 s); END card in the final second.
- Vendor ID 14 is clearly shown in the URL; the Supplier Map and the Find Supplier output match the DATA block.
- The prompt, the system message and Stocky's BL-1007 output match the DATA block word for word.
- The SANITY CHECK lines are visually distinct (amber).
- Start button, Pause/Restart, progress bar work; nothing overflows the 1920x1080 stage.
```

**After Claude builds it:** Scene 14 (dragging eight values into the prompt) is busy; if it looks rushed, ask Claude to drag only the first four and have the rest appear in one smooth fill, keeping the same timing. Make sure the "14" in the URL is big enough to read when zoomed. Trim the Start click.

---

## Prompt 5 of 6: Step 4: Mr. Harrison's Rule and the Approval Email (17:30–20:15, 2 min 45 s)

**What this demo shows:** an IF node for the $2,000 rule, two "Send message and wait for response" Gmail nodes (Mr. Harrison and Sarah), a full run that pauses, and the approval emails being approved or rejected in two inboxes.

### Copy this prompt into Claude:

```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. The demo recreates, in a simplified look-alike style, an n8n-style workflow builder and a Gmail-style inbox. It teaches beginners how to add an approval rule (orders over $2,000 go to the operations director, Mr. Harrison; the rest go to Sarah, the procurement manager) and "human-in-the-loop": an email with Approve / Reject buttons that pauses the workflow until a person clicks.

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

SECTION LENGTH: exactly 2:45 (165 seconds), including the 1-second END card.

APP LOOK
- Browser frame with three tabs: "Stocky – Morning Reorder - n8n" (URL "https://brightleaf.app.n8n.cloud/workflow/stocky-morning-reorder"), "Inbox - harrison@brightleaf.example" and "Inbox - sarah@brightleaf.example" (Gmail-style URLs "https://mail.google.com/mail/u/1/#inbox" and ".../u/0/#inbox").
- n8n-style canvas (dark grey dotted #2B2D31), zoomed so the right part is visible: ... Calculate Order -> Find Supplier -> Stocky Writes Request (robot icon, with the Anthropic Chat Model sub-node). New nodes go to the right: the IF node "Over $2,000?" drawn as a diamond with two exits labelled "true" (upper) and "false" (lower); the Gmail nodes "Ask Mr. Harrison" (upper) and "Ask Sarah" (lower) as rounded squares with an envelope icon.
- Running state: completed nodes get a green tick and a small item count on the outgoing line ("4 items", "1 item", "3 items"); waiting Gmail nodes show a slowly spinning amber ring and a label "Waiting".
- Node settings modal (centred, three columns INPUT / Parameters / OUTPUT) with dropdowns, text inputs, expression chips (green) and an "Add option" button.
- Gmail-style inbox: left sidebar (Compose, Inbox count), email list (sender "Stocky (n8n)", subject in bold if unread, time "8:00 AM"), and an open email view with the subject as title, the body text, and two large buttons below: green "Approve draft RFQ" and red "Reject". After a click, a simple confirmation page/toast appears: "Thanks! Your response has been recorded." (green for approve, grey for reject).

DATA TO SHOW (use exactly)
IF node renamed: Over $2,000?   Condition: {{ $('Calculate Order').item.json.order_value }}  Number -> is greater than  2000
Gmail node (true exit): action "Send message and wait for response"; renamed: Ask Mr. Harrison
- To: harrison@brightleaf.example
- Subject: Approval needed: {{ name }} – ${{ order_value }}
- Message: {{ $('Stocky Writes Request').item.json.output }} (dragged as a chip named "output")
- Response Type: Approval
- Approval Options -> Type of Approval: Approve and Disapprove; Approve Button Label: Approve draft RFQ; Disapprove Button Label: Reject
- Options -> Add option -> Limit Wait Time: Limit Type "After Time Interval", Amount 1, Unit "Days"
Duplicate connected to the false exit, renamed: Ask Sarah; To: sarah@brightleaf.example
Run result: IF -> true: 1 item (Hydraulic Oil 20L); false: 3 items.
Mr. Harrison's email:
- Subject: Approval needed: Hydraulic Oil 20L – $2,646
- Body: "Approval needed: 49 x Hydraulic Oil 20L from Gulf Lubricants ($2,646.00). We have 31 drums on hand against a reorder point of 40, so we're below our safety line. With a 14-day lead time from Dubai, ordering today keeps the forklifts running into next month. This creates a draft RFQ only; nothing is sent to the supplier until you confirm it in Odoo."
Sarah's three emails (subjects; bodies start with the line shown, followed by one short sentence in the same style):
- Approval needed: Corrugated Shipping Box 18x12x10 – $1,547 / "Approval needed: 1,820 x Corrugated Shipping Box 18x12x10 from PackRight Industries ($1,547.00). We have 1,180 on hand against a reorder point of 1,500."
- Approval needed: Industrial Safety Gloves (pair) – $1,872 / "Approval needed: 780 x Industrial Safety Gloves (pair) from SafeHands Co. ($1,872.00). We have 420 pairs on hand against a reorder point of 600."
- Approval needed: Pallet Jack Wheels (set) – $1,216 / "Approval needed: 32 x Pallet Jack Wheels (set) from Global Lift Parts ($1,216.00). We have 18 sets on hand against a reorder point of 25."
Sarah's context note (a small sticky note): "500 pairs arriving Thursday from SafeHands (open order)"
ON-SCREEN TEXT: The human adds context the ERP doesn't have.

TIMELINE (scene by scene; times relative to section start)
1. 00:00-00:06 | Canvas. Cursor clicks "+" after "Stocky Writes Request"; types "If"; clicks "If". The diamond node appears; cursor renames it "Over $2,000?". | -
2. 00:06-00:20 | Modal: cursor scrolls INPUT to "Calculate Order" and drags "order_value" into value 1; operator Number -> "is greater than"; types 2000. | Callout: "Guardrail 2: Mr. Harrison's rule"
3. 00:20-00:30 | Modal closes; on the diamond, the "true" exit glows with a tag "big order -> Mr. Harrison" and the "false" exit glows with "Sarah can approve". | Callout: "BrightLeaf's real approval policy, written as a block"
4. 00:30-00:38 | Cursor clicks "+" on the true exit; types "Gmail"; the Actions list shows; zoom 1.4x on "Send message and wait for response"; click. | -
5. 00:38-00:53 | The node appears and is renamed "Ask Mr. Harrison"; a small hourglass badge appears on it. A friendly illustration slides in beside the canvas: a check on a manager's desk with a "Waiting for signature" tag. | Callout: "Human-in-the-loop in one block: the workflow pauses until someone clicks"
6. 00:53-01:21 | Fields fill in sequence (~3-4 s each): To; Subject (typed, with chips for name and order_value); Message (drag "output" from "Stocky Writes Request"); Response Type "Approval"; Type of Approval "Approve and Disapprove"; Approve Button Label typed "Approve draft RFQ"; Disapprove Button Label typed "Reject". A live mini-preview of the two buttons (green / red) appears under the fields. At 01:14 zoom 1.5x on the word "draft" in the button label. | Callout at 01:14: "Words matter: nobody should think they're spending money with this click"
7. 01:21-01:34 | Zoom out. Cursor clicks "Add option" -> "Limit Wait Time"; sets "After Time Interval", 1, "Days". | Callout: "In procurement, silence should never mean yes"
8. 01:34-01:45 | Modal closes. Cursor right-clicks "Ask Mr. Harrison" -> "Duplicate"; drags the copy below; draws a connection from the "false" exit to it; renames it "Ask Sarah"; a quick modal edit changes To to sarah@brightleaf.example. | Callout: "Same email, different approver"
9. 01:45-02:00 | Cursor clicks "Execute workflow" (bottom centre). Green ticks march node by node from "Every Morning 8am" to "Stocky Writes Request" (with item counts on the lines), then the diamond splits: "1 item" to Ask Mr. Harrison, "3 items" to Ask Sarah; both Gmail nodes show the amber spinning ring and "Waiting". | Callout: "The recipe is paused, waiting for people"
10. 02:00-02:16 | Cursor clicks the Harrison inbox tab; one unread email "Approval needed: Hydraulic Oil 20L – $2,646"; cursor opens it; the body and the two buttons show. At 02:11 cursor clicks "Approve draft RFQ"; green confirmation "Thanks! Your response has been recorded." | Callout on the subject: "$2,646 = over $2,000 -> Mr. Harrison"
11. 02:16-02:36 | Cursor clicks Sarah's inbox tab; three unread emails. Cursor opens Corrugated Shipping Box and clicks Approve (02:18-02:24); opens Pallet Jack Wheels and clicks Approve (02:24-02:30); opens Industrial Safety Gloves: the sticky note "500 pairs arriving Thursday from SafeHands (open order)" pops in beside the email, then cursor clicks "Reject" (02:30-02:36). In the list, two emails get green "Approved" tags and one a red "Rejected" tag. | Callout at 02:31: "Sarah knows something the system doesn't"
12. 02:36-02:44 | Hold on Sarah's inbox with the three tags. | ON-SCREEN TEXT lower-third from 02:38 to 02:43: "The human adds context the ERP doesn't have."
13. 02:44-02:45 | END card. | END

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
00:00 Now, guardrail two. Add an IF node and call it "Over two thousand dollars?". Drag in order value from the Calculate Order step, "is greater than", two thousand. This diamond has two exits. True means "big order, go to Mr. Harrison". False means "Sarah can approve this herself". This is BrightLeaf's real approval policy, just written as a block.
00:30 From the true exit, add a Gmail node and choose this special action: "Send message and wait for response". This is human-in-the-loop in one block. The email goes out, and the whole workflow pauses, like a check sitting on the manager's desk, until somebody clicks a button.
00:53 To: Mr. Harrison. Subject: "Approval needed", plus the product and value. Message: drag in the text Stocky just wrote. Response type: Approval. Type of approval: Approve and Disapprove. I'll label the buttons "Approve draft RFQ" and "Reject". Notice the word "draft" on the button. Words matter. Nobody should think they're spending money with this click.
01:21 Then one more option: Limit Wait Time, one day. If nobody answers in 24 hours, the request expires. In procurement, silence should never mean yes.
01:34 Duplicate that node, connect the copy to the false exit, call it "Ask Sarah", and change the email address. Same email, different approver.
01:45 Let's run the whole thing. Execute workflow. Watch the canvas. Green ticks march along, and then the email nodes say "waiting". The recipe is paused, waiting for people.
02:00 Here's Mr. Harrison's inbox. The Hydraulic Oil request, two thousand six hundred and forty-six dollars, with Stocky's explanation and two big buttons. He reads it in ten seconds and clicks "Approve draft RFQ".
02:16 Sarah got three emails. Shipping boxes and Pallet Jack Wheels: she approves both. Safety gloves: she rejects. Why? Because she knows there are 500 pairs arriving from SafeHands on Thursday on an open order. Stocky didn't know that. This, right here, is why the human stays in the loop. Sarah knows things the system doesn't.

CHECKLIST
- Total duration exactly 2:45 (165 s); END card in the final second.
- The IF condition (order_value > 2000), button labels "Approve draft RFQ" / "Reject" and Limit Wait Time 1 day match the DATA block.
- The run clearly shows 1 item going to Ask Mr. Harrison and 3 items going to Ask Sarah, both "Waiting".
- Email subjects and amounts match exactly ($2,646 / $1,547 / $1,872 / $1,216); approvals: Oil, Boxes, Wheels approved; Gloves rejected.
- ON-SCREEN TEXT appears for 5 s; Start button, Pause/Restart, progress bar work; nothing overflows the 1920x1080 stage.
```

**After Claude builds it:** Check that the "Waiting" state (01:45–02:00) is obvious; ask for a stronger amber pulse if needed. The reject moment on the gloves is the emotional beat of this section, so make sure the sticky note is readable before the click. Trim the Start click.

---

## Prompt 6 of 6: Step 5: Creating the Draft RFQ in Odoo and Confirming Back (20:15–23:15, 3 min 0 s)

**What this demo shows:** an "Approved?" IF node, two Odoo create nodes (purchase.order header and purchase.order.line), a confirmation email, the three new draft RFQs in Odoo, the untouched Confirm Order button, and activating the workflow.

### Copy this prompt into Claude:

```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. The demo recreates, in a simplified look-alike style, an n8n-style workflow builder, an Odoo-style ERP (Purchase app) and a Gmail-style inbox. It teaches beginners how an approved request becomes a DRAFT request for quotation (RFQ) in the ERP, with a header and a product line, how the agent confirms back by email, and why the final "Confirm Order" (committing money) stays a human job.

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

SECTION LENGTH: exactly 3:00 (180 seconds), including the 1-second END card.

APP LOOK
- Browser frame with three tabs: "Stocky – Morning Reorder - n8n" (URL "https://brightleaf.app.n8n.cloud/workflow/stocky-morning-reorder"), "Inbox - sarah@brightleaf.example" (URL "https://mail.google.com/mail/u/0/#inbox"), "Requests for Quotation - Odoo" (URL "https://brightleaf.odoo.com/odoo/purchase").
- n8n-style canvas (dark grey dotted #2B2D31), zoomed on the right part: Stocky Writes Request -> Over $2,000? (diamond) -> Ask Mr. Harrison (upper) / Ask Sarah (lower), both envelope nodes. New nodes to the right: "Approved?" (diamond with true/false exits), "Create Draft RFQ" (database icon), "Add Product Line" (database icon), "Confirm to Sarah" (envelope icon). Top-right of the editor: an "Inactive" toggle (grey) that becomes "Active" (green).
- Node settings modal with three columns INPUT / Parameters / OUTPUT; expression fields show dragged values as green chips; the "Fields" section has an "Add Field" button with rows "Field Name" + "Value".
- Odoo-style Purchase app: purple-ish top bar (#714B67) with "Purchase" and menus "Orders, Products, Reporting, Configuration"; "Orders" menu opens "Requests for Quotation, Purchase Orders"; list view columns: Reference | Vendor | Source Document | Total | Status. Status pill "RFQ" in grey-blue. Form view: status bar at the top-right "RFQ > RFQ Sent > Purchase Order" with RFQ active, buttons at the top-left "Send by Email", "Print RFQ", "Confirm Order" (purple), fields Vendor, Source Document, Order Deadline, and an order-lines table (Product | Quantity | Unit Price | Subtotal).
- Gmail-style inbox: list of emails from "Stocky (n8n)".

DATA TO SHOW (use exactly)
- Small JSON card received after a button click: { "data": { "approved": true } } (and a faded second card with false).
- IF node renamed: Approved?   Condition: {{ $json.data.approved }}  Boolean -> is true. False exit leads nowhere (a small grey stop sign).
- Odoo node: action "Create a custom resource"; renamed: Create Draft RFQ; Custom Resource Name: search "purchase.order" -> "Purchase Order (purchase.order)". Fields:
  partner_id = {{ $('Find Supplier').item.json['Odoo Vendor ID'] }}
  origin = Stocky – approved by email
- Illustration card: "RFQ (draft)" -> [Confirm] -> "Purchase Order": "Same form. Different status."
- Odoo node: "Create a custom resource" -> "Purchase Order Line (purchase.order.line)"; renamed: Add Product Line. Fields:
  order_id = {{ $json.id }}
  product_id = {{ $('Get Stock from Odoo').item.json.id }}
  product_qty = {{ $('Calculate Order').item.json.suggested_qty }}
- Paper-form illustration: a header strip "Vendor: Global Lift Parts / Source: Stocky – approved by email" and a line row "Pallet Jack Wheels (set) x 32".
- Gmail node: action "Send a message"; renamed: Confirm to Sarah; To: sarah@brightleaf.example; Subject: Draft RFQ created: {{ name }}; Message: Done. Draft RFQ #{{ order id }} created in Odoo for {{ suggested_qty }} x {{ name }} from {{ Supplier }}. It is a DRAFT. Review it in Purchase → Requests for Quotation, then send it to the supplier yourself.
- Sarah's inbox after the run: three emails "Draft RFQ created: Corrugated Shipping Box 18x12x10", "Draft RFQ created: Pallet Jack Wheels (set)", "Draft RFQ created: Hydraulic Oil 20L".
- Odoo Requests for Quotation list (new rows; references are examples):
  P00028 | PackRight Industries | Stocky – approved by email | $1,547.00 | RFQ   (line: 1,820 x Corrugated Shipping Box 18x12x10)
  P00029 | Global Lift Parts | Stocky – approved by email | $1,216.00 | RFQ   (line: 32 x Pallet Jack Wheels (set))
  P00030 | Gulf Lubricants | Stocky – approved by email | $2,646.00 | RFQ   (line: 49 x Hydraulic Oil 20L)
  No SafeHands Co. / safety gloves row.
- Opened RFQ: P00030, Vendor Gulf Lubricants, Source Document "Stocky – approved by email", line Hydraulic Oil 20L | 49 | 54.00 | $2,646.00.
- Time-saved card: "Before: ~25 minutes every morning -> Now: ~40 seconds of reading and clicking".

TIMELINE (scene by scene; times relative to section start)
1. 00:00-00:08 | Canvas. Cursor adds an "If" node to the right of the two email nodes, renames it "Approved?", and drags connections from both "Ask Mr. Harrison" and "Ask Sarah" into it (two lines merge). | -
2. 00:08-00:18 | The JSON card { "data": { "approved": true } } floats in along the connection. In the modal, cursor drags "data -> approved" into value 1 and chooses Boolean -> "is true". | Callout on the JSON card: "A little labelled shopping list: approved true or false"
3. 00:18-00:27 | Modal closes; the false exit shows a small grey stop sign. | Callout: "Rejected or expired? It simply stops. (We'll log these next video.)"
4. 00:27-00:35 | Cursor clicks "+" on the true exit; types "Odoo"; chooses "Create a custom resource"; renames the node "Create Draft RFQ". An amber band appears behind it with an "AMBER = draft" tag. | -
5. 00:35-00:45 | Custom Resource Name: typing "purchase.order"; option "Purchase Order (purchase.order)" is clicked. | -
6. 00:45-00:56 | The illustration card slides in at the top: "RFQ (draft)" -> [Confirm] -> "Purchase Order". | Callout: "Same form. It's an RFQ until a human clicks Confirm."
7. 00:56-01:05 | Card fades. Cursor clicks "Add Field": Field Name "partner_id"; drags "Odoo Vendor ID" from the "Find Supplier" section of INPUT into Value (green chip). | -
8. 01:05-01:12 | "Add Field": Field Name "origin"; typing "Stocky – approved by email". | Callout: "Our paper trail"
9. 01:12-01:20 | Modal closes. Cursor adds another Odoo node -> "Create a custom resource" -> "Purchase Order Line (purchase.order.line)"; renames it "Add Product Line". | -
10. 01:20-01:30 | The paper-form illustration appears beside the canvas: the header strip lights up (pointing to "Create Draft RFQ"), then the line row lights up (pointing to "Add Product Line"). | Callout: "Header = who we buy from. Lines = what we buy."
11. 01:30-01:48 | Modal: three fields fill in one by one (~5 s each): order_id = {{ $json.id }}; product_id = {{ $('Get Stock from Odoo').item.json.id }}; product_qty = {{ $('Calculate Order').item.json.suggested_qty }}. | Callout at 01:43: "Odoo fills in the description and vendor price by itself"
12. 01:48-02:05 | Modal closes. Cursor adds a Gmail node -> "Send a message"; renames it "Confirm to Sarah"; To, Subject and Message fill in (Message pastes in at once). A small envelope icon flies back along a curved arrow to the left. | Callout: "Stocky always closes the loop"
13. 02:05-02:09 | Quick montage with a small "fast-forward x4" badge: cursor clicks "Execute workflow", ticks march, a mini inbox flashes with approve clicks, then every node to "Confirm to Sarah" shows a green tick; Sarah's inbox flashes three "Draft RFQ created" emails. | -
14. 02:09-02:13 | Cursor clicks the Odoo tab; clicks "Orders" -> "Requests for Quotation". | -
15. 02:13-02:22 | The list shows the three new rows, each sliding in; the PackRight, Global Lift Parts and Gulf Lubricants rows highlight in sync with the voice-over; the "RFQ" status pills glow. | Callout: "Status: RFQ. Not confirmed. Not sent. And no gloves - Sarah said no."
16. 02:22-02:30 | Cursor opens P00030 (Gulf Lubricants); zoom 1.4x on Source Document "Stocky – approved by email". | -
17. 02:30-02:46 | Zoom out. Cursor glides to the purple "Confirm Order" button and hovers WITHOUT clicking; a red glow and a red "RED = commit" tag appear around it; the cursor moves away. At 02:38 the time-saved card slides in at the bottom-right. | Red callout: "That stays Sarah's job. Stocky prepares, Sarah signs."
18. 02:46-02:59 | Cursor clicks the n8n tab; clicks the "Inactive" toggle at the top-right; it slides to green "Active"; a toast "Workflow activated - next run tomorrow at 8:00 AM (America/New_York)". | Callout: "From tomorrow, 8am, it runs by itself"
19. 02:59-03:00 | END card. | END

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
00:00 Back in n8n. Both email nodes now connect into one IF node called "Approved?". When someone clicks a button, n8n receives a little labelled shopping list that says approved: true or approved: false. Our condition: approved is true. Rejected or expired requests go out the false exit and simply stop. Next video, we'll log those too.
00:27 Now, finally, the amber step. Add an Odoo node, action "Create a custom resource", and pick Purchase Order. In Odoo, a purchase order and an RFQ are the same form. It's called an RFQ while it's a draft, and becomes a purchase order only when a human clicks Confirm. Two fields. Vendor, which Odoo calls partner underscore id: drag in the Odoo Vendor ID from "Find Supplier". And Source Document, called origin, where I type "Stocky, approved by email". That's our paper trail.
01:12 A purchase order is like a paper form with a header, who we're buying from, and lines, what we're buying. The first node made the header. This second Odoo node adds the line. Pick Purchase Order Line. Order ID is the number Odoo just gave us back. Product ID comes from "Get Stock from Odoo". And product quantity is our suggested quantity. Odoo fills in the description and the vendor price by itself.
01:48 Last block: a confirmation email back to Sarah. "Done. Draft RFQ created for this quantity, from this supplier. It's a draft. Review it in Odoo and send it yourself." Stocky always closes the loop.
02:05 Let's check Odoo. Purchase, Requests for Quotation. There they are. PackRight, 1,820 boxes. Global Lift Parts, 32 Pallet Jack Wheels. Gulf Lubricants, 49 drums of hydraulic oil, the one Mr. Harrison approved. Status: RFQ. Not confirmed. Not sent. Source document: "Stocky, approved by email". And no safety gloves, because Sarah said no.
02:30 And see this "Confirm Order" button? That's red. That stays Sarah's job. Stocky prepares, Sarah signs. What used to take her twenty-five minutes every morning now takes about forty seconds of reading and clicking.
02:46 Last thing: switch the workflow on with the Active toggle, or the Publish button in newer versions of n8n. From tomorrow, 8am, it runs by itself.

CHECKLIST
- Total duration exactly 3:00 (180 s); END card in the final second.
- Node names, field names and expressions match the DATA block exactly (partner_id, origin, order_id, product_id, product_qty).
- Odoo shows exactly three RFQs (PackRight $1,547.00, Global Lift Parts $1,216.00, Gulf Lubricants $2,646.00), all with status RFQ, and no safety gloves.
- The cursor never clicks "Confirm Order".
- Start button, Pause/Restart, progress bar work; nothing overflows the 1920x1080 stage.
```

**After Claude builds it:** The fast-forward montage (02:05–02:09) is short on purpose, because the voice-over jumps straight to "Let's check Odoo"; don't let Claude stretch it. Check that the cursor clearly hovers but never clicks "Confirm Order". Trim the Start click.
