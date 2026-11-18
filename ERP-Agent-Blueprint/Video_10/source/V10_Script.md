# Video 10: Going Live Safely + Your Capstone Project
**Course:** The ERP Agent Blueprint | **Length:** 26 min | **Level:** Beginner

**Learning objectives:**
- Give your agent its own least-privilege Odoo user ("Stocky Bot") with only Inventory and Purchase rights, and its own API key.
- Protect, rotate and never share API keys; set AI spending limits and estimate your monthly running cost.
- Test in a copy of your database first, and build an n8n Error Trigger workflow that emails Sarah when anything fails.
- Go live with confidence: activate workflows, duplicate before every edit, and run a 10-minute weekly maintenance check.
- Measure ROI (hours saved × hourly cost), write a one-page pitch for your boss, and plan, build and share your capstone agent.

**Before recording, prepare:**
- Odoo trial logged in as the administrator, plus a private/incognito window for logging in as the new bot user.
- n8n with all Stocky workflows: "Stocky – Chat", "Stocky – Daily Reorder Check", "Stocky – Supplier Risk Check", "Stocky – Monday Report".
- The Anthropic Console (console.anthropic.com) or OpenAI platform (platform.openai.com) open on the Limits page.
- odoo.com → My Databases page open (to show Duplicate).
- V10_Activity_GoLive_Checklist_ROI.xlsx and V10_Activity_Capstone_Brief.docx open in background tabs.
- A Loom account (free) to show a 20-second sample recording.

**Resources for this video:** V10_Activity_GoLive_Checklist_ROI.xlsx, V10_Activity_Capstone_Brief.docx, V10_Quiz.docx

---

## [ON CAMERA] Intro (00:00–02:00)

Ten weeks ago, Sarah Mitchell spent twelve hours every week copying numbers out of Odoo, chasing suppliers by email and building a Monday report by hand.

Look at her now. Stocky answers her questions in plain English. Every morning it checks stock and drafts purchase orders, but only after she approves. It watches the weather in Shenzhen, the yuan, the peso, the dirham and the holidays in Dubai. It writes every decision in a log. And at 7 am on Monday, Mr. Harrison's report lands in his inbox before Sarah has even reached the office.

So here's the question Mr. Harrison asked her last Friday. And your boss will ask you the same thing.

"This is impressive, Sarah. But is it safe? What if it orders 10,000 boxes by mistake? What if someone steals the password? What does it cost? And what happens when it breaks at 2 am?"

Those are great questions. They're the difference between a cool demo and a tool a real company trusts with real money.

So in this final video, we make Stocky safe to run for real. We give it its own limited key card, we protect the keys, we cap the costs, we test before we touch anything live, and we set up an alarm that emails Sarah the moment something fails. Then we measure the return on investment, with real numbers, and I'll show you how to pitch it to your boss on one page.

And then, the best part. Your capstone. You're going to build your own agent, for your own company, and share it with the community. Let's finish this strong.

## [SCREEN RECORDING] Step 1: Give Stocky Its Own Key Card (02:00–05:30)

**SHOW:** Odoo, logged in as admin. Top-right shows "Mitchell Admin" or your admin name. n8n credential "Odoo – BrightLeaf" currently uses the admin login.

**SAY:** Here's a confession. Until now, Stocky has been logging into Odoo with Sarah's administrator account. That was fine for learning. For going live, it's like giving the new intern the master key to every room in the building, including the finance office and the CEO's safe. Remember our analogy: an API key is a hotel key card. It should open only the doors it needs.

**ON-SCREEN TEXT:** Least privilege = give the agent ONLY the access it needs to do its job. Nothing more.

**SAY:** This idea has a name: least privilege. Stocky needs to read products and stock, and create RFQs. That's it. It doesn't need Sales, Accounting, Employees, or Settings. So let's create a dedicated user.

**SHOW:** **Settings → Users & Companies → Users → New**. Name: `Stocky Bot`. Email/Login: `stocky.bot@brightleaf.example`.

**SAY:** I go to Settings, Users and Companies, Users, and click New. Name: Stocky Bot. Login: stocky dot bot at brightleaf. Naming it "Bot" matters. When anyone looks at an RFQ in six months and sees "Created by Stocky Bot", they instantly know a machine made it, not Sarah.

**SHOW:** **Access Rights** tab. Inventory = **User**. Purchase = **User**. Sales = (blank). Accounting / Invoicing = (blank). Employees = (blank). Administration = (blank). Click **Save**.

**SAY:** Now the Access Rights tab, the most important screen in this video. Inventory: User. Purchase: User. Everything else: blank. No Sales, no Accounting, no Administration. If someone ever tricked Stocky into "show me everyone's salaries" or "delete all customers", Odoo itself would say no. The rule isn't just in the prompt. It's in the lock.

> BEGINNER MISTAKE: Giving the bot "Administrator" because "it's easier". It is easier, until the day something goes wrong. Start with the least access, and only add a right when a real task needs it.

**SHOW:** Click the gear / **Action** menu on the user form → **Change Password** → set a long password → **Change Password**.

**SAY:** I give the bot a long password from the Action menu. On a paid Odoo plan, an extra user may cost a licence seat, so check with whoever manages Odoo. On your trial, it's free.

**SHOW:** **Purchase → Configuration → Settings** → tick **Purchase Order Approval** → Minimum amount: `5,000` → **Save**.

**SAY:** One more safety net while we're here. In Purchase, Configuration, Settings, I tick "Purchase Order Approval" and set the minimum to 5,000 dollars. Now any order above that needs a Purchase manager to approve it inside Odoo, on top of Sarah's email approval. Two locks on the same door. That answers Mr. Harrison's "10,000 boxes" question.

**SHOW:** Private window → log in as `stocky.bot@brightleaf.example` → avatar top right → **My Profile** (or **My Preferences**) → **Account Security** tab → **New API Key** → confirm password → Description: `n8n-Stocky-2026-11` → **Generate Key** → copy.

**SAY:** Now the bot's own key card. In a private window, I log in as Stocky Bot, click the avatar, My Profile, Account Security, New API Key. I name it "n8n Stocky 2026-11", so I know where it's used and when it was made. Generate, and copy it. Odoo shows it only once.

**SHOW:** n8n → **Overview → Credentials** → open "Odoo – BrightLeaf" → Username: `stocky.bot@brightleaf.example` → Password or API Key: paste → **Save** → green "Connection tested successfully". Rename credential to `Odoo – Stocky Bot (LIVE)`.

**SAY:** In n8n, I open Credentials, edit the Odoo credential, swap the username to the bot and paste the new key. Save. Green tick, connection tested. And because every Stocky workflow uses this one credential, they've all switched to the safe key card in one move.

**SHOW:** Open "Stocky – Chat" → type `Show me last month's sales invoices.` Stocky replies: "I don't have access to sales or accounting data. I can help with stock levels, products and purchase orders."

**SAY:** Let's test the lock. I ask Stocky for last month's sales invoices. And it can't. Not because it chose to behave, but because the door is locked. That's what safe looks like.

## [SCREEN RECORDING] Step 2: Protect Your Keys and Control Your Costs (05:30–08:30)

**SHOW:** A slide-style list on screen: "Never put a key in: email, WhatsApp, Slack, a screenshot, a Google Sheet, a prompt, a Loom video."

**SAY:** Three rules for keys. Rule one: never share them. Not in email, not on WhatsApp, not in a screenshot, not pasted into a prompt. A key lives in exactly one place: n8n Credentials, which stores it encrypted. If you ever see a key in a chat message, treat it as stolen.

**SAY:** Rule two: rotate them. Hotels change key cards when a guest leaves; you change API keys every ninety days, or the same day someone with access leaves the team. It takes five minutes.

**SHOW:** Odoo (as Stocky Bot) → **Account Security** → **New API Key** `n8n-Stocky-2027-02` → paste into n8n credential → Save → test OK → back in Odoo, click the trash icon next to the old key `n8n-Stocky-2026-11`.

**SAY:** Here's the five-minute rotation. Make a new key, paste it into the n8n credential, save, test. Green tick. Only then do I go back to Odoo and delete the old key with the little trash icon. New one first, old one last, so Stocky never goes offline.

**SAY:** Rule three: if a key leaks, delete it immediately in Odoo and make a new one. A deleted key card opens nothing.

> PRO TIP: Put a recurring calendar reminder "Rotate Stocky keys" every 90 days. It's already in the weekly maintenance checklist in your activity file.

**SHOW:** console.anthropic.com → **Settings → Limits** → set monthly spend limit `$20` and email notification at `$10`. (OpenAI equivalent: platform.openai.com → **Settings → Limits** → monthly budget + alert.)

**SAY:** Now money. The AI brain charges by usage, a tiny amount per question. Tiny, unless something loops. So I go to the Anthropic Console, Settings, Limits, and set a monthly spend limit of twenty dollars, with an email alert at ten. On OpenAI it's the same idea under Settings, Limits. Now the worst case is twenty dollars, not a nasty surprise.

**SHOW:** n8n → AI Agent node → **Add Option → Max Iterations** = `10`.

**SAY:** Inside n8n, the AI Agent node has an option called Max Iterations. It caps how many times the agent can use a tool in one run. I set it to ten. A confused intern can't run in circles forever.

**SHOW:** The "Monthly Cost Estimator" sheet of the activity file:

| Workflow | Runs per month | AI cost per run | Monthly AI cost |
|---|---|---|---|
| Daily Reorder Check | 30 | $0.03 | $0.90 |
| Supplier Risk Check | 30 | $0.03 | $0.90 |
| Monday Report | 4 | $0.08 | $0.32 |
| Chat questions (Sarah + Tom) | 150 | $0.02 | $3.00 |
| Error alerts (no AI) | 5 | $0.00 | $0.00 |
| **Total** | **219 runs** | | **$5.12** |

**SAY:** So what does Stocky cost per month? Here's the estimator from your activity file. Daily reorder check, thirty runs. Risk check, thirty. Monday report, four. About a hundred and fifty chat questions from Sarah and Tom. That's around 220 runs a month. AI cost: about five dollars. Add n8n Cloud's starter plan, roughly twenty to twenty-five dollars a month at the time of recording, and Google Sheets and Gmail are free. Call it thirty-two dollars a month, all in. Prices change, so always check the pricing pages, but the order of magnitude is: less than a team lunch.

> PAUSE & THINK: How many times a month would YOUR agent run? Count the triggers: daily, weekly, and questions people ask. Write the number down before you open the estimator.

## [ON CAMERA] Real-World Story: The Weekend the Bot Ran Wild (08:30–10:00)

Let me tell you a story that I hope never happens to you. It's a mix of a few real ones I've heard.

A small trading company built an automation over a weekend. It was clever: when a supplier emailed a price list, the automation read it and updated product costs. They tested it once with the boss's admin account, it worked, and they switched it on directly in the live system. Friday evening, everyone went home happy.

On Saturday, one supplier's email system had a glitch and sent the same price list forty times. The automation read every one. And because of a small mistake in the setup, each run also asked the AI to "double-check" every product. By Monday morning: hundreds of runs, a few hundred dollars of AI cost, and thousands of product prices overwritten in the live system with a wrong currency. Nobody knew until a customer called about an invoice.

Now, count the safety nets they didn't have. They used an admin account, so the bot could change anything. No spending limit. No test database. No error alert. No log of what changed. And no backup copy of the workflow.

Every single one of those is something we fix in this video. None of them is hard. Each one takes five to ten minutes. Together, they turn "I hope it works" into "I know what happens when it doesn't". That's what going live safely means.

## [SCREEN RECORDING] Step 3: Test First, Then Catch Errors (10:00–13:30)

**SHOW:** odoo.com → sign in → **My Databases** → next to `brightleaf` click the **⋮ / gear** → **Duplicate** → name `brightleaf-test` → tick **"For testing purposes"** → **Continue**.

**SAY:** Rule one of going live: never practise on the real thing. On odoo.com, under My Databases, I click the gear next to BrightLeaf and choose Duplicate. I name it "brightleaf test" and tick "For testing purposes". That checkbox is important. It switches off outgoing emails and scheduled jobs in the copy, so a test can't accidentally email a real supplier.

**ON-SCREEN TEXT:** LIVE database = real money. TEST database = your sandbox. You can't break anything in the test system.

**SHOW:** n8n → Credentials → **Create Credential → Odoo** → URL `https://brightleaf-test.odoo.com`, database `brightleaf-test`, user `stocky.bot@brightleaf.example`, key from the test copy → name `Odoo – Stocky Bot (TEST)`.

**SAY:** In n8n, I make a second Odoo credential pointing at the test copy, and I put TEST in capital letters in its name. So now we have two: LIVE and TEST. Whenever I'm trying something new, the workflow points at TEST. Only when it passes do I switch it to LIVE.

> BEGINNER MISTAKE: Naming credentials "Odoo" and "Odoo 2". Six weeks later you won't remember which is real. Always write LIVE or TEST in the name.

**SHOW:** n8n → **Overview → Create Workflow** → name `Stocky – Error Alerts` → **Add first step** → search `Error Trigger` → add it.

**SAY:** Now the smoke alarm. Things will fail sometimes. The Odoo trial expires, a password changes, Google is having a bad day. That's normal. What's not okay is finding out from Mr. Harrison on Monday that the report never came. So I create a new workflow called "Stocky – Error Alerts" and add an Error Trigger. This doorbell rings whenever any other workflow fails.

**SHOW:** Add **Gmail** → Send. To: `sarah@brightleaf.example`. Subject: `ALERT: Stocky failed – {{ $json.workflow.name }}`. Email Type: HTML. Message:

```
<p><b>Stocky hit a problem.</b></p>
<p>Workflow: {{ $json.workflow.name }}<br>
Step that failed: {{ $json.execution.lastNodeExecuted }}<br>
Error: {{ $json.execution.error.message }}<br>
Time: {{ $now.toFormat('dd LLL yyyy HH:mm') }}</p>
<p><a href="{{ $json.execution.url }}">Open this run in n8n</a></p>
<p>Nothing was ordered in this run. Check the step above, fix, and re-run.</p>
```

**SAY:** Then a Gmail node to Sarah. The subject says "ALERT: Stocky failed", plus the workflow name. The message tells her which step failed, the error message, the time, and a link straight to that run in n8n. Plain English, one click to investigate.

**SHOW:** Save. Then open **"Stocky – Daily Reorder Check"** → **…** menu → **Settings** → **Error Workflow** = `Stocky – Error Alerts` → **Save**. Repeat for Chat, Supplier Risk Check and Monday Report.

**SAY:** Now I connect the alarm to every Stocky workflow. In each one, the three-dot menu, Settings, Error Workflow, pick "Stocky – Error Alerts", Save. Four workflows, about one minute.

**SHOW:** Test copy of Daily Reorder Check on the TEST credential with a deliberately wrong API key; Schedule Trigger temporarily set to every 1 minute; activate; wait. Gmail: "ALERT: Stocky failed – Stocky – Daily Reorder Check (TEST)" … "Step that failed: Get Products. Error: Access Denied". Then deactivate and fix the key.

**SAY:** Let's prove it works. One detail: the Error Trigger only fires for automatic runs, not when you click "Test". So on my test copy, I break the key on purpose, set the schedule to every minute, and activate it. A minute later, Sarah's inbox: "ALERT: Stocky failed. Step that failed: Get Products. Error: Access Denied." Perfect. I switch it off and fix the key. Now Sarah hears about problems before anyone else does.

## [SCREEN RECORDING] Step 4: Go Live: Activate, Version, Maintain (13:30–16:00)

**SHOW:** n8n **Overview** list of workflows with Active toggles (or **Publish** buttons in newer n8n).

**SAY:** Time to go live. Here are all our workflows. In n8n, a workflow with a schedule only runs by itself when it's switched to Active. In newer versions this button is called Publish. I activate the Error Alerts first, so the alarm is on before anything else starts. Then the reorder check, the risk check, the Monday report and the chat.

**SHOW:** Open "Stocky – Daily Reorder Check" → **…** → **Duplicate** → name `Stocky – Daily Reorder Check – BACKUP 2026-11-16` → leave it inactive. Then **…** → **Download** → save the file into a Google Drive folder `Stocky Backups`.

**SAY:** Now, versioning. Before you edit a workflow that's working, always make a copy. Three dots, Duplicate, and I name it with the word BACKUP and today's date. I leave the backup switched off. I also click Download, which saves the whole recipe card as one small file, and keep it in a Google Drive folder called "Stocky Backups". If an edit goes wrong, I can be back to the working version in thirty seconds.

**ON-SCREEN TEXT:** Golden rule: Duplicate → edit the copy on TEST → test → then swap. Never edit the live workflow directly.

> PRO TIP: Some n8n plans also keep an automatic "Workflow history" (the clock icon at the top). Lovely when you have it, but a dated backup copy works on every plan.

**SHOW:** **Overview → Executions** tab → filter **Status: Error** → shows 0 errors this week.

**SAY:** Last piece: maintenance. An agent isn't "set and forget". It's more like a car. A quick check every week keeps it running for years. Every Friday, Sarah spends ten minutes. First, the Executions tab, filter by Error. Zero this week. Good.

**SHOW:** The "Weekly Maintenance" sheet of the activity file:

| # | Friday check (10 minutes) | Where |
|---|---|---|
| 1 | Any failed runs this week? | n8n → Executions → Status: Error |
| 2 | Did the Monday Report arrive and do the numbers match? | Gmail + Dashboard tab |
| 3 | Skim the Decision Log for anything odd | Google Sheet → Decision Log |
| 4 | Spot-check 3 Stocky answers against Odoo | Stocky – Chat + Odoo Inventory |
| 5 | AI spend vs limit | Anthropic / OpenAI → Usage |
| 6 | n8n runs used vs plan | n8n → Usage |
| 7 | Rejected suggestions: should a rule change? | Decision Log, Action = Rejected |
| 8 | Key rotation due? | Calendar reminder (every 90 days) |

**SAY:** Then the rest of the checklist. Did the Monday report arrive, and do the numbers match the dashboard? Skim the Decision Log. Ask Stocky three questions and check the answers in Odoo. Look at the AI spend and the n8n usage. And my favourite: look at what Sarah rejected this week. Every rejection is a lesson. If she keeps rejecting packing tape orders because a delivery is already coming, that's a rule to add to the prompt. That's how Stocky gets smarter every month.

## [ON CAMERA] Measuring ROI + Getting Your Boss's Buy-In (16:00–18:00)

Let's talk about the question every boss eventually asks: "Was it worth it?"

ROI, return on investment, sounds like a finance word, but for us it's simple maths. Hours saved, times the hourly cost of the person, compared to what the tools cost.

Let's do Sarah. Before Stocky, she spent about twelve hours a week on this work. Copying stock numbers, chasing reorders, building the Monday report. Now she spends about two hours: approving RFQs, reading the report, doing the Friday check. That's ten hours saved every week.

Let's say Sarah's fully loaded cost to BrightLeaf, salary plus benefits, is about twenty dollars an hour. Use your own number. Ten hours times twenty dollars is two hundred dollars a week. Over forty-eight working weeks, that's nine thousand six hundred dollars a year.

And the cost? About thirty-two dollars a month, so three hundred and eighty-four dollars a year. That's a return of about twenty-five times. Stocky pays for itself in the very first week.

And we haven't even counted the bigger wins: stock-outs avoided, duplicate orders stopped by the log, and Sarah using those ten hours to negotiate better prices with suppliers.

Now, how do you get your boss to say yes? One page. Not a forty-slide deck. Your activity file has a template. Five short sections. The problem, in hours and pain. What the agent does, in three bullets. The proof: four weeks of your Decision Log and one real Monday report. The cost and the safety nets: least privilege, approvals, spending limit, error alerts. And the ask: "Let me run this for three months, and I'll report the hours saved every month."

Bosses don't buy AI. They buy hours back, fewer mistakes and less risk. Speak that language, and you'll get your yes.

> PAUSE & THINK: What is the ONE task in your week that eats the most hours and that you'd love an agent to take? Write it down. That might be your capstone.

## [SCREEN RECORDING] The Go-Live Checklist & ROI Calculator (18:00–19:30)

**SHOW:** Open V10_Activity_GoLive_Checklist_ROI.xlsx → sheet "GoLive_Checklist". Rows grouped: Access, Keys, Costs, Testing, Errors, Go-Live, Maintenance. Status column with dropdown: Not started / In progress / Done / N/A. Top: "Go-live readiness: 72%".

**SAY:** Here's your go-live checklist, everything from this video in one place. Twenty-five items, grouped into Access, Keys, Costs, Testing, Errors, Go-Live and Maintenance. For each one, pick a status from the dropdown: Not started, In progress, Done. The percentage at the top updates itself. My rule: don't switch anything to Active until you're above ninety percent, and every item marked "Must" is Done.

**SHOW:** Change "Error Trigger workflow emails the owner" from In progress to Done → percentage moves from 72% to 76%.

**SAY:** Watch. I mark the error workflow as Done and the readiness goes up. It's oddly satisfying.

**SHOW:** Sheet "ROI_Calculator": inputs in yellow: Hours per week before = 12, after = 2, hourly cost = $20, working weeks = 48, monthly tool cost = $32. Outputs in green: Hours saved per year = 480, Value per year = $9,600, Cost per year = $384, Net benefit = $9,216, ROI multiple = 25x, Payback = under 1 week.

**SAY:** And the ROI calculator. Yellow cells are yours to change. Sarah's numbers are in already: twelve hours before, two after, twenty dollars an hour, forty-eight weeks, thirty-two dollars a month. Out come the green numbers: 480 hours saved a year, nine thousand six hundred dollars of value, a net benefit of over nine thousand dollars, and a payback time of less than a week. Put in your own numbers, and you have the heart of your one-page pitch.

## [ON CAMERA] Your Capstone Project (19:30–21:30)

Okay. This is the moment the whole course has been building towards.

Watching me build Stocky is useful. But you building your own agent, for your own company, is where everything clicks. That's your capstone.

Here's the brief, in five steps.

Step one: pick ONE use case. Just one. Small and painful beats big and impressive. Some ideas: an agent that chases late shipments and drafts the follow-up email. One that spots slow-moving stock that's tying up cash. One that compares three supplier quotes and recommends the best. One that answers "where's my order?" questions from your sales team. Or simply Stocky, adapted to your products.

Step two: design it on paper first, using the capstone brief. What is the trigger, the doorbell? What tools does it use: your ERP, a Google Sheet, an outside API? What are its rules? Where does a human approve? And what does it log?

Step three: build it in a test environment, using everything from Videos 5 to 9.

Step four: test it with ten questions. Five normal ones. Three tricky ones, like an item that doesn't exist or a supplier with no data. And two it should refuse or hand to a human, like "order 10,000 of everything". Write down what happened.

Step five: record a two-minute Loom demo and post it in the community. Twenty seconds on the problem, sixty seconds showing it work, twenty seconds on the results, twenty seconds on what you'd add next.

Don't wait for perfect. A small agent that works and is shared beats a perfect agent sitting on your laptop.

## [SCREEN RECORDING] Capstone Brief + Recording Your Loom Demo (21:30–23:00)

**SHOW:** V10_Activity_Capstone_Brief.docx → Part A (the fill-in template), scroll through: Use case, Trigger, Tools, Rules, Human approval, Log, Report, Success measure, Test plan with 10 rows.

**SAY:** Here's the capstone brief. Part A is your template. It walks you through every decision: the problem in one sentence, the trigger, the tools, the rules, where the human signs off, what gets logged, and how you'll measure success. And a test table with ten rows for your ten questions.

**SHOW:** Part B: BrightLeaf example filled in ("Stocky – Late Shipment Chaser": trigger daily 8 am; tools Odoo Purchase, Gmail, Decision Log; rule "if receipt date passed by 2+ days, draft a polite follow-up"; approval: Sarah approves each email).

**SAY:** Part B is a complete example from BrightLeaf: Sarah's next agent, a late shipment chaser. Every morning at 8, it finds purchase orders whose receipt date has passed by two or more days, drafts a polite follow-up email to the supplier, and waits for Sarah to approve before sending. Use it as a model when you get stuck.

**SHOW:** loom.com → **New video → Record a video** → Screen + Camera → select the n8n tab → record 20 seconds → stop → copy share link. Then the Skool community → **Write something** → category **Capstone** → title `Capstone: Late Shipment Chaser for BrightLeaf` → paste Loom link + 3 lines.

**SAY:** Recording the demo is easy. On Loom, New video, Screen and Camera, pick your n8n tab, and talk through it. Then copy the link. In our community, click "Write something", choose the Capstone category, give it a title like "Capstone: Late Shipment Chaser for BrightLeaf", paste your Loom link, and write three lines: the problem, what your agent does, and the hours you think it saves.

> BEGINNER MISTAKE: Showing a real API key, password or customer name on screen in your Loom. Use your test database, and close the Credentials page before you hit record.

**SAY:** Part C is the submission checklist. Tick every box before you post. And one last request: leave helpful feedback on two other people's capstones. You'll learn as much from theirs as from your own.

## [ON CAMERA] Outro: Your Journey From Video 1 to Video 10 (23:00–26:00)

Let's take a breath and look back at how far you've come.

In Video 1, you learned the difference between a chatbot, an automation and an agent, and you saw Stocky for the first time. Maybe you thought, "I could never build that."

In Video 2, you opened an ERP and found it's just a filing cabinet with a rulebook, and you loaded BrightLeaf's ten products into Odoo.

In Video 3, you ordered from a waiter and learned what an API really is. You called a live API from your browser.

In Video 4, you built your agent's database in Google Sheets and cleaned messy data like a pro.

In Video 5, you set up n8n and gave your agent a brain, with credentials stored safely.

In Video 6, Stocky read the ERP for the first time and answered "What's running low?"

In Video 7, Stocky took action, drafting RFQs, but only with Sarah's signature.

In Video 8, Stocky looked beyond the ERP: weather, currency and holidays, turned into a supplier risk score.

In Video 9, Stocky got a memory and started writing Mr. Harrison's Monday report.

And today, you made it safe, measurable and ready for the real world.

Three final takeaways. One: least privilege, protected keys and spending limits make your agent safe; give it only the key cards it needs. Two: test first, catch errors, back up before every edit, and give it ten minutes every Friday. Three: measure the hours saved, and pitch it in the language your boss speaks: time, money and risk.

Your activities: V10_Activity_GoLive_Checklist_ROI.xlsx, to get your agent ready and calculate your ROI, and V10_Activity_Capstone_Brief.docx, to plan your capstone. And take the final quiz.

Now, here's what I really want you to hear.

When you started this course, you were a supply chain professional who was a bit nervous about tech. Today, you're a supply chain professional who has built a working AI agent that reads an ERP, checks the outside world, writes to a database, asks for approval, and reports to the boss. Without writing a single line of code.

That's rare. Most people in our industry are still talking about AI. You've built with it.

Sarah got ten hours a week back. What will you do with yours?

Congratulations. Truly. You've finished The ERP Agent Blueprint.

Now go build your capstone, post your two-minute demo in the community, and tag it "Capstone". I'll be watching for it, and so will everyone else here cheering you on. Your first agent is waiting. Go build it.
