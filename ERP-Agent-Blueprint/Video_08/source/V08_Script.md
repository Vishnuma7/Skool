# Video 8: Seeing Beyond the ERP: Connecting Outside APIs for Supply Chain Risk
**Course:** The ERP Agent Blueprint | **Length:** 24 min | **Level:** Beginner

**Learning objectives:**
- Explain why your ERP is "blind" to outside risks like storms, holidays and currency moves
- Call three free, no-key APIs from your browser: Open-Meteo (weather), Frankfurter (exchange rates) and Nager.Date (public holidays)
- Add those APIs to Stocky as tools using n8n's HTTP Request Tool, so the agent decides when to use them
- Build a simple Supplier Risk Score out of 10 (Weather 0–3, Holiday 0–3, Currency 0–2, Lead time 0–2) with Low / Medium / High bands
- Get Stocky to explain each supplier's risk in plain English, and understand why the score is guidance, not truth

**Before recording, prepare:**
- Stocky from Video 6 (Chat Trigger → AI Agent + Anthropic Chat Model + Simple Memory + Odoo tool), duplicated and renamed **"Stocky – Risk Radar"**
- Three browser tabs, ready but not yet loaded:
  - `https://api.open-meteo.com/v1/forecast?latitude=22.54&longitude=114.06&daily=precipitation_sum,wind_speed_10m_max&timezone=auto&forecast_days=7`
  - `https://api.frankfurter.dev/v1/latest?from=USD&to=INR,CNY`
  - `https://date.nager.at/api/v3/PublicHolidays/2026/CN`
- The activity file V08_Activity_SupplierRiskScorecard.xlsx open on the "Rules" sheet
- The system message text (in this script, section "Stocky's Rulebook") copied into a notes app, ready to paste
- Recording note: live numbers below were captured on **16 November 2026**. If you record on another day, your live numbers will differ; say so on camera and use your own.

**Resources for this video:** V08_Activity_SupplierRiskScorecard.xlsx, V08_Quiz.docx

---

## [ON CAMERA] Intro: The LED Lights That Didn't Arrive (00:00–02:00)

Let me tell you about the worst week of Priya's year.

It's late September. BrightLeaf has a big customer, a logistics park outside Pune, fitting out a new warehouse. They need 60 LED warehouse lights by the end of October. Priya checks Odoo. LED lights come from Shenzhen BrightTech, lead time 28 days. She places the order on the 24th of September. Twenty-eight days later is the 22nd of October. Plenty of time. Odoo says everything is fine.

Except Odoo didn't know three things. It didn't know that from the 1st to the 7th of October, China celebrates Golden Week, and most factories in Shenzhen close for the whole week. It didn't know that a storm was heading for the South China coast, which closed the port for two days. And it didn't know that a backlog builds up after every holiday. The lights arrived eleven days late. The customer's opening was delayed, and Mr. Kapoor spent an uncomfortable afternoon on the phone.

Here's the thing: none of that information was secret. The weather forecast was public. The holiday calendar was public. It was all out there. It just wasn't inside the ERP.

Today we fix that. We're going to give Stocky three new windows onto the outside world: a weather window, a currency window and a holiday window. All three are free, and none of them even needs a key card. Then Stocky will combine them into a simple Supplier Risk Score out of ten, and tell Priya in one sentence: "Shenzhen BrightTech: HIGH risk. Golden Week holiday plus typhoon warning. Order LED lights ten days earlier."

That sentence, on the 15th of September, would have saved that customer. Let's build it.

---

## [SCREEN RECORDING] Three Free Windows: Testing the APIs in Your Browser (02:00–06:00)

**SHOW:** Slide: three windows labelled Weather (Open-Meteo), Currency (Frankfurter), Holidays (Nager.Date), with a "FREE · NO KEY" badge on each.

**SAY:** Remember from Video 3, an API is a waiter. You don't walk into the kitchen; you give your order to the waiter and they bring back exactly what you asked for. Today we're visiting three new restaurants. And here's the lovely part: none of them asks for a key card. No sign-up, no API key, no credit card. You can test all three right now in your browser.

**SHOW:** Browser tab 1. Paste and press Enter: `https://api.open-meteo.com/v1/forecast?latitude=22.54&longitude=114.06&daily=precipitation_sum,wind_speed_10m_max&timezone=auto&forecast_days=7`. Tick **Pretty-print** if shown.

**SAY:** First, weather, from a service called Open-Meteo. Let me read this web address like a restaurant order. "forecast" is the menu. Latitude 22.54, longitude 114.06: that's the map pin for Shenzhen. "daily equals precipitation sum, wind speed max" means: for each day, tell me total rain and the strongest wind. "timezone equals auto" means use Shenzhen's local time. And "forecast days equals 7" means the next week.

**SHOW:** Highlight the `daily` section of the JSON: `"precipitation_sum": [0.1, 0.4, 1.4, 0.0, 0.0, 0.0, 0.0]`, `"wind_speed_10m_max": [16.3, 19.3, 13.7, 13.8, 11.9, 15.9, 15.7]`.

**SAY:** And here's the answer, a labelled shopping list. Rain for the next seven days, in millimetres: 0.1, 0.4, 1.4, then dry. Wind, in kilometres per hour: the strongest is 19. That's a calm week in Shenzhen. For comparison, a typhoon brings winds of 120 kilometres an hour and more, and 100-plus millimetres of rain in a day.

**SHOW:** Slide / table: supplier cities and map pins.

| City | Suppliers | Latitude | Longitude |
|---|---|---|---|
| Shenzhen | Shenzhen BrightTech, Global Lift Parts | 22.54 | 114.06 |
| Dubai | Gulf Lubricants | 25.20 | 55.27 |
| Chennai | SafeHands Co. | 13.08 | 80.27 |
| Mumbai | PackRight Industries | 19.08 | 72.88 |
| Pune | Apex Fasteners | 18.52 | 73.86 |

**SAY:** Here are the map pins for all five BrightLeaf supplier cities. Shenzhen, Dubai, Chennai, Mumbai and Pune. You find these by searching the city name plus the word "coordinates". They're in your activity file too, so no need to write them down.

**SHOW:** Browser tab 2: `https://api.frankfurter.dev/v1/latest?from=USD&to=INR,CNY`. Result: `{"amount":1.0,"base":"USD","date":"2026-11-16","rates":{"CNY":6.6665,"INR":93.93}}`

**SAY:** Second window: currency, from a service called Frankfurter. You met it in Video 3, and remember, the restaurant moved: the old frankfurter dot app address now forwards to frankfurter dot dev, so that's the one we use. "latest", from USD, to the Indian rupee and the Chinese yuan. And the answer: one US dollar equals 93.93 rupees and 6.67 yuan today. Now, did you notice I didn't ask for the UAE dirham, AED, for our Dubai supplier?

**SAY:** That's on purpose. As we said in Video 3, an API only serves what its kitchen stocks. Frankfurter uses the European Central Bank's reference rates, and the ECB doesn't publish the dirham, so it isn't on the menu. And it turns out we don't need it, because the UAE dirham is pegged to the US dollar at about 3.67 dirhams per dollar, and has been since 1997. It basically never moves. So for Gulf Lubricants in Dubai, dollar-to-dirham currency risk is zero. That's the kind of thing an experienced buyer knows, and we'll teach it to Stocky.

**SHOW:** Change the URL to `https://api.frankfurter.dev/v1/2026-10-16?from=USD&to=INR,CNY`. Result: INR 94.96, CNY 6.6862.

**SAY:** Swap "latest" for a date, and you get the rate on that day. On the 16th of October the dollar bought 94.96 rupees. Today it buys 93.93. That's a move of about 1.1% in a month. Keep that number in mind.

**SHOW:** Browser tab 3: `https://date.nager.at/api/v3/PublicHolidays/2026/CN`. Highlight entries: 2026-09-25 "Mid-Autumn Festival", 2026-10-01 "National Day".

**SAY:** Third window: public holidays, from Nager.Date. The address is the year, 2026, and the country code, CN for China. Back comes the list: New Year, Chinese New Year on the 17th of February, Labour Day, Dragon Boat Festival, Mid-Autumn Festival on the 25th of September, and National Day on the 1st of October.

**SHOW:** Change the URL to `.../2026/IN`, then `.../2026/AE`. Both pages are blank.

**SAY:** Now watch. Change CN to IN for India. Blank. AE for the UAE. Also blank. Nager.Date doesn't cover every country, and India and the UAE aren't on its list today. That's real life with free tools. So for India and the UAE, we'll give Stocky a short holiday list in its rulebook instead. Good agents work around gaps; they don't pretend.

> BEGINNER MISTAKE: Assuming an empty answer means "no holidays". Blank means "I don't have data for this country". Always test each country once in your browser before you trust it.

---

## [ON CAMERA] Why This Matters: Your ERP Only Sees Inside the Building (06:00–07:30)

Think about what your ERP actually knows. It knows your stock, your orders, your suppliers, your prices and your lead times. It's the company's filing cabinet and rulebook. Brilliant at everything that happens *inside* the building.

But think about the last three times a supplier let you down. I'd bet at least one of them was caused by something outside: a storm, a festival, a port closure, a currency jump that made the supplier re-price. Your ERP had no idea any of it was coming. The lead time field said 28 days, and the lead time field doesn't read the news.

Experienced buyers carry this outside knowledge in their heads. Priya knows that nothing moves in China during Chinese New Year. She knows that the Chennai monsoon peaks in November. But she can't check five cities, three currencies and three holiday calendars every morning for 40 SKUs. Nobody can.

That's exactly the kind of job an agent is good at. Boring, repetitive checking, every single day, without getting tired. Priya keeps the judgement; Stocky does the looking.

> PAUSE & THINK: Think of your top three suppliers. Which city is each one in? What outside event, a monsoon, a holiday, a strike season, has hurt you there before? Write it down; you'll use it in the activity.

---

## [SCREEN RECORDING] The Supplier Risk Score on One Page (07:30–09:45)

**SHOW:** V08_Activity_SupplierRiskScorecard.xlsx → **Rules** sheet.

**SAY:** Before we build anything, let's agree on the scoring rules. If you can't explain a score on a napkin, an agent can't either. Ours has four parts and adds up to ten.

**SHOW:** Highlight the Weather rows: 0 = calm; 1 = rain ≥ 20 mm in a day or wind ≥ 40 km/h; 2 = rain ≥ 50 mm or wind ≥ 60 km/h; 3 = rain ≥ 100 mm or wind ≥ 90 km/h (storm or typhoon strength), in the next 7 days.

**SAY:** Weather, zero to three points. Zero if the next seven days are calm. One point for a heavy-rain day, 20 millimetres, or wind over 40. Two points for 50 millimetres or wind over 60. And three points for storm or typhoon strength: 100 millimetres of rain, or wind over 90 kilometres an hour.

**SHOW:** Highlight the Holiday rows: 0 = no public holiday in the next 30 days; 1 = one holiday day; 2 = two or more holiday days; 3 = a major shutdown (Golden Week, Chinese New Year, Diwali week, Eid break).

**SAY:** Holidays, zero to three. Look 30 days ahead. No holidays, zero. One holiday day, one point. Two or more days, two points. And a major shutdown, where factories close for a week or more, like Golden Week or Chinese New Year, is the full three.

**SHOW:** Highlight Currency rows: biggest 30-day move in USD→INR or USD→supplier currency: under 1% = 0; 1% to 3% = 1; 3% or more = 2. Indian suppliers paid in rupees = 0.

**SAY:** Currency, zero to two. Compare today's rate with 30 days ago, for the rupee and for the supplier's own currency, and take the bigger move. Under 1%, zero. One to three percent, one point. Three percent or more, two points. Indian suppliers we pay in rupees score zero, because there's no exchange rate involved.

**SHOW:** Highlight Lead time rows: 7 days or less = 0; 8–20 days = 1; 21 days or more = 2.

**SAY:** And lead time, zero to two, straight from Odoo. Seven days or less, zero. Eight to twenty days, one. Twenty-one days or more, two. A long lead time means less room to recover if something goes wrong.

**SHOW:** Highlight the bands: 0–3 LOW (green), 4–6 MEDIUM (amber), 7–10 HIGH (red).

**SAY:** Add them up. Zero to three is low risk, green. Four to six is medium, amber. Seven to ten is high, red. That's it. Four simple questions any buyer could answer with a calculator. Stocky just answers them faster, for every supplier, every day.

> PRO TIP: Keep the rules boring and written down. If your team argues about whether a storm is worth 2 or 3 points, that's a great conversation. Have it once, write the answer in the Rules sheet, and the agent follows it every day.

---

## [SCREEN RECORDING] Tool 1: Giving Stocky a Weather Window (09:45–12:45)

**SHOW:** n8n → open **Stocky – Risk Radar** (the duplicate of Video 6's Stocky). Canvas: When chat message received → AI Agent, with Anthropic Chat Model, Simple Memory and the Odoo tool attached underneath.

**SAY:** Here's Stocky from Video 6. I've duplicated it and called it "Stocky, Risk Radar", so the original stays safe. You can see the brain, the memory and the Odoo tool hanging underneath the agent. Today we hang three more tools there.

**SHOW:** Click the **+** under **Tool** on the AI Agent → search "HTTP" → choose **HTTP Request Tool**.

**SAY:** Click the plus under Tool, search HTTP, and choose HTTP Request Tool. This is a waiter that the agent can call whenever it decides it needs to. That's the big difference from a normal workflow step. We don't say "call the weather at step 3". We give Stocky the waiter's phone number, and Stocky decides when to call.

**SHOW:** Rename the node **get_weather**. In **Description**, type:

```
Gets the 7-day weather forecast for one supplier city.
Give it the city's latitude and longitude.
Returns daily rain (mm) and maximum wind speed (km/h).
```

**SAY:** Name it "get weather". Then the description, which is the most important box on this screen. This is how Stocky knows what the tool is for. Write it like you're briefing the intern: "Gets the seven-day weather forecast for one supplier city. Give it the latitude and longitude. Returns daily rain and maximum wind."

**SHOW:** **Method: GET**. **URL:** `https://api.open-meteo.com/v1/forecast`

**SAY:** Method: GET, which just means "fetch me something". URL: the Open-Meteo forecast address, only up to the word "forecast". We'll add the rest as separate fields so it's easy to read.

**SHOW:** Toggle **Send Query Parameters: on** → **Specify Query Parameters: Using Fields Below**. Add parameters:
- **latitude** → click the sparkle icon **"Let the model define this parameter"**
- **longitude** → click the sparkle icon
- **daily** = `precipitation_sum,wind_speed_10m_max`
- **timezone** = `auto`
- **forecast_days** = `7`

**SAY:** Switch on "Send Query Parameters". These are the blanks on the order form. Add "latitude", and instead of typing a number, click this little sparkle button: "Let the model define this parameter". That means Stocky fills in this blank itself, depending on which city it's checking. Same for longitude. The other three never change, so we type them in: daily, precipitation sum comma wind speed 10m max. Timezone, auto. Forecast days, seven.

**SHOW:** Click **Execute step** (test tool). n8n asks for test values: latitude 25.20, longitude 55.27. Output shows Dubai: rain all 0.0 except 0.3, wind max 15.4.

**SAY:** Let's test it with Dubai: 25.20 and 55.27. And back comes Dubai's week. Practically no rain, light wind. Exactly what you'd expect in November.

> BEGINNER MISTAKE: Leaving the Description empty or vague, like "weather tool". The agent picks tools based on their descriptions. A vague description means the agent either never uses the tool or uses it at the wrong time.

**SHOW:** Hover on the parameter fields again; point to the small "fromAI" label that appears.

**SAY:** If you're curious what the sparkle button did, it wrote a little placeholder that says "the AI fills this in". You never need to type it yourself. One tool down, two to go.

---

## [SCREEN RECORDING] Tools 2 and 3: Currency and Holidays (12:45–15:15)

**SHOW:** **+** under Tool → **HTTP Request Tool** → rename **get_exchange_rates**. Description:

```
Gets US dollar exchange rates for INR and CNY.
Use date = "latest" for today, or a date like 2026-10-16
to get the rate on that day (for the 30-day comparison).
Do not ask for AED: it is not available, and the dirham
is pegged to USD at about 3.67, so its currency risk is about 0.
```

**SAY:** Second tool: get exchange rates. The description tells Stocky three things: what it gets, how to ask for today or for a past date, and, importantly, not to ask for the dirham, and why. If we don't say that, Stocky might order something the kitchen doesn't stock and think the tool is broken.

**SHOW:** **URL:** click into the field and paste: `https://api.frankfurter.dev/v1/{{ $fromAI('date', 'latest, or a date in YYYY-MM-DD format') }}` . **Send Query Parameters: on** → **from** = `USD`, **to** = `INR,CNY`.

**SAY:** For the URL, paste this from the activity file. The part in curly brackets is the same placeholder the sparkle button makes. It means "Stocky, fill in the date here: either the word latest, or a date". Then two fixed blanks: from, USD; to, INR comma CNY.

**SHOW:** Test with date = `latest`. Output: INR 93.93, CNY 6.6665.

**SAY:** Test with "latest". 93.93 rupees, 6.67 yuan. Working.

**SHOW:** **+** under Tool → **HTTP Request Tool** → rename **get_public_holidays**. Description:

```
Gets official public holidays for one country and year.
countryCode: CN for China. (India and UAE are NOT covered:
use the holiday list in your instructions for IN and AE.)
Returns a list of dates and holiday names.
```

**SHOW:** **URL:** `https://date.nager.at/api/v3/PublicHolidays/{{ $fromAI('year', 'four-digit year, e.g. 2026') }}/{{ $fromAI('countryCode', 'two-letter country code, e.g. CN') }}`

**SAY:** Third tool: get public holidays. Again, the description says what's covered and what isn't. And the URL has two blanks for Stocky to fill: the year and the country code.

**SHOW:** Test with year 2027, countryCode CN. Output includes `2027-02-06 Chinese New Year (Spring Festival)`.

**SAY:** Let's test with next year: 2027, China. And there it is: Chinese New Year, 6th of February 2027. If you buy from China, put that date in your calendar right now. Factories often close for two to three weeks around it, not just the official days.

**SHOW:** Zoom out. The AI Agent now has five things attached underneath: Anthropic Chat Model, Simple Memory, Odoo, get_weather, get_exchange_rates, get_public_holidays.

**SAY:** Zoom out and look at Stocky now. One brain, one memory, and four tools: the Odoo filing cabinet inside the building, and three windows to the outside world. No code, and no API keys to manage for any of the new ones.

> PRO TIP: Open-Meteo is free for non-commercial use and testing, with a generous daily limit. If you run this every day inside a business, read their terms; commercial use needs an inexpensive plan. Frankfurter and Nager.Date are free and open.

---

## [ON CAMERA] Guidance, Not Truth: Common Mistakes (15:15–17:00)

Before we switch Stocky on, I need to give you a warning, because this is where beginners get into trouble.

The risk score is **guidance, not truth**. A weather forecast seven days out is a guess, a good guess, but a guess. Open-Meteo gives you forecasts of wind and rain; it doesn't issue official typhoon warnings. For that you'd still check your national weather service, like the Hong Kong Observatory for the South China coast. And holiday data has gaps, as we just saw with India and the UAE.

So three common mistakes.

Mistake one: treating a HIGH score as a command. A HIGH score means "Priya, look at this today". It doesn't mean "cancel the order" or "double the quantity". The human decides.

Mistake two: letting the agent invent data. If a tool fails or a country isn't covered, Stocky must say so, not guess. We'll put that rule in its instructions.

Mistake three: never checking the score against reality. Once a month, look back. Did the HIGH suppliers actually deliver late? If the score keeps crying wolf, change the rules. A score you don't trust is worse than no score.

Think of it like the weather forecast on your phone. When it says 80% chance of rain, you take an umbrella. You don't cancel your life. That's how Priya should use Stocky's risk score.

---

## [SCREEN RECORDING] Stocky's Rulebook, a Live Run and a Fire Drill (17:00–22:15)

**SHOW:** Open the **AI Agent** node → **Options → System Message**. Paste:

```
You are Stocky, BrightLeaf Supplies' procurement risk assistant.
Today's date is {{ $now.toFormat('yyyy-MM-dd') }}.

SUPPLIERS (name | city | country | lat, long | currency | longest lead time)
- Shenzhen BrightTech | Shenzhen | CN | 22.54, 114.06 | CNY | 28 days (LED lights)
- Global Lift Parts | Shenzhen | CN | 22.54, 114.06 | CNY | 21 days
- Gulf Lubricants | Dubai | AE | 25.20, 55.27 | AED (pegged) | 14 days
- SafeHands Co. | Chennai | IN | 13.08, 80.27 | INR | 10 days
- PackRight Industries | Mumbai | IN | 19.08, 72.88 | INR | 6 days
- Apex Fasteners | Pune | IN | 18.52, 73.86 | INR | 7 days

SCORING (total out of 10)
Weather 0-3 (next 7 days): 0 calm; 1 rain>=20mm or wind>=40km/h;
  2 rain>=50mm or wind>=60km/h; 3 rain>=100mm or wind>=90km/h.
Holiday 0-3 (next 30 days): 0 none; 1 one holiday day; 2 two or more
  days; 3 major shutdown (China National Day = Golden Week 1-7 Oct,
  Chinese New Year, Diwali week, Eid break).
Currency 0-2: biggest 30-day move of USD->INR or USD->supplier currency:
  <1% = 0; 1-3% = 1; >=3% = 2. Indian suppliers = 0.
  AED is pegged to USD (about 3.67), so Dubai's AED risk is about 0.
Lead time 0-2: <=7 days 0; 8-20 days 1; >=21 days 2.
Bands: 0-3 LOW, 4-6 MEDIUM, 7-10 HIGH.

HOLIDAYS NOT IN THE API (check dates each year)
India: 26 Jan, 15 Aug, 2 Oct, Diwali (8 Nov 2026), 25 Dec.
UAE: Eid al-Fitr (approx. 20-22 Mar 2026), Eid al-Adha (approx.
  26-29 May 2026), National Day 2-3 Dec.

RULES
- Use the tools for real data. Never invent a number.
- If a tool fails or data is missing, say so and score that part 0
  with the note "not checked".
- Output a table: Supplier | Weather | Holiday | Currency | Lead time
  | Total | Band. Then one plain-English sentence per MEDIUM or HIGH
  supplier: what the risk is and what Priya could do.
- End with: "This score is guidance, not truth. Please check before acting."
```

**SAY:** Now the rulebook. Open the agent, Options, System Message, and paste this in. It's in your activity file. Let me walk you through it, because it's all plain English. First, today's date: that little placeholder fills in today automatically, so Stocky knows what "next 30 days" means. Then the six suppliers, with their cities, map pins, currencies and longest lead times. Then the scoring rules we just agreed on. Then the holidays the API can't give us, for India and the UAE. And then the rules of behaviour. Use the tools, never invent a number. If something fails, say so. Give me a table, then one plain sentence for anything medium or high. And always end with "guidance, not truth".

**SHOW:** Click **Open chat**. Type: "Good morning Stocky. Give me today's supplier risk scores."

**SAY:** Let's try it. Open chat. "Good morning Stocky. Give me today's supplier risk scores."

**SHOW:** The agent node shows tool calls running. Open the **Logs** panel: get_weather called 5 times (one per city), get_exchange_rates twice (latest and 2026-10-16), get_public_holidays once (2026, CN).

**SAY:** Watch the logs on the right. This is the bit I love. Stocky called the weather tool five times, once per city. It didn't call it twice for Shenzhen, even though two suppliers are there. It called the currency tool twice: today and 30 days ago. And it called the holiday tool once, for China, because it knows India and the UAE aren't covered. Nobody told it that order. It worked it out from the descriptions. These logs are your receipts. You can always check exactly what the agent looked at.

**SHOW:** The chat answer (16 November 2026):

| Supplier | Weather | Holiday | Currency | Lead time | Total | Band |
|---|---|---|---|---|---|---|
| Shenzhen BrightTech | 0 | 0 | 1 | 2 | 3 | LOW |
| Global Lift Parts | 0 | 0 | 1 | 2 | 3 | LOW |
| Gulf Lubricants | 0 | 2 | 1 | 1 | 4 | MEDIUM |
| SafeHands Co. | 0 | 0 | 0 | 1 | 1 | LOW |
| PackRight Industries | 0 | 0 | 0 | 0 | 0 | LOW |
| Apex Fasteners | 0 | 0 | 0 | 0 | 0 | LOW |

"Gulf Lubricants: MEDIUM risk (4/10). UAE National Day falls on 2–3 December, inside the next 30 days, and Hydraulic Oil has a 14-day lead time. Odoo shows only 31 drums on hand against a reorder point of 40, so place the oil order this week, before the holiday. Currency: the dollar bought 94.96 rupees on 16 October and 93.93 today, a 1.1% move. This score is guidance, not truth. Please check before acting."

**SAY:** And here's the answer. Calm weather everywhere this week. The Shenzhen suppliers score three, low, mostly because of their long lead times. And Gulf Lubricants comes out medium, four out of ten, because of the UAE National Day holiday on the 2nd and 3rd of December. And look: Stocky also used its Odoo tool from Video 6, and noticed Hydraulic Oil is already below its reorder point, 31 drums against 40. So the sentence is: "Place the oil order this week, before the holiday." Inside data plus outside data, in one sentence. That's a buyer's sentence.

**SAY:** Now, a calm week is great for BrightLeaf, but it's a boring demo. So let's run a fire drill. A fire drill is when you feed the agent a pretend emergency to check it reacts properly, the same way you'd test a smoke alarm.

**SHOW:** Type: "Fire drill. Pretend today is 24 September 2026. Use the real holiday and currency tools. For weather, assume the Shenzhen forecast shows 110 km/h wind and 140 mm of rain on 29–30 September. Score Shenzhen BrightTech."

**SAY:** I'll type: "Fire drill. Pretend today is the 24th of September 2026. Use the real holiday and currency tools. For weather, assume Shenzhen shows 110 kilometres an hour of wind and 140 millimetres of rain on the 29th and 30th. Score Shenzhen BrightTech." This is the exact week from Priya's story.

**SHOW:** Logs: get_public_holidays (2026, CN) and get_exchange_rates (2026-09-24 and 2026-08-24). Answer:

"Shenzhen BrightTech: **HIGH risk (8/10)**. Weather 3 (typhoon-strength winds forecast for 29–30 Sept), Holiday 3 (Mid-Autumn Festival on 25 Sept, then National Day on 1 Oct, which starts Golden Week, 1–7 Oct), Currency 0 (USD→INR moved 0.2% and USD→CNY 0.15% in 30 days), Lead time 2 (28 days). **Golden Week holiday + typhoon warning; order LED lights 10 days earlier.** Consider confirming the factory's holiday closure dates with BrightTech today. This score is guidance, not truth. Please check before acting."

**SAY:** Eight out of ten. HIGH. And read the reasons: typhoon-strength winds, the Mid-Autumn Festival, and then Golden Week. It even pulled the real exchange rates for those dates. And then the sentence Priya needed back in September: "Golden Week holiday plus typhoon warning. Order LED lights ten days earlier." Ten days, because the factory closes for about seven days, and there's a few days of storm and backlog on top. Plus a sensible next step: confirm the closure dates with the supplier. That's not the agent taking over. That's the agent making sure Priya never gets surprised again.

> PAUSE & THINK: Stocky said "order 10 days earlier". Before you act on that, what would you check? (Hint: is there stock on hand to cover the gap? Does the supplier have its own holiday calendar? What does the official weather service say?)

---

## [ON CAMERA] Outro (22:15–24:00)

Let's recap. Three key takeaways.

One: your ERP only sees inside the building. Weather, holidays and currency live outside, and three free, no-key APIs, Open-Meteo, Frankfurter and Nager.Date, bring them in.

Two: tools plus good descriptions make a smart agent. We didn't tell Stocky which tool to call when. We described each waiter clearly and Stocky decided. And when data was missing, like Indian holidays, we filled the gap with written rules instead of guessing.

Three: the risk score is guidance, not truth. Four simple parts, out of ten, Low, Medium, High. It tells Priya where to look, and Priya decides what to do.

Your activity is **V08_Activity_SupplierRiskScorecard.xlsx**. You'll open the three API links yourself, paste today's real numbers into the Live Data sheet, and watch the scorecard work out each BrightLeaf supplier's risk. Then, and this is the important bit, add your own top three suppliers with their cities, and score them. You might be surprised which one comes out on top. After that, take the quiz, **V08_Quiz**.

Right now, Stocky's risk scores disappear as soon as you close the chat. That's a problem: Mr. Kapoor wants to see trends, and Priya wants a record of every decision. In the next video, "Memory and Reports", we'll teach Stocky to write every decision into our Google Sheets database, and to send Mr. Kapoor his Monday stock report automatically, before he's even had his first coffee. See you there.
