# Video 3: APIs Explained Like You're Ordering at a Restaurant: Screen-Recording Prompts

**How to use:** 1. Open claude.ai, start a new chat, and paste ONE prompt. 2. Claude builds an animated demo you can preview. If anything looks wrong, reply in the same chat ("make the cursor slower", "the table is cut off"). 3. Open the demo full-screen in Chrome (press F11 / Ctrl+Cmd+F), start your screen recorder (QuickTime: File → New Screen Recording), then click **Start**. 4. Stop recording when the "END" card appears, trim the start and end, and add your voice-over from the script. Each demo runs for the same length as its script section, so the voice-over lines up.

**Sections in this video:**

| # | Section | Time | Length | Prompt |
|---|---|---|---|---|
| 1 | The Restaurant: How an API Really Works | 02:00–05:30 | 3 min 30 s | Prompt 1 |
| 2 | Your First Live API Call: Weather in Shenzhen | 07:00–11:00 | 4 min 0 s | Prompt 2 |
| 3 | Second Live Call: The Currency Waiter | 11:00–13:30 | 2 min 30 s | Prompt 3 |
| 4 | Status Codes: The Receipts | 15:00–18:00 | 3 min 0 s | Prompt 4 |
| 5 | API Keys: Your Hotel Key Card | 18:00–20:30 | 2 min 30 s | Prompt 5 |

---

## Prompt 1 of 5: The Restaurant: How an API Really Works (02:00–05:30, 3 min 30 s)

**What this demo shows:** An animated restaurant diagram (customer, waiter, kitchen) that turns into Stocky, the API and Odoo, then a real API web address split into its three coloured parts.

### Copy this prompt into Claude:

```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. It will be screen-recorded and used in a beginner course for supply-chain managers ("The ERP Agent Blueprint"). This section teaches what an API is using a restaurant analogy: the customer (Stocky, an AI agent) never walks into the kitchen (Odoo, the company's ERP); the waiter (the API) carries the order (request) and brings back the food (response). It ends by splitting a real API web address into address, endpoint and parameters.

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
- This section is a full-stage animated "slide" (no browser frame needed): white canvas with a very light grey floor line, flat friendly illustrations built from inline SVG/CSS shapes (no images, no emoji fonts).
- Left: a small round table with a seated customer figure. Middle: a waiter figure holding a tray. Right: a kitchen box (counter, stove, a pan, a fridge) with a door.
- Each figure has a name label (bold navy, 40px) and a small grey subtitle (24px) underneath.
- Arrows: thick rounded blue (#2563EB) arrows between table and kitchen; labels on arrows in white pills.
- Final scenes: a large monospace-free "URL card" (white rounded card, Inter 40px) showing one web address with coloured segments: blue #2563EB, green #16A34A, orange #F59E0B.

DATA TO SHOW (exact text)
- Labels at start: customer "Customer" (subtitle "You / Stocky"), waiter "Waiter" (subtitle "API"), kitchen "Kitchen" (subtitle "Odoo (or any system)").
- Customer's order bubble: "One chicken burrito, please, not too spicy."
- "API = Application Programming Interface" (then simplified to "API = the waiter").
- Labels after the swap: customer -> "Stocky" (subtitle "AI agent"), waiter -> "API", kitchen -> "Odoo" (subtitle "BrightLeaf's ERP").
- Stocky's order bubble: "Please bring me the on-hand quantity for SKU BL-1005, the pallet jack wheels."
- Waiter's answer card: "BL-1005 Pallet Jack Wheels (set): 18 sets"
- Kitchen drawers: "Customer list" (locked), "Accounting" (locked), "Stock levels" (open, green).
- Vocabulary labels: "Request" (arrow going in), "Response" (arrow coming back), "Menu" (small card on the table).
- Menu card items (endpoints): "Today's weather forecast", "Latest exchange rates".
- URL: https://api.open-meteo.com/v1/forecast?latitude=22.54&longitude=114.06&daily=precipitation_sum,wind_speed_10m_max&timezone=auto
  - Blue part: https://api.open-meteo.com  -> label "Restaurant address: which building?"
  - Green part: /v1/forecast  -> label "Endpoint: which dish? The forecast"
  - Orange part: ?latitude=22.54&longitude=114.06&daily=precipitation_sum,wind_speed_10m_max&timezone=auto  -> label "Order details (parameters)"
  - Sub-labels: "latitude=22.54&longitude=114.06" -> "Shenzhen"; "daily=precipitation_sum,wind_speed_10m_max" -> "rainfall and wind"; "?" -> "here come my order details"; each "&" -> "and also".
- Analogy line: "One chicken burrito" | "not too spicy" | "and extra guacamole"
- ON-SCREEN TEXT: "API = the waiter. You never walk into the kitchen."

TIMELINE (scene by scene; times relative to the start of this demo)
1. 00:00-00:08 | Stage fades in from white. The three figures build left to right with a soft pop: table + customer, waiter, kitchen. Labels "Customer / You / Stocky", "Waiter / API", "Kitchen / Odoo (or any system)" fade in under each. | No callout.
2. 00:08-00:24 | A dashed path from the customer towards the kitchen door appears; the door gets a red round "no entry" sign and the path fades out. Inside the kitchen, the pan, fridge and knives gently jiggle (busy). | Callout on the kitchen door: "The kitchen isn't yours".
3. 00:24-00:40 | Speech bubble from the customer: "One chicken burrito, please, not too spicy." The waiter slides to the table, picks up an order slip, walks to the kitchen (2 s), steam rises from the pan, the waiter returns with a plate and sets it on the table. | Small tag on the waiter while walking: "takes the order".
4. 00:40-00:52 | The waiter glows blue. Above it, text types in: "API = Application Programming Interface". After 3 s, "Application Programming Interface" gets a soft strike-through and fades, leaving "API = the waiter". | Callout: "Just remember: the waiter".
5. 00:52-01:04 | Hold the full diagram; the plate on the table sparkles once. | ON-SCREEN TEXT lower-third 00:53-00:58: "API = the waiter. You never walk into the kitchen."
6. 01:04-01:12 | Label morph: "Kitchen" flips (card-flip) to "Odoo" with subtitle "BrightLeaf's ERP"; "Customer" flips to "Stocky" (the customer becomes a small friendly robot shape); "Waiter" becomes "API". | Callout: "Kitchen = Odoo  |  Customer = Stocky".
7. 01:12-01:22 | Next to Stocky, a tiny grey login window ("Username / Password / Log in") appears and gets a red cross; a mouse-menu icon also gets crossed. | Callout: "Stocky never logs in or clicks menus".
8. 01:22-01:38 | Stocky's speech bubble types in (~14 chars/s): "Please bring me the on-hand quantity for SKU BL-1005, the pallet jack wheels." The waiter carries the slip to Odoo, then returns with a white card: "BL-1005 Pallet Jack Wheels (set): 18 sets" (the "18" in large navy bold). | Callout on the card: "The waiter's answer".
9. 01:38-01:53 | Zoom (1.0 to 1.4) into the Odoo kitchen. Three drawers appear: "Customer list" and "Accounting" with padlock icons (grey), "Stock levels" slides open (green outline). Zoom back out at 01:51. | Callout: "Odoo decides what the waiter may bring out".
10. 01:53-02:03 | A blue arrow from the table to the kitchen draws itself; a white pill "Request" pops onto it. A small counter "3 words" appears top-right showing "1/3". | Callout: "The order you give = request".
11. 02:03-02:13 | A second arrow from the kitchen back to the table draws itself; pill "Response". Counter shows "2/3". | Callout: "What comes back = response".
12. 02:13-02:37 | A small card labelled "Menu" pops onto the table, then enlarges to the side and opens: items "Today's weather forecast" and "Latest exchange rates", each with a small address tag. A tiny "sushi?" item appears greyed out with a cross ("not on this menu"). Counter shows "3/3". | Callout: "Endpoint = one dish on the menu (it has its own address)".
13. 02:37-02:45 | The diagram shrinks and slides to the top third of the stage. The URL card slides up from the bottom; the full URL appears in navy. | Callout: "A real order. Don't panic."
14. 02:45-02:55 | The blue segment "https://api.open-meteo.com" lights up blue with an underline bracket. | Label under it: "Restaurant address: which building?"
15. 02:55-03:03 | The green segment "/v1/forecast" lights up green. | Label: "Endpoint: which dish? The forecast"
16. 03:03-03:20 | The orange segment lights up. Sub-brackets appear in sequence: "latitude=22.54&longitude=114.06" -> "Shenzhen" (03:05); "daily=precipitation_sum,wind_speed_10m_max" -> "rainfall and wind" (03:09); the "?" pulses with a bubble "here come my order details" (03:13); each "&" pulses with tiny "and also" tags (03:16). | Callout: "Order details".
17. 03:20-03:29 | Under the URL, the analogy line appears in three coloured chips: "One chicken burrito" (green) | "not too spicy" (orange) | "and extra guacamole" (orange). Then a small navy tip card: "Order details after the ? are called parameters." Hold. | Tip card as described.
18. 03:29-03:30 | END card. | "END"

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
[00:00-01:04] Let's start with a picture. Imagine you walk into a restaurant. You're hungry, you know what you want, but you don't walk into the kitchen. You don't open the fridge, you don't touch the chef's knives, and you definitely don't cook. Why? Because the kitchen isn't yours. It's busy, it's organised in its own way, and if every customer walked in, it would be chaos. So instead, you talk to the waiter. You say, "One chicken burrito, please, not too spicy." The waiter takes your order to the kitchen, the kitchen prepares exactly that, and the waiter brings it back to your table. That waiter is an API. API stands for Application Programming Interface, but you can forget that phrase right now. Just remember: an API is the waiter between you and somebody else's kitchen.
[01:04-01:53] Now let's swap in BrightLeaf. The kitchen is Odoo, the ERP you set up in the last video. The customer is Stocky, the AI agent we're going to build. Stocky never logs into Odoo like Sarah does. It doesn't click menus. It sends an order to Odoo's waiter: "Please bring me the on-hand quantity for SKU BL-1005, the pallet jack wheels." And the waiter comes back with: "Eighteen sets." Here's why companies love this. The kitchen stays safe. Odoo decides what the waiter is allowed to bring out. Sarah's customer list stays private, the accounting stays locked, and Stocky gets only what it needs.
[01:53-02:37] Three more words and you've got the whole vocabulary. The order you give is called a request. What comes back to your table is the response. Simple. And every restaurant has a menu. You can't order sushi in a pizza place. APIs are the same. Each API has a list of things it can do, and each item on that list has its own address. That address is called an endpoint. One endpoint might be "today's weather forecast". Another might be "latest exchange rates". Think of an endpoint as one dish on the menu.
[02:37-03:29] This is what a real order looks like. Don't panic, we'll take it apart. The blue part, api dot open-meteo dot com, is the restaurant's address. Which building are we walking into? The green part, slash v1 slash forecast, is the endpoint. Which dish do we want? The forecast. The orange part, everything after the question mark, is our order details. Latitude 22.54 and longitude 114.06, that's Shenzhen. Then which bits of the forecast we want: rainfall and wind. The question mark means "here come my order details", and each ampersand, that little "and" sign, means "and also". It's exactly like saying, "One chicken burrito, not too spicy, and extra guacamole."

CHECKLIST
- Total duration exactly 3:30 (210 s), END card in the last second.
- The URL is exactly: https://api.open-meteo.com/v1/forecast?latitude=22.54&longitude=114.06&daily=precipitation_sum,wind_speed_10m_max&timezone=auto
- Colour split is blue (address) / green (endpoint) / orange (parameters).
- Labels swap to Stocky / API / Odoo at 01:04; the answer card says "18 sets".
- Start button, hover controls, progress bar and watermark present; nothing overflows the 1920x1080 stage.
```

**After Claude builds it:** Watch scenes 13-17 once at full screen: the URL is long, so ask Claude to reduce the URL font if it wraps awkwardly. Start the recorder, then click Start; trim the first second.

---

## Prompt 2 of 5: Your First Live API Call: Weather in Shenzhen (07:00–11:00, 4 min 0 s)

**What this demo shows:** Pasting the Open-Meteo URL into a browser, reading the JSON forecast for Shenzhen as a "shopping list" and as columns, then changing the coordinates to Dubai.

### Copy this prompt into Claude:

```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. It will be screen-recorded and used in a beginner course for supply-chain managers ("The ERP Agent Blueprint"). This section shows a learner calling a real, free weather API (Open-Meteo) straight from the browser address bar, and teaches how to read the JSON answer like a labelled shopping list and like Excel columns. Then the coordinates are changed from Shenzhen to Dubai.

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
- Chrome-style browser window filling ~90% of the stage: grey tab bar (one tab), address bar with a padlock icon, white page.
- Browser JSON view: at the top of the page a thin bar with a checkbox labelled "Pretty-print". Before it is ticked, the JSON shows as one long wrapped line in small monospace-looking Inter. After it is ticked, the JSON is laid out line by line with 2-space indents: keys in dark purple, strings in green, numbers in blue, brackets in grey. Font 30px when pretty-printed so it reads on video.
- Optional right-side panel (scenes 16-18): a small Google Sheets-style mini table (green accent header, grid lines) titled "Read it like columns".

DATA TO SHOW (exact)
- Tab title: "New Tab", then "api.open-meteo.com/v1/forecast?..." after loading.
- URL 1 (Shenzhen): https://api.open-meteo.com/v1/forecast?latitude=22.54&longitude=114.06&daily=precipitation_sum,wind_speed_10m_max&timezone=auto
- Response 1 (pretty-printed):
  {
    "latitude": 22.530754,
    "longitude": 114.08714,
    "generationtime_ms": 0.0821,
    "utc_offset_seconds": 28800,
    "timezone": "Asia/Shanghai",
    "timezone_abbreviation": "GMT+8",
    "elevation": 12.0,
    "daily_units": {
      "time": "iso8601",
      "precipitation_sum": "mm",
      "wind_speed_10m_max": "km/h"
    },
    "daily": {
      "time": ["2026-11-17", "2026-11-18", "2026-11-19", "2026-11-20", "2026-11-21", "2026-11-22", "2026-11-23"],
      "precipitation_sum": [0.1, 0.4, 1.4, 0.0, 0.0, 0.0, 0.0],
      "wind_speed_10m_max": [16.3, 19.3, 13.7, 12.2, 14.8, 17.6, 15.1]
    }
  }
  (latitude, longitude, timezone, units, dates, all rain values and the first three wind values are from the script's test run; generationtime_ms, elevation and the last four wind values are illustrative fillers. Keep them exactly as written here.)
- Column table (scene 16): Date | Rain (mm) | Wind max (km/h) with the 7 rows above (17 Nov 0.1 16.3; 18 Nov 0.4 19.3; 19 Nov 1.4 13.7; 20 Nov 0.0 12.2; 21 Nov 0.0 14.8; 22 Nov 0.0 17.6; 23 Nov 0.0 15.1).
- Thresholds card: "50-80 mm rain = a seriously wet day" (red), "Wind above 60-70 km/h = ask your supplier if the port is running" (amber).
- URL 2 (Dubai): https://api.open-meteo.com/v1/forecast?latitude=25.20&longitude=55.27&daily=precipitation_sum,wind_speed_10m_max&timezone=auto
- Response 2 (pretty-printed, illustrative values except the timezone): "latitude": 25.1875, "longitude": 55.25, "timezone": "Asia/Dubai", "timezone_abbreviation": "GMT+4", same daily_units, same 7 dates, "precipitation_sum": [0.0, 0.0, 0.0, 0.2, 0.0, 0.0, 0.0], "wind_speed_10m_max": [18.4, 21.0, 16.9, 14.3, 15.5, 19.8, 17.2].
- Supplier context: "Gulf Lubricants, Dubai: supplies BL-1007 Hydraulic Oil".
- Five supplier cities (scene 22): Columbus (39.96, -83.00), Chicago (41.88, -87.63), Monterrey (25.69, -100.32), Shenzhen (22.54, 114.06), Dubai (25.20, 55.27).
- ON-SCREEN TEXT 1: https://api.open-meteo.com/v1/forecast?latitude=22.54&longitude=114.06&daily=precipitation_sum,wind_speed_10m_max&timezone=auto  (this long caption may wrap to two lines; reduce to 28px for this one caption only)
- ON-SCREEN TEXT 2: "Read JSON like columns: date 1 <-> rain 1 <-> wind 1"

TIMELINE (scene by scene; times relative to the start of this demo)
1. 00:00-00:05 | Browser with an empty "New Tab". Cursor glides to the address bar and clicks; the bar gets a blue focus ring. | No callout.
2. 00:05-00:14 | URL 1 is pasted (appears instantly with a brief light-blue paste flash, caret at the end). | ON-SCREEN TEXT lower-third 00:06-00:11: the full URL 1. Callout under the address bar: "Copy it from your activity file".
3. 00:14-00:28 | Three small chips pop in one by one beside the address bar, each with a crossed-out icon: "No sign-up", "No download", "No key card needed". | Callout: "Open-Meteo: a free weather service".
4. 00:28-00:35 | A keycap "Enter" graphic appears near the cursor and presses down; the tab shows a loading spinner for 0.6 s. | No callout.
5. 00:35-00:42 | The raw JSON appears as one dense wrapped line. A tiny green badge top-right of the page: "< 1 second". | Callout: "The waiter is back at our table".
6. 00:42-00:50 | Cursor clicks the "Pretty-print" checkbox; the JSON reflows line by line with indents and syntax colours (0.8 s animated reflow). | Callout on the checkbox: "Tick Pretty-print".
7. 00:50-00:59 | Hold on the full pretty-printed JSON. | Callout: "Looks like gibberish? It's a shopping list."
8. 00:59-01:05 | Zoom (1.0 to 1.6) onto the top lines: latitude, longitude, timezone. | No callout.
9. 01:05-01:20 | On "latitude", "longitude", "timezone": the key (left, in quotes) gets a blue tag "LABEL", the colon pulses, the value gets a green tag "VALUE". | Callout: "JSON (say 'Jason') = a labelled shopping list".
10. 01:20-01:32 | A small paper shopping-list card slides in at the right: "Milk: 2 litres" / "Eggs: 12", and beneath it the same style: "latitude: 22.53" / "timezone: Asia/Shanghai". | Callout: "Label : value".
11. 01:32-01:45 | Highlight "22.530754" next to a ghost tag "you asked: 22.54". A small map pin snaps to a nearby grid dot. Zoom back out at 01:43. | Callout: "Nearest weather grid point. Close enough for a city."
12. 01:45-02:09 | Amber highlight box around the "daily_units" block; chips appear: "rain in mm", "wind in km/h". | Callout: "A good API always tells you its units". Hold.
13. 02:09-02:18 | Blue box around the "daily" block; the square brackets pulse. | Callout: "[ ] = a list of several items, like a column in Excel".
14. 02:18-02:30 | The "time" list highlights; a counter "7 dates: 17 Nov to 23 Nov" appears. | Callout on the list.
15. 02:30-02:42 | "precipitation_sum" list highlights (green), then "wind_speed_10m_max" (blue). Small chips read "0.1, 0.4, 1.4, then zeros" and "16.3, 19.3, 13.7 ...". | No extra callout.
16. 02:42-03:00 | The three lists fly out of the JSON into the right-side mini table "Read it like columns" (Date | Rain (mm) | Wind max (km/h)); the 7 rows fill top to bottom (0.3 s each). Row 1 (17 Nov | 0.1 | 16.3) gets a yellow row highlight. | ON-SCREEN TEXT lower-third 02:44-02:49: "Read JSON like columns: date 1 <-> rain 1 <-> wind 1".
17. 03:00-03:08 | Row 3 (19 Nov | 1.4 | 13.7) highlighted green. | Callout: "1.4 mm = light drizzle. Nothing to worry about."
18. 03:08-03:20 | A thresholds card slides up under the table: red line "50-80 mm rain = a seriously wet day", amber line "Wind above 60-70 km/h = ask your supplier if the port is running". At 03:14 a small corner card: "PAUSE & THINK: Which day has the most rain this week? Would you warn Sarah?" | Cards as described.
19. 03:20-03:30 | Table and cards fade. Cursor clicks into the address bar, double-click-drags to select "latitude=22.54&longitude=114.06" (selection in light blue), then types "latitude=25.20&longitude=55.27". | Callout under the bar: "Gulf Lubricants, Dubai: supplies BL-1007 Hydraulic Oil".
20. 03:30-03:34 | Enter keycap; brief loading spinner; Response 2 appears pretty-printed. | No callout.
21. 03:34-03:48 | Highlight "timezone": "Asia/Dubai" (yellow box), then the precipitation_sum list of zeros (green). | Callout: "New order details -> a different dish".
22. 03:48-03:59 | The browser shrinks to the left; on the right, five city chips (Columbus, Chicago, Monterrey, Shenzhen, Dubai with their lat/long) each send a small dot into one shared URL template "...forecast?latitude=__&longitude=__...". | Callout: "Stocky: same request, five sets of order details".
23. 03:59-04:00 | END card. | "END"

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
[00:00-00:35] Okay, this is the moment. I've opened a brand-new browser tab, the same browser you use for email. I'm pasting in the web address from the screen. You'll find it in your activity file too, so you don't have to type it. Notice what we're NOT doing. We're not signing up. We're not downloading anything. Open-Meteo is a free weather service that lets anyone ask for a forecast. No key card needed. I press Enter.
[00:35-00:59] And there it is. The waiter is back at our table. This is a real response, from a real weather service, about the real city of Shenzhen, and it took less than a second. I know what you're thinking. "This looks like computer gibberish." Give me sixty seconds. It's actually a shopping list.
[00:59-01:45] This format is called JSON. Say it like the name "Jason". And the easiest way to think about JSON is as a labelled shopping list. Every line has a label on the left, in quotes, then a colon, then the value on the right. So here: label "latitude", value 22.53. Label "timezone", value "Asia/Shanghai". It's the same as a shopping list that says "Milk: 2 litres. Eggs: 12." Notice the latitude came back as 22.53, not exactly the 22.54 we asked for. That's the weather service saying, "my nearest weather grid point is here." Close enough for a city.
[01:45-02:09] Now this bit is really helpful. "Daily units." It tells us rainfall is measured in millimetres, and wind speed in kilometres per hour. A good API always tells you its units. Hold on to that idea, because in the next video, on databases, mixed-up units are going to be our enemy number one.
[02:09-03:20] Here's the actual forecast. Square brackets mean "a list of several items", like a column in Excel. "Time" is a list of seven dates. On the day I tested this, it started with the 17th of November and went to the 23rd. "Precipitation sum" is a list of seven rainfall numbers: 0.1, 0.4, 1.4, then zeros. "Wind speed max" is seven wind numbers: 16.3, 19.3, 13.7, and so on. The trick is to read them like columns that line up. The first date goes with the first rain number and the first wind number. So the 17th: 0.1 millimetres of rain, wind up to 16.3 kilometres an hour. The 19th: 1.4 millimetres. That's a light drizzle, nothing to worry about. If you saw 50 or 80 millimetres, that's a seriously wet day, and if the wind went above 60 or 70, you'd want to ask your supplier whether the port is running.
[03:20-03:59] Now watch how easy it is to change the order. Gulf Lubricants, who supply our hydraulic oil, BL-1007, are in Dubai. Dubai is latitude 25.20, longitude 55.27. I change just those two numbers and press Enter. New response. The timezone now says "Asia/Dubai", and the rainfall is mostly zeros. No surprise there. I changed the order details, and the waiter brought back a different dish. That is literally all Stocky does when it checks five supplier cities. Same request, five different sets of order details.

CHECKLIST
- Total duration exactly 4:00 (240 s), END card in the last second.
- URL 1 and URL 2 match the DATA block character for character; only the latitude/longitude change.
- Response 1 shows latitude 22.530754, longitude 114.08714, timezone Asia/Shanghai, units mm and km/h, rain 0.1 / 0.4 / 1.4 then zeros, wind 16.3 / 19.3 / 13.7 first.
- The column table lines up row by row with the JSON lists.
- Start button, END card, watermark present; JSON is readable (at least 30px) and nothing overflows the stage.
```

**After Claude builds it:** Check that the pretty-printed JSON fits in the browser window without scrolling; if it doesn't, ask Claude to scale the JSON font down slightly. Record full-screen and trim the first second.

---

## Prompt 3 of 5: Second Live Call: The Currency Waiter (11:00–13:30, 2 min 30 s)

**What this demo shows:** Calling the Frankfurter currency API, the address bar redirecting from frankfurter.app to frankfurter.dev/v1, reading the USD rates for CNY and MXN, a cost-impact calculation, and noticing that AED is missing.

### Copy this prompt into Claude:

```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. It will be screen-recorded and used in a beginner course for supply-chain managers ("The ERP Agent Blueprint"). This section shows a second free API (Frankfurter, exchange rates) called from the browser. It teaches three things: APIs can move and leave a forwarding address (redirect), how to read a "list inside a list" in JSON, and to always check that you got everything you asked for (the UAE dirham is missing).

SECTION LENGTH: 2 min 30 s (150 seconds). The master timeline runs from 00:00 to 02:30 exactly.

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
- Chrome-style browser window: two tabs in the tab bar. Tab 1 "api.open-meteo.com/v1/forecast..." (already open, inactive); Tab 2 opened in the demo. Address bar with padlock.
- Browser JSON view with a "Pretty-print" checkbox bar at the top (already ticked); keys dark purple, strings green, numbers blue, 34px.
- Side cards: white rounded cards with soft shadow on the right third of the stage for the calculation.

DATA TO SHOW (exact)
- Typed/pasted URL: https://api.frankfurter.app/latest?from=USD&to=CNY,MXN,AED
- After redirect the address bar shows: https://api.frankfurter.dev/v1/latest?from=USD&to=CNY,MXN,AED
- Recommended address (PRO TIP): https://api.frankfurter.dev/v1/latest?from=USD&to=CNY,MXN
- Response (show minified first for 0.5 s, then pretty-printed):
  {"amount":1.0,"base":"USD","date":"2026-11-17","rates":{"CNY":6.6661,"MXN":18.4639}}
- Currency chips: "CNY = Chinese yuan", "MXN = Mexican peso", "AED = UAE dirham".
- Rounded: "1 USD = 6.67 CNY", "1 USD = 18.46 MXN".
- Calculation card:
  "Global Lift Parts (Shenzhen) bills in yuan"
  "60 sets BL-1005 x $38 = $2,280"
  "$2,280 x 6.67 = about 15,200 CNY invoice"
  "If the yuan gets 3% stronger: $1 buys about 6.47 CNY"
  "Same 15,200 CNY invoice = about $2,350"
  "+$68, and nobody changed the price" (red, bold)
  "Same story: SafeHands Co. gloves, billed in pesos"
- Missing-item checklist: "Asked: CNY  MXN  AED" -> "Got: CNY (tick)  MXN (tick)  AED (red cross, missing)".
- Info card: "Frankfurter's source: the European Central Bank. Its kitchen doesn't stock the dirham. No crash, no error: the waiter brought what the kitchen had."
- Peg chip: "AED is pegged to the dollar at about 3.67, so it barely moves".
- ON-SCREEN TEXT: "Always check: did I get everything I asked for?"

TIMELINE (scene by scene; times relative to the start of this demo)
1. 00:00-00:04 | Browser on Tab 1 (a faded Open-Meteo JSON). Cursor clicks the "+" new-tab button; an empty Tab 2 "New Tab" opens. | No callout.
2. 00:04-00:10 | Cursor clicks the address bar; the Frankfurter URL is pasted (light-blue paste flash). | Callout: "Frankfurter: exchange rates. Free, no key card."
3. 00:10-00:24 | Inside the address bar, segments highlight in turn: "/latest" (green) -> label "endpoint: the latest rates"; "from=USD" (orange) -> "from: US dollar"; "to=CNY,MXN,AED" (orange) -> three chips pop below: "CNY = Chinese yuan", "MXN = Mexican peso", "AED = UAE dirham". | Small caption chip: "The three currencies BrightLeaf's suppliers bill in".
4. 00:24-00:27 | Enter keycap presses; loading spinner. | No callout.
5. 00:27-00:33 | The address text visibly morphs (letters slide) from "api.frankfurter.app/latest?..." to "api.frankfurter.dev/v1/latest?..."; the JSON appears minified, then pretty-prints. | No callout yet.
6. 00:33-00:45 | Zoom (1.0 to 1.6) onto the address bar. ".app" shows a red strike ghost above, ".dev/v1" glows green. A small illustration pops beside it: an old door with a sticky note "Moved to frankfurter.dev/v1 ->". | Callout: "The restaurant moved. Your browser followed the forwarding note."
7. 00:45-00:52 | Zoom out. A PRO TIP card slides in at the bottom-right: "Save the new address: https://api.frankfurter.dev/v1/latest?from=USD&to=CNY,MXN (the one Stocky will use)". | PRO TIP card.
8. 00:52-01:02 | Highlights step through the JSON: "amount": 1.0 -> "base": "USD" -> "date": "2026-11-17" (yellow boxes, 3 s each). | Callout follows: "Amount: 1", "Base: USD", "Date: 17 Nov".
9. 01:02-01:12 | A rounded outline draws around the "rates" object, with a smaller inner outline. | Callout: "A list inside a list (like a 'Dairy' section on a shopping list)".
10. 01:12-01:20 | Chips appear next to the values: "1 USD = 6.67 CNY", "1 USD = 18.46 MXN". A small pulsing red dot badge "LIVE: your numbers will differ". | Badge as described.
11. 01:20-01:42 | The browser slides left to 60% width; the calculation card builds line by line on the right (one line every ~3.5 s), ending with "+$68, and nobody changed the price" in red bold with a gentle shake. | Card lines as in DATA.
12. 01:42-01:55 | The card's last line "Same story: SafeHands Co. gloves, billed in pesos" appears; then a small Stocky robot icon with a bell. | Callout: "Stocky can spot this the moment it happens".
13. 01:55-02:05 | Card slides away, browser returns to full width. A hand-drawn red circle animates around the "rates" block. The checklist appears: "Asked: CNY MXN AED" / "Got: CNY (tick) MXN (tick) AED (red cross)". | Callout: "We asked for three. We got two."
14. 02:05-02:15 | Info card: "Frankfurter's source: the European Central Bank. Its kitchen doesn't stock the dirham. No crash, no error: the waiter brought what the kitchen had." | Info card.
15. 02:15-02:22 | Amber chip: "AED is pegged to the dollar at about 3.67, so it barely moves". | Chip.
16. 02:22-02:29 | Hold on the JSON with the red circle. | ON-SCREEN TEXT lower-third 02:23-02:28: "Always check: did I get everything I asked for?"
17. 02:29-02:30 | END card. | "END"

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
[00:00-00:27] Let's try a second restaurant. This one is called Frankfurter, and it serves exchange rates. It's free and needs no key card either. Read the order with me. The endpoint is "latest", meaning the latest rates. The order details: "from" equals USD, the US dollar, and "to" equals CNY, MXN and AED. Chinese yuan, Mexican peso and UAE dirham, the three foreign currencies BrightLeaf's suppliers bill in. Enter.
[00:27-00:52] First, a little surprise. Look at the address bar. It changed by itself. We typed frankfurter dot app, and now it says frankfurter dot dev, slash v1. The restaurant moved to a new building and left a forwarding note on the old door. Your browser read the note and walked over automatically. APIs do move house sometimes, and good ones leave a forwarding address.
[00:52-01:55] Now the shopping list. "Amount": 1. "Base": USD. "Date": the 17th of November. Then "rates", with a smaller list inside it: CNY 6.67, MXN 18.46. A list inside a list, like a shopping list with a "Dairy" section that has its own items. So on test day, one dollar bought 6.67 yuan and 18.46 pesos. Your numbers will be different, and that's the point. It's live. Let's make that real for Sarah. Global Lift Parts bills in yuan. Sixty sets of pallet jack wheels at thirty-eight dollars is two thousand two hundred and eighty dollars, which at 6.67 is an invoice of about fifteen thousand two hundred yuan. Now say the yuan gets three percent stronger, and a dollar only buys about 6.47 yuan. That same yuan invoice now costs about two thousand three hundred and fifty dollars. Sixty-eight dollars more, without anyone changing the price. Same story for SafeHands gloves in pesos. Stocky can spot that the moment it happens.
[01:55-02:29] Now, did you notice something missing? We asked for three currencies. We got two. Where's the dirham? Great lesson. Frankfurter gets its numbers from the European Central Bank, and that kitchen doesn't stock the dirham. The waiter didn't crash or argue. It just brought what the kitchen had. Luckily the dirham is pegged to the dollar at about 3.67, so it barely moves. But the habit matters: always check that what came back matches what you asked for. We'll teach Stocky to notice missing items too.

CHECKLIST
- Total duration exactly 2:30 (150 s), END card in the last second.
- The address visibly changes from frankfurter.app to frankfurter.dev/v1.
- JSON is exactly {"amount":1.0,"base":"USD","date":"2026-11-17","rates":{"CNY":6.6661,"MXN":18.4639}} (no AED).
- Calculation numbers: $2,280, about 15,200 CNY, 6.47, about $2,350, +$68.
- Start button, END card, watermark present; nothing overflows the stage.
```

**After Claude builds it:** Make sure the address-bar morph at 00:27 is clearly visible (ask for a slower morph if it flickers). Record full-screen and trim the first second.

---

## Prompt 4 of 5: Status Codes: The Receipts (15:00–18:00, 3 min 0 s)

**What this demo shows:** Four "receipt" cards (200, 401, 404, 429), the 2xx/4xx/5xx shortcut, then two deliberate mistakes in the Open-Meteo address (a 404 and a "banana" bad request) and the fix.

### Copy this prompt into Claude:

```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. It will be screen-recorded and used in a beginner course for supply-chain managers ("The ERP Agent Blueprint"). This section teaches HTTP status codes as "receipts" the waiter (the API) hands back, then breaks a real API call on purpose twice (a typo, then a nonsense parameter) so learners see what errors look like and how to fix them.

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
- Part 1 (00:00-01:47): full-stage slide, white background, title at top in navy 56px bold. Receipt cards: tall paper-style cards (off-white #FFFDF7, zig-zag bottom edge, light shadow), a big code number (110px bold) and a coloured top stripe.
- Part 2 (01:47-03:00): Chrome-style browser window with one tab "api.open-meteo.com/v1/forecast...", address bar with padlock, JSON view with a ticked "Pretty-print" checkbox; keys dark purple, strings green, numbers blue, 34px. A small "receipt" mini-card can pop up at the top-right of the page to label each result.

DATA TO SHOW (exact)
- Slide title: "Every response comes with a receipt"
- Card 200 (green stripe): "200 OK" / "Your order went perfectly." / tag "Both our calls today: 200"
- Card 401 (red stripe): "401" / "Wrong key card" / "API key missing, mistyped or cancelled"
- Card 404 (red stripe): "404 Not Found" / "Wrong address" / "9 times out of 10: a typo in the web address"
- Card 429 (amber stripe): "429" / "Too many orders" / "Slow down: wait and try again, or ask less often"
- Extra card 500 (grey stripe): "500" / "The kitchen's problem, not yours" / "Wait a few minutes and try again"
- Group labels: "2xx = good news" (green), "4xx = your mistake" (amber), "5xx = their kitchen's problem" (grey)
- Good URL: https://api.open-meteo.com/v1/forecast?latitude=22.54&longitude=114.06&daily=precipitation_sum,wind_speed_10m_max&timezone=auto
- Good response (pretty-printed, short version): "latitude": 22.530754, "longitude": 114.08714, "timezone": "Asia/Shanghai", "daily_units": {...mm, km/h}, "daily": {"time": ["2026-11-17", ... "2026-11-23"], "precipitation_sum": [0.1, 0.4, 1.4, 0.0, 0.0, 0.0, 0.0], "wind_speed_10m_max": [16.3, 19.3, 13.7, 12.2, 14.8, 17.6, 15.1]}
- Mistake 1 URL: https://api.open-meteo.com/v1/forecst?latitude=22.54&longitude=114.06&daily=precipitation_sum,wind_speed_10m_max&timezone=auto
- Mistake 1 response: {"reason":"Not Found","error":true}
- Mistake 2 URL: https://api.open-meteo.com/v1/forecast?latitude=22.54&longitude=114.06&daily=banana&timezone=auto
- Mistake 2 response: {"reason":"Invalid value: Cannot initialize ForecastVariableDaily from invalid String value banana","error":true}
- Mini receipts in the browser: "404 Not Found", "400 Bad Request", "200 OK"
- PRO TIP chip: "See the number: Firefox's JSON viewer has a Headers tab. n8n shows it on every step."
- ON-SCREEN TEXT: "2xx = good news · 4xx = your mistake · 5xx = their kitchen's problem"

TIMELINE (scene by scene; times relative to the start of this demo)
1. 00:00-00:12 | Slide fades in with the title "Every response comes with a receipt". A small waiter icon on the left slides a paper slip forward; four receipt cards fly in face-down in a row. | No callout.
2. 00:12-00:20 | A navy label above the cards: "Status code = how the order went". A small chip: "You only need 4". | Callout as described.
3. 00:20-00:33 | Card 200 flips face-up (green stripe), green tick stamp, tag "Both our calls today: 200". | Callout: "OK, here's your food".
4. 00:33-00:48 | Card 401 flips (red stripe) with a key-card icon and a red cross. | Callout: "I don't know who you are".
5. 00:48-01:03 | Card 404 flips (red stripe) with a map-pin icon and a question mark. | Callout: "Not on the menu / wrong table".
6. 01:03-01:19 | Card 429 flips (amber stripe) with a stopwatch icon; tiny order slips pile up rapidly behind it. | Callout: "Please slow down".
7. 01:19-01:24 | Cards slide into three buckets: "2xx" (200), "4xx" (401, 404, 429), "5xx" (empty). | ON-SCREEN TEXT lower-third 01:20-01:25: "2xx = good news · 4xx = your mistake · 5xx = their kitchen's problem".
8. 01:24-01:38 | Card 500 drops into the 5xx bucket with a small smoking-pan icon. | Callout: "Not your fault. Wait a few minutes and try again."
9. 01:38-01:47 | Buckets fade; a friendly banner: "Let's break something on purpose" with a green shield chip "You can't break anything here". | Banner.
10. 01:47-01:52 | Cut to the browser showing the good Open-Meteo JSON. Zoom 1.5 on the address bar; cursor clicks right after "forec", the "a" is deleted with a backspace (text becomes "forecst"). | Callout: "Delete one letter".
11. 01:52-01:55 | Enter keycap; the page shows {"reason":"Not Found","error":true}. Zoom out. | No callout.
12. 01:55-02:13 | Yellow box around the response; the mini receipt "404 Not Found" pops at top-right; the URL word "forecst" gets a red wavy underline. | Callout: "One missing letter: there's no dish called 'forecst'".
13. 02:13-02:18 | Cursor clicks in the URL and types the "a" back ("forecast" again, underline disappears). | Small green chip "fixed".
14. 02:18-02:26 | Cursor double-clicks/selects "precipitation_sum,wind_speed_10m_max" and types "banana"; Enter at 02:25. | Callout: "Right dish, silly order detail".
15. 02:26-02:40 | Response 2 appears: {"reason":"Invalid value: Cannot initialize ForecastVariableDaily from invalid String value banana","error":true}. The word "banana" gets a yellow highlight; mini receipt "400 Bad Request" pops (amber). | Callout: "400 = bad request. Still a 4-something: our side."
16. 02:40-02:54 | Callout arrow points at the message text. A small PRO TIP chip appears bottom-left: "See the number: Firefox's JSON viewer has a Headers tab. n8n shows it on every step." | Callout: "Read the message. It tells you what to fix."
17. 02:54-02:59 | Cursor selects "banana" and pastes "precipitation_sum,wind_speed_10m_max"; Enter; the clean forecast JSON returns; mini receipt "200 OK" (green) pops. | Callout: "Back to 200. Fixed in two seconds."
18. 02:59-03:00 | END card. | "END"

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
[00:00-01:19] Every time the waiter comes back, he also hands you a little receipt with a number on it. This number is called a status code, and it tells you how the order went, before you even look at the plate. You don't need to memorise hundreds. Four will cover almost everything you'll meet. 200, OK. Your order went perfectly, here's your food. Both our calls today came back with a 200. 401, wrong key card. You tried to open a door your card doesn't open. The API is saying, "I don't know who you are." Usually it means your API key is missing, mistyped or cancelled. 404, wrong address. Not Found. You asked for a dish that isn't on the menu, or you walked to the wrong table. Nine times out of ten, it's a typo in the web address. 429, too many orders. You're ordering too fast. Free APIs often say, "Please slow down, you've asked me a thousand times this minute." The fix is simple. Wait and try again, or ask less often.
[01:19-01:47] Here's a shortcut. Anything starting with a 2 is good news. Anything starting with a 4 means something was wrong with your order. Anything starting with a 5, like 500, means the kitchen itself had a problem, and it's not your fault. Wait a few minutes and try again. Now let's break something on purpose. You can't break anything here, I promise.
[01:47-01:52] I'm going to misspell "forecast". I'll take out the "a". Enter.
[01:52-02:13] Look at that. "Reason: Not Found. Error: true." That's our 404 receipt. We asked for a dish called "forecst", and there's no such dish on the menu. One missing letter. This is the single most common beginner error, and now you've seen it. You'll recognise it forever.
[02:13-02:26] Let's fix that and try a different mistake. This time the dish is right, but I'll ask for a silly order detail. Instead of rainfall, I'll ask for "banana".
[02:26-02:54] The restaurant exists, the dish exists, but the order doesn't make sense. The waiter says, "I can't give you a daily banana." That's a 400, "bad request", another 4-something, so it's on our side. And look how helpful it is. It tells us exactly which word it didn't understand. When something goes wrong, read the message. It usually tells you what to fix.
[02:54-02:59] And we're back to a 200. Everything fixed in two seconds.

CHECKLIST
- Total duration exactly 3:00 (180 s), END card in the last second.
- Four main receipt cards 200, 401, 404, 429 plus the 500 card in the 5xx bucket.
- Error JSON texts match the DATA block exactly (including "forecst" and "banana").
- The URL edits are visible (zoomed) and the final state is a clean 200 forecast.
- Start button, END card, watermark present; nothing overflows the stage.
```

**After Claude builds it:** The URL edits happen fast; if the deleted "a" is hard to see, ask Claude to keep the zoom on the address bar for one more second. Record full-screen and trim the first second.

---

## Prompt 5 of 5: API Keys: Your Hotel Key Card (18:00–20:30, 2 min 30 s)

**What this demo shows:** The hotel key card analogy, then where Odoo keeps API keys: Settings > Activate the developer mode > avatar > My Profile > Account Security > API Keys (without creating one), and the three key card rules.

### Copy this prompt into Claude:

```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. It will be screen-recorded and used in a beginner course for supply-chain managers ("The ERP Agent Blueprint"). This section explains API keys as hotel key cards (open only certain doors, belong to one guest, can be cancelled), then shows where API keys live in the Odoo ERP without creating one, and ends with three safety rules.

SECTION LENGTH: 2 min 30 s (150 seconds). The master timeline runs from 00:00 to 02:30 exactly.

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
- Part 1 (00:00-00:46): full-stage slide, white background. A large hotel key card (rounded rectangle, navy with a subtle gradient, white text) and a row of simple door icons.
- Part 2 (00:46-02:07): Chrome-style browser showing an Odoo-style ERP: purple-ish top bar (#714B67) with the current app name on the left and, on the right, a small bug icon (only after developer mode is on) and a round avatar with initials "SM". White content area.
  - Home screen: grid of app tiles with simple icons and names: Inventory, Purchase, Sales, Contacts, Settings.
  - Settings page: left list of setting sections, long page; at the very bottom a section "Developer Tools" with blue links "Activate the developer mode", "Activate the developer mode (with assets)", "Activate the developer mode (with tests assets)".
  - Avatar dropdown: "My Profile", "Documentation", "Support", "Log out".
  - Profile form: title "Sarah Mitchell", email "sarah@brightleaf-demo.com", tabs "Preferences" and "Account Security". Account Security tab: a "Password" row with a "Change Password" button, then a section "API Keys" with an empty table (columns "Description", "Scope", "Expiration date") and a button "New API Key".
- Part 3 (02:07-02:29): three rule cards over a dimmed browser.

DATA TO SHOW (exact)
- Slide chips: "Weather & currency APIs: serve anyone" (open door, green) vs "Odoo: BrightLeaf's stock, costs and customers" (locked door, navy).
- Key card text: "Room 412 · Gym · Pool. NOT the manager's office."
- Doors: "Room 412" (tick), "Gym" (tick), "Pool" (tick), "Other guests' rooms" (cross), "Manager's office" (cross).
- Card cancel: stamp "CANCELLED", new card slides in; passport icon labelled "Your password: unchanged".
- Summary card: "An API key: opens only what it's allowed to · belongs to one user · can be cancelled any time without changing your password".
- Browser URLs: https://brightleaf-demo.odoo.com/odoo (home), https://brightleaf-demo.odoo.com/odoo/settings (Settings), after activation https://brightleaf-demo.odoo.com/odoo/settings?debug=1, profile https://brightleaf-demo.odoo.com/odoo/my-profile?debug=1 (illustrative paths).
- Banner: "Today we only find reception. We create the key when we connect Stocky."
- Profile dropdown note: "Called 'Preferences' in some versions".
- Ghost preview (illustrative, faded, labelled "example"): key "••••••••••••••••••••7c2e" with the tag "Shown exactly once".
- Permission diagram: "Sarah's key -> Stocky acts as Sarah (same permissions)" then "Better: Stocky gets its own user, only the access it needs".
- ON-SCREEN TEXT: "Key card rules: 1) never share it in email or chat 2) one key per tool 3) cancel it if in doubt"
- Rule cards: "1 Never paste a key into an email, a WhatsApp chat or a shared document" / "2 Give each tool its own key" / "3 Might have leaked? Delete it and make a new one. 10 seconds."

TIMELINE (scene by scene; times relative to the start of this demo)
1. 00:00-00:12 | Slide: two chips side by side: an open green door "Weather & currency APIs: serve anyone" and a locked navy door "Odoo: BrightLeaf's stock, costs and customers". | Callout on the locked door: "Private: needs a key".
2. 00:12-00:30 | The hotel key card slides in large in the centre: "Room 412 · Gym · Pool. NOT the manager's office." Below, five door icons; the card glides to each: Room 412, Gym, Pool turn green with a tick; "Other guests' rooms" and "Manager's office" flash red with a cross. | Callout: "API key = hotel key card".
3. 00:30-00:46 | The card falls away ("lost"), a red "CANCELLED" stamp hits it; a fresh card slides in. A passport icon beside it stays still with label "Your password: unchanged". Then the summary card fades in. | Summary card text as in DATA.
4. 00:46-00:52 | Transition to the browser at https://brightleaf-demo.odoo.com/odoo with the app tile grid. Cursor glides to the "Settings" tile and clicks (tile pressed state). | Banner at top: "Today we only find reception. We create the key when we connect Stocky."
5. 00:52-01:04 | Settings page loads; smooth scroll (1.5 s) to the very bottom; the "Developer Tools" section appears. Yellow box around "Activate the developer mode". | Callout: "Don't be put off by the name: it just shows a few extra options".
6. 01:04-01:16 | Cursor clicks "Activate the developer mode"; the page does a quick white reload flash; the URL gains "?debug=1"; a small bug icon fades into the top bar. Zoom 1.6 on the bug icon, then back. | Callout: "Developer mode ON".
7. 01:16-01:24 | Cursor clicks the "SM" avatar top-right; dropdown opens; "My Profile" highlights (tiny grey note beside it: "Called 'Preferences' in some versions"); click. | No extra callout.
8. 01:24-01:32 | Profile form "Sarah Mitchell" loads; cursor clicks the "Account Security" tab (tab underline slides). | Callout: "Account Security".
9. 01:32-01:48 | Zoom 1.5 onto the "API Keys" section and the "New API Key" button. Cursor hovers on the button (hover state) but does NOT click; an amber tag above it: "Not today". | Callout: "This is where Odoo keeps the key cards".
10. 01:48-01:58 | Beside the section, a faded "example" card shows "••••••••••••••••••••7c2e" with the tag "Shown exactly once". Zoom out. | Callout: "Copy it straight to a safe place. Odoo never shows it again."
11. 01:58-02:07 | Small diagram overlay: "Sarah's key -> Stocky acts as Sarah (same permissions)" with an amber warning icon, then a green line: "Better: Stocky gets its own user, only the access it needs". | Callout: "Its own key card, not the manager's master key".
12. 02:07-02:14 | Browser dims. | ON-SCREEN TEXT lower-third 02:08-02:13: "Key card rules: 1) never share it in email or chat 2) one key per tool 3) cancel it if in doubt"
13. 02:14-02:29 | The three rule cards pop in one at a time (02:14, 02:19, 02:24): rule 1 with crossed email/chat/document icons; rule 2 with three tools each holding its own key; rule 3 with a trash icon on a key row and a "10 seconds" timer chip. Hold. | Cards as in DATA.
14. 02:29-02:30 | END card. | "END"

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
[00:00-00:46] The weather and currency APIs serve anyone. But Odoo holds BrightLeaf's stock, costs and customers. You don't want the whole world asking that waiter for things. So private APIs ask for an API key, and an API key is like a hotel room key card. It opens your room, maybe the gym. Not other guests' rooms, not the manager's office. Lose it, and reception cancels it and gives you a new one. Your passport doesn't change. Just the card. An API key works the same way. It opens only what it's allowed to, it belongs to a specific user, and it can be cancelled any time without changing your password.
[00:46-01:16] Let me show you where Odoo keeps these key cards. We won't create one today; we'll do that when we connect Stocky. I just want you to know where reception is. In the BrightLeaf Odoo trial, I open the Settings app and scroll to the bottom. There's a link called "Activate the developer mode". Don't be put off by the name. It just shows a few extra options. Click it, and the page reloads.
[01:16-02:07] Now I click my profile picture in the top right corner, then "My Profile". In some versions it's called "Preferences". Then the tab called "Account Security". And here it is. "API Keys", with a button called "New API Key". When we create one later, Odoo will show the key exactly once, a long string of letters and numbers, and we'll paste it straight into a safe place. Odoo never shows it again. Notice something important. This key belongs to a user. When Stocky uses Sarah's key, Odoo treats Stocky like Sarah, with the same permissions. That's why, when we go live, we'll give Stocky its own user with only the access it needs. Its own key card, not the manager's master key.
[02:07-02:29] Three key card rules. One: never paste a key into an email, a WhatsApp chat or a shared document. Two: give each tool its own key, so cancelling one doesn't break the others. Three: if a key might have leaked, delete it here and make a new one. Ten seconds, and nothing else breaks.

CHECKLIST
- Total duration exactly 2:30 (150 s), END card in the last second.
- The click path is exactly: Settings -> Activate the developer mode -> avatar -> My Profile -> Account Security -> API Keys.
- The "New API Key" button is hovered but never clicked; no real key is shown (only the masked example).
- Key card text reads "Room 412 · Gym · Pool. NOT the manager's office."
- Start button, END card, watermark present; nothing overflows the stage.
```

**After Claude builds it:** If your real Odoo menu says "Preferences" instead of "My Profile", ask Claude to swap the label so it matches what learners will see. Record full-screen and trim the first second.

---
