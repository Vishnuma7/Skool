# Video 5: Your No-Code Toolkit: Setting Up n8n and Your AI Brain
**Course:** The ERP Agent Blueprint | **Length:** 24 min | **Level:** Beginner

**Learning objectives:**
- Create a free n8n Cloud trial account and find your way around the canvas: trigger, nodes, connections and executions
- Get an API key for your AI brain (Claude from console.anthropic.com, or OpenAI) and set a monthly spending limit
- Store every key safely in n8n Credentials, and know the three places a key must never go
- Explain AI costs in plain numbers: tokens, cents per run, and a monthly estimate
- Build and run a "hello world" workflow (Manual Trigger → AI Agent → a friendly supplier follow-up email), and save your Odoo credential so Stocky can read the ERP in the next video

**Before recording, prepare:**
- A fresh browser profile (no saved logins) so the sign-up screens look exactly like a learner's
- Tabs open: n8n.io, console.anthropic.com, platform.openai.com (for the side note only), your Odoo trial (for example `https://brightleaf-demo.odoo.com`)
- The Odoo trial from Video 2 with the 10 BrightLeaf products loaded, logged in as the admin user
- A notepad window off-screen for the API key demo. Use a throwaway key on camera and **delete it right after recording**. Blur every key in the edit.
- The prompt text for the hello world workflow ready to paste (it's in the script below)

**Resources for this video:**
- Activity: `V05_Activity_Toolkit_Setup.xlsx` (Setup Checklist, Credentials Safety Log, Cost Estimator)
- Quiz: `V05_Quiz.docx`

---

## [ON CAMERA] Intro: The Intern Needs a Desk (00:00–02:00)

Monday, 8:10 in the morning, BrightLeaf Supplies, Pune.

Priya has a coffee in one hand and a spreadsheet in the other. She's chasing three suppliers, Mr. Kapoor wants the stock report by eleven, and Ravi from the warehouse has just told her the pallet jack wheels are almost gone. Again.

Here's the thing. Over the last four videos, Priya learned everything she needs to understand. What an ERP is. What an API is: the waiter. What a database is: the super-organised Excel workbook. But understanding doesn't save her twelve hours a week. Building does.

And today, we start building.

Remember how we describe an AI agent in this course? A smart new intern. Someone who can read, think, use tools and act, but needs clear instructions and supervision. Well, before any intern can start work, you have to do three boring but important things. Give them a desk. Give them a brain, well, they bring their own, but you get the idea. And give them the right keys to the right doors.

That's this video. The desk is **n8n**, the tool where we'll build Stocky, step by step, like a recipe card. The brain is **Claude**, or ChatGPT if you prefer. And the keys are API keys, which we'll store safely, like a responsible office manager.

By the end of this video, you'll press one button, and an AI will write a polite follow-up email to a supplier in Shenzhen, in about four seconds, for less than one cent. That's your "hello world". And you'll have the key to Odoo ready, so in the next video Stocky can walk into the ERP and read your stock.

If you've never touched a tool like this, that's completely normal. Nothing we do today can break your ERP. Let's set up your desk.

---

## [SCREEN RECORDING] Create Your n8n Cloud Account (02:00–04:00)

**SHOW:** Browser at n8n.io. Cursor hovers on the "Get started for free" button at the top right.

**SAY:** This is n8n. People pronounce it "n-eight-n". The name is short for "nodemation", which tells you what it does: it automates work using little building blocks called nodes. We'll come back to nodes in a minute. First, let's get you an account. Click "Get started for free".

**ON-SCREEN TEXT:** n8n = your workflow builder. Free trial, no credit card needed.

**SHOW:** The sign-up form: first name, last name, email, password. Fill in "Priya", "Sharma", a work email, and a password.

**SAY:** Fill in your name, your email and a password. I'm signing up as Priya. Use an email you actually check, because n8n will send you a confirmation link. The cloud trial is free for fourteen days and you don't need a credit card to start.

**SHOW:** The "Choose your account name" screen. Type `brightleaf` and the address preview shows `brightleaf.app.n8n.cloud`.

**SAY:** Now n8n asks for an account name. This becomes your personal web address. I'll type "brightleaf", so my n8n lives at brightleaf dot app dot n8n dot cloud. Pick your company name or your own name. Write that address down, because it's where you'll log in from now on.

**SHOW:** The short onboarding questions (role, company size, what you want to automate). Pick "Operations" and "Supply chain / inventory".

**SAY:** n8n asks a few questions about you. There are no wrong answers here. I'll pick Operations. Then click through.

> PRO TIP: You may read online that you can "self-host" n8n on your own server. That's optional, and you do NOT need it for this course. The cloud version does everything we need, and someone else keeps it running.

**SHOW:** The confirmation email in the inbox, click "Confirm email", then the n8n Overview page loads with the "Create Workflow" button at the top right and an empty list.

**SAY:** Check your inbox, click the confirmation link, and you land here, on the Overview page. Think of this as your kitchen. It's empty right now. Over the next few videos, this list will fill up with recipe cards: Stocky reading stock, Stocky drafting purchase orders, Stocky sending the Monday report. And just so you know, there are other tools that do a similar job, Make.com is a popular one, but we'll use n8n because its AI Agent building block is the friendliest for beginners.

---

## [SCREEN RECORDING] A Tour of the Canvas: Trigger, Nodes, Connections, Executions (04:00–07:45)

**SHOW:** Click "Create Workflow". The empty canvas appears with a dotted grid and a big "+" box labelled "Add first step".

**SAY:** Click "Create Workflow". This dotted grid is called the canvas. It's a blank recipe card. Every workflow you build will read from left to right, like a sentence. Step one, step two, step three.

**SHOW:** Click the workflow name at the top left ("My workflow") and rename it to `V05 Hello World`.

**SAY:** First habit: name your workflow. Click "My workflow" at the top left and call it "V05 Hello World". In six months you'll have twenty of these, and "My workflow 7" won't help anyone.

**SHOW:** Click "Add first step". The nodes panel slides in from the right with a list of triggers: "Trigger manually", "On a schedule", "On webhook call", "On chat message", "On app event".

**SAY:** Now click "Add first step". Look at the list. Every one of these is a **trigger**. A trigger is the doorbell that starts the recipe. Nothing happens in n8n until a doorbell rings. "Trigger manually" means you press a button. "On a schedule" means a clock rings it, say, every morning at seven. "On chat message" means someone types a question, which is exactly how we'll talk to Stocky next video. And "On webhook call" is a doorbell that another app can press.

**ON-SCREEN TEXT:** Trigger = the doorbell that starts the recipe.

**SHOW:** Click "Trigger manually". A node appears on the canvas: "When clicking 'Execute workflow'".

**SAY:** Let's pick "Trigger manually". See this box? That's a **node**. One node is one step, one Lego block on the recipe card. This one says "When clicking Execute workflow". Simple: when I press the button, start.

**SHOW:** Hover over the small "+" on the right side of the node, click it. The nodes panel opens again, this time showing categories: "AI", "Action in an app", "Data transformation", "Flow", "Core". Type "odoo" in the search box to show the Odoo node exists, then "gmail", then "google sheets". Then press Escape.

**SAY:** Every node has a little plus on its right side. Click it, and you can add the next step. Look at the search box. Type "odoo". There it is, a ready-made Odoo block. Type "gmail". There's Gmail. "Google Sheets". There's your database from Video 4. These are the doors Stocky will walk through. Hundreds of apps, already built, no code. I'll press Escape for now.

**SHOW:** Slowly point at the line between two nodes (use a sample with Manual Trigger → "No Operation, do nothing" node, added by searching "No Operation").

**SAY:** When two nodes are joined, you get a line between them. That's a **connection**. It's the arrow on the recipe card that says "and then". Information flows along this line, from left to right. If two nodes are not connected, they don't talk to each other. A very common beginner mistake is building a beautiful node and forgetting to connect it.

**SHOW:** Click the orange "Execute workflow" button at the bottom of the canvas. Both nodes get a green tick, and a small label "1 item" appears on the connection.

**SAY:** Now the big orange button at the bottom: "Execute workflow". Click it. Green ticks. That means each step ran successfully. And see "1 item" on the line? That's n8n telling you one piece of information travelled down the connection. Later, when Stocky reads ten products from Odoo, this will say "10 items".

**SHOW:** Click the "Executions" tab at the top centre, next to "Editor". A list shows one execution with a green "Success" label, the date and the run time in milliseconds.

**SAY:** Last stop on the tour. At the top, next to "Editor", there's a tab called "Executions". This is your logbook. Every time a workflow runs, n8n writes it down here: when it ran, how long it took, and whether it succeeded or failed. When something goes wrong at two in the morning, this is where you look first. It's like the CCTV footage of your recipe card.

**ON-SCREEN TEXT:** Trigger = doorbell | Node = one step | Connection = "and then" | Execution = one run, saved in the logbook

> PAUSE & THINK: Think of one task you do every week. What would ring the doorbell, and what would the first two steps be? For example: "Every Monday at 8 (trigger) → read stock from the ERP (node 1) → email the low items to Ravi (node 2)."

**SHOW:** Back to "Editor", delete the "No Operation" node (select it and press Delete). Press Cmd+S / Ctrl+S.

**SAY:** I'll delete that test node, keep the manual trigger, and save with Control S, or Command S on a Mac. Now let's give our intern a brain. But first, a quick story about keys.

---

## [ON CAMERA] Real-World Story: The Key on the Noticeboard (07:45–09:45)

A few years ago, a distribution company I know had a master key for their warehouse cage. The expensive stock lived in there. Power tools, batteries, the things that walk out of the door if you're not careful.

To make life easier, someone hung a copy of that key on a hook next to the shift noticeboard. Very convenient. Everybody could get in. Then, one quarter, the cycle count came back eleven batteries short. And nobody could say who took them, because everybody had the key.

An API key is exactly like that master key. Remember our analogy from Video 3: an API key is a hotel room key card. It opens only the doors it's allowed to open, and it can be cancelled. But while it's active, anyone holding it can use it. If someone gets your Claude key, they can run AI on your bill. If someone gets your Odoo key, they can read your stock, your suppliers and your prices.

So here are the three places a key must NEVER go. One: never paste it into a chat, not ChatGPT, not Claude, not WhatsApp, not Slack, not even to "the IT guy". Two: never put it in a spreadsheet or a shared document, including the Google Sheet we built in Video 4. Three: never put it in an email or a screenshot.

There's exactly one place it goes: n8n Credentials. A locked key cabinet. n8n stores it encrypted, and your workflows can use it without anybody seeing it again.

And if a key ever leaks? Don't panic. Cancel it and make a new one. That takes thirty seconds. Hotel key cards are easy to replace. Let's go and get one.

---

## [SCREEN RECORDING] Get Your AI Brain's Key and Set a Spending Limit (09:45–12:15)

**SHOW:** Browser at console.anthropic.com. The sign-in page with "Continue with Google" and "Continue with email".

**SAY:** Our intern's brain will be Claude, made by a company called Anthropic. Claude is what we call an LLM, a large language model. In plain English: the intern's brain. Go to console dot anthropic dot com. Notice the word "console". This is NOT the normal Claude chat website. It's the developer side, where you get keys and pay for usage. Sign in with Google or with your email.

> BEGINNER MISTAKE: "But I already pay for Claude Pro, or ChatGPT Plus!" That subscription is for chatting on the website. It does NOT include API usage. The API is billed separately, pay-as-you-go, and the good news is that our usage is tiny.

**SHOW:** The first-time setup asks for an organisation name. Type `BrightLeaf Supplies`. Then the dashboard loads.

**SAY:** The first time, it asks for an organisation name. I'll type "BrightLeaf Supplies". You can use your company name or just your own name.

**SHOW:** Click "Settings" in the left menu, then "Billing". Click "Buy credits", choose the minimum amount (5 USD), enter card details (blurred), and make sure "Auto reload" stays OFF.

**SAY:** Before we make a key, let's add a little money. Go to Settings, then Billing, then "Buy credits". I'm adding five dollars, which is the minimum. Now, look carefully at this option: auto reload. Leave it OFF. That way, when the five dollars is used up, Claude simply stops. No surprises. Five dollars will easily carry you through this entire course and then some.

**SHOW:** Click "Limits" in the Settings menu. Show the monthly spend limit field. Set it to `10` USD. Show the "Email notification" threshold and set it to `5` USD.

**SAY:** Next, under Settings, click "Limits". Here you can set a monthly spending limit, and an email alert before you reach it. I'll set the limit to ten dollars a month and an alert at five. This is your safety rail. Even if you build a workflow with a mistake that runs in a loop all night, it can't cost more than this number.

**ON-SCREEN TEXT:** Safety rail: prepaid credits + auto reload OFF + monthly limit + email alert

**SHOW:** Click "API Keys" in the left menu, then "Create Key". A dialog asks for a name. Type `n8n-stocky-brightleaf`. Click "Add". The key appears, starting with `sk-ant-...` (blurred).

**SAY:** Now the key itself. Click "API Keys", then "Create Key". Give it a name that tells future-you where it's used. I'll call it "n8n stocky brightleaf". Click "Add". And here's your key. It starts with "sk-ant". Read this message: Anthropic shows you the full key only once. If you close this window without copying it, it's gone, and you simply make a new one.

**SHOW:** Click the copy icon. Do NOT paste it anywhere yet. Switch straight to the n8n tab.

**SAY:** Click the copy icon. Now, don't paste it into a notepad, don't email it to yourself. We go straight to n8n and put it in the locked cabinet.

> PRO TIP: Prefer ChatGPT? The steps are almost identical. Go to platform.openai.com, open "API keys", click "Create new secret key", and set a monthly budget under "Limits". In n8n you'd then pick "OpenAI Chat Model" instead of "Anthropic Chat Model". Everything else in this course works the same.

---

## [SCREEN RECORDING] Store the Key Safely in n8n Credentials (12:15–13:30)

**SHOW:** In n8n, go to the Overview page and click the "Credentials" tab. Then click the small arrow next to "Create Workflow" and choose "Create Credential".

**SAY:** Back in n8n, on the Overview page, click the "Credentials" tab. This is the locked key cabinet. Now click the arrow next to "Create Workflow" and choose "Create Credential".

**SHOW:** A search box appears. Type `Anthropic` and select "Anthropic". Click "Continue". The credential form shows an "API Key" field.

**SAY:** Search for "Anthropic", select it, and click "Continue". There's one field: API Key. Paste your key here.

**SHOW:** Paste the key (the field shows dots). Click the credential name at the top ("Anthropic account") and rename it to `Anthropic – BrightLeaf`. Click "Save". A green banner appears: "Connection tested successfully".

**SAY:** Let's also rename it. Click the name at the top and call it "Anthropic, BrightLeaf". Now click "Save". n8n tests the key straight away, and we get a green message: "Connection tested successfully". That means the key works, and it's now stored encrypted inside n8n.

**SHOW:** Close the dialog, then reopen the credential. The API Key field shows only dots, not the key.

**SAY:** Watch this. If I open it again, I can't see the key. Only dots. That's the whole point. From now on, any workflow can use "Anthropic, BrightLeaf", but nobody can read the key, not even me. If you ever need it again, you don't copy it from here. You create a new one in the Anthropic console.

**ON-SCREEN TEXT:** Keys live in n8n Credentials. In your notes, write WHERE a key lives, never the key itself.

> BEGINNER MISTAKE: Keeping a "keys.txt" file on the desktop "just in case". That file is the key on the noticeboard. In today's activity you'll build a Credentials Safety Log that records where each key lives and when to renew it, without ever storing the key itself.

---

## [ON CAMERA] What Does This Actually Cost? (13:30–15:30)

Let's talk money, because I know some of you are thinking, "Is this AI thing going to quietly eat my budget?"

AI is billed in **tokens**. A token is a small piece of a word. As a rule of thumb, a thousand tokens is about seven hundred and fifty words. You pay for the words you send in, and a bit more for the words the AI writes back.

At the time of recording, a Claude Sonnet model costs about two dollars per million tokens in and ten dollars per million tokens out. A million tokens is roughly the length of eight thick novels. Prices change, so always check the pricing page, but the size of the numbers is what matters.

Our hello world email? About three hundred and fifty tokens in and two hundred out. That works out to around three tenths of a cent. You could write three hundred supplier emails for one dollar.

When Stocky starts reading Odoo next video, each question costs more, because the stock data goes in too. Think two to four cents per question. Say Priya asks Stocky twenty questions a day, twenty-two working days a month. That's four hundred and forty questions, at three cents each, about thirteen dollars a month.

Now compare that to the twelve hours a week Priya spends copying numbers into Excel. Even if Stocky saves her just four of those hours, the maths isn't close.

And there are cheaper brains. Claude Haiku is a smaller, faster model that costs a fraction of Sonnet. It's perfect for simple jobs like formatting emails. In your activity file, the Cost Estimator lets you plug in your own numbers and compare both. And remember the safety rail we just set: prepaid credits and a monthly limit. You stay in control.

---

## [SCREEN RECORDING] Hello World: Your First AI Workflow (15:30–19:45)

**SHOW:** Open the "V05 Hello World" workflow. The manual trigger is on the canvas. Click the "+" on its right, search `AI Agent`, and select "AI Agent".

**SAY:** Time for the fun part. Open "V05 Hello World". Click the plus next to the manual trigger, search for "AI Agent", and select it. This is the most important building block in the whole course. This node IS the intern. It can think, and later it can use tools.

**SHOW:** The AI Agent settings panel opens. "Source for Prompt (User Message)" is set to "Connected Chat Trigger Node". Change it to "Define below".

**SAY:** The settings panel opens. The first setting is "Source for Prompt". That's a fancy way of asking, "Where does the instruction come from?" Next video, the instruction will come from a chat window. Today, we'll type it right here, so change it to "Define below".

**SHOW:** Paste this into the "Prompt (User Message)" box:

```
Write a short, friendly follow-up email to our supplier Global Lift Parts in Shenzhen.
Facts:
- Purchase order: P00027
- Item: BL-1005 Pallet Jack Wheels (set), quantity 40
- Expected delivery date was 3 days ago and we have not received any shipping update
- Our stock is down to 18 sets and our reorder point is 25
Ask for the tracking number and a confirmed new delivery date by Friday.
Sign it as: Priya Sharma, Procurement & Inventory Manager, BrightLeaf Supplies, Pune.
```

**SAY:** Here's the instruction. Notice how I wrote it. I didn't just say "write an email to a supplier". I gave the facts like a good manager briefing an intern: the PO number, P zero zero zero two seven. The item, BL-1005, pallet jack wheels, forty sets. The fact that it's three days late. Our stock: eighteen sets against a reorder point of twenty-five. And exactly what I want back: a tracking number and a new date by Friday. The more specific your brief, the better the intern's work.

**SHOW:** Scroll down to "Options", click "Add Option", choose "System Message". Replace the default text with:

```
You are Stocky, the procurement assistant at BrightLeaf Supplies, an industrial and packaging supplies distributor in Pune, India.
You write clear, polite, professional emails to suppliers.
Keep every email under 120 words, include a subject line, and never invent facts that are not in the request.
```

**SAY:** Now scroll down to "Options", click "Add Option" and choose "System Message". The system message is the intern's job description. It stays the same every time, while the user message changes. I'm telling it who it is, Stocky, BrightLeaf's procurement assistant. How to write: polite and professional. And one golden rule: never invent facts. Keep that rule in mind. It becomes very important next video.

**ON-SCREEN TEXT:** System message = the job description (stays the same). User message = today's task (changes every time).

**SHOW:** Close the panel. Under the AI Agent node, point at the three small connectors: "Chat Model", "Memory", "Tool". Click the "+" under "Chat Model".

**SAY:** Close the panel and look underneath the AI Agent node. Three little plugs: Chat Model, Memory and Tool. The chat model is the brain. Memory lets it remember a conversation. Tools are its hands, like the Odoo door. Today, we only need the brain. Click the plus under "Chat Model".

**SHOW:** Choose "Anthropic Chat Model". In the "Credential to connect with" dropdown, select `Anthropic – BrightLeaf`. In the "Model" dropdown, select the newest Claude Sonnet model in the list.

**SAY:** Pick "Anthropic Chat Model". In "Credential to connect with", choose the credential we just saved, "Anthropic, BrightLeaf". See? We never touch the key again. Then, in "Model", choose the newest Claude Sonnet you see in the list. Model names get updated every few months, so your list might look a little different from mine. Sonnet is the all-rounder: smart and affordable.

**SHOW:** The canvas now shows: Manual Trigger → AI Agent, with the Anthropic Chat Model hanging underneath. Click "Execute workflow". The AI Agent node spins for about 4 seconds, then shows a green tick.

**SAY:** Here's our recipe card. The doorbell, the intern, and the intern's brain. Moment of truth. Click "Execute workflow".

**SHOW:** Double-click the AI Agent node. The output panel on the right shows the "output" field with the email:

```
Subject: Follow-up on PO P00027 – BL-1005 Pallet Jack Wheels

Dear Global Lift Parts team,

I hope you are well. I'm following up on our purchase order P00027 for 40 sets of
Pallet Jack Wheels (BL-1005). The expected delivery date passed three days ago,
and we have not yet received a shipping update.

Our stock is now down to 18 sets, below our reorder point of 25, so this order is
becoming urgent for us.

Could you please share the tracking number and confirm a new delivery date by Friday?

Thank you for your help.

Best regards,
Priya Sharma
Procurement & Inventory Manager
BrightLeaf Supplies, Pune
```

**SAY:** Let's open the AI Agent node and look at the output. Read that. A subject line with the PO number. Polite. It explains why it's urgent, using our real numbers, eighteen against twenty-five. It asks for exactly two things. And it's signed properly. That took about four seconds and cost about a third of a cent. Priya used to spend ten minutes on emails like this, several times a day.

**ON-SCREEN TEXT:** ~4 seconds | ~$0.003 | 0 lines of code

**SHOW:** Click the "Executions" tab. The new run is at the top with a green "Success" label. Click into it to show the same canvas, frozen, with the output.

**SAY:** And check the logbook. Executions tab. There's our run, saved, with the exact output. Nothing gets lost.

> PAUSE & THINK: Change ONE fact in the prompt, for example make the delay 10 days instead of 3, or change the supplier to Gulf Lubricants in Dubai and the item to BL-1007 Hydraulic Oil. Run it again. How did the tone of the email change?

**SAY:** Try that challenge yourself. When I changed the delay to ten days, the email got noticeably firmer and asked to escalate to a manager. Same recipe card, different facts, different email. That's the power of a good instruction. Now, one more key before we finish: the key to Odoo.

---

## [SCREEN RECORDING] Get Your Odoo API Key and Save the Odoo Credential (19:45–22:30)

**SHOW:** Switch to the Odoo tab (`brightleaf-demo.odoo.com`). Open the main menu and click "Settings". Scroll to the very bottom to the "Developer Tools" section and click "Activate the developer mode". The page reloads with a small bug icon in the top bar.

**SAY:** Over to Odoo, our central filing cabinet. Odoo needs its own key card too. In some versions, the key menu is hidden until you switch on developer mode. Don't let the name scare you. It changes no data, it just shows a few extra menus. Go to Settings, scroll all the way to the bottom, and click "Activate the developer mode". The page reloads, and you'll see a little bug icon at the top. That's how you know it's on.

**SHOW:** In Settings, click "Users & Companies" in the top menu, then "Users". Click your own user (for example "Priya Sharma" or "Administrator"). Click the "Account Security" tab. Click "New API Key".

**SAY:** Now, in Settings, click "Users and Companies", then "Users". Click your own user. I'm logged in as Priya. Open the tab called "Account Security". And there's the button: "New API Key". Click it.

**SHOW:** A "Security Control" pop-up asks for your password. Enter it and click "Confirm Password". Then a "New API Key" dialog asks for a description. Type `n8n Stocky`. If a duration option appears, choose the longest one your plan allows for the course (for example 3 months) and note the date. Click "Generate Key". A key appears with the warning that it won't be shown again.

**SAY:** Odoo asks for your password first, to be sure it's really you. Then add a description. I'll write "n8n Stocky". Some Odoo versions also ask how long the key should last. Pick a sensible length, like three months, and write the expiry date in your Credentials Safety Log. Click "Generate Key". Same rule as before: Odoo shows this key once. Copy it, and go straight to n8n.

> BEGINNER MISTAKE: Odoo asks for a password you don't remember setting. If you created your trial by signing in with your Odoo.com account, use that same Odoo.com password.

**SHOW:** In n8n, Overview → "Create Credential" → search `Odoo` → select "Odoo API" → "Continue". The form shows four fields: "Site URL", "Username", "Password or API Key", "Database Name".

**SAY:** Back in n8n: "Create Credential", search "Odoo", and select "Odoo API". This one has four fields. Think of it as a delivery address with four lines. Get any line wrong, and the waiter can't find the kitchen.

**SHOW:** Fill in, one field at a time, highlighting each:
- Site URL: `https://brightleaf-demo.odoo.com`
- Username: the email you log in to Odoo with, for example `priya@brightleaf-demo.com`
- Password or API Key: paste the Odoo API key
- Database Name: `brightleaf-demo`

**SAY:** Line one, Site URL. That's the address in your browser bar, starting with https and ending with dot odoo dot com, with nothing after it. Line two, Username. That's the email you log in to Odoo with. Line three, Password or API Key. Paste the key we just generated, not your password. Line four, Database Name. On Odoo Online, this is usually the first part of your web address. My address is brightleaf-demo dot odoo dot com, so my database is called "brightleaf-demo".

> PRO TIP: Not sure about your database name? Log in at odoo.com, open "My Databases", and you'll see the exact name listed there.

**SHOW:** Rename the credential to `Odoo – BrightLeaf`. Click "Save". Green banner: "Connection tested successfully".

**SAY:** Rename it "Odoo, BrightLeaf", and click "Save". And there it is: "Connection tested successfully". n8n just knocked on Odoo's door, showed the key card, and Odoo said "come in".

**SHOW:** Briefly show a failed test example (wrong database name) with a red error, then fix it.

**SAY:** See a red error instead? It's almost always one of three things: extra text at the end of the URL, a typo in the database name, or your password pasted instead of the API key. Fix it and save again.

**SHOW:** The Credentials tab now lists two items: "Anthropic – BrightLeaf" and "Odoo – BrightLeaf".

**SAY:** Look at our key cabinet. Two keys, both locked away safely. A brain, and a door to the ERP. That's everything Stocky needs.

---

## [ON CAMERA] Outro: Your Desk Is Ready (22:30–24:00)

Well done. Setup is the part where most people give up, and you got through it. Three key takeaways.

**One.** n8n is your recipe card builder. Every workflow starts with a trigger, the doorbell. Then nodes, the Lego blocks, joined by connections. Every run is saved in Executions, your logbook.

**Two.** Keys live in one place only: n8n Credentials. Never in a chat, a spreadsheet or an email. And always set a monthly spending limit.

**Three.** AI is cheap when you use it well. A supplier email costs a fraction of a cent. The real cost is a vague instruction.

Now your activity. Open **V05_Activity_Toolkit_Setup.xlsx**. On the Setup Checklist, tick off every step from today. In the Credentials Safety Log, record where each key lives, never the key itself. Then use the Cost Estimator for YOUR company, and take the Video 5 quiz.

In the next video, this all comes together. We'll give Stocky a chat window, plug the Odoo key into its hands, and you'll type, "What's running low?" And for the first time, an AI will walk into your ERP, read the live stock, and answer you. That's Video 6: **Your First Agent: Stocky Reads the ERP**. See you there.
