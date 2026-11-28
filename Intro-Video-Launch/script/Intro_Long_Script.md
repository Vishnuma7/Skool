# Free Lesson: How AI Agents Connect to Your ERP (and Give You Back 12 Hours a Week)
**Course:** The ERP Agent Blueprint (free preview lesson) | **Length:** about 10 min | **Level:** Beginner
**Learning objectives:**
- Tell the difference between a chatbot, an automation and an AI agent
- Understand the "3 doors" an agent uses to reach business data: the ERP, an API and a database
- Spot 3–4 supply chain tasks an agent could take off your plate this month
- See a finished agent ("Stocky") check stock and draft a purchase order for approval

**Conversion goal:** the viewer finishes the video wanting to build Stocky and clicks the upgrade link. One action only: upgrade. It is asked twice, always in the same words, **"Upgrade to the Agentic SCM paid tier and build Stocky yourself"**: once straight after the demo (peak desire) and once at the very end. The ERP Agent Blueprint is the reason to upgrade; live sessions, templates and new courses only back it up. No price and no dates are spoken, so the video stays evergreen. There is no single upgrade link (each member's upgrade link is personal), so the video always sends people to the same place: **The ERP Agent Blueprint in the Classroom**, where they unlock it.

**Short teaser:** the ~1-minute teaser has its own script (Intro_Short_Script). Record its on-camera lines right after this video, in the same setup; its demo clips are reused from this recording.

**Before recording, prepare:**
- The finished Stocky workflow in n8n, already tested, with the chat window open
- Odoo demo database with BrightLeaf products loaded (4 products below their reorder point: BL-1002, BL-1004, BL-1005, BL-1007)
- Gmail inbox showing the Stocky approval email ready to arrive
- A browser tab with this Open-Meteo link ready: `https://api.open-meteo.com/v1/forecast?latitude=22.54&longitude=114.06&current=temperature_2m,precipitation`
- The Google Sheet "Stocky Decision Log" with 5 or 6 sample rows
- A "journey" slide with 4 milestones, and a "What's in the paid tier" slide (see the last screen section)
- In Skool, check that The ERP Agent Blueprint sits in the Classroom right next to this free lesson and is locked to the paid tier, and note the exact button name a free member sees on it (the script says "unlock")
- On the Stocky demo, zoom in on the chat reply, the Approve email and the Odoo draft: the short teaser reuses these clips in vertical 9:16

**Resources for this video:** Free_Activity_ERP_Time_Drain_Calculator.xlsx, Free_Activity_Agent_Opportunity_Worksheet.docx

---

## [ON CAMERA] Hook + Who I Am (00:00–01:15)

Meet Sarah. She's the Procurement and Inventory Manager at a distributor called BrightLeaf Supplies.

Every week, Sarah spends **twelve hours** copying numbers out of her ERP into Excel. Then into emails. Then into the Monday report for her director.

Twelve hours. That's a day and a half, every single week, spent being a human copy-paste machine.

Now picture this instead. It's Tuesday morning. Before Sarah even opens her laptop, her phone buzzes: *"Packing gloves will run out in 6 days. I've drafted an order with SafeHands Co. Approve?"* She taps yes. Done.

That's not science fiction. That's an AI agent connected to an ERP. And in about six minutes, you'll watch one do exactly that, live.

Quick intro. I'm Adithyan, co-founder of Agentic SCM. And I started Agentic SCM because I wanted supply chain professionals to move beyond just talking about AI... and actually build with it. Here, you learn how to create agents that connect to business systems, and take on practical tasks in Supply Chain.

I built this lesson because the question you voted for most in this community was: *how do I actually connect AI to my ERP?* So let's answer it.

Here's your one job while you watch: **count how many times this week you copied a number out of your ERP into Excel or an email.** Keep that number in your head. It's about to become very expensive.

## [ON CAMERA] Chatbot vs Automation vs AI Agent (01:15–02:15)

So what actually *is* an AI agent? People mix up three things.

A **chatbot** answers questions. You ask ChatGPT "what's a reorder point?" and it explains. But it can't see *your* stock.

An **automation** is a recipe card. Same steps, same order, every time. Great for fixed jobs. But it can't think. If something unusual happens, it follows the recipe anyway.

An **AI agent** is **a smart new intern**. It reads your reports, thinks about what they mean, uses tools like your ERP and email, and takes action. And like any new intern, it asks the manager before doing anything important.

The brain is a model like Claude or ChatGPT. The hands are the tools we connect it to. But an intern locked in an empty room is useless. The magic happens when you give it access to your data. Which brings us to the three doors.

## [SCREEN RECORDING] The 3 Doors: ERP, API, Database (02:15–03:30)

**SHOW:** A simple diagram: a robot "Stocky" in the middle, three doors around it labelled ERP, API, DATABASE.
**SAY:** Every agent that does real supply chain work walks through one of three doors.

**SHOW:** Odoo, Inventory > Products, the BrightLeaf product list with On Hand quantities.
**SAY:** Door one is your **ERP**: the company's central filing cabinet plus the rulebook. Stock levels, purchase orders, suppliers, it all lives here. This is Odoo, a free ERP we use in the course, but SAP, Oracle and NetSuite work the same way.

**SHOW:** The browser tab with the Open-Meteo link. The page shows a short block of text with temperature and precipitation for Shenzhen.
**SAY:** Door two is an **API**. An API is a waiter. You don't walk into the kitchen; you give your order, and the waiter brings back exactly what you asked for. I just asked a free weather service, "What's the weather in Shenzhen right now?", where two of BrightLeaf's suppliers are. No code. I opened a link.
**ON-SCREEN TEXT:** API = a waiter. You order, it brings back exactly what you asked for.

**SHOW:** The Google Sheet "Stocky Decision Log": columns Date, SKU, Action, Approved By.
**SAY:** Door three is a **database**: a super-organised Excel workbook. This is where the agent writes down everything it did, so there's always a paper trail. And for beginners, a Google Sheet works perfectly.

> PAUSE & THINK: Which door holds the data you copy most often: your ERP, an outside website, or a spreadsheet? Most people say the ERP.

## [ON CAMERA] What Those 12 Hours Are Really Costing (03:30–04:45)

Let's get practical. Here's where Sarah's twelve hours go, and what an agent does with each.

**The daily stock check.** Four hours a week of exporting and comparing in Excel. The agent does it every morning and messages her only what's running low. Close to zero.

**Drafting purchase orders.** Three hours a week. The agent drafts them; Sarah approves. Thirty minutes.

**Supplier risk.** Two hours a week checking news, weather and exchange rates for suppliers in Shenzhen and Dubai. The agent checks and warns her in plain English. Five minutes.

**The Monday report.** Three hours every Monday. Now it lands in her director's inbox automatically. Ten minutes to review.

Twelve hours down to under one. Now do the math with me. Twelve hours a week, at even thirty dollars an hour, is **over eighteen thousand dollars a year** of skilled time spent copy-pasting. In one role. At one company.

And Sarah still approves every order. The agent prepares the check; the manager signs it.

## [SCREEN RECORDING] Meet Stocky, Live (04:45–06:30)

**SHOW:** The n8n workflow canvas: a chat trigger, an AI Agent node, an Odoo node, a Gmail node, a Google Sheets node.
**SAY:** This is Stocky, BrightLeaf's inventory and procurement agent. Each box is one step, like a Lego block. No code anywhere. And this is the exact agent you build, step by step, in The ERP Agent Blueprint.

**SHOW:** Open the chat window. Type: "What's running low and who should I order from?" Press Enter.
**SAY:** Let me ask it the question Sarah asks every single morning.

**SHOW:** The Odoo node lights up green, then the AI Agent node. The reply appears: 4 products below reorder point (Corrugated Shipping Boxes, Industrial Safety Gloves, Pallet Jack Wheels, Hydraulic Oil), each with its supplier and a suggested quantity.
**SAY:** Watch. It went into Odoo, read the live stock, compared it with the reorder points, and answered in plain English. Four products are low. Safety gloves from SafeHands Co. in Monterrey, pallet jack wheels from Global Lift Parts in Shenzhen, and so on. It even suggests how many to order.

**SHOW:** Type: "Draft the PO for the gloves." Then switch to Gmail: an email "Stocky: approve PO for 780 pairs of Industrial Safety Gloves from SafeHands Co.?" with Approve / Reject buttons.
**SAY:** Now the important bit. It doesn't go and buy things. It drafts the purchase order and emails Sarah for approval. Nothing happens until she clicks Approve.

**SHOW:** Click Approve. Switch to Odoo, Purchase > Requests for Quotation: a new draft for SafeHands Co. Then the Google Sheet with a new row added.
**SAY:** One click. The draft is in Odoo, and the decision is logged. Thirty seconds. It used to take Sarah half her morning.

**SHOW:** Cut back to the full n8n canvas, all nodes green.
**SAY:** What you just watched is the finish line. The ERP Agent Blueprint is the route to it: I take you from an empty screen to this exact agent, one step at a time, with no code. You could try to piece it together from random videos for the next three months, or you can follow one clear path and have it working in a few weeks.
**SAY:** If you already know you want this: **upgrade to the Agentic SCM paid tier and build Stocky yourself.** It's in the Classroom, right next to this lesson: open The ERP Agent Blueprint and unlock it. If you're not sure yet, give me two more minutes and I'll show you the path.
**ON-SCREEN TEXT:** Upgrade to the Agentic SCM paid tier and build Stocky yourself → Classroom → The ERP Agent Blueprint

## [SCREEN RECORDING] Your Path From Zero to Stocky + What You Get (06:30–08:15)

**SHOW:** The "journey" slide. Four milestones appear one by one on a path, ending with Stocky.
**SAY:** Here's the change. Today, you copy numbers out of your ERP by hand. By the end of The ERP Agent Blueprint, you've built an agent that reads your stock, drafts purchase orders and waits for your approval. Here's the path, step by step.
**SAY:** In the **first three videos**, you have your own free ERP running, loaded with real products, and you've called a live API from your browser.
**SAY:** By **video 5**, you've set up your no-code toolkit and your AI brain, and built your first working workflow.
**SAY:** By **video 7**, your agent reads your ERP, answers "what's running low?", and drafts purchase orders, only with your approval.
**SAY:** And by **video 10**, it scores supplier risk with weather and currency data, logs every decision, writes the Monday report on its own, and you've taken it live, safely.
**ON-SCREEN TEXT:** Videos 1–3: your own ERP + live API · Video 5: your first workflow · Video 7: Stocky reads & drafts POs · Video 10: risk scores, reports, live

**SHOW:** The "What's in the paid tier" slide: The ERP Agent Blueprint large at the top; below it, smaller: Weekly Live, Support, Templates, New Courses.
**SAY:** The Blueprint is the main reason to upgrade. Every step is on screen, with an activity file to practise on, so you're never guessing what to click.
**SAY:** And you won't be building alone. When you get stuck, bring it to our **weekly live sessions**. Copy our **workflow templates** instead of starting from blank. And **every new course we release** comes with your membership. The ERP Agent Blueprint is the first. It's not the last.
**ON-SCREEN TEXT:** The ERP Agent Blueprint, plus: weekly live sessions · support · templates · every new course

## [ON CAMERA] Yes, You Can Build This (08:15–09:00)

If part of you is thinking, *"this looks great, but it's not for someone like me"*, this was built for exactly you.

The Blueprint was made for supply chain people, not programmers. If you can use Excel, you can build Stocky. Every technical word gets an everyday example, like the waiter and the filing cabinet. And you practise on a free ERP, so you can't break anything at work.

What you learn isn't tied to Odoo either. SAP, Oracle, NetSuite: an agent reaches them through the same three doors you saw today.

And it fits into a normal week: short videos, about four hours in total. Less time than Sarah used to lose in two days.

## [ON CAMERA] Outro + Your Next Step (09:00–10:15)

So, the number I asked you to keep in your head: **how many times did you copy a number out of your ERP this week?** Put it in the comments. I read every one.

Now picture next month. That number is close to zero, because you built the agent that does it for you. And you're the person at your company who knows how to do it.

That's what The ERP Agent Blueprint gets you. **Upgrade to the Agentic SCM paid tier and build Stocky yourself.** Open The ERP Agent Blueprint in the Classroom, right next to this lesson, and unlock it.

You've copied enough numbers. Now build the agent that does it for you. I'll see you inside.

---

## Video description / Skool post copy

**Title:** Sarah spends 12 hours a week copying ERP data. Here's how an AI agent gives that time back (free 10-min lesson)

You voted, and "Connecting AI agents with ERP systems, APIs and databases" won by a mile. So here's a free 10-minute lesson on exactly that.

In this video:
- Chatbot vs automation vs AI agent (the "smart intern" explained)
- The 3 doors every agent uses: your ERP, APIs and databases
- What 12 hours a week of copy-paste really costs (spoiler: over $18,000 a year)
- A live demo of "Stocky", an agent that checks stock in Odoo and drafts a purchase order for your approval

**Upgrade to the Agentic SCM paid tier and build Stocky yourself:** open **The ERP Agent Blueprint** in the Classroom and unlock it.
The ERP Agent Blueprint takes you from copying ERP numbers by hand to your own agent that reads stock, drafts purchase orders and waits for your approval. Step by step, no code, and it works with whatever ERP you use at work. Your membership also includes weekly live sessions, support, workflow templates, and every new course we release. Cancel anytime.

**Free tools (optional):** the **ERP Time Drain Calculator** shows what copy-pasting costs you each year, and the **Find Your First AI Agent** worksheet helps you pick your first agent. Both are attached.
