# Video 7 Slides: Content Outline
**Video:** Agents That Take Action: Draft Purchase Orders with Human Approval | **Length:** 26 min | **Slides:** 18
*(Content outline only. Final slides will be designed later in the brand theme.)*

---

### Slide 1: Title
- **Agents That Take Action**
- Draft purchase orders with human approval
- The ERP Agent Blueprint · Video 7
- **Suggested visual:** Stocky (friendly robot-intern mascot) holding a clipboard with a draft RFQ, Priya beside it holding a pen.

### Slide 2: From "What's low?" to "Shall I order it?"
- Video 6: Stocky can **read** and answer
- Today: Stocky **prepares the order** and asks for a signature
- Saves Priya ~25 minutes every morning (~2.5 hours a week)
- **Suggested visual:** Before/after split. Left: Priya clicking through Odoo screens with a clock showing 25 min. Right: Priya with coffee tapping "Approve" on her phone, clock showing 40 sec.

### Slide 3: The Traffic-Light Rule
- GREEN = **Read** (look at stock, prices, suppliers). Worst case: a wrong answer.
- AMBER = **Draft** (create an RFQ, nothing sent). Worst case: delete in 2 clicks.
- RED = **Commit** (confirm PO, email supplier, approve payment). Real money.
- **Suggested visual:** Large vertical traffic light with an example icon next to each lamp (magnifying glass, draft document with "DRAFT" watermark, signed cheque).

### Slide 4: Human-in-the-loop = the manager's signature
- The agent prepares the paperwork; a human signs
- Would you let a week-one intern sign POs? Neither should your agent.
- **Suggested visual:** A cheque on a desk with an empty signature line and a hand holding a pen hovering over it; Stocky stands behind holding the cheque book.

### Slide 5: Pause & Think
- Name one GREEN, one AMBER and one RED task in your job
- Which would you hand to an intern first?
- **Suggested visual:** Three empty coloured boxes (green, amber, red) with "your task here" placeholders.

### Slide 6: Today's recipe card (the whole workflow)
- 8am doorbell → Read Odoo → Keep low SKUs → Calculate → Find supplier → Stocky writes request → Over $2,000? → Ask a human → Approved? → Draft RFQ → Confirm back
- **Suggested visual:** Simplified horizontal flow of the 12 n8n nodes with colour bands: green section (read), a grey "decide" section, an orange "human" section, an amber "draft" section.

### Slide 7: The 8am doorbell (Schedule Trigger)
- Trigger Interval: Days · Every 1 day · 8am · Minute 0
- Set **Settings → Timezone → Asia/Kolkata**
- **Suggested visual:** Alarm clock icon ringing a doorbell, with two world clocks underneath ("8:00 Pune" vs "8:00 New York = 6:30pm Pune") to show the timezone trap.

### Slide 8: Reading stock: only five fields
- Odoo node → Custom Resource → product.product → Get Many → Return All
- Fields: Internal Reference (SKU), Name, Quantity On Hand, Min (reorder point), Cost
- **Suggested visual:** A product "record card" with 100+ greyed-out fields and only five highlighted in green.

### Slide 9: Who's low? (Filter node)
- Keep if: On hand < Reorder point AND reorder point > 0
- Result: 4 kept (BL-1002, BL-1004, BL-1005, BL-1007), 6 discarded
- **Suggested visual:** A kitchen sieve: 10 product boxes go in the top, 4 fall through, 6 stay in the sieve.

### Slide 10: The order rule
- **Suggested qty = Reorder point × 2 − On hand**
- "Fill the shelf back up to twice the reorder point"
- Pallet Jack Wheels: 25 × 2 = 50 → 50 − 18 = **32**
- Predictable beats clever in week one
- **Suggested visual:** A shelf with a dotted "target line" at 50, 18 items on the shelf and 32 ghost items filling the gap.

### Slide 11: This morning's numbers
- BL-1002 Corrugated Shipping Box: 1,820 × $0.85 = **$1,547.00**
- BL-1004 Industrial Safety Gloves: 780 × $2.40 = **$1,872.00**
- BL-1005 Pallet Jack Wheels: 32 × $38.00 = **$1,216.00**
- BL-1007 Hydraulic Oil 20L: 49 × $54.00 = **$2,646.00**
- Let the calculator do the maths; let the brain do the words
- **Suggested visual:** Four receipt-style cards, the Hydraulic Oil one highlighted orange with a small "over $2,000" tag.

### Slide 12: Story: the order that was ten times too big
- Gloves changed from "pairs" to "packs of 10"; the automation wasn't told
- Ordered 600 packs (6,000 pairs): **$14,400 instead of $1,440**
- Auto-confirmed Friday 11pm, shipped Monday, 20% restocking fee
- **Suggested visual:** A warehouse overflowing with glove boxes up to the ceiling, a forklift driver scratching his head, a calendar showing "Friday 23:00".

### Slide 13: The three guardrails
- 1. Human approval before anything is created
- 2. Maximum order value (over $2,000 → Mr. Kapoor; over $10,000 → blocked)
- 3. Sanity check ("more than 3 × reorder point? CHECK THIS FIRST")
- **Suggested visual:** Three shields lined up in front of a "PO" document, each labelled with one guardrail.

### Slide 14: Finding the supplier
- Vendor ID = the number at the end of the Odoo contact URL (e.g. /odoo/contacts/14)
- "Supplier Map" tab in Google Sheets: SKU · Supplier · Odoo Vendor ID
- Google Sheets "Get rows" = a VLOOKUP
- **Suggested visual:** Browser address bar zoomed in with the "14" circled, an arrow to a 3-column spreadsheet tab.

### Slide 15: Stocky writes the request
- Facts dragged in: product, on hand, reorder point, qty, price, supplier
- Rules: max 5 sentences · start "Approval needed" · sanity check · "never say the order is placed"
- **Suggested visual:** Mock approval email on a phone screen with Stocky's text and two buttons: "Approve draft RFQ" (green) and "Reject" (grey).

### Slide 16: Wait for a human
- Gmail → "Send message and wait for response" → Approval → Approve and Disapprove
- Limit Wait Time: 1 day. **Silence never means yes.**
- Priya rejected the safety gloves: 500 pairs already arriving Thursday
- **Suggested visual:** A workflow line with a "pause" symbol in the middle and a speech bubble from Priya: "500 pairs are arriving Thursday!".

### Slide 17: The draft RFQ in Odoo
- Header (Purchase Order: vendor, Source Document "Stocky – approved by email") + Line (product, quantity)
- Status stays **RFQ**. The **Confirm Order** button stays with Priya.
- Common mistakes: auto-confirming in week one · forgetting incoming stock (use Forecasted Quantity) · over-powered API key · vague emails
- **Suggested visual:** Odoo "Requests for Quotation" list with three new RFQ rows highlighted, and a red "Confirm Order" button with a padlock and "Human only" label.

### Slide 18: Recap and your homework
- Green / Amber / Red: Stocky works in amber
- Human-in-the-loop is one block
- Guardrails beat cleverness
- Activities: **V07_Activity_ReorderSimulator.xlsx** + **V07_Activity_ApprovalRules.docx** · Quiz: **V07_Quiz**
- Next: **Seeing Beyond the ERP** (weather, currency and holiday APIs for supplier risk)
- **Suggested visual:** Three checkmark tiles for the takeaways, then a teaser strip showing a typhoon icon over Shenzhen, a currency symbol and a calendar.
