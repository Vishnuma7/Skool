# Video 3 Slides: Content Outline
**Video:** APIs Explained Like You're Ordering at a Restaurant | **Length:** 24 min | **Slides:** 17
(Content outline only. The deck will be designed later with the brand theme.)

---

## Slide 1: Title
- **Title:** APIs Explained Like You're Ordering at a Restaurant
- **Subtitle:** The ERP Agent Blueprint · Video 3
- **Suggested visual:** A friendly waiter carrying a tray. On the tray is a small "Shenzhen weather" card and a "USD → INR" card.

## Slide 2: The Copy-Paste Problem (Intro hook)
- Priya copied numbers from websites into Excel **31 times** in one month
- USD→INR rate every Monday, Shenzhen weather every week, supplier holidays
- About 4–5 minutes each: **2+ hours a month**
- **Suggested visual:** A tally chart of 31 marks next to a browser window, an Excel sheet and an arrow labelled "copy… paste… repeat".

## Slide 3: What You'll Learn Today
- What an API is (the restaurant)
- Two live API calls: weather and currency
- Reading JSON like a shopping list
- GET vs POST, status codes, API keys
- **Suggested visual:** A 5-step path / road map with icons (waiter, cloud with rain, rupee coin, receipt, key card).

## Slide 4: An API Is a Waiter
- You (Stocky) never walk into the kitchen (Odoo)
- You give your order to the waiter (API), who brings back exactly what you asked for
- The kitchen stays safe and decides what can leave it
- **Suggested visual:** The core restaurant diagram: Customer table "Stocky" → Waiter "API" → Kitchen "Odoo", with arrows both ways.

## Slide 5: Request, Response, Endpoint
- **Request** = the order you give
- **Response** = what comes back to your table
- **Endpoint** = one dish on the menu (e.g. "forecast", "latest rates")
- **Suggested visual:** The same diagram with arrow labels "Request" (in) and "Response" (out), plus a menu card listing endpoints: /forecast, /latest, /PublicHolidays.

## Slide 6: Anatomy of a Real Order
- `https://api.open-meteo.com` = restaurant address
- `/v1/forecast` = the dish (endpoint)
- `?latitude=22.54&longitude=114.06…` = order details (parameters)
- `?` = "here come my order details" · `&` = "and also"
- **Suggested visual:** The URL split into three coloured blocks (blue, green, orange) with labels underneath, like a restaurant order slip.

## Slide 7: The Shenzhen Rainstorm (story)
- 60 sets of BL-1005 Pallet Jack Wheels, Global Lift Parts, 21-day lead time
- Storm → port slowed for 3 days → shipment 9 days late
- Warning was public on Sunday; Priya learned about it the next Monday by email
- With an API check: a **4-day head start**
- **Suggested visual:** A timeline: Sunday "Warning public" → Tuesday "Storm" → following Monday "Supplier email", with a second, green timeline showing "Stocky alert: Sunday".

## Slide 8: Live Call #1: Weather in Shenzhen
- Paste the URL into any browser, no sign-up, no key
- The response arrives in under a second
- In Chrome, tick **Pretty-print**
- **Suggested visual:** Screenshot of the Open-Meteo JSON response in Chrome with the Pretty-print box circled.

## Slide 9: JSON = A Labelled Shopping List
- Label on the left, value on the right: `"timezone": "Asia/Shanghai"`
- `daily_units` tells you the units: mm and km/h
- Square brackets `[ ]` = a list, like an Excel column
- **Suggested visual:** A side-by-side: a paper shopping list ("Milk: 2 L, Eggs: 12") next to the JSON lines with matching colour highlights.

## Slide 10: Read the Lists Like Columns
- date 1 ↔ rain 1 ↔ wind 1
- 17 Nov: 0.1 mm, 16.3 km/h · 19 Nov: 1.4 mm (light drizzle)
- Worry zone: rain 50+ mm or wind 60+ km/h
- **Suggested visual:** The three JSON lists turned into a 3-column Excel table, with a red "worry zone" threshold bar.

## Slide 11: Change the Order, Change the Dish
- Swap latitude/longitude to 25.20, 55.27 → Dubai (Gulf Lubricants, BL-1007)
- Same request, different details = 5 supplier cities checked in seconds
- **Suggested visual:** A world map with pins on Shenzhen, Dubai, Chennai, Mumbai and Pune, each pin with a little weather icon.

## Slide 12: Live Call #2: The Currency Waiter
- `api.frankfurter.app/latest?from=USD&to=INR,CNY,AED`
- The address moves to frankfurter.**dev** (a forwarding note)
- Test day: 1 USD = 93.93 INR, 6.67 CNY
- 60 × $38 = $2,280 ≈ ₹2,14,000; at 95 INR/USD it costs ~₹2,400 more
- **Suggested visual:** The JSON response, with a calculator graphic showing the price impact for BL-1005.

## Slide 13: Where's the Dirham?
- We asked for 3 currencies, got 2
- The kitchen (European Central Bank data) doesn't stock AED
- AED is pegged at about 3.67 per USD
- **Lesson:** always check that what came back matches what you asked for
- **Suggested visual:** An order slip with three ticks expected (INR, CNY, AED) and a plate with only two items; AED crossed out with a question mark.

## Slide 14: GET vs POST: Asking vs Submitting
- **GET** = asking ("How many BL-1002 boxes do we have?"), safe, changes nothing
- **POST** = submitting ("Create a PO for 1,820 boxes from PackRight"), creates or changes something
- Rule: Stocky can GET freely; important POSTs need Priya's approval
- **Suggested visual:** Split screen: left, a customer asking the waiter a question (speech bubble); right, a customer handing over a signed order slip with a manager's signature stamp.
- **Pause & Think:** GET or POST? Lead time check · Update reorder point · Reminder email · Read sales orders

## Slide 15: Status Codes = Receipts
- **200** OK · **401** wrong key card · **404** wrong address · **429** too many orders
- 2xx good news · 4xx your order's problem · 5xx their kitchen's problem
- Live demo: "forecst" → Not Found (404); "daily=banana" → bad request (400)
- **Suggested visual:** Four restaurant receipts, each with a big number and an icon (thumbs up, broken key card, map with a question mark, queue of order slips).

## Slide 16: API Keys = Hotel Key Cards
- Opens only certain doors; belongs to one user; can be cancelled
- In Odoo: Settings → Activate the developer mode → avatar → My Profile/Preferences → Account Security → API Keys
- Rules: never share in chats · one key per tool · cancel if in doubt
- **Suggested visual:** A hotel key card labelled "Room 412 · Gym · Pool. NOT the manager's office", next to a screenshot of Odoo's Account Security tab with "New API Key" highlighted.

## Slide 17: Recap, Activity & Next Video
- 3 takeaways: API = waiter (request, endpoint, parameters, response) · JSON = shopping list + status code receipts · GET is safe, POST needs a signature, keys are key cards
- **Activity:** V03_Activity_API_Treasure_Hunt.xlsx (about 30 min) · **Quiz:** 10 questions
- **Next:** Databases Without Fear: Your Data's Home
- Common beginner mistakes reminder: typos, units, missing items, careless keys
- **Suggested visual:** Three big numbered cards, plus a thumbnail of the Treasure Hunt workbook and a teaser image of a messy spreadsheet with merged cells.
