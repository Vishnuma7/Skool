# Video 6 Slides: Content Outline
**Video:** Your First Agent: Stocky Reads the ERP | **Length:** 26 min | **Slides:** 18
(Content outline only. Final design will follow the brand theme.)

---

### Slide 1: Title
- **Your First Agent: Stocky Reads the ERP**
- The ERP Agent Blueprint · Video 6 · 26 min
- **Suggested picture:** The Stocky robot standing in front of an open filing cabinet (Odoo), holding a clipboard with "What's running low?" written on it.

### Slide 2: 40 Minutes vs 10 Seconds
- Priya's morning: export from Odoo → open last week's Excel → VLOOKUP → colour red rows → email Ravi ≈ 40 min/day (3+ hours/week)
- With Stocky: type "What's running low?" ≈ 10 seconds
- **Suggested picture:** Before/after split. Left: a five-step manual chain with a clock showing 40 min. Right: one chat bubble and a stopwatch showing 10 sec.

### Slide 3: What We Build Today
- Stocky v1 = Chat Trigger + AI Agent + Claude (brain) + Simple Memory (notepad) + 3 Odoo tools (hands)
- Read-only: Stocky can look, not touch
- **Suggested picture:** Labelled diagram of the n8n canvas: doorbell (Chat Trigger) → robot (AI Agent), with three plugs underneath: brain (Anthropic Chat Model), notepad (Simple Memory), three hands (Odoo tools).

### Slide 4: A Brain Without Tools Is Just a Chatbot
- First test with no tools: "How many Pallet Jack Wheels do we have?" → "I don't have access to your inventory data."
- Agent = brain + tools + instructions
- **Suggested picture:** Two robots side by side: one with no arms shrugging ("Chatbot: I can only talk"), one with arms reaching into a cabinet ("Agent: I can look it up").

### Slide 5: Simple Memory = The Intern's Notepad
- Remembers the last N messages of THIS conversation (we set 10)
- Makes follow-ups work: "And what about the hydraulic oil?"
- Does NOT remember forever
- **Suggested picture:** A goldfish (no memory) next to a spiral notepad with the last few questions jotted down; caption "Context Window Length = 10".

### Slide 6: Three Drawers, Three Tools
- Drawer 1 `get_products_and_stock` → product.product: default_code, name, qty_available, standard_price
- Drawer 2 `get_reorder_rules` → stock.warehouse.orderpoint: product_id, product_min_qty, product_max_qty
- Drawer 3 `get_supplier_info` → product.supplierinfo: partner_id, product_tmpl_id, price, min_qty, delay
- **Suggested picture:** A three-drawer filing cabinet, each drawer labelled with its plain-English name, and a robot hand reaching into each; Odoo model names in small text on the drawer fronts.

### Slide 7: Setting Up an Odoo Tool
- Credential: Odoo – BrightLeaf · Resource: Custom Resource · Operation: Get Many · Return All: ON
- Fields to Include: only what's needed
- Tool Description: the label on the drawer (plain English)
- Watch out: in Odoo, `delay` = lead time in days, not "late"
- **Suggested picture:** Annotated screenshot of the Odoo Tool settings panel with four numbered callouts (Credential, Custom Resource, Get Many, Fields to Include).

### Slide 8: Give the Intern the Page, Not the Binder
- Empty "Fields to Include" = dozens of fields per product = more tokens, more cost, more confusion
- **Suggested picture:** A thick lever-arch binder crossed out next to a single clean sheet showing four fields; a small coin pile shrinking between them.

### Slide 9: The Prompt Anatomy
- **Role** · **Goal** · **Tools** · **Rules** · **Output format**
- A system prompt is a job description
- **Suggested picture:** A job-description document split into five coloured bands, each labelled with one part of the anatomy, with a hand-written "Stocky" name badge clipped to the top.

### Slide 10: Rules Are Where Your Expertise Lives
- "Only answer from tool data." · "Say I don't know."
- Running low = on hand ≤ reorder point
- Watch list = above reorder point by 15% or less
- Read-only: can't create, change or delete
- **Suggested picture:** A supply chain manager (Priya) writing rules on a whiteboard, with two highlighted in red: "Never guess" and "Say I don't know".

### Slide 11: Output Format
- One-line answer first
- Table: SKU | Product | On hand | Reorder point | Gap
- Sorted by % shortfall
- Source line: "Source: Odoo (live) – tools used"
- **Suggested picture:** A mock chat answer card showing the low-stock table with red highlights and the source line underlined.

### Slide 12: "What's Running Low?" The Answer
- BL-1004 Safety Gloves 420 / 600 (-180) · BL-1005 Pallet Jack Wheels 18 / 25 (-7) · BL-1007 Hydraulic Oil 31 / 40 (-9) · BL-1002 Shipping Box 1,180 / 1,500 (-320)
- Watch list: BL-1008 LED Light 34 / 30
- Why are boxes last? Sorted by % shortfall (-21%) not units
- **Suggested picture:** Horizontal bar chart of the four low items showing on hand vs reorder point as a percentage (gloves -30%, wheels -28%, oil -23%, boxes -21%), with BL-1008 shown in amber.

### Slide 13: Supplier & Lead Time + Memory
- "Which supplier provides BL-1005 and what's the lead time?" → Global Lift Parts, 21 days, $38.00/set, MOQ 10
- Follow-up "And what about the hydraulic oil?" → Gulf Lubricants, 14 days (memory at work)
- **Suggested picture:** A world map with arrows from Shenzhen (21 days) and Dubai (14 days) to Pune, each arrow labelled with supplier and lead time.

### Slide 14: Pause & Think
- Which low item would you order FIRST? Compare gap with lead time
- Wheels: 7 below, 21-day lead time · Boxes: 320 below, 5-day lead time
- **Suggested picture:** Big yellow "Pause & Think" banner with two cards side by side (Wheels vs Boxes), each showing gap and lead time.

### Slide 15: Watch the Agent Think
- The agent loop: Think → Use a tool → Read the result → (repeat) → Answer
- Logs panel = step-by-step diary; Executions tab = permanent logbook
- JSON from Odoo = labelled shopping list: `{"partner_id": "Global Lift Parts", "price": 38.0, "delay": 21}`
- **Suggested picture:** A circular loop diagram with four stations (brain, hand, magnifying glass, speech bubble) and a small screenshot of the n8n Logs panel beside it.

### Slide 16: The Confident Intern (Hallucination)
- Rohan: "Tuesday, sir." The LED lights had a 28-day lead time
- AI produces the most likely-sounding words; without data it can still sound sure
- In supply chain, a confident wrong answer is worse than no answer
- **Suggested picture:** A cartoon intern giving a thumbs-up and saying "Tuesday!" while, in the background, a calendar shows the shipment still at the factory in Shenzhen.

### Slide 17: Catch It, Then Fix It
- Weak prompt ("You are a helpful inventory assistant") → invents an arrival date for PO P00027
- Full prompt → "I don't know. That information isn't in the Odoo data I can see... check Purchase → Orders."
- 5 ways to reduce hallucination: real data via tools · only answer from tool data · say "I don't know" · ask for the source · test with trap questions
- **Suggested picture:** Two chat screenshots side by side: left with a red "Made up!" stamp, right with a green "Honest + useful" stamp.

### Slide 18: Recap + Your Activities
- 1) Agent = brain + tools + instructions; clear tool names, descriptions and fields
- 2) Prompt anatomy: Role, Goal, Tools, Rules, Output format
- 3) Trust but verify: logs, ERP checks, trap questions
- Activities: **V06_Activity_Stocky_Prompt_Builder.docx** and **V06_Activity_Test_Question_Bank.xlsx** (target 18/20) · Then: Video 6 quiz
- Next: **Video 7: Agents That Take Action: Draft Purchase Orders with Human Approval**
- **Suggested picture:** Three ticked checkboxes, both activity file icons, and a teaser of an email "Approve PO for BL-1005?" with Approve / Reject buttons and a manager's pen signature.
