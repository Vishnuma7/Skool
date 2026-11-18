# Video 8: Seeing Beyond the ERP: Connecting Outside APIs for Supply Chain Risk: Screen-Recording Prompts

**How to use:** 1. Open claude.ai, start a new chat, and paste ONE prompt. 2. Claude builds an animated demo you can preview. If anything looks wrong, reply in the same chat ("make the cursor slower", "the table is cut off"). 3. Open the demo full-screen in Chrome (press F11 / Ctrl+Cmd+F), start your screen recorder (QuickTime: File → New Screen Recording), then click **Start**. 4. Stop recording when the "END" card appears, trim the start and end, and add your voice-over from the script. Each demo runs for the same length as its script section, so the voice-over lines up.

**Sections in this video:**

| # | Section | Time | Length | Prompt |
|---|---|---|---|---|
| 1 | Three Free Windows: Testing the APIs in Your Browser | 02:00–06:00 | 4 min 0 s | Prompt 1 |
| 2 | The Supplier Risk Score on One Page | 07:30–09:45 | 2 min 15 s | Prompt 2 |
| 3 | Tool 1: Giving Stocky a Weather Window | 09:45–12:45 | 3 min 0 s | Prompt 3 |
| 4 | Tools 2 and 3: Currency and Holidays | 12:45–15:15 | 2 min 30 s | Prompt 4 |
| 5 | Stocky's Rulebook, a Live Run and a Fire Drill | 17:00–22:15 | 5 min 15 s | Prompt 5 |

---

## Prompt 1 of 5: Three Free Windows: Testing the APIs in Your Browser (02:00–06:00, 4 min 0 s)

**What this demo shows:** Three free, no-key APIs (Open-Meteo weather, Frankfurter currency, Nager.Date holidays) answering live orders in the browser, including the blank answer for the UAE.

### Copy this prompt into Claude:

```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. This section teaches beginners that three free, no-key APIs can be tested by simply pasting a web address into the browser: Open-Meteo (weather for Shenzhen), Frankfurter (US dollar to yuan and peso, today and on a past date) and Nager.Date (public holidays for China, the US, Mexico and the UAE, where the answer is blank).

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
- Slide look (scenes 1-3 and the cities table): white card on a soft grey background, navy title in Inter Bold 56px. Three "window" cards (rounded, with a little window-frame top bar) side by side: "Weather (Open-Meteo)" with a cloud icon, "Currency (Frankfurter)" with a $ icon, "Holidays (Nager.Date)" with a calendar icon. Each gets a green pill badge "FREE · NO KEY".
- Browser JSON view: a Chrome-style browser window with three tabs. The page shows the raw JSON response in Chrome's "pretty print" style (monospace 24px, keys in purple, numbers in blue, strings in green), with a small "Pretty-print [ ]" checkbox at the top-left of the page.
- Cities table: a clean table card with a small map-pin icon at the start of each row.

DATA TO SHOW (copy exactly; do not change any number, name, URL or wording)
Tab 1 URL (Open-Meteo):
https://api.open-meteo.com/v1/forecast?latitude=22.54&longitude=114.06&daily=precipitation_sum,wind_speed_10m_max&timezone=auto&forecast_days=7
Tab 1 result (weather changes daily, so use these calm-week sample values: small rain numbers, mostly zero; wind all well under 40):
{
  "latitude": 22.54, "longitude": 114.06, "timezone": "Asia/Shanghai",
  "daily_units": { "time": "iso8601", "precipitation_sum": "mm", "wind_speed_10m_max": "km/h" },
  "daily": {
    "time": ["2026-11-17","2026-11-18","2026-11-19","2026-11-20","2026-11-21","2026-11-22","2026-11-23"],
    "precipitation_sum": [0.0, 0.2, 0.0, 1.1, 0.4, 0.0, 0.0],
    "wind_speed_10m_max": [14.8, 17.3, 12.6, 19.4, 21.0, 16.2, 13.5]
  }
}
Typhoon comparison card: "Typhoon: winds of 120 km/h and more, and 100+ mm of rain in a day".

Supplier cities and map pins (table):
| City | Suppliers | Latitude | Longitude |
| Shenzhen | Shenzhen BrightTech, Global Lift Parts | 22.54 | 114.06 |
| Dubai | Gulf Lubricants | 25.20 | 55.27 |
| Monterrey | SafeHands Co. | 25.69 | -100.32 |
| Chicago | PackRight Industries | 41.88 | -87.63 |
| Columbus | Apex Fasteners | 39.96 | -83.00 |

Tab 2 URL (Frankfurter): https://api.frankfurter.dev/v1/latest?from=USD&to=CNY,MXN
Tab 2 result: {"amount":1.0,"base":"USD","date":"2026-11-17","rates":{"CNY":6.6661,"MXN":18.4639}}
Tab 2, edited URL: https://api.frankfurter.dev/v1/2026-10-16?from=USD&to=CNY,MXN
Edited result: {"amount":1.0,"base":"USD","date":"2026-10-16","rates":{"CNY":6.6862,"MXN":18.3835}}
Comparison panel: MXN 18.3835 (16 Oct) -> 18.4639 (17 Nov) = about 0.4% move; CNY 6.6862 -> 6.6661 = about 0.3% move.
AED card: "UAE dirham (AED) is pegged: 1 USD = about 3.67 AED, since 1997. Gulf Lubricants (Dubai): currency risk = 0."

Tab 3 URL (Nager.Date): https://date.nager.at/api/v3/PublicHolidays/2026/CN
Tab 3 result (show as a pretty-printed JSON array; each object has "date", "localName", "name", "countryCode"; show these entries):
CN: 2026-01-01 New Year's Day | 2026-02-17 Chinese New Year (Spring Festival) | 2026-05-01 Labour Day | 2026-06-19 Dragon Boat Festival | 2026-09-25 Mid-Autumn Festival | 2026-10-01 National Day
Then the URL ends in /2026/US: show a short list including 2026-11-26 "Thanksgiving Day" and 2026-12-25 "Christmas Day" (other rows may be 2026-01-01 New Year's Day, 2026-05-25 Memorial Day, 2026-09-07 Labor Day).
Then /2026/MX: list including 2026-11-16 "Revolution Day" and 2026-12-25 "Christmas Day" (other rows may be 2026-01-01 New Year's Day, 2026-09-16 Independence Day).
Then /2026/AE: the page is completely blank (white, nothing at all).

TIMELINE (scene by scene; times are relative to the section start; format: time | what appears / cursor action | callout or caption text)
1. 00:00–00:06 | Slide fades in: title "Three Free Windows". The three window cards slide up one after another: Weather (Open-Meteo), Currency (Frankfurter), Holidays (Nager.Date). | No callout (let the cards land)
2. 00:06–00:16 | A small waiter icon carrying a tray glides from a "You" chip to a "Kitchen" chip and back with a little JSON note on the tray. | Callout: "API = a waiter: you order, it brings back exactly what you asked for"
3. 00:16–00:25 | A green "FREE · NO KEY" badge stamps onto each card in turn (gentle pop, 0.3 s each), then hold. | Caption (lower-third): "No sign-up · No API key · No credit card"
4. 00:25–00:33 | Cross-fade to the browser, tab 1 "api.open-meteo.com". Cursor clicks the URL bar, the Open-Meteo URL is pasted in (instant paste with a brief blue flash), cursor presses Enter (show a small "Enter" keycap). | Callout on URL bar: "Paste the URL, press Enter"
5. 00:33–00:51 | Zoom (1.0 -> 1.6) on the URL bar. Segments light up in yellow one at a time (about 3.5 s each): "forecast", "latitude=22.54&longitude=114.06", "daily=precipitation_sum,wind_speed_10m_max", "timezone=auto", "forecast_days=7". | Labels under each segment in turn: "the menu" / "map pin for Shenzhen" / "each day: total rain + strongest wind" / "Shenzhen local time" / "the next 7 days"
6. 00:51–00:56 | Zoom back out. The JSON page renders; cursor ticks the "Pretty-print" checkbox and the JSON re-formats neatly. | Callout: "Tick Pretty-print"
7. 00:56–01:04 | Yellow box around the precipitation_sum list; the seven numbers pulse one by one. | Callout: "Rain per day (mm): a millimetre here and there, mostly dry"
8. 01:04–01:10 | Box moves to the wind_speed_10m_max list; numbers pulse. | Callout: "Max wind (km/h): nothing near 40"
9. 01:10–01:16 | A comparison card slides in on the right: left half green "This week in Shenzhen: calm", right half red "Typhoon: 120+ km/h wind, 100+ mm rain in a day". | No extra callout (hold)
10. 01:16–01:30 | Cross-fade to the cities table slide. Rows appear one by one, each with its map pin dropping in: Shenzhen, Dubai, Monterrey, Chicago, Columbus (Columbus row gets a small green "home" tag). | Callout on the Columbus row: "Right here at home"
11. 01:30–01:39 | The three negative longitudes (-100.32, -87.63, -83.00) glow amber. | Callout: "Minus = west of London"; caption: "Search '<city> coordinates' (also in your activity file)"
12. 01:39–01:47 | Browser tab 2 "api.frankfurter.dev". Cursor pastes the Frankfurter URL and presses Enter. | Callout: "frankfurter.app now forwards to frankfurter.dev"
13. 01:47–02:00 | URL parts highlight in turn: "latest", "from=USD", "to=CNY,MXN". A side chip appears: "Columbus + Chicago suppliers bill in USD: no rate needed". | Labels: "today" / "from US dollars" / "to yuan and peso"
14. 02:00–02:14 | The JSON result appears; zoom to the rates; CNY 6.6661 and MXN 18.4639 get yellow boxes. | Callout: "1 USD = 6.67 yuan = 18.46 pesos (17 Nov 2026)"
15. 02:14–02:30 | Zoom out. A grey dashed chip "AED?" appears after "to=CNY,MXN" in the URL bar with a question mark. A note card slides in: "Frankfurter uses the European Central Bank's reference rates. The ECB does not publish AED: it is not on the menu." | Callout: "Not asked for on purpose"
16. 02:30–02:50 | The note card flips to the AED card: a flat horizontal line chart draws from "1997" to "2026" at 3.67. | Callout: "Pegged: 1 USD = about 3.67 AED since 1997. Gulf Lubricants: currency risk = 0"
17. 02:50–02:58 | Cursor double-clicks "latest" in the URL bar, types "2026-10-16" (typing effect) and presses Enter. | Callout: "Swap 'latest' for a date"
18. 02:58–03:10 | The 16 Oct result appears (CNY 6.6862, MXN 18.3835). A comparison panel slides in: MXN 18.3835 -> 18.4639 (about 0.4%), CNY 6.6862 -> 6.6661 (about 0.3%). | Caption: "Both small moves. Keep these numbers in mind."
19. 03:10–03:16 | Browser tab 3 "date.nager.at". Cursor pastes the Nager.Date URL, Enter. URL segments "2026" and "CN" highlight. | Labels: "the year" / "country code: China"
20. 03:16–03:30 | The CN holiday list appears; each entry glows briefly as it is read: New Year, Chinese New Year 2026-02-17, Labour Day, Dragon Boat Festival, then yellow boxes stay on 2026-09-25 Mid-Autumn Festival and 2026-10-01 National Day. | Callout on National Day: "Starts Golden Week"
21. 03:30–03:38 | Cursor selects "CN" in the URL, types "US", Enter. The US list loads; 2026-11-26 Thanksgiving Day and 2026-12-25 Christmas Day get yellow boxes. | Callout: "Thanksgiving: 26 Nov"
22. 03:38–03:45 | Cursor changes "US" to "MX", Enter. 2026-11-16 Revolution Day and 2026-12-25 Christmas Day get yellow boxes. | Callout: "Revolution Day: yesterday, 16 Nov"
23. 03:45–03:52 | Cursor changes "MX" to "AE", Enter. The page goes completely blank and white. Hold the empty page. | Red callout pointing at the empty page: "Blank! The UAE is not covered"
24. 03:52–03:59 | A small card slides in at the right: "UAE fix: a written holiday list in Stocky's rulebook". | Caption: "BEGINNER MISTAKE: blank means 'no data for this country', not 'no holidays'"
25. 03:59–04:00 | END card | END

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
(00:00) Remember from Video 3, an API is a waiter. ... Today we're visiting three new restaurants. And here's the lovely part: none of them asks for a key card. No sign-up, no API key, no credit card.
(00:25) First, weather, from a service called Open-Meteo. Let me read this web address like a restaurant order. "forecast" is the menu. Latitude 22.54, longitude 114.06: that's the map pin for Shenzhen. "daily equals precipitation sum, wind speed max" means: for each day, tell me total rain and the strongest wind. "timezone equals auto" means use Shenzhen's local time. And "forecast days equals 7" means the next week.
(00:51) And here's the answer, a labelled shopping list. Rain for the next seven days, in millimetres: small numbers, mostly dry. Wind, in kilometres per hour: nothing anywhere near forty. That's a calm week in Shenzhen. For comparison, a typhoon brings winds of 120 kilometres an hour and more, and 100-plus millimetres of rain in a day.
(01:16) Here are the map pins for all five BrightLeaf supplier cities. Shenzhen, Dubai, Monterrey in Mexico, Chicago, and Columbus, right here at home. Notice the minus signs on the longitudes for the three American cities: minus just means west of London. You find these by searching the city name plus the word "coordinates". They're in your activity file too.
(01:39) Second window: currency, from a service called Frankfurter. ... the old frankfurter dot app address now forwards to frankfurter dot dev, so that's the one we use. "latest", from USD, to the Chinese yuan and the Mexican peso. Our Columbus and Chicago suppliers bill in dollars, so they need no exchange rate at all. And the answer: one US dollar equals 6.67 yuan and 18.46 pesos today. Now, did you notice I didn't ask for the UAE dirham, AED, for our Dubai supplier?
(02:14) That's on purpose. ... Frankfurter uses the European Central Bank's reference rates, and the ECB doesn't publish the dirham, so it isn't on the menu. ... the UAE dirham is pegged to the US dollar at about 3.67 dirhams per dollar, and has been since 1997. ... So for Gulf Lubricants in Dubai, dollar-to-dirham currency risk is zero.
(02:50) Swap "latest" for a date, and you get the rate on that day. On the 16th of October the dollar bought 18.38 pesos. Today it buys 18.46. That's a move of about 0.4% in a month. The yuan went from 6.69 to 6.67, about 0.3%. Both small moves. Keep those numbers in mind.
(03:10) Third window: public holidays, from Nager.Date. The address is the year, 2026, and the country code, CN for China. Back comes the list: New Year, Chinese New Year on the 17th of February, Labour Day, Dragon Boat Festival, Mid-Autumn Festival on the 25th of September, and National Day on the 1st of October.
(03:30) Change CN to US: Thanksgiving on the 26th of November, Christmas on the 25th of December. MX for Mexico: Revolution Day was yesterday, the 16th, and Christmas again. Now watch. AE for the UAE. Blank. Nager.Date doesn't cover every country ... So for the UAE, we'll give Stocky a short holiday list in its rulebook instead. Good agents work around gaps; they don't pretend.

CHECKLIST
- Total duration exactly 4 min 0 s (240 s), with every scene at the times listed above.
- All URLs, rates (6.6661, 18.4639, 6.6862, 18.3835) and holiday dates match the DATA block exactly.
- The AE page is truly blank (no error text, no brackets).
- Each URL edit is visible in the URL bar (select, type, Enter) before the page changes.
- The three "FREE · NO KEY" badges and the cities table with negative longitudes are shown.
- Start button, hover Pause/Restart controls, progress bar and the 1-second END card are present.
- Nothing overflows the 1920x1080 stage, and every callout sits beside (not on top of) what it explains.
```

**After Claude builds it:**

- Click Start, wait half a second, then start your recorder only if you want a clean first frame; trim the first second either way.
- If you record on a day other than 17 Nov 2026, your own live numbers will differ; mention that in the voice-over (the demo keeps the script's numbers).
- If the URL text is too small, reply "make the URL bar text 30px and zoom in more on each segment".

---

## Prompt 2 of 5: The Supplier Risk Score on One Page (07:30–09:45, 2 min 15 s)

**What this demo shows:** The four-part Supplier Risk Score (Weather, Holiday, Currency, Lead time = 10 points) and the Low / Medium / High bands, highlighted row by row on the Rules sheet.

### Copy this prompt into Claude:

```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. This section teaches the scoring rules before anything is built: a Supplier Risk Score out of 10 made of four simple parts (Weather 0-3, Holiday 0-3, Currency 0-2, Lead time 0-2) and three colour bands.

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

SECTION LENGTH: exactly 2 min 15 s (135 seconds). The master timeline runs from 00:00 to 02:15; the END card fills 02:14–02:15.

APP LOOK
- Excel/Google Sheets-style spreadsheet (simplified look-alike) inside the browser frame: green accent, formula bar, column letters A, B, C, row numbers, sheet tabs at the bottom: "Instructions", "Rules" (active), "Live Data", "Scorecard", "Your Suppliers". Browser tab title "V08_Activity_SupplierRiskScorecard.xlsx", URL bar "V08_Activity_SupplierRiskScorecard.xlsx".
- The Rules sheet is a neat table: column A "Part", column B "Points", column C "Rule". Each part is a coloured group (light blue headers). A "Bands" mini-table sits below with filled cells: green, amber, red.

DATA TO SHOW (copy exactly; do not change any number, name, URL or wording)
Title row: "Supplier Risk Score: Rules (total out of 10)"
WEATHER (0-3, next 7 days)
  0 = calm
  1 = rain >= 20 mm in a day or wind >= 40 km/h
  2 = rain >= 50 mm or wind >= 60 km/h
  3 = rain >= 100 mm or wind >= 90 km/h (storm or typhoon strength)
HOLIDAY (0-3, next 30 days)
  0 = no public holiday in the next 30 days
  1 = one holiday day
  2 = two or more holiday days
  3 = a major shutdown (Golden Week, Chinese New Year, Christmas–New Year week, Eid break)
CURRENCY (0-2, 30-day move in USD -> supplier currency)
  0 = under 1%
  1 = 1% to 3%
  2 = 3% or more
  Note row: US suppliers paid in dollars = 0
LEAD TIME (0-2, from Odoo)
  0 = 7 days or less
  1 = 8-20 days
  2 = 21 days or more
BANDS
  0-3 LOW (green #16A34A)
  4-6 MEDIUM (amber #F59E0B)
  7-10 HIGH (red #DC2626)
Napkin card: "Weather 3 + Holiday 3 + Currency 2 + Lead time 2 = 10"
Pro tip caption: "PRO TIP: Keep the rules boring and written down. Argue once, write it in the Rules sheet."

TIMELINE (scene by scene; times are relative to the section start; format: time | what appears / cursor action | callout or caption text)
1. 00:00–00:08 | The spreadsheet fades in. Cursor glides to the bottom tabs and clicks "Rules"; the Rules table appears. | Callout on the tab: "Rules sheet"
2. 00:08–00:16 | A paper-napkin card (off-white, slightly rotated, hand-drawn underline) slides in at the right with four chips adding up: Weather 3 + Holiday 3 + Currency 2 + Lead time 2 = 10. | Callout: "If you can't explain it on a napkin, an agent can't either"
3. 00:16–00:22 | Napkin slides away. Weather group highlighted (yellow outline); row 0 "calm" glows. | Label: "Weather: 0 to 3 points, next 7 days"
4. 00:22–00:29 | Row 1 glows; a small rain-cloud icon appears beside it. | Callout: "Heavy-rain day: 20 mm, or wind over 40"
5. 00:29–00:35 | Row 2 glows. | Callout: "50 mm, or wind over 60"
6. 00:35–00:42 | Row 3 glows red; a small storm/typhoon icon spins in. | Callout: "Storm or typhoon strength = 3"
7. 00:42–00:47 | Holiday group highlighted; a little calendar strip "next 30 days" slides across the top of the group. | Label: "Holidays: 0 to 3, look 30 days ahead"
8. 00:47–00:57 | Rows 0, 1 and 2 glow one after another (about 3 s each). | Labels: "none" / "one day" / "two or more days"
9. 00:57–01:05 | Row 3 glows red; three chips pop next to it: "Golden Week", "Chinese New Year", "Christmas–New Year week". | Callout: "Factories close for a week or more = the full 3"
10. 01:05–01:15 | Currency group highlighted. A mini illustration appears beside it: "30 days ago" rate -> "today" rate with a % arrow. | Label: "Currency: 0 to 2, 30-day move"
11. 01:15–01:27 | Rows "under 1%", "1% to 3%", "3% or more" glow one by one. | Callout: "Big moves = suppliers start re-pricing"
12. 01:27–01:34 | The note row "US suppliers paid in dollars = 0" glows green. | Callout: "No exchange rate, no currency risk"
13. 01:34–01:43 | Lead time group highlighted; a small chip "from Odoo" pops beside it. Rows 0, 1, 2 glow in turn. | Labels: "7 days or less" / "8-20 days" / "21+ days"
14. 01:43–01:52 | Hold on row 2 of lead time. | Callout: "Long lead time = less room to recover"
15. 01:52–02:05 | Bands table: the three cells fill with colour one by one (LOW green, MEDIUM amber, HIGH red) and a running total counter animates 0 -> 10 across them. | Callout: "Four simple questions, any buyer with a calculator"
16. 02:05–02:14 | Zoom out to the full sheet and hold. | Caption: "PRO TIP: Keep the rules boring and written down."
17. 02:14–02:15 | END card | END

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
(00:00) Before we build anything, let's agree on the scoring rules. If you can't explain a score on a napkin, an agent can't either. Ours has four parts and adds up to ten.
(00:16) Weather, zero to three points. Zero if the next seven days are calm. One point for a heavy-rain day, 20 millimetres, or wind over 40. Two points for 50 millimetres or wind over 60. And three points for storm or typhoon strength: 100 millimetres of rain, or wind over 90 kilometres an hour.
(00:42) Holidays, zero to three. Look 30 days ahead. No holidays, zero. One holiday day, one point. Two or more days, two points. And a major shutdown, where factories close for a week or more, like Golden Week or Chinese New Year, is the full three.
(01:05) Currency, zero to two. Compare today's rate with 30 days ago for the supplier's own currency. If the peso or the yuan moves a lot, suppliers start re-pricing. Under 1%, zero. One to three percent, one point. Three percent or more, two points. US suppliers we pay in dollars score zero, because there's no exchange rate involved.
(01:34) And lead time, zero to two, straight from Odoo. Seven days or less, zero. Eight to twenty days, one. Twenty-one days or more, two. A long lead time means less room to recover if something goes wrong.
(01:52) Add them up. Zero to three is low risk, green. Four to six is medium, amber. Seven to ten is high, red. That's it. Four simple questions any buyer could answer with a calculator. Stocky just answers them faster, for every supplier, every day.

CHECKLIST
- Total duration exactly 2 min 15 s (135 s), with every scene at the times listed above.
- Every threshold (20/40, 50/60, 100/90 for weather; 1% and 3% for currency; 7, 8-20, 21 days for lead time) matches the DATA block.
- Bands are coloured exactly: 0-3 green, 4-6 amber, 7-10 red.
- The highlighted row always matches what the voice-over is describing at that moment.
- Start button, hover Pause/Restart controls, progress bar and the 1-second END card are present.
- Nothing overflows the 1920x1080 stage, and every callout sits beside (not on top of) what it explains.
```

**After Claude builds it:**

- This is a calm, table-only scene: if it feels static, reply "add a gentle zoom on each group as it is highlighted".
- If the table text is too small to read on a phone, ask for "Rules table text at 28px minimum".

---

## Prompt 3 of 5: Tool 1: Giving Stocky a Weather Window (09:45–12:45, 3 min 0 s)

**What this demo shows:** Adding an HTTP Request Tool called get_weather to Stocky in n8n, with a clear description, Open-Meteo URL, model-defined latitude/longitude and a test for Dubai.

### Copy this prompt into Claude:

```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. This section teaches how to give an AI agent a new tool in n8n: an HTTP Request Tool named get_weather that calls the free Open-Meteo forecast API, where the agent itself fills in the latitude and longitude and decides when to call it.

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
- n8n-style workflow canvas (simplified look-alike): dark grey dotted canvas, rounded square nodes with an icon and label, grey connector lines with animated dots when data flows, a right-side panel for node settings, an orange "Test workflow" button, an Executions tab. Browser URL bar: "brightleaf.app.n8n.cloud/workflow/stocky-risk-radar", tab title "Stocky – Risk Radar - n8n".
- The AI Agent node is a wide rectangle; underneath it are three small labelled connector ports "Chat Model", "Memory", "Tool", each with a small "+" button. Sub-nodes hang below as circles: "Anthropic Chat Model", "Simple Memory", "Odoo" (and later "get_weather", "get_exchange_rates", "get_public_holidays", all with a globe icon).
- Node settings panel (right side, white, ~760 px wide): node name at the top (click to rename), tabs "Parameters | Settings", grey labelled fields, toggles, an orange "Execute step" button top-right, and an OUTPUT area below that shows results as a pretty-printed JSON view.
- n8n workflow list (first 5 seconds only): a simple white list of workflows with names and grey "Inactive" labels.
- The node picker: a right-side panel with a search box "Search nodes..." and a result list with icons.
- The "Let the model define this parameter" button is a small sparkle icon at the right end of a parameter value field; after clicking, the field turns into a lilac pill reading "Defined automatically by the model".

DATA TO SHOW (copy exactly; do not change any number, name, URL or wording)
Workflow list: "Stocky – Chat", "Stocky – Risk Radar"
Canvas before: "When chat message received" -> "AI Agent"; under AI Agent: "Anthropic Chat Model" (Chat Model port), "Simple Memory" (Memory port), "Odoo" (Tool port).
Node picker search text: HTTP   ->   result "HTTP Request Tool"
Node name: get_weather
Description (3 lines, typed exactly):
Gets the 7-day weather forecast for one supplier city.
Give it the city's latitude and longitude.
Returns daily rain (mm) and maximum wind speed (km/h).
Method: GET
URL: https://api.open-meteo.com/v1/forecast
Send Query Parameters: ON; Specify Query Parameters: Using Fields Below
  latitude      -> sparkle clicked: "Defined automatically by the model"
  longitude     -> sparkle clicked: "Defined automatically by the model"
  daily         = precipitation_sum,wind_speed_10m_max
  timezone      = auto
  forecast_days = 7
Hover label on latitude field: fromAI   (tooltip shows: {{ $fromAI('latitude') }} )
Execute step test values: latitude 25.20, longitude 55.27
Test output (Dubai, illustrative calm values: rain at or near zero every day, light wind):
{ "latitude": 25.2, "longitude": 55.27, "timezone": "Asia/Dubai",
  "daily": { "time": ["2026-11-17","2026-11-18","2026-11-19","2026-11-20","2026-11-21","2026-11-22","2026-11-23"],
             "precipitation_sum": [0.0, 0.0, 0.0, 0.0, 0.1, 0.0, 0.0],
             "wind_speed_10m_max": [18.4, 15.2, 13.9, 16.7, 20.1, 17.5, 14.3] } }

TIMELINE (scene by scene; times are relative to the section start; format: time | what appears / cursor action | callout or caption text)
1. 00:00–00:05 | n8n workflow list; cursor clicks "Stocky – Risk Radar". | No callout
2. 00:05–00:14 | The canvas opens: When chat message received -> AI Agent, with Anthropic Chat Model, Simple Memory and Odoo hanging underneath. The workflow name in the top bar glows. | Callout on the name: "A duplicate: the original stays safe"
3. 00:14–00:23 | Small labels pop beside each sub-node in turn. | Labels: "Brain" (Anthropic Chat Model) / "Memory" (Simple Memory) / "Odoo tool"; caption-style callout: "Today: 3 more tools hang here"
4. 00:23–00:32 | Cursor clicks the "+" under the "Tool" port; the node picker slides in; "HTTP" is typed in the search box. | Callout on "+": "Plus under Tool"
5. 00:32–00:38 | "HTTP Request Tool" is highlighted in the results; click. A new node appears under the agent and its settings panel opens. | Callout: "HTTP Request Tool"
6. 00:38–00:56 | A split overlay card fades in over the left half of the canvas: left side "Normal workflow: Step 1 -> Step 2 -> Step 3 (fixed order)"; right side "Agent tool: Stocky decides when to call" with a phone icon ringing a waiter icon. | Callout: "We give Stocky the waiter's phone number"
7. 00:56–01:03 | Overlay fades. Cursor clicks the node title, it becomes editable, "get_weather" is typed. | Callout: "Name: get_weather"
8. 01:03–01:22 | Cursor clicks the Description box and types the three description lines (typing effect). | No callout while typing
9. 01:22–01:27 | Zoom 1.4 on the Description box. | Callout: "Most important box: this is how Stocky knows what the tool is for"
10. 01:27–01:35 | Zoom out. Cursor opens the Method dropdown and picks GET. | Callout: "GET = fetch me something"
11. 01:35–01:45 | Cursor clicks the URL field and types https://api.open-meteo.com/v1/forecast. | Callout: "Only up to 'forecast': the rest goes in fields"
12. 01:45–01:52 | Cursor switches "Send Query Parameters" on (toggle slides blue); "Specify Query Parameters" dropdown set to "Using Fields Below". | Callout: "The blanks on the order form"
13. 01:52–02:05 | Cursor clicks "Add Parameter", types name "latitude", hovers the sparkle icon (tooltip "Let the model define this parameter"), clicks it: the value turns into the lilac pill. Same for "longitude". | Callout on the pill: "Stocky fills in this blank itself"
14. 02:05–02:27 | Three more parameters are added and typed: daily = precipitation_sum,wind_speed_10m_max; timezone = auto; forecast_days = 7. | Callout: "These never change, so we type them"
15. 02:27–02:33 | Cursor clicks "Execute step". A small dialog asks for test values; 25.20 and 55.27 are typed; click "Execute". | Callout: "Test with Dubai"
16. 02:33–02:41 | Spinner, then a green "Node executed successfully" badge; OUTPUT shows the Dubai JSON; precipitation zeros and light winds get yellow boxes. | Callout: "Dubai in November: dry, light wind"
17. 02:41–02:52 | Cursor hovers the latitude field again; a small grey "fromAI" label appears with a tooltip showing {{ $fromAI('latitude') }}. Zoom 1.5 on it. | Callout: "The sparkle wrote this: 'the AI fills this in'. You never type it."
18. 02:52–02:59 | Zoom out to the canvas; get_weather node glows green; a chip in the top-right reads "Tools added: 1 of 3". | Caption: "One tool down, two to go"
19. 02:59–03:00 | END card | END

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
(00:00) Here's Stocky from Video 6. I've duplicated it and called it "Stocky, Risk Radar", so the original stays safe. You can see the brain, the memory and the Odoo tool hanging underneath the agent. Today we hang three more tools there.
(00:23) Click the plus under Tool, search HTTP, and choose HTTP Request Tool. This is a waiter that the agent can call whenever it decides it needs to. That's the big difference from a normal workflow step. We don't say "call the weather at step 3". We give Stocky the waiter's phone number, and Stocky decides when to call.
(00:56) Name it "get weather". Then the description, which is the most important box on this screen. This is how Stocky knows what the tool is for. Write it like you're briefing the intern: "Gets the seven-day weather forecast for one supplier city. Give it the latitude and longitude. Returns daily rain and maximum wind."
(01:27) Method: GET, which just means "fetch me something". URL: the Open-Meteo forecast address, only up to the word "forecast". We'll add the rest as separate fields so it's easy to read.
(01:45) Switch on "Send Query Parameters". These are the blanks on the order form. Add "latitude", and instead of typing a number, click this little sparkle button: "Let the model define this parameter". That means Stocky fills in this blank itself... Same for longitude. The other three never change, so we type them in: daily, precipitation sum comma wind speed 10m max. Timezone, auto. Forecast days, seven.
(02:27) Let's test it with Dubai: 25.20 and 55.27. And back comes Dubai's week. Practically no rain, light wind. Exactly what you'd expect in November.
(02:41) If you're curious what the sparkle button did, it wrote a little placeholder that says "the AI fills this in". You never need to type it yourself. One tool down, two to go.

CHECKLIST
- Total duration exactly 3 min 0 s (180 s), with every scene at the times listed above.
- Node name, description text, URL and the five parameters match the DATA block character for character.
- latitude and longitude are shown as model-defined pills, not typed numbers.
- The test uses 25.20 / 55.27 and the output is clearly dry with light wind.
- Start button, hover Pause/Restart controls, progress bar and the 1-second END card are present.
- Nothing overflows the 1920x1080 stage, and every callout sits beside (not on top of) what it explains.
```

**After Claude builds it:**

- The description typing is the longest typing beat; if it runs late, ask Claude to "keep the typing at 14 characters/second but start it at 01:03 exactly".
- Trim the first second of the recording so the video opens on the workflow list.

---

## Prompt 4 of 5: Tools 2 and 3: Currency and Holidays (12:45–15:15, 2 min 30 s)

**What this demo shows:** Adding get_exchange_rates (Frankfurter) and get_public_holidays (Nager.Date) as HTTP Request Tools with $fromAI placeholders, testing both, and zooming out to Stocky's full set of tools.

### Copy this prompt into Claude:

```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. This section teaches how to add two more no-key API tools to an n8n AI agent, with descriptions that say what is and isn't covered, and URLs where the agent fills in the blanks (date, year, country code) itself.

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
- n8n-style workflow canvas (simplified look-alike): dark grey dotted canvas, rounded square nodes with an icon and label, grey connector lines with animated dots when data flows, a right-side panel for node settings, an orange "Test workflow" button, an Executions tab. Browser URL bar: "brightleaf.app.n8n.cloud/workflow/stocky-risk-radar", tab title "Stocky – Risk Radar - n8n".
- The AI Agent node is a wide rectangle; underneath it are three small labelled connector ports "Chat Model", "Memory", "Tool", each with a small "+" button. Sub-nodes hang below as circles: "Anthropic Chat Model", "Simple Memory", "Odoo" (and later "get_weather", "get_exchange_rates", "get_public_holidays", all with a globe icon).
- Node settings panel (right side, white, ~760 px wide): node name at the top (click to rename), tabs "Parameters | Settings", grey labelled fields, toggles, an orange "Execute step" button top-right, and an OUTPUT area below that shows results as a pretty-printed JSON view.
- Expressions inside a URL field are shown as a light-green highlighted pill inside the text, e.g. the part {{ $fromAI(...) }}.

DATA TO SHOW (copy exactly; do not change any number, name, URL or wording)
TOOL 2
Node name: get_exchange_rates
Description (5 lines):
Gets US dollar exchange rates for CNY and MXN.
Use date = "latest" for today, or a date like 2026-10-16
to get the rate on that day (for the 30-day comparison).
Do not ask for AED: it is not available, and the dirham
is pegged to USD at about 3.67, so its currency risk is about 0.
URL (pasted): https://api.frankfurter.dev/v1/{{ $fromAI('date', 'latest, or a date in YYYY-MM-DD format') }}
Send Query Parameters: ON -> from = USD ; to = CNY,MXN
Test value: date = latest
Test output: {"amount":1.0,"base":"USD","date":"2026-11-17","rates":{"CNY":6.6661,"MXN":18.4639}}

TOOL 3
Node name: get_public_holidays
Description (4 lines):
Gets official public holidays for one country and year.
countryCode: US, MX (Mexico) or CN (China). The UAE is NOT
covered: use the holiday list in your instructions for AE.
Returns a list of dates and holiday names.
URL (pasted): https://date.nager.at/api/v3/PublicHolidays/{{ $fromAI('year', 'four-digit year, e.g. 2026') }}/{{ $fromAI('countryCode', 'two-letter country code, e.g. CN') }}
Test values: year = 2027, countryCode = CN
Test output: a JSON list of 2027 China holidays; the highlighted entry is
  { "date": "2027-02-06", "name": "Chinese New Year (Spring Festival)", "countryCode": "CN" }
  (show 2027-01-01 New Year's Day above it and a few greyed rows below it)

FINAL CANVAS: AI Agent with six things underneath: Anthropic Chat Model, Simple Memory, Odoo, get_weather, get_exchange_rates, get_public_holidays.
Labels for the zoom-out: "1 brain", "1 memory", "4 tools: Odoo (inside the building) + 3 windows to the outside world".

TIMELINE (scene by scene; times are relative to the section start; format: time | what appears / cursor action | callout or caption text)
1. 00:00–00:08 | Canvas with Stocky and get_weather. Cursor clicks "+" under Tool, types "HTTP" in the picker, clicks "HTTP Request Tool". | No callout
2. 00:08–00:13 | Cursor renames the node: types "get_exchange_rates". | Callout: "Tool 2"
3. 00:13–00:32 | Cursor clicks Description and types the five description lines. | No callout while typing
4. 00:32–00:40 | Three coloured brackets appear at the right of the description: blue around line 1, green around lines 2-3, amber around lines 4-5. | Labels: "1 What it gets" / "2 Today or a past date" / "3 Don't ask for AED, and why"
5. 00:40–00:52 | Cursor clicks the URL field; the Frankfurter URL with the {{ $fromAI('date', ...) }} part is pasted (blue paste flash); the curly-bracket part turns into a green pill. Zoom 1.5 on it. | Callout: "Same placeholder the sparkle makes: Stocky fills in the date"
6. 00:52–01:06 | Zoom out. Send Query Parameters toggled on; two parameters typed: from = USD, to = CNY,MXN. | Callout: "Two fixed blanks"
7. 01:06–01:11 | Cursor clicks "Execute step", types "latest" for date, runs it. Output shows CNY 6.6661 and MXN 18.4639 with yellow boxes and a green success badge. | Callout: "6.67 yuan, 18.46 pesos. Working."
8. 01:11–01:17 | Back to canvas. "+" under Tool -> HTTP Request Tool -> renamed "get_public_holidays". | Callout: "Tool 3"
9. 01:17–01:31 | Description typed (four lines). The words "The UAE is NOT covered" get an amber underline when typed. | Callout: "Says what's covered AND what isn't"
10. 01:31–01:40 | The Nager.Date URL is pasted; both {{ $fromAI(...) }} parts become green pills. | Labels on the pills: "year" / "countryCode"
11. 01:40–01:48 | Cursor clicks "Execute step"; dialog values typed: year 2027, countryCode CN; Execute. | Callout: "Test with next year: 2027, China"
12. 01:48–02:02 | Output list appears; zoom 1.6 on 2027-02-06 Chinese New Year (Spring Festival) with a yellow box; a small calendar icon pops beside it. | Callout: "Put it in your calendar: factories often close 2-3 weeks around it"
13. 02:02–02:14 | Panel closes; the canvas zooms out smoothly so the whole agent is visible with all six sub-nodes. The three new tool nodes glow blue one after another. | Labels: "1 brain" / "1 memory" / "4 tools"
14. 02:14–02:20 | A bracket groups Odoo on one side and the three API tools on the other. | Labels: "Odoo: inside the building" / "3 windows to the outside world"
15. 02:20–02:29 | Hold on the finished canvas. | Caption: "No code. No API keys to manage for the new tools."
16. 02:29–02:30 | END card | END

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
(00:00) Second tool: get exchange rates. The description tells Stocky three things: what it gets, how to ask for today or for a past date, and, importantly, not to ask for the dirham, and why. If we don't say that, Stocky might order something the kitchen doesn't stock and think the tool is broken.
(00:35) For the URL, paste this from the activity file. The part in curly brackets is the same placeholder the sparkle button makes. It means "Stocky, fill in the date here: either the word latest, or a date". Then two fixed blanks: from, USD; to, CNY comma MXN.
(01:06) Test with "latest". 6.67 yuan, 18.46 pesos. Working.
(01:11) Third tool: get public holidays. Again, the description says what's covered and what isn't. And the URL has two blanks for Stocky to fill: the year and the country code.
(01:31) Let's test with next year: 2027, China. And there it is: Chinese New Year, 6th of February 2027. If you buy from China, put that date in your calendar right now. Factories often close for two to three weeks around it, not just the official days.
(02:02) Zoom out and look at Stocky now. One brain, one memory, and four tools: the Odoo filing cabinet inside the building, and three windows to the outside world. No code, and no API keys to manage for any of the new ones.

CHECKLIST
- Total duration exactly 2 min 30 s (150 s), with every scene at the times listed above.
- Both descriptions and both URLs (including the $fromAI text) match the DATA block exactly.
- Test outputs show CNY 6.6661 / MXN 18.4639 and 2027-02-06 Chinese New Year (Spring Festival).
- The final canvas shows exactly six sub-nodes under the AI Agent.
- Start button, hover Pause/Restart controls, progress bar and the 1-second END card are present.
- Nothing overflows the 1920x1080 stage, and every callout sits beside (not on top of) what it explains.
```

**After Claude builds it:**

- The URLs are long: if they are cut off in the field, reply "let the URL field wrap onto two lines".
- The 01:06–01:11 test beat is short on purpose; it matches a one-line voice-over.

---

## Prompt 5 of 5: Stocky's Rulebook, a Live Run and a Fire Drill (17:00–22:15, 5 min 15 s)

**What this demo shows:** Pasting Stocky's system message, a live run where the logs show every tool call and all six suppliers score LOW, then a fire drill that scores Shenzhen BrightTech HIGH (8/10).

### Copy this prompt into Claude:

```text
ROLE & GOAL
You are a motion designer building an animated product-demo video as a single self-contained HTML file. This section teaches how the agent's written rulebook (system message) turns three API tools into a Supplier Risk Score, how to read the tool-call logs as "receipts", and how a fire drill (a pretend emergency) proves the agent reacts properly.
This section is longer than 4 minutes: organise the code by scene (one clearly commented function or object per scene, with its start/end time at the top) so each scene is easy to tweak.

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

SECTION LENGTH: exactly 5 min 15 s (315 seconds). The master timeline runs from 00:00 to 05:15; the END card fills 05:14–05:15.

APP LOOK
- n8n-style workflow canvas (simplified look-alike): dark grey dotted canvas, rounded square nodes with an icon and label, grey connector lines with animated dots when data flows, a right-side panel for node settings, an orange "Test workflow" button, an Executions tab. Browser URL bar: "brightleaf.app.n8n.cloud/workflow/stocky-risk-radar", tab title "Stocky – Risk Radar - n8n".
- The AI Agent node is a wide rectangle; underneath it are three small labelled connector ports "Chat Model", "Memory", "Tool", each with a small "+" button. Sub-nodes hang below as circles: "Anthropic Chat Model", "Simple Memory", "Odoo" (and later "get_weather", "get_exchange_rates", "get_public_holidays", all with a globe icon).
- Node settings panel (right side, white, ~760 px wide): node name at the top (click to rename), tabs "Parameters | Settings", grey labelled fields, toggles, an orange "Execute step" button top-right, and an OUTPUT area below that shows results as a pretty-printed JSON view.
- The AI Agent settings panel has an "Options" area with an "Add Option" button; choosing "System Message" adds a tall text box (monospace 18px, scrollable).
- Chat panel: n8n-style chat docked at the bottom-left/centre of the canvas ("Open chat" button at the bottom of the canvas). User bubbles on the right (blue), Stocky's answers on the left (white card), with tables rendered as clean tables.
- Logs panel: docked on the right; a vertical list of calls, each row with a tool icon, the tool name, the input in grey (e.g. "lat 22.54, long 114.06") and a green tick. A counter chip per tool (e.g. "get_weather x5").

DATA TO SHOW (copy exactly; do not change any number, name, URL or wording)
SYSTEM MESSAGE (pasted in full; show it in the box, scrollable):
You are Stocky, BrightLeaf Supplies' procurement risk assistant.
Today's date is {{ $now.toFormat('yyyy-MM-dd') }}.

SUPPLIERS (name | city | country | lat, long | currency | longest lead time)
- Shenzhen BrightTech | Shenzhen | CN | 22.54, 114.06 | CNY | 28 days (LED lights)
- Global Lift Parts | Shenzhen | CN | 22.54, 114.06 | CNY | 21 days
- Gulf Lubricants | Dubai | AE | 25.20, 55.27 | AED (pegged) | 14 days
- SafeHands Co. | Monterrey | MX | 25.69, -100.32 | MXN | 10 days
- PackRight Industries | Chicago | US | 41.88, -87.63 | USD | 6 days
- Apex Fasteners | Columbus | US | 39.96, -83.00 | USD | 7 days

SCORING (total out of 10)
Weather 0-3 (next 7 days): 0 calm; 1 rain>=20mm or wind>=40km/h;
  2 rain>=50mm or wind>=60km/h; 3 rain>=100mm or wind>=90km/h.
Holiday 0-3 (next 30 days): 0 none; 1 one holiday day; 2 two or more
  days; 3 major shutdown (China National Day = Golden Week 1-7 Oct,
  Chinese New Year, Christmas-New Year week, Eid break).
Currency 0-2: 30-day move of USD->supplier currency:
  <1% = 0; 1-3% = 1; >=3% = 2. US suppliers paid in USD = 0.
  AED is pegged to USD (about 3.67), so Dubai's AED risk is about 0.
Lead time 0-2: <=7 days 0; 8-20 days 1; >=21 days 2.
Bands: 0-3 LOW, 4-6 MEDIUM, 7-10 HIGH.

HOLIDAYS NOT IN THE API (check dates each year)
UAE: Eid al-Fitr (approx. 20-22 Mar 2026), Eid al-Adha (approx.
  26-29 May 2026), National Day 2-3 Dec.

RULES
- Use the tools for real data. Never invent a number.
- If a tool fails or data is missing, say so and score that part 0
  with the note "not checked".
- Output a table: Supplier | Weather | Holiday | Currency | Lead time
  | Total | Band. Then one plain-English sentence per MEDIUM or HIGH
  supplier (if none, for the highest-scoring supplier): what the
  risk is and what Sarah could do.
- End with: "This score is guidance, not truth. Please check before acting." 

CHAT MESSAGE 1 (typed): Good morning Stocky. Give me today's supplier risk scores.

LOGS FOR RUN 1:
get_weather x5: Shenzhen (22.54, 114.06) | Dubai (25.20, 55.27) | Monterrey (25.69, -100.32) | Chicago (41.88, -87.63) | Columbus (39.96, -83.00)
get_exchange_rates x2: date = latest | date = 2026-10-16
get_public_holidays x3: 2026 US | 2026 MX | 2026 CN   (no AE call)
Odoo x1: product Hydraulic Oil 20L (31 on hand, reorder point 40)

ANSWER 1 (17 November 2026):
| Supplier | Weather | Holiday | Currency | Lead time | Total | Band |
| Shenzhen BrightTech | 0 | 0 | 0 | 2 | 2 | LOW |
| Global Lift Parts | 0 | 0 | 0 | 2 | 2 | LOW |
| Gulf Lubricants | 0 | 2 | 0 | 1 | 3 | LOW |
| SafeHands Co. | 0 | 0 | 0 | 1 | 1 | LOW |
| PackRight Industries | 0 | 1 | 0 | 0 | 1 | LOW |
| Apex Fasteners | 0 | 1 | 0 | 0 | 1 | LOW |
"No MEDIUM or HIGH suppliers today. Highest score: Gulf Lubricants, LOW risk (3/10). UAE National Day falls on 2–3 December, inside the next 30 days, and Hydraulic Oil has a 14-day lead time. Odoo shows only 31 drums on hand against a reorder point of 40, so place the oil order this week, before the holiday. Also note: Thanksgiving (26 November) closes Apex Fasteners and PackRight for a day. Currency moves are small: the peso moved 0.4% and the yuan 0.3% since 16 October. This score is guidance, not truth. Please check before acting."

FIRE DRILL CARD: "FIRE DRILL = feed the agent a pretend emergency to check it reacts properly (like testing a smoke alarm)."

CHAT MESSAGE 2 (typed): Fire drill. Pretend today is 24 September 2026. Use the real holiday and currency tools. For weather, assume the Shenzhen forecast shows 110 km/h wind and 140 mm of rain on 29–30 September. Score Shenzhen BrightTech.

LOGS FOR RUN 2: get_public_holidays (2026, CN) | get_exchange_rates (2026-09-24) | get_exchange_rates (2026-08-24)   (no get_weather call)

ANSWER 2:
"Shenzhen BrightTech: HIGH risk (8/10). Weather 3 (typhoon-strength winds forecast for 29–30 Sept), Holiday 3 (Mid-Autumn Festival on 25 Sept, then National Day on 1 Oct, which starts Golden Week, 1–7 Oct), Currency 0 (USD→CNY moved 0.15% in 30 days), Lead time 2 (28 days). Golden Week holiday + typhoon warning; order LED lights 10 days earlier. Consider confirming the factory's holiday closure dates with BrightTech today. This score is guidance, not truth. Please check before acting."
(Bold in the answer: "HIGH risk (8/10)" and "Golden Week holiday + typhoon warning; order LED lights 10 days earlier.")

TIMELINE (scene by scene; times are relative to the section start; format: time | what appears / cursor action | callout or caption text)
1. 00:00–00:06 | Canvas with Stocky and its six sub-nodes. Cursor double-clicks the AI Agent; the settings panel opens; cursor clicks "Add Option" -> "System Message". | Callout: "Options -> System Message"
2. 00:06–00:12 | The full system message is pasted into the box (blue paste flash), then the box scrolls back to the top. | Callout: "It's in your activity file"
3. 00:12–00:22 | Zoom 1.5 on line 2: Today's date is {{ $now.toFormat('yyyy-MM-dd') }}; the placeholder pulses. | Callout: "Fills in today's date automatically, so 'next 30 days' makes sense"
4. 00:22–00:34 | Zoom out; the SUPPLIERS block gets a yellow outline; the six rows glow top to bottom. | Callout: "6 suppliers: city, map pin, currency, longest lead time"
5. 00:34–00:46 | Box scrolls; SCORING block outlined. | Callout: "The scoring rules we just agreed on"
6. 00:46–00:54 | HOLIDAYS NOT IN THE API block outlined; "National Day 2-3 Dec" underlined. | Callout: "Fills the UAE gap"
7. 00:54–01:12 | RULES block outlined; each rule line glows in turn (about 4 s each): never invent a number / say so, score 0, "not checked" / table + one sentence / end line. | Callouts in turn: "Never invent a number" / "If something fails, say so" / "Table + one plain sentence" / "Always: guidance, not truth"
8. 01:12–01:20 | Panel closes. Cursor clicks "Open chat"; the chat panel slides up; message 1 is typed and sent (blue bubble). | No callout
9. 01:20–01:30 | The AI Agent node shows a spinning ring; tool sub-nodes flash one by one as they are called; the Logs panel slides in on the right. | Callout on the Logs panel: "Watch the logs"
10. 01:30–01:48 | Logs fill: five get_weather rows (Shenzhen, Dubai, Monterrey, Chicago, Columbus) each with a green tick; counter chip "get_weather x5". | Callout: "5 cities, not 6: Shenzhen checked once for both suppliers"
11. 01:48–01:58 | Two get_exchange_rates rows appear: latest, 2026-10-16. | Callout: "Today and 30 days ago"
12. 01:58–02:08 | Three get_public_holidays rows appear: 2026 US, 2026 MX, 2026 CN. A faded, struck-through ghost row "AE" appears and disappears. | Callout: "UAE skipped: it knows it isn't covered"
13. 02:08–02:15 | One Odoo row appears (Hydraulic Oil 20L). The whole log list gets a bracket. | Caption: "Nobody told it the order. The logs are your receipts."
14. 02:15–02:30 | Stocky's answer appears in the chat: the six-row table builds row by row; all six Band cells show green LOW pills. | Callout on the Shenzhen rows: "Lead time 2 is their only points"
15. 02:30–02:45 | Weather column glows green (all 0); then the Holiday cells for PackRight and Apex (1 each) get yellow boxes. | Callouts: "Calm weather everywhere" / "Thanksgiving, 26 Nov"
16. 02:45–03:05 | Gulf Lubricants row highlighted (Total 3); the paragraph types in below the table (fast streaming). | Callout: "Top scorer: 3/10, still LOW, but only just (UAE National Day 2-3 Dec)"
17. 03:05–03:25 | Zoom 1.5 on "Odoo shows only 31 drums on hand against a reorder point of 40, so place the oil order this week, before the holiday." Two tags appear above it: "inside data (Odoo)" and "outside data (holiday)". | Callout: "A buyer's sentence"; caption: "LOW doesn't mean ignore."
18. 03:25–03:50 | Zoom out. A full-width card slides over the canvas with a smoke-alarm icon and the FIRE DRILL definition. Hold. | Callout: "A calm week is a boring demo: let's run a fire drill"
19. 03:50–04:19 | Card slides away. Message 2 is typed in the chat box (typing effect) and sent. | Callout: "The exact week from Sarah's story"
20. 04:19–04:31 | Logs panel clears and fills: get_public_holidays (2026, CN), get_exchange_rates (2026-09-24), get_exchange_rates (2026-08-24). get_weather stays grey. | Callout: "Weather was given in the drill, so no weather call"
21. 04:31–04:45 | Answer 2 streams in; a big red pill "HIGH risk (8/10)" pops at the top; four chips count up beside it: Weather 3 + Holiday 3 + Currency 0 + Lead time 2 = 8. | Callout: "Typhoon winds + Mid-Autumn Festival + Golden Week"
22. 04:45–05:00 | Zoom 1.6 on the bold sentence "Golden Week holiday + typhoon warning; order LED lights 10 days earlier." | Callout: "~7 days closed + storm + backlog = 10 days"
23. 05:00–05:14 | Zoom out slightly; "Consider confirming the factory's holiday closure dates with BrightTech today." and the last line get yellow underlines. Hold. | Caption: "The agent informs. Sarah decides."
24. 05:14–05:15 | END card | END

VOICE-OVER REFERENCE (for timing reference only; do not render as text)
(00:00) Now the rulebook. Open the agent, Options, System Message, and paste this in. It's in your activity file. ... First, today's date: that little placeholder fills in today automatically, so Stocky knows what "next 30 days" means. Then the six suppliers, with their cities, map pins, currencies and longest lead times. Then the scoring rules we just agreed on. Then the holidays the API can't give us, for the UAE. And then the rules of behaviour. Use the tools, never invent a number. If something fails, say so. Give me a table, then one plain sentence for anything medium or high, or for the top scorer if everything is low. And always end with "guidance, not truth".
(01:12) Let's try it. Open chat. "Good morning Stocky. Give me today's supplier risk scores."
(01:20) Watch the logs on the right. ... Stocky called the weather tool five times, once per city. It didn't call it twice for Shenzhen, even though two suppliers are there. It called the currency tool twice: today and 30 days ago. And it called the holiday tool three times, for the US, Mexico and China, and skipped the UAE, because it knows the UAE isn't covered. Nobody told it that order. ... These logs are your receipts.
(02:15) And here's the answer. Calm weather everywhere this week, and tiny currency moves. The Shenzhen suppliers score two, low, purely because of their long lead times. Columbus and Chicago pick up a point each for Thanksgiving. And Gulf Lubricants comes out on top with three out of ten, still low, but only just, because of the UAE National Day holiday on the 2nd and 3rd of December. And look: Stocky also used its Odoo tool from Video 6, and noticed Hydraulic Oil is already below its reorder point, 31 drums against 40. So the sentence is: "Place the oil order this week, before the holiday." Inside data plus outside data, in one sentence. ... And notice: low doesn't mean ignore.
(03:25) Now, a calm week is great for BrightLeaf, but it's a boring demo. So let's run a fire drill. A fire drill is when you feed the agent a pretend emergency to check it reacts properly, the same way you'd test a smoke alarm.
(03:50) I'll type: "Fire drill. Pretend today is the 24th of September 2026. Use the real holiday and currency tools. For weather, assume Shenzhen shows 110 kilometres an hour of wind and 140 millimetres of rain on the 29th and 30th. Score Shenzhen BrightTech." This is the exact week from Sarah's story.
(04:19) Eight out of ten. HIGH. And read the reasons: typhoon-strength winds, the Mid-Autumn Festival, and then Golden Week. It even pulled the real exchange rates for those dates. And then the sentence Sarah needed back in September: "Golden Week holiday plus typhoon warning. Order LED lights ten days earlier." Ten days, because the factory closes for about seven days, and there's a few days of storm and backlog on top. Plus a sensible next step: confirm the closure dates with the supplier. That's not the agent taking over. That's the agent making sure Sarah never gets surprised again.

CHECKLIST
- Total duration exactly 5 min 15 s (315 s), with every scene at the times listed above.
- The system message, both chat messages, both answers and the six-row table match the DATA block word for word.
- Run 1 logs show exactly 5 weather, 2 currency, 3 holiday calls (no AE) and 1 Odoo call; run 2 shows no weather call.
- Bands: all six LOW in run 1; Shenzhen BrightTech HIGH (8/10) in red in run 2.
- Code is organised by scene, because this section is longer than 4 minutes.
- Start button, hover Pause/Restart controls, progress bar and the 1-second END card are present.
- Nothing overflows the 1920x1080 stage, and every callout sits beside (not on top of) what it explains.
```

**After Claude builds it:**

- This is the longest demo (5 min 15 s). Watch it once all the way through in the preview before recording.
- If the long answers stream too fast to read, reply "stream each answer over 6 seconds, then hold it" (the timeline already leaves hold time).
- Keep the Logs panel visible while the first answer arrives so viewers can match receipts to scores.
