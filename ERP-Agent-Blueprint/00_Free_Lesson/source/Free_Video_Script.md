# Free Lesson: How AI Agents Connect to Your ERP (and Give You Back 12 Hours a Week)
**Course:** The ERP Agent Blueprint (free preview lesson) | **Length:** 10 min | **Level:** Beginner
**Learning objectives:**
- Tell the difference between a chatbot, an automation and an AI agent
- Understand the "3 doors" an agent uses to reach business data: the ERP, an API and a database
- Spot 3–4 supply chain tasks an agent could take off your plate this month
- See a finished agent ("Stocky") check stock and draft a purchase order for approval

**Before recording, prepare:**
- The finished Stocky workflow in n8n, already tested, with the chat window open
- Odoo demo database with BrightLeaf products loaded (4 products below their reorder point: BL-1002, BL-1004, BL-1005, BL-1007)
- Gmail inbox showing the Stocky approval email ready to arrive
- A browser tab with this Open-Meteo link ready: `https://api.open-meteo.com/v1/forecast?latitude=22.54&longitude=114.06&current=temperature_2m,precipitation`
- The Google Sheet "Stocky Decision Log" with 5 or 6 sample rows
- A simple course-tour slide (10 video titles) or the Skool classroom page for the paid course

**Resources for this video:** Free_Activity_ERP_Time_Drain_Calculator.xlsx, Free_Activity_Agent_Opportunity_Worksheet.docx

---

## [ON CAMERA] Hook + Your Question for This Video (00:00–01:00)

Meet Sarah. She's the Procurement and Inventory Manager at a distributor called BrightLeaf Supplies.

Every week, Sarah spends **twelve hours** copying numbers out of her ERP into Excel. Then into emails. Then into the Monday report for her director.

Twelve hours. That's a day and a half, every single week, spent being a human copy-paste machine.

Now picture this instead. It's Tuesday morning. Before Sarah even opens her laptop, her phone buzzes: *"Packing gloves will run out in 6 days. I've drafted an order with SafeHands Co. Approve?"* She taps yes. Done.

That's not science fiction. That's an AI agent connected to an ERP. And by the end of these ten minutes, you'll see one do exactly that.

But first, a question to think about while you watch. **Count how many times this week you copied a number out of your ERP into Excel or an email.** Just a rough number. Keep it in your head. I'll ask you for it at the end.

## [ON CAMERA] Chatbot vs Automation vs AI Agent (01:00–02:15)

So what actually *is* an AI agent? People mix up three things, so let's clear it up.

A **chatbot** answers questions. You ask ChatGPT "what's a reorder point?" and it explains. Helpful. But it can't see *your* stock.

An **automation** is a recipe card. Step one, step two, step three, the same way every time. Great for boring, fixed jobs. But it can't think. If something unusual happens, it just follows the recipe anyway.

An **AI agent** is different. Think of it as **a smart new intern**. The intern can read your reports, think about what they mean, use tools like the ERP or email, and take action. But, like any new intern, it needs clear instructions and a manager to sign off on anything important.

The brain inside that intern is a model like Claude or ChatGPT. The hands are the tools we connect it to.

And here's the thing: an intern locked in an empty room is useless. The magic only happens when you give it access to your data. Which brings us to the three doors.

## [SCREEN RECORDING] The 3 Doors: ERP, API, Database (02:15–03:45)

**SHOW:** A simple diagram: a robot "Stocky" in the middle, three doors around it labelled ERP, API, DATABASE.
**SAY:** Every agent that does real supply chain work walks through one of three doors.

**SHOW:** Odoo, Inventory > Products, the BrightLeaf product list with On Hand quantities.
**SAY:** Door number one is your **ERP**. Think of it as the company's central filing cabinet plus the rulebook. Stock levels, purchase orders, suppliers: it all lives here. This is Odoo, a free ERP we use in the course, but SAP, Oracle and NetSuite are the same idea.

**SHOW:** The browser tab with the Open-Meteo link. The page shows a short block of text with temperature and precipitation for Shenzhen.
**SAY:** Door number two is an **API**. An API is like a waiter in a restaurant. You don't walk into the kitchen. You give your order to the waiter, and the waiter brings back exactly what you asked for. Here, I just asked a free weather service, "What's the weather in Shenzhen right now?" That's where two of BrightLeaf's suppliers are. No code. I just opened a link.
**ON-SCREEN TEXT:** API = a waiter. You order, it brings back exactly what you asked for.

**SHOW:** The Google Sheet "Stocky Decision Log": columns Date, SKU, Action, Approved By.
**SAY:** Door number three is a **database**. Think of it as a super-organised Excel workbook. Tables are sheets, rows are records, columns are fields. This is where the agent writes down what it did, so there's always a paper trail. And yes, for beginners, a Google Sheet works perfectly as your first database.

> PAUSE & THINK: Pause the video. Which of the three doors holds the data you copy most often: your ERP, an outside website or service, or a spreadsheet? Most people say the ERP. Let's see if that's you.

## [ON CAMERA] 4 Agent Jobs That Give Sarah Her Week Back (03:45–05:00)

Let's get practical. Remember Sarah's twelve hours? Here's where they go, and what an agent does with them.

**One: the daily stock check.** Before: Sarah exports stock from the ERP and compares it to reorder points in Excel. About four hours a week. After: the agent checks every morning and messages her only what's running low. Close to zero.

**Two: drafting purchase orders.** Before: three hours a week typing up orders. After: the agent drafts them, Sarah reviews and approves. Thirty minutes.

**Three: supplier risk.** Before: two hours a week checking news, weather and exchange rates for suppliers in Shenzhen and Dubai. After: the agent checks those outside sources and warns her in plain English. Five minutes.

**Four: the Monday report for Mr. Harrison, her director.** Before: three hours every Monday morning. After: it lands in his inbox automatically. Ten minutes to review.

Twelve hours down to under one. And notice: Sarah still approves every order. The agent prepares the check; the manager signs it.

## [SCREEN RECORDING] Sneak Peek: Meet Stocky (05:00–06:30)

**SHOW:** The n8n workflow canvas: a chat trigger, an AI Agent node, an Odoo node, a Gmail node, a Google Sheets node.
**SAY:** This is Stocky, BrightLeaf's inventory and procurement agent. It's the exact agent you build in the paid course. Each box is one step, like a Lego block. No code anywhere.

**SHOW:** Open the chat window. Type: "What's running low and who should I order from?" Press Enter.
**SAY:** Let me ask it the question Sarah asks every single morning.

**SHOW:** The Odoo node lights up green, then the AI Agent node. The reply appears: 4 products below reorder point (Corrugated Shipping Boxes, Industrial Safety Gloves, Pallet Jack Wheels, Hydraulic Oil), each with its supplier and a suggested quantity.
**SAY:** Watch. It went into Odoo, read the live stock, compared it with the reorder points, and came back in plain English. Four products are low. Safety gloves from SafeHands Co. in Monterrey, Mexico, pallet jack wheels from Global Lift Parts in Shenzhen, and so on. It even suggests how many to order.

**SHOW:** Type: "Draft the PO for the gloves." Then switch to Gmail: an email "Stocky: approve PO for 780 pairs of Industrial Safety Gloves from SafeHands Co.?" with Approve / Reject buttons.
**SAY:** Now the important bit. It doesn't just go and buy things. It drafts the purchase order and sends Sarah an email asking for approval. Nothing happens until she clicks Approve.

**SHOW:** Click Approve. Switch to Odoo, Purchase > Requests for Quotation: a new draft for SafeHands Co. Then the Google Sheet with a new row added.
**SAY:** One click, and the draft is in Odoo, and the decision is logged in the database. That whole thing took about thirty seconds. It used to take Sarah half her morning.
**ON-SCREEN TEXT:** You build this in The ERP Agent Blueprint. No code.

> PAUSE & THINK: If you had Stocky at your company tomorrow, what is the FIRST question you would ask it? Type it in the comments below this video.

## [SCREEN RECORDING] What's Inside The ERP Agent Blueprint (06:30–08:15)

**SHOW:** The course title slide: "The ERP Agent Blueprint: 10 videos, 4 hours, no code".
**SAY:** So, how do you go from where you are today to building Stocky yourself? That's exactly what The ERP Agent Blueprint is. Ten videos, about four hours, step by step. Here's the path.

**SHOW:** The 10 titles appear one by one as each is mentioned.
**SAY:**
Video 1, **Why Your ERP Needs an AI Agent**: you'll see the full Stocky demo and map your journey.
Video 2, **ERP Demystified**: you set up your own free Odoo and load BrightLeaf's products.
Video 3, **APIs Explained Like You're Ordering at a Restaurant**: you call a live API from your browser in minutes.
Video 4, **Databases Without Fear**: you turn a messy spreadsheet into a clean home for your agent's data.
Video 5, **Your No-Code Toolkit**: you set up n8n and your AI brain, and build your first workflow.
Video 6, **Your First Agent**: Stocky reads the ERP and answers "What's running low?"
Video 7, **Agents That Take Action**: Stocky drafts purchase orders, but only with your approval.
Video 8, **Seeing Beyond the ERP**: weather, currency and holiday data become a supplier risk score.
Video 9, **Memory and Reports**: Stocky logs every decision and sends the Monday report on its own.
Video 10, **Going Live Safely**: security, testing, costs, and your capstone project.

**SHOW:** A slide with three icons: Quiz, Activity file, Guide.
**SAY:** Every video comes with a short quiz to lock in what you learned, a hands-on activity file in Excel or Word, and step-by-step guides. And every tool we use has a free tier or free trial.
**ON-SCREEN TEXT:** 10 videos · 10 quizzes · hands-on activity files · step-by-step guides · zero code

## [ON CAMERA] "But I'm Not Technical..." (08:15–09:00)

Now, you might be thinking a few things. Let me answer them.

"I don't have a tech background." Good. This course was built for you. If you can use Excel, you can do this. Every technical word gets an everyday analogy, just like the waiter and the filing cabinet.

"I don't have time." It's four hours, split into short videos. That's less than what Sarah used to lose every two days.

"My company uses SAP, not Odoo." The ideas transfer completely. Filing cabinet, waiter, workbook: every ERP works the same way. Odoo is just the free practice kitchen where you can't break anything.

## [ON CAMERA] Outro + Your Next Step (09:00–10:00)

So, remember the question from the start? **How many times this week did you copy a number out of your ERP into Excel or an email?** Drop that number in the comments. I read every one.

Three things to take away. One: an AI agent is a smart intern that can read, think and act. Two: it reaches your data through three doors: the ERP, APIs and databases. Three: you stay in charge, because the agent asks before it acts.

Your free homework: download the **ERP Time Drain Calculator** and the **Find Your First AI Agent** worksheet below this video. In fifteen minutes you'll know what your copy-pasting costs you each year. Post your number and your agent's one-line job description in the community.

Want to build Stocky? Upgrade to the Agentic SCM paid tier for just **$49**. It unlocks The ERP Agent Blueprint and all the other paid content in the community. Only **$49**. The link is right here: **[LINK]**.

See you inside. Let's give you your week back.

---

## Video description / Skool post copy

**Title:** Sarah spends 12 hours a week copying ERP data. Here's how an AI agent gives that time back (free 10-min lesson)

You voted, and "Connecting AI agents with ERP systems, APIs and databases" won by a mile. So here's a free 10-minute lesson on exactly that.

In this video:
- Chatbot vs automation vs AI agent (the "smart intern" explained)
- The 3 doors every agent uses: your ERP, APIs and databases
- 4 supply chain jobs an agent can take off your plate, with real before/after hours
- A sneak peek at "Stocky", an agent that checks stock in Odoo and drafts a purchase order for your approval

**Your free homework (15 minutes):**
1. Download the **ERP Time Drain Calculator** (attached) and see what copy-pasting costs you each year.
2. Fill in the **Find Your First AI Agent** worksheet.
3. Comment below with: (a) how many times you copied ERP numbers this week, and (b) your agent's one-sentence job description.

**Want to build Stocky yourself?** The ERP Agent Blueprint walks you through it step by step: 10 videos, 4 hours, quizzes, activity files and guides. No coding. Works with whatever ERP you use at work. Upgrade to the Agentic SCM paid tier for **just $49** to unlock it, plus all the other paid content in the community: **[LINK]**
