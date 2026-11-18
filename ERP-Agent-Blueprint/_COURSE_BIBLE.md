# COURSE BIBLE — "The ERP Agent Blueprint"
(Internal reference for every writer. Every file must stay consistent with this.)

## Course identity
- **Course name:** The ERP Agent Blueprint: Connect AI Agents to Your ERP, APIs & Databases (No Code Required)
- **Short name:** The ERP Agent Blueprint
- **Price:** included in the paid tier of the Skool community "Agentic SCM" (upgrade for just $49, which unlocks this course and all the other paid content in the community)
- **Format:** 10 videos, total 4 hours (240 min)
- **Audience:** supply chain, procurement, inventory, logistics and operations professionals. **They are NOT technical.** They have never coded, they don't know what an API or JSON is, and they are a bit nervous about "tech". They are good at Excel and they know their business deeply.
- **Level:** beginner. Never mention other levels, future courses, "intermediate" or "pro". Never say "in the advanced course".
- **Promise:** "By the end you will have built a working AI agent that reads your ERP, checks outside data, writes to a database and alerts you, without writing a single line of code."

## Teaching style rules (very important)
1. **Explain every technical word with an everyday analogy the first time it appears.** The analogy bank (use these consistently):
   - **ERP** = "the company's central filing cabinet + rulebook". Every department keeps its records in one place.
   - **API** = "a waiter in a restaurant". You (the agent) don't walk into the kitchen (the ERP); you give your order to the waiter, who brings back exactly what you asked for.
   - **API key** = "a hotel room key card". It opens only the doors it's allowed to, and it can be cancelled.
   - **Database** = "a super-organised Excel workbook". Tables = sheets, rows = records, columns = fields.
   - **AI agent** = "a smart new intern who can read, think, use tools, and act, but needs clear instructions and supervision".
   - **LLM (Claude/ChatGPT)** = "the intern's brain".
   - **Workflow / automation (n8n)** = "a recipe card": step 1, step 2, step 3.
   - **Trigger** = "the doorbell that starts the recipe".
   - **Node** (n8n) = "one step / one Lego block on the recipe card".
   - **JSON** = "a labelled shopping list", e.g. `{ "product": "Steel Bolts", "qty": 40 }`. Never go deeper than this.
   - **Webhook** = "a doorbell another app can press".
   - **Human-in-the-loop** = "the manager's signature before the check goes out".
2. Speak like a friendly mentor. Short sentences. "You" and "we". No jargon walls.
3. Use **supply chain examples only**: stock-outs, reorder points, purchase orders, supplier delays, shipments, lead times, demand.
4. Reassure often: "If this feels new, that's normal." "You can't break anything in the test system."
5. Every video has at least one **"Pause & Think"** moment (a question shown on screen; the viewer pauses and answers) and ends with a clear recap of 3 key takeaways.
6. Keep it engaging: open loops ("in 10 minutes you'll see the agent do something that saves 5 hours a week"), mini-stories, before/after comparisons, "common beginner mistakes" moments.

## The tool stack (no-code mix; all have free tiers or free trials)
- **ERP:** Odoo (free, runs in the browser; use a free Odoo Online trial / demo database). Modules used: Inventory, Purchase, Sales, Contacts.
- **AI brain:** Claude (claude.ai) and/or ChatGPT. Inside n8n we use the "AI Agent" node with a Claude or OpenAI chat model.
- **Workflow builder:** n8n (n8n.cloud free trial; mention self-hosting is optional and NOT needed). Make.com is mentioned once as an alternative.
- **Database:** Google Sheets as the beginner's database (Airtable mentioned as an alternative).
- **Outside APIs (free, no-key or free-key):** Open-Meteo weather API (no key), Frankfurter currency exchange API (no key), a public holiday API (Nager.Date, no key). Used for "supply chain risk" signals.
- **Notifications:** Gmail / email and Slack (optional) or Telegram.
- **Testing APIs without code:** just open the URL in the browser (Open-Meteo / Frankfurter return JSON in the browser), plus the n8n "HTTP Request" node.
- How the agent connects to Odoo: n8n has a built-in **Odoo node** (needs URL, database name, username, API key). Use it. Don't teach XML-RPC.

## The running case study (use in EVERY video)
**BrightLeaf Supplies**: a fictional mid-size distributor of industrial and packaging supplies, headquartered with its warehouse in Columbus, Ohio, USA, and customers across the US and Canada. All money is in US dollars. It runs on **Odoo**.
- **Sarah Mitchell**, Procurement & Inventory Manager. She spends ~12 hours a week copying ERP numbers into Excel, chasing suppliers on email, and building the Monday stock report. She is the hero; the learner is "Sarah".
- **Tom**, the warehouse lead. **Mr. Harrison**, the operations director, who wants the Monday report.
- The agent we build across the course is called **"Stocky", BrightLeaf's inventory & procurement agent.**
- Sample products (use these SKUs and names consistently):
  | SKU | Product | Unit cost (USD) | Reorder point | Typical lead time (days) | Main supplier |
  |---|---|---|---|---|---|
  | BL-1001 | Steel Hex Bolts M10 (box of 100) | 12.50 | 80 | 7 | Apex Fasteners (Columbus, OH) |
  | BL-1002 | Corrugated Shipping Box 18x12x10 | 0.85 | 1500 | 5 | PackRight Industries (Chicago, IL) |
  | BL-1003 | Stretch Wrap Film 500mm | 9.20 | 200 | 6 | PackRight Industries (Chicago, IL) |
  | BL-1004 | Industrial Safety Gloves (pair) | 2.40 | 600 | 10 | SafeHands Co. (Monterrey, Mexico) |
  | BL-1005 | Pallet Jack Wheels (set) | 38.00 | 25 | 21 | Global Lift Parts (Shenzhen) |
  | BL-1006 | Packing Tape 48mm (roll) | 1.10 | 1000 | 5 | PackRight Industries (Chicago, IL) |
  | BL-1007 | Hydraulic Oil 20L | 54.00 | 40 | 14 | Gulf Lubricants (Dubai) |
  | BL-1008 | LED Warehouse Light 150W | 72.00 | 30 | 28 | Shenzhen BrightTech (Shenzhen) |
  | BL-1009 | Nylon Cable Ties (pack of 500) | 6.30 | 150 | 7 | Apex Fasteners (Columbus, OH) |
  | BL-1010 | Forklift Battery Water Kit | 19.75 | 20 | 12 | Global Lift Parts (Shenzhen) |
- Supplier cities matter for the risk agent (weather in Shenzhen/Dubai/Monterrey, USD→CNY/MXN/AED exchange rates, public holidays in China/UAE/Mexico/US).

## Course outline (10 videos = 240 min)
| # | Title | Length | Core outcome |
|---|---|---|---|
| 1 | Welcome: Why Your ERP Needs an AI Agent | 20 min | Understand agents vs chatbots vs automation, see the final "Stocky" demo, and map the course |
| 2 | ERP Demystified: A Supply Chain Pro's Tour of Odoo | 24 min | Set up a free Odoo trial, load the BrightLeaf products, and understand modules, records and fields |
| 3 | APIs Explained Like You're Ordering at a Restaurant | 24 min | Understand API, endpoint, request/response, API key and JSON; call a live API from the browser |
| 4 | Databases Without Fear: Your Data's Home | 22 min | Tables, rows, columns, IDs, clean data; Google Sheets as the agent's database; fix messy data |
| 5 | Your No-Code Toolkit: Setting Up n8n and Your AI Brain | 24 min | Create n8n and Claude/OpenAI accounts, store credentials safely, build a "hello world" workflow |
| 6 | Your First Agent: Stocky Reads the ERP | 26 min | Connect n8n to Odoo, pull stock levels, and let the AI agent answer "What's running low?" |
| 7 | Agents That Take Action: Draft Purchase Orders with Human Approval | 26 min | The agent drafts RFQs/POs in Odoo for low stock, but only after the human approves on email/Slack |
| 8 | Seeing Beyond the ERP: Connecting Outside APIs for Supply Chain Risk | 24 min | Weather, currency and holiday APIs feed a supplier risk score; the agent explains the risks in plain English |
| 9 | Memory & Reports: Logging to a Database and the Monday Report | 24 min | The agent writes every decision to Google Sheets and auto-sends Mr. Harrison's Monday stock report |
| 10 | Going Live Safely + Your Capstone Project | 26 min | Permissions, security, testing, costs, error handling, the go-live checklist and the capstone build |

## Script format (for every paid video)
Each script is a Markdown file using EXACTLY these section header conventions (the converter colours them):
- `## [ON CAMERA] <Section name> (mm:ss–mm:ss)`: the presenter talks to camera. Write the **full word-for-word lines** to say.
- `## [SCREEN RECORDING] <Section name> (mm:ss–mm:ss)`: screen capture with voice-over. For each step use:
  - `**SHOW:**` what is on screen / what to click (exact menu names in Odoo/n8n)
  - `**SAY:**` the voice-over, word for word (conversational, beginner-friendly)
  - Optional `**ON-SCREEN TEXT:**` for captions/callouts/lower thirds
- `> PAUSE & THINK: ...`: an engagement question shown on screen.
- `> PRO TIP:` / `> BEGINNER MISTAKE:` callouts.

Every paid video must contain:
1. `[ON CAMERA] Intro`: hook (story/question/surprising number), what they'll learn, why it matters to them (~1.5–2.5 min)
2. Several `[SCREEN RECORDING]` sections (the bulk)
3. **At least 2 `[ON CAMERA]` middle sections** (e.g. "Real-World Story", "Why This Matters", "Common Mistakes", "Pause & Think"), 1–2 min each, breaking up the screen time
4. `[ON CAMERA] Outro`: 3 key takeaways, the activity assignment (name the activity file), quiz reminder, and a teaser for the next video (~1.5–2 min)
5. The section timestamps must add up to the video length.

Script word count guide: on-camera ≈ 140 words/min spoken. Screen recordings have more pauses, so ≈ 100–120 words/min of SAY text. **A 24-minute script should be about 2,600–3,200 words.** Be rich and specific: real menu names, real example data, real numbers.

Top of every script file:
```
# Video N: <Title>
**Course:** The ERP Agent Blueprint | **Length:** XX min | **Level:** Beginner
**Learning objectives:** (3–5 bullets)
**Before recording, prepare:** (accounts, tabs, sample data to have open)
**Resources for this video:** activity file name(s), quiz file name
```

## Quiz format
- 10 questions per video: mostly multiple choice (4 options A–D), plus 2 scenario-based ("Sarah wants to… what should she do?") and 1 true/false.
- Beginner-friendly, testing understanding, not trivia.
- File has two parts: the **Questions** section (learner-facing) and then an **Answer Key** section with the correct answer + a 1–2 sentence explanation for each.

## Activity files
- Hands-on, 20–40 minutes, doable by a non-technical person.
- Usually an **.xlsx** (with an "Instructions" sheet first, then data sheets, with clear headers, colours and frozen header rows; add formulas where useful) and/or a **.docx** worksheet with fill-in sections.
- Always tied to BrightLeaf or the learner's OWN company ("Now try it with your company").

## File/folder layout
```
ERP-Agent-Blueprint/
  00_Free_Lesson/
    source/  (markdown sources)
    Free_Video_Script.docx, Free_Activity_*.xlsx / .docx
  Video_01/ ... Video_10/
    source/
      V01_Script.md, V01_Quiz.md, V01_Activity.md (if docx activity)
    V01_Script.docx, V01_Quiz.docx, V01_Activity_<name>.xlsx/.docx
```
Convert markdown to docx with:
`/Users/vishnuma/Documents/Cursor/Skool/.venv/bin/python /Users/vishnuma/Documents/Cursor/Skool/ERP-Agent-Blueprint/_tools/md2docx.py <input.md> <output.docx>`
Build xlsx files with openpyxl using the same venv python (write the generator script in the video's `source/` folder).

PDF/PPT slide resources are NOT created now (we're waiting for the brand theme). Don't create them.

## CANONICAL STARTING STOCK (added mid-production — use these exact numbers everywhere)
On hand: BL-1001 145, BL-1002 1,180, BL-1003 260, BL-1004 420, BL-1005 18, BL-1006 1,850, BL-1007 31, BL-1008 34, BL-1009 410, BL-1010 26.
Below reorder point: BL-1002, BL-1004, BL-1005, BL-1007. Max stock = 2 × reorder point. Suggested order qty = reorder point × 2 − on hand.

## SETTING UPDATE (overrides everything above — US-based company, no Indian references)
Characters: Sarah Mitchell (Procurement & Inventory Manager), Tom (warehouse lead), Mr. Harrison (operations director), Jake (intern story in V6).
BrightLeaf Supplies: distributor headquartered with its warehouse in **Columbus, Ohio, USA**; customers across the **US and Canada**. All money in **US dollars ($)**. No rupees, INR, lakh, crore, GST, Diwali, Indian cities or Indian public holidays anywhere.
Suppliers (names unchanged, locations updated):
| Supplier | City | Country | Currency | Lat, Long |
|---|---|---|---|---|
| Apex Fasteners | Columbus, OH | USA | USD | 39.96, -83.00 |
| PackRight Industries | Chicago, IL | USA | USD | 41.88, -87.63 |
| SafeHands Co. | Monterrey | Mexico | MXN | 25.69, -100.32 |
| Global Lift Parts | Shenzhen | China | CNY | 22.54, 114.06 |
| Shenzhen BrightTech | Shenzhen | China | CNY | 22.54, 114.06 |
| Gulf Lubricants | Dubai | UAE | AED (pegged ≈3.67/USD) | 25.20, 55.27 |
Currency API: https://api.frankfurter.dev/v1/latest?from=USD&to=CNY,MXN
Real values: 17 Nov 2026 → CNY 6.6661, MXN 18.4639. 16 Oct 2026 → CNY 6.6862, MXN 18.3835 (peso moved ~0.4%, yuan ~0.3%).
Holiday API (Nager.Date) covers US, MX and CN (CN partial: only Oct 1 listed, not full Golden Week). It returns nothing for AE (UAE) — keep the "gap" lesson using UAE only, with a written UAE holiday list (UAE National Day 2–3 Dec).
Real upcoming holidays: US Thanksgiving 26 Nov 2026, US Christmas 25 Dec; Mexico Revolution Day 16 Nov 2026, Christmas 25 Dec.
Pricing message: $49 is NOT a one-time course fee. It is the price to UPGRADE to the paid tier of the Agentic SCM Skool community, which unlocks this course AND all the other paid content in the community. Say "just $49" / "only $49".
