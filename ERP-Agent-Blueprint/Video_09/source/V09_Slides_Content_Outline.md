# Video 9 Slides: Content Outline
**Video:** Memory & Reports: Logging to a Database and the Monday Report (24 min)
**Note:** Content outline only. Build the deck later with the brand theme.

---

### Slide 1: Title
- "Memory & Reports"
- Subtitle: Logging every decision and auto-sending the Monday Report
- Video 9 of The ERP Agent Blueprint
- **Suggested visual:** Stocky (friendly robot/intern icon) holding a notebook in one hand and an envelope marked "Monday Report" in the other.

### Slide 2: The Monday Morning Problem
- Mr. Harrison: "Who approved the extra stretch wrap, and why?"
- Sarah can't find the answer: inbox, WhatsApp, memory
- The Monday report takes ~3 hours a week = 150+ hours a year
- **Suggested visual:** Sarah at her desk surrounded by sticky notes, email icons and a WhatsApp bubble with a big red question mark; a clock showing 9:40 am.

### Slide 3: What You'll Build Today
- A "Decision Log" tab that Stocky writes into automatically
- Stocky's chat can answer "what did we decide?"
- The Monday Report: every Monday 7 am, emailed to Mr. Harrison
- A simple dashboard chart linked from the email
- **Suggested visual:** Three-step strip: Notebook icon → Robot reading notebook → Envelope landing in an inbox at 7:00.

### Slide 4: If It Isn't Written Down, It Didn't Happen
- Agents forget everything between runs (the intern whose memory resets at 6 pm)
- Log = Memory (for the agent) + Audit trail (for the humans)
- **Suggested visual:** Split image: left, an intern with a blank thought bubble labelled "Run #2"; right, the same intern reading a notebook labelled "Decision Log", thought bubble "I already ordered bolts on Tuesday".

### Slide 5: Anatomy of a Decision Log
- Columns: Log ID, Timestamp, SKU, Product, Stock On Hand, Action, Approved By, Risk Score, Notes
- One fact per cell; notes written for humans
- **Suggested visual:** A screenshot-style mock of the Google Sheet with the example row for BL-1003 highlighted, callout arrows on "Approved By" and "Notes".

### Slide 6: Clean-Data Habits for Logs
- Exact tab name: "Decision Log"
- Freeze the header row; set Timestamp = Date time, Risk Score = Number
- Never rename columns after go-live
- **Suggested visual:** Checklist with three green ticks next to small icons (tag, snowflake for freeze, number "7.8").

### Slide 7: The Append Row Node = Stocky's Pen
- Google Sheets node → Sheet Within Document → Append Row
- Map Each Column Manually; drag data from earlier steps
- Append = add to the bottom, never overwrite
- **Suggested visual:** n8n canvas diagram: Gmail approval → "Create RFQ" (Odoo) → "Append Row" (Google Sheets) with a pen icon on the last node.

### Slide 8: Log Every Branch
- Approved → "RFQ created" (qty = reorder point × 2 − on hand)
- Rejected → "Rejected" + Sarah's reason
- Risk alerts (score > 7) → "Risk alert"
- **Suggested visual:** Decision tree diagram with three branches each ending at the same notebook icon.

### Slide 9: Memory in Action
- New tool in the chat agent: Google Sheets "Get Rows" on the Decision Log
- Q: "Did we order stretch wrap recently? Who approved it?"
- A: 9 Nov, 250 rolls, stock 150 vs 200, approved by Sarah, risk 3.1
- **Suggested visual:** Chat bubble mock-up showing the question and Stocky's answer, with a "10 seconds" stopwatch badge.

### Slide 10: Story: The Order That Happened Twice (Four Times)
- No log + daily run + 14-day lead time = 4 identical orders
- $20,000+ of seals on a shelf for 8 months
- Fix: "Check the Decision Log before suggesting a reorder"
- **Suggested visual:** Four identical purchase-order papers stacked, a calendar Mon–Thu, and a dusty shelf of boxes.

### Slide 11: The Monday Report Recipe Card
- Schedule Trigger (Mon, 7:00, America/New_York)
- Odoo products → Decision Log (last 7 days) → Suppliers + risk scores
- Aggregate + Merge → AI Agent → Gmail
- **Suggested visual:** Left-to-right flow diagram with 6 Lego-block nodes; a doorbell icon on the first block and an envelope on the last.

### Slide 12: Aggregate = Putting Receipts in an Envelope
- 10 items in → 1 item out
- Without it: 10 reports. With it: 1 report
- **Suggested visual:** Ten loose receipts flowing into one envelope, then three envelopes into one parcel labelled "products / decisions / suppliers".

### Slide 13: The Report Prompt (Structure)
- System: who Stocky is, who reads it, "never invent numbers"
- Data → Calculate (formulas spelled out) → Format (6 sections, < 350 words)
- **Suggested visual:** A prompt card split into three coloured blocks: DATA (blue), CALCULATE (green), FORMAT (orange).

### Slide 14: The Example Monday Report
- Headline: pallet jack wheels + hydraulic oil are the top risks
- Stock health 60% | Money tied up $16,153 | 4 SKUs below ROP | 4 RFQs ($6,935)
- Top 5 risks, items reordered, on hold, "Needs your decision" (max 2)
- **Suggested visual:** A phone mock-up showing the email with four KPI tiles at the top.

### Slide 15: Never Trust, Always Verify
- Check the AI's numbers against your spreadsheet for the first 3–4 Mondays
- If they disagree, the spreadsheet wins; tighten the prompt
- **Suggested visual:** Magnifying glass over two numbers ($16,153 in the email and $16,153.00 in Excel) with a green tick.

### Slide 16: The Dashboard + Gmail
- Dashboard tab: COUNTIFS per week → column chart
- Share as Viewer only; link in the email
- Gmail: Send, Email Type = HTML, attribution off; then Activate/Publish
- **Suggested visual:** A 4-bar column chart (RFQs per week) next to a Gmail envelope with a "View only" eye icon.

### Slide 17: Common Mistakes
- Renaming columns • Humans editing the log • Trusting week-one numbers blindly • Reports that are too long
- Alternative database: Airtable works the same way
- **Suggested visual:** Four "warning sign" tiles, each with a small icon.

### Slide 18: Recap + Your Activity
- 1. If it isn't written down, it didn't happen
- 2. Append Row on every branch
- 3. A great report is a great prompt
- Activity: V09_Activity_Decision_Log_Dashboard.xlsx • Quiz: V09_Quiz
- Next: Video 10, Going Live Safely + Your Capstone Project
- **Suggested visual:** Three numbered takeaway cards and a "finale" banner with a rocket for Video 10.
