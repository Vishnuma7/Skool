# Video 1: Welcome: Why Your ERP Needs an AI Agent: Screen-Recording Prompts
**How to use:** 1. Open claude.ai, start a new chat, and paste ONE prompt. 2. Claude builds an animated demo you can preview. If anything looks wrong, reply in the same chat ("make the cursor slower", "the table is cut off"). 3. Open the demo full-screen in Chrome (press F11 / Ctrl+Cmd+F), start your screen recorder (QuickTime: File → New Screen Recording), then click **Start**. 4. Stop recording when the "END" card appears, trim the start and end, and add your voice-over from the script. Each demo runs for the same length as its script section, so the voice-over lines up.

<!-- VO NOTE START -->
**Voice-over (Fish Audio):** Under every prompt you'll find a grey **"Voice-over text for Fish Audio"** box. Copy that text into Fish Audio and download the audio. Best order: make the audio FIRST, check its length, and if it's longer or shorter than the section length, add one line to the prompt before sending it to Claude: *"Make the total duration exactly M:SS"* (your audio length). Claude's demo has no sound, so you join the audio and video in a video editor (CapCut, iMovie, Descript): put both on the timeline starting at 0:00.
<!-- VO NOTE END -->

**Sections in this video:**

| # | Section | Time | Length | Prompt |
|---|---|---|---|---|
| 1 | Meet Stocky: The Finished Agent in Action | 02:15–06:30 | 4 min 15 s | Prompt 1 |
| 2 | Chatbot vs Automation vs Agent | 08:00–12:00 | 4 min 0 s | Prompt 2 |
| 3 | The Five Parts of Every Agent | 13:45–16:00 | 2 min 15 s | Prompt 3 |
| 4 | Your Course Map and Toolkit | 16:00–18:00 | 2 min 0 s | Prompt 4 |

---

## Prompt 1 of 4: Meet Stocky: The Finished Agent in Action (02:15–06:30, 4 min 15 s)
**What this demo shows:** Stocky's Monday 7:00 AM email with 4 low-stock items and a Shenzhen risk warning, the n8n workflow behind it, the Google Sheets decision log, and four RFQs appearing in Odoo after Sarah clicks Approve.

### Copy this prompt into Claude:
```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. I will play it full-screen and screen-record it, then add my own voice-over. This section shows complete beginners the finished AI agent "Stocky" at a distributor called BrightLeaf Supplies (Columbus, Ohio): its Monday morning email, the no-code workflow behind it, its decision log and the purchase drafts it creates after a human approves. This section is longer than 4 minutes: organise the JavaScript by scene (one function or object per scene, with its start/end time at the top) so each scene is easy to tweak.

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

SECTION LENGTH: exactly 4:15 (255 seconds). The END card shows from 04:14 to 04:15.

APP LOOK (only these screens appear)
- Gmail-style inbox (browser frame, tab title "Inbox - Gmail", URL bar "mail.google.com/mail/u/0/#inbox"): left sidebar (Inbox bold with unread count, Starred, Sent), an email list with sender, bold subject for unread, a short preview and the time on the right. An open-email view with the subject as a large heading, sender line, and the body in a readable 24 px font. At the bottom of the email: two big buttons "Approve" (green #16A34A) and "Decline" (red #DC2626).
- A small clock badge in the top-right of the stage (outside the browser frame) reading "Monday 7:00 AM".
- n8n-style workflow canvas (browser frame, tab title "Stocky - n8n", URL bar "brightleaf.app.n8n.cloud/workflow/stocky"): dark grey dotted canvas; rounded-square nodes with an icon and label; grey connector lines; animated dots when data flows; finished nodes have a green check badge; an orange "Test workflow" button at the bottom centre; tabs "Editor | Executions" at the top centre.
- Google Sheets-style spreadsheet (browser frame, tab title "Stocky_Decision_Log - Google Sheets"): green accent, file name "Stocky_Decision_Log", formula bar, columns A-H, row numbers, a tab "Log" at the bottom; header row bold with a light green fill.
- Odoo-style ERP (browser frame, tab title "Requests for Quotation - Odoo", URL bar "brightleaf-supplies.odoo.com/odoo/purchase"): purple-ish top bar (#714B67) with the app name "Purchase" and menu items Orders, Products, Reporting, Configuration (Orders opens a dropdown with "Requests for Quotation" and "Purchase Orders"); breadcrumb "Requests for Quotation"; "New" button top-left; list view with checkbox column: Reference | Vendor | Order Deadline | Total | Status (status shown as a small grey-blue "RFQ" badge).
- All browser windows sit in one frame; switching apps = clicking the matching browser tab in the tab strip (tabs: Gmail, n8n, Google Sheets, Odoo).

DATA TO SHOW
- Email in the list: From "Stocky", received Monday 7:00 AM, unread, subject "Stocky: Monday Stock Check - 4 items need attention". Other read emails underneath (greyed): "PackRight Industries - Shipment confirmation", "Tom - Dock 2 schedule", "Mr. Harrison - Q4 planning".
- Email body (show exactly, line breaks as here):
  Good morning Sarah. I checked all 10 active products in Odoo at 6:55 AM. 4 are below their reorder point:
  1. BL-1002 Corrugated Shipping Box 18x12x10: 1,180 on hand, reorder point 1,500. Suggest 1,820 boxes from PackRight Industries (Chicago). Est. USD 1,547.
  2. BL-1004 Industrial Safety Gloves: 420 pairs on hand, reorder point 600. Suggest 780 pairs from SafeHands Co. (Monterrey). Est. USD 1,872.
  3. BL-1005 Pallet Jack Wheels: 18 on hand, reorder point 25. Suggest 32 sets from Global Lift Parts (Shenzhen). Est. USD 1,216. RISK: heavy rain forecast in Shenzhen this week and a public holiday in China next week. Lead time is already 21 days. Recommend ordering today.
  4. BL-1007 Hydraulic Oil 20L: 31 drums on hand, reorder point 40. Suggest 49 drums from Gulf Lubricants (Dubai). Est. USD 2,646.
  Total suggested spend: USD 7,281. Draft RFQs are ready in Odoo.
  [Approve] [Decline]
- n8n workflow nodes, left to right: "Schedule Trigger" (clock icon, subtitle "Every Monday 6:55 AM") > "Odoo" (subtitle "Get Many products") > "AI Agent" (robot icon, larger; a small sub-node "Anthropic Chat Model" attached underneath) > three stacked "HTTP Request" nodes labelled "Open-Meteo" (weather), "Frankfurter" (currency), "Nager.Date" (holidays) > "Google Sheets" (subtitle "Append Row") > "Gmail" (subtitle "Send and Wait for Response") > "Odoo" (subtitle "Create RFQ").
- Google Sheet "Stocky_Decision_Log", columns: Date | SKU | On Hand | Reorder Point | Action Suggested | Risk Notes | Approved By | Approved At. Rows (last week as sample history, then today):
  11/09/2026 | BL-1005 | 22 | 25 | Order 28 sets from Global Lift Parts | Lead time 21 days | Sarah Mitchell | 11/09/2026 7:41 AM
  11/09/2026 | BL-1003 | 210 | 200 | Watch: close to reorder point | - | Sarah Mitchell | 11/09/2026 7:41 AM
  11/16/2026 | BL-1002 | 1,180 | 1,500 | Order 1,820 boxes from PackRight Industries | - | (pending) |
  11/16/2026 | BL-1004 | 420 | 600 | Order 780 pairs from SafeHands Co. | - | (pending) |
  11/16/2026 | BL-1005 | 18 | 25 | Order 32 sets from Global Lift Parts | Heavy rain Shenzhen; China holiday next week; order today | (pending) |
  11/16/2026 | BL-1007 | 31 | 40 | Order 49 drums from Gulf Lubricants | - | (pending) |
- Odoo RFQs created after Approve (4 rows, status "RFQ"):
  P00001 | PackRight Industries | 11/16/2026 | $1,547.00 | RFQ
  P00002 | SafeHands Co. | 11/16/2026 | $1,872.00 | RFQ
  P00003 | Global Lift Parts | 11/16/2026 | $1,216.00 | RFQ
  P00004 | Gulf Lubricants | 11/16/2026 | $2,646.00 | RFQ
- ON-SCREEN TEXT (lower-third caption): "Stocky checked 10 products, found 4 problems, and drafted 4 orders. Before 7:00 AM."

TIMELINE (scene by scene; times are relative to the start of this section)
1. 00:00–00:06 | The browser fades in on the Gmail inbox. The clock badge "Monday 7:00 AM" pops in at the top-right with a tiny coffee-cup icon. | No callout.
2. 00:06–00:16 | The Stocky email row pulses once (light yellow background). The cursor glides to it; at 00:14 it clicks (ripple). | Callout on the row: "From Stocky, 7:00 AM".
3. 00:16–00:22 | The email opens. The body reveals line by line (0.4 s per line), the 4 numbered items last. | No callout.
4. 00:22–00:27 | Hold on the full email. The lower-third caption appears for 5 seconds. | ON-SCREEN TEXT: "Stocky checked 10 products, found 4 problems, and drafted 4 orders. Before 7:00 AM."
5. 00:27–00:55 | Walk through the items: each numbered item gets a yellow outline in turn (7 seconds each: item 1 at 00:27, item 2 at 00:34, item 3 at 00:41, item 4 at 00:48). For each, small tags pop above the numbers: "On hand", "Reorder point", "Supplier", "Order qty", "Cost". | Callout at the top: "Checked all 10 products, found 4 below reorder point".
6. 00:55–01:36 | Zoom to 1.6x centred on item 3 (Pallet Jack Wheels). Four callouts appear one after another, about 8 seconds apart, each pointing at its words without covering them: "Supplier in Shenzhen" (on "Global Lift Parts (Shenzhen)"), "Heavy rain forecast" (on "heavy rain forecast in Shenzhen this week", with a small rain-cloud icon), "Public holiday in China" (on "public holiday in China next week", with a calendar icon), "Lead time: 21 days" (on "Lead time is already 21 days"). Then "Recommend ordering today" gets an amber (#F59E0B) highlight that pulses twice. | Final callout at 01:28: "Not a report. Advice from a colleague."
7. 01:36–01:56 | Zoom out. The email scrolls so the Approve / Decline buttons are visible. Both buttons get a yellow outline; the cursor hovers near them but does NOT click. | Callout: "Nothing is sent until Sarah says yes".
8. 01:56–02:00 | The cursor clicks the "n8n" browser tab; the canvas cross-fades in. | No callout.
9. 02:00–02:20 | The full Stocky workflow builds: nodes appear left to right (0.5 s apart), connector lines draw, then the canvas does "zoom to fit". Animated dots run once along the whole chain. | Callouts: "Each box = one step" and, at 02:12, "No code: drag boxes, fill in forms".
10. 02:20–02:30 | The cursor glides to "Schedule Trigger"; the node lifts and a small tooltip shows "Every Monday at 6:55 AM". | Callout: "The timer starts it".
11. 02:30–02:38 | Cursor moves to the first Odoo node; tooltip "Get Many products". | Callout: "Pulls stock levels from the ERP (Odoo)".
12. 02:38–02:47 | Cursor moves to the AI Agent node; the node glows blue, the "Anthropic Chat Model" sub-node pulses. | Callout: "The agent: the part that thinks".
13. 02:47–02:56 | Cursor sweeps over the three HTTP Request nodes; each gets a small icon badge as the cursor passes: cloud (Open-Meteo), dollar sign (Frankfurter), calendar (Nager.Date). | Callouts: "Weather", "Exchange rates", "Public holidays".
14. 02:56–03:00 | Cursor moves to Google Sheets "Append Row". | Callout: "Writes every decision down".
15. 03:00–03:05 | Cursor moves to Gmail "Send and Wait for Response", then the final Odoo "Create RFQ" node. | Callout: "Emails Sarah and waits for her click".
16. 03:05–03:09 | The cursor clicks the "Google Sheets" browser tab; the Stocky_Decision_Log sheet appears. | No callout.
17. 03:09–03:28 | Rows animate in from the top (0.3 s apart). The header row gets a yellow outline for 2 seconds. Then both BL-1005 rows (11/09 and 11/16) get a yellow outline and the "Risk Notes" cell of today's BL-1005 row is zoomed to 1.4x and back. | Callouts: "Every flag, every suggestion, every approval" and "Why did we order those wheels early? It's written down."
18. 03:28–03:36 | Back to the Gmail tab, the open email. The cursor glides to "Approve" and clicks (ripple, pressed state). The button turns into a green pill "Approved by Sarah Mitchell". | No callout.
19. 03:36–03:44 | Click the "Odoo" tab. The cursor opens the "Orders" menu dropdown and clicks "Requests for Quotation". The empty list shows briefly. | Callout on the breadcrumb: "Purchase > Orders > Requests for Quotation".
20. 03:44–03:58 | The 4 RFQ rows slide in one by one (2 seconds apart), each with a light green flash and the "RFQ" status badge. Yellow outline on the Vendor column, then the Total column. | Callout: "4 draft RFQs, one per supplier, already filled in".
21. 03:58–04:14 | A stopwatch badge pops in at the top-right: "90 seconds". Then a big friendly card slides up over the lower third of the stage (not covering the RFQ rows): "You will build this. One piece per video." Hold. | Callout: "By Video 9, your Stocky sends this exact email".
22. 04:14–04:15 | END card: navy background, white text "END". | -

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
[00:00] It's Monday, seven in the morning. Sarah hasn't even had her coffee yet, and there's already an email waiting for her. It's from Stocky. Let's open it.
[00:16] This is the whole course in one email.
[00:27] Stocky looked inside BrightLeaf's ERP and checked all ten products. It found four that have dropped below their reorder point. For each one, it tells Sarah how many are on hand, what the reorder point is, who the supplier is, how much to order and roughly what it costs.
[00:55] But look at number three, the pallet jack wheels. Stocky didn't just say "you're low". It noticed that the supplier is in Shenzhen, it checked the weather there and saw heavy rain coming, it checked the calendar and saw a public holiday in China next week, and it knows the lead time is already twenty-one days. So it says: order this one today. That's not a report. That's a colleague giving you advice.
[01:36] And at the bottom, two buttons. Approve. Decline. Stocky has prepared the purchase requests, but it will not send anything until Sarah says yes. Hold on to that idea.
[01:56] So how did that happen? This is what's behind the curtain. It's a tool called n8n, and every box you see is one step. There's no code here. You build this by dragging boxes onto the screen and filling in forms.
[02:20] Left to right: a timer that says "every Monday at six fifty-five AM, start". Then a box that pulls stock levels from the ERP, which for BrightLeaf is a system called Odoo. The big box in the middle is the agent, the part that thinks. These three check the weather, exchange rates and public holidays. This one writes every decision into a Google Sheet. And the last one emails Sarah and waits for her click.
[03:05] Here's that record. Every Monday, every product Stocky flagged, what it suggested and who approved it. When Mr. Harrison, BrightLeaf's operations director, asks "why did we order those wheels early?", Sarah doesn't have to remember. It's written down.
[03:28] Now watch. Sarah clicks Approve. And over in Odoo, under Purchase, Requests for Quotation, there they are. Four draft requests, one for each supplier, already filled in with the right products and quantities.
[03:58] What used to take Sarah most of her Monday morning took ninety seconds. And here's the part I want you to hear: you are going to build this. Not watch me build it. You. One piece per video. By video nine, your Stocky sends this exact email.

CHECKLIST
- Total duration exactly 4:15, END card visible only from 04:14 to 04:15.
- The email body, quantities, prices (USD 1,547 / 1,872 / 1,216 / 2,646, total 7,281) and the 4 RFQ totals match the DATA block exactly.
- Code is organised by scene, each with its start/end time, so single scenes can be adjusted.
- Approve is clicked only once, in scene 18; nothing else is clicked in the email before that.
- Start button, hover-only Pause/Restart controls, progress bar, Space and R keys all work; nothing overflows the 1920x1080 stage; no real logos.
```
**After Claude builds it:**

<!-- VOICEOVER START -->
### Voice-over text for Fish Audio (paste this)
*428 words, about 2 min 51 s at a natural pace (150 words/min). Paste it as is; each paragraph is a natural pause.*

```text
It's Monday, seven in the morning. Sarah hasn't even had her coffee yet, and there's already an email waiting for her. It's from Stocky. Let's open it.

This is the whole course in one email.

Stocky looked inside BrightLeaf's ERP and checked all ten products. It found four that have dropped below their reorder point. For each one, it tells Sarah how many are on hand, what the reorder point is, who the supplier is, how much to order and roughly what it costs.

But look at number three, the pallet jack wheels. Stocky didn't just say "you're low". It noticed that the supplier is in Shenzhen, it checked the weather there and saw heavy rain coming, it checked the calendar and saw a public holiday in China next week, and it knows the lead time is already twenty-one days. So it says: order this one today. That's not a report. That's a colleague giving you advice.

And at the bottom, two buttons. Approve. Decline. Stocky has prepared the purchase requests, but it will not send anything until Sarah says yes. Hold on to that idea. It's important, and we'll come back to it.

So how did that happen? This is what's behind the curtain. It's a tool called n8n, and every box you see is one step. There's no code here. You build this by dragging boxes onto the screen and filling in forms.

Left to right: a timer that says "every Monday at six fifty-five AM, start". Then a box that pulls stock levels from the ERP, which for BrightLeaf is a system called Odoo. The big box in the middle is the agent, the part that thinks. These three check the weather, exchange rates and public holidays. This one writes every decision into a Google Sheet. And the last one emails Sarah and waits for her click.

Here's that record. Every Monday, every product Stocky flagged, what it suggested and who approved it. When Mr. Harrison, BrightLeaf's operations director, asks "why did we order those wheels early?", Sarah doesn't have to remember. It's written down.

Now watch. Sarah clicks Approve. And over in Odoo, under Purchase, Requests for Quotation, there they are. Four draft requests, one for each supplier, already filled in with the right products and quantities.

What used to take Sarah most of her Monday morning took ninety seconds. And here's the part I want you to hear: you are going to build this. Not watch me build it. You. One piece per video. By video nine, your Stocky sends this exact email.
```
<!-- VOICEOVER END -->

- This is the longest demo: preview it once all the way through before recording, and if one scene is off, ask Claude to change only that scene ("in scene 6, make each callout appear 2 seconds later").
- The email text is small on a laptop screen; if it is hard to read, reply "make the email body 26 px and the email view wider".
- Start talking "Now watch. Sarah clicks Approve." right as the cursor starts moving to the button at 03:28.

---

## Prompt 2 of 4: Chatbot vs Automation vs Agent (08:00–12:00, 4 min 0 s)
**What this demo shows:** A three-column comparison that fills in as we test a chatbot (Claude with no data access), a fixed IF-rule automation in n8n, and the Stocky AI Agent with its instructions and tools.

### Copy this prompt into Claude:
```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. I will play it full-screen and screen-record it, then add my own voice-over. This section teaches complete beginners the difference between a chatbot (a brain that only talks), an automation (a fixed recipe card) and an AI agent (a smart new intern that reasons toward a goal, uses tools and acts with approval), using a distributor called BrightLeaf Supplies (Columbus, Ohio) and its agent "Stocky".

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

SECTION LENGTH: exactly 4:00 (240 seconds). The END card shows from 03:59 to 04:00.

APP LOOK (only these screens appear)
- Comparison graphic (full stage, no browser frame): white background, title "Chatbot vs Automation vs AI Agent", three tall rounded columns with coloured header bars: "Chatbot" (grey #64748B, speech-bubble icon), "Automation" (blue #2563EB, recipe-card icon), "AI Agent" (green #16A34A, small robot icon). Three empty row slots in each column (light dashed outlines) that fill in later.
- Claude-style chat (browser frame, tab title "New chat - Claude", URL bar "claude.ai/new"): a calm off-white page, a centred conversation column, the user message in a light grey bubble on the right, the assistant answer as plain text on the left with a small generic sparkle avatar (no real logo), an input box at the bottom with placeholder "How can I help you today?".
- n8n-style workflow canvas (browser frame, tab title shows the workflow name, URL bar "brightleaf.app.n8n.cloud/workflow/..."): dark grey dotted canvas, rounded-square nodes with icons and labels, grey connector lines with animated dots, IF nodes with two outputs labelled "true" and "false". A right-side settings panel slides in when a node is double-clicked.
- AI Agent settings panel (n8n style): a wide panel over the canvas with the title "AI Agent", a "System Message" field (multi-line text box) and below it a "Tools" section listing connected tools as chips with icons.

DATA TO SHOW
- Chat question (typed): How many Steel Hex Bolts M10 do we have in stock at BrightLeaf right now, and should I reorder?
- Chat answer (streams in): "I don't have access to BrightLeaf's inventory system, so I can't see how many Steel Hex Bolts M10 you have right now. If you share your current stock level and your reorder point, I'm happy to help you decide whether to reorder."
- Workflow 1, name "Old-style alert" (tab title "Old-style alert - n8n"): Schedule Trigger > Odoo > IF > Gmail. IF condition shown in the panel: Value 1 "Quantity On Hand" | Operation "is smaller than" | Value 2 "Reorder Point". Output "true" goes to Gmail; output "false" goes nowhere.
- Example data card for the automation's blind spot: "BL-1005 Pallet Jack Wheels (set): On hand 26, Reorder point 25". IF result: false, so no email. Context the IF cannot see: supplier Global Lift Parts in Shenzhen, heavy rain, holiday coming.
- Workflow 2, name "Stocky" (tab title "Stocky - n8n"): Schedule Trigger > Odoo > AI Agent (with Anthropic Chat Model) > HTTP Request nodes (Open-Meteo, Frankfurter, Nager.Date) > Google Sheets > Gmail > Odoo.
- AI Agent System Message (show exactly): You are Stocky, BrightLeaf Supplies' inventory and procurement assistant. Check every product against its reorder point. For suppliers outside the US, consider weather, currency and holidays. Never send a purchase order without Sarah's approval. Explain your reasoning in plain English.
- AI Agent Tools (chips): Odoo, Weather, Currency, Holidays, Google Sheets.
- Filled comparison graphic:
  Chatbot: talks | no access | you do the work
  Automation: follows fixed steps | reads and writes | no judgement
  AI Agent: reasons toward a goal | uses tools | acts with approval
- ON-SCREEN TEXT 1: "Chatbot = a brain that talks. No access to your systems. Can't act."
- ON-SCREEN TEXT 2: "Automation = a recipe card. Same steps, every time. Fast and reliable, but no judgement."

TIMELINE (scene by scene; times are relative to the start of this section)
1. 00:00–00:12 | The comparison graphic builds: title fades in, then the three column headers drop in one by one (0.6 s apart) with a soft bounce; the empty dashed row slots fade in. Hold. | Callout under the title: "Three words. Three different things."
2. 00:12–00:16 | Cross-fade to the browser with the Claude-style chat, empty, input focused. | Small label at the top-left of the stage: "Test 1: a chatbot".
3. 00:16–00:28 | The question types into the input at 14 characters/second with a blinking caret. At 00:27 the cursor clicks the send arrow. | Callout on the input: "Asking about BrightLeaf's real stock".
4. 00:28–00:36 | The user bubble moves up; a short "thinking" shimmer, then the answer streams in word by word. | No callout.
5. 00:36–00:46 | A yellow highlight sweeps over "I don't have access to BrightLeaf's inventory system". Hold. | Callout: "Smart, polite, but no access to your data".
6. 00:46–00:55 | A small illustration fades in at the right side (not covering the answer): a glowing brain inside a closed room with no windows and no doors. | Callout: "It can't open Odoo. It can't send an email. It talks."
7. 00:55–01:00 | Hold. The lower-third caption appears for 5 seconds. | ON-SCREEN TEXT 1: "Chatbot = a brain that talks. No access to your systems. Can't act."
8. 01:00–01:05 | The browser switches to the n8n tab "Old-style alert". The four nodes appear left to right with connector lines. | Label at the top-left: "Test 2: an automation".
9. 01:05–01:13 | A paper recipe-card graphic slides in at the top-right corner: "1. Read stock  2. Check rule  3. Send email". The nodes get matching step numbers. | Callout: "A recipe card: same steps, same order".
10. 01:13–01:31 | Animated run: dots flow Schedule Trigger > Odoo > IF (each node turns green as the dots pass). The cursor double-clicks the IF node (ripple); the settings panel slides in from the right showing the condition. Zoom to 1.5x on the condition row, hold, zoom out. The "true" output line glows towards Gmail; the "false" output ends in a grey "do nothing" label. | Callouts: "One rule: On Hand smaller than Reorder Point?" and "Yes = email. No = nothing."
11. 01:31–01:53 | The panel closes. The example data card slides in beside the IF node: "BL-1005 Pallet Jack Wheels: On hand 26, Reorder point 25". The IF evaluates: a red "false" stamp; the Gmail node stays grey. Then three faded amber chips float near the card: "Supplier in Shenzhen", "Heavy rain", "Holiday coming", each with a small grey "IF can't see this" tag. | Callout: "Follows the recipe exactly, even when it's wrong".
12. 01:53–01:58 | Hold. The lower-third caption appears for 5 seconds. | ON-SCREEN TEXT 2: "Automation = a recipe card. Same steps, every time. Fast and reliable, but no judgement."
13. 01:58–02:03 | Switch to the "Stocky - n8n" tab. The full Stocky workflow is on the canvas. The cursor double-clicks the AI Agent node (ripple). | Label at the top-left: "Test 3: an AI agent".
14. 02:03–02:23 | Before the panel opens, a friendly "intern" illustration slides in at the left (a person with a lanyard badge "Stocky - Intern") with four small icons that pop in around it: eye ("reads"), lightbulb ("thinks"), wrench ("uses tools"), arrow ("acts"), plus a clipboard labelled "needs instructions + supervision". | Callout: "An AI agent = a smart new intern".
15. 02:23–02:44 | The intern illustration slides away; the AI Agent panel opens with the System Message. Each of the five sentences gets a yellow highlight in turn (about 4 seconds each) as it would be read aloud. Zoom to 1.3x on the System Message, then back. | Callout: "Instructions, in plain English".
16. 02:44–02:59 | The cursor scrolls the panel down to "Tools"; the five chips (Odoo, Weather, Currency, Holidays, Google Sheets) light up one after another with a soft pop. | Callout: "The tools it's allowed to use".
17. 02:59–03:26 | The panel closes. A split overlay appears over a dimmed canvas: left card "Automation: fixed recipe" (three numbered steps), right card "Agent: goal + tools + rules, decides the order". Then the right card shows a short animated chain: Odoo > Weather > Holidays > "Risk on BL-1005: order today" (amber). | Callout: "Nobody wrote a rule for this. It worked it out."
18. 03:26–03:33 | Cross-fade back to the comparison graphic. The rows fill in column by column (each cell types in): Chatbot column first, then Automation, then AI Agent. | No callout.
19. 03:33–03:44 | The three top-row words get a highlight in turn: "talks", "follows fixed steps", "reasons toward a goal". Hold. | Callout: "A chatbot talks. An automation follows. An agent reasons and acts."
20. 03:44–03:59 | Two small cards slide up beneath the columns: "Same every time + clear rule = automation (cheaper, faster, predictable)" under Automation, and "Needs judgement: messy info, several factors, explain why = agent" under AI Agent. | Callout: "Agents are not always the right answer".
21. 03:59–04:00 | END card: navy background, white text "END". | -

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
[00:00] Okay. Three words get thrown around like they mean the same thing: chatbot, automation and agent. They don't. Let me show you the difference with a real test.
[00:12] First, a chatbot. This is Claude, one of the AI assistants we'll use in this course. ChatGPT works the same way. I'll ask it: how many steel hex bolts do we have in stock at BrightLeaf right now, and should I reorder?
[00:36] And look at the answer. It's polite, it's smart, and it says: I don't have access to your inventory system, please share your stock level and reorder point.
[00:46] That's a chatbot. A brilliant brain, sitting in a room with no windows and no doors. It can only think about what you type into it. It can't open Odoo. It can't send an email. It talks. That's all.
[01:00] Second, automation. A workflow, or automation, is like a recipe card. Step one, step two, step three, always in the same order.
[01:13] This little one says: every morning, read the stock from Odoo. Then this box, called an IF, checks one rule. Is the quantity on hand smaller than the reorder point? If yes, send an email. If no, do nothing.
[01:31] Useful, and lots of companies have one. But it follows the rule exactly, even when the rule is wrong. If the pallet jack wheels are at twenty-six, one above the reorder point of twenty-five, it stays quiet, even though the supplier is in Shenzhen, it's raining and there's a holiday coming. It can't think "hmm, this one is risky". It doesn't know what "risky" means. It only knows the recipe.
[01:58] And third, the agent. Let's open Stocky's brain.
[02:03] The best way to think about an AI agent is a smart new intern. A good intern can read, think, use the tools you give them and take action. But they need clear instructions, and they need supervision, especially in their first few weeks.
[02:23] Here are Stocky's instructions. In plain English. "You are Stocky, BrightLeaf Supplies' inventory and procurement assistant. Check every product against its reorder point. For suppliers outside the US, consider weather, currency and holidays. Never send a purchase order without Sarah's approval. Explain your reasoning in plain English."
[02:44] And underneath, the tools it's allowed to use. It can look things up in Odoo. It can check the weather. It can check exchange rates and holidays. It can write to the log.
[02:59] So the difference is this. The automation follows a fixed recipe. The agent gets a goal, a set of tools and some rules, and it decides which tools to use and in what order to reach the goal. That's why it could spot the risk on the pallet jack wheels. Nobody wrote a rule saying "if Shenzhen plus rain plus holiday, then warn". It worked that out.
[03:26] Here's the summary. A chatbot talks. An automation follows. An agent reasons and acts.
[03:44] And one honest note. Agents are not always the right answer. If a task is the same every single time, with a clear rule, a plain automation is cheaper, faster and more predictable. Use an agent when the task needs a bit of judgement: reading messy information, weighing up several factors, explaining a decision. We'll practise telling them apart in your activity.

CHECKLIST
- Total duration exactly 4:00, END card visible only from 03:59 to 04:00.
- The chat question, IF condition, System Message and tool names match the DATA block word for word.
- The automation example uses On hand 26 and Reorder point 25, and the IF result is "false" (no email).
- The filled comparison table matches the DATA block exactly.
- Start button, hover-only Pause/Restart controls, progress bar, Space and R keys all work; nothing overflows the 1920x1080 stage; no real logos (Claude and n8n look-alikes only).
```
**After Claude builds it:**

<!-- VOICEOVER START -->
### Voice-over text for Fish Audio (paste this)
*543 words, about 3 min 37 s at a natural pace (150 words/min). Paste it as is; each paragraph is a natural pause.*

```text
Okay. Three words get thrown around like they mean the same thing: chatbot, automation and agent. They don't. Let me show you the difference with a real test.

First, a chatbot. This is Claude, one of the AI assistants we'll use in this course. ChatGPT works the same way. I'll ask it: how many steel hex bolts do we have in stock at BrightLeaf right now, and should I reorder?

And look at the answer. It's polite, it's smart, and it says: I don't have access to your inventory system, please share your stock level and reorder point.

That's a chatbot. A brilliant brain, sitting in a room with no windows and no doors. It can only think about what you type into it. It can't open Odoo. It can't send an email. It talks. That's all.

Second, automation. A workflow, or automation, is like a recipe card. Step one, step two, step three, always in the same order.

This little one says: every morning, read the stock from Odoo. Then this box, called an IF, checks one rule. Is the quantity on hand smaller than the reorder point? If yes, send an email. If no, do nothing.

Useful, and lots of companies have one. But it follows the rule exactly, even when the rule is wrong. If the pallet jack wheels are at twenty-six, one above the reorder point of twenty-five, it stays quiet, even though the supplier is in Shenzhen, it's raining and there's a holiday coming. It can't think "hmm, this one is risky". It doesn't know what "risky" means. It only knows the recipe.

And third, the agent. Let's open Stocky's brain.

The best way to think about an AI agent is a smart new intern. A good intern can read, think, use the tools you give them and take action. But they need clear instructions, and they need supervision, especially in their first few weeks.

Here are Stocky's instructions. In plain English. "You are Stocky, BrightLeaf Supplies' inventory and procurement assistant. Check every product against its reorder point. For suppliers outside the US, consider weather, currency and holidays. Never send a purchase order without Sarah's approval. Explain your reasoning in plain English."

And underneath, the tools it's allowed to use. It can look things up in Odoo. It can check the weather. It can check exchange rates and holidays. It can write to the log.

So the difference is this. The automation follows a fixed recipe. The agent gets a goal, a set of tools and some rules, and it decides which tools to use and in what order to reach the goal. That's why it could spot the risk on the pallet jack wheels. Nobody wrote a rule saying "if Shenzhen plus rain plus holiday, then warn". It worked that out.

Here's the summary. A chatbot talks. An automation follows. An agent reasons and acts.

And one honest note. Agents are not always the right answer. If a task is the same every single time, with a clear rule, a plain automation is cheaper, faster and more predictable. Use an agent when the task needs a bit of judgement: reading messy information, weighing up several factors, explaining a decision. We'll practise telling them apart in your activity.
```
<!-- VOICEOVER END -->

- The System Message highlight (02:23–02:44) is paced for reading it aloud; if you read slower, ask Claude to "slow the five sentence highlights to 5 seconds each and shorten scene 17 to match".
- Preview the IF example once: the red "false" stamp should be clearly visible before you say "it stays quiet".
- Trim the first second before Start and the frames after END.

---

## Prompt 3 of 4: The Five Parts of Every Agent (13:45–16:00, 2 min 15 s)
**What this demo shows:** An intern-style "Stocky" figure with five labelled arrows (Brain, Instructions, Tools, Memory, Human Supervisor), each one highlighted with a matching screen: the system message, tool icons, the decision log sheet and the Approve/Decline buttons.

### Copy this prompt into Claude:
```text
ROLE & GOAL
You are a motion designer building an animated explainer video as a single self-contained HTML file. I will play it full-screen and screen-record it, then add my own voice-over. This section teaches complete beginners the five parts every AI agent has (brain, instructions, tools, memory, human supervisor), using "Stocky", the inventory agent of a distributor called BrightLeaf Supplies (Columbus, Ohio), pictured as a smart new intern.

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

SECTION LENGTH: exactly 2:15 (135 seconds). The END card shows from 02:14 to 02:15.

APP LOOK (only these screens appear)
- Five-parts diagram (full stage, no browser frame): white background. In the centre a friendly flat-style intern figure (simple shapes, lanyard badge reading "Stocky"). Five arrows radiate out to five rounded label cards, placed around the figure: "1 Brain (LLM)" top-left, "2 Instructions" top-right, "3 Tools" right, "4 Memory" bottom-right, "5 Human Supervisor" bottom-left. Each card has a small icon: brain, clipboard, toolbox, notebook, person with a check mark. When a part is "highlighted", its card turns yellow (#FFD84D), scales to 1.1 and the other cards dim to 40%; the diagram then shrinks to the left third of the stage and a detail panel slides in on the right two-thirds.
- Detail panel for Instructions: an n8n-style "AI Agent" settings panel (dark grey header, white body) with a "System Message" text box, enlarged text (30 px).
- Detail panel for Tools: six round icon tiles in a 3x2 grid with labels: Odoo (purple box), Weather (cloud), Currency ($ symbol), Holidays (calendar), Google Sheets (green grid), Gmail (envelope). Generic icons only, no real logos.
- Detail panel for Memory: a Google Sheets-style spreadsheet (green accent, file name "Stocky_Decision_Log", columns A-H, tab "Log").
- Detail panel for Human Supervisor: the bottom of a Gmail-style email with two big buttons "Approve" (green) and "Decline" (red) and the line "Total suggested spend: USD 7,281. Draft RFQs are ready in Odoo."

DATA TO SHOW
- Five parts: 1 Brain (LLM), 2 Instructions, 3 Tools, 4 Memory, 5 Human Supervisor.
- Brain examples: "Claude", "ChatGPT"; definition chip: "LLM = AI that reads and writes language".
- System Message (show exactly): You are Stocky, BrightLeaf Supplies' inventory and procurement assistant. Check every product against its reorder point. For suppliers outside the US, consider weather, currency and holidays. Never send a purchase order without Sarah's approval. Explain your reasoning in plain English.
- Tools: Odoo, Weather, Currency, Holidays, Google Sheets, Gmail. A seventh, greyed-out tile with a padlock: "Purchase orders (not given)".
- Memory sheet "Stocky_Decision_Log", columns: Date | SKU | On Hand | Reorder Point | Action Suggested | Risk Notes | Approved By | Approved At. Rows:
  11/09/2026 | BL-1005 | 22 | 25 | Order 28 sets from Global Lift Parts | Lead time 21 days | Sarah Mitchell | 11/09/2026 7:41 AM
  11/09/2026 | BL-1003 | 210 | 200 | Watch: close to reorder point | - | Sarah Mitchell | 11/09/2026 7:41 AM
  11/16/2026 | BL-1002 | 1,180 | 1,500 | Order 1,820 boxes from PackRight Industries | - | Sarah Mitchell | 11/16/2026 7:12 AM
  11/16/2026 | BL-1005 | 18 | 25 | Order 32 sets from Global Lift Parts | Heavy rain Shenzhen; China holiday next week | Sarah Mitchell | 11/16/2026 7:12 AM
- Stocky's memory speech bubble: "I flagged the pallet jack wheels last week too. This is becoming a pattern."
- ON-SCREEN TEXT (lower-third caption): "Brain + Instructions + Tools + Memory + Human = an agent you can trust."

TIMELINE (scene by scene; times are relative to the start of this section)
1. 00:00–00:09 | The intern figure pops in at the centre with a small wave. The five arrows draw outward one after another (0.8 s apart) and each label card pops in at the arrow's tip. | Callout above the figure: "Every agent has the same 5 parts".
2. 00:09–00:35 | Highlight "1 Brain (LLM)": the card turns yellow, the others dim, the diagram shrinks left. On the right, a large brain icon with two name chips "Claude" and "ChatGPT" and the definition chip "LLM = AI that reads and writes language". At 00:22 three small verbs pop under the brain: "reads", "reasons", "writes". At 00:28 a dashed box closes around the brain with no doors, and a tiny label "On its own: stuck in a room with no doors". | Callout: "The intern's brain".
3. 00:35–00:56 | Highlight "2 Instructions". The detail panel shows the AI Agent "System Message" box with the full text, enlarged. Phrases get a yellow underline in turn: "You are Stocky" (who you are), "Check every product against its reorder point" (your job), "Never send a purchase order without Sarah's approval" (what you must never do). | Callouts: "Who you are", "Your job", "Never do this" and, at 00:50, "Vague instructions = a vague intern".
4. 00:56–01:25 | Highlight "3 Tools". The six tool tiles pop in one by one (about 2 seconds apart) as they are named: Odoo, Weather, Currency, Holidays, Gmail, Google Sheets; each gets a small "door opening" animation. At 01:12 the greyed "Purchase orders (not given)" tile slides in with a padlock that shakes once. | Callouts: "The doors we open for the intern" and, near the padlock tile, "No tool = it simply can't do it. That's how you keep it safe."
5. 01:25–01:54 | Highlight "4 Memory". The detail panel shows the Stocky_Decision_Log sheet; rows fade in. At 01:30 a small "poof" icon shows the brain forgetting ("Conversation ended: brain forgets") then a notebook icon slides on top. At 01:40 both BL-1005 rows get yellow outlines and a speech bubble from a mini Stocky icon appears: "I flagged the pallet jack wheels last week too. This is becoming a pattern." | Callout: "A notebook: what it decided and why".
6. 01:54–02:09 | Highlight "5 Human Supervisor". The detail panel shows the Approve / Decline buttons. The cursor glides to "Approve" and hovers (button shows hover state) but does not click. A small pen-signature graphic draws under the buttons. | Callouts: "The manager's signature before the check goes out" and "The agent prepares. The human approves."
7. 02:09–02:14 | The diagram returns to full size and all five cards light up together in yellow. The lower-third caption appears for 5 seconds. | ON-SCREEN TEXT: "Brain + Instructions + Tools + Memory + Human = an agent you can trust."
8. 02:14–02:15 | END card: navy background, white text "END". | -

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
[00:00] Every agent you'll ever build, including Stocky, has the same five parts. Let's go through them using our intern.
[00:09] Part one: the brain. That's the AI model, things like Claude or ChatGPT. You'll hear people call this an "LLM". It just means the type of AI that reads and writes language. Think of it as the intern's brain. It reads, it reasons, it writes. On its own, as we saw, it's stuck in a room with no doors.
[00:35] Part two: the instructions. This is the briefing you give the intern on day one. Who you are, what your job is, what you must never do. The clearer this is, the better the agent behaves. Vague instructions give you a vague intern.
[00:56] Part three: the tools. These are the doors we open for the intern. Odoo, so it can read stock. A weather service. An exchange rate service. A holiday calendar. Email. The agent can only use the tools you give it. If you don't give it access to purchase orders, it simply can't create one. That's how you keep it safe.
[01:25] Part four: memory. Out of the box, an AI brain forgets everything the moment a conversation ends. So we give Stocky a notebook, which for us is this Google Sheet. It writes down what it decided and why. Next week, it can look back and say, "I flagged the pallet jack wheels last week too. This is becoming a pattern."
[01:54] And part five, the one people forget: the human supervisor. That's you. In this course, Stocky never spends BrightLeaf's money without a human click. It's like the manager's signature before the check goes out. The agent prepares, the human approves.

CHECKLIST
- Total duration exactly 2:15, END card visible only from 02:14 to 02:15.
- The five parts appear in the order 1 to 5, each highlighted at its exact start time.
- The System Message, tool names and sheet rows match the DATA block exactly.
- Approve is hovered but never clicked.
- Start button, hover-only Pause/Restart controls, progress bar, Space and R keys all work; nothing overflows the 1920x1080 stage; no real logos.
```
**After Claude builds it:**

<!-- VOICEOVER START -->
### Voice-over text for Fish Audio (paste this)
*281 words, about 1 min 52 s at a natural pace (150 words/min). Paste it as is; each paragraph is a natural pause.*

```text
Every agent you'll ever build, including Stocky, has the same five parts. Let's go through them using our intern.

Part one: the brain. That's the AI model, things like Claude or ChatGPT. You'll hear people call this an "LLM". It just means the type of AI that reads and writes language. Think of it as the intern's brain. It reads, it reasons, it writes. On its own, as we saw, it's stuck in a room with no doors.

Part two: the instructions. This is the briefing you give the intern on day one. Who you are, what your job is, what you must never do. The clearer this is, the better the agent behaves. Vague instructions give you a vague intern.

Part three: the tools. These are the doors we open for the intern. Odoo, so it can read stock. A weather service. An exchange rate service. A holiday calendar. Email. The agent can only use the tools you give it. If you don't give it access to purchase orders, it simply can't create one. That's how you keep it safe.

Part four: memory. Out of the box, an AI brain forgets everything the moment a conversation ends. So we give Stocky a notebook, which for us is this Google Sheet. It writes down what it decided and why. Next week, it can look back and say, "I flagged the pallet jack wheels last week too. This is becoming a pattern."

And part five, the one people forget: the human supervisor. That's you. In this course, Stocky never spends BrightLeaf's money without a human click. It's like the manager's signature before the check goes out. The agent prepares, the human approves.
```
<!-- VOICEOVER END -->

- If the intern figure looks too cartoonish or too plain, reply "make the intern a simple flat avatar like a modern SaaS illustration".
- Begin "Part one: the brain" when the Brain card turns yellow at 00:09.
- Trim the first second before Start and the frames after END.

---

## Prompt 4 of 4: Your Course Map and Toolkit (16:00–18:00, 2 min 0 s)
**What this demo shows:** A road with 10 milestones that light up as each video is mentioned, then the toolkit slide (Odoo, n8n, Claude/ChatGPT, Google Sheets, Gmail and the three free APIs) and a "works with your ERP too" note.

### Copy this prompt into Claude:
```text
ROLE & GOAL
You are a motion designer building an animated slide-style video as a single self-contained HTML file. I will play it full-screen and screen-record it, then add my own voice-over. This section shows complete beginners the 10-video roadmap of a course called "The ERP Agent Blueprint", in which they build an AI agent called "Stocky" for a distributor called BrightLeaf Supplies (Columbus, Ohio), and the free no-code tools they will use.

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

SECTION LENGTH: exactly 2:00 (120 seconds). The END card shows from 01:59 to 02:00.

APP LOOK (only these screens appear)
- This section uses illustrated slides, not a browser window: skip the browser frame and the mouse cursor.
- Course map slide: a light background (#F8FAFC) with a winding road (soft grey with a dashed white centre line) that snakes from bottom-left to top-right across the stage. Ten round milestone markers sit along the road, numbered 1 to 10, each with a short label card beside it. Markers start grey; when highlighted, a marker turns blue (#2563EB) with a yellow (#FFD84D) pulsing ring and its label card pops in. A small Stocky robot icon (flat shapes: rounded navy body, blue screen face, white dot eyes, small antenna) travels along the road to the current marker. Milestones 6-10 have a small wrench icon to show "building" videos.
- Toolkit slide: white background, title "Your toolkit (all free tier or free trial)". Two rows of rounded tiles with generic icons (no real logos): top row 5 tiles, bottom row 3 smaller tiles labelled "Free outside APIs". Each tile has the tool name in bold and its role in grey underneath.
- "Your ERP" overlay: four grey chips and an arrow to a navy card.

DATA TO SHOW
- Milestone labels:
  1. Why Your ERP Needs an AI Agent (You are here)
  2. ERP Demystified: your own free Odoo + 10 BrightLeaf products
  3. APIs: explained with a restaurant
  4. Databases: friendly, like Excel
  5. Your no-code toolkit
  6. Stocky reads the ERP: "What's running low?"
  7. Stocky drafts purchase orders (with your approval)
  8. Beyond the ERP: weather, currency, holidays
  9. Memory + Mr. Harrison's Monday report
  10. Going live safely + your capstone
- Toolkit tiles (name - role):
  Odoo - our ERP (free to try, runs in your browser)
  n8n - where we build the recipe
  Claude / ChatGPT - the brain
  Google Sheets - the memory
  Gmail - sends the alerts
  Free outside APIs: Open-Meteo (weather), Frankfurter (exchange rates), Nager.Date (public holidays)
- Badges: "Free tier or free trial" on every tile; "Nothing to install" banner.
- ERP chips: SAP, Oracle, Microsoft Dynamics, NetSuite > card "Same ideas. Odoo = a free test system you can't break."

TIMELINE (scene by scene; times are relative to the start of this section)
1. 00:00–00:06 | The road draws itself from bottom-left to top-right (stroke animation, 3 s). The 10 grey markers pop onto it one by one. Marker 1 turns blue with the label "You are here"; Stocky appears beside it. | Callout at the top: "The road we'll travel together".
2. 00:06–00:14 | Stocky moves to marker 2; it lights up and its label card pops in. A tiny filing-cabinet icon appears beside the label. | No callout.
3. 00:14–00:19 | Marker 3 lights up, label pops in, tiny waiter-with-tray icon. | No callout.
4. 00:19–00:25 | Marker 4 lights up, label pops in, tiny spreadsheet icon. | No callout.
5. 00:25–00:32 | Marker 5 lights up, label pops in, tiny toolbox icon. | No callout.
6. 00:32–00:35 | A banner sweeps across the middle of the road between markers 5 and 6: "Now the building starts". | No callout.
7. 00:35–00:40 | Marker 6 lights up, label pops in. | No callout.
8. 00:40–00:45 | Marker 7 lights up, label pops in, tiny green "Approve" button icon. | No callout.
9. 00:45–00:50 | Marker 8 lights up, label pops in, tiny cloud, $ and calendar icons. | No callout.
10. 00:50–00:55 | Marker 9 lights up, label pops in, tiny envelope icon. | No callout.
11. 00:55–01:04 | Marker 10 lights up with a small flag and confetti burst (calm, 1 s). The whole road glows for a moment. Hold. | Callout near marker 10: "Build a Stocky for your own company".
12. 01:04–01:10 | Slide transition to the toolkit slide. The title fades in, then the "Nothing to install" banner. | No callout.
13. 01:10–01:26 | The five top-row tiles pop in one by one (about 3 seconds apart) as named: Odoo, n8n, Claude / ChatGPT, Google Sheets, Gmail; each role line types in beneath its name. | No callout.
14. 01:26–01:33 | The three smaller API tiles slide up together under the label "Free outside APIs". Then every tile gets a small green "Free tier or free trial" badge with a stagger. | Callout: "No installs. Everything runs in your browser."
15. 01:33–01:47 | The toolkit tiles dim. Four grey chips slide in from the left: "SAP", "Oracle", "Microsoft Dynamics", "NetSuite". An arrow draws from them to a navy card: "Same ideas." | Callout: "Your company uses a different ERP? No problem."
16. 01:47–01:59 | The navy card expands to show the second line "Odoo = a free test system you can't break." Then a small speech-bubble card appears under it: "Learn how Stocky talks to Odoo, and you'll know what to ask your IT team." Hold. | No callout.
17. 01:59–02:00 | END card: navy background, white text "END". | -

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
[00:00] Here's the road we'll travel together, one piece of Stocky at a time.
[00:06] In video two, we'll tour an ERP and set up your own free copy of Odoo, loaded with BrightLeaf's ten products. Video three explains APIs, the way software talks to software, using a restaurant. Video four makes databases friendly, using something you already know: Excel. In video five, we set up your no-code toolkit.
[00:32] Then the building starts. Video six: Stocky reads the ERP and answers "what's running low?". Video seven: Stocky drafts purchase orders, but only with your approval. Video eight: Stocky looks beyond the ERP at weather, currency and holidays. Video nine: memory and Mr. Harrison's Monday report. And video ten: going live safely, plus your capstone, where you build a Stocky for your own company.
[01:04] And here's your toolkit. Odoo is our ERP. It's free to try and runs in your browser. n8n is where we build the recipe. Claude or ChatGPT is the brain. Google Sheets is the memory. Gmail sends the alerts. Every tool here has a free tier or a free trial. You won't need to install anything on your computer.
[01:33] Does your company use SAP, Oracle, Microsoft Dynamics or NetSuite instead of Odoo? No problem. The ideas are identical. We use Odoo because it's free and you can't break anything in a test system. Once you understand how Stocky talks to Odoo, you'll know exactly what questions to ask your IT team about your own ERP.

CHECKLIST
- Total duration exactly 2:00, END card visible only from 01:59 to 02:00.
- Each milestone lights up at its exact start time and the labels match the DATA block.
- All tool names and roles match the DATA block; generic icons only, no real logos.
- The road and all 10 labels fit on the stage without overlapping each other.
- Start button, hover-only Pause/Restart controls, progress bar, Space and R keys all work; nothing overflows the 1920x1080 stage.
```
**After Claude builds it:**

<!-- VOICEOVER START -->
### Voice-over text for Fish Audio (paste this)
*246 words, about 1 min 38 s at a natural pace (150 words/min). Paste it as is; each paragraph is a natural pause.*

```text
Here's the road we'll travel together, one piece of Stocky at a time.

In video two, we'll tour an ERP and set up your own free copy of Odoo, loaded with BrightLeaf's ten products. Video three explains APIs, the way software talks to software, using a restaurant. Video four makes databases friendly, using something you already know: Excel. In video five, we set up your no-code toolkit.

Then the building starts. Video six: Stocky reads the ERP and answers "what's running low?". Video seven: Stocky drafts purchase orders, but only with your approval. Video eight: Stocky looks beyond the ERP at weather, currency and holidays. Video nine: memory and Mr. Harrison's Monday report. And video ten: going live safely, plus your capstone, where you build a Stocky for your own company.

And here's your toolkit. Odoo is our ERP. It's free to try and runs in your browser. n8n is where we build the recipe. Claude or ChatGPT is the brain. Google Sheets is the memory. Gmail sends the alerts. Every tool here has a free tier or a free trial. You won't need to install anything on your computer.

Does your company use SAP, Oracle, Microsoft Dynamics or NetSuite instead of Odoo? No problem. The ideas are identical. We use Odoo because it's free and you can't break anything in a test system. Once you understand how Stocky talks to Odoo, you'll know exactly what questions to ask your IT team about your own ERP.
```
<!-- VOICEOVER END -->

- If the milestone labels overlap on the curvy road, reply "alternate the labels above and below the road".
- The video 2 to 5 milestones move quickly; keep a steady pace when you read that paragraph.
- Trim the first second before Start and the frames after END.

---
