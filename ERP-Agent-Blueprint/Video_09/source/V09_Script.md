# Video 9: Memory & Reports: Logging to a Database and the Monday Report
**Course:** The ERP Agent Blueprint | **Length:** 24 min | **Level:** Beginner

**Learning objectives:**
- Explain why an agent needs a log: it is the agent's memory and the company's audit trail ("if it isn't written down, it didn't happen").
- Create a "Decision Log" tab in Google Sheets and use the n8n Google Sheets node (Append Row) to write every Stocky decision into it.
- Build the Monday Report workflow: Schedule Trigger (Mondays, 7:00 am) → Odoo + Decision Log + risk scores → AI Agent writes an executive summary → Gmail sends it.
- Write a clear report prompt that produces the same structure every week: top 5 risks, items reordered, stock health %, money tied up in stock.
- Build a simple Google Sheets chart dashboard and link it from the email.

**Before recording, prepare:**
- n8n open with the Stocky workflows from Videos 6, 7 and 8: "Stocky – Chat", "Stocky – Daily Reorder Check" and "Stocky – Supplier Risk Check".
- The Google Sheet "BrightLeaf – Stocky Database" from Video 4 with the tabs "Stock Log" and "Suppliers". Have an empty browser tab ready to add "Decision Log".
- The Odoo trial with the 10 BrightLeaf SKUs. Stock is at the canonical course numbers: BL-1001 = 145, BL-1002 = 1,180, BL-1003 = 260, BL-1004 = 420, BL-1005 = 18, BL-1006 = 1,850, BL-1007 = 31, BL-1008 = 34, BL-1009 = 410, BL-1010 = 26 (below reorder point: BL-1002, BL-1004, BL-1005, BL-1007).
- Gmail credential already connected in n8n (from Video 7). A second inbox (or your own) playing "Mr. Kapoor" so you can show the email arriving.
- The activity file V09_Activity_Decision_Log_Dashboard.xlsx open in a background tab.

**Resources for this video:** V09_Activity_Decision_Log_Dashboard.xlsx, V09_Quiz.docx

---

## [ON CAMERA] Intro (00:00–02:00)

It's 9:40 on a Monday morning at BrightLeaf Supplies in Pune. Mr. Kapoor, the operations director, walks over to Priya's desk with a coffee in his hand and asks one simple question.

"Priya, last Monday we ordered more stretch wrap. Who approved that, and why?"

And Priya freezes. Because she knows the order happened. She remembers a busy morning. She remembers an email thread somewhere. But the "why"? The stock level that day? Who clicked yes? That's buried in her inbox, in Ravi's WhatsApp, and in her memory, which, let's be honest, is full.

At the same time, Priya hasn't even started the Monday stock report yet. That report alone takes her about three hours every single week. Copy numbers out of Odoo, paste into Excel, colour the red cells, write a few lines for Mr. Kapoor, attach, send. Three hours, fifty-two weeks a year. That's more than 150 hours a year on one report.

Today we fix both problems.

First, we give Stocky a memory. Every decision Stocky makes, every reorder, every "hold", every approval, gets written into a Google Sheet automatically. So when Mr. Kapoor asks "who approved that?", Priya answers in ten seconds.

Second, we build the Monday Report. At 7 am every Monday, before Priya has even had her chai, Stocky reads Odoo, reads its own log, reads the supplier risk scores, writes a one-page executive summary, and emails it to Mr. Kapoor. Priya's three hours become zero.

And in about fifteen minutes, I'm going to show you the actual email that lands in Mr. Kapoor's inbox. It's the moment this course stops feeling like a project and starts feeling like a teammate. Let's go.

## [ON CAMERA] Why Logs Matter: Memory + Audit Trail (02:00–03:30)

Before we click anything, let's get one idea really clear. Why does an agent need a log at all?

Remember our analogy. An AI agent is like a smart new intern. Now imagine an intern who does great work all day, but at 6 pm, their memory is completely wiped. Every morning they arrive knowing nothing about yesterday. That's actually how most AI agents work out of the box. Each time a workflow runs, it starts fresh. It doesn't remember that it ordered bolts yesterday.

A log fixes that. A log is a notebook the intern writes in after every decision. Date, what they saw, what they did, who signed off. Two things happen when you have that notebook.

One: memory. Stocky can read its own notebook and say, "I already raised an order for the pallet jack wheels on Wednesday, so I won't raise another one today." That stops duplicate orders, which is one of the most common and expensive mistakes in automation.

Two: an audit trail. Auditors, finance teams, and directors all live by one rule: if it isn't written down, it didn't happen. When a purchase goes wrong, nobody wants to hear "the AI did it." They want to see: on this date, stock was 150, reorder point was 200, Stocky suggested 250 rolls, Priya approved at 10:14 am. That's trust. And trust is what lets you give an agent more responsibility over time.

So: memory for the agent, proof for the humans. Let's build the notebook.

> PAUSE & THINK: Think of the last time someone asked you "why did we order that?" How long did it take you to find the answer? Write the number of minutes down. We'll come back to it.

## [SCREEN RECORDING] Build the Decision Log Tab in Google Sheets (03:30–06:30)

**SHOW:** The Google Sheet "BrightLeaf – Stocky Database" with tabs "Stock Log" and "Suppliers" at the bottom.

**SAY:** Here's the Google Sheet we built back in Video 4. Remember, a database is just a super-organised Excel workbook. Each tab is a table, each row is a record, each column is a field. We already have "Stock Log" and "Suppliers". Now we add the most important tab of all.

**SHOW:** Click the **+** (Add Sheet) button at bottom left. Right-click the new tab → **Rename** → type `Decision Log`.

**SAY:** I click the little plus at the bottom left, right-click the new tab, choose Rename, and call it "Decision Log". Spelling matters here, because n8n will look for this exact name. Capital D, capital L, one space.

**SHOW:** Type headers in row 1, A1 to I1: `Log ID`, `Timestamp`, `SKU`, `Product`, `Stock On Hand`, `Action`, `Approved By`, `Risk Score`, `Notes`.

**SAY:** Now the column headers. Think of these as the questions Mr. Kapoor or an auditor might ask. Log ID, a unique number for each row. Timestamp, when did it happen. SKU and Product, what item. Stock On Hand, what was the stock at that moment. Action, what did Stocky do: things like "RFQ created", "Hold", "Rejected", or "Alert sent". Approved By, which human signed off, or "Auto" if no approval was needed. Risk Score, the supplier risk out of ten from Video 8. And Notes, a short sentence in plain English explaining why.

**ON-SCREEN TEXT:** Decision Log columns: Log ID | Timestamp | SKU | Product | Stock On Hand | Action | Approved By | Risk Score | Notes

**SHOW:** Select row 1 → **View → Freeze → 1 row**. Make row 1 bold with a light green fill.

**SAY:** I freeze the header row with View, Freeze, one row, so it stays visible when the log gets long. And it will get long. Stocky makes maybe five to fifteen decisions a day. That's a few thousand rows a year, and Google Sheets handles that easily.

**SHOW:** Click column B → **Format → Number → Date time**. Click column H → **Format → Number → Number**.

**SAY:** One small but important habit from Video 4: clean data. I set column B to "Date time" and column H to "Number". If you skip this, Google Sheets may treat "7.8" as text and your charts later will quietly break.

**SHOW:** Type one manual test row: `LOG-0001`, `2026-11-09 10:14`, `BL-1003`, `Stretch Wrap Film 500mm`, `150`, `RFQ created`, `Priya Sharma`, `3.1`, `Below reorder point 200. Ordered 250 rolls from PackRight.`

**SAY:** I always type one test row by hand first. It shows me what "good" looks like before the robot starts writing. Stretch wrap, stock 150, reorder point 200, RFQ created, approved by Priya, risk score 3.1, and a note. Notice the note is written for a human, not a computer. If Mr. Kapoor reads only this column, he should understand the story.

> PRO TIP: Never put two pieces of information in one cell. "Approved by Priya on Tuesday" is two fields: a name and a date. Split them, and every report later becomes easy.

**SAY:** That's our notebook. Now let's teach Stocky to write in it.

## [SCREEN RECORDING] Teach Stocky to Write: The Append Row Node (06:30–10:30)

**SHOW:** n8n → open workflow **"Stocky – Daily Reorder Check"** from Video 7. Zoom in on the end of the flow: the approval step (Gmail "Send and Wait for Response") branching into "Approved" → Odoo "Create RFQ", and "Rejected".

**SAY:** Here is the daily reorder check from Video 7. Quick reminder of the recipe card: every morning the trigger, our doorbell, rings. Stocky reads stock from Odoo, finds items below their reorder point, emails Priya for approval, and if she says yes, it creates an RFQ in Odoo. Right now, though, the moment that happens, it's forgotten. Let's fix that.

**SHOW:** Hover over the output of the Odoo "Create RFQ" node → click the **+** → search `Google Sheets` → choose **Append Row in Sheet**.

**SAY:** I click the plus after the "Create RFQ" node, search for Google Sheets, and pick "Append Row in Sheet". Append simply means "add to the bottom". It never overwrites anything. Like writing on the next empty line of a notebook.

**SHOW:** In the node panel: **Credential to connect with** = "Google Sheets – BrightLeaf" (from Video 4/5). **Resource** = Sheet Within Document. **Operation** = Append Row. **Document** = From list → "BrightLeaf – Stocky Database". **Sheet** = From list → "Decision Log".

**SAY:** Credential: the Google Sheets connection we already saved. Document: "BrightLeaf – Stocky Database". Sheet: "Decision Log". If "Decision Log" doesn't appear in the list, check the spelling of the tab, then click the little refresh icon.

**SHOW:** **Mapping Column Mode** = Map Each Column Manually. The 9 column names appear as fields.

**SAY:** Now the fun part. n8n has read our headers and is showing me nine empty boxes, one per column. I'll fill each one by dragging data from the left side, where the earlier steps' results are shown. Remember JSON? It's just a labelled shopping list. I'm picking items off that list.

**SHOW:** Fill the fields (drag from the input panel, or type the expressions):
- Log ID: `LOG-{{ $now.toFormat('yyyyMMddHHmmss') }}`
- Timestamp: `{{ $now.toFormat('yyyy-MM-dd HH:mm') }}`
- SKU: drag `default_code` from the "Find Low Stock" node
- Product: drag `name`
- Stock On Hand: drag `qty_available`
- Action: type `RFQ created`
- Approved By: type `Priya Sharma`
- Risk Score: drag `risk_score` from the "Supplier Risk Check" step
- Notes: `Below reorder point {{ $json.reorder_point }}. RFQ {{ $('Create RFQ').item.json.name }} for {{ $json.suggested_qty }} units.`

**SAY:** For Timestamp, I type this short expression, dollar sign "now", which simply means "the time right now", formatted as year, month, day, hour, minute. You don't need to memorise it. It's in the activity file to copy and paste. For SKU, product and stock, I just drag the green labels across. Action, I type "RFQ created". Approved By, "Priya Sharma". Risk score, I drag in the score from Video 8. And Notes, I build a little sentence that mixes fixed words with live data: "Below reorder point 40, RFQ P00030 for 49 units."

**ON-SCREEN TEXT:** Copy-paste expressions are in the activity file, sheet "Instructions".

**SHOW:** Click **Test step**. Switch to the Google Sheet: a new row appears: `LOG-20261116071503 | 2026-11-16 07:15 | BL-1007 | Hydraulic Oil 20L | 31 | RFQ created | Priya Sharma | 5.1 | Below reorder point 40. RFQ P00030 for 49 units.`

**SAY:** I click "Test step", flip to the Sheet, and there it is. A brand new row, written by Stocky. Hydraulic oil, stock 31, RFQ created for 49 drums, which is the reorder point times two minus what's on hand, approved by Priya, risk 5.1. That's Stocky's first diary entry.

**SHOW:** Go back to n8n. Copy the Google Sheets node (Ctrl/Cmd + C), paste it after the **"Rejected"** branch. Change Action to `Rejected` and Notes to `Priya rejected. Reason: {{ $json.data.text }}`.

**SAY:** But here's something beginners miss. A "no" is a decision too. If Priya rejects an order, we want that written down even more, because next week someone will ask why we didn't order. So I copy the node, paste it on the rejected branch, and change Action to "Rejected" with her reason in the notes.

> BEGINNER MISTAKE: Logging only the happy path. If you only log approvals, your log tells half the story. Log every branch: approved, rejected, held, and alerts.

**SHOW:** Open **"Stocky – Chat"** workflow. Point to the AI Agent node's **Tools** connector → **+** → add **Google Sheets Tool** → Operation: **Get Row(s)**, Sheet: "Decision Log". Tool description: `Use this to look up past Stocky decisions (orders, rejections, holds) by SKU or date.`

**SAY:** Now let's use the memory. In the chat agent from Video 6, I add one more tool: Google Sheets, "Get Rows", pointing at the Decision Log. And I write a plain English description so the intern's brain knows when to use it: "Use this to look up past Stocky decisions by SKU or date."

**SHOW:** Open the chat panel and type: `Did we order stretch wrap recently? Who approved it and why?` Stocky replies: "Yes. On 9 November at 10:14, an RFQ was created for 250 rolls of Stretch Wrap Film 500mm (BL-1003) from PackRight Industries. Stock was 150 against a reorder point of 200. It was approved by Priya Sharma. Supplier risk score was 3.1 out of 10, which is low."

**SAY:** And now, the exact question Mr. Kapoor asked in the intro. "Did we order stretch wrap recently? Who approved it and why?" Look at that answer. Date, quantity, stock level, reorder point, who approved, and the risk score. Ten seconds. That's the power of memory.

> PRO TIP: Do the same in your Supplier Risk Check workflow from Video 8: add an Append Row with Action = "Risk alert" whenever a score goes above 7. Then your log shows risks AND decisions side by side.

## [ON CAMERA] Real-World Story: The Order That Happened Twice (10:30–12:00)

Let me tell you about a real pattern I've seen again and again. The names are changed, but the story is very common.

A spare parts distributor set up a simple automation. Whenever stock of a fast-moving part dropped below the reorder point, it emailed the buyer a draft purchase order. Great idea. But it had no log, and it ran every morning.

On Monday, stock of a hydraulic pump seal dropped to 38, below the reorder point of 40. The automation drafted an order. The buyer approved it. But the supplier's delivery takes fourteen days, so on Tuesday the stock was still below 40. And the automation drafted another order. On Wednesday, another. The buyer was busy, saw "approve" emails that looked identical, and clicked yes, yes, yes.

By Friday they had ordered the same seals four times. Over twenty thousand dollars of stock that sat on a shelf for eight months.

The fix was one sentence in the agent's rules plus one log: "Before suggesting a reorder, check the Decision Log. If an RFQ for this SKU was created in the last lead-time days and hasn't arrived, don't suggest it again."

That's why we built memory before reporting. A log isn't paperwork. It's the thing that stops your agent from doing something silly over and over with total confidence.

So in your Stocky reorder prompt, add this line now: "Check the Decision Log first. Never suggest a second RFQ for a SKU that already has an open RFQ within its lead time." Little sentence. Huge savings.

## [SCREEN RECORDING] The Monday Report, Part 1: Schedule + Gather the Data (12:00–15:30)

**SHOW:** n8n → **Overview → Create Workflow**. Rename to `Stocky – Monday Report`.

**SAY:** Time for the Monday Report. I create a new workflow and call it "Stocky – Monday Report". Here's the plan on our recipe card: a doorbell that rings every Monday at 7, three steps that collect information, one step where the AI writes, and one step that sends the email.

**ON-SCREEN TEXT:** Schedule (Mon 7:00) → Odoo stock → Decision Log (last 7 days) → Suppliers + risk → AI writes → Gmail

**SHOW:** Click **Add first step** → search `Schedule` → **Schedule Trigger**. Set **Trigger Interval** = Weeks, **Weeks Between Triggers** = 1, **Trigger on Weekdays** = Monday, **Trigger at Hour** = 7am, **Trigger at Minute** = 0.

**SAY:** The first step is a Schedule Trigger. In Video 7 we used it daily. Now I set the interval to Weeks, every one week, on Monday, at 7 am, minute zero. That's our doorbell.

**SHOW:** Top-right **…** menu → **Settings** → **Timezone** = Asia/Kolkata (or your own) → Save.

**SAY:** One trap. n8n Cloud might run on a different time zone than you. If you skip this, "7 am" could mean 7 am in New York, which is 5:30 in the evening in Pune. So I open the workflow Settings and set the time zone to Asia/Kolkata. You set yours.

> BEGINNER MISTAKE: Forgetting the workflow time zone. Your report arrives at a strange hour and you think it's broken. Always set it in workflow Settings.

**SHOW:** Add node → **Odoo** → Resource: Custom Resource, Custom Resource Name: `product.product`, Operation: Get Many, **Return All** = on. Fields to include: `default_code`, `name`, `qty_available`, `standard_price`, `reorder_point` (as set up in Video 6). Click **Test step**: 10 items appear.

**SAY:** Step two: read Odoo. This is exactly the Odoo node you built in Video 6, so I'm just going to copy it in. It asks the waiter, our API, for every product with its SKU, name, stock on hand, unit cost and reorder point. Test step, and ten products come back.

**SHOW:** Add node → **Google Sheets** → Operation: **Get Row(s) in Sheet**, Sheet: "Decision Log". Then add a **Filter** node: Condition: `{{ $json.Timestamp }}` **is after** `{{ $now.minus({ days: 7 }).toFormat('yyyy-MM-dd') }}`.

**SAY:** Step three: read Stocky's diary, but only the last seven days. I add Google Sheets, "Get Rows", Decision Log. Then a Filter node that keeps only rows where the timestamp is after "now minus seven days". Again, the expression is in your activity file. Test it, and we get seven rows: the decisions from last week.

**SHOW:** Add node → **Google Sheets** → Get Row(s), Sheet: "Suppliers" (which now has the column "Risk Score" written by the Video 8 workflow).

**SAY:** Step four: the Suppliers tab, which since Video 8 also holds each supplier's latest risk score. Shenzhen BrightTech is at 7.8 this week because of heavy rain in Shenzhen and a weaker rupee against the yuan. Global Lift Parts at 7.2.

**SHOW:** After each of the three data branches, add an **Aggregate** node → **Aggregate** = All Item Data (Into a Single List), **Put Output in Field** = `products`, `decisions`, `suppliers` respectively. Then a **Merge** node, **Mode** = Combine, **Combine By** = Position, with 3 inputs.

**SAY:** Now, a small but important step. The Odoo node gave us ten separate items. If we sent them straight to the AI, n8n would run the AI ten times and write ten reports. We want one report. So I add an Aggregate node after each branch. Think of it as putting ten loose receipts into one envelope. Then a Merge node puts the three envelopes into one parcel: products, decisions, suppliers.

**SHOW:** Click **Test workflow**. Click the Merge node output: one item with three lists.

**SAY:** Test workflow, and look: one single item, with three neat lists inside. That's everything Stocky needs to write the report. Now let's give the intern's brain its instructions.

## [SCREEN RECORDING] The Monday Report, Part 2: The Report Prompt (15:30–19:00)

**SHOW:** Add node → **AI Agent**. Connect a **Chat Model** (Anthropic Claude or OpenAI, the credential from Video 5). **Source for Prompt** = Define below. Paste the prompt below into **Prompt (User Message)**. Click **Add Option → System Message**.

**SAY:** I add the AI Agent node, connect the same Claude or OpenAI model from Video 5, and choose "Define below" for the prompt. Here's the prompt. I'm going to read it with you, because this is where the quality of your report is decided. A vague prompt gives you a vague report. A precise prompt gives you the same clean report every single week.

**SHOW:** The full prompt on screen:

```
SYSTEM MESSAGE:
You are Stocky, the inventory and procurement agent of BrightLeaf Supplies
(Pune, India). You write the weekly stock report for Mr. Kapoor, Operations
Director. He reads it on his phone in 2 minutes. Be clear, calm and factual.
Never invent numbers. Use only the data provided. If data is missing, say so.

USER PROMPT:
Write this week's Monday Stock Report using the data below.

DATA
- Products from Odoo (SKU, name, stock on hand, unit cost USD, reorder point):
  {{ JSON.stringify($json.products) }}
- Stocky's decisions in the last 7 days (Decision Log):
  {{ JSON.stringify($json.decisions) }}
- Suppliers with their latest risk score out of 10:
  {{ JSON.stringify($json.suppliers) }}

CALCULATE
1. Stock health % = SKUs at or above their reorder point / total SKUs x 100.
2. Money tied up in stock = sum of (stock on hand x unit cost), in USD,
   rounded to the nearest dollar.
3. Items reordered = rows in the Decision Log where Action = "RFQ created".

FORMAT (use simple HTML: <h2>, <p>, <ul>, <li>, <b>, <table>)
1. One-line headline: the single most important thing this week.
2. Key numbers: stock health %, money tied up in stock, number of SKUs
   below reorder point, number of RFQs created.
3. Top 5 risks, ranked. For each: SKU, product, why it is a risk
   (stock vs reorder point, lead time, supplier risk score), and one
   recommended action.
4. Items reordered this week: a table with SKU, qty, supplier, approved by.
5. Decisions rejected or on hold, with the reason.
6. "Needs your decision": maximum 2 items for Mr. Kapoor.
Keep it under 350 words. No jargon. End with: "Full dashboard: [link]".
```

**SAY:** Let's walk through it. The system message tells the intern who they are, who they're writing for, and the golden rule: never invent numbers. Use only the data provided. Then the user prompt gives three things. Data: the three lists we just collected. Calculate: exactly how to work out stock health and money tied up, so the AI doesn't guess its own formula. And Format: the exact structure, in order. Headline, key numbers, top five risks, items reordered, rejections, and a "needs your decision" section, because directors love being asked for at most two decisions, not twenty.

**SAY:** Notice I ask for simple HTML tags. HTML is just the formatting language of emails and web pages. H2 means "a heading", "b" means bold, "li" means bullet. You don't need to learn it. You just ask the AI to use it, and your email arrives looking neat instead of like one big grey paragraph.

> PRO TIP: Spell out your formulas in the prompt. AI models are excellent writers but can be sloppy at maths when left to guess. Telling it "stock on hand times unit cost" makes the number match your Excel every week.

**SHOW:** Click **Test step**. The output panel shows the rendered report:

```
HEADLINE: Pallet jack wheels and hydraulic oil are our two biggest risks
this week: both are below reorder point with long lead times, and the
hydraulic oil order is still on hold.

KEY NUMBERS
- Stock health: 60% (6 of 10 SKUs at or above reorder point)
- Money tied up in stock: $16,153
- SKUs below reorder point: 4 (BL-1002, BL-1004, BL-1005, BL-1007)
- RFQs created this week: 4 (total value $6,935)

TOP 5 RISKS
1. BL-1005 Pallet Jack Wheels: stock 18 vs reorder point 25.
   21-day lead time, Global Lift Parts risk 7.2/10 (rain in Shenzhen,
   CNY up 1.9%). RFQ P00027 for 32 sets raised. Action: get a ship date.
2. BL-1007 Hydraulic Oil 20L: stock 31 vs 40. 14-day lead time,
   Gulf Lubricants risk 5.1/10. Order ON HOLD (volume quote requested).
   Action: decide by Wednesday (see below).
3. BL-1008 LED Warehouse Light 150W: stock 34, only 4 above reorder
   point 30. 28-day lead time, Shenzhen BrightTech risk 7.8/10.
   Action: consider ordering early.
4. BL-1004 Industrial Safety Gloves: stock 420 vs 600. RFQ P00029 for
   780 pairs raised with SafeHands (risk 4.6, heavy rain in Chennai).
5. BL-1002 Corrugated Shipping Box: stock 1,180 vs 1,500. RFQ P00028
   for 1,820 boxes raised with PackRight (risk 2.3). Low risk.

ITEMS REORDERED THIS WEEK
BL-1003 | 250 rolls | PackRight Industries | Priya Sharma
BL-1005 | 32 sets | Global Lift Parts | Priya Sharma
BL-1002 | 1,820 boxes | PackRight Industries | Priya Sharma
BL-1004 | 780 pairs | SafeHands Co. | Priya Sharma

REJECTED / ON HOLD
BL-1007: on hold by Priya, asking Gulf Lubricants for an 80-drum price.
BL-1008: on hold, waiting for a revised quote ($72 to $68 per unit).

NEEDS YOUR DECISION
1. Hydraulic oil: standard order of 49 drums (~$2,646) now, or wait
   2 days for the 80-drum volume price?
2. LED lights: approve ordering 26 units early (~$1,872) given the
   28-day lead time?

Full dashboard: [link]
```

**SAY:** And here's the report. Read the headline: "Pallet jack wheels and hydraulic oil are our two biggest risks this week." That's what a director wants in the first line. Stock health 60 percent, because six of our ten SKUs are healthy. Money tied up in stock, 16,153 dollars. Top five risks, each with a reason and an action. The items reordered, who approved them, the two on hold and why. And just two decisions for Mr. Kapoor. Priya used to spend three hours on this. Stocky took about twelve seconds.

**SHOW:** Open the activity file, sheet "Dashboard". Point to cell showing Money tied up = $16,153 and Stock health = 60%.

**SAY:** Now, never trust, always verify, especially in the first few weeks. I check the numbers against my own spreadsheet. Money tied up, 16,153, matches. Stock health, 60 percent, matches. If the AI's numbers ever disagree with your spreadsheet, the spreadsheet wins and you tighten the prompt.

> PAUSE & THINK: If you were Mr. Kapoor, what ONE extra number would you want in this report every Monday? Write it down. You'll add it to the prompt in the activity.

## [SCREEN RECORDING] Send It: Gmail + a Simple Dashboard (19:00–21:30)

**SHOW:** Google Sheet → add tab `Dashboard`. In A1 type `Week starting`, in B1 `RFQs created`, in C1 `Rejected / Hold`. A2:A5 = the last four Monday dates. In B2: `=COUNTIFS('Decision Log'!F:F,"RFQ created",'Decision Log'!B:B,">="&A2,'Decision Log'!B:B,"<"&A2+7)`, drag down. Same idea in C2 for "Rejected". Select A1:C5 → **Insert → Chart** → Chart editor **Setup → Chart type = Column chart**.

**SAY:** Before the email, a quick dashboard, so Mr. Kapoor can click through to the detail. I add a "Dashboard" tab to the same Google Sheet. A couple of formulas you already know from Excel, COUNTIF and COUNTIFS, count how many RFQs were created each week. Then I select that little table, click Insert, Chart, and in the Chart editor pick "Column chart". Four bars, one per week. Simple, honest, and it updates itself because the Decision Log keeps growing.

**SHOW:** Click the chart's **⋮** menu → **Publish chart** is optional; instead, click **Share** (top right) → General access: **Restricted**, add `kapoor@brightleaf.example` as **Viewer** → **Copy link**.

**SAY:** Then I share the sheet with Mr. Kapoor as a Viewer only. Viewer, not Editor. He can look, he can't accidentally delete the log. I copy the link.

**SHOW:** Back in n8n, after the AI Agent add **Gmail** → Resource: Message, Operation: **Send**. To: `kapoor@brightleaf.example`, CC: `priya@brightleaf.example`. Subject: `Monday Stock Report – Week of {{ $now.toFormat('d LLL yyyy') }}`. **Email Type** = HTML. Message: `{{ $json.output.replace('[link]', '<a href="PASTE-SHEET-LINK">Open dashboard</a>') }}`. Options → **Append n8n Attribution** = off.

**SAY:** Now the Gmail node. Send a message to Mr. Kapoor, CC Priya so she always sees what her boss sees. Subject: "Monday Stock Report, Week of", and the date fills itself in. Email type: HTML, so our headings and bullets show nicely. In the message, I take the AI's output and swap the word "link" for a real clickable link to the dashboard. And I turn off "Append n8n Attribution", so the email doesn't end with an advert.

**SHOW:** Click **Test workflow**. Switch to the "Mr. Kapoor" inbox: email "Monday Stock Report – Week of 16 Nov 2026" with bold headline, bullets, table, and "Open dashboard" link. Click the link: the chart opens.

**SAY:** Test the whole workflow, and switch to Mr. Kapoor's inbox. There it is. "Monday Stock Report, week of 16 November." Clean headline, key numbers, risks, the reorder table, and a link that opens the dashboard. That's the email Priya used to spend her Monday morning building.

**SHOW:** Top right: toggle **Active** (in newer n8n versions this button is called **Publish**).

**SAY:** Last step: I switch the workflow to Active. In newer versions of n8n the button is called Publish. Either way, from now on it runs every Monday at 7 am, whether Priya is in the office, on leave, or stuck in Pune traffic.

> PRO TIP: Prefer Airtable? It's a friendly alternative database with nicer forms and views, and n8n has an Airtable node with the same "create record" idea. Everything in this video works the same way.

## [ON CAMERA] Common Mistakes With Logs and Reports (21:30–22:30)

Let me save you some headaches. Four mistakes I see beginners make with logs and reports.

One: renaming a column in the Sheet. If you change "Approved By" to "Approver", n8n can't find it and that column goes blank. Decide your headers once, and protect them.

Two: letting people type into the Decision Log by hand. The log is Stocky's notebook. If humans edit it, it's no longer a trustworthy audit trail. Give everyone Viewer access, and only the n8n account edits.

Three: trusting the report blindly in week one. Check the numbers for the first three or four Mondays. Once they match every time, then you relax.

And four: making the report too long. If Mr. Kapoor has to scroll for a minute, he won't read it. Under 350 words, two decisions maximum. Short reports get read. Long reports get archived.

## [ON CAMERA] Outro (22:30–24:00)

Let's recap. Three key takeaways.

One: if it isn't written down, it didn't happen. The Decision Log gives Stocky a memory, so it stops repeating itself, and it gives BrightLeaf an audit trail, so anyone can see who decided what, and why.

Two: the Append Row node is your agent's pen. Put one on every branch, approvals, rejections, holds and alerts, and your log tells the full story.

Three: a great report is a great prompt. Give the AI the data, spell out the formulas, fix the format, and it writes the same clean executive summary every Monday at 7 am.

Now your activity. Open V09_Activity_Decision_Log_Dashboard.xlsx. It has four weeks of Stocky's decisions already filled in. You'll use COUNTIFS and SUMIFS to build the KPIs, check stock health and money tied up, read the chart, and then answer three "Mr. Kapoor questions" from the log. At the end, there's a sheet to design the Decision Log and Monday Report for your own company. It takes about thirty minutes.

Then take the Video 9 quiz to lock it in.

And now, the big one. Stocky can read, think, act, check the outside world, remember and report. In Video 10, we make it safe to run for real: the right permissions, protecting your keys, keeping costs under control, catching errors before your boss does, and proving the return on investment. And then, your capstone: you'll build your own agent, for your own company. I can't wait to see it. See you in the finale.
