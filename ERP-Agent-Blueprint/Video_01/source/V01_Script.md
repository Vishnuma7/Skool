# Video 1: Welcome: Why Your ERP Needs an AI Agent
**Course:** The ERP Agent Blueprint | **Length:** 20 min | **Level:** Beginner

**Learning objectives:**
- Explain the difference between a chatbot, a simple automation and an AI agent, using everyday supply chain examples
- Recognise the five parts every AI agent has: brain, instructions, tools, memory and a human supervisor
- See the finished "Stocky" agent working on BrightLeaf's Odoo data, so you know exactly what you are building
- Understand the 10-video roadmap and the free tools you will use
- Spot which of your own weekly tasks are good candidates for an agent

**Before recording, prepare:**
- The finished Stocky workflow open in n8n (canvas zoomed to fit, all nodes visible, last run successful)
- The BrightLeaf Odoo database open on **Inventory > Products > Products** (list view), with starting stock loaded so four products are below their reorder point: BL-1002 (1,180), BL-1004 (420), BL-1005 (18), BL-1007 (31)
- Gmail open on Priya's inbox with Stocky's Monday 7:00 AM email already received (subject: "Stocky: Monday Stock Check - 4 items need attention")
- Google Sheet "Stocky_Decision_Log" open in a tab with last week's rows
- claude.ai open in a fresh chat (no project, no files attached)
- Slide/graphic: "Chatbot vs Automation vs Agent" comparison table, and the "5 parts of an agent" diagram
- Slide/graphic: the course map (10 videos as a road with milestones)

**Resources for this video:** V01_Activity_Agent_or_Not.xlsx, V01_Quiz.docx

---

## [ON CAMERA] Intro (00:00–02:15)

**SAY:**
Let me start with a number. Five hundred and seventy-six.

That's how many hours a year one procurement manager I'll introduce you to spends copying numbers out of her ERP, pasting them into Excel, chasing suppliers on email and building the same Monday stock report, week after week. Twelve hours a week, forty-eight working weeks a year. That's more than fourteen full working weeks. Three and a half months of a smart, experienced professional's year, spent being a human copy-paste machine.

Her name is Priya Sharma. She runs procurement and inventory at a company called BrightLeaf Supplies, a distributor of industrial and packaging supplies with a warehouse in Pune. Priya isn't real, but I promise you've met her. Maybe you are her.

Here's what this course is about. By the end of these ten videos, you will have built a working AI agent that reads your ERP, checks outside data like weather and exchange rates, writes its decisions into a database and sends you an alert. And you'll do it without writing a single line of code.

We're going to call that agent "Stocky". In about two minutes, I'm going to show you the finished Stocky running on real ERP data, so you know exactly where we're heading.

In this first video you'll learn three things. First, what an AI agent actually is, and why it's different from a chatbot like ChatGPT and different from the simple automations you might already have. Second, the five parts every agent is made of. And third, the roadmap for this whole course.

Now, if words like "API" or "workflow" make you a little nervous, good. This course was built for you. You don't need to be technical. You need to know your business, and you already do. Every time I use a technical word, I'll explain it with something from everyday life first. Deal?

Let's go and meet Stocky.

---

## [SCREEN RECORDING] Meet Stocky: The Finished Agent in Action (02:15–06:30)

**SHOW:** Gmail inbox. Highlight the unread email from Stocky, received Monday 7:00 AM. Subject: "Stocky: Monday Stock Check - 4 items need attention".

**SAY:**
It's Monday, seven in the morning. Priya hasn't even had her coffee yet, and there's already an email waiting for her. It's from Stocky. Let's open it.

**SHOW:** Open the email. The body reads:
"Good morning Priya. I checked all 10 active products in Odoo at 6:55 AM. 4 are below their reorder point:
1. BL-1002 Corrugated Shipping Box 18x12x10: 1,180 on hand, reorder point 1,500. Suggest 1,820 boxes from PackRight Industries (Mumbai). Est. USD 1,547.
2. BL-1004 Industrial Safety Gloves: 420 pairs on hand, reorder point 600. Suggest 780 pairs from SafeHands Co. (Chennai). Est. USD 1,872.
3. BL-1005 Pallet Jack Wheels: 18 on hand, reorder point 25. Suggest 32 sets from Global Lift Parts (Shenzhen). Est. USD 1,216. RISK: heavy rain forecast in Shenzhen this week and a public holiday in China next week. Lead time is already 21 days. Recommend ordering today.
4. BL-1007 Hydraulic Oil 20L: 31 drums on hand, reorder point 40. Suggest 49 drums from Gulf Lubricants (Dubai). Est. USD 2,646.
Total suggested spend: USD 7,281. Draft RFQs are ready in Odoo. [Approve] [Decline]"

**ON-SCREEN TEXT:** Stocky checked 10 products, found 4 problems, and drafted 4 orders. Before 7:00 AM.

**SAY:**
This is the whole course in one email.

Stocky looked inside BrightLeaf's ERP and checked all ten products. It found four that have dropped below their reorder point. For each one, it tells Priya how many are on hand, what the reorder point is, who the supplier is, how much to order and roughly what it costs.

But look at number three, the pallet jack wheels. Stocky didn't just say "you're low". It noticed that the supplier is in Shenzhen, it checked the weather there and saw heavy rain coming, it checked the calendar and saw a public holiday in China next week, and it knows the lead time is already twenty-one days. So it says: order this one today. That's not a report. That's a colleague giving you advice.

And at the bottom, two buttons. Approve. Decline. Stocky has prepared the purchase requests, but it will not send anything until Priya says yes. Hold on to that idea. It's important, and we'll come back to it.

**SHOW:** Switch to the n8n tab. The full Stocky workflow on the canvas: Schedule Trigger > Odoo (Get Many products) > AI Agent (with Anthropic Chat Model attached) > HTTP Request nodes (Open-Meteo, Frankfurter, Nager.Date) > Google Sheets (Append Row) > Gmail (Send and Wait for Response) > Odoo (Create RFQ).

**SAY:**
So how did that happen? This is what's behind the curtain. It's a tool called n8n, and every box you see is one step. There's no code here. You build this by dragging boxes onto the screen and filling in forms.

Left to right: a timer that says "every Monday at six fifty-five AM, start". Then a box that pulls stock levels from the ERP, which for BrightLeaf is a system called Odoo. The big box in the middle is the agent, the part that thinks. These three check the weather, exchange rates and public holidays. This one writes every decision into a Google Sheet. And the last one emails Priya and waits for her click.

**SHOW:** Click the Google Sheets tab, "Stocky_Decision_Log". Rows show Date, SKU, On Hand, Reorder Point, Action Suggested, Risk Notes, Approved By, Approved At.

**SAY:**
Here's that record. Every Monday, every product Stocky flagged, what it suggested and who approved it. When Mr. Kapoor, BrightLeaf's operations director, asks "why did we order those wheels early?", Priya doesn't have to remember. It's written down.

**SHOW:** Back to Gmail. Click "Approve". Switch to Odoo: **Purchase > Orders > Requests for Quotation**. Four new RFQs appear in status "RFQ", one per supplier.

**SAY:**
Now watch. Priya clicks Approve. And over in Odoo, under Purchase, Requests for Quotation, there they are. Four draft requests, one for each supplier, already filled in with the right products and quantities.

What used to take Priya most of her Monday morning took ninety seconds. And here's the part I want you to hear: you are going to build this. Not watch me build it. You. One piece per video. By video nine, your Stocky sends this exact email.

---

## [ON CAMERA] Real-World Story: Priya's Monday Morning (06:30–08:00)

**SAY:**
Let me tell you what Priya's Monday looked like before Stocky.

She gets in at eight thirty. She opens Odoo, goes to the inventory report, exports it to Excel. She opens last week's spreadsheet, copies the new numbers across, and fixes the formulas that broke because someone added a column. She highlights everything below the reorder point in red. Then she emails three suppliers to ask about lead times, because last month PackRight was late.

By eleven, she's ready to send Mr. Kapoor his report. And then Ravi, the warehouse lead, walks in and says, "Priya, we're out of stretch wrap. The Dubai order can't ship."

How? The stretch wrap was on the report. It was red. But it was row forty-one of a sixty-row spreadsheet, and she was looking at the bolts.

That's the real problem. It's not that Priya isn't good at her job. She's excellent. It's that the job asks her to be a copy machine, a calculator and an analyst at the same time, and humans are only good at one of those.

An agent takes the copy machine and the calculator off her desk, so she can spend her brain on the analyst part. That's the trade we're making in this course.

---

## [SCREEN RECORDING] Chatbot vs Automation vs Agent (08:00–12:00)

**SHOW:** Graphic: three columns titled "Chatbot", "Automation", "AI Agent". Leave the rows empty for now.

**SAY:**
Okay. Three words get thrown around like they mean the same thing: chatbot, automation and agent. They don't. Let me show you the difference with a real test.

**SHOW:** Switch to claude.ai, fresh chat. Type: "How many Steel Hex Bolts M10 do we have in stock at BrightLeaf right now, and should I reorder?" Press Enter. Claude replies that it doesn't have access to BrightLeaf's inventory system and asks for the numbers.

**SAY:**
First, a chatbot. This is Claude, one of the AI assistants we'll use in this course. ChatGPT works the same way. I'll ask it: how many steel hex bolts do we have in stock at BrightLeaf right now, and should I reorder?

And look at the answer. It's polite, it's smart, and it says: I don't have access to your inventory system, please share your stock level and reorder point.

That's a chatbot. A brilliant brain, sitting in a room with no windows and no doors. It can only think about what you type into it. It can't open Odoo. It can't send an email. It talks. That's all.

**ON-SCREEN TEXT:** Chatbot = a brain that talks. No access to your systems. Can't act.

**SHOW:** Switch to n8n. Open a simple saved workflow named "Old-style alert": Schedule Trigger > Odoo > IF node (condition: Quantity On Hand is smaller than Reorder Point) > Gmail. Click the IF node to show the condition.

**SAY:**
Second, automation. A workflow, or automation, is like a recipe card. Step one, step two, step three, always in the same order.

This little one says: every morning, read the stock from Odoo. Then this box, called an IF, checks one rule. Is the quantity on hand smaller than the reorder point? If yes, send an email. If no, do nothing.

Useful, and lots of companies have one. But it follows the rule exactly, even when the rule is wrong. If the pallet jack wheels are at twenty-six, one above the reorder point of twenty-five, it stays quiet, even though the supplier is in Shenzhen, it's raining and there's a holiday coming. It can't think "hmm, this one is risky". It doesn't know what "risky" means. It only knows the recipe.

**ON-SCREEN TEXT:** Automation = a recipe card. Same steps, every time. Fast and reliable, but no judgement.

**SHOW:** Switch back to the full Stocky workflow. Double-click the AI Agent node. Show the "System Message" field: "You are Stocky, BrightLeaf Supplies' inventory and procurement assistant. Check every product against its reorder point. For suppliers outside India, consider weather, currency and holidays. Never send a purchase order without Priya's approval. Explain your reasoning in plain English." Then show the Tools attached underneath: Odoo, Weather, Currency, Holidays, Google Sheets.

**SAY:**
And third, the agent. Let's open Stocky's brain.

The best way to think about an AI agent is a smart new intern. A good intern can read, think, use the tools you give them and take action. But they need clear instructions, and they need supervision, especially in their first few weeks.

Here are Stocky's instructions. In plain English. "You are Stocky, BrightLeaf Supplies' inventory and procurement assistant. Check every product against its reorder point. For suppliers outside India, consider weather, currency and holidays. Never send a purchase order without Priya's approval. Explain your reasoning in plain English."

And underneath, the tools it's allowed to use. It can look things up in Odoo. It can check the weather. It can check exchange rates and holidays. It can write to the log.

So the difference is this. The automation follows a fixed recipe. The agent gets a goal, a set of tools and some rules, and it decides which tools to use and in what order to reach the goal. That's why it could spot the risk on the pallet jack wheels. Nobody wrote a rule saying "if Shenzhen plus rain plus holiday, then warn". It worked that out.

**SHOW:** Back to the three-column graphic, now filled in: Chatbot: talks / no access / you do the work. Automation: follows fixed steps / reads and writes / no judgement. AI Agent: reasons toward a goal / uses tools / acts with approval.

**SAY:**
Here's the summary. A chatbot talks. An automation follows. An agent reasons and acts.

And one honest note. Agents are not always the right answer. If a task is the same every single time, with a clear rule, a plain automation is cheaper, faster and more predictable. Use an agent when the task needs a bit of judgement: reading messy information, weighing up several factors, explaining a decision. We'll practise telling them apart in your activity.

> PRO TIP: Most good agents are mostly automation with a small amount of AI judgement in the middle. Stocky's timer, ERP lookup and email are plain recipe steps. Only the "think about the risk" part needs the AI brain.

---

## [ON CAMERA] Pause & Think: Agent or Not? (12:00–13:45)

**SAY:**
Let's test that right now. I'll give you three tasks from BrightLeaf. For each one, decide: is this a job for a chatbot, a simple automation, or an agent?

> PAUSE & THINK: (1) Every night, copy yesterday's sales orders from Odoo into a Google Sheet. (2) Read 40 supplier emails and work out which shipments are delayed and what that means for next week's stock. (3) Help Priya rewrite a polite but firm email to a late supplier.

**SAY:**
Pause the video and decide. I'll wait.

Okay. Number one, copying sales orders every night. Same thing every time, clear rule, no judgement. That's an automation. Using an agent here would be like hiring an intern to photocopy the same page every day. It works, but it's a waste.

Number two, reading forty supplier emails and working out what's delayed. Every email is written differently. Some say "delayed", some say "we're facing challenges", some just attach a new date. Then you need to connect that to stock levels. That needs reading, judgement and tools. That's an agent.

Number three, rewriting an email. You're right there, you'll read it before sending, and it doesn't need any company data. That's a chatbot. Just open Claude or ChatGPT and ask.

If you got all three, brilliant. If you didn't, that's completely normal. This is a new way of thinking, and your activity has twenty more of these to practise on.

---

## [SCREEN RECORDING] The Five Parts of Every Agent (13:45–16:00)

**SHOW:** Diagram: a friendly intern figure in the centre labelled "Stocky". Five labelled arrows: 1 Brain (LLM), 2 Instructions, 3 Tools, 4 Memory, 5 Human Supervisor.

**SAY:**
Every agent you'll ever build, including Stocky, has the same five parts. Let's go through them using our intern.

Part one: the brain. That's the AI model, things like Claude or ChatGPT. You'll hear people call this an "LLM". It just means the type of AI that reads and writes language. Think of it as the intern's brain. It reads, it reasons, it writes. On its own, as we saw, it's stuck in a room with no doors.

**SHOW:** Highlight "2 Instructions". Show the System Message text from the AI Agent node again, enlarged.

**SAY:**
Part two: the instructions. This is the briefing you give the intern on day one. Who you are, what your job is, what you must never do. The clearer this is, the better the agent behaves. Vague instructions give you a vague intern.

**SHOW:** Highlight "3 Tools". Show icons: Odoo, weather cloud, currency symbol, calendar, Google Sheets, Gmail.

**SAY:**
Part three: the tools. These are the doors we open for the intern. Odoo, so it can read stock. A weather service. An exchange rate service. A holiday calendar. Email. The agent can only use the tools you give it. If you don't give it access to purchase orders, it simply can't create one. That's how you keep it safe.

**SHOW:** Highlight "4 Memory". Show the Stocky_Decision_Log Google Sheet.

**SAY:**
Part four: memory. Out of the box, an AI brain forgets everything the moment a conversation ends. So we give Stocky a notebook, which for us is this Google Sheet. It writes down what it decided and why. Next week, it can look back and say, "I flagged the pallet jack wheels last week too. This is becoming a pattern."

**SHOW:** Highlight "5 Human Supervisor". Show the Approve / Decline buttons from the email.

**SAY:**
And part five, the one people forget: the human supervisor. That's you. In this course, Stocky never spends BrightLeaf's money without a human click. It's like the manager's signature before the cheque goes out. The agent prepares, the human approves.

> BEGINNER MISTAKE: Giving an agent full power on day one. Start with "read and suggest". Only add "draft" once you trust it, and keep "send" behind a human approval button.

**ON-SCREEN TEXT:** Brain + Instructions + Tools + Memory + Human = an agent you can trust.

---

## [SCREEN RECORDING] Your Course Map and Toolkit (16:00–18:00)

**SHOW:** Course map graphic: a road with 10 milestones. Highlight each one as you mention it.

**SAY:**
Here's the road we'll travel together, one piece of Stocky at a time.

In video two, we'll tour an ERP and set up your own free copy of Odoo, loaded with BrightLeaf's ten products. Video three explains APIs, the way software talks to software, using a restaurant. Video four makes databases friendly, using something you already know: Excel. In video five, we set up your no-code toolkit.

Then the building starts. Video six: Stocky reads the ERP and answers "what's running low?". Video seven: Stocky drafts purchase orders, but only with your approval. Video eight: Stocky looks beyond the ERP at weather, currency and holidays. Video nine: memory and Mr. Kapoor's Monday report. And video ten: going live safely, plus your capstone, where you build a Stocky for your own company.

**SHOW:** Toolkit slide with logos: Odoo, n8n, Claude / ChatGPT, Google Sheets, Gmail, and the three free outside APIs (Open-Meteo, Frankfurter, Nager.Date).

**SAY:**
And here's your toolkit. Odoo is our ERP. It's free to try and runs in your browser. n8n is where we build the recipe. Claude or ChatGPT is the brain. Google Sheets is the memory. Gmail sends the alerts. Every tool here has a free tier or a free trial. You won't need to install anything on your computer.

Does your company use SAP, Oracle, Microsoft Dynamics or NetSuite instead of Odoo? No problem. The ideas are identical. We use Odoo because it's free and you can't break anything in a test system. Once you understand how Stocky talks to Odoo, you'll know exactly what questions to ask your IT team about your own ERP.

---

## [ON CAMERA] Outro (18:00–20:00)

**SAY:**
Let's wrap up with the three things I want you to remember from this video.

One. A chatbot talks, an automation follows and an agent reasons and acts. Use each one for the right job.

Two. Every agent has five parts: a brain, instructions, tools, memory and a human supervisor. If any one of them is missing, you don't have an agent you can trust.

Three. The goal is not to replace Priya. It's to give her back those five hundred and seventy-six hours a year, so she can do the thinking that only she can do.

Now it's your turn. Download the activity file called "V01 Activity Agent or Not". It's an Excel workbook with two parts. In the first part, you'll sort twenty real supply chain tasks into chatbot, automation, agent or "not worth automating", and the sheet will check your answers for you. In the second part, the Automation Wishlist, you'll list the repetitive tasks from your own week, and the workbook will add up how many hours a year they cost you. Most people are shocked by that number. Bring it with you, because it becomes your capstone project in video ten.

Then take the quick ten-question quiz to lock in what you've learned.

In the next video, we're going inside the filing cabinet. I'll take you on a supply chain pro's tour of an ERP, you'll set up your own free Odoo, and you'll load BrightLeaf's ten products into it. It takes about twenty minutes, and by the end you'll have a real ERP to play with that you cannot break.

See you in video two.
