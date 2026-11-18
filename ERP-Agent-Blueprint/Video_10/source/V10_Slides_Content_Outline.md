# Video 10 Slides: Content Outline
**Video:** Going Live Safely + Your Capstone Project (26 min)
**Note:** Content outline only. Build the deck later with the brand theme.

---

### Slide 1: Title
- "Going Live Safely + Your Capstone Project"
- Video 10 of The ERP Agent Blueprint: the finale
- **Suggested visual:** Stocky standing at a "LIVE" switch with a shield on its chest; confetti in the corners.

### Slide 2: Sarah, 10 Weeks Later
- Before: 12 hours/week of copying, chasing and reporting
- Now: Stocky reads, acts with approval, checks risks, logs and reports
- **Suggested visual:** Before/after split: a stressed Sarah with piles of paper vs a relaxed Sarah with a coffee and one clean inbox.

### Slide 3: Mr. Harrison's Four Questions
- Is it safe? What if it orders 10,000 boxes? What if a password is stolen? What does it cost? What if it breaks at 2 am?
- **Suggested visual:** Four speech bubbles around Mr. Harrison, each with an icon: shield, box stack, key, coin, alarm clock.

### Slide 4: Least Privilege = The Right Key Card
- The intern doesn't get the master key
- Stocky Bot: Inventory = User, Purchase = User, everything else blank
- **Suggested visual:** A hotel corridor with doors labelled Inventory and Purchase open (green), and Sales, Accounting, HR, Settings locked (red padlocks).

### Slide 5: Two Locks on the Same Door
- Lock 1: Sarah's email approval (Video 7)
- Lock 2: Odoo Purchase Order Approval above $5,000
- **Suggested visual:** A door with two padlocks, one labelled "Sarah approves" and one labelled "Odoo > $5,000".

### Slide 6: The Bot's Own API Key
- Log in as Stocky Bot → My Profile → Account Security → New API Key
- Name it with purpose + date: n8n-Stocky-2026-11
- Update the n8n credential: "Odoo – Stocky Bot (LIVE)"
- **Suggested visual:** A key card labelled "Stocky Bot – n8n – Nov 2026" sliding into an n8n credential slot with a green tick.

### Slide 7: Three Rules for Keys
- Never share (no email, chat, screenshot, sheet, prompt, Loom)
- Rotate every 90 days or when someone leaves (new first, old last)
- Leaked? Delete it immediately
- **Suggested visual:** Three icons: a key with a "no sharing" sign, a circular arrow with "90 days", and a key going into a shredder.

### Slide 8: Cost Controls
- Monthly spend limit $20 with an alert at $10
- Max Iterations = 10 on the AI Agent node
- **Suggested visual:** A car speedometer-style gauge capped at $20, with a warning light at $10.

### Slide 9: What Stocky Costs per Month
- ~219 runs/month • AI ≈ $5 • n8n starter ≈ $24 • Sheets/Gmail free • ≈ $32/month all in
- "Less than a team lunch" (check current pricing pages)
- **Suggested visual:** A stacked bar: n8n $24, AI $5, buffer $3 = $32, next to a lunch plate icon.

### Slide 10: Story: The Weekend the Bot Ran Wild
- Admin account, no spend limit, no test database, no error alert, no log, no backup
- 40 duplicate emails → hundreds of runs → thousands of wrong prices
- **Suggested visual:** A timeline Friday → Saturday → Monday with escalating red icons; six missing safety nets shown as empty hooks.

### Slide 11: Test Database First
- odoo.com → My Databases → Duplicate → "For testing purposes"
- Two credentials: LIVE and TEST (always in the name)
- **Suggested visual:** Two Odoo boxes side by side: "LIVE: real money" (red border) and "TEST: sandbox" (green border, toy shovel icon).

### Slide 12: The Smoke Alarm: Error Trigger Workflow
- "Stocky – Error Alerts": Error Trigger → Gmail to Sarah
- Connect in each workflow: Settings → Error Workflow
- Fires on automatic runs only (test with a scheduled test copy)
- **Suggested visual:** Flow diagram: four Stocky workflows with dotted lines into one smoke alarm node, which sends an envelope to Sarah.

### Slide 13: Go Live: Activate, Version, Maintain
- Activate (Publish) the Error Alerts first, then the rest
- Duplicate → edit copy on TEST → test → swap; download backups
- **Suggested visual:** A three-step staircase: "Backup copy" → "Test on TEST" → "Swap to LIVE".

### Slide 14: The 10-Minute Friday Check
- Failed runs • Monday report matched • Decision Log skim • 3 spot-checks • AI spend • n8n usage • Rejections → new rules • Key rotation due?
- **Suggested visual:** A car-service checklist clipboard with 8 tick boxes and a small stopwatch showing 10:00.

### Slide 15: Measuring ROI
- (12 − 2) hours × $20 × 48 weeks = $9,600 a year
- Cost ≈ $384 a year → ≈ 25x return, pays back in week 1
- **Suggested visual:** A balance scale: one side "$384 tools", the other "$9,600 time saved", tipping heavily.

### Slide 16: The One-Page Pitch
- Problem (hours + pain) • What it does (3 bullets) • Proof (log + 1 report) • Cost + safety nets • The ask (3-month pilot)
- **Suggested visual:** A single A4 page mock-up with five labelled blocks.

### Slide 17: Your Capstone in 5 Steps
- 1 Pick ONE use case • 2 Design with the brief • 3 Build on TEST • 4 Test with 10 questions (5 normal, 3 tricky, 2 refuse) • 5 Post a 2-minute Loom
- **Suggested visual:** A five-stop roadmap ending at a flag labelled "Community".

### Slide 18: Capstone Ideas
- Late shipment chaser • Slow-moving stock spotter • Supplier quote comparer • "Where's my order?" helper • Stocky for your products
- **Suggested visual:** Five idea cards with icons: truck with clock, dusty box, three price tags, question-mark parcel, Stocky robot.

### Slide 19: Your Journey: Video 1 to Video 10
- Agents → ERP → APIs → Databases → n8n + brain → Stocky reads → Stocky acts → Outside data → Memory + reports → Live safely
- **Suggested visual:** A winding path with 10 milestones, Sarah walking from "nervous about tech" at the start to "agent builder" at the summit.

### Slide 20: Congratulations
- 3 takeaways: least privilege + protected keys + limits • test, alert, back up, maintain • measure hours and pitch in time/money/risk
- Activities: V10_Activity_GoLive_Checklist_ROI.xlsx + V10_Activity_Capstone_Brief.docx • Final quiz: V10_Quiz
- Post your capstone in the community with the "Capstone" tag
- **Suggested visual:** A graduation cap on Stocky, confetti, and a big "Go build it" button pointing to the community.
