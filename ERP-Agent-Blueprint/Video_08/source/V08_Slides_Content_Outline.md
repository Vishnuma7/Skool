# Video 8 Slides: Content Outline
**Video:** Seeing Beyond the ERP: Connecting Outside APIs for Supply Chain Risk | **Length:** 24 min | **Slides:** 18
*(Content outline only. Final slides will be designed later in the brand theme.)*

---

### Slide 1: Title
- **Seeing Beyond the ERP**
- Connecting outside APIs for supply chain risk
- The ERP Agent Blueprint · Video 8
- **Suggested visual:** Stocky looking through a big window from inside a warehouse at a world map dotted with weather, currency and calendar icons.

### Slide 2: The LED lights that didn't arrive
- Ordered 24 Sept · 28-day lead time · "due 22 Oct"
- Golden Week (1–7 Oct) + storm closed the port + post-holiday backlog
- Arrived **11 days late**; customer opening delayed
- **Suggested visual:** A timeline from 24 Sept to early November: the planned arrival flag at 22 Oct, a grey "factory closed" block on 1–7 Oct, a storm cloud on 29–30 Sept, and the actual arrival flag 11 days later.

### Slide 3: Your ERP only sees inside the building
- Inside: stock, orders, suppliers, prices, lead times
- Outside: weather, holidays, currency, ports
- **Suggested visual:** A cutaway of a building (the filing cabinet = ERP) with data inside; outside the walls, storm clouds, a festival lantern and a currency chart that the cabinet can't "see".

### Slide 4: Three free windows
- Weather: **Open-Meteo**
- Currency: **Frankfurter**
- Holidays: **Nager.Date**
- Free · no sign-up · no API key
- **Suggested visual:** Three window frames side by side, each with an icon (sun/cloud, coins, calendar) and a "NO KEY NEEDED" badge where a key card would normally hang.

### Slide 5: Reading a weather order
- `api.open-meteo.com/v1/forecast?latitude=22.54&longitude=114.06&daily=precipitation_sum,wind_speed_10m_max&timezone=auto&forecast_days=7`
- Menu = forecast · Map pin = Shenzhen · Ask for daily rain + max wind · Next 7 days
- **Suggested visual:** The URL broken into coloured chunks, each chunk with an arrow to a plain-English label, like an annotated restaurant order slip.

### Slide 6: Supplier map pins
- Shenzhen 22.54, 114.06 (Shenzhen BrightTech, Global Lift Parts)
- Dubai 25.20, 55.27 (Gulf Lubricants)
- Monterrey 25.69, -100.32 (SafeHands Co.)
- Chicago 41.88, -87.63 (PackRight Industries)
- Columbus 39.96, -83.00 (Apex Fasteners)
- **Suggested visual:** A world map with five pins (Columbus, Chicago, Monterrey, Dubai, Shenzhen), each labelled with city, supplier and coordinates, and a "HQ" star on Columbus.

### Slide 7: Currency: one dollar, today vs 30 days ago
- 16 Oct 2026: USD→CNY 6.6862 · USD→MXN 18.3835
- 17 Nov 2026: USD→CNY 6.6661 · USD→MXN 18.4639
- CNY moved ~0.3% · MXN moved ~0.4% (both under 1% = 0 points)
- `api.frankfurter.dev/v1/latest?from=USD&to=CNY,MXN` (the old .app address forwards here)
- Columbus and Chicago suppliers bill in dollars: no exchange rate needed
- No AED on the menu ("an API only serves what its kitchen stocks"); the dirham is pegged at **about 3.67** per USD, so Dubai's currency risk ≈ 0
- **Suggested visual:** Two simple exchange-rate "price tags" (before/after) with a small arrow showing % change, plus a padlock icon next to AED labelled "pegged".

### Slide 8: Holidays and the gaps
- `date.nager.at/api/v3/PublicHolidays/2026/CN` → Mid-Autumn 25 Sept, National Day 1 Oct, Chinese New Year 2027 = 6 Feb
- `.../2026/US` → Thanksgiving 26 Nov, Christmas 25 Dec · `.../2026/MX` → Revolution Day 16 Nov, Christmas 25 Dec
- UAE (AE): **blank = not covered**, not "no holidays"
- Fix: a short written UAE holiday list in Stocky's rulebook (National Day 2–3 Dec, Eid breaks)
- **Suggested visual:** Three calendars (CN, US, MX) with holidays circled in red; next to them an empty calendar labelled AE with a sticky note "use our own list".

### Slide 9: Pause & Think
- Your top 3 suppliers: which city? What outside event has hurt you there before?
- **Suggested visual:** Three blank supplier cards with a "city" field and a "past surprise" field.

### Slide 10: The Supplier Risk Score (out of 10)
- Weather 0–3 · Holiday 0–3 · Currency 0–2 · Lead time 0–2
- 0–3 LOW · 4–6 MEDIUM · 7–10 HIGH
- **Suggested visual:** A stacked bar out of 10 split into four coloured segments, with a green/amber/red band scale underneath.

### Slide 11: The scoring rules on a napkin
- Weather (7 days): rain ≥20/50/100 mm or wind ≥40/60/90 km/h → 1/2/3
- Holiday (30 days): 1 day → 1 · 2+ days → 2 · major shutdown → 3
- Currency (30 days): <1% → 0 · 1–3% → 1 · ≥3% → 2 · US suppliers paid in USD → 0
- Lead time: ≤7 → 0 · 8–20 → 1 · ≥21 → 2
- **Suggested visual:** A literal paper napkin with the four rules handwritten, a coffee cup ring in the corner.

### Slide 12: Tools = waiters the agent can call
- HTTP Request Tool hangs under the AI Agent
- We don't say *when* to call; Stocky decides from the **Description**
- Sparkle button = "let the model fill in this blank" (latitude, longitude, date, country)
- **Suggested visual:** The AI Agent node with five tools hanging underneath like keys on a ring: Odoo, get_weather, get_exchange_rates, get_public_holidays, plus the Claude brain and memory.

### Slide 13: Writing a good tool description
- Bad: "weather tool"
- Good: "Gets the 7-day weather forecast for one supplier city. Give it latitude and longitude. Returns daily rain (mm) and max wind (km/h)."
- **Suggested visual:** Two sticky notes side by side, a crossed-out vague one and a ticked clear one.

### Slide 14: Stocky's rulebook (system message)
- Today's date · supplier list with pins, currency and lead time
- Scoring rules · holidays not in the API
- Never invent numbers · say "not checked" if data is missing · end with "guidance, not truth"
- **Suggested visual:** A one-page "employee handbook" with five tabbed sections, Stocky reading it.

### Slide 15: Live run (17 Nov 2026)
- All five cities calm this week · currency moves under 1%
- Shenzhen suppliers 2/10 LOW (long lead times) · Columbus and Chicago 1/10 (Thanksgiving 26 Nov)
- **Gulf Lubricants 3/10 LOW, top of the list** (UAE National Day 2–3 Dec)
- Hydraulic Oil already below reorder point (31 vs 40) → "place the oil order this week" · LOW doesn't mean ignore
- **Suggested visual:** The six-row risk table with coloured band chips, the Gulf Lubricants row highlighted, and a small Logs panel showing 10 tool calls.

### Slide 16: Fire drill: Golden Week + typhoon
- Pretend date: 24 Sept 2026 · assumed 110 km/h wind, 140 mm rain
- Weather 3 + Holiday 3 + Currency 0 + Lead time 2 = **8/10 HIGH**
- "Shenzhen BrightTech: HIGH risk. Golden Week holiday + typhoon warning; order LED lights 10 days earlier."
- **Suggested visual:** A smoke-alarm test button being pressed, next to a red HIGH badge and the one-line recommendation in a speech bubble from Stocky.

### Slide 17: Guidance, not truth
- A HIGH score means "look at this today", not "act automatically"
- No invented data; gaps are reported
- Check monthly: did HIGH suppliers really deliver late?
- Forecasts are not official warnings (check the national weather service)
- **Suggested visual:** A phone weather app showing "80% chance of rain" and a hand picking up an umbrella, captioned "Take the umbrella. Don't cancel your life."

### Slide 18: Recap and your homework
- Your ERP sees inside; APIs see outside
- Tools + clear descriptions = smart agent
- The score is guidance, not truth
- Activity: **V08_Activity_SupplierRiskScorecard.xlsx** · Quiz: **V08_Quiz**
- Next: **Memory & Reports** (logging to a database and the Monday report)
- **Suggested visual:** Three takeaway tiles, then a teaser strip showing a Google Sheet filling with rows and an email titled "Monday Stock Report" landing in Mr. Harrison's inbox.
