# Video 3: APIs Explained Like You're Ordering at a Restaurant
**Course:** The ERP Agent Blueprint | **Length:** 24 min | **Level:** Beginner

**Learning objectives:**
- Explain what an API is, in plain English, using the restaurant and waiter analogy
- Name the parts of an API call: base address, endpoint, parameters, request and response
- Call two real, free APIs from a normal web browser and read the JSON "shopping list" they send back
- Tell the difference between GET (asking) and POST (submitting), and read the four most common status codes like receipts
- Understand what an API key is, why it is like a hotel key card, and where Odoo keeps them

**Before recording, prepare:**
- Chrome (or Firefox) with these tabs ready but NOT yet loaded:
  - Tab 1: `https://api.open-meteo.com/v1/forecast?latitude=22.54&longitude=114.06&daily=precipitation_sum,wind_speed_10m_max&timezone=auto`
  - Tab 2: `https://api.frankfurter.app/latest?from=USD&to=CNY,MXN,AED` (the old address on purpose, so you can show the redirect to `api.frankfurter.dev/v1`)
  - Tab 3: your BrightLeaf Odoo trial from Video 2, logged in as Sarah (Inventory > Products showing the 10 BrightLeaf SKUs)
- A simple slide or whiteboard graphic of the restaurant diagram: Customer (Stocky) → Waiter (API) → Kitchen (Odoo) → Waiter → Customer
- Browser zoom at 150% so the JSON is readable on video. In Chrome, tick the **Pretty-print** box at the top of the JSON page.
- Note: live numbers change every day. Read out whatever your screen shows on recording day; the numbers in this script are from a test run on 17 November.

**Resources for this video:**
- Activity: `V03_Activity_API_Treasure_Hunt.xlsx`
- Quiz: `V03_Quiz.docx`

---

## [ON CAMERA] Intro (00:00–02:00)

**SAY:**
Here's a question I want you to sit with for a second. How many times last month did you open a website, copy a number, and paste it into Excel? An exchange rate. A shipment status. A weather warning for a port. A supplier's price.

When I asked Sarah Mitchell, our procurement and inventory manager at BrightLeaf Supplies, she counted. Thirty-one times. In one month. Every Monday she checks the dollar against the Chinese yuan and the Mexican peso before she approves the import purchase orders. Every week she Googles the weather in Shenzhen because two of her suppliers are there. Each check takes four or five minutes. That's more than two hours a month of copy and paste.

Today you're going to learn the thing that makes all that copying unnecessary. It's called an API. And by the end of this video, you will have used two real APIs yourself. In your own browser, with nothing to install, no password and no code.

First, what an API actually is, using a restaurant. Then we'll call a live weather API for Shenzhen and a live currency API for the yuan, the peso and the dirham, and read the answer, which looks scary for thirty seconds and then looks like a shopping list. Then asking versus submitting, what numbers like 404 mean, and why API keys are like hotel key cards.

Why does this matter? Because an AI agent is only as useful as the information it can reach, and APIs are how Stocky, our agent, will reach your ERP and the outside world. If this feels new, that's completely normal. Let's go and order some food.

---

## [SCREEN RECORDING] The Restaurant: How an API Really Works (02:00–05:30)

**SHOW:** The restaurant diagram slide. Left: a customer at a table labelled "You / Stocky". Middle: a waiter labelled "API". Right: a kitchen labelled "Odoo (or any system)".

**SAY:**
Let's start with a picture. Imagine you walk into a restaurant. You're hungry, you know what you want, but you don't walk into the kitchen. You don't open the fridge, you don't touch the chef's knives, and you definitely don't cook. Why? Because the kitchen isn't yours. It's busy, it's organised in its own way, and if every customer walked in, it would be chaos.

So instead, you talk to the waiter. You say, "One chicken burrito, please, not too spicy." The waiter takes your order to the kitchen, the kitchen prepares exactly that, and the waiter brings it back to your table.

That waiter is an API. API stands for Application Programming Interface, but you can forget that phrase right now. Just remember: an API is the waiter between you and somebody else's kitchen.

**ON-SCREEN TEXT:** API = the waiter. You never walk into the kitchen.

**SHOW:** Animate the labels. The kitchen becomes "Odoo". The customer becomes "Stocky".

**SAY:**
Now let's swap in BrightLeaf. The kitchen is Odoo, the ERP you set up in the last video. The customer is Stocky, the AI agent we're going to build. Stocky never logs into Odoo like Sarah does. It doesn't click menus. It sends an order to Odoo's waiter: "Please bring me the on-hand quantity for SKU BL-1005, the pallet jack wheels." And the waiter comes back with: "Eighteen sets."

Here's why companies love this. The kitchen stays safe. Odoo decides what the waiter is allowed to bring out. Sarah's customer list stays private, the accounting stays locked, and Stocky gets only what it needs.

**SHOW:** Add three labels to the diagram: "Request" on the arrow going in, "Response" on the arrow coming back, and "Menu" on a small card on the table.

**SAY:**
Three more words and you've got the whole vocabulary.

The order you give is called a **request**. What comes back to your table is the **response**. Simple.

And every restaurant has a menu. You can't order sushi in a pizza place. APIs are the same. Each API has a list of things it can do, and each item on that list has its own address. That address is called an **endpoint**. One endpoint might be "today's weather forecast". Another might be "latest exchange rates". Think of an endpoint as one dish on the menu.

**SHOW:** A web address split into three coloured parts:
`https://api.open-meteo.com` (blue) + `/v1/forecast` (green) + `?latitude=22.54&longitude=114.06...` (orange)

**SAY:**
This is what a real order looks like. Don't panic, we'll take it apart.

The blue part, api dot open-meteo dot com, is the restaurant's address. Which building are we walking into?

The green part, slash v1 slash forecast, is the endpoint. Which dish do we want? The forecast.

The orange part, everything after the question mark, is our order details. Latitude 22.54 and longitude 114.06, that's Shenzhen. Then which bits of the forecast we want: rainfall and wind. The question mark means "here come my order details", and each ampersand, that little "and" sign, means "and also". It's exactly like saying, "One chicken burrito, not too spicy, and extra guacamole."

> PRO TIP: Order details after the `?` are called **parameters**. When Stocky asks Odoo for "products below their reorder point", that "below the reorder point" bit is a parameter too.

---

## [ON CAMERA] Real-World Story: The Shenzhen Rainstorm (05:30–07:00)

**SAY:**
Let me tell you why Sarah cares about this.

Last September, BrightLeaf ordered sixty sets of pallet jack wheels, SKU BL-1005, from Global Lift Parts in Shenzhen. Thirty-eight dollars a set, a twenty-one day lead time, and Tom in the Columbus warehouse already had three pallet jacks limping around on worn-out wheels.

On a Tuesday, a big rainstorm hit southern China. The port slowed down for three days, the container missed its vessel, and the shipment arrived nine days late.

The painful part? The weather warning was public on Sunday. But Sarah found out the following Monday, from a supplier email that started, "Due to unforeseen circumstances." It wasn't unforeseen. It just wasn't seen, because nobody had time to check Shenzhen's weather every morning.

For nine days, Tom's team moved pallets with two jacks instead of five. Overtime, a late customer shipment, and an awkward call with Mr. Harrison.

Now picture this. Every morning, Stocky asks a weather API, "Any heavy rain near my suppliers this week?" On Sunday it sends Sarah one line: "Heavy rain expected in Shenzhen Tuesday to Thursday. Two open orders could be affected." A four-day head start. Same storm, totally different week. And that weather API is free. You're about to use it.

---

## [SCREEN RECORDING] Your First Live API Call: Weather in Shenzhen (07:00–11:00)

**SHOW:** A fresh Chrome tab. Click into the address bar. Paste the Open-Meteo URL.

**ON-SCREEN TEXT:** `https://api.open-meteo.com/v1/forecast?latitude=22.54&longitude=114.06&daily=precipitation_sum,wind_speed_10m_max&timezone=auto`

**SAY:**
Okay, this is the moment. I've opened a brand-new browser tab, the same browser you use for email. I'm pasting in the web address from the screen. You'll find it in your activity file too, so you don't have to type it.

Notice what we're NOT doing. We're not signing up. We're not downloading anything. Open-Meteo is a free weather service that lets anyone ask for a forecast. No key card needed. I press Enter.

**SHOW:** The JSON response appears. If in Chrome, tick **Pretty-print** at the top so it's laid out line by line.

**SAY:**
And there it is. The waiter is back at our table. This is a real response, from a real weather service, about the real city of Shenzhen, and it took less than a second.

I know what you're thinking. "This looks like computer gibberish." Give me sixty seconds. It's actually a shopping list.

**SHOW:** Zoom in on the top lines: `"latitude": 22.530754`, `"longitude": 114.08714`, `"timezone": "Asia/Shanghai"`.

**SAY:**
This format is called **JSON**. Say it like the name "Jason". And the easiest way to think about JSON is as a labelled shopping list. Every line has a label on the left, in quotes, then a colon, then the value on the right.

So here: label "latitude", value 22.53. Label "timezone", value "Asia/Shanghai". It's the same as a shopping list that says "Milk: 2 litres. Eggs: 12."

Notice the latitude came back as 22.53, not exactly the 22.54 we asked for. That's the weather service saying, "my nearest weather grid point is here." Close enough for a city.

**SHOW:** Highlight `"daily_units"`: `"precipitation_sum": "mm"`, `"wind_speed_10m_max": "km/h"`.

**SAY:**
Now this bit is really helpful. "Daily units." It tells us rainfall is measured in millimetres, and wind speed in kilometres per hour. A good API always tells you its units. Hold on to that idea, because in the next video, on databases, mixed-up units are going to be our enemy number one.

**SHOW:** Highlight the `"daily"` block. Three lists in square brackets: `time`, `precipitation_sum`, `wind_speed_10m_max`.

**SAY:**
Here's the actual forecast. Square brackets mean "a list of several items", like a column in Excel.

"Time" is a list of seven dates. On the day I tested this, it started with the 17th of November and went to the 23rd.

"Precipitation sum" is a list of seven rainfall numbers: 0.1, 0.4, 1.4, then zeros.

"Wind speed max" is seven wind numbers: 16.3, 19.3, 13.7, and so on.

The trick is to read them like columns that line up. The first date goes with the first rain number and the first wind number. So the 17th: 0.1 millimetres of rain, wind up to 16.3 kilometres an hour. The 19th: 1.4 millimetres. That's a light drizzle, nothing to worry about. If you saw 50 or 80 millimetres, that's a seriously wet day, and if the wind went above 60 or 70, you'd want to ask your supplier whether the port is running.

**ON-SCREEN TEXT:** Read JSON like columns: date 1 ↔ rain 1 ↔ wind 1

> PAUSE & THINK: Pause the video. Looking at your own screen, which day this week has the most rain in Shenzhen? Would you warn Sarah, yes or no?

**SHOW:** Click into the address bar. Change `latitude=22.54&longitude=114.06` to `latitude=25.20&longitude=55.27`. Press Enter.

**SAY:**
Now watch how easy it is to change the order. Gulf Lubricants, who supply our hydraulic oil, BL-1007, are in Dubai. Dubai is latitude 25.20, longitude 55.27. I change just those two numbers and press Enter.

New response. The timezone now says "Asia/Dubai", and the rainfall is mostly zeros. No surprise there. I changed the order details, and the waiter brought back a different dish. That is literally all Stocky does when it checks five supplier cities. Same request, five different sets of order details.

> PRO TIP: Find any city's latitude and longitude by searching "<city name> latitude longitude" on Google. Two decimal places is plenty.

---

## [SCREEN RECORDING] Second Live Call: The Currency Waiter (11:00–13:30)

**SHOW:** New tab. Paste the Frankfurter URL: `https://api.frankfurter.app/latest?from=USD&to=CNY,MXN,AED`. Press Enter.

**SAY:**
Let's try a second restaurant. This one is called Frankfurter, and it serves exchange rates. It's free and needs no key card either.

Read the order with me. The endpoint is "latest", meaning the latest rates. The order details: "from" equals USD, the US dollar, and "to" equals CNY, MXN and AED. Chinese yuan, Mexican peso and UAE dirham, the three foreign currencies BrightLeaf's suppliers bill in. Enter.

**SHOW:** Point to the address bar, which has changed to `api.frankfurter.dev/v1/latest?...`

**SAY:**
First, a little surprise. Look at the address bar. It changed by itself. We typed frankfurter dot app, and now it says frankfurter dot dev, slash v1. The restaurant moved to a new building and left a forwarding note on the old door. Your browser read the note and walked over automatically. APIs do move house sometimes, and good ones leave a forwarding address.

> PRO TIP: Save the new address so you skip the forwarding note: `https://api.frankfurter.dev/v1/latest?from=USD&to=CNY,MXN`. That's the one Stocky will use.

**SHOW:** Highlight the response: `{"amount":1.0,"base":"USD","date":"2026-11-17","rates":{"CNY":6.6661,"MXN":18.4639}}`

**SAY:**
Now the shopping list. "Amount": 1. "Base": USD. "Date": the 17th of November. Then "rates", with a smaller list inside it: CNY 6.67, MXN 18.46. A list inside a list, like a shopping list with a "Dairy" section that has its own items.

So on test day, one dollar bought 6.67 yuan and 18.46 pesos. Your numbers will be different, and that's the point. It's live.

Let's make that real for Sarah. Global Lift Parts bills in yuan. Sixty sets of pallet jack wheels at thirty-eight dollars is two thousand two hundred and eighty dollars, which at 6.67 is an invoice of about fifteen thousand two hundred yuan. Now say the yuan gets three percent stronger, and a dollar only buys about 6.47 yuan. That same yuan invoice now costs about two thousand three hundred and fifty dollars. Sixty-eight dollars more, without anyone changing the price. Same story for SafeHands gloves in pesos. Stocky can spot that the moment it happens.

**SHOW:** Circle the rates block. Point out that AED is missing.

**SAY:**
Now, did you notice something missing? We asked for three currencies. We got two. Where's the dirham?

Great lesson. Frankfurter gets its numbers from the European Central Bank, and that kitchen doesn't stock the dirham. The waiter didn't crash or argue. It just brought what the kitchen had.

Luckily the dirham is pegged to the dollar at about 3.67, so it barely moves. But the habit matters: always check that what came back matches what you asked for. We'll teach Stocky to notice missing items too.

**ON-SCREEN TEXT:** Always check: did I get everything I asked for?

---

## [ON CAMERA] Asking vs Submitting: GET and POST (13:30–15:00)

**SAY:**
So far, everything we've done is asking. "What's the weather?" "What's the rate?" Nothing in the world changed because we asked.

In API language, asking is called a **GET** request, as in "get me this". Every time you paste a web address into your browser, you're doing a GET. It's completely safe. Asking about today's specials never cooked anything.

But sometimes you want to submit something. You hand the waiter a filled-in order slip and say, "Make this, please." That's a **POST** request. A POST creates something new or changes something in the kitchen.

In BrightLeaf terms: "Stocky, how many boxes of BL-1002 do we have?" is a GET. "Stocky, create a purchase order for 1,820 boxes from PackRight Industries" is a POST. Something new now exists in Odoo. There are a couple of cousins for updating and deleting, but asking and submitting covers most of it.

Why should you care? A wrong GET wastes a second. A wrong POST could send a purchase order to a supplier. So here's our rule for this course: Stocky can GET freely, but important POSTs need Sarah's approval first. The manager's signature before the check goes out.

> PAUSE & THINK: Pause and decide: GET or POST? (1) Checking a supplier's lead time. (2) Updating the reorder point for BL-1004 to 700. (3) Sending a delivery reminder email to SafeHands Co. (4) Reading this week's sales orders.

**SAY:**
Answers: one is a GET, two is a POST-style change, three is a submit, so POST, and four is a GET. If you got three out of four, you're already thinking like an agent designer.

---

## [SCREEN RECORDING] Status Codes: The Receipts (15:00–18:00)

**SHOW:** A slide titled "Every response comes with a receipt", showing four receipt-style cards: 200, 401, 404, 429.

**SAY:**
Every time the waiter comes back, he also hands you a little receipt with a number on it. This number is called a **status code**, and it tells you how the order went, before you even look at the plate.

You don't need to memorise hundreds. Four will cover almost everything you'll meet.

**200**, OK. Your order went perfectly, here's your food. Both our calls today came back with a 200.

**401**, wrong key card. You tried to open a door your card doesn't open. The API is saying, "I don't know who you are." Usually it means your API key is missing, mistyped or cancelled.

**404**, wrong address. Not Found. You asked for a dish that isn't on the menu, or you walked to the wrong table. Nine times out of ten, it's a typo in the web address.

**429**, too many orders. You're ordering too fast. Free APIs often say, "Please slow down, you've asked me a thousand times this minute." The fix is simple. Wait and try again, or ask less often.

**ON-SCREEN TEXT:** 2xx = good news · 4xx = your mistake · 5xx = their kitchen's problem

**SAY:**
Here's a shortcut. Anything starting with a 2 is good news. Anything starting with a 4 means something was wrong with your order. Anything starting with a 5, like 500, means the kitchen itself had a problem, and it's not your fault. Wait a few minutes and try again.

Now let's break something on purpose. You can't break anything here, I promise.

**SHOW:** Go back to the Open-Meteo tab. In the address bar, change `forecast` to `forecst` (delete the "a"). Press Enter.

**SAY:**
I'm going to misspell "forecast". I'll take out the "a". Enter.

**SHOW:** The response: `{"reason":"Not Found","error":true}`

**SAY:**
Look at that. "Reason: Not Found. Error: true." That's our 404 receipt. We asked for a dish called "forecst", and there's no such dish on the menu. One missing letter. This is the single most common beginner error, and now you've seen it. You'll recognise it forever.

**SHOW:** Fix the spelling. Then change `daily=precipitation_sum,wind_speed_10m_max` to `daily=banana`. Press Enter.

**SAY:**
Let's fix that and try a different mistake. This time the dish is right, but I'll ask for a silly order detail. Instead of rainfall, I'll ask for "banana".

**SHOW:** The response: `{"reason":"Invalid value: Cannot initialize ForecastVariableDaily from invalid String value banana","error":true}`

**SAY:**
The restaurant exists, the dish exists, but the order doesn't make sense. The waiter says, "I can't give you a daily banana." That's a 400, "bad request", another 4-something, so it's on our side. And look how helpful it is. It tells us exactly which word it didn't understand. When something goes wrong, read the message. It usually tells you what to fix.

> PRO TIP: Curious to see the actual number? In Firefox, the JSON viewer has a **Headers** tab that shows the status code. In n8n, which we'll use soon, you'll see it clearly on every step. You never need to dig for it in Chrome.

**SHOW:** Put `precipitation_sum,wind_speed_10m_max` back. Press Enter. Clean forecast returns.

**SAY:**
And we're back to a 200. Everything fixed in two seconds.

> BEGINNER MISTAKE: Seeing an error and assuming "the API is broken". Ninety percent of the time it's a 4-something: a typo, a missing key or asking too fast. Check your address first.

---

## [SCREEN RECORDING] API Keys: Your Hotel Key Card (18:00–20:30)

**SHOW:** A slide: a hotel key card with the text "Room 412 · Gym · Pool. NOT the manager's office."

**SAY:**
The weather and currency APIs serve anyone. But Odoo holds BrightLeaf's stock, costs and customers. You don't want the whole world asking that waiter for things.

So private APIs ask for an **API key**, and an API key is like a hotel room key card. It opens your room, maybe the gym. Not other guests' rooms, not the manager's office. Lose it, and reception cancels it and gives you a new one. Your passport doesn't change. Just the card.

An API key works the same way. It opens only what it's allowed to, it belongs to a specific user, and it can be cancelled any time without changing your password.

**SHOW:** Switch to the Odoo tab. Open the **Settings** app. Scroll to the very bottom. Click **Activate the developer mode**.

**SAY:**
Let me show you where Odoo keeps these key cards. We won't create one today; we'll do that when we connect Stocky. I just want you to know where reception is.

In the BrightLeaf Odoo trial, I open the Settings app and scroll to the bottom. There's a link called "Activate the developer mode". Don't be put off by the name. It just shows a few extra options. Click it, and the page reloads.

**SHOW:** Click the avatar in the top-right corner. Click **My Profile** (called **Preferences** in some versions). Click the **Account Security** tab. Point at the **API Keys** section and the **New API Key** button. Do not click it.

**SAY:**
Now I click my profile picture in the top right corner, then "My Profile". In some versions it's called "Preferences". Then the tab called "Account Security".

And here it is. "API Keys", with a button called "New API Key". When we create one later, Odoo will show the key exactly once, a long string of letters and numbers, and we'll paste it straight into a safe place. Odoo never shows it again.

Notice something important. This key belongs to a user. When Stocky uses Sarah's key, Odoo treats Stocky like Sarah, with the same permissions. That's why, when we go live, we'll give Stocky its own user with only the access it needs. Its own key card, not the manager's master key.

**ON-SCREEN TEXT:** Key card rules: 1) never share it in email or chat 2) one key per tool 3) cancel it if in doubt

**SAY:**
Three key card rules. One: never paste a key into an email, a WhatsApp chat or a shared document. Two: give each tool its own key, so cancelling one doesn't break the others. Three: if a key might have leaked, delete it here and make a new one. Ten seconds, and nothing else breaks.

---

## [ON CAMERA] Common Beginner Mistakes (20:30–22:00)

**SAY:**
Let me save you some frustration. These are the four mistakes I see most when supply chain people meet APIs.

One: the invisible typo. A missing letter, a space in the address, a comma instead of an ampersand. One letter gave us a 404. When something fails, read the address slowly.

Two: forgetting the units. This API said millimetres. Another might say inches. If Stocky thinks 50 millimetres is 50 inches, it will panic about a drizzle. Always read the units line.

Three: trusting without checking. Remember the missing dirham? The API didn't complain, it just left it out. Check that what came back matches what you asked for.

Four: treating key cards casually. I've seen API keys pasted into team chats, saved in a file called "passwords final final", and shared with a contractor who left two years ago. Treat a key like the key to your warehouse.

And remember, people think APIs are only for IT. You've now used two, read the responses, and broken one on purpose. That's more API experience than most managers have. Well done.

---

## [ON CAMERA] Outro (22:00–24:00)

**SAY:**
Let's recap. Three key takeaways.

One. An API is a waiter. Stocky never walks into Odoo's kitchen. It places an order, called a request, at a specific dish on the menu, called an endpoint, with order details called parameters, and the waiter brings back a response.

Two. The response usually comes as JSON, which is just a labelled shopping list. Label on the left, value on the right, lists in square brackets that line up like Excel columns. And it comes with a receipt: 200 means OK, 401 means wrong key card, 404 means wrong address, 429 means too many orders.

Three. Asking is GET and is safe. Submitting is POST and changes things, so important POSTs need a human signature. Private systems like Odoo need an API key, which works like a hotel key card. It opens only certain doors, and it can be cancelled.

Now it's your turn. Open the Excel workbook called **V03 Activity, API Treasure Hunt**. You'll call three real APIs, weather, currency and a public holiday API for Mexico, and record what you find. Then you'll decode a stormy-week weather response into a table, match status codes to their meanings, and sort tasks into GET and POST. The last tab builds weather and currency links for your own company's suppliers automatically. About thirty minutes. Then take the ten-question quiz to lock it in.

Next up: Stocky can now ask questions. But where does it write down what it found, what it decided and why? In "Databases Without Fear: Your Data's Home", we turn Google Sheets into Stocky's memory, and we clean up a real messy BrightLeaf export together, merged cells, duplicates, "approx 300" and all. If you've ever cried over a VLOOKUP, you'll love it. See you there.
