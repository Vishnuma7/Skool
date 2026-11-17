# Video 1 Slides: Content Outline
**Video:** Welcome: Why Your ERP Needs an AI Agent | **Length:** 20 min | **Slides:** 16
*Content only. Visual design and brand theme will be applied later. Suggested visuals are descriptions, not final assets.*

---

### Slide 1: Title
- The ERP Agent Blueprint
- Video 1: Welcome: Why Your ERP Needs an AI Agent
- Beginner | 20 minutes
- **Suggested visual:** Hero image of a friendly cartoon robot-intern ("Stocky") holding a clipboard in front of warehouse shelving.

### Slide 2: The 576-Hour Problem
- 12 hours a week copying ERP numbers, chasing suppliers, building the Monday report
- x 48 working weeks = **576 hours a year**
- = more than 14 working weeks (three and a half months)
- **Suggested visual:** Big number "576" with a calendar graphic where 14 weeks are shaded in red.

### Slide 3: Meet BrightLeaf Supplies
- Distributor of industrial and packaging supplies, warehouse in Pune
- Customers across India and the Middle East; runs on Odoo
- Priya Sharma (Procurement & Inventory), Ravi (Warehouse), Mr. Kapoor (Operations Director)
- **Suggested visual:** Simple "cast" card with three illustrated avatars and their roles, plus a small map pin on Pune.

### Slide 4: The Promise
- By the end you will have built a working AI agent that:
  - reads your ERP
  - checks outside data (weather, currency, holidays)
  - writes to a database
  - alerts you
- Without writing a single line of code
- **Suggested visual:** Four icons in a row (filing cabinet, cloud/currency/calendar, spreadsheet, envelope) connected by arrows to Stocky.

### Slide 5: Stocky's Monday 7:00 AM Email
- Checked 10 products, 4 below reorder point
- BL-1002 boxes 1,180/1,500 | BL-1004 gloves 420/600 | BL-1005 wheels 18/25 | BL-1007 hydraulic oil 31/40
- Total suggested spend: USD 7,281, with Approve / Decline buttons
- **Suggested visual:** Screenshot of the Gmail message from Stocky, with the BL-1005 risk line highlighted.

### Slide 6: Behind the Curtain
- Timer > Odoo > AI Agent > Weather / Currency / Holidays > Google Sheet log > Email & approval > Draft RFQs
- Every box is one step. No code.
- **Suggested visual:** Screenshot of the full Stocky workflow in n8n, with numbered labels over each node.

### Slide 7: The Human Click
- Stocky prepares; Priya approves
- 4 draft RFQs appear in Odoo only after "Approve"
- Monday morning work: from about 3 hours to 90 seconds
- **Suggested visual:** Before/after split: left, a stressed person with stacks of spreadsheets; right, a single "Approve" button and a coffee cup.

### Slide 8: Priya's Monday Before Stocky
- Export, copy, paste, fix broken formulas, highlight red, email suppliers
- Stretch wrap was on the report... in row 41 of 60
- The job asked her to be a copy machine, a calculator and an analyst at once
- **Suggested visual:** A long spreadsheet with one red row buried near the bottom, circled.

### Slide 9: Three Words, Three Different Things
- **Chatbot:** talks. No access to your systems. You do the work.
- **Automation:** follows a fixed recipe. Fast, reliable, no judgement.
- **AI Agent:** reasons toward a goal, uses tools, acts with approval.
- **Suggested visual:** Three-column comparison table with an icon per column (speech bubble, recipe card, intern with tools).

### Slide 10: Chatbot Test
- Question: "How many Steel Hex Bolts M10 do we have right now?"
- Answer: "I don't have access to your inventory system."
- A brilliant brain in a room with no doors
- **Suggested visual:** Screenshot of the claude.ai reply, next to an illustration of a brain in a closed room.

### Slide 11: Automation Test
- Rule: IF quantity on hand < reorder point THEN email
- Pallet jack wheels at 26 (reorder point 25): stays silent, even with rain + holiday + 21-day lead time
- **Suggested visual:** Screenshot of the n8n IF node condition, with a "26 > 25 = no alert" callout.

### Slide 12: Agent Test
- Stocky's instructions in plain English (system message)
- Tools: Odoo, weather, currency, holidays, Google Sheets
- Nobody wrote a "Shenzhen + rain + holiday" rule. It worked it out.
- **Suggested visual:** Screenshot of the AI Agent node showing the System Message, with tool icons attached below.

### Slide 13: Pause & Think: Agent or Not?
- 1. Copy yesterday's sales orders into a Google Sheet every night
- 2. Read 40 supplier emails and work out what's delayed
- 3. Rewrite a firm email to a late supplier
- Answers: Automation / AI Agent / Chatbot
- **Suggested visual:** Three task cards with a "pause" icon; reveal animation shows the answers as coloured labels.

### Slide 14: The Five Parts of Every Agent
- 1 Brain (LLM) | 2 Instructions | 3 Tools | 4 Memory | 5 Human supervisor
- Missing one? You don't have an agent you can trust.
- Beginner mistake: full power on day one. Start with "read and suggest".
- **Suggested visual:** Intern figure in the centre with five labelled arrows (brain, clipboard, toolbox, notebook, manager's signature).

### Slide 15: Your Course Map and Toolkit
- Videos 1-5: foundations (agents, ERP, APIs, databases, toolkit)
- Videos 6-10: build Stocky (read ERP, draft POs, outside risk, memory & report, go live + capstone)
- Tools: Odoo, n8n, Claude / ChatGPT, Google Sheets, Gmail, Open-Meteo, Frankfurter, Nager.Date (all free tiers/trials)
- **Suggested visual:** A road with 10 milestone flags, and a row of tool logos underneath.

### Slide 16: Recap + Your Activity
- A chatbot talks, an automation follows, an agent reasons and acts
- Every agent = brain + instructions + tools + memory + human
- Goal: give Priya back her 576 hours, not replace her
- Activity: **V01_Activity_Agent_or_Not.xlsx** (sort 20 tasks + your Automation Wishlist) | Quiz: 10 questions
- Next: ERP Demystified: A Supply Chain Pro's Tour of Odoo
- **Suggested visual:** Three takeaway tiles, a thumbnail of the activity workbook, and a "Next video" card with an Odoo screenshot.
